from rest_framework import serializers

from moelasware.models import Test, Quiz, QuizAnswer, QuizTag, Tag, Submission, SubmissionAnswer, Review
from moelasware.models import User as AuthUser

class GetTestSerializer( serializers.ModelSerializer ):
	class Meta:
		model = Test
		fields = ['id', 'author', 'allowed_tags', 'quizzes', 'name', 'num_quizzes']

class CreateTestSerializer( serializers.ModelSerializer ):
	class Meta:
		model = Test
		fields = ['author', 'allowed_tags', 'quizzes', 'name', 'num_quizzes']

class CreateReviewSerializer( serializers.ModelSerializer ):
	class Meta:
		model = Review
		fields = ['reviewer', 'quiz', 'accepted', 'comment']

class GetQuizReviewSerializer ( serializers.ModelSerializer ):
	class Meta:
		model = Quiz
		fields = ['id', 'tags', 'author_id', 'creation_date', 'review_count', 'approved']

class GetReviewSerializer ( serializers.ModelSerializer ):
	class Meta:
		model = Review
		fields = ['id', 'accepted', 'comment', 'quiz', 'reviwer']

