from rest_framework import serializers
from .models import CropInfo

class CropInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CropInfo
        fields = "__all__"
