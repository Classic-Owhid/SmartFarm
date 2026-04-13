from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from .models import FertilizerDetails

@csrf_exempt
def recent_fertilizers(request):
    """
    Return all fertilizers ordered by newest first
    Frontend will pick the first one as the latest
    """
    try:
        fertilizers = FertilizerDetails.objects.all().order_by('-created_at')

        data = []
        for fert in fertilizers:
            data.append({
                "id": fert.id,
                "fertilizername": fert.fertilizername,
                "when_to_use": fert.when_to_use,
                "usage_guide": fert.usage_guide,
                "advantages": fert.advantages,
                "created_at": fert.created_at.strftime("%Y-%m-%d %H:%M:%S")
            })

        return JsonResponse(data, safe=False)

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
