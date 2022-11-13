
from rest_framework import serializers
from moelasware.models import  Quiz
from api.serializers.tag_serializers import GetTag

class QuizSerializer(serializers.ModelSerializer):
	tags = GetTag(read_only=True, many=True)
	class Meta:
		model = Quiz
		fields = ['tags']
