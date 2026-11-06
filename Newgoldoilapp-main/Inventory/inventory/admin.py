from django.contrib import admin
from .models import (
    Category, Subcategory, BaseProduct, Oil, SparePart, 
    Supplier, Client, Proforma, ProformaItem, 
    DeliveryNote, DeliveryNoteItem, Receipt, ReceiptItem
)

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'created_at']
    search_fields = ['name']

@admin.register(Subcategory)
class SubcategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'created_at']
    list_filter = ['category']
    search_fields = ['name']

@admin.register(BaseProduct)
class BaseProductAdmin(admin.ModelAdmin):
    list_display = ['reference', 'name', 'product_type', 'category', 'unit_price', 'stock_quantity']
    list_filter = ['product_type', 'category']
    search_fields = ['name', 'reference']

@admin.register(Oil)
class OilAdmin(admin.ModelAdmin):
    list_display = ['reference', 'name', 'volume', 'unit_price', 'stock_quantity', 'created_at']
    list_filter = [ 'category', 'volume']
    search_fields = ['name', 'reference']
    fields = ['name', 'category', 'subcategory', 'volume', 'description', 
              'unit_price', 'stock_quantity', 'unit', 'image']
    readonly_fields = ['reference']

@admin.register(SparePart)
class SparePartAdmin(admin.ModelAdmin):
    list_display = ['reference', 'name', 'brand', 'part_number', 'unit_price', 'stock_quantity', 'created_at']
    list_filter = ['brand', 'category']
    search_fields = ['name', 'reference', 'brand', 'part_number']
    fields = ['name', 'category', 'subcategory', 'brand', 'part_number', 'compatible_vehicles', 
              'warranty_period', 'description', 'unit_price', 'stock_quantity', 'unit', 'image']
    readonly_fields = ['reference']

@admin.register(Supplier)
class SupplierAdmin(admin.ModelAdmin):
    list_display = ['name', 'phone', 'email', 'created_at']
    search_fields = ['name', 'phone', 'email']

@admin.register(Client)
class ClientAdmin(admin.ModelAdmin):
    list_display = ['name', 'phone', 'email', 'created_at']
    search_fields = ['name', 'phone', 'email']

class ProformaItemInline(admin.TabularInline):
    model = ProformaItem
    extra = 1
    raw_id_fields = ['product']

@admin.register(Proforma)
class ProformaAdmin(admin.ModelAdmin):
    list_display = ['proforma_number', 'client', 'status', 'total_ttc', 'created_at']
    list_filter = ['status', 'created_at']
    search_fields = ['proforma_number', 'client__name']
    inlines = [ProformaItemInline]
    readonly_fields = ['proforma_number', 'created_by', 'created_at']

@admin.register(ProformaItem)
class ProformaItemAdmin(admin.ModelAdmin):
    list_display = ['proforma', 'product', 'quantity', 'unit_price', 'total_price']
    list_filter = ['proforma']
    raw_id_fields = ['product', 'proforma']

class DeliveryNoteItemInline(admin.TabularInline):
    model = DeliveryNoteItem
    extra = 1
    raw_id_fields = ['product']

@admin.register(DeliveryNote)
class DeliveryNoteAdmin(admin.ModelAdmin):
    list_display = ['note_number', 'client', 'delivery_date', 'created_at']
    list_filter = ['delivery_date', 'created_at']
    search_fields = ['note_number', 'client__name']
    inlines = [DeliveryNoteItemInline]
    readonly_fields = ['note_number', 'created_by', 'created_at']

@admin.register(DeliveryNoteItem)
class DeliveryNoteItemAdmin(admin.ModelAdmin):
    list_display = ['delivery_note', 'product', 'quantity']
    raw_id_fields = ['product', 'delivery_note']

class ReceiptItemInline(admin.TabularInline):
    model = ReceiptItem
    extra = 1
    raw_id_fields = ['product']

@admin.register(Receipt)
class ReceiptAdmin(admin.ModelAdmin):
    list_display = ['receipt_number', 'supplier', 'receipt_date', 'status', 'created_at']
    list_filter = ['status', 'receipt_date', 'created_at']
    search_fields = ['receipt_number', 'supplier__name']
    inlines = [ReceiptItemInline]
    readonly_fields = ['receipt_number', 'created_by', 'created_at']

@admin.register(ReceiptItem)
class ReceiptItemAdmin(admin.ModelAdmin):
    list_display = ['receipt', 'product', 'quantity', 'unit_price']
    raw_id_fields = ['product', 'receipt']