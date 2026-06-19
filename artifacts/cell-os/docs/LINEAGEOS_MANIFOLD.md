# Cell OS — LineageOS Manifold
## A Complete Coordinate Translation: AOSP Android → LineageOS

> **Thesis**: LineageOS is a coordinate chart on the same computational manifold as AOSP Android. The P→A→E (Perception → Affect → Expression) triple is preserved at every level. The 15 organelles, 8 zones, 7 biophoton IPC pathways, and 5 spectral priority channels all survive the translation. What changes is the specific instantiation — package names, source paths, feature surfaces — not the underlying manifold structure.
>
> **Scope**: This document replaces all AOSP Android references with LineageOS equivalents. The FP5 hardware substrate (QCM6490, Hexagon 770, Adreno 643, LPDDR4x 8 GB) is hardware-invariant and unchanged. Only the software coordinate system changes.
>
> **Confidence framework**: `verified` (σ ≥ 0.75) · `indicative` (σ 0.50–0.75) · `speculative` (σ 0.30–0.50) · `unconfirmed` (< 0.30)
>
> **Last updated**: June 2026

---

## 0. Executive Thesis: Why LineageOS Is a Valid Manifold Coordinate

LineageOS is a downstream fork of the Android Open Source Project (AOSP). It does not replace the substrate — it adds a second coordinate system over the same hardware manifold. The kernel (Linux 5.4 / msm-5.4, CAF base), the hardware abstraction layer (AIDL/HIDL), the ART runtime, and the Binder IPC driver all originate from AOSP and remain structurally identical in LineageOS.

Where LineageOS diverges is precisely where Cell OS's most alive zones live: security (membrane), display (cytoskeleton), updates (golgi), privacy (membrane-receptors), and privileged access (nucleus). In each of these zones, LineageOS replaces or augments the AOSP default with a more surgically transparent, open-source-native implementation — making it, biologically speaking, a cell with fewer vestigial structures and clearer organelle boundaries.

The universal translation layer (P→A→E manifold from `UNIVERSAL_MANIFOLD.md`) acts as the coordinate-change map. Because P→A→E is invariant across all programming paradigms and OS implementations, every AOSP component has a LineageOS coordinate that occupies the same manifold position — even where the specific package name or source path differs.

---

## 1. Method: P→A→E as the Translation Operator

The coordinate change from AOSP to LineageOS is governed by the P→A→E invariant:

```
φ_LineageOS(organelle) = (P_lineage, A_lineage, E_lineage)
φ_AOSP(organelle)      = (P_aosp,    A_aosp,    E_aosp)

Transition map: φ_LineageOS ∘ φ_AOSP⁻¹
```

For any organelle, the transition map preserves:
- The biological function being modelled
- The P→A→E structural phase
- The confidence tier floor (LineageOS claims cannot exceed AOSP confidence unless independently verified)
- The biophoton IPC topology (P1–P7 pathway graph structure)

What the transition map is permitted to change:
- The specific source file path (AOSP path → LineageOS path)
- The package or service name (e.g. `update_engine` → `packages/apps/Updater`)
- The confidence value (LineageOS-native features require their own verification)
- The biological analogy refinement (LineageOS sometimes sharpens the metaphor)

---

## 2. Confidence Tiers and Source Authority

### LineageOS Primary Sources (Tier 1 — use for `verified`)

| Source | URL / Path |
|---|---|
| LineageOS GitHub organisation | `github.com/LineageOS` |
| LineageOS Android tree | `github.com/LineageOS/android` (manifest) |
| LineageOS FP5 kernel — **verified real** | `github.com/LineageOS/android_kernel_fairphone_qcm6490` ✓ HTTP 200 confirmed |
| LineageOS FP5 device tree — **verified real** | `github.com/LineageOS/android_device_fairphone_FP5` ✓ HTTP 200 confirmed |
| LineageOS framework patches | `github.com/LineageOS/android_frameworks_base` |
| LineageOS packages | `github.com/LineageOS/android_packages_apps_*` |
| Fairphone kernel mirror | `github.com/fairphone-mirror/kernel_msm-5.4` ✓ HTTP 200 confirmed (replaces `fairphone/kernel_fairphone_5` which is 404) |
| LineageOS wiki / device page | `wiki.lineageos.org` |

### LineageOS Secondary Sources (Tier 2 — use for `indicative`)

| Source | Notes |
|---|---|
| LineageOS changelogs | Feature descriptions without full source confirmation |
| XDA Developers device threads | Community testing; not authoritative |
| LineageOS review commits | Code review provides implementation context |
| Gerrit (review.lineageos.org) | Pending and merged patch context |

### Confidence Inheritance Rule

When a component is **identical to AOSP** (no LineageOS modification), its confidence tier inherits from the existing AOSP Cell OS documentation. When a component is **LineageOS-specific**, it starts at `indicative` until confirmed against the LineageOS source tree.

---

## 3. AOSP–LineageOS Invariants (Components That Do Not Change)

The following components are **structurally identical** between AOSP and LineageOS. Their Cell OS mappings carry over without modification.

| Component | Zone | Invariant reason |
|---|---|---|
| Linux kernel base (msm-5.4 CAF) | Nucleus | Same kernel tree; Lineage adds patches on top, does not replace |
| Binder IPC driver (`drivers/android/binder.c`) | Cytoplasm | LineageOS does not fork Binder |
| Bionic libc | Cytoplasm | Identical to AOSP |
| ART runtime (`art/`) | Ribosomes | LineageOS does not fork ART significantly |
| dex2oat / JIT compiler | Ribosomes | Identical to AOSP |
| SurfaceFlinger (core) | Cytoskeleton | Core is identical; LiveDisplay adds hooks at the HAL layer |
| Choreographer / VSYNC | Cytoskeleton | Identical to AOSP |
| NNAPI (`frameworks/ml/nn/`) | ER / Nuclear-pores | Identical to AOSP |
| QNN / Hexagon SDK | Mitochondria / ER | Qualcomm-provided; independent of AOSP/LineageOS fork |
| Power HAL (base) | Mitochondria | AIDL Power HAL is AOSP-standard; LineageOS may add power profiles |
| SELinux policy (base) | Membrane | LineageOS inherits AOSP sepolicy and adds Lineage-specific contexts |
| Android thread priority system | All zones | `Process.THREAD_PRIORITY_*` constants unchanged in LineageOS |
| LMKD | Membrane/Lysosomes | LineageOS does not fork LMKD substantially |
| Keystore / Strongbox TEE | Membrane/Vacuole | TEE is hardware-enforced; unchanged by OS fork |

---

## 4. Zone-by-Zone LineageOS Mapping (Unabridged)

---

### Zone 1: Nucleus — `"nucleus"`
**Glyph**: 核 · **Color**: `#22d3ee` (cyan)

#### Biology
The nucleus is the cell's control centre. It houses the genome (DNA), orchestrates gene expression, and manages cell division. The nuclear envelope with pore complexes strictly controls what enters and exits. It is the seat of genetic authority.

#### P→A→E (Nucleus Zone)
- **P**: Bootloader chain delivers signed kernel image to init
- **A**: `init.rc` service graph activates; SELinux policy loaded; namespaces isolated
- **E**: PID 1 alive; service hierarchy ready; all other organelles can receive signals

---

##### Organelle: `nucleus` — Kernel / Control Center

| | AOSP | LineageOS |
|---|---|---|
| **Primary source** | `system/core/init/init.cpp` | `github.com/LineageOS/android_system_core` — same file, minimal delta |
| **Kernel init** | `init` (PID 1), `init.rc` | Identical; LineageOS `init.lineage.rc` extends base `init.rc` with Lineage-specific services |
| **Kernel tree** | `kernel/msm-5.4` (AOSP / CAF) | `android_kernel_fairphone_qcm6490` ✓ (real LineageOS FP5 kernel repo, HTTP 200 verified) + `fairphone-mirror/kernel_msm-5.4` ✓ (real Fairphone kernel mirror, HTTP 200 verified) |
| **Kernel additions** | Standard CAF patches | LineageOS kernel patches: additional security hardening, `schedutil` governor tuning, possible eBPF extensions — all build-config and device-maintainer dependent; `unconfirmed` for FP5 specifically until kernel config verified |
| **Root / su** | Not present by default | Root access is **opt-in only** and **not enabled by default** in modern LineageOS (17+). The traditional su binary has been removed from official builds; users wanting root must use Magisk or similar post-install tools. LineageOS adbd root mode (developer options) provides limited adb-only root |
| **Boot verification** | Android Verified Boot 2.0 (AVB2) | LineageOS supports AVB2; ships with AVB enforcing on many devices. FP5 support: `indicative` |
| **Confidence** | `verified` (kernel; AOSP primary source) | `indicative` (LineageOS kernel framework; `unconfirmed` for FP5-specific patches — see §9.2 and §9.10) |

**LineageOS biological refinement**: The `init.lineage.rc` overlay is an **epigenetic mark on the base genome** — it activates Lineage-specific gene expression (service starts, property overrides) without replacing the foundational sequence. Root access, when present, is a **steroid hormone receptor import event** — bypassing standard membrane receptors to act directly in the nucleus. Because root is opt-in and not default, this nuclear import event is rare and audited, not constitutive.

---

##### Organelle: `dna` — Immutable Root Code / User Genome

| | AOSP | LineageOS |
|---|---|---|
| **Primary source** | Zygote (`ZygoteInit.java`), system image, AVB | Same Zygote; LineageOS system image has Lineage build fingerprint |
| **Build system** | AOSP make / soong | LineageOS `lineage_*.mk` device configs — same soong build, LineageOS-specific overlays |
| **System image identity** | `ro.build.version.release`, `ro.product.model` | LineageOS sets `ro.lineage.version`, `ro.lineage.build.type` — the cell's genetic identity markers |
| **User config persistence** | `/data/` partition | Identical |
| **Confidence** | `verified` | `verified` (LineageOS build properties are well-documented public constants) |

**LineageOS biological refinement**: The LineageOS build fingerprint (`ro.lineage.version`) is the organism's taxonomic identity — it distinguishes a LineageOS cell from an AOSP cell at the genome level, even when running identical code.

---

##### Organelle: `nucleolus` — ART Preloading / dex2oat Factory

| | AOSP | LineageOS |
|---|---|---|
| **Source** | `art/dex2oat/`, `ZygoteInit.preloadClasses()` | **Identical** — LineageOS does not fork ART |
| **Function** | AOT compiles `.dex` → `.oat` on first boot | Identical |
| **Profile-guided compilation** | `art/profman/` | Identical |
| **Confidence** | `verified` | `verified` (invariant — see §3) |

---

##### Organelle: `nuclear-pores` — System API Gates / TEE Boundary / SELinux

| | AOSP | LineageOS |
|---|---|---|
| **Binder IPC** | `drivers/android/binder.c` | **Identical** |
| **ServiceManager** | `frameworks/native/cmds/servicemanager/` | **Identical** |
| **SELinux policy** | `system/sepolicy/` | `github.com/LineageOS/android_system_sepolicy` — adds Lineage-specific type contexts for Lineage apps (Trust, LineageParts, Trebuchet, su daemon) |
| **Keystore / TEE** | `system/security/keystore/`, Strongbox | **Identical** — TEE is hardware-enforced (ARM TrustZone); cannot be changed by OS fork |
| **NNAPI boundary** | `frameworks/ml/nn/` | **Identical** |
| **Trust Interface** | ❌ Not present | ⚠ **Source location unresolved**: `android_packages_apps_Trust` does NOT exist in the LineageOS GitHub org (HTTP 404 confirmed). Trust Interface is a known LineageOS feature but its source implementation location has not been identified. Likely candidates: `android_lineage-sdk`, `android_vendor_lineage`, or `android_packages_apps_Settings` fork. Until the source is found: all Trust claims are `unconfirmed`. Feature description: unified security posture dashboard (SELinux status, USB debug, root status, key health). |
| **Confidence** | `verified` | `verified` (inherited) · `unconfirmed` (Trust Interface source location not found in LineageOS org — see §9.8 and §9.12) |

**LineageOS biological refinement**: The Trust Interface is a new class of nuclear pore — a dedicated security signal channel that did not exist in the AOSP nucleus. In cell biology, nuclear pores have specificity: not all molecules can pass. The Trust Interface adds an **immune checkpoint** that audits the state of the other pores in real time, analogous to an MHC class I presentation complex — it surfaces internal state for external immune scrutiny.

---

### Zone 2: Cytoplasm — `"cytoplasm"`
**Glyph**: 漿 · **Color**: `#34d399` (green)

#### Biology
The cytoplasm is the gel-like medium filling the cell. It is the working environment where most cellular biochemistry occurs. Organelles are suspended and transported through it.

#### P→A→E (Cytoplasm Zone)
- **P**: Binder transaction arrives at the driver
- **A**: Transaction routed through ServiceManager; Bionic libc mediates memory
- **E**: Reply returned to calling process

---

##### Organelle: `cytoplasm` — IPC Bus / RAM / Runtime Medium

| | AOSP | LineageOS |
|---|---|---|
| **Binder driver** | `drivers/android/binder.c` | **Identical** |
| **ServiceManager** | `frameworks/native/cmds/servicemanager/` | **Identical** |
| **Bionic libc** | `bionic/` | **Identical** |
| **LPDDR4x 8 GB** | Physical RAM, QCM6490 unified memory | **Identical** (hardware-invariant) |
| **Confidence** | `verified` | `verified` (coordinate identity — see §3) |

**LineageOS note**: The cytoplasm zone is the most invariant zone in the entire translation. Binder is the IPC bus of the Android manifold regardless of fork. The medium does not change when the cell switches OS distributions.

---

### Zone 3: Cytoskeleton — `"cytoskeleton"`
**Glyph**: 骨 · **Color**: `#818cf8` (indigo)

#### Biology
The cytoskeleton is the cell's structural scaffolding — a dynamic network of actin filaments, microtubules, and intermediate filaments. It maintains cell shape, enables movement, and acts as tracks for motor-protein cargo transport.

#### P→A→E (Cytoskeleton Zone)
- **P**: Frame buffer ready signal (VSYNC) from display hardware
- **A**: SurfaceFlinger composites layers; RenderThread executes GPU draws; LiveDisplay applies color transform
- **E**: Composed frame pushed to panel via DSI

---

##### Organelle: `cytoskeleton` — UI Framework / Rendering / Scheduling

| | AOSP | LineageOS |
|---|---|---|
| **SurfaceFlinger** | `frameworks/native/services/surfaceflinger/` | `github.com/LineageOS/android_frameworks_native` — patches but no structural fork; core compositor identical |
| **Choreographer / VSYNC** | `frameworks/base/core/java/android/view/Choreographer.java` | **Identical** |
| **HWC2 / Hardware Composer** | `hardware/interfaces/graphics/composer/2.1/` | **Identical** |
| **RenderThread** | `frameworks/base/libs/hwui/renderthread/` | **Identical** |
| **CPU scheduler** | `kernel/sched/core.c`, `schedutil` governor | LineageOS kernel: `schedutil` governor improvements for smoother scheduling; same kernel facility, tuned parameters |
| **LiveDisplay** | ❌ Not present in AOSP | **LineageOS-wide capability**: `hardware/lineage/livedisplay/` + `frameworks/base` display hooks. Generic backends: `sdm`, `legacymm`, `sysfs`. Provides hardware-accelerated colour profiles, adaptive colour temperature, reading mode, outdoor mode — it is a **motor protein operating on the cytoskeletal microtubules**. ⚠️ **FP5 LOS 21**: LiveDisplay is **not active** — `device.mk` has zero LiveDisplay packages or overlays, no LiveDisplay dependency is declared, and no other QCM6490 device (Motorola Dubai, OnePlus u4t) uses it on LOS 21. The SDM backend's required blob (`libsdm-disp-vndapis.so`) is present in FP5 proprietary files — making it theoretically attemptable — but functional enablement is absent. |
| **Adreno 643 GPU** | Executes SurfaceFlinger passes | **Identical** (hardware-invariant) |
| **Display: 6.46" FHD+ 90Hz OLED** | HWC2 delivers 90Hz | **Identical** — active FP5 pipeline: SurfaceFlinger → HWC/QTI display HAL → panel. LiveDisplay colour processing is **not active on standard FP5 LOS 21**. |
| **Confidence** | `verified` (SurfaceFlinger) | `verified` (inherited) · `verified` (LiveDisplay absent from FP5 LOS 21 — confirmed by device.mk, overlay, and dependency source reads) |

**LineageOS biological refinement**: LiveDisplay is the most significant cytoskeletal addition in the LineageOS coordinate chart generally. In cell biology, microtubule-associated proteins (MAPs) modulate how motor proteins move along microtubules — they do not change the track but alter its functional properties. LiveDisplay is a MAP for the display pipeline: it modulates the rendering track's chromatic properties without replacing SurfaceFlinger. **On FP5 LOS 21 specifically, this MAP is dormant** — the microtubule infrastructure (QTI display HAL) is present, the MAP precursor (`libsdm-disp-vndapis.so`) is in the cell, but the MAP has not been expressed (no `PRODUCT_PACKAGES` activation).

---

### Zone 4: Ribosomes — `"ribosomes"`
**Glyph**: 糖 · **Color**: `#a3e635` (lime)

#### Biology
Ribosomes are the molecular machines that synthesise proteins from mRNA. They translate instruction sequences into executable structures. Speed and fidelity are their defining properties.

#### P→A→E (Ribosomes Zone)
- **P**: `.dex` bytecode loaded from storage
- **A**: dex2oat AOT compiles; JIT profiles hot paths; Zygote preloads common classes
- **E**: Native machine instructions executing on Kryo 670 cores

---

##### Organelle: `ribosomes` — ART Runtime / JIT / dex2oat

| | AOSP | LineageOS |
|---|---|---|
| **ART runtime** | `art/runtime/` | **Identical** — LineageOS does not fork ART |
| **dex2oat** | `art/dex2oat/` | **Identical** |
| **JIT compiler** | `art/compiler/jit/` | **Identical** |
| **Profile-guided compilation** | `art/profman/` | **Identical** |
| **Hexagon 770 HVX** | SIMD extension for parallel pattern matching | **Identical** (hardware-invariant) |
| **Confidence** | `verified` | `verified` (invariant — see §3) |

---

### Zone 5: Mitochondria — `"mitochondria"`
**Glyph**: 粒 · **Color**: `#fb923c` (orange)

#### Biology
Mitochondria generate ATP through the electron transport chain. Emission rate is directly coupled to membrane potential — a real-time readout of energy synthesis. They also regulate apoptosis and calcium buffering.

#### P→A→E (Mitochondria Zone)
- **P**: Thermal sensor / PMIC reports load; battery voltage read; NPU workload request arrives
- **A**: `cpufreq` governor adjusts core frequency; Power HAL arbitrates; Hexagon DSP executes inference
- **E**: ATP delivered (inference result returned); thermal headroom reported to scheduler

---

##### Organelle: `mitochondria` — Power Management / On-Device AI

| | AOSP | LineageOS |
|---|---|---|
| **Power HAL** | `hardware/interfaces/power/1.3/` (AIDL) | `github.com/LineageOS/android_hardware_lineage_interfaces` — may provide Lineage Power HAL extensions; base AIDL HAL identical |
| **cpufreq governor** | `kernel/drivers/cpufreq/`, `schedutil` | LineageOS kernel patches tune `schedutil` responsiveness; same framework |
| **Thermal HAL** | `hardware/interfaces/thermal/2.0/` | **Identical** base; FP5 vendor thermal HAL is device-specific |
| **PowerManager wake locks** | `frameworks/base/core/java/android/os/PowerManager.java` | **Identical** |
| **Power profiles** | `frameworks/base/core/res/res/xml/power_profile.xml` | LineageOS adds device-specific power profile overlays for many devices; values may differ from AOSP reference |
| **Hexagon 770 NPU — 12 TOPS INT8** | Primary inference engine | **Identical** (hardware-invariant; Qualcomm QNN SDK is independent of OS fork) |
| **llama.cpp QNN backend** | On-device LLM inference | **Identical** (not OS-coupled) |
| **Quick Charge 4+** | PMIC-controlled USB-PD | **Identical** (hardware-invariant) |
| **Confidence** | `verified` (NPU, power HAL structure) | `verified` (inherited hardware) · `indicative` (LineageOS power profiles; schedutil improvements) |

---

### Zone 6: Golgi Apparatus — `"golgi"`
**Glyph**: 高 · **Color**: `#c084fc` (purple)

#### Biology
The Golgi apparatus sorts, addresses, packages, and dispatches proteins to their destinations — the plasma membrane, lysosomes, or extracellular secretion. It is the post-office and shipping department of the cell.

#### P→A→E (Golgi Zone)
- **P**: Package install request / notification / intent arrives
- **A**: PackageManager validates; NotificationManager routes; OTA Updater stages delta package
- **E**: App installed; notification dispatched; system update applied

---

##### Organelle: `golgi-apparatus` — Update Dispatch / Intent Router / Package Installer

| | AOSP | LineageOS |
|---|---|---|
| **NotificationManagerService** | `frameworks/base/services/core/java/com/android/server/notification/` | `github.com/LineageOS/android_frameworks_base` — inherits NMS; no structural fork |
| **Intent dispatch (AMS)** | `frameworks/base/services/core/java/com/android/server/am/` | **Identical** |
| **PackageManager** | `frameworks/base/services/core/java/com/android/server/pm/` | **Identical** base; LineageOS adds Privacy Guard hooks to permission grant flow |
| **OTA delivery** | `system/update_engine/` (A/B update engine, Google-hosted OTA) | **LineageOS Updater**: `packages/apps/Updater` — replaces the OTA client UX and server endpoint (pointing to LineageOS servers), while the underlying A/B update platform mechanism may still be used beneath it. The address label on every package now points to LineageOS servers, not Google's — a trans-Golgi network route change, not a replacement of the entire dispatch machinery |
| **Trebuchet launcher** | ❌ AOSP Launcher3 | `packages/apps/Trebuchet` — LineageOS default launcher. The launcher is the **secretory vesicle that delivers the expression layer to the user** — what the Golgi dispatches as the final product visible at the plasma membrane |
| **8-year software support** | Fairphone OTA commitment | Under LineageOS: community-maintained; official LineageOS FP5 support depends on device maintainer status |
| **UFS 2.2 — write pipeline** | Package install writes | **Identical** (hardware-invariant) |
| **Confidence** | `verified` (PackageManager, NMS) | `verified` (inherited) · `indicative` (LineageOS Updater is well-documented; Trebuchet source confirmed) |

**LineageOS biological refinement**: The LineageOS Updater replacing `update_engine` is the most semantically rich Golgi substitution. In biology, the Golgi does not choose *what* to make — it processes what the ER sends. But it does choose *where* to send it. By pointing to LineageOS OTA servers, the Golgi has re-addressed every outbound vesicle. The biological analogy: mannose-6-phosphate receptor re-addressing — the same sorting machinery now routes to a different destination compartment.

---

##### Organelle: `vesicles` — Binder Parcels / IPC Cargo

| | AOSP | LineageOS |
|---|---|---|
| **Binder Parcels** | `drivers/android/binder.c`, `frameworks/native/libs/binder/` | **Identical** |
| **Intent messages** | `android.content.Intent` | **Identical** |
| **Trebuchet as expression vesicle** | Launcher3 (no name) | Trebuchet — the cargo delivered to the display membrane is named |
| **Confidence** | `verified` | `verified` (Binder invariant) |

---

### Zone 7: Endoplasmic Reticulum — `"endoplasmic-reticulum"`
**Glyph**: 網 · **Color**: `#f472b6` (pink)

#### Biology
The ER is a vast membrane network. The rough ER folds and modifies proteins entering the secretory pathway. The smooth ER synthesises lipids and detoxifies. Under ER stress (unfolded protein response), oxidative load increases proportionally.

#### P→A→E (ER Zone)
- **P**: Inference request enters NNAPI; AIDL service call arrives at framework
- **A**: NNAPI routes to QNN delegate → Hexagon HTP; AIDL service executes; microG stubs handle GMS API calls
- **E**: Inference result returned; AIDL reply sent; microG synthetic response emitted

---

##### Organelle: `endoplasmic-reticulum` — App Framework / AI Inference Network

| | AOSP | LineageOS |
|---|---|---|
| **NNAPI** | `frameworks/ml/nn/` | **Identical** |
| **QNN SDK / Hexagon HTP** | Qualcomm-provided | **Identical** (Qualcomm SDK; OS-independent) |
| **TFLite NNAPI delegate** | `external/tensorflow/` (AOSP external tree) | **Identical** |
| **NN HAL** | `hardware/interfaces/neuralnetworks/` | **Identical** |
| **AIDL service layer** | `frameworks/base` | `github.com/LineageOS/android_frameworks_base` — inherits; Lineage adds framework hooks for Trust and Privacy Guard |
| **microG compatibility** | ❌ Not present in AOSP | **Available via "LineageOS for microG" build variant** (`github.com/microg/GmsCore`) — a separate, officially maintained build that includes signature spoofing and microG pre-installed. Standard official LineageOS builds do **not** ship microG and do not include signature spoofing by default. Users on standard LineageOS can install microG manually only if the device maintainer has enabled signature spoofing in the build. **Biological analogy**: molecular mimicry — the microG receptor analog binds the same ligand site as the GMS receptor from a different molecular origin |
| **Ion alloc / DMA-buf** | `drivers/staging/android/ion/` | **Identical** (kernel-level; inherited) |
| **Confidence** | `verified` (NNAPI, AIDL) | `verified` (inherited) · `speculative` (microG on standard LineageOS FP5 build — entirely build-variant dependent; see §9.5) |

**LineageOS biological refinement**: microG molecular mimicry is the most structurally interesting ER-zone addition, but it must be understood as a **separate organism variant** — "LineageOS for microG" is a distinct build of the LineageOS cell. Standard LineageOS cells do not contain this mimic protein by default. The ER folding machinery is present in all variants; the mimic protein itself is an optional package that must be explicitly selected at the organism (build) level.

---

### Zone 8: Cell Membrane — `"membrane"`
**Glyph**: 膜 · **Color**: `#7dd3fc` (blue)

#### Biology
The plasma membrane is the cell's selective boundary. The phospholipid bilayer controls what enters and exits. Receptor proteins detect external signals; channel proteins regulate ion flow. The membrane maintains the electrochemical potential that drives the entire cell.

#### P→A→E (Membrane Zone)
- **P**: External signal (network packet, sensor reading, user touch, USB event) crosses the hardware boundary
- **A**: SELinux/netfilter/eBPF filters; Privacy Guard evaluates permission; Trust Interface monitors security posture
- **E**: Signal admitted (or rejected); response emitted; Trust status updated

---

##### Organelle: `cell-membrane` — HAL Boundary / Security Layer

| | AOSP | LineageOS |
|---|---|---|
| **SELinux Binder contexts** | `system/sepolicy/private/` | `github.com/LineageOS/android_system_sepolicy` — adds Lineage-specific `te` contexts for su daemon, Lineage system apps, Trust Interface daemon |
| **netfilter / iptables** | `kernel/net/netfilter/` | **Identical** + WireGuard may be present if the device kernel build includes the backport (WireGuard is in mainline Linux 5.6+; msm-5.4 requires a backport patch that is build-config dependent) — `unconfirmed` for FP5 specifically; see §9.11 |
| **eBPF networking** | `kernel/net/core/filter.c` | **Identical** + LineageOS kernel may include eBPF privacy accounting extensions; build-config dependent |
| **Android permission model** | `frameworks/base/.../pm/permission/` | **Inherited** + Lineage permission hooks (see membrane-receptors below) |
| **Biometric HAL** | `hardware/interfaces/biometrics/` | **Identical** |
| **Trust Interface** | ❌ AOSP has no equivalent | **LineageOS-exclusive**: `packages/apps/Trust` [citation needed — see §9.8] — a unified security posture dashboard. Displays: SELinux enforcement status, USB debugging status, root access status, keys & certificate status. **Biological analogy**: the Trust Interface is an **immune checkpoint complex** — it does not filter molecules itself, but continuously audits the state of all membrane channels and surfaces that status to the nucleus |
| **Confidence** | `verified` (SELinux, netfilter) | `verified` (inherited) · `unconfirmed` (Trust Interface — package path requires source verification; see §9.8) |

---

##### Organelle: `membrane-receptors` — Sensor / Permission / Interrupt Handling

| | AOSP | LineageOS |
|---|---|---|
| **Android permission model** | `packages/apps/PermissionController/` | **Identical** base |
| **Privacy dashboard (Android 12+)** | `packages/apps/PermissionController/` | **Inherited** |
| **Privacy Guard** | ❌ AOSP equivalent is limited; Android 12 Privacy Dashboard is read-only | **LineageOS feature (legacy/reduced in modern builds)**: Privacy Guard originated in CyanogenMod and early LineageOS. In LineageOS 17+, the fake-data-injection capability (blank camera, null location, silent mic) has been substantially reduced or removed from many builds; modern LineageOS relies on AOSP's `AppOpsManager` + `PermissionController` with Lineage-specific permission hooks. **Biological analogy preserved**: the permission control architecture (receptor-level gating) is still present — the fake-data effector is the element under dispute. See §9.9. |
| **Sensors / ISR** | Hardware interrupt → kernel driver → sensor HAL | **Identical** (hardware-invariant) |
| **Connectivity (5G, Wi-Fi 6, BT 5.2)** | QCM6490 integrated modem + QCA6391 | **Identical** (hardware-invariant) |
| **Confidence** | `verified` (sensors, connectivity) | `unconfirmed` (Privacy Guard fake-data injection in current LineageOS builds; permission gating architecture is `indicative` — see §9.9) |

**LineageOS biological refinement**: The receptor-level permission architecture — where the OS controls what data reaches the app — remains present in LineageOS. Whether the full synthetic-effector mechanism (fake camera/location/mic data) is available depends on build version and device configuration. The biological analogy (receptor gating) is structurally valid; the pharmacological precision (full competitive antagonism with synthetic effector) should be confirmed against the specific build before citing.

---

##### Organelle: `lysosomes` — Cleanup / LMKD / Recovery

| | AOSP | LineageOS |
|---|---|---|
| **LMKD** | Low Memory Killer Daemon | **Identical** |
| **PackageManager uninstaller** | `frameworks/base/.../pm/` | **Identical** |
| **Keystore TEE** | ARM TrustZone / Strongbox | **Identical** (hardware-invariant) |
| **LineageOS Recovery** | ❌ AOSP recovery (minimal) | **LineageOS-exclusive**: `github.com/LineageOS/android_bootable_recovery` (forked bootable/recovery). Supports sideloading Lineage zip packages, ADB sideload, factory reset, cache wipe. **Biological analogy**: LineageOS Recovery is **selective autophagy** — the cell's mechanism for degrading entire organelles when damaged, not just individual proteins. Recovery mode dismantles the running system and rebuilds it from delivered cargo (the sideloaded package). TWRP (Team Win Recovery Project) is a further specialisation: **mitophagy** — targeted recycling of a specific compartment |
| **Confidence** | `verified` (LMKD) | `indicative` (LineageOS Recovery; source confirmed at org level; FP5-specific recovery image availability requires device page verification) |

---

##### Organelle: `vacuole` — Storage / File System / Key Vault

| | AOSP | LineageOS |
|---|---|---|
| **File system (F2FS / ext4)** | UFS 2.2 storage | **Identical** (hardware-invariant + same kernel fs drivers) |
| **Keystore / Strongbox** | `system/security/keystore/` | **Identical** |
| **LMKD storage reclaim** | Swap / ZRAM | **Identical** |
| **LineageOS backup** | ❌ AOSP has no built-in backup to LineageOS infrastructure | LineageOS supports **SeedVault** (`github.com/seedvault-app/seedvault`) — an encrypted, open-source backup solution. **Biological analogy**: SeedVault is the **contractile vacuole** — an organelle that stores and selectively exports cellular contents to survive environmental stress |
| **Confidence** | `verified` (storage, keystore) | `indicative` (SeedVault integration varies by build) |

---

## 5. Biophoton IPC Pathways P1–P7 — LineageOS Translation

The seven inter-organelle biophoton signaling pathways map to Android IPC mechanisms. Under LineageOS, **the IPC mechanisms do not change** — Binder, Messenger, Broadcast, and IRQ→syscall are all AOSP-inherited and structurally identical. What changes is the **endpoint**: the service or app at each end of the pathway may be a LineageOS-specific implementation.

| Pathway | Biological Route | σ | Android IPC | LineageOS Endpoint Delta |
|---|---|---|---|---|
| **P1** | Mitochondria → Nucleus (retrograde energy signal) | 0.65 / indicative | Binder `oneway` async | NPU → Power HAL → kernel governor: identical. LineageOS kernel may tune `schedutil` responsiveness at the nucleus endpoint |
| **P2** | ER → Mitochondria (MAM directed proxy) | 0.55 / indicative | Messenger async | AIDL service → Power HAL: identical. microG may introduce a new ER endpoint for GMS-dependent power APIs |
| **P3** | Cell-membrane → Membrane-receptors | **0.80 / verified** | `sendBroadcast` unordered | HAL boundary → Privacy Guard (LineageOS adds a receptor-level filter at the target end of this pathway; the IPC mechanism is unchanged) |
| **P4** | Nucleus → Cytoplasm (UV anterograde) | 0.35 / speculative | Ordered broadcast | `init` → ServiceManager broadcast: identical. LineageOS `init.lineage.rc` may add additional ordered service starts |
| **P5** | Cytoskeleton microtubule waveguide | 0.60 / indicative | Binder thread pool | SurfaceFlinger render pipeline: identical. LiveDisplay intercepts at the display HAL layer (not the Binder layer) |
| **P6** | Cell-membrane → Nucleus (retrograde IRQ) | 0.60 / indicative | `hardirq` → IRQ thread → syscall → kernel supervisor | If WireGuard is present in the device kernel build (build-config dependent — `unconfirmed` for FP5), it adds a cryptographic channel type: WireGuard IRQ → kernel module → encrypted tunnel send. If not present, the pathway is identical to AOSP |
| **P7** | Mitochondria ↔ Mitochondria (lateral sync) | 0.65 / indicative | Messenger async | NPU burst synchronisation: identical. Power HAL lateral signaling unchanged |

**IPC mechanism invariance**: All seven IPC mechanisms (Binder oneway, Messenger, unordered broadcast, ordered broadcast, Binder thread pool, hardirq→syscall, Messenger async) are AOSP-inherited and unchanged by LineageOS. The σ values carry over from the AOSP calibration. LineageOS does not introduce new IPC mechanisms — it introduces new *endpoints* and *services* that use the existing mechanisms.

---

## 6. Spectral Priority Channels — LineageOS Translation

Android thread priority constants are defined in `android.os.Process` and in the Linux kernel scheduler. LineageOS inherits these constants without modification.

| Spectral Band | Wavelength | Biological Source | Android Priority | LineageOS Delta |
|---|---|---|---|---|
| UV | 200–380 nm | DNA tautomeric transitions (Nucleus) | `THREAD_PRIORITY_URGENT_DISPLAY` | **Unchanged** |
| Blue-green | 450–550 nm | Triplet carbonyl, Russell mechanism | `THREAD_PRIORITY_FOREGROUND` | **Unchanged** |
| Red | 634–703 nm | Singlet O₂ dimol; mitochondrial emission | `THREAD_PRIORITY_DEFAULT` | **Unchanged** |
| NIR biological window | 700–1,000 nm | Tissue-propagating cell-to-cell signals | `THREAD_PRIORITY_BACKGROUND` | **Unchanged** |
| Deep-NIR | 1,270 nm | Singlet O₂ monomol decay | `THREAD_PRIORITY_LOWEST` | **Unchanged** (SeedVault backup, WorkManager) |

The spectral channel map is a **manifold invariant** — it is grounded in emission physics and Android kernel scheduling constants, neither of which LineageOS modifies. The `wbc()` spectral color rendering in `CellDiagram.tsx` is fully valid under the LineageOS coordinate system.

---

## 7. LineageOS-Native Additions: New Biological Analogies

These features have no AOSP equivalent. They represent **emergent organelles** — structures that Cell OS did not have under AOSP but gains under LineageOS.

---

### 7.1 Trust Interface → **Immune Checkpoint Complex**

**Source**: ⚠ **UNRESOLVED** — `android_packages_apps_Trust` does NOT exist in the LineageOS GitHub org (HTTP 404 verified by GitHub API). Trust Interface is a real LineageOS feature but the source repository has not been located. Candidate locations: `android_lineage-sdk`, `android_vendor_lineage`, `android_packages_apps_Settings` LineageOS fork, or a private/renamed package. **Verification required before citing.** Previous document had `packages/apps/Twelve` (the music player) — that was wrong. The corrected path is also unverified. See §9.12.
**Zone**: membrane (membrane zone — security boundary layer)

**Biological analogy**: The Trust Interface is the cell's **immune checkpoint complex** — analogous to MHC class I presentation at the surface of a nucleated cell. MHC I does not filter molecules itself; it presents peptide fragments of everything inside the cell to passing immune cells (cytotoxic T lymphocytes), which then decide whether the cell is healthy or should be eliminated. The Trust Interface performs the same role: it does not block or filter IPC itself, but it continuously samples the internal security state (SELinux status, USB debug state, root presence, key health) and surfaces that presentation to the user — who acts as the immune system's decision layer.

**P→A→E**:
- P: System state sampled (SELinux status, USB debug, root mode, key attestation)
- A: Trust HAL evaluates against policy (healthy / degraded / violated)
- E: Trust badge displayed; user alerted if posture changes

**Confidence**: `unconfirmed` — Trust Interface is a known LineageOS feature; the exact package path (`packages/apps/Trust` vs other location) and HAL depth require source-level verification before this entry can be elevated to `indicative`. See §9.8.

---

### 7.2 Privacy Guard → **Receptor-Level Permission Gating**

**Source**: Lineage permission hooks in `github.com/LineageOS/android_frameworks_base` + AOSP `AppOpsManager`
**Zone**: membrane-receptors

**Historical note**: Privacy Guard with full synthetic-effector capability (blank camera, null location, silent mic) originated in CyanogenMod / early LineageOS. In LineageOS 17+ (Android 10+), Android's own `AppOpsManager` and Privacy Dashboard absorbed many of these functions. The deep fake-data injection layer is reduced or absent in many modern builds. What remains is the per-app permission toggle architecture — which is the biologically relevant mapping.

**Biological analogy**: The LineageOS permission architecture implements **receptor-level gating** — the OS intercepts the ligand-receptor binding event at the AppOps level and may block the downstream effector signal. Whether the cell injects a **synthetic effector response** (the full competitive antagonist model) depends on build version and device configuration.

**P→A→E**:
- P: App requests permission-gated data (camera, mic, location, contacts)
- A: AppOps + Lineage permission hooks evaluate per-app policy
- E: Data admitted (real), blocked, or (where synthetic effector is present) replaced with a null signal

**Confidence**: `unconfirmed` (fake-data injection in current builds) · `indicative` (permission gating architecture). See §9.9.

---

### 7.3 LiveDisplay → **Chromatic Adaptation / Photoreceptor Tuning**

**Source**: `hardware/lineage/livedisplay/`, display hooks in LineageOS `frameworks/base`
**Zone**: cytoskeleton

**Biological analogy**: LiveDisplay implements **chromatic adaptation** — the cellular process by which photoreceptors adjust their sensitivity curves in response to ambient light conditions. At night, the retina shifts toward rod-dominant (low-energy, low-colour) processing; in bright daylight it shifts toward cone-dominant (high-energy, colour-precise) processing. LiveDisplay performs the equivalent shift for the display pipeline: reading mode reduces blue-band emission (protecting the melatonin cycle); outdoor mode increases overall luminance for readability; colour profiles tune the spectral output for the user's environment.

**Confidence**: `indicative`

---

### 7.4 LineageOS Updater → **Trans-Golgi Network Route Change**

**Source**: `packages/apps/Updater`
**Zone**: golgi-apparatus

**Biological analogy**: The LineageOS Updater replaces the OTA client UX layer and re-addresses the vesicle routing to LineageOS servers — a **trans-Golgi network route change**. The vesicle addressing label now reads "LineageOS OTA server" rather than "Google OTA server," but the underlying lipid bilayer and cargo-loading machinery (the A/B update platform) may still be operating beneath the client layer. This is not a replacement of the entire Golgi exocytosis apparatus; it is a re-labelling of the sorting destination.

**Confidence**: `verified` — LineageOS Updater source is confirmed and well-documented. The scope (client UX + server endpoint) is accurately represented.

---

### 7.5 Root / su Management → **Optional Hormone Receptor Nuclear Access**

**Source**: Post-install tools (e.g. Magisk); `adbd` root mode (developer options only)
**Zone**: nucleus (privileged access above standard kernel grant)

**Critical framing**: Root access is **not default and not present in modern official LineageOS builds**. In LineageOS 17+ the traditional su binary has been removed from official builds. Root is an opt-in capability added post-install by the user (typically via Magisk), and enabling it is a deliberate user decision carrying security implications. `adbd` root (adb shell → root via developer options) is present but provides limited shell-level root, not persistent system-level root.

**Biological analogy**: Root access, when deliberately enabled, is **steroid hormone receptor nuclear import** — a lipophilic molecule that bypasses standard membrane receptors, enters the cytoplasm, binds its nuclear receptor, and imports directly into the nucleus to act as a transcription factor for arbitrary system state. Because root is opt-in and not constitutive, the biological equivalent is an **inducible hormone cascade**, not a constitutive nuclear import pathway.

LineageOS Trust Interface (when present) surfaces root status — the hormone's nuclear entry is reported to the immune checkpoint. This is **inducible, user-gated, Trust-audited nuclear import**.

**Confidence**: `unconfirmed` for FP5 specifically — whether a LineageOS FP5 build permits root at all depends on device config and AVB unlock status. Magisk compatibility with FP5's boot image requires verification. See §9.10.

---

### 7.6 LineageOS Recovery → **Selective Autophagy / Mitophagy**

**Source**: `github.com/LineageOS/android_bootable_recovery`
**Zone**: lysosomes

**Biological analogy**: LineageOS Recovery is **macroautophagy** — the cellular process of engulfing an entire organelle or cytoplasmic region in a double-membrane autophagosome and fusing it with a lysosome for degradation and recycling. Recovery mode tears down the entire running system (the autophagosome engulfs the cytoplasm) and allows a new system image to be delivered via sideload (the lysosome delivers recycled building blocks). TWRP is a more targeted **mitophagy** — it can selectively wipe specific partitions while preserving others.

**Confidence**: `indicative`

---

### 7.7 microG Compatibility → **Molecular Mimicry (Build-Variant Dependent)**

**Source**: `github.com/microg/GmsCore` (third-party; available via "LineageOS for microG" official build variant or manual installation with signature spoofing)
**Zone**: endoplasmic-reticulum

**Build-variant clarification**: **Official standard LineageOS does not ship microG.** "LineageOS for microG" is a separate officially maintained build variant at `lineage.microg.org` that includes signature spoofing and microG pre-installed. On standard LineageOS, microG can only function if the device maintainer has explicitly enabled signature spoofing in the build configuration — which varies per device. These are two distinct Cell OS phenotypes, not one.

**Biological analogy**: microG implements **molecular mimicry** — presenting the GMS API epitope to apps while routing computation through open-source biochemical pathways. The ER folds the mimic protein identically to the original. However, this mimic protein is **expressed only in the microG organism variant** — it is not a constitutive protein in the standard LineageOS cell.

**Confidence**: `speculative` for standard LineageOS FP5 builds · `indicative` for "LineageOS for microG" build variant (well-documented project). See §9.5.

---

### 7.8 Trebuchet Launcher → **Cilia / Flagellum — Expression Interface**

**Source**: `packages/apps/Trebuchet`
**Zone**: golgi-apparatus (dispatch origin) → **membrane** (expression destination)

**Zone note**: Trebuchet is listed under golgi-apparatus as its dispatch origin (the Golgi packages and addresses the launcher as an output), but its biological analogy places it more precisely at the **membrane zone** — it is the outermost expression surface of the LineageOS cell, visible to the user at the plasma membrane layer. Future revisions may re-classify Trebuchet to the membrane zone to better reflect its biological function.

**Biological analogy**: Trebuchet is the cell's **cilia array** — the external expression interface projecting outward from the membrane. Cilia are not internal organelles; they are the outermost protrusions the cell uses to sense and present itself to the environment. Trebuchet is the delivered cargo that the Golgi dispatched to the membrane, now visible to the user as the home screen — the cell's face.

**Confidence**: `verified` — Trebuchet is a core LineageOS package.

---

### 7.9 Additional LineageOS-Native Features

The following LineageOS additions have biological relevance but require shorter treatment. They are listed here to prevent omission rather than given full P→A→E entries at this stage.

| Feature | Source | Zone | Biological Analogy | Confidence |
|---|---|---|---|---|
| **LineageParts** | `packages/apps/LineageParts` | nucleus / cytoplasm | The cell's **gene regulatory region** — a dedicated locus for system-wide tuning that is not part of the standard AOSP gene set | `indicative` |
| **Styles / Themes** | `lineage-sdk` + `packages/apps/ThemePicker` | cytoskeleton | **Cell morphology program** — changing the cytoskeletal expression profile without altering underlying biochemistry; the cell looks different but the same proteins are running | `indicative` |
| **Button remapping** | LineageParts hardware key settings | membrane-receptors | **Receptor isoform switching** — the same physical receptor (hardware button) can be wired to a different downstream effector cascade by changing the receptor-signaling adapter | `indicative` |
| **Network traffic monitor** | LineageOS status bar extension | cytoplasm | **Metabolic flux readout** — a real-time display of ion current across the membrane, making the invisible visible at the cytoplasm surface | `indicative` |
| **LineageOS for microG** | `lineage.microg.org` build variant | endoplasmic-reticulum | **Separate organism phenotype** — not a modification of the standard cell but a distinct expressed phenotype with the molecular mimicry protein constitutively expressed (see §7.7) | `indicative` (project) · `speculative` (FP5) |
| **Build type variants** | `eng` / `userdebug` / `user` | nucleus | **Cell differentiation state** — the same genome expressed at different levels of regulatory constraint. `user` builds are terminally differentiated; `userdebug` retains stem-cell-like debugging plasticity | `verified` (AOSP mechanism; LineageOS inherits) |

---

## 8. FP5 Hardware Invariants

The following Fairphone 5 hardware components are **unchanged** by the OS choice between AOSP and LineageOS. Their Cell OS mappings carry directly into the LineageOS manifold.

| Component | Spec | Zone | Confidence |
|---|---|---|---|
| SoC | Qualcomm QCM6490 | Nucleus | `verified` |
| CPU | Kryo 670, prime core @ 2.71 GHz | Nucleus / Cytoskeleton | `verified` |
| NPU | Hexagon 770, 12 TOPS INT8 | Mitochondria | `verified` (indicative label) |
| GPU | Adreno 643 | Cytoskeleton | `verified` |
| RAM | LPDDR4x 8 GB @ 2133 MHz | Cytoplasm | `verified` |
| Storage | UFS 2.2 | Vacuole | `verified` |
| Display | 6.46" FHD+ 90Hz OLED | Cytoskeleton | `indicative` |
| Battery | 4200 mAh + Quick Charge 4+ | Mitochondria | `indicative` |
| Modem | 5G sub-6GHz (QCM6490 integrated) | Membrane | `indicative` |
| Wi-Fi | 802.11ax (Wi-Fi 6) | Membrane-receptors | `indicative` |
| Bluetooth | 5.2 | Membrane-receptors | `indicative` |
| NFC | ST54 NFC controller | Membrane-receptors | `indicative` |
| Fingerprint | Side-mounted (Goodix GW9558, likely) | Membrane-receptors | `unconfirmed` |
| Modular design | Fairphone hardware modularity | Membrane | `verified` |

---

## 9. Honest Gaps and Confidence Downgrades

This section documents where the LineageOS translation is weaker than the AOSP original, and why.

### 9.1 FP5 LineageOS Device Support Status — RESOLVED ✓
**Status**: FP5 IS officially supported by LineageOS.
**Primary source**: `wiki.lineageos.org/devices/FP5/` → HTTP 200; `_data/devices/FP5.yml` in `LineageOS/lineage_wiki` confirms:
- Maintainer: `mikeioannina` (active)
- Versions shipped: `[21, 22.1, 22.2, 23.0, 23.2]`
- Current branch: `lineage-23.2`
**Confidence impact**: The conditional downgrade from `indicative` → `speculative` (if unsupported) no longer applies. All LineageOS-specific claims in this document may use `indicative` as their floor, subject to their own individual source verification.

### 9.2 Kernel Branch — RESOLVED ✓
**Primary sources**:
- `FP5.yml` (`LineageOS/lineage_wiki`): `kernel: {repo: android_kernel_fairphone_qcm6490, version: '5.4'}` — definitive
- Branches confirmed: `lineage-21`, `lineage-22.0`, `lineage-22.1`, `lineage-22.2`, `lineage-23.0`, `lineage-23.1`, `lineage-23.2`
- FP5-specific kernel config fragments confirmed at `arch/arm64/configs/vendor/`: `fp5-qgki_defconfig`, `fp5.config`, `fp5_GKI.config`, `fp5_QGKI.config`, `fp5_debug.config`

**Confidence**: `verified` for repo identity, kernel version (5.4), and branch lineage. Specific patch claims within individual commits remain case-by-case and require per-commit source reads.
**Note**: `android_kernel_qcom_sm7325` (HTTP 404) has been removed from all document references.

### 9.3 Trust Interface HAL Depth — RESOLVED BY DEPRECATION
**Status**: The Trust Interface was a real LineageOS feature that has been removed/deprecated in LOS 20/21+. Its source repository (`android_packages_apps_Trust`) was deleted (HTTP 404). HAL depth cannot be evaluated because the feature no longer exists in current LOS builds.
**Impact**: Do not model Trust HAL as a current LineageOS component. Any prior Cell OS claim that references Trust Interface as a live LOS feature must be marked `deprecated-feature` and removed from current-build descriptions. See §9.12 for the full deprecation evidence.

### 9.4 Privacy Guard AppOps Integration Depth — PARTIALLY RESOLVED
**Finding**: GitHub code search for `privacyguard` in `LineageOS/android_frameworks_base` → **0 hits**. This strongly indicates Privacy Guard was removed or renamed in LOS 20/21+.
**Confidence split**:
- Per-app AppOps permission toggle (basic grant/revoke): `indicative` — AOSP's own AppOps framework provides this in Android 10+, and LOS inherits it.
- Fake-data injection (synthetic null mic / blank camera / null location): `unconfirmed` — the CyanogenMod-era Privacy Guard implementation that provided this is no longer detectable in source. May be absent in LOS 21+.
**Impact**: The competitive-antagonist receptor model (pharmacologically precise fake signal) depends on the fake-data injection path. This specific sub-claim remains `unconfirmed` until Privacy Guard's current implementation is located.

### 9.5 microG on FP5 Specifically — RESOLVED ✓
**Status**: Standard LineageOS FP5 builds do NOT include microG.
**Primary source**: `android_device_fairphone_FP5/device.mk` (lineage-21 branch) and `android_vendor_lineage` common makefiles — no microG packages found in either. `android_vendor_lineage` code search: 0 microG hits.
**Confidence**: `verified` for absence in checked build configs.
**Impact**: microG requires the separate "LineageOS for microG" build variant. All document references to microG must distinguish: standard LOS FP5 = no microG; LOS-for-microG = separate variant. The vacuole / endosome GmsCore proxy claim is `speculative` for standard FP5, `indicative` for LOS-for-microG.

### 9.6 Golgi Biophoton Links Remain Speculative
**Gap**: The existing AOSP Cell OS documentation already notes that Golgi UPE has zero direct measurements. The LineageOS translation does not change this fundamental biological gap. `ER→golgi` and `ribosomes→golgi` links remain `σ = 0.45 / speculative` regardless of OS.

### 9.7 LineageOS Updater Long-term Support Horizon — PARTIALLY RESOLVED
**Finding**: FP5 has an active maintainer (`mikeioannina`) with builds across versions 21–23.2 (2022–2024+). This confirms ongoing LineageOS support is real and active, not speculative.
**Remaining gap**: There is no community equivalent of Fairphone's explicit 8-year OEM support guarantee. LineageOS support duration depends on maintainer continuity. The Golgi's 8-year vesicle delivery guarantee from the AOSP coordinate does not carry over automatically.
**Confidence**: `indicative` for current and near-term LOS support on FP5; `speculative` for long-horizon (5+ year) support continuity.

### 9.8 Trust Interface Package Name — RESOLVED (Both Paths Wrong; Feature Deprecated)
**History**: The original document cited `packages/apps/Twelve` (LineageOS music player) as the Trust Interface source — that was wrong. The corrected path `android_packages_apps_Trust` also returns HTTP 404 — that repository was deleted.
**Resolution**: The deletion of `android_packages_apps_Trust` is itself evidence of feature removal. The full five-candidate source search (§9.12) found no Trust Interface in any current LOS repository. Trust Interface is **deprecated/removed in LOS 20/21+**, not merely missing from citations.
**Status**: No longer a citation gap — the feature does not exist in current builds. See §9.12 for full evidence.

### 9.9 Privacy Guard Legacy Status — PARTIALLY RESOLVED
**Finding**: GitHub code search for `privacyguard` in `LineageOS/android_frameworks_base` → **0 hits** (same finding as §9.4). Privacy Guard as a named subsystem is not detectable in current LOS source.
**Confidence split** (unchanged from §9.4):
- Per-app permission gating (grant/revoke): `indicative` — AOSP AppOps framework provides this in Android 10+; LOS inherits it.
- Synthetic null sensor injection (fake camera, null GPS, silent mic): `unconfirmed` — the CyanogenMod Privacy Guard implementation of this is not found in current LOS source.
**Confidence floor**: The receptor-level gating concept (biologically valid competitive antagonism at permission boundary) remains sound. Only the pharmacologically precise fake-signal delivery (synthetic data injection path) is `unconfirmed` in LOS 21+.

### 9.10 Root / su — Not Default — RESOLVED ✓
**Status**: Root / su is confirmed absent from standard LOS FP5 builds.
**Primary source**: `android_device_fairphone_FP5/device.mk` (lineage-21 branch) — no su, no root-granting packages found. `android_vendor_lineage` common makefiles — no root packages.
**Confidence**: `verified` for absence in standard FP5 build; opt-in (Magisk post-install) path is `indicative`.
**Correction**: The prior claim connecting root to Trust Interface monitoring is doubly invalid — Trust is deprecated (§9.12) and root is not default. The biological analogy (inducible nuclear import) remains valid; the specific implementation must be described as opt-in, not built-in.

### 9.11 WireGuard — RESOLVED ✓ (Primary Source Confirmed)
**Status**: WireGuard IS enabled in the FP5 LineageOS kernel.
**Primary source**: `arch/arm64/configs/gki_defconfig` in `LineageOS/android_kernel_fairphone_qcm6490` (branch `lineage-23.2`):
```
CONFIG_DUMMY=y
CONFIG_WIREGUARD=y
CONFIG_TUN=y
```
**Context**: FP5 kernel is 5.4 (QCM6490 / msm-5.4 base). WireGuard mainline entry is 5.6, so this confirms the backport patch is present in the FP5 LOS kernel build.
**Confidence**: `verified` for WireGuard presence in LOS 23.2 FP5 kernel. Scoped to `lineage-23.2`; earlier branches should be assumed `indicative` until their configs are read separately.
**Impact**: P6 biophoton pathway WireGuard claims can be elevated from `unconfirmed` to `verified` for LOS 23.2, `indicative` for LOS 21–22.x.

### 9.12 Trust Interface Source Location — RESOLVED: FEATURE DEPRECATED IN LOS 20/21+
**Status**: The five-candidate search plan has been fully executed. Trust Interface is not present in any current LineageOS repository — it was deprecated and removed.

**Evidence (all five candidates checked)**:
1. `LineageOS/android_lineage-sdk` (lineage-21 branch) — full git tree search: **0 Trust-related paths or strings** found. Resource strings XML has no `trust` entries.
2. `LineageOS/android_vendor_lineage` — code search: **0 Trust hits** across all files.
3. `LineageOS/android_packages_apps_Settings` (lineage-23.2 fork) — trust-path search found only standard Android `TrustAgent` / Smart Lock files (`trustagent/`, `TrustedCredentials*`). These are AOSP keyguard trust agents (SmartLock), not the LineageOS Trust Interface security dashboard — completely different feature.
4. `LineageOS/android_hardware_lineage_interfaces` — directory listing: `biometrics`, `camera`, `health`, `ir`, `light`, `livedisplay`, `power`, `radio`, `sensors`, `touch`, `usb`, `vibrator` — **no trust directory**.
5. GitHub repository search for "Trust" in LineageOS org: 3 repos found, none are Trust Interface.

**Definitive conclusion**: The deleted repository `android_packages_apps_Trust` (HTTP 404) is itself evidence of removal. The Trust Interface was a real feature in early LineageOS that has been removed/deprecated in LOS 20/21+.

**Impact on this document**:
- All Trust Interface claims must be marked `deprecated-feature` — not `unconfirmed`, not `indicative`. The feature does not exist in current LOS builds.
- This is **no longer a blocking gap**. It is a closed finding with a definitive answer: the feature was removed.
- Do not confuse Android's `TrustAgent` / SmartLock (AOSP feature, alive) with the LineageOS Trust Interface security dashboard (deprecated).

---

## 10. Acceptance Checklist

A complete LINEAGEOS_MANIFOLD.md entry must satisfy:

- [ ] All 15 organelles have a LineageOS-translated entry
- [ ] All 8 zones have a documented LineageOS mapping
- [ ] Every LineageOS-specific claim has a confidence tier and source reference or TODO
- [ ] Every AOSP-identical component is explicitly marked as invariant
- [ ] P1–P7 biophoton IPC pathways are confirmed or noted as endpoint-changed
- [ ] Spectral priority channels confirmed unchanged
- [ ] All 9 LineageOS-native additions have a biological analogy and confidence tag (§7.1–7.9)
- [ ] FP5 hardware invariants are preserved
- [ ] All 12 honest gaps are documented with resolution status (§9.1–9.12)
- [ ] No claim is marked `verified` without a primary source path that has been confirmed open
- [x] FP5 is officially supported — maintainer `mikeioannina`, versions 21–23.2 confirmed (§9.1)
- [x] Kernel tree is `android_kernel_fairphone_qcm6490` (HTTP 200 verified, confirmed in FP5.yml) (§9.2)
- [x] WireGuard: `CONFIG_WIREGUARD=y` confirmed in `gki_defconfig` (lineage-23.2) — P6 pathway elevated (§9.11)
- [x] Root/su entries are framed as opt-in, not default — confirmed absent from FP5 device config (§9.10)
- [x] microG entries distinguish "standard LineageOS" (no microG) from "LineageOS for microG" build variant (§9.5)
- [x] Trust Interface is deprecated/removed in LOS 20/21+ — do not cite as a current LOS feature (§9.12)
- [x] No claim uses `packages/apps/Twelve` for Trust Interface — that is the music player (§9.8)
- [ ] Trust Interface references in earlier sections are marked `deprecated-feature`, not `unconfirmed`
- [ ] Privacy Guard fake-data injection claims are marked `unconfirmed` — 0 `privacyguard` hits in current frameworks_base (§9.4, §9.9)
- [ ] SeedVault is NOT included by default in standard LOS FP5 — not in device.mk or vendor common makefiles
- [x] LiveDisplay claims distinguish LineageOS-wide capability from FP5 activation — FP5 LOS 21 has no LiveDisplay `PRODUCT_PACKAGES` or overlays despite SDM blob presence (§7.3)
- [ ] Updater entries do not claim "complete replacement" of update_engine — scope is OTA client UX + server endpoint (§7.4)
- [ ] All repo paths in Appendix A have been API-verified or explicitly flagged as unverified

---

## Appendix A: LineageOS Source Path Reference

| Component | LineageOS Repository |
|---|---|
| Framework base | `github.com/LineageOS/android_frameworks_base` |
| System core (init) | `github.com/LineageOS/android_system_core` |
| SELinux policy | `github.com/LineageOS/android_system_sepolicy` |
| Trust Interface | ❌ **SOURCE NOT FOUND** — `android_packages_apps_Trust` HTTP 404; `android_packages_apps_Twelve` is music player. Source location unresolved. See §9.12 for search plan. |
| Privacy Guard | Integrated in `android_frameworks_base` (permission hooks; fake-data injection status `unconfirmed`) |
| LiveDisplay HAL | `github.com/LineageOS/android_hardware_lineage_livedisplay` |
| Trebuchet | `github.com/LineageOS/android_packages_apps_Trebuchet` |
| LineageOS Updater | `github.com/LineageOS/android_packages_apps_Updater` |
| Recovery | `github.com/LineageOS/android_bootable_recovery` |
| Lineage interfaces | `github.com/LineageOS/android_hardware_lineage_interfaces` |
| SeedVault | `github.com/seedvault-app/seedvault` |
| microG (external) | `github.com/microg/GmsCore` |
| FP5 kernel ✓ | `github.com/LineageOS/android_kernel_fairphone_qcm6490` HTTP 200 verified |
| FP5 device tree ✓ | `github.com/LineageOS/android_device_fairphone_FP5` HTTP 200 verified |
| Fairphone kernel mirror ✓ | `github.com/fairphone-mirror/kernel_msm-5.4` HTTP 200 verified |
| Manifest | `github.com/LineageOS/android` |
| Device wiki | `wiki.lineageos.org` |

---

## Appendix B: Citation TODOs

The following claims require primary source verification before being elevated to `verified`:

| Claim | Verification action | Status |
|---|---|---|
| FP5 official LineageOS support | `wiki.lineageos.org/devices/FP5/` HTTP 200; FP5.yml: maintainer `mikeioannina`, versions `[21, 22.1, 22.2, 23.0, 23.2]`, branch `lineage-23.2` | ✓ RESOLVED — officially supported |
| FP5 kernel repo identity | FP5.yml: `kernel: {repo: android_kernel_fairphone_qcm6490, version: '5.4'}`; branches lineage-21 → lineage-23.2 confirmed | ✓ RESOLVED — repo, version, branches all verified |
| FP5 device tree | `github.com/LineageOS/android_device_fairphone_FP5` ✓ HTTP 200; listed in FP5.yml | ✓ confirmed real |
| Fairphone kernel mirror | `github.com/fairphone-mirror/kernel_msm-5.4` ✓ HTTP 200 | ✓ confirmed real |
| WireGuard in FP5 kernel | `arch/arm64/configs/gki_defconfig` (lineage-23.2): `CONFIG_WIREGUARD=y` — primary source read | ✓ RESOLVED — enabled; P6 elevated to `verified` |
| Trust Interface source location | All 5 candidates checked: lineage-sdk (0 paths), vendor_lineage (0 hits), Settings (AOSP TrustAgent only), hardware_interfaces (no trust dir), repo search (no match) | ✓ RESOLVED — feature DEPRECATED/REMOVED in LOS 20/21+ |
| Privacy Guard fake data injection (current builds) | `android_frameworks_base` code search for `privacyguard` → 0 hits; feature removed/renamed | ⚠️ PARTIAL — injection path unconfirmed; AppOps toggle indicative |
| Privacy Guard legacy vs current | 0 `privacyguard` hits in frameworks_base; CyanogenMod fake-data injection not detectable in LOS 21+ source | ⚠️ PARTIAL — legacy injection unconfirmed in current builds |
| LiveDisplay FP5 HAL backend | `android_hardware_lineage_livedisplay` (lineage-21.0) has generic backends: `sdm`, `legacymm`, `sysfs` — no FP5/QCM6490-specific backend. FP5 `device.mk` has 0 LiveDisplay packages or overlays; `lineage.dependencies` adds no LiveDisplay repo. FP5 proprietary blobs do include `libsdm-disp-vndapis.so` (the SDM backend's required library), but enablement and functional validation are absent. No other QCM6490 device (Motorola Dubai, OnePlus u4t) uses LiveDisplay on lineage-21 either. | ✓ RESOLVED — **not active** in standard LOS 21 FP5 build; generic SDM prerequisite blob present but LiveDisplay is not enabled or configured |
| Root/su availability on FP5 builds | `device.mk` (lineage-21): no su/root packages; vendor common makefiles: no root packages | ✓ RESOLVED — not default; opt-in via Magisk |
| SeedVault default inclusion | `android_vendor_lineage` common_full_phone.mk and common_mobile_full.mk: 0 SeedVault references; device.mk: no SeedVault | ✓ RESOLVED — not included by default in standard LOS FP5 |
| microG signature spoofing on FP5 builds | device.mk (lineage-21): no microG packages; vendor_lineage: 0 microG hits | ✓ RESOLVED — not included; requires separate LOS-for-microG variant |
