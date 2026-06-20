import { useEffect, useRef } from "react";
import { useCellVitalStore } from "@/features/cell-shell/state/useCellVitalStore";
import { BP5_RF_MMW } from "@/domain/content/bioplasmaPathways";

/**
 * useThermalHAL — BP5 RF/MMW Coupling (σ=0.60, indicative)
 *
 * Biological analogue: non-ionising RF/MMW fields (30 MHz–300 GHz)
 * interact with cellular membrane proteins via dielectric heating
 * and resonant coupling. The Thermal HAL AIDL IThermal interface
 * provides a frequency-gated callback when thermal thresholds are crossed.
 *
 * LineageOS source: hardware/interfaces/thermal/aidl/IThermal.aidl
 *   (android_hardware_lineage_interfaces, verified σ=0.85 for HAL architecture)
 *
 * SPA analogue: performance.memory (if available) and periodic
 * JS heap pressure sampling at a fixed interval — analogous to the
 * thermal HAL sampling the SoC temperature at a hardware cadence.
 * Fires only when memory usage crosses the high-pressure threshold
 * (analogous to the HAL's severity threshold trigger).
 *
 * Sampling interval: 12000ms — HAL thermal callbacks are not continuous;
 * they fire at hardware-defined intervals. Short intervals would be inaccurate.
 * Threshold: 0.75 of jsHeapSizeLimit — proxy for "thermal load".
 */

const SAMPLE_INTERVAL_MS = 12000;
const HEAP_THRESHOLD = 0.75;

export function useThermalHAL(): void {
  const bioplasmaSignal = useCellVitalStore((s) => s.bioplasmaSignal);
  const lastFireRef = useRef<number>(0);

  useEffect(() => {
    const id = setInterval(() => {
      const perf = performance as Performance & {
        memory?: { usedJSHeapSize: number; jsHeapSizeLimit: number };
      };

      if (!perf.memory) return;

      const ratio = perf.memory.usedJSHeapSize / perf.memory.jsHeapSizeLimit;
      if (ratio < HEAP_THRESHOLD) return;

      const now = Date.now();
      if (now - lastFireRef.current < SAMPLE_INTERVAL_MS * 2) return;
      lastFireRef.current = now;

      bioplasmaSignal(BP5_RF_MMW, ratio, 2500);
    }, SAMPLE_INTERVAL_MS);

    return () => clearInterval(id);
  }, [bioplasmaSignal]);
}
