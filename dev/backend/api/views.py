from django.shortcuts import get_object_or_404

from django.http import JsonResponse
from rest_framework.decorators import api_view

from moelasware.models import Test, User, Quiz
from .serializers import GetTestSerializer, CreateTestSerializer, GetUserSerializer


@api_view(['GET']) # allowed method(s)
def get_test_view( request, pk, *args, **kwargs ):

	# get test by id -> detail view
	instance = get_object_or_404(Test, pk=pk)
	serializer = GetTestSerializer(obj, many=False)

	return JsonResponse({'test': serializer.data})



@api_view(['POST'])
def create_test_view( request ):
	serializer = CreateTestSerializer(data=request.data)

	if serializer.is_valid(raise_exception=True): # raises exception on why its not valid
		#instance = serializer.save()
		
		#print(instance)
		return Response(serializer.data)

	return Response({'invalid': 'not good data'}, status=400)


@api_view(['POST'])
def create_quizz(self):
    users = User.objects.all()
    array = self.request.query_params.get('question','description','id_autor')
    id = Quiz.objects.all()
    id = id.objects.grt(id=max(id))
    if(User.objects.filter(id=array[2]).exists()):
    	Quiz.objects.create(id=id+1,question=array[0],description=array[1],id_autor=array[2])
