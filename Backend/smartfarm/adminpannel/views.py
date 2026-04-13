from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Customer
import json

@csrf_exempt
def customer_regestration(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode("utf-8"))
            username = data.get("username")
            address = data.get("address")
            email = data.get("email")
            password = data.get("password")

            if not (username and address and email and password):
                return JsonResponse({"status": "error", "message": "All fields are required"})

            customer = Customer(
                username=username,
                address=address,
                email=email,
                password=password
            )

            customer.save(using='default')
            return JsonResponse({"status": "success", "message": "Customer Registration Successful!"})

        except Exception as e:
            return JsonResponse({"status": "error", "message": str(e)})

    else:
        return JsonResponse({"status": "error", "message": "Invalid request method"})
