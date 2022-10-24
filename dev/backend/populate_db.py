from django.contrib.auth.models import User as AuthUser
from django.db import DatabaseError, IntegrityError
from moelasware.models import *


# RUN WITH
#   python manage.py shell < populate_db.py


SAVE = False


def save(*obj):
    if SAVE:
        for o in obj:
            o.save()


# Quizzes
try:
    manel = AuthUser.objects.create_user("manel", "manel@sapo.pt", "1234")
except IntegrityError:
    print("Manel already exists")
    pass

try:
    john = AuthUser.objects.create_user("john", "reese@themachine.com", "harold")
except IntegrityError:
    print("John already exists")
    pass


try:
    manel = AuthUser.objects.get(username="manel")
    john = AuthUser.objects.get(username="john")

    User.objects.bulk_create(
        [
            User(user=manel),
            User(user=john),
        ]
    )

    tags = Tag.objects.bulk_create(
        [Tag(text="Math"), Tag(text="Travel"), Tag(text="Culture")]
    )

    quizzes = Quiz.objects.bulk_create(
        [
            Quiz(
                author=User.objects.get(user=manel),
                question="Question1",
                description="description1",
            ),
            Quiz(
                author=User.objects.get(user=manel),
                question="Question2",
                description="description2",
            ),
            Quiz(
                author=User.objects.get(user=manel),
                question="Question3",
                description="description3",
            ),
            Quiz(
                author=User.objects.get(user=manel),
                question="Question4",
                description="description3",
            ),
        ]
    )

    for quiz in quizzes:
        quiz.tags.set(tags)

    answers = QuizAnswer.objects.bulk_create(
        [
            QuizAnswer(
                quiz=quizzes[0],
                text="answer1",
                correct=False,
                justification="justification",
            ),
            QuizAnswer(
                quiz=quizzes[0],
                text="answer2",
                correct=False,
                justification="justification",
            ),
            QuizAnswer(
                quiz=quizzes[0],
                text="answer3",
                correct=True,
                justification="justification",
            ),
            QuizAnswer(
                quiz=quizzes[0],
                text="answer4",
                correct=False,
                justification="justification",
            ),
        ]
    )

    tests = Test.objects.bulk_create(
        [
            Test(author=User.objects.get(user=manel), name="Test1"),
            Test(author=User.objects.get(user=manel), name="Test2"),
            Test(author=User.objects.get(user=manel), name="Test3"),
        ]
    )

    for test in tests:
        test.quizzes.set(quizzes)

    # Submissions
    submissions = Submission.objects.bulk_create(
        [
            Submission(test=tests[0], submitter=User.objects.get(user=john)),
            Submission(test=tests[1], submitter=User.objects.get(user=john)),
        ]
    )

    submission_answers = SubmissionAnswer.objects.bulk_create(
        [
            SubmissionAnswer(submission=submissions[0], answer=answers[0]),
            SubmissionAnswer(submission=submissions[0], answer=answers[1]),
            SubmissionAnswer(submission=submissions[1], answer=answers[0]),
            SubmissionAnswer(submission=submissions[1], answer=answers[2]),
        ]
    )

    # Reviews
    reviews = Review.objects.bulk_create([
           Review(reviewer=User.objects.get(user=manel), quiz=quizzes[0], accepted=False, comment="comment"),
        ])

except DatabaseError:
    print("Oops")