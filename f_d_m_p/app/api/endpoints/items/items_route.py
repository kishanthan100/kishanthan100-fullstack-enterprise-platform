from fastapi import APIRouter, Depends, HTTPException,Request
from sqlalchemy.orm import Session
from app.services.postgres.item_service import ItemService
from app.db.postgres import get_db


router = APIRouter()

@router.post("/list-items/")
def list_all_items(db: Session = Depends(get_db)):
    service = ItemService(db)
    try:
        return service.get_all_items()
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    

@router.delete("/items/{item_id}")
def delete_item(item_id: int, db: Session = Depends(get_db)):
    service = ItemService(db)
    try:
        service.delete_item(item_id)
        return {"message": f"Item with id {item_id} deleted successfully"}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/create-items/")
def create_item(item_name: str, category: str, img_url: str, db: Session = Depends(get_db)):
    service = ItemService(db)
    try:
        item = service.create_item(item_name, category, img_url)
        return {"message": "Item created successfully", "item": {
            "id": item.id,
            "item_name": item.item_name,
            "category": item.category,
            "img_url": item.img_url
        }}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))