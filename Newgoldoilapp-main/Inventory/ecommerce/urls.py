from django.urls import path
from . import views

app_name = 'ecommerce'

urlpatterns = [
    # Main pages
    path('', views.shop_home, name='shop_home'),
    path('about/', views.shop_about, name='shop_about'),
    path('delivery/', views.shop_delivery, name='shop_delivery'),
    path('reviews/', views.shop_reviews, name='shop_reviews'),
    
    path('faq/', views.shop_faq, name='shop_faq'),
    path('contact/', views.shop_contact, name='shop_contact'),
    path('contact/submit/', views.shop_contact, name='shop_contact_submit'), 
    # Products
    path('products/', views.shop_products, name='shop_products'),
    path('product/<int:product_id>/', views.shop_product_detail, name='shop_product_detail'),
    
    # Shopping
    path('cart/', views.shop_cart, name='shop_cart'),
    path('checkout/', views.shop_checkout, name='shop_checkout'),
    
    # Payment
    path('payment/<str:order_number>/', views.shop_payment, name='shop_payment'),
    path('payment/<str:order_number>/campay/initiate/', views.shop_payment_campay_initiate, name='shop_payment_campay_initiate'),
    path('payment/<str:order_number>/check-status/', views.shop_payment_check_status, name='shop_payment_check_status'),
    path('payment/<str:order_number>/bank-transfer/', views.shop_payment_bank_transfer, name='shop_payment_bank_transfer'),
    path('payment/webhook/', views.shop_payment_webhook, name='shop_payment_webhook'),
    
    # Order tracking
    path("my-orders/", views.my_orders, name="my_orders"),
    path('track/<str:order_number>/', views.shop_order_track, name='shop_order_track'),
]