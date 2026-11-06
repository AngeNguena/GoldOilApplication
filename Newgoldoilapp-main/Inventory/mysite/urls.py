
from . import views
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static





urlpatterns = [
    path('admin/', admin.site.urls),

    # Authentication app
    path('auth/', include('authentication.urls')),

    # Inventory app
    path('inventory/', include('inventory.urls')),  
    
    path('', include('ecommerce.urls')),  


    # Public website pages
    path('', views.index, name='index'),
    path('contact/', views.contact, name='contact'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
