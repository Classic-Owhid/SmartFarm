import json
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from .models import FertilizerDetails

@csrf_exempt
def add_fertilizer(request):
    if request.method != "POST":
        return JsonResponse({"error": "POST request required"}, status=400)

    try:
        data = json.loads(request.body.decode('utf-8'))

        fertilizername = data.get("fertilizerName")
        usage_time = data.get("usageTime")
        usage_guide = data.get("guide")
        advantages = data.get("advantage")

        if not all([fertilizername, usage_time, usage_guide, advantages]):
            return JsonResponse({"error": "All fields are required"}, status=400)

        fertilizer = FertilizerDetails.objects.create(
            fertilizername=fertilizername,
            when_to_use=usage_time,
            usage_guide=usage_guide,
            advantages=advantages
        )

        return JsonResponse({"message": "Fertilizer details saved successfully!"})

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


@csrf_exempt
def update_fertilizer(request, fertilizer_id):
    if request.method != "PUT":
        return JsonResponse({"error": "PUT request required"}, status=400)

    try:
        data = json.loads(request.body)  # parse JSON from frontend

        fert = FertilizerDetails.objects.get(id=fertilizer_id)

        fert_name = data.get("fertilizerName")
        usage_time = data.get("usageTime")
        usage_guide = data.get("guide")
        advantages = data.get("advantage")

        if not all([fert_name, usage_time, usage_guide, advantages]):
            return JsonResponse({"error": "All fields are required"}, status=400)

        fert.fertilizername = fert_name
        fert.when_to_use = usage_time
        fert.usage_guide = usage_guide
        fert.advantages = advantages
        fert.save()

        return JsonResponse({"message": "Fertilizer updated successfully!"})

    except FertilizerDetails.DoesNotExist:
        return JsonResponse({"error": "Fertilizer not found"}, status=404)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
