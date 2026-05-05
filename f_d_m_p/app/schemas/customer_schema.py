from pydantic import BaseModel, EmailStr


class CreateCustomer(BaseModel):
    customer_name: str
    email: EmailStr
    contact_no: str
    address: str

    class config:
        orm_mode = True