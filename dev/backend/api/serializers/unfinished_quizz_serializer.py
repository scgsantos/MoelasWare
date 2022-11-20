from rest_framework import serializers

class CreateEditQuizSerializer( serializers.Serializer):
	class Meta:
		fields = ['id', 'author', 'text', 'description', 'question','answer','name','correct','tags','reviews']
