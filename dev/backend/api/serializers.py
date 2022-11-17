from rest_framework import serializers
from moelasware.models import Test, User, SubmissionAnswer, AuthUser, Submission, Quiz, Tag, QuizAnswer

class GetTestSerializer( serializers.ModelSerializer ):
	class Meta:
		model = Test
		fields = ['id', 'author', 'quizzes', 'name']

class CreateTestSerializer( serializers.ModelSerializer ):
	class Meta:
		model = Test
		fields = ['author', 'allowed_tags', 'quizzes', 'name', 'num_quizzes']

class GetAuthUserAll(serializers.ModelSerializer):
	class Meta:
		model = AuthUser
		fields = ['username','email', "date_joined"]

class GetAuthUsername(serializers.ModelSerializer):
	class Meta:
		model = AuthUser
		fields = ['username']

class GetUserUsername(serializers.ModelSerializer):
	user = GetAuthUsername(read_only=True)
	class Meta:
		model = User
		fields = ['user']

class GetTag(serializers.ModelSerializer):
	class Meta:
		model = Tag
		fields = ['text']

class QuizSerializer(serializers.ModelSerializer):
	tags = GetTag(read_only=True, many=True)
	class Meta:
		model = Quiz
		fields = ['tags']

class GetTestInfo(serializers.ModelSerializer):
	author = GetUserUsername(read_only=True)
	quizzes = QuizSerializer(read_only=True, many=True)
	class Meta:
		model = Test
		fields = ['id','author','quizzes']

class SubmissionSerializer(serializers.ModelSerializer):
	test = GetTestInfo(read_only=True)
	class Meta:
		model = Submission
		fields = ['test']

class SubmissionMarkSerializer(serializers.ModelSerializer):
	test = GetTestInfo(read_only=True)
	class Meta:
		model = Submission
		fields = ['test']



class AnsweredSubmissionsSerializer(serializers.ModelSerializer):
	submitter = GetUserUsername(read_only = True)
	correct_answers = serializers.SerializerMethodField('get_correct_answers')
	total_answers = serializers.SerializerMethodField('get_total_answers')

	class Meta:
		model = Submission
		fields = ['submitter','correct_answers', 'total_answers']

	'''
	def get_correct_answers(self, obj):
		test = Test.objects.get(id=obj.submission.test.id)
		quizzes = test.quizzes.all()
		correct_answers = 0
		for i in quizzes:
			answers = QuizAnswer.objects.filter(quiz = i)
			for j in answers:
				if j.correct:
					correct_answers += 1
		return correct_answers
	'''
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

class HallOfFameSubmissionSerializer(serializers.ModelSerializer):
	test = HallOfFameGetTestInfo(read_only=True)
	class Meta:
		model = Submission
		fields = ['test']

class HallOfFame(serializers.ModelSerializer):
	submission = HallOfFameSubmissionSerializer(read_only=True)
	class Meta:
		model = SubmissionAnswer
		fields = ['submission']


class HallOfFameGetUserInfo(serializers.ModelSerializer):
	user = GetAuthUserAll(read_only=True)
	correct_answers = serializers.SerializerMethodField('get_correct_answers')
	solved_tests = serializers.SerializerMethodField('get_all_solved_tests')
	class Meta:
		model = User
		fields = ['id', 'user', 'correct_answers', 'solved_tests']

	def get_correct_answers(self, obj):
		return SubmissionAnswer.objects.filter(submission__submitter=obj).filter(answer__correct=True).count()	

	def get_all_solved_tests(self, obj):
		return Submission.objects.filter(submitter__user__username=obj.user.username).count()	


class GetQuizAnswer(serializers.ModelSerializer):
	class Meta:
		model = QuizAnswer
		fields = ['text', 'correct', 'justification']

class GetQuizInfo(serializers.ModelSerializer):
	tags = GetTag(read_only = True, many = True)
	quiz_answers = serializers.SerializerMethodField('get_quiz_answers')
	class Meta:
		model = Quiz
		fields = ['name', 'question', 'description', 'tags', 'quiz_answers']

	def get_quiz_answers(self, obj):
		return GetQuizAnswer(QuizAnswer.objects.filter(quiz = obj), many = True).data