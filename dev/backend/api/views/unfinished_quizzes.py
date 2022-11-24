from django.http import JsonResponse
from rest_framework.decorators import api_view

from moelasware.models import Quiz

from ..serializers.unfinished_quizzes import CreateEditQuizSerializer


@api_view(["GET"])
def get_unfinished_quizzes(request):

    user_id = 1
    info = Quiz.objects.filter(author=user_id, approved=False).filter(finished = False).order_by("-creation_date")
    quizzes = []
    for i in range(len(info)):
        quizzes.append([info[i].name, info[i].id, info[i].creation_date])
    return JsonResponse({"quizzes": quizzes}, status=200)


@api_view(["POST"])
def get_draft_info(request):
    id = request.data.get("id")
    quiz = Quiz.objects.get(id=id)
    author = request.user
    tags = getattr(quiz, "tags", None)
    text = getattr(quiz, "text", None)
    description = getattr(quiz, "description", None)
    question = getattr(quiz, "question", None)
    answer = getattr(quiz, "answer", None)
    name = getattr(quiz, "name", None)
    approved = getattr(quiz, "approved", None)
    finished = getattr(quiz, "finished", None)
    tags = getattr(quiz, "tags", None)
    reviews = getattr(quiz, "reviews", None)
    creation_date = getattr(quiz, "creation_date", None)

    serializer = CreateEditQuizSerializer(
        data={
            "id": id,
            "author_id": author,
            "text": text,
            "description": description,
            "question": question,
            "answer": answer,
            "name": name,
            "approved": approved,
            "finished": finished,
            "tags": tags,
            "reviews": reviews,
            "creation_date": creation_date,
        }
    )
    valid = serializer.is_valid()
    if valid:
        return JsonResponse(serializer.validated_data)
