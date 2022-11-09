from random import sample

from api.serializers import (CreateTestSerializer, GetTestSerializer,
                             QuizAnswerSerializer, QuizSerializer)
from django.http import HttpResponse, HttpResponseBadRequest, JsonResponse
from moelasware.models import Quiz, QuizAnswer, Tag, Test
from rest_framework.decorators import api_view


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


@api_view(["GET"])
def get_answers_for_quiz(request, quiz_id):
    answers_set = QuizAnswer.objects.filter(quiz__id=quiz_id)

    answers_serializer = QuizAnswerSerializer(answers_set, many=True)

    return JsonResponse({"answers": answers_serializer.data})
