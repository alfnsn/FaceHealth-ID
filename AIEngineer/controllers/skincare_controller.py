from fastapi import HTTPException
from app.models.skincare_model import SkincareRequest
from app.services.skincare_service import get_skincare_recommendation

def process_skincare_prediction(request: SkincareRequest):
    try:
        request_dict = request.model_dump() 
        
        hasil_rekomendasi = get_skincare_recommendation(request_dict)
        
        return {
            "status": "success", 
            "data": {
                "rekomendasi_paket": hasil_rekomendasi
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Terjadi kesalahan pada server: {str(e)}")