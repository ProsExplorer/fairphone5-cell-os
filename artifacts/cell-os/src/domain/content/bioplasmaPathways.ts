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
  sigma: 0.70,
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
    "hardware/lineage/interfaces/thermal/ · android_hardware_lineage_interfaces",
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
 * σ = 0.32 — biological evidence governs σ; SMEM is the implementation candidate
 * but does not raise σ or status. bioplasmaSignal() returns early for reserved.
 *
 * Stage 1: lineageosPath set to proposed driver path.
 * Stage 2: smem_coherence.c kernel driver (qcom_smem_get() probe approach).
 * Stage 3: IWaterCoherence AIDL HAL + real sysfs→HAL→hook path.
 *
 * See BP8_SMEM_COHERENCE_DESIGN.md for the full fork specification.
 */
export const BP8_QED_WATER: BioplasmaPathway = {
  code: "BP8",
  sigma: 0.32,
  status: "reserved",
  carrier: "QED coherent EM mode (interfacial water coherence domains)",
  frequencyRange: "THz range (estimated); QED resonance",
  plasmaLiteralness: "field-coherence-analogy",
  lineageosPath: "drivers/soc/qcom/smem_coherence.c · android_kernel_fairphone_qcm6490",
  organelleRoute: {
    source: "cytoplasm",
    target: "broadcast",
    direction: "readonly",
  },
  ipcAnalogue:
    "Qualcomm SMEM inter-processor shared memory substrate — strongest available implementation candidate for BP8 (isMetaphor: frequency gap; structural rows are genuine)",
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

/**
 * BP12 — Circadian Clock Oscillation.
 * CLOCK/BMAL1 transcription-translation feedback loop — the best-characterised
 * molecular oscillator in biology (Nobel Prize Physiology 2017). Maps to
 * Android's time-domain scheduling infrastructure: AlarmManager delivers
 * circadian-period wake events, JobScheduler applies periodic constraints, and
 * the kernel's NO_HZ tick suspension mirrors the low-metabolic trough phase.
 * σ = 0.88 (Verified) — replicated across nearly all eukaryotes; mechanism
 * resolved at atomic level (CRY/PER co-crystal, period-tuning feedback loops).
 */
export const BP12_CIRCADIAN_CLOCK: BioplasmaPathway = {
  code: "BP12",
  sigma: 0.88,
  status: "verified",
  carrier: "CLOCK/BMAL1 transcription-translation feedback oscillation (~24 h)",
  frequencyRange: "~0.000012 Hz (≈24 h period); harmonics at ultradian ~90 min",
  plasmaLiteralness: "electrolyte-analogy",
  lineageosPath:
    "frameworks/base/services/core/java/com/android/server/alarm/AlarmManagerService.java · android_frameworks_base",
  organelleRoute: {
    source: "nucleus",
    target: "broadcast",
    direction: "broadcast",
  },
  ipcAnalogue:
    "Android AlarmManager setExactAndAllowWhileIdle + JobScheduler setPeriodic (circadian scheduler — nucleus broadcasts periodic gene-expression phase to all cellular subsystems)",
  isMetaphor: false,
};

/**
 * BP13 — Liquid-Liquid Phase Separation (LLPS) / Biomolecular Condensates.
 * Intrinsically disordered regions (IDRs) in RNA-binding proteins drive
 * concentration-dependent demixing into membraneless organelles: stress granules,
 * P-bodies, nucleoli, transcription hubs. Explosion of evidence 2018-2025.
 * OS analogue: Android cgroup memory-tier separation + Linux NUMA zone affinity
 * policy — the kernel partitions process memory into "phases" (hot/warm/cold)
 * without hard boundaries, exactly as IDRs partition the cytoplasm into
 * condensed vs dilute phases without membrane walls.
 * σ = 0.72 (Indicative) — mechanism well-demonstrated in vitro; in-vivo
 * condensate function (signalling vs. aggregation) still under active study.
 */
export const BP13_PHASE_SEPARATION: BioplasmaPathway = {
  code: "BP13",
  sigma: 0.72,
  status: "indicative",
  carrier: "IDR-driven liquid-liquid phase separation (concentration-dependent condensation)",
  frequencyRange: "DC (persistent state); assembly/disassembly ~seconds–minutes",
  plasmaLiteralness: "electrolyte-analogy",
  lineageosPath:
    "kernel/mm/memcontrol.c (cgroup memory tier) · kernel/mm/mempolicy.c (NUMA zone) · android_kernel_fairphone_qcm6490",
  organelleRoute: {
    source: "nucleus",
    target: "cytoplasm",
    direction: "outward",
  },
  ipcAnalogue:
    "Android memory cgroup tier separation + NUMA zone affinity — hard-boundary-free partitioning of memory into hot/warm/cold tiers mirrors IDR condensate demixing",
  isMetaphor: true,
};

/**
 * BP14 — Calcium Spark / Oscillation (IP3R ER Release).
 * Stochastic IP3R-gated Ca²⁺ release from ER lumen → Ca²⁺-induced Ca²⁺
 * release (CICR) via RyR propagation → global cytoplasmic Ca²⁺ oscillations
 * (0.1–10 Hz). One of the most thoroughly patch-clamp-characterised signals
 * in cell biology. OS analogue: Linux NO_HZ_FULL timer coalescing + IRQ
 * affinity batching — stochastic individual timer events coalesce into
 * periodic batch delivery exactly as Ca²⁺ sparks sum to global oscillations.
 * σ = 0.82 (Verified upper) — IP3R/RyR gating kinetics resolved by cryo-EM;
 * CICR mechanism replicated across muscle, neuron, non-excitable cells.
 */
export const BP14_CALCIUM_SPARK: BioplasmaPathway = {
  code: "BP14",
  sigma: 0.82,
  status: "verified",
  carrier: "IP3R-gated Ca²⁺ spark → CICR global oscillation (RyR amplification)",
  frequencyRange: "0.1–10 Hz (Ca²⁺ oscillations); individual spark duration ~20 ms",
  plasmaLiteralness: "electrolyte-analogy",
  lineageosPath:
    "kernel/time/tick-sched.c · kernel/irq/chip.c (NO_HZ_FULL coalescing) · android_kernel_fairphone_qcm6490",
  organelleRoute: {
    source: "endoplasmic-reticulum",
    target: "broadcast",
    direction: "broadcast",
  },
  ipcAnalogue:
    "Linux NO_HZ_FULL timer coalescing + IRQ affinity batching (stochastic sparks coalesce into periodic burst delivery; ER-release = kernel timer; CICR amplification = IRQ cascade)",
  isMetaphor: false,
};

export const BIOPLASMA_PATHWAYS: BioplasmaPathway[] = [
  BP1_RESTING_POTENTIAL,
  BP2_ACTION_POTENTIAL,
  BP12_CIRCADIAN_CLOCK,
  BP3_WOUND_FIELD,
  BP14_CALCIUM_SPARK,
  BP4_ELF_COUPLING,
  BP5_RF_MMW,
  BP13_PHASE_SEPARATION,
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
 * Excludes BP6 (speculative, deferred), BP8 (reserved, no impl),
 * and BP13 (metaphor — LLPS condensate; no direct Android sensor path).
 */
export const IMPLEMENTED_BIOPLASMA_PATHWAYS: BioplasmaPathway[] = [
  BP1_RESTING_POTENTIAL,
  BP2_ACTION_POTENTIAL,
  BP12_CIRCADIAN_CLOCK,
  BP3_WOUND_FIELD,
  BP14_CALCIUM_SPARK,
  BP4_ELF_COUPLING,
  BP5_RF_MMW,
  BP7_VMEM_PATTERN,
  BP9_THZ_TELEMETRY,
];
