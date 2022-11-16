from django.contrib.auth.models import User as AuthUser
from django.db import models

from moelasware.models import fk


# Mock User model that should function alongside Django's authentication
# Either add a ForeignKey to Django's Builtin User or
# subclass the User in django.contrib.auth
class User(models.Model):
    """
    A Moelasware user.
    Essentially, an extension of Django's built-in User.
    """

    user = models.OneToOneField(AuthUser, on_delete=models.CASCADE)

    # needs to be haved created at least one quizz
    def can_solve_tests(self) -> bool:
        # the user needs to have created at least one quizz
        # query all the quizzes that has author as the current user
        instance = Quiz.objects.filter(author=self)
        return instance.exists()
