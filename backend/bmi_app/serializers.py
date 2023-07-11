from rest_framework import serializers
from .models import BMI

class BMISerializer(serializers.ModelSerializer):
    class Meta:
        model = BMI
        fields = '__all__'
