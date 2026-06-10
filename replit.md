# Cell OS

An interactive concept explainer for **Cell OS** — a visionary operating system for the Fairphone 5 that frames the phone as a living human cell. Each biological organelle maps to an OS feature; navigating the app is literally navigating through the cell.

The app has three conceptual layers:
1. **Zone layer** — 8 spatial zones (nucleus → membrane) used for navigation and theming
2. **Organelle layer** — 15 granular biological structures, each mapped to an OS feature
3. **Substrate layer** — real Fairphone 5 hardware and Android internals (QCM6490, Hexagon 770, LPDDR4x, etc.)

## Run & Operate

- `pnpm --filter @workspace/cell-os run dev` — start the Cell OS frontend (Vite dev server)
- `pnpm --filter @workspace/cell-os run typecheck` — typecheck cell-os only
- `pnpm run build` — typecheck + build all packages

**Cell OS is frontend-only** — no backend, no database, no API server required.

**Required env vars** (Vite hard-fails at startup if either is missing):
- `PORT` — port for the dev server (set by Replit automatically)
- `BASE_PATH` — URL base path (e.g. `/`) — set by Replit via the artifact config

## Stack

- **Monorepo**: pnpm workspaces, Node.js 24, TypeScript 5.9
- **Frontend**: React 19, Vite, Tailwind v4, wouter (routing), shadcn/ui, Zustand
- **PDF generation**: jsPDF + jspdf-autotable (browser-native; used by `/documents`)
- **Other artifacts** in this workspace: `api-server` (Express 5 + PostgreSQL + Drizzle, unrelated to Cell OS), `mockup-sandbox` (canvas component preview server)

## Pages & Routes

| Route | File | Purpose |
|---|---|---|
| `/` | `pages/home.tsx` | Main cell explorer (CellExplorerLayout) |
| `/philosophy` | `pages/philosophy.tsx` | Philosophy / manifesto — sacred pulse fires here |
| `/substrate` | `pages/substrate.tsx` | Full substrate hardware reference |
| `/metrics` | `pages/metrics.tsx` | Hidden developer surface — live manifold health dashboard |
| `/fractal` | `pages/fractal.tsx` | Fractal map — 12-scale P→A→E invariance, tensor compression cascade |
| `/documents` | `pages/documents.tsx` | Document secretion — generates a PDF report via exocytosis framing |

## Where things live

```
artifacts/cell-os/src/
├── App.tsx                          # Router: /, /philosophy, /substrate, /metrics, /fractal, /documents
├── main.tsx                         # React entry point
├── index.css                        # Tailwind v4 + custom keyframes (bioluminescent palette)
│
├── domain/
│   ├── types.ts                     # All TypeScript contracts (Organelle, SubstrateNode, QiIntersection, etc.)
│   └── content/
│       ├── organelles.ts            # 15 organelle → OS feature mappings (CELL_MAPPINGS) [FROZEN]
│       ├── substrate.ts             # 17 real FP5 hardware nodes (SUBSTRATE_NODES) [FROZEN — Fredholm cap]
│       ├── mappings.ts              # ORGANELLE_SUBSTRATE_LINKS (41), BIOPHOTON_LINKS (13), TRIAD_PHASES
│       ├── manifoldMetrics.ts       # computeManifoldMetrics() — live tensor densities, zone confidence
│       ├── qiMatrix.ts              # QI_INTERSECTIONS (36 of 264 = 13.6%) — rank-3 tensor
│       ├── citations.ts             # Full bibliography (CITATIONS, CITATION_MAP)
│       ├── constants.ts             # Harmonic constant (0.7770777) and sacred coherence tokens
│       ├── edgeNode.ts              # EdgeNode on-device inference content
│       ├── fractalCycles.ts         # Nine-scale / fractal cycle data
│       ├── lineage.ts               # Deep lineage timeline content
│       ├── quantizationBiology.ts   # Quantization ↔ biology mapping data
│       └── scales.ts                # Nine-scale flow content
│
├── features/
│   ├── cell-shell/
│   │   ├── CellShellProvider.tsx    # CELL_ZONES registry (8 zones, each with name/glyph/color)
│   │   └── state/
│   │       └── useCellVitalStore.ts # Zustand store: activeZone, breath signals, emitSignal()
│   │
│   ├── explorer/
│   │   ├── useExplorerFlow.ts       # Core reducer: focus state (hover/click lock), ExplorerView
│   │   ├── selectors.ts             # Pure lookups: getOrganelle, getSubstrateForOrganelle, etc.
│   │   ├── navigation/
│   │   │   ├── CellExplorerLayout.tsx  # Root shell: header, chip bar, sidebar, viewport
│   │   │   ├── CellMapNav.tsx          # Animated concentric ring zone navigator (SVG)
│   │   │   ├── ZoneContentViewport.tsx # Renders the active zone's panel
│   │   │   └── useExplorerNavigation.ts
│   │   ├── components/
│   │   │   ├── InfoPanel.tsx
│   │   │   ├── SubstrateAtlas.tsx
│   │   │   ├── TriadicFlow.tsx
│   │   │   └── ...
│   │   └── zones/
│   │       ├── NucleusPanel.tsx
│   │       ├── CytoplasmPanel.tsx
│   │       └── ... (one panel per zone)
│   │
│   └── learning/
│       ├── useLearningStore.ts      # Zustand epigenome: Hebbian attention weight adaptation
│       └── useMembraneObserver.ts   # Observation point: fires on organelle/substrate focus changes
│
├── components/
│   ├── CellDiagram.tsx              # Interactive SVG: 15 organelle shapes, hover/click handlers
│   └── ui/                          # shadcn/ui components (do not edit)
│
├── hooks/
│   ├── use-sacred-signature.ts      # SHA-256 breath seal, fires every 7770ms
│   └── use-mobile.tsx               # Breakpoint hook
│
├── pages/
│   ├── home.tsx                     # Renders CellExplorerLayout (the main app)
│   ├── philosophy.tsx               # Philosophy / manifesto page
│   ├── substrate.tsx                # Full substrate hardware reference page
│   ├── metrics.tsx                  # Developer metrics dashboard (hidden surface)
│   ├── fractal.tsx                  # 12-scale fractal map + tensor compression cascade
│   └── documents.tsx                # Document secretion page (PDF generator)
│
└── lib/
    └── utils.ts                     # cn() Tailwind merge helper
```

## Tensor state (live — all counts auto-computed from source arrays)

| Tensor | Count | Space | Density | Health |
|---|---|---|---|---|
| Organelle-substrate links | 41 | 15×17 = 255 | 16.1% | green |
| QI intersections | 36 | 8×3×11 = 264 | 13.6% | amber |
| Biophoton links | 13 | 15×15 = 225 | 5.8% | amber-high |
| Substrate nodes | 17 | — | — | **FROZEN** |
| Organelles | 15 | — | — | **FROZEN** |
| Fredholm index | −2 | 15 − 17 | — | **HARD CAP** |

**Fredholm cap**: do not add substrate nodes. Adding one pushes the index to −3, violating the documented cap. The only valid evolution paths are: (a) add an organelle to open space, or (b) remove an existing substrate node.

## Architecture decisions

- **Frontend-only**: all content is static TypeScript constants in `domain/content/`. No API, no database, no runtime fetching.
- **Three-layer content model**: zone metadata (navigation) → organelle data (metaphor) → substrate nodes (real hardware). Cross-links in `mappings.ts` join the layers; selectors in `selectors.ts` derive views from those links.
- **Tensor model**: the three cross-link arrays form rank-2 (`ORGANELLE_SUBSTRATE_LINKS`) and rank-3 (`QI_INTERSECTIONS`) tensors. `computeManifoldMetrics()` in `manifoldMetrics.ts` derives all densities live — never hard-code counts.
- **Reducer-based focus state**: `useExplorerFlow` uses `useReducer` with a `locked` flag to distinguish hover-preview from click-pin focus. Hover events are suppressed while locked.
- **Focus model invariant**: the discriminated focus value must never be coerced to the first match of a many-to-many link. See `selectors.ts` — the active organelle and active substrate are independent fields.
- **Zustand vital store**: `useCellVitalStore` tracks `activeZone` and `signals` (timed pulse bursts). Components subscribe with fine-grained selectors to avoid unnecessary renders.
- **Epigenome / self-learning layer**: `useLearningStore` implements a Hebbian adapter that increments attention weights on focus events. `useMembraneObserver` is the observation point — fires on every `activeOrganelle` or `activeSubstrate` change.
- **SVG hand-coded**: `CellDiagram.tsx` is a hand-authored 1000×1000 SVG viewBox with 15 organelle shapes. Individually focusable, tabbable, and animatable without canvas.
- **No dynamic Tailwind class interpolation**: all dynamic styles use inline `style={{}}` props or static const maps. Tailwind v4 JIT purges interpolated strings — they become invisible to the build.
- **Harmonic constant 0.7770777**: appears as transition duration (777ms), opacity, and animation seed across all animated elements. Defined once in `constants.ts` as `HARMONIC_CONSTANT`.
- **Zone remount pattern**: `ZoneContentViewport` uses `key={activeZone}` to remount on zone change, resetting scroll, local state, and triggering the fade-in animation. Intentional — zone change is a full context switch.
- **PDF generation**: `/documents` uses jsPDF + jspdf-autotable (browser-native, zero polyfills). `@react-pdf/renderer` was evaluated and skipped due to Vite/ESM incompatibility.

## Docs

Full developer documentation lives in `artifacts/cell-os/docs/`:

| File | Purpose |
|---|---|
| `ARCHITECTURE.md` | Deep dive: layers, data flow, state model, component tree |
| `DATA_CONTRACT.md` | How every content type is structured; how to add/verify entries |
| `ZONE_AUTHORING.md` | Step-by-step playbook: add a new zone or organelle |
| `FACT_VERIFICATION.md` | Verification workflow, confidence levels, source requirements |
| `METAPHOR_MAP.md` | The full biological metaphor → Android/FP5 technical mapping guide |
| `MANIFOLD_ANALYSIS.md` | Formal tensor analysis: coupling tensor, QI tensor, Fredholm theory |
| `FRACTAL_MAP.md` | 12-scale fractal invariance map; tensor compression cascade table |
| `UNIVERSAL_MANIFOLD.md` | P→A→E manifold theory vs. Fairphone 5 architecture comparison |
| `DEVELOPMENT.md` | Implementation log: open items, Fredholm cap decision, Phase history |
| `ARCHITECT_REPORT_2026-06-10.md` | Architect audit findings and Phase 1/2/3 roadmap |

## User preferences

- Animated elements use `0.777s` transitions (harmonic constant) — do not change to standard durations.
- BANNED: dynamic Tailwind class interpolation (e.g. `` `bg-${color}-500` ``). Use inline styles or static const maps.
- Zone colors are defined in `CELL_ZONES` in `CellShellProvider.tsx` — always source from there.

## Gotchas

- `key={activeZone}` on `ZoneContentViewport`'s `<main>` causes a full remount on zone change. Intentional (scroll reset + animation). Don't remove it.
- `useExplorerFlow` must live in `CellExplorerLayout`, not in individual zone panels — focus state must persist across zone navigation.
- `useSacredSignature` is only wired to `/philosophy` — the sacred pulse only fires on that route.
- SVG filter IDs must be globally unique in the DOM. `CellDiagram` uses `glow` / `glow-strong`; `CellMapNav` uses `ring-glow-${zoneId}`. Don't reuse these IDs.
- `clearExpiredSignals` in the vital store always returns a new `signals` object — `CellMapNav` re-renders every 500ms even when no signals are active. Minor perf non-issue for now.
- Biophoton link count (13) is above the documented healthy-range ceiling. Any new biophoton links should replace a low-confidence existing one, not extend the count.
