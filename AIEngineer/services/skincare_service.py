import joblib
import pandas as pd
import os

MODEL_DIR = os.path.join(os.getcwd(), 'saved_models')

try:
    preprocessor = joblib.load(os.path.join(MODEL_DIR, 'preprocessor.joblib'))
    label_encoder = joblib.load(os.path.join(MODEL_DIR, 'label_encoder.joblib'))
    rf_model = joblib.load(os.path.join(MODEL_DIR, 'rf_model.joblib'))
except Exception as e:
    print(f"Error loading models: {e}")

def get_skincare_recommendation(request_data: dict) -> str:
    df_input = pd.DataFrame([request_data])
    
    input_processed = preprocessor.transform(df_input)
    
    prediksi_angka = rf_model.predict(input_processed)
    
    rekomendasi_akhir = label_encoder.inverse_transform(prediksi_angka)[0]
    
    return rekomendasi_akhir