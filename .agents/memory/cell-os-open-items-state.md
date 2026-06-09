---
name: Cell OS open-items tensor state
description: Final tensor metrics after DEVELOPMENT.md #9/#13/#19 closure; Fredholm cap; frozen-15 backfill; next evolution triggers.
---

## Final tensor state (post open-items round)

| Tensor | Count | Space | Density |
|---|---|---|---|
| Organelle-substrate links | 40 | 15×17=255 | 15.7% (green) |
| Biophoton links | 11 | 15×15=225 | 4.9% (green) |
| QI intersections | 33 | 8×3×11=264 | 12.5% (amber) |
| Substrate nodes | 17 | — | — |
| Fredholm index | −2 | cap = 15−17 | **HARD CAP REACHED** |

## Fredholm cap — NO MORE substrate nodes

Fredholm index = organelle_count − substrate_count = 15 − 17 = −2. The cap documented in the codebase is −2. Adding any further substrate node would push to −3, violating the cap. Only removing a substrate node or adding an organelle (breaking the frozen-15 constraint) can open space.

## Frozen-15 backfill pattern (peroxisomes / #9)

The peroxisome function is backfilled across three existing organelles:
- `vacuole` → `keystore-tee` (isolated storage vault ↔ TEE key vault)
- `nuclear-pores` → `keystore-tee` (gated entry ↔ TrustZone world switch)
- `lysosomes` → `keystore-tee` (containment/detox ↔ TEE blast-radius enclave)

QI intersection `qi-peroxisome-affect-apparatus` carries the peroxisomal containment narrative under zoneId `cytoplasm`.

**Why:** 15-organelle constraint is frozen for UI stability. The backfill is explicitly documented in organelle descriptions and DEVELOPMENT.md so the next developer knows exactly what to do when the constraint is lifted.

**How to apply:** When the 16th organelle slot opens, add `peroxisome` with `osFeature: "Keystore/StrongBox TEE"`, move the three `keystore-tee` links to point from `peroxisome`, and retire the backfill notes from `lysosomes`/`vacuole` descriptions.

## Next evolution triggers

1. **Frozen-15 unfreeze**: add `peroxisome` organelle, clean up backfill. This is the only path to improving #9 from "backfill" to "canonical".
2. **Fredholm cap relief**: can only add a substrate node if organelle count rises to 16 (index = 16−18 = −2 still at cap) or an existing node is removed.
3. **QI density**: already amber at 12.5%. Any future QI additions must be earned with strict biological grounding — do not add speculative intersections to pad coverage.
4. **Biophoton count 11**: exceeds the documented healthy-range upper bound of 10. Any further biophoton links should replace a low-confidence existing link rather than extending the count.
