from django.urls import path
from . import views

urlpatterns =[
    path('',views.index,name='disease_home'),
    path('predict/',views.predict_disease,name='predict_disease'),
]