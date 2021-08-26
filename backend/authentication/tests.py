from django.test import SimpleTestCase
from backend.urls import *
from .views import *
from django.urls import reverse, resolve
# Create your tests here.


class TestAuthenticationUrls(SimpleTestCase):

    def test_login_url(self):
        url = reverse('login')
        self.assertEquals(resolve(url).func, login)

    def test_register_url(self):
        url = reverse('register')
        self.assertEquals(resolve(url).func, register)

    def test_profile_url(self):
        url = reverse('getUserDetails', args=[1])
        self.assertEquals(resolve(url).func, getUserDetails)

    def test_update_profile_url(self):
        url = reverse('update-profile')
        self.assertEquals(resolve(url).func, updateProfile)

    def test_verified_sellers_url(self):
        url = reverse('verifiedSellers')
        self.assertEquals(resolve(url).func, verifiedSellers)

    def test_un_verified_sellers_url(self):
        url = reverse('unverifiedSellers')
        self.assertEquals(resolve(url).func, unverifiedSellers)

    def test_verify_seller_url(self):
        url = reverse('verifySeller', args=[1])
        self.assertEquals(resolve(url).func, verifySeller)

    def test_remove_sellers_url(self):
        url = reverse('removeSeller', args=[1])
        self.assertEquals(resolve(url).func, removeSeller)

    def test_adminsList_url(self):
        url = reverse('adminsList')
        self.assertEquals(resolve(url).func, adminsList)

    def test_remove_admin_url(self):
        url = reverse('removeAdmin', args=[1])
        self.assertEquals(resolve(url).func, removeAdmin)

    def test_add_admin_url(self):
        url = reverse('addAdmin')
        self.assertEquals(resolve(url).func, addAdmin)

    def test_deliver_products_url(self):
        url = reverse('deliverProducts',)
        self.assertEquals(resolve(url).func, deliverProducts)

    def test_deliver_Particular_product_url(self):
        url = reverse('deliverParticularProduct', args=[1])
        self.assertEquals(resolve(url).func, deliverParticularProduct)

    def test_return_products_url(self):
        url = reverse('returnProducts',)
        self.assertEquals(resolve(url).func, returnProducts)

    def test_return_particular_product_url(self):
        url = reverse('returnParticularProduct', args=[1])
        self.assertEquals(resolve(url).func, returnParticularProduct)

    def test_add_old_stocks_url(self):
        url = reverse('addOldStocks', args=[1])
        self.assertEquals(resolve(url).func, addOldStocks)

    def test_add_old_particular_stock_url(self):
        url = reverse('addOldParticularStock', args=[1, 2, 3])
        self.assertEquals(resolve(url).func, addOldParticularStock)

    def test_add_new_particular_stock_url(self):
        url = reverse('addNewParticularStock', args=[1])
        self.assertEquals(resolve(url).func, addNewParticularStock)
