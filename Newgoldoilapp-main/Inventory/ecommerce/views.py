import json
import secrets
from datetime import datetime
from decimal import Decimal
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST, require_http_methods
from django.db import models
from django.utils import timezone
from inertia import render as inertia_render
from inventory.models import BaseProduct,Oil,SparePart, Category, Client, Proforma, ProformaItem
from .models import Order, OrderItem, CampayTransaction
from .campay_service import CampayService
from django.core.paginator import Paginator
from django.contrib.auth.decorators import login_required

# ==================== SHOP HOME ====================

def shop_home(request):
    """E-commerce homepage"""
    # Featured oils (latest 4)
    featured_oils = Oil.objects.filter(stock_quantity__gt=0).select_related('category', 'subcategory').order_by('-id')[:4]
    
    # Featured spare parts (latest 4)
    featured_spare_parts = SparePart.objects.filter(stock_quantity__gt=0).select_related('category', 'subcategory').order_by('-id')[:4]
    
    # Categories with product count
    categories = Category.objects.annotate(
        product_count=models.Count('baseproduct', filter=models.Q(baseproduct__stock_quantity__gt=0))
    ).filter(product_count__gt=0)
    
    oils_data = [{
        'id': p.id,
        'product_type': 'oil',
        'name': p.name,
        'reference': p.reference,
        'description': p.description[:100] if p.description else '',
        'unit_price': float(p.unit_price),
        'stock_quantity': p.stock_quantity,
        'image_url': p.image.url if p.image else None,
        'category_name': p.category.name if p.category else None,
        
        'volume': p.volume,
    } for p in featured_oils]
    
    spare_parts_data = [{
        'id': p.id,
        'product_type': 'spare_part',
        'name': p.name,
        'reference': p.reference,
        'description': p.description[:100] if p.description else '',
        'unit_price': float(p.unit_price),
        'stock_quantity': p.stock_quantity,
        'image_url': p.image.url if p.image else None,
        'category_name': p.category.name if p.category else None,
        'brand': p.brand,
        'part_number': p.part_number,
    } for p in featured_spare_parts]
    
    categories_data = [{
        'id': c.id,
        'name': c.name,
        'product_count': c.product_count,
    } for c in categories]
    
    print(f"[SHOP HOME] Oils: {len(oils_data)}, Spare Parts: {len(spare_parts_data)}, Categories: {len(categories_data)}")
    
    return inertia_render(request, 'Shop/Home', {
        'featured_oils': oils_data,
        'featured_spare_parts': spare_parts_data,
        'categories': categories_data,
    })


# ==================== SHOP PRODUCTS LIST ====================

def shop_products(request):
    """Product listing with type filter and pagination"""
    product_type = request.GET.get('type', 'oil')  # Default to oil
    category_id = request.GET.get('category')
    search = request.GET.get('search', '')
    sort = request.GET.get('sort', 'newest')
    page = request.GET.get('page', 1)
    
    # Filter by product type
    if product_type == 'oil':
        products = Oil.objects.filter(stock_quantity__gt=0)
    elif product_type == 'spare_part':
        products = SparePart.objects.filter(stock_quantity__gt=0)
    else:
        products = BaseProduct.objects.filter(stock_quantity__gt=0)
    
    products = products.select_related('category', 'subcategory')
    
    # Category filter
    if category_id:
        products = products.filter(category_id=category_id)
    
    # Search filter
    if search:
        products = products.filter(
            models.Q(name__icontains=search) | 
            models.Q(description__icontains=search) |
            models.Q(reference__icontains=search)
        )
    
    # Sorting
    if sort == 'price_low':
        products = products.order_by('unit_price')
    elif sort == 'price_high':
        products = products.order_by('-unit_price')
    elif sort == 'name':
        products = products.order_by('name')
    else:  # newest
        products = products.order_by('-id')
    
    # Get total count before pagination
    total_items = products.count()
    
    # Pagination - 12 items per page
    paginator = Paginator(products, 12)
    products_page = paginator.get_page(page)
    
    products_data = []
    for p in products_page:
        data = {
            'id': p.id,
            'product_type': p.product_type,
            'name': p.name,
            'reference': p.reference,
            'description': p.description[:100] if p.description else '',
            'unit_price': float(p.unit_price),
            'stock_quantity': p.stock_quantity,
            'image_url': p.image.url if p.image else None,
            'category_name': p.category.name if p.category else None,
        }
        
        # Add type-specific fields
        if isinstance(p, Oil):
            data.update({
                
                'volume': p.volume,
            })
        elif isinstance(p, SparePart):
            data.update({
                'brand': p.brand,
                'part_number': p.part_number,
            })
        
        products_data.append(data)
    
    categories = list(Category.objects.values('id', 'name'))
    
    print(f"[SHOP PRODUCTS] Type: {product_type}, Found: {len(products_data)} on page {products_page.number}")
    
    return inertia_render(request, 'Shop/Products', {
        'products': products_data,
        'categories': categories,
        'current_type': product_type,
        'filters': {
            'category': category_id,
            'search': search,
            'sort': sort,
        },
        'pagination': {
            'current_page': products_page.number,
            'total_pages': paginator.num_pages,
            'total_items': total_items,
            'has_previous': products_page.has_previous(),
            'has_next': products_page.has_next(),
        }
    })


# ==================== PRODUCT DETAIL ====================

def shop_product_detail(request, product_id):
    """Single product detail page"""
    try:
        product = BaseProduct.objects.select_related('category', 'subcategory').get(id=product_id)
    except BaseProduct.DoesNotExist:
        print(f"[SHOP PRODUCT DETAIL] Product {product_id} not found")
        return inertia_render(request, 'Shop/ProductNotFound', {
            'product_id': product_id
        })
    
    # Get full type-specific product
    if product.product_type == 'oil':
        product = Oil.objects.select_related('category', 'subcategory').get(id=product_id)
        related_products = Oil.objects.filter(
            category=product.category,
            stock_quantity__gt=0
        ).exclude(id=product_id).select_related('category').order_by('-id')[:4]
    else:
        product = SparePart.objects.select_related('category', 'subcategory').get(id=product_id)
        related_products = SparePart.objects.filter(
            category=product.category,
            stock_quantity__gt=0
        ).exclude(id=product_id).select_related('category').order_by('-id')[:4]
    
    product_data = {
        'id': product.id,
        'product_type': product.product_type,
        'name': product.name,
        'reference': product.reference,
        'description': product.description,
        'unit_price': float(product.unit_price),
        'stock_quantity': product.stock_quantity,
        
        'image_url': product.image.url if product.image else None,
        'category_name': product.category.name if product.category else None,
        'subcategory_name': product.subcategory.name if product.subcategory else None,
    }
    
    # Add type-specific fields
    if isinstance(product, Oil):
        product_data.update({
            
            'volume': product.volume,
        })
    elif isinstance(product, SparePart):
        product_data.update({
            'brand': product.brand,
            'part_number': product.part_number,
            'compatible_vehicles': product.compatible_vehicles,
            'warranty_period': product.warranty_period,
        })
    
    related_data = []
    for p in related_products:
        data = {
            'id': p.id,
            'product_type': p.product_type,
            'name': p.name,
            'reference': p.reference,
            'unit_price': float(p.unit_price),
            'stock_quantity': p.stock_quantity,
            'image_url': p.image.url if p.image else None,
            'category_name': p.category.name if p.category else None,
        }
        related_data.append(data)
    
    print(f"[SHOP PRODUCT DETAIL] Product: {product.name}, Related: {len(related_data)}")
    
    return inertia_render(request, 'Shop/ProductDetail', {
        'product': product_data,
        'related_products': related_data,
    })


# Keep all other existing views (cart, checkout, payment, etc.)
def shop_cart(request):
    """Shopping cart page"""
    return inertia_render(request, 'Shop/Cart', {})



# ==================== CHECKOUT ====================

@csrf_exempt
@login_required(login_url="/auth/login/")
def shop_checkout(request):
    """Checkout page and order creation"""
    if request.method == 'GET':
        return inertia_render(request, 'Shop/Checkout', {})
    
    elif request.method == 'POST':
        try:
            data = json.loads(request.body)
            
            # Validate customer data
            customer_name = data.get('customer_name')
            customer_email = data.get('customer_email')
            customer_phone = data.get('customer_phone')
            customer_address = data.get('customer_address')
            payment_method = data.get('payment_method', 'campay')
            items = data.get('items', [])
            
            if not all([customer_name, customer_email, customer_phone, customer_address]):
                return JsonResponse({
                    'success': False,
                    'errors': 'All customer fields are required'
                }, status=400)
            
            if not items:
                return JsonResponse({
                    'success': False,
                    'errors': 'Cart is empty'
                }, status=400)
            
            # Validate stock availability
            stock_errors = []
            for item in items:
                try:
                    product = BaseProduct.objects.get(id=item['product_id'])
                    if product.stock_quantity < item['quantity']:
                        stock_errors.append({
                            'product': product.name,
                            'available': product.stock_quantity,
                            'requested': item['quantity']
                        })
                except BaseProduct.DoesNotExist:
                    return JsonResponse({
                        'success': False,
                        'errors': f'Product with ID {item["product_id"]} not found'
                    }, status=404)
            
            if stock_errors:
                error_messages = []
                for error in stock_errors:
                    error_messages.append(
                        f"{error['product']}: Only {error['available']} units available"
                    )
                return JsonResponse({
                    'success': False,
                    'errors': 'Insufficient stock: ' + ' | '.join(error_messages)
                }, status=400)
            
            # Generate order number
            order_number = f"ORD-{datetime.now().strftime('%Y%m%d')}-{secrets.token_hex(4).upper()}"
            
            # Calculate total
            total_amount = Decimal('0')
            for item in items:
                product = BaseProduct.objects.get(id=item['product_id'])
                total_amount += Decimal(str(product.unit_price)) * int(item['quantity'])
            
            # Create order
            order = Order.objects.create(
                order_number=order_number,
                customer_name=customer_name,
                customer_email=customer_email,
                customer_phone=customer_phone,
                customer_address=customer_address,
                payment_method=payment_method,
                total_amount=total_amount,
                status='pending'
            )
            
            # Create order items
            for item in items:
                product = BaseProduct.objects.get(id=item['product_id'])
                OrderItem.objects.create(
                    order=order,
                    product=product,
                    quantity=int(item['quantity']),
                    unit_price=product.unit_price,
                    total_price=Decimal(str(product.unit_price)) * int(item['quantity'])
                )
            
            # Reserve stock
            order.reserve_stock()
            
            print(f"[ORDER CREATED] {order_number} - Total: {total_amount} FCFA")
            
            return JsonResponse({
                'success': True,
                'order_number': order_number,
                'message': f'Order {order_number} created successfully!'
            })
            
        except Exception as e:
            import traceback
            traceback.print_exc()
            return JsonResponse({
                'success': False,
                'errors': f'Failed to create order: {str(e)}'
            }, status=500)


# ==================== PAYMENT PAGE ====================
@login_required(login_url="/auth/login/")
def shop_payment(request, order_number):
    """Payment page - choose payment method and pay"""
    order = get_object_or_404(Order, order_number=order_number)
    
    items = OrderItem.objects.filter(order=order).select_related('product')
    
    items_data = [{
        'product_name': item.product.name,
        'quantity': item.quantity,
        'unit_price': float(item.unit_price),
        'total_price': float(item.total_price),
    } for item in items]
    
    order_data = {
        'order_number': order.order_number,
        'customer_name': order.customer_name,
        'customer_email': order.customer_email,
        'customer_phone': order.customer_phone,
        'customer_address': order.customer_address,
        'total_amount': float(order.total_amount),
        'status': order.status,
        'payment_method': order.payment_method,
        'created_at': order.created_at.strftime('%Y-%m-%d %H:%M'),
        'items': items_data,
    }
    
    return inertia_render(request, 'Shop/Payment', {
        'order': order_data,
    })


# ==================== CAMPAY PAYMENT INITIATION ====================
@csrf_exempt
@login_required(login_url="/auth/login/")
@require_POST
def shop_payment_campay_initiate(request, order_number):
    """Initiate Campay payment"""
    try:
        order = get_object_or_404(Order, order_number=order_number)
        data = json.loads(request.body)
        
        phone_number = data.get('phone_number')
        
        if not phone_number:
            return JsonResponse({
                'success': False,
                'errors': 'Phone number is required'
            }, status=400)
        
        print(f"[PAYMENT INITIATE] Order: {order_number}, Phone: {phone_number}, Amount: {order.total_amount}")
        
        # Update order payment info
        order.payment_method = 'campay'
        order.payment_phone = phone_number
        order.status = 'payment_initiated'
        order.save()
        
        # Generate unique reference
        payment_reference = f"PAY-{order_number}-{secrets.token_hex(4).upper()}"
        
        # Initialize Campay service
        campay = CampayService()
        
        # Initiate payment
        result = campay.initiate_payment(
            amount=float(order.total_amount),
            phone_number=phone_number,
            description=f"Payment for order {order_number}",
            external_reference=payment_reference
        )
        
        if result.get('success'):
            # Create transaction record
            transaction = CampayTransaction.objects.create(
                order=order,
                reference=payment_reference,
                external_reference=result.get('reference'),
                amount=order.total_amount,
                phone_number=phone_number,
                operator=result.get('operator'),
                status='pending',
                response_data=result.get('raw_response')
            )
            
            # Update order
            order.payment_reference = payment_reference
            order.payment_external_ref = result.get('reference')
            order.status = 'payment_processing'
            order.save()
            
            print(f"[PAYMENT SUCCESS] Transaction created: {payment_reference}")
            
            return JsonResponse({
                'success': True,
                'message': f'Payment initiated! Please check your phone ({phone_number}) to approve the transaction.',
                'reference': payment_reference,
                'external_reference': result.get('reference'),
                'operator': result.get('operator'),
            })
        else:
            order.status = 'failed'
            order.save()
            
            print(f"[PAYMENT FAILED] {result.get('error')}")
            
            return JsonResponse({
                'success': False,
                'errors': f"Payment initiation failed: {result.get('error', 'Unknown error')}"
            }, status=400)
        
    except Exception as e:
        import traceback
        traceback.print_exc()
        return JsonResponse({
            'success': False,
            'errors': f'Error: {str(e)}'
        }, status=500)


# ==================== CHECK PAYMENT STATUS ====================
@csrf_exempt
@login_required(login_url="/auth/login/")
def shop_payment_check_status(request, order_number):
    """Check Campay payment status"""
    try:
        order = get_object_or_404(Order, order_number=order_number)
        
        # Get latest transaction
        transaction = CampayTransaction.objects.filter(order=order).order_by('-created_at').first()
        
        if not transaction:
            return JsonResponse({
                'success': False,
                'errors': 'No payment transaction found'
            }, status=404)
        
        print(f"[CHECK STATUS] Order: {order_number}, Transaction: {transaction.external_reference}")
        
        # Check status with Campay
        campay = CampayService()
        result = campay.check_transaction_status(transaction.external_reference)
        
        if result.get('success'):
            status = result.get('status')
            transaction.status = status.lower()
            transaction.webhook_data = result.get('raw_response')
            transaction.save()
            
            print(f"[CHECK STATUS] Status: {status}")
            
            # Update order based on status
            if status.upper() == 'SUCCESSFUL':
                order.status = 'payment_verified'
                order.payment_verified = True
                order.payment_date = timezone.now()
                order.save()
                
                # Deduct stock
                success, message = order.deduct_stock()
                print(f"[STOCK DEDUCT] {message}")
                
                return JsonResponse({
                    'success': True,
                    'status': 'successful',
                    'message': 'Payment successful! Your order is being processed.'
                })
            
            elif status.upper() == 'FAILED':
                order.status = 'failed'
                order.save()
                
                # Restore stock
                success, message = order.restore_stock()
                print(f"[STOCK RESTORE] {message}")
                
                return JsonResponse({
                    'success': True,
                    'status': 'failed',
                    'message': 'Payment failed. Please try again.'
                })
            
            else:  # PENDING
                return JsonResponse({
                    'success': True,
                    'status': 'pending',
                    'message': 'Payment is still pending. Please approve on your phone.'
                })
        
        else:
            return JsonResponse({
                'success': False,
                'errors': f"Failed to check status: {result.get('error')}"
            }, status=500)
        
    except Exception as e:
        import traceback
        traceback.print_exc()
        return JsonResponse({
            'success': False,
            'errors': f'Error: {str(e)}'
        }, status=500)


# ==================== CAMPAY WEBHOOK ====================
@csrf_exempt
@login_required(login_url="/auth/login/")
@require_POST
def shop_payment_webhook(request):
    """Campay webhook endpoint for payment notifications"""
    try:
        data = json.loads(request.body)
        
        print(f"[CAMPAY WEBHOOK] Received: {data}")
        
        # Extract data from webhook
        external_reference = data.get('reference')
        status = data.get('status')
        
        if not external_reference:
            return JsonResponse({'success': False, 'error': 'No reference provided'}, status=400)
        
        # Find transaction
        transaction = CampayTransaction.objects.filter(external_reference=external_reference).first()
        
        if not transaction:
            print(f"[CAMPAY WEBHOOK] Transaction not found: {external_reference}")
            return JsonResponse({'success': False, 'error': 'Transaction not found'}, status=404)
        
        # Update transaction
        transaction.status = status.lower()
        transaction.webhook_data = data
        transaction.save()
        
        order = transaction.order
        
        # Update order based on status
        if status.upper() == 'SUCCESSFUL':
            order.status = 'payment_verified'
            order.payment_verified = True
            order.payment_date = timezone.now()
            order.save()
            
            # Deduct stock
            success, message = order.deduct_stock()
            print(f"[CAMPAY WEBHOOK] Payment successful for order {order.order_number} - {message}")
        
        elif status.upper() == 'FAILED':
            order.status = 'failed'
            order.save()
            
            # Restore stock
            success, message = order.restore_stock()
            print(f"[CAMPAY WEBHOOK] Payment failed for order {order.order_number} - {message}")
        
        return JsonResponse({'success': True, 'message': 'Webhook processed'})
        
    except Exception as e:
        import traceback
        traceback.print_exc()
        return JsonResponse({'success': False, 'error': str(e)}, status=500)


# ==================== ORDER TRACKING ====================
@login_required(login_url="/auth/login/")
def shop_order_track(request, order_number):
    """Track a customer's order."""

    # Managers and CEOs can view any order.
    if request.user.role in ["manager", "ceo"]:
        order = get_object_or_404(
            Order.objects.select_related("customer", "client", "proforma"),
            order_number=order_number,
        )

    # Customers can only view their own orders.
    else:
        order = get_object_or_404(
            Order.objects.select_related("customer", "client", "proforma"),
            order_number=order_number,
            customer=request.user,
        )

    # Order items
    items = (
        OrderItem.objects
        .filter(order=order)
        .select_related("product")
    )

    items_data = [
        {
            "product_name": item.product.name,
            "product_reference": item.product.reference,
            "quantity": item.quantity,
            "unit_price": float(item.unit_price),
            "total_price": float(item.total_price),
            "image_url": (
                request.build_absolute_uri(item.product.image.url)
                if item.product.image
                else None
            ),
        }
        for item in items
    ]

    # CamPay transactions
    transactions = (
        CampayTransaction.objects
        .filter(order=order)
        .order_by("-created_at")
    )

    transactions_data = [
        {
            "reference": t.reference,
            "external_reference": t.external_reference,
            "amount": float(t.amount),
            "status": t.status,
            "operator": t.operator,
            "created_at": t.created_at.strftime("%Y-%m-%d %H:%M"),
        }
        for t in transactions
    ]

    # Order information
    order_data = {
        "order_number": order.order_number,
        "customer_name": order.customer_name,
        "customer_email": order.customer_email,
        "customer_phone": order.customer_phone,
        "customer_address": order.customer_address,

        "total_amount": float(order.total_amount),

        "status": order.status,

        "payment_method": order.payment_method,
        "payment_phone": order.payment_phone,
        "payment_reference": order.payment_reference,
        "payment_external_ref": order.payment_external_ref,
        "payment_verified": order.payment_verified,

        "payment_date": (
            order.payment_date.strftime("%Y-%m-%d %H:%M")
            if order.payment_date
            else None
        ),

        "payment_verified_at": (
            order.payment_verified_at.strftime("%Y-%m-%d %H:%M")
            if order.payment_verified_at
            else None
        ),

        "stock_reserved": order.stock_reserved,
        "stock_deducted": order.stock_deducted,

        "created_at": order.created_at.strftime("%Y-%m-%d %H:%M"),

        "items": items_data,
        "transactions": transactions_data,
    }

    return inertia_render(
        request,
        "Shop/OrderTrack",
        {
            "order": order_data,
        },
    )

# ==================== BANK TRANSFER (Manual Payment) ====================
@csrf_exempt
@login_required(login_url="/auth/login/")
@require_POST
def shop_payment_bank_transfer(request, order_number):
    """Handle bank transfer proof submission"""
    try:
        order = get_object_or_404(Order, order_number=order_number)
        
        payment_reference = request.POST.get('payment_reference', '')
        
        order.payment_method = 'bank_transfer'
        order.payment_reference = payment_reference
        order.status = 'payment_submitted'
        order.save()
        
        print(f"[BANK TRANSFER] Order {order_number} - Reference: {payment_reference}")
        
        return JsonResponse({
            'success': True,
            'message': 'Payment details submitted. We will verify and contact you soon.'
        })
        
    except Exception as e:
        import traceback
        traceback.print_exc()
        return JsonResponse({
            'success': False,
            'errors': f'Error: {str(e)}'
        }, status=500)

# Add these simple views at the end of the file

def shop_about(request):
    """About us page"""
    return inertia_render(request, 'Shop/About', {})

def shop_delivery(request):
    """Delivery and returns page"""
    return inertia_render(request, 'Shop/Delivery', {})

def shop_reviews(request):
    """Customer reviews page"""
    return inertia_render(request, 'Shop/Reviews', {})



def shop_faq(request):
    """FAQ page"""
    return inertia_render(request, 'Shop/FAQ', {})

@csrf_exempt
def shop_contact(request):
    """Contact page and form submission"""
    if request.method == 'GET':
        return inertia_render(request, 'Shop/Contact', {})
    
    elif request.method == 'POST':
        try:
            data = json.loads(request.body)
            
            name = data.get('name', '').strip()
            email = data.get('email', '').strip()
            phone = data.get('phone', '').strip()
            subject = data.get('subject', '').strip()
            message = data.get('message', '').strip()
            
            # Validate required fields
            if not all([name, email, subject, message]):
                return JsonResponse({
                    'success': False,
                    'errors': 'All required fields must be filled'
                }, status=400)
            
            # Email validation
            if not '@' in email or not '.' in email:
                return JsonResponse({
                    'success': False,
                    'errors': 'Invalid email address'
                }, status=400)
            
            # Log the contact message (in production, send email or save to database)
            print(f"""
            ==================== NEW CONTACT MESSAGE ====================
            From: {name} ({email})
            Phone: {phone}
            Subject: {subject}
            Message: {message}
            Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
            =============================================================
            """)
            
            # In production, you would:
            # 1. Save to database (create ContactMessage model)
            # 2. Send email notification to admin
            # 3. Send auto-reply to customer
            
            # For now, just return success
            return JsonResponse({
                'success': True,
                'message': 'Thank you for contacting us! We will respond within 24 hours.'
            })
            
        except Exception as e:
            import traceback
            traceback.print_exc()
            return JsonResponse({
                'success': False,
                'errors': f'An error occurred: {str(e)}'
            }, status=500)

@login_required(login_url="/auth/login/")
def my_orders(request):
    """Display orders belonging to the logged-in customer."""

    orders = (
        Order.objects
        .filter(customer=request.user)
        .prefetch_related("items__product")
        .order_by("-created_at")
    )

    orders_data = []

    for order in orders:
        items = order.items.all()

        orders_data.append({
            "order_number": order.order_number,
            "created_at": order.created_at.strftime("%B %d, %Y %H:%M"),
            "status": order.status,
            "total_amount": float(order.total_amount),
            "payment_method": order.payment_method,
            "payment_verified": order.payment_verified,
            "item_count": sum(item.quantity for item in items),
            "items": [
                {
                    "product_name": item.product.name,
                    "quantity": item.quantity,
                    "unit_price": float(item.unit_price),
                    "total_price": float(item.total_price),
                }
                for item in items
            ],
        })

    return inertia_render(
        request,
        "Shop/MyOrders",
        {
            "orders": orders_data,
        },
    )