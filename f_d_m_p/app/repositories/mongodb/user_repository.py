from app.db.mongodb import db
from datetime import datetime, timezone

class UserLogRepository:

    def __init__(self):
        self.collection = db["userlogindetails"]

    async def get_all(self):
        documents = []
        async for doc in self.collection.find():
            doc["_id"] = str(doc["_id"])
            documents.append(doc)
        return documents
    
    async def create(self, login_document: dict):
        result = await self.collection.insert_one(login_document)
        return str(result.inserted_id)

    async def mongo_logout_session(self, session_id: str):
        await self.collection.update_one(
            {"session_id": session_id },
            {"$set": {
                "is_active": False,
                "logout_time": datetime.now(timezone.utc)
            }}
        )

    
    
    async def user_last_login(self, user_id: int):
        document = await self.collection.find_one(
            {"user_id": user_id},
            sort=[("login_time", -1)]
        )
        if document:
            document["_id"] = str(document["_id"])
            document["is_active"] = False
            document["logout_time"] = "N/A"
        return document


    async def user_all_logins(self, user_id: int):
        cursor = self.collection.find(
            {"user_id": user_id}
        ).sort("login_time", -1)

        documents = await cursor.to_list(length=None)

        for doc in documents:
            doc["_id"] = str(doc["_id"])

        return documents