from django.contrib.auth.models import User, Group
from tutorial.quickstart.models import Client, Event_Type, Client_Type, Status, Auth_User_Type, Case_Type, Case, Auth_User_Case, Event, Case_Event
from rest_framework import serializers


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('first name', 'last name', 'email', 'groups')


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


class ClientSerializer(serializers.HyperlinkedModelSerializer):
    client_type = ClientTypeSerializer(read_only=True)

    class Meta:
        model = Client
        fields = ('first_name', 'last_name', 'date_of_birth', 'street_address', 'city', 'state', 'zipcode', 'country', 'client_type')


class CaseSerializer(serializers.HyperlinkedModelSerializer):
    client = ClientSerializer(read_only=True)
    case_type = CaseTypeSerializer(read_only=True)

    class Meta:
        model = Case
        fields = ('name', 'client', 'case_type')


class AuthUserCaseSerializer(serializers.HyperlinkedModelSerializer):
    user = UserSerializer(read_only=True)
    case = CaseSerializer(read_only=True)

    class Meta:
        model = Auth_User_Case
        fields = ('user', 'case')


class EventSerializer(serializers.HyperlinkedModelSerializer):
    event_status = StatusSerializer(read_only=True)
    event_type = EventTypeSerializer(read_only=True)

    class Meta:
        model = Event
        fields = ('name', 'start_date', 'end_date', 'event_status', 'event_type')


class CaseEventSerializer(serializers.HyperlinkedModelSerializer):
    case = CaseSerializer(read_only=True)
    event = EventSerializer(read_only=True)

    class Meta:
        model = Case_Event
        fields = ('case', 'event')