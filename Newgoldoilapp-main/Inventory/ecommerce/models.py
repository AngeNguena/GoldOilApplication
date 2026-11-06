from django.db import models
from django.conf import settings
from django.utils import timezone
from inventory.models import Product, Client, Proforma, TimeStampMixin
from decimal import Decimal
from django.db import transaction
import secrets


class Order(TimeStampMixin):
    STATUS_CHOICES = [
        ('pending', 'Pending Payment'),
        ('payment_initiated', 'Payment Initiated'),
        ('payment_processing', 'Payment Processing'),
        ('payment_submitted', 'Payment Proof Submitted'),
        ('payment_verified', 'Payment Verified'),
        ('processing', 'Processing'),
        ('shipped', 'Shipped'),
        ('delivered', 'Delivered'),
        ('cancelled', 'Cancelled'),
        ('failed', 'Payment Failed'),
    ]
    
    PAYMENT_METHOD_CHOICES = [
        ('mtn_momo', 'MTN Mobile Money'),
        ('orange_money', 'Orange Money'),
        ('campay', 'Campay (MTN/Orange)'),
        ('bank_transfer', 'Bank Transfer'),
        ('cash', 'Cash on Delivery'),
    ]
    
    # Order Information
    order_number = models.CharField(max_length=50, unique=True)
    

    # Customer Account
    customer = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='orders',
    )

    # Customer Information
    customer_name = models.CharField(max_length=255)
    customer_email = models.EmailField()
    customer_phone = models.CharField(max_length=50)
    customer_address = models.TextField()
    
    # Payment Information
    payment_method = models.CharField(max_length=20, choices=PAYMENT_METHOD_CHOICES, blank=True, null=True)
    payment_phone = models.CharField(max_length=20, blank=True, null=True, help_text="Phone number for mobile money payment")
    payment_proof = models.FileField(upload_to='payment_proofs/', blank=True, null=True)
    payment_reference = models.CharField(max_length=100, blank=True, null=True, help_text='Transaction ID or reference number')
    payment_external_ref = models.CharField(max_length=100, blank=True, null=True, help_text="Campay transaction reference")
    payment_date = models.DateTimeField(blank=True, null=True)
    payment_verified = models.BooleanField(default=False)
    payment_verified_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL, 
        blank=True, 
        null=True, 
        related_name='verified_payments'
    )
    payment_verified_at = models.DateTimeField(blank=True, null=True)
    
    # Order Management
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='pending')
    

    total_amount = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=Decimal('0.00')
    )
    notes = models.TextField(blank=True, null=True)
    admin_notes = models.TextField(blank=True, null=True, help_text='Internal notes (not visible to customer)')
    
    # Stock Management
    stock_reserved = models.BooleanField(default=False, help_text='Stock has been reserved for this order')
    stock_deducted = models.BooleanField(default=False, help_text='Stock has been deducted from inventory')
    
    # Integration with Inventory
    client = models.ForeignKey(
        Client, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True, 
        related_name='orders'
    )
    proforma = models.ForeignKey(
        Proforma, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True, 
        related_name='orders'
    )
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Customer Order'
        verbose_name_plural = 'Customer Orders'
    
    def __str__(self):
        return f"{self.order_number} - {self.customer_name}"
    
    def calculate_total(self):
        """Calculate total from order items"""
        total = sum(item.quantity * item.unit_price for item in self.items.all())
        self.total_amount = total
        self.save()
        return total
    
    @transaction.atomic
    def reserve_stock(self):
        """Reserve stock for this order (soft reservation)"""
        if self.stock_reserved:
            return True, "Stock already reserved"
        
        # Check if all items have sufficient stock
        for item in self.items.all():
            if item.product.stock_quantity < item.quantity:
                return False, f"Insufficient stock for {item.product.name}"
        
        self.stock_reserved = True
        self.save()
        return True, "Stock reserved successfully"
    
    @transaction.atomic
    def deduct_stock(self):
        """Deduct stock from inventory (permanent deduction)"""
        if self.stock_deducted:
            return True, "Stock already deducted"
        
        # Deduct stock for each item
        for item in self.items.all():
            product = item.product
            
            if product.stock_quantity < item.quantity:
                return False, f"Insufficient stock for {product.name}. Available: {product.stock_quantity}"
            
            product.stock_quantity -= item.quantity
            product.save()
        
        self.stock_deducted = True
        self.save()
        return True, "Stock deducted successfully"
    
    @transaction.atomic
    def restore_stock(self):
        """Restore stock if order is cancelled"""
        if not self.stock_deducted:
            return True, "No stock to restore"
        
        # Restore stock for each item
        for item in self.items.all():
            product = item.product
            product.stock_quantity += item.quantity
            product.save()
        
        self.stock_deducted = False
        self.stock_reserved = False
        self.save()
        return True, "Stock restored successfully"


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    total_price = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal('0.00'))
    
    class Meta:
        verbose_name = 'Order Item'
        verbose_name_plural = 'Order Items'
    
    def save(self, *args, **kwargs):
        self.total_price = self.quantity * self.unit_price
        super().save(*args, **kwargs)
    
    def __str__(self):
        return f"{self.product.name} x {self.quantity}"


class CampayTransaction(TimeStampMixin):
    """Track Campay payment transactions"""
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('successful', 'Successful'),
        ('failed', 'Failed'),
        ('expired', 'Expired'),
    ]
    
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='campay_transactions')
    reference = models.CharField(max_length=100, unique=True, help_text="Our internal reference")
    external_reference = models.CharField(max_length=100, blank=True, null=True, help_text="Campay transaction reference")
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    phone_number = models.CharField(max_length=20)
    operator = models.CharField(max_length=20, blank=True, null=True, help_text="MTN or ORANGE")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    response_data = models.JSONField(blank=True, null=True, help_text="Initial API response")
    webhook_data = models.JSONField(blank=True, null=True, help_text="Webhook notification data")
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Campay Transaction'
        verbose_name_plural = 'Campay Transactions'
    
    def __str__(self):
        return f"{self.reference} - {self.status}"


class Cart(models.Model):
    """For future: persistent carts for logged-in users"""
    session_key = models.CharField(max_length=255, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = 'Shopping Cart'
        verbose_name_plural = 'Shopping Carts'
    
    def __str__(self):
        return f"Cart {self.session_key}"


class CartItem(models.Model):
    """For future: persistent cart items"""
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    
    class Meta:
        verbose_name = 'Cart Item'
        verbose_name_plural = 'Cart Items'
        unique_together = ('cart', 'product')
    
    def __str__(self):
        return f"{self.product.name} x {self.quantity}"


class NewsletterSubscriber(models.Model):
    """For future: newsletter functionality"""
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=255, blank=True)
    subscribed_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    
    class Meta:
        verbose_name = 'Newsletter Subscriber'
        verbose_name_plural = 'Newsletter Subscribers'
        ordering = ['-subscribed_at']
    
    def __str__(self):
        return self.email