from api.serializers.tag_serializers import GetTagSerializer
from moelasware.models import Quiz
from rest_framework import serializers


class QuizSerializer(serializers.ModelSerializer):
    tags = GetTagSerializer(read_only=True, many=True)

    class Meta:
        model = Quiz
        fields = ["id", "author", "tags", "question", "description"]
