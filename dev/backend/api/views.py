from random import sample

from django.http import JsonResponse, HttpResponse, HttpResponseBadRequest
from rest_framework.decorators import api_view

from moelasware.models import Test, Quiz, Tag, QuizAnswer
from api.serializers import CreateTestSerializer, GetTestSerializer, QuizSerializer, QuizAnswerSerializer

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
    answers_set = QuizAnswer.objects.filter(quiz__id = quiz_id)

    answers_serializer = QuizAnswerSerializer(answers_set, many=True)

    return JsonResponse({"answers": answers_serializer.data})


# @api_view(['GET'])
def get_all_tests_view(request):
    try:
        offset = int(request.query_params.get("offset", default=0))
        limit = int(request.query_params.get("limit", default=DEFAULT_TEST_PAGE_LIMIT))
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
    #return Response({"invalid": "not good data"}, status=400)


@api_view(["GET"])
def get_tag_view(request, pk, *args, **kwargs):

    if pk is not None:
        instance = get_object_or_404(Tag, pk=pk)
        serializer = GetTagSerializer(instance, many=False)

        return JsonResponse({"tag": serializer.data})

    return Response({"invalid": "not good data"}, status=400)


@api_view(["GET"])
def get_all_tags_view(request, *args, **kwargs):
    try:
        offset = int(request.query_params.get("offset", default=0))
        limit = int(request.query_params.get("limit", default=DEFAULT_TAG_PAGE_LIMIT))
    except ValueError:
        return HttpResponseBadRequest("Invalid offset and/or limit")

    queryset = Tag.objects.filter(pk__range=(offset, offset + limit))

    serializer = GetTagSerializer(queryset, many=True)
    return JsonResponse({"tags": serializer.data})
