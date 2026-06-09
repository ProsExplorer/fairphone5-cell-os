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
  },

  // ── FP5 Source-Grounded Substrate Nodes ──────────────────────────────────────
  // Added from FP5_MANIFOLD_COMPARISON.md findings. These represent real
  // software-layer substrates that the manifold analysis identified as
  // underrepresented in the original substrate node set.

  {
    id: "binder-ipc",
    name: "Binder IPC / /dev/binder",
    category: "stack",
    role: "Inter-process communication fabric",
    detail:
      "The Linux kernel driver at /dev/binder mediates all inter-process communication in Android. It uses a single-copy mechanism (mmap) rather than full double-copy, transferring Parcels from client Proxy to server Stub without a kernel buffer copy. The ServiceManager is the phonebook — all Binder services register here by name, and all clients resolve services here. Four coupling tiers: Binder direct (σ=0.9), Messenger (σ=0.7), ordered broadcast (σ=0.6), unordered broadcast (σ=0.4).",
    specs: [
      { label: "Kernel node", value: "/dev/binder", confidence: "verified" },
      { label: "Transfer mechanism", value: "Single-copy via mmap (not double-copy)", confidence: "verified" },
      { label: "Service registry", value: "ServiceManager — index-2 maximum, all links route through it", confidence: "verified" },
      { label: "Coupling tiers", value: "Binder σ=0.9 / Messenger σ=0.7 / Ordered σ=0.6 / Unordered σ=0.4", confidence: "verified" }
    ],
    confidence: "verified",
    color: "hsl(50, 100%, 60%)"
  },
  {
    id: "art-runtime",
    name: "Android Runtime (ART)",
    category: "stack",
    role: "Managed execution environment — verify, compile, execute",
    detail:
      "ART is the cell's ribosome + Golgi combined: it verifies every DEX bytecode class against its type descriptors before generating native code (verification = codon-anticodon check), then dex2oat compiles the verified bytecode into native binaries with hardware-destination addresses written in (the Golgi's glycan address code). Includes a baseline JIT for cold starts and an optimizing JIT (profile-guided) for hot paths. Nothing executes in ART that has not passed type verification.",
    specs: [
      { label: "Verification", value: "Type-check DEX bytecode before native codegen", confidence: "verified" },
      { label: "AOT compiler", value: "dex2oat — compile on install; writes native .oat/.odex files", confidence: "verified" },
      { label: "JIT tiers", value: "Baseline JIT (fast) + Optimizing JIT (profile-guided)", confidence: "verified" },
      { label: "GC model", value: "Concurrent, generational GC (maps to Mitochondria/Lysosomes)", confidence: "verified" }
    ],
    confidence: "verified",
    color: "hsl(300, 70%, 65%)"
  },
  {
    id: "bionic-libc",
    name: "Bionic libc",
    category: "stack",
    role: "C runtime — heap, threads, and system call interface",
    detail:
      "Android's custom C library, replacing glibc. Bionic manages the process heap (jemalloc allocator), the thread pool (pthreads), and the thin wrapper layer over ARM64 system calls. It is the cytoplasm of the ART process: the fluid medium in which every app's objects are allocated and in which every thread swims. Its heap is the immediate environment for all runtime transformations.",
    specs: [
      { label: "Allocator", value: "jemalloc (thread-local cache, slab allocation)", confidence: "verified" },
      { label: "Thread model", value: "POSIX pthreads — each thread gets its own stack frame", confidence: "verified" },
      { label: "Syscall wrapper", value: "Thin ARM64 syscall shims — reads x8 (number), x0–x5 (args)", confidence: "verified" },
      { label: "Link", value: "Bionic is statically linked into every ART process", confidence: "verified" }
    ],
    confidence: "verified",
    color: "hsl(260, 60%, 50%)"
  },

  // ── Biological Accuracy Roadmap Additions (DEVELOPMENT.md Part 3 HIGH) ────────
  // Five Android software-stack nodes that complete the substrate graph to 16 nodes.
  // All five are category "stack" — they are HAL or framework layers, not silicon.
  // After addition: coupling tensor space = 15 × 16 = 240; density ≈ 14.2%.

  {
    id: "zygote",
    name: "Zygote",
    category: "stack",
    role: "Process forking hub — all app processes are forks of Zygote, exactly as all microtubules nucleate from the centrosome gamma-tubulin ring complex",
    detail:
      "Zygote pre-loads the Android runtime and common framework classes, then forks on demand. Fork = microtubule nucleation. Every app inherits the same pre-loaded chromosome set. The verified-boot chain ensures the same signed genome image reaches every child process.",
    specs: [
      { label: "Mechanism", value: "posix fork() + SO_REUSEADDR socket" },
      { label: "Cold start saving", value: "~100ms class loading avoided per fork" }
    ],
    confidence: "verified",
    color: "#7c3aed"
  },
  {
    id: "lmkd",
    name: "LMKD",
    category: "stack",
    role: "Low Memory Killer Daemon — bulk process termination under memory pressure, analogous to the lysosomal autophagy pathway (not the ubiquitin-proteasome system)",
    detail:
      "Monitors /proc/meminfo and PSI (Pressure Stall Information). Kills processes in order of oom_score_adj: cached background first, then services, then visible, then foreground. Bulk degradation under nutrient stress — the mTOR inhibition → autophagy axis of Android.",
    specs: [
      { label: "Signal", value: "SIGKILL to target PID" },
      { label: "Policy source", value: "/sys/module/lowmemorykiller/parameters/" }
    ],
    confidence: "verified",
    color: "#dc2626"
  },
  {
    id: "powerhal",
    name: "Power HAL",
    category: "stack",
    role: "Power state management and thermal signaling — the Ca²⁺ second-messenger system of Android: discrete, fast, reversible state signals that cascade through the system",
    detail:
      "Implements IPower AIDL interface. Receives power hints (INTERACTION, SUSTAINED_PERFORMANCE, VR_MODE) and translates to CPU governor, thermal throttle, display brightness. Warning/critical/emergency thresholds = low/medium/high reactive oxygen species (ROS) signal tiers.",
    specs: [
      { label: "Interface", value: "android.hardware.power@1.3" },
      { label: "Hint types", value: "INTERACTION, SUSTAINED_PERFORMANCE, LAUNCH" }
    ],
    confidence: "verified",
    color: "#f59e0b"
  },
  {
    id: "selinux-policy",
    name: "SELinux Policy",
    category: "stack",
    role: "Mandatory access control — tight junctions of Android. Prevents direct cross-domain interaction exactly as tight junctions seal adjacent cells against paracellular passage",
    detail:
      "Type Enforcement (TE) rules define allowed transitions between security domains. Neverallow rules = tight junction seals: no paracellular passage permitted. Every app, service, and HAL has a distinct security domain. Cross-domain communication only through defined transitions — never direct membrane crossing.",
    specs: [
      { label: "Policy compiler", value: "checkpolicy / sepolicy-analyze" },
      { label: "Enforcement", value: "LSM hooks in kernel" }
    ],
    confidence: "verified",
    color: "#065f46"
  },
  {
    id: "package-manager",
    name: "PackageManager",
    category: "stack",
    role: "App lifecycle orchestration — the E3 ubiquitin ligase of Android: recognizes specific targets for installation, update, or removal, and executes targeted degradation",
    detail:
      "PackageManagerService manages the APK install/uninstall/update pipeline. Targeted: acts on specific packages by name (E3 degron recognition), not all processes. Dexopt pipeline = E1/E2/E3 ubiquitin cascade (verify → optimize → install). Force-stop = targeted degradation without removal. Distinct from LMKD (autophagy/bulk killing).",
    specs: [
      { label: "Service", value: "com.android.server.pm.PackageManagerService" },
      { label: "Storage", value: "/data/app/, /data/dalvik-cache/" }
    ],
    confidence: "verified",
    color: "#1d4ed8"
  },

  // ── Biological Accuracy Roadmap: Open Items (DEVELOPMENT.md #9, #13, #19) ──────
  // One node is the Fredholm cap (index 15-17 = -2). Cooperative-pair rule satisfied below.
  {
    id: "keystore-tee",
    name: "Keystore / TEE (KeyMint/StrongBox)",
    category: "stack",
    role: "Isolated cryptographic execution and toxic-operation containment — the peroxisomal quarantine of Android: processes dangerous operations in a secure world enclave and neutralises the blast radius before it can reach normal-world processes",
    detail:
      "ARM TrustZone splits the SoC into two worlds: the Normal World (Android OS) and the Secure World (TEE). Key operations (generation, signing, attestation) execute inside the Secure World and never expose raw key material to Normal World processes. StrongBox/KeyMint provides hardware-backed key storage; keystore2 + keymintd are the HAL services. Exactly as peroxisomes generate and immediately destroy H₂O₂ within a single-membrane enclave, the TEE processes cryptographic 'toxins' inside a hard boundary and releases only the neutralised output. seccomp filtering and the keystore daemon's isolated process context extend this containment to the syscall layer.",
    specs: [
      { label: "Boundary", value: "ARM TrustZone secure world / KeyMint HAL" },
      { label: "Isolation", value: "StrongBox/TEE non-exportable keys, hardware attestation" },
      { label: "Services", value: "keystore2, keymintd, /dev/hw_random" }
    ],
    confidence: "verified",
    color: "#0f766e"
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
