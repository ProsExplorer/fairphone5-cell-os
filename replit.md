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

## Working with `/documents` (development guide)

Navigate to `/documents` while the dev server is running. The page shows a live manifold state panel (all counts derived from source arrays at render time) and a section selector before generating the PDF.

### Data flow — source to PDF

Every value in the PDF traces back to one of five source arrays or the metrics function derived from them:

```
domain/content/organelles.ts    → CELL_MAPPINGS          (15 entries)
domain/content/substrate.ts     → SUBSTRATE_NODES         (17 entries)
domain/content/mappings.ts      → ORGANELLE_SUBSTRATE_LINKS (41)
                                → BIOPHOTON_LINKS          (13)
domain/content/qiMatrix.ts      → QI_INTERSECTIONS         (36)
domain/content/manifoldMetrics.ts → computeManifoldMetrics()
  ↳ couplingTensorLinks / Space / Density   (from ORGANELLE_SUBSTRATE_LINKS + SUBSTRATE_NODES + CELL_MAPPINGS)
  ↳ qiTensorLinks / Space / Density         (from QI_INTERSECTIONS)
  ↳ biophotonLinks / Space / Coverage       (from BIOPHOTON_LINKS + CELL_MAPPINGS)
  ↳ meanZoneConfidence                      (from ORGANELLE_SUBSTRATE_LINKS)
  ↳ zoneConfidenceCentroids / exportRankTotal / phaseTransitionCount  (computed but NOT used in PDF)
```

In the component, `metrics` is computed once:
```ts
const metrics = useMemo(() => computeManifoldMetrics(), []);
```
It is then passed directly into `generateReport(metrics, selected)` on button click. No other data fetching occurs.

**Which `metrics` fields the PDF actually uses:**
- Header strip: `couplingTensorLinks`, `qiTensorLinks`, `biophotonLinks`
- Manifold table (§1): all density/link/space triples, `meanZoneConfidence`, plus `SUBSTRATE_NODES.length`
- QI section header (§3): `qiTensorSpace` (the denominator 264)
- No other fields — `zoneConfidenceCentroids`, `exportRankTotal`, `phaseTransitionCount` are computed but unused in the current PDF

### Full sequence inside `generateReport()`

`generateReport` is a plain async module-level function (not a React component). Its full execution order:

```
1. Lazy-import jsPDF and jspdf-autotable (dynamic import — see below)
2. Construct jsPDF instance: portrait, mm units, A4 format
3. Define layout constants: PAGE_W=210, MARGIN=18, CONTENT_W=174
4. Define RGB color palette tuples (COL_BG, COL_HDR, COL_TEXT, COL_MUTED, COL_P, COL_A, COL_E, COL_G)
5. Define fillPage() — paints full 210×297 rect with COL_BG on current page
6. Define addSectionHeader(title, color) — draws a muted rule + colored bold title;
   if y > 250, inserts doc.addPage() + fillPage() + resets y to MARGIN
7. fillPage() — paint first page background
8. Header block:
   a. Report label (small caps, muted)
   b. "Cell OS" title (20pt bold)
   c. "Generated YYYY-MM-DD · P→A→E Manifold · Fairphone 5" (9pt muted)
   d. Live counts line: couplingTensorLinks + qiTensorLinks + biophotonLinks + "Fredholm index −2" (8pt blue)
9. For each section in {manifold, organelles, qi, biophoton} — if sections.has(id):
   → addSectionHeader()
   → autoTable() call (see section details below)
   → y = (doc as any).lastAutoTable.finalY + 8
10. Footer loop: for i in 1..pageCount → doc.setPage(i) → write footer at y=291
11. doc.save("cell-os-manifold-YYYY-MM-DD.pdf") — triggers browser download
```

**`addSectionHeader` page-break logic**: the guard `if (y > 250)` catches the case where a heading would appear at the bottom of a page with no room for content. It does *not* handle mid-table overflow — that is handled automatically by jspdf-autotable's built-in pagination.

### The four report sections — data, columns, transforms, widths

**§1 Manifold Metrics** (`sections.has("manifold")`)
- Source: `metrics` output + hardcoded structural constants
- Columns: `Metric | Value | Space | Health`
- Rows (7): coupling density `fmt()`, QI density `fmt()`, biophoton coverage `fmt(n,2)`, mean zone confidence `toFixed(3)`, Fredholm index hardcoded `−2`, organelles hardcoded `15`, substrate nodes `SUBSTRATE_NODES.length`
- Column widths (mm): 55 / 25 / 35 / 25

**§2 Organelle Mapping** (`sections.has("organelles")`) — two sub-tables:
- **§2a** — source `CELL_MAPPINGS`; columns `# | Organelle | Android OS Feature`; widths 8 / 42 / (CONTENT_W−50)
- **§2b** — source `ORGANELLE_SUBSTRATE_LINKS`; columns `Organelle | Substrate | Relevance`; relevance rendered as `toFixed(2)` or `"—"` if null; widths 55 / 45 / 20

**§3 QI Intersections** (`sections.has("qi")`)
- Source: `QI_INTERSECTIONS`
- Columns: `Zone | Phase | Scale | Title`
- **Narrative field is intentionally excluded** (see export schema below)
- Column widths: 30 / 20 / 22 / (CONTENT_W−72)
- Section header is fully dynamic: `` `${QI_INTERSECTIONS.length} of ${metrics.qiTensorSpace}` ``

**§4 Biophoton Attention Map** (`sections.has("biophoton")`)
- Source: `BIOPHOTON_LINKS`
- Columns: `Source | → Target | σ | IPC | Attention`
- `couplingSigma?.toFixed(1) ?? "—"`, `attentionWeight?.toFixed(2) ?? "—"`, `ipcMechanism ?? "—"`
- Column widths: 38 / 38 / 12 / 28 / 20

### UI state model

```ts
selected:  Set<ReportSection>   // which sections are checked; default = all four
generating: boolean             // true while generateReport() is running
generated:  boolean             // true for 3s after success (shows "✓ Secreted")
```

**Section selector cards**: each card calls `toggle(id)`, which copies the current Set, adds or removes the id, and calls `setSelected(next)`. The generate button is disabled when `selected.size === 0` or `generating === true`.

**Live tensor preview cards** (6 cards below the selector): all values are read directly from `metrics` or array `.length` at render time — they update automatically whenever the source arrays change and the page re-mounts.

**P→A→E diagram**: purely presentational static data rendered as a 3-column grid. It maps the secretory pathway framing onto the UI interaction: Perception (membrane-receptors receives the click) → Affect (Golgi assembles data) → Expression (membrane exocytoses the PDF).

### Export schema — what goes in, what stays out

**Rule**: if the data is a static constant in `domain/content/`, it can be exported. If it comes from a Zustand store (`useLearningStore`, `useCellVitalStore`) or derives from runtime interaction, it cannot.

| ✓ Included | ✗ Excluded |
|---|---|
| `CELL_MAPPINGS` — organelle names + `osFeature` | Epigenome attention weights (`useLearningStore`) |
| `ORGANELLE_SUBSTRATE_LINKS` — IDs + relevance | `useCellVitalStore` state (`activeZone`, signals) |
| `QI_INTERSECTIONS` — zone/phase/scale/**title only** | Full QI narratives (long prose, not needed for a report) |
| `BIOPHOTON_LINKS` — pairs + σ + IPC + attention weight | Any personalised/session state |
| `computeManifoldMetrics()` — densities, counts, confidence | `zoneConfidenceCentroids` (per-zone detail, not surfaced) |
| `SUBSTRATE_NODES.length` | Individual substrate node descriptions |

QI narratives are specifically excluded because: (a) they are long prose that would make the PDF unwieldy, and (b) they are the "living" interpretive layer — the titles are the addressable index, the narratives are the contents of the stacks.

### How to add a new report section — worked example

**Goal**: add a **"§5 Substrate Nodes"** section listing all 17 `SUBSTRATE_NODES` with id, category, and a one-line detail.

**Touch point 1 — extend the union type** (top of `documents.tsx`):
```ts
type ReportSection = "manifold" | "organelles" | "qi" | "biophoton" | "substrate";
```

**Touch point 2 — add a `SECTIONS` card** (the `SECTIONS` constant array):
```ts
{ id: "substrate", label: "Substrate Nodes", glyph: "基", color: "#94a3b8" }
```
The `desc` subtext for the card (inside the map):
```ts
{sec.id === "substrate" && `${SUBSTRATE_NODES.length} nodes · Fredholm index −2`}
```

**Touch point 3 — add to default selected set**:
```ts
const [selected, setSelected] = useState<Set<ReportSection>>(
  new Set(["manifold", "organelles", "qi", "biophoton", "substrate"])
);
```

**Touch point 4 — add the PDF section** (inside `generateReport`, after the biophoton block):
```ts
if (sections.has("substrate")) {
  addSectionHeader(`§5  Substrate Nodes (${SUBSTRATE_NODES.length})`, [148, 163, 184]);
  autoTable(doc, {
    startY: y,
    margin: { left: MARGIN, right: MARGIN },
    theme: "plain",
    headStyles: { fillColor: COL_HDR, textColor: COL_TEXT, fontSize: 6.5, fontStyle: "bold" },
    bodyStyles: { fillColor: COL_BG,  textColor: COL_TEXT, fontSize: 6.5 },
    alternateRowStyles: { fillColor: [12, 17, 30] as [number, number, number] },
    head: [["ID", "Category", "Detail"]],
    body: SUBSTRATE_NODES.map(n => [n.id, n.category ?? "—", n.detail ?? "—"]),
    columnStyles: { 0: { cellWidth: 38 }, 1: { cellWidth: 28 }, 2: { cellWidth: CONTENT_W - 66 } },
  });
  y = (doc as any).lastAutoTable.finalY + 8;
}
```

Check `substrate.ts` for the exact field names on `SubstrateNode` — use the type from `domain/types.ts` as the canonical reference.

### jsPDF API conventions

```ts
// Full-page dark background (call after every doc.addPage())
fillPage = () => {
  doc.setFillColor(...COL_BG);           // spread RGB tuple
  doc.rect(0, 0, PAGE_W, 297, "F");     // "F" = filled rect, no stroke
}

// Manual text
doc.setFontSize(11);
doc.setFont("helvetica", "bold");
doc.setTextColor(...COL_TEXT);
doc.text("some text", MARGIN, y);
y += 7;  // advance cursor manually after each text block

// Table (jspdf-autotable)
autoTable(doc, { startY: y, ... });
y = (doc as any).lastAutoTable.finalY + 8;  // always advance after table

// Page footer
const pageCount = (doc as any).internal.getNumberOfPages();
for (let i = 1; i <= pageCount; i++) {
  doc.setPage(i);
  doc.text(`footer text · p. ${i} of ${pageCount}`, MARGIN, 291);
}
```

**Color palette** (RGB tuples defined at top of `generateReport`):

| Constant | RGB | Used for |
|---|---|---|
| `COL_BG` | `[9, 11, 19]` | Page background fill |
| `COL_HDR` | `[15, 23, 42]` | Table header row fill |
| `COL_TEXT` | `[226, 232, 240]` | Body text, header labels |
| `COL_MUTED` | `[100, 116, 139]` | Captions, meta lines, footer |
| `COL_P` | `[125, 211, 252]` | Perception accent (live counts line) |
| `COL_A` | `[196, 181, 253]` | Affect accent (organelles section) |
| `COL_E` | `[134, 239, 172]` | Expression accent (biophoton section) |
| `COL_G` | `[244, 114, 182]` | Golgi/QI accent |

### The dynamic import pattern

```ts
// Inside generateReport() — NOT at the top of the file
const { default: jsPDF }    = await import("jspdf");
const { default: autoTable } = await import("jspdf-autotable");
```

**Why dynamic**: jsPDF is ~300 KB. Importing it statically at the module level adds that to the initial bundle for every user who visits `/documents`, even if they never click "Generate". The dynamic import defers loading until first click. On subsequent clicks the browser returns the already-cached module instantly.

**Do not do this**:
```ts
// ✗ WRONG — static import at top of documents.tsx
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
```
This breaks Vite's tree-shaking, inflates the `/documents` chunk, and defeats the lazy-load design.

### Known limitations and future extension points

| Limitation | Detail |
|---|---|
| `(doc as any).lastAutoTable` cast | jspdf-autotable attaches `lastAutoTable` at runtime; TypeScript has no declaration for it. This is the standard workaround — no better option without forking the types. |
| Portrait A4 only | `new jsPDF({ orientation: "portrait", format: "a4" })` is hardcoded. Landscape or letter would require a config option on `generateReport`. |
| No pre-download preview | The user cannot preview the PDF before downloading. A future improvement could render a summary table in the page UI. |
| Manual y-cursor | Text positioning is fully manual (`y += n`). Complex mixed-content layouts (text + table interleaved) require careful cursor accounting. |
| Table overflow between sections | `addSectionHeader` guards against a heading stranded at the bottom of a page, but does not pre-calculate whether the following table will fit. jspdf-autotable handles intra-table overflow automatically. |
| Phase 2 — import / endocytosis | `qi-document-perception-textual` was added to the tensor specifically to anchor this path. The biological framing: File API drag-and-drop = receptor-mediated endocytosis. The implementation would read a dropped PDF into a `FileReader`, parse it, and route its content to the Golgi zone for re-processing. |

### Cross-references for developers working on `documents.tsx`

| File | Why you need it |
|---|---|
| `domain/types.ts` | `SubstrateNode`, `BiophotonLink`, `QiIntersection`, `ManifoldMetrics` type definitions — the canonical field names |
| `domain/content/manifoldMetrics.ts` | `computeManifoldMetrics()` — understand which fields are computed and which are unused in the PDF |
| `domain/content/mappings.ts` | `ORGANELLE_SUBSTRATE_LINKS` + `BIOPHOTON_LINKS` source arrays |
| `domain/content/qiMatrix.ts` | `QI_INTERSECTIONS` — understand the zone/phase/scale axes and why narrative is excluded |
| `domain/content/organelles.ts` | `CELL_MAPPINGS` — `name` and `osFeature` fields used in §2a |
| `domain/content/substrate.ts` | `SUBSTRATE_NODES` — needed if adding a substrate section; check field names against `SubstrateNode` type |

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
