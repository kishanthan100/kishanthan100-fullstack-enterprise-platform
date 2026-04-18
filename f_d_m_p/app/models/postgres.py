from app.db.postgres import Base
from sqlalchemy import Column, Integer, String

class Item(Base):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True, index=True)
    item_name = Column(String, index=True)
    category = Column(String, index=True)
    img_url = Column(String, index=True)


class User(Base):
    __tablename__ = "users_details"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String) 
    nic = Column(String, unique=True, index=True)
    address = Column(String, index=True)
    phone = Column(String, unique=True, index=True)
    role = Column(String, index=True, default="user")
