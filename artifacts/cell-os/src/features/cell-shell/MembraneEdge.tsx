import { CELL_ZONES, type CellZoneId } from "./CellShellProvider";

interface MembraneEdgeProps {
  entering: CellZoneId;
}

/**
 * A lipid-bilayer-style section divider.
 *
 * Biological cell membranes are phospholipid bilayers — two parallel sheets
 * that together form a selective boundary. This component renders that as two
 * hairlines flanking a zone label, marking the transition from one organelle
 * zone to the next. Crossing the MembraneEdge is crossing an organelle boundary.
 */
export function MembraneEdge({ entering }: MembraneEdgeProps) {
  const zone = CELL_ZONES[entering];

  return (
    <div className="relative z-10 px-6 py-0" aria-hidden="true">
      <div className="max-w-7xl mx-auto">
        {/* Upper leaflet */}
        <div
          className="h-px w-full"
          style={{
            background: `linear-gradient(to right, transparent 0%, ${zone.color}22 30%, ${zone.color}40 50%, ${zone.color}22 70%, transparent 100%)`,
          }}
        />

        {/* Intercellular space — zone label sits here */}
        <div className="flex items-center justify-center py-1.5">
          <div
            className="flex items-center gap-2 px-3 py-0.5 rounded-full border font-mono text-[9px] tracking-[0.22em] uppercase transition-colors"
            style={{
              borderColor: `${zone.color}20`,
              color: `${zone.color}50`,
              background: `${zone.color}06`,
            }}
          >
            <span className="text-[11px]">{zone.glyph}</span>
            <span>{zone.name}</span>
          </div>
        </div>

        {/* Lower leaflet */}
        <div
          className="h-px w-full"
          style={{
            background: `linear-gradient(to right, transparent 0%, ${zone.color}15 30%, ${zone.color}28 50%, ${zone.color}15 70%, transparent 100%)`,
          }}
        />
      </div>
    </div>
  );
}
