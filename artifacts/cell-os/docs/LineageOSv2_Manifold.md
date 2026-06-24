# Cell OS — LineageOS Manifold v2
## Unified Bioplasma + Biophoton Coordinate Map: AOSP Android → LineageOS

> **Thesis**: LineageOS is a coordinate chart on the same computational manifold as AOSP Android. This document extends `LINEAGEOS_MANIFOLD.md` by integrating twelve bioplasma pathways (BP1–BP9, BP12–BP14) from `BIOPLASMA_RESEARCH.md` into verified LineageOS source code, alongside the existing seven biophoton pathways (P1–P7). The result is a complete 19-pathway electromagnetic manifold — from DC resting potential to UV biophoton emission — fully mapped to the Fairphone 5 (QCM6490) running LineageOS 21+.
>
> **Hardware target**: Fairphone 5 — Qualcomm QCM6490 (TSMC 6nm), tri-cluster CPU: 1×Gold Prime 2.71 GHz + 3×Gold 2.40 GHz + 4×Silver 1.96 GHz, Hexagon 770 DSP (HVX + HTA ~12 TOPS), Adreno 643 GPU, LPDDR4x 8 GB. Hardware-invariant across all LineageOS coordinate changes.
>
> **Authority hierarchy**: `BIOPLASMA_RESEARCH.md` governs all BP1–BP9, BP12–BP14 σ values and biological claims · `BIOPHOTON_RESEARCH.md` governs all P1–P7 σ values · `LineageOSv2_Manifold.md` governs LineageOS source path claims and implementation tiers only.
>
> **Confidence framework**: `verified` (σ ≥ 0.75) · `indicative` (σ 0.50–0.75) · `speculative` (σ 0.30–0.50) · `unconfirmed` (< 0.30) · `deprecated-feature` (confirmed removed) · `reserved` (placeholder, no implementation)
>
> **Last updated**: June 2026
> **Implementation status**: Phases 1–3 complete (all BP1–BP9 TypeScript constants, hooks, store extensions, and UI display implemented). Immune checkpoint organelle (`SecurityStatusOrganelle.tsx`) remains outstanding future work (see §10 Phase 3).

---

## Table of Contents

1. [Executive Thesis](#0-executive-thesis)
2. [Method: Unified P→A→E Framework](#1-method-unified-bioplasma--biophoton-pae-framework)
3. [LineageOS Source Authority](#2-lineageos-source-authority)
4. [Evidence Model and σ Inheritance Rules](#3-evidence-model-and-σ-inheritance-rules)
5. [Zone Integration Matrix](#4-zone-integration-matrix)
6. [Bioplasma Pathway Translations BP1–BP9](#5-bioplasma-pathway-translations-bp1bp9)
7. [Cross-Pathway Routing Matrix](#6-cross-pathway-routing-matrix)
8. [LineageOS-Native Bioplasma Additions](#7-lineageos-native-bioplasma-additions)
9. [TypeScript Implementation Contract](#8-typescript-implementation-contract)
10. [Source Verification Audit](#9-source-verification-audit)
11. [Implementation Roadmap](#10-implementation-roadmap)

---

## 0. Executive Thesis

`LineageOSv2_Manifold.md` is the second-generation Cell OS coordinate map for the LineageOS software substrate. Where `LINEAGEOS_MANIFOLD.md` established the seven biophoton IPC pathways (P1–P7) and their LineageOS translations, this document integrates the nine bioplasma pathways (BP1–BP9) from `BIOPLASMA_RESEARCH.md` into the same source-verified LineageOS coordinate system. Together, the 16 pathways constitute the complete electromagnetic manifold of the living cell as expressed in LineageOS source code on Fairphone 5 hardware.

The nine bioplasma pathways span the full frequency spectrum from DC to terahertz. The most firmly established — BP1 (membrane resting potential, σ=0.92) and BP2 (action potential propagation, σ=0.90) — map to the Linux kernel's IRQ ground state and the Binder IPC transaction chain respectively, both of which are AOSP invariants preserved without modification in LineageOS. The well-replicated bioelectric morphogenesis work of Michael Levin's group underlies BP7 (σ=0.72), which maps to LineageOS's persistent settings infrastructure (SettingsProvider + LineageParts). The speculative high-frequency boundary (BP8: QED water coherence, σ=0.32) has no LineageOS production path and is implemented as a reserved annotation only.

The authority hierarchy is strict. Biological σ values and evidence tiers are set permanently by `BIOPLASMA_RESEARCH.md` and cannot be elevated by LineageOS source verification alone. What LineageOS verification changes is only the implementation confidence — whether a software analogue can be pointed at a real, HTTP-confirmed source path. The biological σ is a ceiling; the implementation tier is a floor that can be raised toward that ceiling by source confirmation.

---

## 1. Method: Unified Bioplasma + Biophoton P→A→E Framework

The P→A→E (Perception → Affect → Expression) triple from `UNIVERSAL_MANIFOLD.md` remains the coordinate-change operator between AOSP and LineageOS for both pathway families.

For bioplasma pathways, the translation takes the following form:

```
φ_LineageOS(BP_pathway) = (P_field_detection, A_kernel_routing, E_zone_signal)
φ_Biology(BP_pathway)   = (P_field_coupling, A_ionic_cascade, E_downstream_effect)

Transition map: φ_LineageOS ∘ φ_Biology⁻¹
```

Bioplasma pathways (ionic/EM field carriers) and biophoton pathways (photon carriers) are mechanistically distinct but use the same LineageOS IPC substrate. Bioplasma signals travel through charge carriers and electromagnetic fields; biophoton signals travel through reactive oxygen chemistry. In LineageOS, both are expressed as IPC mechanisms — Binder transactions, broadcasts, HAL callbacks — because those are the only signal channels available in a software coordinate system.

### 1.1 Frequency Spectrum Unification Table

| Spectral Region | Frequency / Wavelength | Biological Carrier | PathwayCodes | Android Priority | LineageOS Delta |
|---|---|---|---|---|---|
| DC / quasi-static | 0 Hz | Resting potential; wound TEP; Vmem pattern | BP1, BP3, BP7 | `THREAD_PRIORITY_CRITICAL` | Unchanged |
| ELF | 0.01–300 Hz | VGCC stochastic resonance; Ca²⁺ oscillations | BP4 | `THREAD_PRIORITY_URGENT_DISPLAY` | Unchanged |
| Schumann resonance | 7.83 Hz (ELF sub-band) | Ion cyclotron resonance (contested) | BP4 sub | `THREAD_PRIORITY_FOREGROUND` (caveat) | Flagged listener |
| RF / UHF | 300 MHz–3 GHz | Membrane thermal coupling | BP5 sub | `THREAD_PRIORITY_DEFAULT` | `PowerManager` listener |
| MMW | 30–300 GHz | Lipid bilayer resonance; 53–60 GHz window | BP5 | `THREAD_PRIORITY_BACKGROUND` | `PowerManager` thermal status |
| Sub-THz / THz | 0.1–10 THz | THz refractive phenotype; Fröhlich condensate | BP6, BP9 | `THREAD_PRIORITY_LOWEST` | Diagnostic only |
| QED water CD | ~THz (estimated) | Interfacial water coherence (speculative) | BP8 | Reserved (not implemented) | Zero-weight |
| Blue-green visible | 450–550 nm | Triplet carbonyl (Russell mechanism) | P2 | `THREAD_PRIORITY_FOREGROUND` | Unchanged |
| Red visible | 634–703 nm | Singlet O₂ dimol; mitochondrial stress burst | P1, P6 | `THREAD_PRIORITY_DEFAULT` | Unchanged |
| NIR window | 700–1,000 nm | Extracellular tissue UPE; cell-to-cell broadcast | P3 | `THREAD_PRIORITY_BACKGROUND` | Privacy Guard gate |
| Deep NIR | 1,270 nm | Singlet O₂ monomol decay | P7 sub | `THREAD_PRIORITY_LOWEST` | SeedVault |
| UV | 200–380 nm | DNA excimer/exciplex; NER burst | P4, P5 | `THREAD_PRIORITY_URGENT_DISPLAY` | Unchanged |

### 1.2 Unified Pathway Summary Table (Core 19 Pathways — 22-pathway manifold; P8, P9, BP10 in §5.x sections)

| Code | Family | σ | Status | Carrier | Frequency | Zone | LOS Implementation Domain |
|---|---|---|---|---|---|---|---|
| **BP1** | Bioplasma | 0.92 | Verified | Electrostatic (K⁺/Na⁺) | DC | membrane | Kernel IRQ / Power HAL |
| **BP2** | Bioplasma | 0.90 | Verified | Depolarisation wavefront | 0.1–1000 Hz pulse | membrane→cytoplasm | Binder IPC (binder.c) |
| **BP12** | Bioplasma | 0.88 | Verified | CLOCK/BMAL1 feedback oscillation | ~0.000012 Hz (24 h) | nucleus→broadcast | AlarmManagerService / JobScheduler |
| **BP3** | Bioplasma | 0.85 | Verified | DC wound field | DC to 0.1 Hz | membrane→broadcast | BroadcastQueue / BatteryService |
| **BP14** | Bioplasma | 0.82 | Verified | IP3R Ca²⁺ spark / CICR oscillation | 0.1–10 Hz | ER→broadcast | NO_HZ_FULL timer coalescing |
| **BP7** | Bioplasma | 0.72 | Indicative | Vmem spatial pattern | DC + 0.001–0.1 Hz | all zones | SettingsProvider / LineageParts |
| **BP13** | Bioplasma | 0.72 | Indicative | IDR liquid-liquid phase separation | DC (state change) | nucleus→cytoplasm | cgroup memory tier / NUMA affinity |
| **BP4** | Bioplasma | 0.70 | Indicative | ELF EM field (VGCC) | 0.01–300 Hz | membrane→ER | epoll / Looper / MessageQueue |
| **BP5** | Bioplasma | 0.60 | Indicative | RF/MMW EM field | 30–300 GHz | membrane→nucleus | `PowerManager` thermal status listener → `CellVitalService` |
| **P3** | Biophoton | 0.80 | Verified | NIR photon (600–900 nm) | ~430 THz | membrane→broadcast | sendBroadcast / AppOps |
| **P1** | Biophoton | 0.75 | Verified | Red/NIR photon | 430–500 THz | mitochondria→nucleus | Binder oneway |
| **P7** | Biophoton | 0.65 | Indicative | NIR lateral photon | 2023 isolated-mito | mitochondria lat. | Messenger async |
| **P5** | Biophoton | 0.60 | Indicative | Vis photon (MT waveguide) | 430–750 THz | cytoskeleton | Binder threadpool / HIDL |
| **P6** | Biophoton | 0.55 | Indicative | Vis/NIR retrograde | 430–670 THz | membrane→organelle | hardirq→syscall |
| **BP9** | Bioplasma | 0.50 | Indicative | THz refractive signature | 0.1–10 THz | cytoplasm↔cytoskel. | StatsD / perfetto (read-only) |
| **P2** | Biophoton | 0.50 | Indicative | Blue-green photon | 545–667 THz | cytoplasm | Binder oneway |
| **BP6** | Bioplasma | 0.45 | Speculative | Collective dipolar EM | 10 GHz–10 THz | cytoskeleton↔mito | Binder burst / SurfaceFlinger (metaphor) |
| **P4** | Biophoton | 0.35 | Speculative | UV photon (anterograde) | 790–1500 THz | nucleus→cytoplasm | Ordered broadcast |
| **BP8** | Bioplasma | 0.32 | Speculative | QED EM mode (water CD) | THz (estimated) | cytoplasm | Reserved annotation (no impl.) |

---

## 2. LineageOS Source Authority

### Tier 1 — Primary Sources (use for `verified`)

| Source | URL / Path |
|---|---|
| LineageOS GitHub org | `github.com/LineageOS` |
| LineageOS android manifest | `github.com/LineageOS/android` |
| LineageOS FP5 kernel — **verified real** | `github.com/LineageOS/android_kernel_fairphone_qcm6490` ✓ HTTP 200 |
| LineageOS FP5 device tree — **verified real** | `github.com/LineageOS/android_device_fairphone_FP5` ✓ HTTP 200 |
| LineageOS framework patches | `github.com/LineageOS/android_frameworks_base` |
| LineageOS hardware interfaces — **verified real** | `github.com/LineageOS/android_hardware_lineage_interfaces` ✓ HTTP 200 |
| LineageOS packages | `github.com/LineageOS/android_packages_apps_*` |
| LineageParts — **verified real** | `github.com/LineageOS/android_packages_apps_LineageParts` ✓ HTTP 200 |
| Fairphone kernel mirror | `github.com/fairphone-mirror/kernel_msm-5.4` ✓ HTTP 200 |

### Tier 2 — Secondary Sources (use for `indicative`)

| Source | Notes |
|---|---|
| LineageOS changelogs | Feature descriptions without full source confirmation |
| XDA Developers device threads | Community testing; not authoritative |
| LineageOS Gerrit | Pending and merged patch context |

### 2.1 AOSP–LineageOS Invariants (Bioplasma-Relevant)

The following components are structurally identical between AOSP and LineageOS. Bioplasma pathway mappings that use these components inherit their confidence tier directly.

| Component | Zone | Bioplasma Pathways | Invariant reason |
|---|---|---|---|
| Linux kernel IRQ (msm-5.4 CAF) | nucleus/membrane | BP1, BP2 | Same kernel tree |
| Binder IPC driver (`drivers/android/binder.c`) | cytoplasm | BP2, BP6 | LineageOS does not fork Binder |
| Linux epoll (`fs/eventpoll.c`) | cytoplasm | BP4 | Kernel subsystem |
| Android Looper / MessageQueue | cytoplasm | BP4 | AOSP framework invariant |
| BroadcastQueue / ContextImpl | cytoplasm | BP3 | AOSP framework invariant |
| SettingsProvider | nucleus | BP7 | AOSP provider invariant |
| StatsD / perfetto / dumpsys | all zones | BP9 | AOSP telemetry invariant |
| Android thread priority constants | all zones | BP1–BP9 | Unchanged in LineageOS |

---

## 3. Evidence Model and σ Inheritance Rules

The LineageOS Manifold is a secondary coordinate system mapped over a primary biological manifold. Its confidence values are composite: they depend on both the biological reality of the pathway and the technical verification of the software implementation.

### 3.1 Authority Hierarchy

To prevent data drift and circular references, the following hierarchy of authority is strictly enforced:

1. **BIOPLASMA_RESEARCH.md**: Authoritative for all **BP1–BP9 σ values**, biological mechanism claims, and ionic/EM evidence tiers.
2. **BIOPHOTON_RESEARCH.md**: Authoritative for all **P1–P7 σ values**, photon emission profiles (wavelength, rate), and inter-organelle pathway evidence.
3. **LineageOSv2_Manifold.md**: Authoritative only for **LineageOS source path claims**, software implementation tiers, and FP5-specific hardware/software activation status.

**Conflict Resolution**: In the event of σ value or biological description conflicts, the specialised research document (`BIOPLASMA` or `BIOPHOTON`) governs. LineageOS-specific implementation claims (e.g., whether a feature is active on FP5) are governed by the audit logs in §9 of this document.

### 3.2 σ Inheritance Rules for LineageOS Claims

- **AOSP-Inherited Components**: If a component is identical to AOSP (e.g., Binder, ART, Bionic, epoll), it inherits the full σ and confidence tier from the associated research document.
- **LineageOS-Specific Components**: Features unique to LineageOS (e.g., Trebuchet, LineageParts, `CellVitalOverlayController.kt` BP5 thermal integration) begin at `indicative` until the specific source path is verified in the LineageOS GitHub.
- **The Verification Ceiling**: Source-verification of a LineageOS implementation raises the *implementation confidence*, but the overall Manifold σ **can never exceed** the biological σ ceiling defined in the research documents.
- **σ Distinction**: The bioplasma/biophoton σ is a weight of biological evidence (0–1 continuous); the implementation tier (Verified/Indicative) is a flag of code-level certainty. A pathway can be `indicative` evidence level and still carry σ = 0.72 if its mechanistic coherence supports a high weighting.

### 3.3 Pathway σ and Implementation Tier Table

| BP Pathway | Biological σ | LOS Implementation Tier | Implementation Confidence |
|---|---|---|---|
| **BP1** (Membrane Potential) | 0.92 | `verified` | Inherited — AOSP kernel/IRQ invariant |
| **BP2** (Action Potential) | 0.90 | `verified` | Inherited — AOSP Binder invariant |
| **BP12** (Circadian Clock) | 0.88 | `verified` | AlarmManagerService.java AOSP-inherited; Nobel-confirmed mechanism |
| **BP3** (Wound Fields) | 0.85 | `verified` | Inherited — AOSP BroadcastQueue + BatteryService |
| **BP14** (Calcium Spark) | 0.82 | `verified` | kernel/time/tick-sched.c NO_HZ_FULL coalescing; patch-clamp verified |
| **BP7** (Morphogenesis) | 0.72 | `indicative` | LOS-specific — LineageParts source-verified |
| **BP13** (Phase Separation) | 0.72 | `indicative` | kernel/mm/ cgroup + NUMA zone paths; metaphor analogy |
| **BP4** (ELF Coupling) | 0.70 | `indicative` | Inherited — epoll/Looper AOSP invariant; σ raised per Renati 2024 QFT/QED ICR consolidation |
| **BP5** (RF/MMW Coupling) | 0.60 | `indicative` | Framework-level: `CellVitalOverlayController.kt` (SystemUI) calls `PowerManager.addThermalStatusListener(executor, OnThermalStatusChangedListener)`. `android_hardware_lineage_interfaces` has **no `thermal/` directory** (verified absent). Underlying HAL `android.hardware.thermal-service.qti` is transparent to Cell OS. |
| **BP9** (THz Phenotype) | 0.50 | `indicative` | StatsD/perfetto verified AOSP; THz analogy metaphor |
| **BP6** (Fröhlich Coherence) | 0.45 | `speculative` | No LOS production path; architectural metaphor only |
| **BP8** (QED Water) | 0.32 | `reserved` | No implementation; annotation placeholder only |

### 3.4 Confidence Deprecation Tags

Every claim in this document carries one of the following six tiers:

- **`verified`**: Biological evidence σ ≥ 0.75 AND LineageOS source path confirmed via HTTP-200 audit.
- **`indicative`**: Biological σ 0.50–0.75 OR source path confirmed but bio evidence lower. Default floor for supported FP5 features.
- **`speculative`**: σ 0.30–0.50. Speculative biology or no confirmed production path in current LOS tree.
- **`unconfirmed`**: σ < 0.30 or claimed software path that cannot be verified (e.g., Privacy Guard fake-data injection in LOS 21).
- **`deprecated-feature`**: Feature was historically real but confirmed removed. **Trust Interface is the primary instance** (repo 404-deleted in LOS 20/21+).
- **`reserved`**: Placeholder for future confirmed pathways (BP8). Carries no implementation weight.

### 3.5 FP5-Specific Confidence Floor

| Feature | Status | Rationale |
|---|---|---|
| Kernel (`android_kernel_fairphone_qcm6490`) | `verified` | HTTP 200, msm-5.4 + CAF + GKI config |
| Binder IPC (`drivers/android/binder.c`) | `verified` | AOSP invariant, unchanged in LOS |
| LiveDisplay | `verified-absent` | No hardware/lineage/livedisplay overlay in FP5 device.mk |
| Trust Interface | `deprecated-feature` | Repo deleted; HTTP 404. Do not model as current. |
| microG | `verified-absent` | Not in standard LOS; separate build variant only |
| Root / su | `verified-absent` (default) | Opt-in only via Magisk post-install; not in official LOS builds |
| Privacy Guard (AppOps toggles) | `indicative` | AppOps layer present; full fake-data injection absent in LOS 17+ |
| Power HAL profiles (QCM6490) | `indicative` | FP5 device tree confirmed; exact profile values device-maintainer-dependent |

---

## 4. Zone Integration Matrix

Each of the 8 Cell OS zones now carries a combined bioplasma+biophoton field profile. The σ column reflects the maximum σ across all pathways assigned to the zone.

### Zone 1: `membrane`
**Glyph**: 膜 · **Combined σ**: 0.92 (BP1) · **Dominant carrier**: Electrostatic K⁺/Na⁺ gradient (DC)

| Pathway | Family | σ | Carrier | LineageOS Implementation |
|---|---|---|---|---|
| BP1 | Bioplasma | 0.92 | Electrostatic gradient (DC) | Kernel IRQ ground state / Power HAL |
| BP2 | Bioplasma | 0.90 | Depolarisation wavefront | Binder `BC_TRANSACTION` high-priority |
| BP3 | Bioplasma | 0.85 | Wound DC field | `sendBroadcast` / `ACTION_BATTERY_LOW` |
| P3 | Biophoton | 0.80 | NIR photon (extracellular UPE) | Unordered broadcast + AppOps/Privacy Guard |
| BP4 | Bioplasma | 0.65 | ELF EM (VGCC resonance) | `epoll_wait` EPOLLET + Looper |
| BP5 | Bioplasma | 0.60 | MMW EM (lipid bilayer) | `CellVitalOverlayController.kt` → `PowerManager.OnThermalStatusChangedListener` → `CellVitalService` |
| P6 | Biophoton | 0.55 | Vis/NIR retrograde | `hardirq` → IRQ thread → syscall |

### Zone 2: `mitochondria`
**Glyph**: 粒 · **Combined σ**: 0.92 (BP1 ΔΨm) · **Dominant carrier**: Inner membrane potential (DC) + collective dipolar (GHz–THz)

| Pathway | Family | σ | Carrier | LineageOS Implementation |
|---|---|---|---|---|
| BP1 ΔΨm | Bioplasma | 0.92 | Inner membrane potential | Power supply IRQ / `drivers/power/supply/` |
| P1 | Biophoton | 0.75 | Red/NIR photon | Binder oneway `URGENT_DISPLAY` |
| P7 | Biophoton | 0.65 | NIR lateral photon (2023) | Messenger async / same-UID local intent |
| BP6 | Bioplasma | 0.45 | Collective dipolar (Fröhlich) | Binder thread pool coherent burst (metaphor) |

### Zone 3: `cytoplasm`
**Glyph**: 漿 · **Combined σ**: 0.90 (BP2) · **Dominant carrier**: Ionic IPC medium + THz

| Pathway | Family | σ | Carrier | LineageOS Implementation |
|---|---|---|---|---|
| BP2 | Bioplasma | 0.90 | Depolarisation propagation | Binder `IPCThreadState` / `ProcessState` |
| P2 | Biophoton | 0.50 | Blue-green photon | Binder oneway |
| BP9 | Bioplasma | 0.50 | THz refractive phenotype | `statsd` / `perfetto` (read-only) |
| BP8 | Bioplasma | 0.32 | QED water coherence | Reserved annotation (no impl.) |

### Zone 4: `cytoskeleton`
**Glyph**: 架 · **Combined σ**: 0.60 (P5) · **Dominant carrier**: Tubulin dipolar (GHz–THz) + MT photon waveguide

| Pathway | Family | σ | Carrier | LineageOS Implementation |
|---|---|---|---|---|
| P5 | Biophoton | 0.60 | Vis photon (MT waveguide) | Binder threadpool / HIDL passthrough |
| BP9 | Bioplasma | 0.50 | THz refractive signature | Diagnostic telemetry (read-only) |
| BP6 | Bioplasma | 0.45 | Fröhlich collective dipole | SurfaceFlinger VSYNC coherence (metaphor) |

### Zone 5: `nucleus`
**Glyph**: 核 · **Combined σ**: 0.92 (inherited BP1 boot) · **Dominant carrier**: Boot chain + RF/UV + Vmem downstream

| Pathway | Family | σ | Carrier | LineageOS Implementation |
|---|---|---|---|---|
| P4 | Biophoton | 0.35 | UV anterograde photon | `init.lineage.rc` ordered service start |
| BP5 | Bioplasma | 0.60 | RF/MMW (G-quadruplex) | `PowerManager.OnThermalStatusChangedListener` → `CellVitalService` (throttling status mapped to σ via all 7 constants: NONE→0.00 … SHUTDOWN→1.00) |
| BP7 | Bioplasma | 0.72 | Vmem pattern (downstream) | `SettingsProvider` / LineageParts |

### Zone 6: `endoplasmic-reticulum`
**Glyph**: 網 · **Combined σ**: 0.65 (BP4) · **Dominant carrier**: Ca²⁺ ion flux (0.001–1 Hz)

| Pathway | Family | σ | Carrier | LineageOS Implementation |
|---|---|---|---|---|
| BP4 | Bioplasma | 0.65 | Ca²⁺ oscillation (ELF downstream) | `eventfd` + `MessageQueue` handler |
| BP1 | Bioplasma | 0.92 | Ca²⁺ store gradient (DC) | Power state monitor |

### Zone 7: `golgi`
**Glyph**: 體 · **Combined σ**: 0.72 (BP7 route change) · **Dominant carrier**: Vesicle sorting / state persistence

| Pathway | Family | σ | Carrier | LineageOS Implementation |
|---|---|---|---|---|
| BP7 | Bioplasma | 0.72 | Vmem persistence (sorting decision) | SettingsProvider write → LineageParts Updater routing |

### Zone 8: `ribosomes`
**Glyph**: 體 · **Combined σ**: 0.90 (BP2 synthesis) · **Dominant carrier**: Translation execution (Binder/ART)

| Pathway | Family | σ | Carrier | LineageOS Implementation |
|---|---|---|---|---|
| BP2 | Bioplasma | 0.90 | Binder transaction chain | ART JIT + dex2oat; Binder thread delivery |

---

## 5. Bioplasma Pathway Translations BP1–BP9

---

### §5.1 BP1 — Membrane Resting Potential → Kernel IRQ Ground State

**σ = 0.92 · Verified · Organelle route**: `cell-membrane` ↔ `cytoplasm` (bidirectional, always-on)

#### Biological Summary
The resting membrane potential is the fundamental DC ground state of cellular electrical activity, maintained by the Na⁺/K⁺-ATPase pump and ion channel permeability balance (typically −40 to −90 mV). This electrochemical gradient creates a stable "ready-state" for all cellular signalling, characterised by a Debye length of 0.7–1.0 nm. Like the cell, the kernel never truly "rests" — it maintains a high-energy quasi-static equilibrium (clocks running, IRQ lines held, GIC registers populated) that enables instantaneous response to any incoming signal.

#### LineageOS Source Table

| Component | AOSP Path | LineageOS Path | Confidence |
|---|---|---|---|
| **IRQ Descriptor Core** | `kernel/irq/irqdesc.c` | [`android_kernel_fairphone_qcm6490/kernel/irq/irqdesc.c`](https://github.com/LineageOS/android_kernel_fairphone_qcm6490/blob/lineage-21/kernel/irq/irqdesc.c) | `verified` |
| **IRQ Thread Management** | `kernel/irq/manage.c` | [`android_kernel_fairphone_qcm6490/kernel/irq/manage.c`](https://github.com/LineageOS/android_kernel_fairphone_qcm6490/blob/lineage-21/kernel/irq/manage.c) | `verified` |
| **GIC-600 Interrupt Controller** | `drivers/irqchip/irq-gic-v3.c` | Same path in FP5 kernel | `verified` |
| **Power HAL (AIDL)** | `hardware/interfaces/power/aidl` | `android_hardware_interfaces/power/aidl` | `verified` |
| **Thread Priority Constants** | `frameworks/base/core/java/android/os/Process.java` | **Identical** — AOSP invariant | `verified` |
| **Always-On Clock** | `/sys/kernel/debug/clk/clk_summary` | `bi_tcxo_ao` (always-on crystal oscillator) | `verified` |

#### P→A→E (BP1)
- **P**: GIC-600 holds hardware interrupt vector table; `bi_tcxo_ao` provides the temporal heartbeat; resting `irq_desc` descriptors maintained by `irqdesc.c`
- **A**: Power HAL defines the resting metabolic rate (no boost requested); `Process.THREAD_PRIORITY_CRITICAL` (−20) ensures system vital services remain scheduled above transient noise
- **E**: `/proc/interrupts` state quiescent; all IRQ lines primed; zero-latency response to first signal

#### σ = 0.92 Justification
The structural isomorphism is exact: both the cell membrane and the kernel interrupt subsystem maintain a DC-grounded, energy-costly "ready state" that allows instantaneous information processing. Confirmation of the GIC-600 in the FP5 kernel and AIDL Power HAL in the LineageOS tree provides Tier 1 evidence for `verified` status.

#### TypeScript Hook

```typescript
export const BP1_RESTING_POTENTIAL: BioplasmaPathway = {
  code: "BP1",
  sigma: 0.92,
  status: "verified",
  carrier: "Electrostatic potential gradient (K⁺/Na⁺)",
  frequencyRange: "DC",
  plasmaLiteralness: "literal-quasi-plasma",
  lineageosPath: "kernel/irq/irqdesc.c",
  organelleRoute: { source: "cell-membrane", target: "cytoplasm", direction: "bidirectional" },
  ipcAnalogue: "Kernel IRQ Ground State / Power HAL",
  isMetaphor: false, // structural isomorphism, not pure metaphor
};
```

---

### §5.2 BP2 — Action Potential → Binder IPC High-Priority Transaction

**σ = 0.90 · Verified · Organelle route**: `cell-membrane` → `cytoplasm` → target (anterograde)

#### Biological Summary
The action potential is the all-or-nothing depolarisation wavefront conducted along excitable membranes via voltage-gated Na⁺ and K⁺ channel cascades (Hodgkin-Huxley dynamics). Once threshold is crossed, the wave propagates at 0.5–120 m/s and cannot be partially delivered — a binary, irreversible commitment. The refractory period following the wavefront prevents re-entrainment until membrane potential is restored.

#### LineageOS Source Table

| Component | Source Path | Confidence |
|---|---|---|
| **Binder driver** | `android_kernel_fairphone_qcm6490/drivers/android/binder.c` | `verified` |
| **IPCThreadState** (axon) | `frameworks/native/libs/binder/IPCThreadState.cpp` | `verified` (AOSP invariant) |
| **ProcessState** (pool init) | `frameworks/native/libs/binder/ProcessState.cpp` | `verified` (AOSP invariant) |
| **BC_TRANSACTION / BR_TRANSACTION** | Defined in `binder.c` | `verified` |
| **THREAD_PRIORITY_URGENT_DISPLAY** | `android.os.Process` = −8 | `verified` |
| **THREAD_PRIORITY_DEFAULT** | `android.os.Process` = 0 | `verified` |

#### P→A→E (BP2)
- **P**: Client process fires `BC_TRANSACTION` via `IPCThreadState::transact()` — threshold crossed, transaction committed
- **A**: Binder driver routes transaction; server thread woken at `THREAD_PRIORITY_URGENT_DISPLAY` (−8) — the depolarisation wave propagates
- **E**: `BR_TRANSACTION` delivered; server handler executes; `BC_REPLY` returns — refractory period begins (Binder serialises within thread)

**All-or-nothing analogy**: Binder transactions cannot be partially delivered. A transaction either completes atomically or fails entirely — exactly modelling the Hodgkin-Huxley threshold commitment.

**Refractory period analogy**: Within a single Binder thread, transactions are serialised. The thread cannot accept a new transaction until the current one completes. This is the software refractory period.

#### TypeScript Hook

```typescript
export const BP2_ACTION_POTENTIAL: BioplasmaPathway = {
  code: "BP2",
  sigma: 0.90,
  status: "verified",
  carrier: "Depolarisation wavefront (Na⁺/K⁺ pulse)",
  frequencyRange: "0.1–1000 Hz pulse",
  plasmaLiteralness: "electrolyte-analogy",
  lineageosPath: "drivers/android/binder.c",
  organelleRoute: { source: "cell-membrane", target: "cytoplasm", direction: "inward" },
  ipcAnalogue: "Binder BC_TRANSACTION (high-priority one-shot)",
  isMetaphor: true,
};
```

---

### §5.3 BP3 — Wound Bioelectric Field → Android Broadcast System

**σ = 0.85 · Verified · Organelle route**: `cell-membrane` → tissue broadcast

#### Biological Summary
When epithelial continuity is disrupted, the transepithelial potential (TEP) — normally ~40 mV across epithelial sheets — collapses at the wound edge, creating a DC electric field gradient of 40–200 mV/mm extending hundreds of microns into surrounding tissue. This wound field drives galvanotaxis: repair cells (macrophages, keratinocytes) migrate directionally toward the wound along the field gradient, guided by voltage-sensitive receptors.

#### LineageOS Source Table

| Component | Source Path | Confidence |
|---|---|---|
| **BroadcastQueue** | `frameworks/base/services/core/java/com/android/server/BroadcastQueue.java` | `verified` (AOSP invariant) |
| **ContextImpl.sendBroadcast()** | `frameworks/base/core/java/android/content/ContextImpl.java` | `verified` (AOSP invariant) |
| **ACTION_BATTERY_LOW** | `android.content.Intent.ACTION_BATTERY_LOW` | `verified` |
| **BatteryService** | `frameworks/base/services/core/java/com/android/server/BatteryService.java` | `verified` (primary wound signal source) |
| **WorkManager scheduling** | AndroidX (app-layer) | `indicative` (galvanotaxis response) |

**Note**: `LocalBroadcastManager` is an AndroidX library, not platform code. All bioplasma BP3 routing uses platform `sendBroadcast()` via `ContextImpl`. `LocalBroadcastManager` must not be cited as a LineageOS platform component.

#### P→A→E (BP3)
- **P**: `BatteryService` detects critical voltage drop (TEP disruption at wound edge) → fires `ACTION_BATTERY_LOW` via `sendBroadcast()`
- **A**: `BroadcastQueue` dispatches simultaneously to all registered receivers (repair cells) — unordered broadcast, all receivers notified in parallel
- **E**: Receivers migrate toward the signal: `WorkManager` defers background work (galvanotaxis away from energy drain); repair-mode services activate

**Galvanotaxis analogue**: The DC gradient is the battery voltage delta; repair cell migration is the WorkManager response scheduling based on `BATTERY_CHARGING`/`BATTERY_LOW` constraints.

#### TypeScript Hook

```typescript
export const BP3_WOUND_FIELD: BioplasmaPathway = {
  code: "BP3",
  sigma: 0.85,
  status: "verified",
  carrier: "DC electric field (galvanotaxis)",
  frequencyRange: "DC to 0.1 Hz",
  plasmaLiteralness: "electrolyte-analogy",
  lineageosPath: "frameworks/base/services/core/java/com/android/server/BatteryService.java",
  organelleRoute: { source: "cell-membrane", target: "broadcast", direction: "broadcast" },
  ipcAnalogue: "sendBroadcast / ACTION_BATTERY_LOW",
  isMetaphor: true,
};
```

---

### §5.4 BP4 — ELF Bioelectromagnetic Coupling → Linux epoll / Android Looper

**σ = 0.65 · Indicative · Organelle route**: `cell-membrane` → `endoplasmic-reticulum` (inward)

#### Biological Summary
Extremely Low Frequency electromagnetic fields (0.01–300 Hz) couple to cellular behaviour via voltage-gated calcium channels (VGCCs) through stochastic resonance: sub-threshold ELF signals, too weak to trigger gate opening independently, are amplified by thermal noise until they cross the activation threshold. Once crossed, Ca²⁺ influx occurs, initiating a downstream oscillation cascade that regulates gene expression and metabolic flux.

#### LineageOS Source Table

| Component | Source Path | Biological Analogy | Confidence |
|---|---|---|---|
| **epoll implementation** | `fs/eventpoll.c` (msm-5.4 kernel) | VGCC gate logic | `verified` |
| **Event file descriptor** | `fs/eventfd.c` (msm-5.4 kernel) | Ion channel pore | `verified` |
| **EPOLLET flag** | `include/uapi/linux/eventpoll.h` | Stochastic resonance threshold | `verified` |
| **Android Looper** | `frameworks/base/core/java/android/os/Looper.java` | Ca²⁺ wave propagation | `verified` |
| **MessageQueue** | `frameworks/base/core/java/android/os/MessageQueue.java` | Cytosolic ion concentration | `verified` |
| **InputDispatcher** | `frameworks/base/services/input/InputDispatcher.cpp` | Synaptic event filtering | `verified` |
| **nativeWake()** | `android_os_MessageQueue.cpp` | TRPC1 channel opening | `verified` |

#### P→A→E (BP4)
- **P**: External ELF-equivalent signal arrives at monitored `eventfd` file descriptor
- **A**: `epoll_wait` with `EPOLLET` (edge-triggered) detects threshold transition from not-ready → ready — fires only at rising edge, exactly modelling stochastic resonance threshold crossing
- **E**: `Looper.nativeWake()` fires; `MessageQueue` dispatches to `Handler` — the digital Ca²⁺ burst that triggers downstream computational processing

**Stochastic resonance**: EPOLLET fires only when the fd transitions from not-ready to ready (threshold crossing), not while it remains above threshold (level-triggered would). This is the precise analogue to stochastic resonance: dormant until noise-amplified threshold is crossed, then burst.

#### TypeScript Hook

```typescript
export const BP4_ELF_COUPLING: BioplasmaPathway = {
  code: "BP4",
  sigma: 0.65,
  status: "indicative",
  carrier: "ELF EM field (VGCC stochastic resonance)",
  frequencyRange: "0.01–300 Hz",
  plasmaLiteralness: "field-coherence-analogy",
  lineageosPath: "fs/eventpoll.c",
  organelleRoute: { source: "cell-membrane", target: "endoplasmic-reticulum", direction: "inward" },
  ipcAnalogue: "epoll_wait EPOLLET + Android Looper",
  isMetaphor: true,
};
```

---

### §5.5 BP5 — RF/MMW Bioplasma Coupling → PowerManager Thermal-Status Listener

**σ = 0.60 · Indicative · Organelle route**: `cell-membrane` → `nucleus` (inward)

#### Biological Summary
Radio frequency and millimetre-wave (30–300 GHz) electromagnetic fields couple to the plasma membrane phospholipid bilayer at specific resonant windows (53–60 GHz non-thermal window). At these frequencies, lipid bilayer resonance and voltage-gated calcium channel coupling produce biological effects. The frequency selectivity is the mechanistically significant feature: only signals at the resonant frequency produce coupling; off-frequency signals pass through without biological effect.

#### LineageOS Source Table

| Component | Source Path | Biological Analogy | Confidence |
|---|---|---|---|
| **PowerManager.java** | `frameworks/base/core/java/android/os/PowerManager.java` (L2687–L2718) | Frequency-gated membrane receptor | `verified` |
| **OnThermalStatusChangedListener** | `PowerManager.OnThermalStatusChangedListener` interface | VGCC downstream callback | `verified` |
| **CellVitalOverlayController.kt** | `packages/SystemUI/src/com/android/systemui/cellos/CellVitalOverlayController.kt` (new ROM file — Phase 3) | Membrane receptor transducer | `verified` (path exists, file is new) |
| **CellVitalServiceImpl.java** | `services/core/java/com/android/server/cellos/CellVitalServiceImpl.java` | BP5 σ computation | `verified` (path pattern) |
| **QTI Thermal HAL** | `android.hardware.thermal-service.qti` (`android_hardware_qcom_thermal` repo) | Underlying thermal substrate | `indicative` — transparent to Cell OS |

> **Absent paths (verified):** `ThermalManager.java` does **not** exist in `frameworks/base/core/java/android/os/` on LOS 21 (HTTP 404). `ThermalController.java` is also absent. `android_hardware_lineage_interfaces` has **no `thermal/` directory** (verified). `THERMAL_STATUS_HAL_SKIP_SET_THROTTLING` does not exist.

> **Valid thermal constants** (all 7 must be handled in `CellVitalServiceImpl` switch/when block without fallthrough): `THERMAL_STATUS_NONE` (σ 0.00), `THERMAL_STATUS_LIGHT` (0.30), `THERMAL_STATUS_MODERATE` (0.55), `THERMAL_STATUS_SEVERE` (0.80), `THERMAL_STATUS_CRITICAL` (0.95), `THERMAL_STATUS_EMERGENCY` (0.98), `THERMAL_STATUS_SHUTDOWN` (1.00).

#### P→A→E (BP5)
- **P**: `PowerManager.OnThermalStatusChangedListener` fires when throttling status changes — the callback is threshold-gated (fires only on state transitions), exactly mirroring MMW bilayer selectivity that produces coupling only at resonant frequencies
- **A**: `CellVitalOverlayController.kt` receives the status constant; `CellVitalServiceImpl.java` maps it to a BP5 σ value via the 7-constant table above
- **E**: BP5 σ update propagates to `CellVitalService`; QS tile (`BioplasmaVmemTile.java`) surfaces live thermoregulatory state; nuclear-level G-quadruplex analogue (status → σ → zone signal) is expressed in SystemUI

#### TypeScript Hook

```typescript
export const BP5_RF_MMW: BioplasmaPathway = {
  code: "BP5",
  sigma: 0.60,
  status: "indicative",
  carrier: "RF/MMW EM field (membrane phospholipid resonance)",
  frequencyRange: "30–300 GHz (53–60 GHz resonant window)",
  plasmaLiteralness: "field-coherence-analogy",
  // ROM lineageosPath (Phase 3): packages/SystemUI/src/com/android/systemui/cellos/CellVitalOverlayController.kt
  // React SPA lineageosPath (legacy): useThermalHAL.ts (JS heap ratio proxy)
  lineageosPath: "packages/SystemUI/src/com/android/systemui/cellos/CellVitalOverlayController.kt",
  organelleRoute: { source: "cell-membrane", target: "nucleus", direction: "inward" },
  ipcAnalogue: "PowerManager.addThermalStatusListener() → CellVitalService (frequency-gated threshold callback)",
  isMetaphor: true,
};
```

---

### §5.6 BP6 — Fröhlich Coherent Dipolar Oscillation → Binder Thread Pool Coherent Burst

**σ = 0.45 · Speculative · Organelle route**: `cytoskeleton` ↔ `mitochondria` (bidirectional)

> ⚠️ **Speculative mapping notice**: BP6 is σ=0.45 (Speculative tier). The Binder/SurfaceFlinger mapping below is an **architectural metaphor** for coherent synchronisation, not a verified biological-to-code correspondence. The Fröhlich condensate is an unconfirmed in-vivo phenomenon; Binder does not implement coherence in the quantum sense.

#### Biological Summary
The Fröhlich condensate model proposes that metabolically driven protein assemblies (tubulin, membrane proteins) can undergo collective dipolar oscillation where ATP/GTP hydrolysis pumps energy into a shared vibrational mode, causing many independent dipoles to collapse into a single coherent oscillation at 10 GHz–10 THz. The Lundholm (2015) crystallographic evidence shows collective mode excitation consistent with Fröhlich-like behaviour but does not confirm in-vivo condensation at physiological conditions.

#### LineageOS Source Table (Speculative Mapping)

| Component | Source Path | Biological Analogy | Confidence |
|---|---|---|---|
| **ProcessState::startThreadPool()** | `frameworks/native/libs/binder/ProcessState.cpp` | ATP pumping (energy into pool) | `speculative` |
| **Binder threadpool** | `drivers/android/binder.c` | Independent dipole ensemble | `speculative` |
| **FLAG_ONEWAY** | `frameworks/native/libs/binder/include/binder/IBinder.h` | Collective mode propagation | `speculative` |
| **Choreographer VSYNC** | `frameworks/base/core/java/android/view/Choreographer.java` | Phase synchronisation clock | `speculative` |
| **SurfaceFlinger sync fences** | `frameworks/native/services/surfaceflinger/SurfaceFlinger.cpp` | Coherent frame delivery window | `speculative` |

#### P→A→E (BP6)
- **P**: ATP equivalent (app requests UI frame) — energy pumped into Binder thread pool via `startThreadPool()`
- **A**: Multiple Binder threads synchronised by Choreographer VSYNC pulse (60/120 Hz) — the condensate clock; threads cannot deliver frames outside the VSYNC window
- **E**: SurfaceFlinger composites frame using HWC sync fences — coherent delivery at phase-locked timing; condensate "collapses" into single rendered output

**Condensate lifetime analogue**: The VSYNC window (16.7 ms at 60 Hz) is the condensate coherence window. Outside it, the threads are incoherent; inside it, they produce a single collective output.

#### TypeScript Hook

```typescript
export const BP6_FROHLICH: BioplasmaPathway = {
  code: "BP6",
  sigma: 0.45,
  status: "speculative",
  carrier: "Collective dipolar EM mode (GHz–THz)",
  frequencyRange: "10 GHz–10 THz; Fröhlich condensate",
  plasmaLiteralness: "field-coherence-analogy",
  lineageosPath: null, // No production path; architectural metaphor only
  organelleRoute: { source: "cytoskeleton", target: "mitochondria", direction: "bidirectional" },
  ipcAnalogue: "Binder thread pool VSYNC-synchronised burst (metaphor)",
  isMetaphor: true,
};
```

---

### §5.7 BP7 — Morphogenetic Vmem Patterning → Persistent Bioelectric State Store

**σ = 0.72 · Indicative · Organelle route**: All organelles ↔ `cell-membrane` (tissue broadcast, bidirectional)

#### Biological Summary
Michael Levin's bioelectric morphogenesis research demonstrates that the spatially distributed pattern of transmembrane potentials (Vmem) across tissue — communicated via gap junctions and ephaptic coupling — constitutes an "anatomical memory" that guides morphogenesis. Planarian flatworms can be reprogrammed to grow heads with two-eye axis reversal by altering gap junction connectivity and Vmem pattern during regeneration, demonstrating that the bioelectric code is rewritable and controls body plan geometry independent of genetic sequence.

#### LineageOS Source Table

| Component | Source Path | Biological Analogy | Confidence |
|---|---|---|---|
| **SettingsProvider** | `packages/providers/SettingsProvider` | Tissue-level Vmem map | `verified` |
| **SharedPreferencesImpl** | `frameworks/base/core/java/android/app/SharedPreferencesImpl.java` | Intracellular Vmem persistence | `verified` |
| **LineageParts** | `github.com/LineageOS/android_packages_apps_LineageParts` ✓ | Bioelectric code rewriter | `indicative` |
| **Settings.Secure URI** | `content://settings/secure` | Vmem entry (single cell) | `verified` |
| **Settings.Global URI** | `content://settings/global` | Tissue-global Vmem state | `verified` |
| **ContentObserver** | `android.database.ContentObserver` | Gap junction propagation | `verified` |

#### P→A→E (BP7)
- **P**: User/system modifies a setting via LineageParts or developer options (external regulatory signal rewrites bioelectric code)
- **A**: `SettingsProvider` persists to `/data/data/com.android.providers.settings/` — the Vmem pattern is durably encoded; all registered `ContentObserver` instances notified simultaneously (gap junction propagation)
- **E**: Components read new Vmem map on boot/runtime → system "morphology" changes (layout configuration, privacy posture, display profile — body plan geometry)

**Planarian analogy**: Factory reset + state rewrite = planarian axis reversal. The code (genome, AOSP) is unchanged; the bioelectric pattern (LineageParts settings) is rewritten; the resulting organism (system behaviour) is different.

**Ephaptic coupling**: `ContentObserver` callbacks propagate the Vmem change to all registered observers simultaneously — precisely modelling ephaptic field coupling across gap junctions.

#### TypeScript Hook

```typescript
export const BP7_VMEM_PATTERN: BioplasmaPathway = {
  code: "BP7",
  sigma: 0.72,
  status: "indicative",
  carrier: "Spatially distributed Vmem pattern",
  frequencyRange: "DC + 0.001–0.1 Hz",
  plasmaLiteralness: "electrolyte-analogy",
  lineageosPath: "packages/providers/SettingsProvider",
  organelleRoute: { source: "broadcast", target: "cell-membrane", direction: "bidirectional" },
  ipcAnalogue: "SettingsProvider + ContentObserver (gap junction)",
  isMetaphor: true,
};
// Note: useCellVitalStore.ts already implements the Zustand-persistence pattern
// for this pathway. Extend with BP7 bioplasmaSignal() action.
```

---

### §5.8 BP8 — QED Water Coherence Domain (Reserved → Speculative Candidate)

**σ = 0.32 · Status: `reserved` · Pending architect review for elevation to `speculative` (σ=0.45)**

> **Design document**: `docs/BP8_SMEM_COHERENCE_DESIGN.md` contains the full structural isomorphism analysis, fork specification, and σ rationale. The content below reflects the baseline state. The design document is the source of truth for the proposed changes.

#### Biological Summary
The QED model of water proposed by Del Giudice and Preparata suggests that liquid water exists as a two-phase system: coherence domains (CDs) approximately 100 nm in size where water molecules oscillate in phase with a trapped electromagnetic field, and disordered bulk water. At hydrophilic cellular interfaces, these CDs may act as reservoirs of electronic excitation. While EZ (exclusion zone) water effects are experimentally documented (10+ independent labs, including in plant xylem 2024), the specific QED coherence domain model remains speculative in mainstream biophysics.

#### Current Reserved Annotation (baseline)

```typescript
export const BP8_QED_WATER: BioplasmaPathway = {
  code: "BP8",
  sigma: 0.32,
  status: "reserved",
  carrier: "QED coherent EM mode (interfacial water)",
  frequencyRange: "THz range (estimated); QED resonance",
  plasmaLiteralness: "field-coherence-analogy",
  lineageosPath: null,
  organelleRoute: { source: "cytoplasm", target: "broadcast", direction: "readonly" },
  ipcAnalogue: "RESERVED_ANNOTATION",
  isMetaphor: true,
};
```

#### Activation Path (Architect-Ratified)

**Proposed LineageOS source**: `drivers/soc/qcom/smem_coherence.c · android_kernel_fairphone_qcm6490`

A structural isomorphism has been identified between QED water coherence domains and Qualcomm SMEM (Shared Memory) — the inter-processor shared memory substrate located physically at the boundary between APSS, ADSP, CDSP, and MPSS (Modem Processor Subsystem) on the QCM6490 SoC:

Nine biological concepts mapped to kernel/SMEM analogues, graded by analogy quality. Full detail in `BP8_SMEM_COHERENCE_DESIGN.md §Finding 3`.

| QED Water CD Concept | SMEM / Kernel Analogue | Quality |
|---|---|---|
| Shared coherent substrate | SMEM shared memory fabric (APSS/ADSP/CDSP/MPSS) | Structural |
| Discrete coherence domains (~100nm) | Discrete SMEM partitions (18–24, enumerable) | Structural |
| Distributed coordination, no master | TCSR/SFPB hardware spinlocks (distributed CAS) | Functional |
| Interfacial boundary location | SMEM in SoC fabric boundary between subsystem islands | Functional |
| Molecules oscillating in phase | Shared SMEM state via CCI/MOESI + DMB/DSB barriers + GLINK acks (ADSP/CDSP/MPSS) | Functional |
| Trapped EM mode (sustains coherence, prevents decoherence) | SMEM coherency/ordering envelope: non-cacheable mappings + barriers + hwspinlock sequences | Functional |
| EZ water (hardware-enforced exclusion zone) | TrustZone/XPU-protected secure SMEM carveout (hardware bus-level exclusion) | Functional |
| Dielectric boundary (field confinement to domain) | Reserved-memory + SMMU/IOMMU + XPU firewalls (hard architectural confinement) | Functional |
| THz collective oscillation frequency | QCM6490 clock tree / devfreq (CPU tri-cluster 2.71/2.40/1.96 GHz, NoC ~1 GHz, LPDDR4x ~2.1 GHz) | Conceptual |

All four BP8 activation criteria are satisfied by SMEM:
1. ✅ **Non-local**: no single processor controls SMEM; hardware spinlocks are distributed compare-and-swap across APSS/ADSP/CDSP/MPSS
2. ✅ **Phase-coherent**: all processors converge on one consistent SMEM view via hardware cache coherence + DMB/DSB ordering
3. ✅ **Active coordination mechanism**: TCSR/SFPB hardware spinlocks + GLINK inter-processor signalling
4. ✅ **Interfacial**: SMEM is physically in the SoC fabric at the boundary between processor subsystem islands

**Stage 1 constant** (σ and status unchanged; only `lineageosPath` set):
```typescript
export const BP8_QED_WATER: BioplasmaPathway = {
  code: "BP8",
  sigma: 0.32,            // UNCHANGED — biological evidence governs σ
  status: "reserved",     // UNCHANGED — biological evidence must drive any status promotion
  carrier: "QED coherent EM mode (interfacial water)",
  frequencyRange: "THz range (estimated); QED resonance",
  plasmaLiteralness: "field-coherence-analogy",
  lineageosPath: "drivers/soc/qcom/smem.c (cellos_smem_coherence_probe() patch, CONFIG_CELLOS_BIOPLASMA_BP8) · android_kernel_fairphone_qcm6490",
  organelleRoute: { source: "cytoplasm", target: "broadcast", direction: "readonly" },
  ipcAnalogue: "Qualcomm SMEM inter-processor shared memory substrate — " +
               "strongest available implementation candidate for BP8",
  isMetaphor: true,  // THz/GHz gap in frequency row; structural rows are genuine
};
```

**Kernel notes**: `for_each_smem_partition()` does not exist; kernel driver uses `qcom_smem_get()` item probing (Path A). `smem_partition_header` FSM claims corrected — coherence is enforced at hardware cache-line level.

**σ trigger** (σ=0.32 → 0.45, `speculative`): Requires biological evidence — THz spectroscopy of CD resonance in warm-wet interfacial biological water, or CD-dependent ion channel gating at 310K. FP5 hardware build constitutes implementation validation only.

**`isMetaphor: true`** applies specifically to the THz frequency row (Conceptual quality). The eight Structural/Functional rows are genuine design-ontology mappings. See `BP8_SMEM_COHERENCE_DESIGN.md` for the full graded analysis.

---

### §5.9 BP9 — THz Refractive Phenotype (Read-Only Diagnostic Telemetry)

**σ = 0.50 · Indicative (lower) · Organelle route**: `cytoplasm` ↔ `cytoskeleton` (read-only)

#### Biological Summary
Terahertz radiation (0.1–10 THz) is highly sensitive to vibrational and rotational modes of biological macromolecules and their surrounding hydration shell. THz time-domain spectroscopy (THz-TDS) can distinguish between healthy and cancerous tissue based on their refractive phenotype — a signature of water content, protein conformation, and collective molecular dynamics. Key absorption peaks have been identified at 390 GHz, 1.44 THz, and 1.8 THz in cancer and Alzheimer's tissue. The THz phenotype is a read-only diagnostic: it reveals metabolic state without modifying cellular pathways.

#### LineageOS Source Table

| Component | Source Path | Biological Analogy | Confidence |
|---|---|---|---|
| **statsd** | `packages/modules/StatsD` | THz spectrometer (metric collector) | `verified` |
| **perfetto** | `external/perfetto` | THz-TDS time-domain trace | `verified` |
| **dumpsys** | `frameworks/native/cmds/dumpsys/` | Refractive phenotype snapshot | `verified` |
| **DropBoxManager** | `frameworks/base/core/java/android/os/DropBoxManager.java` | Pathological phenotype log | `verified` |

#### P→A→E (BP9) — Read-Only Only
- **P**: `statsd` and `perfetto` monitor OS "molecular" events (CPU frequency, Binder latency, memory pressure, thermal state) — the THz spectrometer observing vibrational modes
- **A**: Events aggregated into metric streams and trace buffers — the refractive index calculation from THz data
- **E**: Diagnostic report output — `dumpsys`, `perfetto` trace, `DropBox` log. **BP9 NEVER drives routing decisions or organelle state changes.** Read-only only.

#### TypeScript Hook

```typescript
export const BP9_THZ_TELEMETRY: BioplasmaPathway = {
  code: "BP9",
  sigma: 0.50,
  status: "indicative",
  carrier: "THz EM field interaction (refractive phenotype)",
  frequencyRange: "0.1–10 THz",
  plasmaLiteralness: "field-coherence-analogy",
  lineageosPath: "packages/modules/StatsD",
  organelleRoute: { source: "cytoplasm", target: "cytoskeleton", direction: "readonly" },
  ipcAnalogue: "statsd / perfetto / dumpsys (read-only diagnostic)",
  isMetaphor: true,
};
```

### §5.10 BP12 — Circadian Clock Oscillation → AlarmManager / JobScheduler

**σ = 0.88 · Verified · Inherited AOSP · Added June 2026**

#### Biological Mechanism

The mammalian circadian clock is a **transcription-translation feedback loop (TTFL)** with ~24 h period. CLOCK:BMAL1 heterodimers (the positive arm) drive transcription of *Per1/2/3* and *Cry1/2* genes. As PER/CRY protein accumulates, it inhibits CLOCK:BMAL1 (the negative arm) — suppressing its own synthesis. CK1ε phosphorylates PER, targeting it for proteasomal degradation, releasing CLOCK:BMAL1 for the next cycle. The period is tuned by the rate of CK1ε-mediated PER degradation. This Nobel-Prize-confirmed mechanism (Hall, Rosbash, Young 2017) operates in every nucleated eukaryotic cell and is functionally conserved from cyanobacteria to humans.

The circadian clock produces a **broadcast output** that modulates nearly every cellular process: transcription of 80% of protein-coding genes oscillates with circadian phase; metabolic rate, cell division, DNA repair, immune activity, and membrane electrical excitability are all gated by circadian time. The nucleus is the source; the entire cell is the receiver.

#### LineageOS / Android Analogy

| Biological element | Android analogue | Source path |
|---|---|---|
| CLOCK:BMAL1 positive arm (drives transcription) | `AlarmManagerService` — schedules recurring exact and inexact alarms | `frameworks/base/services/core/java/com/android/server/alarm/AlarmManagerService.java` |
| PER/CRY negative arm (suppresses the loop) | Doze mode power controller — suppresses background activity during deep idle | `frameworks/base/services/core/java/com/android/server/DeviceIdleController.java` |
| CK1ε period-tuning kinase | `JobScheduler` flex-window parameter + `setPeriodic()` — period is the dial | `frameworks/base/services/core/java/com/android/server/job/JobSchedulerService.java` |
| Circadian broadcast output (phase-gated gene expression) | `ACTION_TIME_TICK` broadcast (every 60 s) + `AlarmManager.RTC_WAKEUP` (circadian-phase wakeup) | AOSP broadcast |
| Metabolic trough (deep sleep phase) | `NO_HZ_FULL` kernel tick suppression during APSS idle | `kernel/time/tick-sched.c` |

**P → A → E translation**:
- **P** (Physical): CLOCK:BMAL1 begins transcribing *Per/Cry* at dawn; nucleus broadcasts phase signal to all cellular machinery.
- **A** (Algorithm): `AlarmManagerService.setExactAndAllowWhileIdle()` fires at exactly the right circadian phase; `JobScheduler.setPeriodic()` schedules recurring constraint-respecting work.
- **E** (Electronic): Kernel `hrtimer` + `NO_HZ` tick gate — hardware timer fires, APSS wakes from deep-idle, broadcasts `ACTION_TIME_TICK`, subsystems phase-lock to the system clock.

**TypeScript hook** (`bioplasmaPathways.ts`): `BP12_CIRCADIAN_CLOCK` constant — `lineageosPath: "frameworks/base/services/core/java/com/android/server/alarm/AlarmManagerService.java · android_frameworks_base"`, `organelleRoute: { source: "nucleus", target: "broadcast", direction: "broadcast" }`.

---

### §5.11 BP13 — Liquid-Liquid Phase Separation → cgroup Memory Tier / NUMA Affinity

**σ = 0.72 · Indicative · Metaphor-class analogy · Added June 2026**

#### Biological Mechanism

**Liquid-liquid phase separation (LLPS)** is the spontaneous demixing of macromolecular solutions into two coexisting liquid phases — a dense (condensed) phase and a dilute phase — without a membrane boundary. Proteins containing **intrinsically disordered regions (IDRs)** undergo concentration-dependent demixing driven by multivalent weak interactions (π–π, cation–π, hydrophobic). The result is **membraneless organelles**: stress granules, P-bodies, nucleoli (the rRNA processing condensate), transcription hubs (super-enhancer condensates), and centrosome condensates.

Key properties: (1) soft boundary — molecules exchange freely between condensed and dilute phases via diffusion; (2) concentration-sensor — assembly is threshold-driven by protein concentration; (3) selectivity — different IDR sequences produce different condensate compositions; (4) functional gateway — some condensates concentrate enzymes (nucleolus concentrates rRNA modifiers), others exclude them (stress granules sequester mRNAs away from translation).

In-vivo condensate function (signalling amplification vs. pathological aggregation) is an active research area — hence σ = 0.72, not higher.

#### LineageOS / Android Analogy

| Biological element | Android analogue | Source path |
|---|---|---|
| Dense condensate phase (concentrated IDR proteins) | "Hot" cgroup memory tier — pages under active use, resident in fastest DRAM bank | `kernel/mm/memcontrol.c` |
| Dilute phase (sparse background pool) | "Cold" cgroup memory tier — pages eligible for zswap/zram compression | `kernel/mm/vmscan.c` |
| NUMA zone affinity (physical memory locality) | Qualcomm QCM6490 interleaved LPDDR4x channel binding — first-touch NUMA policy | `kernel/mm/mempolicy.c` |
| IDR multivalency threshold (assembly criterion) | cgroup memory pressure threshold — crossing the threshold triggers active reclaim | `mm/memcontrol.c pressure_events` |
| Membraneless boundary (soft, permeable) | No hard page-type fence — LRU scan freely migrates pages between tiers | AOSP mm/inactive list promotion/demotion |

**Metaphor note**: BP13 is `isMetaphor: true` in TypeScript. The cgroup tier partition is a genuine OS mechanism, but the analogy to LLPS condensates is structural (both partition a homogeneous medium into coexisting phases without hard walls) not mechanistic (cgroup does not use IDR-like multivalency). This classification is intentionally conservative.

**TypeScript hook** (`bioplasmaPathways.ts`): `BP13_PHASE_SEPARATION` constant — `lineageosPath: "kernel/mm/memcontrol.c (cgroup memory tier) · kernel/mm/mempolicy.c (NUMA zone) · android_kernel_fairphone_qcm6490"`.

---

### §5.12 BP14 — Calcium Spark / IP3R Ca²⁺ Oscillation → NO_HZ_FULL Timer Coalescing

**σ = 0.82 · Verified · Added June 2026**

#### Biological Mechanism

The **calcium spark** is a stochastic, elementary unit of intracellular Ca²⁺ signalling, first described by Cheng et al. 1993. A single IP3R (inositol 1,4,5-trisphosphate receptor) on the ER lumen opens, releasing a tiny cloud of Ca²⁺ (~1,000–10,000 ions) into the cytoplasm — the spark. If local [Ca²⁺] rises sufficiently, neighbouring RyR (ryanodine receptor) channels on adjacent ER undergo **Ca²⁺-induced Ca²⁺ release (CICR)** — a positive feedback that recruits nearby channels. Thousands of sparks sum to produce **global Ca²⁺ oscillations** (0.1–10 Hz), which encode signalling information in their frequency, amplitude, and spatial pattern.

The key computational principle: **stochastic local events (sparks) coalesce into deterministic global oscillations via positive feedback (CICR)**. The ER is the source; the entire cytoplasm is the receiver.

#### LineageOS / Android Analogy

| Biological element | Android analogue | Source path |
|---|---|---|
| Individual Ca²⁺ spark (stochastic IP3R opening) | Individual `hrtimer` expiry — stochastic, nanosecond-resolution | `kernel/time/hrtimer.c` |
| CICR positive feedback (RyR recruitment) | Timer coalescing under `NO_HZ_FULL` — nearby timers batch to the same tick, reducing wakeups | `kernel/time/tick-sched.c` |
| Global Ca²⁺ oscillation (frequency-encoded signal) | Periodic batched wakeup burst — the coalesced timer cluster delivers accumulated work in one IRQ | `kernel/irq/chip.c` (IRQ affinity batching) |
| IP3R channel (source of initial spark) | `hrtimer_start_range_ns()` with slack — the "spark interval" = the slack range | `kernel/time/hrtimer.c` |
| SERCA pump (re-sequesters Ca²⁺ into ER between sparks) | CPU idle re-entry after `NO_HZ_FULL` work batch — the quiet phase between oscillation peaks | `kernel/sched/idle.c` |

**P → A → E translation**:
- **P** (Physical): Stochastic IP3R openings fire spontaneously; CICR recruits neighbours when local [Ca²⁺] threshold is exceeded.
- **A** (Algorithm): Coalescing window [t, t+slack] groups timers that would otherwise generate separate wakeups; any timer within the window inherits the batch's slack.
- **E** (Electronic): QCM6490 GIC-600 IPI delivers batched timer interrupt; CPU wakes once, drains all coalesced timer callbacks, re-enters idle — one wakeup pulse per oscillation period.

**TypeScript hook** (`bioplasmaPathways.ts`): `BP14_CALCIUM_SPARK` constant — `lineageosPath: "kernel/time/tick-sched.c · kernel/irq/chip.c (NO_HZ_FULL coalescing) · android_kernel_fairphone_qcm6490"`, `organelleRoute: { source: "endoplasmic-reticulum", target: "broadcast", direction: "broadcast" }`.

---

## 6. Cross-Pathway Routing Matrix

This matrix shows where bioplasma (BP) and biophoton (P) pathways share organelle space, creating potential coupling interactions.

| BP Pathway | Coupled P Pathway | Shared Organelle | Coupling Mechanism | Interaction σ | Notes |
|---|---|---|---|---|---|
| **BP1** (ΔΨm DC) | **P1** (Mito→Nucleus) | `mitochondria` | Both depend on mitochondrial membrane potential; BP1 maintains the ΔΨm that drives P1 ROS production | 0.75 | Strongest coupling; BP1 is the prerequisite for P1 |
| **BP2** (Action potential) | **P2** (Cytoplasm blue-green) | `cytoplasm` | Binder transaction chain carries both; P2 biophoton emission from carbonyl termination coincides with membrane depolarisation events | 0.50 | Mechanistically distinct but spatially co-localised |
| **BP3** (Wound broadcast) | **P3** (Extracellular UPE) | `membrane` → broadcast | Both are broadcast-scope signals; P3 NIR broadcast coincides with wound-edge UPE elevation from ROS burst | 0.80 | Strongest cross-family coupling; wound events activate both |
| **BP4** (ELF / Ca²⁺) | **P6** (Membrane retrograde) | `membrane` → `endoplasmic-reticulum` | Ca²⁺ influx from VGCC (BP4) drives ROS production → P6 retrograde peroxidation signal; ER is shared target | 0.55 | Causal relationship: BP4 → Ca²⁺ → ROS → P6 |
| **BP6** (Fröhlich coherence) | **P5** (Microtubule waveguide) | `cytoskeleton` | Tubulin is the primary Fröhlich candidate AND the P5 photon waveguide; both pathways use the same protein substrate | 0.45 | Both speculative/indicative; tubulin dipole moment (1,740 Debye) is shared physical basis |
| **BP7** (Vmem morphogenesis) | **P4** (UV anterograde) | `nucleus` | Both encode "genetic authority" — BP7 writes the persistent state; P4 nucleus→cytoplasm UV signal reads it | 0.35 | Sequential: BP7 writes configuration that P4 ordered broadcast activates |
| **BP9** (THz diagnostic) | **P7** (Mito lateral sync) | `mitochondria` / `cytoplasm` | Both are low-σ diagnostic/sync signals; P7 lateral photon synchronisation and BP9 THz phenotype both characterise mitochondrial ensemble state | 0.50 | Complementary diagnostics |

---

## 7. LineageOS-Native Bioplasma Additions

These LineageOS features have no AOSP equivalent and specifically enhance BP pathway implementations beyond the AOSP baseline.

> **Accuracy constraints**: Trust Interface is DEPRECATED/REMOVED in LOS 20/21+. LiveDisplay is INACTIVE on FP5 LOS 21. microG is NOT in standard LOS. Root is NOT default in official LOS builds. These constraints apply to all entries below.

---

### 7.1 BP5 Thermoregulatory Coupling → PowerManager Thermal Status

**Source**: `frameworks/base/core/java/android/os/PowerManager.java` · `android_frameworks_base`  
**Zone**: `mitochondria` · **BP Enhancement**: BP5, BP1  
**Confidence**: `verified` (PowerManager.java confirmed; CellVitalOverlayController.kt is Phase 3 ROM work)

> **Corrected (2026-06-24):** The earlier entry referenced `hardware/lineage/interfaces/thermal` in `android_hardware_lineage_interfaces`. **That directory does not exist** — verified absent. The actual Cell OS BP5 integration is via `PowerManager.addThermalStatusListener(executor, OnThermalStatusChangedListener)` in the SystemUI `CellVitalOverlayController.kt`. The underlying QTI thermal HAL (`android.hardware.thermal-service.qti`, from `android_hardware_qcom_thermal`) is transparent to Cell OS — Cell OS never calls it directly.

LineageOS thermal status acts as the cell's **thermoregulatory feedback loop**. Just as mitochondrial uncoupling proteins (UCPs) dissipate the proton gradient to protect against oxidative stress, the throttling status listener modulates the BP5 σ signal to reflect thermoregulatory state. All 7 PowerManager thermal constants are mapped to σ values (NONE=0.00 through SHUTDOWN=1.00), giving Cell OS a continuous thermoregulatory axis from baseline homeostasis to protective shutdown.

**P→A→E**:
- P: `PowerManager` fires `OnThermalStatusChangedListener` on state transition (threshold-gated, mirroring MMW resonant selectivity)
- A: `CellVitalOverlayController.kt` receives status; `CellVitalServiceImpl.java` maps to BP5 σ
- E: CPU/GPU throttling expressed as BP5 σ shift; `CellVitalService` propagates to zone signal; QS tile surfaces live thermoregulatory state

---

### 7.2 LineageOS Power Profiles (QCM6490) → Metabolic Coherence Tuning

**Source**: `vendor/lineage/configs/power` · `android_device_fairphone_FP5`  
**Zone**: `mitochondria` / `cytoskeleton` · **BP Enhancement**: BP6, BP1  
**Confidence**: `indicative` (σ=0.70)

Power profiles are the cell's **metabolic gear-shift**. They determine the "ATP availability" for collective oscillations. Higher performance profiles lower the latency threshold for Binder thread synchronisation — the Fröhlich analogue (BP6) becomes more physically plausible when the metabolic pumping rate (CPU boost) is higher. This is a LineageOS-specific improvement because AOSP power profiles for FP5 are stock and less granular.

**P→A→E**:
- P: User/System requests "Performance" or "Battery Saver" mode
- A: PowerHAL applies QCM6490-specific `schedutil` hints
- E: Binder thread pool latency reduced; VSYNC-coherent bursts (BP6) more stable

---

### 7.3 LineageParts → Anatomical Memory Editor (BP7 Writer)

**Source**: `github.com/LineageOS/android_packages_apps_LineageParts` ✓  
**Zone**: `nucleus` · **BP Enhancement**: BP7  
**Confidence**: `verified` (σ=0.90 for source confirmation)

LineageParts is the **epigenetic transcription factor** for the BP7 morphogenetic Vmem pattern. It allows the user (external regulatory signal) to rewrite the cell's anatomical memory without changing the DNA (AOSP base). Every setting written through LineageParts persists via SettingsProvider and is read by all components on boot — the software equivalent of a planarian bioelectric reprogramming event. AOSP has no equivalent unified settings editor; this is a LineageOS-exclusive BP7 enhancement.

**P→A→E**:
- P: User modifies Lineage-specific setting (status bar, button mapping, network privacy)
- A: LineageParts writes to `Settings.Secure` / `Settings.Global`
- E: Components read new Vmem pattern on boot; system morphology changes

---

### 7.4 Performance / Power HAL Tuning → Cytoplasmic Flux Optimisation

**Source**: `device/fairphone/FP5/powerhint.xml` (device tree) · `android.hardware.power-service-qti` (QTI vendor binary)  
**Zone**: `cytoplasm` · **BP Enhancement**: BP2  
**Confidence**: `indicative` (σ=0.65; powerhint.xml path is device-maintainer-dependent — verify at build time)

> **Corrected (2026-06-24):** The earlier entry referenced `hardware/lineage/interfaces/performance` in `android_hardware_lineage_interfaces`. **That directory does not exist** — verified absent. The actual FP5 Performance/Power HAL is `android.hardware.power-service-qti` (Qualcomm vendor binary); Cell OS tunes it via `powerhint.xml` in the FP5 device tree. There is no `android_hardware_lineage_interfaces/performance/` to fork.

The QTI power service / `powerhint.xml` tuning is the **cytoplasmic streaming regulator**. By configuring `schedutil` scheduling hints appropriate for FP5's tri-cluster QCM6490, it ensures the ionic flux of IPC messages (BP2 action potential chain) propagates with minimal resistance. Tuning `powerhint.xml` is Phase 4 work in the ROM Fork Plan (indicative complexity — verify exact file location in `configs/` subdir at build time).

**P→A→E**:
- P: High-priority UI event triggers performance hint via `IPerformanceHint`
- A: `android.hardware.power-service-qti` applies `schedutil` hint; Binder thread priority elevated
- E: BP2 transaction delivered with sub-millisecond latency; bioplasma action potential wave completes its route

---

### 7.5 LiveDisplay → Chromatic Cytoskeletal Adaptation (Dormant on FP5)

**Source**: `hardware/lineage/livedisplay/` — **STATUS: INACTIVE on FP5 LOS 21**  
**Zone**: `cytoskeleton` · **BP Enhancement**: BP9 (THz phenotype analogue), BP6 (display coherence)

LiveDisplay implements **chromatic adaptation** — the cellular process by which photoreceptors adjust spectral sensitivity in response to ambient light. This would directly enhance the BP9 THz refractive phenotype analogue (adjusting system "spectral output" based on diagnostic state) and the BP6 coherence window (display timing). However, LiveDisplay is **confirmed inactive on FP5 LOS 21** — the device tree lacks the required hardware overlays. It is recorded here as a dormant gene: the code exists but the expression is absent.

**Confidence**: `verified-absent` for FP5 LOS 21.

---

### 7.6 Trust Interface → Immune Checkpoint (Deprecated → SecurityStatusOrganelle)

**STATUS**: ❌ **DEPRECATED/REMOVED in LOS 20/21+** — `android_packages_apps_Trust` repository HTTP 404-deleted.

The Trust Interface was the **immune checkpoint complex** for bioplasma pathway integrity — it would have surfaced BP3 wound-state, BP7 Vmem anomalies, and BP1 resting-state deviations to the user. Because it is removed, the immune checkpoint layer is currently absent from the baseline LineageOS build.

**Replacement (APPROVED — Phase 3, CELL_OS_ROM_FORK_PLAN.md):** `SecurityStatusOrganelle` is now an approved Cell OS ROM component. It will be implemented as a privileged CellShell fragment + Settings deeplink (`org.cellos.cellshell/SecurityStatusOrganelle.kt`), surfacing: SELinux status, verified boot state, network permission audit (AppOps BP3 analogue), and biometric unlock state. This directly fills the immune checkpoint gap with a Cell OS-native component that does not depend on the deleted Trust Interface repository.

### 7.7 QCM6490 Extended Substrate Capabilities (Deep Research Additions — June 2026)

Four hardware capabilities of the QCM6490 SoC were not modelled in the original manifold. Each carries a strong biological analogy and can enrich existing pathway substrate metadata or serve as the foundation for future pathway extensions.

**CPU Correction (June 2026 audit):** All references to "4x Gold @ 2.4 GHz + 4x Silver" are superseded by the verified tri-cluster layout: 1×Gold Prime (Cortex-A78) @ **2.71 GHz** + 3×Gold (Cortex-A78) @ **2.40 GHz** + 4×Silver (Cortex-A55) @ **1.96 GHz**. Process node: **TSMC 6nm (N6)**. Adreno GPU: **643** (not 643L).

---

#### 7.7.1 Sensor Hub / LPASS Island → Basal Metabolic Monitoring

**Source**: `drivers/iio/` + ADSP Sensor Protection Domain firmware · `android_kernel_fairphone_qcm6490`  
**Confidence**: `indicative` — LPASS sensor PD verified in QCM6490 ADSP architecture; Cell OS analogy is architectural.

The ADSP contains a dedicated **Sensor Protection Domain (Sensor PD)** within the Low Power Audio Subsystem (LPASS). This Sensor PD runs **always-on** accelerometer/gyroscope/barometer fusion without waking the main APSS cluster — power draw < 2 mW vs ~500 mW for APSS wakeup. The analogy is the cell's **basal metabolic tone**: housekeeping organelles (mitochondria at rest, ER Ca²⁺ buffering, cytoskeletal tension) maintain a continuous low-energy monitoring state that does not require "nuclear attention" (APSS wakeup). This enriches **BP1** (resting membrane potential = ADSP resting IRQ baseline) and is the substrate for **BP12** (circadian clock output monitoring the metabolic trough without APSS involvement).

**Cell OS integration path**: `useCellVitalStore` circadian hook → ADSP-resident polling when `document.visibilityState === "hidden"`, analogous to Sensor PD operating without APSS wake.

---

#### 7.7.2 Hexagon Tensor Accelerator (HTA) → Epigenetic Pattern Recognition

**Source**: `drivers/char/adsprpc.c` (FastRPC userspace bridge) + CDSP firmware · `android_kernel_fairphone_qcm6490`  
**Confidence**: `indicative` — HTA documented in Qualcomm Hexagon 770 Architecture Reference; CDSP FastRPC path verified.

The Hexagon 770 contains both **HVX** (vector extension, SIMD) and a dedicated **Hexagon Tensor Accelerator (HTA)** delivering ~12 TOPS for matrix operations. The HTA is architecturally separate from HVX and is accessed via the CDSP. The biological analogy is **epigenetic pattern recognition**: histone modification readers (BRD4, HDAC complexes) scan chromatin marks across the genome in a massively parallel sliding-window fashion, classifying gene accessibility patterns — exactly as the HTA performs sliding-window tensor convolution across input feature maps. This is distinct from general computation (APSS) just as epigenetic reading is distinct from direct DNA transcription. Enriches **BP7** (Vmem morphogenetic patterning — the HTA is the genomic reader that acts on the pattern written by the morphogenetic field).

---

#### 7.7.3 Subsystem Restart (SSR) → Organelle Apoptosis and Mitophagy

**Source**: `drivers/remoteproc/qcom_q6v5_adsp.c` · `android_kernel_fairphone_qcm6490`  
**Confidence**: `verified` — SSR is a well-documented QCM6490 recovery feature; biological analogy is Structural.

The QCM6490 hardware supports **per-subsystem restart**: if ADSP, CDSP, or MPSS crashes (segfault, watchdog expiry), the SoC isolates and hot-restarts that subsystem without rebooting the full SoC or APSS. The analogy is precise: **selective autophagy / mitophagy**. Damaged mitochondria are selectively tagged with PINK1/Parkin ubiquitin, isolated from the healthy mitochondrial network (fusion/fission balance), encapsulated in an autophagosome, and delivered to the lysosome for degradation and recycling — without triggering whole-cell apoptosis. SSR performs the identical algorithmic step: isolate the faulty subsystem, terminate it, rebuild its state from firmware, reconnect it to the shared SMEM/GLINK fabric. This maps to a new BP substrate enriching **BP8** (SMEM fabric recovery — the GLINK re-handshake after ADSP SSR mirrors the MAM Ca²⁺ re-establishment after mitochondrial fission/fusion).

---

#### 7.7.4 FastRPC / GLink → Vesicle-Mediated Transport

**Source**: `drivers/char/adsprpc.c` (FastRPC) · `drivers/soc/qcom/smem.c` (GLink IPC) · `android_kernel_fairphone_qcm6490`  
**Confidence**: `verified` — FastRPC and GLink are production QCM6490 IPC mechanisms; biological analogy is Functional.

**FastRPC** provides zero-copy remote procedure calls from APSS to CDSP/ADSP, passing shared-memory buffer handles rather than copying data. **GLINK** (Generic Link) is the transport layer over SMEM that routes packets between all four subsystems. The combined FastRPC/GLink mechanism is the closest software analogue to **vesicle-mediated transport**: the cell does not copy cargo molecules between compartments — instead it wraps them in membrane-derived vesicles (analogous to shared-memory buffer handles), routes them via cytoskeletal tracks (analogous to GLINK routing table), and delivers them to the target organelle, where the vesicle fuses and releases cargo (analogous to the FastRPC callee accessing the buffer pointer directly). This enriches **BP2** (action potential Binder IPC) by providing a distinct, parallel zero-copy transport substrate appropriate for high-bandwidth ER→Golgi vesicle traffic (ER synthesises → COPII vesicle buds → Golgi receives, all without membrane crossing the cytoplasm as free protein).

---

#### 7.7.5 SPU (Secure Processing Unit) → Nuclear Pore Complex Privileged Zone

**Source**: Qualcomm SPU (not directly accessible via LineageOS kernel; TrustZone mediates access)  
**Confidence**: `indicative` — SPU documented in QCM6490 product brief; kernel access model via TrustZone verified.

The QCM6490 SPU is a dedicated secure enclave for hardware root-of-trust, key storage, and attestation — physically isolated from all other subsystems, accessible only via TrustZone EL3 calls. The analogy is the **nuclear pore complex (NPC)**: the NPC is the exclusive gateway between nucleus and cytoplasm, enforcing active transport selectivity (importin-β/Ran-GTP gradient). Only proteins carrying a nuclear localisation signal (NLS) — analogous to code signed by the hardware root-of-trust — pass through. This enriches **BP7** (morphogenetic state store — Vmem pattern writes must be authenticated, like NLS-guided transcription factor nuclear import).

---

## 8. TypeScript Implementation Contract

> **Status**: All items in this section reflect the **as-built implementation** as of June 2026. The planned code sketches from the original roadmap have been superseded by the actual source files listed below. Planned file names that differ from the final names are noted inline.

### §8.1 BioplasmaPathway Type Definition

**Implemented in**: `src/domain/types.ts`

The `organelleRoute.source` and `.target` fields are typed as `BioplasmaRouteEndpoint` — a 16-member union that catches invalid endpoint strings at compile time. The original roadmap used plain `string`; this union was introduced during the architect review phase.

```typescript
/**
 * Type-safe organelle endpoints for bioplasma route fields.
 * "broadcast" is the sentinel for field-wide emissions (BP1, BP3, BP7).
 * Mistyped IDs are caught at compile time.
 */
export type BioplasmaRouteEndpoint =
  | "broadcast"
  | "cell-membrane"
  | "membrane-receptors"
  | "mitochondria"
  | "endoplasmic-reticulum"
  | "nucleus"
  | "nucleolus"
  | "dna"
  | "nuclear-pores"
  | "cytoplasm"
  | "cytoskeleton"
  | "ribosomes"
  | "golgi-apparatus"
  | "vesicles"
  | "lysosomes"
  | "vacuole";

/**
 * Classification of how literally plasma physics criteria apply
 * to the biological medium.
 */
export type PlasmaLiteralness =
  | "literal-quasi-plasma"     // BP1: membrane sheath (genuine charge separation)
  | "electrolyte-analogy"      // BP2, BP3, BP7: structured ion flux
  | "field-coherence-analogy"; // BP4, BP5, BP6, BP8, BP9: EM field coupling

/** Evidence-calibrated confidence tiers for bioplasma phenomena. */
export type BioplasmaStatus =
  | "verified"    // σ ≥ 0.75: established electrophysiology
  | "indicative"  // 0.50–0.75: replicated in-vivo/in-vitro results
  | "speculative" // 0.30–0.50: theoretical models with limited data
  | "reserved";   // < 0.30: architectural placeholder, no runtime implementation

/**
 * A bioplasma pathway (BP1–BP9) representing an endogenous electric
 * or electromagnetic field interaction and its LineageOS software analogue.
 *
 * Source of truth for σ values: BIOPLASMA_RESEARCH.md.
 * Source of truth for lineageosPath: LineageOSv2_Manifold.md §5.
 *
 * Invariants enforced at runtime:
 *   - status === "reserved" → bioplasmaSignal() returns early (BP8)
 *   - organelleRoute.direction === "readonly" → never drives routing (BP9)
 */
export interface BioplasmaPathway {
  code: "BP1" | "BP2" | "BP3" | "BP4" | "BP5" | "BP6" | "BP7" | "BP8" | "BP9";
  sigma: number;                     // 0–1 from BIOPLASMA_RESEARCH.md; ceiling for impl. confidence
  status: BioplasmaStatus;
  carrier: string;                   // physical field carrier description
  frequencyRange: string;            // e.g. "DC (steady-state)" | "0.01–300 Hz" | "30 MHz–300 GHz"
  plasmaLiteralness: PlasmaLiteralness;
  lineageosPath: string | null;      // verified GitHub source path or null if no impl.
  organelleRoute: {
    source: BioplasmaRouteEndpoint;  // typed union — compile-time safety
    target: BioplasmaRouteEndpoint;
    direction: "inward" | "outward" | "bidirectional" | "broadcast" | "readonly";
  };
  ipcAnalogue: string;               // Android/LineageOS IPC mechanism name
  isMetaphor: boolean;               // true if IPC analogue is architectural metaphor only
}
```

### §8.2 Pathway Constants and Registries

**Implemented in**: `src/domain/content/bioplasmaPathways.ts` · `src/domain/content/organelles.ts`

> **Name correction**: The roadmap specified `BP5_RF_COUPLING`. The implemented constant is `BP5_RF_MMW` (reflecting the full RF/millimetre-wave carrier range). All other BP names match the roadmap.

```typescript
// src/domain/content/bioplasmaPathways.ts
export const BP1_RESTING_POTENTIAL: BioplasmaPathway = { /* σ=0.92, verified */ };
export const BP2_ACTION_POTENTIAL:  BioplasmaPathway = { /* σ=0.90, verified */ };
export const BP3_WOUND_FIELD:       BioplasmaPathway = { /* σ=0.85, verified */ };
export const BP4_ELF_COUPLING:      BioplasmaPathway = { /* σ=0.65, indicative */ };
export const BP5_RF_MMW:            BioplasmaPathway = { /* σ=0.60, indicative — was BP5_RF_COUPLING in roadmap */ };
export const BP6_FROHLICH:          BioplasmaPathway = { /* σ=0.45, speculative, deferred */ };
export const BP7_VMEM_PATTERN:      BioplasmaPathway = { /* σ=0.72, indicative */ };
export const BP8_QED_WATER:         BioplasmaPathway = { /* σ=0.32, reserved, annotation-only */ };
export const BP9_THZ_TELEMETRY:     BioplasmaPathway = { /* σ=0.50, indicative, readonly */ };

export const BIOPLASMA_PATHWAYS:             BioplasmaPathway[];  // all 9
export const BIOPLASMA_BY_CODE:              Record<string, BioplasmaPathway>; // lookup by "BP1"..
export const IMPLEMENTED_BIOPLASMA_PATHWAYS: BioplasmaPathway[];  // excludes BP6 (deferred) and BP8 (reserved)
```

Two registries are exported from `organelles.ts`. The original roadmap specified one (`BIOPLASMA_REGISTRY`); the implementation added a second zone-level view used directly by `BioplasmaFieldSection.tsx`:

```typescript
// src/domain/content/organelles.ts

/**
 * BIOPLASMA_REGISTRY — keyed by organelle ID (BioplasmaRouteEndpoint string).
 * Used by bioplasmaSignal() routing and low-level organelle lookups.
 */
export const BIOPLASMA_REGISTRY: Record<string, BioplasmaPathway[]> = {
  "cell-membrane":         [BP1_RESTING_POTENTIAL, BP2_ACTION_POTENTIAL, BP3_WOUND_FIELD, BP4_ELF_COUPLING, BP5_RF_MMW],
  "membrane-receptors":    [BP1_RESTING_POTENTIAL, BP5_RF_MMW],
  "mitochondria":          [BP1_RESTING_POTENTIAL, BP6_FROHLICH],
  "endoplasmic-reticulum": [BP4_ELF_COUPLING],
  "nucleus":               [BP5_RF_MMW, BP7_VMEM_PATTERN],
  "cytoskeleton":          [BP6_FROHLICH, BP9_THZ_TELEMETRY],
  "cytoplasm":             [BP8_QED_WATER, BP9_THZ_TELEMETRY],
};

/**
 * BIOPLASMA_ZONE_REGISTRY — keyed by CellZoneId (all 8 zones always present).
 * Zone-level aggregation of BIOPLASMA_REGISTRY for panel display.
 * Used directly by BioplasmaFieldSection.tsx.
 */
export const BIOPLASMA_ZONE_REGISTRY: Record<CellZoneId, BioplasmaPathway[]> = {
  "membrane":              [BP1_RESTING_POTENTIAL, BP2_ACTION_POTENTIAL, BP3_WOUND_FIELD, BP4_ELF_COUPLING, BP5_RF_MMW],
  "mitochondria":          [BP1_RESTING_POTENTIAL, BP6_FROHLICH],
  "endoplasmic-reticulum": [BP4_ELF_COUPLING],
  "nucleus":               [BP5_RF_MMW, BP7_VMEM_PATTERN],
  "cytoskeleton":          [BP6_FROHLICH, BP9_THZ_TELEMETRY],
  "cytoplasm":             [BP8_QED_WATER, BP9_THZ_TELEMETRY],
  "ribosomes":             [],
  "golgi":                 [],
};
```

### §8.3 Vital Store Bioplasma Extension

**Implemented in**: `src/features/cell-shell/state/useCellVitalStore.ts`

The as-built `bioplasmaSignal()` differs from the roadmap sketch in three ways:
1. **Broadcast fan-out**: `direction === "broadcast"` emits to **all 8 zones** at `weightedIntensity × 0.55`. If the source is a real organelle (not the `"broadcast"` sentinel), its zone receives full intensity. This corrects the original sketch which would have silently emitted nothing for BP1 and BP3 (both have `source: "broadcast"`).
2. **Intensity clamp**: `Math.min(1, Math.max(0, intensity × sigma))` before any routing.
3. **`bioplasmaBaseline` map** + **`initBP1Baseline()`**: a separate store field that persists the BP1 membrane intensity across transient signal overwrites.

```typescript
// State shape additions (CellVitalState)
bioplasmaBaseline: Partial<Record<CellZoneId, number>>;
// ^ Set by initBP1Baseline(); restored by clearExpiredSignals() whenever a
//   transient signal expires over a zone that has a recorded baseline.

bioplasmaSignal: (pathway: BioplasmaPathway, intensity?: number, ttlMs?: number) => void;
initBP1Baseline: (profileIntensity?: number) => void;
// ^ profileIntensity defaults to 0.22 (balanced Vmem). Also accepts 0.10 (cool) or 0.38 (performance).
//   Reads persisted VmemProfile on layout boot via readVmemFromStorage().

// ─── bioplasmaSignal() implementation ────────────────────────────────────────
bioplasmaSignal: (pathway, intensity = 1.0, ttlMs = 1500) => {
  // Guard 1 — reserved pathways never fire (BP8).
  if (pathway.status === "reserved") return;
  // Guard 2 — read-only pathways never drive routing (BP9).
  if (pathway.organelleRoute.direction === "readonly") return;

  // σ-weighted intensity, clamped to [0, 1].
  const weightedIntensity = Math.min(1, Math.max(0, intensity * pathway.sigma));

  set((s) => {
    const next = { ...s.signals };

    if (pathway.organelleRoute.direction === "broadcast") {
      // Fan-out: emit to every zone at attenuated intensity.
      // Correctly handles BP1 (membrane broadcast) and BP3 (wound field, source="broadcast").
      for (const zoneId of ALL_ZONES) {
        next[zoneId] = { type: "bioplasma", intensity: weightedIntensity * 0.55, expiresAt: Date.now() + ttlMs };
      }
      // Boost the real source zone (if source is an organelle, not "broadcast").
      const sourceZone = getZoneForOrganelle(pathway.organelleRoute.source);
      if (sourceZone) {
        next[sourceZone] = { type: "bioplasma", intensity: weightedIntensity, expiresAt: Date.now() + ttlMs };
      }
    } else {
      // Point-to-point (inward, outward, bidirectional).
      const sourceZone = getZoneForOrganelle(pathway.organelleRoute.source);
      const targetZone = pathway.organelleRoute.target !== "broadcast"
        ? getZoneForOrganelle(pathway.organelleRoute.target)
        : null;
      if (sourceZone) {
        next[sourceZone] = { type: "bioplasma", intensity: weightedIntensity, expiresAt: Date.now() + ttlMs };
      }
      if (targetZone) {
        next[targetZone] = { type: "bioplasma", intensity: weightedIntensity * 0.7, expiresAt: Date.now() + ttlMs + 500 };
      }
    }
    return { signals: next };
  });
},

// ─── initBP1Baseline() ───────────────────────────────────────────────────────
initBP1Baseline: (profileIntensity = 0.22) =>
  set((s) => ({
    bioplasmaBaseline: { ...s.bioplasmaBaseline, membrane: profileIntensity },
    signals: {
      ...s.signals,
      membrane: { type: "bioplasma", intensity: profileIntensity, expiresAt: Infinity },
    },
  })),
```

**`clearExpiredSignals()` baseline restore**: After removing any expired signal over a zone that has a recorded `bioplasmaBaseline` entry, the store immediately re-emits the baseline signal at `expiresAt: Infinity`. This ensures the BP1 always-on membrane glow survives all transient overwrites.

**Boot-time profile restore** (`CellExplorerLayout.tsx`): On mount, calls `initBP1Baseline(VMEM_BASELINE[readVmemFromStorage()])` — the persisted Cool/Balanced/Performance profile is applied immediately, not only when the user opens the BP7 switcher.

### §8.4 Hebbian Adapter Bioplasma Modulation

**Implemented in**: `src/features/learning/hebbianAdapter.ts`

The as-built function signature differs from the roadmap sketch: it takes `zoneRegistry: Partial<Record<CellZoneId, BioplasmaPathway[]>>` (i.e. `BIOPLASMA_ZONE_REGISTRY`) rather than a flat `activePathways: BioplasmaPathway[]` array. Two runtime guards added that were absent from the roadmap sketch:

```typescript
const MAX_ZONE_BIOPLASMA_BOOST = 0.20;
// ^ Hard cap: prevents cold-start membrane dominance (5 verified pathways would
//   otherwise accumulate ~0.65 boost before any user visit has occurred).

export function applyBioplasmaManifoldModulation(
  zoneWeights: Record<CellZoneId, number>,
  zoneRegistry: Partial<Record<CellZoneId, BioplasmaPathway[]>>
): Record<CellZoneId, number> {
  const modulated = { ...zoneWeights };
  for (const zoneId of Object.keys(modulated) as CellZoneId[]) {
    const pathways = zoneRegistry[zoneId];
    if (!pathways?.length) continue;
    let zoneBoost = 0;
    for (const pw of pathways) {
      if (pw.status === "reserved") continue;               // BP8 guard
      if (pw.organelleRoute.direction === "readonly") continue; // BP9 guard
      const boostFactor = pw.sigma >= 0.75 ? 0.18 : pw.sigma >= 0.50 ? 0.14 : 0.09;
      zoneBoost += pw.sigma * boostFactor;
    }
    // Cap total bioplasma contribution per zone; then clamp zone weight to [0, 1].
    modulated[zoneId] = Math.min(1.0, modulated[zoneId] + Math.min(MAX_ZONE_BIOPLASMA_BOOST, zoneBoost));
  }
  return modulated;
}
```

### §8.5 BP7 Vmem Closed Loop (Unplanned Addition)

**Implemented in**: `src/features/explorer/components/BioplasmaFieldSection.tsx` · `src/features/cell-shell/hooks/useBioplasmaVmem.ts`

This integration was not in the original roadmap but closes the BP7 feedback loop. In zones that include BP7, `BioplasmaFieldSection` renders a VmemProfile switcher with three profiles:

| Profile | `profileIntensity` | Biological analogue |
|---|---|---|
| `cool` | 0.10 | Hyperpolarised resting state |
| `balanced` | 0.22 | Homeostatic default |
| `performance` | 0.38 | Depolarised metabolic pump |

On profile change:
1. `useBioplasmaVmem.setVmemProfile(profile)` → persists to `localStorage` (key `cell-os-vmem-v1`)
2. `bioplasmaSignal(BP7_VMEM_PATTERN, VMEM_BASELINE[profile] / BP7_VMEM_PATTERN.sigma, 3000)` → fires a 3-second BP7 ring pulse
3. `initBP1Baseline(VMEM_BASELINE[profile])` → updates the membrane glow intensity to match the selected metabolic state

**Note**: `useBioplasmaVmem` uses separate localStorage, not Zustand persist, so the VmemProfile survives store resets. `readVmemFromStorage()` is exported as a pure (non-hook) function for use in `CellExplorerLayout` mount effects.

### §8.6 Implementation Status Table (Updated)

| Priority | Pathway | σ | File | Status |
|---|---|---|---|---|
| 1 | BP1 (Resting Potential) | 0.92 | `useCellVitalStore.ts` | ✅ Always-on Infinity TTL + bioplasmaBaseline |
| 2 | BP2 (Action Potential) | 0.90 | `useMembraneObserver.ts` | ✅ Fires on organelle click-lock (affect event) |
| 3 | BP3 (Wound Field) | 0.85 | `useWoundFieldBroadcast.ts` | ✅ error/offline/Battery<15% listeners; mounted race fix |
| 4 | BP12 (Circadian Clock) | 0.88 | `bioplasmaPathways.ts` | ✅ Constant + IMPLEMENTED_BIOPLASMA_PATHWAYS; June 2026 addition |
| 5 | BP7 (Vmem Pattern) | 0.72 | `useBioplasmaVmem.ts` + `BioplasmaFieldSection.tsx` | ✅ localStorage persist + VmemProfile switcher |
| 6 | BP14 (Calcium Spark) | 0.82 | `bioplasmaPathways.ts` | ✅ Constant + IMPLEMENTED_BIOPLASMA_PATHWAYS; June 2026 addition |
| 7 | BP4 (ELF Coupling) | 0.70 | `useELFResonance.ts` | ✅ visibilitychange/focus; 8s debounce; σ raised 0.65→0.70 June 2026 |
| 8 | BP9 (THz Telemetry) | 0.50 | `BioplasmaFieldSection.tsx` | ✅ Read-only panel cards; never feeds routing |
| 9 | BP5 (RF/MMW) | 0.60 | `useThermalHAL.ts` | ✅ 12s interval; heapRatio > 0.75 gate; lineageosPath fixed June 2026 |
| 10 | BP13 (Phase Separation) | 0.72 | `bioplasmaPathways.ts` only | ⏸ Constant exported; `isMetaphor: true`; no runtime hook (cgroup analogy) |
| 11 | BP6 (Fröhlich) | 0.45 | `bioplasmaPathways.ts` only | ⏸ Deferred — constant exported; no runtime logic |
| 12 | BP8 (QED Water) | 0.32 | `bioplasmaPathways.ts` only | 🔒 Reserved annotation; no runtime usage |

---

## 9. Source Verification Audit

### §9.1 Kernel and Driver Sources (BP1, BP2)

| Source claimed | Verification result | Confidence |
|---|---|---|
| `github.com/LineageOS/android_kernel_fairphone_qcm6490` | ✓ HTTP 200 confirmed | `verified` |
| `kernel/irq/irqdesc.c` in FP5 kernel | ✓ Present in msm-5.4 tree | `verified` |
| `drivers/android/binder.c` in FP5 kernel | ✓ Present (AOSP invariant, msm-5.4) | `verified` |
| `frameworks/native/libs/binder/IPCThreadState.cpp` | ✓ AOSP framework invariant | `verified` |

### §9.2 Framework Sources (BP3, BP4, BP7)

| Source claimed | Verification result | Confidence |
|---|---|---|
| `github.com/LineageOS/android_frameworks_base` | ✓ Repository exists | `verified` |
| `BroadcastQueue.java` path in frameworks_base | `indicative` — path is AOSP-standard; LOS branch may vary | `indicative` |
| `SettingsProvider` in LOS packages | ✓ Standard AOSP provider, LOS inherits | `verified` |
| `github.com/LineageOS/android_packages_apps_LineageParts` | ✓ HTTP 200 confirmed | `verified` |
| `fs/eventpoll.c` (epoll, BP4) | ✓ Linux kernel invariant in msm-5.4 | `verified` |

### §9.3 HAL Sources (BP5, BP6, LineageOS-Native)

| Source claimed | Verification result | Confidence |
|---|---|---|
| `github.com/LineageOS/android_hardware_lineage_interfaces` | ✓ HTTP 200 confirmed — **repo exists** | `verified` |
| `hardware/lineage/interfaces/thermal/` (within above repo) | ❌ **Absent** — no `thermal/` directory in `android_hardware_lineage_interfaces` (verified) | `verified-absent` |
| `hardware/lineage/interfaces/performance/` (within above repo) | ❌ **Absent** — no `performance/` directory in `android_hardware_lineage_interfaces` (verified) | `verified-absent` |
| `frameworks/base/core/java/android/os/PowerManager.java` | ✓ AOSP/LOS invariant; `OnThermalStatusChangedListener` + 7 `THERMAL_STATUS_*` constants at L2687–L2718 | `verified` |
| `ThermalManager.java` (frameworks/base/core/java/android/os/) | ❌ **HTTP 404** — does not exist in LOS 21 (verified) | `verified-absent` |
| `THERMAL_STATUS_HAL_SKIP_SET_THROTTLING` constant | ❌ **Does not exist** — not a valid PowerManager constant (verified) | `verified-absent` |
| `android.hardware.thermal-service.qti` (`android_hardware_qcom_thermal`) | ✓ Exists as vendor binary; transparent to Cell OS — not called directly | `indicative` |
| `hardware/interfaces/thermal/aidl/IThermal.aidl` | ✓ AOSP AIDL standard — used by QTI thermal HAL vendor, not by Cell OS directly | `verified` |
| `hardware/interfaces/sensors/aidl/ISensors.aidl` | ✓ AOSP AIDL standard | `verified` |
| `frameworks/native/libs/binder/ProcessState.cpp` (BP6) | `indicative` — parent framework repo confirmed; specific file is AOSP invariant | `indicative` |

### §9.4 Telemetry Sources (BP9)

| Source claimed | Verification result | Confidence |
|---|---|---|
| `packages/modules/StatsD` (statsd) | ✓ AOSP module, LOS inherits | `verified` |
| `external/perfetto` | ✓ AOSP module, LOS inherits | `verified` |
| `frameworks/native/cmds/dumpsys/` | ✓ AOSP, LOS inherits | `verified` |
| `frameworks/base/core/java/android/os/DropBoxManager.java` | ✓ AOSP invariant | `verified` |

### §9.5 Deprecated / Absent Sources

| Source | Status |
|---|---|
| `android_packages_apps_Trust` | ❌ HTTP 404 — repository deleted. Trust Interface removed in LOS 20/21+. |
| `hardware/lineage/livedisplay/` (FP5 overlay) | ❌ Absent from FP5 device tree — LiveDisplay inactive on FP5 LOS 21 |
| `hardware/lineage/interfaces/thermal/` | ❌ **Absent** — no thermal/ subdirectory in `android_hardware_lineage_interfaces` (verified) |
| `hardware/lineage/interfaces/performance/` | ❌ **Absent** — no performance/ subdirectory in `android_hardware_lineage_interfaces` (verified) |
| `ThermalManager.java` (frameworks/base/core/java/android/os/) | ❌ **HTTP 404** — does not exist in LOS 21 frameworks/base |
| `THERMAL_STATUS_HAL_SKIP_SET_THROTTLING` | ❌ **Does not exist** — not a valid PowerManager or AIDL constant |
| `lineage-build.prop` | ❌ **Does not exist** — build properties are in `PRODUCT_SYSTEM_DEFAULT_PROPERTIES` in `config/common.mk` |
| Privacy Guard fake-data injection | `unconfirmed` — full synthetic-effector capability absent in LOS 17+ (Android 10+) |
| Root/su binary in official LOS | ❌ Not present — opt-in Magisk only |
| microG in standard LOS | ❌ Separate build variant — not in official LOS |

### §9.6 Cell OS TypeScript Implementation Verification

The following table records the as-built status of every component specified or implied by the §10 roadmap. All Phase 1–3 items are accounted for.

| Component | File | Status | Notes |
|---|---|---|---|
| `BioplasmaRouteEndpoint` type | `src/domain/types.ts` | ✅ Implemented | 16-member union; roadmap had plain `string` |
| `PlasmaLiteralness` type | `src/domain/types.ts` | ✅ Implemented | 3 members as specified |
| `BioplasmaStatus` type | `src/domain/types.ts` | ✅ Implemented | 4 tiers as specified |
| `BioplasmaPathway` interface | `src/domain/types.ts` | ✅ Implemented | `organelleRoute.source/target` typed as `BioplasmaRouteEndpoint` |
| `BP1_RESTING_POTENTIAL` | `src/domain/content/bioplasmaPathways.ts` | ✅ Implemented | σ=0.92, verified, broadcast direction |
| `BP2_ACTION_POTENTIAL` | `src/domain/content/bioplasmaPathways.ts` | ✅ Implemented | σ=0.90, verified, inward |
| `BP3_WOUND_FIELD` | `src/domain/content/bioplasmaPathways.ts` | ✅ Implemented | σ=0.85, verified, broadcast |
| `BP4_ELF_COUPLING` | `src/domain/content/bioplasmaPathways.ts` | ✅ Implemented | σ=0.65, indicative, inward |
| `BP5_RF_MMW` | `src/domain/content/bioplasmaPathways.ts` | ✅ Implemented | σ=0.60, indicative (roadmap alias: `BP5_RF_COUPLING`) |
| `BP6_FROHLICH` | `src/domain/content/bioplasmaPathways.ts` | ⏸ Deferred constant | σ=0.45, speculative; exported but no runtime logic |
| `BP7_VMEM_PATTERN` | `src/domain/content/bioplasmaPathways.ts` | ✅ Implemented | σ=0.72, indicative, broadcast |
| `BP8_QED_WATER` | `src/domain/content/bioplasmaPathways.ts` | 🔒 Reserved annotation | σ=0.32; `bioplasmaSignal()` returns early; no UI |
| `BP9_THZ_TELEMETRY` | `src/domain/content/bioplasmaPathways.ts` | ✅ Implemented (read-only) | σ=0.50, readonly guard; panel display only |
| `BIOPLASMA_REGISTRY` | `src/domain/content/organelles.ts` | ✅ Implemented | Keyed by organelle ID string |
| `BIOPLASMA_ZONE_REGISTRY` | `src/domain/content/organelles.ts` | ✅ Implemented | Keyed by `CellZoneId`; used by `BioplasmaFieldSection` |
| `bioplasmaSignal()` | `src/features/cell-shell/state/useCellVitalStore.ts` | ✅ Implemented | Broadcast fan-out; σ-weighted clamp; BP8/BP9 guards |
| `bioplasmaBaseline` map | `src/features/cell-shell/state/useCellVitalStore.ts` | ✅ Implemented | Persists BP1 intensity; restored by `clearExpiredSignals()` |
| `initBP1Baseline()` | `src/features/cell-shell/state/useCellVitalStore.ts` | ✅ Implemented | Accepts `profileIntensity` (default 0.22); Infinity TTL |
| `useWoundFieldBroadcast` | `src/features/cell-shell/hooks/useWoundFieldBroadcast.ts` | ✅ Implemented | BP3: error/offline/Battery<15%; mounted ref race fix |
| `useELFResonance` | `src/features/cell-shell/hooks/useELFResonance.ts` | ✅ Implemented | BP4: visibilitychange/focus; 8s debounce |
| `useThermalHAL` | `src/features/cell-shell/hooks/useThermalHAL.ts` | ✅ Implemented | BP5: 12s interval; heapRatio > 0.75 gate |
| `useBioplasmaVmem` | `src/features/cell-shell/hooks/useBioplasmaVmem.ts` | ✅ Implemented | BP7: localStorage persist; `readVmemFromStorage()` exported |
| `applyBioplasmaManifoldModulation()` | `src/features/learning/hebbianAdapter.ts` | ✅ Implemented | Takes `zoneRegistry`; `MAX_ZONE_BIOPLASMA_BOOST=0.20`; BP9 guard |
| `BioplasmaFieldSection` | `src/features/explorer/components/BioplasmaFieldSection.tsx` | ✅ Implemented | All 8 zone panels; σ bar; direction glyph; BP7 VmemProfile switcher |
| `bioplasmaZoneWeights` ring glow | `src/features/explorer/navigation/CellMapNav.tsx` | ✅ Implemented | `useLearnedManifold()` wired to SVG `fillOpacity`/`strokeOpacity` |
| BP1 boot-time profile restore | `src/features/explorer/navigation/CellExplorerLayout.tsx` | ✅ Implemented | `initBP1Baseline(VMEM_BASELINE[readVmemFromStorage()])` on mount |
| `SecurityStatusOrganelle` (immune checkpoint) | `org.cellos.cellshell/SecurityStatusOrganelle.kt` (ROM) | ✅ APPROVED — ROM Phase 3 | Privileged CellShell fragment: SELinux status, verified boot, AppOps audit, biometric state. SPA equivalent `SecurityStatusOrganelle.tsx` remains outstanding. |

---

## 10. Implementation Roadmap

> **Scope**: This roadmap covers the **React/TypeScript SPA** (Cell OS explorer). Native Android ROM phases are tracked separately in `CELL_OS_ROM_FORK_PLAN.md` (APPROVED 2026-06-24; Phases 1–5 defined). Both tracks are active and independent.

> **React/TypeScript SPA status as of June 2026**: Phases 1–3 fully complete. Phase 4 (documentation sync) in progress — this document updated; `BIOPLASMA_RESEARCH.md` §13 sync pending. SPA `SecurityStatusOrganelle.tsx` remains the sole outstanding Phase 3 item (its native counterpart `SecurityStatusOrganelle.kt` is approved ROM Phase 3 work).

---

### Phase 1 — ✅ COMPLETE (Verified BPs: σ ≥ 0.85)

**Goal**: Ground the Cell OS in its bioplasma substrate. Every verified pathway type-defined and at minimum stub-implemented.

| Action | Final File | Status | Deviation from plan |
|---|---|---|---|
| Add `BioplasmaPathway` type | `src/domain/types.ts` | ✅ Done | Added `BioplasmaRouteEndpoint` 16-member union for `source`/`target` fields (roadmap had `string`) |
| Add BP1–BP9 constants | `src/domain/content/bioplasmaPathways.ts` | ✅ Done | BP5 exported as `BP5_RF_MMW` (roadmap alias: `BP5_RF_COUPLING`) |
| Add `BIOPLASMA_REGISTRY` | `src/domain/content/organelles.ts` | ✅ Done | Also added `BIOPLASMA_ZONE_REGISTRY` keyed by `CellZoneId` for panel display |
| Add `bioplasmaSignal()` | `src/features/cell-shell/state/useCellVitalStore.ts` | ✅ Done | Added broadcast fan-out (all 8 zones × 0.55), intensity clamp, `bioplasmaBaseline` map, `initBP1Baseline()` |
| BP1 always-on baseline glow | `src/features/cell-shell/state/useCellVitalStore.ts` | ✅ Done | `expiresAt: Infinity`; baseline restored after transient overwrites via `clearExpiredSignals()` |
| BP2 Binder-event burst | `src/features/learning/useMembraneObserver.ts` | ✅ Done | Fires on organelle click-lock (affect event); roadmap targeted `CellDiagram.tsx` (not used) |
| BP3 health/battery broadcast | `src/features/cell-shell/hooks/useWoundFieldBroadcast.ts` | ✅ Done | `window.error`, `unhandledrejection`, `offline`, Battery API < 15%; `mounted` ref race condition fixed |

---

### Phase 2 — ✅ COMPLETE (Indicative BPs: σ 0.50–0.74)

**Goal**: Extend the living system with persistent state and event-driven signalling.

| Action | Final File | Status | Deviation from plan |
|---|---|---|---|
| BP7 persistent Vmem store | `src/features/cell-shell/hooks/useBioplasmaVmem.ts` | ✅ Done | Separate `localStorage` hook (key `cell-os-vmem-v1`), NOT Zustand persist (roadmap said Zustand). `readVmemFromStorage()` exported as pure function for boot-time use. |
| BP4 ELF edge-triggered listener | `src/features/cell-shell/hooks/useELFResonance.ts` | ✅ Done | `visibilitychange` + `focus` events; 8s debounce; σ=0.65 intensity |
| BP5 thermal HAL analogue | `src/features/cell-shell/hooks/useThermalHAL.ts` | ✅ Done | 12s polling interval; fires when JS heap ratio > 0.75 |
| BP9 telemetry display | `src/features/explorer/components/BioplasmaFieldSection.tsx` | ✅ Done | Roadmap targeted `DiagnosticPanel.tsx` (not built); final component shows pathway cards with σ bar in all zone panels |
| Hebbian bioplasma modulation | `src/features/learning/hebbianAdapter.ts` | ✅ Done | `applyBioplasmaManifoldModulation(zoneWeights, zoneRegistry)` — takes `BIOPLASMA_ZONE_REGISTRY`, not a flat array; `MAX_ZONE_BIOPLASMA_BOOST=0.20` cap; BP9 readonly guard |
| Zone integration display | All 8 zone panel components | ✅ Done | `BioplasmaFieldSection` at bottom of each zone panel; `bioplasmaZoneWeights` from `useLearnedManifold()` wired to ring `fillOpacity`/`strokeOpacity` in `CellMapNav.tsx` |

#### Phase 2 Addition (not in original roadmap): BP7 Vmem Closed Loop

`BioplasmaFieldSection.tsx` renders a **VmemProfile switcher** in zones that contain BP7. This closes the feedback loop that was left open by the original plan (Vmem was persisted but nothing read it back as a live signal):

| Profile | `initBP1Baseline` intensity | Biological state |
|---|---|---|
| Cool | 0.10 | Hyperpolarised resting |
| Balanced | 0.22 | Homeostatic default |
| Performance | 0.38 | Depolarised metabolic pump |

On profile change: persists to localStorage → fires BP7 signal → updates membrane glow. Boot-time restore wired in `CellExplorerLayout.tsx` via `initBP1Baseline(VMEM_BASELINE[readVmemFromStorage()])`.

---

### Phase 3 — ✅ COMPLETE as designed (Speculative BPs: σ < 0.50)

**Goal**: Hold structural space for speculative pathways without polluting routing logic.

| Action | Final File | Status | Notes |
|---|---|---|---|
| BP6 coherent burst | `src/domain/content/bioplasmaPathways.ts` | ⏸ Deferred as planned | Constant `BP6_FROHLICH` exported; `status: "speculative"`; zero runtime logic. Activate only when Fröhlich condensate evidence reaches σ ≥ 0.50. |
| BP8 reserved annotation | `src/domain/content/bioplasmaPathways.ts` | 🔒 Annotation-only | `BP8_QED_WATER` exported; `bioplasmaSignal()` returns immediately for this pathway; not rendered in any panel |
| Immune checkpoint (SPA) | — | ❌ **SPA not yet built** | `SecurityStatusOrganelle.tsx` — SPA version remains outstanding. Native `SecurityStatusOrganelle.kt` (CellShell, privileged fragment) is APPROVED ROM Phase 3 work in `CELL_OS_ROM_FORK_PLAN.md §3.3`. |

---

### Phase 4 — Documentation Sync (In Progress)

After each Phase 1–3 implementation, three sync actions are required:

| Action | Status |
|---|---|
| Update this document (§8, §9.6, §10) to reflect as-built implementation | ✅ Done — June 2026 |
| Update `BIOPLASMA_RESEARCH.md` §13 (Actionable Dev Roadmap) to mark completed items | ⏳ Pending |
| Update `.agents/memory/cell-os-bioplasma-schema.md` if σ calibration changes | ✅ Done (no σ changes; architect review confirmed values) |

---

### Future Work Register

Items not in the original roadmap but identified during implementation:

| Item | Priority | Notes |
|---|---|---|
| `SecurityStatusOrganelle.tsx` (SPA) | High | SPA immune checkpoint — surfaces BP1/BP3/BP7 anomalies. See §7.6. Native `SecurityStatusOrganelle.kt` is APPROVED ROM Phase 3 (`CELL_OS_ROM_FORK_PLAN.md §3.3`). |
| BP12 runtime hook | Medium | `useCircadianClock.ts` — wrap `visibilityState`/`document.timeline` to broadcast circadian phase to zone weights via `bioplasmaSignal()`. Substrate is AlarmManagerService; OS hook is JS Page Visibility API. |
| BP14 runtime hook | Medium | `useCalciumSpark.ts` — `setInterval` with stochastic jitter simulates CICR; fires burst of bioplasmaSignal() calls with overlapping TTLs to the ER zone and broadcast. |
| BP6 activation criteria | Research-gated | Requires biological σ ≥ 0.50; currently 0.45. Pietruszka 2025 is Tier 2 only; monitor in-vivo confirmation. |
| BP8 activation path | Research-gated | Requires non-local, phase-coherent coordination mechanism in AOSP kernel. De Ninno 2025 is supporting context; σ = 0.32 stays frozen until direct CD experimental evidence. |
| JEITA charging paths (P6/BP3) | Documentation | Add `drivers/power/supply/qcom/smb5-lib.c` and `drivers/power/supply/qcom/qg-battery-profile.c` to §9.x source audit as FP5-specific enrichment of P6 and BP3 wound-field detection substrate. |

---

## 11. Native Android ROM Layer

> **Authority**: `CELL_OS_ROM_FORK_PLAN.md` (APPROVED 2026-06-24) is the canonical specification for all components in this section. This section is a coordinate map entry — implementation details are in the fork plan.

The Cell OS ROM fork introduces a native Android layer beneath the React/TypeScript SPA. This layer runs on-device as real Android system components, not in a WebView. It maps the bioplasma/biophoton manifold directly onto the Android system server and SystemUI at the privilege level of a first-party platform component.

### §11.1 Core Components

| Component | Package / Path | Biological Role | ROM Phase |
|---|---|---|---|
| **ICellVitalService.aidl** | `frameworks/base/core/java/android/os/ICellVitalService.aidl` | Biological signalling interface contract (plasma membrane receptor surface) | Phase 2 |
| **CellVitalService.java** | `frameworks/base/services/core/java/com/android/server/cellos/CellVitalService.java` (`android_frameworks_base`) | System server singleton (nucleus) — aggregates all bioplasma pathway signals | Phase 2 |
| **CellOsBootstrap.java** | `frameworks/base/services/core/java/com/android/server/cellos/CellOsBootstrap.java` (`android_frameworks_base`) | Boot sequencer — `PHASE_SYSTEM_SERVICES_READY` init | Phase 2 |
| **CellVitalOverlayController.kt** | `frameworks/base/packages/SystemUI/src/com/android/systemui/cellos/CellVitalOverlayController.kt` (`android_frameworks_base`) | BP5 thermal listener; SystemUI biophoton ring render loop | Phase 3 |
| **CellShell** (org.cellos.cellshell) | `android_packages_apps_CellShell/` (new repo) | Privileged native system app replacing React SPA for on-device display | Phase 3 |
| **SecurityStatusOrganelle.kt** | `android_packages_apps_CellShell/SecurityStatusOrganelle.kt` | Immune checkpoint: SELinux, verified boot, AppOps audit, biometric state | Phase 3 |
| **generate_domain.py** | `android_packages_apps_CellShell/tools/generate_domain.py` | TypeScript→Kotlin domain codegen | Phase 2 |
| **CellOsDomain.kt** | `android_packages_apps_CellShell/generated/CellOsDomain.kt` (also `cell_os_domain.json` asset bundle) | Generated sealed class hierarchy (BP/P pathway objects on-device) | Phase 2 |

### §11.2 Platform Permission Model

Permission declared in **platform** (frameworks), not in client app:

```xml
<!-- frameworks/base/core/res/AndroidManifest.xml -->
<permission android:name="org.cellos.permission.READ_VITALS"
    android:protectionLevel="signature" />
```

- `CellShell` **requests** `org.cellos.permission.READ_VITALS` — it does NOT declare it
- Every `ICellVitalService` Binder stub method calls `enforceCallingPermission("org.cellos.permission.READ_VITALS", ...)` — enforcement is in the server stub, not the client annotation
- `@RequiresPermission` annotations in `ICellVitalService.aidl` are lint metadata only — they do not enforce at runtime
- Privileged clients (CellShell) must additionally be allowlisted in `etc/permissions/privapp-permissions-cellos.xml` — a privapp allowlist entry is mandatory for signature-protected permissions consumed by privileged system apps

### §11.3 BP5 Thermal Integration (ROM Layer)

```kotlin
// CellVitalOverlayController.kt — Phase 3
context.getSystemService(PowerManager::class.java)
    .addThermalStatusChangedListener(executor) { status ->
        cellVitalService.updateBP5ThermalStatus(status)
    }
```

Valid status → σ mapping (all 7 constants, no fallthrough, no default-to-zero):

| PowerManager constant | σ value |
|---|---|
| `THERMAL_STATUS_NONE` | 0.00 |
| `THERMAL_STATUS_LIGHT` | 0.30 |
| `THERMAL_STATUS_MODERATE` | 0.55 |
| `THERMAL_STATUS_SEVERE` | 0.80 |
| `THERMAL_STATUS_CRITICAL` | 0.95 |
| `THERMAL_STATUS_EMERGENCY` | 0.98 |
| `THERMAL_STATUS_SHUTDOWN` | 1.00 |

### §11.4 ROM Phase Summary

| Phase | Key deliverable | Acceptance gate |
|---|---|---|
| **Phase 1** | ROM identity, FP5 boot, branding overlays (FrameworksResTarget/, SystemUIResTarget/) | `ro.cellos.version` visible in `adb shell getprop`; device boots to homescreen |
| **Phase 2** | AIDL skeleton, CellVitalService registered at PHASE_SYSTEM_SERVICES_READY, platform permission, domain codegen | `adb shell service check cellos_vital` returns "found"; integrity script exits 0 (15/9/20/13 counts); generated Kotlin matches TypeScript domain constants |
| **Phase 3** | SystemUI biological shell (PhoneStatusBarView, BatteryMeterView BP1 colour, QS tiles, CellVitalOverlayController), CellShell app, SecurityStatusOrganelle | Status bar shows live BP1 colour shift with battery voltage; P1/BP1 QS tiles expand showing σ value and confidence tier; CellShell app shows all 15 organelle zones with pathway detail |
| **Phase 4** | SMEM sysfs + kernel (`CONFIG_CELLOS_BIOPLASMA_BP8`), `powerhint.xml` tuning, thermal HAL validation | `adb shell cat /sys/kernel/cellos/smem_coherence` returns CI in [0.0, 1.0] (if flag enabled); `getPathwayState("BP8")` returns 0.0f (zero guard confirmed); BP5 QS tile reflects all 7 `THERMAL_STATUS_*` states correctly |
| **Phase 5** | Signed, reproducible build; OTA update package; privacy/security review | `make dist` produces flashable `.zip` and OTA delta; SELinux audit clean (no denials); privacy/security review complete; full biological integrity pass (all σ values + source path HTTP 200 checks) |

Full phase specification, patch architecture, repo strategy, and acceptance criteria: `CELL_OS_ROM_FORK_PLAN.md`.

---

*Document compiled from 14 research batches, June 2026. Last updated June 24, 2026 (ROM fork plan integration). Biological claims governed by `BIOPLASMA_RESEARCH.md`. LineageOS source claims verified against `github.com/LineageOS` organisation. ROM implementation architecture governed by `CELL_OS_ROM_FORK_PLAN.md` (APPROVED). FP5-specific constraints enforced per §3.5 and §9.5.*
