# Inventory Management System

A full-stack web application for managing small business inventory with role-based access control.

## Overview

This is a **modern, scalable inventory management platform** designed for small businesses to efficiently manage:

- **Users** - Create and manage team members with role-based access
- **Items** - Catalog and track products in inventory
- **Stocks** - Monitor stock levels, quantities, and warehouse locations
- **Customers** - Manage customer information and purchase history

### Key Features

- **Role-Based Access Control (RBAC)** - Different permissions for Admin, Manager, Staff roles
- **JWT Authentication** - Secure token-based authentication with HttpOnly cookies
- **Real-time Updates** - Live inventory tracking
- **Multi-Database** - PostgreSQL for relational data, MongoDB for flexible data storage
- **Caching** - Redis for performance optimization
- **RESTful API** - FastAPI with automatic documentation

## Tech Stack

### Frontend
- **React** - UI library
- **Vite** - Build tool (fast development)
- **Nginx** - Web server & reverse proxy

### Backend
- **FastAPI** - Modern Python web framework
- **Gunicorn + Uvicorn** - Production-ready workers
- **SQLAlchemy** - ORM for PostgreSQL
- **PyMongo** - MongoDB driver

### Databases
- **PostgreSQL** (Supabase) - User data, items, stocks, customers
- **MongoDB** (Atlas) - Audit logs, activity tracking
- **Redis** - Session caching, performance

### DevOps
- **Docker** - Containerization
- **GitHub Actions** - CI/CD pipeline
- **Docker Hub** - Image registry

## Features

### User Management
- Create/update users with different roles (Admin, Manager, Staff)
- JWT-based authentication
- Secure password hashing
- Session management with HttpOnly cookies

### Inventory Management
- Add, edit, delete items
- Track stock levels across locations
- Stock history and movements
- Low stock alerts

### Customer Management
- Customer profiles and contact info
- Purchase history
- Order tracking

### Access Control
- Admin - Full system access
- Manager - Inventory and customer management
- Staff - View-only or limited inventory access
- Fine-grained permissions per resource

### Audit & Logging
- Track user actions (who, what, when)
- Inventory movement history
- Stored in MongoDB for long-term analysis

## Getting Started

See [README.md](./README.md) for full setup instructions.

**Quick Start:**
```bash
# Frontend
cd frontend && npm install && npm run dev

# Backend
cd f_d_m_p && uv sync && uv run uvicorn app.main:app --reload
```

## Project Status

- ✅ Frontend & Backend CI/CD pipelines
- ✅ Multi-platform Docker builds
- ✅ Development environment setup
- 🔄 In development
- 📦 Ready for deployment

## Architecture
```
┌──────────────────────────────────────┐
│        React Frontend (Nginx)        │
│  - User Dashboard                    │
│  - Inventory Views                   │
│  - Role-Based UI                     │
└──────────────────┬───────────────────┘
│ HTTPS/HTTP
┌──────────────────▼───────────────────┐
│      FastAPI Backend (Gunicorn)      │
│  - User Management & Auth            │
│  - Inventory APIs                    │
│  - Customer APIs                     │
│  - RBAC Middleware                   │
└──────────────────┬───────────────────┘
│         │         │
┌────▼──┐  ┌───▼───┐  ┌─▼─────┐
│ Postgres│ │MongoDB│  │ Redis │
│(Users)  │ │(Logs) │  │(Cache)│
└─────────┘ └───────┘  └───────┘
```


## Deployment

- **Docker Compose** for local testing
- **GitHub Actions** for automated builds and pushes
- **Docker Hub** for image registry
- Ready to deploy on any VPS with Docker

## Contributing

1. Create feature branch
2. Push changes
3. GitHub Actions automatically builds and pushes images
4. Manual deployment to server
