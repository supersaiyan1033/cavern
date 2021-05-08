from django.db import models

# Create your models here.


class Buyers(models.Model):
    name = models.CharField(max_length=120, default='nitin')
    email = models.EmailField(max_length=100)
    phone = models.CharField(max_length=10)
    password = models.CharField(max_length=254)
    buyerId = models.BigAutoField(primary_key=True)

    def __str__(self):
        return self.name


class Sellers(models.Model):
    sellerId = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=150)
    company = models.CharField(max_length=254)
    email = models.EmailField(max_length=100)
    password = models.CharField(max_length=254)
    types = models.TextChoices('types', 'YES NO')
    verified = models.CharField(
        choices=types.choices, max_length=3, default='NO')
    address = models.CharField(max_length=254)
    phone = models.CharField(max_length=10)

    def __str__(self):
        return self.name


class Admins(models.Model):
    adminId = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=150)
    email = models.EmailField(max_length=120)
    phone = models.CharField(max_length=10)
    address = models.CharField(max_length=254)
    password = models.CharField(max_length=254)

    def __str__(self):
        return self.name


class ShippingAddresses(models.Model):
    addressId = models.BigAutoField(primary_key=True)
    address = models.CharField(max_length=254)
    buyerId = models.ForeignKey(Buyers, on_delete=models.CASCADE)

    def __str__(self):
        return self.address
