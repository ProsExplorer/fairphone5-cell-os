import { useMemo, useReducer } from "react";
import type { Organelle, SubstrateNode, BiophotonLink } from "@/domain/types";
import {
  getOrganelle,
  getSubstrateNode,
  getSubstrateForOrganelle,
  getOrganellesForSubstrate,
  getBiophotonLinks
} from "./selectors";

/**
 * useExplorerFlow — the triadic orchestrator.
 *
 * PERCEPTION: input intents arrive through `perceive` (hover, toggle, select).
 * AFFECT:     the reducer derives the next focus with early returns and no
 *             deep nesting, and pure selectors derive the view.
 * EXPRESSION: a read-only `view` model flows out to the presentational layer.
 *
 * The page component holds no business logic; it only wires perception to
 * expression. Focus is a single discriminated union that points at either an
 * organelle or a substrate node.
 *
 * ── Lock semantics ─────────────────────────────────────────────────────────
 * `locked: false` → hover mode: HOVER_ORGANELLE(null) resets focus (transient).
 * `locked: true`  → click mode: hover events are ignored; focus persists until
 *                   the user clicks the same item again (toggle-off) or clicks
 *                   a different item (replace lock).
 *
 * This prevents the common bug where mouseLeave fires immediately after a click,
 * wiping the click-lock and reverting the info panel to the empty state.
 */

type Focus =
  | { kind: "none" }
  | { kind: "organelle"; id: string }
  | { kind: "substrate"; id: string };

type ExplorerState = {
  focus: Focus;
  /** True when focus was set by a click — hover events are suppressed. */
  locked: boolean;
};

type ExplorerAction =
  | { type: "HOVER_ORGANELLE"; id: string | null }
  | { type: "TOGGLE_ORGANELLE"; id: string }
  | { type: "TOGGLE_SUBSTRATE"; id: string }
  | { type: "CLEAR" };

const INITIAL_STATE: ExplorerState = { focus: { kind: "none" }, locked: false };

function reducer(state: ExplorerState, action: ExplorerAction): ExplorerState {
  switch (action.type) {
    case "HOVER_ORGANELLE": {
      // When locked by a click, ignore all hover events — the click lock
      // takes priority over transient hover previews.
      if (state.locked) return state;
      if (!action.id) return INITIAL_STATE;
      return { focus: { kind: "organelle", id: action.id }, locked: false };
    }

    case "TOGGLE_ORGANELLE": {
      // Toggle-off: clicking the already-locked organelle releases the lock.
      const alreadyLocked =
        state.locked &&
        state.focus.kind === "organelle" &&
        state.focus.id === action.id;
      if (alreadyLocked) return INITIAL_STATE;
      // Toggle-on / replace: lock focus on this organelle.
      return { focus: { kind: "organelle", id: action.id }, locked: true };
    }

    case "TOGGLE_SUBSTRATE": {
      const alreadyLocked =
        state.locked &&
        state.focus.kind === "substrate" &&
        state.focus.id === action.id;
      if (alreadyLocked) return INITIAL_STATE;
      return { focus: { kind: "substrate", id: action.id }, locked: true };
    }

    case "CLEAR":
      return INITIAL_STATE;

    default:
      return state;
  }
}

export type ExplorerView = {
  /** The organelle to detail, when an organelle is in focus. */
  activeOrganelle: Organelle | null;
  /** The substrate node to detail, when a substrate node is in focus. */
  activeSubstrate: SubstrateNode | null;
  /** Organelle ids the cell diagram should highlight (one, or all reverse links). */
  activeOrganelleIds: Set<string>;
  /** Substrate nodes linked to the focused organelle, for the info panel. */
  relatedSubstrate: SubstrateNode[];
  /** Organelles linked to the focused substrate, for the reverse info panel. */
  relatedOrganelles: Organelle[];
  /** Biophoton links involving the currently focused organelle(s). */
  relatedBiophotonLinks: BiophotonLink[];
  isSubstrateHighlighted: (substrateId: string) => boolean;
  isOrganelleHighlighted: (organelleId: string) => boolean;
  hasFocus: boolean;
  /** True when focus is click-locked — hover events are suppressed. */
  isLocked: boolean;
};

export type ExplorerPerception = {
  hoverOrganelle: (id: string | null) => void;
  toggleOrganelle: (id: string) => void;
  toggleSubstrate: (id: string) => void;
  clear: () => void;
};

export function useExplorerFlow(): { view: ExplorerView; perceive: ExplorerPerception } {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const view = useMemo<ExplorerView>(() => {
    const { focus, locked } = state;

    if (focus.kind === "organelle") {
      const activeOrganelle = getOrganelle(focus.id);
      const relatedSubstrate = getSubstrateForOrganelle(focus.id);
      const highlightedSubstrate = new Set(relatedSubstrate.map((node) => node.id));
      const activeOrganelleIds = activeOrganelle ? new Set([activeOrganelle.id]) : new Set<string>();
      return {
        activeOrganelle,
        activeSubstrate: null,
        activeOrganelleIds,
        relatedSubstrate,
        relatedOrganelles: [],
        relatedBiophotonLinks: getBiophotonLinks(activeOrganelleIds),
        isSubstrateHighlighted: (substrateId) => highlightedSubstrate.has(substrateId),
        isOrganelleHighlighted: (organelleId) => organelleId === focus.id,
        hasFocus: true,
        isLocked: locked,
      };
    }

    if (focus.kind === "substrate") {
      const activeSubstrate = getSubstrateNode(focus.id);
      const relatedOrganelles = getOrganellesForSubstrate(focus.id);
      const highlightedOrganelles = new Set(relatedOrganelles.map((organelle) => organelle.id));
      return {
        activeOrganelle: null,
        activeSubstrate,
        activeOrganelleIds: highlightedOrganelles,
        relatedSubstrate: [],
        relatedOrganelles,
        relatedBiophotonLinks: getBiophotonLinks(highlightedOrganelles),
        isSubstrateHighlighted: (substrateId) => substrateId === focus.id,
        isOrganelleHighlighted: (organelleId) => highlightedOrganelles.has(organelleId),
        hasFocus: true,
        isLocked: locked,
      };
    }

    return {
      activeOrganelle: null,
      activeSubstrate: null,
      activeOrganelleIds: new Set<string>(),
      relatedSubstrate: [],
      relatedOrganelles: [],
      relatedBiophotonLinks: [],
      isSubstrateHighlighted: () => false,
      isOrganelleHighlighted: () => false,
      hasFocus: false,
      isLocked: false,
    };
  }, [state]);

  const perceive = useMemo<ExplorerPerception>(
    () => ({
      hoverOrganelle: (id) => dispatch({ type: "HOVER_ORGANELLE", id }),
      toggleOrganelle: (id) => dispatch({ type: "TOGGLE_ORGANELLE", id }),
      toggleSubstrate: (id) => dispatch({ type: "TOGGLE_SUBSTRATE", id }),
      clear: () => dispatch({ type: "CLEAR" })
    }),
    []
  );

  return { view, perceive };
}
