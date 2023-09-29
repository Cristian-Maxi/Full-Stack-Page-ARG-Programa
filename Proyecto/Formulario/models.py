from django.db import models

# Create your models here.

class Usuario(models.Model):
    nombre = models.CharField(max_length=255)
    apellido = models.CharField(max_length=255)
    usuario = models.CharField(max_length=255)
    contraseña = models.CharField(max_length=255)
    email = models.EmailField()
    recibir_notificaciones = models.BooleanField(default=False)

    def __str__(self):
        return self.usuario