
from pickle import OBJ
from django.shortcuts import get_object_or_404, render, redirect

from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response

from moelasware.models import Test
from .serializers import GetTestSerializer, CreateTestSerializer, Login, LoginSerializer, Registration, RegsitrationSerializer

from django.contrib.auth.models import User as AuthUser


@api_view(['GET']) # allowed method(s)
def get_test_view( request, pk, *args, **kwargs ):

	# get test by id -> detail view
	instance = get_object_or_404(Test, pk=pk)
	serializer = GetTestSerializer(OBJ, many=False)

	return JsonResponse({'test': serializer.data})



@api_view(['POST'])
def create_test_view( request ):
	serializer = CreateTestSerializer(data=request.data)

	if serializer.is_valid(raise_exception=True): # raises exception on why its not valid
		#instance = serializer.save()
		
		#print(instance)
		return Response(serializer.data)

	return Response({'invalid': 'not good data'}, status=400)


@api_view(['POST'])
def login( request ):
	
	login = LoginSerializer(data=request.data)

	##probably need to change Response to JsonResponse 
	if login.is_valid(raise_exception=True):
		
		if (AuthUser.objects.filter(username = login.data["username"]).exists()):
			
			user = AuthUser.objects.get(username = login.data["username"])
			
			if(user.check_password(login.data["password"])):
				##need token? just sending id is kinda useless no?
				return JsonResponse({'successfull' : user.id}, status=200)
			else:
				return JsonResponse({'invalid' : 'Wrong Credentials'}, status=400)
		else:	
			return JsonResponse({'invalid': 'Wrong Credentials'}, status=400)		
	else:
		return JsonResponse({'invalid' : 'Missing Credentials'}, status=400)

	
@api_view(['POST'])
def register( request ):
	
	registration = RegsitrationSerializer(data=request.data)

	if registration.is_valid(raise_exception=True):
		if(AuthUser.objects.filter(email = registration.data["email"]).exists() or AuthUser.objects.filter(username = registration.data["username"]).exists()):
			return JsonResponse({'invalid' : "Cannot Register"}, status=400)
		else:
			if(registration.data["password1"] != registration.data["password2"]):
				return JsonResponse({'invalid' : "Passwords do not match"}, status=400)
			AuthUser.objects.create_user(registration.data["username"], registration.data["email"], registration.data["password1"])

			return JsonResponse({'success' : 'Sucessfull Registered'}, status=200)
	else:
		return JsonResponse({'invalid' : 'Missing Credentials'}, status=400)
