import type { CSSProperties, ReactNode, KeyboardEvent } from "react";
import { CELL_MAPPINGS } from "@/lib/data";

interface CellDiagramProps {
  activeIds: Set<string>;
  biophotonLinks?: Array<{ sourceId: string; targetId: string }>;
  onHover: (id: string | null) => void;
  onClick: (id: string) => void;
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
  "golgi-apparatus":       { x: 385, y: 445 },
  "vesicles":              { x: 710, y: 475 },
  "lysosomes":             { x: 305, y: 700 },
  "vacuole":               { x: 240, y: 305 },
  "cytoplasm":             { x: 450, y: 390 },
  "cytoskeleton":          { x: 640, y: 380 },
  "cell-membrane":         { x: 500, y: 500 }
};

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

export function CellDiagram({ activeIds, biophotonLinks, onHover, onClick }: CellDiagramProps) {
  // A stylized abstract organic cell SVG
  return (
    <div className="relative w-full aspect-square max-w-[600px] mx-auto animate-float">
      <svg 
        viewBox="0 0 1000 1000" 
        className="w-full h-full drop-shadow-2xl"
        style={{ filter: "drop-shadow(0 0 40px rgba(0, 255, 255, 0.1))" }}
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
            <stop offset="70%" stopColor="hsl(230, 40%, 10%)" stopOpacity="0.8" />
            <stop offset="98%" stopColor="hsl(180, 100%, 30%)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="hsl(180, 100%, 60%)" stopOpacity="0.9" />
          </radialGradient>
        </defs>

        {/* 5. Cell Membrane */}
        <Organelle
          id="cell-membrane"
          activeIds={activeIds}
          onHover={onHover}
          onClick={onClick}
          className="transition-all duration-500 origin-center"
          style={{ 
            opacity: activeIds.size > 0 && !activeIds.has("cell-membrane") ? 0.4 : 1,
            transform: activeIds.has("cell-membrane") ? "scale(1.02)" : "scale(1)"
          }}
        >
          <path 
            d="M500 50 C750 50 950 250 950 500 C950 780 780 950 500 950 C220 950 50 780 50 500 C50 220 250 50 500 50 Z" 
            fill="url(#membrane-grad)" 
            stroke={activeIds.has("cell-membrane") ? "hsl(140, 100%, 60%)" : "hsl(180, 100%, 40%)"}
            strokeWidth={activeIds.has("cell-membrane") ? "12" : "6"}
            filter={activeIds.has("cell-membrane") ? "url(#glow-strong)" : "url(#glow)"}
            className="animate-pulse-slow"
          />
        </Organelle>

        {/* 13. Cytoplasm (Background fill inside membrane) */}
        <Organelle
          id="cytoplasm"
          activeIds={activeIds}
          onHover={onHover}
          onClick={onClick}
          className="transition-all duration-500"
          style={{ opacity: activeIds.size > 0 && !activeIds.has("cytoplasm") ? 0.3 : 1 }}
        >
          <path 
            d="M500 70 C730 70 920 260 920 500 C920 750 760 920 500 920 C240 920 70 750 70 500 C70 240 260 70 500 70 Z" 
            fill="rgba(80, 50, 200, 0.1)"
            stroke={activeIds.has("cytoplasm") ? "hsl(260, 60%, 50%)" : "transparent"}
            strokeWidth="4"
          />
        </Organelle>

        {/* 6. Membrane Receptors (Outer antennas) */}
        <Organelle
          id="membrane-receptors"
          activeIds={activeIds}
          onHover={onHover}
          onClick={onClick}
          className="transition-all duration-500"
          style={{ opacity: activeIds.size > 0 && !activeIds.has("membrane-receptors") ? 0.4 : 1 }}
        >
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <path 
              key={i}
              d={`M 500 50 L 500 10`} 
              stroke={activeIds.has("membrane-receptors") ? "hsl(160, 80%, 60%)" : "hsl(160, 80%, 40%)"}
              strokeWidth="8"
              strokeLinecap="round"
              transform={`rotate(${angle} 500 500)`}
              filter="url(#glow)"
            />
          ))}
        </Organelle>

        {/* 14. Cytoskeleton (Structural lines) */}
        <Organelle
          id="cytoskeleton"
          activeIds={activeIds}
          onHover={onHover}
          onClick={onClick}
          className="transition-all duration-500"
          style={{ opacity: activeIds.size > 0 && !activeIds.has("cytoskeleton") ? 0.2 : 0.6 }}
        >
          <path d="M 200 300 Q 500 400 800 200" stroke={activeIds.has("cytoskeleton") ? "hsl(340, 80%, 60%)" : "rgba(255,255,255,0.15)"} strokeWidth="4" fill="none" strokeDasharray="10, 10"/>
          <path d="M 150 600 Q 500 550 850 700" stroke={activeIds.has("cytoskeleton") ? "hsl(340, 80%, 60%)" : "rgba(255,255,255,0.15)"} strokeWidth="4" fill="none" strokeDasharray="10, 10"/>
          <path d="M 400 150 Q 450 500 300 850" stroke={activeIds.has("cytoskeleton") ? "hsl(340, 80%, 60%)" : "rgba(255,255,255,0.15)"} strokeWidth="4" fill="none" strokeDasharray="10, 10"/>
        </Organelle>

        {/* 12. Vacuole */}
        <Organelle
          id="vacuole"
          activeIds={activeIds}
          onHover={onHover}
          onClick={onClick}
          className="transition-all duration-500 origin-center"
          style={{ 
            opacity: activeIds.size > 0 && !activeIds.has("vacuole") ? 0.4 : 1,
            transform: activeIds.has("vacuole") ? "scale(1.05) translate(-10px, 10px)" : "scale(1)"
          }}
        >
          <path 
            d="M 650 250 Q 850 250 800 450 Q 750 550 600 400 Q 550 250 650 250 Z" 
            fill="rgba(0, 150, 200, 0.2)"
            stroke={activeIds.has("vacuole") ? "hsl(190, 70%, 50%)" : "hsl(190, 70%, 30%)"}
            strokeWidth="6"
            filter="url(#glow)"
          />
        </Organelle>

        {/* 7. Mitochondria */}
        <Organelle
          id="mitochondria"
          activeIds={activeIds}
          onHover={onHover}
          onClick={onClick}
          className="transition-all duration-500 origin-center"
          style={{ 
            opacity: activeIds.size > 0 && !activeIds.has("mitochondria") ? 0.4 : 1,
            transform: activeIds.has("mitochondria") ? "scale(1.1) translate(0px, 15px)" : "scale(1)"
          }}
        >
          {/* Top Left Mito */}
          <g transform="translate(250, 250) rotate(-30)">
            <ellipse cx="0" cy="0" rx="80" ry="40" fill="rgba(255, 120, 0, 0.2)" stroke={activeIds.has("mitochondria") ? "hsl(35, 100%, 60%)" : "hsl(35, 100%, 40%)"} strokeWidth="4" filter="url(#glow)"/>
            <path d="M -60 0 Q -40 -30 -20 0 T 20 0 T 60 0" stroke={activeIds.has("mitochondria") ? "hsl(35, 100%, 70%)" : "hsl(35, 100%, 50%)"} strokeWidth="3" fill="none" />
          </g>
          {/* Bottom Right Mito */}
          <g transform="translate(750, 700) rotate(45)">
            <ellipse cx="0" cy="0" rx="90" ry="45" fill="rgba(255, 120, 0, 0.2)" stroke={activeIds.has("mitochondria") ? "hsl(35, 100%, 60%)" : "hsl(35, 100%, 40%)"} strokeWidth="4" filter="url(#glow)"/>
            <path d="M -70 0 Q -45 -35 -20 0 T 25 0 T 70 0" stroke={activeIds.has("mitochondria") ? "hsl(35, 100%, 70%)" : "hsl(35, 100%, 50%)"} strokeWidth="3" fill="none" />
          </g>
        </Organelle>

        {/* 11. Lysosomes */}
        <Organelle
          id="lysosomes"
          activeIds={activeIds}
          onHover={onHover}
          onClick={onClick}
          className="transition-all duration-500 origin-center"
          style={{ opacity: activeIds.size > 0 && !activeIds.has("lysosomes") ? 0.4 : 1 }}
        >
          <circle cx="300" cy="700" r="40" fill="rgba(150, 200, 0, 0.3)" stroke={activeIds.has("lysosomes") ? "hsl(80, 90%, 60%)" : "hsl(80, 90%, 30%)"} strokeWidth="4" filter="url(#glow)" />
          <circle cx="200" cy="550" r="25" fill="rgba(150, 200, 0, 0.3)" stroke={activeIds.has("lysosomes") ? "hsl(80, 90%, 60%)" : "hsl(80, 90%, 30%)"} strokeWidth="4" filter="url(#glow)" />
          <circle cx="800" cy="300" r="30" fill="rgba(150, 200, 0, 0.3)" stroke={activeIds.has("lysosomes") ? "hsl(80, 90%, 60%)" : "hsl(80, 90%, 30%)"} strokeWidth="4" filter="url(#glow)" />
        </Organelle>

        {/* 10. Golgi Apparatus */}
        <Organelle
          id="golgi-apparatus"
          activeIds={activeIds}
          onHover={onHover}
          onClick={onClick}
          className="transition-all duration-500 origin-center"
          style={{ 
            opacity: activeIds.size > 0 && !activeIds.has("golgi-apparatus") ? 0.4 : 1,
            transform: activeIds.has("golgi-apparatus") ? "scale(1.05) translate(-10px, -10px)" : "scale(1)"
          }}
        >
          <g transform="translate(650, 550) rotate(-15)">
            <path d="M 0 -30 Q 50 -50 100 -30" stroke={activeIds.has("golgi-apparatus") ? "hsl(25, 90%, 60%)" : "hsl(25, 90%, 40%)"} strokeWidth="12" strokeLinecap="round" fill="none" filter="url(#glow)" />
            <path d="M -10 0 Q 50 -20 110 0" stroke={activeIds.has("golgi-apparatus") ? "hsl(25, 90%, 60%)" : "hsl(25, 90%, 40%)"} strokeWidth="12" strokeLinecap="round" fill="none" filter="url(#glow)" />
            <path d="M -20 30 Q 50 10 120 30" stroke={activeIds.has("golgi-apparatus") ? "hsl(25, 90%, 60%)" : "hsl(25, 90%, 40%)"} strokeWidth="12" strokeLinecap="round" fill="none" filter="url(#glow)" />
            <path d="M -30 60 Q 50 40 130 60" stroke={activeIds.has("golgi-apparatus") ? "hsl(25, 90%, 60%)" : "hsl(25, 90%, 40%)"} strokeWidth="12" strokeLinecap="round" fill="none" filter="url(#glow)" />
          </g>
        </Organelle>

        {/* 15. Vesicles (Small bubbles moving) */}
        <Organelle
          id="vesicles"
          activeIds={activeIds}
          onHover={onHover}
          onClick={onClick}
          className="transition-all duration-500 origin-center"
          style={{ opacity: activeIds.size > 0 && !activeIds.has("vesicles") ? 0.4 : 1 }}
        >
          <circle cx="700" cy="450" r="15" fill={activeIds.has("vesicles") ? "hsl(50, 100%, 70%)" : "hsl(50, 100%, 40%)"} filter="url(#glow)" />
          <circle cx="780" cy="500" r="12" fill={activeIds.has("vesicles") ? "hsl(50, 100%, 70%)" : "hsl(50, 100%, 40%)"} filter="url(#glow)" />
          <circle cx="620" cy="650" r="18" fill={activeIds.has("vesicles") ? "hsl(50, 100%, 70%)" : "hsl(50, 100%, 40%)"} filter="url(#glow)" />
        </Organelle>

        {/* 9. Endoplasmic Reticulum (Surrounding Nucleus) */}
        <Organelle
          id="endoplasmic-reticulum"
          activeIds={activeIds}
          onHover={onHover}
          onClick={onClick}
          className="transition-all duration-500 origin-center"
          style={{ 
            opacity: activeIds.size > 0 && !activeIds.has("endoplasmic-reticulum") ? 0.4 : 1,
            transform: activeIds.has("endoplasmic-reticulum") ? "scale(1.02)" : "scale(1)"
          }}
        >
          <path 
            d="M 350 350 Q 500 250 650 350 Q 750 500 650 650 Q 500 750 350 650 Q 250 500 350 350 Z" 
            stroke={activeIds.has("endoplasmic-reticulum") ? "hsl(220, 80%, 70%)" : "hsl(220, 80%, 40%)"}
            strokeWidth="20"
            strokeDasharray="40 10"
            fill="none"
            filter="url(#glow)"
          />
          <path 
            d="M 380 380 Q 500 300 620 380 Q 700 500 620 620 Q 500 700 380 620 Q 300 500 380 380 Z" 
            stroke={activeIds.has("endoplasmic-reticulum") ? "hsl(220, 80%, 60%)" : "hsl(220, 80%, 30%)"}
            strokeWidth="15"
            strokeDasharray="30 15"
            fill="none"
            filter="url(#glow)"
          />
        </Organelle>

        {/* 8. Ribosomes (Dots on ER) */}
        <Organelle
          id="ribosomes"
          activeIds={activeIds}
          onHover={onHover}
          onClick={onClick}
          className="transition-all duration-500"
          style={{ opacity: activeIds.size > 0 && !activeIds.has("ribosomes") ? 0.4 : 1 }}
        >
          {/* Scatter tiny dots along the ER path conceptually */}
          {[
            [350, 350], [450, 300], [550, 300], [650, 350],
            [700, 450], [700, 550], [650, 650], [550, 700],
            [450, 700], [350, 650], [300, 550], [300, 450]
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r={activeIds.has("ribosomes") ? 8 : 5} fill={activeIds.has("ribosomes") ? "hsl(300, 70%, 70%)" : "hsl(300, 70%, 40%)"} filter="url(#glow)" />
          ))}
        </Organelle>

        {/* 1. Nucleus */}
        <Organelle
          id="nucleus"
          activeIds={activeIds}
          onHover={onHover}
          onClick={onClick}
          className="transition-all duration-500 origin-center"
          style={{ 
            opacity: activeIds.size > 0 && !activeIds.has("nucleus") ? 0.4 : 1,
            transform: activeIds.has("nucleus") ? "scale(1.05)" : "scale(1)"
          }}
        >
          <circle cx="500" cy="500" r="140" fill="rgba(150, 50, 200, 0.4)" stroke={activeIds.has("nucleus") ? "hsl(280, 80%, 70%)" : "hsl(280, 80%, 40%)"} strokeWidth="8" filter="url(#glow-strong)" />
        </Organelle>

        {/* 4. Nuclear Pores */}
        <Organelle
          id="nuclear-pores"
          activeIds={activeIds}
          onHover={onHover}
          onClick={onClick}
          className="transition-all duration-500 origin-center"
          style={{ opacity: activeIds.size > 0 && !activeIds.has("nuclear-pores") ? 0.4 : 1 }}
        >
          {[0, 60, 120, 180, 240, 300].map((angle, i) => (
            <circle 
              key={i}
              cx="500" 
              cy="360" 
              r={activeIds.has("nuclear-pores") ? 12 : 8} 
              fill={activeIds.has("nuclear-pores") ? "hsl(200, 90%, 70%)" : "hsl(200, 90%, 30%)"}
              transform={`rotate(${angle} 500 500)`}
              filter="url(#glow)"
            />
          ))}
        </Organelle>

        {/* 2. DNA / Genome */}
        <Organelle
          id="dna"
          activeIds={activeIds}
          onHover={onHover}
          onClick={onClick}
          className="transition-all duration-500 origin-center"
          style={{ 
            opacity: activeIds.size > 0 && !activeIds.has("dna") ? 0.4 : 1,
            transform: activeIds.has("dna") ? "scale(1.1)" : "scale(1)"
          }}
        >
          <path d="M 440 460 Q 470 430 500 460 T 560 460" stroke={activeIds.has("dna") ? "hsl(180, 100%, 60%)" : "hsl(180, 100%, 30%)"} strokeWidth="6" fill="none" filter="url(#glow)"/>
          <path d="M 440 480 Q 470 510 500 480 T 560 480" stroke={activeIds.has("dna") ? "hsl(180, 100%, 60%)" : "hsl(180, 100%, 30%)"} strokeWidth="6" fill="none" filter="url(#glow)"/>
          <line x1="460" y1="455" x2="460" y2="485" stroke={activeIds.has("dna") ? "hsl(180, 100%, 60%)" : "hsl(180, 100%, 30%)"} strokeWidth="2" />
          <line x1="500" y1="455" x2="500" y2="485" stroke={activeIds.has("dna") ? "hsl(180, 100%, 60%)" : "hsl(180, 100%, 30%)"} strokeWidth="2" />
          <line x1="540" y1="455" x2="540" y2="485" stroke={activeIds.has("dna") ? "hsl(180, 100%, 60%)" : "hsl(180, 100%, 30%)"} strokeWidth="2" />
        </Organelle>

        {/* 3. Nucleolus */}
        <Organelle
          id="nucleolus"
          activeIds={activeIds}
          onHover={onHover}
          onClick={onClick}
          className="transition-all duration-500 origin-center"
          style={{ 
            opacity: activeIds.size > 0 && !activeIds.has("nucleolus") ? 0.4 : 1,
            transform: activeIds.has("nucleolus") ? "scale(1.1) translate(10px, 10px)" : "scale(1)"
          }}
        >
          <circle cx="530" cy="540" r="35" fill={activeIds.has("nucleolus") ? "hsl(320, 80%, 70%)" : "hsl(320, 80%, 40%)"} filter="url(#glow)" />
        </Organelle>

        {/* Biophoton inter-organelle communication overlay */}
        {biophotonLinks && biophotonLinks.length > 0 && (
          <g id="biophoton-overlay" aria-hidden="true">
            {biophotonLinks.map(({ sourceId, targetId }) => {
              const src = ORGANELLE_CENTERS[sourceId];
              const tgt = ORGANELLE_CENTERS[targetId];
              if (!src || !tgt) return null;
              return (
                <line
                  key={`${sourceId}-${targetId}`}
                  x1={src.x} y1={src.y}
                  x2={tgt.x} y2={tgt.y}
                  stroke="hsl(55, 90%, 68%)"
                  strokeWidth="1.5"
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