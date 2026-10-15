
from datetime import datetime, timezone
from uuid import uuid4

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from app.database import db

router = APIRouter(prefix="/api/v1/insurance/claims", tags=["Insurance Claims"])


class ClaimCreate(BaseModel):
    farmer_name: str = Field(min_length=2, max_length=100)
    farmer_id: str = Field(min_length=1, max_length=100)
    crop: str = Field(min_length=1, max_length=100)
    district: str = Field(min_length=1, max_length=100)
    claimed_amount: float = Field(gt=0)


@router.post("/", status_code=201)
def create_claim(claim: ClaimCreate):
    if db is None:
        raise HTTPException(status_code=503, detail="Database is not configured")

    document = claim.model_dump()
    document.update({
        "claim_id": str(uuid4()),
        "status": "submitted",
        "created_at": datetime.now(timezone.utc),
    })

    result = db["insurance_claims"].insert_one(document)
    document["_id"] = str(result.inserted_id)
    return document


@router.get("/")
def list_claims():
    if db is None:
        raise HTTPException(status_code=503, detail="Database is not configured")

    claims = list(db["insurance_claims"].find({}, {"_id": 0}).sort("created_at", -1))
    return {"count": len(claims), "claims": claims}
