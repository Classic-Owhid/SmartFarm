from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
import os
import tensorflow as tf
import numpy as np
from tensorflow.keras.preprocessing import image


MODEL_PATH = os.path.join(settings.BASE_DIR, 'ML', 'apple_fruitdisease.h5')


model = tf.keras.models.load_model(MODEL_PATH)


CLASS_NAMES = ['BlotchApple', 'NormalApple', 'RotApple', 'ScabApple']


SOLUTIONS = {
    'BlotchApple': 'Remove affected leaves and spray appropriate fungicide.',
    'NormalApple': 'No action needed, fruit is healthy.',
    'RotApple': 'Remove rotting fruits, improve drainage, avoid water logging.',
    'ScabApple': 'Use resistant varieties and apply fungicide as per schedule.'
}

@api_view(['POST'])
def predict_apple_disease(request):
    if 'image' not in request.FILES:
        return Response({'error': 'No image uploaded'}, status=status.HTTP_400_BAD_REQUEST)

    uploaded_file = request.FILES['image']
    
    
    os.makedirs(settings.MEDIA_ROOT, exist_ok=True)
    
    file_path = os.path.join(settings.MEDIA_ROOT, uploaded_file.name)

    
    with open(file_path, 'wb+') as f:
        for chunk in uploaded_file.chunks():
            f.write(chunk)

    try:
       
        img = image.load_img(file_path, target_size=(224, 224))
        img_array = image.img_to_array(img) / 255.0
        img_array = np.expand_dims(img_array, axis=0)

      
        prediction = model.predict(img_array)
        predicted_class = CLASS_NAMES[np.argmax(prediction)]
        confidence = float(np.max(prediction))

      
        solution = SOLUTIONS.get(predicted_class, "No solution available.")

    except Exception as e:
        
        os.remove(file_path)
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

   
    os.remove(file_path)

    return Response({
        'prediction': predicted_class,
        'confidence': round(confidence * 100, 2),
        'solution': solution
    })
