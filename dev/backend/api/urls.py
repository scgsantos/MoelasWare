from django.urls import path

from . import views

urlpatterns = [
	path('tests/<int:pk>/', views.get_test_view),
	path('quizzes/<int:pk>/reviews', views.submission_review_view),
	path('quizzes/<int:pk>/reviwers', views.get_quiz_reviewers_view)
]

