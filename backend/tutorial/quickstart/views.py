from django.contrib.auth.models import User, Group
from tutorial.quickstart.models import Client, Auth_User_Type, Case, Auth_User_Case, Court, Fine, SentenceCompliance, Offense, ChargeType, SentencingStatus, CaseOutcome, PreTrialStatus, Violation, Punishment, PunishmentType, Probation, ProbationType, FailToAppear, Trial 
from rest_framework import status, viewsets, generics
from rest_framework.decorators import detail_route, list_route #action
from tutorial.quickstart.serializers import UserSerializer, GroupSerializer, ClientSerializer, AuthUserTypeSerializer, CaseSerializer, AuthUserCaseSerializer, CourtSerializer, FineSerializer, SentenceComplianceSerializer, OffenseSerializer, ChargeTypeSerializer, SentencingStatusSerializer, CaseOutcomeSerializer, PreTrialStatusSerializer, ViolationSerializer, PunishmentSerializer, PunishmentTypeSerializer, ProbationSerializer, ProbationTypeSerializer, FailToAppearSerializer, TrialSerializer

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


class AuthUserTypeViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows clients to be viewed or edited.
    """
    queryset = Auth_User_Type.objects.all()
    serializer_class = AuthUserTypeSerializer

class ChargeTypeViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows clients to be viewed or edited.
    """
    queryset = ChargeType.objects.all()
    serializer_class = ChargeTypeSerializer

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


class PreTrialStatusViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows clients to be viewed or edited.
    """
    queryset = PreTrialStatus.objects.all()
    serializer_class = PreTrialStatusSerializer


class SentencingStatusViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows clients to be viewed or edited.
    """
    queryset = SentencingStatus.objects.all()
    serializer_class = SentencingStatusSerializer


class PunishmentViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows clients to be viewed or edited.
    """
    queryset = Punishment.objects.all()
    serializer_class = PunishmentSerializer


class PunishmentTypeViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows clients to be viewed or edited.
    """
    queryset = PunishmentType.objects.all()
    serializer_class = PunishmentTypeSerializer


class ProbationViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows clients to be viewed or edited.
    """
    queryset = Probation.objects.all()
    serializer_class = ProbationSerializer


class ProbationTypeViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows clients to be viewed or edited.
    """
    queryset = ProbationType.objects.all()
    serializer_class = ProbationTypeSerializer


class TrialViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows clients to be viewed or edited.
    """
    queryset = Trial.objects.all()
    serializer_class = TrialSerializer


class FailToAppearViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows clients to be viewed or edited.
    """
    queryset = FailToAppear.objects.all()
    serializer_class = FailToAppearSerializer


class ViolationViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows clients to be viewed or edited.
    """
    queryset = Violation.objects.all()
    serializer_class = ViolationSerializer


class OffenseViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows clients to be viewed or edited.
    """
    queryset = Offense.objects.all()
    serializer_class = OffenseSerializer

class ChargeTypeViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows clients to be viewed or edited.
    """
    queryset = ChargeType.objects.all()
    serializer_class = ChargeTypeSerializer

class CaseOutcomeViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows clients to be viewed or edited.
    """
    queryset = CaseOutcome.objects.all()
    serializer_class = CaseOutcomeSerializer


class CaseViewSet(APIView):
    """
    API endpoint that allows clients to be viewed or edited.
    """
    queryset = Case.objects.all()
    serializer_class = CaseSerializer
    # def get(self, request, *args, **kwargs):
    #     queryset = Case.objects.all()
    #     serializer_class = CaseSerializer(queryset, many=True)
    #     return Response(serializer_class.data)

    # def post(self, request, *args, **kwargs):
        
    #     # case_type = Case_Type.objects.get(name=request.data.get('case_type_name'))
    #     clientID = Client.objects.get(first_name=request.data.get('firstName'), last_name=request.data.get('lastName'))
    #     caseNumber = request.data.get('caseNumber')

    #     # Save the case
    #     case = Case.objects.create(
    #         CaseNumber=caseNumber,
    #         # case_type=case_type,
    #         ClientID=clientID)
    #     case.save()

    #     # @Calvin Korver what is this hack?
    #     if(request.data.get('charge1') != None):
    #         print("Here")
    #         chargeID = Charge.objects.get(name=request.data.get('charge1'))
    #         print(chargeID)
    #         print(case)

    #         case_charge = Case_Charge.objects.create(
    #             ChargeID=chargeID,
    #             CaseID=case)
    #         case_charge.save()
    #     return Response({'status': 'Case created'})

    # def delete(self, request):
    #     case = Case.objects.get(name = request.data.get('name'))
    #     case.delete()
    #     return Response(status=status.HTTP_204_NO_CONTENT)

    # def patch(self, request):
    #     case = Case.objects.filter(name = request.data.get('name'))
        
    #     if (request.data.get("new_name") is not None):
    #         case.update(name = request.data.get("new_name"))

    #     if (request.data.get("new_case_type") is not None):
    #         try:
    #             new_case_type = Case_Type.objects.get(name=request.data.get('new_case_type'))
    #         except Exception as e:
    #             return Response("Sorry could not find case type")
    #         case.update(case_type_id = new_case_type.id)

    #     if request.data.get("new_client_first_name") is not None and\
    #     request.data.get("new_client_last_name") is not None:
    #         try:
    #             new_client = Client.objects.get(first_name=request.data.get('new_client_first_name'), 
    #             last_name=request.data.get('new_client_last_name'))
    #         except Exception as e:
    #             return Response(400)
    #         case.update(client_id = new_client.id)

    #     return Response("Patched")

class AuthUserCaseViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows clients to be viewed or edited.
    """
    queryset = Auth_User_Case.objects.all()
    serializer_class = AuthUserCaseSerializer