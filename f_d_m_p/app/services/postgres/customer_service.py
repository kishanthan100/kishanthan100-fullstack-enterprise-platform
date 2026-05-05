from app.repositories.postgres.customer_repository import CustomerRepository

from app.schemas.customer_schema import CreateCustomer
from fastapi import HTTPException, status
from fastapi.encoders import jsonable_encoder


class CustomerService:

    def __init__(self, db):
        self.repo = CustomerRepository(db)

    def create_customer(self, customer_data: CreateCustomer):

        # Business Validation
        if self.repo.get_by_email(customer_data.email):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already exists"
            )

        if self.repo.get_by_contact(customer_data.contact_no):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Contact number already exists"
            )

        return self.repo.create(customer_data)

      

    def get_customers(self):
        return self.repo.get_customers()