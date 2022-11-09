from api.serializers.tag_serializers import TagSerializer
from moelasware.models import Quiz
from rest_framework import serializers


class QuizSerializer(serializers.ModelSerializer):
    tags = TagSerializer(read_only=True, many=True)

    class Meta:
        model = Quiz
        fields = ["id", "author", "tags", "question", "description"]
