from rest_framework import serializers

from api.serializers.auth_user import GetAuthUsername
from moelasware.models import User


class GetUserUsername(serializers.ModelSerializer):
    user = GetAuthUsername(read_only=True)

    class Meta:
        model = User
        fields = ["user"]
