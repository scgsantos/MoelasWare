from http.client import ACCEPTED
from django.shortcuts import get_object_or_404

from datetime import time
from django.http import JsonResponse, HttpResponseNotFound
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.decorators import login_required
from django.http.response import HttpResponseBadRequest

from moelasware.models import Test, User, Quiz, QuizAnswer, QuizTag, Tag, Submission, SubmissionAnswer, QuizAnswer, Review
from api.serializers import CreateReviewSerializer, GetQuizReviewSerializer, GetReviewSerializer, GetTestSerializer, CreateTestSerializer, GetQuizAnswerSerializer, GetQuizzesSerializer


@api_view(['GET'])  # allowed method(s)
def get_test_view(request, pk, *args, **kwargs):

    # get test by id -> detail view
    instance = get_object_or_404(Test, pk=pk)
    serializer = GetTestSerializer(instance, many=False)

    return JsonResponse({'test': serializer.data})


@api_view(['POST'])
def create_test_view(request):
    serializer = CreateTestSerializer(data=request.data)

    # raises exception on why its not valid
    if serializer.is_valid(raise_exception=True):
        #instance = serializer.save()

        # print(instance)
        return Response(serializer.data)

    return Response({'invalid': 'not good data'}, status=400)


@api_view(['GET'])
# @login_required
def get_quiz_view(request, id):

    quiz = get_object_or_404(Quiz, id=id)
    quiz_serializer = GetQuizReviewSerializer(quiz)

    answers = QuizAnswer.objects.filter(quiz=quiz.id)
    answer_serializer = GetQuizAnswerSerializer(answers, many=True)

    return JsonResponse({'quiz': quiz_serializer.data, 'answers': answer_serializer.data})

@api_view(['GET'])
# @login_required
def get_not_approved_quizzes(request):


    #reviews = Review.objects.filter(pending = True).filter(reviewer__user__id = request.user.id)
    reviews = Review.objects.filter(pending = True).filter(reviewer__user__id = 1)

    if not reviews.exists():
        return HttpResponseNotFound('Quizzes not found')

    reviews = GetReviewSerializer(reviews, many = True).data
    print(reviews, "-------->")
    return JsonResponse({"quizzes": reviews})


@api_view(['POST'])
# @login_required
def create_quiz_review_view(request):

    serializer = CreateReviewSerializer(data=request.data)

    # raises exception on why its not valid
    if serializer.is_valid(raise_exception=True):
        review = Review.objects.create(quiz=Quiz.objects.get(pk=serializer.data['quiz']), reviewer=User.objects.get(
            pk=serializer.data['reviewer']), accepted=serializer.data['accepted'], comment=serializer.data['comment'])
        return Response(serializer.data)

    return Response('Bad data')


@api_view(['GET'])
# @login_required
def get_quiz_reviewers_view(request, id):

    chosen_quiz = get_object_or_404(Review, id=id)
    serializer = GetReviewSerializer(chosen_quiz)

    return JsonResponse({'reviewer': serializer.data['reviewer']})
