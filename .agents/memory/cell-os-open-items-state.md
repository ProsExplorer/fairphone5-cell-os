---
name: Cell OS open-items tensor state
description: Fredholm cap, frozen-15 backfill, jsPDF decision, and next evolution triggers — durable constraints on the tensor graph.
---

## Fredholm cap — NO MORE substrate nodes

Fredholm index = organelle_count − substrate_count = 15 − 17 = −2. The cap is −2. Adding any further substrate node pushes to −3, violating the cap. Only removing a substrate node or adding an organelle (breaking the frozen-15 constraint) can open space.

**Why:** The cap is enforced in the codebase documentation. Violating it creates an over-determined IPC graph where substrate coverage exceeds organelle count.

**How to apply:** Before adding a substrate node, check Fredholm index. If at cap, propose removing a low-relevance substrate or deferring until frozen-15 is lifted.

## Frozen-15 backfill pattern (peroxisomes)

Peroxisome function is backfilled across three existing organelles (vacuole, nuclear-pores, lysosomes all linking to keystore-tee) because the 15-organelle UI layout is frozen for visual stability.

**Why:** Adding a 16th organelle breaks the grid layout. The backfill is explicitly documented in organelle descriptions so the next developer knows what to do when the constraint lifts.

**How to apply:** When the 16th organelle slot opens, add `peroxisome` with `osFeature: "Keystore/StrongBox TEE"`, move the three `keystore-tee` links from vacuole/nuclear-pores/lysosomes, and retire the backfill notes.

## PDF generation: jsPDF not @react-pdf/renderer

**Why:** @react-pdf/renderer has known Vite/browser-ESM incompatibility in this project. jsPDF + jspdf-autotable is pure client-side, zero polyfill issues, already installed.

**How to apply:** If @react-pdf/renderer is ever needed, add `define: { 'process.env.NODE_ENV': JSON.stringify('production') }` to vite.config.ts and check for `Buffer` polyfill requirements.

## Next evolution triggers

1. **Frozen-15 unfreeze**: add `peroxisome` organelle, clean up backfill. Only path to canonical peroxisome representation.
2. **Fredholm cap relief**: can only add a substrate node if organelle count rises (16 organelles − 18 substrates = −2, still at cap) or an existing node is removed.
3. **QI density**: Any future QI additions must be earned with strict biological grounding — do not add speculative intersections to pad coverage.
4. **Biophoton links**: Canonical count is 18. Any further links should replace a low-confidence existing link rather than extending the count past the canonical set.
5. **Documents page Phase 2**: Import (endocytosis) path — File API drag-and-drop to ingest external PDFs, linking to qi-document-perception-textual.
