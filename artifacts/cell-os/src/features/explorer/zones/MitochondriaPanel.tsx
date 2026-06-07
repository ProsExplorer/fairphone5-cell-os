import { Link } from "wouter";
import { EdgeNodeSection } from "../components/EdgeNodeSection";
import { QUANTIZATION_LAYERS } from "@/domain/content/quantizationBiology";
import { CELL_ZONES } from "@/features/cell-shell/CellShellProvider";

/**
 * MitochondriaPanel — the power zone: EdgeNode + precision cascade.
 *
 * Narrative structure:
 *   1. Zone frame  — what the Mitochondria zone IS in Cell OS, and why
 *   2. EdgeNode    — the physical instantiation of that principle (live LLM)
 *   3. Precision Cascade — the mechanism that makes it fit on a phone
 */
export function MitochondriaPanel() {
  return (
    <div>

      {/* ── 1. Zone frame ────────────────────────────────────────────────
          This section answers: "Why is the Mitochondria zone in Cell OS
          the EdgeNode?" before the user sees any EdgeNode content.
          It is the conceptual key that makes everything below legible.
      ─────────────────────────────────────────────────────────────── */}
      <div className="px-6 py-16 border-b border-white/5">
        <div className="max-w-5xl mx-auto space-y-12">

          {/* Zone identity */}
          <div className="space-y-4">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full font-mono text-xs tracking-widest uppercase border"
              style={{ color: "#fb923c", borderColor: "#fb923c30", background: "#fb923c08" }}
            >
              <span className="text-base leading-none">粒</span>
              <span>Mitochondria · Power Zone</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              Can this device generate intelligence<br className="hidden md:block" /> without asking anyone else?
            </h2>

            <p className="text-muted-foreground text-base leading-relaxed max-w-3xl">
              In Cell OS, every OS feature maps to a part of the human cell. The Mitochondria
              is the cell's power plant — the organelle that synthesises ATP from raw fuel,
              entirely on-site. The cell doesn't request energy from somewhere else. It makes it.
              That is the defining property of the Mitochondria zone: <em>autonomous generation</em>.
            </p>

            <p className="text-muted-foreground text-base leading-relaxed max-w-3xl">
              Translated to an operating system: can this device generate intelligence the same
              way — locally, without a server, without a cloud account, without a round trip across
              the internet? The Mitochondria zone in Cell OS is where that question is answered.
              The answer is called the <span className="text-white font-medium">EdgeNode</span>.
            </p>
          </div>

          {/* Two structural reasons — why this mapping is not loose metaphor */}
          <div className="space-y-4">
            <p className="text-xs font-mono tracking-widest uppercase text-muted-foreground">
              The mapping is structural, not decorative
            </p>

            <div className="grid md:grid-cols-2 gap-5">

              {/* Power independence */}
              <div
                className="glass-panel rounded-2xl p-6 border space-y-4"
                style={{ borderColor: "#fb923c18" }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono tracking-widest uppercase" style={{ color: "#fb923c" }}>
                    Reason 1 — Power Independence
                  </span>
                </div>

                <p className="text-sm text-foreground/85 leading-relaxed">
                  Mitochondria don't request energy from somewhere else — they generate it.
                  The mitochondrial membrane, the electron transport chain, the ATP synthase
                  rotor — all of it is on-site chemistry. When the cell needs energy, the
                  mitochondrion makes it. This is autonomy at the molecular level.
                </p>

                <p className="text-sm text-foreground/85 leading-relaxed">
                  The Fairphone 5 running an LLM on the Hexagon DSP is doing the same thing
                  computationally. Weights live in local storage. Inference runs on the Hexagon's
                  HTA matrix units. Tokens arrive without any network round trip.
                </p>

                <p className="text-sm font-medium" style={{ color: "#fb923c" }}>
                  "The Proof" is that this actually runs — on a phone, on hardware
                  that was not designed for it, by a company that makes phones to last.
                </p>
              </div>

              {/* Efficiency cascade */}
              <div
                className="glass-panel rounded-2xl p-6 border space-y-4"
                style={{ borderColor: "#fb923c18" }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono tracking-widest uppercase" style={{ color: "#fb923c" }}>
                    Reason 2 — The Efficiency Cascade
                  </span>
                </div>

                <p className="text-sm text-foreground/85 leading-relaxed">
                  The mitochondrion doesn't convert fuel to ATP in one step. The electron
                  transport chain is a series of four protein complexes — each one extracting
                  a little more energy from the electron's descent, building the proton gradient
                  that drives the ATP synthase rotor. Minimum viable output: one ATP molecule.
                </p>

                <p className="text-sm text-foreground/85 leading-relaxed">
                  The quantization precision cascade mirrors this exactly:{" "}
                  <span className="font-mono" style={{ color: "#fb923c" }}>
                    FP32 → FP16 → INT8 → INT4
                  </span>.
                  Each step compresses further — same meaning, fewer bits, less energy.
                </p>

                <p className="text-sm font-mono font-bold" style={{ color: "#fb923c" }}>
                  INT4 = ATP — the minimum viable token. Small enough for a phone.
                  Coherent enough to carry meaning.
                </p>
              </div>

            </div>
          </div>

          {/* P→A→E cycle — the EdgeNode's three phases, named explicitly */}
          <div className="space-y-4">
            <p className="text-xs font-mono tracking-widest uppercase text-muted-foreground">
              The EdgeNode breathes the same triadic cycle as every Cell OS zone
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  phase: "P — Perception",
                  glyph: "門",
                  color: "#22d3ee",
                  bio: "Mitochondria receive glucose + O₂ — complete fuel arrival before the chain begins.",
                  os:  "The full prompt is read before any token is produced. Complete input before response.",
                },
                {
                  phase: "A — Affect",
                  glyph: "室",
                  color: "#34d399",
                  bio: "The electron transport chain runs — a sustained reaction in dedicated protein hardware.",
                  os:  "HTA matrix multiply accumulates attention across all token pairs. Dedicated silicon, sustained chain.",
                },
                {
                  phase: "E — Expression",
                  glyph: "窗",
                  color: "#a3e635",
                  bio: "ATP synthase releases one ATP — a discrete, portable unit of chemical potential.",
                  os:  "One token is decoded and streamed to screen. Irreducibly singular. Powers everything downstream.",
                },
              ].map(({ phase, glyph, color, bio, os }) => (
                <div
                  key={phase}
                  className="glass-panel rounded-xl p-5 border border-white/5 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-3xl" aria-hidden="true">{glyph}</span>
                    <span className="text-xs font-mono tracking-widest uppercase" style={{ color }}>
                      {phase}
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground/60 leading-relaxed border-l-2 pl-3" style={{ borderColor: `${color}40` }}>
                    <span className="text-muted-foreground/40 font-mono uppercase text-[9px] block mb-1">Biology</span>
                    {bio}
                  </p>
                  <p className="text-[11px] text-foreground/75 leading-relaxed border-l-2 pl-3" style={{ borderColor: `${color}80` }}>
                    <span className="font-mono uppercase text-[9px] block mb-1" style={{ color }}>Cell OS</span>
                    {os}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ── 2. EdgeNode — the live implementation ──────────────────────── */}
      <EdgeNodeSection />

      {/* ── 3. Precision Cascade — the mechanism ────────────────────────── */}
      <div className="px-6 py-12 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Precision Cascade</h3>
              <p className="text-sm text-muted-foreground">
                The electron transport chain in numbers —
                FP32 → INT4 · same signal, less energy at each stage.
              </p>
            </div>
            <Link
              href="/substrate"
              className="text-[11px] font-mono transition-colors shrink-0"
              style={{ color: "rgba(251,191,36,0.6)" }}
            >
              Full analysis →
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {QUANTIZATION_LAYERS.map((layer) => {
              const zone = CELL_ZONES[layer.biologicalZone];
              return (
                <div
                  key={layer.id}
                  className="glass-panel rounded-xl border p-4 space-y-2.5"
                  style={{ borderColor: `${layer.color}15` }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-sm" style={{ color: layer.color }}>
                      {layer.format}
                    </span>
                    <span className="text-base leading-none" style={{ color: `${zone.color}55` }}>
                      {zone.glyph}
                    </span>
                  </div>

                  <div className="h-1 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${Math.round(layer.compressionRatio * 100)}%`, background: layer.color, opacity: 0.75 }}
                    />
                  </div>

                  <p className="text-[10px] font-mono text-muted-foreground/40">
                    {layer.model1BSize} / 1 B params
                  </p>

                  <p className="text-[10px] text-muted-foreground/55 leading-snug">
                    {layer.biologicalAnalogue.split("·")[0].trim()}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
}
