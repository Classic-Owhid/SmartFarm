from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import DiseaseInfo

@csrf_exempt
def get_all_diseases(request):
    if request.method != "GET":
        return JsonResponse({"error": "GET request required"}, status=400)

    diseases = DiseaseInfo.objects.all()

    disease_list = []
    for d in diseases:
        disease_list.append({
            "id": d.id,
            "name": d.name,
            "image_path": d.image_path.replace("\\", "/"),  # ensure forward slashes
            "cure": d.cure,
            "symptoms": d.symptoms,
        })
    return JsonResponse(disease_list, safe=False)
