from http.client import ACCEPTED
from django.shortcuts import get_object_or_404

from django.http import JsonResponse, HttpResponseBadRequest
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.decorators import login_required
from django.http.response import HttpResponseBadRequest

from moelasware.models import Test, User, Quiz, QuizAnswer, QuizTag, Tag, Submission, SubmissionAnswer, QuizAnswer, Review
from api.serializers import CreateReviewSerializer, GetQuizReviewSerializer, GetReviewSerializer, GetTestSerializer, CreateTestSerializer



@api_view(['GET']) # allowed method(s)
def get_test_view( request, pk, *args, **kwargs ):

	# get test by id -> detail view
	instance = get_object_or_404(Test, pk=pk)
	serializer = GetTestSerializer(obj, many=False)

	return JsonResponse({'test': serializer.data})



@api_view(['POST'])
def create_test_view( request ):
	serializer = CreateTestSerializer(data=request.data)

	if serializer.is_valid(raise_exception=True): # raises exception on why its not valid
		#instance = serializer.save()
		
		#print(instance)
		return Response(serializer.data)

	return Response({'invalid': 'not good data'}, status=400)


@api_view(['GET', 'POST'])
#@login_required
# function that selects the quizz that the user wants to review
def submission_review_view(request, pk):
    # verify if the user has created at least one quiz
    done_quiz = Quiz.objects.filter(author=request.user.pk)

    # verify if there is at least one quiz available to review
    available_quiz = Quiz.objects.filter(approved = False)
    """
    if not done_quiz.exists():
        return HttpResponseBadRequest('You must create at least one quiz to review a quiz')
    
    if not available_quiz:
        return HttpResponseBadRequest('There are no quizes available to review')
    """
    quiz = get_object_or_404(Quiz, pk=pk) 

    if request.method == 'GET':
        serializer = GetQuizReviewSerializer(quiz, many=False)
        # get the quiz that the user wants to review
        return JsonResponse({'quiz': serializer.data}, status=status.HTTP_200_OK)

    if request.method == 'POST':
        serializer = CreateReviewSerializer(data=request.data)

        review = Review.objects.create(id_quiz=serializer.data['id'], user = serializer.data['reviewer'], accepted=serializer.data['accepted'], comment=serializer.data['comment'])

        # raises exception on why its not valid
        if serializer.is_valid(raise_exception=True):
            review.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['POST'])
@login_required
#function that updates the data if review was accepted
def review_accepted_view(request, id):
    
    quiz = get_object_or_404(Quiz, pk=id)
    serializer = GetQuizReviewSerializer(quiz, many=False)

    review_count = serializer.review_count + 1

    if review_count == 3:
        serializer.approved = True

    if serializer.is_valid(raise_exception=True):
        quiz.save()
        return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)

    return JsonResponse({'quiz': serializer.data}, status=status.HTTP_200_OK)


@api_view(['GET'])
@login_required
def get_quiz_reviewers_view(request, id):
    
    chosen_quiz = get_object_or_404(Review, pk=id)
    serializer = GetReviewSerializer(chosen_quiz, many=True)

    return JsonResponse({'quiz': serializer.data['reviewer']}, status=status.HTTP_200_OK)