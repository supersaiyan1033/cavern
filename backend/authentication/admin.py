from django.contrib import admin
from .models import Buyers, Sellers, Admins, ShippingAddresses
# Register your models here.
admin.site.register(Buyers)
admin.site.register(Sellers)
admin.site.register(Admins)
admin.site.register(ShippingAddresses)
