import { Link } from "wouter";
import { CELL_ZONES } from "@/features/cell-shell/CellShellProvider";
import { ZONE_DEPTH_ORDER } from "./useExplorerNavigation";
import type { CellZoneId } from "@/domain/types";

/**
 * Concentric ring radii — outer membrane to inner nucleus.
 * Each ring corresponds to one zone, arranged spatially as a cell cross-section.
 * Clicking a ring navigates to that zone. The active zone glows.
 */
const RINGS: Array<{ zoneId: CellZoneId; r: number }> = [
  { zoneId: "membrane",               r: 100 },
  { zoneId: "endoplasmic-reticulum",  r: 86  },
  { zoneId: "golgi",                  r: 72  },
  { zoneId: "mitochondria",           r: 60  },
  { zoneId: "ribosomes",              r: 48  },
  { zoneId: "cytoskeleton",           r: 37  },
  { zoneId: "cytoplasm",              r: 26  },
  { zoneId: "nucleus",                r: 15  },
];

type Props = {
  activeZone: CellZoneId;
  onSelectZone: (zone: CellZoneId) => void;
};

export function CellMapNav({ activeZone, onSelectZone }: Props) {
  const zone = CELL_ZONES[activeZone];

  return (
    <aside className="flex flex-col h-full overflow-y-auto border-r border-white/5 bg-background/40 backdrop-blur-sm">

      {/* ── Cell cross-section diagram ────────────────────────────────────── */}
      <div className="p-5 border-b border-white/5 shrink-0">
        <p className="font-mono text-[8px] tracking-[0.25em] uppercase text-muted-foreground/30 mb-3 text-center">
          Explore Inside → Out
        </p>
        <svg
          viewBox="0 0 220 220"
          className="w-full max-w-[200px] mx-auto select-none"
          aria-label="Cell cross-section zone navigator"
        >
          {/* Outer space ambient glow */}
          <defs>
            <radialGradient id="cell-bg" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.01)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0)" />
            </radialGradient>
          </defs>
          <circle cx={110} cy={110} r={108} fill="url(#cell-bg)" />

          {/* Rings — rendered outer to inner so inner rings appear on top */}
          {RINGS.map(({ zoneId, r }) => {
            const z = CELL_ZONES[zoneId];
            const isActive = zoneId === activeZone;
            return (
              <g key={zoneId}>
                <circle
                  cx={110}
                  cy={110}
                  r={r}
                  fill={isActive ? `${z.color}14` : `${z.color}04`}
                  stroke={z.color}
                  strokeWidth={isActive ? 2 : 0.75}
                  strokeOpacity={isActive ? 1 : 0.2}
                  style={{
                    cursor: "pointer",
                    transition: "all 0.777s ease",
                    filter: isActive ? `drop-shadow(0 0 5px ${z.color}70)` : "none",
                  }}
                  onClick={() => onSelectZone(zoneId)}
                  role="button"
                  tabIndex={0}
                  aria-label={z.name}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") onSelectZone(zoneId);
                  }}
                />
                {/* Glyph label for active ring */}
                {isActive && (
                  <text
                    x={110 + r - 6}
                    y={110 + 4}
                    textAnchor="middle"
                    fill={z.color}
                    fontSize={7}
                    fontFamily="monospace"
                    opacity={0.9}
                    style={{ pointerEvents: "none", transition: "all 0.777s ease" }}
                  >
                    {z.glyph}
                  </text>
                )}
              </g>
            );
          })}

          {/* Center cross-hair */}
          <circle cx={110} cy={110} r={2} fill={zone.color} opacity={0.6} style={{ transition: "fill 0.777s ease" }} />
        </svg>
      </div>

      {/* ── Zone list — nucleus (inner) → membrane (outer) ─────────────────── */}
      <nav className="flex-1 overflow-y-auto py-2 px-2" aria-label="Zone navigation">
        {ZONE_DEPTH_ORDER.map((zoneId, i) => {
          const z = CELL_ZONES[zoneId];
          const isActive = zoneId === activeZone;
          const isInner = i === 0;
          const isOuter = i === ZONE_DEPTH_ORDER.length - 1;

          return (
            <button
              key={zoneId}
              onClick={() => onSelectZone(zoneId)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-[777ms] focus:outline-none focus-visible:ring-1 focus-visible:ring-white/20 group"
              style={{
                background: isActive ? `${z.color}0d` : "transparent",
                borderLeft: `2px solid ${isActive ? z.color : "transparent"}`,
              }}
              aria-current={isActive ? "page" : undefined}
            >
              {/* Depth dot */}
              <div
                className="w-1.5 h-1.5 rounded-full shrink-0 transition-all duration-[777ms]"
                style={{
                  backgroundColor: z.color,
                  opacity: isActive ? 1 : 0.25,
                  boxShadow: isActive ? `0 0 6px ${z.color}` : "none",
                }}
              />

              {/* Glyph */}
              <span
                className="text-base leading-none font-medium shrink-0 w-5 text-center transition-colors duration-[777ms]"
                style={{ color: isActive ? z.color : `${z.color}50` }}
              >
                {z.glyph}
              </span>

              {/* Name + OS feature */}
              <div className="min-w-0 flex-1">
                <div
                  className="text-[11px] font-medium truncate transition-colors duration-[777ms]"
                  style={{ color: isActive ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.4)" }}
                >
                  {z.name}
                </div>
                <div
                  className="text-[9px] font-mono truncate mt-0.5 transition-colors duration-[777ms]"
                  style={{ color: isActive ? `${z.color}65` : "rgba(255,255,255,0.18)" }}
                >
                  {z.osFeature}
                </div>
              </div>

              {/* Inner / outer badge */}
              {(isInner || isOuter) && (
                <span
                  className="text-[7px] font-mono tracking-widest uppercase shrink-0"
                  style={{ color: `${z.color}35` }}
                >
                  {isInner ? "core" : "edge"}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* ── Footer context links ──────────────────────────────────────────── */}
      <div className="p-2 border-t border-white/5 shrink-0 space-y-0.5">
        <Link
          href="/philosophy"
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-muted-foreground/35 hover:text-muted-foreground/70 transition-colors font-mono text-[9px] tracking-widest uppercase"
        >
          <span style={{ color: "rgba(34,211,238,0.5)" }}>核</span>
          Philosophy
        </Link>
        <Link
          href="/substrate"
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-muted-foreground/35 hover:text-muted-foreground/70 transition-colors font-mono text-[9px] tracking-widest uppercase"
        >
          <span style={{ color: "rgba(251,191,36,0.5)" }}>硅</span>
          Substrate
        </Link>
      </div>
    </aside>
  );
}
