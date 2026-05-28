import sys
import os
# os.environ["TF_USE_LEGACY_KERAS"] = "1"
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from typing import Optional
from fastapi import FastAPI, File, UploadFile, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
import shutil
import uuid

from inference.inference import predict_acne_image

from services.skincare_service import get_skincare_recommendation

app = FastAPI(
    title="Acne Classification & Recommendation API",
    description="API terintegrasi untuk mendeteksi jenis jerawat dan merekomendasikan skincare",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

TEMP_DIR = "temp_uploads"
os.makedirs(TEMP_DIR, exist_ok=True)

@app.get("/")
def root():
    return {"message": "Acne Classification & Skincare Recommendation API is running"}

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.post("/predict")
async def predict_and_recommend(
    # 2. File gambar sekarang jadi Opsional (File(None))
    file: UploadFile = File(None),
    
    # 3. Tambahan form baru untuk input manual dari Frontend
    manual_acne_type: Optional[str] = Form(None),
    
    # Data profil tetap wajib
    age_group: str = Form(...),
    skin_type: str = Form(...),
    skin_subtype: str = Form(...),
    sensitivity: str = Form(...)
):
    if file is None and manual_acne_type is None:
        raise HTTPException(status_code=400, detail="Anda harus mengunggah foto ATAU memilih jenis jerawat secara manual.")

    jenis_jerawat_tabular = ""
    deteksi_gambar_asli = None

    # SKENARIO A: User mengirim Gambar
    if file is not None:
        allowed_extensions = {"jpg", "jpeg", "png"}
        ext = file.filename.split(".")[-1].lower()
        if ext not in allowed_extensions:
            raise HTTPException(status_code=400, detail="Format file tidak didukung.")

        temp_filename = f"{uuid.uuid4()}.{ext}"
        temp_path = os.path.join(TEMP_DIR, temp_filename)

        try:
            with open(temp_path, "wb") as buffer:
                shutil.copyfileobj(file.file, buffer)

            image_result = predict_acne_image(temp_path)
            
            jenis_jerawat_gambar = image_result["predicted_class"]
            deteksi_gambar_asli = image_result
            
            if jenis_jerawat_gambar in ['Blackheads', 'Whiteheads']:
                jenis_jerawat_tabular = 'Comedonal'
            elif jenis_jerawat_gambar in ['Papules', 'Pustules']:
                jenis_jerawat_tabular = 'Inflammatory'
            else:
                jenis_jerawat_tabular = 'Cyst'
        # finally:
        #     if os.path.exists(temp_path):
        #         os.remove(temp_path)
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Terjadi kesalahan di AI Rekomendasi: {str(e)}")

        finally:
            # Cek apakah variabel temp_path ada dan tidak bernilai None sebelum menghapus
            if 'temp_path' in locals() and temp_path and os.path.exists(temp_path):
                os.remove(temp_path)

    # SKENARIO B: User mengisi form Manual (Tanpa Gambar)
    else:
        # Frontend langsung mengirim nilai: 'Comedonal', 'Inflammatory', atau 'Cyst'
        jenis_jerawat_tabular = manual_acne_type
        deteksi_gambar_asli = "Input Manual oleh Pengguna"

    try:
        sensitivity_clean = "Yes" if "not" not in sensitivity.lower() else "No"
        data_pengguna = {
            'Age_Group': age_group,
            'Skin_Type': skin_type,
            'Skin_Subtype': skin_subtype,
            'Sensitivity': sensitivity_clean,
            'Internal_Type': jenis_jerawat_tabular
        }
        
        hasil_rekomendasi = get_skincare_recommendation(data_pengguna)

        return {
            "status": "success",
            "data": {
                "sumber_deteksi": "AI Gambar" if file is not None else "Manual",
                "deteksi_asli": deteksi_gambar_asli,
                "kategori_tabular": jenis_jerawat_tabular,
                "rekomendasi_skincare": hasil_rekomendasi
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Terjadi kesalahan di AI Rekomendasi: {str(e)}")
# # pip install fastapi uvicorn python-multipart tensorflow joblib numpy pillow
# Untuk menjalankan server lokal:
# uvicorn main:app --host 0.0.0.0 --port 8000