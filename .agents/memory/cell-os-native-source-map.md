---
name: Cell OS native code source map
description: Verified public source files for each Cell OS zone; Fairphone 5 OSS locations; EdgeNode native upgrade path.
---

# Cell OS Native Code Source Map

**Why:** Research confirmed every zone has a real, public, linkable native source file. Future code snippet work should use these authoritative paths, not invented ones.

## Zone → AOSP Source File

| Zone | File | AOSP path |
|---|---|---|
| 核 Nucleus | `init.cpp` | `platform/system/core/+/master/init/init.cpp` |
| 漿 Cytoplasm | `Binder.cpp` | `platform/frameworks/native/+/master/libs/binder/Binder.cpp` |
| 骨 Cytoskeleton | `core.c` | `kernel/common/+/android-mainline/kernel/sched/core.c` |
| 糖 Ribosomes | `NeuralNetworks.cpp` | `platform/frameworks/ml/+/master/nn/runtime/NeuralNetworks.cpp` |
| 粒 Mitochondria | `cpufreq.c` | `kernel/common/+/android-mainline/drivers/cpufreq/cpufreq.c` |
| 高 Golgi | `ZygoteInit.java` | `platform/frameworks/base/+/master/core/java/com/android/internal/os/ZygoteInit.java` |
| 網 ER | `ion.c` | `platform/system/core/+/master/libion/ion.c` |
| 膜 Membrane | `IDevice.hal` | `platform/hardware/interfaces/+/master/neuralnetworks/1.3/IDevice.hal` |

All base URLs: `https://android.googlesource.com/`

## Fairphone 5 OSS Locations

- **Primary Gerrit:** `gerrit-public.fairphone.software` (kernel branch: `kernel/15/fp5`, msm-5.4, Clang 15)
- **OSS docs index:** `code.fairphone.com/projects/fairphone-5/`
- **Kernel mirror:** `github.com/WeAreFairphone/android_kernel_fairphone_qcm6490`
- **Device tree:** `github.com/LineageOS/android_device_fairphone_FP5`
- **Mainline DTS:** `torvalds/linux` → `arch/arm64/boot/dts/qcom/qcm6490-idp.dts`

## EdgeNode / llama.cpp

- Current EdgeNode: **wllama** (real WASM build of llama.cpp, ~0.8 tok/s mobile INT4)
- Native upgrade: `GGML_OPENCL=ON` for Adreno 642L GPU (llama.cpp `docs/backend/snapdragon/README.md`)
- NPU path: `ggml-qnn` backend (CPU/GPU/NPU unified) — QCM6490 Hexagon 770 HTP supported
- Native integration pathway A (lowest friction): Android WebView + `addJavascriptInterface` → NDK
- Native integration pathway B (higher perf): React Native TurboModules/JSI → C++ QNN SDK

## How to apply

When adding or updating CodeSnippet content in any zone panel, use the AOSP path above as the `filename` prop and link to the corresponding `android.googlesource.com` URL. Never invent file paths.
