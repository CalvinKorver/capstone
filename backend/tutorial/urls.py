from django.conf.urls import url, include
from rest_framework import routers
from tutorial.quickstart import views
from rest_framework_jwt.views import refresh_jwt_token




router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)
router.register(r'clients', views.ClientViewSet)
router.register(r'event-types', views.EventTypeViewSet)
router.register(r'client-types', views.ClientTypeViewSet)
router.register(r'status', views.StatusViewSet)
router.register(r'auth-user-types', views.AuthUserTypeViewSet)
# router.register(r'cases', views.CaseViewSet, base_name="cases")
router.register(r'auth-user-cases', views.AuthUserCaseViewSet)
router.register(r'case-events', views.CaseEventViewSet)
router.register(r'case-charges', views.CaseChargeViewSet)
router.register(r'charges', views.ChargeViewSet)
router.register(r'courts', views.CourtViewSet)
router.register(r'fines', views.FineViewSet)
router.register(r'sentence-compliance', views.SentenceComplianceViewSet)
# router.register(r'cases', views.CaseViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    # url(r'^registration/', include('rest_auth.registration.urls')),
    url(r'^rest-auth/', include('rest_auth.urls')),
    url(r'^rest-auth/registration/', include('rest_auth.registration.urls')),
    url(r'^refresh-token/', refresh_jwt_token),
    url(r'^cases/', views.CaseViewSet.as_view()),
    url(r'^events/', views.EventViewSet.as_view()),
    url(r'^case-types/', views.CaseTypeViewSet.as_view())
]
