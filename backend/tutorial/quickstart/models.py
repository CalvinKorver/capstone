from django.db import models
from django.contrib.auth.models import User

# no foreign key relationships
class Event_Type(models.Model):
    name = models.CharField(max_length=50, default="DEFAULT")
    description = models.CharField(max_length=500, default="DEFAULT")

class Client_Type(models.Model):
    name = models.CharField(max_length=50, default="DEFAULT")
    description = models.CharField(max_length=500, default="DEFAULT")

class Status(models.Model):
    name = models.CharField(max_length=50, default="DEFAULT")
    description = models.CharField(max_length=500, default="DEFAULT")

class Auth_User_Type(models.Model):
    name = models.CharField(max_length=50, default="DEFAULT")
    description = models.CharField(max_length=500, default="DEFAULT")

class Case_Type(models.Model):
    name = models.CharField(max_length=50, default="DEFAULT")
    description = models.CharField(max_length=500, default="DEFAULT")

class Charge(models.Model):
    name = models.CharField(max_length=50, default="DEFAULT")
    description = models.CharField(max_length=500, default="DEFAULT")

class Court(models.Model):
    name = models.CharField(max_length=50, default="DEFAULT")
    description = models.CharField(max_length=500, default="DEFAULT")


# foreign key relationships
# order matters below for dependencies on foreign keys
class Client(models.Model):
    first_name = models.CharField(max_length=50, default="DEFAULT")
    last_name = models.CharField(max_length=50, default="DEFAULT")
    date_of_birth = models.DateField(null=True, blank=True)
    street_address = models.CharField(max_length=50, default="DEFAULT")
    city = models.CharField(max_length = 50, default="DEFAULT")
    state = models.CharField(max_length = 2, default="WA")
    zipcode = models.CharField(max_length = 10, default="DEFAULT")
    country = models.CharField(max_length = 50, default="DEFAULT")
    # foreign key for client type
    # client_type = models.ForeignKey(Client_Type, null=True, on_delete=models.CASCADE)

class Case(models.Model):
    name = models.CharField(max_length=50, default="DEFAULT")
    case_number = models.CharField(max_length=50, default="0000000000")
    # foreign key for client id
    client = models.ForeignKey(Client, null=True, on_delete=models.CASCADE)
    # foreign key for case type id
    case_type = models.ForeignKey(Case_Type, null=True, on_delete=models.CASCADE)
    # changed to many-to-many
    # foreign key for charges
    # charge = models.ForeignKey(Charge, null=True, on_delete=models.CASCADE)

class Auth_User_Case(models.Model):
    # foreign key for user id
    user = models.ForeignKey(User, null=True, on_delete=models.CASCADE)
    # foreign key for case id
    case = models.ForeignKey(Case, null=True, on_delete=models.CASCADE)

class Event(models.Model):
    name = models.CharField(max_length=50, default="DEFAULT")
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    # foreign key event status id
    event_status = models.ForeignKey(Status, null=True, on_delete=models.CASCADE)
    # foreign key for event type ID
    event_type = models.ForeignKey(Event_Type, null=True, on_delete=models.CASCADE)
    # foreign key for court ID
    court = models.ForeignKey(Court, null=True, on_delete=models.CASCADE)


class Case_Event(models.Model):
    # foreign key for case id
    case = models.ForeignKey(Case, null=True, on_delete=models.CASCADE)
    # foreign key for event id
    event = models.ForeignKey(Event, null=True, on_delete=models.CASCADE)

class Case_Charge(models.Model):
    # foreign key for case id
    case = models.ForeignKey(Case, null=True, on_delete=models.CASCADE)
    # foreign key for charge id
    charge = models.ForeignKey(Charge, null=True, on_delete=models.CASCADE)
