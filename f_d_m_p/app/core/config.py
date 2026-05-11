from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    """Application settings."""

    POSTGRES_URL: str
    REDIS_URL: str
    MONGODB_URL: str
    MONGODB_DB_NAME: str
    SECRET_KEY: str
    ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int

    ALLOWED_ORIGINS: str
    SECURE: bool

    UNAME: str
    UEMAIL: str
    USERPASS: str
    ROLE: str

    

    class Config:
        env_file = ".env"
settings = Settings()