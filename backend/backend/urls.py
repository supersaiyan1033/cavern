"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf import settings
from shopping import views as product_views
from authentication import views as auth_views
from django.conf.urls.static import static

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
)
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/login/', auth_views.login, name="login"),
    path('api/register/', auth_views.register, name="register"),
    path('api/users/<userId>', auth_views.getUserDetails, name="getUserDetails"),
    # path('api/users/login', auth_views.MyTokenObtainPairView.as_view(),
    #      name='token_obtain_pair'),
    path('api/products', product_views.getAllProducts, name="allProducts"),
    path('api/users/<Id>/<role>/', auth_views.getUserDetails, name="profile"),
    path('api/profile/update/',
         auth_views.updateProfile, name="update-profile"),
    path('api/product/<Id>', product_views.getProductDetails,
         name="product_details"),
    path('api/products/<Id>/reviews/', product_views.reviewProduct,
         name="review_product"),
    path('api/products/top/', product_views.getAllProducts, name="allProducts"),
    # path('api/carts', product_views.getAllCarts, name="allCarts"),

    # admin functionalities
    path('api/verifiedsellers/', auth_views.verifiedSellers, name="verifiedSellers"),
    path('api/unverifiedsellers/',
         auth_views.unverifiedSellers, name="verifiedSellers"),
    path('api/verifyseller/<sid>/', auth_views.verifySeller, name="verifySeller"),
    path('api/removeseller/<sid>/', auth_views.removeSeller, name="removeSeller"),
    path('api/adminslist/', auth_views.adminsList, name="adminsList"),
    path('api/removeadmin/<aid>/', auth_views.removeAdmin, name="removeAdmin"),
    path('api/addadmin/', auth_views.addAdmin, name="addAdmin"),
    path('api/deliverproducts/', auth_views.deliverProducts, name="deliverProducts"),
    path('api/deliverproduct/<oid>', auth_views.deliverParticularProduct,
         name="deliverParticularProduct"),
    path('api/returnproducts/', auth_views.returnProducts, name="returnProducts"),
    path('api/returnproduct/<oid>', auth_views.returnParticularProduct,
         name="returnParticularProduct"),

    path('api/cart/product/<Id>', product_views.addToCart, name="add_to_cart"),
    path('api/mycart/<Id>', product_views.getCart, name="get_cart"),
    path('api/cart/delete/<Id>', product_views.deleteCartItem, name="delete_cart"),
    path('api/orders/add/', product_views.placeOrder, name="place_order"),
    path('api/order/<Id>/', product_views.getOrderById, name="get_order"),
    path('api/myorders/<Id>', product_views.myOrders, name="my-orders"),
    path('api/cancel/', product_views.cancelOrder, name="cancel_order"),
    path('api/return/', product_views.returnOrder, name="return_order")
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
