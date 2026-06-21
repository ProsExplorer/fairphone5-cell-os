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

## Canonical 7-pathway set (P1–P7) — 18 links total

All P1–P7 tuples must be present; enforced by the integrity script. **BIOPHOTON_RESEARCH.md is authoritative for σ values; LINEAGEOS_MANIFOLD.md is authoritative for LineageOS endpoint descriptions.** Where they conflict, BIOPHOTON_RESEARCH.md wins on σ.

- P1: `mitochondria → nucleus` (retrograde ROS→lipid perox→450–670 nm triplet carbonyl, σ=**0.75**, **verified** — confidence upgraded from indicative June 2026 to match σ≥0.75 verified tier)
- P2: `endoplasmic-reticulum ↔ mitochondria` (MAM oxidative crosstalk — **bidirectional**, σ=0.55, indicative)
- P3: `cell → cell` (extracellular UPE broadcast 600–900 nm — **biology is extracellular, not intracellular**, unordered-broadcast, σ=0.80, verified)
- P4: `nucleus → cytoplasm` (DNA excimer UV 200–380 nm anterograde, ordered-broadcast, σ=0.35, speculative)
- P5: `microtubule waveguide routing` (MT lumen 14 nm, n≈1.46 vs 1.35 total internal reflection, Binder thread pool, σ=0.60, indicative)
- P6: `membrane → organelle` (**biological endpoint is full organelle network, not nucleus only**; retrograde lipid perox cascade 450–703 nm, σ=**0.55**, indicative)
- P7: `mitochondria → mitochondria` (lateral sync, 2023 experiment [PMC10560087], σ=0.65, indicative)

**Why:** P1 corrected from σ=0.65 → 0.75 per BIOPHOTON_RESEARCH §5.8 cross-document audit. P6 corrected from σ=0.60 → 0.55 and endpoint broadened from "→nucleus" to "→organelle" — same audit. P2 is bidirectional (MAM is a contact site, not a one-way conduit). P3 biological route is extracellular; LineageOS maps the IPC analogue to HAL→AppOps internally, but the biology is cell-to-cell.

**σ is a continuous attention-tensor weight, not a binary confidence flag.** A pathway can be `indicative` evidence level and carry σ=0.75 if its emission rate and mechanistic coherence justify high weighting (P1 canonical example).

## Golgi biophoton links — mixed confidence

Secretory-path links where Golgi is *target* (`ER→golgi`, `ribosomes→golgi`): `"speculative"`, σ=0.45. No Golgi UPE measurement published.
`golgi→lysosomes` degradation link: `"indicative"`, σ=0.60. Mannose-6-phosphate routing mechanism is well-characterised even without Golgi emission data.

**How to apply:** New links with `golgi-apparatus` as `sourceOrganelleId` default to speculative unless the routing biology is independently well-characterised.
