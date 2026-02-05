# Mini Product API (Discovery Project)

This repo is a small learning project meant for discovering C# and .NET through a minimal API and a tiny React UI. It is not production-ready and intentionally keeps things simple.

## What’s inside
- `MiniProductApi/`: ASP.NET Core minimal API for products (in-memory store)
- `frontend/`: Vite + React UI for creating, editing, and listing products

## Quick start

### 1) Run the backend
```bash
cd MiniProductApi
dotnet run
```
The API listens on:
- `http://localhost:5159`
- `https://localhost:7084` (if HTTPS is enabled)

### 2) Run the frontend
```bash
cd frontend
npm install
npm run dev
```
The UI runs at `http://localhost:5173` and talks to the API at `http://localhost:5159` by default.

## Notes
- Data is stored in memory, so it resets when the API restarts.
- This repo is for exploration and learning, not for deployment.

## API endpoints
- `GET /products`
- `GET /products/{id}`
- `POST /products`
- `PUT /products/{id}`
- `DELETE /products/{id}`

