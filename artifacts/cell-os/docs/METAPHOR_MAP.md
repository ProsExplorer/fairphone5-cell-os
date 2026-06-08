# Cell OS — Biological Metaphor → Technical Mapping Guide

> **Audience**: developers extending zone panels, verifying content accuracy, or adding new Android/FP5 grounding.  
> **Last updated**: June 2026

This document is the authoritative mapping between each biological structure and its Android/Fairphone 5 technical counterpart. For each zone it lists: the biological meaning, the current OS metaphor, the **target** Android internals that should eventually be documented in the panel, and the Fairphone 5 hardware that corresponds.

---

## Reading this guide

Each zone section has four parts:

- **Biology**: what the organelle actually does in a cell (source: standard cell biology)
- **OS metaphor** (current): what the app currently claims it maps to
- **Android internals target**: real AOSP/kernel components that *should* be documented in this zone's panel — these are the grounding targets for future content work
- **FP5 hardware target**: the actual Fairphone 5 hardware relevant to this zone

**Status labels**:
- ✅ Documented with real technical content
- 🔶 Partially documented — analogy exists, technical detail shallow
- ❌ Not yet documented with real technical content

---

## Zone 1: Nucleus — `"nucleus"`
**Glyph**: 核 · **Color**: `#22d3ee` (cyan)

### Biology
The nucleus is the cell's control centre. It houses the genome (DNA), orchestrates gene expression via RNA transcription, and manages cell division. The nuclear envelope with pore complexes strictly controls what enters and exits.

### OS metaphor (current)
Kernel / Control Center — the root of device authority; holds system code and identity.

### Android internals target

| Component | AOSP path | Status |
|---|---|---|
| Linux kernel PID 1 / `init` | `system/core/init/init.cpp` | 🔶 Mentioned |
| Zygote — the process-forking daemon (`preloadClasses()`, `forkAndSpecialize()`) | `frameworks/base/core/java/com/android/internal/os/ZygoteInit.java` | ❌ |
| SELinux policy compilation | `system/sepolicy/` | ❌ |
| Kernel namespace isolation | kernel `unshare(2)`, cgroup hierarchy | ❌ |
| `init.rc` declarative service graph | `system/core/rootdir/init.rc` | ❌ |
| Secure boot chain (ABL → abl → kernel) | Qualcomm ABL, `bootloader/edk2/` | ❌ |

### FP5 hardware target

| Component | Detail | Status |
|---|---|---|
| QCM6490 SoC — prime core arbitration | Kryo 670 prime core @ 2.71 GHz governs scheduling | ✅ |
| TrustZone (TEE) | Qualcomm Trusted Execution Environment — secure world isolation | ❌ |
| ARMv8-A EL2 / EL3 privilege levels | Hardware privilege ring enforced by ARM architecture | ❌ |

---

## Zone 2: Cytoplasm — `"cytoplasm"`
**Glyph**: 漿 · **Color**: `#34d399` (green)

### Biology
The cytoplasm is the gel-like medium filling the cell. Organelles are suspended and transported within it via cytoskeletal motor proteins. It is the working environment where most cellular biochemistry occurs.

### OS metaphor (current)
Runtime / Explorer — the Binder IPC bus and active process space; the medium through which everything communicates.

### Android internals target

| Component | AOSP path | Status |
|---|---|---|
| Binder IPC driver | `drivers/android/binder.c` | 🔶 BBinder::transact cited |
| Binder transaction buffer limits (1 MB) | `drivers/android/binder.c` `BC_TRANSACTION` | ❌ |
| AIDL interface compiler | `system/tools/aidl/` | ❌ |
| HIDL (legacy vendor HAL bridge) | `system/libhidl/` | ❌ |
| ServiceManager registry | `frameworks/native/cmds/servicemanager/` | ❌ |
| `/proc/binder/` diagnostics | Runtime binder stats | ❌ |

### FP5 hardware target

| Component | Detail | Status |
|---|---|---|
| LPDDR4x 8 GB @ 2133 MHz | Shared memory bus; the physical cytoplasm | ✅ |
| SoC memory bus bandwidth | QCM6490 unified memory architecture | 🔶 |

---

## Zone 3: Cytoskeleton — `"cytoskeleton"`
**Glyph**: 骨 · **Color**: `#818cf8` (indigo)

### Biology
The cytoskeleton is the cell's structural scaffolding — a dynamic network of actin filaments, microtubules, and intermediate filaments. It maintains cell shape, enables movement, and acts as tracks for motor-protein cargo transport.

### OS metaphor (current)
AI Substrate Lattice — the structural rendering and scheduling framework.

### Android internals target

| Component | AOSP path | Status |
|---|---|---|
| SurfaceFlinger — compositing engine | `frameworks/native/services/surfaceflinger/` | ❌ |
| Choreographer — VSYNC gating | `frameworks/base/core/java/android/view/Choreographer.java` | ❌ |
| HWC2 (Hardware Composer) interface | `hardware/interfaces/graphics/composer/2.1/` | ❌ |
| `select_task_rq` — task scheduling | `kernel/sched/core.c` | 🔶 Cited |
| RenderThread | `frameworks/base/libs/hwui/renderthread/` | ❌ |
| Display HAL pipeline | Qualcomm DRM/KMS driver | ❌ |

### FP5 hardware target

| Component | Detail | Status |
|---|---|---|
| Adreno 643 GPU | Executes SurfaceFlinger composition passes | ✅ |
| Display: 6.46" FHD+ 90Hz OLED | HWC2 delivers frames at 90Hz via DSI | ❌ |
| DSI (Display Serial Interface) | Snapdragon display pipeline to panel | ❌ |

---

## Zone 4: Ribosomes — `"ribosomes"`
**Glyph**: 糖 · **Color**: `#a3e635` (lime)

### Biology
Ribosomes are the molecular machines that synthesise proteins. Free ribosomes float in the cytoplasm; membrane-bound ones associate with the rough ER. They translate mRNA sequences into amino acid chains at remarkable speed and fidelity.

### OS metaphor (current)
Pattern Translation — the ART runtime that translates bytecode into running processes.

### Android internals target

| Component | AOSP path | Status |
|---|---|---|
| ART (Android Runtime) | `art/runtime/` | 🔶 NNAPI op cited; ART itself not |
| dex2oat — AOT compilation | `art/dex2oat/` | ❌ |
| JIT (Just-in-Time) compiler | `art/compiler/jit/` | ❌ |
| Profile-guided compilation (PGO) | `art/profman/` | ❌ |
| Zygote class preloading | `frameworks/base/core/java/com/android/internal/os/ZygoteInit.preloadClasses()` | 🔶 Cited |
| `.dex` / `.odex` / `.art` file formats | Dalvik executable on-disk format | ❌ |

### FP5 hardware target

| Component | Detail | Status |
|---|---|---|
| Kryo 670 CPU — JIT execution | Prime + performance cores execute JIT-compiled traces | 🔶 |
| Hexagon 770 HVX | SIMD vector extension — parallel pattern matching | ❌ |
| L1/L2/L3 cache hierarchy | Instruction cache critical for tight translation loops | ❌ |

---

## Zone 5: Mitochondria — `"mitochondria"`
**Glyph**: 粒 · **Color**: `#fb923c` (orange)

### Biology
Mitochondria generate ATP through oxidative phosphorylation (the electron transport chain + ATP synthase). They also regulate apoptosis, calcium buffering, and reactive oxygen species. They have their own DNA and divide independently.

### OS metaphor (current)
EdgeNode / The Proof — on-device AI inference; the energy-efficient compute engine.

### Android internals target

| Component | AOSP path | Status |
|---|---|---|
| Power HAL | `hardware/interfaces/power/1.3/` | ❌ |
| `cpufreq` governor (`schedutil`, `interactive`) | `kernel/drivers/cpufreq/` | ❌ |
| Thermal HAL + throttling | `hardware/interfaces/thermal/2.0/` | ❌ |
| PowerManager wake locks | `frameworks/base/core/java/android/os/PowerManager.java` | ❌ |
| Hexagon DSP offload path | Qualcomm QNN SDK → FastRPC bridge | 🔶 Cited |
| `perflock` / `schedboost` | Qualcomm-specific performance lock extensions | ❌ |

### FP5 hardware target

| Component | Detail | Status |
|---|---|---|
| Hexagon 770 NPU — 12 TOPS INT8 | Primary inference engine (verified indicative) | ✅ |
| Qualcomm Quick Charge 4+ | PMIC-controlled USB-PD charging | ❌ |
| 4200 mAh battery | Physical energy reservoir | ❌ |
| PMIC (Power Management IC) | Per-rail voltage control for SoC islands | ❌ |
| llama.cpp QNN backend | On-device LLM quantised inference | ✅ |

---

## Zone 6: Golgi Apparatus — `"golgi"`
**Glyph**: 高 · **Color**: `#c084fc` (purple)

### Biology
The Golgi apparatus is the cell's post office. It receives proteins from the ER, processes them (glycosylation, sorting, packaging), and dispatches them via vesicles to their correct destinations — the plasma membrane, lysosomes, or secretion.

### OS metaphor (current)
OS Genome Sorting — notification dispatch, OTA packaging, and intent routing.

### Android internals target

| Component | AOSP path | Status |
|---|---|---|
| NotificationManagerService | `frameworks/base/services/core/java/com/android/server/notification/` | ❌ |
| Intent dispatch — `ActivityManagerService` | `frameworks/base/services/core/java/com/android/server/am/` | ❌ |
| `ContentProvider` URI routing | `frameworks/base/core/java/android/content/ContentProvider.java` | ❌ |
| Ordered broadcasts | `BroadcastRecord` dispatch queue | ❌ |
| PackageManager install pipeline | `frameworks/base/services/core/java/com/android/server/pm/` | ❌ |
| OTA update pipeline (update_engine) | `system/update_engine/` | ❌ |
| `ZygoteInit.preloadClasses()` | Pre-loads classes at boot for fast dispatch | 🔶 Cited |

### FP5 hardware target

| Component | Detail | Status |
|---|---|---|
| 8-year software support | Fairphone OTA delivery commitment | 🔶 |
| UFS 2.2 storage — write pipeline | Package installation writes to UFS | ❌ |

---

## Zone 7: Endoplasmic Reticulum — `"endoplasmic-reticulum"`
**Glyph**: 網 · **Color**: `#f472b6` (pink)

### Biology
The ER is a vast membrane network. The **rough ER** (studded with ribosomes) folds and modifies new proteins. The **smooth ER** synthesises lipids and detoxifies compounds. Proteins enter the secretory pathway here — a one-way route toward the Golgi and beyond.

### OS metaphor (current)
Deep Lineage / Memory — the AI inference network; the framework fabric connecting compute engines.

### Android internals target

| Component | AOSP path | Status |
|---|---|---|
| NNAPI (`ANeuralNetworks*`) | `frameworks/ml/nn/runtime/include/NeuralNetworks.h` | 🔶 Cited |
| NNAPI operation set (ops coverage) | 120+ ops: `frameworks/ml/nn/runtime/Operations.cpp` | ❌ |
| QNN (Qualcomm Neural Network) SDK | QNN delegate path → Hexagon HTP | ❌ |
| TFLite NNAPI delegate | `external/tensorflow/tensorflow/lite/delegates/nnapi/` (AOSP external tree) | ❌ |
| Hexagon HTP (High-performance Tensor Processor) | Sub-unit of Hexagon 770 | ❌ |
| `ion_alloc` / DMA-buf memory | Shared memory between CPU and DSP | 🔶 ion_alloc cited (legacy) |
| NN HAL `IDevice.hal` | `hardware/interfaces/neuralnetworks/` | 🔶 Cited |

### FP5 hardware target

| Component | Detail | Status |
|---|---|---|
| Hexagon 770 HVX + HMX | Vector + matrix accelerators within Hexagon | ❌ |
| Hexagon tensor slices | Four parallel compute slices in HTP | ❌ |
| Shared LPDDR4x bandwidth | ER as the memory pipeline connecting all compute | 🔶 |

---

## Zone 8: Cell Membrane — `"membrane"`
**Glyph**: 膜 · **Color**: `#7dd3fc` (blue)

### Biology
The plasma membrane is the cell's selective boundary. The phospholipid bilayer with embedded proteins controls what enters and exits. Receptor proteins detect external signals; channel proteins regulate ion flow; the membrane maintains the electrochemical potential that drives ATP synthesis.

### OS metaphor (current)
Selective Boundary — security, permissions, and network I/O filtering.

### Android internals target

| Component | AOSP path | Status |
|---|---|---|
| SELinux Binder security contexts | `system/sepolicy/private/` | ❌ |
| `netfilter` / `iptables` | `kernel/net/netfilter/` | ❌ |
| eBPF networking programs | `kernel/net/core/filter.c` | ❌ |
| Android permission model (`PackageManager`) | `frameworks/base/services/core/java/com/android/server/pm/permission/` | ❌ |
| Privacy dashboard (Android 12+) | `packages/apps/PermissionController/` | ❌ |
| Biometric authentication HAL | `hardware/interfaces/biometrics/` | ❌ |
| NN HAL `IDevice.hal` (boundary to AI stack) | `hardware/interfaces/neuralnetworks/1.3/` | 🔶 Cited |

### FP5 hardware target

| Component | Detail | Status |
|---|---|---|
| Integrated modem (5G sub-6GHz, part of QCM6490 SoC) | Cellular boundary — exact modem model designation needs primary source confirmation | ❌ |
| Wi-Fi 6 (802.11ax) | QCA6391 or equivalent chipset | ❌ |
| Bluetooth 5.2 | Co-located with Wi-Fi on combo chip | ❌ |
| NFC | ST54 NFC controller | ❌ |
| Fingerprint sensor (side-mounted) | Goodix GW9558 (likely) | ❌ |
| Fairphone modular design | Hardware boundary via module connectors | ❌ |

---

## The Triadic Model (cross-zone)

All three zones simultaneously participate in the triadic flow:

| Phase | Glyph | Cell | OS | Chip |
|---|---|---|---|---|
| **Perception** | 門 | Membrane receptors + nuclear pores | Typed inputs + event handlers | Sensors + NNAPI entry point |
| **Affect** | 室 | Cytoplasm + organelle processing | Pure state functions | CPU + GPU + Hexagon compute |
| **Expression** | 窗 | Vesicles + Golgi dispatch | Outputs + callbacks | Result → app → screen |

This triad is defined in `domain/content/mappings.ts` as `TRIAD_PHASES` and visualised in `components/TriadicFlow.tsx`.

---

## The ORGANELLE_ZONE_MAP join

The 15 organelles map to the 8 zones as follows (defined in `CellDiagram.tsx`):

| Organelle ID | Zone |
|---|---|
| nucleus, nucleolus, dna, nuclear-pores | nucleus |
| cytoplasm | cytoplasm |
| cytoskeleton | cytoskeleton |
| ribosomes | ribosomes |
| mitochondria | mitochondria |
| golgi-apparatus, vesicles | golgi |
| endoplasmic-reticulum | endoplasmic-reticulum |
| cell-membrane, membrane-receptors, lysosomes, vacuole | membrane |

This join is the canonical bridge between the navigation layer (8 zones) and the metaphor layer (15 organelles). Update it in `CellDiagram.tsx` if organelle → zone assignments change.
