from django.contrib import admin
from django.urls import path, include 
from django.conf import settings
from django.conf.urls.static import static
from .views import MyTokenObtainPairView
from rest_framework_simplejwt.views import (TokenRefreshView)


urlpatterns = [
    path('admin/', admin.site.urls), 
    path('api-auth/', include('rest_framework.urls')),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

urlpatterns+= static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)

