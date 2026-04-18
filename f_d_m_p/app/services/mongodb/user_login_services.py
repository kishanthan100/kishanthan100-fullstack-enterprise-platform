from app.repositories.mongodb.user_repository import UserLogRepository
from user_agents import parse
from datetime import datetime, timezone
from uuid import uuid4
from fastapi import HTTPException

class UserLogService:

    def __init__(self):
        self.repository = UserLogRepository()

    async def list_all_user_logs(self):
        data = await self.repository.get_all()

        if not data:
            return []
        return data
    
    async def log_login(self, request, id:int,username: str,email:str,role:str):
        
        forwarded = request.headers.get("x-forwarded-for")
        ip_address = forwarded.split(",")[0].strip() if forwarded else request.client.host
        session_id = str(uuid4())
        # Device info
        ua_string = request.headers.get("user-agent")
        user_agent = parse(ua_string)
        
        login_document = {
            "user_id":id,
            "username": username,
            "email":email,
            "role": role,
            "session_id": session_id,
            "ip_address": ip_address,
            "browser": user_agent.browser.family,
            "os": user_agent.os.family,
            "device": user_agent.device.family,
            "login_time": datetime.now(timezone.utc),
            "logout_time": None,
            "is_active": True
        }

        await self.repository.create(login_document)
        return session_id
    

    async def logout_session(self,session_id:str):
        updated = await self.repository.mongo_logout_session(session_id)

        if updated == 0:
            raise HTTPException(status_code=404, details = "Aactive Session not found")
        return{"message":"Logged out Successfully"}
    
    async def get_user_last_login(self,user_id:int):
        document = await self.repository.user_last_login(user_id)
        if not document:
            raise HTTPException(status_code=404, detail="No login records found for this user")
        return document
    
    async def get_user_all_logins(self,user_id:int):
        documents = await self.repository.user_all_logins(user_id)
        if not documents:
            raise HTTPException(status_code=404, detail="No login records found for this user")
        return documents