from django.http import JsonResponse
from django.http.response import HttpResponseNotFound
from rest_framework.decorators import api_view

from moelasware.models import SubmissionAnswer, User


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
        info_list.append(
            {
                user.user.id: [
                    username,
                    date_joined,
                    solved_tests,
                    correct_answers,
                    user.user.id,
                    user.user.email,
                ]
            }
        )

        # TODO Create Serializer for this
    return JsonResponse({"fame": info_list})
