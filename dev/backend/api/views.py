
import random
from pickle import OBJ
from django.contrib.auth.models import User as AuthUser
from django.http import JsonResponse

from dev.backend.moelasware.models import QuizAnswer

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.decorators import login_required
from django.http.response import HttpResponseBadRequest
import random


from moelasware.models import Test, User, Quiz, QuizAnswer, QuizTag, Tag, Submission, SubmissionAnswer, Review, QuizReview
from .serializers import GetTestSerializer, CreateTestSerializer, GetAuthUserSerializer, CreateQuizSerializer, CreateQuizAnswerSerializer, CreateQuizTagSerializer, CreateTagSerializer, GetQuizSerializer, GetTagSerializer, GetQuizTagSerializer,CreateQuizTagSerializer, GetQuizAnswerSerializer     

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

@api_view(['POST'])
def create_quizz(request):    
    #Get user by id
    user = request.data.get("user")
    if type(user) is not  str:
        return HttpResponseBadRequest('Wrong type of data')
    user = User.objects.get(pk=user)
    if not user:
        return HttpResponseBadRequest('User not found')
    user = user.id    
    #Create a quiz    
    #Request a quizz tag
    text = request.data.get("text")
    if type(text) is not  str:
        return HttpResponseBadRequest('Wrong type of data')    
    #if type(text) is not  list:
    #    return HttpResponseBadRequest('Wrong type of data')    
    #for i in text:
    tag = Tag.objects.filter(text=text)
    if not tag:
        HttpResponseBadRequest('Tags not found, please create a tag')
        #Create a tag
        deserializer_data = {"text": text}
        tag_deserializer = CreateTagSerializer(data=deserializer_data)
        if tag_deserializer.is_valid(raise_exception=True):
            tag = tag_deserializer.save()
            response_serializer = GetTagSerializer(tag)
            JsonResponse({"tag": response_serializer.data})
    tag = Tag.objects.get(text=text)
    tag = tag.id
    
    question = request.data.get("question")
    description = request.data.get("description")
    if type(question) is not  str or type(description) is not  str:
        return HttpResponseBadRequest('Wrong type of data')
    
    reviwer = User.objects.get(pk= random.randint(1, User.objects.count()))
    reviwer2 = User.objects.get(pk= random.randint(1, User.objects.count()))
    reviwer3 = User.objects.get(pk= random.randint(1, User.objects.count()))
    #while reviwer == reviwer2 or reviwer == reviwer3 or reviwer2 == reviwer3:
    #    reviwer = User.objects.get(pk= random.randint(1, User.objects.count()))
    #    reviwer2 = User.objects.get(pk= random.randint(1, User.objects.count()))
    
    deserializer_data = {"author": user, "tags": [tag], "question": question, "description": description, "reviwer1": reviwer, "reviwer2": reviwer2, "reviwer3": reviwer3}
    quiz_deserializer = CreateQuizSerializer(data=deserializer_data)

    if quiz_deserializer.is_valid(raise_exception=True):
        quiz = quiz_deserializer.save()
        response_serializer = GetQuizSerializer(quiz) 
        JsonResponse({"quiz": response_serializer.data})
    #Associate the quiz with the tag
    quiz_id = response_serializer.data.get("id")
    deserializer_data = {"quiz_id": quiz_id, "tag_id": tag}
    quiz_tag_deserializer = CreateQuizTagSerializer(data=deserializer_data)
    if quiz_tag_deserializer.is_valid(raise_exception=True):
        quiz_tag = quiz_tag_deserializer.save()
        response_serializer = GetQuizTagSerializer(quiz_tag)
        JsonResponse({"quiz_tag": response_serializer.data})
    #Create 6 quiz answers
    text = request.data.get("text_answer")
    correct = request.data.get("correct")
    justification = request.data.get("justification")
    if type(text) is not  str or type(correct) is not  bool or type(justification) is not  str:
        return HttpResponseBadRequest('Wrong type of data')
    deserializer_data = {"quiz": quiz_id, "text": text, "correct": correct, "justification": justification}
    answer_deserializer = CreateQuizAnswerSerializer(data=deserializer_data)
    if answer_deserializer.is_valid(raise_exception=True):
        answer = answer_deserializer.save() 
        response_serializer = GetQuizAnswerSerializer(answer) 
        JsonResponse({"answer": response_serializer.data})
        
    return JsonResponse({'Quiz was submited for review':''}, status=200)

@api_view(['GET'])
def edit_quizz(request):
    
    quiz = QuizReview.objects.all()
    flag = 0;
    for i in quiz:
        if i.accepted == False:
            flag = quiz.id
            return HttpResponseBadRequest(quiz.comment)
    create_quizz(request)