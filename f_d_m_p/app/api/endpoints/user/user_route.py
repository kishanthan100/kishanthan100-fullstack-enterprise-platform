from fastapi import APIRouter, Depends, HTTPException,status
from app.services.mongodb.user_login_services import UserLogService
from app.services.postgres.user_service import UserService
from sqlalchemy.orm import Session
from app.core.security import get_current_user
from app.db.postgres import get_db
from .utils import select_resignation

router = APIRouter()

@router.get("/user-last-login-logs")
async def get_user_last_login_logs(doc: UserLogService = Depends(UserLogService),
                                   current_user: dict = Depends(get_current_user)):
                             
    user_id = current_user.get("user_id")
    print(f"Current user ID: {user_id}")
    if  user_id is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token: missing user ID") 
    user_id = int(user_id)
    return await doc.get_user_last_login(user_id)
        
        
    
    


@router.get("/user-all-login-logs")
async def get_user_all_login_logs(doc: UserLogService = Depends(UserLogService),
                                   current_user: dict = Depends(get_current_user)):
    user_id = int(current_user.get("user_id"))
    print(f"Current user ID: {user_id}")
    if  user_id is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token: missing user ID")
    try:
        all_logins = await doc.get_user_all_logins(user_id)
        return all_logins
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))



@router.get("/list-users")
def list_users_from_postgres(
    user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)):

    user_name = user.get("role")
    if user_name != "admin":
        raise HTTPException(status_code=403, detail="Forbidden: Admin access required")
    try:
        service = UserService(db)
        result = service.get_all_users()
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/get-roles")
def list_roles():
    result = select_resignation()
    return result