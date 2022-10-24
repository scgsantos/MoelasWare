from django.shortcuts import get_object_or_404

from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from moelasware.models import Quiz, Test
from .serializers import GetTestSerializer, CreateTestSerializer
from django.contrib.auth.decorators import login_required


@api_view(['GET'])
@login_required
def get_test_view(request, pk, *args, **kwargs):
    # get the user object
    user = request.user
    # check if the uer is able to solve the test
    if not user.can_solve_tests():
        return JsonResponse({'error': 'User is not allowed to solve tests. Needs to have created at least one quizz'}, status=status.HTTP_403_FORBIDDEN)

    # get test by id -> detail view
    instance = get_object_or_404(Test, pk=pk)
    serializer = GetTestSerializer(instance, many=False)

    return JsonResponse({'test': serializer.data})


@api_view(['GET', 'POST'])
def create_view(request):
    if request.method == 'GET':
        # get all tests -> list view
        queryset = Test.objects.all()
        serializer = GetTestSerializer(queryset, many=True)

        return JsonResponse({'tests': serializer.data}, status=status.HTTP_200_OK)

    if request.method == 'POST':
        ''' Body:
        {
            "author": 1,
            "quizzes": [1],
            "name": "teste123"
        }
        '''
        serializer = CreateTestSerializer(data=request.data)

        # raises exception on why its not valid
        if serializer.is_valid(raise_exception=True):
            return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response({'invalid': 'not good data'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
@login_required
# function that selects the test that the user wants to solve
def submission_view(request, pk):
    # verify if the user has created at least one test
    done_quiz = Quiz.objects.filter(author=request.user.pk)

    # verify if there is at least one test available to solve
    available_test = Test.objects.exists()

    # verify if the user is not logged in
    if not done_quiz.exists():
        return JsonResponse({'error': 'You must create at least one quiz to solve a test'}, status=status.HTTP_412_PRECONDITION_FAILED)

    if not available_test:
        return JsonResponse({'error': 'There are no tests available to solve'}, status=status.HTTP_404_NOT_FOUND)

    test = get_object_or_404(Test, pk=pk)

    if request.method == 'GET':
        serializer = GetTestSerializer(test, many=False)
        # get the test that the user wants to solve
        return JsonResponse({'test': serializer.data}, status=status.HTTP_200_OK)

    if request.method == 'POST':
        # change the awnsers according to request's Body
        # TODO: Change answers from being an array of array of integers
        # to allow for questions being out of order
        # for example:
        """  
        {
                "answers": [
                    {
                        "quiz_id": 1,
                        "quiz_answers": [1, 2]
                    },
                    {
                        "quiz_id": 2,
                        "quiz_answers": [2]
                    }
                ]
            }
            """
        serializer = CreateTestSerializer(data=request.data)

        # raises exception on why its not valid
        if serializer.is_valid(raise_exception=True):
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
