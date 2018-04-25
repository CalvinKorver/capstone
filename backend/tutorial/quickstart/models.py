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

class Fine(models.Model):
    # fine information
    fines_imposed = models.DecimalField(null=True, blank=True, max_digits=10, decimal_places=2)
    fines_suspended = models.DecimalField(null=True, blank=True, max_digits=10, decimal_places=2)
    fine_payment_work = models.NullBooleanField()
    fine_payment_service = models.NullBooleanField()

class SentenceCompliance(models.Model):
    alleged_violation = models.CharField(max_length=50, default="DEFAULT")
    admit = models.BooleanField() # other option is deny
    reserve = models.BooleanField() # other option is impose


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
    CaseNumber = models.CharField(max_length=50, default="0000000000")
    # foreign key for client id
    ClientID = models.ForeignKey(Client, null=True, on_delete=models.CASCADE)
    FineID = models.ForeignKey(Fine, null=True, on_delete=models.CASCADE)
    SentenceComplianceID = models.ForeignKey(SentenceCompliance, null=True, on_delete=models.CASCADE)
    # foreign key for case type id
    # case_type = models.ForeignKey(Case_Type, null=True, on_delete=models.CASCADE)
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
    time = models.DateField(null=True, blank=True) # I assume time is a version of a date field
    motions = models.CharField(max_length=10, null=True, blank=True) # separate with a comma on input, saves us a table
    case_outcome = models.CharField(max_length=50, null=True, blank=True)

    # information for jail time
    jail_time_suspended = models.IntegerField(null=True, blank=True)
    credit = models.IntegerField(null=True, blank=True) # these two with next two
    due_date = models.DateField(null=True, blank=True)

    # information for work crew
    # credit_work_crew = models.IntegerField(null=True, blank=True) # may be able to simplify here
    # due_date_work_crew = models.DateField(null=True, blank=True)
    jurisdiction_work_crew = models.CharField(max_length=100, null=True, blank=True) # not sure what options are for this

    # community service information
    # credit_community_service = models.IntegerField(null=True, blank=True)
    # due_date_community_service = models.DateField(null=True, blank=True)

    

    treatment_ordered = models.CharField(max_length=400, null=True, blank=True)

    # foreign key event status id
    StatusID = models.ForeignKey(Status, null=True, blank=True, on_delete=models.CASCADE)
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
    CaseID = models.ForeignKey(Case, null=True, on_delete=models.CASCADE)
    # foreign key for charge id
    ChargeID = models.ForeignKey(Charge, null=True, on_delete=models.CASCADE)
