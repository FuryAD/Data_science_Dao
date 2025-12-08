from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse
from rest_framework import routers
from rest_framework.authtoken.views import obtain_auth_token

from api import views as api_views

def root_view(request):
    return JsonResponse({
        'message': 'DAO Quadratic Funding Backend',
        'endpoints': {
            'api': '/api/',
            'admin': '/admin/',
            'auth': '/api-token-auth/',
            'api_docs': '/api/'
        }
    })

router = routers.DefaultRouter()
router.register(r'projects', api_views.ProjectViewSet)

urlpatterns = [
    path('', root_view, name='root'),
    path('admin/', admin.site.urls),
    path('api-token-auth/', obtain_auth_token, name='api_token_auth'),
    path('api/', include(router.urls)),
]
