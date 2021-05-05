from django.db import models

# Create your models here.


class Buyers(models.Model):
    firstName = models.CharField(max_length=60)
    lastName = models.CharField(max_length=60)
    email = models.EmailField(max_length=100)
    phone = models.BigIntegerField()
    password = models.CharField(max_length=254)
    genderType = models.TextChoices('genderType', 'Male Female Others')
    gender = models.CharField(choices=genderType.choices, max_length=6)
    dob = models.DateField()
    buyerId = models.BigAutoField(primary_key=True)

    def __str__(self):
        return self.firstName


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

    def __str__(self):
        return self.name


class Admins(models.Model):
    adminId = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=150)
    email = models.EmailField(max_length=120)
    phone = models.BigIntegerField()
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
