# ParallaxUI — Pre-Work Checklist

A living document. Consult before starting new features, major changes, or diverging
from documentation. Update items as tasks are completed.

---

## Migration: AWS EB to Render

- [x] Rotate exposed RDS password (RDS instance deleted — no longer active)
- [x] Generate new Flask SECRET_KEY for Render (auto-generated via `render.yaml`)
- [x] Delete all `.ebextensions/` configs
- [x] Delete `.elasticbeanstalk/`, `.ebignore`, `runtime.txt`
- [x] Remove EB lines from `backend/.gitignore`
- [x] Remove `awsebcli` from Pipfile and requirements.txt
- [x] Update Pipfile Python version from 3.9 to 3.13
- [x] Clean transitive deps out of Pipfile (only keep direct deps)
- [x] Add `gunicorn` to dependencies
- [x] Regenerate `requirements.txt`
- [x] Create `render.yaml` (web service + Starter PostgreSQL)
- [x] Add `postgres://` to `postgresql://` fix in `application.py`
- [x] Update `vercel.json` proxy to point to Render backend URL
- [x] Make `production_base_url` in `App.tsx` use `VITE_BASE_URL` env var
- [x] Add `VITE_BASE_URL` to `env.example`
- [ ] Purge `setup.config` from git history (`git filter-repo`) after all commits
- [x] Remove unused npm deps: `fabric`, `uuid`, `react-element-to-jsx-string`, `@types/react-color`
- [x] Delete orphaned `ElementList.tsx` and `ElementItem.tsx`
- [x] Update `CLAUDE.md` to reflect Render, new Python version, removed files
- [x] Update `README.md` — remove MaterialUI/Ruby on Rails references, add accurate stack

---

## Before Starting a New Feature

- [ ] Read `CLAUDE.md` for current architecture and conventions
- [ ] Verify local env files exist:
  - `.env` in project root (copy from `env.example` if missing)
  - `backend/server/.env.development` (copy from `backend/template.env` if missing)
- [ ] Frontend starts: `npm run dev`
- [ ] Backend starts: `cd backend/server && python application.py`
- [ ] `npm run lint` passes with no pre-existing errors

---

## If Changing Backend (Flask API)

- [ ] New deps go in `backend/Pipfile` (direct deps only), then:
  `cd backend && pipenv lock && pipenv requirements > requirements.txt`
- [ ] Schema changes need a migration:
  `cd backend/server && flask db migrate -m "description" && flask db upgrade`
  (requires `FLASK_APP=application:application` in env)
- [ ] Test locally with SQLite (`DB_URI=sqlite:///test.db`)
- [ ] If adding/changing routes, update API section in `CLAUDE.md`
- [ ] Check that `render.yaml` build/start commands still work

---

## If Changing Frontend (React/TypeScript)

- [ ] `npm run build` passes (strict mode: `noUnusedLocals`, `noUnusedParameters`)
- [ ] `npm run lint` passes (enforces semicolons)
- [ ] New shadcn/ui components: `npx shadcn@latest add <component>`
- [ ] New routes go in `src/main.tsx` (react-router-dom v7)
- [ ] New env vars must be prefixed `VITE_` and added to `env.example`
- [ ] Use `@/` path alias for imports (maps to `src/`)

---

## If Changing Deployment or Infrastructure

- [ ] Frontend: Vercel — check `vercel.json` rewrites match backend routes
- [ ] Backend: Render — check `render.yaml` is accurate
- [ ] If backend URL changes, update `vercel.json` proxy destination
- [ ] Env vars: Vercel dashboard (frontend), Render dashboard (backend) — never commit secrets
- [ ] `VITE_BASE_URL` controls embed iframe domain — update in Vercel if domain changes

---

## If Changing Database Schema

- [ ] Create migration: `cd backend/server && flask db migrate -m "description"`
- [ ] Review generated file in `backend/server/migrations/versions/`
- [ ] Apply: `flask db upgrade`
- [ ] Test rollback: `flask db downgrade`
- [ ] On Render, migrations run via build command in `render.yaml`

---

## Before Opening a PR

- [ ] `npm run lint` passes
- [ ] `npm run build` succeeds
- [ ] Backend starts without errors
- [ ] Frontend connects to backend (test export or design fetch)
- [ ] No secrets, `.env` files, or credentials in the diff
- [ ] `CLAUDE.md` updated if architecture/commands/conventions changed
- [ ] `README.md` updated if setup instructions changed
- [ ] This checklist consulted and relevant items checked
