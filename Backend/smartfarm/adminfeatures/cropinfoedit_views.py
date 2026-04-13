from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from .models import CropInfo
from .serializers import CropInfoSerializer


# ------------------------------------------------
# GET: fetch ALL crops
# ------------------------------------------------
@api_view(["GET"])
def get_all_crops(request):
    crops = CropInfo.objects.all()
    serializer = CropInfoSerializer(crops, many=True)
    return Response(serializer.data)


# ------------------------------------------------
# GET: fetch ONE crop by ID (for editing)
# ------------------------------------------------
@api_view(["GET"])
def get_single_crop(request, crop_id):
    try:
        crop = CropInfo.objects.get(id=crop_id)
    except CropInfo.DoesNotExist:
        return Response({"error": "Crop not found"}, status=404)

    serializer = CropInfoSerializer(crop)
    return Response(serializer.data)


# ------------------------------------------------
# PUT: update crop information
# ------------------------------------------------
@api_view(["POST"])
@parser_classes([MultiPartParser, FormParser])
def update_crop(request, crop_id):
    try:
        crop = CropInfo.objects.get(id=crop_id)
    except CropInfo.DoesNotExist:
        return Response({"error": "Crop not found"}, status=status.HTTP_404_NOT_FOUND)

    serializer = CropInfoSerializer(crop, data=request.data, partial=True)

    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Crop updated successfully", "data": serializer.data}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


