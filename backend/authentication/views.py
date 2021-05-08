import base64
import sys
import hashlib
from rest_framework.decorators import api_view
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.db import connection
import bcrypt
from django.http import JsonResponse, HttpResponse, HttpResponseNotFound, Http404
from .models import Admins, Buyers, Sellers
from .serializers import *
import base64
from django.contrib.auth.hashers import *
# Create your views here.


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['name'] = user.name
        # ...

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['POST'])
def login(request):
    data = request.data
    if data['role'] == 'buyer':
        try:
            buyer = Buyers.objects.get(email=data['email'])
        except Buyers.DoesNotExist:
            buyer = None
        if buyer != None:
            serializer = BuyersSerializer(buyer, many=False)
            record = serializer.data
            if check_password(data['password'], record['password']):
                dictionary = {'role': data['role']}
                dictionary.update(serializer.data)
                return Response(dictionary)
            else:
                return Response({'message': 'Incorrect password!!'}, status=500)
        else:
            return Response({'message': 'Register First!!'}, status=404)
    elif data['role'] == 'admin':
        try:
            admin = Admins.objects.get(email=data['email'])
        except Admins.DoesNotExist:
            admin = None
        if admin != None:
            serializer = AdminsSerializer(admin, many=False)
            record = serializer.data
            if check_password(data['password'], record['password']):
                dictionary = {'role': data['role']}
                dictionary.update(serializer.data)
                return Response(dictionary)
            else:
                return Response({'message': 'Incorrect Password!!'}, status=500)
        else:
            return Response({'message': 'You are not an admin'}, status=500)
    else:
        try:
            seller = Sellers.objects.get(email=data['email'])
        except Sellers.DoesNotExist:
            seller = None
        if seller != None:
            serializer = SellersSerializer(seller, many=False)
            record = serializer.data
            if record['verified'] == 'YES':
                if check_password(data['password'], record['password']):
                    dictionary = {'role': data['role']}
                    dictionary.update(serializer.data)
                    return Response(dictionary)
                else:
                    return Response({'message': 'Incorrect Password!!'}, status=500)
            else:
                return Response({'message': "You are not verified yet"}, status=500)
        else:
            return Response({'message': "Register First!!"}, status=500)


@api_view(['POST'])
def register(request):
    data = request.data
    if data['role'] == 'buyer':
        buyer = Buyers.objects.create(
            name=data['name'],
            email=data['email'],
            phone=data['phone'],
            password=make_password(
                data['password'], salt=None, hasher='default')
        )
        serializer = BuyersSerializer(buyer, many=False)
        dictionary = {'role': data['role']}
        dictionary.update(serializer.data)
        return Response(dictionary)
    else:
        seller = Sellers.objects.create(
            name=data['name'],
            email=data['email'],
            phone=data['phone'],
            company=data['company'],
            address=data['address'],
            password=make_password(
                data['password'], salt=None, hasher='default')
        )
        serializer = SellersSerializer(seller, many=False)
        return Response({'message': "seller under verification"}, status=500)
