from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from moelasware.models import Tag
from rest_framework.decorators import api_view
from django.http.response import HttpResponseNotFound

from api.serializers.tag_serializers import *


@api_view(["GET"])
def get_tag_view(request, pk, *args, **kwargs):

    if pk is not None:
        instance = get_object_or_404(Tag, pk=pk)
        serializer = GetTagSerializer(instance, many=False)

        return JsonResponse({"tag": serializer.data})

    return JsonResponse({"invalid": "not good data"}, status=status.HTTP_400_BAD_REQUEST)

def get_tag_handler(data):
    tag_list = []
    for i in data:
        tag_list.append(i["text"])
    return tag_list

@api_view(['GET'])
def get_all_tags_view(request):

    tags = Tag.objects.all()
    if not tags.exists:
        return HttpResponseNotFound('Tags not found')

    tags = GetTagSerializer(tags, many = True).data
    tags = get_tag_handler(tags)

    return JsonResponse({"tags": tags})
