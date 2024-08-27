from django.shortcuts import render
from . seriliazers import CustomTokenObtainPairSerilizer
from rest_framework_simplejwt.views import TokenObtainPairView

# Create your views here.

class EmailTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerilizer
