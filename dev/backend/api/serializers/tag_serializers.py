from moelasware.models import Tag
from rest_framework import serializers


class GetTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ["text"]
