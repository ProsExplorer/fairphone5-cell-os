import { useState } from "react";
import { FRACTAL_CYCLES } from "@/domain/content/fractalCycles";
import { CELL_ZONES } from "@/features/cell-shell/CellShellProvider";
import type { CellZoneId, FractalPhase } from "@/domain/types";

// ─── Phase styling ─────────────────────────────────────────────────────────────

const PHASE_COLORS: Record<string, string> = {
  perception: "#22d3ee",
  affect:     "#a3e635",
  expression: "#c084fc",
};

const PHASE_GLYPHS: Record<string, string> = {
  perception: "門",
  affect:     "室",
  expression: "窗",
};

type NavDepth =
  | { level: 0 }
  | { level: 1; zoneId: CellZoneId }
  | { level: 2; zoneId: CellZoneId; phase: FractalPhase };

/**
 * Fractal Navigator — three-level drill-down into the cell's self-similar structure.
 *
 * Depth 0: The whole cell — 8 zone tiles
 * Depth 1: One zone's internal P→A→E cycle
 * Depth 2: One phase's narrative + scale example + hardware analogue
 *
 * Maximum depth = 2. The navigator does not recurse further: the pattern
 * continues infinitely at smaller scales, but the UI stops here to avoid regress.
 */
export function FractalNavigator() {
  const [nav, setNav] = useState<NavDepth>({ level: 0 });

  const activeZoneCycle =
    (nav.level === 1 || nav.level === 2)
      ? FRACTAL_CYCLES.find((c) => c.zoneId === nav.zoneId) ?? null
      : null;

  const activePhase = nav.level === 2 ? nav.phase : null;

  return (
    <section className="relative z-10 py-32 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* Header */}
        <div className="text-center space-y-4">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border text-sm font-mono tracking-widest uppercase"
            style={{ borderColor: "rgba(192,132,252,0.3)", color: "#c084fc" }}
          >
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            尺度不變性 · Fractal Navigator
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            Every Zone Is a Cell
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Scale invariance means the PERCEPTION → AFFECT → EXPRESSION cycle exists
            at every level. Each organelle zone contains its own complete triadic cycle.
            Navigate inward to see it.
          </p>
        </div>

        {/* Breadcrumb trail */}
        <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground/40 flex-wrap">
          <button
            onClick={() => setNav({ level: 0 })}
            className="hover:text-white transition-colors"
            style={{ color: nav.level === 0 ? "white" : undefined }}
          >
            Cell
          </button>
          {(nav.level === 1 || nav.level === 2) && activeZoneCycle && (
            <>
              <span>/</span>
              <button
                onClick={() => setNav({ level: 1, zoneId: nav.zoneId })}
                className="hover:text-white transition-colors"
                style={{ color: nav.level === 1 ? CELL_ZONES[nav.zoneId].color : undefined }}
              >
                {CELL_ZONES[nav.zoneId].name}
              </button>
            </>
          )}
          {nav.level === 2 && activePhase && (
            <>
              <span>/</span>
              <span style={{ color: PHASE_COLORS[activePhase.id] }}>
                {activePhase.id.toUpperCase()}
              </span>
            </>
          )}
          {nav.level > 0 && (
            <button
              onClick={() =>
                setNav(
                  nav.level === 2
                    ? { level: 1, zoneId: nav.zoneId }
                    : { level: 0 }
                )
              }
              className="ml-auto text-muted-foreground/30 hover:text-white transition-colors flex items-center gap-1"
            >
              ← Back
            </button>
          )}
        </div>

        {/* ── DEPTH 0: Cell overview ─────────────────────────────────────── */}
        {nav.level === 0 && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground/50 text-center">
              Select an organelle zone to navigate into its internal P→A→E cycle.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {FRACTAL_CYCLES.map((cycle) => {
                const zone = CELL_ZONES[cycle.zoneId];
                return (
                  <button
                    key={cycle.zoneId}
                    onClick={() => setNav({ level: 1, zoneId: cycle.zoneId })}
                    className="group glass-panel rounded-2xl border p-6 text-left hover:scale-[1.02] active:scale-[0.98] transition-all duration-[777ms] focus:outline-none focus-visible:ring-2"
                    style={{ borderColor: `${zone.color}20` }}
                  >
                    <div
                      className="text-4xl mb-3 transition-colors duration-[777ms]"
                      style={{ color: `${zone.color}60` }}
                    >
                      {zone.glyph}
                    </div>
                    <div
                      className="font-bold text-white text-sm mb-1 group-hover:text-opacity-100 transition-colors"
                    >
                      {zone.name}
                    </div>
                    <div className="text-[10px] font-mono text-muted-foreground/35 mb-3">{zone.osFeature}</div>
                    <div className="text-[10px] font-mono text-muted-foreground/30 group-hover:text-muted-foreground/60 transition-colors">
                      {cycle.cycleTitle}
                    </div>
                    <div
                      className="mt-3 flex gap-1"
                    >
                      {(["perception", "affect", "expression"] as const).map((ph) => (
                        <div
                          key={ph}
                          className="h-0.5 flex-1 rounded-full"
                          style={{ background: `${PHASE_COLORS[ph]}40` }}
                        />
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ── DEPTH 1: Zone P→A→E cycle ──────────────────────────────────── */}
        {nav.level === 1 && activeZoneCycle && (
          <div
            className="animate-in fade-in slide-in-from-bottom-4 duration-[777ms]"
          >
            {/* Zone header */}
            <div className="glass-panel rounded-2xl border p-6 mb-6 flex items-center gap-5" style={{ borderColor: `${CELL_ZONES[nav.zoneId].color}20` }}>
              <span className="text-5xl" style={{ color: `${CELL_ZONES[nav.zoneId].color}70` }}>
                {CELL_ZONES[nav.zoneId].glyph}
              </span>
              <div>
                <h3 className="text-2xl font-bold text-white">{activeZoneCycle.cycleTitle}</h3>
                <p className="text-sm text-muted-foreground mt-1 max-w-xl">{activeZoneCycle.cycleDescription}</p>
              </div>
            </div>

            {/* Three phase cards */}
            <div className="grid md:grid-cols-3 gap-5">
              {activeZoneCycle.phases.map((phase) => (
                <button
                  key={phase.id}
                  onClick={() => setNav({ level: 2, zoneId: nav.zoneId, phase })}
                  className="group glass-panel rounded-2xl border text-left p-6 hover:scale-[1.01] active:scale-[0.99] transition-all duration-[777ms] focus:outline-none space-y-4"
                  style={{ borderColor: `${PHASE_COLORS[phase.id]}20` }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="text-2xl font-bold"
                      style={{ color: `${PHASE_COLORS[phase.id]}70` }}
                    >
                      {PHASE_GLYPHS[phase.id]}
                    </span>
                    <span
                      className="font-mono text-xs tracking-widest uppercase font-bold"
                      style={{ color: PHASE_COLORS[phase.id] }}
                    >
                      {phase.id}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">{phase.title}</h4>
                    <p className="text-sm text-muted-foreground/70 leading-relaxed line-clamp-3">
                      {phase.description}
                    </p>
                  </div>
                  <div
                    className="text-[10px] font-mono text-muted-foreground/30 group-hover:text-muted-foreground/55 transition-colors flex items-center gap-1"
                    style={{ color: `${PHASE_COLORS[phase.id]}40` }}
                  >
                    Scale: {phase.scaleLabel} · Expand →
                  </div>
                </button>
              ))}
            </div>

            {/* Depth limit notice */}
            <div className="mt-6 text-center text-[11px] font-mono text-muted-foreground/25">
              Depth 1 of 2 · Each phase contains further cycles at smaller scales —
              the pattern continues inward without end
            </div>
          </div>
        )}

        {/* ── DEPTH 2: Phase detail ───────────────────────────────────────── */}
        {nav.level === 2 && activePhase && activeZoneCycle && (
          <div
            className="animate-in fade-in slide-in-from-bottom-4 duration-[777ms]"
          >
            <div
              className="glass-panel rounded-3xl border p-8 md:p-12 space-y-8"
              style={{ borderColor: `${PHASE_COLORS[activePhase.id]}20` }}
            >
              {/* Phase identity */}
              <div className="flex items-start gap-6">
                <div>
                  <div className="text-7xl leading-none mb-2" style={{ color: `${PHASE_COLORS[activePhase.id]}60` }}>
                    {PHASE_GLYPHS[activePhase.id]}
                  </div>
                  <div
                    className="font-mono text-xs tracking-[0.25em] uppercase"
                    style={{ color: PHASE_COLORS[activePhase.id] }}
                  >
                    {activePhase.id}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-2xl font-bold text-white mb-1">{activePhase.title}</h3>
                  <div className="text-sm text-muted-foreground/40 font-mono">
                    {CELL_ZONES[nav.zoneId].name} · Scale: {activePhase.scaleLabel}
                  </div>
                </div>
              </div>

              {/* Full narrative */}
              <div className="border-l-2 pl-6 space-y-3" style={{ borderColor: `${PHASE_COLORS[activePhase.id]}30` }}>
                <p className="text-foreground/85 leading-relaxed text-base">
                  {activePhase.description}
                </p>
              </div>

              {/* Hardware analogue */}
              {activePhase.hardwareAnalogue && (
                <div
                  className="rounded-xl border p-5 space-y-2"
                  style={{ borderColor: "rgba(129,140,248,0.2)", background: "rgba(129,140,248,0.04)" }}
                >
                  <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-indigo-400/60">
                    Digital Analogue · Silicon Scale
                  </p>
                  <p className="text-sm text-muted-foreground/70 leading-relaxed">
                    {activePhase.hardwareAnalogue}
                  </p>
                </div>
              )}

              {/* Depth limit */}
              <div className="text-center text-[11px] font-mono text-muted-foreground/20 pt-4 border-t border-white/5">
                Depth 2 of 2 · Maximum navigator depth reached ·
                The triadic cycle continues below this level at molecular and quantum scales
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
