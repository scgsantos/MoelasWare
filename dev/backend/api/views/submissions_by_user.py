from django.shortcuts import get_object_or_404
from django.shortcuts import render
from django.http.response import HttpResponseNotFound
from django.http import JsonResponse
from rest_framework.decorators import api_view
from moelasware.models import *
from api.serializers.submission_serializers import *

def handle_serializer(obj):
    obj_list = []
    id = 0

    for i in obj:
        test_id = i["test"]["id"]
        author = i["test"]["author"]["user"]["username"]

        tags = ""
        for j in i["test"]["quizzes"]:
            for tag in j["tags"]:
                if tag["text"] not in tags:
                    tags += tag["text"]
                    tags += ","
        
        tags = tags[0:len(tags)-1]
        id += 1
        obj_list.append({test_id : [test_id, tags, author, id]})

    return obj_list

@api_view(['GET'])
def submissions_by_user_view(request, pk):

    user = get_object_or_404(User, id=pk)

    user = user.user.username 

    submissions = Submission.objects.filter(submitter__user__username=user)

    if not submissions.exists():
        return HttpResponseNotFound('Submissions not found')

    submission = SubmissionSerializer(submissions, many=True).data
    submission = handle_serializer(submission)

    return JsonResponse({'submissions' : submission})