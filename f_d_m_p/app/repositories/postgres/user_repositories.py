from sqlalchemy.orm import Session
from app.models.postgres import User


class UserRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, name,email,password,nic,address,phone,role):
        user = User(
            name = name,
            email = email,
            password = password,
            nic = nic,
            address = address,
            phone = phone,
            role = role

            
        )
        self.db.add(user)
        self.db.commit()
        self.db.refresh(user)
        return user

    def get_by_email(self, email: str):
        user_email = self.db.query(User).filter(User.email == email).first()
        
        if not user_email:
            return None
        return user_email

    def get_all(self):
        return self.db.query(User).all()

    def delete(self, email: str):
        user = self.get_by_email(email)
        if user:
            self.db.delete(user)
            self.db.commit()
        return user