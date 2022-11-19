from django.http import HttpResponseBadRequest, JsonResponse
from django.db import IntegrityError, Error
from rest_framework.decorators import api_view
from rest_framework import status

from moelasware.models import User, AuthUser
@api_view(["POST"])
def register_view(request):
    username = request.data.get("username")
    password = request.data.get("password")

    
    user_already_exists = AuthUser.objects.filter(username=username).count() != 0

    print(user_already_exists)
  
    if user_already_exists:
        return JsonResponse(
            {"invalid": "user already exists"}, status=status.HTTP_400_BAD_REQUEST
        )


    auth_user = AuthUser.objects.create_user(username=username, password=password)
    auth_user.save()

    user = User.objects.create(user=auth_user)
    user.save()

    return JsonResponse({"id": user.id})





