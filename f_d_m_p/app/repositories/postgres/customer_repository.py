from sqlalchemy.orm import Session
from app.models.postgres import Customers
from datetime import datetime
from app.schemas.customer_schema import CreateCustomer

class CustomerRepository:
    def __init__(self,db:Session):
        self.db = db    

    
    def get_by_email(self, email: str):
        return self.db.query(Customers).filter(Customers.email == email).first()

    def get_by_contact(self, contact_no: str):
        return self.db.query(Customers).filter(Customers.contact_no == contact_no).first()


    def create(self, customer_data: CreateCustomer):
        new_customer = Customers(**customer_data.dict())
        self.db.add(new_customer)
        self.db.commit()
        self.db.refresh(new_customer)
        return new_customer
        
    def get_customers(self):
        return self.db.query(Customers).all() 

    



        