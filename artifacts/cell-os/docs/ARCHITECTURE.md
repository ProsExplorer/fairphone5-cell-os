# Cell OS — Architecture

> **Audience**: developers building on or extending the Cell OS codebase.  
> **Last updated**: June 2026

---

## The three-layer model

Cell OS has three conceptual layers that stack on top of each other. Every piece of UI draws from all three.

```
┌─────────────────────────────────────────────────────────┐
│  ZONE LAYER  (navigation + spatial theming)             │
│  8 zones: nucleus → cytoplasm → … → membrane            │
│  Source: CellShellProvider.tsx  (CELL_ZONES registry)   │
├─────────────────────────────────────────────────────────┤
│  ORGANELLE LAYER  (the biological metaphor)             │
│  15 granular structures, each → one OS feature          │
│  Source: domain/content/organelles.ts  (CELL_MAPPINGS)  │
├─────────────────────────────────────────────────────────┤
│  SUBSTRATE LAYER  (the real Fairphone 5 hardware)       │
│  Real chips, buses, software stacks with confidence tags│
│  Source: domain/content/substrate.ts  (SUBSTRATE_NODES) │
└─────────────────────────────────────────────────────────┘
```

Cross-links between organelles and substrate nodes are defined once in `domain/content/mappings.ts` and derived in both directions by `features/explorer/selectors.ts`.

---

## Directory structure

```
artifacts/cell-os/src/
├── App.tsx                    # Router root
├── domain/                    # Pure data — no React, no side effects
│   ├── types.ts               # All TypeScript contracts
│   └── content/               # Static content constants
├── features/
│   ├── cell-shell/            # Zone registry + vital state
│   └── explorer/              # All interactive explorer logic
│       ├── useExplorerFlow.ts # Core focus-state reducer
│       ├── selectors.ts       # Pure data lookups
│       ├── navigation/        # Layout, nav, viewport
│       ├── components/        # Shared display components
│       └── zones/             # One panel per zone
├── components/
│   ├── CellDiagram.tsx        # Interactive SVG organelle diagram
│   └── ui/                    # shadcn/ui (do not edit)
├── hooks/                     # Cross-cutting hooks
├── pages/                     # Route-level entry points
└── lib/                       # Utilities
```

---

## Routing

```
/              → pages/home.tsx → CellExplorerLayout (8-zone explorer)
/philosophy    → pages/philosophy.tsx (manifesto + triadic philosophy)
/substrate     → pages/substrate.tsx (full FP5 hardware reference)
```

Routing is handled by **wouter** with the `base` set to `import.meta.env.BASE_URL` (Vite). All route links must be relative.

---

## Data flow

```
domain/content/*.ts           (static content — arrays + objects)
        │
        ▼
features/explorer/selectors.ts  (pure functions — getOrganelle, getSubstrateForOrganelle, etc.)
        │
        ▼
features/explorer/useExplorerFlow.ts  (useReducer — focus state)
        │
        ▼
features/explorer/navigation/CellExplorerLayout.tsx  (root shell)
        │
        ├── CellMapNav          (ring navigator — reads useCellVitalStore)
        └── ZoneContentViewport (active zone panel)
                │
                └── <ZonePanel>  (e.g. CytoplasmPanel, NucleusPanel, …)
                        │
                        ├── CellDiagram  (SVG, fires hover/click events)
                        └── InfoPanel    (reads ExplorerView from parent)
```

---

## State model

### `useExplorerFlow` (local reducer — in `CellExplorerLayout`)

Manages which organelle or substrate node is "in focus". Lives at the layout root so focus persists when navigating between zones.

```typescript
type ExplorerState = {
  focus: { kind: "none" } | { kind: "organelle"; id: string } | { kind: "substrate"; id: string };
  locked: boolean;  // true = click-pinned; false = hover-preview
};
```

**Lock semantics**: when `locked=true`, hover events (including `mouseLeave`) are suppressed. This prevents the common bug where moving the cursor after clicking immediately wipes the selection. A second click on the same item releases the lock.

Actions:
- `HOVER_ORGANELLE(id | null)` — ignored when locked; null resets to none
- `TOGGLE_ORGANELLE(id)` — sets lock; second click on same id releases
- `TOGGLE_SUBSTRATE(id)` — same pattern for substrate nodes
- `CLEAR` — always resets

### `useCellVitalStore` (Zustand — global)

Tracks the "living" state of the cell for animations. All animated UI subscribes here.

```typescript
{
  activeZone: CellZoneId;           // drives ambient color + ring highlight
  breathCount: number;              // increments every 7770ms
  signals: Record<CellZoneId, Signal | undefined>; // timed pulse bursts
  setActiveZone(zone): void;
  emitSignal(zone, type, intensity, durationMs): void;
  clearExpiredSignals(): void;
}
```

`CellMapNav` calls `clearExpiredSignals` every 500ms via `setInterval`. Zone navigation calls `emitSignal` to briefly illuminate the navigated-to ring.

### `useExplorerNavigation` (local — in `CellExplorerLayout`)

Simple zone selection state. Tracks `activeZone` and exposes `selectZone`, `goInward`, `goOutward`.

Zone traversal order (innermost → outermost):
```
nucleus → cytoplasm → cytoskeleton → ribosomes → mitochondria → golgi → endoplasmic-reticulum → membrane
```

---

## Component tree (abbreviated)

```
App
└── Router (wouter)
    ├── / → Home
    │   └── CellExplorerLayout          ← root shell
    │       ├── <header>                ← breadcrumb + inward/outward nav
    │       ├── <mobile chip bar>       ← lg:hidden
    │       ├── <mobile ring navigator> ← lg:hidden, collapsible
    │       ├── CellMapNav              ← hidden lg:flex (desktop sidebar)
    │       └── ZoneContentViewport     ← key={activeZone} (remounts on zone change)
    │           └── <active zone panel>
    │               ├── CellDiagram (cytoplasm zone only)
    │               ├── InfoPanel
    │               ├── SubstrateAtlas
    │               ├── TriadicFlow
    │               └── …
    ├── /philosophy → Philosophy
    └── /substrate  → Substrate
```

---

## The `CellDiagram` SVG

- **ViewBox**: `0 0 1000 1000`, rendered at `max-w-[600px]` with `aspect-square`
- **15 organelle shapes**: each is an `<Organelle>` component wrapping a `<g role="button">` with `onMouseEnter`, `onMouseLeave`, `onClick`
- **ORGANELLE_ZONE_MAP**: maps each of the 15 organelle IDs to one of the 8 zone IDs — the canonical join between diagram and navigation
- **Biophoton overlay**: `<g aria-hidden="true">` with dashed `<line>` elements, rendered when an organelle with biophoton links is active
- **Float animation**: the outer `<div>` has `animate-float` (CSS `translateY` + slight rotation), creating a breathing effect. Hit areas follow the transform.

---

## CSS / styling rules

- **Tailwind v4** via `@import "tailwindcss"` in `index.css`
- **Custom keyframes** in `index.css`: `cell-ring-breathe`, `biophoton-travel`, `zone-signal-burst`, `sacred-seal-pulse`, `float`, `biophoton-pulse`
- **BANNED**: dynamic Tailwind class interpolation (`` `bg-${color}-500` ``). Tailwind v4 purges classes it cannot see at build time. Use `style={{ background: color }}` instead.
- **Harmonic constant**: all transition durations use `777ms` (or `0.777s`). Defined in `constants.ts`. Do not deviate.
- **Theme tokens**: CSS custom properties defined in `@layer base` inside `index.css` (dark background, bioluminescent accent palette).

---

## Adding a dependency

```bash
pnpm --filter @workspace/cell-os add <package>
```

Dev-only:
```bash
pnpm --filter @workspace/cell-os add -D <package>
```

---

## Key invariants

| Rule | Why |
|---|---|
| `useExplorerFlow` lives in `CellExplorerLayout`, not zone panels | Focus must persist when the user navigates between zones |
| `key={activeZone}` on `ZoneContentViewport`'s `<main>` | Resets scroll + local state on zone change — intentional |
| All content is a static TypeScript constant | No runtime fetching, no loading states, no hydration |
| Every factual claim has a `ClaimConfidence` tag | Distinguishes verified hardware facts from analogical assertions |
| SVG filter IDs are globally unique | DOM filter IDs are global; duplicates cause visual corruption |
