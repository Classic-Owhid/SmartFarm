from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from .models import DiseaseInfo
import os
from django.conf import settings
MEDIA_PATH = "media/"  # folder where images will be saved



@csrf_exempt
def get_all_diseases(request):
    if request.method != "GET":
        return JsonResponse({"error": "GET request required"}, status=400)
    try:
        diseases = DiseaseInfo.objects.all()
        disease_list = [
            {
                "id": d.id,
                "name": d.name,
                "image_path": request.build_absolute_uri(settings.MEDIA_URL + d.image_path),
                "cure": d.cure,
                "symptoms": d.symptoms
            }
            for d in diseases
        ]
        return JsonResponse(disease_list, safe=False)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


















@csrf_exempt
def save_disease(request):
    """
    Handles both adding new disease and updating existing disease.
    Frontend sends POST request with FormData.
    """
    if request.method != "POST":
        return JsonResponse({"error": "POST request required"}, status=400)

    try:
        disease_id = request.POST.get("disease_id")  # sent only when editing
        name = request.POST.get("diseaseName")
        symptoms = request.POST.get("symptoms")
        cure = request.POST.get("cure")
        image = request.FILES.get("image")  # optional for update

        if not all([name, symptoms, cure]):
            return JsonResponse({"error": "All fields except image are required"}, status=400)

        if disease_id:  # Editing existing disease
            disease = DiseaseInfo.objects.get(id=disease_id)
            disease.name = name
            disease.symptoms = symptoms
            disease.cure = cure

            if image:  # if new image uploaded
                disease.image_path = image.name
                with open(os.path.join(MEDIA_PATH, image.name), "wb+") as f:
                    for chunk in image.chunks():
                        f.write(chunk)

            disease.save()
            return JsonResponse({"message": "Disease updated successfully!"})

        else:  # Adding new disease
            if not image:
                return JsonResponse({"error": "Image is required for new disease"}, status=400)

            with open(os.path.join(MEDIA_PATH, image.name), "wb+") as f:
                for chunk in image.chunks():
                    f.write(chunk)

            disease = DiseaseInfo(
                name=name,
                symptoms=symptoms,
                cure=cure,
                image_path=image.name
            )
            disease.save()
            return JsonResponse({"message": "Disease added successfully!"})

    except DiseaseInfo.DoesNotExist:
        return JsonResponse({"error": "Disease not found"}, status=404)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
