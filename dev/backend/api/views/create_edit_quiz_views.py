from django.http.response import HttpResponseNotFound
from django.http import JsonResponse
from rest_framework.decorators import api_view
import random

from moelasware.models import *
from api.serializers import *


def quiz_finished_serializer_handler(data):
    quiz_list = []
    for i in data:
        quiz_list.append([i['name'], i['tags'],i['number_of_reviews_done'], i['review_result']])
    return quiz_list
    
@api_view(['GET'])
def get_user_quizzes(request):

    user = User.objects.filter(user__id = 1)

    if not user.exists():
        return HttpResponseNotFound('User not found')

    user = user[0]

    quizzes = Quiz.objects.filter(author = user).filter(finished = True)

    quizzes = QuizFinishedSerializer(quizzes, many = True).data

    quizzes = quiz_finished_serializer_handler(quizzes)

    return JsonResponse({"list_of_quizzes": quizzes})

@api_view(['POST'])
def create_quiz_view(request):

    data = request.data
    if "name" not in data:
        return HttpResponseNotFound('Name not found')

    quiz = Quiz.objects.filter(name = data['name'])

    if quiz.exists():
        return HttpResponseNotFound(f"Quiz {data['name']} already exists")

    if "author" not in data:
        return HttpResponseNotFound('Author not found')

    author = User.objects.filter(user__id = data['author'])

    if not author.exists():
        return HttpResponseNotFound('Author not found')

    author = author[0]
    quiz = Quiz(name = data['name'], author = author)
    quiz.save()
    for i in range(0,6):
        quiz_answer = QuizAnswer(
                                quiz = quiz,
                                )  
        quiz_answer.save()

    quiz_answers = QuizAnswer.objects.filter(quiz = quiz)                                           

    for i in data:
        match i:
            case 'description':
                if type(data['description']) is str:
                    quiz.description = data['description']

            case 'question':
                if type(data['question']) is str:
                    quiz.question = data['question']

            case 'tags':
                if type(data['tags']) is str:
                    if len(data['tags']) > 0:
                        tag = Tag.objects.filter(text = data['tags'])
                        if tag.exists():
                            tag = tag[0]
                            quiz.tags.add(tag)
                    else:
                        for j in quiz.tags.all():
                            quiz.tags.remove(i)

                        
            case 'answers':
                if type(data['answers']) is list and len(data['answers']) > 0 and len(data['answers']) <= 6:     
                    for j in range(len(data['answers'])):
                        answer = quiz_answers[j]
                        answer.text = data['answers'][j]
                        answer.save()

                elif type(data['answers']) is not list:
                    return HttpResponseNotFound("Wrong Data for Answers Field")
                elif len(data['answers']) == 0:
                    for j in range(len(quiz_answers)):
                        answer = quiz_answers[j]
                        answer.text = ""
                        answer.save()

            case 'justification':
                if type(data['justification']) is list and len(data['answers']) > 0 and len(data['answers']) <= 6:     
                    for j in range(len(data['justification'])):
                        answer = quiz_answers[j]
                        answer.justification = data['justification'][j]
                        answer.save()
                elif type(data['justification']) is not list:
                    return HttpResponseNotFound("Wrong Data for Justification Field")
                elif len(data['justification']) == 0:
                    for j in range(len(quiz_answers)):
                        answer = quiz_answers[j]
                        answer.justification = ""
                        answer.save()                    


            case 'correct':
                if type(data['correct']) is int and data['correct'] > 0 and data['correct'] <= 6:
                    answers = QuizAnswer.objects.filter(quiz = quiz).order_by('id')
                    for i in range(1,len(answers)+1):
                        if i == data['correct']:
                            answers[i-1].correct = True
                            answers[i-1].save()
    quiz.save()
                     
    quizzes = QuizAnswer.objects.filter(quiz = quiz)
                     
    return JsonResponse(finish_quiz(quiz, quizzes))


@api_view(['POST'])
def edit_quiz_view(request):

    data = request.data
    id = data.get("id")


    if "id" not in data:
        return HttpResponseNotFound('Quiz not found')

    quiz = Quiz.objects.filter(id = id).filter(finished = False)

    if not quiz.exists():
        return HttpResponseNotFound('Quiz not found or already finished')

    quiz = quiz[0]

    new_name = Quiz.objects.filter(name = data['name']).filter(author = quiz.author)
    
    if new_name.exists() and quiz.name != new_name[0].name:
        return HttpResponseNotFound(f"Quiz {data['name']} already exists")


    if "author" not in data:
        return HttpResponseNotFound('Author not found')

    author = User.objects.filter(user__id = data['author'])


    if author.exists() and author[0] != quiz.author:
        return HttpResponseNotFound('Author not allowed to edit this quiz')
    elif not author.exists():
        return HttpResponseNotFound('Author not found') 

    author = author[0]
    quiz_answers = QuizAnswer.objects.filter(quiz = quiz)                                           

    for i in data:
        match i:
            case 'name':
                if type(data['name']) is str and data['name'] != "":
                    quiz.name = data['name']
                elif data['name'] == "":
                    return HttpResponseNotFound("Invalid name for quiz")

            case 'description':
                if type(data['description']) is str and data['description'] is not None:
                    quiz.description = data['description']
                else:
                    return HttpResponseNotFound("Wrong Data for Description Field")

            case 'question':
                if type(data['question']) is str and data['question'] is not None:
                    quiz.question = data['question']
                else:
                    return HttpResponseNotFound("Wrong Data for Question Field")
                    
            case 'tags':
                if type(data['tags']) is str:
                    if len(data['tags']) > 0:
                        tag = Tag.objects.filter(text = data['tags'])
                        if tag.exists():
                            tag = tag[0]
                            quiz.tags.add(tag)
                    else:
                        for j in quiz.tags.all():
                            quiz.tags.remove(i)
                else:
                    return HttpResponseNotFound("Wrong Data for Tags Field")

            case 'answers':
                if type(data['answers']) is list and len(data['answers']) > 0 and len(data['answers']) <= 6:     
                    for j in range(len(data['answers'])):
                        answer = quiz_answers[j]
                        answer.text = data['answers'][j]
                        answer.save()

                elif type(data['answers']) is not list:
                    return HttpResponseNotFound("Wrong Data for Answers Field")
                elif len(data['answers']) == 0:
                    for j in range(len(quiz_answers)):
                        answer = quiz_answers[j]
                        answer.text = ""
                        answer.save() 

            case 'justification':
                if type(data['justification']) is list and len(data['answers']) > 0 and len(data['answers']) <= 6:     
                    for j in range(len(data['justification'])):
                        answer = quiz_answers[j]
                        answer.justification = data['justification'][j]
                        answer.save()
                elif type(data['justification']) is not list:
                    return HttpResponseNotFound("Wrong Data for Justification Field")
                elif len(data['justification']) == 0:
                    for j in range(len(quiz_answers)):
                        answer = quiz_answers[j]
                        answer.justification = ""
                        answer.save()              
   
            case 'correct':
                if type(data['correct']) is int and data['correct'] > 0 and data['correct'] <= 6:
                    answers = QuizAnswer.objects.filter(quiz = quiz).order_by('id')
                    flag = False
                    for i in range(len(answers)):
                        if answers[i].correct == True and i + 1 == data['correct']:
                            flag = True

                    if not flag:
                        for i in answers:
                            i.correct = False
                            i.save()

                    answers[data['correct'] - 1].correct = True
                    answers[data['correct'] - 1].save()
                else:  
                    return HttpResponseNotFound("Wrong Data for Correct Field")

    quiz.save()

    quizzes = QuizAnswer.objects.filter(quiz = quiz)
                     
    return JsonResponse(finish_quiz(quiz, quizzes))

def finish_quiz(quiz : Quiz, quiz_answers : list):

    quiz_ready = False
    quiz_answers_ready = True
    correct_answer = False
    if quiz.name != "" and quiz.tags.all().count() > 0 and quiz.question != "" and quiz.description != "" and not quiz.finished and quiz.author is not None:
        quiz_ready = True


    for i in quiz_answers:
        if i.text == "" or i.justification == "":
            quiz_answers_ready = False 
        if i.correct:
            correct_answer = True

    if not correct_answer or not quiz_ready or not quiz_answers_ready:
        response = {'Your quiz has been saved (unfinished)': [quiz.name, quiz.id]}
    else:
        response = {'Your quiz has been finished successfully': [quiz.name, quiz.id]}

        users = User.objects.all()
        users = list(users)
        reviewers_list = []

        number_of_reviewers = 0

        while True:
            if number_of_reviewers == 3:
                break

            random_number = random.randint(0,len(users)-1)
            user = users.pop(random_number)
            reviewers_list.append(user)
            number_of_reviewers += 1
                      
        for i in reviewers_list:
            review = Review(
                        reviewer = i,
                        quiz = quiz,
                        )
            review.save()

        quiz.finished = True
        quiz.save()
    return response
