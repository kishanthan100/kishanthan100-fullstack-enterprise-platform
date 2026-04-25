from sqlalchemy.orm import Session
from app.models.postgres import Item


class ItemRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, item_name: str, category: str):
        item = Item(
            item_name=item_name,
            category=category
            
        )
        self.db.add(item)
        self.db.commit()
        self.db.refresh(item)
        return item

    def get_by_id(self, item_id: int):
        item = self.db.query(Item).filter(Item.id == item_id).first()
        if not item:
            raise ValueError(f"Item with id {item_id} not found")
        return item

    def get_all(self):
        return self.db.query(Item).all()

    def delete(self, item_id: int):
        item = self.get_by_id(item_id)
        if item:
            self.db.delete(item)
            self.db.commit()
        return item