
import os
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()

uri = os.getenv("MONGODB_URI")

if not uri:
    raise ValueError("MONGODB_URI is missing from backend/.env")

client = MongoClient(uri, serverSelectionTimeoutMS=10000)

try:
    client.admin.command("ping")
    print("SUCCESS: Connected to MongoDB Atlas!")

    db = client[os.getenv("MONGODB_DB_NAME", "bkig")]
    print("Database selected:", db.name)
except Exception as e:
    print("Connection failed:", e)
finally:
    client.close()
