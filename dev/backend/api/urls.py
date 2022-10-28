from django.urls import path

from . import views

urlpatterns = [
	path('tests/<int:pk>/', views.get_test_view),
	path('tests', views.create_view),
	path('/quizzes/{quiz_id}',views.create_quizz),
]