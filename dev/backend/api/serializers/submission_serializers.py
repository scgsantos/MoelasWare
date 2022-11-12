
from rest_framework import serializers
from moelasware.models import SubmissionAnswer, Submission
from api.serializers.test_serializers import GetTestInfo

class SubmissionSerializer(serializers.ModelSerializer):
	test = GetTestInfo(read_only=True)
	class Meta:
		model = Submission
		fields = ['test']


class GetSubmissionsAnsweredByTest(serializers.ModelSerializer):
	submission = SubmissionSerializer(read_only=True)
	class Meta:
		model = SubmissionAnswer
		fields = ['submission']
