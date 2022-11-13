
from rest_framework import serializers
from moelasware.models import Test
from api.serializers.quiz_serializers import QuizSerializer
from api.serializers.user_serializers import GetUserUsername


class GetTestSerializer( serializers.ModelSerializer ):
	class Meta:
		model = Test
		fields = ['id', 'author', 'quizzes', 'name']

class CreateTestSerializer( serializers.ModelSerializer ):
	class Meta:
		model = Test
		fields = ['author', 'allowed_tags', 'quizzes', 'name', 'num_quizzes']

class GetTestInfo(serializers.ModelSerializer):
	author = GetUserUsername(read_only=True)
	quizzes = QuizSerializer(read_only=True, many=True)
	class Meta:
		model = Test
		fields = ['id','author','quizzes']
