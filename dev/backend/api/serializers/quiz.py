from rest_framework import serializers

from api.serializers.tag import GetTagSerializer
from moelasware.models import Quiz, QuizAnswer


class QuizSerializer(serializers.ModelSerializer):
    tags = GetTagSerializer(read_only=True, many=True)

    class Meta:
        model = Quiz
        fields = ["id", "name", "author", "tags", "question", "description"]


class QuizAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizAnswer
        fields = ["id", "text", "justification"]


class QuizAnswerSerializerWithRes(serializers.ModelSerializer):
    class Meta:
        model = QuizAnswer
        fields = ["id", "text", "justification", "correct"]
