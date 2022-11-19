
from rest_framework import serializers
from moelasware.models import SubmissionAnswer, Submission, Test
from api.serializers.test_serializers import GetTestInfo
from api.serializers.user_serializers import GetUserUsername
from api.serializers.quiz_serializers import QuizSerializer

class SubmissionSerializer(serializers.ModelSerializer):
	test = GetTestInfo(read_only=True)
	class Meta:
		model = Submission
		fields = ['test']


class GetSubmissionsAnsweredByTest(serializers.ModelSerializer):
	submission = SubmissionSerializer(read_only=True)
	class Meta:
		model = SubmissionAnswer
		fields = ['submission']


class SubmissionAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubmissionAnswer
        fields = ["answer"]

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

class HallOfFameGetTestInfo(serializers.ModelSerializer):
	author = GetUserUsername(read_only=True)
	quizzes = QuizSerializer(read_only=True, many=True)
	solved_tests = serializers.SerializerMethodField('get_solved_tests')
	class Meta:
		model = Test
		fields = ['id','author','quizzes', 'solved_tests']

	def get_solved_tests(self, obj):
		return Submission.objects.filter(test__id=obj.id).count()

