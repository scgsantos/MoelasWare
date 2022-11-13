from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from api.models import Login, Registration, ListUnfinished

from django.contrib.auth.password_validation import validate_password
from moelasware.models import Test, Quiz, QuizAnswer,Tag, Submission, SubmissionAnswer, User,Review
from moelasware.models import Test

class GetTestSerializer(ModelSerializer):
	
	class Meta:
		model = Test
		fields = ['id', 'author', 'allowed_tags', 'quizzes', 'name', 'num_quizzes']

class CreateTestSerializer(ModelSerializer):
	
	class Meta:
		model = Test
		fields = ['author', 'allowed_tags', 'quizzes', 'name', 'num_quizzes']

##probably need to change the model from Login and Registration to be User?? or else it might do shit in db

class LoginSerializer(ModelSerializer):

	class Meta:
		model = Login
		fields = ['email', 'password']

class RegistrationSerializer(ModelSerializer):

	class Meta:
		model = Registration
		fields = ['username', 'email', 'password1', 'password2']

##Quizz
class GetAuthUserSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ['id' ,'username','email', "date_joined"]
  
class GetQuizSerializer( serializers.ModelSerializer ):
    	class Meta:
         model = Quiz
         fields = ['id','author','tags','question','description']

class CreateTagSerializer(serializers.ModelSerializer):
    	class Meta:
         model = Tag
         fields = ['text']

class CreateQuizSerializer( serializers.ModelSerializer ):
	tags = CreateTagSerializer(read_only=True, many=True)
	class Meta:
		model =	Quiz
		fields = ['author','tags','question','description','reviewer1','reviewer2','reviewer3']
    
class CreateQuizAnswerSerializer(serializers.ModelSerializer):
    	class Meta:
         model = QuizAnswer
         fields = ['quiz','text','correct','justification']

class GetQuizAnswerSerializer(serializers.ModelSerializer):
    	class Meta:
         model = QuizAnswer
         fields = ['id','text','correct','justification']


         
class GetTagSerializer(serializers.ModelSerializer):
    	class Meta:
         model = Tag
         fields = ['id','text']


##Unfinished quizzes

class ListUnfinishedSerializer(serializers.ModelSerializer):
		class Meta:
			model = ListUnfinished
			fields = ['id']


