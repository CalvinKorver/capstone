from django.contrib.auth.models import User, Group
from tutorial.quickstart.models import Client, Event_Type, Client_Type, Status, Auth_User_Type, Case_Type, Case, Auth_User_Case, Event, Case_Event, Charge, Court, Case_Charge, Fine, SentenceCompliance
from rest_framework import status, viewsets, generics
from rest_framework.decorators import detail_route, list_route #action
from tutorial.quickstart.serializers import UserSerializer, GroupSerializer, ClientSerializer, EventTypeSerializer, ClientTypeSerializer, StatusSerializer, AuthUserTypeSerializer, CaseTypeSerializer, CaseSerializer, AuthUserCaseSerializer, EventSerializer, CaseEventSerializer, ChargeSerializer, CourtSerializer, CaseChargeSerializer, FineSerializer, SentenceComplianceSerializer

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

class FineViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows clients to be viewed or edited.
    """
    queryset = Fine.objects.all()
    serializer_class = FineSerializer

class SentenceComplianceViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows clients to be viewed or edited.
    """
    queryset = SentenceCompliance.objects.all()
    serializer_class = SentenceComplianceSerializer

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
        
        # case_type = Case_Type.objects.get(name=request.data.get('case_type_name'))
        clientID = Client.objects.get(first_name=request.data.get('firstName'), last_name=request.data.get('lastName'))
        caseNumber = request.data.get('caseNumber')

        # Save the case
        case = Case.objects.create(
            CaseNumber=caseNumber,
            # case_type=case_type,
            ClientID=clientID)
        case.save()

        # @Calvin Korver what is this hack?
        if(request.data.get('charge1') != None):
            print("Here")
            chargeID = Charge.objects.get(name=request.data.get('charge1'))
            print(chargeID)
            print(case)

            case_charge = Case_Charge.objects.create(
                ChargeID=chargeID,
                CaseID=case)
            case_charge.save()
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

class EventViewSet(APIView):
    """
    API endpoint that allows clients to be viewed or edited.
    """
    def get(self, request, *args, **kwargs):
        queryset = Event.objects.all()
        serializer_class = EventSerializer(queryset, many=True)
        return Response(serializer_class.data)

    def post(self, request, *args, **kwargs):
        event_type = Event_Type.objects.get(name=request.data.get('event_type_name'))
        status = request.data.get('sentencing_status')
        status_obj = None
        # maybe set status_obj to null up here?
        if(status):
            status_obj = Status.objects.get(name=request.data.get('sentencing_status'))

        # Save the event
        # in theory if these fields are null, they won't go into the database
        event = Event.objects.create(
            StatusID=status_obj,
            event_type=event_type,
            name=request.data.get('name'),
            start_date=request.data.get('start_date'),
            due_date=request.data.get('due_date'),
            time=request.data.get('time'),
            motions=request.data.get('motions'),
            case_outcome=request.data.get('case_outcome'),
            credit=request.data.get('credit'),
            jail_time_suspended=request.data.get('jail_time_suspended'),
            jurisdiction_work_crew=request.data.get('jurisdiction_work_crew')
            )
        event.save()

        # also need to link this to the case still
        case = Case.objects.filter(CaseNumber=request.data.get('case_number')).first() #change back to .get when case is fixed
        case_event = Case_Event.objects.create(
            case = case,
            event = event
        )
        case_event.save()
        return Response({'status': 'Event created'})

    def delete(self, request):
        event = Event.objects.get(name = request.data.get('name'))
        event.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

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