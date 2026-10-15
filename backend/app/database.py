
import os
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()

uri = os.getenv("MONGODB_URI")
db_name = os.getenv("MONGODB_DB_NAME", "bkig")

client = MongoClient(uri, serverSelectionTimeoutMS=5000) if uri else None
db = client[db_name] if client is not None else None


def check_database():
    if client is None:
        return {
            "connected": False,
            "message": "MONGODB_URI is not configured",
        }

    try:
        client.admin.command("ping")
        return {"connected": True, "database": db_name}
    except Exception:
        return {
            "connected": False,
            "message": "Database connection failed",
        }
