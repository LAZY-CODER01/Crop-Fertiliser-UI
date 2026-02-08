🌱 AgriWise
Smart Crop & Fertilizer Recommendation System

AgriWise is an AI-powered precision agriculture platform that helps farmers and agri-consultants make data-driven decisions to maximize crop yield and soil health.
It analyzes soil nutrients and environmental conditions to recommend the most suitable crop and the exact fertilizer required, all in a single intelligent workflow.

🚜 Problem Statement

Farmers often rely on intuition or generic guidelines for crop selection and fertilization, which can lead to:

Poor yield

Soil degradation

Overuse of fertilizers

Increased costs

AgriWise solves this by using machine learning models trained on real agricultural datasets to provide accurate, location-aware recommendations.

🧠 Solution Overview

AgriWise uses a Two-Stage XGBoost Machine Learning Pipeline:

🔹 Stage 1 – Crop Recommendation

Predicts the best crop based on:

Nitrogen (N)

Phosphorous (P)

Potassium (K)

Temperature

Humidity

Soil Moisture

Soil Type

🔹 Stage 2 – Fertilizer Recommendation

Predicts the most suitable fertilizer using:

Soil nutrients

Soil type

The predicted crop from Stage 1

This staged approach improves accuracy and mirrors real-world agricultural decision-making.

🚀 Key Features

🌾 Precision Agriculture using XGBoost for high-accuracy predictions

🔁 Dual Recommendation Flow (Crop + Fertilizer in one request)

🌍 Multi-Language Support

English

Hindi

Marathi

Tamil

Telugu

🧑‍🌾 Farmer-Friendly UI with modern, responsive design

⚡ Fast REST API powered by Flask

📊 Confidence Scores & Alternatives for informed decision-making

🛠️ Tech Stack
Frontend

React.js

Tailwind CSS

Lucide Icons

Backend

Python

Flask

Flask-CORS

Machine Learning

XGBoost

Scikit-Learn

Pandas

NumPy

Model Persistence

Joblib

📂 Project Structure
AgriWise/
├── backend/
│   ├── app.py                 # Flask REST API
│   ├── train_model.py         # Model training pipeline
│   ├── agri_brain.joblib      # Trained ML model (generated after training)
│   ├── requirements.txt       # Python dependencies
│   └── data/
│       ├── train.csv
│       └── Fertilizer Prediction.csv
│
└── frontend/
    ├── src/
    │   └── components/
    │       └── AgriPredictorUI.js
    └── package.json

⚙️ Installation & Setup
1️⃣ Backend Setup (Model & API)
# Navigate to backend
cd backend

# Create virtual environment (recommended)
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate

# Install dependencies
pip install flask flask-cors pandas numpy scikit-learn xgboost joblib

# Train the ML models (run once)
python train_model.py

# Start the Flask server
python app.py


Backend runs at:

http://127.0.0.1:5000

2️⃣ Frontend Setup (User Interface)
cd frontend

npm install
npm run dev


Frontend runs at:

http://localhost:3000

🔗 API Documentation
POST /predict
Request Body (JSON)
{
  "temperature": 26,
  "humidity": 50,
  "moisture": 40,
  "nitrogen": 20,
  "potassium": 15,
  "phosphorous": 25,
  "soil_type": "Clayey"
}

Response (JSON)
{
  "recommended_crop": "Rice",
  "recommended_fertilizer": "Urea",
  "alternatives": [
    { "crop": "Jute", "confidence": 12.4 },
    { "crop": "Coffee", "confidence": 3.1 }
  ]
}

📊 Datasets Used

🌾 Crop Recommendation Dataset – Kaggle

🧪 Fertilizer Prediction Dataset – Kaggle

(Used strictly for educational and research purposes.)

🌟 Future Enhancements

Satellite & weather API integration

Region-specific soil calibration

Mobile-first farmer app

Market price prediction for crops

Government scheme recommendations

🤝 Contributing

Contributions are welcome!

# Fork the repo
# Create a feature branch
git checkout -b feature/YourFeature

# Commit changes
git commit -m "Add YourFeature"

# Push to GitHub
git push origin feature/YourFeature


Then open a Pull Request 🚀

👨‍💻 Author

Avinash Maurya
Software Engineering Student | ML & Full-Stack Developer
Focused on building real-world, impact-driven systems
