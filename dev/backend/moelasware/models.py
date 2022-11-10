from django.contrib.auth.models import User as AuthUser
from django.db import models


def fk(model):
    return models.ForeignKey(model, on_delete=models.CASCADE)


# Mock User model that should function alongside Django's authentication
# Either add a ForeignKey to Django's Builtin User or
# subclass the User in django.contrib.auth
class User(models.Model):
    user = models.OneToOneField(AuthUser, on_delete=models.CASCADE)


class Tag(models.Model):
    """
    Is associated with a Quiz to display what the Quiz is about
    """

    text = models.TextField()


class Quiz(models.Model):
    """
    Question that has several answers and associated tags.
    """

    author = fk(User)
    tags = models.ManyToManyField(Tag)

    name = models.TextField()
    question = models.TextField()
    description = models.TextField()

    # Accepted should be queried instead of stored as a field?
    def is_accepted(self):
        pass


class Test(models.Model):
    """
    A collection of Quizzes.
    """

    author = fk(User)

    quizzes = models.ManyToManyField(Quiz)

    name = models.TextField()


class Submission(models.Model):
    """
    Represents a Test a user solves.
    When a User solves a test he submits a submission.

    A Submission has several SubmissionAnswer's associated to it,
    where each SubmissionAnswer represents a selected QuizAnswer
    int the Submission.

    For example:
        Quiz: What color is an orange?
            [x] Red
            [ ] Blue
            [x] Orange

        Two SubmissionAnswer's would be created:
            One that has a ForeignKey to the "Red" QuizAnswer
            and another that has a ForeignKey "Orange" QuizAnswer

    """

    test = fk(Test)
    submitter = fk(User)


class Review(models.Model):
    """
    Represents a Quiz Review.

    It can either be accepted or rejected,
    being a comment mandatory if it is rejected.
    """

    reviewer = fk(User)
    quiz = fk(Quiz)

    accepted = models.BooleanField(default=False)
    comment = models.TextField()


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


class SubmissionAnswer(models.Model):
    """
    Represents an Answer made by a User while
    doing a Test.

    For example:
        Quiz: What color is an orange?
            [x] Red
            [ ] Blue
            [x] Orange

        Two SubmissionAnswer's would be created:
            One that has a ForeignKey to the "Red" QuizAnswer
            and another that has a ForeignKey "Orange" QuizAnswer

    """

    submission = fk(Submission)
    answer = fk(QuizAnswer)
