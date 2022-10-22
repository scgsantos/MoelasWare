from rest_framework import serializers

from moelasware.models import Test, Tag, Quiz, User, QuizAnswer


class CreateTestSerializer( serializers.ModelSerializer ):
	class Meta:
		model = Test
		fields = ['author', 'allowed_tags', 'quizzes', 'name', 'num_quizzes']
