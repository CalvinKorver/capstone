from django.db import models
from django.contrib.auth.models import User

class Auth_User_Type(models.Model):
    name = models.CharField(max_length=50, default="DEFAULT")
    description = models.CharField(max_length=500, default="DEFAULT")

class Court(models.Model):
    CourtName = models.CharField(max_length=50, default="DEFAULT")

class Client(models.Model):
    FirstName = models.CharField(max_length=50, default="DEFAULT")
    LastName = models.CharField(max_length=50, default="DEFAULT")
    DateOfBirth = models.DateField(null=True, blank=True)
    StreetAddress = models.CharField(max_length=50, default="DEFAULT")
    City = models.CharField(max_length = 50, default="DEFAULT")
    State = models.CharField(max_length = 2, default="WA")
    Zipcode = models.CharField(max_length = 10, default="DEFAULT")
    Country = models.CharField(max_length = 50, default="DEFAULT")

class PreTrialStatus(models.Model):
    PreTrialStatusName = models.CharField(max_length=50, default="DEFAULT")

class SentencingStatus(models.Model):
    SentencingStatusName = models.CharField(max_length=50, default="DEFAULT")

class CaseOutcome(models.Model):
    CaseOutcomeName = models.CharField(max_length=50, default="DEFAULT")

class ProbationType(models.Model):
    ProbationTypeName = models.CharField(max_length=50, default="DEFAULT")

class ChargeType(models.Model):
    ChargeTypeName = models.CharField(max_length=50, default="DEFAULT")

class PunishmentType(models.Model):
    PunishmentTypeName = models.CharField(max_length=50, default="DEFAULT")

class Violation(models.Model):
    ViolationName = models.CharField(max_length=50, default="DEFAULT")

class Case(models.Model):
    CaseNumber = models.CharField(max_length=50, default="0000000000")
    CaseClosed = models.BooleanField(default=False, blank=True)
    ClientID = models.ForeignKey(Client, null=True, on_delete=models.CASCADE)
    PreTrialStatusID = models.ForeignKey(PreTrialStatus, null=True, on_delete=models.CASCADE)
    SentencingStatusID = models.ForeignKey(SentencingStatus, null=True, on_delete=models.CASCADE)
    CaseOutcomeID = models.ForeignKey(CaseOutcome, null=True, on_delete=models.CASCADE)
    SentenceStart = models.DateField(default="2000-10-10")
    SentenceEnd = models.DateField(null=True, blank=True)
    JailTimeSuspended = models.IntegerField(null=True, blank=True)
    PayWorkCrew = models.BooleanField(default=False, blank=True)
    PayCommunityService = models.BooleanField(default=False, blank=True)
    DomesticViolence = models.BooleanField(default=False, blank=True)
    BenchWarrant = models.DecimalField(default=0, max_digits=10, decimal_places=2)
    CaseClosed = models.BooleanField(default=False, blank=True)

class Offense(models.Model):
    ChargeTypeID = models.ForeignKey(Court, on_delete=models.CASCADE)
    CaseID = models.ForeignKey(Case, on_delete=models.CASCADE)
    OffenseDate = models.DateField(default="2000-10-10")

class Trial(models.Model):
    TrialDate = models.DateField(default="2000-10-10")
    TrialTime = models.TimeField(null=True, blank=True)
    Motion36 = models.BooleanField(default=False)
    Motion35 = models.BooleanField(default=False)
    CaseID = models.ForeignKey(Case, on_delete=models.CASCADE)

class Fine(models.Model):
    FinesImposed = models.DecimalField(default=0, max_digits=10, decimal_places=2)
    FinesSuspended = models.DecimalField(default=0, max_digits=10, decimal_places=2)
    CaseID = models.ForeignKey(Case, on_delete=models.CASCADE)

class FailToAppear(models.Model):
    FailToAppearDate = models.DateField(default="2000-10-10")
    CaseID = models.ForeignKey(Case, on_delete=models.CASCADE)

class Auth_User_Case(models.Model):
    user = models.ForeignKey(User, null=True, on_delete=models.CASCADE)
    case = models.ForeignKey(Case, null=True, on_delete=models.CASCADE)

class Probation(models.Model):
    ProbationStart = models.DateField(default="2000-10-10")
    ProbationEnd = models.DateField(default="2000-10-10")
    ProbationTypeID = models.ForeignKey(ProbationType, on_delete=models.CASCADE)
    CaseID = models.ForeignKey(Case, on_delete=models.CASCADE)

class Punishment(models.Model):
    PunishmentTypeID = models.ForeignKey(ProbationType, on_delete=models.CASCADE)
    CaseID = models.ForeignKey(Case, on_delete=models.CASCADE)
    Credit = models.IntegerField(default=0)
    DueDate = models.DateField(default="2000-10-10")
    Jurisdiction = models.CharField(max_length=100, null=True, blank=True)

class SentenceCompliance(models.Model):
    ViolationID = models.ForeignKey(ProbationType, on_delete=models.CASCADE)
    CaseID = models.ForeignKey(Case, on_delete=models.CASCADE)
    Admit = models.BooleanField(default=False)
    Reserve = models.BooleanField(default=False)
