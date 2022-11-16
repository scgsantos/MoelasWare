from rest_framework import serializers
from moelasware.models import User

#from api.serializers.auth_user_serializers import GetAuthUsername
from api.serializers import *

class GetUserUsername(serializers.ModelSerializer):
	user = GetAuthUsername(read_only=True)
	class Meta:
		model = User
		fields = ['user']
