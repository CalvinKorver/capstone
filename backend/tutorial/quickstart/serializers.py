from django.contrib.auth.models import User, Group
from tutorial.quickstart.models import Client, Event_Type, Client_Type, Status, Auth_User_Type, Case_Type, Case, Auth_User_Case, Event, Case_Event, Court, Charge, Case_Charge, Fine, SentenceCompliance
from rest_framework import serializers


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'groups')


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ('url', 'name')


class EventTypeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Event_Type
        fields = ('name', 'description')


class ClientTypeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Client_Type
        fields = ('name', 'description')


class StatusSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Status
        fields = ('name', 'description')


class AuthUserTypeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Auth_User_Type
        fields = ('name', 'description')


class CaseTypeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Case_Type
        fields = ('name', 'description')

class CourtSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Court
        fields = ('name', 'description')

class ChargeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Charge
        fields = ('name', 'description')


class ClientSerializer(serializers.HyperlinkedModelSerializer):
    # client_type = ClientTypeSerializer(read_only=True)

    class Meta:
        model = Client
        fields = ('id', 'first_name', 'last_name', 'date_of_birth', 'street_address', 'city', 'state', 'zipcode', 'country')#, 'client_type')

class FineSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Fine
        fields = ('fines_imposed', 'fines_suspended', 'fine_payment_work', 'fine_payment_service')

class SentenceComplianceSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = SentenceCompliance
        fields = ('alleged_violation', 'admit', 'reserve')


class CaseSerializer(serializers.HyperlinkedModelSerializer):
    CaseNumber = serializers.PrimaryKeyRelatedField(read_only=True)#ClientSerializer(read_only=True)
    ClientID = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Case
        fields = ('CaseNumber', 'ClientID')


class AuthUserCaseSerializer(serializers.HyperlinkedModelSerializer):
    user = UserSerializer()
    case = CaseSerializer()

    class Meta:
        model = Auth_User_Case
        fields = ('user', 'case')


class EventSerializer(serializers.HyperlinkedModelSerializer):
    StatusID = serializers.PrimaryKeyRelatedField(read_only=True, allow_null=True)
    event_type = EventTypeSerializer()
    class Meta:
        model = Event
        fields = ('name', 'start_date', 'due_date', 'StatusID', 'event_type', 'case_outcome')


class CaseEventSerializer(serializers.HyperlinkedModelSerializer):
    case = CaseSerializer()
    event = EventSerializer()

    class Meta:
        model = Case_Event
        fields = ('case', 'event')


class CaseChargeSerializer(serializers.HyperlinkedModelSerializer):
    CaseID = serializers.PrimaryKeyRelatedField(read_only=True)
    ChargeID = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Case_Charge
        fields = ('CaseID', 'ChargeID')
