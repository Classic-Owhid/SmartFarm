from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import CropInfo

# ---------------------------------------------------
# FETCH ALL CROP DATA (For CropInfoHome.jsx)
# ---------------------------------------------------
@csrf_exempt
def get_all_crops(request):
    if request.method != "GET":
        return JsonResponse({"error": "GET request required"}, status=400)

    crops = CropInfo.objects.all()

    crop_list = []
    for crop in crops:
      crop_list.append({
    "id": crop.id,
    "cropname": crop.cropname,
    "season_to_plant": crop.season_to_plant,
    "image_paths": [path.replace("\\", "/") for path in crop.image_paths],
    "howtogrow": crop.howtogrow,
    "advantage": crop.advantage,
    "harvest_time": crop.harvest_time,
    "expected_market_income": crop.expected_market_income,
})

    return JsonResponse(crop_list, safe=False)
