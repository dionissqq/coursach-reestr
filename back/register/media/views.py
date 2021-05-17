from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .serializer import MediaPublicSerializer, MediaSerializer
from .models import Media
from rest_framework.views import APIView
from rest_framework.parsers import JSONParser
# from rest_framework.permissions import IsAuthenticated
# Create your views here.


class ListMedia(APIView):
    # permission_classes = (IsAuthenticated,)

    def get(self, request):
        medias = Media.objects.all()
        serializer = MediaPublicSerializer(medias, many = True)
        return JsonResponse(
            {'entities' : serializer.data}, 
            safe=False
        )

    def post(self, request):
        data = request.data
        print(JSONParser().parse(data))

class MediaView(APIView):

    def get(self, request, pk):
        media = Media.objects.get(id = pk)
        serializer = MediaSerializer(media) if request.user.is_authenticated else \
            MediaPublicSerializer(media)

        return JsonResponse(
            serializer.data, 
            safe=False
        )
