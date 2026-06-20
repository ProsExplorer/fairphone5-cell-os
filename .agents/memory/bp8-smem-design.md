---
name: BP8 SMEM coherence design
description: The structural isomorphism between QED water coherence domains and Qualcomm SMEM that satisfies the BP8 activation criterion; the 3-stage fork specification; σ rationale.
---

## The Finding

Qualcomm SMEM (Shared Memory) satisfies all four BP8 activation criteria from LineageOSv2_Manifold.md §5.8:
1. Non-local — distributed hardware spinlocks across APSS/ADSP/CDSP/MDSS, no central arbiter
2. Phase-coherent — `smem_partition_header` state machine, all processors converge on same allocation phase
3. Active coordination — TCSR/SFPB remote spinlocks + GLINK signalling
4. Interfacial — physically located at SoC fabric boundary between processor subsystem islands

**Why:** SMEM is a genuine structural isomorphism (boundary zone, discrete domains, two-phase system, distributed lock) — not just a loose metaphor. The frequency analogy (biological THz vs. SMEM ~MHz IPC) does NOT hold; `isMetaphor: true` is retained.

## Key Mapping (abbreviated)

| QED Water CD | SMEM Analogue | Driver |
|---|---|---|
| Coherence domain (~100nm) | SMEM partition (discrete region per host pair) | `drivers/soc/qcom/smem.c` |
| Trapped EM mode | TCSR remote spinlock | `smem.c:qcom_smem_get_remote_spinlock()` |
| Hydrophilic surface | `struct smem_ptable` at fixed offset | `smem.c:qcom_smem_probe()` |
| Two-phase system | SMEM (coherent) vs per-process heap (incoherent) | — |

Full 9-row table in `docs/BP8_SMEM_COHERENCE_DESIGN.md`.

## σ Proposal

- Current: σ=0.32, `reserved`, `lineageosPath: null`
- Proposed: σ=0.45, `speculative`, `lineageosPath: "drivers/soc/qcom/smem_coherence.c · android_kernel_fairphone_qcm6490"`
- Stage 2 trigger (→ `indicative`, σ=0.65): real FP5 build + measured CI correlation over ≥24h

**Pending architect ratification before any TypeScript constants change.**

## 3-Stage Fork Spec

- Stage 1 (SPA only): promote BP8 in `bioplasmaPathways.ts`, add `useWaterCoherence.ts` with synthetic CI
- Stage 2 (kernel): `smem_coherence.c` driver — sysfs `/sys/kernel/smem_coherence/coherence_index` (milliCI 0–1000)
- Stage 3 (full AIDL): `vendor.lineage.hardware.watercoherence.IWaterCoherence/default` HAL + VINTF + SELinux

## Design Document

Full spec: `artifacts/cell-os/docs/BP8_SMEM_COHERENCE_DESIGN.md`
Manifold entry: `LineageOSv2_Manifold.md §5.8` (updated to "Reserved → Speculative Candidate")

## How to Apply

Before any future work on BP8: check if architect has ratified the SMEM isomorphism. If ratified, apply Stage 1 changes. Do not raise σ or change status in TypeScript until ratification. The design doc is authoritative for the fork spec.
