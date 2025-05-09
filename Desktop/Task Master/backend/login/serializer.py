from rest_framework import serializers
from .models import CustomUser
from django.contrib.auth.password_validation import validate_password

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8, required=False)  

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'password', 'documento', 'telefono']
        extra_kwargs = {
            'username': {'required': True},
            'email': {'required': True},
            'documento': {'required': False, 'allow_blank': True},
            'telefono': {'required': False},
        }

    def create(self, validated_data):
        return CustomUser.objects.create_user(
            username=validated_data.get('username'),
            email=validated_data.get('email'),
            password=validated_data.get('password'),
            documento=validated_data.get('documento', ''),
            telefono=validated_data.get('telefono', '')
        )

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            if attr == 'password':
                instance.set_password(value)
            else:
                setattr(instance, attr, value)
        instance.save()
        return instance
    
class RequestPasswordResetEmailSerializer(serializers.Serializer):
    email = serializers.EmailField(min_length=2)

class SetNewPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(
        min_length=6, write_only=True, validators=[validate_password]
    )
    token = serializers.CharField(min_length=1, write_only=True)
    uidb64 = serializers.CharField(min_length=1, write_only=True)
