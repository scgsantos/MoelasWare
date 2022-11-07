from django.urls import path

from . import views

urlpatterns = [
	path('tests/<int:pk>/', views.get_test_view),
	path('quizzes/<int:id>/reviewers', views.get_quiz_reviewers_view),
	path('quizzes/<int:id>', views.get_quiz_view),
	path('quizzes/review', views.create_quiz_review_view)
]

