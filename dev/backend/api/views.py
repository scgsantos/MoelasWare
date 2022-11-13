
import random
from pickle import OBJ
from django.contrib.auth.models import User as AuthUser
from django.http import JsonResponse
from django.http.response import HttpResponseBadRequest
from django.shortcuts import get_object_or_404, redirect, render
from moelasware.models import (Quiz, QuizAnswer, Review,
                               Submission, SubmissionAnswer, Tag, Test, ListUnfinished,User)
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import (CreateQuizAnswerSerializer, CreateQuizSerializer,
                         CreateTagSerializer,
                          CreateTestSerializer, GetAuthUserSerializer,
                          GetQuizAnswerSerializer, GetQuizSerializer,
                          GetTagSerializer,
                          GetTestSerializer, LoginSerializer,
                          RegistrationSerializer,ListUnfinishedSerializer)


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
	

	if login.is_valid(raise_exception=True):
		
		if (AuthUser.objects.filter(email = login.data["email"]).exists()):
		
			user = AuthUser.objects.get(email = login.data["email"])
		
			if(user.check_password(login.data["password"])):
				
		
				return JsonResponse({'Successfully logged user in' : user.id}, status=200)
			else:
				return JsonResponse({'ERROR' : 'Invalid Credentials'}, status=401)
		else:	
			return JsonResponse({'ERROR': 'Invalid Credentials'}, status=401)		
	else:
		return JsonResponse({'ERROR' : 'Missing Credentials'}, status=400)

	
@api_view(['POST'])
def register( request ):
	
	registration = RegistrationSerializer(data=request.data)

	if registration.is_valid(raise_exception=True):
		if(AuthUser.objects.filter(email = registration.data["email"]).exists() or AuthUser.objects.filter(username = registration.data["username"]).exists()):
			return JsonResponse({'ERROR' : "Invalid Credentials"}, status=401)
		else:
			if(registration.data["password1"] != registration.data["password2"]):
				return JsonResponse({'ERROR' : "Passwords do not match"}, status=400)
			AuthUser.objects.create_user(registration.data["username"], registration.data["email"], registration.data["password1"])

			return JsonResponse({'Success' : 'Sucessfull Registered'}, status=200)
	else:
		return JsonResponse({'ERROR' : 'Missing Credentials'}, status=400)




@api_view(['POST'])
def create_quiz(request):    
   
	#Get user by id
    user = request.data.get("author")
    if type(user) is not  str:
        return HttpResponseBadRequest('Wrong type of data')
    user = AuthUser.objects.get(id=user)
    if not user:
        return HttpResponseBadRequest('User not found')
    user = user.id
    #Create a quiz    
    #Request a quizz tag
    tags = request.data.get("tags")
    if type(tags) is not list:
        return HttpResponseBadRequest('Wrong type of data')    
    #if type(text) is not  list:
    #    return HttpResponseBadRequest('Wrong type of data')    
    #for i in text:
    print("OK")
    tag = Tag.objects.filter(text__in=tags)

    if not tag:
        HttpResponseBadRequest('Tags not found, please create a tag')
        #Create a tag
        deserializer_data = {"tags": tags}
        tag_deserializer = CreateTagSerializer(data=deserializer_data)
        if tag_deserializer.is_valid(raise_exception=True):
            tag = tag_deserializer.save()
            response_serializer = GetTagSerializer(tag)
            JsonResponse({"tag": response_serializer.data})

    print("OK")
    print(type(user))
    question = request.data.get("question")
    print(type(question))
    description = request.data.get("description")
    print(type(description))
    if type(question) is not  str or type(description) is not  str:
        return HttpResponseBadRequest('Wrong type of data')

    print("OK")

    reviewer = user(pk= random.randint(1, user.count()))
    reviewer2 = user(pk= random.randint(1, user.count()))
    reviewer3 = user(pk= random.randint(1, user.count()))

    deserializer_data = {"author": user, "tags":tag , "question": question, "description": description,"finished":0}
    print(deserializer_data)
    quiz_deserializer = CreateQuizSerializer(data=deserializer_data)
    print("OK")
    print(quiz_deserializer.initial_data)
    if quiz_deserializer.is_valid(raise_exception=True):
        quiz = quiz_deserializer.save()
        response_serializer = GetQuizSerializer(quiz) 
        JsonResponse({"quiz": response_serializer.data})
    #Associate the quiz with the tag
    print("ya")
    quiz_id = response_serializer.data.get("id")
    deserializer_data = {"tags":tag}
    quiz_tag_deserializer = CreateTagSerializer(data=deserializer_data,many=True)
    print("OK")

    
    if quiz_tag_deserializer.is_valid(raise_exception=True):
        quiz_tag = quiz_tag_deserializer.save()
        response_serializer = GetTagSerializer(quiz_tag)
        JsonResponse({"quiz_tag": response_serializer.data})
	#Create 6 quiz answers
    quizzes = request.data.get("answers")
    correct = int(request.data.get("correct"))
    print("OK")

    for i in range(len(quizzes)):
        
        if(i == correct-1):
            deserializer_data = {"quiz": quiz_id, "text": quizzes[i][0], "justification" : quizzes[i][1], "correct" : "true"}
            CreateQuizAnswerSerializer(data=deserializer_data)
        else:
            deserializer_data = {"quiz": quiz_id, "text": quizzes[i][0], "justification" : quizzes[i][1], "correct" : "false"}
            CreateQuizAnswerSerializer(data=deserializer_data)
    '''
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
    '''
    return JsonResponse({'Quiz was submited for review':''}, status=200)

@api_view(['GET'])
def edit_quizz(request):
    
    quiz = Quiz.objects.all()
    flag = 0
    for i in quiz:
        if i.accepted == False:
            flag = quiz.id
            return HttpResponseBadRequest(quiz.comment)
    create_quiz(request)


@api_view(['POST'])
def unfinished_quizzes(request):
    userid = request.data.get("id")  

    cn = Quiz.objects.filter(author_id=userid)
    arr=[]

    for i in cn:
        arr.append(i.id)
    print(arr)    
    
    return JsonResponse(arr,status=200,safe=False)




