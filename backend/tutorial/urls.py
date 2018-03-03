from django.conf.urls import url, include
from rest_framework import routers
from tutorial.quickstart import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)
router.register(r'clients', views.ClientViewSet)
router.register(r'event_types', views.EventTypeViewSet)
router.register(r'client_types', views.ClientTypeViewSet)
router.register(r'status', views.StatusViewSet)
router.register(r'auth_user_types', views.AuthUserTypeViewSet)
router.register(r'case_types', views.CaseTypeViewSet)
router.register(r'cases', views.CaseViewSet)
router.register(r'auth_user_cases', views.AuthUserCaseViewSet)
router.register(r'events', views.EventViewSet)
router.register(r'case_event', views.CaseEventViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
