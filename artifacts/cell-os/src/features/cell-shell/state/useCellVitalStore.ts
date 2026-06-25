import { create } from "zustand";
import type { CellZoneId, BioplasmaPathway } from "@/domain/types";
import { getZoneForOrganelle } from "@/features/learning/hebbianAdapter";

// ─── Signal types ─────────────────────────────────────────────────────────────

export type SignalType =
  | "pulse"      // generic zone activity
  | "sacred"     // SHA-256 breath seal — nucleus
  | "inference"  // EdgeNode start/wave
  | "atp"        // mitochondria token production
  | "token"      // ribosome/golgi token emission
  | "error"      // ER stress / membrane attenuation
  | "bioplasma"; // endogenous EM field signal (BP1–BP9)

export type InferencePhase = "idle" | "loading" | "running" | "complete" | "error";

type ZoneSignal = {
  type: SignalType;
  /** 0–1 intensity, drives glow strength. */
  intensity: number;
  expiresAt: number; // Date.now() + ttl, or Infinity for baselines
};

// All 8 canonical zones — used for broadcast fan-out.
const ALL_ZONES: CellZoneId[] = [
  "nucleus", "cytoplasm", "cytoskeleton", "ribosomes",
  "mitochondria", "golgi", "endoplasmic-reticulum", "membrane",
];

// ─── Store shape ──────────────────────────────────────────────────────────────

export type CellVitalState = {
  activeZoneId: CellZoneId;
  inferencePhase: InferencePhase;
  breathCount: number;
  /** Transient TTL signals — keyed by zone. Cleared by clearExpiredSignals(). */
  signals: Partial<Record<CellZoneId, ZoneSignal>>;
  /**
   * Permanent baseline intensities (0–1) per zone.
   * Set by initBP1Baseline() and restored by clearExpiredSignals() whenever
   * a transient signal expires and would leave the zone dark.
   * This prevents the BP1 resting-potential glow from disappearing when a
   * finite-TTL signal (navigation pulse, BP2) overwrites and then expires.
   */
  bioplasmaBaseline: Partial<Record<CellZoneId, number>>;

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

  /**
   * Call periodically (e.g. every 500ms) to purge expired signals.
   * After purging, any zone whose signal expired is restored to its
   * bioplasmaBaseline intensity if one exists — preserving the BP1 membrane glow.
   */
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

  /**
   * Emit a bioplasma field signal for a given pathway.
   *
   * Guards (both enforced here — never remove):
   *   1. status === "reserved" → return immediately (no pathway currently uses this; BP8 is now "speculative")
   *   2. direction === "readonly" → return immediately (BP9: diagnostic only; BP8: SMEM sysfs read via useWaterCoherence hook, not bioplasmaSignal)
   *
   * Intensity is σ-weighted and clamped to [0,1]:
   *   weightedIntensity = clamp(intensity × σ, 0, 1)
   *
   * Broadcast routing (direction === "broadcast"):
   *   Fans out to all 8 zones at attenuated intensity (× 0.55).
   *   If the source is a resolved organelle, its zone receives full intensity.
   *   This correctly implements BP1 (broadcast from membrane) and BP3
   *   (system-wide wound field where source === "broadcast").
   *
   * Point-to-point routing:
   *   Source zone receives full intensity; target zone receives 70% with +500ms delay.
   *
   * ttlMs defaults to 1500ms. Pass Infinity for always-on signals (BP1 baseline).
   */
  bioplasmaSignal: (pathway: BioplasmaPathway, intensity?: number, ttlMs?: number) => void;

  /**
   * Initialise (or update) the BP1 resting potential baseline.
   * Called once on mount — creates a non-expiring membrane glow.
   * Also records the intensity in bioplasmaBaseline so clearExpiredSignals()
   * can restore the glow after any transient signal overwrites it.
   *
   * @param profileIntensity Defaults to 0.22 (balanced Vmem profile).
   *   Pass 0.10 for "cool" (hyperpolarised) or 0.38 for "performance" (depolarised).
   */
  initBP1Baseline: (profileIntensity?: number) => void;
};

// ─── Store ────────────────────────────────────────────────────────────────────

export const useCellVitalStore = create<CellVitalState>((set) => ({
  activeZoneId: "cytoplasm",
  inferencePhase: "idle",
  breathCount: 0,
  signals: {},
  bioplasmaBaseline: {},

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

      // Keep all non-expired signals.
      for (const key of Object.keys(s.signals) as CellZoneId[]) {
        const sig = s.signals[key];
        if (sig && sig.expiresAt > now) next[key] = sig;
      }

      // Restore baseline signals for any zone that just went dark.
      // This ensures BP1's membrane glow survives being overwritten by a
      // finite-TTL transient (navigation pulse, BP2, inference signal).
      for (const key of Object.keys(s.bioplasmaBaseline) as CellZoneId[]) {
        if (!next[key]) {
          const baselineIntensity = s.bioplasmaBaseline[key];
          if (baselineIntensity !== undefined) {
            next[key] = {
              type: "bioplasma",
              intensity: baselineIntensity,
              expiresAt: Infinity,
            };
          }
        }
      }

      return { signals: next };
    }),

  sacredPulse: (breathCount) =>
    set((s) => ({
      breathCount,
      signals: {
        ...s.signals,
        nucleus:   { type: "sacred", intensity: 0.9,  expiresAt: Date.now() + 3500 },
        cytoplasm: { type: "pulse",  intensity: 0.45, expiresAt: Date.now() + 2200 },
      },
    })),

  inferenceStart: () =>
    set((s) => ({
      inferencePhase: "running",
      signals: {
        ...s.signals,
        membrane:  { type: "inference", intensity: 1,   expiresAt: Date.now() + 1800 },
        nucleus:   { type: "inference", intensity: 0.8, expiresAt: Date.now() + 1400 },
        cytoplasm: { type: "inference", intensity: 0.5, expiresAt: Date.now() + 1000 },
      },
    })),

  tokenEmit: () =>
    set((s) => ({
      signals: {
        ...s.signals,
        mitochondria: { type: "atp",   intensity: 1,    expiresAt: Date.now() + 900 },
        golgi:        { type: "token", intensity: 0.75, expiresAt: Date.now() + 700 },
        ribosomes:    { type: "token", intensity: 0.65, expiresAt: Date.now() + 800 },
      },
    })),

  inferenceComplete: () =>
    set((s) => ({
      inferencePhase: "complete",
      signals: {
        ...s.signals,
        membrane: { type: "pulse", intensity: 0.9, expiresAt: Date.now() + 2500 },
        golgi:    { type: "pulse", intensity: 0.6, expiresAt: Date.now() + 1800 },
      },
    })),

  inferenceError: () =>
    set((s) => ({
      inferencePhase: "error",
      signals: {
        ...s.signals,
        "endoplasmic-reticulum": { type: "error", intensity: 1,   expiresAt: Date.now() + 3500 },
        membrane:                { type: "error", intensity: 0.7, expiresAt: Date.now() + 2500 },
      },
    })),

  bioplasmaSignal: (pathway, intensity = 1.0, ttlMs = 1500) => {
    // Guard 1 — reserved-tier gate (no pathway currently uses this; BP8 is now "speculative").
    if (pathway.status === "reserved") return;
    // Guard 2 — read-only pathways never drive routing (BP9; BP8 uses useWaterCoherence hook directly).
    if (pathway.organelleRoute.direction === "readonly") return;

    // σ-weighted intensity, clamped to [0, 1].
    const weightedIntensity = Math.min(1, Math.max(0, intensity * pathway.sigma));

    set((s) => {
      const next = { ...s.signals };

      if (pathway.organelleRoute.direction === "broadcast") {
        // Fan-out: emit to every zone at attenuated intensity.
        // This correctly handles BP1 (membrane broadcast) and BP3 (wound field
        // where source is "broadcast" — no organelle origin).
        for (const zoneId of ALL_ZONES) {
          next[zoneId] = {
            type: "bioplasma",
            intensity: weightedIntensity * 0.55,
            expiresAt: Date.now() + ttlMs,
          };
        }
        // If the source is a real organelle (not "broadcast"), boost its zone
        // to full intensity — it is the origin of the field, not just a recipient.
        const sourceZone = getZoneForOrganelle(pathway.organelleRoute.source) as CellZoneId | null;
        if (sourceZone) {
          next[sourceZone] = {
            type: "bioplasma",
            intensity: weightedIntensity,
            expiresAt: Date.now() + ttlMs,
          };
        }
      } else {
        // Point-to-point signal (inward, outward, bidirectional).
        const sourceZone = getZoneForOrganelle(pathway.organelleRoute.source) as CellZoneId | null;
        const targetZone =
          pathway.organelleRoute.target !== "broadcast"
            ? (getZoneForOrganelle(pathway.organelleRoute.target) as CellZoneId | null)
            : null;

        if (sourceZone) {
          next[sourceZone] = {
            type: "bioplasma",
            intensity: weightedIntensity,
            expiresAt: Date.now() + ttlMs,
          };
        }
        if (targetZone) {
          next[targetZone] = {
            type: "bioplasma",
            intensity: weightedIntensity * 0.7,
            expiresAt: Date.now() + ttlMs + 500,
          };
        }
      }

      return { signals: next };
    });
  },

  initBP1Baseline: (profileIntensity = 0.22) =>
    set((s) => ({
      // Record in baseline map so clearExpiredSignals() can restore the glow.
      bioplasmaBaseline: {
        ...s.bioplasmaBaseline,
        membrane: profileIntensity,
      },
      // Also write the live signal immediately.
      signals: {
        ...s.signals,
        membrane: {
          type: "bioplasma",
          intensity: profileIntensity,
          expiresAt: Infinity,
        },
      },
    })),
}));
