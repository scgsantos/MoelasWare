from rest_framework import serializers

from moelasware.models import Test, Tag, Quiz, User, QuizAnswer


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ["text"]


class QuizSerializer(serializers.ModelSerializer):
    tags = TagSerializer(read_only=True, many=True)
    class Meta:
        model = Quiz
        fields = ["id", "author", "tags", "question", "description"]


class QuizAnswerSerializer( serializers.ModelSerializer ):
    class Meta:
        model = QuizAnswer
        fields = ["id", "text", "justification"] 


class GetTestSerializer(serializers.ModelSerializer):
    quizzes = QuizSerializer(read_only=True, many=True)
    class Meta:
        model = Test
        fields = [
            "id",
            "name",
            "author",
            "quizzes",
        ]


class CreateTestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Test
        fields = ["pk", "id", "author", "name", "quizzes"]

    def create(self, validated_data) -> Test:
        quizzes = validated_data.get("quizzes")
        validated_data.pop('quizzes')

        t = Test(**validated_data)
        t.save()
        for quiz in quizzes:
            t.quizzes.add(quiz)

        return t
