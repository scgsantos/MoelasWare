from rest_framework import serializers

from moelasware.models.quiz import Quiz, QuizAnswer
from moelasware.models.review import Review
from api.serializers.tag import GetTagSerializer
from api.serializers.user import GetUserUsername
from api.serializers.quiz import QuizInfoSerializer


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

class QuizReviewSerializer(serializers.ModelSerializer):
    tags = GetTagSerializer(read_only=True, many=True)
    author = GetUserUsername(read_only = True)
    review_count = serializers.SerializerMethodField("get_review_count")
    class Meta:
        model = Quiz
        fields = ['id','name','tags','author', "review_count", "creation_date"] 

    def get_review_count(self, obj):
        return Review.objects.filter(quiz = obj, pending = True).count()