
from django.urls import path

from . import views


app_name = "authentication"


urlpatterns = [
    # Authentication
    path("login/", views.login_view, name="login"),
    path("register/", views.register_view, name="register"),
    path("logout/", views.logout_view, name="logout"),

    # User account
    path("dashboard/", views.dashboard_view, name="dashboard"),
    path("profile/", views.profile_view, name="profile"),
    path(
        "profile/edit/",
        views.edit_profile_view,
        name="edit_profile",
    ),

    # Password reset
    path(
        "forgot-password/",
        views.forgot_password_view,
        name="forgot_password",
    ),
    path(
        "reset-password/<uidb64>/<token>/",
        views.reset_password_view,
        name="reset_password",
    ),

    # Current user
    path("user/", views.current_user, name="current_user"),
    
    #admin dashboard

    path(
    "admin-dashboard/",
    views.admin_dashboard_view,
    name="admin_dashboard",
),
    path("csrf/", views.csrf_token, name="csrf"),
]

