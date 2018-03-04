from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from django.conf import settings

# Create your models here.
class Client(models.Model):
    name = models.CharField(max_length=255)
    age = models.IntegerField()
