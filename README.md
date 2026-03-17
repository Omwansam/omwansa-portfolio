# Omwansa Portfolio (Full-Stack)

A full-stack personal portfolio built with **React (Vite)** on the frontend and **Flask + SQLAlchemy** on the backend.  
It supports dynamic content (projects, skills, experience, education, blog posts) powered by a PostgreSQL database, plus an admin area for managing content.

## Features

- **Public site**: Home, About, Projects, Skills, Experience, Education, Blog, Contact
- **Backend API** (REST): Projects, Skills, Experience, Education, Blog, Contact, Portfolio stats
- **Admin** (JWT auth): manage portfolio content (projects/skills/education/experience/blog/contacts)
- **PostgreSQL** database (local or containerized)
- **Dockerized** frontend + backend + database via Docker Compose

## Tech Stack

- **Frontend**: React 18, Vite, React Router, Tailwind CSS
- **Backend**: Flask, Flask-Migrate (Alembic), Flask-JWT-Extended, Flask-Mail, SQLAlchemy
- **Database**: PostgreSQL
- **Deployment style**: Nginx serving SPA, Gunicorn serving Flask API

## Repository Structure

```text
.
├── BACKEND/
│   ├── Dockerfile
│   ├── requirements.txt
│   └── server/
│       ├── app.py
│       ├── config.py
│       ├── models.py
│       ├── routes/
│       ├── migrations/
│       ├── seed.py
│       ├── seed_projects.py
│       └── seed_education.py
├── client/
│   └── my-portfolio/
│       ├── Dockerfile
│       ├── nginx.conf
│       └── src/
└── docker-compose.yml
```

## Prerequisites

- **Node.js** >= 18 (recommended: 20)
- **Python** (local dev): 3.8+ (project currently uses Pipenv with Python 3.8)
- **PostgreSQL** (local) or **Docker** (recommended)
- Optional: **Pipenv** for backend local dev

## Quick Start (Docker Compose — Recommended)

From the repo root:

```bash
docker compose up --build
```

Services/ports:

- **Frontend**: `http://localhost:8080`
- **Backend API**: `http://localhost:5000`
- **Health check**: `http://localhost:5000/health`
- **Postgres (host)**: `localhost:5433` (inside Compose it’s `db:5432`)

To stop:

```bash
docker compose down
```

To remove DB data too:

```bash
docker compose down -v
```

## Local Development (without Docker)

### 1) Backend (Flask)

Go to backend:

```bash
cd BACKEND
```

Install deps (Pipenv):

```bash
pipenv sync
```

Run migrations (see “Migrations” below), then start the server:

```bash
cd server
pipenv run flask --app server.app run --host 0.0.0.0 --port 5000
```

### 2) Frontend (Vite)

Go to the Vite app:

```bash
cd client/my-portfolio
npm install
npm run dev
```

By default Vite runs on `http://localhost:5173`.

## Environment Variables

Backend reads environment variables in `BACKEND/server/.env` (see `BACKEND/server/env.example`).

Common vars:

- **`DATABASE_URL`**: PostgreSQL URL (URL-encode special characters in the password)
- **`SECRET_KEY`**
- **`JWT_SECRET_KEY`**
- Mail settings: `MAIL_SERVER`, `MAIL_PORT`, `MAIL_USE_TLS`, `MAIL_USERNAME`, `MAIL_PASSWORD`, etc.

Example:

```env
DATABASE_URL=postgresql://arnold:Falcon%407ham@localhost:5433/portfolio
SECRET_KEY=change-me
JWT_SECRET_KEY=change-me
```

Frontend API base URL is configured via Vite env (build-time in Docker):

- `VITE_API_BASE_URL` (example: `http://localhost:5000`)

## Migrations (Flask-Migrate / Alembic)

Migrations live in `BACKEND/server/migrations`.

Run upgrades:

```bash
cd BACKEND/server
pipenv run flask --app server.app db upgrade
```

If you changed models and need a new migration:

```bash
cd BACKEND/server
pipenv run flask --app server.app db migrate -m "describe change"
pipenv run flask --app server.app db upgrade
```

## Seeding the Database

Seed scripts are in `BACKEND/server/`.

### Safe seed (adds data, doesn’t drop everything)

Add extra projects (skips duplicates by title):

```bash
cd BACKEND/server
pipenv run python seed_projects.py
```

Seed education table (clears only education rows first):

```bash
cd BACKEND/server
pipenv run python seed_education.py
```

### Full reset seed (destructive)

This drops and recreates all tables via SQLAlchemy:

```bash
cd BACKEND/server
pipenv run python seed.py
```

## Troubleshooting

- **`npm run dev` says “Missing script: dev”**  
  You ran it in the wrong folder. The Vite app is `client/my-portfolio/`.

- **`ModuleNotFoundError: flask_cors`**  
  Install backend deps: `cd BACKEND && pipenv sync` (or use a venv + `pip install -r requirements.txt`).

- **Migrations fail with `DuplicateTable`**  
  This happens if tables were created outside Alembic. Prefer `flask db upgrade` for schema creation.

- **CORS / API not reachable**  
  Confirm backend is running: `http://localhost:5000/health`.  
  Confirm frontend points to the correct base URL (`VITE_API_BASE_URL` / `API_CONFIG`).

## Useful Commands

Frontend:

```bash
cd client/my-portfolio
npm run dev
npm run build
```

Backend:

```bash
cd BACKEND/server
pipenv run flask --app server.app run
pipenv run flask --app server.app db upgrade
```

Docker:

```bash
docker compose up --build
docker compose down
```

## License

See `LICENSE`.
