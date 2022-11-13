from django.urls import path

from . import views

urlpatterns = [
	path('tests/<int:pk>/', views.get_test_view),	
	path('login/', views.login),
    path('register/', views.register),
	path('create_quiz/', views.create_quiz),
	path('unfinished_quizzes/',views.unfinished_quizzes),
]