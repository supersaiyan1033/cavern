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
        count = Ratings.objects.filter(buyerId=buyerId, productId=Id).count()
        print(count)
        if count > 0:
            return Response({'message': 'You already reviewed this Product!'}, status=500)
        else:
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


@api_view(['PUT'])
def addToCart(request, Id):
    data = request.data
    buyer = Buyers.objects.get(buyerId=data['buyerId'])
    stock = Stocks.objects.get(stockId=Id)
    try:
        count = Carts.objects.filter(stockId=Id).count()
        if count > 0:
            cart = Carts.objects.get(stockId=Id)
            cart.quantity = data['quantity']
            cart.save()
            serializer = CartsSerializer(cart, many=False)
            return Response(serializer.data)
        else:
            cart = Carts.objects.create(
                buyerId=buyer,
                stockId=stock,
                quantity=data['quantity']
            )
            serializer = CartsSerializer(cart, many=False)
            return Response(serializer.data)
    except Carts.DoesNotExist:
        cart = Carts.objects.create(
            buyerId=buyer,
            stockId=Id,
            quantity=data['quantity']
        )
        serializer = CartsSerializer(cart, many=False)
        return Response(serializer.data)


@api_view(['GET'])
def getCart(request, Id):
    try:
        cart = Carts.objects.filter(buyerId=Id)
        serializer = CartsSerializer(cart, many=True)
        return Response(serializer.data)
    except Carts.DoesNotExist:
        data = {'empty': True}
        return Response(data)

    # print(carts.query)
    # print(carts.query)
    # //serializer = CartsSerializer(carts, many=True)
    # return Response(serializer.data)


@api_view(['DELETE'])
def deleteCartItem(request, Id):
    cart = Carts.objects.get(stockId=Id)
    cart.delete()
    return Response(status=200)
