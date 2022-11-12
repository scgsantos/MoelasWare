from django.urls import path

from . import views

urlpatterns = [
    path('tests/<int:pk>/', views.get_test_view),
    path('login/', views.login),
    path('register/', views.register),
]
