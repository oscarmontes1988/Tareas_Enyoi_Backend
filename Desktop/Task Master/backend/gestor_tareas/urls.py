from django.urls import path, include
from rest_framework import routers
from gestor_tareas import views

router = routers.DefaultRouter()
router.register(r'gestor_tareas', views.TaskView, 'gestor_tareas')

urlpatterns = [
    path("api/v1/", include(router.urls))
]