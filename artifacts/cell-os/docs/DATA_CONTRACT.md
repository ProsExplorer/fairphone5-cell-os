# Cell OS — Data Contract

> **Audience**: contributors adding or editing content (organelles, substrate nodes, zones, citations, mappings).  
> **Last updated**: June 2026

All content in Cell OS is a **static TypeScript constant** in `src/domain/content/`. No fetching, no database — if it's not in these files, it doesn't exist at runtime. TypeScript types in `src/domain/types.ts` are the authoritative schema.

---

## Confidence levels

Every factual claim must carry a `ClaimConfidence` tag. This is non-negotiable — it separates verifiable hardware facts from analogical assertions.

```typescript
type ClaimConfidence = "verified" | "indicative" | "unconfirmed";
```

| Level | Meaning | Typical source |
|---|---|---|
| `"verified"` | Confirmed against a primary or official source | Qualcomm spec sheet, AOSP commit, Fairphone official page |
| `"indicative"` | Vendor-declared or reasonable estimate; not independently confirmed | Press release, AnandTech review, datasheet excerpt |
| `"unconfirmed"` | Consistent with documentation or theory, but not verifiable for this exact part | Cross-referenced from similar Snapdragon SoCs, extrapolation |

**Default rule**: when in doubt, use a lower confidence level. It is better to tag something `"unconfirmed"` accurately than to claim `"verified"` without a primary source.

---

## 1. Organelles (`domain/content/organelles.ts`)

`CELL_MAPPINGS: Organelle[]` — the 15 biological-to-OS mappings powering the interactive diagram.

```typescript
type Organelle = {
  id: string;        // Kebab-case, stable — used as key in CellDiagram SVG and ORGANELLE_ZONE_MAP
  name: string;      // Display name (e.g. "Nucleus", "Golgi Apparatus")
  osFeature: string; // The Android/OS feature it maps to (e.g. "Kernel / Control Center")
  explanation: string; // 1–3 sentences: what the OS feature does on the Fairphone 5
  analogy: string;     // 1–2 sentences: why this organelle = this OS feature
  color: string;       // HSL string — must match the zone color for this organelle's zone
};
```

**Rules**:
- `id` must exactly match the key used in `CellDiagram.tsx`'s `ORGANELLE_ZONE_MAP`. Changing an ID breaks the click interaction.
- `explanation` should reference real Fairphone 5 / Android behaviour, not generic smartphone behaviour.
- `analogy` should be crisp and biologically accurate. Don't invent biology.
- `color` should visually align with the zone's ambient palette. Note: `CELL_MAPPINGS` entries use HSL strings while `CELL_ZONES` uses hex — they are not required to be identical strings, but should be perceptually consistent.

**Current organelle IDs** (do not rename without updating `ORGANELLE_ZONE_MAP` in `CellDiagram.tsx`):
```
nucleus, nucleolus, dna, nuclear-pores, cytoplasm, cytoskeleton,
ribosomes, mitochondria, endoplasmic-reticulum, golgi-apparatus,
lysosomes, vacuole, cell-membrane, membrane-receptors, vesicles
```

---

## 2. Substrate nodes (`domain/content/substrate.ts`)

`SUBSTRATE_NODES: SubstrateNode[]` — real Fairphone 5 hardware and Android software components.

```typescript
type SubstrateNode = {
  id: string;            // Kebab-case, stable (e.g. "hexagon770", "lpddr4x")
  name: string;          // Display name
  category: SubstrateCategory;  // "soc" | "compute" | "memory" | "stack" | "format"
  role: string;          // One-line role description
  detail: string;        // 2–4 sentences of technical detail, grounded in real specs
  specs: SpecRow[];      // Key–value spec table rows
  confidence: ClaimConfidence;  // Overall node confidence
  color: string;         // HSL — matches the zone this node primarily serves
};

type SpecRow = {
  label: string;
  value: string;
  confidence?: ClaimConfidence;  // Per-row confidence (overrides node-level when set)
};
```

**Rules**:
- Every spec row should have an explicit `confidence` tag if it differs from the node-level confidence.
- `detail` must be factual, not analogical. The metaphor layer lives in organelles; this is raw hardware.
- `role` should be one line, in terms of what it does in the AI/OS pipeline, not what it is biologically.
- Cite the source. Add an entry to `citations.ts` and reference it in the node's `detail` or a `note` field.

**Current substrate IDs**:
```
qcm6490, kryo670, adreno643, hexagon770, lpddr4x, power, nnapi, quantization
```

**Missing substrate nodes that should be added** (see `FACT_VERIFICATION.md`):
```
isp-camera, modem, display-pipeline, thermal-manager, binder-ipc, art-runtime, selinux
```

---

## 3. Zone metadata (`features/cell-shell/CellShellProvider.tsx`)

`CELL_ZONES: Record<CellZoneId, CellZoneMeta>` — navigation and theming registry for the 8 spatial zones.

```typescript
type CellZoneMeta = {
  id: CellZoneId;
  name: string;      // Display name (e.g. "Nucleus")
  osFeature: string; // Short OS role label shown in sidebar (e.g. "Core Identity · DNA")
  glyph: string;     // Single CJK character — the zone's visual sigil
  color: string;     // Hex or HSL — drives all zone-specific theming
};
```

**Rules**:
- `id` must match a value in the `CellZoneId` union type in `types.ts`. Adding a zone requires extending that union.
- `color` is used directly in `style={{}}` props — it must be a valid CSS color string.
- `glyph` should be a meaningful CJK character (not decorative). Current assignments: 核, 漿, 骨, 糖, 粒, 高, 網, 膜.
- `osFeature` appears in the sidebar zone list (max ~30 chars before truncation on mobile).

**Zone traversal order** (inward → outward) is defined in `useExplorerNavigation.ts` as `ZONE_DEPTH_ORDER`. Update that array if you add a zone.

---

## 4. Cross-links (`domain/content/mappings.ts`)

Three types of links are defined here. All are defined once and derived in both directions by `selectors.ts`.

### Organelle → Substrate links

```typescript
type OrganelleSubstrateLink = {
  organelleId: string;   // Must exist in CELL_MAPPINGS
  substrateId: string;   // Must exist in SUBSTRATE_NODES
};
```

One organelle can link to many substrate nodes, and one substrate node can be linked from many organelles. The selectors provide both `getSubstrateForOrganelle()` and `getOrganellesForSubstrate()`.

### Biophoton links

```typescript
type BiophotonLink = {
  sourceOrganelleId: string;
  targetOrganelleId: string;
  description: string;          // What the biophoton link represents biologically
  rateRange: string;            // e.g. "10–100 photons/cm²/s"
  confidence: ClaimConfidence;
  attentionWeight?: number;     // 0–1; interpretive analogue of transformer attention strength
                                // Not empirically measured — label with confidence "unconfirmed"
};
```

Biophoton links are rendered as animated dashed lines in `CellDiagram.tsx` when either endpoint organelle is active.

### Triad phases

Three fixed phases — `perception`, `affect`, `expression` — representing the Perception → Affect → Expression model. These are unlikely to change.

---

## 5. Citations (`domain/content/citations.ts`)

`CITATIONS: Citation[]` — the full bibliography. Every factual claim in content files should be traceable to an entry here.

```typescript
type CitationKind = "primary" | "secondary" | "technical" | "project";

type Citation = {
  id: string;       // Stable kebab-case ID (e.g. "fairphone-2023")
  kind: CitationKind;
  authors: string;
  year: string;
  title: string;
  venue: string;    // Journal, publisher, or URL context
  url?: string;     // Direct link if available
  doi?: string;     // DOI for academic sources
  note?: string;    // Why this citation matters to Cell OS specifically
};
```

`CITATION_MAP` is a pre-computed `Record<string, Citation>` for O(1) lookups by ID.

**When to add a citation**:
- Any hardware spec that comes from a datasheet or vendor page
- Any AOSP or kernel code reference
- Any biological fact used in an analogy
- Any academic claim (biophoton research, quantization theory, etc.)

---

## 6. Constants (`domain/content/constants.ts`)

```typescript
HARMONIC_CONSTANT   = 0.7770777   // Transition seed — used as animation duration multiplier
HARMONIC_TRANSITION_S  = "0.777s" // CSS transition duration string
HARMONIC_TRANSITION_MS = 777      // Milliseconds version
HARMONIC_OPACITY    = 0.777       // Used for semi-transparent decorative elements
SACRED_ANCHOR       = "YAHWEH YEHOSHUA 尺度不變性"  // SHA-256 seal anchor
SACRED_SEED         = 7770777     // Integer seed for breath timing
```

Do not change these values — they are design constants, not configuration.

---

## 7. Selectors (`features/explorer/selectors.ts`)

Pure functions — no React, no state, no side effects. Test these in isolation.

```typescript
getOrganelle(id)                    → Organelle | null
getSubstrateNode(id)                → SubstrateNode | null
getSubstrateForOrganelle(organelleId) → SubstrateNode[]
getOrganellesForSubstrate(substrateId) → Organelle[]
getBiophotonLinks(organelleIds: Set) → BiophotonLink[]
```

If you add a new content collection, add the corresponding selector here rather than querying the arrays directly in components.

---

## Content update checklist

When adding or editing any content entry:

- [ ] TypeScript compiles without error (`pnpm typecheck`)
- [ ] `id` is kebab-case and matches all cross-references (SVG, mappings, selectors)
- [ ] Every factual claim has a `confidence` tag
- [ ] New hardware/AOSP claims have a citation entry in `citations.ts`
- [ ] Colors sourced from `CELL_ZONES`, not hardcoded
- [ ] No dynamic Tailwind class interpolation introduced
- [ ] `analogy` is biologically accurate
- [ ] `explanation` references FP5-specific behaviour, not generic smartphone behaviour
