from django.urls import path
from . import cropinfo_views
from .import fertilizerdetails_views
from .import diseaseinfo_views
from .import cropinfoedit_views
from .import fertilizeredit_views
from .import diseaseedit_views
from .import cropinfohome_views
from .import diseaseinfohome_views
from .import fertilizerhome_views
from .recentcrop_views import recent_crops
from .recentferitlizer_views import recent_fertilizers
from .recentdisease_views import recent_diseases
from .normalcroprec_views import predict_crop


urlpatterns = [
    path('addcrop/', cropinfo_views.add_crop, name='add_crop'),
    path('crops/update/<int:crop_id>/', cropinfo_views.update_crop, name='update_crop'),

    path('addfertilizer/',fertilizerdetails_views.add_fertilizer,name='add_fertilizer'),
    path('adddisease/',diseaseinfo_views.add_disease,name='add_disease'),

    path('crops/', cropinfoedit_views.get_all_crops, name='get_all_crops'),
    path('crops/<int:crop_id>/', cropinfoedit_views.get_single_crop, name='get_single_crop'),
  



    # GET all fertilizers
    path("fertilizers/", fertilizeredit_views.get_all_fertilizers, name="get_all_fertilizers"),



    path('addfertilizer/', fertilizerdetails_views.add_fertilizer),
    path('fertilizer/update/<int:fertilizer_id>/', fertilizerdetails_views.update_fertilizer),



      path('diseases/', diseaseedit_views.get_all_diseases),
    path('disease/save/', diseaseedit_views.save_disease),



     path("cropinfohome/", cropinfohome_views.get_all_crops, name="cropinfo_all"),


     path("diseaseinfohome/",diseaseinfohome_views.get_all_diseases, name="get_all_diseases"),



      path('fertilizerhomelist/', fertilizerhome_views.get_all_fertilizers),
    path('<int:pk>/', fertilizerhome_views.get_fertilizer_by_id),


    #RecentCrop add garey ko 
      path('croprecent', recent_crops, name='recent-crops'),

      #RecentFertilizier add garey ko 

       path('recentfertilizer', recent_fertilizers, name='recent-fertilizers'),

           #RecentDisease add garey ko 

      path('recentdisease',recent_diseases,name='recent-disease'),

      path("normalrec",predict_crop,name='predict_crop')
    

]
