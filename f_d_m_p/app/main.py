from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.endpoints.items import items_route
from app.api.endpoints.auth_route import router as auth_router
from app.api.endpoints.user import user_route
from app.db.postgres import engine, Base

app= FastAPI(
    title="FastAPI with Postgres",
    description="A simple FastAPI application with PostgreSQL database",
    version="1.0.0"
)

origins = [
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


Base.metadata.create_all(bind=engine)
app.include_router(auth_router,prefix="/api")
app.include_router(user_route.router,prefix="/api")
app.include_router(items_route.router,prefix="/api")