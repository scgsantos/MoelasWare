from django.http import JsonResponse
from django.http.response import HttpResponseNotFound
from django.shortcuts import get_object_or_404 
from moelasware.models import SubmissionAnswer, User
from rest_framework.decorators import api_view


#@api_view(['GET'])
#def submissions_by_user_view(request, pk):
#
#
#    user = get_object_or_404(User, id=pk)
#
#    user = user.user.username 
#
#    submissions = SubmissionAnswer.objects.filter(submission__submitter__user__username=user)
#
#    if not submissions.exists():
#        return HttpResponseNotFound('Submissions not found')
#
#
#    submission = GetSubmissionsAnsweredByTest(submissions, many=True)
#
#    return JsonResponse({'submissions_by_user' : ["potetu"]})


@api_view(["GET"])
def submissions_by_user_view(request, pk):

    # TO DO CHANGE SERIALIZER
    user = get_object_or_404(User, id=pk)

    user = user.user.username

    submissions = SubmissionAnswer.objects.filter(
        submission__submitter__user__username=user
    )

    if not submissions.exists():
        return HttpResponseNotFound("Submissions not found")

    info_list = []
    id = 0
    for sub in submissions:
        test_id = sub.submission.test.id
        author = sub.submission.test.author.user.username
        tags = ""
        for quiz in sub.submission.test.quizzes.all():
            for tag in quiz.tags.all():
                if tag.text not in tags:
                    tags += tag.text
                    tags += ","

        tags = tags[0 : len(tags) - 1]
        id += 1
        info_list.append({test_id: [test_id, tags, author, id]})

    return JsonResponse({"submissions": info_list})
