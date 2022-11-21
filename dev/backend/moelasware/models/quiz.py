import datetime

from django.db import models

from moelasware.models import fk
from moelasware.models.tag import Tag
from moelasware.models.user import User


class Quiz(models.Model):
    """
    Question that has several answers and associated tags.
    """

    author = fk(User)
    tags = models.ManyToManyField(Tag)

    name = models.TextField()
    question = models.TextField()
    description = models.TextField()
    finished = models.BooleanField(default=False)

    #creation_date = models.DateField(default=datetime.date.today)

    #approved = models.BooleanField(default=False)

    def can_be_added_to_a_test(self):
        return self.test_set.count() < 2


class QuizAnswer(models.Model):
    """
    Represents an answer in a Quiz.

    For example:

        Quiz: What color is an orange?
            [ ] Red
            [ ] Blue
            [ ] Orange (correct)

    Here, there are three QuizAnswer's
        Red,
        Blue,
        and Orange

    and only Orange is correct.

    Every QuizAnswer needs to justify why
    it is or isn't correct.
    """

    quiz = fk(Quiz)

    text = models.TextField()
    correct = models.BooleanField(default=False)
    justification = models.TextField()
