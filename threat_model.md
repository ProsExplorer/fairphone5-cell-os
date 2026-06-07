# Threat Model

## Project Overview

Cell OS is a pnpm monorepo that deploys two production artifacts: a React + Vite single-page app at `/` (`artifacts/cell-os`) and an Express 5 API at `/api` (`artifacts/api-server`). The frontend is a content-heavy concept explorer with static, repo-stored data; the backend currently exposes only a health check and does not implement authentication, business workflows, or database-backed CRUD despite shared database and API-client scaffolding existing in the repository.

Production assumptions for future scans:
- `NODE_ENV` is `production` in deployed services.
- Replit-managed TLS protects traffic in production.
- `artifacts/mockup-sandbox` is a development/design artifact and should be treated as out of scope unless it becomes production-routable.
- This repl is not currently deployed, but the production artifact definitions in `.replit-artifact/artifact.toml` are the authoritative source for reachability.

## Assets

- **Frontend integrity** — the static application bundle and its repo-stored content. Compromise would let an attacker deface the site, inject malicious script into visitors, or mislead users.
- **API availability and integrity** — the `/api` service currently exposes only health status, but any future API expansion will inherit its middleware and routing patterns.
- **Application secrets and infrastructure configuration** — environment variables such as `DATABASE_URL`, logging configuration, and any future API credentials.
- **Database access path** — `lib/db` initializes a live Postgres connection and schema access. It is not exercised by the current production API surface, but it becomes high-value immediately if new routes start using it.

## Trust Boundaries

- **Browser to static frontend** — all client code executes in an untrusted browser. Anything rendered from runtime-controlled input must be treated as attacker-controlled.
- **Browser to API (`/api`)** — requests crossing from the public internet into Express are untrusted. Any future API routes must validate input, enforce authorization where needed, and avoid leaking internals.
- **API to database** — the server process can connect directly to Postgres through `lib/db`. Any production route that starts using this path will create a high-impact injection and data-exposure boundary.
- **Build-time content to client bundle** — most site content is compiled from static TypeScript modules. This is lower risk than user-generated content, but any future runtime content ingestion changes the XSS profile materially.
- **Production vs dev-only artifacts** — `artifacts/mockup-sandbox` is a design-time preview surface and should not be analyzed as production-reachable unless artifact routing changes.

## Scan Anchors

- **Production entry points**: `artifacts/cell-os/src/main.tsx`, `artifacts/cell-os/src/App.tsx`, `artifacts/api-server/src/index.ts`, `artifacts/api-server/src/app.ts`, `artifacts/api-server/src/routes/`
- **Highest-risk code areas if the app expands**: `artifacts/api-server/src/routes/`, `lib/api-client-react/src/custom-fetch.ts`, `lib/db/src/`
- **Public surfaces**: `/` static SPA, `/philosophy`, `/substrate`, `/api/healthz`
- **Authenticated/admin surfaces**: none in current production code
- **Dev-only surfaces usually out of scope**: `artifacts/mockup-sandbox/**`

## Threat Categories

### Tampering

The main tampering risk today is client-side script injection through any future introduction of runtime-controlled content into the static React app. The current production site mostly renders hardcoded content, which keeps this risk low. If new content starts coming from query parameters, external APIs, CMS data, or user submissions, rendering paths such as dynamic HTML/style generation must remain constrained to trusted values and never accept unsanitized attacker-controlled markup or script.

Required guarantees:
- Production-rendered HTML and CSS derived from runtime input MUST not allow script execution.
- New API routes MUST validate request bodies, params, and query strings before use.
- Database queries MUST remain parameterized if the dormant database path becomes reachable.

### Information Disclosure

The current API surface is intentionally minimal, but the repository contains database and API-client scaffolding that could expose sensitive configuration or data if future routes are added without revisiting security posture. Logging currently redacts common credential-bearing headers, which is an important baseline. Error responses and future API handlers must avoid exposing stack traces, secrets, raw SQL errors, or internal infrastructure details.

Required guarantees:
- Secrets such as `DATABASE_URL` and future credentials MUST never be exposed to client bundles, logs, or API responses.
- API error responses MUST stay generic and MUST not leak stack traces or backend internals.
- Any future data-returning endpoints MUST return only the minimum fields needed by the client.

### Denial of Service

The present public API does very little work, so abuse impact is low today. The risk rises if the backend later adds database queries, file handling, or external fetches without request limits or timeouts. The threat model should therefore preserve a bias toward bounded request handling even though the current health endpoint is inexpensive.

Required guarantees:
- Future public endpoints MUST apply reasonable input size limits and execution bounds.
- Any future outbound network calls MUST use timeouts.
- New expensive unauthenticated operations MUST be reviewed for rate limiting before deployment.

### Elevation of Privilege

There are no authenticated or role-separated production surfaces today, so classic broken access control is not currently applicable. However, the Express server and shared API client provide a natural expansion point, and future routes will need explicit server-side authorization rather than relying on frontend assumptions.

Required guarantees:
- If authentication is introduced, every protected API route MUST enforce authorization server-side.
- No security decision may rely solely on client-side routing or UI state.
- Dev-only preview tooling MUST remain non-production-routable unless separately threat-modeled.
