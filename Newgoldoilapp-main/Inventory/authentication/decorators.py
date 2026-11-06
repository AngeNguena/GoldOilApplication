from functools import wraps

from django.shortcuts import redirect


def manager_or_ceo_required(view_func):
    @wraps(view_func)
    def wrapper(request, *args, **kwargs):
        # User must be logged in
        if not request.user.is_authenticated:
            return redirect("/auth/login/")

        # Only Manager and CEO are allowed
        if request.user.role not in ["manager", "ceo"]:
            return redirect("/auth/dashboard/")

        return view_func(request, *args, **kwargs)

    return wrapper