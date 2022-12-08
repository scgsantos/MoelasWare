from django.db import models

from moelasware.models import fk
from moelasware.models.quiz import Quiz
from moelasware.models.user import User


class Test(models.Model):
    """
    A collection of Quizzes.
    """

    author = fk(User)
    quizzes = models.ManyToManyField(Quiz)
    name = models.TextField()
