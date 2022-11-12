from moelasware.models import (AuthUser, Quiz, QuizAnswer, Submission,
                               SubmissionAnswer, Tag, Test, User)
from rest_framework import serializers


class GetTestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Test
        fields = ["id", "author", "quizzes", "name"]


class CreateTestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Test
        fields = ["author", "allowed_tags", "quizzes", "name", "num_quizzes"]


class GetAuthUserAll(serializers.ModelSerializer):
    class Meta:
        model = AuthUser
        fields = ["username", "email", "date_joined"]


class GetAuthUsername(serializers.ModelSerializer):
    class Meta:
        model = AuthUser
        fields = ["username"]


class GetUserUsername(serializers.ModelSerializer):
    user = GetAuthUsername(read_only=True)

    class Meta:
        model = User
        fields = ["user"]


class GetTag(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ["text"]


class QuizSerializer(serializers.ModelSerializer):
    tags = GetTag(read_only=True, many=True)

    class Meta:
        model = Quiz
        fields = ["tags"]


class GetTestInfo(serializers.ModelSerializer):
    author = GetUserUsername(read_only=True)
    quizzes = QuizSerializer(read_only=True, many=True)

    class Meta:
        model = Test
        fields = ["id", "author", "quizzes"]


class SubmissionSerializer(serializers.ModelSerializer):
    test = GetTestInfo(read_only=True)

    class Meta:
        model = Submission
        fields = ["test"]


class GetSubmissionsAnsweredByTest(serializers.ModelSerializer):
    submission = SubmissionSerializer(read_only=True)

    class Meta:
        model = SubmissionAnswer
        fields = ["submission"]
