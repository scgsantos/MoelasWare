from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view

from api.serializers import GetTag
from moelasware.models import Tag


@api_view(["GET"])
def get_tag_view(request, pk):

    if pk is not None:
        instance = get_object_or_404(Tag, pk=pk)
        serializer = GetTag(instance, many=False)

        return JsonResponse({"tag": serializer.data})

    return JsonResponse(
        {"invalid": "not good data"}, status=status.HTTP_400_BAD_REQUEST
    )
