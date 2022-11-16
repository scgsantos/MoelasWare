from django.http import HttpResponseBadRequest, JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view

from api.serializers import QuizAnswerSerializer, QuizSerializer
from moelasware.models import Quiz, QuizAnswer


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

        return JsonResponse(
            {"test": serializer.data, "quizzes": quizzes_serializer.data}
        )

    return JsonResponse(
        {"invalid": "not good data"}, status=status.HTTP_400_BAD_REQUEST
    )


@api_view(["GET"])
def get_total_number_of_quizzes_view(request):
    count = Quiz.objects.count()
    return JsonResponse({"quizzes_count": count})


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

    quizzes_list = []
    for quiz in quizzes_set:
        if quiz.can_be_added_to_a_test():
            quizzes_list.append(quiz)

    quizzes_list = quizzes_list[:num_quizzes]

    # Not enough quizzes that meet the specs
    if len(quizzes_list) < num_quizzes:
        return HttpResponseBadRequest(
            "The number of requested quizzes is bigger than the number of existing quizzes meeting the given specifications"
        )

    quizzes_serializer = QuizSerializer(quizzes_list, many=True)

    return JsonResponse({"quizzes": quizzes_serializer.data})


@api_view(["GET"])
def get_answers_for_quiz_view(request, quiz_id):
    answers_set = QuizAnswer.objects.filter(quiz__id=quiz_id)

    answers_serializer = QuizAnswerSerializer(answers_set, many=True)

    return JsonResponse({"answers": answers_serializer.data})
