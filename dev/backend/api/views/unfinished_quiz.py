# tenho de dar import
from rest_framework.decorators import api_view
from ..serializers.unfinished_quizz_serializer import CreateEditQuizSerializer
from django.http import JsonResponse
from moelasware.models import Quiz

@api_view(['GET'])
def get_quiz_info ( request ):
    id = request.data.get("id")
    quiz = Quiz.objects.get(id=id)
    author = request.user
    try:
        text = quiz.text
    except AttributeError as e:
        text = None
    
    try:
        description = quiz.description
    except AttributeError as e:
        description = None
    
    try:        
        question = quiz.question
    except AttributeError as e:
        question = None
    
    try:
        answer = quiz.answers
    except AttributeError as e:
        answer = None
    
    try:
        name = quiz.name
    except AttributeError as e:
        name = None	     
    
    try:
        correct = quiz.correct
    except AttributeError as e:
        correct = None
    
    try:
        tags = quiz.tags
    except AttributeError as e:
        tags = None 
    try:
        reviews = quiz.reviews
    except AttributeError as e:
        reviews = None    
  
    serializer = CreateEditQuizSerializer(data={'id':id, 'author':author, 'text':text, 'description':description, 'question':question, 'answer':answer, 'name':name, 'correct':correct, 'tags':tags, 'reviews':reviews})

    JsonResponse(serializer.data)




