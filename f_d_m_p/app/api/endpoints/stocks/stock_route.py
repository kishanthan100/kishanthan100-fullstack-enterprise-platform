from fastapi import APIRouter, Depends,HTTPException
from sqlalchemy.orm import Session
from app.services.postgres.stock_service import StockService
from app.db.postgres import get_db
from app.core.security import get_current_user
from app.schemas.stock_schema import BulkStockUpsert

router = APIRouter()
    

@router.get("/list-stocks")
def list_stock(db:Session = Depends(get_db)):
    service = StockService(db)
    result = service.show_create_stocks()
    return result



@router.put("/bulk-upsert")
def bulk_upsert_stocks(
    payload: BulkStockUpsert,
    user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)):  
    
    user_name = user.get("role")
    if user_name != "admin":
        raise HTTPException(status_code=403, detail="Forbidden: Admin access required")
    try:
        service = StockService(db)
        return service.bulk_upsert(payload)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    


