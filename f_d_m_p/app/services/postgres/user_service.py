from fastapi import HTTPException,status
from app.repositories.postgres.user_repositories import UserRepository
from app.repositories.redis.item_cache_repository import CacheRepository
from app.core.security import get_password_hash,verify_password


class UserService:

    def __init__(self, db):
        self.repo = UserRepository(db)
        self.cache = CacheRepository()

    def get_all_users(self):
        cache_key = "users:all"
        cached_users = self.cache.get(cache_key)
        if cached_users:
            print("Returning from Redis")
            return cached_users

        users = self.repo.get_all()

        # Convert SQLAlchemy objects to dict
        result = [
            {
                "id": user.name,
                "email": user.email,
                "nic": user.nic,
                "address": user.address,
                "phone": user.phone,
                "role": user.role
            }
            for user in users
        ]

        self.cache.set(cache_key, result, expire=120)
        print("Returning from PostgreSQL")
        return result

    def delete_user(self, user_email: str):
        self.repo.delete(user_email)
        self.cache.delete("users:all")

    def create_user(self, name: str, email: str, password: str, nic: str, address: str, phone: str, role: str):
        e_email = self.repo.get_by_email(email)  # Check if user already exists
        if e_email:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT, detail=f"User with email {email} already exists"
            )
        h_password = get_password_hash(password)
        user = self.repo.create(name, email, h_password, nic, address, phone, role)
        self.cache.delete("users:all")
        return user
    
    def login_user(self, email: str, password: str):
        user = self.repo.get_by_email(email)
        if not user:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"User with email {email} not found")
        if not verify_password(password, user.password):
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect password")
        return user