from django.db import models
from django.conf import settings
from django.utils import timezone
from django.core.validators import MinValueValidator
from django.contrib.auth import get_user_model
from datetime import date
import random
import string

User = get_user_model()


# ======================
# TIMESTAMP MIXIN
# ======================
class TimeStampMixin(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


# ======================
# PRODUCT CATEGORIES
# ======================
class Category(TimeStampMixin):
    """Product categories"""
    name = models.CharField(max_length=255, unique=True)
    description = models.TextField(blank=True, null=True)
    
    class Meta:
        verbose_name_plural = 'Categories'
        ordering = ['name']
    
    def __str__(self):
        return self.name


class Subcategory(TimeStampMixin):
    """Product subcategories"""
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='subcategories')
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    
    class Meta:
        verbose_name_plural = 'Subcategories'
        ordering = ['category', 'name']
    
    def __str__(self):
        return f"{self.category.name} - {self.name}"


# Base Product Model
class BaseProduct(TimeStampMixin):
    """Base model for all products"""
    PRODUCT_TYPE_CHOICES = [
        ('oil', 'Oil & Lubricant'),
        ('spare_part', 'Spare Part'),
    ]
    
    product_type = models.CharField(max_length=20, choices=PRODUCT_TYPE_CHOICES)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)
    subcategory = models.ForeignKey(Subcategory, on_delete=models.SET_NULL, null=True, blank=True)
    name = models.CharField(max_length=255)
    reference = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True, null=True)
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    stock_quantity = models.IntegerField(default=0)
    
    image = models.ImageField(upload_to='products/', blank=True, null=True)
    
    class Meta:
        ordering = ['-id']
    
    def __str__(self):
        return f"{self.name} ({self.reference})"
    
    


# For backward compatibility - keep Product model pointing to BaseProduct
class Product(BaseProduct):
    class Meta:
        proxy = True
        verbose_name = 'Product (All)'
        verbose_name_plural = 'Products (All)'


class Oil(BaseProduct):
    """Oil and Lubricant products"""
    
    VOLUME_CHOICES = [
        ('1L', '1 Liter'),
        ('5L', '5 Liters'),
        ('10L', '10 Liters'),
        ('20L', '20 Liters'),
        ('200L', '200 Liters (Drum)'),
        
    ]
    
    # Oil-specific fields
    
    volume = models.CharField(max_length=50, choices=VOLUME_CHOICES, blank=True, null=True, help_text="Select volume")
   
    
   
    
    class Meta:
        proxy = False
        verbose_name = 'Oil Product'
        verbose_name_plural = 'Oil Products'
    
    def save(self, *args, **kwargs):
        self.product_type = 'oil'
        super().save(*args, **kwargs)


class SparePart(BaseProduct):
    """Spare parts products"""
    # Spare part-specific fields
    part_number = models.CharField(max_length=100, blank=True, null=True)
    brand = models.CharField(max_length=100, blank=True, null=True)
    compatible_vehicles = models.TextField(blank=True, null=True, help_text="List of compatible vehicles")
    warranty_period = models.CharField(max_length=50, blank=True, null=True, help_text="e.g., 6 months, 1 year")
    
    class Meta:
        proxy = False
        verbose_name = 'Spare Part'
        verbose_name_plural = 'Spare Parts'
    
    def save(self, *args, **kwargs):
        self.product_type = 'spare_part'
        super().save(*args, **kwargs)




# ======================
# CLIENT MODEL
# ======================
class Client(models.Model):

    CLIENT_TYPE_CHOICES = [
        ("distributor", "Distributor"),
        ("individual", "Individual"),
        ("enterprise", "Enterprise"),
    ]

    name = models.CharField(max_length=150)
    client_type = models.CharField(max_length=20, choices=CLIENT_TYPE_CHOICES)

    email = models.EmailField(blank=True, null=True)
    phone = models.CharField(max_length=30, blank=True, null=True)

    address = models.TextField(blank=True, null=True)

    pb = models.CharField(max_length=100, blank=True, null=True)
    niu = models.CharField(max_length=100, blank=True, null=True)
    rccm = models.CharField(max_length=100, blank=True, null=True)

    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.name} ({self.get_client_type_display()})"


# ======================
# PROFORMA
# ======================
class Proforma(TimeStampMixin):

    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("rejected", "Rejected"),
        ("delivered", "Delivered"),
    ]

    proforma_number = models.CharField(max_length=50, unique=True)

    client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name="proformas")

    date_created = models.DateTimeField(default=timezone.now)

    delivery_time = models.CharField(max_length=50, blank=True, null=True)

    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")

    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="proformas_created"
    )

    total_ht = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    tva = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    bct = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    total_ttc = models.DecimalField(max_digits=12, decimal_places=2, default=0)

    class Meta:
        ordering = ["-date_created"]

    def __str__(self):
        return f"Proforma {self.proforma_number} - {self.client.name}"


class ProformaItem(models.Model):

    proforma = models.ForeignKey(Proforma, on_delete=models.CASCADE, related_name="items")

    product = models.ForeignKey(Product, on_delete=models.PROTECT)

    quantity = models.PositiveIntegerField(default=1)

    unit_price = models.DecimalField(max_digits=10, decimal_places=2)

    total_price = models.DecimalField(max_digits=12, decimal_places=2)

    def save(self, *args, **kwargs):

        self.total_price = self.unit_price * self.quantity

        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.quantity} x {self.product.name}"


# ======================
# SUPPLIER
# ======================
class Supplier(TimeStampMixin):

    name = models.CharField(max_length=255)

    email = models.EmailField(blank=True, null=True)

    phone = models.CharField(max_length=50, blank=True, null=True)

    address = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name


# ======================
# DELIVERY NOTE
# ======================
class DeliveryNote(TimeStampMixin):

    note_number = models.CharField(max_length=50, unique=True)

    proforma = models.ForeignKey(
        Proforma,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="delivery_notes"
    )

    client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name="delivery_notes")

    delivery_date = models.DateField(default=date.today)

    notes = models.TextField(blank=True, null=True)

    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)

    class Meta:
        ordering = ["-id"]

    def __str__(self):
        return f"{self.note_number} - {self.client.name}"


class DeliveryNoteItem(models.Model):

    delivery_note = models.ForeignKey(DeliveryNote, on_delete=models.CASCADE, related_name="items")

    product = models.ForeignKey(Product, on_delete=models.CASCADE)

    quantity = models.IntegerField()

    unit_price = models.DecimalField(max_digits=10, decimal_places=2)

    @property
    def total(self):
        return self.quantity * self.unit_price

    def __str__(self):
        return f"{self.product.name} - {self.quantity}"


# ======================
# RECEIPT (STOCK IN)
# ======================
class Receipt(TimeStampMixin):

    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("received", "Received"),
        ("cancelled", "Cancelled"),
    ]

    receipt_number = models.CharField(max_length=50, unique=True)

    supplier = models.ForeignKey(Supplier, on_delete=models.CASCADE, related_name="receipts")

    receipt_date = models.DateField(default=date.today)

    notes = models.TextField(blank=True, null=True)

    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")

    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)

    class Meta:
        ordering = ["-id"]

    def __str__(self):
        return f"{self.receipt_number} - {self.supplier.name}"


class ReceiptItem(models.Model):

    receipt = models.ForeignKey(Receipt, on_delete=models.CASCADE, related_name="items")

    product = models.ForeignKey(Product, on_delete=models.CASCADE)

    quantity = models.IntegerField()

    unit_price = models.DecimalField(max_digits=10, decimal_places=2)

    @property
    def total(self):
        return self.quantity * self.unit_price

    def __str__(self):
        return f"{self.product.name} - {self.quantity}"