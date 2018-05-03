from django.db import models
from django.contrib.auth.models import User

class Auth_User_Type(models.Model):
    name = models.CharField(max_length=50, default="DEFAULT")
    description = models.CharField(max_length=500, default="DEFAULT")

class Court(models.Model):
    courtName = models.CharField(max_length=50, default="DEFAULT")

class Client(models.Model):
    first_name = models.CharField(max_length=50, default="DEFAULT")
    last_name = models.CharField(max_length=50, default="DEFAULT")
    date_of_birth = models.DateField(null=True, blank=True)
    street_address = models.CharField(max_length=50, default="DEFAULT")
    city = models.CharField(max_length = 50, default="DEFAULT")
    state = models.CharField(max_length = 2, default="WA")
    zipcode = models.CharField(max_length = 10, default="DEFAULT")
    country = models.CharField(max_length = 50, default="DEFAULT")

class PreTrialStatus(models.Model):
    preTrialStatusName = models.CharField(max_length=50, default="DEFAULT")

class SentencingStatus(models.Model):
    sentencingStatusName = models.CharField(max_length=50, default="DEFAULT")

class CaseOutcome(models.Model):
    caseOutcomeName = models.CharField(max_length=50, default="DEFAULT")

class ProbationType(models.Model):
    probationTypeName = models.CharField(max_length=50, default="DEFAULT")

class ChargeType(models.Model):
    chargeTypeName = models.CharField(max_length=50, default="DEFAULT")

class PunishmentType(models.Model):
    punishmentTypeName = models.CharField(max_length=50, default="DEFAULT")

class Violation(models.Model):
    violationName = models.CharField(max_length=50, default="DEFAULT")

class Case(models.Model):
    caseNumber = models.CharField(max_length=50, default="0000000000", unique=True)
    clientID = models.ForeignKey(Client, null=True, on_delete=models.CASCADE)
    preTrialStatusID = models.ForeignKey(PreTrialStatus, null=True, on_delete=models.CASCADE)
    sentencingStatusID = models.ForeignKey(SentencingStatus, null=True, on_delete=models.CASCADE)
    courtID = models.ForeignKey(Court, null=True, on_delete=models.CASCADE)
    caseOutcomeID = models.ForeignKey(CaseOutcome, null=True, on_delete=models.CASCADE)
    sentenceStart = models.DateField(null=True, blank=True)
    sentenceEnd = models.DateField(null=True, blank=True)
    jailTimeSuspended = models.IntegerField(null=True, blank=True)
    isDomesticViolence = models.BooleanField(default=False, blank=True)
    benchWarrant = models.DecimalField(default=0, max_digits=10, decimal_places=2)
    isCaseClosed = models.BooleanField(default=False, blank=True)
    treatmentOrdered = models.CharField(max_length=500, default="No treatment required")

class Offense(models.Model):
    chargeTypeID = models.ForeignKey(ChargeType, on_delete=models.CASCADE)
    caseID = models.ForeignKey(Case, on_delete=models.CASCADE)
    offenseDate = models.DateField(default="2000-10-10")

class Trial(models.Model):
    trialDate = models.DateField(default="2000-10-10")
    trialTime = models.TimeField(null=True, blank=True)
    isMotion36 = models.BooleanField(default=False)
    isMotion35 = models.BooleanField(default=False)
    caseID = models.ForeignKey(Case, on_delete=models.CASCADE)

class Fine(models.Model):
    finesImposed = models.DecimalField(default=0, max_digits=10, decimal_places=2)
    finesSuspended = models.DecimalField(default=0, max_digits=10, decimal_places=2)
    caseID = models.ForeignKey(Case, on_delete=models.CASCADE)
    isPayWorkCrew = models.BooleanField(default=False, blank=True)
    isPayCommunityService = models.BooleanField(default=False, blank=True)

class FailToAppear(models.Model):
    failToAppearDate = models.DateField(default="2000-10-10")
    caseID = models.ForeignKey(Case, on_delete=models.CASCADE)

class Auth_User_Case(models.Model):
    user = models.ForeignKey(User, null=True, on_delete=models.CASCADE)
    case = models.ForeignKey(Case, null=True, on_delete=models.CASCADE)

class Probation(models.Model):
    probationStart = models.DateField(default="2000-10-10")
    probationEnd = models.DateField(default="2000-10-10")
    probationTypeID = models.ForeignKey(ProbationType, on_delete=models.CASCADE)
    caseID = models.ForeignKey(Case, on_delete=models.CASCADE)

class Punishment(models.Model):
    punishmentTypeID = models.ForeignKey(PunishmentType, on_delete=models.CASCADE)
    caseID = models.ForeignKey(Case, on_delete=models.CASCADE)
    credit = models.IntegerField(default=0)
    dueDate = models.DateField(default="2000-10-10")
    jurisdiction = models.CharField(max_length=100, null=True, blank=True)

class SentenceCompliance(models.Model):
    violationID = models.ForeignKey(Violation, on_delete=models.CASCADE)
    caseID = models.ForeignKey(Case, on_delete=models.CASCADE)
    isAdmit = models.BooleanField(default=False)
    isReserve = models.BooleanField(default=False)
