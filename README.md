# Panther: Customer & Matter Management

A full-stack application for managing customers and their matters, with authentication and a modern UI.

## Tech Stack
- Ruby 3.4.4
- Rails 8.0.2
- PostgreSQL 17.5
- Node 24.1.0
- React 18.2.0 (Vite, TypeScript, TailwindCSS)

---

## Prerequisites
- [Homebrew](https://brew.sh/) (for macOS)
- [PostgreSQL 17](https://www.postgresql.org/download/)
- [Node.js 24+](https://nodejs.org/en/download)
- [npm](https://www.npmjs.com/)
- [Ruby 3.4.4](https://www.ruby-lang.org/en/downloads/)
- [Bundler](https://bundler.io/)

---

## Backend Setup (Rails API)

1. **Install PostgreSQL 17**
   ```sh
   brew install postgresql@17
   brew services start postgresql@17
   ```
   Ensure the correct version is running:
   ```sh
   psql --version
   # Should output: psql (PostgreSQL) 17.x
   ```

2. **Install Ruby dependencies**
   ```sh
   gem install bundler
   bundle install
   ```

3. **Database setup**
   ```sh
   rails db:{create,migrate}
   ```

4. **Environment variables**
   - Copy `.env.example` to `.env` and fill in any required secrets (e.g., JWT secret, database credentials if needed).

5. **Run the Rails server**
   ```sh
   rails s
   # By default runs on http://localhost:3000
   ```

---

## Frontend Setup (React)

1. **Install Node dependencies**
   ```sh
   cd frontend
   npm i
   ```
   If you see errors about Node version, ensure you are using Node 18+ (ideally 24.x):
   ```sh
   node --version
   # Should output: v24.x.x, otherwise you can run:
   nvm install 24.1.0
   nvm use 24.1.0
   ```

2. **Start the frontend dev server**
   ```sh
   npm run dev
   # By default runs on http://localhost:3001
   ```

---

## Authentication API Endpoints

- `POST /api/auth/signup` — Create a new user (email, password, firm name)
- `POST /api/auth/login` — Login and receive JWT token
- `GET /api/auth/me` — Return authenticated user info (JWT required in Authorization header)

---

## Running Tests

- **Backend (RSpec):**
  ```sh
  bundle exec rspec
  ```
- **Frontend (Jest):**
  ```sh
  cd frontend
  npm test
  ```

---

## Troubleshooting
- **PostgreSQL connection errors:**
  - Ensure PostgreSQL 17 is running: `brew services list`
  - If you have multiple versions, specify the correct one: `brew services start postgresql@17`
- **Node version errors:**
  - Use [nvm](https://github.com/nvm-sh/nvm) or [fnm](https://github.com/Schniz/fnm) to manage Node versions.
- **CORS issues:**
  - The backend is configured to allow requests from `http://localhost:3001`.

---

## Next Steps
- Implement customer and matter CRUD endpoints and UI.
- Expand API documentation.
- Add more tests and CI setup.

---

For any issues, please open an issue or contact the maintainer.