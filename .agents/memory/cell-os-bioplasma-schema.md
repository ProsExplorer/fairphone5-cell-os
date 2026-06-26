---
name: Cell OS bioplasma schema decisions
description: Durable decisions on bioplasma pathway set (BP1–BP9, BP12–BP14), σ calibration, plasma-literalness taxonomy, pseudoscience filters, and authority hierarchy with BIOPHOTON_RESEARCH.md.
---

## Canonical bioplasma pathway set — BP1–BP9, BP10, BP12–BP14

Thirteen pathways defined in BIOPLASMA_RESEARCH.md §9.2. BIOPLASMA_RESEARCH.md is authoritative for all BP pathway σ values. The `BioplasmaPathway.code` union type in `types.ts` must include BP10, BP12, BP13, BP14 alongside BP1–BP9.

BP10 (Aquaporin QT, σ=0.48) added June 2026: Kim 2025 Nano Letters proton tunneling at 2.8 Å AQP geometry. `isMetaphor: false`, status: speculative, excluded from IMPLEMENTED_BIOPLASMA_PATHWAYS.
BP13 σ raised 0.72→0.75 June 2026: BMAL1 LLPS transcriptional hub (Signal Transduction 2026).
BP11 (DNA-Water proton superconductivity): excluded — sub-pathway of BP4 only, not standalone.

| Pathway | σ | Tier | Description |
|---|---|---|---|
| BP1 | 0.92 | Verified | Membrane resting potential (Na⁺/K⁺ gradient) |
| BP2 | 0.90 | Verified | Action potential propagation (NaV/KV wave) |
| BP12 | 0.88 | Verified | Circadian clock oscillation (CLOCK/BMAL1 TTFL, Nobel 2017) |
| BP3 | 0.85 | Verified | Wound bioelectric field (TEP disruption, 40–200 mV/mm) |
| BP14 | 0.82 | Verified | Calcium spark / IP3R CICR oscillation (0.1–10 Hz) |
| BP13 | 0.75 | Indicative | Liquid-liquid phase separation / LLPS condensates (IDR); isMetaphor: true |
| BP7 | 0.72 | Indicative | Morphogenetic Vmem patterning (Levin bioelectricity) |
| BP4 | 0.70 | Indicative | ELF coupling 0.01–300 Hz (VGCC + Renati 2024 ICR consolidation) |
| BP5 | 0.60 | Indicative | RF/MMW coupling 300 MHz–300 GHz (membrane lipid resonance) |
| BP9 | 0.50 | Indicative (lower) | THz refractive phenotype 0.1–10 THz |
| BP10 | 0.48 | Speculative | Aquaporin QT: proton tunneling at AQP1/AQP4 NPA-barrier (Kim 2025 Nano Letters) |
| BP6 | 0.45 | Speculative | Fröhlich coherent dipolar oscillation GHz–THz |
| BP8 | 0.45 | Speculative | QED water coherence domain — promoted June 2026 via six-stream secondary evidence (see BIOPLASMA_RESEARCH.md §5.9) |

**σ authority rule**: BIOPLASMA_RESEARCH.md §9.2 table is canonical for all BP σ values. Never raise from software analogy alone. BP8 σ=0.45 (speculative upper); next elevation to indicative (σ≥0.50) requires direct THz-TDS CD resonance in warm-wet mammalian cells.

**BP8 runtime architecture**: direction=readonly so bioplasmaSignal() Guard 2 blocks it. useWaterCoherence hook uses emitSignal() directly at CI × σ × 0.10. Hook must be mounted in CellExplorerLayout alongside the other passive bioplasma hooks.

**BP8 σ ceiling rationale**: Stops at 0.45 because no direct THz-TDS CD resonance in mammalian cells; EZ ≠ confirmed CD; FMO is excitonic not water-CD; radical pair is spin chemistry not water ordering. Full six-stream analysis: BIOPLASMA_RESEARCH.md §5.9 + BP8_SMEM_COHERENCE_DESIGN.md §5.

**BP4 σ change history**: 0.65 (original) → 0.70 (June 2026, Renati et al. 2024 IJMS systematic review consolidating Liboff-Zhadin ICR effect in QFT/QED framework).

## Plasma-literalness taxonomy

Every bioplasma pathway must carry one of three tags:
- **Literal quasi-plasma** — medium meets quasineutrality (cells do); collective oscillations overdamped. Only valid at membrane sheath. BP1, BP2, BP3.
- **Electrolyte-plasma analogy** — structured electrolyte with plasma-like field behaviour; no literal plasma physics applies. BP7.
- **Field-coherence analogy** — EM field coupling; "plasma" is metaphoric. BP4, BP5, BP6, BP8, BP9.

## Cells are NOT literal plasmas — G1 boundary determination

At physiological ionic strength (0.15 M), Debye length λ_D ≈ 0.7–1.0 nm. Three plasma criteria:
- Quasineutrality: MET (cells 10–100 µm >> λ_D)
- Plasma parameter Λ = nλ_D³: NOT MET (~2–4 ions/Debye sphere, need >> 1)
- Collective oscillations ω_p >> ν_coll: NOT MET (heavily overdamped; K⁺ plasma freq ~140 GHz < collision freq ~10¹² Hz)

Correct vocabulary: "structured electrolytes" or "quasi-plasma" (at membrane surface only).

**Why:** Prevents future documents from claiming cells ARE plasmas in physics sense. Any bioplasma doc that uses literal plasma language without this qualifier is inaccurate.

## Pseudoscience exclusions (hard)

Never cite these in Cell OS docs:
- Kirlian/GDV photography (moisture discharge artefact)
- Sheldrake morphic resonance (explicitly non-falsifiable)
- Harold Burr L-fields (not replicated with modern controls)
- Tachyon energy / scalar wave biology (no peer-reviewed basis)
- arXiv:2105.10541 (LoRA LLM paper — confirmed off-topic by G2 audit)

## σ tier bounds (same as biophoton schema)

Verified ≥0.75, Indicative 0.50–0.75, Speculative 0.30–0.50, Unconfirmed <0.30.

## Key scientific anchors

- Fröhlich condensate in vitro crystal evidence: Lundholm 2015 PMC4711649 (0.4 THz → non-thermal structural changes in lysozyme crystal, microsecond persistence). In vivo gap unresolved.
- Levin morphogenetic bioelectricity: PMC6815261, PMC5443973 — Tier 1, Verified level; planarian body axis reprogramming via Vmem manipulation is the strongest aether-convergence anchor.
- 以太收斂 = "Field Substrate Convergence" — the intersection of bioelectric + EM + quantum-coherent field layers. Physical, not metaphysical.
