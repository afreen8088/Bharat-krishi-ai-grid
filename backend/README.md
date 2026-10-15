# BKIG Backend — Bharat Krishi Intelligence Grid

## 1. Project Overview

The **Bharat Krishi Intelligence Grid (BKIG)** is an AI-powered agricultural intelligence platform designed to support agricultural insurance claim management, fraud-risk assessment, and officer review workflows.

This backend is built using Python, FastAPI, MongoDB Atlas, and a Random Forest machine learning model.

It provides APIs that the frontend can use to submit claims, retrieve claims, assess claim risk, and record officer reviews.

## 2. Technology Stack

| Technology | Purpose |
|---|---|
| Python | Backend programming language |
| FastAPI | REST API development |
| MongoDB Atlas | Cloud database |
| PyMongo | MongoDB connection and queries |
| Pandas | Preparing model input data |
| Scikit-learn | Random Forest model |
| Joblib | Saving and loading the trained model |
| Uvicorn | Running the API server |

## 3. Project Structure

```text
backend/
├── app/
│   ├── __init__.py
│   ├── main.py
│   ├── database.py
│   ├── api/
│   │   ├── __init__.py
│   │   ├── claims.py
│   │   ├── assessment.py
│   │   └── officer.py
│   └── services/
│       ├── __init__.py
│       └── fraud_service.py
├── ml/
│   ├── train_model.py
│   └── fraud_model.joblib
├── test_mongodb.py
├── .env
├── requirements.txt
└── README.md
```

The `.env` file contains local configuration and must not be committed to GitHub.

## 4. Installation

Open a terminal in the `backend` directory.

Create and activate a virtual environment:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

Install dependencies:

```powershell
python -m pip install -r requirements.txt
```

## 5. Environment Configuration

Create `backend/.env` with your own MongoDB Atlas connection details:

```env
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/
MONGODB_DB_NAME=bkig
```

Replace the placeholders with your actual connection details.

**Security:** Never publish your database password or complete connection string.

## 6. Train the Machine Learning Model

From the `backend` directory, run:

```powershell
python .\ml\train_model.py
```

This generates:

```text
ml/fraud_model.joblib
```

The current prototype uses synthetic data and artificial labels to test the ML pipeline. Its scores and metrics do not demonstrate real-world fraud-detection performance.

## 7. Start the Backend

Run:

```powershell
python -m uvicorn app.main:app --reload --port 8000
```

The API will be available at:

- Base URL: `http://127.0.0.1:8000`
- Interactive API documentation: `http://127.0.0.1:8000/docs`
- Database health endpoint: `http://127.0.0.1:8000/api/v1/health/database`

## 8. API Endpoints

### Insurance Claims

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/v1/insurance/claims/` | Retrieve submitted claims |
| POST | `/api/v1/insurance/claims/` | Create an insurance claim |

### Fraud Risk Assessment

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/v1/insurance/claims/{claim_id}/assessment` | Generate and save a risk assessment |

### Officer Review

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/v1/officer/claims` | Retrieve claims for review |
| GET | `/api/v1/officer/claims/{claim_id}/assessments` | Retrieve assessment history |
| POST | `/api/v1/officer/claims/{claim_id}/review` | Record an officer review |

### Health

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/` | Check API status |
| GET | `/api/v1/health/database` | Check MongoDB connectivity |

## 9. Example Claim Request

Send a POST request to `/api/v1/insurance/claims/`:

```json
{
  "farmer_name": "Test Farmer",
  "farmer_id": "BKIG-DEMO-001",
  "crop": "Ragi",
  "district": "Bengaluru Rural",
  "claimed_amount": 15000
}
```

A successful request returns HTTP `201 Created` and a generated claim ID.

## 10. Example Fraud Assessment Request

Send a POST request to:

`/api/v1/insurance/claims/{claim_id}/assessment`

Request body:

```json
{
  "area_hectares": 2.5,
  "rainfall_mm": 80,
  "previous_claims": 1,
  "weather_match": 1
}
```

The response includes a risk score, risk category, model version, and prediction ID.

## 11. MongoDB Collections

The application uses the following collections:

- `insurance_claims` — submitted insurance claims.
- `model_predictions` — generated fraud-risk assessments.
- `officer_reviews` — recorded officer decisions and notes.

MongoDB creates collections automatically when data is first inserted, unless they have been created explicitly.

## 12. Frontend Integration

The frontend team can use the FastAPI endpoints to display claims, retrieve assessment history, and submit officer reviews.

Configure the frontend backend URL using:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

This URL is for local development only. A deployed frontend requires a reachable backend URL.

## 13. Current Limitations and Next Steps

- The fraud-risk model uses synthetic data, not verified real-world fraud cases.
- Risk assessments are experimental and must not automatically reject claims.
- Authentication and role-based authorization must be implemented before deployment.
- Officer review records are currently stored separately from the original claim status.
- Production deployment requires secure configuration, testing, monitoring, and suitable real-world model validation.

## 14. Development Status

The MongoDB Atlas connection, claim creation and retrieval, synthetic Random Forest training, fraud assessment API, assessment history, and officer review recording have been tested successfully in the local development environment.

**Project:** AI-Powered Bharat Krishi Intelligence Grid (BKIG)
