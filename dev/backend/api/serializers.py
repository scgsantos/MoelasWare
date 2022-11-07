from rest_framework import serializers

from moelasware.models import Test, Quiz, QuizAnswer, QuizTag, Tag, Submission, SubmissionAnswer, Review
from moelasware.models import User as AuthUser

class GetTestSerializer( serializers.ModelSerializer ):
	class Meta:
		model = Test
		fields = ['id', 'author', 'quizzes', 'name']

class CreateTestSerializer( serializers.ModelSerializer ):
	class Meta:
		model = Test
		fields = ['author', 'quizzes', 'name', 'num_quizzes']
		
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
