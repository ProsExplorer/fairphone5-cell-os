import type { Organelle, SubstrateNode, BiophotonLink } from "@/domain/types";
import { CELL_MAPPINGS } from "@/domain/content/organelles";
import { SUBSTRATE_NODES } from "@/domain/content/substrate";
import { ORGANELLE_SUBSTRATE_LINKS, BIOPHOTON_LINKS } from "@/domain/content/mappings";

/**
 * AFFECT — pure derivations over the domain content.
 *
 * None of these functions touch React, state, or side effects. They take an
 * identifier and return resolved domain objects, so they can be reasoned about
 * and tested in isolation. Each one returns early on the empty case.
 */

export function getOrganelle(id: string | null): Organelle | null {
  if (!id) return null;
  return CELL_MAPPINGS.find((organelle) => organelle.id === id) ?? null;
}

export function getSubstrateNode(id: string | null): SubstrateNode | null {
  if (!id) return null;
  return SUBSTRATE_NODES.find((node) => node.id === id) ?? null;
}

/** Substrate nodes that a given organelle maps to. */
export function getSubstrateForOrganelle(organelleId: string | null): SubstrateNode[] {
  if (!organelleId) return [];
  const linkedIds = ORGANELLE_SUBSTRATE_LINKS
    .filter((link) => link.organelleId === organelleId)
    .map((link) => link.substrateId);
  if (linkedIds.length === 0) return [];
  return SUBSTRATE_NODES.filter((node) => linkedIds.includes(node.id));
}

/** Organelles that map to a given substrate node (reverse lookup). */
export function getOrganellesForSubstrate(substrateId: string | null): Organelle[] {
  if (!substrateId) return [];
  const linkedIds = ORGANELLE_SUBSTRATE_LINKS
    .filter((link) => link.substrateId === substrateId)
    .map((link) => link.organelleId);
  if (linkedIds.length === 0) return [];
  return CELL_MAPPINGS.filter((organelle) => linkedIds.includes(organelle.id));
}

/**
 * Biophoton communication links involving any of the given organelle ids.
 * Returns only links where at least one end is in the active set.
 */
export function getBiophotonLinks(organelleIds: Set<string>): BiophotonLink[] {
  if (organelleIds.size === 0) return [];
  return BIOPHOTON_LINKS.filter(
    (link) =>
      organelleIds.has(link.sourceOrganelleId) ||
      organelleIds.has(link.targetOrganelleId)
  );
}
