from django.conf.urls import url, include
from rest_framework import routers
from tutorial.quickstart import views
from rest_framework_jwt.views import refresh_jwt_token




router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)
router.register(r'clients', views.ClientViewSet)
router.register(r'event_types', views.EventTypeViewSet)
router.register(r'client_types', views.ClientTypeViewSet)
router.register(r'status', views.StatusViewSet)
router.register(r'auth_user_types', views.AuthUserTypeViewSet)
router.register(r'case_types', views.CaseTypeViewSet)
# router.register(r'cases', views.CaseViewSet, base_name="cases")
router.register(r'auth_user_cases', views.AuthUserCaseViewSet)
router.register(r'events', views.EventViewSet)
router.register(r'case_event', views.CaseEventViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    # url(r'^registration/', include('rest_auth.registration.urls')),
    url(r'^rest-auth/', include('rest_auth.urls')),
    url(r'^rest-auth/registration/', include('rest_auth.registration.urls')),
    url(r'^refresh-token/', refresh_jwt_token),
    url(r'^cases/', views.CaseViewSet.as_view())
]
