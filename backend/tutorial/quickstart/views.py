from django.contrib.auth.models import User, Group
from tutorial.quickstart.models import Client, Auth_User_Type, Case, Auth_User_Case, Court, Fine, SentenceCompliance, Offense, ChargeType, SentencingStatus, CaseOutcome, PreTrialStatus, Violation, Punishment, PunishmentType, Probation, ProbationType, FailToAppear, Trial 
from rest_framework import status, viewsets, generics
from rest_framework.decorators import detail_route, list_route #action
from tutorial.quickstart.serializers import UserSerializer, GroupSerializer, ClientSerializer, AuthUserTypeSerializer, CaseSerializer, AuthUserCaseSerializer, CourtSerializer, FineSerializer, SentenceComplianceSerializer, OffenseSerializer, ChargeTypeSerializer, SentencingStatusSerializer, CaseOutcomeSerializer, PreTrialStatusSerializer, ViolationSerializer, PunishmentSerializer, PunishmentTypeSerializer, ProbationSerializer, ProbationTypeSerializer, FailToAppearSerializer, TrialSerializer

from django.contrib.auth.models import User
from rest_framework import status, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response

import json



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

class SentenceComplianceViewSet(APIView):
    """
    API endpoint that allows clients to be viewed or edited.
    """
    def get(self, request, *args, **kwargs):
        queryset = SentenceCompliance.objects.all()
        serializer_class = SentenceComplianceSerializer(queryset, many=True)
        return Response(serializer_class.data)

    def post(self, request, *args, **kwargs):
        case = Case.objects.get(caseNumber=request.data.get('caseNumber'))

        # this could be factored out into a patch request if desired
        case.caseClosed = request.data.get('caseClosed')
        case.save()

        violation, created = Violation.objects.get_or_create(
            violationName = request.data.get('violationName')
        )

        sentenceCompliance = SentenceCompliance.objects.create(
            admit = request.data.get('admit'),
            reserve = request.data.get('reserve'),
            violationID = violation,
            caseID = case
        )

        return Response({'status': 'Case created'})


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

class CaseInfoViewSet(APIView):

    def get(self, request, *args, **kwargs):
        id = request.query_params.get('id', None)
        cases = Case.objects.filter(clientID=id)

        # results = CaseSerializer(cases, many=True).data
        results = []
        if id is not None:
            i = 0
            for case in cases:
                results.append({})
                results[i]["caseInfo"] = CaseSerializer(case).data
                fta = FailToAppear.objects.filter(caseID=case.id)
                results[i]["failToAppearInfo"] = FailToAppearSerializer(fta, many=True).data
                punishments = Punishment.objects.filter(caseID = case.id)
                results[i]["punishmentInfo"] = PunishmentSerializer(punishments, many=True).data
                for punishmentInstance in results[i]["punishmentInfo"]:

                    # also get punishment name
                    punishmentType = PunishmentType.objects.get(id=punishmentInstance['punishmentTypeID'])
                    punishmentInstance['punishmentTypeName'] = punishmentType.punishmentTypeName 

                probations = Probation.objects.filter(caseID = case.id)
                results[i]["probationInfo"] = ProbationSerializer(probations, many=True).data
                trials = Trial.objects.filter(caseID = case.id)
                results[i]["trialInfo"] = TrialSerializer(trials, many=True).data
                i += 1
        return Response(results)


        # serializer_class = CaseSerializer(queryset, many=True)
        # return Response(serializer_class.data)



class CaseViewSet(APIView):
    """
    API endpoint that allows clients to be viewed or edited.
    """
    # queryset = Case.objects.all()
    # serializer_class = CaseSerializer
    def get(self, request, *args, **kwargs):
        print("shit")
        id = request.query_params.get('id', None)
        print(id)
        queryset = Case.objects.all()
        serializer_class = CaseSerializer(queryset, many=True)
        return Response(serializer_class.data)

    def post(self, request, *args, **kwargs):
        clientID = Client.objects.get(first_name=request.data.get('clientFirstName'), last_name=request.data.get('clientLastName'))
        

        preTrialStatusName = request.data.get('preTrialStatusName')
        preTrialStatus = None
        if preTrialStatusName:
            preTrialStatus, created = PreTrialStatus.objects.get_or_create(
                preTrialStatusName = preTrialStatusName
            )
        
        sentencingStatusName = request.data.get('sentencingStatusName')
        sentencingStatus = None
        if sentencingStatusName:
            sentencingStatus, created = SentencingStatus.objects.get_or_create(
                sentencingStatusName = sentencingStatusName
            )
        
        caseOutcomeName = request.data.get('caseOutcomeName')
        caseOutcome = None
        if caseOutcomeName:
            caseOutcome, created = CaseOutcome.objects.get_or_create(
                caseOutcomeName = caseOutcomeName
            )
        
        courtName = request.data.get('courtName')
        court = None
        if courtName:
            court, created = court.objects.get_or_create(
                courtName = courtName
            )


        

        # Save the case
        case = Case.objects.create(
            caseNumber=request.data.get('caseNumber'),
            sentenceStart=request.data.get('sentenceStart'),
            sentenceEnd=request.data.get('sentenceEnd'),
            jailTimeSuspended=request.data.get('jailTimeSuspended'),
            # isPayWorkCrew=request.data.get('isPayWorkCrew'),
            # isPayCommunityService=request.data.get('isPayCommunityService'),
            isDomesticViolence=request.data.get('isDomesticViolence'),
            benchWarrant=request.data.get('benchWarrant'),
            isCaseClosed=request.data.get('isCaseClosed'),
            clientID=clientID,
            preTrialStatusID=preTrialStatus,
            sentencingStatusID=sentencingStatus,
            caseOutcomeID=caseOutcome,
            courtID=court,
            )


        offenseDate = request.data.get('offenseDate')
        if (offenseDate):
            # first make the charge type
            chargeType, created = ChargeType.objects.get_or_create(
                chargeTypeName = request.data.get('chargeTypeName')
            )
            chargeType.save()
            offense = Offense.objects.create(
                offenseDate = offenseDate,
                chargeTypeID = chargeType,
                caseID = case
            )
            offense.save()
        case.save()

        failToAppearDate = request.data.get('failToAppearDate')
        if (failToAppearDate):
            failToAppear = FailToAppear.objects.create(
                failToAppearDate = failToAppearDate,
                caseID = case
            )

        # @Calvin Korver what is this hack?
        # if(request.data.get('charge1') != None):
        #     print("Here")
        #     chargeID = Charge.objects.get(name=request.data.get('charge1'))
        #     print(chargeID)
        #     print(case)
        return Response({'status': 'Case created'})

    def delete(self, request):
        case = Case.objects.get(id = request.data.get('id'))
        case.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

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

    def put(self, request):
        case = Case.objects.get(caseNumber=request.data.get('caseNumber'))

        preTrialStatusName = request.data.get('preTrialStatusName')
        preTrialStatus = None
        if preTrialStatusName:
            preTrialStatus, created = PreTrialStatus.objects.get_or_create(
                preTrialStatusName = preTrialStatusName
            )
            case.preTrialStatusID = preTrialStatus

        sentencingStatusName = request.data.get('sentencingStatusName')
        sentencingStatus = None
        if sentencingStatusName:
            sentencingStatus, created = SentencingStatus.objects.get_or_create(
                sentencingStatusName = sentencingStatusName
            )
            case.sentencingStatusID=sentencingStatus
        
        caseOutcomeName = request.data.get('caseOutcomeName')
        caseOutcome = None
        if caseOutcomeName:
            caseOutcome, created = CaseOutcome.objects.get_or_create(
                caseOutcomeName = caseOutcomeName
            )
            case.caseOutcomeID=caseOutcome

        # handle different types of punishments
        communityServiceDays = request.data.get('communityServiceDays')
        communityService = None
        if communityServiceDays:
            punishmentType, created = PunishmentType.objects.get_or_create(
                punishmentTypeName = 'Community Service'
            )

            communityService= Punishment.objects.create(
                caseID = case,
                punishmentTypeID = punishmentType,
                credit = communityServiceDays,
                dueDate = request.data.get('communityServiceDueDate')
            )

        workCrewDays = request.data.get('creditForWorkCrew')
        workCrew = None
        if workCrewDays:
            punishmentType, created = PunishmentType.objects.get_or_create(
                punishmentTypeName = 'Work Crew'
            )

            workCrew = Punishment.objects.create(
                caseID = case,
                punishmentTypeID = punishmentType,
                credit = workCrewDays,
                dueDate = request.data.get('dueDateForWorkCrew'),
                jurisdiction = request.data.get('jurisdictionOfWorkCrew')
            )
        
        jailTimeDays = request.data.get('creditForTimeServed')
        jailTime = None
        if jailTimeDays:
            punishmentType, created = PunishmentType.objects.get_or_create(
                punishmentTypeName = 'Jail Time'
            )

            communityService= Punishment.objects.create(
                caseID = case,
                punishmentTypeID = punishmentType,
                credit = jailTimeDays,
                dueDate = request.data.get('dueDateForTimeServed')
            )
        
        fines = request.data.get('finesImposed')
        fine = None
        if fines:
            fine = Fine.objects.create(
                caseID = case,
                finesImposed = fines,
                finesSuspended = request.data.get('finesSuspended'),
                isPayCommunityService = request.data.get('isPayCommunityService'),
                isPayWorkCrew = request.data.get('isPayWorkCrew')
            )
        
        trialDate = request.data.get('trialDate')
        trial = None
        if trialDate:
            print(request.data.get('trialStartTime'))
            trial = Trial.objects.create(
                caseID = case,
                trialDate = trialDate,
                isMotion35=request.data.get('isMotion35'),
                isMotion36=request.data.get('isMotion36'),
                trialTime=request.data.get('trialStartTime')
            )

        # update the fields in case 
        if(request.data.get('startSentence')):
            case.sentenceStart=request.data.get('startSentence')
        if(request.data.get('endSentence')):
            case.sentenceEnd=request.data.get('endSentence')
        if(request.data.get('jailTimeSuspended')):
            case.jailTimeSuspended=request.data.get('jailTimeSuspended')
        if(request.data.get('isDomesticViolence')):
            case.isDomesticViolence=request.data.get('isDomesticViolence')
        if(request.data.get('benchWarrant')):
            case.benchWarrant=request.data.get('benchWarrant')
        if(request.data.get('isCaseClosed')):
            case.isCaseClosed=request.data.get('isCaseClosed')
        if(request.data.get('treatmentOrdered')):
            case.treatmentOrdered=request.data.get('treatmentOrdered')
        # case.preTrialStatusID=preTrialStatus
        # case.sentencingStatusID=sentencingStatus
        # case.caseOutcomeID=caseOutcome
        case.save()
        return Response("PUT succeeded")


class AuthUserCaseViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows clients to be viewed or edited.
    """
    queryset = Auth_User_Case.objects.all()
    serializer_class = AuthUserCaseSerializer