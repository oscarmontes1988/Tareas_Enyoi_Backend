from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    documento = models.CharField(max_length=50, unique=True, null=True, blank=True)
    telefono = models.CharField(max_length=50, unique=True, null=True, blank=True)
    
    def __str__(self):
        return self.username
