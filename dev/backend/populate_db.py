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
    sergio = AuthUser.objects.create_user("sergio42", "sergio@hotmail.com", "superior-brother")
except IntegrityError:
    print("Sergio already exists")
    pass

try:
    manel = AuthUser.objects.get(username="manel")
    john = AuthUser.objects.get(username="john")
    sergio = AuthUser.objects.get(username="sergio42")

    User.objects.bulk_create(
        [
            User(user=manel),
            User(user=john),
            User(user=sergio),
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
                description="do you know letters?",
                name="Quiz4",
            ),
            Quiz(
                author=User.objects.get(user=manel),
                question="What is 9 + 10?",
                description="math is easy",
                name="Quiz5",
            ),
            Quiz(
                author=User.objects.get(user=manel),
                question="How many Fast and Furious Movies are there?",
                description="too many?",
                name="Quiz6",
            ),
            Quiz(
                author=User.objects.get(user=manel),
                question="When was Minecraft 1.0 released?",
                description="too many?",
                name="Quiz7",
            ),
            Quiz(
                author=User.objects.get(user=sergio),
                question="How many books has Operah Winfrey written?",
                description="how many?",
                name="Quiz8",
            ),
            Quiz(
                author=User.objects.get(user=sergio),
                question="Which of these animals does NOT make milk?",
                description="nature be wild",
                name="Quiz9",
            ),
            Quiz(
                author=User.objects.get(user=sergio),
                question="What makes plants green?",
                description="nature be wild",
                name="Quiz10",
            ),
            Quiz(
                author=User.objects.get(user=sergio),
                question="Who voiced batman?",
                description="RIP :(",
                name="Quiz11",
            ),
            Quiz(
                author=User.objects.get(user=sergio),
                question="What are the LOST numbers?",
                description="Great 4 seasons.",
                name="Quiz12",
            ),
            Quiz(
                author=User.objects.get(user=sergio),
                question="How many cats exist in the world?",
                description="Never enough",
                name="Quiz13",
            ),
            Quiz(
                author=User.objects.get(user=sergio),
                question="O que é húmus?",
                description="Fun",
                name="Quiz14",
            ),
            Quiz(
                author=User.objects.get(user=sergio),
                question="Quantos modelos de iPhone existem?",
                description="They're all the same",
                name="Quiz15",
            ),

        ]
    )

    quizzes[0].tags.set([tags[2]])
    quizzes[1].tags.set([tags[2], tags[5]])
    quizzes[2].tags.set([tags[2], tags[6]])
    quizzes[3].tags.set([tags[2], tags[4]])
    quizzes[4].tags.set([tags[0]])
    quizzes[5].tags.set([tags[2], tags[3]])
    quizzes[6].tags.set([tags[2], tags[7]])

    quizzes[7].tags.set([tags[2], tags[3]])
    quizzes[8].tags.set([tags[2], tags[8]])
    quizzes[9].tags.set([tags[2], tags[8]])
    quizzes[10].tags.set([tags[2], tags[6]])
    quizzes[11].tags.set([tags[2], tags[4]])
    quizzes[12].tags.set([tags[1], tags[5]])
    quizzes[13].tags.set([tags[2], tags[3]])
    quizzes[14].tags.set([tags[0], tags[8]])
    

    print("Creating answers")
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
                text="apple",
                correct=True,
                justification="is best",
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
            QuizAnswer(
                quiz=quizzes[7],
                text="2",
                correct=False,
                justification="No",
            ),
            QuizAnswer(
                quiz=quizzes[7],
                text="10",
                correct=False,
                justification="No",
            ),
            QuizAnswer(
                quiz=quizzes[7],
                text="69",
                correct=False,
                justification="No",
            ),
            QuizAnswer(
                quiz=quizzes[7],
                text="0",
                correct=False,
                justification="at one point it was true",
            ),
            QuizAnswer(
                quiz=quizzes[7],
                text="5",
                correct=True,
                justification="Yes",
            ),
            QuizAnswer(
                quiz=quizzes[7],
                text="6",
                correct=False,
                justification="No",
            ),

            QuizAnswer(
                quiz=quizzes[8],
                text="Cow",
                correct=False,
                justification="No",
            ),
            QuizAnswer(
                quiz=quizzes[8],
                text="Platypus",
                correct=False,
                justification="No",
            ),
            QuizAnswer(
                quiz=quizzes[8],
                text="Snail",
                correct=True,
                justification="That would be CRAZY!",
            ),
            QuizAnswer(
                quiz=quizzes[8],
                text="Pidgeon",
                correct=False,
                justification="at one point it was true",
            ),
            QuizAnswer(
                quiz=quizzes[8],
                text="Dolphin",
                correct=False,
                justification="Yes",
            ),
            QuizAnswer(
                quiz=quizzes[8],
                text="Cat",
                correct=False,
                justification="No",
            ),

            QuizAnswer(
                quiz=quizzes[9],
                text="Cow",
                correct=False,
                justification="No",
            ),
            QuizAnswer(
                quiz=quizzes[9],
                text="Light Yagamy",
                correct=False,
                justification="No",
            ),
            QuizAnswer(
                quiz=quizzes[9],
                text="Swadloon",
                correct=False,
                justification="No",
            ),
            QuizAnswer(
                quiz=quizzes[9],
                text="Green+",
                correct=False,
                justification="No",
            ),
            QuizAnswer(
                quiz=quizzes[9],
                text="Leafeon",
                correct=False,
                justification="Yes",
            ),
            QuizAnswer(
                quiz=quizzes[9],
                text="Chlorophyll",
                correct=True,
                justification="Fancy word",
            ),

            QuizAnswer(
                quiz=quizzes[10],
                text="Kevin Conroy",
                correct=True,
                justification="RIP",
            ),
            QuizAnswer(
                quiz=quizzes[10],
                text="Mark Hamill",
                correct=False,
                justification="No",
            ),
            QuizAnswer(
                quiz=quizzes[10],
                text="Christian Bale",
                correct=False,
                justification="No",
            ),
            QuizAnswer(
                quiz=quizzes[10],
                text="Pete Davidson",
                correct=False,
                justification="No",
            ),
            QuizAnswer(
                quiz=quizzes[10],
                text="Mathew Mercer",
                correct=False,
                justification="No",
            ),
            QuizAnswer(
                quiz=quizzes[10],
                text="Matt Daemon",
                correct=False,
                justification="No",
            ),

            QuizAnswer(
                quiz=quizzes[11],
                text="4 2 15 16 24 42",
                correct=False,
                justification="No",
            ),
            QuizAnswer(
                quiz=quizzes[11],
                text="1 2 13 14 25 42",
                correct=False,
                justification="No",
            ),
            QuizAnswer(
                quiz=quizzes[11],
                text="4 8 15 16 23 42",
                correct=True,
                justification="4 8 15 16 23 42",
            ),
            QuizAnswer(
                quiz=quizzes[11],
                text="1 8 13 16 25 41",
                correct=False,
                justification="No",
            ),
            QuizAnswer(
                quiz=quizzes[11],
                text="4 2 15 14 25 42",
                correct=False,
                justification="No",
            ),
            QuizAnswer(
                quiz=quizzes[11],
                text="1 8 15 13 23 45",
                correct=False,
                justification="No",
            ),

            QuizAnswer(
                quiz=quizzes[12],
                text="420 million",
                correct=False,
                justification="No",
            ),
            QuizAnswer(
                quiz=quizzes[12],
                text="600 million",
                correct=True,
                justification="Miau",
            ),
            QuizAnswer(
                quiz=quizzes[12],
                text="100 million",
                correct=False,
                justification="No",
            ),
            QuizAnswer(
                quiz=quizzes[12],
                text="4",
                correct=False,
                justification="No",
            ),
            QuizAnswer(
                quiz=quizzes[12],
                text="500 million",
                correct=False,
                justification="No",
            ),
            QuizAnswer(
                quiz=quizzes[12],
                text="300 million",
                correct=False,
                justification="No",
            ),

            QuizAnswer(
                quiz=quizzes[13],
                text="Uma aldeia na baía de Santarém",
                correct=False,
                justification="No",
            ),
            QuizAnswer(
                quiz=quizzes[13],
                text="Uma espécie de animal",
                correct=False,
                justification="No",
            ),
            QuizAnswer(
                quiz=quizzes[13],
                text="Uma espécie de planta",
                correct=False,
                justification="No",
            ),
            QuizAnswer(
                quiz=quizzes[13],
                text="Comida de cão",
                correct=False,
                justification="No",
            ),
            QuizAnswer(
                quiz=quizzes[13],
                text="Uma espécie de cocó",
                correct=True,
                justification="Very funny",
            ),
            QuizAnswer(
                quiz=quizzes[13],
                text="Um monte de minhocas",
                correct=False,
                justification="No",
            ),

            QuizAnswer(
                quiz=quizzes[14],
                text="3",
                correct=False,
                justification="No",
            ),
            QuizAnswer(
                quiz=quizzes[14],
                text="34",
                correct=True,
                justification="Are they all the same?",
            ),
            QuizAnswer(
                quiz=quizzes[14],
                text="21",
                correct=False,
                justification="No",
            ),
            QuizAnswer(
                quiz=quizzes[14],
                text="42",
                correct=False,
                justification="No",
            ),
            QuizAnswer(
                quiz=quizzes[14],
                text="10",
                correct=False,
                justification="No",
            ),
            QuizAnswer(
                quiz=quizzes[14],
                text="17",
                correct=False,
                justification="No",
            ),
        ]
    )

    tests = Test.objects.bulk_create(
        [
            Test(author=User.objects.get(user=manel), name="Nature"),
            Test(author=User.objects.get(user=john), name="Media"),
            Test(author=User.objects.get(user=manel), name="Memes"),
            Test(author=User.objects.get(user=sergio), name="Random"),
        ]
    )
    tests[0].quizzes.set([quizzes[1], quizzes[8], quizzes[9], quizzes[12]])
    tests[1].quizzes.set([quizzes[5], quizzes[7], quizzes[10], quizzes[11]])
    tests[2].quizzes.set([quizzes[1], quizzes[2], quizzes[3], quizzes[4], quizzes[13]])
    tests[3].quizzes.set([quizzes[0], quizzes[6], quizzes[14]])

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
