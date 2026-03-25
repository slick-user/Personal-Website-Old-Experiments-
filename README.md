# Portfolio Website

A portfolio site built as a single **Ruby on Rails** app (ERB views, Hotwire/Stimulus, Tailwind CSS). Portfolio content lives in `backend/config/initializers/portfolio_data.rb`.

## Project structure

```
.
├── backend/           # Rails app (server-rendered UI + assets)
├── Procfile.dev      # Foreman: Rails + Tailwind watcher
└── start-dev.ps1     # Windows: same processes in separate windows
```

## Setup

local DB settings live in **`config/database.yml`**

1. `cd backend` and `bundle install`.
2. Create the databases and run migrations (Rails reads names from `database.yml`):
   ```bash
   bin/rails db:create
   bin/rails db:migrate
   ```
   Or in one step: `bin/rails db:prepare`.
3. **Windows:** If Postgres rejects the connection, add under `development` in `database.yml` the `username` / `password` lines shown in the comments there (or set `POSTGRES_PASSWORD` for **test** only if you run tests with a passworded role).

## Development

From `backend`:

```bash
bin/dev
```

Or from the repo root on Windows: `.\start-dev.ps1` or `start-dev.bat`.

Open **http://localhost:3000** (Rails + Tailwind watch).

## Production

```bash
cd backend
bin/rails assets:precompile
RAILS_ENV=production bin/rails server
```

## Tech stack

- Ruby on Rails 8.1, PostgreSQL  
- Turbo, Stimulus, importmap  
- Tailwind CSS (tailwindcss-rails)
