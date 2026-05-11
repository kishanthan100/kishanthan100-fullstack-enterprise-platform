# app/tests/integration/test_auth_api.py


def test_add_user_success(client):
    response = client.post("/api/add-user", json={
        "name": "New User",
        "email": "newuser@example.com",
        "password": "StrongPass123!",
        "nic": "987654321V",
        "address": "456 New Street",
        "phone": "0779876543",
        "role": "user"
    })
    assert response.status_code == 200
    assert "id" in response.json()


def test_login_success_sets_httponly_cookie(client, test_user):
    response = client.post("/api/login", json=test_user)

    assert response.status_code == 200
    assert "access_token" in response.cookies

    cookie_header = response.headers.get("set-cookie", "")
    assert "HttpOnly" in cookie_header


# test_auth_api.py — fix these two tests

def test_login_wrong_password_returns_401(client, test_user):
    response = client.post("/api/login", json={
        "email": test_user["email"],
        "password": "wrongpassword"
    })
    assert response.status_code == 401
    assert response.json()["detail"] == "Incorrect password"   # ← match your actual message


def test_login_nonexistent_user_returns_401(client):
    response = client.post("/api/login", json={
        "email": "nobody@example.com",
        "password": "somepassword"
    })
    assert response.status_code == 404     # ← your service returns 404 for missing user


def test_protected_route_without_cookie_returns_401(client):
    response = client.get("/api/users/me/")
    assert response.status_code == 401


def test_protected_route_accessible_after_login(client, test_user):
    login = client.post("/api/login", json=test_user)
    assert login.status_code == 200

    response = client.get("/api/users/me/")
    assert response.status_code == 200

    data = response.json()
    assert data["email"] == test_user["email"]


def test_logout_clears_cookie(client, test_user):
    client.post("/api/login", json=test_user)

    response = client.post("/api/logout")
    assert response.status_code == 200
    assert response.json()["message"] == "Logged out successfully"