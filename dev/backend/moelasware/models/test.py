from django.db import models

from moelasware.models import fk, Quiz, User
from moelasware.models.submission import Submission

class Test(models.Model):
    """
    A collection of Quizzes.
    """

    author = fk(User)
    quizzes = models.ManyToManyField(Quiz)
    name = models.TextField()

    def create_submission(self, user, answers):
        # create a submission from the answers according to this json:
        """
        {
            "answers": [
                {
                    "quiz_id": 1,
                    "quiz_answers": [1, 2]
                },
                {
                    "quiz_id": 2,
                    "quiz_answers": [2]
                }
            ]
        }
        """
        # create a submission and calculate a grade
        submission = Submission.objects.create(
            test=self,
            submitter=user,
        )
        grade = 0

        # add answers to this submission
        for answer in answers:
            quiz_id = answer.get("quiz_id", None)
            quiz_answers = answer.get("quiz_answers", None)

            for quizAnswerId in quiz_answers:
                quiz_answer_obj = QuizAnswer.objects.get(pk=quizAnswerId)

                if quiz_answer_obj.correct is True:
                    grade += 1

                if quiz_answer_obj is None:
                    raise ValueError("QuizAnswer not found")

                # chck if quizz answer is in quizz
                if quiz_answer_obj.quiz.pk != quiz_id:
                    raise ValueError("QuizAnswer not in quiz")

                # create a submission answer
                SubmissionAnswer.objects.create(
                    submission=submission, answer=quiz_answer_obj
                )

        grade = grade / len(quiz_answers) * 100
        return submission, grade
