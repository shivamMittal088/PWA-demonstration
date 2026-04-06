# Client

Vite + React + TypeScript frontend.

## Setup

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev` — Start Vite dev server (port 5173)
- `npm run build` — Compile TypeScript and build for production
- `npm run preview` — Preview production build

## Environment Variables

Create a `.env` file:

```
VITE_API_URL=http://localhost:3000/api
```

## Project Structure

```
client/
├── public/
│   └── sw.js            # Service Worker
├── src/
│   ├── main.tsx         # Entry point + SW registration
│   ├── App.tsx          # Root component
│   └── vite-env.d.ts    # Vite type definitions
├── index.html
├── vite.config.ts
└── tsconfig.json
```
