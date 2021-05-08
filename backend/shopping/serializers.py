from rest_framework import serializers
from .models import Products, Carts


class ProductsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Products
        fields = '__all__'


class CartsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Carts
        fields = '__all__'
