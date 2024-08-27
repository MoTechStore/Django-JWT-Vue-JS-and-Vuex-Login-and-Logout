from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken



User = get_user_model()


class CustomTokenObtainPairSerilizer(TokenObtainPairSerializer):
    username_field = User.EMAIL_FIELD
    email = serializers.EmailField(required=True)

    def validate(self,attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        user = User.objects.get(email=email)

        try:
            user = User.objects.get(email=email)
            if user.check_password(password):
                refresh = RefreshToken.for_user(user)
                data = {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                }
                return data
            else:
                raise serializers.ValidationError('Invalid Credentials')
        except User.DoesNotExist as e:
            print(e)

