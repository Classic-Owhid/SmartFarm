import os
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.conf import settings

# -------------------------------
# Load new CSV
# -------------------------------
BASE_DIR = settings.BASE_DIR
CSV_PATH = os.path.join(BASE_DIR, "chatbot", "smartchat.csv")

df = pd.read_csv(CSV_PATH)

# Ensure required columns exist
required_cols = ["question", "answer"]
for col in required_cols:
    if col not in df.columns:
        raise ValueError(f"CSV missing required column: {col}")

# Train TF-IDF on questions
vectorizer = TfidfVectorizer()
tfidf_matrix = vectorizer.fit_transform(df["question"].astype(str))


# -------------------------------
# Chatbot API
# -------------------------------
@api_view(["POST"])
def ask_chatbot(request):
    user_message = request.data.get("message", "")  # React must send { message: "..." }

    if not user_message:
        return Response({"reply": "Please type something."})

    # Vectorize user's message
    user_vec = vectorizer.transform([user_message])

    # Compare with CSV questions
    similarity = cosine_similarity(user_vec, tfidf_matrix)
    best_idx = similarity.argmax()
    best_score = similarity[0][best_idx]

    # Low similarity → fallback
    if best_score < 0.1:
        return Response({"reply": "Sorry, I don't have information about that."})

    # Return best matched answer
    answer = df.iloc[best_idx]["answer"]

    return Response({"reply": answer})
