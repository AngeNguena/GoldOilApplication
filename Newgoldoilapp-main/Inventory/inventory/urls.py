from django.urls import path
from . import views

app_name = 'inventory'

urlpatterns = [
    # Dashboard
    path('dashboard/', views.dashboard, name='dashboard'),
    
    # Products
    path('products/', views.product_list, name='product_list'),
    path('products/create/', views.product_create, name='product_create'),
    path('products/<int:product_id>/update/', views.product_update, name='product_update'),
    path('products/<int:product_id>/delete/', views.product_delete, name='product_delete'),
    
    # Categories
    path('categories/', views.category_list, name='category_list'),
    path('categories/create/', views.category_create, name='category_create'),
    path('categories/<int:category_id>/update/', views.category_update, name='category_update'),
    path('categories/<int:category_id>/delete/', views.category_delete, name='category_delete'),
    
    # Subcategories
    path('subcategories/', views.subcategory_list, name='subcategory_list'),
    path('subcategories/create/', views.subcategory_create, name='subcategory_create'),
    path('subcategories/<int:subcategory_id>/update/', views.subcategory_update, name='subcategory_update'),
    path('subcategories/<int:subcategory_id>/delete/', views.subcategory_delete, name='subcategory_delete'),
    
    # Clients
    path('clients/', views.client_list, name='client_list'),
    path('clients/create/', views.client_create, name='client_create'),
    path('clients/<int:pk>/update/', views.client_update, name='client_update'),
    path('clients/<int:client_id>/delete/', views.client_delete, name='client_delete'),
    
    # Proformas - ORDER MATTERS! Specific routes before generic ones
    path('proformas/', views.proforma_list, name='proforma_list'),
    path('proformas/create/', views.proforma_create, name='proforma_create'),
    path('proformas/<int:proforma_id>/update-status/', views.proforma_update_status, name='proforma_update_status'),
    path('proformas/view/<int:proforma_id>/', views.proforma_view, name='proforma_view'),
    path('proformas/update/<int:proforma_id>/', views.proforma_update, name='proforma_update'),
    path('proformas/delete/<int:proforma_id>/', views.proforma_delete, name='proforma_delete'),
    path('proformas/download/<int:proforma_id>/',views.proforma_download_pdf,name='proforma_download_pdf'),
    
    # Delivery Notes
    path('delivery-notes/', views.delivery_note_list, name='delivery_note_list'),
    path('delivery-notes/view/<int:note_id>/', views.delivery_note_view, name='delivery_note_view'),
    path('delivery-notes/print/<int:note_id>/', views.delivery_note_print, name='delivery_note_print'),
    path('delivery-notes/download/<int:note_id>/', views.delivery_note_download_pdf, name='delivery_note_download_pdf'),
    path('delivery-notes/delete/<int:note_id>/', views.delivery_note_delete, name='delivery_note_delete'),

    path('receipts/', views.receipt_list, name='receipt_list'),
    path('receipts/create/', views.receipt_create, name='receipt_create'),
    path('receipts/view/<int:receipt_id>/', views.receipt_view, name='receipt_view'),
    path('receipts/<int:receipt_id>/update-status/', views.receipt_update_status, name='receipt_update_status'),
    path('receipts/delete/<int:receipt_id>/', views.receipt_delete, name='receipt_delete'),


     # Reports
    path('reports/', views.reports_dashboard, name='reports_dashboard'),
    path('reports/monthly/', views.reports_monthly, name='reports_monthly'),
    path('reports/yearly/', views.reports_yearly, name='reports_yearly'),
    path('reports/monthly/download/', views.reports_download_monthly_pdf, name='reports_download_monthly_pdf'),
    path('reports/yearly/download/', views.reports_download_yearly_pdf, name='reports_download_yearly_pdf'),

    
# Suppliers
path(
    'suppliers/',
    views.supplier_list,
    name='supplier_list'
),

path(
    'suppliers/create/',
    views.supplier_create,
    name='supplier_create'
),

path(
    'suppliers/<int:supplier_id>/update/',
    views.supplier_update,
    name='supplier_update'
),

path(
    'suppliers/<int:supplier_id>/delete/',
    views.supplier_delete,
    name='supplier_delete'
),


]