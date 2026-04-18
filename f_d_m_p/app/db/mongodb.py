from pymongo import AsyncMongoClient
from app.core.config import settings

mongodb_client = AsyncMongoClient(
    settings.MONGODB_URL)  
db = mongodb_client[settings.MONGODB_DB_NAME]