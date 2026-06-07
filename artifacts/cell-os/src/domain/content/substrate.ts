import type { SubstrateNode, SubUnit, StackLayer, QuantFormat, Licence } from "@/domain/types";

/**
 * The FairPhone 5 AI substrate — the real hardware and software underneath the
 * metaphor. Hardware reference: Qualcomm QCM6490 (SM6375 platform), Android 13.
 *
 * Every figure carries a confidence tag drawn from the source material:
 *   verified     — confirmed against official or first-party sources
 *   indicative   — vendor-declared or a reasonable estimate, not independently confirmed
 *   unconfirmed  — consistent with documentation but not verifiable for this exact part
 *
 * No runtime telemetry is invented here; this is static reference content only.
 */
export const SUBSTRATE_NODES: SubstrateNode[] = [
  {
    id: "qcm6490",
    name: "QCM6490 SoC",
    category: "soc",
    role: "System-on-chip — overall governance",
    detail:
      "The single piece of silicon that hosts every processing unit and the shared memory bus. An industrial-grade platform closely related to the Snapdragon 778G, built on a 6nm process.",
    specs: [
      { label: "Platform", value: "Qualcomm QCM6490 (SM6375)", confidence: "verified" },
      { label: "Process", value: "6nm (TSMC N6)", confidence: "verified" },
      { label: "Android", value: "Android 13", confidence: "verified" },
      { label: "Storage", value: "256GB UFS 2.2 (~1200 MB/s read, typical)", confidence: "indicative" }
    ],
    confidence: "verified",
    color: "hsl(280, 80%, 60%)"
  },
  {
    id: "kryo670",
    name: "Kryo 670 CPU",
    category: "compute",
    role: "Sequential control and orchestration",
    detail:
      "An octa-core CPU in a 1 + 3 + 4 arrangement. It schedules work, runs control logic, and can execute small models directly when no accelerator path is used.",
    specs: [
      { label: "Prime core", value: "1x Cortex-A78 @ 2.71 GHz", confidence: "verified" },
      { label: "Performance", value: "3x Cortex-A78 @ 2.40 GHz", confidence: "verified" },
      { label: "Efficiency", value: "4x Cortex-A55 @ 1.96 GHz", confidence: "verified" }
    ],
    confidence: "verified",
    color: "hsl(340, 80%, 60%)"
  },
  {
    id: "adreno643",
    name: "Adreno 643 GPU",
    category: "compute",
    role: "Parallel throughput pathways",
    detail:
      "The graphics processor, also usable for general parallel compute. It handles FP16 and FP32 workloads and shares system memory rather than holding dedicated VRAM.",
    specs: [
      { label: "Clock", value: "Up to 812 MHz", confidence: "verified" },
      { label: "Compute APIs", value: "OpenCL 2.0, Vulkan, OpenGL ES 3.2", confidence: "verified" },
      { label: "Precision", value: "FP32 / FP16", confidence: "verified" },
      { label: "Memory", value: "Shared LPDDR4x (no dedicated VRAM)", confidence: "verified" }
    ],
    confidence: "verified",
    color: "hsl(220, 80%, 65%)"
  },
  {
    id: "hexagon770",
    name: "Hexagon 770 NPU",
    category: "compute",
    role: "Dedicated neural inference engine",
    detail:
      "Qualcomm's 6th-generation AI engine and the most efficient path for quantized inference. Its sub-units are described below; the headline TOPS figure is vendor-declared.",
    specs: [
      { label: "Throughput", value: "12 TOPS (INT8, vendor-declared)", confidence: "indicative" },
      { label: "Primary precision", value: "INT8", confidence: "verified" },
      { label: "Access", value: "Qualcomm QNN SDK / NNAPI delegate", confidence: "verified" }
    ],
    confidence: "indicative",
    color: "hsl(300, 70%, 65%)"
  },
  {
    id: "lpddr4x",
    name: "LPDDR4x Memory",
    category: "memory",
    role: "Shared medium for all compute units",
    detail:
      "A single pool of RAM shared by the CPU, GPU, and Hexagon. Because there is no dedicated accelerator memory, model weights and activations move across this common bus.",
    specs: [
      { label: "Capacity", value: "8GB", confidence: "verified" },
      { label: "Bandwidth", value: "~34 GB/s (theoretical peak)", confidence: "indicative" },
      { label: "Shared by", value: "CPU + GPU + Hexagon", confidence: "verified" }
    ],
    confidence: "verified",
    color: "hsl(260, 60%, 50%)"
  },
  {
    id: "nnapi",
    name: "NNAPI / QNN Dispatch",
    category: "stack",
    role: "Gated routing to the accelerators",
    detail:
      "The software gateway that decides where an operation runs. Frameworks submit a graph; NNAPI (an optional delegate) or the Qualcomm QNN runtime routes supported operations to the Hexagon, GPU, or CPU.",
    specs: [
      { label: "Entry", value: "Android NNAPI (optional delegate)", confidence: "verified" },
      { label: "Vendor path", value: "Qualcomm QNN runtime / HAL", confidence: "verified" },
      { label: "First call", value: "Graph is compiled on first inference", confidence: "verified" }
    ],
    confidence: "verified",
    color: "hsl(200, 90%, 60%)"
  },
  {
    id: "quantization",
    name: "Quantization",
    category: "format",
    role: "Weight-encoding density",
    detail:
      "How densely a model's weights are encoded. Lower precision shrinks memory footprint and unlocks faster hardware paths, at some cost to accuracy.",
    specs: [
      { label: "Formats", value: "FP32, FP16, INT8, INT4", confidence: "verified" },
      { label: "GGUF schemes", value: "Q8_0, Q5_K_M, Q4_K_M, Q4_0", confidence: "verified" },
      { label: "Hexagon path", value: "INT8 primary; INT4 hardware-supported", confidence: "indicative" }
    ],
    confidence: "verified",
    color: "hsl(180, 100%, 50%)"
  },
  {
    id: "power",
    name: "Power & Thermal",
    category: "compute",
    role: "Energy budget and homeostasis",
    detail:
      "Sustained inference is bounded by heat, not just compute. The SoC shares a single power and thermal envelope across the CPU, Hexagon, 5G modem, memory controller, and display.",
    specs: [
      { label: "Sustained draw", value: "~3-5W under load (estimate)", confidence: "indicative" },
      { label: "Throttling", value: "Begins within minutes at full use", confidence: "indicative" },
      { label: "Cooling type", value: "Vapour chamber vs graphite — not confirmed", confidence: "unconfirmed" }
    ],
    confidence: "indicative",
    color: "hsl(35, 100%, 55%)"
  }
];

/** The four engines inside the Hexagon 770. */
export const HEXAGON_SUBUNITS: SubUnit[] = [
  {
    name: "Scalar core",
    detail: "Sequential control and orchestration of the vector and matrix units.",
    confidence: "verified"
  },
  {
    name: "HVX (Hexagon Vector eXtensions)",
    detail: "Wide SIMD vector engine (1024-bit vectors) for element-wise and activation work.",
    confidence: "unconfirmed"
  },
  {
    name: "HTA (Hexagon Tensor Accelerator)",
    detail: "Matrix multiply-accumulate engine; INT8 primary, with INT32 accumulation.",
    confidence: "unconfirmed"
  },
  {
    name: "HMX (Hexagon Matrix eXtensions)",
    detail: "Additional matrix throughput suited to transformer-style kernels.",
    confidence: "unconfirmed"
  }
];

/** The Android / Qualcomm inference stack, from app down to silicon. */
export const STACK_LAYERS: StackLayer[] = [
  { id: "app", name: "Application", detail: "The app requesting an inference result." },
  { id: "framework", name: "ML Framework", detail: "TensorFlow Lite, ONNX Runtime, or llama.cpp (QNN backend)." },
  { id: "dispatch", name: "NNAPI / QNN SDK", detail: "Optional NNAPI delegate or direct Qualcomm QNN runtime." },
  { id: "hal", name: "Vendor HAL", detail: "Qualcomm's hardware abstraction layer for the accelerators." },
  { id: "hardware", name: "Hardware", detail: "Hexagon HTA, Adreno GPU, or Kryo CPU executes the graph." }
];

/** Numeric precision formats for model weights. */
export const QUANT_FORMATS: QuantFormat[] = [
  { format: "FP32", bitsPerWeight: "32-bit", modelSize1B: "~4 GB", hardwarePath: "CPU / GPU" },
  { format: "FP16", bitsPerWeight: "16-bit", modelSize1B: "~2 GB", hardwarePath: "GPU (efficient)" },
  { format: "INT8", bitsPerWeight: "8-bit", modelSize1B: "~1 GB", hardwarePath: "Hexagon HTA (primary)" },
  { format: "INT4", bitsPerWeight: "4-bit", modelSize1B: "~500 MB", hardwarePath: "Hexagon HTA (supported)" }
];

/** Software-stack licences, as published in the source material. */
export const LICENCES: Licence[] = [
  { component: "FairPhone 5 kernel sources", licence: "GPL-2.0", notes: "Published by Fairphone" },
  { component: "Android NNAPI", licence: "Apache-2.0", notes: "Part of AOSP" },
  { component: "TensorFlow Lite", licence: "Apache-2.0", notes: "Google" },
  { component: "ONNX Runtime", licence: "MIT", notes: "Microsoft" },
  { component: "llama.cpp", licence: "MIT", notes: "QNN backend included" },
  { component: "Termux", licence: "GPL-3.0 (app)", notes: "F-Droid; tools carry own licences" },
  { component: "WebLibre", licence: "AGPL-3.0", notes: "F-Droid; GeckoView-based" },
  { component: "Qualcomm QNN SDK", licence: "Proprietary", notes: "Free to use; closed source" }
];
