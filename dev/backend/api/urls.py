from django.urls import path

from . import views

urlpatterns = [
	path('tests/<int:pk>/', views.get_test_view),
	path('users/<int:pk>/submissions/', views.submissions_by_user_view),
	path('fame/', views.hall_of_fame_view),
	path('tests/<int:pk>/submissions/', views.submission_of_a_test_view),
	path('tests/', views.get_all_tests_view),
    path('quiz/create/', views.create_quiz),
]

