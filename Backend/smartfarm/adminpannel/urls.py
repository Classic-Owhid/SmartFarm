from django.urls import path
from .import views

urlpatterns=[
    path('register/',views.customer_regestration,name='customer_regestration'),
]