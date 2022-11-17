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

def get_quiz_handler(obj):
    quiz = {'name':obj['name'], 'question':obj['question'], 'description':obj['description'], 'tags':obj['tags'][0]['text']}
    answers_list = []
    for i in obj['quiz_answers']:
        answers_list.append([i['text'], i['justification'], i['correct']])    
    quiz['quiz_answers'] = answers_list
    return quiz


@api_view(['GET'])
def get_quiz_view(request, pk):

    quiz = Quiz.objects.filter(id = pk)

    if not quiz.exists():
        return HttpResponseNotFound('Quiz not found')

    quiz = quiz[0]

    quiz = GetQuizInfo(quiz).data
    quiz = get_quiz_handler(quiz)

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
    quiz_answers = QuizAnswer.objects.filter(quiz = quiz)                                           

    for i in data:
        match i:
            case 'name':
                if type(data['name']) is str and data['name'] is not "":
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

    print(quiz.id, "---", quiz.name, "---", quiz.question, "---", quiz.description)

    for i in quiz.tags.all():
        print("TAG -->", i.text)

    for i in QuizAnswer.objects.filter(quiz = quiz):
        print(i.text, "--", i.justification, "---", i.correct)

    return response

