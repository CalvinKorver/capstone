from django.contrib.auth.models import User, Group
from tutorial.quickstart.models import Client, Event_Type, Client_Type, Status, Auth_User_Type, Case_Type, Case, Auth_User_Case, Event, Case_Event, Charge, Court, Case_Charge
from rest_framework import status, viewsets, generics
from rest_framework.decorators import detail_route, list_route #action
from tutorial.quickstart.serializers import UserSerializer, GroupSerializer, ClientSerializer, EventTypeSerializer, ClientTypeSerializer, StatusSerializer, AuthUserTypeSerializer, CaseTypeSerializer, CaseSerializer, AuthUserCaseSerializer, EventSerializer, CaseEventSerializer, ChargeSerializer, CourtSerializer, CaseChargeSerializer

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

class ChargeViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows clients to be viewed or edited.
    """
    queryset = Charge.objects.all()
    serializer_class = ChargeSerializer

class CourtViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows clients to be viewed or edited.
    """
    queryset = Court.objects.all()
    serializer_class = CourtSerializer

class CaseTypeViewSet(APIView):
    def get(self, request, *args, **kwargs):
        queryset = Case_Type.objects.all()
        serializer_class = CaseTypeSerializer(queryset, many=True)
        return Response(serializer_class.data)

    def post(self, request, *args, **kwargs):
        name = request.data.get('name')
        description = request.data.get('description')

        caseType = CaseType.objects.create(
            name=name,
            description=description
        )
        caseType.save()
        return Response({'status': 'CaseType created'})

    def delete(self, request):
        caseType = Case_Type.objects.get(name = request.data.get('name'))
        caseType.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class CaseViewSet(APIView):
    """
    API endpoint that allows clients to be viewed or edited.
    """

    def get(self, request, *args, **kwargs):
        queryset = Case.objects.all()
        serializer_class = CaseSerializer(queryset, many=True)
        return Response(serializer_class.data)

    def post(self, request, *args, **kwargs):
        
        case_type = Case_Type.objects.get(name=request.data.get('case_type_name'))
        client = Client.objects.get(first_name=request.data.get('first_name'), last_name=request.data.get('last_name'))
        name = request.data.get('name')

        case = Case.objects.create(
            name=name,
            case_type=case_type,
            client=client)
        case.save()

        # do stuff to make a new case_charge
        # get the reference to the charge object using the name of the charge in the request
        charge = Charge.objects.get(name=request.data.get('charge_name'))
        # get the reference to the case object
        # create a new case_charge object using these ids
        case_charge = Case_Charge.objects.create(
            charge=charge,
            case=case)
        
        return Response({'status': 'Case created'})

    def delete(self, request):
        case = Case.objects.get(name = request.data.get('name'))
        case.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def patch(self, request):
        case = Case.objects.filter(name = request.data.get('name'))
        
        if (request.data.get("new_name") is not None):
            case.update(name = request.data.get("new_name"))

        if (request.data.get("new_case_type") is not None):
            try:
                new_case_type = Case_Type.objects.get(name=request.data.get('new_case_type'))
            except Exception as e:
                return Response("Sorry could not find case type")
            case.update(case_type_id = new_case_type.id)

        if request.data.get("new_client_first_name") is not None and\
        request.data.get("new_client_last_name") is not None:
            try:
                new_client = Client.objects.get(first_name=request.data.get('new_client_first_name'), 
                last_name=request.data.get('new_client_last_name'))
            except Exception as e:
                return Response(400)
            case.update(client_id = new_client.id)

        return Response("Patched")

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

class CaseChargeViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows clients to be viewed or edited.
    """
    queryset = Case_Charge.objects.all()
    serializer_class = CaseChargeSerializer