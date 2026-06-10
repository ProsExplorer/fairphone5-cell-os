---
name: Cell OS open-items tensor state
description: Final tensor metrics after Phase 1 document secretion; Fredholm cap; frozen-15 backfill; next evolution triggers.
---

## Final tensor state (post Phase 1 — document secretion)

| Tensor | Count | Space | Density |
|---|---|---|---|
| Organelle-substrate links | 41 | 15×17=255 | 16.1% (green) |
| Biophoton links | 13 | 15×15=225 | 5.8% (amber-high) |
| QI intersections | 36 | 8×3×11=264 | 13.6% (amber) |
| Substrate nodes | 17 | — | — |
| Fredholm index | −2 | cap = 15−17 | **HARD CAP REACHED** |

## Phase 1 additions (document secretion)

- **QI +3**: qi-secretion-expression-textual (golgi×expression×textual), qi-exocytosis-expression-organic (membrane×expression×organic), qi-document-perception-textual (membrane×perception×textual)
- **Biophoton +2**: ER→vesicles (COPII σ=0.6 ordered-broadcast), vesicles→cell-membrane (SNARE σ=0.7 messenger)
- **Substrate link +1**: golgi-apparatus→bionic-libc (relevance=0.77)
- **New page**: /documents — secretory pathway PDF generator (jsPDF, not @react-pdf/renderer — Vite compat)
- **fractal.tsx**: TENSOR_ZOOM is now a `tensorZoom` useMemo inside the component using computeManifoldMetrics()

## PDF generation: jsPDF not @react-pdf/renderer

**Why:** @react-pdf/renderer has known Vite/browser-ESM incompatibility in this project. jsPDF + jspdf-autotable is pure client-side, zero polyfill issues, already installed as a dependency. Both are installed; only jsPDF is used.

**How to apply:** If switching to @react-pdf/renderer is ever needed, add `define: { 'process.env.NODE_ENV': JSON.stringify('production') }` to vite.config.ts and check for `Buffer` polyfill requirements.

## Fredholm cap — NO MORE substrate nodes

Fredholm index = organelle_count − substrate_count = 15 − 17 = −2. The cap documented in the codebase is −2. Adding any further substrate node would push to −3, violating the cap. Only removing a substrate node or adding an organelle (breaking the frozen-15 constraint) can open space.

## Frozen-15 backfill pattern (peroxisomes)

The peroxisome function is backfilled across three existing organelles:
- `vacuole` → `keystore-tee` (isolated storage vault ↔ TEE key vault)
- `nuclear-pores` → `keystore-tee` (gated entry ↔ TrustZone world switch)
- `lysosomes` → `keystore-tee` (containment/detox ↔ TEE blast-radius enclave)

QI intersection `qi-peroxisome-affect-apparatus` carries the peroxisomal containment narrative under zoneId `cytoplasm`.

**Why:** 15-organelle constraint is frozen for UI stability. The backfill is explicitly documented in organelle descriptions and DEVELOPMENT.md so the next developer knows exactly what to do when the constraint is lifted.

**How to apply:** When the 16th organelle slot opens, add `peroxisome` with `osFeature: "Keystore/StrongBox TEE"`, move the three `keystore-tee` links to point from `peroxisome`, and retire the backfill notes from `lysosomes`/`vacuole` descriptions.

## Next evolution triggers

1. **Frozen-15 unfreeze**: add `peroxisome` organelle, clean up backfill. This is the only path to improving the peroxisome backfill to canonical.
2. **Fredholm cap relief**: can only add a substrate node if organelle count rises to 16 (index = 16−18 = −2 still at cap) or an existing node is removed.
3. **QI density**: amber at 13.6%. Any future QI additions must be earned with strict biological grounding — do not add speculative intersections to pad coverage.
4. **Biophoton count 13**: exceeds the documented healthy-range upper bound. Any further biophoton links should replace a low-confidence existing link rather than extending the count.
5. **Documents page Phase 2**: import (endocytosis) path — File API drag-and-drop to ingest external PDFs, linking to qi-document-perception-textual.
