import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import shutil
import uuid

from inference.inference import predict_acne_image

app = FastAPI(
    title="Acne Classification API",
    description="API untuk klasifikasi jenis jerawat menggunakan ResNet50",
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
    return {"message": "Acne Classification API is running"}


@app.get("/health")
def health_check():
    return {"status": "ok"}


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    # Validasi ekstensi
    allowed_extensions = {"jpg", "jpeg", "png"}
    ext = file.filename.split(".")[-1].lower()

    if ext not in allowed_extensions:
        raise HTTPException(
            status_code=400,
            detail=f"Format file tidak didukung. Gunakan: {allowed_extensions}"
        )

    # Simpan file sementara
    temp_filename = f"{uuid.uuid4()}.{ext}"
    temp_path     = os.path.join(TEMP_DIR, temp_filename)

    try:
        with open(temp_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Prediksi
        result = predict_acne_image(temp_path)

        return result

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        # Hapus file temp
        if os.path.exists(temp_path):
            os.remove(temp_path)

# http://localhost:8000
# uvicorn main:app --host 0.0.0.0 --port 8000