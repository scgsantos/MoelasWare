from moelasware.models import Quiz, QuizAnswer, Tag, Test, User
from rest_framework import serializers


class CreateTestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Test
        fields = ["author", "allowed_tags", "quizzes", "name", "num_quizzes"]
