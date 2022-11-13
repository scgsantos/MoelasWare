from django.shortcuts import get_object_or_404
from django.shortcuts import render
from django.http.response import HttpResponseNotFound
from django.http import JsonResponse
from rest_framework.decorators import api_view

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
        test_id = i["submission"]["test"]["id"]
        author = i["submission"]["test"]["author"]["user"]["username"]

        tags = ""
        for j in i["submission"]["test"]["quizzes"]:
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

    submissions = SubmissionAnswer.objects.filter(submission__submitter__user__username=user)

    if not submissions.exists():
        return HttpResponseNotFound('Submissions not found')

    submission = GetSubmissionsAnsweredByTest(submissions, many=True)
    submission = handle_serializer(submission.data)

    return JsonResponse({'submissions' : submission})

def return_date(date:str):
	date_months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"]
	x = date.replace(" ", "-").split("-")
	date_string = date_months[int(x[1]) - 1] + " " + x[2] + " " + x[0]
	return date_string

@api_view(['GET'])
def hall_of_fame_view(request):

	users = User.objects.all().order_by('user') 
	if not users.exists():
		return HttpResponseNotFound('User not found')

	if not SubmissionAnswer.objects.all().exists():
		return HttpResponseNotFound('Submissions not found')

	info_list = []
	for user in users:
		username = user.user.username
		solved_tests = Submission.objects.filter(submission__submitter__user__username=user.user.username).count()
		date_joined = return_date(str(user.user.date_joined))
		correct_answers = SubmissionAnswer.objects.filter(submission__submitter=user).filter(answer__correct=True).count()
		info_list.append({user.user.id: [username, date_joined, solved_tests, correct_answers, user.user.id, user.user.email]})

    #TODO Create Serializer for this
	return JsonResponse({'fame': info_list})

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


    """    info_list = []
    for test in tests:
        solved_tests = SubmissionAnswer.objects.filter(submission__test__id=test.id).count()
        tags = ""
        for quiz in test.quizzes.all():
            for tag in quiz.tags.all():
                if tag.text not in tags:
                    tags += tag.text
                    tags += ","

        tags = tags[0:len(tags)-1]
        info_list.append({test.id: [test.id, solved_tests, tags, test.author.user.username]})
        """

    sub = HallOfFameGetTestInfo(tests, many=True).data
    sub = handle_serializer_all_tests(sub)

    return JsonResponse({'submissions_by_test': sub})
