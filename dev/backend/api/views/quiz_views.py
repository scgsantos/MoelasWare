from api.serializers import QuizAnswerSerializer, QuizSerializer
from django.http import HttpResponseBadRequest, JsonResponse
from moelasware.models import Quiz, QuizAnswer, User, Test
import random
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404



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

        return JsonResponse({"test": serializer.data, "quizzes": quizzes_serializer.data})

    return JsonResponse({"invalid": "not good data"}, status=400)


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

@api_view(['POST'])
def create_quiz(request):    
    user = request.data.get("author")
    text = request.data.get("text")
    question = request.data.get("question")
    answers = request.data.get("answers")
    name = request.data.get("name")
    correct = request.data.get("correct")


    if type(user) is not str or type(name) is not str or type(text) is not str or type(question) is not str or type(correct) is not int:
        return HttpResponseBadRequest('Wrong type of data')

    if len(answers) != 6:
        return HttpResponseBadRequest('Not enough answers')

    for i in answers:
        if len(i) != 2:
            return HttpResponseBadRequest('Not enough fields completed')

    user = User.objects.filter(user=user)
    if not user.exists():
        return HttpResponseBadRequest('User not found')

    user = User.objects.get(user=user)
    '''
    tag = Tag.objects.filter(text=text)
    if not tag.exists():
        #Create a tag
        deserializer_data = {"text": text}
        tag_deserializer = CreateTagSerializer(data=deserializer_data)
        if tag_deserializer.is_valid(raise_exception=True):
            tag = tag_deserializer.save()
            response_serializer = GetTagSerializer(tag)
            JsonResponse({"tag": response_serializer.data})
    tag = Tag.objects.get(text=text)
    tag = tag.id
'''    
    tags_list = []
    for i in request.data.get("tags"):
        tags_list.append(i)

    if User.objects.all().count() < 3:
        return HttpResponseBadRequest("Not enough users to review")

    review_list = []
    number_of_reviewers = 0
    while number_of_reviewers != 3:
        r = User.objects.get(user__id= random.randint(1, User.objects.count()))
        if r not in review_list:
            number_of_reviewers += 1

    '''
    deserializer_data = {"author": user, "tags": [tag], "question": question, "description": description, "reviewer1": reviewer, "reviewer2": reviewer2, "reviewer3": reviewer3}
    quiz_deserializer = CreateQuizSerializer(data=deserializer_data)

    if quiz_deserializer.is_valid(raise_exception=True):
        quiz = quiz_deserializer.save()
        response_serializer = GetQuizSerializer(quiz) 
        JsonResponse({"quiz": response_serializer.data})
    '''
    quiz = Quiz(author=user,
                name=name,
                question=question, 
                description="", 
                reviewer1=review_list[0], 
                reviewer2=review_list[0], 
                reviewer3=review_list[0] 
                )
    quiz.save()
    for i in tags_list:
        quiz.tags.add(i)

    '''
    #Associate the quiz with the tag
    quiz_id = response_serializer.data.get("id")
    deserializer_data = {"quiz_id": quiz_id, "tag_id": tag}
    quiz_tag_deserializer = CreateQuizTagSerializer(data=deserializer_data)
    if quiz_tag_deserializer.is_valid(raise_exception=True):
        quiz_tag = quiz_tag_deserializer.save()
        response_serializer = GetQuizTagSerializer(quiz_tag)
        JsonResponse({"quiz_tag": response_serializer.data})
'''
    #Create 6 quiz answers
    for i in range(6):
        if correct == i:
            QuizAnswer(
                quiz=quiz,
                text = answers[0],
                justification = answers[1],
            ) 
        else:
            QuizAnswer(
                quiz=quiz,
                text = answers[0],
                correct=True,
                justification = answers[1],
            )  

    '''
    deserializer_data = {"quiz": quiz_id, "text": text, "correct": correct, "justification": justification}
    answer_deserializer = CreateQuizAnswerSerializer(data=deserializer_data)
    if answer_deserializer.is_valid(raise_exception=True):
        answer = answer_deserializer.save() 
        response_serializer = GetQuizAnswerSerializer(answer) 
        JsonResponse({"answer": response_serializer.data})
        '''
        
    return JsonResponse({'Quiz was submited for review':''}, status=200)
