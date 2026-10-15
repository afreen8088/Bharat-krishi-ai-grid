
from pathlib import Path

import joblib
import pandas as pd

MODEL_PATH = (
    Path(__file__).resolve().parents[2]
    / "ml"
    / "fraud_model.joblib"
)

_bundle = joblib.load(MODEL_PATH)
_model = _bundle["model"]
FEATURES = _bundle["features"]


def assess_claim(
    claimed_amount: float,
    area_hectares: float,
    rainfall_mm: float,
    previous_claims: int,
    weather_match: int,
) -> dict:
    values = {
        "claimed_amount": claimed_amount,
        "area_hectares": area_hectares,
        "rainfall_mm": rainfall_mm,
        "previous_claims": previous_claims,
        "weather_match": weather_match,
    }

    data = pd.DataFrame([values], columns=FEATURES)
    probability = float(_model.predict_proba(data)[0][1])

    if probability >= 0.70:
        category = "high"
    elif probability >= 0.40:
        category = "medium"
    else:
        category = "low"

    return {
        "risk_score": round(probability * 100, 2),
        "risk_category": category,
        "model_version": _bundle["model_version"],
        "data_type": _bundle["data_type"],
        "disclaimer": (
            "Experimental score from a model trained on synthetic data. "
            "Not evidence of fraud and not suitable for claim rejection."
        ),
    }
