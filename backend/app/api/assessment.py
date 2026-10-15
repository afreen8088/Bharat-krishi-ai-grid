
from datetime import datetime, timezone

from bson import ObjectId
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from app.database import db
from app.services.fraud_service import assess_claim

router = APIRouter(
    prefix="/api/v1/insurance/claims",
    tags=["Fraud Risk Assessment"],
)


class AssessmentInput(BaseModel):
    area_hectares: float = Field(gt=0, le=10000)
    rainfall_mm: float = Field(ge=0, le=5000)
    previous_claims: int = Field(ge=0, le=1000)
    weather_match: int = Field(ge=0, le=1)


@router.post("/{claim_id}/assessment")
def create_assessment(claim_id: str, inputs: AssessmentInput):
    if db is None:
        raise HTTPException(
            status_code=503,
            detail="Database is not configured",
        )

    claim = db["insurance_claims"].find_one(
        {"claim_id": claim_id}
    )

    if claim is None:
        raise HTTPException(status_code=404, detail="Claim not found")

    result = assess_claim(
        claimed_amount=float(claim["claimed_amount"]),
        area_hectares=inputs.area_hectares,
        rainfall_mm=inputs.rainfall_mm,
        previous_claims=inputs.previous_claims,
        weather_match=inputs.weather_match,
    )

    prediction = {
        "claim_id": claim_id,
        "assessment": result,
        "created_at": datetime.now(timezone.utc),
    }

    saved = db["model_predictions"].insert_one(prediction)

    return {
        "prediction_id": str(saved.inserted_id),
        "claim_id": claim_id,
        "assessment": result,
        "review_status": "requires_human_review",
    }
