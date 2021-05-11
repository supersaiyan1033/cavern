from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import *
from .models import *
from authentication.models import *
from django.db.models import Avg
import datetime
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


@api_view(['GET'])
def getOrderById(request, Id):
    order = Orders.objects.get(orderId=Id)
    serial = OrdersSerializer(order, many=False)
    ordered = OrderedItems.objects.filter(orderId=Id)
    serializer = OrderedItemsSerializer(ordered, many=True)
    dictionary = {}
    dictionary.update(serial.data)
    dictionary.update({'items': serializer.data})
    return Response(dictionary)


@api_view(['GET'])
def myOrders(request, Id):
    buyer = Buyers.objects.get(buyerId=Id)
    orders = Orders.objects.filter(buyerId=Id)
    serial = OrdersSerializer(orders, many=True)
    dictionary = serial.data
    i = 0
    for order in orders:
        orderItem = OrderedItems.objects.filter(orderId=order.orderId)
        serializer = OrderedItemsSerializer(orderItem, many=True)
        dictionary[i].update({'items': serializer.data})
    return Response(dictionary)


@api_view(['POST'])
def placeOrder(request):
    data = request.data
    buyer = Buyers.objects.get(buyerId=data['buyerId'])
    order = Orders.objects.create(
        buyerId=buyer,
        address=data['order']['shippingAddress'],
        totalAmount=data['order']['totalPrice'],
        paymentMethod=data['order']['paymentMethod']
    )
    serial = OrdersSerializer(order, many=False)
    dictionary = {}
    dictionary.update(serial.data)
    array = []
    for cartItem in data['order']['cartItems']:
        stock = Stocks.objects.get(stockId=cartItem['stockId']['stockId'])
        if data['order']['paymentMethod'] == 'Cash on Delivery':
            item = OrderedItems.objects.create(
                orderId=order,
                stockId=stock,
                amount=cartItem['stockId']['price'],
                quantity=cartItem['quantity'],
                serialId=0
            )
            serializer = OrderedItemsSerializer(item, many=False)
            array.append(serializer.data)
        stock.availableQuantity = stock.availableQuantity - \
            cartItem['quantity']
        stock.save()
    Carts.objects.filter(buyerId=data['buyerId']).delete()
    dictionary.update({'items': array})
    return Response(dictionary)


@api_view(['POST'])
def cancelOrder(request):
    data = request.data
    orderedItem = OrderedItems.objects.get(orderedItemId=data['orderedItemId'])
    orderedItem.status = 'Cancelled'
    order = Orders.objects.get(orderId=data['orderId'])
    order.totalAmount = order.totalAmount - orderedItem.amount*orderedItem.quantity
    order.save()
    orderedItem.finalDate = datetime.now()
    orderedItem.save()
    return Response(status=200)


def returnOrder(request):
    data = request.data
    orderedItem = OrderedItems.objects.get(orderedItemId=data['orderedItem'])
    orderedItem.status = 'In Return'
    order = Orders.objects.get(orderId=data['orderId'])
    order.totalAmount = order.totalAmount - orderedItem.amount*orderedItem.quantity
    order.save()
    orderedItem.finalDate = datetime.now()
    orderedItem.save()
    return Response(status=200)
