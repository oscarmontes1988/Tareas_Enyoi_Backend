from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializer import (
    UserSerializer,
    RequestPasswordResetEmailSerializer,
    SetNewPasswordSerializer
)
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import authenticate, get_user_model
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.core.mail import EmailMessage
from django.utils.encoding import smart_bytes, smart_str, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode

User = get_user_model()
token_generator = PasswordResetTokenGenerator()


class UserCreateAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Usuario creado exitosamente'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DebugLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user:
            return Response({'message': 'Usuario autenticado correctamente'}, status=status.HTTP_200_OK)
        return Response({'error': 'Credenciales inválidas'}, status=status.HTTP_400_BAD_REQUEST)


class EditarPerfilView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        serializer = UserSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Perfil actualizado correctamente', 'user': serializer.data}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RequestPasswordResetEmail(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RequestPasswordResetEmailSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'detail': 'Usuario con ese correo no existe.'}, status=status.HTTP_404_NOT_FOUND)

        uidb64 = urlsafe_base64_encode(smart_bytes(user.id))
        token = token_generator.make_token(user)
        frontend_url = 'http://localhost:5173'
        reset_url = f"{frontend_url}/reset-password/{uidb64}/{token}"
        email_body = (
            f"Hola {user.username},\n\n"
            "Recibiste este correo porque solicitaste restablecer tu contraseña.\n\n"
            f"Haz clic en el enlace:\n{reset_url}\n\n"
            "Si no solicitaste esto, ignora este mensaje."
        )
        email_message = EmailMessage(
            subject='Restablece tu contraseña',
            body=email_body,
            to=[user.email]
        )
        email_message.send()

        return Response({'detail': 'Enlace de restablecimiento enviado al correo.'}, status=status.HTTP_200_OK)


class PasswordTokenCheckAPI(APIView):
    permission_classes = [AllowAny]

    def get(self, request, uidb64, token):
        try:
            uid = smart_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id=uid)
        except (DjangoUnicodeDecodeError, User.DoesNotExist):
            return Response({'valid': False}, status=status.HTTP_400_BAD_REQUEST)

        if not token_generator.check_token(user, token):
            return Response({'valid': False}, status=status.HTTP_401_UNAUTHORIZED)
        return Response({'valid': True}, status=status.HTTP_200_OK)


class SetNewPasswordAPIView(APIView):
    permission_classes = [AllowAny]

    def patch(self, request):
        serializer = SetNewPasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            uid = smart_str(urlsafe_base64_decode(serializer.validated_data['uidb64']))
            user = User.objects.get(id=uid)
        except (DjangoUnicodeDecodeError, User.DoesNotExist):
            return Response({'detail': 'UID inválido.'}, status=status.HTTP_400_BAD_REQUEST)

        if not token_generator.check_token(user, serializer.validated_data['token']):
            return Response({'detail': 'Token inválido o expirado.'}, status=status.HTTP_401_UNAUTHORIZED)

        user.set_password(serializer.validated_data['password'])
        user.save()
        return Response({'detail': 'Contraseña actualizada correctamente.'}, status=status.HTTP_200_OK)
