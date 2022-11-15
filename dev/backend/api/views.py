
import random
from pickle import OBJ
from django.contrib.auth.models import User as AuthUser
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from dev.backend.moelasware.models import QuizAnswer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.decorators import login_required
from django.http.response import HttpResponseBadRequest
import random


from moelasware.models import Test, User, Quiz, QuizAnswer, QuizTag, Tag, Submission, SubmissionAnswer, Review, QuizReview
from .serializers import GetTestSerializer, CreateTestSerializer, GetTagSerializer     

@api_view(['GET']) # allowed method(s)
def get_test_view( request, pk, *args, **kwargs ):

	# get test by id -> detail view
	instance = get_object_or_404(Test, pk=pk)
	serializer = GetTestSerializer(OBJ, many=False)

	return JsonResponse({'test': serializer.data})

@api_view(['POST', 'GET'])
def create_test_view( request ):
	serializer = CreateTestSerializer(data=request.data)

	if serializer.is_valid(raise_exception=True): # raises exception on why its not valid
		#instance = serializer.save()
		
		#print(instance)
		return Response(serializer.data)


	return Response({'invalid': 'not good data'}, status=400)

@api_view(['GET'])
def edit_quizz(request):
    
    quiz = QuizReview.objects.all()
    flag = 0;
    for i in quiz:
        if i.accepted == False:
            flag = quiz.id
            return HttpResponseBadRequest(quiz.comment)
    create_quizz(request)