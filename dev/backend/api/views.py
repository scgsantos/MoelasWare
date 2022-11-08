from django.shortcuts import get_object_or_404

from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.decorators import login_required
from django.http.response import HttpResponseBadRequest


from moelasware.models import Test, User, Quiz, QuizAnswer, QuizTag, Tag, Submission, SubmissionAnswer
from .serializers import GetTestSerializer, CreateTestSerializer, GetAuthUserSerializer, CreateQuizSerializer, CreateQuizAnswerSerializer, CreateQuizTagSerializer, CreateTagSerializer, GetQuizSerializer, GetTagSerializer, GetQuizTagSerializer,CreateQuizTagSerializer, GetQuizAnswerSerializer     

@api_view(['GET']) # allowed method(s)
def get_test_view( request, pk, *args, **kwargs ):

	# get test by id -> detail view
	instance = get_object_or_404(Test, pk=pk)
	serializer = GetTestSerializer(obj, many=False)

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
def create_quizz(request):    
    #Get user by id

    user = request.data.get("user")
    user = User.objects.get(pk=user)
    if not user:
        return HttpResponseBadRequest('User not found')
    user = user.id    
    #Create a quiz    
    
    #Request a quizz tag
    text = request.data.get("text")
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
        
    deserializer_data = {"author": user, "tags": [tag], "question": question, "description": description}
    quiz_deserializer = CreateQuizSerializer(data=deserializer_data)

    if quiz_deserializer.is_valid(raise_exception=True):
        quiz = quiz_deserializer.save()
        response_serializer = GetQuizSerializer(quiz) 
        JsonResponse({"quiz": response_serializer.data})
    
    #Associate the quiz with the tag
    quiz_id = response_serializer.data.get("id")
    deserializer_data = {"quiz_id": quiz_id, "tag_id": tag}
    quiz_tag_deserializer = CreateQuizTagSerializer(data=deserializer_data)
    """
    if quiz_tag_deserializer.is_valid(raise_exception=True):
        
            Esta a dar erro n sei pq
            quiz_tag = quiz_tag_deserializer.save()
        
        response_serializer = GetQuizTagSerializer(quiz_tag)
        JsonResponse({"quiz_tag": response_serializer.data})
    """
    #Create 6 quiz answers
    text = request.data.get("text_answer")
    correct = request.data.get("correct")
    justification = request.data.get("justification")
        
    deserializer_data = {"quiz": quiz_id, "text": text, "correct": correct, "justification": justification}
    answer_deserializer = CreateQuizAnswerSerializer(data=deserializer_data)
    """    
    if answer_deserializer.is_valid(raise_exception=True):
        
            Esta a dar erro n sei pq
            answer = answer_deserializer.save() 
        
        response_serializer = GetQuizAnswerSerializer(answer) 
        JsonResponse({"answer": response_serializer.data})
    """
    print(0)
    return JsonResponse({"Quiz was submited for review"})