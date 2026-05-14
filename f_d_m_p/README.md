# Backend (f_d_m_p)

FastAPI + Gunicorn + Uvicorn application

## Development Setup

### Prerequisites

- Python 3.11+
- `uv` package manager

### Installation

```bash
uv sync
```

This installs all dependencies from `pyproject.toml` into `.venv/`

### Running Locally

```bash
uv run uvicorn app.main:app --reload
```

- Server runs on `http://localhost:8000`
- Hot reload enabled
- API docs: `http://localhost:8000/docs`

### Environment Variables

Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Fill in your values:
```dotenv
POSTGRES_URL=postgresql://...
MONGODB_URL=mongodb+srv://...
REDIS_URL=redis://:password@localhost:6379/0
SECRET_KEY=your-secret-key
...
```

## Dependencies

Managed with `uv`:

```bash
# Add a new package
uv add package-name

# Remove a package
uv remove package-name

# Sync environment
uv sync

# Run command in environment
uv run command
```

Current dependencies:
- `fastapi` - Web framework
- `uvicorn[standard]` - ASGI server with uvloop + httptools
- `gunicorn` - Process manager (production)
- `sqlalchemy` - ORM (if using)
- `pydantic` - Data validation
- `python-dotenv` - Env var loading

## Docker

### Build Image

```bash
docker build -t backend:test .
```

Uses multi-stage build:
- **Stage 1:** Python + uv syncs dependencies into `.venv/`
- **Stage 2:** Alpine Python copies `.venv/`, runs gunicorn + uvicorn workers

Final image: ~200-250MB

### Run Locally

```bash
docker run -p 8000:8000 --env-file .env backend:test
```

Visit `http://localhost:8000/docs`

## Production

### Worker Configuration

In `Dockerfile`, Gunicorn is configured with:
```bash
gunicorn app.main:app \
  --worker-class uvicorn.workers.UvicornWorker \
  --workers 3 \
  --bind 0.0.0.0:8000
```

Worker count: `(2 × CPU cores) + 1`
- 1 CPU → 3 workers
- 2 CPU → 5 workers
- Adjust in Dockerfile as needed

### Environment Setup

Create `.env` file with production values:
```dotenv
POSTGRES_URL=postgresql://...
MONGODB_URL=mongodb+srv://...
REDIS_URL=redis://...
SECRET_KEY=generate-with-openssl-rand-hex-32
SECURE=True
ALLOWED_ORIGINS=https://yourdomain.com
...
```

## CI/CD

GitHub Actions workflow: `.github/workflows/backend.yml`

- Triggers on `f_d_m_p/**` changes
- Builds Docker image with uv + gunicorn + uvicorn
- Pushes to Docker Hub: `kisha406/backend:latest`
- Multi-platform: linux/amd64, linux/arm64

## Project Structure

```
f_d_m_p/
├── app/
│   ├── main.py          # Entry point
│   ├── core/            # Config, security
│   ├── api/             # Route handlers
│   ├── models/          # Pydantic models
│   ├── schemas/         # Request/response schemas
│   └── db/              # Database setup
├── Dockerfile
├── .dockerignore
├── pyproject.toml       # Dependencies
├── uv.lock              # Lock file (commit this)
└── README.md
```

## Database

### Postgres (Supabase)

Connection via `POSTGRES_URL` environment variable.

```python
from sqlalchemy import create_engine

engine = create_engine(settings.POSTGRES_URL)
```

### MongoDB (Atlas)

Connection via `MONGODB_URL` environment variable.

```python
from pymongo import MongoClient

client = MongoClient(settings.MONGODB_URL)
db = client[settings.MONGODB_DB_NAME]
```

## Caching (Redis)

```python
import redis

redis_client = redis.from_url(settings.REDIS_URL)
redis_client.set("key", "value", ex=3600)  # 1 hour expiry
```

## Authentication

JWT tokens set as HttpOnly cookies:

```python
response.set_cookie(
    key="access_token",
    value=token,
    httponly=True,
    secure=settings.SECURE,  # True in production
    samesite="lax",
)
```

## Testing

Tests are written with `pytest` and `pytest-asyncio` for async support.

### Running Tests

```bash
# Run all tests
uv run pytest

# Run with verbose output
uv run pytest -v

# Run specific test file
uv run pytest tests/test_auth.py

# Run specific test function
uv run pytest tests/test_auth.py::test_login

# Run with coverage report
uv run pytest --cov=app

# Run with coverage and HTML report
uv run pytest --cov=app --cov-report=html
# Open htmlcov/index.html in browser
```

### Test Structure

```
f_d_m_p/
├── app/
│   └── ...
├── tests/
│   ├── conftest.py              # Fixtures, setup
│   ├── test_api/
│   │   ├── test_auth.py
│   │   ├── test_users.py
│   │   └── test_items.py
│   ├── test_models/
│   │   └── test_schemas.py
│   └── test_db/
│       └── test_database.py
└── pytest.ini                   # Pytest config
```

### Writing Tests

Example with async FastAPI:

```python
# tests/test_api/test_auth.py
import pytest
from httpx import AsyncClient
from app.main import app

@pytest.mark.asyncio
async def test_login_success():
    async with AsyncClient(app=app, base_url="http://test") as client:
        response = await client.post(
            "/api/auth/login",
            json={"email": "user@example.com", "password": "password"}
        )
        assert response.status_code == 200
        assert "access_token" in response.json()

@pytest.mark.asyncio
async def test_login_invalid_password():
    async with AsyncClient(app=app, base_url="http://test") as client:
        response = await client.post(
            "/api/auth/login",
            json={"email": "user@example.com", "password": "wrong"}
        )
        assert response.status_code == 401
```

### Fixtures (conftest.py)

```python
# tests/conftest.py
import pytest
from httpx import AsyncClient
from app.main import app

@pytest.fixture
async def client():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        yield ac

@pytest.fixture
def sample_user():
    return {
        "email": "test@example.com",
        "password": "testpass123"
    }
```

### Coverage

View coverage report:
```bash
uv run pytest --cov=app --cov-report=html
open htmlcov/index.html
```

Target: 80%+ coverage for production code

### CI Integration

Tests should pass before deployment:
- `.github/workflows/backend.yml` can be extended to run `uv run pytest` before building image
- Fail the build if tests fail

### Test Dependencies

Ensure `pyproject.toml` has:
```toml
pytest = "^7.0"
pytest-asyncio = "^0.23"
httpx = "^0.25"  # for AsyncClient
pytest-cov = "^4.0"  # for coverage
```

Add with:
```bash
uv add --group dev pytest pytest-asyncio httpx pytest-cov
```

## API Documentation

Auto-generated by FastAPI:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Troubleshooting

### Import errors
```bash
uv sync
```

### Env var not loading
- Ensure `.env` file exists in project root
- Use `python-dotenv` to load: `from dotenv import load_dotenv; load_dotenv()`

### Database connection failing
- Check `POSTGRES_URL` and `MONGODB_URL` are correct
- Ensure IP is whitelisted in Supabase/Atlas

### Redis connection failing
- Check `REDIS_URL` format
- Ensure Redis is running (locally or hosted)

## Performance

### Uvloop + Httptools
Installed via `uvicorn[standard]` for ~2-3x faster request handling.

### Gunicorn Workers
Multiple workers handle concurrent requests without blocking.

### Async/Await
FastAPI supports async routes for better concurrency:

```python
@app.get("/items")
async def get_items():
    # Non-blocking I/O
    return await db.query_items()
```