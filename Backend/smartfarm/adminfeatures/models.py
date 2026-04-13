from django.db import models
import json

class CropInfo(models.Model):
    id = models.AutoField(primary_key=True)
    cropname = models.CharField(max_length=200)
    season_to_plant = models.CharField(max_length=200)
    image_paths = models.JSONField() 
    howtogrow = models.TextField()
    advantage = models.TextField()
    harvest_time = models.CharField(max_length=200)
    expected_market_income = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)  # ✅ Auto set when record is created
   

    class Meta:
        db_table = 'cropinfo'
        managed = False 





class FertilizerDetails(models.Model):
    fertilizername = models.CharField(max_length=200)
    when_to_use = models.CharField(max_length=200)
    usage_guide = models.TextField()
    advantages = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'fertilizerdetails' 
        managed = False 





class DiseaseInfo(models.Model):
    name = models.CharField(max_length=255)
    image_path = models.CharField(max_length=500)  
    cure = models.TextField()
    symptoms = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'diseaseinfo'  
        managed = False  

    def __str__(self):
        return self.name

