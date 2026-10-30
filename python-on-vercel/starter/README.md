# Python on Vercel: starter

> This is the starter for **[Python on Vercel](https://vercel.com/academy/python-on-vercel)** on Vercel Academy. Start at [lesson 1.2, Tour the FastAPI Starter](https://vercel.com/academy/python-on-vercel/explore-fastapi-starter), right after lesson 1.1 installs the Vercel CLI.

## Run it locally

### Prerequisites

- **Backend (`backend/`):** Python 3.12 or later (from `requires-python` in `pyproject.toml`) and [uv](https://docs.astral.sh/uv/getting-started/installation/). `uv sync` can download Python 3.12 for you.
- **Frontend (`frontend/`):** Node.js 20.9 or later, the minimum for Next.js 16 (`package.json` doesn't pin a version), and npm. The folder has no lockfile, and the course uses npm.
- A Vercel account and the [Vercel CLI](https://vercel.com/docs/cli), for `vercel dev` and deploying

### Environment variables

None to set. In Section 2 you add a `vercel.json` here, and `vercel dev` then hands the frontend a `BACKEND_URL` through a service binding. It doesn't go in an `.env` file.

### Commands

Run each service in its own terminal, starting from this folder.

**Backend:**

```bash
cd backend
uv sync --python 3.12
uv run fastapi dev main.py
```

The inventory is at http://localhost:8000/api/items, and FastAPI's interactive docs are at http://localhost:8000/docs.

**Frontend:**

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:3000. The storefront shows mock data until Section 2 connects it to the backend.

## What's in here

- `backend/`: a FastAPI app in `main.py` that serves the Hazel Home furniture inventory at `/api/items`
- `frontend/`: a Next.js storefront in `app/page.tsx`
