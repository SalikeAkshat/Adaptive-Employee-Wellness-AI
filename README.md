#  Adaptive Employee Wellness AI System

An intelligent AI-driven platform designed to monitor employee wellness, predict burnout risk, and provide personalized emotional support using Machine Learning and Conversational AI.

---

##  Overview

The **Adaptive Employee Wellness AI System** integrates biometric data, productivity metrics, and AI-powered insights to promote employee wellbeing.  
It combines **Machine Learning models**, a **Gemini-powered chatbot**, and an interactive **React dashboard** to deliver real-time monitoring and support.

---

##  Features

-  **Wellness Dashboard**
  - Displays metrics like sleep hours, steps, heart rate, screen time, and focus time
  - Visual burnout risk assessment (Low / High)

-  **AI Chatbot (Gemini)**
  - Provides empathetic, personalized responses
  - Uses real-time user data for context-aware suggestions

-  **Burnout Prediction Model**
  - Machine Learning model (XGBoost / Gradient Boosting)
  - Predicts burnout risk based on behavioral and biometric data

-  **Database Integration**
  - PostgreSQL for storing user data, predictions, and chat logs

-  **Authentication System**
  - User registration and login functionality

---

##  System Architecture

```bash
Data Sources (Wearables, User Input, Calendar)
↓
Data Preprocessing & Feature Engineering
↓
Machine Learning Model (Burnout Prediction)
↓
PostgreSQL Database (Storage)
↓
Backend (Flask APIs)
↓
Frontend (React Dashboard + Chatbot UI)
```

---

##  Tech Stack

###  Frontend
- React.js
- Tailwind CSS
- Recharts (for data visualization)
- Axios

###  Backend
- Flask (Python)
- REST APIs

###  Machine Learning
- Python
- Pandas, NumPy
- Scikit-learn / XGBoost

###  AI Chatbot
- Google Gemini API

###  Database
- PostgreSQL

---

##  Installation & Setup

### 1️ Clone the Repository
```bash
git clone https://github.com/SalikeAkshat/Adaptive-Employee-Wellness-AI.git
cd Adaptive-Employee-Wellness-AI
```

### 2️ Backend Setup
```bash
cd backend
pip install -r requirements.txt
python app.py
```
Backend runs on: http://127.0.0.1:5000

### 3️ Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on: http://localhost:5173

### 4️ Database Setup (PostgreSQL)

Create database:
```sql
CREATE DATABASE wellness_ai;
```

Create tables:
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT
);

CREATE TABLE predictions (
    id SERIAL PRIMARY KEY,
    employee_id TEXT,
    sleep_hours FLOAT,
    steps INT,
    heart_rate INT,
    meetings INT,
    screen_time FLOAT,
    focus_time FLOAT,
    emails_sent INT,
    predicted_label INT,
    prediction_time TIMESTAMP
);

CREATE TABLE chat_logs (
    id SERIAL PRIMARY KEY,
    user_message TEXT,
    ai_response TEXT,
    model_used TEXT,
    created_at TIMESTAMP
);
```

---

## API Endpoints

| Method | Endpoint           | Description                |
| ------ | ------------------ | -------------------------- |
| POST   | /register          | Register new user          |
| POST   | /login             | User login                 |
| GET    | /latest-prediction | Fetch latest wellness data |
| POST   | /chat              | Send message to AI chatbot |

---
## Example Output

```json
{
  "sleep_hours": 6.1,
  "steps": 6791,
  "heart_rate": 72,
  "screen_time": 10.7,
  "focus_time": 3.9,
  "predicted_label": 0
}
```

---

## Testing

 - Verified API connectivity between frontend and backend
 - Validated ML model predictions
 - Tested chatbot responses with Gemini integration
 - Ensured database CRUD operations

---

## Future Enhancements

 - Integration with wearable devices (Fitbit, Apple Watch)
 - Voice-based chatbot interaction
 - Advanced emotion detection using NLP
 - Mobile application (Android/iOS)
 - Multi-language chatbot support
 - Real-time streaming analytics

---

## Contributors
 - Salike Akshat - salikeakshat28@gmail.com
 - Rohit Chennam - rohitchennam1@gmail.com
