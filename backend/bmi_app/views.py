from rest_framework import viewsets
from .models import BMI
from .serializers import BMISerializer

class BMIViewSet(viewsets.ModelViewSet):
    queryset = BMI.objects.all()
    serializer_class = BMISerializer

