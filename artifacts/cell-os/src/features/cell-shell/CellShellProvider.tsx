import type { CellZoneId } from "@/domain/types";

// ─── Re-export CellZoneId so consumers can import from one place ──────────────
export type { CellZoneId };

// ─── Zone metadata ────────────────────────────────────────────────────────────

export type CellZoneMeta = {
  id: CellZoneId;
  name: string;
  osFeature: string;
  glyph: string;
  color: string;
};

/**
 * Each zone maps to both a biological organelle and the Cell OS section it
 * governs. The UI literally IS the cell — navigating the page is navigating
 * through organelles.
 *
 * CELL_ZONES is the single canonical zone registry. Import it directly;
 * no context provider is needed — active zone state lives in useExplorerFlow.
 */
export const CELL_ZONES: Record<CellZoneId, CellZoneMeta> = {
  nucleus:                  { id: "nucleus",                  name: "Nucleus",                osFeature: "Core Identity · DNA",      glyph: "核",  color: "#22d3ee" },
  cytoplasm:                { id: "cytoplasm",                name: "Cytoplasm",              osFeature: "Runtime · Explorer",       glyph: "漿",  color: "#34d399" },
  cytoskeleton:             { id: "cytoskeleton",             name: "Cytoskeleton",           osFeature: "AI Substrate Lattice",     glyph: "骨",  color: "#818cf8" },
  ribosomes:                { id: "ribosomes",                name: "Ribosomes",              osFeature: "Pattern Translation",      glyph: "糖",  color: "#a3e635" },
  mitochondria:             { id: "mitochondria",             name: "Mitochondria",           osFeature: "EdgeNode · The Proof",     glyph: "粒",  color: "#fb923c" },
  golgi:                    { id: "golgi",                    name: "Golgi Apparatus",        osFeature: "OS Genome Sorting",        glyph: "高",  color: "#c084fc" },
  "endoplasmic-reticulum":  { id: "endoplasmic-reticulum",   name: "Endoplasmic Reticulum",  osFeature: "Deep Lineage · Memory",    glyph: "網",  color: "#f472b6" },
  membrane:                 { id: "membrane",                 name: "Cell Membrane",          osFeature: "Selective Boundary",       glyph: "膜",  color: "#7dd3fc" },
};
