import json
from app.db.redis import redis_client


class CacheRepository:

    def get(self, key: str):
        data = redis_client.get(key)
        if data:
            return json.loads(data)
        return None

    def set(self, key: str, value, expire: int = 60):
        redis_client.set(key, json.dumps(value), ex=expire)

    def delete(self, key: str):
        redis_client.delete(key)