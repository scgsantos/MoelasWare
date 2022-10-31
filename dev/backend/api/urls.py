from django.urls import path

from . import views

urlpatterns = [
	path('tests/<int:pk>/', views.get_test_view),
	path('tests/', views.tests_view),
	path('quizzes/gen/', views.get_n_quizzes_view),
    path('tags/<int:pk>/', views.get_tag_view),
	path('tags/', views.get_tag_view),
]
