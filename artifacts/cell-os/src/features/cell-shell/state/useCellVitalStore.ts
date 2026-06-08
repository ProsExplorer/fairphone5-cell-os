import { create } from "zustand";
import type { CellZoneId } from "@/domain/types";

// ─── Signal types ─────────────────────────────────────────────────────────────

export type SignalType =
  | "pulse"     // generic zone activity
  | "sacred"    // SHA-256 breath seal — nucleus
  | "inference" // EdgeNode start/wave
  | "atp"       // mitochondria token production
  | "token"     // ribosome/golgi token emission
  | "error";    // ER stress / membrane attenuation

export type InferencePhase = "idle" | "loading" | "running" | "complete" | "error";

type ZoneSignal = {
  type: SignalType;
  /** 0–1 intensity, drives glow strength. */
  intensity: number;
  expiresAt: number; // Date.now() + ttl
};

// ─── Store shape ──────────────────────────────────────────────────────────────

export type CellVitalState = {
  activeZoneId: CellZoneId;
  inferencePhase: InferencePhase;
  breathCount: number;
  /** Transient TTL signals — keyed by zone. Cleared by clearExpiredSignals(). */
  signals: Partial<Record<CellZoneId, ZoneSignal>>;

  // ── Actions ────────────────────────────────────────────────────────────────
  setActiveZone: (zoneId: CellZoneId) => void;
  setBreathCount: (count: number) => void;
  setInferencePhase: (phase: InferencePhase) => void;

  /**
   * Emit a transient pulse signal to a zone.
   * ttlMs defaults to 2000 — enough for a visible animation without accumulating.
   */
  emitSignal: (
    zoneId: CellZoneId,
    type: SignalType,
    intensity?: number,
    ttlMs?: number
  ) => void;

  /** Call periodically (e.g. every 500ms) to purge expired signals. */
  clearExpiredSignals: () => void;

  // ── Composite events ───────────────────────────────────────────────────────

  /**
   * Sacred Signature breath — fires every 7770ms from useSacredSignature.
   * Pulses nucleus (primary), cytoplasm (secondary ripple).
   */
  sacredPulse: (breathCount: number) => void;

  /** EdgeNode inference started — membrane gate opens, nucleus receives. */
  inferenceStart: () => void;

  /** One token emitted — mitochondria ATP spike, golgi dispatch, ribosomes flash. */
  tokenEmit: () => void;

  /** Inference finished — membrane expression ring. */
  inferenceComplete: () => void;

  /** Inference error — ER stress pulse, membrane attenuation. */
  inferenceError: () => void;
};

// ─── Store ────────────────────────────────────────────────────────────────────

export const useCellVitalStore = create<CellVitalState>((set) => ({
  activeZoneId: "cytoplasm",
  inferencePhase: "idle",
  breathCount: 0,
  signals: {},

  setActiveZone: (zoneId) => set({ activeZoneId: zoneId }),

  setBreathCount: (count) => set({ breathCount: count }),

  setInferencePhase: (phase) => set({ inferencePhase: phase }),

  emitSignal: (zoneId, type, intensity = 1, ttlMs = 2000) =>
    set((s) => ({
      signals: {
        ...s.signals,
        [zoneId]: { type, intensity, expiresAt: Date.now() + ttlMs },
      },
    })),

  clearExpiredSignals: () =>
    set((s) => {
      const now = Date.now();
      const next: Partial<Record<CellZoneId, ZoneSignal>> = {};
      for (const key of Object.keys(s.signals) as CellZoneId[]) {
        const sig = s.signals[key];
        if (sig && sig.expiresAt > now) next[key] = sig;
      }
      return { signals: next };
    }),

  sacredPulse: (breathCount) =>
    set((s) => ({
      breathCount,
      signals: {
        ...s.signals,
        nucleus: { type: "sacred", intensity: 0.9, expiresAt: Date.now() + 3500 },
        cytoplasm: { type: "pulse", intensity: 0.45, expiresAt: Date.now() + 2200 },
      },
    })),

  inferenceStart: () =>
    set((s) => ({
      inferencePhase: "running",
      signals: {
        ...s.signals,
        membrane: { type: "inference", intensity: 1, expiresAt: Date.now() + 1800 },
        nucleus: { type: "inference", intensity: 0.8, expiresAt: Date.now() + 1400 },
        cytoplasm: { type: "inference", intensity: 0.5, expiresAt: Date.now() + 1000 },
      },
    })),

  tokenEmit: () =>
    set((s) => ({
      signals: {
        ...s.signals,
        mitochondria: { type: "atp", intensity: 1, expiresAt: Date.now() + 900 },
        golgi: { type: "token", intensity: 0.75, expiresAt: Date.now() + 700 },
        ribosomes: { type: "token", intensity: 0.65, expiresAt: Date.now() + 800 },
      },
    })),

  inferenceComplete: () =>
    set((s) => ({
      inferencePhase: "complete",
      signals: {
        ...s.signals,
        membrane: { type: "pulse", intensity: 0.9, expiresAt: Date.now() + 2500 },
        golgi: { type: "pulse", intensity: 0.6, expiresAt: Date.now() + 1800 },
      },
    })),

  inferenceError: () =>
    set((s) => ({
      inferencePhase: "error",
      signals: {
        ...s.signals,
        "endoplasmic-reticulum": { type: "error", intensity: 1, expiresAt: Date.now() + 3500 },
        membrane: { type: "error", intensity: 0.7, expiresAt: Date.now() + 2500 },
      },
    })),
}));
