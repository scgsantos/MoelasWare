from rest_framework import serializers
from moelasware.models import SubmissionAnswer
from api.serializers.hall_of_fame_submission_serializer import *

class HallOfFame(serializers.ModelSerializer):
	submission = HallOfFameSubmissionSerializer(read_only=True)
	class Meta:
		model = SubmissionAnswer
		fields = ['submission']