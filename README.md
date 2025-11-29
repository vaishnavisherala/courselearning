# Udemy Clone
This repository contains a starter full-stack scaffold for a Udemy-style learning platform.
## What is included
- Frontend: React + TypeScript (Vite) with basic pages (Home, Course Detail, Instructor Dashboard)
- Backend: Node.js + TypeScript + Express + Prisma (SQLite for local dev) with basic auth and course APIs
- Prisma schema and SQLite dev database (prisma/dev.db will be created when running migrations)
## How to run locally
### Prerequisites
- Node.js 18+
- npm
- (optional) Docker for Postgres if you want to switch
### Backend
```
cd backend
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```
API will run on http://localhost:4000
### Frontend
```
cd frontend
npm install
npm run dev
```
Frontend dev server typically runs at http://localhost:5173 and proxies API calls to /api (configure proxy in Vite if needed).
## Notes
- This scaffold uses SQLite for local simplicity. For production use Postgres and update prisma schema datasource.
- Video upload/presign/transcoding pipelines are described in the project docs; this scaffold includes placeholders and basic videoUrl fields.
- Extend auth, RBAC, payments (Stripe), and CDN/S3 integrations for production.
