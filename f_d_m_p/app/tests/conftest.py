import os
from dotenv import load_dotenv
load_dotenv(".env.test", override=True) 
import pytest
from unittest.mock import AsyncMock, patch

@pytest.fixture(scope="session", autouse=True)
def mock_mongodb():
    # exact path: app/services/mongodb/user_login_services.py
    with patch(
        "app.services.mongodb.user_login_services.UserLogService.log_login",
        new_callable=AsyncMock,
        return_value="mock-session-id-123"
    ), patch(
        "app.services.mongodb.user_login_services.UserLogService.logout_session",
        new_callable=AsyncMock,
        return_value=None
    ), patch(
        "app.services.mongodb.user_login_services.UserLogService.list_all_user_logs",
        new_callable=AsyncMock,
        return_value=[]
    ):
        yield

from fastapi.testclient import TestClient
from sqlalchemy.orm import sessionmaker
from app.main import app
from app.db.postgres import get_db, Base, engine as app_engine
from app.core.config import settings

TestingSessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=app_engine
)

def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

@pytest.fixture(scope="session", autouse=True)
def setup_database():
    Base.metadata.create_all(bind=app_engine)
    yield
    Base.metadata.drop_all(bind=app_engine)

@pytest.fixture(autouse=True)
def clean_tables():
    yield
    with app_engine.connect() as conn:
        for table in reversed(Base.metadata.sorted_tables):
            conn.execute(table.delete())
        conn.commit()

@pytest.fixture
def client():
    return TestClient(app)

@pytest.fixture
def test_user(client):
    client.post("/api/add-user", json={
        "name": "Test User",
        "email": "test@example.com",
        "password": "StrongPass123!",
        "nic": "123456789V",
        "address": "123 Test Street",
        "phone": "0771234567",
        "role": "admin"
    })
    return {
        "email": "test@example.com",
        "password": "StrongPass123!"
    }