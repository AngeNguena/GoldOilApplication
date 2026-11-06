from django import forms
from .models import Client, Product, ProductVariation, Proforma, ProformaItem

class ClientForm(forms.ModelForm):
    class Meta:
        model = Client
        fields = '__all__'

class ProductForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = '__all__'

class ProductVariationForm(forms.ModelForm):
    class Meta:
        model = ProductVariation
        fields = '__all__'

# Proforma item form (for inline use)
class ProformaItemForm(forms.ModelForm):
    class Meta:
        model = ProformaItem
        fields = ['product_variation', 'quantity']

# Proforma form
class ProformaForm(forms.ModelForm):
    class Meta:
        model = Proforma
        fields = ['number', 'client', 'delivery_time', 'tva_percent', 'bct_percent']
