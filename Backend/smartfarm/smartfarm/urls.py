
from django.contrib import admin
from django.urls import path,include
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('admin/', admin.site.urls),
   path('api/crop/',include('croprec.urls')),
  path('disease/',include('disease.urls')),
   path('api/apple/', include('applefruitdisease.urls')),
   path('api/',include('adminpannel.urls')),
   path('',include('login.urls')),
   path('adminfeatures/',include('adminfeatures.urls')),
 
  path('chatbot/', include('chatbot.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)