# # support_chat.py
# import os
# import requests

# # ✅ Replace with your HF token
# HF_API_KEY = ""

# API_URL = "https://api-inference.huggingface.co/models/meta-llama/Llama-2-7b-chat-hf"
# headers = {"Authorization": f"Bearer {HF_API_KEY}"}

# def emotional_support_chat(user_message: str) -> str:
#     payload = {
#         "inputs": f"You are an empathetic wellness assistant.\nUser: {user_message}\nAssistant:"
#     }
#     response = requests.post(API_URL, headers=headers, json=payload)

#     try:
#         output = response.json()[0]["generated_text"]
#         return output.split("Assistant:")[-1].strip()
#     except Exception as e:
#         return f"❌ Chatbot error: {e}"


#2 retry version
# support_chat.py
# import os
# import time
# import requests

# # ✅ Replace with your Hugging Face token
# HF_API_KEY = ""

# # You can switch model here: LLaMA-2 or Mistral (faster)
# API_URL = "https://api-inference.huggingface.co/models/meta-llama/Llama-2-7b-chat-hf"
# # API_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2"

# headers = {"Authorization": f"Bearer {HF_API_KEY}"}


# def emotional_support_chat(user_message: str, retries: int = 5) -> str:
#     """
#     Sends a message to the Hugging Face model and retries if it's still loading.
#     """
#     payload = {
#         "inputs": f"You are a kind, empathetic wellness assistant.\nUser: {user_message}\nAssistant:"
#     }

#     for attempt in range(retries):
#         response = requests.post(API_URL, headers=headers, json=payload)

#         # If model is still loading
#         if response.status_code == 503 or "loading" in response.text.lower():
#             print(f"⏳ Model is loading... retrying in 10s (Attempt {attempt+1}/{retries})")
#             time.sleep(10)
#             continue

#         try:
#             data = response.json()
#             # Debug print
#             print("🔍 Raw HF Response:", data)

#             if isinstance(data, list) and "generated_text" in data[0]:
#                 output = data[0]["generated_text"]
#                 return output.split("Assistant:")[-1].strip()
#             else:
#                 return f"⚠️ Unexpected response format: {data}"
#         except Exception as e:
#             return f"❌ Chatbot error: {e}, Raw text: {response.text}"

#     return "❌ The model did not respond after multiple retries. Please try again later."


#3
# support_chat.py
# import requests

# # Hugging Face Inference API for Mistral
# API_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1"

# # 🔑 Replace with your Hugging Face token
# HF_API_KEY = ""

# headers = {"Authorization": f"Bearer {HF_API_KEY}"}

# def emotional_support_chat(user_message: str) -> str:
#     """
#     Sends a message to the Mistral-7B-Instruct model on Hugging Face
#     and returns the AI's empathetic response.
#     """
#     payload = {
#         "inputs": f"You are a kind, empathetic wellness assistant.\nUser: {user_message}\nAI:",
#         "parameters": {"max_new_tokens": 150, "temperature": 0.7, "return_full_text": False}
#     }

#     try:
#         response = requests.post(API_URL, headers=headers, json=payload, timeout=60)
#         response.raise_for_status()
        
#         result = response.json()
        
#         if isinstance(result, list) and "generated_text" in result[0]:
#             return result[0]["generated_text"].strip()
#         else:
#             return f"⚠️ Unexpected response format: {result}"
    
#     except requests.exceptions.RequestException as e:
#         return f"❌ Chatbot error: {e}"


#4
# import requests

# # Primary model (Mistral) and fallback (Zephyr)
# PRIMARY_MODEL = "mistralai/Mistral-7B-Instruct-v0.2"
# FALLBACK_MODEL = "HuggingFaceH4/zephyr-7b-beta"

# HF_API_KEY = ""  # 🔑 Replace with your token
# headers = {"Authorization": f"Bearer {HF_API_KEY}"}

# def query_hf(model_name: str, user_message: str):
#     """Helper to send request to a Hugging Face model"""
#     api_url = f"https://api-inference.huggingface.co/models/{model_name}"
#     payload = {
#         "inputs": f"You are a kind, empathetic wellness assistant.\nUser: {user_message}\nAI:",
#         "parameters": {"max_new_tokens": 150, "temperature": 0.7, "return_full_text": False}
#     }
#     response = requests.post(api_url, headers=headers, json=payload, timeout=60)

#     if response.status_code == 200:
#         try:
#             result = response.json()
#             if isinstance(result, list) and "generated_text" in result[0]:
#                 return result[0]["generated_text"].strip()
#             else:
#                 return f"⚠️ Unexpected response: {result}"
#         except Exception:
#             return f"⚠️ Could not parse response: {response.text}"
#     else:
#         return None  # signal failure


# def emotional_support_chat(user_message: str) -> str:
#     """Try Mistral first, fallback to Zephyr if needed"""
#     # Try primary model
#     reply = query_hf(PRIMARY_MODEL, user_message)
#     if reply:
#         return reply

#     # Fallback
#     reply = query_hf(FALLBACK_MODEL, user_message)
#     if reply:
#         return f"(Fallback to Zephyr) {reply}"

#     return "❌ Chatbot error: All models failed. Please try again later."


#5(working)
# import google.generativeai as genai

# # 🔑 Replace with your Gemini API Key
# GEMINI_API_KEY = ""
# genai.configure(api_key=GEMINI_API_KEY)

# def emotional_support_chat(user_message: str) -> str:
#     try:
#         model = genai.GenerativeModel("gemini-2.0-flash")
#         response = model.generate_content(user_message)
#         return response.text.strip()
#     except Exception as e:
        # return f"❌ Chatbot error: {e}"


#6
import google.generativeai as genai
import psycopg2
from psycopg2.extras import RealDictCursor
from datetime import datetime

# 🔑 Replace with your Gemini API Key
GEMINI_API_KEY = ""
genai.configure(api_key=GEMINI_API_KEY)

# PostgreSQL connection details
DB_CONFIG = {
    "dbname": "wellness_ai",
    "user": "postgres",
    "password": "28092005",  # change this
    "host": "localhost",
    "port": "5432"
}

def get_db_connection():
    return psycopg2.connect(**DB_CONFIG)

def log_chat(user_message, ai_response, model_used="gemini-pro"):
    """Save chat history into PostgreSQL"""
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute(
            """
            INSERT INTO chat_logs (user_message, ai_response, model_used, created_at)
            VALUES (%s, %s, %s, %s)
            """,
            (user_message, ai_response, model_used, datetime.now())
        )
        conn.commit()
        cur.close()
        conn.close()
    except Exception as e:
        print("❌ Database error while logging chat:", e)

def get_user_wellness_summary(employee_id="1"):
    """Fetch latest user wellness data from predictions table"""
    try:
        conn = get_db_connection()
        cur = conn.cursor(cursor_factory=RealDictCursor)
        cur.execute(
            """
            SELECT sleep_hours, steps, heart_rate, meetings, screen_time, focus_time, emails_sent, predicted_label
            FROM predictions
            WHERE employee_id = %s
            ORDER BY prediction_time DESC
            LIMIT 1
            """,
            (employee_id,)
        )
        result = cur.fetchone()
        cur.close()
        conn.close()
        return result
    except Exception as e:
        print("❌ Database error while fetching summary:", e)
        return None

def emotional_support_chat(user_message: str, employee_id="1") -> str:
    """AI chatbot with database access and personalized suggestions"""
    try:
        # Fetch latest user wellness data
        wellness_data = get_user_wellness_summary(employee_id)
        wellness_context = ""
        if wellness_data:
            wellness_context = (
                f"\nThe employee's recent data:\n"
                f"- Sleep hours: {wellness_data['sleep_hours']}\n"
                f"- Steps: {wellness_data['steps']}\n"
                f"- Heart rate: {wellness_data['heart_rate']}\n"
                f"- Meetings: {wellness_data['meetings']}\n"
                f"- Screen time: {wellness_data['screen_time']} hrs\n"
                f"- Focus time: {wellness_data['focus_time']} hrs\n"
                f"- Emails sent: {wellness_data['emails_sent']}\n"
                f"- Predicted Burnout Risk: {'High' if wellness_data['predicted_label']==1 else 'Low'}\n"
            )

        # Send combined context + user message to Gemini
        model = genai.GenerativeModel("gemini-2.0-flash")
        response = model.generate_content(
            f"You are a kind, empathetic wellness assistant.\n"
            f"{wellness_context}\n"
            f"User: {user_message}\nAI:"
        )

        ai_response = response.text.strip() if hasattr(response, "text") else response.candidates[0].content.parts[0].text.strip()

        # Save to DB
        log_chat(user_message, ai_response)

        return ai_response

    except Exception as e:
        return f"❌ Chatbot error: {e}"
