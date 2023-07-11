from django.db import models

# Create your models here.

class BMI(models.Model):
    name = models.CharField(max_length=100, unique=True)
    age = models.PositiveIntegerField(unique=True)
    height = models.FloatField(unique=True)
    weight = models.FloatField(unique=True)
    mobilenumber = models.PositiveIntegerField(unique=True)

    def __str__(self):
        return self.name



