from django.shortcuts import get_object_or_404
from django.shortcuts import render
from django.http.response import HttpResponseNotFound
from django.http import JsonResponse
from rest_framework.decorators import api_view
import random

from moelasware.models import *
from .serializers import *
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


def handle_serializer(obj):
    obj_list = []
    id = 0

    for i in obj:
        test_id = i["test"]["id"]
        author = i["test"]["author"]["user"]["username"]

        tags = ""
        for j in i["test"]["quizzes"]:
            for tag in j["tags"]:
                if tag["text"] not in tags:
                    tags += tag["text"]
                    tags += ","
        
        tags = tags[0:len(tags)-1]
        id += 1
        obj_list.append({test_id : [test_id, tags, author, id]})

    return obj_list

@api_view(['GET'])
def submissions_by_user_view(request, pk):

    user = get_object_or_404(User, id=pk)

    user = user.user.username 

    submissions = Submission.objects.filter(submitter__user__username=user)

    if not submissions.exists():
        return HttpResponseNotFound('Submissions not found')

    submission = SubmissionSerializer(submissions, many=True).data
    submission = handle_serializer(submission)

    return JsonResponse({'submissions' : submission})

def return_date(date:str):
    date_months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"]
    x = date.replace("T", "-").split("-")
    date_string = date_months[int(x[1]) - 1] + " " + x[2] + " " + x[0]
    return date_string

def handle_serializer_hall_of_fame_view(obj):
    info_list = []
    
    for i in obj:
        author = i["user"]["username"]
        correct_answers = i["correct_answers"]
        date_joined = return_date(str(i["user"]["date_joined"]))
        solved_tests = i["solved_tests"]
        info_list.append({i["id"]: [author, correct_answers, solved_tests, date_joined, i["id"], i["user"]["email"]]})
    
    return info_list 

@api_view(['GET'])
def hall_of_fame_view(request): # falta serializer

    users = User.objects.all().order_by('user')
    if not users.exists():
        return HttpResponseNotFound('User not found')  

    if not SubmissionAnswer.objects.all().exists():
        return HttpResponseNotFound('Submissions not found')
    
    sub = HallOfFameGetUserInfo(users, many=True).data

    sub = handle_serializer_hall_of_fame_view(sub)

    return JsonResponse({'fame': sub})


def handle_serializer_test(obj):
    obj_list = []
    id = 0
    for i in obj:
        author = i["submitter"]["user"]["username"]
        correct_answers = i["correct_answers"]
        total_answers = i["total_answers"]
        
        obj_list.append({id : [id, author, correct_answers, total_answers]})
        id += 1
    return obj_list
 
@api_view(['GET'])
def submission_of_a_test_view(request, pk):

    test = get_object_or_404(Test, id=pk)

    submissions = Submission.objects.filter(test__id=pk)

    if not submissions.exists():
        return HttpResponseNotFound('Submissions not found')

    sub = AnsweredSubmissionsSerializer(submissions, many = True).data
    sub = handle_serializer_test(sub)

    #TODO Add Time
    return JsonResponse({"submissions": sub})  

def handle_serializer_all_tests(obj):
    obj_list = []
    id = 0

    for i in obj:
        test_id = i["id"]
        author = i["author"]["user"]["username"]
        solved_tests = i["solved_tests"]
        tags = ""
        for j in i["quizzes"]:
            for tag in j["tags"]:
                if tag["text"] not in tags:
                    tags += tag["text"]
                    tags += ","
        
        tags = tags[0:len(tags)-1]
        id += 1
        obj_list.append({test_id : [test_id, solved_tests, tags, author]})

    return obj_list 

@api_view(['GET'])
def get_all_tests_view(request):
    
    tests = Test.objects.all().order_by('id') 
    if not tests.exists():
        return HttpResponseNotFound('User not found')

    sub = HallOfFameGetTestInfo(tests, many=True).data
    sub = handle_serializer_all_tests(sub)

    return JsonResponse({'submissions_by_test': sub})
       
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

    for i in data:
        match i:
            case 'description':
                print(data)
                if type(data['description']) is str:
                    quiz.description = data['description']

            case 'question':
                if type(data['question']) is str:
                    quiz.question = data['question']
                    

            case 'tags':
                if type(data['tags']) is list:
                    for j in data['tags']:
                        tag = Tag.objects.filter(text = j)
                        if tag.exists():
                            tag = tag[0]
                            quiz.tags.add(tag)

            case 'answers':
                if type(data['answers']) is list and len(data['answers']) > 0 and len(data['answers']) <= 6:
                    answers_completed = len(data['answers'])
                    for j in data['answers']:
                        if type(j) is list and len(j) == 2:
                            quiz_answer = QuizAnswer(
                                            quiz = quiz,
                                            text = j[0],
                                            justification = j[1],
                                            )  
                            quiz_answer.save()
                    for j in range(answers_completed,6):
                        quiz_answer = QuizAnswer(
                                        quiz = quiz,
                                        )  
                        quiz_answer.save()  

            case 'correct':
                if type(data['correct']) is int and data['correct'] > 0 and data['correct'] <= 6:
                    answers = QuizAnswer.objects.filter(quiz = quiz).order_by('id')
                    for i in range(1,len(answers)+1):
                        if i == data['correct']:
                            answers[i-1].correct = True
                            answers[i-1].save()
    quiz.save()


    for i in Quiz.objects.filter(id = quiz.id):
        print(i.name, i.question, i.description, i.finished)

    for i in QuizAnswer.objects.filter(quiz = quiz):
        print(i.text, i.correct, i.justification)
                     
    return JsonResponse({'Quiz was submited for review':[data['name'],quiz.id]}, status=200)


def get_tag_handler(data):
    tag_list = []
    for i in data:
        tag_list.append(i["text"])
    return tag_list

@api_view(['GET'])
def get_all_tags_view(request):

    tags = Tag.objects.all()
    if not tags.exists:
        return HttpResponseNotFound('Tags not found')

    tags = GetTag(tags, many = True).data
    tags = get_tag_handler(tags)

    return JsonResponse({"tags": tags})


@api_view(['GET'])
def profile_view(request):

    user = User.objects.filter(user__id = 2)

    if not user.exists():
        return HttpResponseNotFound('User not found')

    user = user[0]

    tests_done = Submission.objects.filter(submitter = user)

    if not tests_done.exists():
        return HttpResponseNotFound('Submissions not found')

    correct_answers = SubmissionAnswer.objects.filter(answer__correct = True).filter(submission__submitter = user)
    number_of_correct_answers = correct_answers.count()    

    tags = {}
    for i in Tag.objects.all():
        tags[i.text]=0


    for i in correct_answers:
        for j in i.answer.quiz.tags.all():
            tags[j.text]+=1

    return JsonResponse({"quiz": tags, "number_of_correct_answers": number_of_correct_answers})

@api_view(['GET'])
def get_quiz_view(request, pk):

    quiz = Quiz.objects.filter(id = pk)

    if not quiz.exists():
        return HttpResponseNotFound('Quiz not found')

    quiz = quiz[0]
    if quiz.finished:
        return HttpResponseNotFound('Quiz already finished')


    quiz = GetQuizInfo(quiz).data

   
    return JsonResponse({'quiz': quiz})

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

    for i in data:
        match i:
            case 'description':
                if type(data['description']) is str and data['description'] is not None:
                    quiz.description = data['description']

            case 'question':
                if type(data['question']) is str and data['question'] is not None:
                    quiz.question = data['question']
                    
            case 'tags':
                if type(data['tags']) is list and data['tags'] is not None:
                    for j in quiz.tags.all():
                        quiz.tags.remove(j)

                    for j in data['tags']:
                        tag = Tag.objects.filter(text = j)
                        if tag.exists():
                            tag = tag[0]
                            quiz.tags.add(tag)

            case 'answers':
                if type(data['answers']) is list and len(data['answers']) > 0 and len(data['answers']) <= 6:     
                    quiz_answers = QuizAnswer.objects.filter(quiz = quiz)                   
                    for j in range(len(data['answers'])):
                        if type(data['answers'][j]) is list and len(data['answers'][j]) == 2:
                            quiz_answers[j].text = data['answers'][j][0]
                            quiz_answers[j].justification = data['answers'][j][1]
                            quiz_answers[j].save()              
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

    quiz.save()


    for i in Quiz.objects.filter(id = quiz.id):
        print(i.name, i.question, i.description, i.finished)

    for i in QuizAnswer.objects.filter(quiz = quiz):
        print(i.text, i.correct, i.justification)
                     
    return JsonResponse({'Quiz was submited for review':data['name']}, status=200)

def finish_quiz(quiz : Quiz, quiz_answers : list):

    if quiz.name != None and quiz. 
    return
