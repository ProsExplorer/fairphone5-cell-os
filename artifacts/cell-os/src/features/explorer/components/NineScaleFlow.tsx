import { useState } from "react";
import { NINE_SCALE_FLOWS } from "@/domain/content/scales";
import { HARMONIC_CONSTANT } from "@/domain/content/constants";
import { ConfidenceBadge } from "./ConfidenceBadge";

const PHASE_COLORS = {
  perception: "text-primary/90",
  affect:     "text-accent/90",
  expression: "text-secondary/90"
} as const;

const PHASE_LABELS = ["PERCEPTION", "AFFECT", "EXPRESSION"] as const;
const PHASE_KEYS  = ["perception", "affect", "expression"] as const;

export function NineScaleFlow() {
  const [activeId, setActiveId] = useState<string>(NINE_SCALE_FLOWS[0].id);

  const activeScale = NINE_SCALE_FLOWS.find((s) => s.id === activeId) ?? NINE_SCALE_FLOWS[0];

  return (
    <section className="relative z-10 py-32 px-6 border-t border-white/5 bg-gradient-to-b from-background/60 to-background/20">
      <div className="max-w-7xl mx-auto space-y-12">

        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-secondary/30 text-secondary font-mono text-sm tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            尺度不變性 · Scale Invariance
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white text-glow-secondary">
            One Pattern · Ten Scales
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            PERCEPTION → AFFECT → EXPRESSION is not a metaphor invented for Cell OS. It is the structural shape of every complete transformation — from the formation of a Chinese character to one inference call on the Hexagon 770. Select a scale to explore it.
          </p>
          <p className="text-xs font-mono text-muted-foreground/50 tracking-widest">
            Harmonic constant · {HARMONIC_CONSTANT}
          </p>
        </div>

        {/* Scale selector pills */}
        <div className="flex flex-wrap justify-center gap-3">
          {NINE_SCALE_FLOWS.map((scale, index) => {
            const isActive = scale.id === activeId;
            return (
              <button
                key={scale.id}
                type="button"
                onClick={() => setActiveId(scale.id)}
                className="flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-[777ms] font-mono text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                style={{
                  background: isActive ? "rgba(0,255,255,0.08)" : "rgba(255,255,255,0.03)",
                  borderColor: isActive ? "hsl(180,100%,50%,0.5)" : "rgba(255,255,255,0.08)",
                  color: isActive ? "hsl(180,100%,70%)" : "hsl(190,30%,55%)"
                }}
                aria-pressed={isActive}
              >
                <span className="text-base leading-none" aria-hidden="true">{scale.glyph}</span>
                <span className="hidden sm:inline tracking-wider uppercase text-xs">{scale.scale}</span>
                <span className="text-muted-foreground/50 text-xs">{String(index + 1).padStart(2, "0")}</span>
              </button>
            );
          })}
        </div>

        {/* Active scale detail */}
        <div
          key={activeScale.id}
          className="glass-panel rounded-3xl p-8 md:p-12 border border-white/5 animate-in fade-in slide-in-from-bottom-4 duration-[777ms]"
        >
          <div className="grid md:grid-cols-[1fr_2fr] gap-10">
            {/* Left: scale identity */}
            <div className="space-y-4">
              <div className="text-8xl leading-none" aria-hidden="true">{activeScale.glyph}</div>
              <div>
                <div className="text-xs font-mono tracking-widest uppercase text-muted-foreground mb-1">
                  Scale {String(NINE_SCALE_FLOWS.findIndex((s) => s.id === activeScale.id) + 1).padStart(2, "0")} / {String(NINE_SCALE_FLOWS.length).padStart(2, "0")}
                </div>
                <h3 className="text-3xl font-bold text-white">{activeScale.scale}</h3>
              </div>
              <p className="text-foreground/80 leading-relaxed">{activeScale.description}</p>
              <ConfidenceBadge confidence={activeScale.confidence} />
            </div>

            {/* Right: triadic breakdown */}
            <div className="space-y-6 border-l border-white/10 pl-8 md:pl-10">
              {PHASE_KEYS.map((key, i) => (
                <div key={key} className="space-y-2">
                  <div className={`text-xs font-mono tracking-widest uppercase ${PHASE_COLORS[key]}`}>
                    {PHASE_LABELS[i]}
                  </div>
                  <p className="text-foreground/85 leading-relaxed">{activeScale[key]}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scale minimap — all ten at a glance */}
        <div className="grid grid-cols-5 md:grid-cols-10 gap-2 text-center">
          {NINE_SCALE_FLOWS.map((scale, index) => (
            <button
              key={scale.id}
              type="button"
              onClick={() => setActiveId(scale.id)}
              className="p-3 rounded-xl border transition-all duration-[777ms] hover:bg-white/5 focus:outline-none"
              style={{
                borderColor: scale.id === activeId ? "rgba(255,255,255,0.2)" : "transparent",
                opacity: scale.id === activeId ? 1 : HARMONIC_CONSTANT
              }}
              title={scale.scale}
            >
              <div className="text-2xl mb-1" aria-hidden="true">{scale.glyph}</div>
              <div className="text-[10px] font-mono text-muted-foreground/70 tracking-wider truncate">
                {String(index + 1).padStart(2, "0")}
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
