import type { CSSProperties, ReactNode, KeyboardEvent } from "react";
import { CELL_MAPPINGS } from "@/lib/data";
import { CELL_ZONES } from "@/features/cell-shell/CellShellProvider";
import type { CellZoneId } from "@/domain/types";

// ── Architectural bridge: diagram organelle IDs → 8-zone model ───────────────
// The diagram uses 15 granular organelle IDs. The zone model uses 8 CellZoneIds.
// This map is the canonical connection between the two layers.
const ORGANELLE_ZONE_MAP: Record<string, CellZoneId> = {
  "nucleus":               "nucleus",
  "nucleolus":             "nucleus",
  "dna":                   "nucleus",
  "nuclear-pores":         "nucleus",
  "cytoplasm":             "cytoplasm",
  "cytoskeleton":          "cytoskeleton",
  "ribosomes":             "ribosomes",
  "mitochondria":          "mitochondria",
  "golgi-apparatus":       "golgi",
  "vesicles":              "golgi",
  "endoplasmic-reticulum": "endoplasmic-reticulum",
  "cell-membrane":         "membrane",
  "membrane-receptors":    "membrane",
  "lysosomes":             "membrane",
  "vacuole":               "membrane",
};

// ── Quantization precision cascade: 4 organelles carry a precision badge ─────
// FP32 → FP16 → INT8 → INT4 maps to nucleus → ER → ribosomes → mitochondria.
// ATP = INT4 = minimum viable token. Full analysis at /substrate.
const ORGANELLE_QUANT: Record<string, string> = {
  "nucleus":               "FP32",
  "endoplasmic-reticulum": "FP16",
  "ribosomes":             "INT8",
  "mitochondria":          "INT4",
};

/** Zone color for an organelle's active state — from the canonical CELL_ZONES. */
function zc(organelleId: string): string {
  const zoneId = ORGANELLE_ZONE_MAP[organelleId];
  return zoneId ? CELL_ZONES[zoneId].color : "#ffffff";
}

/** Zone color at low opacity for inactive state. */
function zd(organelleId: string): string {
  return `${zc(organelleId)}55`;
}

/** Zone color fill for organelle body — very low opacity. */
function zf(organelleId: string, opacity = "18"): string {
  return `${zc(organelleId)}${opacity}`;
}

/** Approximate SVG-space centres for each organelle (viewBox 0 0 1000 1000). */
const ORGANELLE_CENTERS: Record<string, { x: number; y: number }> = {
  "nucleus":               { x: 500, y: 500 },
  "nucleolus":             { x: 530, y: 540 },
  "dna":                   { x: 500, y: 475 },
  "nuclear-pores":         { x: 500, y: 362 },
  "mitochondria":          { x: 525, y: 675 },
  "ribosomes":             { x: 310, y: 445 },
  "endoplasmic-reticulum": { x: 365, y: 590 },
  "golgi-apparatus":       { x: 710, y: 575 },
  "vesicles":              { x: 710, y: 475 },
  "lysosomes":             { x: 305, y: 700 },
  "vacuole":               { x: 240, y: 305 },
  "cytoplasm":             { x: 450, y: 390 },
  "cytoskeleton":          { x: 640, y: 380 },
  "cell-membrane":         { x: 500, y: 120 },
  "membrane-receptors":    { x: 500, y: 60  },
};

// ── Glyph label positions — slightly offset from center to avoid overlap ──────
const GLYPH_OFFSETS: Record<string, { dx: number; dy: number }> = {
  "nucleus":               { dx:   0, dy: -20 },
  "nucleolus":             { dx:  22, dy: -10 },
  "dna":                   { dx:   0, dy: -18 },
  "nuclear-pores":         { dx:   0, dy: -18 },
  "mitochondria":          { dx:   0, dy: -18 },
  "ribosomes":             { dx:   0, dy: -16 },
  "endoplasmic-reticulum": { dx: -28, dy:   0 },
  "golgi-apparatus":       { dx:   0, dy: -18 },
  "vesicles":              { dx:  18, dy:  -8 },
  "lysosomes":             { dx:   0, dy: -16 },
  "vacuole":               { dx:   0, dy: -16 },
  "cytoplasm":             { dx: -30, dy:   0 },
  "cytoskeleton":          { dx:   0, dy: -16 },
  "cell-membrane":         { dx:   0, dy: -18 },
  "membrane-receptors":    { dx:   0, dy: -16 },
};

/**
 * Maps a biological wavelength band to its closest visible-spectrum hex color.
 * UV and NIR are physically invisible — we use violet and amber as proxies so
 * the overlay carries spectral identity without misrepresenting visibility.
 *
 * Source: BIOPHOTON_RESEARCH.md §6 spectral table + §9.3 IPC priority channel map.
 */
function wbc(band: string | undefined): string {
  switch (band) {
    case "UV":         return "#a78bfa"; // violet  — DNA tautomeric 200–380 nm
    case "blue-green": return "#67e8f9"; // cyan    — Russell triplet carbonyl 450–550 nm
    case "red":        return "#f87171"; // red     — singlet O₂ dimol 634–703 nm
    case "NIR":        return "#fb923c"; // amber   — biological window 700–1000 nm (proxy)
    case "deep-NIR":   return "#94a3b8"; // slate   — ¹O₂ monomol 1270 nm (proxy)
    default:           return "#ffffff";
  }
}

interface CellDiagramProps {
  activeIds: Set<string>;
  biophotonLinks?: Array<{
    sourceId: string;
    targetId: string;
    /** 0–1 attention weight — drives stroke width and opacity. Default 0.5. */
    attentionWeight?: number;
    /** Biological spectral emission band — drives stroke color. */
    wavelengthBand?: "UV" | "blue-green" | "red" | "NIR" | "deep-NIR";
  }>;
  onHover: (id: string | null) => void;
  onClick: (id: string) => void;
  /**
   * Per-organelle visit intensity (0–1) from the learning store.
   * Renders a subtle memory-glow ring behind well-visited organelles —
   * the organism's accumulated attention made visually present.
   * When absent or empty, no glow rings are rendered (silent default).
   */
  visitIntensity?: Record<string, number>;
}

interface OrganelleProps {
  id: string;
  activeIds: Set<string>;
  onHover: (id: string | null) => void;
  onClick: (id: string) => void;
  style?: CSSProperties;
  className?: string;
  children: ReactNode;
}

function Organelle({ id, activeIds, onHover, onClick, style, className, children }: OrganelleProps) {
  const mapping = CELL_MAPPINGS.find((m) => m.id === id);
  const label = mapping ? `${mapping.name}: ${mapping.osFeature}` : id;

  const handleKeyDown = (e: KeyboardEvent<SVGGElement>) => {
    if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
      e.preventDefault();
      onClick(id);
    }
  };

  return (
    <g
      role="button"
      tabIndex={0}
      aria-label={label}
      aria-pressed={activeIds.has(id)}
      className={`cursor-pointer outline-none ${className ?? ""}`}
      style={style}
      onMouseEnter={() => onHover(id)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(id)}
      onBlur={() => onHover(null)}
      onClick={() => onClick(id)}
      onKeyDown={handleKeyDown}
    >
      {children}
    </g>
  );
}

export function CellDiagram({ activeIds, biophotonLinks, visitIntensity, onHover, onClick }: CellDiagramProps) {
  return (
    <div className="relative w-full aspect-square max-w-[600px] mx-auto animate-float">
      <svg
        viewBox="0 0 1000 1000"
        className="w-full h-full drop-shadow-2xl"
        style={{ filter: "drop-shadow(0 0 40px rgba(0,255,255,0.08))" }}
      >
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="15" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="glow-strong" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="25" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <radialGradient id="membrane-grad" cx="50%" cy="50%" r="50%">
            <stop offset="70%" stopColor="hsl(230,40%,10%)" stopOpacity="0.8" />
            <stop offset="98%" stopColor="#7dd3fc" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0.75" />
          </radialGradient>
        </defs>

        {/* ── Cell Membrane (zone: membrane #7dd3fc) ──────────────────── */}
        <Organelle
          id="cell-membrane" activeIds={activeIds} onHover={onHover} onClick={onClick}
          className="transition-all duration-500 origin-center"
          style={{
            opacity: activeIds.size > 0 && !activeIds.has("cell-membrane") ? 0.4 : 1,
            transform: activeIds.has("cell-membrane") ? "scale(1.02)" : "scale(1)",
          }}
        >
          <path
            d="M500 50 C750 50 950 250 950 500 C950 780 780 950 500 950 C220 950 50 780 50 500 C50 220 250 50 500 50 Z"
            fill="url(#membrane-grad)"
            stroke={activeIds.has("cell-membrane") ? "#7dd3fc" : zd("cell-membrane")}
            strokeWidth={activeIds.has("cell-membrane") ? "12" : "5"}
            filter={activeIds.has("cell-membrane") ? "url(#glow-strong)" : "url(#glow)"}
            className="animate-pulse-slow"
          />
        </Organelle>

        {/* ── Cytoplasm (zone: cytoplasm #34d399) ─────────────────────── */}
        <Organelle
          id="cytoplasm" activeIds={activeIds} onHover={onHover} onClick={onClick}
          className="transition-all duration-500"
          style={{ opacity: activeIds.size > 0 && !activeIds.has("cytoplasm") ? 0.3 : 1 }}
        >
          <path
            d="M500 70 C730 70 920 260 920 500 C920 750 760 920 500 920 C240 920 70 750 70 500 C70 240 260 70 500 70 Z"
            fill={zf("cytoplasm", "08")}
            stroke={activeIds.has("cytoplasm") ? "#34d399" : "transparent"}
            strokeWidth="4"
          />
        </Organelle>

        {/* ── Membrane Receptors (zone: membrane #7dd3fc) ─────────────── */}
        <Organelle
          id="membrane-receptors" activeIds={activeIds} onHover={onHover} onClick={onClick}
          className="transition-all duration-500"
          style={{ opacity: activeIds.size > 0 && !activeIds.has("membrane-receptors") ? 0.4 : 1 }}
        >
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <path
              key={i}
              d="M 500 50 L 500 10"
              stroke={activeIds.has("membrane-receptors") ? "#7dd3fc" : zd("membrane-receptors")}
              strokeWidth="8"
              strokeLinecap="round"
              transform={`rotate(${angle} 500 500)`}
              filter="url(#glow)"
            />
          ))}
        </Organelle>

        {/* ── Cytoskeleton (zone: cytoskeleton #818cf8) ───────────────── */}
        <Organelle
          id="cytoskeleton" activeIds={activeIds} onHover={onHover} onClick={onClick}
          className="transition-all duration-500"
          style={{ opacity: activeIds.size > 0 && !activeIds.has("cytoskeleton") ? 0.2 : 0.65 }}
        >
          <path d="M 200 300 Q 500 400 800 200"  stroke={activeIds.has("cytoskeleton") ? "#818cf8" : "rgba(255,255,255,0.12)"} strokeWidth="4" fill="none" strokeDasharray="10,10" />
          <path d="M 150 600 Q 500 550 850 700"  stroke={activeIds.has("cytoskeleton") ? "#818cf8" : "rgba(255,255,255,0.12)"} strokeWidth="4" fill="none" strokeDasharray="10,10" />
          <path d="M 400 150 Q 450 500 300 850"  stroke={activeIds.has("cytoskeleton") ? "#818cf8" : "rgba(255,255,255,0.12)"} strokeWidth="4" fill="none" strokeDasharray="10,10" />
        </Organelle>

        {/* ── Vacuole (zone: membrane #7dd3fc) ────────────────────────── */}
        <Organelle
          id="vacuole" activeIds={activeIds} onHover={onHover} onClick={onClick}
          className="transition-all duration-500 origin-center"
          style={{
            opacity: activeIds.size > 0 && !activeIds.has("vacuole") ? 0.4 : 1,
            transform: activeIds.has("vacuole") ? "scale(1.05) translate(-10px,10px)" : "scale(1)",
          }}
        >
          <path
            d="M 650 250 Q 850 250 800 450 Q 750 550 600 400 Q 550 250 650 250 Z"
            fill={zf("vacuole", "20")}
            stroke={activeIds.has("vacuole") ? "#7dd3fc" : zd("vacuole")}
            strokeWidth="6"
            filter="url(#glow)"
          />
        </Organelle>

        {/* ── Mitochondria (zone: mitochondria #fb923c) ───────────────── */}
        <Organelle
          id="mitochondria" activeIds={activeIds} onHover={onHover} onClick={onClick}
          className="transition-all duration-500 origin-center"
          style={{
            opacity: activeIds.size > 0 && !activeIds.has("mitochondria") ? 0.4 : 1,
            transform: activeIds.has("mitochondria") ? "scale(1.1) translate(0px,15px)" : "scale(1)",
          }}
        >
          {/* Perception mito — top left */}
          <g transform="translate(250,250) rotate(-30)">
            <ellipse cx="0" cy="0" rx="80" ry="40"
              fill={zf("mitochondria", "22")}
              stroke={activeIds.has("mitochondria") ? "#fb923c" : zd("mitochondria")}
              strokeWidth="4" filter="url(#glow)" />
            <path d="M -60 0 Q -40 -30 -20 0 T 20 0 T 60 0"
              stroke={activeIds.has("mitochondria") ? "#fb923c" : `${zc("mitochondria")}50`}
              strokeWidth="3" fill="none" />
            {/* P phase label */}
            <text x="-68" y="-48" fill={activeIds.has("mitochondria") ? "#fb923c" : zd("mitochondria")}
              fontSize="14" fontFamily="monospace" textAnchor="middle"
              style={{ pointerEvents: "none" }}>P</text>
          </g>
          {/* Expression mito — bottom right */}
          <g transform="translate(750,700) rotate(45)">
            <ellipse cx="0" cy="0" rx="90" ry="45"
              fill={zf("mitochondria", "22")}
              stroke={activeIds.has("mitochondria") ? "#fb923c" : zd("mitochondria")}
              strokeWidth="4" filter="url(#glow)" />
            <path d="M -70 0 Q -45 -35 -20 0 T 25 0 T 70 0"
              stroke={activeIds.has("mitochondria") ? "#fb923c" : `${zc("mitochondria")}50`}
              strokeWidth="3" fill="none" />
            {/* E phase label */}
            <text x="78" y="-52" fill={activeIds.has("mitochondria") ? "#fb923c" : zd("mitochondria")}
              fontSize="14" fontFamily="monospace" textAnchor="middle"
              style={{ pointerEvents: "none" }}>E</text>
          </g>
        </Organelle>

        {/* ── Lysosomes (zone: membrane #7dd3fc) ──────────────────────── */}
        <Organelle
          id="lysosomes" activeIds={activeIds} onHover={onHover} onClick={onClick}
          className="transition-all duration-500 origin-center"
          style={{ opacity: activeIds.size > 0 && !activeIds.has("lysosomes") ? 0.4 : 1 }}
        >
          <circle cx="300" cy="700" r="40" fill={zf("lysosomes", "30")} stroke={activeIds.has("lysosomes") ? "#7dd3fc" : zd("lysosomes")} strokeWidth="4" filter="url(#glow)" />
          <circle cx="200" cy="550" r="25" fill={zf("lysosomes", "30")} stroke={activeIds.has("lysosomes") ? "#7dd3fc" : zd("lysosomes")} strokeWidth="4" filter="url(#glow)" />
          <circle cx="800" cy="300" r="30" fill={zf("lysosomes", "30")} stroke={activeIds.has("lysosomes") ? "#7dd3fc" : zd("lysosomes")} strokeWidth="4" filter="url(#glow)" />
        </Organelle>

        {/* ── Golgi Apparatus (zone: golgi #c084fc) ───────────────────── */}
        <Organelle
          id="golgi-apparatus" activeIds={activeIds} onHover={onHover} onClick={onClick}
          className="transition-all duration-500 origin-center"
          style={{
            opacity: activeIds.size > 0 && !activeIds.has("golgi-apparatus") ? 0.4 : 1,
            transform: activeIds.has("golgi-apparatus") ? "scale(1.05) translate(-10px,-10px)" : "scale(1)",
          }}
        >
          <g transform="translate(650,550) rotate(-15)">
            <path d="M 0 -30 Q 50 -50 100 -30"   stroke={activeIds.has("golgi-apparatus") ? "#c084fc" : zd("golgi-apparatus")} strokeWidth="12" strokeLinecap="round" fill="none" filter="url(#glow)" />
            <path d="M -10 0 Q 50 -20 110 0"     stroke={activeIds.has("golgi-apparatus") ? "#c084fc" : zd("golgi-apparatus")} strokeWidth="12" strokeLinecap="round" fill="none" filter="url(#glow)" />
            <path d="M -20 30 Q 50 10 120 30"    stroke={activeIds.has("golgi-apparatus") ? "#c084fc" : zd("golgi-apparatus")} strokeWidth="12" strokeLinecap="round" fill="none" filter="url(#glow)" />
            <path d="M -30 60 Q 50 40 130 60"    stroke={activeIds.has("golgi-apparatus") ? "#c084fc" : zd("golgi-apparatus")} strokeWidth="12" strokeLinecap="round" fill="none" filter="url(#glow)" />
          </g>
        </Organelle>

        {/* ── Vesicles (zone: golgi #c084fc) ──────────────────────────── */}
        <Organelle
          id="vesicles" activeIds={activeIds} onHover={onHover} onClick={onClick}
          className="transition-all duration-500 origin-center"
          style={{ opacity: activeIds.size > 0 && !activeIds.has("vesicles") ? 0.4 : 1 }}
        >
          <circle cx="700" cy="450" r="15" fill={activeIds.has("vesicles") ? "#c084fc" : zf("vesicles", "70")} filter="url(#glow)" />
          <circle cx="780" cy="500" r="12" fill={activeIds.has("vesicles") ? "#c084fc" : zf("vesicles", "70")} filter="url(#glow)" />
          <circle cx="620" cy="650" r="18" fill={activeIds.has("vesicles") ? "#c084fc" : zf("vesicles", "70")} filter="url(#glow)" />
        </Organelle>

        {/* ── Endoplasmic Reticulum (zone: endoplasmic-reticulum #f472b6) */}
        <Organelle
          id="endoplasmic-reticulum" activeIds={activeIds} onHover={onHover} onClick={onClick}
          className="transition-all duration-500 origin-center"
          style={{
            opacity: activeIds.size > 0 && !activeIds.has("endoplasmic-reticulum") ? 0.4 : 1,
            transform: activeIds.has("endoplasmic-reticulum") ? "scale(1.02)" : "scale(1)",
          }}
        >
          <path
            d="M 350 350 Q 500 250 650 350 Q 750 500 650 650 Q 500 750 350 650 Q 250 500 350 350 Z"
            stroke={activeIds.has("endoplasmic-reticulum") ? "#f472b6" : zd("endoplasmic-reticulum")}
            strokeWidth="20" strokeDasharray="40 10" fill="none" filter="url(#glow)"
          />
          <path
            d="M 380 380 Q 500 300 620 380 Q 700 500 620 620 Q 500 700 380 620 Q 300 500 380 380 Z"
            stroke={activeIds.has("endoplasmic-reticulum") ? `${zc("endoplasmic-reticulum")}cc` : `${zc("endoplasmic-reticulum")}30`}
            strokeWidth="15" strokeDasharray="30 15" fill="none" filter="url(#glow)"
          />
        </Organelle>

        {/* ── Ribosomes (zone: ribosomes #a3e635) ─────────────────────── */}
        <Organelle
          id="ribosomes" activeIds={activeIds} onHover={onHover} onClick={onClick}
          className="transition-all duration-500"
          style={{ opacity: activeIds.size > 0 && !activeIds.has("ribosomes") ? 0.4 : 1 }}
        >
          {[
            [350,350],[450,300],[550,300],[650,350],
            [700,450],[700,550],[650,650],[550,700],
            [450,700],[350,650],[300,550],[300,450],
          ].map(([cx, cy], i) => (
            <circle
              key={i} cx={cx} cy={cy}
              r={activeIds.has("ribosomes") ? 8 : 5}
              fill={activeIds.has("ribosomes") ? "#a3e635" : zd("ribosomes")}
              filter="url(#glow)"
            />
          ))}
        </Organelle>

        {/* ── Nucleus (zone: nucleus #22d3ee) ─────────────────────────── */}
        <Organelle
          id="nucleus" activeIds={activeIds} onHover={onHover} onClick={onClick}
          className="transition-all duration-500 origin-center"
          style={{
            opacity: activeIds.size > 0 && !activeIds.has("nucleus") ? 0.4 : 1,
            transform: activeIds.has("nucleus") ? "scale(1.05)" : "scale(1)",
          }}
        >
          <circle cx="500" cy="500" r="140"
            fill={zf("nucleus", "40")}
            stroke={activeIds.has("nucleus") ? "#22d3ee" : zd("nucleus")}
            strokeWidth="8" filter="url(#glow-strong)"
          />
        </Organelle>

        {/* ── Nuclear Pores (zone: nucleus #22d3ee) ───────────────────── */}
        <Organelle
          id="nuclear-pores" activeIds={activeIds} onHover={onHover} onClick={onClick}
          className="transition-all duration-500 origin-center"
          style={{ opacity: activeIds.size > 0 && !activeIds.has("nuclear-pores") ? 0.4 : 1 }}
        >
          {[0, 60, 120, 180, 240, 300].map((angle, i) => (
            <circle
              key={i} cx="500" cy="360"
              r={activeIds.has("nuclear-pores") ? 12 : 8}
              fill={activeIds.has("nuclear-pores") ? "#22d3ee" : zd("nuclear-pores")}
              transform={`rotate(${angle} 500 500)`}
              filter="url(#glow)"
            />
          ))}
        </Organelle>

        {/* ── DNA / Genome (zone: nucleus #22d3ee) ────────────────────── */}
        <Organelle
          id="dna" activeIds={activeIds} onHover={onHover} onClick={onClick}
          className="transition-all duration-500 origin-center"
          style={{
            opacity: activeIds.size > 0 && !activeIds.has("dna") ? 0.4 : 1,
            transform: activeIds.has("dna") ? "scale(1.1)" : "scale(1)",
          }}
        >
          <path d="M 440 460 Q 470 430 500 460 T 560 460" stroke={activeIds.has("dna") ? "#22d3ee" : zd("dna")} strokeWidth="6" fill="none" filter="url(#glow)" />
          <path d="M 440 480 Q 470 510 500 480 T 560 480" stroke={activeIds.has("dna") ? "#22d3ee" : zd("dna")} strokeWidth="6" fill="none" filter="url(#glow)" />
          <line x1="460" y1="455" x2="460" y2="485" stroke={activeIds.has("dna") ? "#22d3ee" : zd("dna")} strokeWidth="2" />
          <line x1="500" y1="455" x2="500" y2="485" stroke={activeIds.has("dna") ? "#22d3ee" : zd("dna")} strokeWidth="2" />
          <line x1="540" y1="455" x2="540" y2="485" stroke={activeIds.has("dna") ? "#22d3ee" : zd("dna")} strokeWidth="2" />
        </Organelle>

        {/* ── Nucleolus (zone: nucleus #22d3ee) ───────────────────────── */}
        <Organelle
          id="nucleolus" activeIds={activeIds} onHover={onHover} onClick={onClick}
          className="transition-all duration-500 origin-center"
          style={{
            opacity: activeIds.size > 0 && !activeIds.has("nucleolus") ? 0.4 : 1,
            transform: activeIds.has("nucleolus") ? "scale(1.1) translate(10px,10px)" : "scale(1)",
          }}
        >
          <circle cx="530" cy="540" r="35"
            fill={activeIds.has("nucleolus") ? `${zc("nucleolus")}50` : zf("nucleolus", "40")}
            stroke={activeIds.has("nucleolus") ? "#22d3ee" : zd("nucleolus")}
            strokeWidth="3"
            filter="url(#glow)"
          />
        </Organelle>

        {/* ── Zone glyph + quantization badge overlay ──────────────────────
            Rendered ABOVE all organelles so they're always legible.
            Low opacity at rest, bright when the organelle is active.
            Quantization badges (FP32/FP16/INT8/INT4) connect the
            precision cascade architecture to the biological structure.
        ──────────────────────────────────────────────────────────────── */}
        <g aria-hidden="true" style={{ pointerEvents: "none" }}>
          {Object.entries(ORGANELLE_CENTERS).map(([id, { x, y }]) => {
            const zoneId = ORGANELLE_ZONE_MAP[id];
            if (!zoneId) return null;
            const zone = CELL_ZONES[zoneId];
            const isActive = activeIds.has(id);
            const quant = ORGANELLE_QUANT[id];
            const off = GLYPH_OFFSETS[id] ?? { dx: 0, dy: -18 };
            const gx = x + off.dx;
            const gy = y + off.dy;

            return (
              <g key={id}>
                {/* Zone glyph */}
                <text
                  x={gx} y={gy}
                  textAnchor="middle"
                  fill={zone.color}
                  fontSize={isActive ? 18 : 11}
                  fontFamily="monospace"
                  fontWeight={isActive ? "bold" : "normal"}
                  opacity={isActive ? 0.9 : 0.22}
                  style={{ transition: "all 0.5s ease", userSelect: "none" }}
                >
                  {zone.glyph}
                </text>

                {/* Quantization badge — precision cascade label */}
                {quant && (
                  <text
                    x={gx} y={gy + (isActive ? 20 : 14)}
                    textAnchor="middle"
                    fill={zone.color}
                    fontSize={isActive ? 9 : 7}
                    fontFamily="monospace"
                    letterSpacing="1"
                    opacity={isActive ? 0.75 : 0.15}
                    style={{ transition: "all 0.5s ease", userSelect: "none" }}
                  >
                    {quant}
                  </text>
                )}
              </g>
            );
          })}
        </g>

        {/* ── Organism memory glows — learned visit intensity ───────────────
            Rendered BELOW biophoton links. A subtle concentric ring marks
            each organelle in proportion to how often the user has visited
            it (sqrt-scaled, max opacity 0.28). The ring grows outward as
            intensity increases. Invisible at zero; barely perceptible at
            first; clearly present only after sustained focused attention.
            pointer-events: none — the glow is purely expressive, never
            intercepts interaction.
        ──────────────────────────────────────────────────────────────── */}
        {visitIntensity && (
          <g id="memory-glow" aria-hidden="true">
            {Object.entries(visitIntensity).map(([id, intensity]) => {
              if (intensity < 0.04) return null;
              const center = ORGANELLE_CENTERS[id];
              if (!center) return null;
              const color = zc(id);
              return (
                <circle
                  key={`mem-${id}`}
                  cx={center.x}
                  cy={center.y}
                  r={38 + intensity * 32}
                  fill="none"
                  stroke={color}
                  strokeWidth={1.5 + intensity * 1.5}
                  strokeOpacity={intensity * 0.28}
                  style={{ pointerEvents: "none" }}
                />
              );
            })}
          </g>
        )}

        {/* ── Biophoton inter-organelle communication overlay ───────────────
            Links are colored by SPECTRAL EMISSION BAND (wbc()) — violet for
            UV (DNA), cyan for blue-green (triplet carbonyl), red for ¹O₂
            dimol, amber for NIR biological window, slate for deep-NIR.
            This grounds the visual display in real biophoton spectral biology
            (BIOPHOTON_RESEARCH.md §6 + §9.3). strokeWidth is driven by
            attentionWeight (0–1): light attention = thin/dim, focused
            attention = thick/bright.
        ──────────────────────────────────────────────────────────────── */}
        {biophotonLinks && biophotonLinks.length > 0 && (
          <g id="biophoton-overlay" aria-hidden="true">
            {biophotonLinks.map(({ sourceId, targetId, attentionWeight = 0.5, wavelengthBand }) => {
              const src = ORGANELLE_CENTERS[sourceId];
              const tgt = ORGANELLE_CENTERS[targetId];
              if (!src || !tgt) return null;
              const color = wbc(wavelengthBand);
              const width = 1.5 + attentionWeight * 4;
              const opacity = 0.3 + attentionWeight * 0.55;
              return (
                <line
                  key={`${sourceId}-${targetId}`}
                  x1={src.x} y1={src.y}
                  x2={tgt.x} y2={tgt.y}
                  stroke={color}
                  strokeWidth={width}
                  strokeOpacity={opacity}
                  strokeDasharray="6 10"
                  className="biophoton-link"
                />
              );
            })}
          </g>
        )}
      </svg>
    </div>
  );
}
