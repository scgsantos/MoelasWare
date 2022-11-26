from django.db import models

from moelasware.models import fk, Quiz, User

class Test(models.Model):
    """
    A collection of Quizzes.
    """

    author = fk(User)
    quizzes = models.ManyToManyField(Quiz)
    name = models.TextField()
