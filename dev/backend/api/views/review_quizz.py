from django.contrib.auth.decorators import login_required
from django.http import HttpResponseBadRequest, JsonResponse
from django.http.response import HttpResponseBadRequest
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view

from api.serializers import (
    CreateReviewSerializer,
    CreateTestSerializer,
    GetQuizAnswerSerializer,
    GetQuizReviewSerializer,
    GetReviewSerializer,
    GetTestSerializer,
)
from moelasware.models import (
    Quiz,
    QuizAnswer,
    Review,
    Submission,
    SubmissionAnswer,
    Tag,
    Test,
    User,
)


@api_view(["GET"])
# @login_required
def get_quiz_view(request, pk):
    quiz = get_object_or_404(Quiz, id=pk)

    quiz_serializer = GetQuizReviewSerializer(quiz)
    answers = QuizAnswer.objects.filter(quiz=quiz.id)

    answer_serializer = GetQuizAnswerSerializer(answers, many=True)
    return JsonResponse({"quiz": quiz_serializer.data, "answers": answer_serializer.data})


@api_view(["GET"])
# @login_required
def get_info_quiz_view(request, pk):
    quiz = get_object_or_404(Quiz, id=pk)
    answers = QuizAnswer.objects.filter(quiz=quiz.id)

    quiz = GetQuizReviewSerializer(quiz).data

    obj_list = [quiz["id"], quiz["name"],quiz["author"]["user"]["username"], quiz["tags"][0]["text"], quiz["question"], quiz["description"], quiz["creation_date"]]
    

    answer_serializer = GetQuizAnswerSerializer(answers, many=True).data

    answer_list = []
    for i in answer_serializer:
        answer_list.append([i['text'], i['justification'], i['correct']])



    return JsonResponse({"quiz": obj_list, "answers": answer_list})


@api_view(["POST"])
# @login_required
def create_quiz_review_view(request):

    serializer = CreateReviewSerializer(data=request.data)

    # raises exception on why its not valid
    if serializer.is_valid(raise_exception=True):
        review = Review.objects.create(
            quiz=Quiz.objects.get(pk=serializer.data["quiz"]),
            reviewer=User.objects.get(pk=serializer.data["reviewer"]),
            accepted=serializer.data["accepted"],
            comment=serializer.data["comment"],
        )
        return JsonResponse(serializer.data)

    return JsonResponse({"error": "Bad data"})


@api_view(["GET"])
# @login_required
def get_quiz_reviewers_view(request, id):

    chosen_quiz = get_object_or_404(Review, id=id)
    serializer = GetReviewSerializer(chosen_quiz)

    return JsonResponse({"reviewer": serializer.data["reviewer"]})
