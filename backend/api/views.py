from rest_framework import generics
from .models import Product
from .serializers import ProductSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .permissions import IsAdminOrReadOnly

"""
ProductShow class: handling list view
ProductDetail class: handling optional methods
Both classes implement generics methods from django-rest-framework
"""


class ProductShow(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = (IsAuthenticatedOrReadOnly, IsAdminOrReadOnly)
    lookup_url_kwarg = 'product_id'


class ProductDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = (IsAuthenticatedOrReadOnly, IsAdminOrReadOnly)
    lookup_url_kwarg = 'product_id'