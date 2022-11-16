from http.client import ACCEPTED
from django.shortcuts import get_object_or_404

from datetime import time
from django.http import JsonResponse, HttpResponseBadRequest
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.decorators import login_required
from django.http.response import HttpResponseBadRequest

from moelasware.models import Test, User, Quiz, QuizAnswer, QuizTag, Tag, Submission, SubmissionAnswer, QuizAnswer, Review
from api.serializers import CreateReviewSerializer, GetQuizReviewSerializer, GetReviewSerializer, GetTestSerializer, CreateTestSerializer, GetQuizAnswerSerializer


@api_view(['GET'])
# @login_required
def get_quiz_view(request, pk):
    quiz = get_object_or_404(Quiz, id=pk)

    quiz_serializer = GetQuizReviewSerializer(quiz)
    answers = QuizAnswer.objects.filter(quiz=quiz.id)

    answer_serializer = GetQuizAnswerSerializer(answers, many=True)
    return JsonResponse({'quiz': quiz_serializer.data, 'answers': answer_serializer.data})
    
@api_view(['POST'])
# @login_required
def create_quiz_review_view(request):

    serializer = CreateReviewSerializer(data=request.data)

    # raises exception on why its not valid
    if serializer.is_valid(raise_exception=True):
        review = Review.objects.create(quiz=Quiz.objects.get(pk=serializer.data['quiz']), reviewer=User.objects.get(
            pk=serializer.data['reviewer']), accepted=serializer.data['accepted'], comment=serializer.data['comment'])
        return JsonResponse(serializer.data)

    return JsonResponse({'error':'Bad data'})


@api_view(['GET'])
# @login_required
def get_quiz_reviewers_view(request, id):

    chosen_quiz = get_object_or_404(Review, id=id)
    serializer = GetReviewSerializer(chosen_quiz)

    return JsonResponse({'reviewer': serializer.data['reviewer']})

