from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.conf import settings
from .models import CropInfo
import os
import json

@csrf_exempt
def add_crop(request):
    if request.method != "POST":
        return JsonResponse({"error": "POST request required"}, status=400)

    try:
        cropname = request.POST.get('cropname')
        season = request.POST.get('season_to_plant')  # must match your model field
        howtogrow = request.POST.get('howtogrow')
        advantage = request.POST.get('advantage')
        harvest_time = request.POST.get('harvest_time')
        market_income = request.POST.get('expected_market_income')

        images = request.FILES.getlist('images')

        if len(images) < 3:
            return JsonResponse({"error": "Upload at least 3 images"}, status=400)

        saved_paths = []

        for img in images:
            save_path = os.path.join("crop_images", img.name)
            full_path = os.path.join(settings.MEDIA_ROOT, save_path)
            os.makedirs(os.path.dirname(full_path), exist_ok=True)
            with open(full_path, "wb+") as f:
                for chunk in img.chunks():
                    f.write(chunk)
            saved_paths.append(save_path)

        crop = CropInfo(
            cropname=cropname,
            season_to_plant=season,
            image_paths=saved_paths,
            howtogrow=howtogrow,
            advantage=advantage,
            harvest_time=harvest_time,
            expected_market_income=market_income
        )
        crop.save()

        return JsonResponse({"message": "Crop info saved successfully!"})

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


# -------------------------------
# UPDATE EXISTING CROP
# -------------------------------
@csrf_exempt
def update_crop(request, crop_id):
    if request.method != "POST":
        return JsonResponse({"error": "PUT request required"}, status=400)

    try:
        crop = CropInfo.objects.get(id=crop_id)
    except CropInfo.DoesNotExist:
        return JsonResponse({"error": "Crop not found"}, status=404)

    try:
        # Parse data (support multipart/form-data)
        cropname = request.POST.get('cropname', crop.cropname)
        season = request.POST.get('season_to_plant', crop.season_to_plant)
        howtogrow = request.POST.get('howtogrow', crop.howtogrow)
        advantage = request.POST.get('advantage', crop.advantage)
        harvest_time = request.POST.get('harvest_time', crop.harvest_time)
        market_income = request.POST.get('expected_market_income', crop.expected_market_income)

        # Handle new images if uploaded
        images = request.FILES.getlist('images')
        if images:
            saved_paths = []
            for img in images:
                save_path = os.path.join("crop_images", img.name)
                full_path = os.path.join(settings.MEDIA_ROOT, save_path)
                os.makedirs(os.path.dirname(full_path), exist_ok=True)
                with open(full_path, "wb+") as f:
                    for chunk in img.chunks():
                        f.write(chunk)
                saved_paths.append(save_path)
            crop.image_paths = saved_paths  # replace old images

        # Update fields
        crop.cropname = cropname
        crop.season_to_plant = season
        crop.howtogrow = howtogrow
        crop.advantage = advantage
        crop.harvest_time = harvest_time
        crop.expected_market_income = market_income

        crop.save()

        return JsonResponse({"message": "Crop updated successfully!"})

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
