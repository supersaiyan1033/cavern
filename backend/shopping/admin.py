from django.contrib import admin
from .models import Products, Stocks, Orders, OrderedItems, Ratings, Offers, Carts
# Register your models here.
admin.site.register(Products)
admin.site.register(Stocks)
admin.site.register(Orders)
admin.site.register(OrderedItems)
admin.site.register(Ratings)
admin.site.register(Offers)
admin.site.register(Carts)
