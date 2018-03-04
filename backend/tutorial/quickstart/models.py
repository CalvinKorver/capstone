from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from django.conf import settings

# Create your models here.
class Client(models.Model):
    name = models.CharField(max_length=255)
    age = models.IntegerField()

# class Auth_User_Type(models.Model):
#     name = models.CharField(max_length=50)
#     description = models.CharField(max_length=500)

# # class Auth_User(models.Model):
# #     first_name = models.CharField(max_length=50)
# #     last_name = models.CharField(max_length=50)
# #     email = models.CharField(max_length=50)
# #     # password hash?
# #     # foreign key
# #   this already exists as our user table

# class Auth_User_Case(models.Model):
#     # foreign key for user id
#     # foreign key for case id

# class Case(models.Model):
#     name = models.CharField(max_length=50)
#     # foreign key for client id
#     # foreign key for case type id

# class Case_Type(models.Model):
#     name = models.CharField(max_length=50)
#     description = models.CharField(max_length=500)

# class Case_Event(models.Model):
#     # foreign key for case id
#     # foreign key for event id
 
