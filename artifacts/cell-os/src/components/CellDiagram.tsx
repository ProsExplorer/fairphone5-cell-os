import type { CSSProperties, ReactNode, KeyboardEvent } from "react";
import { CELL_MAPPINGS } from "@/lib/data";

interface CellDiagramProps {
  activeId: string | null;
  onHover: (id: string | null) => void;
  onClick: (id: string) => void;
}

interface OrganelleProps {
  id: string;
  activeId: string | null;
  onHover: (id: string | null) => void;
  onClick: (id: string) => void;
  style?: CSSProperties;
  className?: string;
  children: ReactNode;
}

function Organelle({ id, activeId, onHover, onClick, style, className, children }: OrganelleProps) {
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
      aria-pressed={activeId === id}
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

export function CellDiagram({ activeId, onHover, onClick }: CellDiagramProps) {
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
          activeId={activeId}
          onHover={onHover}
          onClick={onClick}
          className="transition-all duration-500 origin-center"
          style={{ 
            opacity: activeId && activeId !== "cell-membrane" ? 0.4 : 1,
            transform: activeId === "cell-membrane" ? "scale(1.02)" : "scale(1)"
          }}
        >
          <path 
            d="M500 50 C750 50 950 250 950 500 C950 780 780 950 500 950 C220 950 50 780 50 500 C50 220 250 50 500 50 Z" 
            fill="url(#membrane-grad)" 
            stroke={activeId === "cell-membrane" ? "hsl(140, 100%, 60%)" : "hsl(180, 100%, 40%)"}
            strokeWidth={activeId === "cell-membrane" ? "12" : "6"}
            filter={activeId === "cell-membrane" ? "url(#glow-strong)" : "url(#glow)"}
            className="animate-pulse-slow"
          />
        </Organelle>

        {/* 13. Cytoplasm (Background fill inside membrane) */}
        <Organelle
          id="cytoplasm"
          activeId={activeId}
          onHover={onHover}
          onClick={onClick}
          className="transition-all duration-500"
          style={{ opacity: activeId && activeId !== "cytoplasm" ? 0.3 : 1 }}
        >
          <path 
            d="M500 70 C730 70 920 260 920 500 C920 750 760 920 500 920 C240 920 70 750 70 500 C70 240 260 70 500 70 Z" 
            fill="rgba(80, 50, 200, 0.1)"
            stroke={activeId === "cytoplasm" ? "hsl(260, 60%, 50%)" : "transparent"}
            strokeWidth="4"
          />
        </Organelle>

        {/* 6. Membrane Receptors (Outer antennas) */}
        <Organelle
          id="membrane-receptors"
          activeId={activeId}
          onHover={onHover}
          onClick={onClick}
          className="transition-all duration-500"
          style={{ opacity: activeId && activeId !== "membrane-receptors" ? 0.4 : 1 }}
        >
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <path 
              key={i}
              d={`M 500 50 L 500 10`} 
              stroke={activeId === "membrane-receptors" ? "hsl(160, 80%, 60%)" : "hsl(160, 80%, 40%)"}
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
          activeId={activeId}
          onHover={onHover}
          onClick={onClick}
          className="transition-all duration-500"
          style={{ opacity: activeId && activeId !== "cytoskeleton" ? 0.2 : 0.6 }}
        >
          <path d="M 200 300 Q 500 400 800 200" stroke={activeId === "cytoskeleton" ? "hsl(340, 80%, 60%)" : "rgba(255,255,255,0.15)"} strokeWidth="4" fill="none" strokeDasharray="10, 10"/>
          <path d="M 150 600 Q 500 550 850 700" stroke={activeId === "cytoskeleton" ? "hsl(340, 80%, 60%)" : "rgba(255,255,255,0.15)"} strokeWidth="4" fill="none" strokeDasharray="10, 10"/>
          <path d="M 400 150 Q 450 500 300 850" stroke={activeId === "cytoskeleton" ? "hsl(340, 80%, 60%)" : "rgba(255,255,255,0.15)"} strokeWidth="4" fill="none" strokeDasharray="10, 10"/>
        </Organelle>

        {/* 12. Vacuole */}
        <Organelle
          id="vacuole"
          activeId={activeId}
          onHover={onHover}
          onClick={onClick}
          className="transition-all duration-500 origin-center"
          style={{ 
            opacity: activeId && activeId !== "vacuole" ? 0.4 : 1,
            transform: activeId === "vacuole" ? "scale(1.05) translate(-10px, 10px)" : "scale(1)"
          }}
        >
          <path 
            d="M 650 250 Q 850 250 800 450 Q 750 550 600 400 Q 550 250 650 250 Z" 
            fill="rgba(0, 150, 200, 0.2)"
            stroke={activeId === "vacuole" ? "hsl(190, 70%, 50%)" : "hsl(190, 70%, 30%)"}
            strokeWidth="6"
            filter="url(#glow)"
          />
        </Organelle>

        {/* 7. Mitochondria */}
        <Organelle
          id="mitochondria"
          activeId={activeId}
          onHover={onHover}
          onClick={onClick}
          className="transition-all duration-500 origin-center"
          style={{ 
            opacity: activeId && activeId !== "mitochondria" ? 0.4 : 1,
            transform: activeId === "mitochondria" ? "scale(1.1) translate(0px, 15px)" : "scale(1)"
          }}
        >
          {/* Top Left Mito */}
          <g transform="translate(250, 250) rotate(-30)">
            <ellipse cx="0" cy="0" rx="80" ry="40" fill="rgba(255, 120, 0, 0.2)" stroke={activeId === "mitochondria" ? "hsl(35, 100%, 60%)" : "hsl(35, 100%, 40%)"} strokeWidth="4" filter="url(#glow)"/>
            <path d="M -60 0 Q -40 -30 -20 0 T 20 0 T 60 0" stroke={activeId === "mitochondria" ? "hsl(35, 100%, 70%)" : "hsl(35, 100%, 50%)"} strokeWidth="3" fill="none" />
          </g>
          {/* Bottom Right Mito */}
          <g transform="translate(750, 700) rotate(45)">
            <ellipse cx="0" cy="0" rx="90" ry="45" fill="rgba(255, 120, 0, 0.2)" stroke={activeId === "mitochondria" ? "hsl(35, 100%, 60%)" : "hsl(35, 100%, 40%)"} strokeWidth="4" filter="url(#glow)"/>
            <path d="M -70 0 Q -45 -35 -20 0 T 25 0 T 70 0" stroke={activeId === "mitochondria" ? "hsl(35, 100%, 70%)" : "hsl(35, 100%, 50%)"} strokeWidth="3" fill="none" />
          </g>
        </Organelle>

        {/* 11. Lysosomes */}
        <Organelle
          id="lysosomes"
          activeId={activeId}
          onHover={onHover}
          onClick={onClick}
          className="transition-all duration-500 origin-center"
          style={{ opacity: activeId && activeId !== "lysosomes" ? 0.4 : 1 }}
        >
          <circle cx="300" cy="700" r="40" fill="rgba(150, 200, 0, 0.3)" stroke={activeId === "lysosomes" ? "hsl(80, 90%, 60%)" : "hsl(80, 90%, 30%)"} strokeWidth="4" filter="url(#glow)" />
          <circle cx="200" cy="550" r="25" fill="rgba(150, 200, 0, 0.3)" stroke={activeId === "lysosomes" ? "hsl(80, 90%, 60%)" : "hsl(80, 90%, 30%)"} strokeWidth="4" filter="url(#glow)" />
          <circle cx="800" cy="300" r="30" fill="rgba(150, 200, 0, 0.3)" stroke={activeId === "lysosomes" ? "hsl(80, 90%, 60%)" : "hsl(80, 90%, 30%)"} strokeWidth="4" filter="url(#glow)" />
        </Organelle>

        {/* 10. Golgi Apparatus */}
        <Organelle
          id="golgi-apparatus"
          activeId={activeId}
          onHover={onHover}
          onClick={onClick}
          className="transition-all duration-500 origin-center"
          style={{ 
            opacity: activeId && activeId !== "golgi-apparatus" ? 0.4 : 1,
            transform: activeId === "golgi-apparatus" ? "scale(1.05) translate(-10px, -10px)" : "scale(1)"
          }}
        >
          <g transform="translate(650, 550) rotate(-15)">
            <path d="M 0 -30 Q 50 -50 100 -30" stroke={activeId === "golgi-apparatus" ? "hsl(25, 90%, 60%)" : "hsl(25, 90%, 40%)"} strokeWidth="12" strokeLinecap="round" fill="none" filter="url(#glow)" />
            <path d="M -10 0 Q 50 -20 110 0" stroke={activeId === "golgi-apparatus" ? "hsl(25, 90%, 60%)" : "hsl(25, 90%, 40%)"} strokeWidth="12" strokeLinecap="round" fill="none" filter="url(#glow)" />
            <path d="M -20 30 Q 50 10 120 30" stroke={activeId === "golgi-apparatus" ? "hsl(25, 90%, 60%)" : "hsl(25, 90%, 40%)"} strokeWidth="12" strokeLinecap="round" fill="none" filter="url(#glow)" />
            <path d="M -30 60 Q 50 40 130 60" stroke={activeId === "golgi-apparatus" ? "hsl(25, 90%, 60%)" : "hsl(25, 90%, 40%)"} strokeWidth="12" strokeLinecap="round" fill="none" filter="url(#glow)" />
          </g>
        </Organelle>

        {/* 15. Vesicles (Small bubbles moving) */}
        <Organelle
          id="vesicles"
          activeId={activeId}
          onHover={onHover}
          onClick={onClick}
          className="transition-all duration-500 origin-center"
          style={{ opacity: activeId && activeId !== "vesicles" ? 0.4 : 1 }}
        >
          <circle cx="700" cy="450" r="15" fill={activeId === "vesicles" ? "hsl(50, 100%, 70%)" : "hsl(50, 100%, 40%)"} filter="url(#glow)" />
          <circle cx="780" cy="500" r="12" fill={activeId === "vesicles" ? "hsl(50, 100%, 70%)" : "hsl(50, 100%, 40%)"} filter="url(#glow)" />
          <circle cx="620" cy="650" r="18" fill={activeId === "vesicles" ? "hsl(50, 100%, 70%)" : "hsl(50, 100%, 40%)"} filter="url(#glow)" />
        </Organelle>

        {/* 9. Endoplasmic Reticulum (Surrounding Nucleus) */}
        <Organelle
          id="endoplasmic-reticulum"
          activeId={activeId}
          onHover={onHover}
          onClick={onClick}
          className="transition-all duration-500 origin-center"
          style={{ 
            opacity: activeId && activeId !== "endoplasmic-reticulum" ? 0.4 : 1,
            transform: activeId === "endoplasmic-reticulum" ? "scale(1.02)" : "scale(1)"
          }}
        >
          <path 
            d="M 350 350 Q 500 250 650 350 Q 750 500 650 650 Q 500 750 350 650 Q 250 500 350 350 Z" 
            stroke={activeId === "endoplasmic-reticulum" ? "hsl(220, 80%, 70%)" : "hsl(220, 80%, 40%)"}
            strokeWidth="20"
            strokeDasharray="40 10"
            fill="none"
            filter="url(#glow)"
          />
          <path 
            d="M 380 380 Q 500 300 620 380 Q 700 500 620 620 Q 500 700 380 620 Q 300 500 380 380 Z" 
            stroke={activeId === "endoplasmic-reticulum" ? "hsl(220, 80%, 60%)" : "hsl(220, 80%, 30%)"}
            strokeWidth="15"
            strokeDasharray="30 15"
            fill="none"
            filter="url(#glow)"
          />
        </Organelle>

        {/* 8. Ribosomes (Dots on ER) */}
        <Organelle
          id="ribosomes"
          activeId={activeId}
          onHover={onHover}
          onClick={onClick}
          className="transition-all duration-500"
          style={{ opacity: activeId && activeId !== "ribosomes" ? 0.4 : 1 }}
        >
          {/* Scatter tiny dots along the ER path conceptually */}
          {[
            [350, 350], [450, 300], [550, 300], [650, 350],
            [700, 450], [700, 550], [650, 650], [550, 700],
            [450, 700], [350, 650], [300, 550], [300, 450]
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r={activeId === "ribosomes" ? 8 : 5} fill={activeId === "ribosomes" ? "hsl(300, 70%, 70%)" : "hsl(300, 70%, 40%)"} filter="url(#glow)" />
          ))}
        </Organelle>

        {/* 1. Nucleus */}
        <Organelle
          id="nucleus"
          activeId={activeId}
          onHover={onHover}
          onClick={onClick}
          className="transition-all duration-500 origin-center"
          style={{ 
            opacity: activeId && activeId !== "nucleus" ? 0.4 : 1,
            transform: activeId === "nucleus" ? "scale(1.05)" : "scale(1)"
          }}
        >
          <circle cx="500" cy="500" r="140" fill="rgba(150, 50, 200, 0.4)" stroke={activeId === "nucleus" ? "hsl(280, 80%, 70%)" : "hsl(280, 80%, 40%)"} strokeWidth="8" filter="url(#glow-strong)" />
        </Organelle>

        {/* 4. Nuclear Pores */}
        <Organelle
          id="nuclear-pores"
          activeId={activeId}
          onHover={onHover}
          onClick={onClick}
          className="transition-all duration-500 origin-center"
          style={{ opacity: activeId && activeId !== "nuclear-pores" ? 0.4 : 1 }}
        >
          {[0, 60, 120, 180, 240, 300].map((angle, i) => (
            <circle 
              key={i}
              cx="500" 
              cy="360" 
              r={activeId === "nuclear-pores" ? 12 : 8} 
              fill={activeId === "nuclear-pores" ? "hsl(200, 90%, 70%)" : "hsl(200, 90%, 30%)"}
              transform={`rotate(${angle} 500 500)`}
              filter="url(#glow)"
            />
          ))}
        </Organelle>

        {/* 2. DNA / Genome */}
        <Organelle
          id="dna"
          activeId={activeId}
          onHover={onHover}
          onClick={onClick}
          className="transition-all duration-500 origin-center"
          style={{ 
            opacity: activeId && activeId !== "dna" ? 0.4 : 1,
            transform: activeId === "dna" ? "scale(1.1)" : "scale(1)"
          }}
        >
          <path d="M 440 460 Q 470 430 500 460 T 560 460" stroke={activeId === "dna" ? "hsl(180, 100%, 60%)" : "hsl(180, 100%, 30%)"} strokeWidth="6" fill="none" filter="url(#glow)"/>
          <path d="M 440 480 Q 470 510 500 480 T 560 480" stroke={activeId === "dna" ? "hsl(180, 100%, 60%)" : "hsl(180, 100%, 30%)"} strokeWidth="6" fill="none" filter="url(#glow)"/>
          <line x1="460" y1="455" x2="460" y2="485" stroke={activeId === "dna" ? "hsl(180, 100%, 60%)" : "hsl(180, 100%, 30%)"} strokeWidth="2" />
          <line x1="500" y1="455" x2="500" y2="485" stroke={activeId === "dna" ? "hsl(180, 100%, 60%)" : "hsl(180, 100%, 30%)"} strokeWidth="2" />
          <line x1="540" y1="455" x2="540" y2="485" stroke={activeId === "dna" ? "hsl(180, 100%, 60%)" : "hsl(180, 100%, 30%)"} strokeWidth="2" />
        </Organelle>

        {/* 3. Nucleolus */}
        <Organelle
          id="nucleolus"
          activeId={activeId}
          onHover={onHover}
          onClick={onClick}
          className="transition-all duration-500 origin-center"
          style={{ 
            opacity: activeId && activeId !== "nucleolus" ? 0.4 : 1,
            transform: activeId === "nucleolus" ? "scale(1.1) translate(10px, 10px)" : "scale(1)"
          }}
        >
          <circle cx="530" cy="540" r="35" fill={activeId === "nucleolus" ? "hsl(320, 80%, 70%)" : "hsl(320, 80%, 40%)"} filter="url(#glow)" />
        </Organelle>

      </svg>
    </div>
  );
}