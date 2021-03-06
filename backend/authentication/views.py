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
from .models import Admins, Buyers, Sellers, ShippingAddresses
from .serializers import *
from shopping.models import *
from shopping.serializers import *
import base64
from django.contrib.auth.hashers import *
# Create your views here.


@api_view(['POST'])
def login(request):
    data = request.data
    if request.session.get('userId') == None:
        if data['email'] != '':
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
                        request.session['userId'] = buyer.buyerId
                        request.session['role'] = 'buyer'
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
                        request.session['userId'] = admin.adminId
                        request.session['role'] = 'admin'
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
                            request.session['userId'] = seller.sellerId
                            request.session['role'] = 'seller'
                            return Response(dictionary)
                        else:
                            return Response({'message': 'Incorrect Password!!'}, status=500)
                    else:
                        return Response({'message': "You are not verified yet"}, status=500)
                else:
                    return Response({'message': "Register First!!"}, status=500)
        else:
            return Response({})
    else:
        userId = request.session.get('userId')
        role = request.session.get('role')
        if role == 'buyer':
            buyer = Buyers.objects.get(buyerId=userId)
            serializer = BuyersSerializer(buyer, many=False)
            dictionary = {'role': role}
            dictionary.update(serializer.data)
        if role == 'seller':
            seller = Sellers.objects.get(sellerId=userId)
            serializer = SellersSerializer(seller, many=False)
            dictionary = {'role': role}
            dictionary.update(serializer.data)
        if role == 'admin':
            admin = Admins.objects.get(adminId=userId)
            serializer = AdminsSerializer(admin, many=False)
            dictionary = {'role': role}
            dictionary.update(serializer.data)
        return Response(dictionary)


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
        address = ShippingAddresses.objects.create(
            address=data['address'],
            buyerId=buyer
        )
        dictionary = {'role': data['role'], 'address': data['address']}
        request.session['userId'] = buyer.buyerId
        request.session['role'] = 'buyer'
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
        request.session['userId'] = seller.sellerId
        request.session['role'] = 'seller'
        return Response({'message': "seller under verification"}, status=500)


@api_view(['GET'])
def getUserDetails(request, Id, role):
    if role == 'buyer':
        buyer = Buyers.objects.get(buyerId=Id)
        serializer = BuyersSerializer(buyer, many=False)
        address = ShippingAddresses.objects.get(buyerId=Id)
        serial = ShippingAddressesSerializer(address, many=False)
        print(serial.data)
        dictionary = {'role': role, 'address': serial.data['address']}
        dictionary.update(serializer.data)
        return Response(dictionary)

    elif role == 'seller':
        seller = Sellers.objects.get(sellerId=Id)
        serializer = SellersSerializer(seller, many=False)
        dictionary = {'role': role}
        dictionary.update(serializer.data)
        return Response(dictionary)
    else:
        admin = Admins.objects.get(adminId=Id)
        serializer = AdminsSerializer(admin, many=False)
        dictionary = {'role': role}
        dictionary.update(serializer.data)
        return Response(dictionary)


@api_view(['POST'])
def updateProfile(request):
    data = request.data
    if data['role'] == 'buyer':
        buyer = Buyers.objects.get(buyerId=data['user']['id'])
        buyer.name = data['user']['name']
        buyer.email = data['user']['email']
        buyer.phone = data['user']['phone']
        buyer.password = make_password(
            data['user']['password'], salt=None, hasher='default')
        buyer.save()
        address = ShippingAddresses.objects.get(buyerId=data['user']['id'])
        address.address = data['user']['address']
        address.save()
        serial = ShippingAddressesSerializer(address, many=False)
        serializer = BuyersSerializer(buyer, many=False)
        dictionary = {'role': data['role'], 'address': serial.data['address']}
        dictionary.update(serializer.data)
        return Response(dictionary)
    elif data['role'] == 'seller':
        seller = Sellers.objects.get(sellerId=data['user']['id'])
        seller.name = data['user']['name']
        seller.email = data['user']['email']
        seller.password = make_password(
            data['user']['password'], salt=None, hasher='default')
        seller.address = data['user']['address']
        seller.phone = data['user']['phone']
        seller.company = data['user']['company']
        seller.save()
        serializer = SellersSerializer(seller, many=False)
        dictionary = {'role': data['role']}
        dictionary.update(serializer.data)
        return Response(dictionary)
    elif data['role'] == 'admin':
        admin = Admins.objects.get(adminId=data['user']['id'])
        admin.name = data['user']['name']
        admin.email = data['user']['email']
        admin.password = make_password(
            data['user']['password'], salt=None, hasher='default')
        admin.address = data['user']['address']
        admin.phone = data['user']['phone']
        admin.save()
        serializer = AdminsSerializer(admin, many=False)
        dictionary = {'role': data['role']}
        dictionary.update(serializer.data)
        return Response(dictionary)
    return

# Admin related apis


@api_view(['GET'])
def verifiedSellers(request):
    sellers = Sellers.objects.filter(verified='YES')
    serializer = SellersSerializer(sellers, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def unverifiedSellers(request):
    sellers = Sellers.objects.filter(verified='NO')
    serializer = SellersSerializer(sellers, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def verifySeller(request, sid):
    seller = Sellers.objects.get(sellerId=sid)
    seller.verified = 'YES'
    seller.save()
    sellers = Sellers.objects.filter(verified='NO')
    serializer = SellersSerializer(sellers, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def removeSeller(request, sid):
    seller = Sellers.objects.get(sellerId=sid)
    seller.delete()
    sellers = Sellers.objects.filter(verified='YES')
    serializer = SellersSerializer(sellers, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def adminsList(request):
    adminslist = Admins.objects.all()
    serializer = AdminsSerializer(adminslist, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def removeAdmin(request, aid):
    admin = Admins.objects.get(adminId=aid)
    admin.delete()
    adminslist = Admins.objects.all()
    serializer = AdminsSerializer(adminslist, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def addAdmin(request):
    data = request.data
    admin = Admins.objects.create(
        name=data['name'], email=data['email'], phone=data['phone'])
    adminslist = Admins.objects.all()
    serializer = AdminsSerializer(adminslist, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def deliverProducts(request):
    deliverProducts = OrderedItems.objects.filter(status='In Transit')
    serializer = OrderedItemsSerializer(deliverProducts, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def deliverParticularProduct(request, oid):
    item = OrderedItems.objects.get(orderedItemId=oid)
    item.status = 'Delivered'
    item.save()
    deliverProducts = OrderedItems.objects.filter(status='In Transit')
    serializer = OrderedItemsSerializer(deliverProducts, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def returnProducts(request):
    returnProducts = OrderedItems.objects.filter(status='In Return')
    serializer = OrderedItemsSerializer(returnProducts, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def returnParticularProduct(request, oid):
    item = OrderedItems.objects.get(orderedItemId=oid)
    item.status = 'Returned'
    item.save()
    returnProducts = OrderedItems.objects.filter(status='In Return')
    serializer = OrderedItemsSerializer(returnProducts, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def addOldStocks(request, sid):
    addOldStocks = Stocks.objects.filter(sellerId=sid)
    serializer = StocksSerializer(addOldStocks, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def addOldParticularStock(request, sid, skid, quantity):
    stock = Stocks.objects.get(stockId=skid)
    previous = stock.totalQuantity
    available = stock.availableQuantity
    stock.totalQuantity = previous+int(quantity)
    stock.availableQuantity = available+int(quantity)
    stock.save()
    addOldStocks = Stocks.objects.filter(sellerId=sid)
    serializer = StocksSerializer(addOldStocks, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def addNewParticularStock(request, sid):
    data = request.data
    product = Products.objects.create(
        name=data['Name'], brand=data['Brand'], category=data['Category'], details=data['Details'])
    seller = Sellers.objects.get(sellerId=sid)
    stock = Stocks.objects.create(productId=product, sellerId=seller, price=int(
        data['Price']), totalQuantity=int(data['Quantity']), availableQuantity=int(data['Quantity']))
    serializer = StocksSerializer(stock, many=False)
    return Response(serializer.data)


@api_view(['POST'])
def imageUpload(request, Id):
    data = request.data
    product = Products.objects.get(productId=Id)
    image = request.FILES.get('file')
    product.image = image
    product.save()
    return Response(status=200)


@api_view(['GET'])
def userOrderRequests(request, sid):
    temp = Stocks.objects.filter(sellerId=sid)
    list = []
    for t in temp:
        try:
            request = OrderedItems.objects.filter(
                stockId=t.stockId, status='Order Placed')
            for r in request:
                serializer = OrderedItemsSerializer(r, many=False)
                list.append(serializer.data)
        except OrderedItems.DoesNotExist:
            i = 1
    return Response(list)


@api_view(['GET'])
def processRequest(request, sid, oid):
    item = OrderedItems.objects.get(orderedItemId=oid)
    StockId = item.stockId
    previousitem = OrderedItems.objects.filter(
        stockId=StockId).order_by('-serialId')[0]
    serial = previousitem.serialId
    item.serialId = int(serial)+1
    item.status = 'In Transit'
    item.save()
    temp = Stocks.objects.filter(sellerId=sid)
    list = []
    for t in temp:
        try:
            request = OrderedItems.objects.filter(
                stockId=t.stockId, status='Order Placed')
            for r in request:
                serializer = OrderedItemsSerializer(r, many=False)
                list.append(serializer.data)
        except:
            i = 1
    return Response(list)


@api_view(['GET'])
def addOffers(request, sid):
    stocks = Stocks.objects.filter(sellerId=sid)
    serializer = StocksSerializer(stocks, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def addParticularOffer(request, sid, skid, offer):
    stock = Stocks.objects.get(stockId=int(skid))
    Offers.objects.create(stockId=stock, discountPercent=int(offer))
    price = stock.price
    price = price*(0.01)*(100-int(offer))
    stock.price = int(price)
    stock.save()
    stocks = Stocks.objects.filter(sellerId=sid)
    serializer = StocksSerializer(stocks, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def removeOffers(request, sid):
    list = []
    temp = Stocks.objects.filter(sellerId=sid)
    for t in temp:
        try:
            offer = Offers.objects.get(stockId=t.stockId)
            serializer = OffersSerializer(offer, many=False)
            print(serializer.data)
            list.append(serializer.data)
        except Offers.DoesNotExist:
            continue
    return Response(list)


@api_view(['GET'])
def removeParticularOffer(request, sid, ofid):
    o = Offers.objects.get(offerId=ofid)
    per = o.discountPercent
    id = o.stockId.stockId
    print(type(id))
    print(id)
    s = Stocks.objects.get(stockId=id)
    ip = s.price
    s.price = int((100*ip)/(100-per))
    s.save()
    o.delete()
    list = []
    temp = Stocks.objects.filter(sellerId=sid)
    for t in temp:
        try:
            offer = Offers.objects.get(stockId=t.stockId)
            serializer = OffersSerializer(offer, many=False)
            list.append(serializer.data)
        except Offers.DoesNotExist:
            continue
    return Response(list)


@api_view(['POST'])
def logout(request):
    request.session.flush()
    request.session.clear_expired()
    return Response(status=200)
