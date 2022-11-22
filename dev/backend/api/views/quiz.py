import random

from django.http import HttpResponseBadRequest, JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view

from api.serializers import QuizAnswerSerializer, QuizSerializer, QuizFinishedSerializer
from moelasware.models import Quiz, QuizAnswer, User, Tag, Review


@api_view(["GET"])
def get_quiz_view(request, pk):
    # get a test with all the quizzAnswers attached to it
    if pk is not None:
        instance = get_object_or_404(Test, pk=pk)
        serializer = GetTestSerializer(instance, many=False)

        # get all the Quizzes for this test
        quizzes = Quiz.objects.filter(test__id=pk)
        quizzes_serializer = QuizSerializer(quizzes, many=True)

        # for each quiz get all the answers
        for quiz in quizzes_serializer.data:
            answers = QuizAnswer.objects.filter(quiz__id=quiz["id"])
            answers_serializer = QuizAnswerSerializer(answers, many=True)
            quiz["answers"] = answers_serializer.data

        return JsonResponse(
            {"test": serializer.data, "quizzes": quizzes_serializer.data}
        )

    return JsonResponse(
        {"invalid": "not good data"}, status=status.HTTP_400_BAD_REQUEST
    )


@api_view(["GET"])
def get_total_number_of_quizzes_view(request):
    count = Quiz.objects.count()
    return JsonResponse({"quizzes_count": count})


@api_view(["POST"])
def get_n_quizzes_view(request):
    # If no quizzes are sent in the request -> quizzes are selected randomly
    # User gave config (num_quizes, allowed_tags (optional))

    if not "num_quizzes" in request.data.keys():
        return HttpResponseBadRequest("You must provide the number of quizzes")

    try:
        num_quizzes = int(request.data.get("num_quizzes"))
    except ValueError:
        return HttpResponseBadRequest(
            f"The number of quizzes must be a number and not {request.data.get('num_quizzes')}"
        )

    tags = request.data.get("allowed_tags")
    quizzes_set = Quiz.objects.order_by("?")

    quizzes_set = (
        quizzes_set.all()
        if not tags
        else quizzes_set.filter(tags__text__in=tags).distinct()
    )

    quizzes_set = quizzes_set[:num_quizzes]

    # Not enough quizzes that meet the specs
    if len(quizzes_set) < num_quizzes:
        return HttpResponseBadRequest(
            "The number of requested quizzes is bigger than the number of existing quizzes meeting the given specifications"
        )

    quizzes_serializer = QuizSerializer(quizzes_set, many=True)

    return JsonResponse({"quizzes": quizzes_serializer.data})


@api_view(["GET"])
def get_answers_for_quiz_view(request, quiz_id):
    answers_set = QuizAnswer.objects.filter(quiz__id=quiz_id)

    answers_serializer = QuizAnswerSerializer(answers_set, many=True)

    return JsonResponse({"answers": answers_serializer.data})


def quiz_finished_serializer_handler(data):
    quiz_list = []
    for i in data:
        quiz_list.append(
            [
                i["id"],
                i["name"],
                i["tags"],
                i["number_of_reviews_done"],
                i["review_result"],
            ]
        )
    return quiz_list
    
@api_view(['GET'])
def get_user_quizzes(request):

    user = User.objects.filter(user__id=1)

    if not user.exists():
        return HttpResponseBadRequest("User not found")

    user = user[0]

    quizzes = Quiz.objects.filter(author=user).filter(finished=True)

    quizzes = QuizFinishedSerializer(quizzes, many=True).data

    quizzes = quiz_finished_serializer_handler(quizzes)

    return JsonResponse({"list_of_quizzes": quizzes})


def handle_frontend_fields(dataRequest):
    option_list = ["option1", "option2", "option3", "option4", "option5", "option6"]
    justification_list = [
        "justification1",
        "justification2",
        "justification3",
        "justification4",
        "justification5",
        "justification6",
    ]

    data = {"answers": [], "justification": []}
    for i in dataRequest:
        if i in option_list:
            data["answers"].append(dataRequest[i])
        elif i in justification_list:
            data["justification"].append(dataRequest[i])
        else:
            data[i] = dataRequest[i]
    return data


@api_view(["POST"])
def create_quiz_view(request):

    dataRequest = request.data["inputs"]
    data = handle_frontend_fields(dataRequest)

    if "name" not in data or data["name"] == "":
        # return HttpResponseBadRequest("Quiz name not inserted")
        return JsonResponse({"resposta": "Quiz name not inserted"})

    quiz = Quiz.objects.filter(name=data["name"])

    if quiz.exists():
        # return HttpResponseBadRequest(f"Quiz {data['name']} already exists")
        return JsonResponse({"resposta": f"Quiz {data['name']} already exists"})

    author = User.objects.get(id=1)
    """
    if "author" not in data:
        author = User.objects.get(id = 1)
        return HttpResponseBadRequest('Author not found')

    author = User.objects.filter(user__id = data['author'])

    if not author.exists():
        return HttpResponseNotFound('Author not found')

    author = author[0]
    """
    quiz = Quiz(name=data["name"], author=author)
    quiz.save()
    for i in range(0, 6):
        quiz_answer = QuizAnswer(
            quiz=quiz,
        )
        quiz_answer.save()

    quiz_answers = QuizAnswer.objects.filter(quiz=quiz)

    for i in data:
        match i:
            case "description":
                if type(data["description"]) is str:
                    quiz.description = data["description"]

            case "question":
                if type(data["question"]) is str:
                    quiz.question = data["question"]

            case "tag":
                if type(data["tag"]) is str:
                    if len(data["tag"]) > 0:
                        tag = Tag.objects.filter(text=data["tag"])
                        if tag.exists():
                            tag = tag[0]
                            quiz.tags.add(tag)
                    else:
                        for j in quiz.tags.all():
                            quiz.tags.remove(i)
                else:
                    # return HttpResponseNotFound("Wrong Data for Tags Field")
                    return JsonResponse({"resposta": "Wrong Data for Tags Field"})

            case "answers":
                if (
                    type(data["answers"]) is list
                    and len(data["answers"]) > 0
                    and len(data["answers"]) <= 6
                ):
                    for j in range(len(data["answers"])):
                        answer = quiz_answers[j]
                        answer.text = data["answers"][j]
                        answer.save()

                elif type(data["answers"]) is not list:
                    # return HttpResponseNotFound("Wrong Data for Answers Field")
                    return JsonResponse({"resposta": "Wrong Data for Answers Field"})
                elif len(data["answers"]) == 0:
                    for j in range(len(quiz_answers)):
                        answer = quiz_answers[j]
                        answer.text = ""
                        answer.save()

            case "justification":
                if (
                    type(data["justification"]) is list
                    and len(data["answers"]) > 0
                    and len(data["answers"]) <= 6
                ):
                    for j in range(len(data["justification"])):
                        answer = quiz_answers[j]
                        answer.justification = data["justification"][j]
                        answer.save()
                elif type(data["justification"]) is not list:
                    return JsonResponse(
                        {"resposta": "Wrong Data for Justification Field"}
                    )
                    # return HttpResponseNotFound("Wrong Data for Justification Field")
                elif len(data["justification"]) == 0:
                    for j in range(len(quiz_answers)):
                        answer = quiz_answers[j]
                        answer.justification = ""
                        answer.save()

            case "correct":
                if type(data["correct"]) is str and len(data["correct"]) > 0:
                    correct = int(data["correct"][len(data["correct"]) - 1])
                    answers = QuizAnswer.objects.filter(quiz=quiz).order_by("id")
                    for i in range(1, len(answers) + 1):
                        if i == correct:
                            answers[i - 1].correct = True
                            answers[i - 1].save()
    quiz.save()

    quizzes = QuizAnswer.objects.filter(quiz=quiz)

    response = finish_quiz(quiz, quizzes)
    return JsonResponse(response)


@api_view(["POST"])
def edit_quiz_view(request):

    dataRequest = request.data["inputs"]
    data = handle_frontend_fields(dataRequest)
    id = data["id"]

    if "id" not in data:
        # return HttpResponseNotFound('Quiz not found')
        return JsonResponse("Quiz not found")

    quiz = Quiz.objects.filter(id=id).filter(finished=False)

    if not quiz.exists():
        return JsonResponse("Quiz not found or already finished")
        # return HttpResponseNotFound('Quiz not found or already finished')

    quiz = quiz[0]

    new_name = Quiz.objects.filter(name=data["name"]).filter(author=quiz.author)

    if new_name.exists() and quiz.name != new_name[0].name:
        # return HttpResponseNotFound(f"Quiz {data['name']} already exists")
        return JsonResponse(f"Quiz {data['name']} already exists")

    if "author" not in data:
        # return HttpResponseNotFound('Author not found')
        return JsonResponse("Author not found")

    author = User.objects.filter(user__id=data["author"])

    if author.exists() and author[0] != quiz.author:
        # return HttpResponseNotFound('Author not allowed to edit this quiz')
        return JsonResponse("Author not allowed to edit this quiz")

    elif not author.exists():
        # return HttpResponseNotFound('Author not found')
        return JsonResponse("Author not found")

    author = author[0]
    quiz_answers = QuizAnswer.objects.filter(quiz=quiz)

    for i in data:
        match i:
            case "name":
                if type(data["name"]) is str and data["name"] != "":
                    quiz.name = data["name"]
                elif data["name"] == "":
                    # return HttpResponseNotFound("Invalid name for quiz")
                    return JsonResponse("Invalid quiz name")

            case "description":
                if type(data["description"]) is str and data["description"] is not None:
                    quiz.description = data["description"]
                else:
                    # return HttpResponseNotFound("Wrong Data for Description Field")
                    return JsonResponse("Wrong Data for Description Field")

            case "question":
                if type(data["question"]) is str and data["question"] is not None:
                    quiz.question = data["question"]
                else:
                    # return HttpResponseNotFound("Wrong Data for Question Field")
                    return JsonResponse("Wrong Data for Question Field")

            case "tags":
                if type(data["tags"]) is str:
                    if len(data["tags"]) > 0:
                        tag = Tag.objects.filter(text=data["tags"])
                        if tag.exists():
                            tag = tag[0]
                            quiz.tags.add(tag)
                    else:
                        for j in quiz.tags.all():
                            quiz.tags.remove(i)
                else:
                    # return HttpResponseNotFound("Wrong Data for Tags Field")
                    return JsonResponse("Wrong Data for Tags Field")

            case "answers":
                if (
                    type(data["answers"]) is list
                    and len(data["answers"]) > 0
                    and len(data["answers"]) <= 6
                ):
                    for j in range(len(data["answers"])):
                        answer = quiz_answers[j]
                        answer.text = data["answers"][j]
                        answer.save()

                elif type(data["answers"]) is not list:
                    # return HttpResponseNotFound("Wrong Data for Answers Field")
                    return JsonResponse("Wrong Data for Answers Field")

                elif len(data["answers"]) == 0:
                    for j in range(len(quiz_answers)):
                        answer = quiz_answers[j]
                        answer.text = ""
                        answer.save()

            case "justification":
                if (
                    type(data["justification"]) is list
                    and len(data["answers"]) > 0
                    and len(data["answers"]) <= 6
                ):
                    for j in range(len(data["justification"])):
                        answer = quiz_answers[j]
                        answer.justification = data["justification"][j]
                        answer.save()
                elif type(data["justification"]) is not list:
                    # return HttpResponseNotFound("Wrong Data for Justification Field")
                    return JsonResponse("Wrong Data for Justification Field")

                elif len(data["justification"]) == 0:
                    for j in range(len(quiz_answers)):
                        answer = quiz_answers[j]
                        answer.justification = ""
                        answer.save()

            case "correct":
                if (
                    type(data["correct"]) is int
                    and data["correct"] > 0
                    and data["correct"] <= 6
                ):
                    answers = QuizAnswer.objects.filter(quiz=quiz).order_by("id")
                    flag = False
                    for i in range(len(answers)):
                        if answers[i].correct == True and i + 1 == data["correct"]:
                            flag = True

                    if not flag:
                        for i in answers:
                            i.correct = False
                            i.save()

                    answers[data["correct"] - 1].correct = True
                    answers[data["correct"] - 1].save()

    quiz.save()

    quizzes = QuizAnswer.objects.filter(quiz=quiz)
    response = finish_quiz(quiz, quizzes)
    return JsonResponse(response)


def finish_quiz(quiz: Quiz, quiz_answers: list):

    quiz_ready = False
    quiz_answers_ready = True
    correct_answer = False
    if (
        quiz.name != ""
        and quiz.tags.all().count() > 0
        and quiz.question != ""
        and quiz.description != ""
        and not quiz.finished
        and quiz.author is not None
    ):
        quiz_ready = True

    for i in quiz_answers:
        if i.text == "" or i.justification == "":
            quiz_answers_ready = False
        if i.correct:
            correct_answer = True

    if not correct_answer or not quiz_ready or not quiz_answers_ready:
        response = {"resposta": f"Your quiz {quiz.name} has been saved"}
        # response = {'resposta' : f"Your quiz has been saved (unfinished){[quiz.name, quiz.id]}"}
    else:
        response = {"resposta": f"Your quiz {quiz.name} has been finished successfully"}
        # response = {'resposta' : f"Your quiz has been finished successfully{[quiz.name, quiz.id]}"}

        users = User.objects.all()
        users = list(users)
        reviewers_list = []

        number_of_reviewers = 0

        while True:
            if number_of_reviewers == 3:
                break

            random_number = random.randint(0, len(users) - 1)
            user = users.pop(random_number)
            reviewers_list.append(user)
            number_of_reviewers += 1

        for i in reviewers_list:
            review = Review(
                reviewer=i,
                quiz=quiz,
            )
            review.save()

        quiz.finished = True
        quiz.save()
    """
    print(quiz.id, "---", quiz.name, "---", quiz.question, "---", quiz.description)

    for i in quiz.tags.all():
        print("TAG -->", i.text)

    for i in QuizAnswer.objects.filter(quiz = quiz):
        print(i.text, "--", i.justification, "---", i.correct)

    """
    return response
