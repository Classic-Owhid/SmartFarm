from rest_framework.decorators import api_view
from rest_framework.response import Response
import joblib
import numpy as np
import os
from django.conf import settings

MODEL_PATH =os.path.join(settings.BASE_DIR,'ML','crop_model.pkl')
model = joblib.load(MODEL_PATH)


#accepts the post request
@api_view(['POST'])

def predict_crop(request):
    try:
        #reds the data sent fron frontend
        data=request.data
        features = np.array([[
            float(data['n']),
            float(data['p']),
            float(data['k']),
            float(data['temp']),
            float(data['humidity']),
            float(data['ph']),
            float(data['rainfall']),
        ]])
        #model predicts
        prediction = model.predict(features)

        return Response({"recommendation":str(prediction[0])})
    except Exception as e:
        return Response({"error":str(e)})