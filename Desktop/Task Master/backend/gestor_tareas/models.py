from django.db import models

class Task(models.Model):
    CATEGORY_CHOICES = [
        ('urgente e importante', 'Urgente e Importante'),
        ('urgente y no importante', 'Urgente y No Importante'),
        ('no urgente, pero importante', 'No Urgente, pero Importante'),
        ('no urgente y no importante', 'No Urgente y No Importante'),
    ]
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    due_date = models.DateField(null=True, blank=True)
    priority = models.CharField(max_length=10, choices=[('baja', 'Baja'), ('media', 'Media'), ('alta', 'Alta')], default='baja')
    status = models.CharField(max_length=15, choices=[('pendiente', 'Pendiente'), ('en progreso', 'En Progreso'), ('completada', 'Completada')], default='pendiente')
    category = models.CharField(
        max_length=30,
        choices=CATEGORY_CHOICES,
        default='no urgente y no importante'
    )
    def __str__(self): 
        return self.title # returns the title of the task


