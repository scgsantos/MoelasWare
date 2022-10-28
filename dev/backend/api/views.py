from django.shortcuts import get_object_or_404

from django.http import JsonResponse
from dev.backend.moelasware.models import QuizAnswer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.decorators import login_required
from django.http.response import HttpResponseBadRequest


from moelasware.models import Test, User, Quiz, QuizAnswer, QuizTag, Tag, Submission, SubmissionAnswer
from .serializers import GetTestSerializer, CreateTestSerializer, GetAuthUserSerializer, CreateQuizSerializer, CreateQuizAnswerSerializer, CreateQuizTagSerializer, CreateTagSerializer

@api_view(['GET']) # allowed method(s)
def get_test_view( request, pk, *args, **kwargs ):

	# get test by id -> detail view
	instance = get_object_or_404(Test, pk=pk)
	serializer = GetTestSerializer(obj, many=False)

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
@login_required
def create_quizz(request, pk):
    #Get user by id
    user = User.objects.filter(id=pk) 
    if not user:
        return HttpResponseBadRequest('User not found')
    user = User.objects.get(id=pk).user.username 
    
    #Create a quiz
    serializer = CreateQuizSerializer(data=request.data)
    quiz = Quiz.objects.create(question=serializer.data['question'], description=serializer.data['description'], id_autor=user)
    
    if serializer.is_valid(raise_exception=True):
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
 
    #Create 6 quiz answers
    for i in range(6):
        serializer = CreateQuizAnswerSerializer(data=request.data)
        answer = QuizAnswer.objects.create(id_quiz=quiz.id, text=serializer.data['text'], correct=serializer.data['correct'], justification=serializer.data['justification'])
        if serializer.is_valid(raise_exception=True):
            answer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
    
    
    #Assosiete a tag to the quiz
    serializer = CreateQuizTagSerializer(data=request.data)
    
    if serializer.is_valid(raise_exception=True):
        quiz.save()
        return JsonResponse({"Quiz was submited for review"},serializer.data, status=status.HTTP_201_CREATED)
    else:
        #Create a tag
        serializer = CreateTagSerializer({'Need to create the Tag'},data=request.data['text'])
        tag = Tag.objects.create(text=serializer.data['text'])
        tag.save()
        serializer = CreateQuizTagSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            quiz.save()
            return JsonResponse({"Quiz was submited for review"},serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse({"Need to create the tag"})
    
    
    
    
