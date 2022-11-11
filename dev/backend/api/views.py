from random import sample
from itertools import groupby

from django.http import JsonResponse, HttpResponseForbidden, HttpResponseBadRequest, Http404
from rest_framework.decorators import api_view
from rest_framework import status

from django.shortcuts import get_object_or_404
from moelasware.models import Test, Quiz, Tag, QuizAnswer, User, Submission, SubmissionAnswer
from api.serializers import CreateTestSerializer, GetTestSerializer, QuizSerializer, QuizAnswerSerializer, TagSerializer, SubmissionSerializer, QuizAnswerSerializerWithRes, SubmissionAnswerSerializer

DEFAULT_TEST_PAGE_LIMIT = 20
DEFAULT_TAG_PAGE_LIMIT = 20


@api_view(["GET"])
def get_test_view(request, pk, *args, **kwargs):
    # get test by id -> detail view
    instance = get_object_or_404(Test, pk=pk)
    serializer = GetTestSerializer(instance, many=False)
    return JsonResponse({"test": serializer.data})


# Create a test
# @api_view(['POST'])
# TODO: ADD DECORATOR WHEN LOGIN IS IMPLEMENTED
# @login_required
def post_test_view(request):
    # TODO: ADD THIS LINE WHEN LOGIN IS IMPLEMENTED
    # author_id = request.user.id
    author_id = 1

    # Required data was all in request (quizzes list was given)
    if "quizzes" in request.data.keys():
        quizzes = request.data.get("quizzes")

    else:
        quizzes_set = get_n_quizzes_view(request)["quizzes"]
        quizzes = quizzes_set.values_list("id", flat=True)

    name = request.data.get("name")
    deserializer_data = {"author": author_id, "name": name, "quizzes": quizzes}
    test_deserializer = CreateTestSerializer(data=deserializer_data)

    if test_deserializer.is_valid(raise_exception=True):
        test = test_deserializer.save()
        response_serializer = GetTestSerializer(test)
        return JsonResponse({"test": response_serializer.data})


@api_view(["POST"])
def get_n_quizzes_view(request):
    # If no quizzes are sent in the request -> quizzes are selected randomly
    # User gave config (num_quizes, allowed_tags (optional))

    if not "num_quizzes" in request.data.keys():
        return HttpResponseBadRequest("You must provide the number of quizzes")

    try:
        num_quizzes = int(request.data.get("num_quizzes"))
    except ValueError:
        return HttpResponseBadRequest(
            f"The number of quizzes must be a number and not {request.data.get('num_quizzes')}"
        )

    tags = request.data.get("allowed_tags")
    quizzes_set = Quiz.objects.order_by("?")

    quizzes_set = (
        quizzes_set.all()
        if not tags
        else quizzes_set.filter(tags__text__in=tags).distinct()
    )

    quizzes_set = quizzes_set[:num_quizzes]

    # Not enough quizzes that meet the specs
    if len(quizzes_set) < num_quizzes:
        return HttpResponseBadRequest(
            "The number of requested quizzes is bigger than the number of existing quizzes meeting the given specifications"
        )

    quizzes_serializer = QuizSerializer(quizzes_set, many=True)

    return JsonResponse({"quizzes": quizzes_serializer.data})


@api_view(['GET'])
def get_answers_for_quiz(request, quiz_id):
    answers_set = QuizAnswer.objects.filter(quiz__id=quiz_id)

    answers_serializer = QuizAnswerSerializer(answers_set, many=True)

    return JsonResponse({"answers": answers_serializer.data})


# @api_view(['GET'])
def get_all_tests_view(request):
    try:
        offset = int(request.query_params.get("offset", default=0))
        limit = int(request.query_params.get(
            "limit", default=DEFAULT_TEST_PAGE_LIMIT))
    except ValueError:
        return HttpResponseBadRequest("Invalid offset and/or limit")

    # TODO: think about actually returning +1 records, for simplifying "Next"-type buttons on frontend
    tests = Test.objects.filter(pk__range=(offset, offset + limit - 1))

    serializer = GetTestSerializer(tests, many=True)
    return JsonResponse({"tests": serializer.data})


# HIGHLY TEMPORARY SOLUTION!
# TODO: move these to class based views once overall implementation is in better shape
# ~tomasduarte
@api_view(["GET", "POST"])
def tests_view(request):
    proxy = {
        "GET": get_all_tests_view,
        "POST": post_test_view,
    }
    return proxy[request.method](request)
    # return Response({"invalid": "not good data"}, status=400)


@api_view(["GET"])
def get_tag_view(request, pk, *args, **kwargs):

    if pk is not None:
        instance = get_object_or_404(Tag, pk=pk)
        serializer = TagSerializer(instance, many=False)

        return JsonResponse({"tag": serializer.data})

    return JsonResponse({"invalid": "not good data"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def get_all_tags_view(request, *args, **kwargs):
    try:
        offset = int(request.query_params.get("offset", default=0))
        limit = int(request.query_params.get(
            "limit", default=DEFAULT_TAG_PAGE_LIMIT))
    except ValueError:
        return HttpResponseBadRequest("Invalid offset and/or limit")

    queryset = Tag.objects.filter(pk__range=(offset, offset + limit))

    serializer = TagSerializer(queryset, many=True)
    return JsonResponse({"tags": serializer.data})


@api_view(["GET"])
def get_quiz_view(request, pk):
    # get a test with all the quizzAnswers attached to it
    if pk is not None:
        instance = get_object_or_404(Test, pk=pk)
        serializer = GetTestSerializer(instance, many=False)

        # get all the Quizzes for this test
        quizzes = Quiz.objects.filter(test__id=pk)
        quizzes_serializer = QuizSerializer(quizzes, many=True)

        # for each quiz get all the answers
        for quiz in quizzes_serializer.data:
            answers = QuizAnswer.objects.filter(quiz__id=quiz["id"])
            answers_serializer = QuizAnswerSerializer(answers, many=True)
            quiz["answers"] = answers_serializer.data

        return JsonResponse({"test": serializer.data, "quizzes": quizzes_serializer.data})

    return JsonResponse({"invalid": "not good data"}, status=status.HTTP_400_BAD_REQUEST)


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
                "quiz_id": 1, # pergunta
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

    # TODO: not sure if this is intended or not, can a user Repeat Quizzes? If so this should be changed
    # check if user alreadysubmitted the quizz in this test
    # if Submission.objects.filter(test__id=pk, user=user).exists():
    #    return HttpResponseBadRequest('You already submitted this test')

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

    # create the submission
    try:
        new_sub, grade = instance.create_submission(user, answers)
    except Exception as e:
        return HttpResponseBadRequest(e)

    submission_serializer = SubmissionSerializer(new_sub, many=False)

    # return the submission
    return JsonResponse({'submission': submission_serializer.data, 'grade': grade}, status=status.HTTP_200_OK)

# @api_view(['GET'])
# @login_required
# function that gets a submission from a test, we should allow the user to get someone else's submission


def get_self_submission_view(request, pk, user):
    # check if the uer is able to solve the test
    if not user.can_solve_tests():
        # You should just return a simple plain-text response, no need for JSON. Use HttpResponseForbidden.
        return HttpResponseForbidden('You are not allowed to solve tests')

    # get all quizzes that are in the test
    quizzes = Quiz.objects.filter(test__id=pk)

    # get all the answers for the quizzes
    quizzes_serializer = QuizSerializer(quizzes, many=True)

    for quiz in quizzes_serializer.data:
        answers = QuizAnswer.objects.filter(quiz__id=quiz["id"])
        answers_serializer = QuizAnswerSerializerWithRes(answers, many=True)
        quiz["answers"] = answers_serializer.data

    # get the submission
    submission = Submission.objects.filter(test__id=pk, submitter=user).last()

    # get all the SubmissionAnswer for the submissions with the user and the submission
    submission_answers = SubmissionAnswer.objects.filter(
        submission__id=submission.id)
    submission_answers_serializer = SubmissionAnswerSerializer(
        submission_answers, many=True)

    # append the quizz id to the submission answer
    for submission_answer in submission_answers_serializer.data:
        # from the quizz answer get the quiz id
        quiz_answer = QuizAnswer.objects.filter(
            id=submission_answer["answer"]).first()
        submission_answer["quiz_id"] = quiz_answer.quiz.id

    """
    answers: {
        "quiz_id1": [1,2,3],
        "quiz_id2: [4,5,7],
    }
    """
    grouped_answers = {
        quiz_id: [answer["answer"] for answer in submission_answers_serializer.data if answer["quiz_id"] == quiz_id] for quiz_id in [quiz["id"] for quiz in quizzes_serializer.data]
    }
    return JsonResponse({'answers': grouped_answers, 'quizzes': quizzes_serializer.data}, status=status.HTTP_200_OK)


@api_view(["GET", "POST"])
# @login_required
# function that selects the test SOLVED
def submission_view(request, pk):
    # test user
    user = User.objects.get(pk=1)
    '''
    if not user.is_authenticated:
        return HttpResponseForbidden('Not logged in')
    '''

    proxy = {
        "GET": get_self_submission_view,
        "POST": create_submission,
    }
    return proxy[request.method](request, pk, user)
