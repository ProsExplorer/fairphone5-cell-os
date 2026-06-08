---
name: Cell OS self-learning layer
description: Architecture decisions for the Hebbian epigenome — how the organism learns from interaction, where observation fires, and what adapts.
---

## The three-tensor epigenome

`useLearningStore` (Zustand persist, key "cell-os-epigenome-v1") tracks:
1. `organelleVisits: Record<string, number>` — rank-1 field, click-select counts
2. `coActivations: Record<string, number>` — rank-2 Hebbian pairs, key "a|b" sorted, fires when two organelles visited within 5000ms of each other
3. `substrateEngagement: Record<string, number>` — rank-1 field, substrate click-select counts

## Observation point

Learning fires in `CellExplorerLayout` via a `useEffect` watching `view.activeOrganelle?.id`, `view.activeSubstrate?.id`, and `view.isLocked`. Only records when `isLocked === true` (click-lock, not hover). This is the correct semantics: hover = transient attention, click = deliberate engagement.

**Why:** Centralizing observation in the layout (not in individual zone panels or the reducer) means it fires once regardless of which zone panel is active, and does not require threading props through ZoneContentViewport.

## Adaptation chain

`hebbianAdapter.ts` — pure functions only:
- `getOrganelleVisitIntensity`: sqrt scaling (not linear) so early visits have visible effect without saturation
- `getConfidenceBoosts`: max +0.15 σ. Deliberate cap: user attention is evidence, not verification. Prevents the epigenome from overwriting the static genome's calibrated confidence values.

## Visual expression

`CellDiagram` accepts optional `visitIntensity` prop. Renders a concentric ring SVG layer (pointer-events:none, strokeOpacity max 0.28) *below* biophoton links. Invisible at zero; barely perceptible at first visits; clearly present after sustained use. Rings are zone-colored, same as the existing organelle fill system (uses `zc()` helper).

**Why below biophoton links:** memory glow is background signal (long-term), biophoton links are foreground signal (current session focus). Depth order encodes temporal order.

## CellDiagram is in CytoplasmPanel only

`CellDiagram` is only rendered in `CytoplasmPanel.tsx` — not in `CellMapNav`. The `CellMapNav` renders a separate ring diagram with signal-driven glow from `useCellVitalStore`. These are two different visual layers: the ring nav uses the vital store (transient signals), the cytoplasm diagram uses the learning store (persistent memory).

## Metrics page

`/metrics` reads `useLearnedManifold()` (live, reactive to store changes). Shows: total interactions, visit intensity heatmap with inline progress bars, emergent co-activation pairs, substrate σ boost amounts. Empty state shown when `totalInteractions === 0`.

## Key constraint to maintain

The confidence boost cap (+0.15 max) must never be raised high enough to reach σ=1.0 ("verified") from σ=0.5 ("indicative") or σ=0.0 ("unconfirmed") via user interaction alone. The static genome's confidence values are editorially calibrated; the epigenome adds evidence weight, not authority.
