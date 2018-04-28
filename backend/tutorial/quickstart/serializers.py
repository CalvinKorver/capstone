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
        fields = ('CourtName')


class ChargeTypeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ChargeType
        fields = ('ChargeTypeName')


class ProbationTypeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ProbationType
        fields = ('ProbationTypeName')


class PunishmentTypeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = PunishmentType
        fields = ('PunishmentTypeName')


class ClientSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Client
        fields = ('id', 'FirstName', 'LastName', 'DateOfBirth', 'StreetAddress', 'City', 'State', 'Zipcode', 'Country')


class FineSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Fine
        fields = ('FinesImposed', 'FinesSuspended')


class PreTrialStatusSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = PreTrialStatus
        fields = ('PreTrialStatusName')


class CaseOutcomeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = CaseOutcome
        fields = ('CaseOutcomeName')


class SentencingStatusSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = SentencingStatus
        fields = ('SentencingStatusName')


class ViolationSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Violation
        fields = ('ViolationName')

class SentenceComplianceSerializer(serializers.HyperlinkedModelSerializer):
    CaseID = serializers.PrimaryKeyRelatedField(read_only=True)
    ViolationID = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = SentenceCompliance
        fields = ('CaseID,' 'Admit', 'Reserve', 'ViolationID')


class CaseSerializer(serializers.HyperlinkedModelSerializer):
    ClientID = serializers.PrimaryKeyRelatedField(read_only=True)
    PreTrialStatusID = serializers.PrimaryKeyRelatedField(read_only=True)
    SentencingStatusID = serializers.PrimaryKeyRelatedField(read_only=True)
    CaseOutcomeID = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Case
        fields = ('CaseNumber', 'ClientID', 'PreTrialStatusID', 'SentencingStatusID', 'CaseOutcomeID', 'SentenceStart', 'SentenceEnd', 'JailTimeSuspended', 'PayWorkCrew', 'PayCommunityService', 'DomesticViolence', 'BenchWarrant', 'CaseClosed')


class AuthUserCaseSerializer(serializers.HyperlinkedModelSerializer):
    user = UserSerializer()
    case = CaseSerializer()

    class Meta:
        model = Auth_User_Case
        fields = ('user', 'case')


class PunishmentSerializer(serializers.HyperlinkedModelSerializer):
    PunishmentTypeID = serializers.PrimaryKeyRelatedField(read_only=True)
    CaseID = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Punishment
        fields = ('PunishmentTypeID', 'CaseID', 'Credit', 'DueDate', 'Jurisdiction')


class ProbationSerializer(serializers.HyperlinkedModelSerializer):
    ProbationTypeID = serializers.PrimaryKeyRelatedField(read_only=True)
    CaseID = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Punishment
        fields = ('PunishmentTypeID', 'CaseID', 'ProbationStart', 'ProbationEnd')


class OffenseSerializer(serializers.HyperlinkedModelSerializer):
    ChargeTypeID = serializers.PrimaryKeyRelatedField(read_only=True)
    CaseID = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Punishment
        fields = ('ChargeTypeID', 'CaseID', 'OffenseDate')


class TrialSerializer(serializers.HyperlinkedModelSerializer):
    CaseID = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Punishment
        fields = ('CaseID', 'TrialDate', 'TrialTime', 'Motion35', 'Motion36')


class FailToAppearSerializer(serializers.HyperlinkedModelSerializer):
    CaseID = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Punishment
        fields = ('CaseID', 'FailToAppearDate')