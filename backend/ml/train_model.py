
from pathlib import Path

import joblib
import numpy as np
import pandas as pd

from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, confusion_matrix

BASE_DIR = Path(__file__).resolve().parent
MODEL_PATH = BASE_DIR / "fraud_model.joblib"

# DEMO ONLY: generate synthetic claims for pipeline testing.
# These labels are simulated, not verified real-world fraud cases.
rng = np.random.default_rng(42)
n = 2000

area = rng.uniform(0.5, 10, n)
rainfall = rng.uniform(0, 250, n)
previous_claims = rng.integers(0, 6, n)
weather_match = rng.integers(0, 2, n)
claimed_amount = area * rng.uniform(4000, 18000, n)

# Artificial label rules, used only to test the ML pipeline.
risk_signal = (
    (claimed_amount / area > 14000).astype(int)
    + (weather_match == 0).astype(int)
    + (rainfall < 15).astype(int)
    + (previous_claims >= 4).astype(int)
)

# Synthetic target; NOT evidence of actual fraud.
y = (risk_signal >= 2).astype(int)

X = pd.DataFrame({
    "claimed_amount": claimed_amount,
    "area_hectares": area,
    "rainfall_mm": rainfall,
    "previous_claims": previous_claims,
    "weather_match": weather_match,
})

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y,
)

model = RandomForestClassifier(
    n_estimators=100,
    max_depth=8,
    random_state=42,
    class_weight="balanced",
)

model.fit(X_train, y_train)

predictions = model.predict(X_test)

print("DEMO MODEL — SYNTHETIC DATA ONLY")
print("Test examples:", len(X_test))
print("\nClassification report:")
print(classification_report(y_test, predictions, zero_division=0))
print("Confusion matrix:")
print(confusion_matrix(y_test, predictions))

joblib.dump(
    {
        "model": model,
        "features": list(X.columns),
        "model_version": "bkig-demo-0.1",
        "data_type": "synthetic",
    },
    MODEL_PATH,
)

print(f"\nModel saved to: {MODEL_PATH}")
print("Do not use these metrics as real-world fraud performance.")
