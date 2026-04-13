from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from .models import DiseaseInfo

@csrf_exempt
def recent_diseases(request):
    """
    Return all diseases ordered by newest first
    Frontend will pick the first one as the latest
    """
    try:
        diseases = DiseaseInfo.objects.all().order_by('-created_at')

        data = []
        for disease in diseases:
            data.append({
                "id": disease.id,
                "name": disease.name,
                "cure": disease.cure,
                "symptoms": disease.symptoms,
                "image_path": disease.image_path,
                "created_at": disease.created_at.strftime("%Y-%m-%d %H:%M:%S")
            })

        return JsonResponse(data, safe=False)

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
