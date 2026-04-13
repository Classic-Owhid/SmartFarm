from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from .models import FertilizerDetails

@csrf_exempt
def get_all_fertilizers(request):
    if request.method != "GET":
        return JsonResponse({"error": "GET request required"}, status=400)
    try:
        fertilizers = FertilizerDetails.objects.all()
        fert_list = [
            {
                "id": fert.id,
                "fertilizername": fert.fertilizername,
                "when_to_use": fert.when_to_use,
                "usage_guide": fert.usage_guide,
                "advantages": fert.advantages
            } for fert in fertilizers
        ]
        return JsonResponse(fert_list, safe=False)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

@csrf_exempt
def update_fertilizer(request, fertilizer_id):
    if request.method != "PUT":
        return JsonResponse({"error": "PUT request required"}, status=400)

    try:
        fert = FertilizerDetails.objects.get(id=fertilizer_id)

        fert_name = request.POST.get("fertilizerName")
        usage_time = request.POST.get("usageTime")
        usage_guide = request.POST.get("guide")
        advantages = request.POST.get("advantage")

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
