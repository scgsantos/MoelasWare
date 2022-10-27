from django.shortcuts import get_object_or_404

from django.http import JsonResponse
from rest_framework.decorators import api_view

from moelasware.models import Quiz
from .serializers import CreateQuizSerializer, GetQuizSerializer


@api_view(['GET'])
def get_quiz_view(request,pk, *args, **kwargs):
	instance = get_object_or_404(Quiz, pk=pk)
	serializer = GetQuizSerializer(obj, many=False)
	
	return JsonResponse({'quiz' : serializer.data})
	
	
@api_view(['POST'])
def create_quiz_view(request):
	serializer = CreateQuizSerializer(data = request.data)
	
	if serializer.is_valid(raise_exception=True):
		return Response(serializer.data)
		
	return Response({'invalid': 'not good data'}, status=400)
