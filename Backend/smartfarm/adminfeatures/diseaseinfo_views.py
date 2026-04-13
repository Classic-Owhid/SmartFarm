# diseaseinfo/views.py
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import DiseaseInfo
import os
from django.conf import settings

@csrf_exempt
def add_disease(request):
    if request.method == "POST":
        name = request.POST.get("diseaseName")
        symptoms = request.POST.get("symptoms")
        cure = request.POST.get("cure")
        image = request.FILES.get("image")

        # Save image in MEDIA folder
        image_path = None
        if image:
            image_path = os.path.join("disease_images", image.name)
            full_path = os.path.join(settings.MEDIA_ROOT, "disease_images")
            os.makedirs(full_path, exist_ok=True)
            with open(os.path.join(full_path, image.name), "wb") as f:
                for chunk in image.chunks():
                    f.write(chunk)

        # Save record in database
        disease = DiseaseInfo(
            name=name,
            image_path=image_path,
            symptoms=symptoms,
            cure=cure
        )
        disease.save()
        return JsonResponse({"message": "Disease info saved successfully!"}, status=201)
    return JsonResponse({"error": "Invalid request"}, status=400)
