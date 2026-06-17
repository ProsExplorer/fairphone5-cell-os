---
name: Cell OS biophoton schema decisions
description: Durable decisions from the BIOPHOTON_RESEARCH.md §13 implementation — type additions, σ calibration, canonical pathway set, and ConfidenceBadge update rule.
---

## Key decisions

### ClaimConfidence — "speculative" added, "unconfirmed" kept
`ClaimConfidence = "verified" | "indicative" | "unconfirmed" | "speculative"`.
`"unconfirmed"` is retained for backward compatibility with existing substrate/QI data.
New biophoton links use `"speculative"` (not "unconfirmed") for proposed-but-unevidenced pathways.

**Why:** The research vocabulary uses "speculative" for σ 0.30–0.50 pathways. "unconfirmed" has different semantics in the existing codebase (used for substrate hardware specs that couldn't be verified). Keeping both avoids a mass rename while establishing correct vocabulary for new data.

**How to apply:** Whenever `ClaimConfidence` grows, `ConfidenceBadge.tsx` must be updated — it uses `Record<ClaimConfidence, string>` for both LABELS and STYLES, so TypeScript will catch the omission at compile time. The TypeScript error is the signal; fix it there first.

### wavelengthBand — optional field on BiophotonLink
`wavelengthBand?: "UV" | "blue-green" | "red" | "NIR" | "deep-NIR"` added to `BiophotonLink` in `types.ts`.
Values map to: UV=200–380nm, blue-green=400–550nm, red=570–670nm, NIR=700–900nm, deep-NIR=900–1400nm.
All 18 links in BIOPHOTON_LINKS now carry this field.

### Canonical 7-pathway set (P1–P7) — now all represented
Post-audit BIOPHOTON_LINKS total: **18 links** (was 13).
- P1: `mitochondria → nucleus` (direction was inverted; fixed — retrograde, NIR, σ=0.65, indicative)
- P2: `endoplasmic-reticulum → mitochondria` (new, red, σ=0.55, indicative)
- P3: `cell-membrane → membrane-receptors` (new, blue-green, σ=0.80, verified — bystander effect)
- P4: `nucleus → cytoplasm` (new, UV, σ=0.35, speculative)
- P5: `cytoskeleton → mitochondria` (new, NIR, σ=0.60, indicative — microtubule waveguide)
- P6: `cell-membrane → nucleus` (existing, recalibrated σ=0.60)
- P7: `mitochondria → mitochondria` (new self-link, red, σ=0.65, indicative — lateral sync)

### σ calibration tiers (biologically calibrated, §9.4)
- Verified pathways: σ ≥ 0.75 (P3 at 0.80 is the only verified inter-cellular link)
- Indicative pathways: σ 0.50–0.75
- Speculative pathways: σ 0.30–0.50

**Why:** Previous implementation had indicative links at σ=0.9, which falsely implied Verified-tier certainty. The biological research provides explicit evidence-tier-to-σ guidance that must be followed.

### QI tensor — now 39 intersections (was 36)
Three quantum-scale biophoton intersections added:
- `mitochondria-perception-quantum` (verified — ROS photon readout)
- `nucleus-affect-quantum` (indicative — tautomeric UV emission)
- `membrane-expression-quantum` (verified — bystander biophoton broadcast)

### Architect tool timeout avoidance
Three focused calls (max 2-3 files each, `responsibility: "plan"`) instead of one 50-file call.
The 600s timeout triggers when too many large files are passed to a single architect call.
