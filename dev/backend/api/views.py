from http.client import BAD_REQUEST
from django.shortcuts import get_object_or_404
from django.shortcuts import render
from django.http.response import HttpResponseNotFound
from django.http import JsonResponse
from rest_framework.decorators import api_view

from moelasware.models import Test, Submission, SubmissionAnswer, User, AuthUser
from .serializers import GetSubmissionsAnsweredByTest, GetTestSerializer, CreateTestSerializer


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

@api_view(['GET'])
def submissions_by_user_view(request, pk):
    user = get_object_or_404(User, id=pk)
    user = user.user.username 
    submissions = SubmissionAnswer.objects.filter(submission__submitter__user__username=user)

    if not submissions.exists():
        return HttpResponseNotFound('Submissions not found')


    submission = GetSubmissionsAnsweredByTest(submissions, many=True)

    return JsonResponse({'submissions_by_user' : submission.data})


@api_view(['GET'])
def hall_of_fame_view(request):
    users = User.objects.all().order_by('-user') 
    if not users.exists():
        return HttpResponseNotFound('User not found')

    submissions = SubmissionAnswer.objects.all()
    if not submissions.exists():
        return HttpResponseNotFound('Submissions not found')

    info_list = []
    for user in users:
        username = user.user.username
        solved_tests = SubmissionAnswer.objects.filter(submission__submitter__user__username=user.user.username).count()
        date_joined = user.user.date_joined
        correct_answers = SubmissionAnswer.objects.filter(submission__submitter=user).filter(answer__correct=True).count()
        info_list.append({username: [date_joined, solved_tests, correct_answers]})

    #TODO Create Serializer for this
    return JsonResponse({'fame': info_list})
    

@api_view(['GET'])
def submission_of_a_test_view(request, pk):
    test = get_object_or_404(Test, id=pk)

    submissions = SubmissionAnswer.objects.filter(submission__test__id=pk)

    if not submissions.exists():
        #print("This is user hasn't taken any tests yet...")
        return HttpResponseNotFound('Submissions not found')
    
    submission = GetSubmissionsAnsweredByTest(submissions, many=True)

    #TODO Add Time
    return JsonResponse({"submissions_by_test": submission.data})    
