# Cell OS

An interactive concept explainer for **Cell OS** — a visionary operating system for the Fairphone 5 that frames the phone as a living human cell. Each biological organelle maps to an OS feature; navigating the app is literally navigating through the cell.

The app has three conceptual layers:
1. **Zone layer** — 8 spatial zones (nucleus → membrane) used for navigation and theming
2. **Organelle layer** — 15 granular biological structures, each mapped to an OS feature
3. **Substrate layer** — real Fairphone 5 hardware and Android internals (QCM6490, Hexagon 770, LPDDR4x, etc.)

## Run & Operate

- `pnpm --filter @workspace/cell-os run dev` — start the Cell OS frontend (Vite dev server, reads `PORT` env)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages

**Cell OS is frontend-only** — no backend, no database, no API server required.

## Stack

- **Monorepo**: pnpm workspaces, Node.js 24, TypeScript 5.9
- **Frontend**: React 19, Vite, Tailwind v4, wouter (routing), shadcn/ui, Zustand
- **Other artifacts** in this workspace: `api-server` (Express 5 + PostgreSQL + Drizzle, unrelated to Cell OS), `mockup-sandbox` (canvas component preview server)

## Where things live

```
artifacts/cell-os/src/
├── App.tsx                          # Router: / → Home, /philosophy, /substrate
├── main.tsx                         # React entry point
├── index.css                        # Tailwind v4 + custom keyframes (bioluminescent palette)
│
├── domain/
│   ├── types.ts                     # All TypeScript contracts (Organelle, SubstrateNode, etc.)
│   └── content/
│       ├── organelles.ts            # 15 organelle → OS feature mappings (CELL_MAPPINGS)
│       ├── substrate.ts             # Real FP5 hardware nodes (SUBSTRATE_NODES)
│       ├── mappings.ts              # Cross-links: organelle ↔ substrate, biophoton links, triad phases
│       ├── citations.ts             # Full bibliography (CITATIONS, CITATION_MAP)
│       ├── constants.ts             # Harmonic constant (0.7770777) and sacred coherence tokens
│       ├── edgeNode.ts              # EdgeNode on-device inference content
│       ├── fractalCycles.ts         # Nine-scale / fractal cycle data
│       ├── lineage.ts               # Deep lineage timeline content
│       ├── qiMatrix.ts              # Qi tensor matrix data
│       ├── quantizationBiology.ts   # Quantization ↔ biology mapping data
│       └── scales.ts                # Nine-scale flow content
│
├── features/
│   ├── cell-shell/
│   │   ├── CellShellProvider.tsx    # CELL_ZONES registry (8 zones, each with name/glyph/color)
│   │   └── state/
│   │       └── useCellVitalStore.ts # Zustand store: activeZone, breath signals, emitSignal()
│   │
│   └── explorer/
│       ├── useExplorerFlow.ts       # Core reducer: focus state (hover/click lock), ExplorerView
│       ├── selectors.ts             # Pure lookups: getOrganelle, getSubstrateForOrganelle, etc.
│       ├── navigation/
│       │   ├── CellExplorerLayout.tsx  # Root shell: header, chip bar, sidebar, viewport
│       │   ├── CellMapNav.tsx          # Animated concentric ring zone navigator (SVG)
│       │   ├── ZoneContentViewport.tsx # Renders the active zone's panel
│       │   └── useExplorerNavigation.ts # Zone selection, inward/outward traversal
│       ├── components/
│       │   ├── InfoPanel.tsx           # Organelle detail panel (right side on desktop)
│       │   ├── EdgeNodeSection.tsx     # EdgeNode / on-device AI section
│       │   ├── NineScaleFlow.tsx       # Nine-scale animation component
│       │   ├── SubstrateAtlas.tsx      # Substrate hardware node cards
│       │   ├── TriadicFlow.tsx         # Perception → Affect → Expression visualiser
│       │   ├── QuantizationBiologySection.tsx
│       │   ├── CodeSnippet.tsx         # Syntax-highlighted AOSP/kernel code snippet
│       │   ├── DeepLineageTimeline.tsx
│       │   ├── FractalNavigator.tsx
│       │   └── ConfidenceBadge.tsx     # verified / indicative / unconfirmed badge
│       └── zones/
│           ├── NucleusPanel.tsx
│           ├── CytoplasmPanel.tsx      # Contains the main CellDiagram + InfoPanel
│           ├── CytoskeletonPanel.tsx
│           ├── RibosomesPanel.tsx
│           ├── MitochondriaPanel.tsx
│           ├── GolgiPanel.tsx
│           ├── EndoplasmicReticulumPanel.tsx
│           └── MembranePanel.tsx
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
│   └── substrate.tsx                # Full substrate hardware reference page
│
└── lib/
    └── utils.ts                     # cn() Tailwind merge helper
```

## Architecture decisions

- **Frontend-only**: all content is static TypeScript constants in `domain/content/`. No API, no database, no runtime fetching.
- **Three-layer content model**: zone metadata (navigation) → organelle data (metaphor) → substrate nodes (real hardware). Cross-links in `mappings.ts` join the layers; selectors in `selectors.ts` derive views from those links.
- **Reducer-based focus state**: `useExplorerFlow` uses `useReducer` with a `locked` flag to distinguish hover-preview from click-pin focus. Hover events are suppressed while locked — prevents mouseLeave from wiping a deliberate click selection.
- **Zustand vital store**: `useCellVitalStore` tracks `activeZone` and `signals` (timed pulse bursts). Components subscribe with fine-grained selectors to avoid unnecessary renders.
- **SVG hand-coded**: `CellDiagram.tsx` is a hand-authored 1000×1000 SVG viewBox with 15 organelle shapes. This keeps each organelle individually focusable, tabbable, and animatable without a canvas or image.
- **No dynamic Tailwind class interpolation**: all dynamic styles use inline `style={{}}` props or static const maps. Tailwind v4 purges unused classes — interpolated strings don't survive the build.
- **Harmonic constant 0.7770777**: appears as transition duration (777ms), opacity, and animation seed across all animated elements. Defined once in `constants.ts` as `HARMONIC_CONSTANT`.
- **Zone remount pattern**: `ZoneContentViewport` uses `key={activeZone}` to remount on zone change, resetting scroll, local state, and triggering the fade-in animation. This is intentional — zone change is a full context switch.

## Docs

Full developer documentation lives in `artifacts/cell-os/docs/`:

| File | Purpose |
|---|---|
| `ARCHITECTURE.md` | Deep dive: layers, data flow, state model, component tree |
| `DATA_CONTRACT.md` | How every content type is structured; how to add/verify entries |
| `ZONE_AUTHORING.md` | Step-by-step playbook: add a new zone or organelle |
| `FACT_VERIFICATION.md` | Verification workflow, confidence levels, source requirements |
| `METAPHOR_MAP.md` | The full biological metaphor → Android/FP5 technical mapping guide |

## User preferences

- Animated elements use `0.777s` transitions (harmonic constant) — do not change to standard durations.
- BANNED: dynamic Tailwind class interpolation (e.g. `` `bg-${color}-500` ``). Use inline styles or static const maps.
- Zone colors are defined in `CELL_ZONES` in `CellShellProvider.tsx` — always source from there.

## Gotchas

- `key={activeZone}` on `ZoneContentViewport`'s `<main>` causes a full remount on zone change. This is intentional (scroll reset + animation). Don't remove it.
- `useExplorerFlow` must live in `CellExplorerLayout`, not in individual zone panels — focus state must persist across zone navigation.
- `useSacredSignature` is only wired to `/philosophy` — the sacred pulse only fires on that route.
- SVG filter IDs must be globally unique in the DOM. `CellDiagram` uses `glow` / `glow-strong`; `CellMapNav` uses `ring-glow-${zoneId}`. Don't reuse these IDs.
- `clearExpiredSignals` in the vital store always returns a new `signals` object — `CellMapNav` re-renders every 500ms even when no signals are active. This is a minor perf non-issue for now but worth memoising if the map grows.
