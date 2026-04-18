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

1. Install PostgreSQL locally and ensure the service is running (default port **5432**).
2. `cd backend` and run `bundle install`.
3. **Local database only:** If you still have a hosted `DATABASE_URL` in your environment (for example in `.env` from Supabase or Neon), remove that line or comment it out. The app clears `DATABASE_URL` in development/test so `config/database.yml` is used (localhost, user `postgres`, no password by default). If your install requires a password, set `POSTGRES_PASSWORD` in `.env` or use Windows PostgreSQL defaults.
4. Create the database and schema:
   ```bash
   bin/rails db:prepare
   ```
5. Optional: add `public/popcat.png`, `public/popcatopen.png`, and `public/nuces.png` for the custom cursor and education logo.

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

## Customizing content

Edit `backend/config/initializers/portfolio_data.rb`, then restart the server.

## Tech stack

- Ruby on Rails 8.1, PostgreSQL  
- Turbo, Stimulus, importmap  
- Tailwind CSS (tailwindcss-rails)
