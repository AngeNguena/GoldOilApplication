from django.contrib import admin
from django.utils.html import format_html
from django.utils import timezone
from .models import Order, OrderItem, Cart, CartItem, NewsletterSubscriber


# =======================
# ORDER ITEM INLINE
# =======================
class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    readonly_fields = ('total',)

    def total(self, obj):
        return obj.quantity * obj.unit_price

    total.short_description = "Total"


# =======================
# ORDER ADMIN
# =======================
@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = (
        'order_number', 'customer_name', 'customer_email',
        'payment_method', 'status', 'stock_status',
        'total_amount', 'created_at'
    )

    list_filter = (
        'status', 'payment_method',
        'payment_verified', 'stock_deducted', 'created_at'
    )

    search_fields = (
        'order_number', 'customer_name',
        'customer_email', 'customer_phone', 'payment_reference'
    )

    readonly_fields = (
        'order_number', 'total_amount',
        'created_at', 'updated_at',
        'payment_proof_preview'
    )

    inlines = [OrderItemInline]

    actions = [
        'verify_payment_and_deduct_stock',
        'mark_as_delivered',
        'cancel_and_restore_stock'
    ]

    fieldsets = (
        ('Order Information', {
            'fields': ('order_number', 'status', 'created_at', 'updated_at')
        }),
        ('Customer Information', {
            'fields': ('customer_name', 'customer_email', 'customer_phone', 'customer_address')
        }),
        ('Payment Information', {
            'fields': (
                'payment_method', 'payment_reference',
                'payment_proof', 'payment_proof_preview',
                'payment_date', 'payment_verified',
                'payment_verified_by', 'payment_verified_at'
            )
        }),
        ('Stock Management', {
            'fields': ('stock_reserved', 'stock_deducted')
        }),
        ('Linked Records', {
            'fields': ('client', 'proforma')
        }),
        ('Notes', {
            'fields': ('notes', 'admin_notes')
        }),
    )

    # =======================
    # CUSTOM DISPLAY
    # =======================
    def stock_status(self, obj):
        if obj.stock_deducted:
            return format_html('<span style="color: green;">✓ Deducted</span>')
        elif obj.stock_reserved:
            return format_html('<span style="color: orange;">⏳ Reserved</span>')
        return format_html('<span style="color: gray;">Not Reserved</span>')

    stock_status.short_description = 'Stock Status'

    def payment_proof_preview(self, obj):
        if obj.payment_proof:
            if obj.payment_proof.name.endswith('.pdf'):
                return format_html(
                    '<a href="{}" target="_blank">View PDF</a>',
                    obj.payment_proof.url
                )
            return format_html(
                '<a href="{}" target="_blank">'
                '<img src="{}" style="max-width:300px; max-height:300px;"/>'
                '</a>',
                obj.payment_proof.url,
                obj.payment_proof.url
            )
        return "No payment proof uploaded"

    payment_proof_preview.short_description = 'Payment Proof Preview'

    # =======================
    # ACTIONS
    # =======================
    def verify_payment_and_deduct_stock(self, request, queryset):
        success_count = 0
        errors = []

        for order in queryset:
            if order.stock_deducted:
                errors.append(f"{order.order_number}: Already deducted")
                continue

            success, message = order.deduct_stock()

            if success:
                order.payment_verified = True
                order.payment_verified_by = request.user
                order.payment_verified_at = timezone.now()
                order.status = 'payment_verified'
                order.save()
                success_count += 1
            else:
                errors.append(f"{order.order_number}: {message}")

        if success_count:
            self.message_user(request, f"{success_count} order(s) verified & stock deducted")

        for err in errors:
            self.message_user(request, err, level='error')

    verify_payment_and_deduct_stock.short_description = "Verify payment & deduct stock"

    def mark_as_delivered(self, request, queryset):
        count = queryset.update(status='delivered')
        self.message_user(request, f"{count} order(s) marked as delivered")

    mark_as_delivered.short_description = "Mark as delivered"

    def cancel_and_restore_stock(self, request, queryset):
        success_count = 0

        for order in queryset:
            success, _ = order.restore_stock()
            if success:
                order.status = 'cancelled'
                order.save()
                success_count += 1

        self.message_user(request, f"{success_count} order(s) cancelled & stock restored")

    cancel_and_restore_stock.short_description = "Cancel & restore stock"


# =======================
# ORDER ITEM ADMIN
# =======================
@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ('order', 'product', 'quantity', 'unit_price', 'total')
    list_filter = ('order__created_at',)
    search_fields = ('order__order_number', 'product__name')

    def total(self, obj):
        return obj.quantity * obj.unit_price

    total.short_description = "Total"


# =======================
# NEWSLETTER
# =======================
@admin.register(NewsletterSubscriber)
class NewsletterSubscriberAdmin(admin.ModelAdmin):
    list_display = ('email', 'name', 'is_active', 'subscribed_at')
    list_filter = ('is_active', 'subscribed_at')
    search_fields = ('email', 'name')