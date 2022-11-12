from rest_framework import serializers

from moelasware.models import Test, Quiz, QuizAnswer, QuizTag, Tag, Submission, SubmissionAnswer, User, Review, QuizReview
from moelasware.models import User as AuthUser

class GetTestSerializer( serializers.ModelSerializer ):
	class Meta:
		model = Test
		fields = ['id', 'author', 'allowed_tags', 'quizzes', 'name', 'num_quizzes']

class CreateTestSerializer( serializers.ModelSerializer ):
	class Meta:
		model = Test
		fields = ['author', 'allowed_tags', 'quizzes', 'name', 'num_quizzes']

class GetAuthUserSerializer(serializers.ModelSerializer):
	class Meta:
		model = AuthUser
		fields = ['id' ,'username','email', "date_joined"]
  
class GetQuizSerializer( serializers.ModelSerializer ):
    	class Meta:
         model = Quiz
         fields = ['id','author','tags','question','description']

class CreateQuizSerializer( serializers.ModelSerializer ):
	class Meta:
		model =	Quiz
		fields = ['author','tags','question','description']
    
class CreateQuizAnswerSerializer(serializers.ModelSerializer):
    	class Meta:
         model = QuizAnswer
         fields = ['quiz','text','correct','justification']

class GetQuizAnswerSerializer(serializers.ModelSerializer):
    	class Meta:
         model = QuizAnswer
         fields = ['id','text','correct','justification']

class CreateQuizTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizTag
        fields = ['quiz_id','tag_id']
        
class GetQuizTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizTag
        fields = ['id','quiz_id','tag_id']

class CreateTagSerializer(serializers.ModelSerializer):
    	class Meta:
         model = Tag
         fields = ['text']
         
class GetTagSerializer(serializers.ModelSerializer):
    	class Meta:
         model = Tag
         fields = ['id','text']
         

class CreateReviewQuizSerializer(serializers.ModelSerializer):
    	class Meta:
         model = QuizReview
         fields = ["quiz_id","review_id","acepted","comment"]
         
class GetReviewQuizSerializer(serializers.ModelSerializer):
    	class Meta:
         model = QuizReview
         fields = ["id","quiz_id","review_id","acepted","comment"]