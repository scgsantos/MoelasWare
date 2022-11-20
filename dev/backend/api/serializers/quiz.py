from rest_framework import serializers
from api.serializers.tag import GetTagSerializer
from moelasware.models import Quiz, QuizAnswer, Review


class QuizSerializer(serializers.ModelSerializer):
    tags = GetTagSerializer(read_only=True, many=True)

    class Meta:
        model = Quiz
        fields = ["id", "name", "author", "tags", "question", "description", "review_count"]


class QuizAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizAnswer
        fields = ["id", "text", "justification"]


class QuizAnswerSerializerWithRes(serializers.ModelSerializer):
    class Meta:
        model = QuizAnswer
        fields = ["id", "text", "justification", "correct"]


class QuizFinishedSerializer(serializers.ModelSerializer):
    number_of_reviews_done = serializers.SerializerMethodField('get_number_of_reviews_done')
    review_result = serializers.SerializerMethodField('get_review_result')
    tags = GetTagSerializer(read_only = True, many = True)
    class Meta:
        model = Quiz
        fields = ['id','name', 'tags','number_of_reviews_done','review_result']

    def get_number_of_reviews_done(self, obj):
        return Review.objects.filter(quiz = obj).filter(pending = False).count()

    def get_review_result(self,obj):
        if Review.objects.filter(quiz = obj).filter(pending = False).count() == 3:
            if Review.objects.filter(quiz = obj).filter(accepted = False).count() > 0:
                return "rejected"
            else:
                return "accepted"
        else:
            return "pending"
