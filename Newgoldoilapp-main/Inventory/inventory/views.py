import json
import io
from mysite.inertia_helpers import render as inertia_render
from django.http import HttpResponse
from reportlab.pdfgen import canvas
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.http import JsonResponse
from django.shortcuts import get_object_or_404, redirect
from decimal import Decimal
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.contrib.auth.decorators import login_required, user_passes_test
from django.utils import timezone

from datetime import datetime

from django.db.models import Sum, Count, Q, F
from datetime import datetime, timedelta
from .models import Product, Client, Proforma, ProformaItem
from datetime import date
from .models import Product, Category,BaseProduct, Subcategory,Oil,SparePart, Client, Proforma, ProformaItem, Receipt, ReceiptItem, Supplier, DeliveryNote, DeliveryNoteItem
from django.contrib import messages
import json
from urllib.parse import quote
from authentication.decorators import manager_or_ceo_required

# ----------------------
# Dashboard / Reports
# ----------------------

@manager_or_ceo_required
def dashboard(request):
    """Dashboard with inventory statistics"""
    
    # Product stats
    total_products = Product.objects.count()
    low_stock_products = Product.objects.filter(stock_quantity__lt=10).count()
    out_of_stock = Product.objects.filter(stock_quantity=0).count()
    total_stock_value = Product.objects.aggregate(
        total=Sum(F('stock_quantity') * F('unit_price'))
    )['total'] or 0
    
    # Client stats
    total_clients = Client.objects.count()
    
    # Proforma stats
    total_proformas = Proforma.objects.count()
    pending_proformas = Proforma.objects.filter(status='pending').count()
    delivered_proformas = Proforma.objects.filter(status='delivered').count()
    
    # Delivery Notes stats
    total_delivery_notes = DeliveryNote.objects.count()
    recent_deliveries = DeliveryNote.objects.select_related('client').order_by('-created_at')[:5]
    
    # Receipt stats
    total_receipts = Receipt.objects.count()
    pending_receipts = Receipt.objects.filter(status='pending').count()
    received_receipts = Receipt.objects.filter(status='received').count()
    
    # Recent deliveries data
    recent_deliveries_data = []
    for delivery in recent_deliveries:
        items = DeliveryNoteItem.objects.filter(delivery_note=delivery)
        total = sum(item.quantity * item.unit_price for item in items)
        
        recent_deliveries_data.append({
            'note_number': delivery.note_number,
            'client_name': delivery.client.name,
            'delivery_date': delivery.delivery_date.strftime('%Y-%m-%d') if delivery.delivery_date else 'N/A',
            'total': float(total),
            'created_at': delivery.created_at.strftime('%Y-%m-%d') if delivery.created_at else 'N/A',
        })
    
    # Low stock products
    low_stock_list = Product.objects.filter(stock_quantity__lt=10).values(
        'id', 'name', 'reference', 'stock_quantity'
    )[:5]
    
    context = {
        'total_products': total_products,
        'low_stock_products': low_stock_products,
        'out_of_stock': out_of_stock,
        'total_stock_value': float(total_stock_value),
        'total_clients': total_clients,
        'total_proformas': total_proformas,
        'pending_proformas': pending_proformas,
        'delivered_proformas': delivered_proformas,
        'total_delivery_notes': total_delivery_notes,
        'total_receipts': total_receipts,
        'pending_receipts': pending_receipts,
        'received_receipts': received_receipts,
        'recent_deliveries': recent_deliveries_data,
        'low_stock_list': list(low_stock_list),
    }
    
    return inertia_render(request, 'Inventory/Dashboard', context)

# ----------------------
# Product CRUD
# ----------------------
@manager_or_ceo_required
def product_list(request):
    """List all products with type filtering and pagination"""
    product_type = request.GET.get('type', 'oil')  # Default to oil
    search = request.GET.get('search', '')
    page = request.GET.get('page', 1)
    
    # Filter by product type
    if product_type == 'oil':
        products = Oil.objects.all()
    elif product_type == 'spare_part':
        products = SparePart.objects.all()
    else:
        products = BaseProduct.objects.all()
    
    # Search filter
    if search:
        products = products.filter(
            Q(name__icontains=search) | 
            Q(reference__icontains=search) |
            Q(description__icontains=search)
        )
    
    products = products.select_related('category', 'subcategory').order_by('-id')
    
    # Pagination - 20 items per page
    paginator = Paginator(products, 20)
    products_page = paginator.get_page(page)
    
    products_data = []
    for p in products_page:
        data = {
            'id': p.id,
            'product_type': p.product_type,
            'reference': p.reference,
            'name': p.name,
            'description': p.description,
            'category_name': p.category.name if p.category else None,
            'subcategory_name': p.subcategory.name if p.subcategory else None,
            'unit_price': float(p.unit_price),
            'stock_quantity': p.stock_quantity,
            
            'image_url': p.image.url if p.image else None,
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
                'compatible_vehicles': p.compatible_vehicles,
                'warranty_period': p.warranty_period,
            })
        
        products_data.append(data)
    
    categories = list(Category.objects.values('id', 'name'))
    
    return inertia_render(request, 'Inventory/Products/List', {
        'products': products_data,
        'categories': categories,
        'current_type': product_type,
        'pagination': {
            'current_page': products_page.number,
            'total_pages': paginator.num_pages,
            'total_items': paginator.count,
            'has_previous': products_page.has_previous(),
            'has_next': products_page.has_next(),
            'previous_page': products_page.previous_page_number() if products_page.has_previous() else None,
            'next_page': products_page.next_page_number() if products_page.has_next() else None,
        }
    })

@csrf_exempt
@manager_or_ceo_required
def product_create(request):
    """Create new product (Oil or Spare Part)"""

    if request.method == 'GET':
        product_type = request.GET.get('type', 'oil')

        categories = list(
            Category.objects.values('id', 'name')
        )

        subcategories = list(
            Subcategory.objects
            .select_related('category')
            .values(
                'id',
                'name',
                'category_id',
                'category__name'
            )
        )

        volume_choices = [
            {'value': '1L', 'label': '1 Liter'},
            {'value': '5L', 'label': '5 Liters'},
            {'value': '10L', 'label': '10 Liters'},
            {'value': '20L', 'label': '20 Liters'},
            {'value': '200L', 'label': '200 Liters (Drum)'},
        ]

        return inertia_render(
            request,
            'Inventory/Products/Create',
            {
                'categories': categories,
                'subcategories': subcategories,
                'product_type': product_type,
                'volume_choices': volume_choices,
            }
        )

    elif request.method == 'POST':
        try:
            # Handle FormData
            data = request.POST.dict()
            image_file = request.FILES.get('image')

            product_type = data.get('product_type', 'oil')
            reference = data.get('reference', '').strip()

            # Validate reference
            if not reference:
                messages.error(
                    request,
                    'Reference code is required.'
                )

                return redirect(
                    f'/inventory/products/create/?type={product_type}'
                )

            # Check if reference already exists
            if BaseProduct.objects.filter(
                reference=reference
            ).exists():

                messages.error(
                    request,
                    f'Reference code "{reference}" already exists. '
                    'Please use a unique reference.'
                )

                return redirect(
                    f'/inventory/products/create/?type={product_type}'
                )

            # Common fields
            common_data = {
                'reference': reference,
                'name': data.get('name'),
                'category_id': (
                    data.get('category_id')
                    if data.get('category_id')
                    else None
                ),
                'subcategory_id': (
                    data.get('subcategory_id')
                    if data.get('subcategory_id')
                    else None
                ),
                'description': data.get('description', ''),
                'unit_price': data.get('unit_price'),
                'stock_quantity': data.get('stock_quantity', 0),
            }

            # Create product
            if product_type == 'oil':

                product = Oil.objects.create(
                    **common_data,
                    volume=data.get('volume', ''),
                )

            else:

                product = SparePart.objects.create(
                    **common_data,
                    brand=data.get('brand', ''),
                    part_number=data.get('part_number', ''),
                    compatible_vehicles=data.get(
                        'compatible_vehicles',
                        ''
                    ),
                    warranty_period=data.get(
                        'warranty_period',
                        ''
                    ),
                )

            # Handle image upload
            if image_file:
                product.image = image_file
                product.save()

            print(
                f"[PRODUCT CREATED] "
                f"{product.reference} - {product.name}"
            )

            # Success message
            messages.success(
                request,
                f'{product_type.replace("_", " ").title()} '
                f'"{product.name}" created successfully!'
            )

            # Redirect to products list
            return redirect(
                f'/inventory/products/?type={product_type}'
            )

        except Exception as e:
            import traceback
            traceback.print_exc()

            messages.error(
                request,
                f'Failed to create product: {str(e)}'
            )

            product_type = request.POST.get(
                'product_type',
                'oil'
            )

            return redirect(
                f'/inventory/products/create/?type={product_type}'
            )


@csrf_exempt
@manager_or_ceo_required
def product_update(request, product_id):
    """Update existing product"""

    try:
        product = BaseProduct.objects.select_related(
            'category',
            'subcategory'
        ).get(id=product_id)

    except BaseProduct.DoesNotExist:
        messages.error(request, 'Product not found.')
        return redirect('/inventory/products/')

    if request.method == 'GET':

        categories = list(
            Category.objects.values('id', 'name')
        )

        subcategories = list(
            Subcategory.objects
            .select_related('category')
            .values(
                'id',
                'name',
                'category_id',
                'category__name'
            )
        )

        volume_choices = [
            {'value': '1L', 'label': '1 Liter'},
            {'value': '5L', 'label': '5 Liters'},
            {'value': '10L', 'label': '10 Liters'},
            {'value': '20L', 'label': '20 Liters'},
            {'value': '200L', 'label': '200 Liters (Drum)'},
        ]

        # Build product data
        product_data = {
            'id': product.id,
            'product_type': product.product_type,
            'reference': product.reference,
            'name': product.name,
            'category_id': (
                product.category.id
                if product.category
                else None
            ),
            'subcategory_id': (
                product.subcategory.id
                if product.subcategory
                else None
            ),
            'description': product.description or '',
            'unit_price': float(product.unit_price),
            'stock_quantity': product.stock_quantity,
            'image_url': (
                product.image.url
                if product.image
                else None
            ),
        }

        # Add type-specific fields
        if product.product_type == 'oil':

            try:
                oil = Oil.objects.get(id=product_id)

                product_data.update({
                    'volume': oil.volume or '',
                })

            except Oil.DoesNotExist:
                pass

        elif product.product_type == 'spare_part':

            try:
                spare = SparePart.objects.get(id=product_id)

                product_data.update({
                    'brand': spare.brand or '',
                    'part_number': spare.part_number or '',
                    'compatible_vehicles': (
                        spare.compatible_vehicles or ''
                    ),
                    'warranty_period': (
                        spare.warranty_period or ''
                    ),
                })

            except SparePart.DoesNotExist:
                pass

        return inertia_render(
            request,
            'Inventory/Products/Update',
            {
                'product': product_data,
                'categories': categories,
                'subcategories': subcategories,
                'volume_choices': volume_choices,
            }
        )

    elif request.method == 'POST':

        try:
            # Handle FormData
            data = request.POST.dict()
            image_file = request.FILES.get('image')

            reference = data.get('reference', '').strip()

            # Validate reference
            if not reference:

                messages.error(
                    request,
                    'Reference code is required.'
                )

                return redirect(
                    f'/inventory/products/{product_id}/edit/'
                )

            # Check if reference already exists
            if BaseProduct.objects.filter(
                reference=reference
            ).exclude(
                id=product_id
            ).exists():

                messages.error(
                    request,
                    f'Reference code "{reference}" already exists. '
                    'Please use a unique reference.'
                )

                return redirect(
                    f'/inventory/products/{product_id}/edit/'
                )

            # Update common fields
            product.reference = reference
            product.name = data.get('name')

            product.category_id = (
                data.get('category_id')
                if data.get('category_id')
                else None
            )

            product.subcategory_id = (
                data.get('subcategory_id')
                if data.get('subcategory_id')
                else None
            )

            product.description = data.get(
                'description',
                ''
            )

            product.unit_price = data.get('unit_price')

            product.stock_quantity = data.get(
                'stock_quantity',
                0
            )

            # Handle image upload
            if image_file:
                product.image = image_file

            product.save()

            # Update type-specific fields
            if product.product_type == 'oil':

                oil = Oil.objects.get(id=product_id)

                oil.volume = data.get(
                    'volume',
                    ''
                )

                oil.save()

            elif product.product_type == 'spare_part':

                spare = SparePart.objects.get(
                    id=product_id
                )

                spare.brand = data.get(
                    'brand',
                    ''
                )

                spare.part_number = data.get(
                    'part_number',
                    ''
                )

                spare.compatible_vehicles = data.get(
                    'compatible_vehicles',
                    ''
                )

                spare.warranty_period = data.get(
                    'warranty_period',
                    ''
                )

                spare.save()

            print(
                f"[PRODUCT UPDATED] "
                f"{product.reference} - {product.name}"
            )

            # Success message
            messages.success(
                request,
                f'Product "{product.name}" updated successfully!'
            )

            # Return to products list
            return redirect(
                f'/inventory/products/?type={product.product_type}'
            )

        except Exception as e:

            import traceback
            traceback.print_exc()

            messages.error(
                request,
                f'Failed to update product: {str(e)}'
            )

            return redirect(
                f'/inventory/products/{product_id}/edit/'
            )



@csrf_exempt
@manager_or_ceo_required
@require_POST
def product_delete(request, product_id):
    try:
        product = get_object_or_404(Product, id=product_id)

        product_name = product.name
        product_reference = product.reference

        # Delete the product image if it exists
        if product.image:
            try:
                product.image.delete(save=False)
            except Exception as e:
                print(f"Error deleting image: {e}")

        # Delete the product
        product.delete()

        print(
            f"[PRODUCT DELETE] Successfully deleted product: "
            f"{product_name}"
        )

        # Success message
        messages.success(
            request,
            f'Product "{product_name}" ({product_reference}) '
            f'deleted successfully!'
        )

        # Return to products list
        return redirect('/inventory/products/')

    except Exception as e:
        import traceback
        traceback.print_exc()

        # Error message
        messages.error(
            request,
            f'Failed to delete product: {str(e)}'
        )

        return redirect('/inventory/products/')


# ----------------------
# Client CRUD
# ----------------------

@manager_or_ceo_required
def client_list(request):
    """List all clients with pagination"""
    clients = Client.objects.all().order_by('name')
    
    page = request.GET.get('page', 1)
    per_page = request.GET.get('per_page', 10)
    
    paginator = Paginator(clients, per_page)
    
    try:
        client_page = paginator.page(page)
    except PageNotAnInteger:
        client_page = paginator.page(1)
    except EmptyPage:
        client_page = paginator.page(paginator.num_pages)
    
    # FIX: Convert the paginated clients to list of dicts
    clients_data = [{
        'id': client.id,
        'name': client.name,
        'client_type': client.client_type,
        'email': client.email if client.email else '',
        'phone': client.phone if client.phone else '',
        'address': client.address if client.address else '',
        'pb': client.pb if client.pb else '',
        'niu': client.niu if client.niu else '',
        'rccm': client.rccm if client.rccm else '',
    } for client in client_page]  # ← Changed from client_page.values()
    
    return inertia_render(request, 'Inventory/Clients/List', {
        'clients': clients_data,
        'pagination': {
            'current_page': client_page.number,
            'total_pages': paginator.num_pages,
            'per_page': int(per_page),
            'total_items': paginator.count,
            'has_previous': client_page.has_previous(),
            'has_next': client_page.has_next(),
            'previous_page': client_page.previous_page_number() if client_page.has_previous() else None,
            'next_page': client_page.next_page_number() if client_page.has_next() else None,
        }
    })


@csrf_exempt
@manager_or_ceo_required
def client_create(request):

    if request.method == 'POST':
        try:
            # -----------------------------------------
            # Get submitted data
            # -----------------------------------------
            if request.POST:
                data = request.POST
            else:
                try:
                    data = json.loads(request.body)
                except (json.JSONDecodeError, UnicodeDecodeError):
                    data = {}

            print("========================================")
            print("[CLIENT CREATE]")
            print("Content-Type:", request.content_type)
            print("POST DATA:", request.POST)
            print("BODY:", request.body)
            print("========================================")

            # -----------------------------------------
            # Get client name
            # -----------------------------------------
            name = str(data.get('name', '')).strip()

            if not name:
                messages.error(
                    request,
                    'Client name is required.'
                )

                return redirect(
                    '/inventory/clients/create/'
                )

            # -----------------------------------------
            # Create client
            # -----------------------------------------
            client = Client.objects.create(
                name=name,
                client_type=data.get('client_type') or 'individual',
                email=data.get('email') or '',
                phone=data.get('phone') or '',
                address=data.get('address') or '',
                pb=data.get('pb') or '',
                niu=data.get('niu') or '',
                rccm=data.get('rccm') or '',
            )

            print(
                f"[CLIENT CREATED] "
                f"ID={client.id} | "
                f"Name={client.name}"
            )

            # -----------------------------------------
            # Success message
            # -----------------------------------------
            messages.success(
                request,
                f'Client "{client.name}" created successfully!'
            )

            # -----------------------------------------
            # Redirect to client list
            # -----------------------------------------
            return redirect(
                '/inventory/clients/'
            )

        except Exception as e:
            import traceback
            traceback.print_exc()

            messages.error(
                request,
                f'Failed to create client: {str(e)}'
            )

            return redirect(
                '/inventory/clients/create/'
            )

    # ---------------------------------------------
    # GET
    # ---------------------------------------------
    return inertia_render(
        request,
        'Inventory/Clients/Create'
    )



@csrf_exempt
@manager_or_ceo_required
def client_update(request, pk):
    client = get_object_or_404(Client, pk=pk)

    if request.method == 'POST':
        try:
            data = request.POST

            # Validate client name
            name = data.get('name', '').strip()

            if not name:
                messages.error(
                    request,
                    'Client name is required.'
                )

                return redirect(
                    f'/inventory/clients/{pk}/update/'
                )

            # Update client
            client.name = name
            client.client_type = data.get(
                'client_type',
                client.client_type
            )
            client.email = data.get(
                'email',
                client.email
            )
            client.phone = data.get(
                'phone',
                client.phone
            )
            client.address = data.get(
                'address',
                client.address
            )
            client.pb = data.get(
                'pb',
                client.pb
            )
            client.niu = data.get(
                'niu',
                client.niu
            )
            client.rccm = data.get(
                'rccm',
                client.rccm
            )

            client.save()

            messages.success(
                request,
                f'Client "{client.name}" updated successfully!'
            )

            return redirect(
                '/inventory/clients/'
            )

        except Exception as e:
            import traceback
            traceback.print_exc()

            messages.error(
                request,
                f'Failed to update client: {str(e)}'
            )

            return redirect(
                f'/inventory/clients/{pk}/update/'
            )

    return inertia_render(
        request,
        'Inventory/Clients/Update',
        {
            'client': {
                'id': client.id,
                'name': client.name,
                'client_type': client.client_type,
                'email': client.email,
                'phone': client.phone,
                'address': client.address,
                'pb': client.pb,
                'niu': client.niu,
                'rccm': client.rccm,
            }
        }
    )




@csrf_exempt
@manager_or_ceo_required
@require_POST
def client_delete(request, client_id):
    try:
        client = get_object_or_404(
            Client,
            pk=client_id
        )

        client_name = client.name

        client.delete()

        print(
            f"[CLIENT DELETED] "
            f"{client_name} - ID: {client_id}"
        )

        messages.success(
            request,
            f'Client "{client_name}" deleted successfully!'
        )

        return redirect(
            '/inventory/clients/'
        )

    except Exception as e:
        import traceback
        traceback.print_exc()

        messages.error(
            request,
            f'Failed to delete client: {str(e)}'
        )

        return redirect(
            '/inventory/clients/'
        )


# ----------------------
# Proforma CRUD
# ----------------------

@manager_or_ceo_required
def proforma_list(request):
    """List all proformas with pagination"""
    proformas = Proforma.objects.select_related('client').all().order_by('-date_created')
    
    # Pagination
    page = request.GET.get('page', 1)
    per_page = request.GET.get('per_page', 10)
    
    paginator = Paginator(proformas, per_page)
    
    try:
        proforma_page = paginator.page(page)
    except PageNotAnInteger:
        proforma_page = paginator.page(1)
    except EmptyPage:
        proforma_page = paginator.page(paginator.num_pages)
    
    proformas_data = []
    for p in proforma_page:
        # Calculate total from items if total_ttc is zero or null
        if not p.total_ttc or p.total_ttc == 0:
            items = ProformaItem.objects.filter(proforma=p)
            total_ht = sum(item.quantity * item.unit_price for item in items)
            tva = total_ht * Decimal('0.1925')
            total_ttc = total_ht + tva
        else:
            total_ttc = p.total_ttc
        
        proformas_data.append({
            'id': p.id,
            'proforma_number': p.proforma_number,
            'client_name': p.client.name,
            'total_ttc': float(total_ttc),
            'delivery_time': p.delivery_time,
            'status': p.status,
            'date_created': p.date_created.strftime('%Y-%m-%d'),
        })
    
    return inertia_render(request, 'Inventory/Proformas/List', {
        'proformas': proformas_data,
        'pagination': {
            'current_page': proforma_page.number,
            'total_pages': paginator.num_pages,
            'per_page': int(per_page),
            'total_items': paginator.count,
            'has_previous': proforma_page.has_previous(),
            'has_next': proforma_page.has_next(),
            'previous_page': proforma_page.previous_page_number() if proforma_page.has_previous() else None,
            'next_page': proforma_page.next_page_number() if proforma_page.has_next() else None,
        }
    })

@csrf_exempt
@manager_or_ceo_required
def proforma_create(request):
    """Create a new proforma"""
    if request.method == 'GET':
        clients = list(Client.objects.all().values('id', 'name'))
        products = list(Product.objects.all().values('id', 'name', 'reference', 'unit_price', 'stock_quantity'))

        return inertia_render(request, 'Inventory/Proformas/Create', {
            'clients': clients,
            'products': products
        })

    elif request.method == 'POST':
        try:
            # Support both Inertia form posts (multipart/form-encoded) and raw JSON
            if request.content_type and 'application/json' in request.content_type:
                data = json.loads(request.body)
            else:
                data = request.POST.dict()
                items_raw = request.POST.get('items')
                data['items'] = json.loads(items_raw) if items_raw else []

            proforma_number = data.get('proforma_number', '').strip()
            client_id = data.get('client_id')
            items_data = data.get('items', [])

            # -----------------------------
            # VALIDATION
            # -----------------------------
            if not proforma_number:
                messages.error(request, 'Invoice number is required.')
                return redirect('/inventory/proformas/create/')

            if not client_id:
                messages.error(request, 'Please select a client.')
                return redirect('/inventory/proformas/create/')

            if not items_data:
                messages.error(request, 'At least one item is required.')
                return redirect('/inventory/proformas/create/')

            if Proforma.objects.filter(proforma_number=proforma_number).exists():
                messages.error(
                    request,
                    f'Invoice number "{proforma_number}" already exists. Please use a unique number.'
                )
                return redirect('/inventory/proformas/create/')

            # -----------------------------
            # STOCK VALIDATION
            # -----------------------------
            stock_errors = []
            for item_data in items_data:
                try:
                    product = Product.objects.get(id=item_data['product_id'])
                except Product.DoesNotExist:
                    messages.error(request, 'One of the selected products no longer exists.')
                    return redirect('/inventory/proformas/create/')

                requested_qty = int(item_data['quantity'])
                if product.stock_quantity < requested_qty:
                    stock_errors.append(
                        f"{product.name}: only {product.stock_quantity} units available (requested {requested_qty})"
                    )

            if stock_errors:
                messages.error(
                    request,
                    'Insufficient stock — ' + ' | '.join(stock_errors)
                )
                return redirect('/inventory/proformas/create/')

            # -----------------------------
            # CREATE
            # -----------------------------
            proforma = Proforma.objects.create(
                proforma_number=proforma_number,
                client_id=client_id,
                delivery_time=data.get('delivery_time'),
                status='pending',
                created_by=request.user
            )

            total_ht = Decimal('0')
            for item_data in items_data:
                item = ProformaItem.objects.create(
                    proforma=proforma,
                    product_id=item_data['product_id'],
                    quantity=int(item_data['quantity']),
                    unit_price=Decimal(str(item_data['unit_price'])),
                    total_price=Decimal(str(item_data['quantity'])) * Decimal(str(item_data['unit_price']))
                )
                total_ht += item.total_price

            proforma.total_ht = total_ht
            proforma.tva = total_ht * Decimal('0.1925')
            proforma.bct = Decimal('0')
            proforma.total_ttc = proforma.total_ht + proforma.tva + proforma.bct
            proforma.save()

            print(f"[PROFORMA CREATED] {proforma.proforma_number}")

            # -----------------------------
            # SUCCESS
            # -----------------------------
            messages.success(
                request,
                f'Proforma "{proforma.proforma_number}" created successfully!'
            )

            return redirect('/inventory/proformas/')

        except Exception as e:
            import traceback
            traceback.print_exc()

            messages.error(request, f'Failed to create proforma: {str(e)}')
            return redirect('/inventory/proformas/create/')


@csrf_exempt
@manager_or_ceo_required
def proforma_update(request, proforma_id):
    """Update proforma"""
    proforma = get_object_or_404(Proforma, id=proforma_id)

    if request.method == 'GET':
        clients = Client.objects.all().values('id', 'name')
        products = Product.objects.all().values('id', 'name', 'reference', 'unit_price', 'stock_quantity')

        items = ProformaItem.objects.filter(proforma=proforma).select_related('product')
        items_data = [{
            'product_id': item.product.id,
            'quantity': item.quantity,
            'unit_price': float(item.unit_price)
        } for item in items]

        proforma_data = {
            'id': proforma.id,
            'proforma_number': proforma.proforma_number,
            'client_id': proforma.client.id,
            'delivery_time': proforma.delivery_time if proforma.delivery_time else '',
            'status': proforma.status,
            'items': items_data
        }

        return inertia_render(request, 'Inventory/Proformas/Update', {
            'proforma': proforma_data,
            'clients': list(clients),
            'products': list(products)
        })

    elif request.method == 'POST':
        try:
            if request.content_type and 'application/json' in request.content_type:
                data = json.loads(request.body)
            else:
                data = request.POST.dict()
                items_raw = request.POST.get('items')
                data['items'] = json.loads(items_raw) if items_raw else []

            proforma_number = data.get('proforma_number', proforma.proforma_number).strip()
            items_data = data.get('items', [])

            # -----------------------------
            # VALIDATION
            # -----------------------------
            if not proforma_number:
                messages.error(request, 'Invoice number is required.')
                return redirect(f'/inventory/proformas/update/{proforma_id}/')

            if not items_data:
                messages.error(request, 'At least one item is required.')
                return redirect(f'/inventory/proformas/update/{proforma_id}/')

            if Proforma.objects.filter(proforma_number=proforma_number).exclude(id=proforma_id).exists():
                messages.error(
                    request,
                    f'Invoice number "{proforma_number}" already exists. Please use a unique number.'
                )
                return redirect(f'/inventory/proformas/update/{proforma_id}/')

            # -----------------------------
            # STOCK VALIDATION
            # -----------------------------
            stock_errors = []
            for item_data in items_data:
                try:
                    product = Product.objects.get(id=item_data['product_id'])
                except Product.DoesNotExist:
                    messages.error(request, 'One of the selected products no longer exists.')
                    return redirect(f'/inventory/proformas/update/{proforma_id}/')

                requested_qty = int(item_data['quantity'])
                if product.stock_quantity < requested_qty:
                    stock_errors.append(
                        f"{product.name}: only {product.stock_quantity} units available (requested {requested_qty})"
                    )

            if stock_errors:
                messages.error(
                    request,
                    'Insufficient stock — ' + ' | '.join(stock_errors)
                )
                return redirect(f'/inventory/proformas/update/{proforma_id}/')

            # -----------------------------
            # UPDATE
            # -----------------------------
            old_status = proforma.status
            new_status = data.get('status', proforma.status)

            proforma.proforma_number = proforma_number
            proforma.client_id = data.get('client_id', proforma.client_id)
            proforma.delivery_time = data.get('delivery_time', proforma.delivery_time)
            proforma.status = new_status

            ProformaItem.objects.filter(proforma=proforma).delete()

            total_ht = Decimal('0')
            for item_data in items_data:
                item = ProformaItem.objects.create(
                    proforma=proforma,
                    product_id=item_data['product_id'],
                    quantity=int(item_data['quantity']),
                    unit_price=Decimal(str(item_data['unit_price'])),
                    total_price=Decimal(str(item_data['quantity'])) * Decimal(str(item_data['unit_price']))
                )
                total_ht += item.total_price

            proforma.total_ht = total_ht
            proforma.tva = total_ht * Decimal('0.1925')
            proforma.bct = Decimal('0')
            proforma.total_ttc = proforma.total_ht + proforma.tva + proforma.bct

            # Handle stock deduction/restoration on status change
            if old_status != 'delivered' and new_status == 'delivered':
                for item_data in items_data:
                    product = Product.objects.get(id=item_data['product_id'])
                    product.stock_quantity -= int(item_data['quantity'])
                    product.save()
            elif old_status == 'delivered' and new_status != 'delivered':
                for item_data in items_data:
                    product = Product.objects.get(id=item_data['product_id'])
                    product.stock_quantity += int(item_data['quantity'])
                    product.save()

            proforma.save()

            print(f"[PROFORMA UPDATED] {proforma.proforma_number}")

            # -----------------------------
            # SUCCESS
            # -----------------------------
            messages.success(
                request,
                f'Proforma "{proforma.proforma_number}" updated successfully!'
            )

            return redirect('/inventory/proformas/')

        except Exception as e:
            import traceback
            traceback.print_exc()

            messages.error(request, f'Failed to update proforma: {str(e)}')
            return redirect(f'/inventory/proformas/update/{proforma_id}/')


@csrf_exempt
@manager_or_ceo_required
@require_POST
def proforma_update_status(request, proforma_id):
    """Update status and auto-create delivery note when delivered"""
    try:
        proforma = get_object_or_404(Proforma, id=proforma_id)
        data = json.loads(request.body)
        old_status = proforma.status
        new_status = data.get('status')
        
        print(f"[STATUS UPDATE] Proforma {proforma_id}: {old_status} → {new_status}")
        
        if new_status not in ['pending', 'delivered', 'rejected']:
            return JsonResponse({
                'success': False,
                'errors': 'Invalid status. Must be: pending, delivered, or rejected.'
            }, status=400)
        
        # AUTO-CREATE DELIVERY NOTE when changing to delivered
        if new_status == 'delivered' and old_status != 'delivered':
            items = ProformaItem.objects.filter(proforma=proforma).select_related('product')
            stock_errors = []
            
            # Check stock availability
            for item in items:
                if item.product.stock_quantity < item.quantity:
                    stock_errors.append({
                        'product': item.product.name,
                        'available': item.product.stock_quantity,
                        'requested': item.quantity
                    })
            
            if stock_errors:
                error_messages = []
                for error in stock_errors:
                    error_messages.append(
                        f"{error['product']}: Only {error['available']} units available (needed {error['requested']})"
                    )
                return JsonResponse({
                    'success': False,
                    'errors': 'Cannot mark as delivered - Insufficient stock: ' + ' | '.join(error_messages)
                }, status=400)
            
            # Generate delivery note number
            today = date.today()
            delivery_count = DeliveryNote.objects.filter(
                created_at__date=today
            ).count() + 1
            delivery_note_number = f"DN-{today.strftime('%Y%m%d')}-{delivery_count:03d}"
            
            # Create delivery note
            delivery_note = DeliveryNote.objects.create(
                note_number=delivery_note_number,
                proforma=proforma,
                client=proforma.client,
                delivery_date=date.today(),
                notes=f"Auto-generated from Proforma {proforma.proforma_number}",
                created_by=request.user
            )
            
            # Copy items from proforma to delivery note
            for item in items:
                DeliveryNoteItem.objects.create(
                    delivery_note=delivery_note,
                    product=item.product,
                    quantity=item.quantity,
                    unit_price=item.unit_price
                )
                
                # Deduct stock
                product = item.product
                product.stock_quantity -= item.quantity
                product.save()
                print(f"[STOCK DEDUCTED] {item.quantity}x {product.name} - Remaining: {product.stock_quantity}")
            
            print(f"[DELIVERY NOTE CREATED] {delivery_note_number} from Proforma {proforma.proforma_number}")
        
        # Restore stock if changing from delivered back to another status
        elif old_status == 'delivered' and new_status != 'delivered':
            items = ProformaItem.objects.filter(proforma=proforma).select_related('product')
            
            # Restore stock
            for item in items:
                product = item.product
                product.stock_quantity += item.quantity
                product.save()
                print(f"[STOCK RESTORED] {item.quantity}x {product.name} - New stock: {product.stock_quantity}")
        
        # Update proforma status
        proforma.status = new_status
        proforma.save()
        
        print(f"[STATUS UPDATE] Success! New status: {new_status}")
        
        return JsonResponse({
            'success': True,
            'delivery_note_created': new_status == 'delivered' and old_status != 'delivered',
            'message': f'Proforma {proforma.proforma_number} status updated to {new_status}' + 
                      (' and delivery note created' if new_status == 'delivered' and old_status != 'delivered' else '')
        })
        
    except Exception as e:
        import traceback
        print(f"[ERROR] Status update failed: {str(e)}")
        traceback.print_exc()
        return JsonResponse({'success': False, 'errors': f'Failed to update status: {str(e)}'}, status=500)


@csrf_exempt
@manager_or_ceo_required
@require_POST
def proforma_delete(request, proforma_id):
    """Delete proforma"""

    try:
        proforma = get_object_or_404(
            Proforma,
            id=proforma_id
        )

        proforma_number = proforma.proforma_number

        # Restore stock if proforma was delivered
        if proforma.status == 'delivered':

            items = (
                ProformaItem.objects
                .filter(proforma=proforma)
                .select_related('product')
            )

            for item in items:

                product = item.product

                product.stock_quantity += item.quantity

                product.save()

        # Delete proforma
        proforma.delete()

        messages.success(
            request,
            f'Proforma {proforma_number} '
            f'deleted successfully!'
        )

        return redirect(
            '/inventory/proformas/'
        )

    except Exception as e:

        import traceback
        traceback.print_exc()

        messages.error(
            request,
            f'Failed to delete proforma: {str(e)}'
        )

        return redirect(
            '/inventory/proformas/'
        )


@manager_or_ceo_required
def proforma_view(request, proforma_id):
    """View proforma details"""
    proforma = get_object_or_404(Proforma.objects.select_related('client'), id=proforma_id)
    items = ProformaItem.objects.filter(proforma=proforma).select_related('product')
    
    items_data = [{
        'product_name': item.product.name,
        'product_reference': item.product.reference,
        'quantity': item.quantity,
        'unit_price': float(item.unit_price),
    } for item in items]
    
    proforma_data = {
        'id': proforma.id,
        'proforma_number': proforma.proforma_number,
        'client_name': proforma.client.name,
        'client_address': proforma.client.address if proforma.client.address else '',
        'client_phone': proforma.client.phone if proforma.client.phone else '',
        'client_email': proforma.client.email if proforma.client.email else '',
        'client_bp': proforma.client.pb if proforma.client.pb else '',
        'client_niu': proforma.client.niu if proforma.client.niu else '',
        'client_rccm': proforma.client.rccm if proforma.client.rccm else '',
        'delivery_time': proforma.delivery_time if proforma.delivery_time else '10 JOURS',
        'items': items_data,
        'created_at': proforma.date_created.strftime('%Y-%m-%d'),
    }
    
    return inertia_render(request, 'Inventory/Proformas/View', {
        'proforma': proforma_data,
        'company_info': {}
    })


@manager_or_ceo_required
def proforma_download_pdf(request, proforma_id):
    """Download proforma as PDF"""
    try:
        from reportlab.lib import colors
        from reportlab.lib.pagesizes import A4
        from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer
        from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
        from reportlab.lib.units import inch, mm
        from reportlab.lib.enums import TA_CENTER, TA_RIGHT
        
        proforma = get_object_or_404(Proforma.objects.select_related('client'), id=proforma_id)
        items = ProformaItem.objects.filter(proforma=proforma).select_related('product')
        
        # Create PDF buffer
        buffer = io.BytesIO()
        doc = SimpleDocTemplate(
            buffer, 
            pagesize=A4, 
            topMargin=15*mm, 
            bottomMargin=15*mm,
            leftMargin=15*mm,
            rightMargin=15*mm
        )
        
        elements = []
        styles = getSampleStyleSheet()
        
        # Custom styles
        company_name_style = ParagraphStyle(
            'CompanyName',
            parent=styles['Heading1'],
            fontSize=24,
            textColor=colors.HexColor('#166534'),
            alignment=TA_CENTER,
            fontName='Helvetica-Bold',
            spaceAfter=3
        )
        
        company_details_style = ParagraphStyle(
            'CompanyDetails',
            parent=styles['Normal'],
            fontSize=8,
            alignment=TA_CENTER,
            leading=10
        )
        
        title_style = ParagraphStyle(
            'Title',
            parent=styles['Heading1'],
            fontSize=14,
            fontName='Helvetica-Bold',
            alignment=TA_CENTER,
            spaceAfter=10,
            spaceBefore=10
        )
        
        # Company Header
        header_data = [[Paragraph("GOLD OIL TRADING LTD", company_name_style)]]
        header_table = Table(header_data, colWidths=[7*inch])
        header_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor('#166534')),
            ('TEXTCOLOR', (0, 0), (-1, -1), colors.HexColor('#FCD34D')),
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
            ('TOPPADDING', (0, 0), (-1, -1), 15),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 15),
            ('BOX', (0, 0), (-1, -1), 3, colors.HexColor('#166534')),
        ]))
        
        elements.append(header_table)
        elements.append(Spacer(1, 3*mm))
        
        # Company Details
        company_info = """
        <b>IMPORT & EXPORT - Vente en gros et en détails - Distribution - Vidange - Conseil</b><br/>
        Bonamoussadi Rond-point Maetur, Derrière la station OLA - Douala - Cameroun.<br/>
        Tel : (237)671516335/693805193<br/>
        Email : goldoiltradingltd@gmail.com<br/>
        RCCM : CM-DLA-02-2024-B12-00243 NUI : M042416661695E
        """
        elements.append(Paragraph(company_info, company_details_style))
        elements.append(Spacer(1, 5*mm))
        
        # Horizontal line
        line_table = Table([['']], colWidths=[7*inch])
        line_table.setStyle(TableStyle([
            ('LINEBELOW', (0, 0), (-1, -1), 1, colors.black),
        ]))
        elements.append(line_table)
        elements.append(Spacer(1, 3*mm))
        
        # Date and Invoice Number
        date_str = datetime.now().strftime('%d %B %Y')
        date_text = f"Douala le {date_str}"
        elements.append(Paragraph(date_text, ParagraphStyle('Date', parent=styles['Normal'], fontSize=9)))
        elements.append(Spacer(1, 3*mm))
        
        elements.append(Paragraph(f"FACTURE PROFORMA N° : {proforma.proforma_number}", title_style))
        elements.append(Spacer(1, 5*mm))
        
        # Client Information
        client_style = ParagraphStyle(
            'Client',
            parent=styles['Normal'],
            fontSize=9,
            alignment=TA_RIGHT,
            leading=12
        )
        
        client_info = f"""
        <b>DOIT : {proforma.client.name}</b><br/>
        Adresse : {proforma.client.address if proforma.client.address else 'N/A'}<br/>
        BP : {getattr(proforma.client, 'pb', 'N/A')}<br/>
        NIU : {getattr(proforma.client, 'niu', 'N/A')}<br/>
        R.C.C.M. : {getattr(proforma.client, 'rccm', 'N/A')}<br/>
        Tel : {proforma.client.phone if proforma.client.phone else 'N/A'}
        """
        elements.append(Paragraph(client_info, client_style))
        elements.append(Spacer(1, 5*mm))
        
        # Items Table
        items_data = [
            ['N°', 'DESCRIPTION', 'REFERENCE', 'QTE', 'P. U(FCFA)', 'P. T(FCFA)']
        ]
        
        total_ht = Decimal('0')
        for i, item in enumerate(items, 1):
            item_total = item.quantity * item.unit_price
            total_ht += item_total
            items_data.append([
                str(i),
                item.product.name,
                item.product.reference,
                str(item.quantity),
                f"{item.unit_price:,.0f}".replace(',', ' '),
                f"{item_total:,.0f}".replace(',', ' ')
            ])
        
        # Calculate totals
        tva = total_ht * Decimal('0.1925')
        pct = Decimal('0')
        total_ttc = total_ht + tva + pct
        
        # Add total rows
        items_data.append(['', '', '', '', 'TOTAL HT', f"{total_ht:,.0f}".replace(',', ' ')])
        items_data.append(['', '', '', 'TVA', '19,25%', f"{tva:,.0f}".replace(',', ' ')])
        items_data.append(['', '', '', 'PCT', '2%', f"{pct:,.0f}".replace(',', ' ')])
        items_data.append(['', '', '', '', 'TOTAL', f"{total_ttc:,.0f}".replace(',', ' ')])
        
        items_table = Table(items_data, colWidths=[0.4*inch, 2.5*inch, 1.2*inch, 0.6*inch, 1*inch, 1.1*inch])
        items_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#D1FAE5')),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.black),
            ('ALIGN', (0, 0), (-1, 0), 'CENTER'),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, 0), 8),
            ('TOPPADDING', (0, 0), (-1, 0), 6),
            ('BOTTOMPADDING', (0, 0), (-1, 0), 6),
            ('FONTSIZE', (0, 1), (-1, -5), 8),
            ('ALIGN', (0, 1), (0, -1), 'CENTER'),
            ('ALIGN', (3, 1), (3, -1), 'CENTER'),
            ('ALIGN', (4, 1), (-1, -1), 'RIGHT'),
            ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
            ('GRID', (0, 0), (-1, -5), 0.5, colors.grey),
            ('BOX', (0, 0), (-1, -1), 1, colors.black),
            ('BACKGROUND', (0, -4), (-1, -4), colors.HexColor('#F3F4F6')),
            ('FONTNAME', (4, -4), (-1, -4), 'Helvetica-Bold'),
            ('LINEABOVE', (0, -4), (-1, -4), 1, colors.black),
            ('ALIGN', (3, -3), (3, -3), 'CENTER'),
            ('FONTNAME', (3, -3), (3, -3), 'Helvetica-Bold'),
            ('ALIGN', (3, -2), (3, -2), 'CENTER'),
            ('FONTNAME', (3, -2), (3, -2), 'Helvetica-Bold'),
            ('BACKGROUND', (0, -1), (-1, -1), colors.HexColor('#D1FAE5')),
            ('FONTNAME', (4, -1), (-1, -1), 'Helvetica-Bold'),
            ('FONTSIZE', (4, -1), (-1, -1), 10),
            ('LINEABOVE', (0, -1), (-1, -1), 1.5, colors.black),
        ]))
        
        elements.append(items_table)
        elements.append(Spacer(1, 5*mm))
        
        # Amount in Words
        amount_words_style = ParagraphStyle(
            'AmountWords',
            parent=styles['Normal'],
            fontSize=8,
            alignment=TA_CENTER,
            fontName='Helvetica-Oblique'
        )
        
        total_fcfa = f"{total_ttc:,.0f}".replace(',', ' ') + ' FCFA'
        elements.append(Paragraph(
            f"Arrêté la présente proforma à la somme de : <b>{total_fcfa}</b>",
            amount_words_style
        ))
        elements.append(Spacer(1, 5*mm))
        
        # Delivery and Payment Terms
        terms_style = ParagraphStyle(
            'Terms',
            parent=styles['Normal'],
            fontSize=9,
            leading=12
        )
        
        delivery_time = proforma.delivery_time if hasattr(proforma, 'delivery_time') and proforma.delivery_time else '10 JOURS APRES LA RECEPTION DU BON DE COMMANDE'
        
        terms_text = f"""
        <b>DELAI DE LIVRAISON : {delivery_time}</b><br/>
        <br/>
        Modalité de paiement par chèque ou virement bancaire.<br/>
        <b>Banque: AFRICA GOLDEN BANK</b><br/>
        Intitule: GOLD OIL TRADING LIMITED COMPANY<br/>
        Numéro de compte : 10043 00101 37100049401 38
        """
        elements.append(Paragraph(terms_text, terms_style))
        elements.append(Spacer(1, 10*mm))
        
        # Footer
        footer_line = Table([['']], colWidths=[7*inch])
        footer_line.setStyle(TableStyle([
            ('LINEABOVE', (0, 0), (-1, -1), 1.5, colors.black),
        ]))
        elements.append(footer_line)
        elements.append(Spacer(1, 3*mm))
        
        footer_style = ParagraphStyle(
            'Footer',
            parent=styles['Normal'],
            fontSize=7,
            alignment=TA_CENTER,
            leading=9,
            textColor=colors.HexColor('#4B5563')
        )
        
        footer_text = """
        <b>IMPORT & EXPORT - Vente en gros et en détails - Distribution - Vidange - Conseil</b><br/>
        Bonamoussadi Rond-point Maetur, Derrière la station OLA - Douala - Cameroun.<br/>
        Tel : (237)671516335/693805193<br/>
        Email : goldoiltradingltd@gmail.com<br/>
        RCCM : CM-DLA-02-2024-B12-00243 NUI : M042416661695E
        """
        elements.append(Paragraph(footer_text, footer_style))
        
        # Build PDF
        doc.build(elements)
        
        pdf = buffer.getvalue()
        buffer.close()
        
        response = HttpResponse(content_type='application/pdf')
        response['Content-Disposition'] = f'attachment; filename="Proforma_{proforma.proforma_number}.pdf"'
        response.write(pdf)
        
        return response
        
    except ImportError:
        return JsonResponse({
            'success': False,
            'errors': 'ReportLab not installed. Run: pip install reportlab --break-system-packages'
        }, status=500)
    except Exception as e:
        import traceback
        traceback.print_exc()
        return JsonResponse({'success': False, 'errors': f'Failed to generate PDF: {str(e)}'}, status=500)


# ==================== RECEIPT VIEWS ====================
@csrf_exempt
@manager_or_ceo_required
def receipt_list(request):
    """List all receipts (Stock IN) with pagination"""
    receipts = Receipt.objects.select_related('supplier').all().order_by('-created_at')
    
    page = request.GET.get('page', 1)
    per_page = request.GET.get('per_page', 10)
    
    paginator = Paginator(receipts, per_page)
    
    try:
        receipt_page = paginator.page(page)
    except PageNotAnInteger:
        receipt_page = paginator.page(1)
    except EmptyPage:
        receipt_page = paginator.page(paginator.num_pages)
    
    receipts_data = []
    for receipt in receipt_page:
        items = ReceiptItem.objects.filter(receipt=receipt)
        item_count = items.count()
        total_amount = sum(item.quantity * item.unit_price for item in items)
        
        receipts_data.append({
            'id': receipt.id,
            'receipt_number': receipt.receipt_number,
            'supplier_name': receipt.supplier.name,
            'receipt_date': receipt.receipt_date.strftime('%Y-%m-%d') if receipt.receipt_date else None,
            'item_count': item_count,
            'total_amount': float(total_amount),
            'status': receipt.status,
            'created_at': receipt.created_at.strftime('%Y-%m-%d %H:%M') if receipt.created_at else None,
        })
    
    return inertia_render(request, 'Inventory/Receipts/List', {
        'receipts': receipts_data,
        'pagination': {
            'current_page': receipt_page.number,
            'total_pages': paginator.num_pages,
            'per_page': int(per_page),
            'total_items': paginator.count,
            'has_previous': receipt_page.has_previous(),
            'has_next': receipt_page.has_next(),
            'previous_page': receipt_page.previous_page_number() if receipt_page.has_previous() else None,
            'next_page': receipt_page.next_page_number() if receipt_page.has_next() else None,
        }
    })


@csrf_exempt
@manager_or_ceo_required
def receipt_create(request):
    """Create new receipt (Stock IN)"""

    if request.method == 'GET':
        suppliers = list(
            Supplier.objects.all().values(
                'id',
                'name'
            )
        )

        products = list(
            Product.objects.all().values(
                'id',
                'name',
                'reference',
                'unit_price'
            )
        )

        for product in products:
            product['unit_price'] = float(
                product['unit_price']
            )

        return inertia_render(
            request,
            'Inventory/Receipts/Create',
            {
                'suppliers': suppliers,
                'products': products
            }
        )

    elif request.method == 'POST':
        try:
            data = json.loads(request.body)

            print(
                f"[RECEIPT CREATE] Data received: {data}"
            )

            if not data.get('supplier_id'):

                messages.error(
                    request,
                    'Supplier is required.'
                )

                return redirect(
                    '/inventory/receipts/create/'
                )

            if not data.get('receipt_number'):

                messages.error(
                    request,
                    'Receipt number is required.'
                )

                return redirect(
                    '/inventory/receipts/create/'
                )

            receipt = Receipt.objects.create(
                receipt_number=data.get(
                    'receipt_number'
                ),
                supplier_id=int(
                    data.get('supplier_id')
                ),
                receipt_date=(
                    data.get('receipt_date')
                    if data.get('receipt_date')
                    else date.today()
                ),
                notes=data.get(
                    'notes',
                    ''
                ),
                status='pending',
                created_by=request.user
            )

            print(
                f"[RECEIPT CREATE] "
                f"Receipt created with ID: {receipt.id}"
            )

            items_data = data.get(
                'items',
                []
            )

            if not items_data:

                receipt.delete()

                messages.error(
                    request,
                    'At least one item is required.'
                )

                return redirect(
                    '/inventory/receipts/create/'
                )

            for item_data in items_data:

                if (
                    not item_data.get('product_id')
                    or not item_data.get('quantity')
                ):
                    continue

                ReceiptItem.objects.create(
                    receipt=receipt,
                    product_id=int(
                        item_data['product_id']
                    ),
                    quantity=int(
                        item_data['quantity']
                    ),
                    unit_price=Decimal(
                        str(
                            item_data.get(
                                'unit_price',
                                0
                            )
                        )
                    )
                )

            print(
                f"[RECEIPT CREATE] "
                f"Success! Receipt ID: {receipt.id}"
            )

            messages.success(
                request,
                f'Receipt {receipt.receipt_number} '
                f'created successfully!'
            )

            return redirect(
                '/inventory/receipts/'
            )

        except Supplier.DoesNotExist:

            messages.error(
                request,
                'Supplier not found.'
            )

            return redirect(
                '/inventory/receipts/create/'
            )

        except Product.DoesNotExist:

            messages.error(
                request,
                'Product not found.'
            )

            return redirect(
                '/inventory/receipts/create/'
            )

        except Exception as e:

            import traceback

            error_message = str(e)

            traceback.print_exc()

            print(
                f"[RECEIPT CREATE ERROR] "
                f"{error_message}"
            )

            messages.error(
                request,
                f'Failed to create receipt: '
                f'{error_message}'
            )

            return redirect(
                '/inventory/receipts/create/'
            )

    messages.error(
        request,
        'Method not allowed.'
    )

    return redirect(
        '/inventory/receipts/create/'
    )


@csrf_exempt
@manager_or_ceo_required
def receipt_view(request, receipt_id):
    """View receipt details"""
    receipt = get_object_or_404(Receipt.objects.select_related('supplier'), id=receipt_id)
    items = ReceiptItem.objects.filter(receipt=receipt).select_related('product')
    
    items_data = [{
        'product_name': item.product.name,
        'product_reference': item.product.reference,
        'quantity': item.quantity,
        'unit_price': float(item.unit_price),
        'total': float(item.quantity * item.unit_price)
    } for item in items]
    
    total_amount = sum(item['total'] for item in items_data)
    
    receipt_data = {
        'id': receipt.id,
        'receipt_number': receipt.receipt_number,
        'supplier_name': receipt.supplier.name,
        'supplier_phone': receipt.supplier.phone if receipt.supplier.phone else '',
        'supplier_email': receipt.supplier.email if receipt.supplier.email else '',
        'receipt_date': receipt.receipt_date.strftime('%Y-%m-%d') if receipt.receipt_date else '',
        'notes': receipt.notes,
        'status': receipt.status,
        'items': items_data,
        'total_amount': total_amount,
        'created_at': receipt.created_at.strftime('%Y-%m-%d %H:%M') if receipt.created_at else None,
    }
    
    return inertia_render(request, 'Inventory/Receipts/View', {
        'receipt': receipt_data
    })

@csrf_exempt
@manager_or_ceo_required
@require_POST
def receipt_update_status(request, receipt_id):
    """Update receipt status and add stock when received"""
    try:
        receipt = get_object_or_404(Receipt, id=receipt_id)
        data = json.loads(request.body)
        old_status = receipt.status
        new_status = data.get('status')
        
        print(f"[RECEIPT STATUS] Receipt {receipt_id}: {old_status} → {new_status}")
        
        if new_status not in ['pending', 'received', 'cancelled']:
            return JsonResponse({
                'success': False,
                'errors': 'Invalid status. Must be: pending, received, or cancelled.'
            }, status=400)
        
        # Add stock when changing to received
        if new_status == 'received' and old_status != 'received':
            items = ReceiptItem.objects.filter(receipt=receipt).select_related('product')
            
            for item in items:
                product = item.product
                product.stock_quantity += item.quantity
                product.save()
                print(f"[STOCK ADDED] {item.quantity}x {product.name} - New stock: {product.stock_quantity}")
        
        # Remove stock if changing from received back to another status
        elif old_status == 'received' and new_status != 'received':
            items = ReceiptItem.objects.filter(receipt=receipt).select_related('product')
            
            for item in items:
                product = item.product
                product.stock_quantity -= item.quantity
                product.save()
                print(f"[STOCK REMOVED] {item.quantity}x {product.name} - New stock: {product.stock_quantity}")
        
        receipt.status = new_status
        receipt.save()
        
        print(f"[RECEIPT STATUS] Success!")
        
        return JsonResponse({
            'success': True,
            'message': f'Receipt {receipt.receipt_number} status updated to {new_status}' +
                      (' and stock added to inventory' if new_status == 'received' and old_status != 'received' else '')
        })
        
    except Exception as e:
        import traceback
        print(f"[ERROR] Receipt status update failed: {str(e)}")
        traceback.print_exc()
        return JsonResponse({'success': False, 'errors': f'Failed to update status: {str(e)}'}, status=500)

@csrf_exempt
@manager_or_ceo_required
@require_POST
def receipt_delete(request, receipt_id):
    """Delete receipt"""

    try:
        receipt = get_object_or_404(
            Receipt,
            id=receipt_id
        )

        receipt_number = receipt.receipt_number

        # Remove stock if status was received
        if receipt.status == 'received':

            items = ReceiptItem.objects.filter(
                receipt=receipt
            ).select_related('product')

            for item in items:

                product = item.product

                product.stock_quantity -= item.quantity

                product.save()

                print(
                    f"[STOCK REMOVED] "
                    f"{item.quantity}x "
                    f"{product.name}"
                )

        receipt.delete()

        messages.success(
            request,
            f'Receipt {receipt_number} '
            f'deleted successfully!'
        )

        return redirect(
            '/inventory/receipts/'
        )

    except Exception as e:

        import traceback

        traceback.print_exc()

        messages.error(
            request,
            f'Failed to delete receipt: {str(e)}'
        )

        return redirect(
            '/inventory/receipts/'
        )


# ==================== DELIVERY NOTE VIEWS ====================

@manager_or_ceo_required
def delivery_note_list(request):
    """List all delivery notes with pagination"""
    delivery_notes = DeliveryNote.objects.select_related('client', 'proforma').all().order_by('-created_at')
    
    page = request.GET.get('page', 1)
    per_page = request.GET.get('per_page', 10)
    
    paginator = Paginator(delivery_notes, per_page)
    
    try:
        note_page = paginator.page(page)
    except PageNotAnInteger:
        note_page = paginator.page(1)
    except EmptyPage:
        note_page = paginator.page(paginator.num_pages)
    
    notes_data = []
    for note in note_page:
        items = DeliveryNoteItem.objects.filter(delivery_note=note)
        item_count = items.count()
        total_amount = sum(item.quantity * item.unit_price for item in items)
        
        notes_data.append({
            'id': note.id,
            'note_number': note.note_number,
            'client_name': note.client.name,
            'proforma_number': note.proforma.proforma_number if note.proforma else None,
            'delivery_date': note.delivery_date.strftime('%Y-%m-%d') if note.delivery_date else None,
            'item_count': item_count,
            'total_amount': float(total_amount),
            'created_at': note.created_at.strftime('%Y-%m-%d %H:%M') if note.created_at else None,
        })
    
    return inertia_render(request, 'Inventory/DeliveryNotes/List', {
        'delivery_notes': notes_data,
        'pagination': {
            'current_page': note_page.number,
            'total_pages': paginator.num_pages,
            'per_page': int(per_page),
            'total_items': paginator.count,
            'has_previous': note_page.has_previous(),
            'has_next': note_page.has_next(),
            'previous_page': note_page.previous_page_number() if note_page.has_previous() else None,
            'next_page': note_page.next_page_number() if note_page.has_next() else None,
        }
    })


@manager_or_ceo_required
def delivery_note_view(request, note_id):
    """View delivery note details"""
    note = get_object_or_404(DeliveryNote.objects.select_related('client', 'proforma'), id=note_id)
    items = DeliveryNoteItem.objects.filter(delivery_note=note).select_related('product')
    
    items_data = [{
        'product_name': item.product.name,
        'product_reference': item.product.reference,
        'quantity': item.quantity,
        'unit_price': float(item.unit_price),
        'total': float(item.quantity * item.unit_price)
    } for item in items]
    
    total_amount = sum(item['total'] for item in items_data)
    
    note_data = {
        'id': note.id,
        'note_number': note.note_number,
        'client_name': note.client.name,
        'client_address': note.client.address if note.client.address else '',
        'client_phone': note.client.phone if note.client.phone else '',
        'client_email': note.client.email if note.client.email else '',
        'proforma_number': note.proforma.proforma_number if note.proforma else 'N/A',
        'delivery_date': note.delivery_date.strftime('%Y-%m-%d') if note.delivery_date else '',
        'notes': note.notes,
        'items': items_data,
        'total_amount': total_amount,
        'created_at': note.created_at.strftime('%Y-%m-%d %H:%M') if note.created_at else None,
    }
    
    return inertia_render(request, 'Inventory/DeliveryNotes/View', {
        'delivery_note': note_data,
        'company_info': {
            'name': 'GOLD OIL TRADING LTD',
            'address': 'Douala, Cameroon',
            'phone': '+237 XXX XXX XXX',
            'email': 'contact@goldoil.cm',
        }
    })


@manager_or_ceo_required
def delivery_note_print(request, note_id):
    """Print-friendly HTML view"""
    note = get_object_or_404(DeliveryNote.objects.select_related('client', 'proforma'), id=note_id)
    items = DeliveryNoteItem.objects.filter(delivery_note=note).select_related('product')
    
    items_data = [{
        'product_name': item.product.name,
        'product_reference': item.product.reference,
        'quantity': item.quantity,
        'unit_price': float(item.unit_price),
        'total': float(item.quantity * item.unit_price)
    } for item in items]
    
    total_amount = sum(item['total'] for item in items_data)
    
    context = {
        'note': {
            'note_number': note.note_number,
            'delivery_date': note.delivery_date.strftime('%d/%m/%Y') if note.delivery_date else 'N/A',
            'proforma_number': note.proforma.proforma_number if note.proforma else 'N/A',
            'notes': note.notes,
            'client_name': note.client.name,
            'client_address': note.client.address if note.client.address else '',
            'client_phone': note.client.phone if note.client.phone else '',
        },
        'items': items_data,
        'total_amount': total_amount,
        'company_name': 'GOLD OIL TRADING LTD',
        'company_address': 'Yaoundé, Cameroon',
        'company_phone': '+237 XXX XXX XXX',
        'company_email': 'contact@goldoil.cm',
    }
    
    return inertia_render(request, 'Inventory/DeliveryNotes/Print', context)



def delivery_note_download_pdf(request, note_id):
    """Download delivery note as PDF"""
    try:
        from reportlab.lib import colors
        from reportlab.lib.pagesizes import A4
        from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer
        from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
        from reportlab.lib.units import inch
        from reportlab.lib.enums import TA_CENTER
        
        note = get_object_or_404(DeliveryNote.objects.select_related('client', 'proforma'), id=note_id)
        items = DeliveryNoteItem.objects.filter(delivery_note=note).select_related('product')
        
        buffer = io.BytesIO()
        doc = SimpleDocTemplate(buffer, pagesize=A4, topMargin=0.5*inch, bottomMargin=0.5*inch)
        
        elements = []
        styles = getSampleStyleSheet()
        
        company_style = ParagraphStyle(
            'CompanyHeader',
            parent=styles['Heading1'],
            fontSize=18,
            textColor=colors.HexColor('#059669'),
            alignment=TA_CENTER,
            spaceAfter=5,
            fontName='Helvetica-Bold'
        )
        
        title_style = ParagraphStyle(
            'Title',
            parent=styles['Heading1'],
            fontSize=16,
            textColor=colors.HexColor('#059669'),
            alignment=TA_CENTER,
            spaceAfter=20,
            fontName='Helvetica-Bold'
        )
        
        elements.append(Paragraph("GOLD OIL TRADING LTD", company_style))
        elements.append(Paragraph("Yaoundé, Cameroon | Tel: +237 XXX XXX XXX", styles['Normal']))
        elements.append(Spacer(1, 20))
        
        elements.append(Paragraph("BON DE LIVRAISON / DELIVERY NOTE", title_style))
        
        info_data = [
            ['Delivery Note:', note.note_number, 'Date:', note.delivery_date.strftime('%d/%m/%Y') if note.delivery_date else 'N/A'],
            ['Proforma Invoice:', note.proforma.proforma_number if note.proforma else 'N/A', '', ''],
            ['', '', '', ''],
            ['Client:', note.client.name, '', ''],
            ['Address:', note.client.address if note.client.address else 'N/A', '', ''],
            ['Phone:', note.client.phone if note.client.phone else 'N/A', '', ''],
        ]
        
        info_table = Table(info_data, colWidths=[1.5*inch, 2.5*inch, 1*inch, 1.5*inch])
        info_table.setStyle(TableStyle([
            ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
            ('FONTNAME', (2, 0), (2, 0), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, -1), 9),
            ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ]))
        
        elements.append(info_table)
        elements.append(Spacer(1, 20))
        
        items_data = [['#', 'Product', 'Reference', 'Qty', 'Unit Price (FCFA)', 'Total (FCFA)']]
        
        total = Decimal('0')
        for i, item in enumerate(items, 1):
            item_total = item.quantity * item.unit_price
            total += item_total
            items_data.append([
                str(i),
                item.product.name,
                item.product.reference,
                str(item.quantity),
                f"{item.unit_price:,.0f}",
                f"{item_total:,.0f}"
            ])
        
        items_data.append(['', '', '', '', 'TOTAL:', f"{total:,.0f}"])
        
        items_table = Table(items_data, colWidths=[0.4*inch, 2.2*inch, 1*inch, 0.6*inch, 1.2*inch, 1.2*inch])
        items_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#059669')),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, 0), 9),
            ('BOTTOMPADDING', (0, 0), (-1, 0), 8),
            ('FONTSIZE', (0, 1), (-1, -2), 8),
            ('GRID', (0, 0), (-1, -2), 0.5, colors.grey),
            ('ALIGN', (3, 1), (-1, -1), 'RIGHT'),
            ('ALIGN', (0, 1), (2, -1), 'LEFT'),
            ('FONTNAME', (0, -1), (-1, -1), 'Helvetica-Bold'),
            ('FONTSIZE', (0, -1), (-1, -1), 10),
            ('BACKGROUND', (0, -1), (-1, -1), colors.HexColor('#F0FDF4')),
            ('LINEABOVE', (0, -1), (-1, -1), 1.5, colors.HexColor('#059669')),
        ]))
        
        elements.append(items_table)
        elements.append(Spacer(1, 20))
        
        if note.notes:
            elements.append(Paragraph(f"<b>Notes:</b> {note.notes}", styles['Normal']))
            elements.append(Spacer(1, 20))
        
        sig_data = [
            ['Client Signature', '', 'Company Representative'],
            ['', '', ''],
            ['_______________________', '', '_______________________'],
        ]
        
        sig_table = Table(sig_data, colWidths=[2.5*inch, 1*inch, 2.5*inch])
        sig_table.setStyle(TableStyle([
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, -1), 9),
            ('ALIGN', (0, 0), (0, -1), 'LEFT'),
            ('ALIGN', (-1, 0), (-1, -1), 'RIGHT'),
            ('VALIGN', (0, 0), (-1, -1), 'BOTTOM'),
        ]))
        
        elements.append(Spacer(1, 40))
        elements.append(sig_table)
        
        doc.build(elements)
        
        pdf = buffer.getvalue()
        buffer.close()
        
        response = HttpResponse(content_type='application/pdf')
        response['Content-Disposition'] = f'attachment; filename="DeliveryNote_{note.note_number}.pdf"'
        response.write(pdf)
        
        return response
        
    except ImportError:
        return JsonResponse({
            'success': False,
            'errors': 'ReportLab not installed. Run: pip install reportlab --break-system-packages'
        }, status=500)
    except Exception as e:
        import traceback
        traceback.print_exc()
        return JsonResponse({'success': False, 'errors': f'Failed to generate PDF: {str(e)}'}, status=500)

@csrf_exempt
@manager_or_ceo_required
@require_POST
def delivery_note_delete(request, note_id):
    """Delete delivery note"""

    try:
        note = get_object_or_404(
            DeliveryNote,
            id=note_id
        )

        note_number = note.note_number

        # Check if linked proforma is delivered
        if (
            note.proforma
            and note.proforma.status == 'delivered'
        ):

            messages.error(
                request,
                'Cannot delete delivery note. '
                'The proforma invoice is marked as delivered. '
                'Change proforma status first.'
            )

            return redirect(
                '/inventory/delivery-notes/'
            )

        # Restore stock
        items = DeliveryNoteItem.objects.filter(
            delivery_note=note
        ).select_related('product')

        for item in items:

            product = item.product

            product.stock_quantity += item.quantity

            product.save()

            print(
                f"[STOCK RESTORED] "
                f"{item.quantity}x "
                f"{product.name}"
            )

        note.delete()

        messages.success(
            request,
            f'Delivery note {note_number} deleted successfully '
            f'and stock restored!'
        )

        return redirect(
            '/inventory/delivery-notes/'
        )

    except Exception as e:

        import traceback

        traceback.print_exc()

        messages.error(
            request,
            f'Failed to delete delivery note: {str(e)}'
        )

        return redirect(
            '/inventory/delivery-notes/'
        )



# ==================== CATEGORY MANAGEMENT ====================

@manager_or_ceo_required
def category_list(request):
    """List all categories with their subcategories"""
    categories = Category.objects.all().order_by('name')
    
    categories_data = []
    for category in categories:
        subcategories = Subcategory.objects.filter(category=category)
        categories_data.append({
            'id': category.id,
            'name': category.name,
            'subcategory_count': subcategories.count(),
            'subcategories': [{'id': s.id, 'name': s.name} for s in subcategories]
        })
    
    return inertia_render(request, 'Inventory/Categories/List', {
        'categories': categories_data
    })


@csrf_exempt
@manager_or_ceo_required
def category_create(request):
    """Create a new category"""

    if request.method == 'GET':
        return inertia_render(
            request,
            'Inventory/Categories/Create',
            {}
        )

    elif request.method == 'POST':
        try:
            data = json.loads(request.body)

            if Category.objects.filter(
                name=data.get('name')
            ).exists():

                messages.error(
                    request,
                    'Category with this name already exists'
                )

                return redirect(
                    '/inventory/categories/create/'
                )

            category = Category.objects.create(
                name=data.get('name')
            )

            messages.success(
                request,
                f'Category "{category.name}" created successfully!'
            )

            return redirect(
                '/inventory/categories/'
            )

        except Exception as e:
            import traceback

            traceback.print_exc()

            messages.error(
                request,
                f'Failed to create category: {str(e)}'
            )

            return redirect(
                '/inventory/categories/create/'
            )


@csrf_exempt
@manager_or_ceo_required
def category_update(request, category_id):
    """Update a category"""

    category = get_object_or_404(
        Category,
        id=category_id
    )

    if request.method == 'GET':

        category_data = {
            'id': category.id,
            'name': category.name
        }

        return inertia_render(
            request,
            'Inventory/Categories/Update',
            {
                'category': category_data
            }
        )

    elif request.method == 'POST':

        try:

            data = json.loads(request.body)

            if Category.objects.filter(
                name=data.get('name')
            ).exclude(
                id=category_id
            ).exists():

                messages.error(
                    request,
                    'Category with this name already exists'
                )

                return redirect(
                    f'/inventory/categories/{category_id}/update/'
                )

            category.name = data.get(
                'name',
                category.name
            )

            category.save()

            messages.success(
                request,
                f'Category "{category.name}" updated successfully!'
            )

            return redirect(
                '/inventory/categories/'
            )

        except Exception as e:

            import traceback

            traceback.print_exc()

            messages.error(
                request,
                f'Failed to update category: {str(e)}'
            )

            return redirect(
                f'/inventory/categories/{category_id}/update/'
            )




@csrf_exempt
@manager_or_ceo_required
@require_POST
def category_delete(request, category_id):
    """Delete a category while keeping associated products"""

    try:
        category = get_object_or_404(
            Category,
            id=category_id
        )

        category_name = category.name

        products = category.baseproduct_set.all()
        product_count = products.count()

        # Delete only the category.
        # Because BaseProduct.category uses SET_NULL,
        # associated products will remain without a category.
        category.delete()

        messages.success(
            request,
            f'Category "{category_name}" deleted successfully! '
            f'{product_count} associated product(s) were kept.'
        )

        return redirect(
            '/inventory/categories/'
        )

    except Exception as e:
        import traceback

        traceback.print_exc()

        messages.error(
            request,
            f'Failed to delete category: {str(e)}'
        )

        return redirect(
            '/inventory/categories/'
        )



# ==================== SUBCATEGORY MANAGEMENT ====================

@manager_or_ceo_required
def subcategory_list(request):
    """List all subcategories"""
    subcategories = Subcategory.objects.select_related('category').all().order_by('category__name', 'name')
    
    subcategories_data = [{
        'id': s.id,
        'name': s.name,
        'category_id': s.category.id,
        'category_name': s.category.name,
        'product_count': s.baseproduct_set.count()
    } for s in subcategories]
    
    return inertia_render(request, 'Inventory/Subcategories/List', {
        'subcategories': subcategories_data
    })


@csrf_exempt
@manager_or_ceo_required
def subcategory_create(request):
    """Create a new subcategory"""

    if request.method == 'GET':
        categories = list(
            Category.objects.all().values('id', 'name')
        )

        return inertia_render(
            request,
            'Inventory/Subcategories/Create',
            {
                'categories': categories
            }
        )

    if request.method == 'POST':
        try:
            data = json.loads(request.body)

            category_id = data.get('category_id')
            name = data.get('name', '').strip()

            # -----------------------------
            # VALIDATION
            # -----------------------------

            if not category_id:
                messages.error(
                    request,
                    'Please select a category.'
                )

                return redirect(
                    '/inventory/subcategories/create/'
                )

            if not name:
                messages.error(
                    request,
                    'Please enter a subcategory name.'
                )

                return redirect(
                    '/inventory/subcategories/create/'
                )

            # Check category
            try:
                category = Category.objects.get(
                    id=category_id
                )

            except Category.DoesNotExist:
                messages.error(
                    request,
                    'The selected category does not exist.'
                )

                return redirect(
                    '/inventory/subcategories/create/'
                )

            # Check duplicate
            if Subcategory.objects.filter(
                category=category,
                name__iexact=name
            ).exists():

                messages.error(
                    request,
                    f'A subcategory named "{name}" already exists '
                    f'in "{category.name}".'
                )

                return redirect(
                    '/inventory/subcategories/create/'
                )

            # -----------------------------
            # CREATE
            # -----------------------------

            subcategory = Subcategory.objects.create(
                category=category,
                name=name
            )

            # -----------------------------
            # SUCCESS
            # -----------------------------

            messages.success(
                request,
                f'Subcategory "{subcategory.name}" '
                f'created successfully!'
            )

            return redirect(
                '/inventory/subcategories/'
            )

        except json.JSONDecodeError:

            messages.error(
                request,
                'Invalid request data.'
            )

            return redirect(
                '/inventory/subcategories/create/'
            )

        except Exception:
            import traceback

            traceback.print_exc()

            messages.error(
                request,
                'Something went wrong while creating '
                'the subcategory.'
            )

            return redirect(
                '/inventory/subcategories/create/'
            )

    return redirect(
        '/inventory/subcategories/create/'
    )



@csrf_exempt
@manager_or_ceo_required
def subcategory_update(request, subcategory_id):
    """Update a subcategory"""

    subcategory = get_object_or_404(
        Subcategory,
        id=subcategory_id
    )

    if request.method == 'GET':
        categories = list(
            Category.objects.all().values('id', 'name')
        )

        subcategory_data = {
            'id': subcategory.id,
            'name': subcategory.name,
            'category_id': subcategory.category.id
        }

        return inertia_render(
            request,
            'Inventory/Subcategories/Update',
            {
                'subcategory': subcategory_data,
                'categories': categories
            }
        )

    elif request.method == 'POST':
        try:
            data = json.loads(request.body)

            if Subcategory.objects.filter(
                category_id=data.get('category_id'),
                name=data.get('name')
            ).exclude(
                id=subcategory_id
            ).exists():

                messages.error(
                    request,
                    'Subcategory with this name already exists '
                    'in this category'
                )

                return redirect(
                    f'/inventory/subcategories/{subcategory_id}/update/'
                )

            subcategory.name = data.get(
                'name',
                subcategory.name
            )

            subcategory.category_id = data.get(
                'category_id',
                subcategory.category_id
            )

            subcategory.save()

            messages.success(
                request,
                f'Subcategory "{subcategory.name}" '
                f'updated successfully!'
            )

            return redirect(
                '/inventory/subcategories/'
            )

        except Exception as e:
            import traceback

            traceback.print_exc()

            messages.error(
                request,
                f'Failed to update subcategory: {str(e)}'
            )

            return redirect(
                f'/inventory/subcategories/{subcategory_id}/update/'
            )




@csrf_exempt
@manager_or_ceo_required
def subcategory_delete(request, subcategory_id):
    """Delete a subcategory"""

    try:
        subcategory = get_object_or_404(
            Subcategory,
            id=subcategory_id
        )

        subcategory_name = subcategory.name

        # Check if products are using this subcategory
        if subcategory.baseproduct_set.exists():

            product_count = (
                subcategory.baseproduct_set.count()
            )

            messages.error(
                request,
                f'Cannot delete subcategory '
                f'"{subcategory_name}". '
                f'It has {product_count} product(s). '
                f'Please delete or reassign the products first.'
            )

            return redirect(
                '/inventory/subcategories/'
            )

        # Delete the subcategory
        subcategory.delete()

        messages.success(
            request,
            f'Subcategory "{subcategory_name}" '
            f'deleted successfully!'
        )

        return redirect(
            '/inventory/subcategories/'
        )

    except Exception as e:
        import traceback

        traceback.print_exc()

        messages.error(
            request,
            f'Failed to delete subcategory: {str(e)}'
        )

        return redirect(
            '/inventory/subcategories/'
        )


# ==================== REPORTS ====================

@manager_or_ceo_required
def reports_dashboard(request):
    """Reports dashboard - main landing page"""
    return inertia_render(request, 'Inventory/Reports/Dashboard', {})


@manager_or_ceo_required
def reports_monthly(request):
    """Monthly reports with filters"""
    from datetime import datetime
    from dateutil.relativedelta import relativedelta
    
    # Get filter parameters
    year = request.GET.get('year', datetime.now().year)
    month = request.GET.get('month', datetime.now().month)
    
    try:
        year = int(year)
        month = int(month)
    except (ValueError, TypeError):
        year = datetime.now().year
        month = datetime.now().month
    
    # Date range for the month
    start_date = datetime(year, month, 1)
    if month == 12:
        end_date = datetime(year + 1, 1, 1)
    else:
        end_date = datetime(year, month + 1, 1)
    
    # Sales Data (Proformas delivered in this month)
    delivered_proformas = Proforma.objects.filter(
        date_created__gte=start_date,
        date_created__lt=end_date,
        status='delivered'
    )
    
    total_sales = sum([
        p.total_ttc if p.total_ttc else sum(
            item.quantity * item.unit_price for item in ProformaItem.objects.filter(proforma=p)
        ) * Decimal('1.1925')  # Add TVA
        for p in delivered_proformas
    ])
    
    sales_count = delivered_proformas.count()
    
    # Stock IN (Receipts received in this month)
    received_receipts = Receipt.objects.filter(
        created_at__gte=start_date,
        created_at__lt=end_date,
        status='received'
    )
    
    total_stock_in = sum([
        sum(item.quantity * item.unit_price for item in ReceiptItem.objects.filter(receipt=r))
        for r in received_receipts
    ])
    
    stock_in_count = received_receipts.count()
    
    # Top Products (by quantity sold)
    top_products_data = ProformaItem.objects.filter(
        proforma__date_created__gte=start_date,
        proforma__date_created__lt=end_date,
        proforma__status='delivered'
    ).values('product__name').annotate(
        total_quantity=Sum('quantity'),
        total_revenue=Sum(F('quantity') * F('unit_price'))
    ).order_by('-total_quantity')[:10]
    
    top_products = [{
        'name': item['product__name'],
        'quantity': item['total_quantity'],
        'revenue': float(item['total_revenue'])
    } for item in top_products_data]
    
    # Top Clients (by purchase value)
    top_clients_data = Proforma.objects.filter(
        date_created__gte=start_date,
        date_created__lt=end_date,
        status='delivered'
    ).values('client__name').annotate(
        total_purchases=Count('id'),
        total_value=Sum('total_ttc')
    ).order_by('-total_value')[:10]
    
    top_clients = [{
        'name': item['client__name'],
        'purchases': item['total_purchases'],
        'value': float(item['total_value']) if item['total_value'] else 0
    } for item in top_clients_data]
    
    # Low Stock Products
    low_stock = Product.objects.filter(stock_quantity__lt=10).values(
        'id', 'name', 'reference', 'stock_quantity', 'unit_price'
    ).order_by('stock_quantity')[:10]
    
    # Current stock value
    current_stock_value = Product.objects.aggregate(
        total=Sum(F('stock_quantity') * F('unit_price'))
    )['total'] or 0
    
    # Generate months list for filter
    months = [
        {'value': i, 'label': datetime(2000, i, 1).strftime('%B')}
        for i in range(1, 13)
    ]
    
    # Generate years list (last 5 years + current year)
    current_year = datetime.now().year
    years = [{'value': y, 'label': str(y)} for y in range(current_year - 4, current_year + 1)]
    
    return inertia_render(request, 'Inventory/Reports/MonthlyReport', {
        'filters': {
            'year': year,
            'month': month,
            'month_name': datetime(year, month, 1).strftime('%B %Y')
        },
        'summary': {
            'total_sales': float(total_sales),
            'sales_count': sales_count,
            'total_stock_in': float(total_stock_in),
            'stock_in_count': stock_in_count,
            'current_stock_value': float(current_stock_value),
            'low_stock_count': low_stock.count(),
        },
        'top_products': top_products,
        'top_clients': top_clients,
        'low_stock': list(low_stock),
        'months': months,
        'years': years,
    })


@manager_or_ceo_required
def reports_yearly(request):
    """Yearly reports with filters"""
    from datetime import datetime
    
    # Get filter parameter
    year = request.GET.get('year', datetime.now().year)
    
    try:
        year = int(year)
    except (ValueError, TypeError):
        year = datetime.now().year
    
    # Date range for the year
    start_date = datetime(year, 1, 1)
    end_date = datetime(year + 1, 1, 1)
    
    # Sales Data (Proformas delivered in this year)
    delivered_proformas = Proforma.objects.filter(
        date_created__gte=start_date,
        date_created__lt=end_date,
        status='delivered'
    )
    
    total_sales = sum([
        p.total_ttc if p.total_ttc else sum(
            item.quantity * item.unit_price for item in ProformaItem.objects.filter(proforma=p)
        ) * Decimal('1.1925')
        for p in delivered_proformas
    ])
    
    sales_count = delivered_proformas.count()
    
    # Stock IN (Receipts received in this year)
    received_receipts = Receipt.objects.filter(
        created_at__gte=start_date,
        created_at__lt=end_date,
        status='received'
    )
    
    total_stock_in = sum([
        sum(item.quantity * item.unit_price for item in ReceiptItem.objects.filter(receipt=r))
        for r in received_receipts
    ])
    
    stock_in_count = received_receipts.count()
    
    # Monthly breakdown
    monthly_data = []
    for month in range(1, 13):
        month_start = datetime(year, month, 1)
        if month == 12:
            month_end = datetime(year + 1, 1, 1)
        else:
            month_end = datetime(year, month + 1, 1)
        
        month_proformas = Proforma.objects.filter(
            date_created__gte=month_start,
            date_created__lt=month_end,
            status='delivered'
        )
        
        month_sales = sum([
            p.total_ttc if p.total_ttc else sum(
                item.quantity * item.unit_price for item in ProformaItem.objects.filter(proforma=p)
            ) * Decimal('1.1925')
            for p in month_proformas
        ])
        
        month_receipts = Receipt.objects.filter(
            created_at__gte=month_start,
            created_at__lt=month_end,
            status='received'
        )
        
        month_stock_in = sum([
            sum(item.quantity * item.unit_price for item in ReceiptItem.objects.filter(receipt=r))
            for r in month_receipts
        ])
        
        monthly_data.append({
            'month': month,
            'month_name': month_start.strftime('%B'),
            'sales': float(month_sales),
            'stock_in': float(month_stock_in),
            'orders': month_proformas.count(),
        })
    
    # Top Products (by quantity sold)
    top_products_data = ProformaItem.objects.filter(
        proforma__date_created__gte=start_date,
        proforma__date_created__lt=end_date,
        proforma__status='delivered'
    ).values('product__name').annotate(
        total_quantity=Sum('quantity'),
        total_revenue=Sum(F('quantity') * F('unit_price'))
    ).order_by('-total_quantity')[:10]
    
    top_products = [{
        'name': item['product__name'],
        'quantity': item['total_quantity'],
        'revenue': float(item['total_revenue'])
    } for item in top_products_data]
    
    # Top Clients (by purchase value)
    top_clients_data = Proforma.objects.filter(
        date_created__gte=start_date,
        date_created__lt=end_date,
        status='delivered'
    ).values('client__name').annotate(
        total_purchases=Count('id'),
        total_value=Sum('total_ttc')
    ).order_by('-total_value')[:10]
    
    top_clients = [{
        'name': item['client__name'],
        'purchases': item['total_purchases'],
        'value': float(item['total_value']) if item['total_value'] else 0
    } for item in top_clients_data]
    
    # Current stock value
    current_stock_value = Product.objects.aggregate(
        total=Sum(F('stock_quantity') * F('unit_price'))
    )['total'] or 0
    
    # Generate years list (last 10 years + current year)
    current_year = datetime.now().year
    years = [{'value': y, 'label': str(y)} for y in range(current_year - 9, current_year + 1)]
    
    return inertia_render(request, 'Inventory/Reports/YearlyReport', {
        'filters': {
            'year': year,
        },
        'summary': {
            'total_sales': float(total_sales),
            'sales_count': sales_count,
            'total_stock_in': float(total_stock_in),
            'stock_in_count': stock_in_count,
            'current_stock_value': float(current_stock_value),
        },
        'monthly_data': monthly_data,
        'top_products': top_products,
        'top_clients': top_clients,
        'years': years,
    })


@manager_or_ceo_required
def reports_download_monthly_pdf(request):
    """Download monthly report as PDF"""
    from datetime import datetime
    from reportlab.lib import colors
    from reportlab.lib.pagesizes import A4, landscape
    from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer
    from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
    from reportlab.lib.units import inch
    from reportlab.lib.enums import TA_CENTER
    
    year = int(request.GET.get('year', datetime.now().year))
    month = int(request.GET.get('month', datetime.now().month))
    
    start_date = datetime(year, month, 1)
    if month == 12:
        end_date = datetime(year + 1, 1, 1)
    else:
        end_date = datetime(year, month + 1, 1)
    
    buffer = io.BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=landscape(A4), topMargin=0.5*inch, bottomMargin=0.5*inch)
    
    elements = []
    styles = getSampleStyleSheet()
    
    title_style = ParagraphStyle(
        'Title',
        parent=styles['Heading1'],
        fontSize=18,
        textColor=colors.HexColor('#166534'),
        alignment=TA_CENTER,
        spaceAfter=20,
        fontName='Helvetica-Bold'
    )
    
    # Title
    month_name = start_date.strftime('%B %Y')
    elements.append(Paragraph(f"MONTHLY REPORT - {month_name.upper()}", title_style))
    elements.append(Paragraph("GOLD OIL TRADING LTD", styles['Normal']))
    elements.append(Spacer(1, 20))
    
    # Summary Section
    delivered_proformas = Proforma.objects.filter(
        date_created__gte=start_date,
        date_created__lt=end_date,
        status='delivered'
    )
    
    total_sales = sum([
        p.total_ttc if p.total_ttc else 0
        for p in delivered_proformas
    ])
    
    summary_data = [
        ['SUMMARY', '', '', ''],
        ['Total Sales:', f'{total_sales:,.0f} FCFA', 'Orders:', str(delivered_proformas.count())],
        ['Stock Value:', f'{Product.objects.aggregate(total=Sum(F("stock_quantity") * F("unit_price")))["total"] or 0:,.0f} FCFA', 'Low Stock Items:', str(Product.objects.filter(stock_quantity__lt=10).count())],
    ]
    
    summary_table = Table(summary_data, colWidths=[2*inch, 2*inch, 2*inch, 2*inch])
    summary_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#166534')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 12),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 10),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.grey),
    ]))
    
    elements.append(summary_table)
    elements.append(Spacer(1, 20))
    
    # Top Products
    top_products_data = ProformaItem.objects.filter(
        proforma__date_created__gte=start_date,
        proforma__date_created__lt=end_date,
        proforma__status='delivered'
    ).values('product__name').annotate(
        total_quantity=Sum('quantity'),
        total_revenue=Sum(F('quantity') * F('unit_price'))
    ).order_by('-total_quantity')[:10]
    
    products_table_data = [['TOP 10 PRODUCTS', 'QUANTITY SOLD', 'REVENUE (FCFA)']]
    for item in top_products_data:
        products_table_data.append([
            item['product__name'],
            str(item['total_quantity']),
            f"{item['total_revenue']:,.0f}"
        ])
    
    products_table = Table(products_table_data, colWidths=[4*inch, 2*inch, 2*inch])
    products_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#166534')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('ALIGN', (1, 1), (-1, -1), 'RIGHT'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, -1), 9),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.grey),
    ]))
    
    elements.append(products_table)
    
    doc.build(elements)
    
    pdf = buffer.getvalue()
    buffer.close()
    
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = f'attachment; filename="Monthly_Report_{month_name}.pdf"'
    response.write(pdf)
    
    return response


@manager_or_ceo_required
def reports_download_yearly_pdf(request):
    """Download yearly report as PDF"""
    from datetime import datetime
    from reportlab.lib import colors
    from reportlab.lib.pagesizes import A4, landscape
    from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer
    from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
    from reportlab.lib.units import inch
    from reportlab.lib.enums import TA_CENTER
    
    year = int(request.GET.get('year', datetime.now().year))
    
    start_date = datetime(year, 1, 1)
    end_date = datetime(year + 1, 1, 1)
    
    buffer = io.BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=landscape(A4), topMargin=0.5*inch, bottomMargin=0.5*inch)
    
    elements = []
    styles = getSampleStyleSheet()
    
    title_style = ParagraphStyle(
        'Title',
        parent=styles['Heading1'],
        fontSize=18,
        textColor=colors.HexColor('#166534'),
        alignment=TA_CENTER,
        spaceAfter=20,
        fontName='Helvetica-Bold'
    )
    
    elements.append(Paragraph(f"YEARLY REPORT - {year}", title_style))
    elements.append(Paragraph("GOLD OIL TRADING LTD", styles['Normal']))
    elements.append(Spacer(1, 20))
    
    # Summary Section
    delivered_proformas = Proforma.objects.filter(
        date_created__gte=start_date,
        date_created__lt=end_date,
        status='delivered'
    )
    
    total_sales = sum([p.total_ttc if p.total_ttc else 0 for p in delivered_proformas])
    
    summary_data = [
        ['YEARLY SUMMARY', '', '', ''],
        ['Total Sales:', f'{total_sales:,.0f} FCFA', 'Total Orders:', str(delivered_proformas.count())],
    ]
    
    summary_table = Table(summary_data, colWidths=[2*inch, 3*inch, 2*inch, 2*inch])
    summary_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#166534')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.grey),
    ]))
    
    elements.append(summary_table)
    elements.append(Spacer(1, 20))
    
    # Monthly Breakdown
    monthly_table_data = [['MONTH', 'SALES (FCFA)', 'ORDERS']]
    for month in range(1, 13):
        month_start = datetime(year, month, 1)
        if month == 12:
            month_end = datetime(year + 1, 1, 1)
        else:
            month_end = datetime(year, month + 1, 1)
        
        month_proformas = Proforma.objects.filter(
            date_created__gte=month_start,
            date_created__lt=month_end,
            status='delivered'
        )
        
        month_sales = sum([p.total_ttc if p.total_ttc else 0 for p in month_proformas])
        
        monthly_table_data.append([
            month_start.strftime('%B'),
            f"{month_sales:,.0f}",
            str(month_proformas.count())
        ])
    
    monthly_table = Table(monthly_table_data, colWidths=[2*inch, 3*inch, 2*inch])
    monthly_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#166534')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('ALIGN', (1, 1), (-1, -1), 'RIGHT'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.grey),
    ]))
    
    elements.append(monthly_table)
    
    doc.build(elements)
    
    pdf = buffer.getvalue()
    buffer.close()
    
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = f'attachment; filename="Yearly_Report_{year}.pdf"'
    response.write(pdf)
    
    return response



@csrf_exempt
@manager_or_ceo_required
def supplier_list(request):
    """Display all suppliers"""

    suppliers = list(
        Supplier.objects.all().values(
            'id',
            'name',
            'email',
            'phone',
            'address'
        )
    )

    return inertia_render(
        request,
        'Inventory/Suppliers/List',
        {
            'suppliers': suppliers
        }
    )


@csrf_exempt
@manager_or_ceo_required
def supplier_create(request):
    """Create a new supplier"""

    if request.method == 'GET':

        return inertia_render(
            request,
            'Inventory/Suppliers/Create',
            {}
        )

    elif request.method == 'POST':

        try:
            data = json.loads(request.body)

            name = data.get(
                'name',
                ''
            ).strip()

            email = data.get(
                'email',
                ''
            ).strip()

            phone = data.get(
                'phone',
                ''
            ).strip()

            address = data.get(
                'address',
                ''
            ).strip()

            if not name:

                messages.error(
                    request,
                    'Supplier name is required.'
                )

                return redirect(
                    '/inventory/suppliers/create/'
                )

            supplier = Supplier.objects.create(
                name=name,
                email=email or None,
                phone=phone or None,
                address=address or None
            )

            messages.success(
                request,
                f'Supplier "{supplier.name}" '
                f'created successfully!'
            )

            return redirect(
                '/inventory/suppliers/'
            )

        except json.JSONDecodeError:

            messages.error(
                request,
                'Invalid request data.'
            )

            return redirect(
                '/inventory/suppliers/create/'
            )

        except Exception as e:

            import traceback
            traceback.print_exc()

            messages.error(
                request,
                f'Failed to create supplier: {str(e)}'
            )

            return redirect(
                '/inventory/suppliers/create/'
            )


@csrf_exempt
@manager_or_ceo_required
def supplier_update(request, supplier_id):
    """Update a supplier"""

    supplier = get_object_or_404(
        Supplier,
        id=supplier_id
    )

    if request.method == 'GET':

        supplier_data = {
            'id': supplier.id,
            'name': supplier.name,
            'email': supplier.email or '',
            'phone': supplier.phone or '',
            'address': supplier.address or ''
        }

        return inertia_render(
            request,
            'Inventory/Suppliers/Update',
            {
                'supplier': supplier_data
            }
        )

    elif request.method == 'POST':

        try:
            data = json.loads(request.body)

            name = data.get(
                'name',
                supplier.name
            ).strip()

            email = data.get(
                'email',
                ''
            ).strip()

            phone = data.get(
                'phone',
                ''
            ).strip()

            address = data.get(
                'address',
                ''
            ).strip()

            if not name:

                messages.error(
                    request,
                    'Supplier name is required.'
                )

                return redirect(
                    f'/inventory/suppliers/{supplier_id}/update/'
                )

            supplier.name = name
            supplier.email = email or None
            supplier.phone = phone or None
            supplier.address = address or None

            supplier.save()

            messages.success(
                request,
                f'Supplier "{supplier.name}" '
                f'updated successfully!'
            )

            return redirect(
                '/inventory/suppliers/'
            )

        except json.JSONDecodeError:

            messages.error(
                request,
                'Invalid request data.'
            )

            return redirect(
                f'/inventory/suppliers/{supplier_id}/update/'
            )

        except Exception as e:

            import traceback
            traceback.print_exc()

            messages.error(
                request,
                f'Failed to update supplier: {str(e)}'
            )

            return redirect(
                f'/inventory/suppliers/{supplier_id}/update/'
            )


@csrf_exempt
@manager_or_ceo_required
def supplier_delete(request, supplier_id):
    """Delete a supplier"""

    try:

        supplier = get_object_or_404(
            Supplier,
            id=supplier_id
        )

        supplier_name = supplier.name

        supplier.delete()

        messages.success(
            request,
            f'Supplier "{supplier_name}" '
            f'deleted successfully!'
        )

        return redirect(
            '/inventory/suppliers/'
        )

    except Exception as e:

        import traceback
        traceback.print_exc()

        messages.error(
            request,
            f'Failed to delete supplier: {str(e)}'
        )

        return redirect(
            '/inventory/suppliers/'
        )

