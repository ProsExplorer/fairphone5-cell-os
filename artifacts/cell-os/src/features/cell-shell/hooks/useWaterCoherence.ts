import { useEffect, useRef } from "react";
import { useCellVitalStore } from "@/features/cell-shell/state/useCellVitalStore";
import { BP8_QED_WATER } from "@/domain/content/bioplasmaPathways";

/**
 * useWaterCoherence — BP8 QED Water Coherence (σ=0.45, speculative — promoted June 2026)
 *
 * Biological analogue: QED coherence domains (~100 nm) in interfacial water
 * at hydrophilic surfaces — discrete, phase-coherent, collectively oscillating
 * molecular ensembles without a central oscillator.
 *
 * LineageOS source: drivers/soc/qcom/smem_coherence.c
 *   (android_kernel_fairphone_qcm6490 — proposed fork, see BP8_SMEM_COHERENCE_DESIGN.md)
 *
 * Kernel/HAL path (Stage 3, real hardware):
 *   smem_coherence.c → sysfs /sys/kernel/cellos/smem_coherence
 *   → IWaterCoherence AIDL HAL → this hook
 *
 * SPA browser simulation (Stage 1 — synthetic CI):
 *   CI is approximated from three proxy signals available in the browser:
 *   1. Heap pressure: high heap usage → reduced SMEM-analogous coherence
 *   2. Page visibility: hidden tabs → reduced active coordination
 *   3. Circadian offset: peak-hour CPU availability proxy (~sine wave over 24h)
 *   All three are combined into a dimensionless CI in [0.0, 1.0].
 *
 * Signal emission (speculative-tier weight):
 *   BP8_QED_WATER.organelleRoute.direction === "readonly" — bioplasmaSignal()
 *   Guard 2 would return early. This hook bypasses bioplasmaSignal() entirely
 *   and calls emitSignal() directly on the "cytoplasm" zone.
 *
 *   Amplitude: CI × SPECULATIVE_WEIGHT = CI × (σ × 0.10) = CI × 0.045
 *   This is the correct architecture for a readonly pathway that still contributes
 *   a low-weight observable: emitSignal writes directly to the zone signal map
 *   without routing decisions or broadcast fan-out.
 *
 * Authority: BIOPLASMA_RESEARCH.md §5.9 (σ record) · BP8_SMEM_COHERENCE_DESIGN.md §5 (evidence)
 * Next elevation (σ→0.50, indicative): direct THz-TDS CD resonance in mammalian cells.
 */

const POLL_INTERVAL_MS = 4000;

/** Speculative-tier weight: σ × 0.10 = 0.45 × 0.10 = 0.045 */
const SPECULATIVE_WEIGHT = BP8_QED_WATER.sigma * 0.10;

function computeSyntheticCI(): number {
  const perf = performance as Performance & {
    memory?: { usedJSHeapSize: number; jsHeapSizeLimit: number };
  };

  const heapPressure = perf.memory
    ? perf.memory.usedJSHeapSize / perf.memory.jsHeapSizeLimit
    : 0.3;

  const visibilityFactor = document.visibilityState === "visible" ? 1.0 : 0.4;

  const hour = new Date().getHours() + new Date().getMinutes() / 60;
  const circadian = 0.5 + 0.5 * Math.sin(((hour - 6) / 24) * 2 * Math.PI);

  const raw = (1 - heapPressure) * 0.5 + visibilityFactor * 0.3 + circadian * 0.2;
  return Math.max(0, Math.min(1, raw));
}

export function useWaterCoherence(): void {
  const emitSignal = useCellVitalStore((s) => s.emitSignal);
  const lastCIRef = useRef<number>(0);

  useEffect(() => {
    const id = setInterval(() => {
      const ci = computeSyntheticCI();

      // Debounce: skip if CI changed by less than 5% since last emission.
      if (Math.abs(ci - lastCIRef.current) < 0.05) return;
      lastCIRef.current = ci;

      // Emit at speculative weight: CI × σ × 0.10 = CI × 0.045.
      // Direct emitSignal call — not bioplasmaSignal — because BP8 direction === "readonly".
      // Target zone: cytoplasm (BP8_QED_WATER.organelleRoute.source).
      emitSignal("cytoplasm", "bioplasma", ci * SPECULATIVE_WEIGHT, POLL_INTERVAL_MS);
    }, POLL_INTERVAL_MS);

    return () => clearInterval(id);
  }, [emitSignal]);
}
