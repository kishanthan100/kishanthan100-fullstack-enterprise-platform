from fastapi import APIRouter, Depends,HTTPException
from sqlalchemy.orm import Session
from app.services.postgres.customer_service import CustomerService
from app.schemas.customer_schema import CreateCustomer
from app.db.postgres import get_db
from app.core.security import get_current_user


router = APIRouter()
    
@router.get("/list-customer", status_code=201)
def create_customer(
    db: Session = Depends(get_db)
):
    service = CustomerService(db)
    return service.get_customers()


@router.post("/create-customer", status_code=201)
def create_customer(
    customer: CreateCustomer,
    db: Session = Depends(get_db)
):
    service = CustomerService(db)
    return service.create_customer(customer)