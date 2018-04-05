from django.contrib.auth.models import User, Group
from tutorial.quickstart.models import Client, Event_Type, Client_Type, Status, Auth_User_Type, Case_Type, Case, Auth_User_Case, Event, Case_Event
from rest_framework import status, viewsets
# from rest_framework.decorators import detail_route, list_route, action
from tutorial.quickstart.serializers import UserSerializer, GroupSerializer, ClientSerializer, EventTypeSerializer, ClientTypeSerializer, StatusSerializer, AuthUserTypeSerializer, CaseTypeSerializer, CaseSerializer, AuthUserCaseSerializer, EventSerializer, CaseEventSerializer
from django.http import HttpResponse

from django.contrib.auth.models import User
from rest_framework import status, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response


# HELPFUL
# http://www.django-rest-framework.org/tutorial/3-class-based-views/


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

class CaseViewSet(APIView):
    """
    API endpoint that allows clients to be viewed or edited.
    """

    def get(self, request, *args, **kwargs):
        queryset = Case.objects.all()
        serializer_class = CaseSerializer(queryset, many=True)
        return Response(serializer_class.data)

    def post(self, request, *args, **kwargs):
        # case_name = request.data.name
        return HttpResponse("Performed a post")
        # return HttpResponse({'Data': 'hi'})
# +       case_type = Case_Type.objects.get(name=request.data.case_type)
# +       client = Client.objects.get(first_name=request.data.first_name, last_name=request.data.last_name)
# +       case = self.get_object()
# +       case.case_type = case_type.id
# +       case.client = client.id
# +       case.save()
        #return HttpResponse(request)
#       return HttpResponse({'status': 'request handled'})
        


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