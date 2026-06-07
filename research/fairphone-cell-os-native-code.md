# Cell OS ✕ Fairphone 5: Replacing TypeScript Metaphors with Real Native Code

**Research Date:** June 7, 2026
**Depth:** Standard (5 parallel subagents, 20+ sources)
**Sources Consulted:** 23
**Audience:** Technical — React/TypeScript developer building Cell OS

---

## Executive Summary

Cell OS currently maps eight biological zones to OS concepts using TypeScript data structures and metaphorical commentary. This report answers a single, concrete question: *what actual open-source C/C++ and kernel code exists — from Fairphone, Qualcomm, Android AOSP, and the llama.cpp ecosystem — that could replace or ground those metaphors in real implementation?*

The answer is more complete than expected. Every one of the eight Cell OS zones has a verified, publicly accessible native source file in either the Fairphone Gerrit, the Android AOSP tree (android.googlesource.com), or the Qualcomm CodeLinaro kernel — and these files can be surfaced in the UI with full attribution. The Mitochondria zone's EdgeNode is the most directly actionable: the Fairphone 5's Adreno 642L GPU and Hexagon 770 DSP have documented, merged OpenCL and QNN backends in the `llama.cpp` repository, with a Snapdragon-specific build guide already in the official docs. The current EdgeNode WASM path (wllama) is the correct browser-side integration; the native path exists in parallel as `ggml-qnn`.

Three integration tiers are available: (1) **display** — show real file paths and code snippets from public repos in the existing CodeSnippet component; (2) **link** — deep-link each zone panel to the actual source on android.googlesource.com or gerrit-public.fairphone.software; (3) **execute** — replace WASM mock inference with a compiled native target, which requires Android NDK and is out of scope for the current Vite SPA but is a documented future path.

---

## Background

The Fairphone 5 ships with Android 13 (upgradeable to 15) running on a Qualcomm QCM6490 SoC — a commercial variant of the Snapdragon 778G with the model number SM7325 [1]. The SoC carries a Kryo 670 CPU cluster, an Adreno 642L GPU, and a Hexagon 770 DSP with HVX and HTA extensions. Fairphone is legally required under GPLv2 to publish the Linux kernel source for this device, and does so through a public Gerrit instance at `gerrit-public.fairphone.software` and a documentation hub at `code.fairphone.com` [1][2].

The broader Android Open Source Project provides the framework code that runs above the kernel, all of it hosted on android.googlesource.com. For AI acceleration specifically, Qualcomm publishes downstream kernel branches through CodeLinaro and maintains a GitHub organisation (`qualcomm-linux`) for Yocto-based development. The llama.cpp project has direct Qualcomm Adreno and Hexagon backends merged into its main branch [10][11].

Cell OS models eight biological zones, each already linked to an OS concept in the existing codebase. The goal is to replace the TypeScript `ORGANELLE_ZONE_MAP`, `QI_INTERSECTIONS`, and `QUANTIZATION_LAYERS` commentary with actual source file references — so that clicking "Nucleus" surfaces real init code, not a metaphor.

---

## Key Findings

### Finding 1: Fairphone's Kernel and Device Source Is Fully Public

Fairphone publishes the complete kernel source for the FP5 under a Gerrit instance at `gerrit-public.fairphone.software`. The kernel branch is `kernel/15/fp5` (Android 15), with parallel branches for Android 14 and 13 [1]. The kernel is based on `msm-5.4` — Qualcomm's downstream Linux 5.4 branch — compiled with Clang 15 using Qualcomm's Single System Image (QSSI) architecture. QSSI splits the build into two trees: a generic Android system partition (QSSI tree) and a device-specific target tree containing the kernel and vendor configuration [2].

The WeAreFairphone community independently mirrors the kernel at `github.com/WeAreFairphone/android_kernel_fairphone_qcm6490` [5], which is more convenient for web linking since GitHub renders directory trees. The official device tree is at `github.com/LineageOS/android_device_fairphone_FP5` — maintained by the LineageOS project and structured as a standard Android device configuration [3].

Crucially, **binary blobs are required** but published separately as shell scripts (`FP5-QSSI-*-blobs.sh`). This means the public source is complete for code display purposes but not self-contained for a full build. The Fairphone OSS documentation page at `code.fairphone.com/projects/fairphone-5/` [2] is the authoritative index of everything published.

**What this means for Cell OS:** Every zone panel can cite a real Fairphone/AOSP source file hosted on a public URL. The Nucleus panel's `init.cpp` reference, for example, can link directly to `gerrit-public.fairphone.software` or the mirrored AOSP tree.

### Finding 2: AOSP Source Files Map Precisely to All Eight Zones

Android's source tree provides a clean one-to-one mapping for every Cell OS zone [6]:

| Cell OS Zone | OS Concept | AOSP Source File | Repository Path |
|---|---|---|---|
| **核 Nucleus** | Core Identity / DNA | `init.cpp` | `platform/system/core/+/master/init/init.cpp` |
| **漿 Cytoplasm** | Runtime / Communication | `Binder.cpp` + `binder.c` | `platform/frameworks/native/+/master/libs/binder/` |
| **骨 Cytoskeleton** | AI Substrate Lattice | `core.c` | `kernel/common/+/android-mainline/kernel/sched/core.c` |
| **糖 Ribosomes** | Pattern Translation | `NeuralNetworks.cpp` | `platform/frameworks/ml/+/master/nn/runtime/` |
| **粒 Mitochondria** | EdgeNode / Power | `cpufreq.c` | `kernel/common/+/android-mainline/drivers/cpufreq/cpufreq.c` |
| **高 Golgi** | OS Genome Sorting | `ZygoteInit.java` | `platform/frameworks/base/+/master/core/java/com/android/internal/os/` |
| **網 Endoplasmic Reticulum** | Deep Memory | `ion.c` | `platform/system/core/+/master/libion/ion.c` |
| **膜 Membrane** | Selective Boundary | `IDevice.hal` | `platform/hardware/interfaces/+/master/neuralnetworks/1.3/` |

These mappings are grounded in architectural intent, not loose analogy [6][7]. The `init` process (PID 1) genuinely *is* the DNA of an Android system — it parses `.rc` files that encode which services run, in what order, with what capabilities. Binder is genuinely the cytoplasm: every inter-process call, from camera to clipboard, traverses `Binder.cpp`. NNAPI (`NeuralNetworks.cpp`) translates model operations into hardware-specific workloads exactly as ribosomes translate RNA into proteins. The HAL (`IDevice.hal`) is literally a selective interface boundary — it decides what the framework can ask of hardware and in what shape.

One important nuance: since Android 11, parts of NNAPI moved to `packages/modules/NeuralNetworks` as a Mainline module, so newer AOSP may have the runtime at a slightly different path [6]. The HAL itself is migrating from HIDL (`.hal` files) to AIDL (`.aidl` files) in Android 14+. The Cell OS `CodeSnippet` component should note these version transitions as a feature — it shows the membrane is actively evolving.

### Finding 3: Qualcomm's QCM6490 Has Deep Open Source Coverage

The QCM6490's device tree (`qcm6490-idp.dts`) is merged into mainline Linux at `arch/arm64/boot/dts/qcom/qcm6490-idp.dts` [13] — meaning this hardware is fully described in the upstream kernel, not just in Qualcomm's downstream branch. This is significant: it means any Cell OS reference to the DTS file is referencing code in Linus Torvalds' tree.

The Hexagon 770 DSP has an associated open source library called **NNLib**, originally from Qualcomm and now maintained in an active fork at `github.com/XiaoMi/nnlib` [15]. NNLib contains C source for DSP-side skeleton code including HVX-optimised vector operations (`hexnn_dsp_api.c`) and the FastRPC host-side interface. FastRPC is the IPC mechanism between the ARM CPU and the Hexagon cDSP — when a neural network layer is offloaded, FastRPC is what carries the data across.

The Adreno 642L GPU has two open-source driver paths [16]: the **freedreno** driver (OpenGL ES) and **turnip** (Vulkan), both part of Mesa and both reverse-engineered from the hardware specification. These are what LineageOS and other custom ROMs use for GPU support. The proprietary Qualcomm driver is faster for production use but the open drivers mean code is fully inspectable.

For the Cell OS Cytoskeleton zone (AI Substrate Lattice), the most relevant file is `drivers/soc/qcom/` in the CodeLinaro msm-5.4 tree [14] — this contains Qualcomm-specific CPU scheduler patches for Energy Aware Scheduling (EAS) and big.LITTLE cluster management. These patches are what make the Fairphone 5's Kryo 670 cores cooperate efficiently, which is the substrate of every AI computation.

### Finding 4: llama.cpp Has a Dedicated Snapdragon Build Path

The `llama.cpp` repository contains a `docs/backend/snapdragon/README.md` [10] — a Qualcomm-authored guide for building GGUF inference specifically for Snapdragon SoCs. The Fairphone 5's Adreno 642L is in the supported Adreno 600/700/800 series. Three acceleration paths are available:

**OpenCL (Adreno GPU):** Enabled with `GGML_OPENCL=ON`. Over 50 kernels specifically tuned for Adreno, making this the primary acceleration path. The Fairphone 5's Adreno 642L supports OpenCL 3.0. The proprietary OpenCL library ships in every Android ROM at `/vendor/lib64/libOpenCL.so` [11] — a Cell OS code snippet can cite this exact path and explain it as the ATP production mechanism (the GPU is where float-point matrix multiplications get their energy budget).

**QNN Backend (Unified CPU/GPU/NPU):** The `ggml-qnn` backend [10][12] provides a single C++ interface to all three compute units — Kryo CPU, Adreno GPU, and Hexagon HTP (the dedicated NPU). This is the modern Qualcomm path. The Cell OS Mitochondria panel's quantization cascade (FP32 → FP16 → INT8 → INT4) maps directly onto the QNN precision modes: FP32 runs on CPU, FP16 on Adreno GPU, INT8/INT4 on the Hexagon NPU.

**Hexagon HTP (NPU):** Enabled with `GGML_HEXAGON=ON`. Uses FastRPC to offload to the cDSP. Performance is 2–5× better per watt than CPU-only [10], which is the biological analogue of ATP synthesis efficiency — the same computation happens with less heat.

The `Q4_0` GGUF quantization format is specifically noted as most optimised for the Adreno OpenCL backend [10], cross-referencing directly with Cell OS's existing `INT4` quantization layer entry.

### Finding 5: The EdgeNode Integration Tier Is Already Correct

The existing Cell OS EdgeNode runs on **wllama** (`github.com/ngxson/wllama`) [18] — a WebAssembly wrapper around `llama.cpp` that runs in a browser background thread. Research confirmed that this achieves approximately 0.8 tokens/second on a mobile CPU at 1B-parameter INT4, which matches the project's documented capabilities [18]. This is not a mock: wllama compiles the actual `llama.cpp` inference engine to WASM via Emscripten and loads real GGUF model files.

This means the current Cell OS is *already* running a real native binary — it is the WASM compilation of the same C++ code that runs natively with `GGML_OPENCL=ON`. The difference is the execution environment: WASM runs in the browser JS engine (roughly 2–5× slower than native [18]), whereas native Android runs via the NDK with direct hardware access.

The integration pathway from the current web SPA to native acceleration has two practical options:

**Option A — Android WebView + `addJavascriptInterface`:** The Vite SPA runs inside an Android WebView. A thin Kotlin wrapper exposes `@JavascriptInterface`-annotated methods that call into the NDK layer. The Cell OS React code calls `window.CellOS.runInference(prompt)` and gets back tokens. This is the lowest-friction path from the current architecture [19].

**Option B — React Native + TurboModules/JSI:** Migrating to React Native enables direct synchronous C++ calls via JSI (JavaScript Interface) without serialisation overhead. A TurboModule wraps the QNN SDK or llama.cpp OpenCL backend. This gives near-native inference speeds from JavaScript [20]. This requires migrating the existing React component tree to React Native — a larger scope change.

The browser-based WebGPU path (which would allow native GPU access from the current SPA without a WebView wrapper) is the evolving standard but not yet viable for Hexagon NPU access [18] — that remains an NDK-exclusive boundary.

---

## Analysis

The research reveals a clear layered structure for Cell OS's native code integration. At the bottom is the Fairphone kernel — a public, browsable Gerrit repository containing the actual msm-5.4 Linux source that boots the physical device. Above it sits the Qualcomm QCM6490 hardware layer with its DTS in mainline Linux and its neural engine code in NNLib. Above that is AOSP — the Android framework where every Cell OS zone has a named, linkable source file. At the top of the stack, llama.cpp provides the inference engine, with its Snapdragon-specific backends documented and merged.

What makes this actionable for Cell OS is that these are not esoteric repositories requiring special access — every source file cited in this report is on a public URL, most of them indexed by Google. The `CodeSnippet` component already exists in the project. The immediate integration is **display-layer**: replace the current TypeScript commentary with actual code blocks extracted from these public sources, with `filename` headers that show the real path (e.g., `kernel/drivers/cpufreq/cpufreq.c`) and attribution links.

The deeper integration — actually calling native inference from the SPA — requires deciding on the WebView or React Native wrapper. The wllama path already provides real inference; the upgrade is whether to move from WASM to OpenCL-accelerated native on the Adreno GPU. That is a hardware performance decision, not an architectural one.

The HARMONIC_CONSTANT (0.7770777) used in the project's sampler is a custom parameter layered on top of standard llama.cpp sampling — this would be expressed as a `sampler_chain` modification in the llama.cpp C API, which is a real code concept that can be shown as such.

---

## Limitations

Binary blobs required for a full Fairphone 5 build are not open source — the `FP5-QSSI-*-blobs.sh` packages contain firmware for the cellular modem, camera ISP, and other proprietary subsystems. Any Cell OS zone that corresponds to these (e.g., Membrane for cellular/RF hardware) cannot be grounded in open source code at the firmware level. AOSP HAL interfaces remain open; the implementations beneath them may not be.

The Hexagon SDK (version 5.x, needed for the newest HVX features on Hexagon 770) has only partial public availability — older 3.x/4.x documentation is freely accessible but some 5.x-specific APIs are behind a Qualcomm developer account. NNLib covers the open portion. The QNN engine core remains a binary blob; only the integration layer (ggml-qnn) is open source.

Web sources for this research are accurate as of June 2026. AOSP file paths change with major Android releases; the NNAPI Mainline module path in particular has shifted between Android 11 and 14.

---

## Recommendations

### Immediate (1–2 days): Display-Layer Integration

Update every zone panel in Cell OS to show a real native code snippet from the mapped AOSP/kernel file, replacing or supplementing the current TypeScript commentary. Use the existing `CodeSnippet` component with the `filename` prop set to the actual repository path.

Priority order by zone:

1. **核 Nucleus** — Show 15 lines from `system/core/init/init.cpp` around the `.rc` file parser. Caption: "This parses the device's boot DNA." Link to `android.googlesource.com`.
2. **粒 Mitochondria** — Show the `llama.cpp` QNN backend enum (`GGML_QNN_BACKEND_CPU`, `GPU`, `NPU`) alongside the existing QUANTIZATION_LAYERS TypeScript. These are the same cascade in two languages.
3. **糖 Ribosomes** — Show `NeuralNetworks.cpp`'s `ANeuralNetworksModel_addOperation()` signature. Caption: "NNAPI: the ribosome call that dispatches a token."
4. **漿 Cytoplasm** — Show the Binder `transact()` method from `Binder.cpp`. Caption: "Every IPC call crosses this exact boundary."
5. **膜 Membrane** — Show `IDevice.hal` interface declaration. Caption: "The HAL membrane: everything the OS may ask of hardware."
6. **骨 Cytoskeleton** — Show the EAS scheduler's `find_energy_efficient_cpu()` from `core.c`. Caption: "The substrate that decides which core runs which thought."
7. **網 Endoplasmic Reticulum** — Show `ion_alloc()` from `libion/ion.c`. Caption: "All tensor buffers are born here."
8. **高 Golgi** — Show `ZygoteInit.preloadClasses()`. Caption: "Zygote sorts the proteome before forking every app."

### Near-Term (1–2 weeks): Substrate Page with Source Map

Build a new `/substrate` view (or enhance the existing Substrate section) as an interactive source map — a tree that shows the full Fairphone 5 software stack from kernel DTS → HAL → NNAPI → llama.cpp, with each node being a real clickable source file. This replaces the current conceptual Substrate page with a navigable code atlas.

### Future (1+ month): Native Inference Upgrade

Implement Option A (WebView wrapper) to move EdgeNode from WASM (~0.8 tok/s) to OpenCL-accelerated native on the Adreno 642L (~3–4 tok/s estimated). The integration point is `android.webkit.WebView` with `addJavascriptInterface`, calling into a Kotlin service that loads `libggml-opencl.so` via the NDK. The GGUF model path does not change — only the inference backend.

---

## Sources

1. Fairphone 5 Kernel Source — https://code.fairphone.com/projects/fairphone-5/kernel.html (Oct 2024, Tier 1)
2. Fairphone 5 ODM Android Source — https://code.fairphone.com/projects/fairphone-5/odm.html (Oct 2024, Tier 1)
3. LineageOS Device Tree FP5 — https://github.com/LineageOS/android_device_fairphone_FP5 (2024, Tier 2)
4. Fairphone Public Gerrit — https://gerrit-public.fairphone.software/ (Live, Tier 1)
5. WeAreFairphone Kernel Mirror — https://github.com/WeAreFairphone/android_kernel_fairphone_qcm6490 (2024, Tier 2)
6. AOSP Init Process Source — https://android.googlesource.com/platform/system/core/+/refs/heads/master/init/ (Live, Tier 1)
7. AOSP Binder Library — https://android.googlesource.com/platform/frameworks/native/+/refs/heads/master/libs/binder/ (Live, Tier 1)
8. AOSP Neural Networks API Runtime — https://android.googlesource.com/platform/frameworks/ml/+/refs/heads/master/nn/runtime/ (Live, Tier 1)
9. AOSP Hardware Interfaces (HAL) — https://android.googlesource.com/platform/hardware/interfaces/ (Live, Tier 1)
10. llama.cpp Snapdragon Backend Docs — https://github.com/ggml-org/llama.cpp/blob/master/docs/backend/snapdragon/README.md (2025, Tier 1)
11. llama.cpp OpenCL Backend — https://github.com/ggml-org/llama.cpp/blob/master/docs/backend/OPENCL.md (2025, Tier 1)
12. Qualcomm Developer Blog — OpenCL for llama.cpp — https://www.qualcomm.com/developer/blog/2024/11/introducing-new-opn-cl-gpu-backend-llama-cpp-for-qualcomm-adreno-gpu (Nov 2024, Tier 2)
13. Mainline Linux QCM6490 DTS — https://github.com/torvalds/linux/blob/master/arch/arm64/boot/dts/qcom/qcm6490-idp.dts (Live, Tier 1)
14. CodeLinaro QCM6490 Kernel (msm-5.4) — https://git.codelinaro.org/clo/la/kernel/msm-5.4/-/tree/LA.UM.9.14.4.c25-00900-QCM6490.QSSI13c32.0 (2024, Tier 1)
15. Hexagon NNLib (XiaoMi Fork) — https://github.com/XiaoMi/nnlib (2024, Tier 2)
16. Adreno Vulkan Sample Framework — https://github.com/quic/adreno-gpu-vulkan-code-sample-framework (2024, Tier 2)
17. Qualcomm Linux Yocto Manifest — https://github.com/qualcomm-linux/qcom-manifest (2024, Tier 2)
18. wllama — WebAssembly llama.cpp wrapper — https://github.com/ngxson/wllama (2025, Tier 1)
19. Android WebView JavaScript Binding — https://developer.android.com/guide/webapps/webview#BindingJavaScript (Live, Tier 1)
20. React Native New Architecture TurboModules — https://github.com/reactwg/react-native-new-architecture (Live, Tier 1)
21. Qualcomm AI Engine Direct (QNN) SDK — https://developer.qualcomm.com/software/qualcomm-ai-engine-direct-sdk (Live, Tier 2)
22. ggml-hexagon implementation — https://github.com/jeffzhou2000/ggml-hexagon (2024, Tier 2)
23. Android Kernel Binder Driver — https://android.googlesource.com/kernel/common/+/refs/heads/android-mainline/drivers/android/binder.c (Live, Tier 1)
