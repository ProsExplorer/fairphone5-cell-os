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
| LineageOS kernel (msm-5.4 base) | `github.com/LineageOS/android_kernel_qcom_sm7325` (closest to FP5 / QCM6490 family) |
| LineageOS framework patches | `github.com/LineageOS/android_frameworks_base` |
| LineageOS packages | `github.com/LineageOS/android_packages_apps_*` |
| Fairphone kernel tree | `github.com/fairphone/kernel_fairphone_5` |
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
| **Kernel tree** | `kernel/msm-5.4` (AOSP / CAF) | `android_kernel_qcom_sm7325` (closest LineageOS tree) + FP5-specific `kernel/fairphone_5` patches |
| **Kernel additions** | Standard CAF patches | LineageOS kernel patches: WireGuard built-in (`net/wireguard/`), additional security hardening, `schedutil` governor improvements, `eBPF` extensions for privacy accounting |
| **Boot verification** | Android Verified Boot 2.0 (AVB2) | LineageOS supports AVB2; ships with AVB enforcing on many devices. FP5 support: `indicative` |
| **Confidence** | `verified` (kernel; AOSP primary source) | `indicative` (LineageOS-specific kernel patches; branch/device path requires verification) |

**LineageOS biological refinement**: The LineageOS kernel adds WireGuard natively (a modern DNA repair enzyme — patching cryptographic vulnerabilities at the kernel level). The `init.lineage.rc` overlay is like an epigenetic mark on the base genome — it activates Lineage-specific gene expression without replacing the foundational sequence.

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
| **Trust Interface** | ❌ Not present | `packages/apps/Twelve` / LineageParts Trust HAL — adds a unified security posture API that reads SELinux status, USB debug state, root state, key attestation. This is an **additional nuclear pore** — a new channel type through which security signals pass |
| **Confidence** | `verified` | `verified` (inherited) · `indicative` (Trust Interface source path needs branch verification) |

**LineageOS biological refinement**: The Trust Interface is a new class of nuclear pore — a dedicated security signal channel that did not exist in the AOSP nucleus. In cell biology, nuclear pores have specificity: not all molecules can pass. The Trust Interface adds a **meta-pore** that audits the state of the other pores in real time.

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
| **LiveDisplay** | ❌ Not present in AOSP | **LineageOS-exclusive**: `hardware/lineage/livedisplay/` + `frameworks/base` display hooks. Provides hardware-accelerated color profiles, adaptive colour temperature, reading mode, outdoor mode. Runs at the display HAL layer — it is a **motor protein operating on the cytoskeletal microtubules**: it changes the properties of the track that frames travel along, not the frames themselves |
| **Adreno 643 GPU** | Executes SurfaceFlinger passes | **Identical** (hardware-invariant) |
| **Display: 6.46" FHD+ 90Hz OLED** | HWC2 delivers 90Hz | **Identical** + LiveDisplay color processing |
| **Confidence** | `verified` (SurfaceFlinger) | `verified` (inherited) · `indicative` (LiveDisplay; source path confirmed at org level; device-specific HAL support requires FP5 branch verification) |

**LineageOS biological refinement**: LiveDisplay is the most significant cytoskeletal addition. In cell biology, microtubule-associated proteins (MAPs) modulate how motor proteins move along microtubules — they do not change the track but alter its functional properties. LiveDisplay is a MAP for the display pipeline: it modulates the rendering track's chromatic properties without replacing SurfaceFlinger.

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
| **OTA delivery** | `system/update_engine/` (A/B update engine, Google-hosted OTA) | **LineageOS Updater**: `packages/apps/Updater` — LineageOS-hosted OTA server, delta package download, scheduled/background update checks. This is a **complete Golgi sorting-and-dispatch replacement**: the address label on every package now points to LineageOS servers, not Google's |
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
| **microG compatibility** | ❌ Not present in AOSP | **LineageOS supports microG** (`github.com/microg/GmsCore`) — an open-source implementation of Google Play Services. microG stubs the GMS API surface, allowing apps that depend on Google Play Services to function without Google. **Biological analogy**: molecular mimicry — the microG receptor analog binds the same ligand site as the GMS receptor, triggering the same downstream cascade from a different molecular origin. It occupies the ER lumen without the Google glycoprotein signature |
| **Ion alloc / DMA-buf** | `drivers/staging/android/ion/` | **Identical** (kernel-level; inherited) |
| **Confidence** | `verified` (NNAPI, AIDL) | `verified` (inherited) · `speculative` (microG integration depth on FP5 specifically; depends on whether official Lineage FP5 build ships microG by default or as a separate variant) |

**LineageOS biological refinement**: microG is the single most structurally interesting addition in the ER zone. In cell biology, molecular mimics — viral proteins that resemble host ligands — bind host receptors and hijack downstream signaling. microG is a beneficial mimic: it presents the GMS surface to apps, triggering correct downstream behavior, while routing all actual computation through open-source implementations. The ER folds this mimic protein into the secretory pathway exactly as it would fold the original.

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
| **netfilter / iptables** | `kernel/net/netfilter/` | **Identical** + LineageOS ships WireGuard natively in kernel (P2P VPN tunnel as a dedicated membrane channel — an ion channel with cryptographic selectivity) |
| **eBPF networking** | `kernel/net/core/filter.c` | **Identical** + LineageOS kernel eBPF extensions for enhanced privacy accounting |
| **Android permission model** | `frameworks/base/.../pm/permission/` | **Inherited** + Privacy Guard augmentation (see membrane-receptors below) |
| **Biometric HAL** | `hardware/interfaces/biometrics/` | **Identical** |
| **Trust Interface** | ❌ AOSP has no equivalent | **LineageOS-exclusive**: `packages/apps/Twelve` + `lineageos/trust` HAL — a unified security posture dashboard. Displays: SELinux enforcement status, USB debugging status, root access status, keys & certificate status. **Biological analogy**: the Trust Interface is the cell's gap junction complex — it does not directly filter molecules, but continuously monitors the state of the membrane's other channels, alerting the nucleus when a boundary violation is detected |
| **Confidence** | `verified` (SELinux, netfilter) | `verified` (inherited) · `indicative` (Trust Interface; package name confirmed, HAL depth requires source verification) |

---

##### Organelle: `membrane-receptors` — Sensor / Permission / Interrupt Handling

| | AOSP | LineageOS |
|---|---|---|
| **Android permission model** | `packages/apps/PermissionController/` | **Identical** base |
| **Privacy dashboard (Android 12+)** | `packages/apps/PermissionController/` | **Inherited** |
| **Privacy Guard** | ❌ AOSP equivalent is limited; Android 12 Privacy Dashboard is read-only | **LineageOS-exclusive**: Privacy Guard is integrated into `AppOpsManager` (`frameworks/base`, LineageOS fork). Provides **per-app, per-permission toggles with fake data injection** — camera returns blank frames, location returns null, microphone returns silence. **Biological analogy**: Privacy Guard is a **receptor decoy** mechanism — it allows the ligand (the app's API call) to bind the receptor, but injects a synthetic response instead of the real signal. The cell controls information leakage at the receptor level, not just at the membrane level |
| **Sensors / ISR** | Hardware interrupt → kernel driver → sensor HAL | **Identical** (hardware-invariant) |
| **Connectivity (5G, Wi-Fi 6, BT 5.2)** | QCM6490 integrated modem + QCA6391 | **Identical** (hardware-invariant) |
| **Confidence** | `verified` (sensors, connectivity) | `indicative` (Privacy Guard; well-documented LineageOS feature; source path in `android_frameworks_base` requires branch confirmation) |

**LineageOS biological refinement**: Privacy Guard is the most biologically precise addition in the entire LineageOS manifold. The receptor decoy mechanism — allowing ligand binding while controlling the effector response — is a well-established cellular signaling control. In pharmacology this is called **competitive antagonism with partial agonist activity**. Privacy Guard implements this at the OS permission layer.

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
| **P6** | Cell-membrane → Nucleus (retrograde IRQ) | 0.60 / indicative | `hardirq` → IRQ thread → syscall → kernel supervisor | WireGuard (LineageOS kernel) adds a new channel type: cryptographic IRQ → WireGuard kernel module → tunnel send. Same topology, new membrane channel |
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

### 7.1 Trust Interface → **Gap Junction Complex / Immune Sentinel**

**Source**: `packages/apps/Twelve` + `lineageos/trust` HAL (LineageOS framework)
**Zone**: membrane (membrane zone — security boundary layer)

**Biological analogy**: The Trust Interface is the cell's **gap junction complex combined with an immune sentinel**. Gap junctions are specialised membrane channels that connect adjacent cells and allow them to monitor each other's internal state. The Trust Interface monitors the state of all security-relevant channels simultaneously — SELinux enforcement, USB debugging, root status, cryptographic key health — and reports any deviation. It is the membrane watching itself.

**P→A→E**:
- P: System state sampled (SELinux status, USB debug, root mode, key attestation)
- A: Trust HAL evaluates against policy (healthy / degraded / violated)
- E: Trust badge displayed; nucleus alerted if posture changes

**Confidence**: `indicative` — Trust Interface is a well-documented and actively maintained LineageOS feature; exact HAL source path requires branch-level verification for FP5.

---

### 7.2 Privacy Guard → **Receptor Decoy / Competitive Antagonist**

**Source**: `AppOpsManager` extensions in `github.com/LineageOS/android_frameworks_base`
**Zone**: membrane-receptors

**Biological analogy**: Privacy Guard implements **competitive antagonism with synthetic effector**: the app's API call (ligand) is permitted to bind the permission receptor, but the effector response is replaced with a synthetic signal (blank camera frame, null location, silent microphone). The cell controls downstream information leakage at the receptor level without blocking the binding event itself.

**P→A→E**:
- P: App requests permission-gated data (camera, mic, location, contacts)
- A: Privacy Guard evaluates per-app toggle; if restricted, generates synthetic data
- E: Real data withheld; synthetic data returned to app; app function preserved

**Confidence**: `indicative`

---

### 7.3 LiveDisplay → **Chromatic Adaptation / Photoreceptor Tuning**

**Source**: `hardware/lineage/livedisplay/`, display hooks in LineageOS `frameworks/base`
**Zone**: cytoskeleton

**Biological analogy**: LiveDisplay implements **chromatic adaptation** — the cellular process by which photoreceptors adjust their sensitivity curves in response to ambient light conditions. At night, the retina shifts toward rod-dominant (low-energy, low-colour) processing; in bright daylight it shifts toward cone-dominant (high-energy, colour-precise) processing. LiveDisplay performs the equivalent shift for the display pipeline: reading mode reduces blue-band emission (protecting the melatonin cycle); outdoor mode increases overall luminance for readability; colour profiles tune the spectral output for the user's environment.

**Confidence**: `indicative`

---

### 7.4 LineageOS Updater → **Directed Vesicle Transport / Exocytosis**

**Source**: `packages/apps/Updater`
**Zone**: golgi-apparatus

**Biological analogy**: The LineageOS Updater is **clathrin-independent directed vesicle transport**. In the AOSP cell, OTA vesicles are addressed by Google's sorting machinery. In the LineageOS cell, the Golgi re-addresses the same vesicle structure to LineageOS servers — a **trans-Golgi network route change** that does not alter the vesicle's lipid bilayer or cargo loading mechanism, only its destination address label.

**Confidence**: `verified` — LineageOS Updater source is confirmed and well-documented.

---

### 7.5 Root / su Management → **Hormone Receptor Nuclear Access**

**Source**: `system/extras/su` (LineageOS fork), `adbd` root mode
**Zone**: nucleus (privileged access above standard kernel grant)

**Biological analogy**: Root access in LineageOS is **steroid hormone receptor nuclear import**. Steroid hormones (cortisol, testosterone, estrogen) are lipophilic — they cross the plasma membrane without receptor binding, enter the cytoplasm, bind their nuclear receptor, and import directly into the nucleus to act as transcription factors. Root/su is precisely this: it bypasses the standard syscall receptor (the Linux permission model) and imports directly into the nucleus (kernel space) to act as a transcription factor for arbitrary system state.

LineageOS makes root optional and auditable via the Trust Interface (the Trust badge changes when root is active — the hormone has entered the nucleus, and the gap junction is reporting it). This is **hormonally regulated but Trust-monitored nuclear import**.

**Confidence**: `indicative` — root management is well-documented; Trust integration specifics require source verification.

---

### 7.6 LineageOS Recovery → **Selective Autophagy / Mitophagy**

**Source**: `github.com/LineageOS/android_bootable_recovery`
**Zone**: lysosomes

**Biological analogy**: LineageOS Recovery is **macroautophagy** — the cellular process of engulfing an entire organelle or cytoplasmic region in a double-membrane autophagosome and fusing it with a lysosome for degradation and recycling. Recovery mode tears down the entire running system (the autophagosome engulfs the cytoplasm) and allows a new system image to be delivered via sideload (the lysosome delivers recycled building blocks). TWRP is a more targeted **mitophagy** — it can selectively wipe specific partitions while preserving others.

**Confidence**: `indicative`

---

### 7.7 microG Compatibility → **Molecular Mimicry**

**Source**: `github.com/microg/GmsCore` (third-party; supported by LineageOS with signature spoofing patch)
**Zone**: endoplasmic-reticulum

**Biological analogy**: microG implements **molecular mimicry** — the strategy by which a molecule presents the binding epitope of another molecule to engage a receptor while routing the downstream cascade through a different biochemical pathway. microG presents the GMS API surface (the GMS epitope) to Android apps (the receptor), triggering the same binding event, while routing all actual computation through open-source implementations. The ER folds this mimic protein — it cannot tell the difference at the folding stage.

**Confidence**: `speculative` for automatic microG inclusion — LineageOS ships without Google apps by default; microG integration requires either a dedicated microG LineageOS build or manual installation. The confidence is `speculative` on the FP5 specifically because whether official LineageOS builds for FP5 include signature spoofing (required for microG) depends on the device maintainer's build configuration.

---

### 7.8 Trebuchet Launcher → **Cilia / Flagellum — Expression Interface**

**Source**: `packages/apps/Trebuchet`
**Zone**: golgi-apparatus (expression surface)

**Biological analogy**: Trebuchet is the cell's **cilia array** — the external expression interface through which the cell presents itself to the environment. Cilia are not internal organelles; they are extensions that project outward from the membrane. Trebuchet is the outermost expression surface of the LineageOS cell: it is the delivered cargo that the Golgi dispatched to the membrane, now visible to the user as the home screen.

**Confidence**: `verified` — Trebuchet is a core LineageOS package.

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

### 9.1 FP5 LineageOS Device Support Status
**Gap**: Whether LineageOS officially supports the Fairphone 5 (with an active device maintainer publishing builds to the LineageOS download server) requires verification against `wiki.lineageos.org/devices/`. If FP5 is not an officially supported device, all LineageOS-specific claims are downgraded from `indicative` to `speculative`.
**Action required**: Check `wiki.lineageos.org/devices/FP5/` before setting any LineageOS-specific confidence above `speculative`.

### 9.2 Kernel Branch Specificity
**Gap**: The exact LineageOS kernel branch for QCM6490 / FP5 has not been verified in this document. The `android_kernel_qcom_sm7325` reference is the closest publicly known tree; the FP5-specific kernel may be a different branch or maintained separately by Fairphone.
**Confidence floor**: All LineageOS kernel patch claims are `indicative` until the exact branch is confirmed.

### 9.3 Trust Interface HAL Depth
**Gap**: The Trust HAL interface (`lineageos/trust`) is documented at the package level but the HAL implementation depth — specifically which security posture signals are polled and at what frequency — requires source-level verification.
**Confidence**: `indicative` (not `verified`).

### 9.4 Privacy Guard AppOps Integration Depth
**Gap**: Privacy Guard's integration into `AppOpsManager` has evolved across LineageOS versions. The fake data injection capability (synthetic camera/mic/location) may not be available in all builds. This is `indicative` not `verified`.

### 9.5 microG on FP5 Specifically
**Gap**: Whether official LineageOS FP5 builds include the signature spoofing patch required for microG is device-maintainer-dependent. Without signature spoofing, microG cannot be installed transparently. This gap downgrades microG from `indicative` to `speculative` for FP5 specifically.

### 9.6 Golgi Biophoton Links Remain Speculative
**Gap**: The existing AOSP Cell OS documentation already notes that Golgi UPE has zero direct measurements. The LineageOS translation does not change this fundamental biological gap. `ER→golgi` and `ribosomes→golgi` links remain `σ = 0.45 / speculative` regardless of OS.

### 9.7 LineageOS Updater Long-term Support Horizon
**Gap**: Fairphone's 8-year software support commitment applies to Fairphone-published Android builds. LineageOS support duration depends on community maintainers — historically more variable. The Golgi's 8-year vesicle delivery guarantee does not automatically carry over to the LineageOS coordinate system.

---

## 10. Acceptance Checklist

A complete LINEAGEOS_MANIFOLD.md entry must satisfy:

- [ ] All 15 organelles have a LineageOS-translated entry
- [ ] All 8 zones have a documented LineageOS mapping
- [ ] Every LineageOS-specific claim has a confidence tier and source reference or TODO
- [ ] Every AOSP-identical component is explicitly marked as invariant
- [ ] P1–P7 biophoton IPC pathways are confirmed or noted as endpoint-changed
- [ ] Spectral priority channels confirmed unchanged
- [ ] All 8 LineageOS-native additions have a biological analogy and confidence tag
- [ ] FP5 hardware invariants are preserved
- [ ] All 7 honest gaps are documented with confidence downgrade instructions
- [ ] No claim is marked `verified` without a primary source path that has been confirmed open

---

## Appendix A: LineageOS Source Path Reference

| Component | LineageOS Repository |
|---|---|
| Framework base | `github.com/LineageOS/android_frameworks_base` |
| System core (init) | `github.com/LineageOS/android_system_core` |
| SELinux policy | `github.com/LineageOS/android_system_sepolicy` |
| Trust Interface | `github.com/LineageOS/android_packages_apps_Twelve` |
| Privacy Guard | Integrated in `android_frameworks_base` |
| LiveDisplay HAL | `github.com/LineageOS/android_hardware_lineage_livedisplay` |
| Trebuchet | `github.com/LineageOS/android_packages_apps_Trebuchet` |
| LineageOS Updater | `github.com/LineageOS/android_packages_apps_Updater` |
| Recovery | `github.com/LineageOS/android_bootable_recovery` |
| Lineage interfaces | `github.com/LineageOS/android_hardware_lineage_interfaces` |
| SeedVault | `github.com/seedvault-app/seedvault` |
| microG (external) | `github.com/microg/GmsCore` |
| Kernel (QCM6490 family) | `github.com/LineageOS/android_kernel_qcom_sm7325` |
| Manifest | `github.com/LineageOS/android` |
| Device wiki | `wiki.lineageos.org` |

---

## Appendix B: Citation TODOs

The following claims require primary source verification before being elevated to `verified`:

| Claim | Verification action |
|---|---|
| FP5 official LineageOS support | Check `wiki.lineageos.org/devices/FP5/` |
| Exact FP5 kernel branch | Check `github.com/LineageOS` for FP5-specific kernel |
| Trust Interface HAL polling mechanism | Read `android_packages_apps_Twelve` source |
| Privacy Guard fake data injection | Read LineageOS `android_frameworks_base` AppOps fork |
| LiveDisplay FP5 HAL backend | Check `android_hardware_lineage_livedisplay` for QCM6490 |
| Root/su availability on FP5 builds | Check LineageOS FP5 device config and Trust integration |
| SeedVault default inclusion | Check FP5 LineageOS device makefile |
| microG signature spoofing on FP5 builds | Check device `*.mk` config for `LineageOS/GmsCore` or `PRODUCT_PACKAGES` |
