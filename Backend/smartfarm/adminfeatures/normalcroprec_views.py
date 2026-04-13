import os
import pickle
import json
import pandas as pd
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

ML_DIR = os.path.join(settings.BASE_DIR, "ML")

# Load ML model and encoders once when server starts
model = pickle.load(open(os.path.join(ML_DIR, "normalcroprec.pkl"), "rb"))
le_region = pickle.load(open(os.path.join(ML_DIR, "enc_region.pkl"), "rb"))
le_season = pickle.load(open(os.path.join(ML_DIR, "enc_season.pkl"), "rb"))
le_soil = pickle.load(open(os.path.join(ML_DIR, "enc_soil.pkl"), "rb"))
le_crop = pickle.load(open(os.path.join(ML_DIR, "enc_crop.pkl"), "rb"))


@csrf_exempt
def predict_crop(request):

    if request.method != "POST":
        return JsonResponse({"error": "POST method required"}, status=400)

    # Read JSON body
    try:
        data = json.loads(request.body.decode("utf-8"))
    except:
        return JsonResponse({"error": "Invalid JSON body"}, status=400)

    print("Incoming data:", data)  # helpful for debugging

    # Required fields
    required_fields = ["Region", "Season", "Soil_Type", "Temperature"]

    for field in required_fields:
        if field not in data or data[field] == "":
            return JsonResponse({"error": f"{field} is required"}, status=400)

    # Clean input values
    region_val = data["Region"].strip()
    season_val = data["Season"].strip()
    soil_val = data["Soil_Type"].strip()

    try:
        temperature = float(data["Temperature"])
    except:
        return JsonResponse({"error": "Temperature must be numeric"}, status=400)

    # Validate encoder values
    if region_val not in le_region.classes_:
        return JsonResponse({"error": "Invalid region"}, status=400)

    if season_val not in le_season.classes_:
        return JsonResponse({"error": "Invalid season"}, status=400)

    if soil_val not in le_soil.classes_:
        return JsonResponse({"error": "Invalid soil type"}, status=400)

    # Encode values
    r = le_region.transform([region_val])[0]
    s = le_season.transform([season_val])[0]
    so = le_soil.transform([soil_val])[0]

    # Create dataframe for model
    x_input = pd.DataFrame(
        [[r, s, temperature, so]],
        columns=["Region", "Season", "Temperature", "Soil_Type"]
    )

    # Prediction
    prediction = model.predict(x_input)
    predicted_index = int(prediction[0])
    recommended_crop = le_crop.inverse_transform([predicted_index])[0]

    return JsonResponse({
        "recommended_crop": recommended_crop
    })