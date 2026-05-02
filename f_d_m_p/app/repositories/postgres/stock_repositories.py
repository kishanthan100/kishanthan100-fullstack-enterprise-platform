from sqlalchemy.orm import Session
from app.models.postgres import Stock, Item
from sqlalchemy.dialects.postgresql import insert
from sqlalchemy import func
from datetime import datetime


class StockRepository:
    def __init__(self,db:Session):
        self.db = db
    
    def get_items_with_stock(self):
        return (
            self.db.query(
                Item.id.label("item_id"),
                Item.item_name.label("item_name"),
                func.coalesce(Stock.quantity,0).label("quantity"),
                Stock.created_date.label("created_date"),
            )
            .join(Stock, Stock.item_id == Item.id, isouter=True)
            .all()
        )
    

    
    def get_by_item_id(self, item_id: int):
        return self.db.query(Stock).filter(Stock.item_id == item_id).first()

    def create(self, item_id: int, quantity: int):
        stock = Stock(item_id=item_id,
                      quantity=quantity,
                      updated_date=datetime.utcnow())
        self.db.add(stock)
        return stock

    def commit(self):
        self.db.commit()

    def refresh(self, instance):
        self.db.refresh(instance)