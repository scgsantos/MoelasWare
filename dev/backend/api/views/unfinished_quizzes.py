from rest_framework.decorators import api_view
from ..serializers.unfinished_quizzes import CreateEditQuizSerializer
from django.http import JsonResponse
from moelasware.models import Quiz

@api_view(['GET'])
def get_unfinished_quizzes( request ):
   #user_id = request.user_id  #i don't remember the table for some stuff
   user_id = 1
   info = Quiz.objects.filter(author = user_id, approved = False)
   quizzes = []
   for i in range(len(info)-1):
        quizzes.append([info[i].name, info[i].id, info[i].creation_date])
   quizzes.reverse()
   return JsonResponse( {"quizzes" : quizzes}, status = 200 )


@api_view(['POST'])
def get_quiz_info ( request ):
    id = request.data.get("id")
    quiz = Quiz.objects.get(id=id)
    author = request.user
    tags = getattr(quiz, "tags", None)
    text = getattr(quiz, "text", None)
    description = getattr(quiz, "description", None)
    question = getattr(quiz, "question", None)
    answer = getattr(quiz, "answer", None)
    name = getattr(quiz, "name", None)
    correct = getattr(quiz, "correct", None)
    tags = getattr(quiz, "tags", None)
	reviews = getattr(quiz, "reviews", None)
	creation_date = getattr(quiz, "creation_date", None)
   
    serializer = CreateEditQuizSerializer(data={'id':id, 'author_id':author, 'text':text, 'description':description, 'question':question, 'answer':answer, 'name':name, 'approved':correct, 'tags':tags, 'reviews':reviews, 'creation_date':creation_date })
    valid =serializer.is_valid()
    if(valid):
        return JsonResponse(serializer.validated_data)
    
