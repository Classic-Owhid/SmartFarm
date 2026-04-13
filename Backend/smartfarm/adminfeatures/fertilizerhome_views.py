from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import FertilizerDetails
from .fertilizerseriliazer import FertilizerDetailsSerializer


# -------------------------------------------------
# GET ALL fertilizers
# -------------------------------------------------
@api_view(["GET"])
def get_all_fertilizers(request):
    fertilizers = FertilizerDetails.objects.all()
    serializer = FertilizerDetailsSerializer(fertilizers, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


# -------------------------------------------------
# GET Single fertilizer by ID
# -------------------------------------------------
@api_view(["GET"])
def get_fertilizer_by_id(request, pk):
    try:
        fertilizer = FertilizerDetails.objects.get(id=pk)
        serializer = FertilizerDetailsSerializer(fertilizer)
        return Response(serializer.data, status=status.HTTP_200_OK)

    except FertilizerDetails.DoesNotExist:
        return Response(
            {"message": "Fertilizer Not Found"},
            status=status.HTTP_404_NOT_FOUND
        )
