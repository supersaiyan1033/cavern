from rest_framework import serializers
from .models import *
from authentication.models import Sellers
from authentication.serializers import *


class ProductsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Products
        fields = '__all__'


class StocksSerializer(serializers.ModelSerializer):
    productId = ProductsSerializer(read_only=True)
    sellerId = SellersSerializer(read_only=True)

    class Meta:
        model = Stocks
        fields = '__all__'


class CartsSerializer(serializers.ModelSerializer):
    stockId = StocksSerializer(read_only=True)

    class Meta:
        model = Carts
        fields = '__all__'


class RatingsSerializer(serializers.ModelSerializer):
    buyerId = BuyersSerializer(read_only=True)

    class Meta:
        model = Ratings
        fields = '__all__'
