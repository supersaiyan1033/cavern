from django.db import models
from authentication.models import Sellers, Buyers, ShippingAddresses
# Create your models here.


class Products(models.Model):
    productId = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=254)
    brand = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    image = models.ImageField(blank=True, null=True)
    details = models.CharField(max_length=254)

    def __str__(self):
        return self.name


class Stocks(models.Model):
    productId = models.ForeignKey(Products, on_delete=models.CASCADE)
    sellerId = models.ForeignKey(Sellers, on_delete=models.CASCADE)
    stockId = models.BigAutoField(primary_key=True)
    price = models.IntegerField()
    dateOfAddition = models.DateTimeField(auto_now=True)
    totalQuantity = models.IntegerField()
    availableQuantity = models.IntegerField()

    def __str__(self):
        return str(self.stockId)


class Ratings(models.Model):
    ratingId = models.BigAutoField(primary_key=True)
    buyerId = models.ForeignKey(Buyers, on_delete=models.CASCADE)
    rating = models.DecimalField(max_digits=2, decimal_places=1)
    review = models.CharField(max_length=254, blank=True)
    productId = models.ForeignKey(
        Products, on_delete=models.CASCADE, null=True)
    reviewedAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.ratingId)


class Carts(models.Model):
    cartId = models.BigAutoField(primary_key=True)
    buyerId = models.ForeignKey(Buyers, on_delete=models.CASCADE)
    stockId = models.ForeignKey(Stocks, on_delete=models.CASCADE)
    quantity = models.IntegerField()

    def __str__(self):
        return str(self.cartId)


class Orders(models.Model):
    orderId = models.BigAutoField(primary_key=True)
    buyerId = models.ForeignKey(Buyers, on_delete=models.CASCADE)
    addressId = models.ForeignKey(ShippingAddresses, on_delete=models.CASCADE)
    totalAmount = models.IntegerField()
    paymentType = models.TextChoices(
        'paymentType', '"cash on delivery" "paypal"')
    paymentMethod = models.CharField(
        choices=paymentType.choices, max_length=20)
    orderedAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.orderId)


class OrderedItems(models.Model):
    orderId = models.ForeignKey(Orders, on_delete=models.CASCADE)
    stockId = models.ForeignKey(Stocks, on_delete=models.CASCADE)
    serialId = models.CharField(max_length=100)
    status = models.CharField(max_length=30)
    amount = models.IntegerField()
    orderedItemId = models.BigAutoField(primary_key=True)
    finalDate = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.orderedItemId)


class Offers(models.Model):
    offerId = models.BigAutoField(primary_key=True)
    stockId = models.ForeignKey(Stocks, on_delete=models.CASCADE)
    discountPercent = models.DecimalField(decimal_places=2, max_digits=5)

    def __str__(self):
        return str(self.offerId)


class Categories(models.Model):
    categoryId = models.BigAutoField(primary_key=True)
    category = models.CharField(max_length=90)

    def __str__(self):
        return self.category
