from django.urls import path
from rest_framework_simplejwt.views import (TokenObtainPairView,
                                            TokenRefreshView)

from . import views

urlpatterns = [
    path("tests/<int:pk>/", views.get_test_view),
    # path("tests/<int:pk>/submissions/", views.submission_of_a_test_view),
    path("tests/", views.tests_view),
	path('select_test/<int:pk>/', views.select_test_view),
    path("tags/<int:pk>/", views.get_tag_view),
    path("tags/", views.get_tag_view),
    path("quizzes/gen/", views.get_n_quizzes_view),
    path("quizzes/<int:quiz_id>/answers/", views.get_answers_for_quiz_view),
    path("quizzes/count", views.get_total_number_of_quizzes_view),
    path("users/<int:pk>/submissions/", views.submissions_by_user_view),
    path("fame/", views.hall_of_fame_view),
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]
