# views.py

import os
import numpy as np
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image


MODEL_PATH = os.path.join(settings.BASE_DIR, 'ML', 'apple_disease.h5')
#file path for deep learning
try:
    model = load_model(MODEL_PATH)
    CLASS_NAMES = ['Blackrot', 'Healthy', 'Rust', 'Scab']
    MODEL_LOAD_ERROR = None
except Exception as e:
    model = None
    MODEL_LOAD_ERROR = str(e)


CURE_GUIDE = {
    "Healthy": "No treatment needed 🌿",
    "Rust": "Spray Mancozeb fungicide weekly.",
    "Scab": "Apply Captan or sulfur spray.",
    "Blackrot": "Prune infected leaves and use copper spray."
}


def index(request):
    return JsonResponse({'message': '🍎 Apple Disease Detection API is running successfully!'})


@csrf_exempt
def predict_disease(request):
    try:
     
        if model is None:
            return JsonResponse({'error': f'Model not loaded: {MODEL_LOAD_ERROR}'}, status=500)

      #created folder for temp storage image keras expect it path
        if request.method == 'POST' and request.FILES.get('image'):
            img_file = request.FILES['image']

            
            os.makedirs(settings.MEDIA_ROOT, exist_ok=True)
            img_path = os.path.join(settings.MEDIA_ROOT, img_file.name)

         
            with open(img_path, 'wb+') as destination:
                for chunk in img_file.chunks():
                    destination.write(chunk)

            #processing the image 
            img = image.load_img(img_path, target_size=(150, 150), color_mode='rgb')
            img_array = image.img_to_array(img)
            img_array = np.expand_dims(img_array, axis=0) / 255.0

            #prediction
            predictions = model.predict(img_array)
            predicted_class = CLASS_NAMES[np.argmax(predictions)]

            
            cure = CURE_GUIDE.get(predicted_class, "No cure information available.")

            
            if os.path.exists(img_path):
                os.remove(img_path)

           
            return JsonResponse({
                'prediction': predicted_class,
                'cure': cure
            })

        
        return JsonResponse({'error': 'No image file provided'}, status=400)

    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
