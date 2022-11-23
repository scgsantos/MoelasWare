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
    esdrubaldo = AuthUser.objects.create_user("esdrubaldo", "esdrubaldo@gmail.com", "1234")
except IntegrityError:
    print("Esdrubaldo already exists")
    pass


try:
    manel = AuthUser.objects.get(username="manel")
    john = AuthUser.objects.get(username="john")
    esdrubaldo = AuthUser.objects.get(username="esdrubaldo")

    User.objects.bulk_create(
        [
            User(user=manel),
            User(user=john),
            User(user=esdrubaldo),
        ]
    )

    tags = Tag.objects.bulk_create(
        [
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
                name="Quiz1",
                finished = True,
            ),
            Quiz(
                author=User.objects.get(user=manel),
                question="Baby is ____?",
                description="How would you describe baby?",
                name="Quiz2",
                finished = True,
            ),
            Quiz(
                author=User.objects.get(user=manel),
                question="What is the best fruit?",
                description="objectively, what fruit is the best ever",
                name="Quiz3",
                finished = True,
            ),
            Quiz(
                author=User.objects.get(user=manel),
                question="A B C _ ?",
                description="do you know lettets?",
                name="Quiz4",
                finished = True,
            ),
            Quiz(
                author=User.objects.get(user=manel),
                question="What is 9 + 10?",
                description="math is easy",
                name="Quiz5",
                finished = True,
            ),
            Quiz(
                author=User.objects.get(user=manel),
                question="How many Fast and Furious Movies are there?",
                description="too many?",
                name="Quiz6",
                finished = True,
            ),
            Quiz(
                author=User.objects.get(user=manel),
                question="When was Minecraft 1.0 released?",
                description="too many?",
                name="Quiz7",
                finished = True,
            ),
        ]
    )

    quizzes[0].tags.set([tags[3]])
    quizzes[1].tags.set([tags[3], tags[5]])
    quizzes[2].tags.set([tags[3], tags[6]])
    quizzes[3].tags.set([tags[3], tags[4]])
    quizzes[4].tags.set([tags[9]])
    quizzes[5].tags.set([tags[3], tags[3]])
    quizzes[6].tags.set([tags[3], tags[7]])
    

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
                text="bad",
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
                quiz=quizzes[2],
            ),
            QuizAnswer(
                quiz=quizzes[2],
                text="grapes",
                correct=False,
                justification="just ok",
            ),
            QuizAnswer(
                quiz=quizzes[2],
                text="tomato",
                correct=False,
                justification="u weirdo",
            ),
            QuizAnswer(
                quiz=quizzes[2],
                text="banana",
                correct=False,
                justification="disgusting",
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

            QuizAnswer(
                quiz=quizzes[4],
                text="69",
                correct=False,
                justification="funny",
            ),
            QuizAnswer(
                quiz=quizzes[4],
                text="19",
                correct=False,
                justification="u smort",
            ),
            QuizAnswer(
                quiz=quizzes[4],
                text="21?",
                correct=True,
                justification="memes",
            ),
            QuizAnswer(
                quiz=quizzes[4],
                text="2",
                correct=False,
                justification="looks right",
            ),

            QuizAnswer(
                quiz=quizzes[5],
                text="69",
                correct=False,
                justification="maybe someday",
            ),
            QuizAnswer(
                quiz=quizzes[5],
                text="10",
                correct=True,
                justification="u smort",
            ),
            QuizAnswer(
                quiz=quizzes[5],
                text="2",
                correct=False,
                justification="memes",
            ),
            QuizAnswer(
                quiz=quizzes[5],
                text="7",
                correct=False,
                justification="no",
            ),

            QuizAnswer(
                quiz=quizzes[6],
                text="2014",
                correct=False,
                justification="Herobrine",
            ),
            QuizAnswer(
                quiz=quizzes[6],
                text="10 A.C.",
                correct=False,
                justification="who's to say??",
            ),
            QuizAnswer(
                quiz=quizzes[5],
                text="69",
                correct=False,
                justification="why??",
            ),
            QuizAnswer(
                quiz=quizzes[5],
                text="2011",
                correct=True,
                justification="great year",
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
