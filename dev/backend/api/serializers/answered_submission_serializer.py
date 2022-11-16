from rest_framework import serializers
from moelasware.models import Submission
from api.serializers import *

class AnsweredSubmissionsSerializer(serializers.ModelSerializer):
	submitter = GetUserUsername(read_only = True)
	correct_answers = serializers.SerializerMethodField('get_correct_answers')
	total_answers = serializers.SerializerMethodField('get_total_answers')

	class Meta:
		model = Submission
		fields = ['submitter','correct_answers', 'total_answers']

	def get_correct_answers(self, obj):
		return SubmissionAnswer.objects.filter(submission__submitter=obj.submitter).filter(submission__test__id=obj.test.id).filter(answer__correct=True).count()

	def get_total_answers(self, obj):
		test = Test.objects.get(id=obj.test.id)
		quizzes = test.quizzes.all().count()
		return quizzes