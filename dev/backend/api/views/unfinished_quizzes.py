from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from rest_framework.decorators import api_view
from django.http.response import HttpResponseBadRequest
from moelasware.models import Quiz, QuizAnswer
from api.views import QuizSerializer, QuizAnswerSerializer

from ..serializers.unfinished_quizzes import CreateEditQuizSerializer


@api_view(["GET"])
@login_required
def get_unfinished_quizzes(request):

    user = request.user
    info = Quiz.objects.filter(author__user__username=user, approved=False).filter(finished = False).order_by("creation_date")
    quizzes = []
    for i in range(len(info)):
        quizzes.append([info[i].name, info[i].id, info[i].creation_date])


    return JsonResponse({"quizzes": quizzes}, status=200)


@api_view(["GET"])
@login_required
def get_draft_info(request, id):

    author = request.user
    quiz = Quiz.objects.filter(id = id).filter(author__user__username = author)

    if not quiz.exists():
        return HttpResponseBadRequest("Quiz not found")

    quiz = quiz[0]
    answers = QuizAnswer.objects.filter(quiz = quiz).order_by("id")

    if not answers.exists():
        return HttpResponseBadRequest("Answers not found")

    quiz = QuizSerializer(quiz).data

    answers = QuizAnswerSerializer(answers, many = True).data

    count = 1
    for i in answers:
        if i['correct'] == True:
            quiz['correct'] = count
        else:
            count += 1

    return JsonResponse({"draft": [quiz, *answers]})
