from rest_framework import serializers
from moelasware.models import Test
from api.serializers.quiz_serializers import QuizSerializer
from api.serializers.user_serializers import GetUserUsername


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


class GetTestWithSubmissionsSerializer(serializers.ModelSerializer):
    quizzes = QuizSerializer(read_only=True, many=True)
    submissions = serializers.PrimaryKeyRelatedField(
        source="submission_set", many=True, read_only=True
    )

    class Meta:
        model = Test
        fields = [
            "id",
            "name",
            "author",
            "quizzes",
            "submissions",
        ]


class CreateTestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Test
        fields = ["pk", "id", "author", "name", "quizzes"]

    def create(self, validated_data) -> Test:
        quizzes = validated_data.get("quizzes")
        validated_data.pop("quizzes")

        t = Test(**validated_data)
        t.save()
        for quiz in quizzes:
            t.quizzes.add(quiz)

        return t

class GetTestInfo(serializers.ModelSerializer):
	author = GetUserUsername(read_only=True)
	quizzes = QuizSerializer(read_only=True, many=True)

	class Meta:
		model = Test
		fields = ["id", "author", "quizzes"]
