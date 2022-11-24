from rest_framework import serializers

from api.serializers.test import GetTestInfo
from moelasware.models import Submission, SubmissionAnswer


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


class SubmissionAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubmissionAnswer
        fields = ["answer"]
