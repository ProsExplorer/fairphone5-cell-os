# Cell OS

An interactive concept explainer for "Cell OS" — a visionary operating system for the Fairphone 5 that frames the phone as a living human cell, mapping each cell organelle to an OS feature.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/cell-os/` — the Cell OS concept explainer web app (React + Vite, frontend-only, served at `/`)
- `artifacts/cell-os/src/data.ts` — source of truth for the 15 cell-to-OS-feature mappings
- `artifacts/cell-os/src/components/CellDiagram.tsx` — the interactive SVG cell diagram
- `artifacts/cell-os/src/pages/home.tsx` — the single-page layout (hero, diagram, reference grid, Fairphone values)
- `artifacts/cell-os/src/index.css` — theme tokens (bioluminescent palette)

## Architecture decisions

- Frontend-only concept site: no backend, database, or API hooks. All content is static in `data.ts`.
- The cell diagram is hand-built SVG with filters/animation rather than a generated image, so organelles are individually focusable and interactive.

## Product

A single scroll-through page that introduces the Cell OS concept, lets visitors explore an animated cell where each organelle reveals the OS feature it represents, shows a full reference of all 15 mappings, and ties the metaphor to Fairphone 5's real values (modularity, privacy, sustainability).

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
