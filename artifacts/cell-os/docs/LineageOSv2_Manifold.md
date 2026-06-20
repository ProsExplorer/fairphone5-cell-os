# Cell OS — LineageOS Manifold v2
## Unified Bioplasma + Biophoton Coordinate Map: AOSP Android → LineageOS

> **Thesis**: LineageOS is a coordinate chart on the same computational manifold as AOSP Android. This document extends `LINEAGEOS_MANIFOLD.md` by integrating the nine bioplasma pathways (BP1–BP9) from `BIOPLASMA_RESEARCH.md` into verified LineageOS source code, alongside the existing seven biophoton pathways (P1–P7). The result is a complete 16-pathway electromagnetic manifold — from DC resting potential to UV biophoton emission — fully mapped to the Fairphone 5 (QCM6490) running LineageOS 21+.
>
> **Hardware target**: Fairphone 5 — Qualcomm QCM6490, Hexagon 770 DSP, Adreno 643L GPU, LPDDR4x 8 GB. Hardware-invariant across all LineageOS coordinate changes.
>
> **Authority hierarchy**: `BIOPLASMA_RESEARCH.md` governs all BP1–BP9 σ values and biological claims · `BIOPHOTON_RESEARCH.md` governs all P1–P7 σ values · `LineageOSv2_Manifold.md` governs LineageOS source path claims and implementation tiers only.
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
| RF / UHF | 300 MHz–3 GHz | Membrane thermal coupling | BP5 sub | `THREAD_PRIORITY_DEFAULT` | HAL callback |
| MMW | 30–300 GHz | Lipid bilayer resonance; 53–60 GHz window | BP5 | `THREAD_PRIORITY_BACKGROUND` | Freq-gated HAL |
| Sub-THz / THz | 0.1–10 THz | THz refractive phenotype; Fröhlich condensate | BP6, BP9 | `THREAD_PRIORITY_LOWEST` | Diagnostic only |
| QED water CD | ~THz (estimated) | Interfacial water coherence (speculative) | BP8 | Reserved (not implemented) | Zero-weight |
| Blue-green visible | 450–550 nm | Triplet carbonyl (Russell mechanism) | P2 | `THREAD_PRIORITY_FOREGROUND` | Unchanged |
| Red visible | 634–703 nm | Singlet O₂ dimol; mitochondrial stress burst | P1, P6 | `THREAD_PRIORITY_DEFAULT` | Unchanged |
| NIR window | 700–1,000 nm | Extracellular tissue UPE; cell-to-cell broadcast | P3 | `THREAD_PRIORITY_BACKGROUND` | Privacy Guard gate |
| Deep NIR | 1,270 nm | Singlet O₂ monomol decay | P7 sub | `THREAD_PRIORITY_LOWEST` | SeedVault |
| UV | 200–380 nm | DNA excimer/exciplex; NER burst | P4, P5 | `THREAD_PRIORITY_URGENT_DISPLAY` | Unchanged |

### 1.2 Unified Pathway Summary Table (All 16 Pathways)

| Code | Family | σ | Status | Carrier | Frequency | Zone | LOS Implementation Domain |
|---|---|---|---|---|---|---|---|
| **BP1** | Bioplasma | 0.92 | Verified | Electrostatic (K⁺/Na⁺) | DC | membrane | Kernel IRQ / Power HAL |
| **BP2** | Bioplasma | 0.90 | Verified | Depolarisation wavefront | 0.1–1000 Hz pulse | membrane→cytoplasm | Binder IPC (binder.c) |
| **BP3** | Bioplasma | 0.85 | Verified | DC wound field | DC to 0.1 Hz | membrane→broadcast | BroadcastQueue / BatteryService |
| **BP7** | Bioplasma | 0.72 | Indicative | Vmem spatial pattern | DC + 0.001–0.1 Hz | all zones | SettingsProvider / LineageParts |
| **BP4** | Bioplasma | 0.65 | Indicative | ELF EM field (VGCC) | 0.01–300 Hz | membrane→ER | epoll / Looper / MessageQueue |
| **BP5** | Bioplasma | 0.60 | Indicative | RF/MMW EM field | 30–300 GHz | membrane→nucleus | AIDL Thermal/Sensor HAL |
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
- **LineageOS-Specific Components**: Features unique to LineageOS (e.g., Trebuchet, LineageParts, Lineage Thermal HAL) begin at `indicative` until the specific source path is verified in the LineageOS GitHub.
- **The Verification Ceiling**: Source-verification of a LineageOS implementation raises the *implementation confidence*, but the overall Manifold σ **can never exceed** the biological σ ceiling defined in the research documents.
- **σ Distinction**: The bioplasma/biophoton σ is a weight of biological evidence (0–1 continuous); the implementation tier (Verified/Indicative) is a flag of code-level certainty. A pathway can be `indicative` evidence level and still carry σ = 0.72 if its mechanistic coherence supports a high weighting.

### 3.3 Pathway σ and Implementation Tier Table

| BP Pathway | Biological σ | LOS Implementation Tier | Implementation Confidence |
|---|---|---|---|
| **BP1** (Membrane Potential) | 0.92 | `verified` | Inherited — AOSP kernel/IRQ invariant |
| **BP2** (Action Potential) | 0.90 | `verified` | Inherited — AOSP Binder invariant |
| **BP3** (Wound Fields) | 0.85 | `verified` | Inherited — AOSP BroadcastQueue + BatteryService |
| **BP7** (Morphogenesis) | 0.72 | `indicative` | LOS-specific — LineageParts source-verified |
| **BP4** (ELF Coupling) | 0.65 | `indicative` | Inherited — epoll/Looper AOSP invariant |
| **BP5** (RF/MMW Coupling) | 0.60 | `indicative` | AIDL HAL confirmed; FP5-specific path indicative |
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
| BP5 | Bioplasma | 0.60 | MMW EM (lipid bilayer) | AIDL Thermal/Sensor HAL callback |
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
| BP5 | Bioplasma | 0.60 | RF/MMW (G-quadruplex) | HAL callback → kernel driver |
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

### §5.5 BP5 — RF/MMW Bioplasma Coupling → AIDL HAL Frequency-Gated Callback

**σ = 0.60 · Indicative · Organelle route**: `cell-membrane` → `nucleus` (inward)

#### Biological Summary
Radio frequency and millimetre-wave (30–300 GHz) electromagnetic fields couple to the plasma membrane phospholipid bilayer at specific resonant windows (53–60 GHz non-thermal window). At these frequencies, lipid bilayer resonance and voltage-gated calcium channel coupling produce biological effects. The frequency selectivity is the mechanistically significant feature: only signals at the resonant frequency produce coupling; off-frequency signals pass through without biological effect.

#### LineageOS Source Table

| Component | Source Path | Biological Analogy | Confidence |
|---|---|---|---|
| **AIDL Thermal HAL** | `hardware/interfaces/thermal/aidl/IThermal.aidl` | Membrane boundary receptor | `verified` |
| **IThermalCallback.aidl** | `hardware/interfaces/thermal/aidl/IThermalCallback.aidl` | VGCC downstream callback | `verified` |
| **AIDL Sensor HAL** | `hardware/interfaces/sensors/aidl/ISensors.aidl` | Frequency-gated antenna | `verified` |
| **LineageOS HW interfaces** | `github.com/LineageOS/android_hardware_lineage_interfaces` ✓ | Lineage HAL extensions | `indicative` |
| **FP5 thermal configuration** | `android_device_fairphone_FP5` device tree | FP5-specific frequency profile | `indicative` |

**FP5 note**: The specific thermal HAL configuration for QCM6490/FP5 is `indicative`. The AIDL interface definitions are `verified` AOSP; their activation on FP5 is device-maintainer-dependent.

#### P→A→E (BP5)
- **P**: External RF/thermal event at sensor boundary detected by Sensor/Thermal HAL — only if at a registered sampling frequency (resonant window)
- **A**: `IThermalCallback.oneway notifyThrottling()` fires — the frequency-gated callback cannot fire below registered threshold, exactly like MMW bilayer selectivity
- **E**: CPU/GPU throttling applied; power dissipation adjusted; nuclear-level DNA protection (G-quadruplex stress response) initiated

#### TypeScript Hook

```typescript
export const BP5_RF_COUPLING: BioplasmaPathway = {
  code: "BP5",
  sigma: 0.60,
  status: "indicative",
  carrier: "RF/MMW EM field (membrane phospholipid resonance)",
  frequencyRange: "30–300 GHz (53–60 GHz resonant window)",
  plasmaLiteralness: "field-coherence-analogy",
  lineageosPath: "hardware/interfaces/thermal/aidl/IThermal.aidl",
  organelleRoute: { source: "cell-membrane", target: "nucleus", direction: "inward" },
  ipcAnalogue: "AIDL HAL frequency-gated callback",
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

### §5.8 BP8 — QED Water Coherence Domain (Reserved Annotation Layer)

**σ = 0.32 · Speculative · Status: `reserved` · No LineageOS implementation**

#### Biological Summary
The QED model of water proposed by Del Giudice and Preparata suggests that liquid water exists as a two-phase system: coherence domains (CDs) approximately 100 nm in size where water molecules oscillate in phase with a trapped electromagnetic field, and disordered bulk water. At hydrophilic cellular interfaces, these CDs may act as reservoirs of electronic excitation. While EZ (exclusion zone) water effects are experimentally documented, the specific QED coherence domain model remains speculative in mainstream biophysics.

**BP8 has NO LineageOS implementation.** It exists exclusively as a reserved annotation in the Cell OS TypeScript type system. Its purpose is to reserve the pathway code and σ weight for future confirmation, not to drive any routing or signal decisions.

#### Reserved Annotation

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

**Future activation path**: BP8 would be raised to `speculative` (σ > 0.32) only if a non-local, phase-coherent coordination mechanism is discovered in the AOSP/LineageOS kernel that maps specifically to interfacial water physics. No such mechanism is currently known.

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

### 7.1 LineageOS Thermal Profiles → Thermoregulatory Coupling

**Source**: `hardware/lineage/interfaces/thermal` · `github.com/LineageOS/android_hardware_lineage_interfaces` ✓  
**Zone**: `mitochondria` · **BP Enhancement**: BP5, BP1  
**Confidence**: `verified` (σ=0.85 for thermal HAL architecture)

LineageOS thermal profiles act as the cell's **thermoregulatory feedback loops**. Just as mitochondrial uncoupling proteins (UCPs) dissipate the proton gradient to generate heat and protect against oxidative stress, LineageOS thermal profiles modulate the metabolic baseline to prevent bioplasma "overheating" (thermal runaway). The Thermal HAL provides a mechanism to handle non-thermal RF coupling (BP5) by adjusting the energy dissipation rate — a receptor-level response to field coupling that AOSP's simpler thermal management lacks.

**P→A→E**:
- P: Thermal/Sensor HAL detects external RF-induced stress or high compute load
- A: Lineage Thermal HAL selects a profile (Cool, Balanced, Performance)
- E: CPU/GPU frequencies capped; mitochondrial bioplasma flux (power draw) throttled

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

### 7.4 Performance HAL (Binder Tuning) → Cytoplasmic Flux Optimisation

**Source**: `hardware/lineage/interfaces/performance` · `android_hardware_lineage_interfaces`  
**Zone**: `cytoplasm` · **BP Enhancement**: BP2  
**Confidence**: `indicative` (σ=0.65)

The LineageOS Performance HAL is the **cytoplasmic streaming regulator**. By optimising Binder thread priorities and `schedutil` scheduling hints, it ensures the ionic flux of IPC messages (BP2 action potential chain) propagates through the cell with minimal resistance. AOSP does not include this tuning layer for FP5; it is a LineageOS-specific improvement that reduces BP2 transaction latency.

**P→A→E**:
- P: High-priority UI event detected
- A: Performance HAL boosts Binder thread priority via `schedutil` hint
- E: BP2 transaction delivered with sub-millisecond latency; bioplasma action potential wave completes its route

---

### 7.5 LiveDisplay → Chromatic Cytoskeletal Adaptation (Dormant on FP5)

**Source**: `hardware/lineage/livedisplay/` — **STATUS: INACTIVE on FP5 LOS 21**  
**Zone**: `cytoskeleton` · **BP Enhancement**: BP9 (THz phenotype analogue), BP6 (display coherence)

LiveDisplay implements **chromatic adaptation** — the cellular process by which photoreceptors adjust spectral sensitivity in response to ambient light. This would directly enhance the BP9 THz refractive phenotype analogue (adjusting system "spectral output" based on diagnostic state) and the BP6 coherence window (display timing). However, LiveDisplay is **confirmed inactive on FP5 LOS 21** — the device tree lacks the required hardware overlays. It is recorded here as a dormant gene: the code exists but the expression is absent.

**Confidence**: `verified-absent` for FP5 LOS 21.

---

### 7.6 Trust Interface → Immune Checkpoint (Historical / Deprecated)

**STATUS**: ❌ **DEPRECATED/REMOVED in LOS 20/21+** — `android_packages_apps_Trust` repository HTTP 404-deleted.

The Trust Interface was the **immune checkpoint complex** for bioplasma pathway integrity — it would have surfaced BP3 wound-state, BP7 Vmem anomalies, and BP1 resting-state deviations to the user. Because it is removed, the bioplasma manifold currently lacks an immune checkpoint layer. Future Cell OS design should consider implementing a custom Security Status organelle that performs this function.

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
| 4 | BP7 (Vmem Pattern) | 0.72 | `useBioplasmaVmem.ts` + `BioplasmaFieldSection.tsx` | ✅ localStorage persist + VmemProfile switcher |
| 5 | BP4 (ELF Coupling) | 0.65 | `useELFResonance.ts` | ✅ visibilitychange/focus; 8s debounce |
| 6 | BP9 (THz Telemetry) | 0.50 | `BioplasmaFieldSection.tsx` | ✅ Read-only panel cards; never feeds routing |
| 7 | BP5 (RF/MMW) | 0.60 | `useThermalHAL.ts` | ✅ 12s interval; heapRatio > 0.75 gate |
| 8 | BP6 (Fröhlich) | 0.45 | `bioplasmaPathways.ts` only | ⏸ Deferred — constant exported; no runtime logic |
| 9 | BP8 (QED Water) | 0.32 | `bioplasmaPathways.ts` only | 🔒 Reserved annotation; no runtime usage |

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
| `github.com/LineageOS/android_hardware_lineage_interfaces` | ✓ HTTP 200 confirmed | `verified` |
| `hardware/interfaces/thermal/aidl/IThermal.aidl` | ✓ AOSP AIDL standard | `verified` |
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
| `SecurityStatusOrganelle` (immune checkpoint) | — | ❌ Not yet built | Replacement for deprecated Trust Interface; §10 Phase 3 outstanding |

---

## 10. Implementation Roadmap

> **Status as of June 2026**: Phases 1–3 are fully complete. Phase 4 (documentation sync) is in progress — this document has been updated; `BIOPLASMA_RESEARCH.md` §13 sync is pending. The immune checkpoint organelle (`SecurityStatusOrganelle.tsx`) remains the sole outstanding Phase 3 item.

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
| Immune checkpoint | — | ❌ **Not yet built** | `SecurityStatusOrganelle.tsx` — replacement for deprecated Trust Interface (§7.6). Should surface BP3 wound-state, BP7 Vmem anomalies, BP1 resting-state deviations. Remains the sole outstanding Phase 3 item. |

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
| `SecurityStatusOrganelle.tsx` | High | Immune checkpoint — surfaces BP1/BP3/BP7 anomalies. See §7.6. |
| BP6 activation criteria | Research-gated | Requires biological σ ≥ 0.50; currently 0.45. Monitor Fröhlich condensate literature. |
| BP8 activation path | Research-gated | Requires non-local, phase-coherent coordination mechanism in AOSP kernel. No such mechanism known. |
| `BIOPLASMA_RESEARCH.md` §13 sync | Documentation | Mark Phase 1–3 items complete in the source research document. |

---

*Document compiled from 14 research batches, June 2026. Phases 1–3 implementation verified June 2026. Biological claims governed by `BIOPLASMA_RESEARCH.md`. LineageOS source claims verified against `github.com/LineageOS` organisation. FP5-specific constraints enforced per §3.5 and §9.5.*
