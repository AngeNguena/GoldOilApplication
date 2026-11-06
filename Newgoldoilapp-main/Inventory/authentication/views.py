
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from django.core.mail import send_mail
from django.http import JsonResponse
from django.shortcuts import redirect
from django.urls import reverse
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.contrib.auth.tokens import default_token_generator
from django.views.decorators.csrf import ensure_csrf_cookie
from inertia import render as inertia_render
from decimal import Decimal
from django.db.models import Count, Sum
from django.db.models.functions import Coalesce
from django.utils import timezone
from inertia import render as inertia_render
from .models import CustomUser
from ecommerce.models import Order, OrderItem
from inventory.models import Product
import json

from .models import CustomUser


# ============================================================
# CSRF TOKEN
# ============================================================

@ensure_csrf_cookie
def csrf_token(request):
    return JsonResponse({"success": True})


# ============================================================
# LOGIN
# ============================================================

def login_view(request):

    if request.user.is_authenticated:
        if request.user.role in ["manager", "ceo"]:
            return redirect("/auth/admin-dashboard/")

        return redirect("/auth/dashboard/")

    # GET
    if request.method == "GET":
        return inertia_render(
            request,
            "Authentication/Login",
            props={
                "errors": {},
            },
        )

    # POST
    if request.method == "POST":

        username = ""
        password = ""

        # ----------------------------------------------------
        # JSON request
        # ----------------------------------------------------
        if request.content_type == "application/json":

            try:
                import json

                data = json.loads(
                    request.body.decode("utf-8")
                )

                username = str(
                    data.get("username", "")
                ).strip()

                password = str(
                    data.get("password", "")
                )

            except (
                json.JSONDecodeError,
                TypeError,
            ):
                pass

        # ----------------------------------------------------
        # Form / Inertia request
        # ----------------------------------------------------
        else:

            username = request.POST.get(
                "username",
                "",
            ).strip()

            password = request.POST.get(
                "password",
                ""
            )

        errors = {}

        # ----------------------------------------------------
        # Validation
        # ----------------------------------------------------

        if not username:
            errors["username"] = "Username is required."

        if not password:
            errors["password"] = "Password is required."

        if errors:
            return inertia_render(
                request,
                "Authentication/Login",
                props={
                    "errors": errors,
                },
            )

        # ----------------------------------------------------
        # Authenticate
        # ----------------------------------------------------

        user = authenticate(
            request,
            username=username,
            password=password,
        )

        if user is None:
            return inertia_render(
                request,
                "Authentication/Login",
                props={
                    "errors": {
                        "login": "Invalid username or password."
                    },
                },
            )

        # ----------------------------------------------------
        # Login
        # ----------------------------------------------------

        login(request, user)

        # ----------------------------------------------------
        # Redirect based on role
        # ----------------------------------------------------

        if user.role in ["manager", "ceo"]:
            return redirect("/inventory/dashboard/")

        return redirect("/")

    return JsonResponse(
        {
            "success": False,
            "errors": "Method not allowed.",
        },
        status=405,
    )

# ============================================================
# REGISTER
# ============================================================

def register_view(request):

    if request.user.is_authenticated:

        if request.user.role in ["manager", "ceo"]:
            return redirect("/inventory/dashboard/")

        return redirect("/")

    # ========================================================
    # GET
    # ========================================================

    if request.method == "GET":

        return inertia_render(
            request,
            "Authentication/Register",
            props={
                "errors": {},
                "form": {
                    "username": "",
                    "email": "",
                    "first_name": "",
                    "last_name": "",
                },
            },
        )

    # ========================================================
    # POST
    # ========================================================

    if request.method == "POST":

        username = ""
        email = ""
        first_name = ""
        last_name = ""
        password = ""
        password_confirmation = ""

        # ----------------------------------------------------
        # JSON request
        # ----------------------------------------------------

        if request.content_type == "application/json":

            try:
                import json

                data = json.loads(
                    request.body.decode("utf-8")
                )

                username = str(
                    data.get("username", "")
                ).strip()

                email = str(
                    data.get("email", "")
                ).strip()

                first_name = str(
                    data.get("first_name", "")
                ).strip()

                last_name = str(
                    data.get("last_name", "")
                ).strip()

                password = str(
                    data.get("password", "")
                )

                password_confirmation = str(
                    data.get("password_confirmation", "")
                )

            except (
                json.JSONDecodeError,
                TypeError,
            ):
                pass

        # ----------------------------------------------------
        # Form / Inertia request
        # ----------------------------------------------------

        else:

            username = request.POST.get(
                "username",
                "",
            ).strip()

            email = request.POST.get(
                "email",
                "",
            ).strip()

            first_name = request.POST.get(
                "first_name",
                "",
            ).strip()

            last_name = request.POST.get(
                "last_name",
                "",
            ).strip()

            password = request.POST.get(
                "password",
                "",
            )

            password_confirmation = request.POST.get(
                "password_confirmation",
                "",
            )

        errors = {}

        # ====================================================
        # REQUIRED FIELDS
        # ====================================================

        if not username:
            errors["username"] = "Username is required."

        if not email:
            errors["email"] = "Email is required."

        if not password:
            errors["password"] = "Password is required."

        if not password_confirmation:
            errors["password_confirmation"] = (
                "Please confirm your password."
            )

        # ====================================================
        # PASSWORD MATCH
        # ====================================================

        if (
            password
            and password_confirmation
            and password != password_confirmation
        ):
            errors["password_confirmation"] = (
                "Passwords do not match."
            )

        # ====================================================
        # USERNAME
        # ====================================================

        if username and CustomUser.objects.filter(
            username=username
        ).exists():

            errors["username"] = (
                "This username is already taken."
            )

        # ====================================================
        # EMAIL
        # ====================================================

        if email and CustomUser.objects.filter(
            email=email
        ).exists():

            errors["email"] = (
                "This email is already registered."
            )

        # ====================================================
        # RETURN VALIDATION ERRORS
        # ====================================================

        if errors:

            return inertia_render(
                request,
                "Authentication/Register",
                props={
                    "errors": errors,
                    "form": {
                        "username": username,
                        "email": email,
                        "first_name": first_name,
                        "last_name": last_name,
                    },
                },
            )

        # ====================================================
        # CREATE CUSTOMER
        # ====================================================

        user = CustomUser.objects.create_user(
            username=username,
            email=email,
            first_name=first_name,
            last_name=last_name,
            password=password,
            role="customer",
        )

        # ====================================================
        # LOGIN
        # ====================================================

        login(request, user)

        return redirect("")

    # ========================================================
    # METHOD NOT ALLOWED
    # ========================================================

    return JsonResponse(
        {
            "success": False,
            "errors": "Method not allowed.",
        },
        status=405,
    )
# ============================================================
# DASHBOARD
# ============================================================

@login_required(login_url="/auth/login/")
def dashboard_view(request):

    user = request.user

    user_data = {
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "role": user.role,
        "date_joined": user.date_joined.strftime(
            "%B %d, %Y"
        ),
    }

    return inertia_render(
        request,
        "Authentication/Dashboard",
        props={
            "user": user_data,
        },
    )


# ============================================================
# VIEW PROFILE
# ============================================================

@login_required(login_url="/auth/login/")
def profile_view(request):

    user = request.user

    user_data = {
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "role": user.role,
        "date_joined": user.date_joined.strftime(
            "%B %d, %Y"
        ),
    }

    return inertia_render(
        request,
        "Authentication/Profile",
        props={
            "user": user_data,
        },
    )


# ============================================================
# EDIT PROFILE
# ============================================================

@login_required(login_url="/auth/login/")
def edit_profile_view(request):

    user = request.user

    # --------------------------------------------------------
    # GET
    # --------------------------------------------------------

    if request.method == "GET":

        user_data = {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "role": user.role,
        }

        return inertia_render(
            request,
            "Authentication/EditProfile",
            props={
                "user": user_data,
                "errors": {},
            },
        )

    # --------------------------------------------------------
    # PUT / POST / PATCH
    # --------------------------------------------------------

    if request.method in ["PUT", "POST", "PATCH"]:

        username = ""
        email = ""
        first_name = ""
        last_name = ""

        # JSON
        if request.content_type == "application/json":

            try:
                import json

                data = json.loads(
                    request.body.decode("utf-8")
                )

                username = str(
                    data.get("username", "")
                ).strip()

                email = str(
                    data.get("email", "")
                ).strip()

                first_name = str(
                    data.get("first_name", "")
                ).strip()

                last_name = str(
                    data.get("last_name", "")
                ).strip()

            except (
                json.JSONDecodeError,
                TypeError,
            ):
                pass

        # Form encoded
        else:

            from urllib.parse import parse_qs

            try:

                body = request.body.decode("utf-8")
                data = parse_qs(body)

                username = data.get(
                    "username",
                    [""],
                )[0].strip()

                email = data.get(
                    "email",
                    [""],
                )[0].strip()

                first_name = data.get(
                    "first_name",
                    [""],
                )[0].strip()

                last_name = data.get(
                    "last_name",
                    [""],
                )[0].strip()

            except Exception:
                pass

        errors = {}

        # Username
        if not username:

            errors["username"] = (
                "Username is required."
            )

        elif CustomUser.objects.filter(
            username=username
        ).exclude(id=user.id).exists():

            errors["username"] = (
                "This username is already taken."
            )

        # Email
        if not email:

            errors["email"] = (
                "Email is required."
            )

        elif CustomUser.objects.filter(
            email=email
        ).exclude(id=user.id).exists():

            errors["email"] = (
                "This email is already in use."
            )

        # Validation errors
        if errors:

            user_data = {
                "id": user.id,
                "username": username,
                "email": email,
                "first_name": first_name,
                "last_name": last_name,
                "role": user.role,
            }

            return inertia_render(
                request,
                "Authentication/EditProfile",
                props={
                    "user": user_data,
                    "errors": errors,
                },
            )

        # Save
        user.username = username
        user.email = email
        user.first_name = first_name
        user.last_name = last_name

        user.save()

        return redirect("/auth/profile/")

    return JsonResponse(
        {
            "success": False,
            "errors": "Method not allowed.",
        },
        status=405,
    )


# ============================================================
# LOGOUT
# ============================================================

@login_required(login_url="/auth/login/")
def logout_view(request):

    logout(request)

    return redirect("/auth/login/")


# ============================================================
# FORGOT PASSWORD
# ============================================================


def forgot_password_view(request):

    if request.user.is_authenticated:
        return redirect("/auth/dashboard/")

    # ---------------------------------------------
    # GET
    # ---------------------------------------------

    if request.method == "GET":

        return inertia_render(
            request,
            "Authentication/ForgotPassword",
            props={
                "errors": {},
                "success": None,
            },
        )

    # ---------------------------------------------
    # POST
    # ---------------------------------------------

    if request.method == "POST":

        email = ""

        # -----------------------------------------
        # Normal form data
        # -----------------------------------------

        if request.POST:

            email = request.POST.get(
                "email",
                "",
            ).strip()

        # -----------------------------------------
        # JSON data from Inertia
        # -----------------------------------------

        if not email and request.body:

            try:

                body = json.loads(
                    request.body.decode("utf-8")
                )

                email = body.get(
                    "email",
                    "",
                ).strip()

            except (
                json.JSONDecodeError,
                UnicodeDecodeError,
            ):
                pass

        # -----------------------------------------
        # Validate email
        # -----------------------------------------

        if not email:

            return inertia_render(
                request,
                "Authentication/ForgotPassword",
                props={
                    "errors": {
                        "email": (
                            "Please enter your email address."
                        ),
                    },
                    "success": None,
                },
            )

        # -----------------------------------------
        # Find user
        # -----------------------------------------

        try:

            user = CustomUser.objects.get(
                email__iexact=email
            )

        except CustomUser.DoesNotExist:

            return inertia_render(
                request,
                "Authentication/ForgotPassword",
                props={
                    "errors": {
                        "email": (
                            "No account was found with this email address."
                        ),
                    },
                    "success": None,
                },
            )

        # -----------------------------------------
        # Generate reset token
        # -----------------------------------------

        uid = urlsafe_base64_encode(
            force_bytes(user.pk)
        )

        token = default_token_generator.make_token(
            user
        )

        reset_url = request.build_absolute_uri(
            reverse(
                "authentication:reset_password",
                kwargs={
                    "uidb64": uid,
                    "token": token,
                },
            )
        )

        # -----------------------------------------
        # Send reset email
        # -----------------------------------------

        send_mail(
            subject="Password Reset",
            message=(
                f"Hello {user.first_name or user.username},\n\n"
                "You requested a password reset.\n\n"
                "Use the following link to reset your password:\n\n"
                f"{reset_url}\n\n"
                "If you did not request this, you can ignore this email."
            ),
            from_email=None,
            recipient_list=[user.email],
            fail_silently=False,
        )

        # -----------------------------------------
        # Stay on Forgot Password page
        # -----------------------------------------

        return inertia_render(
            request,
            "Authentication/ForgotPassword",
            props={
                "errors": {},
                "success": (
                    "A password reset link has been sent. "
                    "Please check your email."
                ),
            },
        )

    # ---------------------------------------------
    # Unsupported method
    # ---------------------------------------------

    return JsonResponse(
        {
            "success": False,
            "errors": "Method not allowed.",
        },
        status=405,
    )

# ============================================================
# RESET PASSWORD
# ============================================================




def reset_password_view(
    request,
    uidb64,
    token,
):

    # -------------------------------------------------
    # Validate reset link
    # -------------------------------------------------

    try:
        uid = force_str(
            urlsafe_base64_decode(uidb64)
        )

        user = CustomUser.objects.get(
            pk=uid
        )

    except (
        TypeError,
        ValueError,
        OverflowError,
        CustomUser.DoesNotExist,
    ):
        user = None

    if (
        user is None
        or not default_token_generator.check_token(
            user,
            token,
        )
    ):
        return redirect(
            "/auth/forgot-password/"
        )

    # -------------------------------------------------
    # GET
    # -------------------------------------------------

    if request.method == "GET":

        return inertia_render(
            request,
            "Authentication/ResetPassword",
            props={
                "uidb64": uidb64,
                "token": token,
                "errors": {},
            },
        )

    # -------------------------------------------------
    # POST
    # -------------------------------------------------

    if request.method == "POST":

        password = ""
        password_confirmation = ""

        # ---------------------------------------------
        # Try normal Django form data
        # ---------------------------------------------

        if request.POST:

            password = request.POST.get(
                "password",
                "",
            ).strip()

            password_confirmation = request.POST.get(
                "password_confirmation",
                "",
            ).strip()

        # ---------------------------------------------
        # Try JSON data from Inertia
        # ---------------------------------------------

        if not password and request.body:

            try:

                body = json.loads(
                    request.body.decode("utf-8")
                )

                password = body.get(
                    "password",
                    "",
                ).strip()

                password_confirmation = body.get(
                    "password_confirmation",
                    "",
                ).strip()

            except (
                json.JSONDecodeError,
                UnicodeDecodeError,
            ):
                pass

        # ---------------------------------------------
        # Validation
        # ---------------------------------------------

        errors = {}

        if not password:

            errors["password"] = (
                "Password is required."
            )

        if not password_confirmation:

            errors["password_confirmation"] = (
                "Please confirm your password."
            )

        elif password != password_confirmation:

            errors["password_confirmation"] = (
                "Passwords do not match."
            )

        # ---------------------------------------------
        # Django password validation
        # ---------------------------------------------

        if not errors:

            try:

                validate_password(
                    password,
                    user,
                )

            except ValidationError as e:

                errors["password"] = (
                    " ".join(e.messages)
                )

        # ---------------------------------------------
        # Return validation errors
        # ---------------------------------------------

        if errors:

            return inertia_render(
                request,
                "Authentication/ResetPassword",
                props={
                    "uidb64": uidb64,
                    "token": token,
                    "errors": errors,
                },
            )

        # ---------------------------------------------
        # Save new password
        # ---------------------------------------------

        user.set_password(password)
        user.save()

        # ---------------------------------------------
        # Password successfully changed
        # ---------------------------------------------

        return redirect(
            "/auth/login/"
        )

    # -------------------------------------------------
    # Unsupported method
    # -------------------------------------------------

    return JsonResponse(
        {
            "success": False,
            "errors": "Method not allowed.",
        },
        status=405,
    )
# ============================================================
# CURRENT USER API
# ============================================================

@login_required(login_url="/auth/login/")
def current_user(request):

    if not request.user.is_authenticated:

        return JsonResponse({
            "authenticated": False,
            "user": None,
        })

    return JsonResponse({
        "authenticated": True,
        "user": {
            "id": request.user.id,
            "username": request.user.username,
            "first_name": request.user.first_name,
            "last_name": request.user.last_name,
            "email": request.user.email,
            "role": request.user.role,
        },
    })


# ============================================================
# ADMIN DASHBOARD
# ============================================================

@login_required(login_url="/auth/login/")
# ============================================================
# ADMIN DASHBOARD
# ============================================================

@login_required(login_url="/auth/login/")
def admin_dashboard_view(request):
    """
    Admin dashboard for managers and CEOs.

    Provides:
    - User statistics
    - Order statistics
    - Sales statistics
    - Product statistics
    - Customer insights
    - Best-selling products
    - Low-stock products
    - Recent orders
    """

    # ---------------------------------------------------------
    # ACCESS CONTROL
    # ---------------------------------------------------------
    if request.user.role not in ["manager", "ceo"]:
        return redirect("/auth/Dashboard/")

    # ---------------------------------------------------------
    # USERS
    # ---------------------------------------------------------
    users = CustomUser.objects.all().order_by("-date_joined")

    total_users = users.count()

    total_customers = CustomUser.objects.filter(
        role="customer"
    ).count()

    total_managers = CustomUser.objects.filter(
        role="manager"
    ).count()

    total_ceos = CustomUser.objects.filter(
        role="ceo"
    ).count()

    users_data = [
        {
            "id": account.id,
            "username": account.username,
            "email": account.email,
            "first_name": account.first_name,
            "last_name": account.last_name,
            "role": account.role,
            "is_active": account.is_active,
            "date_joined": account.date_joined.strftime("%B %d, %Y"),
        }
        for account in users
    ]

    # ---------------------------------------------------------
    # ORDERS
    # ---------------------------------------------------------
    total_orders = Order.objects.count()

    pending_orders = Order.objects.filter(
        status="pending"
    ).count()

    processing_orders = Order.objects.filter(
        status="processing"
    ).count()

    shipped_orders = Order.objects.filter(
        status="shipped"
    ).count()

    delivered_orders = Order.objects.filter(
        status="delivered"
    ).count()

    cancelled_orders = Order.objects.filter(
        status="cancelled"
    ).count()

    failed_orders = Order.objects.filter(
        status="failed"
    ).count()

    # ---------------------------------------------------------
    # SALES
    # ---------------------------------------------------------
    #
    # We exclude cancelled and failed orders from sales.
    #
    # This means "total sales" represents orders that are not
    # cancelled or payment-failed.
    # ---------------------------------------------------------
    valid_sales_orders = Order.objects.exclude(
        status__in=["cancelled", "failed"]
    )

    total_sales = (
        valid_sales_orders.aggregate(
            total=Coalesce(
                Sum("total_amount"),
                Decimal("0.00")
            )
        )["total"]
    )

    # ---------------------------------------------------------
    # PRODUCTS
    # ---------------------------------------------------------
    total_products = Product.objects.count()

    # Products with 10 or fewer units are considered low stock.
    low_stock_threshold = 10

    low_stock_products_queryset = (
        Product.objects
        .filter(stock_quantity__lte=low_stock_threshold)
        .order_by("stock_quantity", "name")
    )

    low_stock_products = [
        {
            "id": product.id,
            "name": product.name,
            "reference": product.reference,
            "stock_quantity": product.stock_quantity,
            "unit_price": float(product.unit_price),
            "image_url": (
                request.build_absolute_uri(product.image.url)
                if product.image
                else None
            ),
        }
        for product in low_stock_products_queryset[:10]
    ]

    low_stock_count = low_stock_products_queryset.count()

    # ---------------------------------------------------------
    # TOP CUSTOMERS
    # ---------------------------------------------------------
    #
    # Based on number of orders.
    # ---------------------------------------------------------
    top_customers_by_orders = (
        Order.objects
        .filter(customer__isnull=False)
        .values(
            "customer_id",
            "customer__username",
            "customer__first_name",
            "customer__last_name",
            "customer__email",
        )
        .annotate(
            order_count=Count("id"),
            total_spent=Coalesce(
                Sum("total_amount"),
                Decimal("0.00")
            ),
        )
        .order_by("-order_count")[:10]
    )

    top_customers = [
        {
            "id": customer["customer_id"],
            "username": customer["customer__username"],
            "first_name": customer["customer__first_name"],
            "last_name": customer["customer__last_name"],
            "email": customer["customer__email"],
            "order_count": customer["order_count"],
            "total_spent": float(customer["total_spent"]),
        }
        for customer in top_customers_by_orders
    ]

    # ---------------------------------------------------------
    # TOP CUSTOMERS BY MONEY SPENT
    # ---------------------------------------------------------
    top_customers_by_spending_queryset = (
        Order.objects
        .filter(customer__isnull=False)
        .exclude(status__in=["cancelled", "failed"])
        .values(
            "customer_id",
            "customer__username",
            "customer__first_name",
            "customer__last_name",
            "customer__email",
        )
        .annotate(
            order_count=Count("id"),
            total_spent=Coalesce(
                Sum("total_amount"),
                Decimal("0.00")
            ),
        )
        .order_by("-total_spent")[:10]
    )

    top_customers_by_spending = [
        {
            "id": customer["customer_id"],
            "username": customer["customer__username"],
            "first_name": customer["customer__first_name"],
            "last_name": customer["customer__last_name"],
            "email": customer["customer__email"],
            "order_count": customer["order_count"],
            "total_spent": float(customer["total_spent"]),
        }
        for customer in top_customers_by_spending_queryset
    ]

    # ---------------------------------------------------------
    # BEST-SELLING PRODUCTS
    # ---------------------------------------------------------
    #
    # Based on total quantity sold through OrderItems.
    # Cancelled and failed orders are excluded.
    # ---------------------------------------------------------
    best_selling_queryset = (
        OrderItem.objects
        .filter(
            order__status__in=[
                "payment_verified",
                "processing",
                "shipped",
                "delivered",
            ]
        )
        .values(
            "product_id",
            "product__name",
            "product__reference",
        )
        .annotate(
            quantity_sold=Sum("quantity"),
            revenue=Sum("total_price"),
        )
        .order_by("-quantity_sold")[:10]
    )

    best_selling_products = [
        {
            "id": product["product_id"],
            "name": product["product__name"],
            "reference": product["product__reference"],
            "quantity_sold": product["quantity_sold"] or 0,
            "revenue": float(product["revenue"] or 0),
        }
        for product in best_selling_queryset
    ]

    # ---------------------------------------------------------
    # PRODUCTS GENERATING MOST REVENUE
    # ---------------------------------------------------------
    top_revenue_queryset = (
        OrderItem.objects
        .filter(
            order__status__in=[
                "payment_verified",
                "processing",
                "shipped",
                "delivered",
            ]
        )
        .values(
            "product_id",
            "product__name",
            "product__reference",
        )
        .annotate(
            revenue=Sum("total_price"),
            quantity_sold=Sum("quantity"),
        )
        .order_by("-revenue")[:10]
    )

    top_revenue_products = [
        {
            "id": product["product_id"],
            "name": product["product__name"],
            "reference": product["product__reference"],
            "revenue": float(product["revenue"] or 0),
            "quantity_sold": product["quantity_sold"] or 0,
        }
        for product in top_revenue_queryset
    ]

    # ---------------------------------------------------------
    # RECENT ORDERS
    # ---------------------------------------------------------
    recent_orders_queryset = (
        Order.objects
        .select_related("customer")
        .order_by("-created_at")[:10]
    )

    recent_orders = [
        {
            "id": order.id,
            "order_number": order.order_number,
            "customer_name": order.customer_name,
            "customer_email": order.customer_email,
            "status": order.status,
            "total_amount": float(order.total_amount),
            "payment_method": order.payment_method,
            "created_at": order.created_at.strftime(
                "%B %d, %Y %H:%M"
            ),
        }
        for order in recent_orders_queryset
    ]

    # ---------------------------------------------------------
    # CURRENT USER
    # ---------------------------------------------------------
    user_data = {
        "id": request.user.id,
        "username": request.user.username,
        "email": request.user.email,
        "first_name": request.user.first_name,
        "last_name": request.user.last_name,
        "role": request.user.role,
        "date_joined": request.user.date_joined.strftime(
            "%B %d, %Y"
        ),
    }

    # ---------------------------------------------------------
    # DASHBOARD
    # ---------------------------------------------------------
    return inertia_render(
        request,
        "Authentication/Admin/Dashboard",
        props={
            # Current user
            "user": user_data,

            # Users
            "users": users_data,
            "total_users": total_users,
            "total_customers": total_customers,
            "total_managers": total_managers,
            "total_ceos": total_ceos,

            # Orders
            "total_orders": total_orders,
            "pending_orders": pending_orders,
            "processing_orders": processing_orders,
            "shipped_orders": shipped_orders,
            "delivered_orders": delivered_orders,
            "cancelled_orders": cancelled_orders,
            "failed_orders": failed_orders,

            # Sales
            "total_sales": float(total_sales),

            # Products
            "total_products": total_products,
            "low_stock_count": low_stock_count,
            "low_stock_threshold": low_stock_threshold,
            "low_stock_products": low_stock_products,

            # Customers
            "top_customers": top_customers,
            "top_customers_by_spending": top_customers_by_spending,

            # Products / sales
            "best_selling_products": best_selling_products,
            "top_revenue_products": top_revenue_products,

            # Orders
            "recent_orders": recent_orders,
        },
    )