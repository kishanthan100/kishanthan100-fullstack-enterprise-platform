# tests/unit/test_auth_service.py
from app.core.security import get_password_hash, verify_password, create_access_token

def test_password_hash_is_not_plaintext():
    hashed = get_password_hash("mypassword")
    assert hashed != "mypassword"

def test_correct_password_verifies():
    hashed = get_password_hash("mypassword")
    assert verify_password("mypassword", hashed) is True

def test_wrong_password_fails():
    hashed = get_password_hash("mypassword")
    assert verify_password("wrongpassword", hashed) is False

def test_jwt_token_created():
    token = create_access_token({"sub": "user-123"})
    assert token is not None
    assert isinstance(token, str)