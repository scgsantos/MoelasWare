from rest_framework import serializers

from moelasware.models import Test
from moelasware.models import Quiz

class GetTestSerializer( serializers.ModelSerializer ):
	class Meta:
		model = Test
		fields = ['id', 'author', 'allowed_tags', 'quizzes', 'name', 'num_quizzes']

class CreateTestSerializer( serializers.ModelSerializer ):
	class Meta:
		model = Test
		fields = ['author', 'allowed_tags', 'quizzes', 'name', 'num_quizzes']

class GetQuizSerializer( serializers.ModelSerializer ):
	class Meta:
		model = Quiz
		fields = ['author','tags','question','description']

class CreateQuizSerializer( serializers.ModelSerializer ):
	class Meta:
		model =	Quiz
		fields = ['author','tags','question','description']
