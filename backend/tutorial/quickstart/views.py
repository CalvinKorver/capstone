from django.contrib.auth.models import User, Group
from tutorial.quickstart.models import Client, Event_Type, Client_Type, Status, Auth_User_Type, Case_Type, Case, Auth_User_Case, Event, Case_Event
from rest_framework import viewsets
# from rest_framework.decorators import action
from rest_framework.decorators import detail_route, list_route
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

    @list_route(methods=['post'])#, detail=True)
    def new_case(self, request, pk=None):
        case_name = request.data.name
        case_type = Case_Type.objects.get(name=request.data.case_type)
        client = Client.objects.get(first_name=request.data.first_name, last_name=request.data.last_name)
        case = self.get_object()
        case.case_type = case_type.id
        case.client = client.id
        case.save()
        return Response({'status': 'request handled'})
        # serializer = PasswordSerializer(data=request.data)
        # if serializer.is_valid():
        #     user.set_password(serializer.data['password'])
        #     user.save()
        #     return Response({'status': 'password set'})
        # else:
        #     return Response(serializer.errors,
        #                     status=status.HTTP_400_BAD_REQUEST)

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