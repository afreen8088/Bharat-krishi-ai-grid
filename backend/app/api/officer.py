
from datetime import datetime, timezone

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from app.database import db

router = APIRouter(
    prefix="/api/v1/officer",
    tags=["Officer Review"],
)


class ReviewInput(BaseModel):
    decision: str = Field(
        description="pending, approved, rejected, or needs_more_information"
    )
    notes: str = Field(default="", max_length=2000)


@router.get("/claims")
def list_claims():
    if db is None:
        raise HTTPException(status_code=503, detail="Database unavailable")

    claims = list(
        db["insurance_claims"].find({}, {"_id": 0}).sort("created_at", -1)
    )

    return {"count": len(claims), "claims": claims}


@router.get("/claims/{claim_id}/assessments")
def get_assessments(claim_id: str):
    if db is None:
        raise HTTPException(status_code=503, detail="Database unavailable")

    claim = db["insurance_claims"].find_one({"claim_id": claim_id})

    if claim is None:
        raise HTTPException(status_code=404, detail="Claim not found")

    predictions = list(
        db["model_predictions"]
        .find({"claim_id": claim_id}, {"_id": 0})
        .sort("created_at", -1)
    )

    return {
        "claim_id": claim_id,
        "assessment_count": len(predictions),
        "assessments": predictions,
    }


@router.post("/claims/{claim_id}/review")
def record_review(claim_id: str, review: ReviewInput):
    if db is None:
        raise HTTPException(status_code=503, detail="Database unavailable")

    allowed = {
        "pending",
        "approved",
        "rejected",
        "needs_more_information",
    }

    if review.decision not in allowed:
        raise HTTPException(
            status_code=422,
            detail=f"Decision must be one of: {', '.join(sorted(allowed))}",
        )

    claim = db["insurance_claims"].find_one({"claim_id": claim_id})

    if claim is None:
        raise HTTPException(status_code=404, detail="Claim not found")

    record = {
        "claim_id": claim_id,
        "decision": review.decision,
        "notes": review.notes,
        "reviewed_at": datetime.now(timezone.utc),
    }

    result = db["officer_reviews"].insert_one(record)

    return {
        "review_id": str(result.inserted_id),
        "claim_id": claim_id,
        "decision": review.decision,
        "message": "Review recorded",
    }
