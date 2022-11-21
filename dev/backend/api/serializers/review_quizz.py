from rest_framework import serializers

from moelasware.models.quiz import Quiz, QuizAnswer
from moelasware.models.review import Review
from api.serializers.tag import GetTagSerializer
from api.serializers.user import GetUserUsername


class GetQuizReviewSerializer(serializers.ModelSerializer):
    tags = GetTagSerializer(read_only = True, many = True)
    author = GetUserUsername(read_only = True)
    class Meta:
        model = Quiz
        fields = [
            "id",
            "name",
            "author",
            "tags",
            "question",
            "description",
            "creation_date",
        ]


class GetQuizAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizAnswer
        fields = ["id", "text", "correct", "justification"]


class GetReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ["id", "comment", "quiz", "reviewer", "approved"]


class CreateReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ["reviewer", "quiz", "accepted", "comment"]
