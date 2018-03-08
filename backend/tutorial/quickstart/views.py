from django.contrib.auth.models import User, Group
from tutorial.quickstart.models import Client, Event_Type, Client_Type, Status, Auth_User_Type, Case_Type, Case, Auth_User_Case, Event, Case_Event
from rest_framework import viewsets
from tutorial.quickstart.serializers import UserSerializer, GroupSerializer, ClientSerializer, EventTypeSerializer, ClientTypeSerializer, StatusSerializer, AuthUserTypeSerializer, CaseTypeSerializer, CaseSerializer, AuthUserCaseSerializer, EventSerializer, CaseEventSerializer


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

class ClientViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows clients to be viewed or edited.
    """
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    
    @detail_route(methods=['post'])
    def client_type(self, request, pk=None):
        """
        Saves the client type with the client.
        """
        client_type = objects.get_or_create(request.data.client_type)
        client = self.get_object()
        client.client_type = client_type
        client.save()
        # return something?
#         user = self.get_object()
#         groups = user.groups.all()
#         return Response([group.name for group in groups])
        

class EventTypeViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows clients to be viewed or edited.
    """
    queryset = Event_Type.objects.all()
    serializer_class = EventTypeSerializer

class ClientTypeViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows clients to be viewed or edited.
    """
    queryset = Client_Type.objects.all()
    serializer_class = ClientTypeSerializer

class StatusViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows clients to be viewed or edited.
    """
    queryset = Status.objects.all()
    serializer_class = StatusSerializer

class AuthUserTypeViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows clients to be viewed or edited.
    """
    queryset = Auth_User_Type.objects.all()
    serializer_class = AuthUserTypeSerializer

class CaseTypeViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows clients to be viewed or edited.
    """
    queryset = Case_Type.objects.all()
    serializer_class = CaseTypeSerializer

class CaseViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows clients to be viewed or edited.
    """
    queryset = Case.objects.all()
    serializer_class = CaseSerializer

class AuthUserCaseViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows clients to be viewed or edited.
    """
    queryset = Auth_User_Case.objects.all()
    serializer_class = AuthUserCaseSerializer

class EventViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows clients to be viewed or edited.
    """
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class CaseEventViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows clients to be viewed or edited.
    """
    queryset = Case_Event.objects.all()
    serializer_class = CaseEventSerializer
