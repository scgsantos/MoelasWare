from moelasware.models import QuizAnswer
from rest_framework import serializers
from api.serializers import *


class QuizAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizAnswer
        fields = ["text", "correct", "justification"]
