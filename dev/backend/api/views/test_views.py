from django.http import JsonResponse
from django.http.response import HttpResponseNotFound
from django.shortcuts import get_object_or_404
from moelasware.models import SubmissionAnswer, Test
from rest_framework.decorators import api_view

from api.serializers import CreateTestSerializer, GetTestSerializer


@api_view(["GET"])  # allowed method(s)
def get_test_view(request, pk):
    # get test by id -> detail view
    instance = get_object_or_404(Test, pk=pk)
    serializer = GetTestSerializer(instance, many=False)

    return JsonResponse({"test": serializer.data})


@api_view(["POST"])
def create_test_view(request):
    serializer = CreateTestSerializer(data=request.data)

    if serializer.is_valid(
        raise_exception=True
    ):  # raises exception on why its not valid
        # instance = serializer.save()

        # print(instance)
        return Response(serializer.data)

    return Response({"invalid": "not good data"}, status=400)


#@api_view(['GET'])
#def submission_of_a_test_view(request, pk):
#
#
#    test = get_object_or_404(Test, id=pk)
#
#    submissions = SubmissionAnswer.objects.filter(submission__test__id=pk)
#
#    if not submissions.exists():
#        #print("This is user hasn't taken any tests yet...")
#    
#    submission = GetSubmissionsAnsweredByTest(submissions, many=True)
#
#    #TODO Add Time
#    return JsonResponse({"submissions_by_test": submission.data})    


@api_view(["GET"])
def submission_of_a_test_view(request, pk):

    # TODO USE SERIALZIER
    test = get_object_or_404(Test, id=pk)

    submissions = SubmissionAnswer.objects.filter(submission__test__id=pk).order_by(
        "submission__submitter__user__id"
    )

    if not submissions.exists():
        # print("This is user hasn't taken any tests yet...")
        return HttpResponseNotFound("Submissions not found")

    info_list = []
    id = 0
    for sub in submissions:
        user_id = sub.submission.submitter.user.id
        username = sub.submission.submitter.user.username
        id += 1
        info_list.append({user_id: [username, 0, id]})

    # submission = GetSubmissionsAnsweredByTest(submissions, many=True)

    # TODO Add Time
    return JsonResponse({"submissions": info_list})


@api_view(["GET"])
def get_all_tests_view(request):

    tests = Test.objects.all().order_by("id")
    if not tests.exists():
        return HttpResponseNotFound("User not found")

    submissions = SubmissionAnswer.objects.all()
    if not submissions.exists():
        return HttpResponseNotFound("Submissions not found")

    info_list = []
    for test in tests:
        solved_tests = SubmissionAnswer.objects.filter(
            submission__test__id=test.id
        ).count()
        tags = ""
        for quiz in test.quizzes.all():
            for tag in quiz.tags.all():
                if tag.text not in tags:
                    tags += tag.text
                    tags += ","

        tags = tags[0 : len(tags) - 1]
        info_list.append(
            {test.id: [test.id, solved_tests, tags, test.author.user.username]}
        )

    # TODO Create Serializer for this
    return JsonResponse({"submissions_by_test": info_list})
