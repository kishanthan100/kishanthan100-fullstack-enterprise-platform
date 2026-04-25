from pydantic import BaseModel

class ItemCreate(BaseModel):
    item_name: str
    category: str