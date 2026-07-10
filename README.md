# Study Habit Analyzer

A full-stack application for tracking and analyzing study habits.

## Tech Stack

**Frontend:** React 19, Vite, TypeScript, Tailwind CSS, shadcn/ui, Recharts
**Backend:** Node.js, Express, TypeScript
**Database:** MongoDB Atlas (Mongoose)
**Deployment:** Frontend → Vercel · Backend → Render

## Project Structure

This is **not** a monorepo. `frontend/` and `backend/` are independent
Node.js projects, each with their own `package.json`, dependencies, and
lockfile. They are developed, installed, and deployed separately.

```
study-habit-analyzer/
├── frontend/                # React + Vite + TypeScript app (deployed to Vercel)
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/      # shadcn/ui + custom components
│   │   ├── hooks/
│   │   ├── lib/             # cn() utility, shared helpers
│   │   ├── pages/
│   │   ├── services/        # API client layer
│   │   ├── types/
│   │   ├── App.tsx
│   │   ├── index.css
│   │   └── main.tsx
│   ├── components.json      # shadcn/ui config
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   ├── tsconfig.app.json
│   ├── tsconfig.node.json
│   ├── vercel.json
│   └── vite.config.ts
│
├── backend/                  # Express + TypeScript API (deployed to Render)
│   ├── src/
│   │   ├── config/           # DB connection, env validation
│   │   ├── controllers/
│   │   ├── middleware/       # auth, error handling, rate limiting
│   │   ├── models/           # Mongoose schemas
│   │   ├── routes/
│   │   ├── services/
│   │   ├── types/
│   │   ├── utils/
│   │   └── server.ts
│   ├── nodemon.json
│   ├── package.json
│   ├── render.yaml
│   └── tsconfig.json
│
└── README.md
```

## Prerequisites

- Node.js >= 20
- npm >= 10
- A MongoDB Atlas cluster and connection string

## Getting Started

### Backend

```bash
cd backend
cp .env.example .env   # fill in MONGODB_URI, JWT_SECRET, etc.
npm install
npm run dev             # starts on http://localhost:5000
```

### Frontend

```bash
cd frontend
cp .env.example .env    # set VITE_API_BASE_URL
npm install
npm run dev              # starts on http://localhost:5173
```

## Deployment

### Backend → Render

- Root directory: `backend`
- Build command: `npm install && npm run build`
- Start command: `npm start`
- Set environment variables from `backend/.env.example` in the Render dashboard.
- `backend/render.yaml` is provided for Render Blueprint deployments.

### Frontend → Vercel

- Root directory: `frontend`
- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Set `VITE_API_BASE_URL` to the deployed Render backend URL in the Vercel dashboard.

## Status

Project scaffolding only — application code has not been implemented yet.
