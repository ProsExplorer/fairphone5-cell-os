---
name: Cell OS biophoton schema decisions
description: Durable decisions on ClaimConfidence tiers, wavelengthBand field, σ calibration rules, canonical pathway set, and ConfidenceBadge update rule.
---

## ClaimConfidence — four tiers, two share the same σ range

`ClaimConfidence = "verified" | "indicative" | "speculative" | "unconfirmed"`.

`"speculative"` (σ 0.30–0.50): mechanistically plausible, indirect support. Used for new biophoton links without direct measurement.
`"unconfirmed"` (σ 0.30–0.50): same sigma range — distinguished by evidence quality, not magnitude. Used for substrate hardware specs that could not be verified, and for hypotheses with zero supporting literature.

**Why:** The research vocabulary uses "speculative" for proposed-but-unevidenced pathways. "unconfirmed" was already in use in the codebase for substrate specs with a different semantic. Keeping both avoids a mass rename; the distinction is evidence quality, not sigma magnitude.

**How to apply:** Whenever `ClaimConfidence` grows, `ConfidenceBadge.tsx` must be updated — it uses `Record<ClaimConfidence, string>` for both LABELS and STYLES. TypeScript will catch omissions at compile time. The TypeScript error is the signal; fix ConfidenceBadge first.

## wavelengthBand — union type on BiophotonLink, matching CellDiagramProps

`wavelengthBand?: "UV" | "blue-green" | "red" | "NIR" | "deep-NIR"` on `BiophotonLink` in `types.ts`.
`CellDiagramProps.biophotonLinks[].wavelengthBand` must use the same union type (not `string`) for compile-time safety.

Spectral ranges: UV=200–380 nm, blue-green=450–550 nm, red=570–703 nm, NIR=700–1000 nm, deep-NIR=~1270 nm.

`wbc()` in `CellDiagram.tsx` maps these to visible proxies: UV→violet (#a78bfa), blue-green→cyan (#67e8f9), red→red (#f87171), NIR→amber (#fb923c), deep-NIR→slate (#94a3b8).

## σ calibration tiers (§9.4)

| Tier | σ range | Meaning |
|---|---|---|
| verified | ≥ 0.75 | Replicated, peer-reviewed result |
| indicative | 0.50–0.75 | Mechanistically coherent, peer-reviewed, not yet independently replicated |
| speculative | 0.30–0.50 | Physically plausible, indirect support |
| unconfirmed | 0.30–0.50 | No supporting literature |

Enforced at build time by `biophotonIntegrity.assert.ts` (run via `pnpm --filter @workspace/cell-os run test:biophoton`). This is a test script, not app-runtime code.

**Why:** Previous implementation had indicative links at σ=0.9, falsely implying verified-tier certainty. The research provides explicit evidence-tier-to-σ guidance that must be followed.

## Canonical 9-pathway set (P1–P9) — 20 links total

All P1–P9 tuples must be present; enforced by the integrity script. **BIOPHOTON_RESEARCH.md §9.2 is authoritative for σ values.** Where they conflict with code, §9.2 wins.

- P1: `mitochondria → nucleus` (retrograde ROS→lipid perox→450–670 nm, σ=0.75, verified)
- P2: `endoplasmic-reticulum → mitochondria` (MAM ferroptosis-MAM carbonyl-triplet, σ=0.60, indicative — raised 0.55→0.60 on MedComm 2025)
- P3: `cell-membrane → membrane-receptors` (extracellular UPE broadcast, σ=0.85, verified — raised 0.80→0.85 on Casey 2025 iScience + Mould 2024 Frontiers)
- P4: `nucleus → cytoplasm` (DNA excimer UV anterograde, σ=0.35, speculative)
- P5: `cytoskeleton → mitochondria` (MT lumen QED cavity, Entropy 2026, σ=0.75, indicative upper-boundary — raised 0.60→0.75)
- P6: `cell-membrane → mitochondria` (**endpoint is mitochondria, not nucleus**; retrograde lipid perox cascade, σ=0.55, indicative)
- P7: `mitochondria → mitochondria` (lateral sync, PMC10560087 2023, σ=0.65, indicative)
- P8: `golgi-apparatus → membrane-receptors` (**NEW** ECM-Collagen extracellular waveguide, SHG/NLO, Yang 2024 Optica, σ=0.65, indicative)
- P9: `cytoskeleton → nucleus` (**NEW** Axonal-Myelin step-index waveguide retrograde, PMC11539334 2024, σ=0.50, indicative — downgraded from proposed 0.82)

**Why:** P8/P9 added after 2024-2026 research. P5 raised on Entropy 2026 QED cavity evidence. P2/P3 raised on ferroptosis-MAM and iScience 2025 literature.

**σ is a continuous attention-tensor weight, not a binary confidence flag.** Indicative tier spans 0.50–0.75; P5 at 0.75 and P9 at 0.50 are both valid indicative links at opposite ends.

## Golgi biophoton links — mixed confidence

Secretory-path links where Golgi is *target* (`ER→golgi`, `ribosomes→golgi`): `"speculative"`, σ=0.45. No Golgi UPE measurement published.
`golgi→lysosomes` degradation link: `"indicative"`, σ=0.60. Mannose-6-phosphate routing mechanism is well-characterised even without Golgi emission data.

**How to apply:** New links with `golgi-apparatus` as `sourceOrganelleId` default to speculative unless the routing biology is independently well-characterised.
