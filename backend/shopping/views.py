from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import *
from .models import *
from authentication.models import *
from django.db.models import Avg
# Create your views here.


@api_view(['GET'])
def getAllProducts(request):
    query = request.query_params.get('keyword')
    if query == None:
        query = ''
    stocks = Stocks.objects.filter(
        productId__name__icontains=query,
        availableQuantity__gt=0
    )
    serializer = StocksSerializer(stocks, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getProductDetails(request, Id):
    stocks = Stocks.objects.get(stockId=Id)
    serializer = StocksSerializer(stocks, many=False)
    print(serializer.data['productId']['productId'])
    try:
        ratings = Ratings.objects.filter(
            productId=serializer.data['productId']['productId'])
        serial = RatingsSerializer(ratings, many=True)
    except Ratings.DoesNotExist:
        serial = None
    if serial != None:
        data = {"reviews": serial.data}
        data.update(serializer.data)
    else:

        data = serializer.data
    return Response(data)


@api_view(['POST'])
def reviewProduct(request, Id):
    data = request.data
    rating = data['rating']
    review = data['review']
    buyerId = data['userId']
    print(buyerId)
    buyer = Buyers.objects.get(buyerId=buyerId)
    product = Products.objects.get(productId=Id)
    try:
        record = Ratings.objects.get(buyerId=buyerId, productId=Id)
        return Response({'message': 'You already reviewed this Product!'}, status=500)
    except Ratings.DoesNotExist:

        record = Ratings.objects.create(
            buyerId=buyer,
            productId=product,
            rating=data['rating'],
            review=data['review'],
        )
        finalRating = Ratings.objects.filter(
            productId=Id).aggregate(Avg('rating'))
        product.votes = product.votes+1
        product.rating = finalRating['rating__avg']
        product.save()
        serializer = RatingsSerializer(record, many=False)
        return Response(serializer.data)


@api_view(['GET'])
def getAllCarts(request):
    carts = Carts.objects.select_related('buyerId', 'stockId')
    # print(carts.query)
    # print(carts.query)
    serializer = CartsSerializer(carts, many=True)
    return Response(serializer.data)
