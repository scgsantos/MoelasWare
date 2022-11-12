from django.db import models

# Create your models here.

class Login(models.Model):
    ##username = models.CharField(max_length=255)
    email = models.EmailField(max_length=255)
    password = models.CharField(max_length=50)

    def __str__(self):
        return self.email

class Registration(models.Model):
    username = models.CharField(max_length=255)
    email = models.EmailField(max_length=255)
    password1 = models.CharField(max_length=50) 
    password2 = models.CharField(max_length=50)

    def __str__(self):
        return self.email
