from django.http import JsonResponse
from django.http.response import HttpResponseNotFound
from moelasware.models import SubmissionAnswer, User, Tag
from rest_framework.decorators import api_view


# TODO: this is pretty bad; make use of builtin functions
def return_date(date: str):
    date_months = [
        "jan",
        "feb",
        "mar",
        "apr",
        "may",
        "jun",
        "jul",
        "aug",
        "sep",
        "oct",
        "nov",
        "dec",
    ]
    x = date.replace(" ", "-").split("-")
    date_string = date_months[int(x[1]) - 1] + " " + x[2] + " " + x[0]
    return date_string


@api_view(["GET"])
def hall_of_fame_view(request):

    users = User.objects.all().order_by("-user")
    if not users.exists():
        return HttpResponseNotFound("User not found")

    submissions = SubmissionAnswer.objects.all()
    if not submissions.exists():
        return HttpResponseNotFound("Submissions not found")

    # tags = Tag.objects.all()
    # if not tags.exists():
    # return HttpResponseNotFound("Tags not found")

    info_list = []
    for user in users:
        username = user.user.username
        solved_tests = SubmissionAnswer.objects.filter(
            submission__submitter__user__username=user.user.username
        ).count()
        date_joined = return_date(str(user.user.date_joined))
        correct_answers = (
            SubmissionAnswer.objects.filter(submission__submitter=user)
            .filter(answer__correct=True)
            .count()
        )

        # info_tags = get_correct_answers_tags(tags, user)

        info_list.append(
            {
                user.user.id: [
                    username,
                    date_joined,
                    solved_tests,
                    correct_answers,
                    # info_tags,
                    user.user.id,
                    user.user.email,
                ]
            }
        )

        # TODO Create Serializer for this
    return JsonResponse({"fame": info_list})


# FIXME: Needs to be changed when a Quiz can have only one tag
# This is probably not the best file / url for this
def get_correct_answers_tags(tags, user):
    """
    Returns a list with the number of correct answers for each tag
    Takes as input a list of tags and a user
    """

    info_tags = {}  # List with number correct answers for each tag

    for tag in tags:
        submissions = SubmissionAnswer.objects.filter(
            submission__submitter__user__username=user.user.username
        ).filter(answer__correct=True)

        # Get QuizAnswer for each SubmissionAnswer
        answers = []
        for submission in submissions:
            answers.append(submission.answer)

        # For each QuizAnswer get the corresponding Quiz
        quizzes = []
        for answer in answers:
            quizzes.append(answer.quiz)

        # Get count of correct answers for each tag
        correct_answers = 0
        for quiz in quizzes:
            if tag in quiz.tags.all():
                correct_answers += 1

        info_tags[tag.text] = correct_answers

    return info_tags
