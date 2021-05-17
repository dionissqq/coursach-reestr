from rest_framework import serializers
from .models import Founder

class FounderSerializer(serializers.Serializer):
    class Meta:
        model = Founder
        fields = '__all__'