from rest_framework import serializers

from moelasware.models import Test, Quiz, QuizAnswer, QuizTag, Tag, Submission, SubmissionAnswer, Review, AuthUser, User

class GetTestSerializer( serializers.ModelSerializer ):
	class Meta:
		model = Test
		fields = ['id', 'author', 'quizzes', 'name']

class CreateTestSerializer( serializers.ModelSerializer ):
	class Meta:
		model = Test
		fields = ['author', 'quizzes', 'name', 'num_quizzes']

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





class GetQuizzesSerializer( serializers.ModelSerializer):
	number_of_reviews = serializers.SerializerMethodField('get_number_of_reviews')
	author = GetUserUsername(read_only=True)
	tags = GetTag(read_only=True, many=True)
	class Meta:
		model = Quiz
		fields = ['author', 'creation_date', 'tags', 'number_of_reviews']

	def get_number_of_reviews(self, obj):
		return Review.objects.filter(quiz__id = obj.id).count()