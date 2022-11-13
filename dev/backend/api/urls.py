from django.urls import path
from rest_framework_simplejwt.views import (TokenObtainPairView,
                                            TokenRefreshView)

from . import views

urlpatterns = [
    path("tests/<int:pk>/", views.get_test_view),
    path("tests/<int:pk>/submissions/", views.submission_of_a_test_view),
    path("tests/", views.get_all_tests_view),
    path("users/<int:pk>/submissions/", views.submissions_by_user_view),
    path("fame/", views.hall_of_fame_view),
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]
