from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from api.models import Login, Registration

from django.contrib.auth.password_validation import validate_password
from moelasware.models import Test, Quiz, QuizAnswer, QuizTag, Tag, Submission, SubmissionAnswer, User
from moelasware.models import Test
from moelasware.models import Quiz


class GetTestSerializer(ModelSerializer):

    class Meta:
        model = Test
        fields = [
            'id',
            'author',
            'allowed_tags',
            'quizzes',
            'name',
            'num_quizzes']


class CreateTestSerializer(ModelSerializer):

    class Meta:
        model = Test
        fields = ['author', 'allowed_tags', 'quizzes', 'name', 'num_quizzes']

# probably need to change the model from Login and Registration to be
# User?? or else it might do shit in db


class LoginSerializer(ModelSerializer):

    class Meta:
        model = Login
        fields = ['email', 'password']


class RegistrationSerializer(ModelSerializer):

    class Meta:
        model = Registration
        fields = ['username', 'email', 'password1', 'password2']
