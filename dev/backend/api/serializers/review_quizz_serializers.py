from rest_framework import serializers

from moelasware.models import Test, Quiz, QuizAnswer, QuizTag, Tag, Submission, SubmissionAnswer, Review
from moelasware.models import User as AuthUser


class GetQuizReviewSerializer ( serializers.ModelSerializer ):
	class Meta:
		model = Quiz
		fields = ['id', 'author', 'author_id', 'tags', 'question', 'description', 'creation_date']

class GetQuizAnswerSerializer ( serializers.ModelSerializer ):
	class Meta:
		model = QuizAnswer
		fields = ['id', 'text', 'correct', 'justification']

class GetReviewSerializer ( serializers.ModelSerializer ):
	class Meta:
		model = Review
		fields = ['id', 'comment', 'quiz', 'reviewer', 'approved']

class CreateReviewSerializer( serializers.ModelSerializer ):
	class Meta:
		model = Review
		fields = ['reviewer', 'quiz', 'accepted', 'comment']
