---
name: Cell OS ROM Fork Plan
description: Architect-approved strategy for forking LineageOS 21 into Cell OS on FP5; phase structure, repo set, biological fidelity constraints, and generation approach.
---

# Cell OS ROM Fork Plan

**Why:** Document lives at `artifacts/cell-os/docs/CELL_OS_ROM_FORK_PLAN.md`. Future sessions adding ROM fork work must follow this strategy without re-deriving it.

## Core Strategy: ROM-first, kernel-last

Overlay + framework service path. Never fork the kernel until a bootable signed ROM exists on FP5 without it.

## Minimal Fork Set (Phase 1–3)
`android_device_fairphone_FP5`, `android_vendor_lineage`, `android_frameworks_base`, `android_packages_apps_Settings`, `android_packages_apps_LineageParts`, `android_packages_apps_CellShell` (new), local manifests.

## Full Fork Set (Phase 4–5 only)
`android_kernel_fairphone_qcm6490`, `android_hardware_lineage_interfaces`, `build/make`, `frameworks/native`.

## Phase Structure
- P1: ROM boots + Cell OS identity (branding overlays, About page)
- P2: Native domain layer (`generate_domain.py` TypeScript→Kotlin, integrity checks)
- P3: SystemUI biological shell (CellVitalService live, QS tiles, CellShell app)
- P4: SMEM sysfs + HAL integration (kernel optional, BP8 still zero regardless)
- P5: Signed production ROM, OTA, privacy review

## Non-Negotiable Biological Fidelity Constraints
1. **BP8 zero-weight guard** — unconditional `if ("BP8".equals(pathwayId)) return 0.0f;` in `CellVitalServiceImpl.java`. Cannot be removed without BIOPLASMA_RESEARCH.md §9.2 THz evidence changing σ from `reserved`.
2. **P-link count** — build-time: exactly 20 BIOPHOTON_LINKS, 9 P-pathways, 13 BP-pathways, 15 zones. Fail build on mismatch.
3. **σ authority** — BIOPLASMA_RESEARCH.md §9.2 governs BP σ; BIOPHOTON_RESEARCH.md §9.2 governs P σ. Code cannot raise biological σ.
4. **Plasma-literalness enum** — must exist as Kotlin enum in generated domain and AIDL: `LITERAL_QUASI_PLASMA` (BP1), `ELECTROLYTE_ANALOGY` (BP2/3/7/12/14), `FIELD_COHERENCE_ANALOGY` (BP4/5/6/8/9/10/13).
5. **Dormant gene doctrine** — `verified-absent` features (LiveDisplay FP5) are never removed; `isDormant: true` annotation, zero signal, visual placeholder retained.
6. **Sacred/profane boundary** — 以太收斂 framing: ROM identity strings + SystemUI tooltips only. Never in AIDL method names, SELinux labels, kernel Kconfig, or any security/physics/medical claim.

## Domain Port Strategy
`generate_domain.py` parses TypeScript `as const` objects → emits `CellOsDomain.kt` + `cell_os_domain.json`. Never hand-translate constants. Single source of truth is the TypeScript domain.

**How to apply:** Any new session implementing ROM fork components must check this plan before creating new repos, new AIDL interfaces, or kernel patches. The phase gate rule (no Phase 4 until Phase 3 passes acceptance) is strict.
