from rest_framework import serializers
from moelasware.models import Submission
from api.serializers.hall_of_fame_get_test_info import *

class HallOfFameSubmissionSerializer(serializers.ModelSerializer):
	test = HallOfFameGetTestInfo(read_only=True)
	class Meta:
		model = Submission
		fields = ['test']