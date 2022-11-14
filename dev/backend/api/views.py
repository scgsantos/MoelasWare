
from pickle import OBJ
from django.shortcuts import get_object_or_404, render, redirect

from django.http import JsonResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response

from moelasware.models import Test

from django.http.response import HttpResponseBadRequest
import random

from .serializers import GetTestSerializer, CreateTestSerializer, LoginSerializer, RegistrationSerializer

from moelasware.models import Test, Quiz, QuizAnswer, QuizTag, Tag, Submission, SubmissionAnswer, Review, QuizReview, User
from .serializers import GetTestSerializer, CreateTestSerializer


from django.contrib.auth.models import User as AuthUser


from django.contrib.auth import login as llogin


@api_view(['GET'])  # allowed method(s)
def get_test_view(request, pk, *args, **kwargs):
    print(request.user.id)
    # get test by id -> detail view
    ##instance = get_object_or_404(Test, pk=pk)
    ##serializer = GetTestSerializer(OBJ, many=False)

    return JsonResponse({'UserID': request.user.id})


@api_view(['POST'])
def create_test_view(request):
    serializer = CreateTestSerializer(data=request.data)

    if serializer.is_valid(
            raise_exception=True):  # raises exception on why its not valid
        #instance = serializer.save()

        # print(instance)
        return Response(serializer.data)

    return Response({'invalid': 'not good data'}, status=400)


@api_view(['POST'])
def login(request):

    login = LoginSerializer(data=request.data)
    '''
        user = authenticate(request, email=login['email'], password=login.data['password'])

    if user is not None:
        login(request, user)
   '''

    if login.is_valid(raise_exception=True):

        if (AuthUser.objects.filter(email=login.data["email"]).exists()):

            user = AuthUser.objects.get(email=login.data["email"])

            if (user.check_password(login.data["password"])):
                llogin(request, user)

                return JsonResponse(
                    {'Response': 'Successfully logged user in', 'ID': user.id}, status=200)
            else:
                return JsonResponse(
                    {'ERROR': 'Invalid Credentials'}, status=401)
        else:
            return JsonResponse({'ERROR': 'Invalid Credentials'}, status=401)
    else:
        return JsonResponse({'ERROR': 'Missing Credentials'}, status=400)


@api_view(['POST'])
def register(request):

    registration = RegistrationSerializer(data=request.data)

    if registration.is_valid(raise_exception=True):
        if (AuthUser.objects.filter(email=registration.data["email"]).exists(
        ) or AuthUser.objects.filter(username=registration.data["username"]).exists()):
            return JsonResponse({'ERROR': "Invalid Credentials"}, status=401)
        else:
            if (registration.data["password1"] !=
                    registration.data["password2"]):
                return JsonResponse(
                    {'ERROR': "Passwords do not match"}, status=400)
            AuthUser.objects.create_user(
                registration.data["username"],
                registration.data["email"],
                registration.data["password1"])
            user_id = AuthUser.objects.get(
                username=registration.data["username"])
            print(user_id.pk)
           # User.save(User(user_id))
            # User(user_id)
            User.objects.create(user=user_id)
            ##user = User(AuthUser.objects.get(username=registration.data["username"]).pk)
            ##you = User.objects.create(User(user_id))
            # print(you)

            return JsonResponse(
                {'Success': 'Sucessfull Registered'}, status=200)
    else:
        return JsonResponse({'ERROR': 'Missing Credentials'}, status=400)
