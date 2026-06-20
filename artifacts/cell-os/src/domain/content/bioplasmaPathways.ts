import type { BioplasmaPathway } from "@/domain/types";

/**
 * Bioplasma pathway constants — BP1 through BP9.
 *
 * σ values are immutable from BIOPLASMA_RESEARCH.md and may only be
 * updated when the source document is revised with new citations.
 * LineageOS source paths are verified against LineageOSv2_Manifold.md §9.
 *
 * Runtime guards enforced by bioplasmaSignal() in useCellVitalStore:
 *   - BP8 (reserved): never fires
 *   - BP9 (readonly): never drives routing decisions
 */

export const BP1_RESTING_POTENTIAL: BioplasmaPathway = {
  code: "BP1",
  sigma: 0.92,
  status: "verified",
  carrier: "Trans-membrane ion gradient (Na⁺/K⁺/Ca²⁺ charge separation)",
  frequencyRange: "DC (steady-state)",
  plasmaLiteralness: "literal-quasi-plasma",
  lineageosPath: "kernel/irq/irqdesc.c · android_kernel_fairphone_qcm6490",
  organelleRoute: {
    source: "cell-membrane",
    target: "broadcast",
    direction: "broadcast",
  },
  ipcAnalogue: "GIC-600 interrupt baseline / Power HAL AIDL setBoost",
  isMetaphor: false,
};

export const BP2_ACTION_POTENTIAL: BioplasmaPathway = {
  code: "BP2",
  sigma: 0.90,
  status: "verified",
  carrier: "Directed ionic depolarisation wave",
  frequencyRange: "1–1000 Hz propagation",
  plasmaLiteralness: "electrolyte-analogy",
  lineageosPath: "drivers/android/binder.c · android_kernel_fairphone_qcm6490",
  organelleRoute: {
    source: "cell-membrane",
    target: "nucleus",
    direction: "inward",
  },
  ipcAnalogue: "Binder BC_TRANSACTION / IPCThreadState",
  isMetaphor: false,
};

export const BP3_WOUND_FIELD: BioplasmaPathway = {
  code: "BP3",
  sigma: 0.85,
  status: "verified",
  carrier: "Injury-current DC electric field (epithelial wound currents)",
  frequencyRange: "DC–0.1 Hz",
  plasmaLiteralness: "electrolyte-analogy",
  lineageosPath:
    "frameworks/base/services/core/java/com/android/server/am/BroadcastQueue.java",
  organelleRoute: {
    source: "broadcast",
    target: "broadcast",
    direction: "broadcast",
  },
  ipcAnalogue: "Android ordered broadcast (ACTION_BATTERY_LOW / ACTION_POWER_DISCONNECTED)",
  isMetaphor: false,
};

export const BP4_ELF_COUPLING: BioplasmaPathway = {
  code: "BP4",
  sigma: 0.65,
  status: "indicative",
  carrier: "External ELF magnetic field (0.01–300 Hz)",
  frequencyRange: "0.01–300 Hz",
  plasmaLiteralness: "field-coherence-analogy",
  lineageosPath: "fs/eventpoll.c · linux-msm-5.4 (epoll EPOLLET)",
  organelleRoute: {
    source: "endoplasmic-reticulum",
    target: "nucleus",
    direction: "inward",
  },
  ipcAnalogue: "epoll(7) EPOLLET edge-triggered event notification",
  isMetaphor: true,
};

export const BP5_RF_MMW: BioplasmaPathway = {
  code: "BP5",
  sigma: 0.60,
  status: "indicative",
  carrier: "Non-ionising RF/MMW (30 MHz–300 GHz)",
  frequencyRange: "30 MHz–300 GHz",
  plasmaLiteralness: "field-coherence-analogy",
  lineageosPath:
    "hardware/interfaces/thermal/aidl/IThermal.aidl · android_hardware_lineage_interfaces",
  organelleRoute: {
    source: "cell-membrane",
    target: "mitochondria",
    direction: "inward",
  },
  ipcAnalogue: "AIDL IThermal / ISensors callback (frequency-gated)",
  isMetaphor: true,
};

export const BP6_FROHLICH: BioplasmaPathway = {
  code: "BP6",
  sigma: 0.45,
  status: "speculative",
  carrier: "Coherent GHz dipole oscillation (Fröhlich condensate)",
  frequencyRange: "100 MHz–10 GHz",
  plasmaLiteralness: "field-coherence-analogy",
  lineageosPath: "frameworks/native/libs/binder/ProcessState.cpp",
  organelleRoute: {
    source: "mitochondria",
    target: "cytoskeleton",
    direction: "outward",
  },
  ipcAnalogue: "VSYNC Choreographer coherent frame cadence (speculative analogue)",
  isMetaphor: true,
};

export const BP7_VMEM_PATTERN: BioplasmaPathway = {
  code: "BP7",
  sigma: 0.72,
  status: "indicative",
  carrier: "Long-range bioelectric morphogenetic Vmem pattern",
  frequencyRange: "DC (persistent)",
  plasmaLiteralness: "electrolyte-analogy",
  lineageosPath: "packages/apps/LineageParts · android_packages_apps_LineageParts",
  organelleRoute: {
    source: "nucleus",
    target: "broadcast",
    direction: "broadcast",
  },
  ipcAnalogue: "SettingsProvider + LineageParts (Vmem writer on boot)",
  isMetaphor: false,
};

/**
 * BP8 — QED Water Coherence (RESERVED).
 * σ = 0.32 — no LineageOS implementation exists.
 * This constant is exported for type-safety and display only.
 * bioplasmaSignal() will return early for this pathway.
 */
export const BP8_QED_WATER: BioplasmaPathway = {
  code: "BP8",
  sigma: 0.32,
  status: "reserved",
  carrier: "Quantum coherence domains in structured water (QED)",
  frequencyRange: "THz (theoretical)",
  plasmaLiteralness: "field-coherence-analogy",
  lineageosPath: null,
  organelleRoute: {
    source: "cytoplasm",
    target: "cytoplasm",
    direction: "readonly",
  },
  ipcAnalogue: "Reserved — no LineageOS implementation",
  isMetaphor: true,
};

/**
 * BP9 — THz Telemetry (READ-ONLY).
 * Maps to StatsD / perfetto / dumpsys.
 * NEVER drives routing or organelle state changes.
 * direction === "readonly" guard enforced in bioplasmaSignal().
 */
export const BP9_THZ_TELEMETRY: BioplasmaPathway = {
  code: "BP9",
  sigma: 0.50,
  status: "indicative",
  carrier: "THz refractive-index phenotype (aqueous dielectric contrast)",
  frequencyRange: "300 GHz–3 THz",
  plasmaLiteralness: "field-coherence-analogy",
  lineageosPath:
    "packages/modules/StatsD · external/perfetto · frameworks/native/cmds/dumpsys/",
  organelleRoute: {
    source: "cytoskeleton",
    target: "cytoplasm",
    direction: "readonly",
  },
  ipcAnalogue: "StatsD / perfetto / dumpsys (read-only diagnostic telemetry)",
  isMetaphor: true,
};

export const BIOPLASMA_PATHWAYS: BioplasmaPathway[] = [
  BP1_RESTING_POTENTIAL,
  BP2_ACTION_POTENTIAL,
  BP3_WOUND_FIELD,
  BP4_ELF_COUPLING,
  BP5_RF_MMW,
  BP6_FROHLICH,
  BP7_VMEM_PATTERN,
  BP8_QED_WATER,
  BP9_THZ_TELEMETRY,
];

export const BIOPLASMA_BY_CODE: Record<string, BioplasmaPathway> = Object.fromEntries(
  BIOPLASMA_PATHWAYS.map((p) => [p.code, p])
);

/**
 * Pathways with active runtime implementations.
 * Excludes BP6 (speculative, deferred) and BP8 (reserved, no impl).
 */
export const IMPLEMENTED_BIOPLASMA_PATHWAYS: BioplasmaPathway[] = [
  BP1_RESTING_POTENTIAL,
  BP2_ACTION_POTENTIAL,
  BP3_WOUND_FIELD,
  BP4_ELF_COUPLING,
  BP5_RF_MMW,
  BP7_VMEM_PATTERN,
  BP9_THZ_TELEMETRY,
];
