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
    QuizSerializer,
    QuizReviewSerializer,
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
    return JsonResponse(
        {"quiz": quiz_serializer.data, "answers": answer_serializer.data}
    )


@api_view(["POST"])
# @login_required
def create_quiz_review_view(request):

    serializer = CreateReviewSerializer(data=request.data)
    
    # raises exception on why its not valid
    if serializer.is_valid(raise_exception=True):

        review = Review.objects.filter(quiz=request.quiz)
        review.accepted = serializer.data["accepted"]
        if review.accepted == True:
            review.quiz.review_count += 1
        if review.quiz.review_count == 3:
            review.quiz.approved = True
        review.comment = serializer.data["comment"]
        review.save()

        return JsonResponse(serializer.data)

    return JsonResponse({"error": "Bad data"})


def quiz_review_serializer_handler(data):
    data_list = []
    for i in data:
        data_list.append([i['id'],i['name'],i['tags'][0]['text'],i['author']['user']['username'], i['review_count']])
    return data_list

@api_view(["GET"])
# @login_required
def get_quizzes_for_reviewer(request, id):

    user = get_object_or_404(User, id=id)

    reviewer = Review.objects.filter(reviewer=user, pending=True)

    if not reviewer.exists():
        return HttpResponseBadRequest("Reviews not found")

    reviewer_list = []
    for i in reviewer:
        reviewer_list.append(QuizReviewSerializer(i.quiz).data)

    reviewer_list = quiz_review_serializer_handler(reviewer_list)

    return JsonResponse({"info": reviewer_list})


@api_view(["GET"])
# @login_required
def get_quiz_reviewers_view(request, id):

    chosen_quiz = get_object_or_404(Review, id=id)
    serializer = GetReviewSerializer(chosen_quiz)

    return JsonResponse({"reviewer": serializer.data["reviewer"]})
