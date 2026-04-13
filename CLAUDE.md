# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Frontend
- **Dev server:** `npm run dev` (Vite, http://localhost:5173)
- **Build:** `npm run build` (runs `tsc -b && vite build`)
- **Lint:** `npm run lint` (ESLint)
- **Preview prod build:** `npm run preview`

### Backend
- **Run server:** `cd backend/server && python application.py` (Flask, port configured via `FLASK_RUN_PORT` env var)
- **DB migrations:** `cd backend/server && flask db migrate` / `flask db upgrade` (requires `FLASK_APP=application:application`)
- **Seed database:** `cd backend/server && python seed.py`
- **Install deps:** `cd backend && pipenv install` (Python 3.13)

### Environment
- Copy `env.example` to `.env` for frontend (contains `VITE_API_URL`, `VITE_BASE_URL`)
- Copy `backend/template.env` to `backend/server/.env.development` for local dev (contains `DB_URI`, `FLASK_ENV`, `FLASK_APP`, `FLASK_RUN_PORT`, `FLASK_DEBUG`, `API_URL`)
- Backend loads `.env.development` or `.env.production` based on `FLASK_ENV` value (defaults to `development`)

### Testing

<!-- TODO: No test framework or test files exist. Define testing strategy and add test commands here. -->

## Architecture

ParallaxUI is a visual editor for creating interactive 3D parallax effects that can be exported as embeddable iframes.

### Frontend (React 18 + TypeScript + Vite)
- **Styling:** Tailwind CSS v4 with shadcn/ui (New York style, oklch color space)
- **Forms:** React Hook Form + Zod validation
- **Routing:** react-router-dom v7 — `/` is the editor, `/embed/:id` is the public preview
- **State:** All editor state lives in `App.tsx` via useState (elements array, canvas/container sizes)
- **Parallax rendering:** `react-parallax-tilt` library with CSS `translateZ()` for depth
- **Linting rules:** ESLint enforces semicolons (`'semi': ['error', 'always']`); TypeScript strict mode with `noUnusedLocals` and `noUnusedParameters`

### Backend (Flask + PostgreSQL)
- **API:** Two endpoints — `POST /designs` (save) and `GET /designs/<id>` (retrieve). Also `GET /` health check.
- **Model:** Single `Design` model with a `data` JSON column storing the full element tree
- **Flask app variable:** Named `application` (not `app`) — set `FLASK_APP=application:application` for flask CLI commands
- **Deployment:** Render for backend (see `render.yaml`); Vercel for frontend
- **Vercel proxy:** `vercel.json` rewrites `/designs/*` to the Render backend; also has SPA catch-all rewrite
- **Render PostgreSQL:** `application.py` auto-converts Render's `postgres://` URI to `postgresql+psycopg2://` for SQLAlchemy compatibility

### Key data flow
1. User builds a design in the editor (App.tsx manages element state)
2. Export sends element/canvas data to `POST /designs`, receives back an embed URL
3. The embed URL uses `VITE_BASE_URL` env var (falls back to `http://parallaxui.com`)
4. `/embed/:id` route (Preview.tsx) fetches the design and renders it via TiltBox

### Component roles
- `TiltBox` — core parallax renderer, used in both editor and embed preview
- `ElementForm` — per-element property editor (position X/Y/Z, dimensions W/H, color via SketchPicker)
- `PropertiesPanel` — right sidebar wrapping ElementForm and ExportModal
- `ElementsPanel` — narrow left sidebar for layer management (renders element swatches inline)
- `CanvasForm` — initial fullscreen form to set canvas width/height before entering the editor
- `ExportModal` — dialog that displays the generated iframe embed code (receives `embedCode` as a prop)

### Path aliases
`@/` maps to `src/` (configured in both `tsconfig.app.json` and `vite.config.ts`)

## Deployment

- **Frontend (Vercel):** Auto-deploys from GitHub. Env vars (`VITE_API_URL`, `VITE_BASE_URL`) set in Vercel dashboard. `vercel.json` proxies `/designs/*` to the Render backend.
- **Backend (Render):** Configured via `render.yaml` (Render Blueprint). Build runs `pip install` + `flask db upgrade`. Start runs `gunicorn application:application`. Env vars (`DB_URI`, `SECRET_KEY`, `API_URL`, `FLASK_ENV`) set in Render dashboard. Database hosted on Neon (free tier PostgreSQL).

## Database Setup

- **Local dev:** SQLite (`DB_URI=sqlite:///test.db` in `.env.development`) — no setup needed
- **Production:** Neon PostgreSQL (free tier). Connection string set as `DB_URI` env var in Render dashboard.
- **Migrations:** Alembic via Flask-Migrate. Files in `backend/server/migrations/versions/`.
