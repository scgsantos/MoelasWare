from django.db import models
from django.core.validators import MinValueValidator 
from django.contrib.auth.models import User as AuthUser

def fk(model):
    return models.ForeignKey(model, on_delete=models.CASCADE)

# Mock User model that should function alongside Django's authentication 
# Either add a ForeignKey to Django's Builtin User or 
# subclass the User in django.contrib.auth
class User(models.Model):
    user = models.OneToOneField(AuthUser, on_delete=models.CASCADE)

class Tag(models.Model):
    text = models.TextField()


class Quiz(models.Model):
    author = fk(User)
    tags = models.ManyToManyField(Tag)

    question = models.TextField()
    description = models.TextField()

    # Accepted should be queried instead of stored as a field?
    def is_accepted(self):
        pass

class Test(models.Model):
    author = fk(User)

    allowed_tags = models.ManyToManyField(Tag)
    quizzes = models.ManyToManyField(Quiz)

    name = models.TextField()
    num_quizzes = models.IntegerField(default=4, validators=MinValueValidator(1))

class Submission(models.Model):
    test = fk(Test)
    submitter = fk(User)

class Review:
    reviewer = fk(User)
    quiz = fk(Quiz)

    accepted = models.BooleanField(default=False)
    comment = models.TextField()

class QuizAnswer(models.Model):
    quiz = fk(Quiz) 

    text = models.TextField()
    correct = models.BooleanField(default=False)
    justification = models.TextField()



class SubmissionAnswer(models.Model):
    submission = fk(Submission)
    answer = fk(QuizAnswer)

