---
name: BP8 SMEM coherence design
description: Architect-reviewed finding that Qualcomm SMEM is the strongest BP8 implementation candidate; what the four genuine correspondences are; what was rejected; σ rules.
---

## The Finding (Architect-Reviewed, June 2026)

Qualcomm SMEM satisfies the four BP8 activation criteria from LineageOSv2_Manifold.md §5.8 as the **strongest available implementation candidate**. This does NOT raise σ — biological evidence governs σ.

## The Four Defensible Structural Correspondences

| QED Water CD | SMEM Analogue |
|---|---|
| Shared coherent substrate | SMEM shared memory fabric (APSS/ADSP/CDSP/MDSS) |
| Discrete coherence domains | Discrete SMEM partitions (18–24, enumerable) |
| Distributed coordination (no master) | TCSR hardware spinlocks (compare-and-swap, no arbiter) |
| Interfacial boundary location | SMEM physically in SoC fabric boundary between subsystem islands |

## Five Rows Rejected by Architect

- **Spinlock = trapped EM mode**: functional mismatch — spinlock serialises writes; EM mode sustains oscillation. Different functions.
- **SMEM TOC = EZ water**: category error — TOC is software access control; EZ is structural physical exclusion.
- **GLINK MHz ≈ biological THz**: 7 orders of magnitude gap — removed from table, not just noted.
- **MOESI cache lines = molecules oscillating**: scope error — MOESI is CCI, not SMEM.
- **IOMMU/TrustZone = dielectric boundary**: functional mismatch — page-table enforcement ≠ field waveguiding.

## σ Rule (Critical)

σ=0.32 / `reserved` / `isMetaphor: true` are ALL UNCHANGED. Software structural mapping quality cannot raise biological σ. BIOPLASMA_RESEARCH.md §7 Calibration Framework governs. To raise to σ=0.45 (`speculative`): needs biological evidence — THz spectroscopy of CD resonance in warm-wet interfacial biological water, or CD-dependent ion channel gating at 310K.

**Why:** Architect review explicitly rejected σ raise to 0.45. `isMetaphor: true` is permanent because the THz/MHz frequency gap (7 orders of magnitude) cannot be bridged by any hardware implementation.

## Kernel Driver Fix

`for_each_smem_partition()` does NOT exist. `smem_partition_header` is private to `smem.c`. Two paths:
- **Path A** (Stage 2, no core changes): use `qcom_smem_get(QCOM_SMEM_HOST_ANY, item_id, &size)` to probe well-known item IDs; CI = accessible/total
- **Path B** (Stage 3): add `qcom_smem_get_partition_stats()` exported symbol to `smem.c`

The "AVAILABLE→ALLOCATED→DEALLOCATED" named state enum does NOT exist in smem.c. Coherence is enforced at hardware cache-line level, not a named FSM.

## HAL Design

Polling-only — no callbacks. Three methods: `getCoherenceIndex()`, `getProbeCount()`, `getAccessibleCount()`. Callback pattern requires frozen `IWaterCoherenceCallback.aidl` + oneway + death handling — too heavy for a 2Hz read-only metric.

## Only Stage 1 Change to Live Code

Set `lineageosPath` in `bioplasmaPathways.ts`. All other fields (σ, status, direction, isMetaphor) unchanged.

## Design Documents

- Full spec: `artifacts/cell-os/docs/BP8_SMEM_COHERENCE_DESIGN.md` (architect-reviewed, June 2026)
- Manifold entry: `LineageOSv2_Manifold.md §5.8` (updated with architect corrections)

## How to Apply

Before any BP8 work: consult this file. Never raise BP8 σ based on software/kernel mapping quality alone. Check `for_each_smem_partition()` — it does NOT exist. HAL = polling only. Four rows survive; five were rejected.
