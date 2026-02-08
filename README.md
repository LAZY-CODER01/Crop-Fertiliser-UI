🌱 AgriWise: Smart Crop & Fertilizer Recommendation System
AgriWise is a machine learning-based web application that helps farmers optimize their yield. It analyzes soil and environmental conditions to recommend the most suitable crop and the specific fertilizer needed for that crop.

The system uses a Two-Stage XGBoost Model:

Stage 1: Predicts the best Crop based on Nitrogen (N), Phosphorous (P), Potassium (K), Temperature, Humidity, Moisture, and Soil Type.

Stage 2: Predicts the required Fertilizer based on the soil nutrients and the predicted crop.

🚀 Features
** Precision Agriculture:** Uses XGBoost (Extreme Gradient Boosting) for high-accuracy predictions.

Dual Recommendation: Provides both Crop and Fertilizer suggestions in a single flow.

Multi-Language Support: Fully localized UI for English, Hindi, Marathi, Tamil, and Telugu.

Interactive UI: Modern, responsive interface built with React & Tailwind CSS.

REST API: Fast and lightweight backend powered by Flask.

🛠️ Tech Stack
Frontend: React.js, Tailwind CSS, Lucide Icons

Backend: Python, Flask

Machine Learning: XGBoost, Scikit-Learn, Pandas, NumPy

Model Serialization: Joblib

📂 Project Structure
Bash

AgriWise/
├── backend/
│   ├── app.py                # The Flask API Server
│   ├── train_model.py        # Script to train and save the model
│   ├── agri_brain.joblib     # The trained "brain" (generated after training)
│   ├── requirements.txt      # List of Python libraries
│   └── data/                 # Folder containing CSV datasets
│       ├── train.csv
│       └── Fertilizer Prediction.csv
│
└── frontend/
    ├── src/
    │   └── components/
    │       └── AgriPredictorUI.js  # The Main React Component
    └── package.json
⚙️ Installation & Setup
1. Backend Setup (The Brain)
First, we need to train the model and start the API server.

Bash

# 1. Navigate to the backend folder
cd backend

# 2. Create a virtual environment (Optional but recommended)
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate

# 3. Install dependencies
pip install flask flask-cors pandas numpy scikit-learn xgboost joblib

# 4. Train the Model (Run this ONCE to generate agri_brain.joblib)
python train_model.py

# 5. Start the Server
python app.py
The API will start running at http://127.0.0.1:5000

2. Frontend Setup (The Interface)
Bash

# 1. Navigate to the frontend folder
cd frontend

# 2. Install Node modules
npm install

# 3. Start the React App
npm run dev
The App will open at http://localhost:3000

🔗 API Documentation
Endpoint: POST /predict
Sends soil data to the model and returns recommendations.

Request Body (JSON):

JSON

{
  "temperature": 26,
  "humidity": 50,
  "moisture": 40,
  "nitrogen": 20,
  "potassium": 15,
  "phosphorous": 25,
  "soil_type": "Clayey"
}
Response (JSON):

JSON

{
  "recommended_crop": "Rice",
  "recommended_fertilizer": "Urea",
  "alternatives": [
    { "crop": "Jute", "confidence": 12.4 },
    { "crop": "Coffee", "confidence": 3.1 }
  ]
}
📊 Datasets Used
This project was trained on open-source agricultural datasets:

Crop Recommendation Dataset: Kaggle Link

Fertilizer Prediction Dataset: Kaggle Link

🤝 Contributing
Fork the repository

Create your feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request
