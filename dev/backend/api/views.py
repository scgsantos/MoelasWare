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
def create_quiz(request):    
    user = request.data.get("author")
    text = request.data.get("text")
    question = request.data.get("question")
    answers = request.data.get("answers")
    name = request.data.get("name")
    correct = request.data.get("correct")


    if type(user) is not int or type(name) is not str or type(text) is not str or type(question) is not str or type(correct) is not int:
        return HttpResponseNotFound('Wrong type of data')

    if len(answers) != 6:
        return HttpResponseNotFound('Not enough answers')

    for i in answers:
        if len(i) != 2:
            return HttpResponseNotFound('Not enough fields completed')

    user = User.objects.filter(user__id=user)
    if not user.exists():
        return HttpResponseNotFound('User not found')

    user = user[0]

    '''
    tag = Tag.objects.filter(text=text)
    if not tag.exists():
        #Create a tag
        deserializer_data = {"text": text}
        tag_deserializer = CreateTagSerializer(data=deserializer_data)
        if tag_deserializer.is_valid(raise_exception=True):
            tag = tag_deserializer.save()
            response_serializer = GetTagSerializer(tag)
            JsonResponse({"tag": response_serializer.data})
    tag = Tag.objects.get(text=text)
    tag = tag.id
'''    
    tags_list = []
    for i in request.data.get("tags"):
        tags_list.append(i)

    if User.objects.all().count() < 3:
        return HttpResponseNotFound("Not enough users to review")

    review_list = []
    number_of_reviewers = 0
    while number_of_reviewers != 3:
        r = User.objects.get(user__id= random.randint(1, User.objects.count()))
        if r not in review_list:
            number_of_reviewers += 1
            review_list.append(r)
   

    '''
    deserializer_data = {"author": user, "tags": [tag], "question": question, "description": description, "reviewer1": reviewer, "reviewer2": reviewer2, "reviewer3": reviewer3}
    quiz_deserializer = CreateQuizSerializer(data=deserializer_data)

    if quiz_deserializer.is_valid(raise_exception=True):
        quiz = quiz_deserializer.save()
        response_serializer = GetQuizSerializer(quiz) 
        JsonResponse({"quiz": response_serializer.data})
    '''
    quiz = Quiz(author=user,
                name=name,
                question=question, 
                description="", 
                reviewer1=review_list[0], 
                reviewer2=review_list[1], 
                reviewer3=review_list[2] 
                )
    quiz.save()
    #BUSCAR TAG
    tags_object_list = []
    for i in tags_list:
        tag_object = Tag.objects.filter(text = i)
        if not tag_object.exists():
            return HttpResponseNotFound('Tag not found')
        else:
            tag_object = tag_object[0]
            quiz.tags.add(tag_object)

        
    '''
    #Associate the quiz with the tag
    quiz_id = response_serializer.data.get("id")
    deserializer_data = {"quiz_id": quiz_id, "tag_id": tag}
    quiz_tag_deserializer = CreateQuizTagSerializer(data=deserializer_data)
    if quiz_tag_deserializer.is_valid(raise_exception=True):
        quiz_tag = quiz_tag_deserializer.save()
        response_serializer = GetQuizTagSerializer(quiz_tag)
        JsonResponse({"quiz_tag": response_serializer.data})
'''
    #Create 6 quiz answers
    for i in range(6):
        if correct == i:
            quizAnswer = QuizAnswer(
                            quiz=quiz,
                            text = answers[0][0],
                            justification = answers[0][1],
                        ) 
        else:
            quizAnswer = QuizAnswer(
                            quiz=quiz,
                            text = answers[0][0],
                            correct = True,
                            justification = answers[0][1],
                        ) 
        quizAnswer.save()

    '''
    deserializer_data = {"quiz": quiz_id, "text": text, "correct": correct, "justification": justification}
    answer_deserializer = CreateQuizAnswerSerializer(data=deserializer_data)
    if answer_deserializer.is_valid(raise_exception=True):
        answer = answer_deserializer.save() 
        response_serializer = GetQuizAnswerSerializer(answer) 
        JsonResponse({"answer": response_serializer.data})
        '''

    for i in Quiz.objects.all():
        if (i == quiz):
            print(i, "------------------->")

    for i in QuizAnswer.objects.filter(quiz = quiz):
        print(i.text, "---------->")
        print(i.justification, "---------->")
        
        
    return JsonResponse({'Quiz was submited for review':''}, status=200)
