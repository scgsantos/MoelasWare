from random import sample

from django.shortcuts import get_object_or_404
from django.contrib.auth.decorators import login_required

from django.http import JsonResponse, HttpResponseBadRequest
from rest_framework.decorators import api_view

from moelasware.models import Test, Quiz, Tag
from api.serializers import CreateTestSerializer, GetTestSerializer, QuizSerializer

DEFAULT_TEST_PAGE_LIMIT = 20

@api_view(['GET']) 
def get_test_view( request, pk, *args, **kwargs ):

    # get test by id -> detail view
    instance = get_object_or_404(Test, pk=pk)
    serializer = GetTestSerializer(instance, many=False)

    return JsonResponse({'test': serializer.data})


# Create a test
# @api_view(['POST'])
# TODO: ADD DECORATOR WHEN LOGIN IS IMPLEMENTED
# @login_required
def post_test_view(request):
    # If no quizzes are sent in the request -> quizzes are selected randomly
    # User gave config (num_quizes, allowed_tags (optional))

    # TODO: ADD THIS LINE WHEN LOGIN IS IMPLEMENTED
    # author_id = request.user.id
    author_id = 1
    name = request.data.get('name')

    deserializer_data = {'author': author_id, 'name': name}

    if 'quizzes' not in request.data.keys() and not {'num_quizzes', 'allowed_tags'} <= request.data.keys():
            return HttpResponseBadRequest(
                    "You must provide either the number of quizzes and allowed tags, or the quizzes")

    try:
        num_quizzes = int(request.data.get('num_quizzes'))
    except ValueError:
            return HttpResponseBadRequest(f"The number of quizzes must be a number and not {request.data.get('num_quizzes')}")
                    
    if 'quizzes' not in request.data.keys():
        tags = request.data.get("allowed_tags")
        if tags:
            quizzes_set = Quiz.objects.order_by("?").filter(tags__text__in=tags).distinct()[:num_quizzes]
        else:
            # any quizz with any tag(s) can be randomly chosen
            quizzes_set = Quiz.objects.order_by("?").all()[:num_quizzes]

        # Not enough quizzes that meet the specs
        if len(quizzes_set) < num_quizzes:
            return HttpResponseBadRequest(
                    "The number of requested quizzes is bigger than the number of existing quizzes meeting the given specifications")


        deserializer_data.update({'quizzes': quizzes_set.values_list('id', flat=True)})

        test_deserializer = CreateTestSerializer(data=deserializer_data)
        if test_deserializer.is_valid(raise_exception=True): 
            test = test_deserializer.save()

            response_serializer = GetTestSerializer(test)
            return JsonResponse({'test': response_serializer.data})


    # Required data was all in request (quizzes list was given)
    else:
        deserializer_data.update({'quizzes': request.data.get('quizzes')})
        test_deserializer = CreateTestSerializer(data=deserializer_data)

        if test_deserializer.is_valid(raise_exception=True): 
            test = test_deserializer.save() # save test instance in the db
            response_serializer = GetTestSerializer(test)
            return JsonResponse({'test': response_serializer.data})


    return JsonResponse({'invalid': 'not good data'}, status=400)


# @api_view(['GET'])
def get_all_tests_view(request):
    try:
        offset = int(request.query_params.get('offset', default=0))
        limit = int(request.query_params.get('limit', default=DEFAULT_TEST_PAGE_LIMIT))
    except ValueError:
        return HttpResponseBadRequest("Invalid offset and/or limit")

    # TODO: think about actually returning +1 records, for simplifying "Next"-type buttons on frontend
    tests = Test.objects.filter(pk__range=(offset, offset+limit-1))

    serializer = GetTestSerializer(tests, many=True)
    return JsonResponse({'tests': serializer.data})


# HIGHLY TEMPORARY SOLUTION!
# TODO: move these to class based views once overall implementation is in better shape
# ~tomasduarte
@api_view(['GET', 'POST'])
def tests_view(request):
    proxy = {
        'GET': get_all_tests_view,
        'POST': post_test_view,
    }
    return proxy[request.method](request)
