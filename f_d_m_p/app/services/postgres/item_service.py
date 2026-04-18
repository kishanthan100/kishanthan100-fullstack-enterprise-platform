from app.repositories.postgres.item_repositories import ItemRepository
from app.repositories.redis.item_cache_repository import CacheRepository


class ItemService:

    def __init__(self, db):
        self.repo = ItemRepository(db)
        self.cache = CacheRepository()

    def get_all_items(self):
        cache_key = "items:all"
        cached_items = self.cache.get(cache_key)
        if cached_items:
            print("Returning from Redis")
            return cached_items

        items = self.repo.get_all()

        # Convert SQLAlchemy objects to dict
        result = [
            {
                "id": item.id,
                "item_name": item.item_name,
                "category": item.category,
                "img_url": item.img_url
            }
            for item in items
        ]

        self.cache.set(cache_key, result, expire=120)
        print("Returning from PostgreSQL")
        return result
    
    def delete_item(self, item_id):
        self.repo.delete(item_id)
        self.cache.delete("items:all")
    def create_item(self, item_name: str, category: str, img_url: str):
        item = self.repo.create(item_name, category, img_url)
        self.cache.delete("items:all")
        return item
        