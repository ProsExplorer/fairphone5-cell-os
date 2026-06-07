import { LINEAGE_EVENTS } from "@/domain/content/lineage";

const PHASE_DOTS: Record<string, string> = {
  perception: "bg-primary shadow-[0_0_12px_hsl(180,100%,50%)]",
  affect:     "bg-accent shadow-[0_0_12px_hsl(140,100%,60%)]",
  expression: "bg-secondary shadow-[0_0_12px_hsl(280,80%,60%)]",
  meta:       "bg-white/60 shadow-[0_0_8px_rgba(255,255,255,0.4)]"
};

const PHASE_LABELS: Record<string, string> = {
  perception: "PERCEPTION",
  affect:     "AFFECT",
  expression: "EXPRESSION",
  meta:       "SYNTHESIS"
};

export function DeepLineageTimeline() {
  return (
    <section className="relative z-10 py-32 px-6 border-t border-white/5">
      <div className="max-w-4xl mx-auto space-y-16">

        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-white/20 text-white/70 font-mono text-sm tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-white/50" />
            Deep Lineage
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white">1,877 Years Old</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The triadic pattern was not invented for Cell OS. It has been described independently across cultures and centuries — in alchemy, biology, computing, biophysics, and now on-device AI. Each discovery is the same recognition, at a new scale.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-primary/30 via-white/10 to-secondary/30" />

          <div className="space-y-12">
            {LINEAGE_EVENTS.map((event, index) => (
              <div key={index} className="flex gap-8 relative">
                {/* Dot */}
                <div className="shrink-0 pt-1">
                  <span
                    className={`block w-[22px] h-[22px] rounded-full border-2 border-background ${PHASE_DOTS[event.phase]}`}
                    aria-hidden="true"
                  />
                </div>

                {/* Content */}
                <div className="pb-2 space-y-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-2xl font-bold text-white font-mono">{event.year}</span>
                    <span className="text-xs font-mono tracking-widest uppercase text-muted-foreground">{event.era}</span>
                    <span
                      className={`text-xs font-mono tracking-widest uppercase px-2 py-0.5 rounded-full border ${
                        event.phase === "perception" ? "text-primary border-primary/30" :
                        event.phase === "affect"     ? "text-accent border-accent/30" :
                        event.phase === "expression" ? "text-secondary border-secondary/30" :
                                                       "text-white/50 border-white/20"
                      }`}
                    >
                      {PHASE_LABELS[event.phase]}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-white">{event.title}</h3>
                  <p className="text-foreground/80 leading-relaxed">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
