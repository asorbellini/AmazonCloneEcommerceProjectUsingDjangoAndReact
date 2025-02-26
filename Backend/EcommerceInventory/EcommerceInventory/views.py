from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from ProductServices.models import Categories
from ProductServices.controller.CategoryController import CategorySerializer 
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from rest_framework import status


class FileUploadView(APIView):
    parser_classes = (MultiPartParser,FormParser)
    def post(self, request, *args, **kwargs):
        if 'images' not in request.FILES:
            return Response({"error": "No files received"}, status=status.HTTP_400_BAD_REQUEST)
        images = request.FILES.getlist('images') 
       
        image_urls = []
        for image in images:
            image_name = default_storage.save(f"uploads/{image.name}", ContentFile(image.read()))
            image_url = default_storage.url(image_name)
            image_urls.append(image_url)

        return Response({"image_urls": image_urls, 'message':'File uploaded successfully'}, status=201)