import { useEffect, useRef } from "react";
import { useCellVitalStore } from "@/features/cell-shell/state/useCellVitalStore";
import { BP4_ELF_COUPLING } from "@/domain/content/bioplasmaPathways";

/**
 * useELFResonance — BP4 ELF Coupling (σ=0.65, indicative)
 *
 * Biological analogue: external ELF (0.01–300 Hz) magnetic fields
 * gate ion channels via stochastic resonance — the signal is below
 * thermal noise threshold but becomes detectable when the field
 * "tunes" the channel's gating probability distribution.
 *
 * LineageOS source: fs/eventpoll.c (epoll EPOLLET edge-triggered)
 *
 * SPA analogue: visibilitychange and focus events represent the
 * moment of re-engagement — an edge transition from absent to present,
 * exactly matching epoll EPOLLET semantics (fires once at the edge,
 * not repeatedly on level). Low intensity (σ=0.65 weighted) because
 * this is a metaphorical rather than physiological analogue.
 *
 * Debounced: fires at most once per 8000ms to prevent event flooding.
 * ELF resonance is a slow process; rapid re-firing would be inaccurate.
 */
const ELF_DEBOUNCE_MS = 8000;

export function useELFResonance(): void {
  const bioplasmaSignal = useCellVitalStore((s) => s.bioplasmaSignal);
  const lastFireRef = useRef<number>(0);

  useEffect(() => {
    function fireELF() {
      const now = Date.now();
      if (now - lastFireRef.current < ELF_DEBOUNCE_MS) return;
      lastFireRef.current = now;
      bioplasmaSignal(BP4_ELF_COUPLING, 0.6, 2000);
    }

    function handleVisibility() {
      if (document.visibilityState === "visible") fireELF();
    }

    function handleFocus() {
      fireELF();
    }

    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("focus", handleFocus);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("focus", handleFocus);
    };
  }, [bioplasmaSignal]);
}
