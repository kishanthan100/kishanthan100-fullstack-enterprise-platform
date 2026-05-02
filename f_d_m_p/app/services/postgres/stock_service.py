from sqlalchemy.exc import IntegrityError
from app.repositories.postgres.stock_repositories import StockRepository
from app.repositories.redis.stock_cache_repository import StocksCacheRepository
from app.schemas.stock_schema import BulkStockUpsert
from fastapi import HTTPException
from fastapi.encoders import jsonable_encoder


class StockService:

    def __init__(self, db):
        self.repo = StockRepository(db)
        self.cache = StocksCacheRepository()

    def show_create_stocks(self):
        # result = self.repo.get_items_with_stock()
        # return [
        #     {
        #         "item_id": row.item_id,
        #         "item_name":row.item_name,
        #         "quantity": row.quantity,
        #         "created_date": row.created_date,
        #     }
        #     for row in result
        # ]
        cache_key = "stocks"
        cached_stocks = self.cache.get(cache_key)
        if cached_stocks:
            print("Returning from Redis")
            return cached_stocks
        
        result = self.repo.get_items_with_stock()
        result =  [
            {
                "item_id": row.item_id,
                "item_name":row.item_name,
                "quantity": row.quantity,
                "created_date": row.created_date
                
            }
            for row in result
        ]
        encoded_data = jsonable_encoder(result)
        self.cache.set(cache_key, encoded_data, expire=120)
        print("Returning from Redis after Getting data from Postgres")
        return result



    def bulk_upsert(self, data: BulkStockUpsert):

        updated_records = []

        for stock_data in data.stocks:

            existing_stock = self.repo.get_by_item_id(stock_data.item_id)

            if existing_stock:
                # Update existing
                existing_stock.quantity = stock_data.quantity
                updated_records.append(existing_stock)
            else:
                # Create new
                new_stock = self.repo.create(
                    item_id=stock_data.item_id,
                    quantity=stock_data.quantity
                )
                updated_records.append(new_stock)

        self.repo.commit()

        for record in updated_records:
            self.repo.refresh(record)
            
        cache_key = "stocks"
        self.cache.delete(cache_key)
        return updated_records