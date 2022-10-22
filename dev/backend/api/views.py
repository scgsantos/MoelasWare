from django.shortcuts import get_object_or_404

from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from moelasware.models import Quiz, Test
from .serializers import GetTestSerializer, CreateTestSerializer


@api_view(['GET']) # allowed method(s)
def get_test_view( request, pk, *args, **kwargs ):

	# get test by id -> detail view
	instance = get_object_or_404(Test, pk=pk)
	serializer = GetTestSerializer(instance, many=False)

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
# function that selects the test that the user wants to solve
def submission_view(request, pk):
	
	# verify if the user has created at least one test
	done_quiz = Quiz.objects.filter(author=request.user.pk)
	
	# verify if there is at least one test available to solve
	available_test = Test.objects.first()
	
	# verify if the user is not logged in
	if not request.user.is_authenticated:
		return JsonResponse({'error': 'You must be logged in to solve a test'}, status = status.HTTP_401_UNAUTHORIZED)
	elif not done_quiz.exists():
		return JsonResponse({'error': 'You must create at least one quiz to solve a test'}, status = status.HTTP_412_PRECONDITION_FAILED)
	elif not available_test.exists():
		return JsonResponse({'error': 'There are no tests available to solve'}, status = status.HTTP_404_NOT_FOUND)
	else:
		# get the test that the user wants to solve
		test = get_object_or_404(Test, pk=pk)
		serializer = GetTestSerializer(test, many=False)
		
		return JsonResponse({'test': serializer.data})











	