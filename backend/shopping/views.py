from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import ProductsSerializer, CartsSerializer
from .models import Products, Carts
# Create your views here.


@api_view(['GET'])
def getAllProducts(request):
    query = request.query_params.get('keyword')
    if query == None:
        query = ''

    products = Products.objects.filter(name__icontains=query)
    serializer = ProductsSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getAllCarts(request):
    carts = Carts.objects.select_related('buyerId', 'stockId')
    # print(carts.query)
    # print(carts.query)
    serializer = CartsSerializer(carts, many=True)
    return Response(serializer.data)
