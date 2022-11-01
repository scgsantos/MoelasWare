from django.urls import path

from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
urlpatterns = [
	path('tests/<int:pk>/', views.get_test_view),
	path('tests/', views.tests_view),
    path('tags/<int:pk>/', views.get_tag_view),
	path('tags/', views.get_tag_view),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
