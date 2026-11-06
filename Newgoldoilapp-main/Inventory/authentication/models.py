from django.contrib.auth.models import AbstractUser
from django.db import models


class CustomUser(AbstractUser):

    ROLE_CHOICES = [
        ("customer", "Customer"),
        ("manager", "Manager"),
        ("ceo", "CEO"),
    ]

    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default="customer",
    )

    is_verified = models.BooleanField(
        default=False,
    )

    def __str__(self):
        return self.username

    class Meta:
        db_table = "auth_customuser"