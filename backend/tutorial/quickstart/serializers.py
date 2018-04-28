from django.contrib.auth.models import User, Group
from tutorial.quickstart.models import Client, Auth_User_Type, Case, Auth_User_Case, Court, Fine, SentenceCompliance, Offense, ChargeType, SentencingStatus, CaseOutcome, PreTrialStatus, Violation, Punishment, PunishmentType, Probation, ProbationType, FailToAppear, Trial 
from rest_framework import serializers


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'groups')


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ('url', 'name')


class AuthUserTypeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Auth_User_Type
        fields = ('name', 'description')


class CourtSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Court
        fields = ('courtName')


class ChargeTypeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ChargeType
        fields = ('chargeTypeName')


class ProbationTypeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ProbationType
        fields = ('probationTypeName')


class PunishmentTypeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = PunishmentType
        fields = ('punishmentTypeName')


class ClientSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Client
        fields = ('id', 'firstName', 'lastName', 'dateOfBirth', 'streetAddress', 'city', 'state', 'zipcode', 'country')


class FineSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Fine
        fields = ('finesImposed', 'finesSuspended')


class PreTrialStatusSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = PreTrialStatus
        fields = ('preTrialStatusName')


class CaseOutcomeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = CaseOutcome
        fields = ('caseOutcomeName')


class SentencingStatusSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = SentencingStatus
        fields = ('sentencingStatusName')


class ViolationSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Violation
        fields = ('violationName')

class SentenceComplianceSerializer(serializers.HyperlinkedModelSerializer):
    caseID = serializers.PrimaryKeyRelatedField(read_only=True)
    violationID = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = SentenceCompliance
        fields = ('caseID,' 'admit', 'reserve', 'violationID')


class CaseSerializer(serializers.HyperlinkedModelSerializer):
    clientID = serializers.PrimaryKeyRelatedField(read_only=True)
    preTrialStatusID = serializers.PrimaryKeyRelatedField(read_only=True)
    sentencingStatusID = serializers.PrimaryKeyRelatedField(read_only=True)
    caseOutcomeID = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Case
        fields = ('caseNumber', 'clientID', 'preTrialStatusID', 'sentencingStatusID', 'caseOutcomeID', 'sentenceStart', 'SentenceEnd', 'JailTimeSuspended', 'PayWorkCrew', 'PayCommunityService', 'DomesticViolence', 'BenchWarrant', 'CaseClosed')


class AuthUserCaseSerializer(serializers.HyperlinkedModelSerializer):
    user = UserSerializer()
    case = CaseSerializer()

    class Meta:
        model = Auth_User_Case
        fields = ('user', 'case')


class PunishmentSerializer(serializers.HyperlinkedModelSerializer):
    punishmentTypeID = serializers.PrimaryKeyRelatedField(read_only=True)
    caseID = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Punishment
        fields = ('punishmentTypeID', 'caseID', 'credit', 'dueDate', 'jurisdiction')


class ProbationSerializer(serializers.HyperlinkedModelSerializer):
    probationTypeID = serializers.PrimaryKeyRelatedField(read_only=True)
    caseID = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Punishment
        fields = ('punishmentTypeID', 'caseID', 'probationStart', 'probationEnd')


class OffenseSerializer(serializers.HyperlinkedModelSerializer):
    chargeTypeID = serializers.PrimaryKeyRelatedField(read_only=True)
    caseID = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Punishment
        fields = ('chargeTypeID', 'caseID', 'offenseDate')


class TrialSerializer(serializers.HyperlinkedModelSerializer):
    caseID = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Punishment
        fields = ('caseID', 'trialDate', 'trialTime', 'motion35', 'motion36')


class FailToAppearSerializer(serializers.HyperlinkedModelSerializer):
    caseID = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Punishment
        fields = ('caseID', 'failToAppearDate')