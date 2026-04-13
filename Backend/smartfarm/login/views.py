from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from adminpannel.models import Customer

import json

admin_email = "md12owhid@gmail.com"  # put your admin email
admin_password = "1234567"      # put your admin password

@csrf_exempt
def user_login(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body.decode("utf-8"))
            email = data.get("email")
            password = data.get("password")

            # ✅ Check admin credentials
            if email == admin_email and password == admin_password:
                return JsonResponse({
                    "status": "success",
                    "message": "Admin Login Successful",
                    "admin": True
                })

            # ✅ Check customer credentials in DB
            try:
                user = Customer.objects.get(email=email, password=password)
                return JsonResponse({
                    "status": "success",
                    "message": "Customer login successful",
                    "admin": False
                })
            except Customer.DoesNotExist:
                return JsonResponse({
                    "status": "error",
                    "message": "Invalid Email or Password"
                })

        except Exception as e:
            # This catches any other exception
            return JsonResponse({
                "status": "error",
                "message": str(e)
            })

    else:
        return JsonResponse({
            "status": "error",
            "message": "Invalid request method"
        })
