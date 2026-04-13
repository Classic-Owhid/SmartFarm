from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from .models import CropInfo

@csrf_exempt
def recent_crops(request):
    """
    Return all crops sorted by created_at descending
    Frontend will pick the first item as the most recent
    """
    try:
        crops = CropInfo.objects.all().order_by('-created_at')

        data = []
        for crop in crops:
            data.append({
                "id": crop.id,
                "cropname": crop.cropname,
                "season_to_plant": crop.season_to_plant,
                "howtogrow": crop.howtogrow,
                "advantage": crop.advantage,
                "harvest_time": crop.harvest_time,
                "expected_market_income": crop.expected_market_income,
                "image_paths": crop.image_paths,  # JSON array
                "created_at": crop.created_at.strftime("%Y-%m-%d %H:%M:%S")
            })

        return JsonResponse(data, safe=False)

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
