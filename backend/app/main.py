
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.officer import router as officer_router
from app.database import check_database
from app.api.claims import router as claims_router
from app.api.assessment import router as assessment_router
app = FastAPI(
    title="BKIG API",
    description="AI-Powered Bharat Krishi Intelligence Grid",
    version="1.0.0",
)
app.include_router(assessment_router)
app.include_router(officer_router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register the claims router AFTER creating the app
app.include_router(claims_router)


@app.get("/")
def root():
    return {
        "project": "AI-Powered Bharat Krishi Intelligence Grid",
        "status": "running",
    }


@app.get("/api/v1/health/database")
def database_health():
    return check_database()
