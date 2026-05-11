from fastapi import APIRouter, Depends, HTTPException,Request,Response
from app.services.mongodb.user_login_services import UserLogService
from app.schemas.user_login import UserLogin
from app.schemas.user_add import UserAdd
from app.services.postgres.user_service import UserService
from sqlalchemy.orm import Session
from app.db.postgres import get_db
from app.core.security import create_access_token,get_current_user
from app.core.config import settings

router = APIRouter()

@router.post("/login")
async def login(request: Request, 
                payload: UserLogin,
                response: Response,
                db: Session = Depends(get_db)
               ):
    mongo_service = UserLogService()
    postgreas_service = UserService(db)
    email = payload.email
    password = payload.password
    user = postgreas_service.login_user(email,password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid Credentials")
    
    session_id = await mongo_service.log_login(request ,user.id,user.name,user.email,user.role)
    access_token = create_access_token(data={"sub": str(user.id),
                                             "email": user.email,
                                             "role": user.role,
                                             "session_id":session_id
                                             })
    response.set_cookie(
        key="access_token", 
        value=access_token, 
        httponly=True,   
        secure=settings.SECURE,     
        samesite="lax",
        max_age=86400
    
    )
    # print(user.id, user.email,user.role)
    # print(f"Generated Access Token: {access_token}")
    return {
    "message": "Login successful",
    "user": {
        "id": user.id,
        "email": user.email,
        "role": user.role
        }
    }

    
    

@router.post("/add-user")
def add_user( payload: UserAdd,db: Session = Depends(get_db)):
    service = UserService(db)
    try:
        inserted_id = service.create_user(
            name=payload.name,
            email=payload.email,
            password=payload.password,
            nic=payload.nic,
            address=payload.address,
            phone=payload.phone,
            role=payload.role
        )
        return {"message": "User added", "id": inserted_id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))



@router.get("/user-logs")
async def list_all_user(
    service: UserLogService = Depends(UserLogService),
    user: dict = Depends(get_current_user)
):
    user_name = user.get("role")
    if user_name != "admin":
        raise HTTPException(status_code=403, detail="Forbidden: Admin access required")
    try:
        return await service.list_all_user_logs()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))




@router.get("/users/me/")
async def read_users_me(
    current_user: dict= Depends(get_current_user)):
    return current_user



@router.post("/logout")
async def logout(response: Response,
                 current_user: dict = Depends(get_current_user)):
    mongo_service = UserLogService()
    session_id = current_user.get("session_id")
    await mongo_service.logout_session(session_id)
    
    response.delete_cookie(key="access_token")
    return {"message": "Logged out successfully"}

    