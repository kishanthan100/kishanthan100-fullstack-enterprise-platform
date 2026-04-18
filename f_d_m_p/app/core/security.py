from  jose import jwt
from jose import JWTError, ExpiredSignatureError
from pwdlib import PasswordHash
from datetime import datetime, timedelta, timezone
from fastapi import HTTPException, Request
from .config import settings


password_hasher = PasswordHash.recommended()

def get_password_hash(password: str) -> str:
    password_hasher = PasswordHash.recommended()
    return password_hasher.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    password_hasher = PasswordHash.recommended()
    return password_hasher.verify(plain_password, hashed_password)





def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire,
                      "type": "access"})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt

def decode_access_token(token: str):
    payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
    return payload
   

def get_current_user(request: Request):
    access_token = request.cookies.get("access_token")
    print("Cookies:", request.cookies)
    print("Access token from cookie:", access_token)
    if not access_token:
        raise HTTPException(status_code=401, detail="Not authenticated: access token missing")
    try:
        payload = decode_access_token(access_token)
        user_id = payload.get("sub") if payload else None
        user_email = payload.get("email") if payload else None
        user_role = payload.get("role") if payload else None
        session_id = payload.get("session_id")


        if user_id is  None:
            raise HTTPException(status_code=401, detail="Invalid token: missing user ID")
        return {"user_id": user_id, 
                "email": user_email,
                "role": user_role,
                "session_id":session_id}
    except ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")

    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")