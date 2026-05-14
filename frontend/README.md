# Frontend

React + Vite + Nginx application

## Development Setup

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Running Locally

```bash
npm run dev
```

- Dev server runs on `http://localhost:5173`
- Hot reload enabled
- API calls proxied to `http://localhost:8000` via `vite.config.js`

### Building

```bash
npm run build
```

Output: `dist/` folder (serves via Nginx in Docker)

### Linting & Formatting

```bash
npm run lint
npm run format
```

## Docker

### Build Image

```bash
docker build -t frontend:test .
```

Uses multi-stage build:
- **Stage 1:** Node builds React, outputs to `dist/`
- **Stage 2:** Alpine Nginx serves `dist/` + proxies `/api/*` to backend

Final image: ~50-80MB

### Run Locally

```bash
docker run -p 8080:80 frontend:test
```

Visit `http://localhost:8080`

## Configuration

### `vite.config.js`

- Proxy config for local dev (not used in production)
- Build output: `dist/`

### `nginx.conf`

- Serves React from `/usr/share/nginx/html`
- Handles React Router (try_files fallback)
- Proxies `/api/*` to backend service (production)
- Caching headers for static assets
- Security headers

## API Integration

### Local Dev
Requests to `/api/*` are proxied via Vite to `http://localhost:8000` (vite.config.js)

### Production
Requests to `/api/*` are proxied via Nginx to `http://backend:8000` (nginx.conf, Docker network)

Backend URL is **never hardcoded** in frontend code — always use relative paths `/api/*`

## Environment Variables

No environment variables needed for frontend in Docker (image is self-contained).

For local dev, if needed:
```bash
VITE_API_URL=http://localhost:8000
```

## CI/CD

GitHub Actions workflow: `.github/workflows/frontend.yml`

- Triggers on `frontend/**` changes
- Builds Docker image with Node + React + Nginx
- Pushes to Docker Hub: `kisha406/frontend:latest`
- Multi-platform: linux/amd64, linux/arm64

## Project Structure

```
frontend/
├── src/
│   │── main.jsx
│   ├── app/
│       ├── App.jsx
│       ├── routes.jsx
│   ├── features/
│       ├── auth/
│       ├── customers/
│       ├── dashboard/
│       ├── items/
│       ├── stock/
│       ├── users/
│   ├── config/
│       ├── api.js
│       ├── axios.js
│   ├── layouts/
│       ├── MainLayout.jsx
│   ├── shared/
│       ├── components/
│            ├── NavBar.jsx
│            ├── SideBar.jsx
│            ├── ProtectedRoute.jsx
│            ├── Forbidden.jsx
├── public/
├── Dockerfile
├── nginx.conf
├── vite.config.js
├── package.json
└── README.md
```

## Troubleshooting

### Hot reload not working
- Ensure Vite is running in dev mode
- Check `vite.config.js` has server config

### API calls failing in Docker
- Ensure backend is running
- Check nginx.conf `proxy_pass` points to `http://backend:8000` (service name)
- In local dev, check Vite proxy in vite.config.js

### Build size large
- Check if `node_modules` is excluded from Docker image
- Run `npm run build` and check `dist/` size

## Testing

If you have tests:
```bash
npm run test
npm run test:coverage
```