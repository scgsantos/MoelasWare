from rest_framework import serializers
from moelasware.models import Test
from api.serializers.user_serializers import *
from api.serializers.quiz_serializers import *

class HallOfFameGetTestInfo(serializers.ModelSerializer):
	author = GetUserUsername(read_only=True)
	quizzes = QuizSerializer(read_only=True, many=True)
	solved_tests = serializers.SerializerMethodField('get_solved_tests')
	class Meta:
		model = Test
		fields = ['id','author','quizzes', 'solved_tests']

	def get_solved_tests(self, obj):
		return Submission.objects.filter(test__id=obj.id).count()