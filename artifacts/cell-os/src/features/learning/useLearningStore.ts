import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

/**
 * The Epigenome — session-persistent learning state for Cell OS.
 *
 * Unlike the genome (domain/types.ts), which never changes, the epigenome
 * accumulates modifications from the organism's interaction with its
 * environment. It persists across sessions via localStorage.
 *
 * Three tensors are updated through use:
 *   1. organelleVisits  — rank-1 field: how often each organelle has been
 *      clicked (Hebbian firing frequency).
 *   2. coActivations    — rank-2 field: how often pairs of organelles have
 *      been visited within WINDOW_MS of each other (Hebbian wiring strength).
 *      Key: "a|b" sorted lexically so a|b === b|a.
 *   3. substrateEngagement — rank-1 field: how often each substrate node
 *      has been click-selected. Used to compute fractional σ boosts.
 *
 * See hebbianAdapter.ts for the pure functions that derive manifold
 * adaptations from these tensors.
 */

const COACTIVATION_WINDOW_MS = 5000;

type PersistedState = {
  organelleVisits: Record<string, number>;
  coActivations: Record<string, number>;
  substrateEngagement: Record<string, number>;
  /**
   * Zone × TriadPhase exploration tensor (rank-2, sparse).
   * Key: "${zoneId}|${phase}" where phase ∈ {"perception","affect","expression"}.
   * Maps onto the QI rank-3 tensor Q^{z,p,s} (MANIFOLD_ANALYSIS.md §2.5) —
   * this field accumulates the (zone, phase) marginal from user interaction.
   */
  zonePhaseExploration: Record<string, number>;
  totalInteractions: number;
};

export type LearningState = PersistedState & {
  _lastOrganelleId: string | null;
  _lastOrganelleTsMs: number;

  recordOrganelleVisit: (id: string) => void;
  recordSubstrateEngagement: (id: string) => void;
  /**
   * Record a zone-phase observation. Does NOT increment totalInteractions —
   * zone navigation is structural context, not a deliberate engagement event.
   * Only called through useMembraneObserver.
   */
  recordZonePhase: (zoneId: string, phase: "perception" | "affect" | "expression") => void;
  reset: () => void;
};

const BLANK: PersistedState = {
  organelleVisits: {},
  coActivations: {},
  substrateEngagement: {},
  zonePhaseExploration: {},
  totalInteractions: 0,
};

export const useLearningStore = create<LearningState>()(
  persist(
    (set, get) => ({
      ...BLANK,
      _lastOrganelleId: null,
      _lastOrganelleTsMs: 0,

      recordOrganelleVisit: (id) => {
        const now = Date.now();
        const {
          _lastOrganelleId,
          _lastOrganelleTsMs,
          organelleVisits,
          coActivations,
          totalInteractions,
        } = get();

        const nextVisits = {
          ...organelleVisits,
          [id]: (organelleVisits[id] ?? 0) + 1,
        };

        const nextCoActivations = { ...coActivations };
        if (
          _lastOrganelleId &&
          _lastOrganelleId !== id &&
          now - _lastOrganelleTsMs < COACTIVATION_WINDOW_MS
        ) {
          const pair = [_lastOrganelleId, id].sort().join("|");
          nextCoActivations[pair] = (nextCoActivations[pair] ?? 0) + 1;
        }

        set({
          organelleVisits: nextVisits,
          coActivations: nextCoActivations,
          totalInteractions: totalInteractions + 1,
          _lastOrganelleId: id,
          _lastOrganelleTsMs: now,
        });
      },

      recordSubstrateEngagement: (id) => {
        const { substrateEngagement, totalInteractions } = get();
        set({
          substrateEngagement: {
            ...substrateEngagement,
            [id]: (substrateEngagement[id] ?? 0) + 1,
          },
          totalInteractions: totalInteractions + 1,
        });
      },

      recordZonePhase: (zoneId, phase) => {
        const { zonePhaseExploration } = get();
        const key = `${zoneId}|${phase}`;
        set({
          zonePhaseExploration: {
            ...zonePhaseExploration,
            [key]: (zonePhaseExploration[key] ?? 0) + 1,
          },
        });
      },

      reset: () =>
        set({ ...BLANK, _lastOrganelleId: null, _lastOrganelleTsMs: 0 }),
    }),
    {
      name: "cell-os-epigenome-v1",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({
        organelleVisits:      s.organelleVisits,
        coActivations:        s.coActivations,
        substrateEngagement:  s.substrateEngagement,
        zonePhaseExploration: s.zonePhaseExploration,
        totalInteractions:    s.totalInteractions,
      }),
    }
  )
);
