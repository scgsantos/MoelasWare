from django.urls import path

from . import views

urlpatterns = [
	path('tests/', views.get_test_view),
]

