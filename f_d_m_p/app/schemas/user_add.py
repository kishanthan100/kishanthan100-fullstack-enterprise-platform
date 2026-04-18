from pydantic import BaseModel

class UserAdd(BaseModel):
    name: str
    email: str
    password: str
    nic: str
    address: str
    phone: str
    role: str