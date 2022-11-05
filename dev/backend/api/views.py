from random import sample

from django.http import JsonResponse, HttpResponseForbidden, HttpResponseBadRequest, Http404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from moelasware.models import Test, Quiz, Tag, QuizAnswer
from api.serializers import CreateTestSerializer, GetTestSerializer, QuizSerializer, QuizAnswerSerializer

from moelasware.models import Quiz, Test
from .serializers import GetTestSerializer, CreateTestSerializer
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login, authenticate

DEFAULT_TEST_PAGE_LIMIT = 20
DEFAULT_TAG_PAGE_LIMIT = 20


@api_view(['GET'])
# @login_required
def get_test_view(request, pk):
    # get the user object from the logged in user
    user = request.user

    # if the user doesnt exist return not logged in
    if not user.is_authenticated:
        return HttpResponseForbidden('Not logged in')

    # check if the uer is able to solve the test
    if not user.can_solve_tests():
        # You should just return a simple plain-text response, no need for JSON. Use HttpResponseForbidden.
        return HttpResponseForbidden('You are not allowed to solve tests')

    # get test by id -> detail view
    instance = get_object_or_404(Test, pk=pk)
    serializer = GetTestSerializer(instance, many=False)

    return JsonResponse({'test': serializer.data}, status=status.HTTP_200_OK)

# @api_view(['POST'])
# @login_required
# function that creates a submission from a test
def create_submission(request, pk, user):
    # change the awnsers according to request's Body
    # TODO: Change answers from being an array of array of integers
    # to allow for questions being out of order
    # for example:
    """  
    {
        "answers": [
            {
                "quiz_id": 1,
                "quiz_answers": [1, 2] # id's of the answers choosen
            },
            {
                "quiz_id": 2,
                "quiz_answers": [2] # id's of the answers choosen
            }
        ]
    }
    """

    # check if the uer is able to solve the test
    if not user.can_solve_tests():
        # You should just return a simple plain-text response, no need for JSON. Use HttpResponseForbidden.
        return HttpResponseForbidden('You are not allowed to solve tests')

    # get test by id -> detail view
    instance = get_object_or_404(Test, pk=pk)

    # get the answers from the request body
    answers = request.data.get('answers', None)

    # check if the answers are valid
    if not answers:
        return HttpResponseBadRequest('No answers provided')

    if not isinstance(answers, list):
        return HttpResponseBadRequest('Answers must be a list')

    # check if the answers are valid
    for answer in answers:
        if not isinstance(answer, dict):
            return HttpResponseBadRequest('Answers must be a list of dicts')

        if not answer.get('quiz_id', None):
            return HttpResponseBadRequest('Answers must have a quiz_id')

        if not answer.get('quiz_answers', None):
            return HttpResponseBadRequest('Answers must have a quiz_answers')

        if not isinstance(answer.get('quiz_answers', None), list):
            return HttpResponseBadRequest('quiz_answers must be a list')

    # check if the answers are valid
    for answer in answers:
        quiz_id = answer.get('quiz_id', None)
        quiz_answers = answer.get('quiz_answers', None)

        # get the quiz
        quiz = get_object_or_404(Quiz, pk=quiz_id)

        # check if the quiz is in the test
        if quiz not in instance.quizzes.all():
            return HttpResponseBadRequest('Quiz is not in the test')

        # check if the quiz answers are valid
        for quiz_answer in quiz_answers:
            if not isinstance(quiz_answer, int):
                return HttpResponseBadRequest('quiz_answers must be a list of integers')

            if quiz_answer < 0 or quiz_answer >= quiz.get_number_of_options():
                return HttpResponseBadRequest('quiz_answers must be a list of integers between 0 and the number of options')

    # create the submission
    try:
        submission = instance.create_submission(user, answers)
    except Exception as e:
        if isinstance(e, ValueError):
            return HttpResponseBadRequest(e)

    # return the submission
    return JsonResponse({'submission': submission}, status=status.HTTP_200_OK)

# @api_view(['GET'])
# @login_required
# function that gets a submission from a test, we should allow the user to get someone else's submission
def get_self_submission_view(request, pk, user):

    # check if the uer is able to solve the test
    if not user.can_solve_tests():
        # You should just return a simple plain-text response, no need for JSON. Use HttpResponseForbidden.
        return HttpResponseForbidden('You are not allowed to solve tests')

    # get test by id -> detail view
    instance = get_object_or_404(Test, pk=pk)
    serializer = GetTestSerializer(instance, many=False)

    return JsonResponse({'test': serializer.data}, status=status.HTTP_200_OK)


@api_view(["GET", "POST"])
# @login_required
# function that selects the test SOLVED
def submission_view(request, pk):
    user = request.user

    if not user.is_authenticated:
        return HttpResponseForbidden('Not logged in')
    
    proxy = {
        "GET": get_self_submission_view,
        "POST": create_submission,
    }
    return proxy[request.method](request, pk, user)
    
