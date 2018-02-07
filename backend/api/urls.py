from django.urls import re_path
from rest_framework_jwt.views import obtain_jwt_token
from rest_framework_jwt.views import verify_jwt_token
from . import views

# URL for Product and API
# api-token: retrieve new token

urlpatterns = [
    re_path(r'^products/$', views.ProductShow.as_view()),
    re_path(r'^products/(?P<product_id>[0-9]+)/$', views.ProductDetail.as_view()),
    re_path(r'^api-token/', obtain_jwt_token),
    re_path(r'^api-token-verify/', verify_jwt_token),
]