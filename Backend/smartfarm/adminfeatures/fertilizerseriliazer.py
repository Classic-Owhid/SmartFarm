from rest_framework import serializers
from .models import FertilizerDetails

class FertilizerDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = FertilizerDetails
        fields = "__all__"
