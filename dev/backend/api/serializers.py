from rest_framework import serializers

from moelasware.models import Test

class GetTestSerializer( serializers.ModelSerializer ):
	class Meta:
		model = Test
		fields = ['id', 'author', 'allowed_tags', 'quizzes', 'name', 'num_quizzes']

class CreateTestSerializer( serializers.ModelSerializer ):
	class Meta:
		model = Test
		fields = ['author', 'allowed_tags', 'quizzes', 'name', 'num_quizzes']