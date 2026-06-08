# Cell OS — Zone & Organelle Authoring Playbook

> **Audience**: developers adding a new zone, a new organelle, or a new panel section.  
> **Last updated**: June 2026

---

## Concept review before you start

**Zone** (8 total): a spatial region of the cell used for navigation and theming. Each zone has an ID, name, glyph, color, and a panel component that renders its content.

**Organelle** (15 total): a granular biological structure that maps to exactly one OS feature. Organelles live inside zones. The interactive `CellDiagram.tsx` SVG renders all 15 at once; clicking one reveals its OS feature in the `InfoPanel`.

**Zone ≠ Organelle**: nucleus the *zone* contains the nucleus, nucleolus, dna, and nuclear-pores *organelles*. The zone is the navigation layer; the organelle is the metaphor layer.

---

## Recipe A — Add a new organelle to an existing zone

### Step 1 — Add the organelle to `CELL_MAPPINGS`

File: `src/domain/content/organelles.ts`

```typescript
{
  id: "my-organelle",          // kebab-case, globally unique
  name: "My Organelle",
  osFeature: "What it does in Android",
  explanation: "2–3 sentences grounded in FP5/Android specifics. Reference real APIs, chip names, or AOSP components.",
  analogy: "1–2 sentences. Why this biology maps to this OS feature. Be biologically accurate.",
  color: "hsl(280, 80%, 60%)"  // Must match the zone's color from CELL_ZONES
},
```

### Step 2 — Add to `ORGANELLE_ZONE_MAP` in `CellDiagram.tsx`

File: `src/components/CellDiagram.tsx`

Find the `ORGANELLE_ZONE_MAP` constant and add:
```typescript
"my-organelle": "nucleus",  // Replace "nucleus" with the correct zone ID
```

### Step 3 — Draw the SVG shape

File: `src/components/CellDiagram.tsx`

Add an `<Organelle>` wrapper inside the SVG, after existing organelles in the same zone. The SVG viewBox is `0 0 1000 1000`.

```tsx
<Organelle
  id="my-organelle"
  activeIds={activeIds}
  onHover={onHover}
  onClick={onClick}
  className="transition-all duration-500 origin-center"
  style={{
    opacity: activeIds.size > 0 && !activeIds.has("my-organelle") ? 0.4 : 1,
    transform: activeIds.has("my-organelle") ? "scale(1.04)" : "scale(1)",
  }}
>
  {/* SVG path or circle goes here */}
  <ellipse cx={420} cy={340} rx={55} ry={35} fill="hsl(280,80%,60%)" opacity={0.75} />
</Organelle>
```

**Visual design rules**:
- Organelles should not overlap the nucleus (centre ~cx=500, cy=500)
- Use the zone's HSL color from `CELL_ZONES`
- Use `opacity={0.75–0.9}` for fill; `opacity={0.4}` when not active
- Consider adding a `filter="url(#glow)"` for important organelles

### Step 4 — Add organelle-substrate links (optional)

File: `src/domain/content/mappings.ts`

```typescript
{ organelleId: "my-organelle", substrateId: "hexagon770" },
```

Only add links where the biological relationship genuinely maps to the hardware. Don't force connections.

### Step 5 — Add a biophoton link (optional)

Only add if there is a real or proposed biological signal pathway:

```typescript
{
  sourceOrganelleId: "my-organelle",
  targetOrganelleId: "nucleus",
  description: "Describe the proposed signal pathway.",
  rateRange: "1–50 photons/cm²/s",
  confidence: "unconfirmed"
},
```

### Step 6 — Add citations

File: `src/domain/content/citations.ts`

For any biological fact or hardware claim in the organelle content:
```typescript
{
  id: "my-source-2024",
  kind: "technical",
  authors: "Author Name",
  year: "2024",
  title: "Title of source",
  venue: "Publisher / URL context",
  url: "https://...",
  note: "Why this source is relevant to Cell OS."
},
```

### Step 7 — Verify

```bash
pnpm typecheck
```

Then open the app, navigate to the zone that contains the new organelle, and verify:
- Organelle is visible in the SVG
- Hovering shows the correct InfoPanel content
- Clicking locks the InfoPanel
- Clicking substrate-linked hardware in the SubstrateAtlas highlights the organelle

---

## Recipe B — Add a new zone

This is a more significant change. The zone system has exactly 8 slots; adding a 9th requires updating navigation, the ring diagram, the SVG, and the panel router.

### Step 1 — Extend the `CellZoneId` type

File: `src/domain/types.ts`

```typescript
export type CellZoneId =
  | "nucleus"
  | "cytoplasm"
  // ... existing zones ...
  | "my-new-zone";   // Add here
```

### Step 2 — Add zone metadata to `CELL_ZONES`

File: `src/features/cell-shell/CellShellProvider.tsx`

```typescript
"my-new-zone": {
  id: "my-new-zone",
  name: "My New Zone",
  osFeature: "Short OS role label",
  glyph: "新",           // Single meaningful CJK character
  color: "#a78bfa",     // Valid CSS color
},
```

### Step 3 — Add to `ZONE_DEPTH_ORDER`

File: `src/features/explorer/navigation/useExplorerNavigation.ts`

Insert the new zone in the correct radial position (innermost at index 0, outermost at the end):

```typescript
export const ZONE_DEPTH_ORDER: CellZoneId[] = [
  "nucleus",
  "cytoplasm",
  // ...
  "my-new-zone",   // Insert in the correct depth order
  "membrane",
];
```

### Step 4 — Add a ring to `CellMapNav`

File: `src/features/explorer/navigation/CellMapNav.tsx`

Add an entry to `RINGS` with an appropriate radius. Rings go from `r=100` (membrane, outermost) to `r=15` (nucleus, innermost). Pick a radius that fits between existing rings:

```typescript
{ zoneId: "my-new-zone", r: 55 },  // Between mitochondria (r=60) and ribosomes (r=48)
```

Also add a label angle in `LABEL_ANGLES_DEG` (compact mode labels).

### Step 5 — Create the zone panel

Create `src/features/explorer/zones/MyNewZonePanel.tsx`:

```tsx
import type { ExplorerView, ExplorerPerception } from "../useExplorerFlow";

type Props = {
  view?: ExplorerView;
  perceive?: ExplorerPerception;
};

export function MyNewZonePanel({ view, perceive }: Props) {
  return (
    <div className="px-6 py-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">My New Zone</h1>
      {/* Zone content here */}
    </div>
  );
}
```

Pass `view` and `perceive` only if the panel renders a `CellDiagram` or `InfoPanel`.

### Step 6 — Register the panel in `ZoneContentViewport`

File: `src/features/explorer/navigation/ZoneContentViewport.tsx`

```tsx
import { MyNewZonePanel } from "../zones/MyNewZonePanel";

// Inside the component:
{activeZone === "my-new-zone" && <MyNewZonePanel view={view} perceive={perceive} />}
```

### Step 7 — Add biophoton links for the new zone's rings

File: `src/features/explorer/navigation/CellMapNav.tsx`

Add an entry to `BIOPHOTON_LINKS` connecting the new zone to its biological neighbors:

```typescript
{ fromZone: "my-new-zone", toZone: "nucleus", fromR: 55, toR: 15, angleDeg: 180, animDelay: 2.0, animDuration: 3.0 },
```

### Step 8 — Verify

```bash
pnpm typecheck
```

Then:
- [ ] New zone appears in the sidebar list and ring diagram
- [ ] Mobile chip bar includes the new zone chip
- [ ] Clicking the ring or chip navigates to the new panel
- [ ] Inward/outward navigation traverses through the new zone in the correct order
- [ ] The ambient background color updates to the new zone's color

---

## Recipe C — Add a new section to an existing zone panel

Zone panels are plain React components. Add new sections as child components or inline JSX.

**For a section with real hardware data**: use `SubstrateAtlas` or a custom card grid that sources from `SUBSTRATE_NODES`.

**For a section with AOSP code**: use `CodeSnippet`:
```tsx
import { CodeSnippet } from "../components/CodeSnippet";

<CodeSnippet
  filename="frameworks/base/core/java/android/os/Binder.java"
  language="java"
  code={MY_CODE_SNIPPET}
  caption="Binder transaction dispatch — the cytoplasm's actual message-passing mechanism."
/>
```

**For a section with confidence-tagged facts**: use `ConfidenceBadge`:
```tsx
import { ConfidenceBadge } from "../components/ConfidenceBadge";

<ConfidenceBadge confidence="verified" />
```

**Layout conventions**:
- Outer wrapper: `className="px-6 py-8"` (matches other panels)
- Section header: `className="text-xl font-semibold mb-4"`
- Max content width: `max-w-4xl mx-auto` on the outer div
- Zone color accent: import `CELL_ZONES` and use `CELL_ZONES[zoneId].color` — never hardcode

---

## Common mistakes

| Mistake | Fix |
|---|---|
| Organelle `id` doesn't match `ORGANELLE_ZONE_MAP` key | The click handler won't fire. IDs must be identical strings. |
| Dynamic Tailwind class (`` `text-${color}` ``) | Use `style={{ color }}` instead |
| Adding a zone without updating `ZONE_DEPTH_ORDER` | Inward/outward nav will skip or repeat zones |
| Forgetting `ClaimConfidence` on a `SpecRow` | TypeScript won't catch it; audits will flag it |
| Reusing an SVG filter ID | DOM filter IDs are global. Add a unique prefix. |
| Calling a selector from inside the domain layer | Selectors import from domain; domain must not import from features |
