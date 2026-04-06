# Server

Express + TypeScript backend.

## Setup

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev` — Start dev server with nodemon + tsx (port 3000)
- `npm run build` — Compile TypeScript to `dist/`
- `npm start` — Run compiled JS from `dist/`

## Environment Variables

Create a `.env` file:

```
PORT=3000
NODE_ENV=development
```

## API Endpoints

| Method | Route        | Description          |
|--------|-------------|----------------------|
| GET    | /api/hello  | Returns hello message |

## Project Structure

```
server/
├── src/
│   └── index.ts    # Express app entry point
├── tsconfig.json
└── .env
```
