import { useMemo, useReducer } from "react";
import type { Organelle, SubstrateNode } from "@/domain/types";
import {
  getOrganelle,
  getSubstrateNode,
  getSubstrateForOrganelle,
  getOrganellesForSubstrate
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
 * expression. Focus is a single value that can point at either an organelle or
 * a substrate node, so cross-highlighting reads the same in both directions and
 * a many-to-many link never collapses to a hidden first match.
 */

type Focus =
  | { kind: "none" }
  | { kind: "organelle"; id: string }
  | { kind: "substrate"; id: string };

type ExplorerState = { focus: Focus };

type ExplorerAction =
  | { type: "HOVER_ORGANELLE"; id: string | null }
  | { type: "TOGGLE_ORGANELLE"; id: string }
  | { type: "TOGGLE_SUBSTRATE"; id: string }
  | { type: "CLEAR" };

const INITIAL_STATE: ExplorerState = { focus: { kind: "none" } };

function reducer(state: ExplorerState, action: ExplorerAction): ExplorerState {
  switch (action.type) {
    case "HOVER_ORGANELLE":
      if (!action.id) return INITIAL_STATE;
      return { focus: { kind: "organelle", id: action.id } };

    case "TOGGLE_ORGANELLE": {
      const active = state.focus.kind === "organelle" && state.focus.id === action.id;
      if (active) return INITIAL_STATE;
      return { focus: { kind: "organelle", id: action.id } };
    }

    case "TOGGLE_SUBSTRATE": {
      const active = state.focus.kind === "substrate" && state.focus.id === action.id;
      if (active) return INITIAL_STATE;
      return { focus: { kind: "substrate", id: action.id } };
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
  isSubstrateHighlighted: (substrateId: string) => boolean;
  isOrganelleHighlighted: (organelleId: string) => boolean;
  hasFocus: boolean;
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
    const { focus } = state;

    if (focus.kind === "organelle") {
      const activeOrganelle = getOrganelle(focus.id);
      const relatedSubstrate = getSubstrateForOrganelle(focus.id);
      const highlightedSubstrate = new Set(relatedSubstrate.map((node) => node.id));
      return {
        activeOrganelle,
        activeSubstrate: null,
        activeOrganelleIds: activeOrganelle ? new Set([activeOrganelle.id]) : new Set(),
        relatedSubstrate,
        relatedOrganelles: [],
        isSubstrateHighlighted: (substrateId) => highlightedSubstrate.has(substrateId),
        isOrganelleHighlighted: (organelleId) => organelleId === focus.id,
        hasFocus: true
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
        isSubstrateHighlighted: (substrateId) => substrateId === focus.id,
        isOrganelleHighlighted: (organelleId) => highlightedOrganelles.has(organelleId),
        hasFocus: true
      };
    }

    return {
      activeOrganelle: null,
      activeSubstrate: null,
      activeOrganelleIds: new Set<string>(),
      relatedSubstrate: [],
      relatedOrganelles: [],
      isSubstrateHighlighted: () => false,
      isOrganelleHighlighted: () => false,
      hasFocus: false
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
