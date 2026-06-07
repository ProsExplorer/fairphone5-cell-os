/**
 * Re-export of the organelle domain content, kept here so existing consumers
 * (such as the CellDiagram) can continue importing from "@/lib/data" while the
 * source of truth lives in the domain layer.
 */
export type { Organelle } from "@/domain/types";
export { CELL_MAPPINGS } from "@/domain/content/organelles";
