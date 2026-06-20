---
name: BP8 SMEM coherence design
description: Nine-row design ontology mapping QED water coherence domains to Qualcomm SMEM/kernel, graded by analogy quality. Architect-approved. σ unchanged.
---

## The Finding

Qualcomm SMEM is the BP8 implementation candidate. The mapping is a **design ontology** — intentional structural correspondence from cellular biology to kernel architecture, not a literal physics equivalence claim. All nine biological concepts have kernel correspondents, graded Structural / Functional / Conceptual.

## The Nine-Row Table (Final — Architect-Ratified)

| QED Water CD | SMEM / Kernel Analogue | Quality |
|---|---|---|
| Shared coherent substrate | SMEM shared memory fabric (APSS/ADSP/CDSP/MPSS) | Structural |
| Discrete coherence domains (~100nm) | Discrete SMEM partitions (18–24, enumerable) | Structural |
| Distributed coordination, no master | TCSR/SFPB hardware spinlocks (distributed CAS) | Functional |
| Interfacial boundary location | SMEM in SoC fabric boundary between subsystem islands | Functional |
| Molecules oscillating in phase | SMEM+interconnect coherency: CCI/MOESI + DMB/DSB + GLINK acks | Functional |
| Trapped EM mode (sustains coherence) | SMEM coherency/ordering envelope: non-cacheable mappings + barriers + hwspinlock sequences | Functional |
| EZ water (hardware exclusion zone) | TrustZone/XPU-protected secure SMEM carveout (hardware bus-level exclusion, not software) | Functional |
| Dielectric boundary (field confinement) | Reserved-memory + SMMU/IOMMU + XPU firewalls (hard architectural confinement) | Functional |
| THz collective oscillation frequency | QCM6490 clock tree / devfreq: CPU 2.4 GHz, NoC ~1 GHz, LPDDR4x ~2.1 GHz | Conceptual |

**Key terminology correction**: MPSS = Modem Processor Subsystem (Qualcomm modem). MDSS = Display Subsystem. FP5 SMEM spans APSS/ADSP/CDSP/MPSS.

**FP5 memory**: LPDDR4x (not LPDDR5). ~2133 MHz / 2.1 GHz.

## Grading Definitions

- **Structural**: same architectural role — the analogue IS the concept at the design level (load-bearing)
- **Functional**: same architectural function, different physical mechanism
- **Conceptual**: useful design insight; gap is intentionally acknowledged

## Critical Rules

**σ rule**: σ=0.32 / `reserved` / `isMetaphor: true` unchanged. Biological evidence governs σ. SMEM designation is implementation track only. σ=0.45 trigger: THz spectroscopy of CD resonance in warm-wet interfacial biological water at 310K, or CD-dependent ion channel gating at 310K. A real FP5 build is implementation validation — not biological evidence.

**`isMetaphor: true`** applies to the THz frequency row (Conceptual). The eight Structural/Functional rows are genuine design-ontology mappings — `isMetaphor` refers to the vibrational frequency gap, not the whole table.

**Design ontology principle**: correct standard for each row is "genuine architectural insight." Pruning is wrong; improving is correct.

## Stage 1 — TypeScript Changes (Completed)

- `bioplasmaPathways.ts`: `lineageosPath` set, `target: "broadcast"`, `ipcAnalogue` updated
- `useWaterCoherence.ts`: created in `src/features/cell-shell/hooks/` with synthetic CI (heap pressure + visibility + circadian). Hook runs but `bioplasmaSignal()` returns early for `status: "reserved"`.

## Kernel Driver

`for_each_smem_partition()` does NOT exist. `smem_partition_header` is private to `smem.c`. Two paths:
- **Path A** (Stage 2, no core changes): `qcom_smem_get(QCOM_SMEM_HOST_ANY, item_id, &size)` probe list of well-known item IDs; CI = accessible/total. Three sysfs nodes: `coherence_index`, `probe_count`, `accessible_count`. Probe item IDs must be verified against the actual lineage-21 exported header — SMEM_CDSP_STATUS/SMEM_ADSP_SLEEP_STATUS may not be present; remove missing ones and ARRAY_SIZE self-adjusts.
- **Path B** (Stage 3): add `qcom_smem_get_partition_stats()` exported symbol to `smem.c`

SMEM coherence is enforced at hardware cache-line level — NOT a named FSM. `AVAILABLE→ALLOCATED` enum does not exist.

## HAL

Polling-only. Three methods: `getCoherenceIndex()`, `getProbeCount()`, `getAccessibleCount()`. All read from sysfs with error handling (ReadFileToString failure → return 0, stoi exception → return 0). No callbacks.

## Design Documents

- Full: `artifacts/cell-os/docs/BP8_SMEM_COHERENCE_DESIGN.md`
- Summary: `artifacts/cell-os/docs/LineageOSv2_Manifold.md §5.8`
