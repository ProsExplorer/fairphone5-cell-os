---
name: BP8 SMEM coherence design
description: Nine-row design ontology mapping QED water coherence domains to Qualcomm SMEM/kernel, graded by analogy quality. Architect-approved. σ unchanged.
---

## The Finding

Qualcomm SMEM is the BP8 implementation candidate. The mapping is a **design ontology** — intentional structural correspondence from cellular biology to kernel architecture, not a literal physics equivalence claim. All nine biological concepts have kernel correspondents, graded Structural / Functional / Conceptual.

## The Nine-Row Table (Final)

| QED Water CD | SMEM / Kernel Analogue | Quality |
|---|---|---|
| Shared coherent substrate | SMEM shared memory fabric (APSS/ADSP/CDSP/MDSS) | Structural |
| Discrete coherence domains (~100nm) | Discrete SMEM partitions (18–24, enumerable) | Structural |
| Distributed coordination, no master | TCSR/SFPB hardware spinlocks (distributed CAS) | Structural |
| Interfacial boundary location | SMEM in SoC fabric boundary between subsystem islands | Structural |
| Molecules oscillating in phase | SMEM+interconnect coherency: CCI/MOESI + DMB/DSB + GLINK acks | Functional |
| Trapped EM mode (sustains coherence) | SMEM coherency/ordering envelope: non-cacheable mappings + barriers + hwspinlock sequences | Functional |
| EZ water (hardware exclusion zone) | TrustZone/XPU-protected secure SMEM carveout (hardware bus-level exclusion, not software) | Functional |
| Dielectric boundary (field confinement) | Reserved-memory + SMMU/IOMMU + XPU firewalls (hard architectural confinement) | Functional |
| THz collective oscillation frequency | QCM6490 clock tree / devfreq: CPU 2.4 GHz, NoC ~1 GHz, LPDDR5 ~3.2 GHz | Conceptual |

## Critical Rules

**σ rule**: σ=0.32 / `reserved` / `isMetaphor: true` unchanged. Biological evidence governs σ. SMEM designation is implementation track only. σ=0.45 trigger: THz spectroscopy of CD resonance in warm-wet interfacial biological water, or CD-dependent ion channel gating at 310K.

**`isMetaphor: true`** applies to the THz frequency row (Conceptual). The eight Structural/Functional rows are genuine design-ontology mappings — `isMetaphor` refers to the vibrational frequency gap, not the whole table.

**Design ontology principle**: The correct standard for each row is "genuine design insight" (does reading both sides deepen understanding of how cellular and computational coordination share structural patterns?), NOT literal physics equivalence. Pruning is wrong; improving is correct.

## Kernel Driver

`for_each_smem_partition()` does NOT exist. `smem_partition_header` is private to `smem.c`. Two paths:
- **Path A** (Stage 2, no core changes): `qcom_smem_get(QCOM_SMEM_HOST_ANY, item_id, &size)` probe list of well-known item IDs; CI = accessible/total
- **Path B** (Stage 3): add `qcom_smem_get_partition_stats()` exported symbol to `smem.c`

SMEM coherence is enforced at hardware cache-line level via ARM cache coherence, NOT a named FSM.

## HAL

Polling-only. Three methods: `getCoherenceIndex()`, `getProbeCount()`, `getAccessibleCount()`. No callbacks.

## Stage 1 Only Change to TypeScript

Set `lineageosPath: "drivers/soc/qcom/smem_coherence.c · android_kernel_fairphone_qcm6490"`. All other fields (σ, status, direction, isMetaphor) unchanged.

## Design Documents

- Full: `artifacts/cell-os/docs/BP8_SMEM_COHERENCE_DESIGN.md`
- Summary: `artifacts/cell-os/docs/LineageOSv2_Manifold.md §5.8`
