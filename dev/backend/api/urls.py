from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from api import views

urlpatterns = [
    path("tests/<int:pk>/", views.get_test_view),
    path("tests/<int:pk>/submissions/", views.submission_view),
    path("tests/", views.tests_view),
    path("tags/<int:pk>/", views.get_tag_view),
    path("tags/", views.get_tag_view),
    path("quizzes/gen/", views.get_n_quizzes_view),
    path("quizzes/<int:quiz_id>/answers/", views.get_answers_for_quiz_view),
    path("quizzes/count/", views.get_total_number_of_quizzes_view),
    path("quizzes/<int:pk>/", views.get_quiz_view),
    path("quizzes/<int:id>/reviewers/", views.get_quiz_reviewers_view),
    path("quizzes/review/", views.create_quiz_review_view),
    path("users/<int:pk>/submissions/", views.submissions_by_user_view),
    path("fame/", views.hall_of_fame_view),
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("register/", views.register_view),
	path("unfinished_quizzes/",views.get_unfinished_quizzes),
	path("unfinished_quizzes_edit/",views.get_quiz_info)
]
