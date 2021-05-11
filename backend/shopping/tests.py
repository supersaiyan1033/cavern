from django.test import SimpleTestCase
from backend.urls import *
from .views import *
from django.urls import reverse, resolve

# Create your tests here.


class TestShoppingUrls(SimpleTestCase):

    def test_products_url(self):
        url = reverse('allProducts')
        self.assertEquals(resolve(url).func, getAllProducts)

    def test_product_details_url(self):
        url = reverse('product_details', args=[11])
        self.assertEquals(resolve(url).func, getProductDetails)
