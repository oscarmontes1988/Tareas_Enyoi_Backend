from django.urls import path
from .views import UserCreateAPIView
from .views import UserCreateAPIView, DebugLoginView
from .views import EditarPerfilView
from .views import RequestPasswordResetEmail
from .views import PasswordTokenCheckAPI
from .views import SetNewPasswordAPIView


urlpatterns = [
    path('register/', UserCreateAPIView.as_view(), name='user-register'),
    path('debug-login/', DebugLoginView.as_view(), name='debug-login'),
    path('editar-perfil/', EditarPerfilView.as_view(), name='editar_perfil'),

    # Recuperación de contraseña
    path('request-reset-email/', RequestPasswordResetEmail.as_view(), name='request-reset-email'),
    path('password-reset/<uidb64>/<token>/', PasswordTokenCheckAPI.as_view(), name='password-reset-confirm'),
    path('password-reset-complete/', SetNewPasswordAPIView.as_view(), name='password-reset-complete'),
]
