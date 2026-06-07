import { Link } from "wouter";

const GATE_POSITIONS = Array.from({ length: 8 }, (_, i) => {
  const a = (i * Math.PI * 2) / 8;
  return { x: Math.sin(a) * 22, y: -Math.cos(a) * 22 };
});

/**
 * NucleusPanel — the core identity of Cell OS.
 *
 * The innermost zone. This is the DNA of the concept: who we are, why we exist,
 * and the philosophical nucleus that all other zones orbit.
 */
export function NucleusPanel() {
  return (
    <div
      className="min-h-full flex flex-col items-center justify-center px-8 py-20 text-center relative"
    >
      {/* Ambient nucleus glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(34,211,238,0.08) 0%, transparent 70%)" }}
      />

      <div className="relative max-w-2xl mx-auto space-y-8">
        {/* Concept badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-primary/30 text-primary font-mono text-sm tracking-widest uppercase">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          Concept: Fairphone 5
        </div>

        {/* Title */}
        <h1 className="text-6xl md:text-7xl font-bold text-white text-glow">Cell OS</h1>

        <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
          Reimagining the smartphone not as a machine, but as a{" "}
          <span className="text-white">self-sustaining living organism</span>.
        </p>

        <p className="text-base text-muted-foreground/65 max-w-lg mx-auto leading-relaxed">
          Alive, adaptive, sustainable, and private by nature. Navigate outward through
          the cell's zones to explore how biology informs the ultimate operating system.
        </p>

        {/* Harmonic constant */}
        <p className="text-xs font-mono text-muted-foreground/35 tracking-widest">
          尺度不變性 · One pattern · Ten scales · 0.7770777
        </p>

        {/* Nuclear pore — gateway to philosophy */}
        <div className="flex flex-col items-center gap-2 pt-4">
          <Link href="/philosophy" className="group flex flex-col items-center gap-2">
            <div className="relative w-14 h-14 shrink-0">
              <div className="absolute inset-0 rounded-full border border-primary/15 group-hover:border-primary/40 transition-all duration-[777ms]" />
              <div className="absolute inset-0 rounded-full border border-primary/5 animate-pulse-slow" />
              {GATE_POSITIONS.map(({ x, y }, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 rounded-full bg-primary/20 group-hover:bg-primary/55 transition-colors duration-[777ms]"
                  style={{
                    left: `calc(50% + ${x}px - 2px)`,
                    top: `calc(50% + ${y}px - 2px)`,
                  }}
                />
              ))}
              <div className="absolute inset-[14px] rounded-full border border-primary/10 flex items-center justify-center bg-primary/[0.03] group-hover:bg-primary/[0.08] transition-all duration-[777ms]">
                <span className="text-[11px] font-mono text-primary/35 group-hover:text-primary/70 transition-colors duration-[777ms]">
                  核
                </span>
              </div>
            </div>
            <p className="font-mono text-[9px] tracking-[0.22em] text-muted-foreground/25 group-hover:text-muted-foreground/55 uppercase transition-colors duration-[777ms]">
              Nuclear Pore · Philosophy & Sources
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
