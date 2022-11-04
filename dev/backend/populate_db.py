import traceback

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
        [
            Tag(text="Math"),
            Tag(text="Travel"),
            Tag(text="Culture"),
            Tag(text="REQ"),
            Tag(text="PM"),
            Tag(text="A&D"),
            Tag(text="IMP"),
            Tag(text="TST"),
            Tag(text="V&V"),
            Tag(text="DEP"),
            Tag(text="CI"),
            Tag(text="PRC"),
            Tag(text="PPL"),
            Tag(text="CCM"),
            Tag(text="RSK"),
        ]
    )

    quizzes = Quiz.objects.bulk_create(
        [
            Quiz(
                author=User.objects.get(user=manel),
                question="Question1",
                description="description1",
                name="Quiz1"
            ),
            Quiz(
                author=User.objects.get(user=manel),
                question="Baby is ____?",
                description="How would you describe baby?",
                name="Quiz2",
            ),
            Quiz(
                author=User.objects.get(user=manel),
                question="What is the best fruit?",
                description="objectively, what fruit is the best ever",
                name="Quiz3",
            ),
            Quiz(
                author=User.objects.get(user=manel),
                question="A B C _ ?",
                description="do you know lettets?",
                name="Quiz4",
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
            QuizAnswer(
                quiz=quizzes[1],
                text="ugly",
                correct=False,
                justification="justification",
            ),
            QuizAnswer(
                quiz=quizzes[1],
                text="old cat",
                correct=False,
                justification="justification",
            ),
            QuizAnswer(
                quiz=quizzes[1],
                text="BABY",
                correct=True,
                justification="justification",
            ),
            QuizAnswer(
                quiz=quizzes[1],
                text="bad",
                correct=False,
                justification="justification",
            ),

            QuizAnswer(
                quiz=quizzes[2],
                text="banana",
                correct=False,
                justification="disgusting",
            ),
            QuizAnswer(
                quiz=quizzes[2],
                text="grapes",
                correct=False,
                justification="just ok",
            ),
            QuizAnswer(
                quiz=quizzes[2],
                text="apple",
                correct=True,
                justification="is best",
            ),
            QuizAnswer(
                quiz=quizzes[2],
                text="tomato",
                correct=False,
                justification="u weirdo",
            ),

            QuizAnswer(
                quiz=quizzes[3],
                text="69",
                correct=False,
                justification="justification",
            ),
            QuizAnswer(
                quiz=quizzes[3],
                text="D",
                correct=False,
                justification="justification",
            ),
            QuizAnswer(
                quiz=quizzes[3],
                text="deeeeezzzz nuutsss",
                correct=True,
                justification="justification",
            ),
            QuizAnswer(
                quiz=quizzes[3],
                text="green",
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
    reviews = Review.objects.bulk_create(
        [
            Review(
                reviewer=User.objects.get(user=manel),
                quiz=quizzes[0],
                accepted=False,
                comment="comment",
            ),
        ]
    )

except DatabaseError:
    traceback.print_exc()
    print("Oops")
