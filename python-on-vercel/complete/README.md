# Python on Vercel: complete

> This is the finished app for **[Python on Vercel](https://vercel.com/academy/python-on-vercel)** on Vercel Academy. Use it to check your work as you go through the course.

## Run it locally

### Prerequisites

- **Backend (`backend/`):** Python 3.12 or later (from `requires-python` in `pyproject.toml`) and [uv](https://docs.astral.sh/uv/getting-started/installation/). `uv sync` can download Python 3.12 for you.
- **Frontend (`frontend/`):** Node.js 20.9 or later, the minimum for Next.js 16 (`package.json` doesn't pin a version), and npm. The folder has no lockfile, and the course uses npm.
- A Vercel account and the [Vercel CLI](https://vercel.com/docs/cli), for `vercel dev` and deploying

### Environment variables

None to set. `vercel.json` binds the `backend` service to the frontend, and `vercel dev` supplies its URL as `BACKEND_URL`. The storefront throws an error if `BACKEND_URL` is missing, so start it with `vercel dev` from this folder.

### Commands

Install each service, then start both with one command from this folder:

```bash
cd backend
uv sync --python 3.12
cd ../frontend
npm install
cd ..
vercel dev -L
```

`-L` runs the services locally without linking a Vercel project. Open the URL the CLI prints, normally http://localhost:3000. Requests to `/api` go to FastAPI, and everything else goes to Next.js.

## What's in here

- `backend/`: a FastAPI app in `main.py` that serves the Hazel Home furniture inventory at `/api/items`
- `frontend/`: a Next.js storefront in `app/page.tsx`
- `vercel.json`: the Services configuration that runs both apps together and routes `/api` to the backend
