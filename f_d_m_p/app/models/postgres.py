from app.db.postgres import Base
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime,UniqueConstraint
from datetime import datetime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

class Item(Base):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True, index=True)
    item_name = Column(String, index=True)
    category = Column(String, index=True)
    country = Column(String, index=True)
    # Relationship to Stock
    stocks = relationship("Stock", back_populates="item", cascade="all, delete")
    


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

class Stock(Base):
    __tablename__ = "stocks"

    id = Column(Integer, primary_key=True, index=True)
    quantity = Column(Integer, nullable=False)
    created_date = Column(DateTime, default=datetime.utcnow)
    updated_date = Column(DateTime(timezone=True), onupdate=func.now())
    item_id = Column(Integer, ForeignKey("items.id", ondelete="CASCADE"), nullable=False)
    # Relationship back to Item
    item = relationship("Item", back_populates="stocks")

    __table_args__ = (
        UniqueConstraint("item_id", name="uq_stock_item_id"),
    )


class Customers(Base):
    __tablename__ = "customers"

    id = Column(Integer, primary_key=True, index=True)
    customer_name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    contact_no = Column(String, unique=True, index=True)
    address = Column(String, unique=False, index=True)
    created_date = Column(DateTime, default=datetime.utcnow)