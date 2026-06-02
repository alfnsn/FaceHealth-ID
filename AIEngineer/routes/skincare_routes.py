from fastapi import APIRouter
from app.models.skincare_model import SkincareRequest
from app.controllers.skincare_controller import process_skincare_prediction

router = APIRouter()

@router.post("/recommend")
async def get_recommendation(request: SkincareRequest):
    return process_skincare_prediction(request)