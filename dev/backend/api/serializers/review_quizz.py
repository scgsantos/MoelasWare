from rest_framework import serializers

from moelasware.models.quiz import Quiz, QuizAnswer
from moelasware.models.review import Review


class GetQuizReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = [
            "id",
            "author",
            "author_id",
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
