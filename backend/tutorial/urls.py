from django.conf.urls import url, include
from rest_framework import routers
from tutorial.quickstart import views
from rest_framework.authtoken.views import obtain_auth_token

# urlpatterns += [ url(r'^obtain-auth-token/$', obtain_auth_token) ]

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)
router.register(r'clients', views.ClientViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^obtain-auth-token/$', obtain_auth_token),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
