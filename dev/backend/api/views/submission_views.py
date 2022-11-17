from django.http import JsonResponse
from django.http.response import HttpResponseNotFound, HttpResponseBadRequest
from django.shortcuts import get_object_or_404
from moelasware.models import SubmissionAnswer, Submission, User, Test, Quiz, QuizAnswer

from rest_framework.decorators import api_view
from rest_framework import status

from api.serializers import SubmissionSerializer, QuizAnswerSerializerWithRes, SubmissionAnswerSerializer, QuizSerializer, AnsweredSubmissionsSerializer


@api_view(["GET", "POST"])
def submission_view(request, pk):
    user = User.objects.get(pk=1)

    proxy = {
        "GET": get_self_submission_view,
        "POST": create_submission,
    }
    return proxy[request.method](request, pk, user)


def handle_serializer_test(obj):
    obj_list = []
    id = 0
    for i in obj:
        author = i["submitter"]["user"]["username"]
        correct_answers = i["correct_answers"]
        total_answers = i["total_answers"]
        
        obj_list.append({id : [id, author, correct_answers, total_answers]})
        id += 1
    return obj_list
 
@api_view(['GET'])
def submission_of_a_test_view(request, pk):

    test = get_object_or_404(Test, id=pk)

    submissions = Submission.objects.filter(test__id=pk)

    if not submissions.exists():
        return HttpResponseNotFound('Submissions not found')

    sub = AnsweredSubmissionsSerializer(submissions, many = True).data
    sub = handle_serializer_test(sub)

    return JsonResponse({"submissions": sub})  



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


def get_self_submission_view(request, pk, user):
    '''
    Function that gets a submission from a test. Should we allow the user to get someone else's submission?
    '''

    # check if the uer is able to solve the test
    if not user.can_solve_tests():
        # You should just return a simple plain-text response, no need for JSON. Use HttpResponseForbidden.
        return HttpResponseForbidden('You are not allowed to solve tests')

    # get all quizzes that are in the test
    quizzes = Quiz.objects.filter(test__id=pk)

    # get all the answers for the quizzes
    quizzes_serializer = QuizSerializer(quizzes, many=True)

    for quiz in quizzes_serializer.data:
        answers = QuizAnswer.objects.filter(quiz__id=quiz["id"])
        answers_serializer = QuizAnswerSerializerWithRes(answers, many=True)
        quiz["answers"] = answers_serializer.data

    # get the submission
    submission = Submission.objects.filter(test__id=pk, submitter=user).last()

    # get all the SubmissionAnswer for the submissions with the user and the submission
    submission_answers = SubmissionAnswer.objects.filter(
        submission__id=submission.id)
    submission_answers_serializer = SubmissionAnswerSerializer(
        submission_answers, many=True)

    # append the quizz id to the submission answer
    for submission_answer in submission_answers_serializer.data:
        # from the quizz answer get the quiz id
        quiz_answer = QuizAnswer.objects.filter(
            id=submission_answer["answer"]).first()
        submission_answer["quiz_id"] = quiz_answer.quiz.id

    """
    answers: {
        "quiz_id1": [1,2,3],
        "quiz_id2: [4,5,7],
    }
    """
    grouped_answers = {
        quiz_id: [answer["answer"] for answer in submission_answers_serializer.data if answer["quiz_id"] == quiz_id] for quiz_id in [quiz["id"] for quiz in quizzes_serializer.data]
    }
    return JsonResponse({'answers': grouped_answers, 'quizzes': quizzes_serializer.data}, status=status.HTTP_200_OK)


# @login_required
def create_submission(request, pk, user):
    """
    Function that creates a submission from a test
    Body Example:
    "answers": [
            {
                "quiz_id": 1, # pergunta
                "quiz_answers": 3 # id of the answers choosen
            },
            {
                "quiz_id": 2,
                "quiz_answers": 1 # id of the answers choosen
            }
        ]
    """
    # check if the uer is able to solve the test
    if not user.can_solve_tests():
        # You should just return a simple plain-text response, no need for JSON. Use HttpResponseForbidden.
        return HttpResponseForbidden('You are not allowed to solve tests')

    # get test by id -> detail view
    instance = get_object_or_404(Test, pk=pk)

    # get the answers from the request body
    answers = request.data.get('answers', None)

    # check if the answers are valid
    if not answers:
        return HttpResponseBadRequest('No answers provided')

    if not isinstance(answers, list):
        return HttpResponseBadRequest('Answers must be a list')

    # TODO: not sure if this is intended or not, can a user Repeat Quizzes? If so this should be changed
    # check if user alreadysubmitted the quizz in this test
    # if Submission.objects.filter(test__id=pk, user=user).exists():
    #    return HttpResponseBadRequest('You already submitted this test')

    # check if the answers are valid
    for answer in answers:
        if not isinstance(answer, dict):
            return HttpResponseBadRequest('Answers must be a list of dicts')

        if not answer.get('quiz_id', None):
            return HttpResponseBadRequest('Answers must have a quiz_id')

        if not answer.get('quiz_answers', None):
            return HttpResponseBadRequest('Answers must have a quiz_answers')

        if not isinstance(answer.get('quiz_answers', None), int):
            return HttpResponseBadRequest('quiz_answers must be a int')

    # check if the answers are valid
    for answer in answers:
        quiz_id = answer.get('quiz_id', None)
        quiz_answer = answer.get('quiz_answers', None)

        # get the quiz
        quiz = get_object_or_404(Quiz, pk=quiz_id)

        # check if the quiz is in the test
        if quiz not in instance.quizzes.all():
            return HttpResponseBadRequest('Quiz is not in the test')

    # create the submission
    try:
        new_sub, grade = instance.create_submission(user, answers)
    except Exception as e:
        return HttpResponseBadRequest(e)

    submission_serializer = SubmissionSerializer(new_sub, many=False)

    # return the submission
    return JsonResponse({'submission': submission_serializer.data, 'grade': grade}, status=status.HTTP_200_OK)


@api_view(['GET'])
# @login_required
def get_submission_grade(request, pk):
    # TODO: remove this in produciton
    user = User.objects.get(pk=1)

    """
    Function that gets the grade of a submission
    """

    # get the SubmissionAnswer from pk of the test, get the latest submission

    submission = Submission.objects.filter(test__id=pk, submitter=user).last()
    print(submission)

    # check if the user is the owner of the submission
    if submission.submitter != user:
        return HttpResponseForbidden('You are not allowed to see this submission')

    grade = 0

    # get all the Quizz Answers from the submission
    submission_answers = SubmissionAnswer.objects.filter(
        submission__id=submission.id)
    print(submission_answers)

    # get all the quizz answers from the submission_answers
    for sub_answer in submission_answers:
        if sub_answer.answer.correct == True:
            grade += 1

    num_quizzes = Quiz.objects.filter(test=submission.test).count()

    grade = (grade / num_quizzes) * 100

    return JsonResponse({'grade': grade}, status=status.HTTP_200_OK)
