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



@api_view(['GET','POST'])
def create_test_view( request ):
	if request.method == 'GET':
		# get all tests -> list view
		queryset = Test.objects.all()
		serializer = GetTestSerializer(queryset, many=True)

		return JsonResponse({'tests': serializer.data}, status=status.HTTP_200_OK)
	
	elif request.method == 'POST':
		''' Body:
		{
    		"author": 1,
    		"quizzes": [1],
    		"name": "teste123"
		}
		'''
		serializer = CreateTestSerializer(data=request.data)

		if serializer.is_valid(raise_exception=True): # raises exception on why its not valid
			#instance = serializer.save()
			
			#print(instance)
			return Response(serializer.data, status=status.HTTP_201_CREATED)

	return Response({'invalid': 'not good data'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST'])
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
		if request.method == 'GET':
			# get the test that the user wants to solve
			test = get_object_or_404(Test, pk=pk)
			serializer = GetTestSerializer(test, many=False)
		
			return JsonResponse({'test': serializer.data})
		elif request.method == 'POST':
			# Add new submission by changing the awnsers
			test = get_object_or_404(Test, pk=pk)
			# change the awnsers according to request's Body
			test.awnsers = request.data['awnsers']
			serializer = GetTestSerializer(test, many=False)

			return JsonResponse({'message': 'Submited test successfully'}, status=status.HTTP_201_CREATED)

			










