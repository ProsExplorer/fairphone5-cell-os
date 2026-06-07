import { TRIAD_PHASES } from "@/domain/content/mappings";

/**
 * The design-philosophy section. Presents the perception -> affect -> expression
 * pattern that the code, the cell, and the chip all share. Grounded framing only:
 * a repeating structural pattern, not a metaphysical claim.
 */
export function TriadicFlow() {
  return (
    <section className="relative z-10 py-32 px-6 border-t border-white/5 bg-gradient-to-b from-background/60 to-background/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-secondary/30 text-secondary font-mono text-sm tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            Design Principle
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white text-glow-secondary">One Pattern, Three Scales</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Cell OS is organized around a single repeating shape: a signal is perceived, then processed, then expressed. The same structure governs the code behind this page, the living cell, and the phone's AI pipeline.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {TRIAD_PHASES.map((phase, index) => (
            <div key={phase.id} className="relative">
              <div className="glass-panel rounded-3xl p-8 h-full space-y-6 border border-white/5">
                <div className="flex items-center justify-between">
                  <span
                    className="text-5xl font-serif text-white/90 leading-none"
                    aria-hidden="true"
                  >
                    {phase.glyph}
                  </span>
                  <span className="text-sm font-mono tracking-widest uppercase text-muted-foreground">
                    0{index + 1}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-2xl font-bold text-white">{phase.title}</h3>
                  <p className="text-sm text-muted-foreground">{phase.gate}</p>
                </div>

                <div className="space-y-4 border-t border-white/10 pt-5">
                  <div className="space-y-1">
                    <div className="text-xs font-mono tracking-widest uppercase text-primary/80">In code</div>
                    <p className="text-sm text-foreground/85 leading-relaxed">{phase.codeRole}</p>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs font-mono tracking-widest uppercase text-accent/80">In the cell</div>
                    <p className="text-sm text-foreground/85 leading-relaxed">{phase.cellRole}</p>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs font-mono tracking-widest uppercase text-secondary/80">In the chip</div>
                    <p className="text-sm text-foreground/85 leading-relaxed">{phase.chipRole}</p>
                  </div>
                </div>
              </div>

              {index < TRIAD_PHASES.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-px bg-gradient-to-r from-white/30 to-transparent z-10" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
