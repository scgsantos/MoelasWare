from django.shortcuts import get_object_or_404
from django.shortcuts import render
from django.http.response import HttpResponseNotFound
from django.http import JsonResponse
from rest_framework.decorators import api_view
from moelasware.models import *
from api.serializers.hall_of_fame_get_test_info import *

def handle_serializer_all_tests(obj):
    obj_list = []
    id = 0

    for i in obj:
        test_id = i["id"]
        author = i["author"]["user"]["username"]
        solved_tests = i["solved_tests"]
        tags = ""
        for j in i["quizzes"]:
            for tag in j["tags"]:
                if tag["text"] not in tags:
                    tags += tag["text"]
                    tags += ","
        
        tags = tags[0:len(tags)-1]
        id += 1
        obj_list.append({test_id : [test_id, solved_tests, tags, author]})

    return obj_list 

@api_view(['GET'])
def get_all_tests_view(request):
    
    tests = Test.objects.all().order_by('id') 
    if not tests.exists():
        return HttpResponseNotFound('User not found')

    sub = HallOfFameGetTestInfo(tests, many=True).data
    sub = handle_serializer_all_tests(sub)

    return JsonResponse({'submissions_by_test': sub})