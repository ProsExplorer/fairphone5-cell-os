import { useEffect } from "react";
import { Link } from "wouter";
import { CELL_ZONES } from "@/features/cell-shell/CellShellProvider";
import { useCellVitalStore } from "@/features/cell-shell/state/useCellVitalStore";
import { ZONE_DEPTH_ORDER } from "./useExplorerNavigation";
import type { CellZoneId } from "@/domain/types";

/**
 * Concentric ring radii — outer membrane to inner nucleus.
 * Each ring corresponds to one zone, arranged spatially as a cell cross-section.
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

/**
 * Biophoton links — six biologically grounded zone-pair connections.
 *
 * Each link uses a fixed angle (degrees, SVG y-down) so the path is radial:
 * from point on ring A at θ to point on ring B at the same θ.
 * Path: quadratic bezier through center (110,110) for an inward-arcing curve.
 *
 * animDelay (s): stagger per link to avoid simultaneous photon bursts.
 * animDuration (s): biological timescale — faster for molecular, slower for generational.
 */
const BIOPHOTON_LINKS: Array<{
  fromZone: CellZoneId;
  toZone: CellZoneId;
  fromR: number;
  toR: number;
  angleDeg: number;
  animDelay: number;
  animDuration: number;
}> = [
  // nucleus → mitochondria (genomic energy signaling)
  { fromZone: "nucleus",               toZone: "mitochondria",           fromR: 15, toR: 60, angleDeg: 60,  animDelay: 0,    animDuration: 3.2 },
  // mitochondria → ribosomes (ATP fuels translation)
  { fromZone: "mitochondria",          toZone: "ribosomes",              fromR: 60, toR: 48, angleDeg: 135, animDelay: 0.9,  animDuration: 2.4 },
  // ribosomes → endoplasmic-reticulum (co-translational import)
  { fromZone: "ribosomes",             toZone: "endoplasmic-reticulum",  fromR: 48, toR: 86, angleDeg: 285, animDelay: 1.7,  animDuration: 2.8 },
  // ER → golgi (secretory pathway)
  { fromZone: "endoplasmic-reticulum", toZone: "golgi",                  fromR: 86, toR: 72, angleDeg: 210, animDelay: 2.5,  animDuration: 3.5 },
  // golgi → membrane (vesicle dispatch)
  { fromZone: "golgi",                 toZone: "membrane",               fromR: 72, toR: 100,angleDeg: 330, animDelay: 0.5,  animDuration: 2.9 },
  // cytoplasm → nucleus (second-messenger signaling)
  { fromZone: "cytoplasm",             toZone: "nucleus",                fromR: 26, toR: 15, angleDeg: 245, animDelay: 3.1,  animDuration: 2.1 },
];

/** Convert polar (cx,cy,r,angleDeg) → SVG Cartesian point. */
function ringPoint(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

type Props = {
  activeZone: CellZoneId;
  onSelectZone: (zone: CellZoneId) => void;
};

export function CellMapNav({ activeZone, onSelectZone }: Props) {
  const zone = CELL_ZONES[activeZone];
  const signals = useCellVitalStore((s) => s.signals);
  const clearExpiredSignals = useCellVitalStore((s) => s.clearExpiredSignals);

  // Purge expired signals every 500ms — cheap flat loop over ≤8 entries.
  useEffect(() => {
    const id = setInterval(clearExpiredSignals, 500);
    return () => clearInterval(id);
  }, [clearExpiredSignals]);

  const now = Date.now();

  return (
    <aside className="flex flex-col h-full overflow-y-auto border-r border-white/5 bg-background/40 backdrop-blur-sm">

      {/* ── Living cell cross-section diagram ─────────────────────────────── */}
      <div className="p-5 border-b border-white/5 shrink-0">
        <p className="font-mono text-[8px] tracking-[0.25em] uppercase text-muted-foreground/30 mb-3 text-center">
          Explore Inside → Out
        </p>
        <svg
          viewBox="0 0 220 220"
          className="w-full max-w-[200px] mx-auto select-none"
          aria-label="Cell cross-section zone navigator"
        >
          <defs>
            <radialGradient id="cell-bg" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.01)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0)" />
            </radialGradient>
            {/* Per-zone glow filters — reused by rings and signal bursts */}
            {RINGS.map(({ zoneId }) => {
              const z = CELL_ZONES[zoneId];
              return (
                <filter key={zoneId} id={`ring-glow-${zoneId}`} x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feFlood floodColor={z.color} floodOpacity="0.5" result="color" />
                  <feComposite in="color" in2="blur" operator="in" result="glow" />
                  <feComposite in="SourceGraphic" in2="glow" operator="over" />
                </filter>
              );
            })}
          </defs>

          <circle cx={110} cy={110} r={108} fill="url(#cell-bg)" />

          {/* ── Biophoton links — rendered BELOW rings so rings appear on top ─ */}
          <g aria-hidden="true" style={{ pointerEvents: "none" }}>
            {BIOPHOTON_LINKS.map((link, i) => {
              const A = ringPoint(110, 110, link.fromR, link.angleDeg);
              const B = ringPoint(110, 110, link.toR,   link.angleDeg);
              const zoneColor = CELL_ZONES[link.fromZone].color;

              // Check if either endpoint zone has an active signal → brighten link
              const sigA = signals[link.fromZone];
              const sigB = signals[link.toZone];
              const hasSignal =
                (sigA && sigA.expiresAt > now) ||
                (sigB && sigB.expiresAt > now);

              return (
                <path
                  key={i}
                  // Curve through center so all links arc gracefully inward
                  d={`M ${A.x.toFixed(1)} ${A.y.toFixed(1)} Q 110 110 ${B.x.toFixed(1)} ${B.y.toFixed(1)}`}
                  stroke={zoneColor}
                  strokeWidth={hasSignal ? 1.2 : 0.6}
                  fill="none"
                  strokeDasharray="60 260"
                  style={{
                    animationName: "biophoton-travel",
                    animationDuration: `${link.animDuration}s`,
                    animationDelay: `${link.animDelay}s`,
                    animationTimingFunction: "ease-in-out",
                    animationIterationCount: "infinite",
                    opacity: hasSignal ? 0.7 : 0.3,
                    transition: "opacity 0.6s ease, stroke-width 0.4s ease",
                  }}
                />
              );
            })}
          </g>

          {/* ── Rings — rendered outer to inner so inner rings appear on top ── */}
          {RINGS.map(({ zoneId, r }, ringIndex) => {
            const z = CELL_ZONES[zoneId];
            const isActive = zoneId === activeZone;
            const sig = signals[zoneId];
            const hasSignal = !!sig && sig.expiresAt > now;
            const signalIntensity = hasSignal ? sig.intensity : 0;

            // Breathing: stagger delay so rings breathe as a wave, nucleus first.
            // Ring 7 (nucleus, innermost) → delay 0; ring 0 (membrane, outermost) → delay 1.4s.
            const breathDelay = `${((RINGS.length - 1 - ringIndex) * 0.2).toFixed(1)}s`;
            // Breathing speed varies — inner rings breathe faster (cellular timescale).
            const breathDuration = `${(5.5 + ringIndex * 0.7).toFixed(1)}s`;

            return (
              <g key={zoneId}>
                {/* Baseline breathing ring — always on, very subtle */}
                <circle
                  cx={110}
                  cy={110}
                  r={r}
                  fill={isActive ? `${z.color}14` : `${z.color}04`}
                  stroke={z.color}
                  strokeWidth={isActive ? 2 : 0.75}
                  style={{
                    cursor: "pointer",
                    transition: "all 0.777s ease",
                    filter: isActive ? `drop-shadow(0 0 5px ${z.color}70)` : "none",
                    strokeOpacity: isActive ? 1 : undefined,
                    animationName: isActive ? undefined : "cell-ring-breathe",
                    animationDuration: breathDuration,
                    animationDelay: breathDelay,
                    animationTimingFunction: "ease-in-out",
                    animationIterationCount: "infinite",
                  }}
                  onClick={() => onSelectZone(zoneId)}
                  role="button"
                  tabIndex={0}
                  aria-label={z.name}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") onSelectZone(zoneId);
                  }}
                />

                {/* Signal burst ring — fades out when a signal fires on this zone */}
                {hasSignal && (
                  <circle
                    key={`${zoneId}-burst-${sig.expiresAt}`}
                    cx={110}
                    cy={110}
                    r={r + (sig.type === "sacred" ? 4 : 2)}
                    fill="none"
                    stroke={z.color}
                    strokeWidth={sig.type === "sacred" ? 3 : 2}
                    style={{
                      pointerEvents: "none",
                      animationName: sig.type === "sacred" ? "sacred-seal-pulse" : "zone-signal-burst",
                      animationDuration: sig.type === "sacred" ? "2.8s" : "1.6s",
                      animationTimingFunction: "ease-out",
                      animationFillMode: "forwards",
                      opacity: signalIntensity,
                      filter: `drop-shadow(0 0 ${Math.round(4 * signalIntensity)}px ${z.color})`,
                    }}
                    aria-hidden="true"
                  />
                )}

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

          {/* Center cross-hair — pulses with active zone color */}
          <circle
            cx={110}
            cy={110}
            r={2}
            fill={zone.color}
            opacity={0.6}
            style={{ transition: "fill 0.777s ease" }}
          />
        </svg>
      </div>

      {/* ── Zone list — nucleus (inner) → membrane (outer) ─────────────────── */}
      <nav className="flex-1 overflow-y-auto py-2 px-2" aria-label="Zone navigation">
        {ZONE_DEPTH_ORDER.map((zoneId, i) => {
          const z = CELL_ZONES[zoneId];
          const isActive = zoneId === activeZone;
          const isInner = i === 0;
          const isOuter = i === ZONE_DEPTH_ORDER.length - 1;
          const sig = signals[zoneId];
          const hasSignal = !!sig && sig.expiresAt > now;

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
              {/* Depth dot — glows when zone has a signal */}
              <div
                className="w-1.5 h-1.5 rounded-full shrink-0 transition-all duration-[777ms]"
                style={{
                  backgroundColor: z.color,
                  opacity: isActive ? 1 : hasSignal ? 0.7 : 0.25,
                  boxShadow: isActive
                    ? `0 0 6px ${z.color}`
                    : hasSignal
                    ? `0 0 4px ${z.color}90`
                    : "none",
                }}
              />

              {/* Glyph */}
              <span
                className="text-base leading-none font-medium shrink-0 w-5 text-center transition-colors duration-[777ms]"
                style={{ color: isActive ? z.color : hasSignal ? `${z.color}80` : `${z.color}50` }}
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
