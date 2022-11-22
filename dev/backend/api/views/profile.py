from django.http.response import HttpResponseNotFound
from django.http import JsonResponse
from rest_framework.decorators import api_view
from moelasware.models import *
from api.serializers import *

@api_view(['GET'])
def profile_view(request):

    user = User.objects.filter(user__id = 2)

    if not user.exists():
        return HttpResponseNotFound('User not found')

    user = user[0]

    tests_done = Submission.objects.filter(submitter = user)

    if not tests_done.exists():
        return HttpResponseNotFound('Submissions not found')

    correct_answers = SubmissionAnswer.objects.filter(answer__correct = True).filter(submission__submitter = user)
    number_of_correct_answers = correct_answers.count()    

    tags = {}
    for i in Tag.objects.all():
        tags[i.text]=0


    for i in correct_answers:
        for j in i.answer.quiz.tags.all():
            tags[j.text]+=1

    return JsonResponse({"profile" : tags, "correct_answers" : number_of_correct_answers, "user":user.user.username})
