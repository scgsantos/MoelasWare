from moelasware.models import User
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
  
  
class GetUserSerializer( serializers.ModelSerializer ):
    class Meta:
        model = User
        field= ["id","user","name","email","password","is_staff","is_active","is_superuser","last_login","date_joined"]