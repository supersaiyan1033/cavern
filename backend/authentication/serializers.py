from rest_framework import serializers
from .models import Buyers, Sellers, Admins


class BuyersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Buyers
        fields = '__all__'


class SellersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sellers
        fields = '__all__'


class AdminsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admins
        fields = '__all__'
