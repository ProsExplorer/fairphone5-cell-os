import { Link } from "wouter";
import { EdgeNodeSection } from "../components/EdgeNodeSection";
import { CodeSnippet } from "../components/CodeSnippet";
import { QUANTIZATION_LAYERS } from "@/domain/content/quantizationBiology";
import { CELL_ZONES } from "@/features/cell-shell/CellShellProvider";

const QNN_NATIVE_SNIPPET = `enum QNNBackend {
    QNN_BACKEND_CPU = 0,
    QNN_BACKEND_GPU = 1,
    QNN_BACKEND_NPU = 2,
};

static ggml_backend_t ggml_backend_qnn_init(size_t dev_num, const char * dev_name) {
    if (dev_num >= GGML_QNN_MAX_DEVICES) {
        return nullptr;
    }
    qnn_instance * instance = new qnn_instance(dev_num);
    if (instance->qnn_init(nullptr) != 0) {
        delete instance;
        return nullptr;
    }
    ggml_backend_qnn_context * ctx = new ggml_backend_qnn_context();
    ctx->device   = dev_num;
    ctx->instance = instance;
    return ggml_backend_init(&ggml_backend_qnn_interface, ctx);
}`;

const QUANT_SNIPPET = `// src/domain/content/quantizationBiology.ts
// The precision cascade — four quantization formats mapped to their
// biological analogues. Each halving of bits mirrors a compression step
// in the cellular hierarchy, from genome to ATP.

export const QUANTIZATION_LAYERS: QuantizationLayer[] = [
  {
    format: "FP32",  bitsPerWeight: 32,  compressionRatio: 1.0,
    model1BSize: "~4 GB",
    biologicalAnalogue: "Nucleus · DNA — complete genome at full resolution",
    hardwareUnit: "CPU / Adreno GPU — Hexagon HTA does not accelerate FP32",
    metabolicCost: "maximum",
  },
  {
    format: "FP16",  bitsPerWeight: 16,  compressionRatio: 0.5,
    model1BSize: "~2 GB",
    biologicalAnalogue: "Endoplasmic Reticulum · mRNA — targeted excerpt of the genome",
    hardwareUnit: "Adreno 643 GPU — FP16 doubles effective compute throughput",
    metabolicCost: "high",
  },
  {
    format: "INT8",  bitsPerWeight: 8,   compressionRatio: 0.25,
    model1BSize: "~1 GB",
    biologicalAnalogue: "Ribosomes · tRNA — quantized codon-to-amino-acid lookup table",
    hardwareUnit: "Hexagon HVX — 128 INT8 values per clock, dual 1024-bit SIMD units",
    metabolicCost: "moderate",
  },
  {
    format: "INT4",  bitsPerWeight: 4,   compressionRatio: 0.125,
    model1BSize: "~500 MB",
    biologicalAnalogue: "Mitochondria · ATP — minimum viable chemical energy token",
    hardwareUnit: "Hexagon HTA — native INT4 K-quant inference, ~10× faster than CPU",
    metabolicCost: "minimum",
  },
];

// INT4 = ATP. The minimum viable token. Small enough for a phone.`;

/**
 * MitochondriaPanel — the power zone: EdgeNode + precision cascade.
 *
 * Narrative:
 *   1. Zone frame  — what the Mitochondria zone IS in Cell OS, and why
 *   2. The code    — QUANTIZATION_LAYERS driving the cascade
 *   3. EdgeNode    — the physical instantiation of the principle (live LLM)
 *   4. Precision Cascade — the mechanism visualised
 */
export function MitochondriaPanel() {
  return (
    <div>

      {/* ── 1. Zone frame ─────────────────────────────────────────────── */}
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
              is the cell's power plant — it synthesises ATP from raw fuel, entirely on-site.
              The cell doesn't request energy from somewhere else. It makes it.
              That is the defining property of the Mitochondria zone: <em>autonomous generation</em>.
            </p>

            <p className="text-muted-foreground text-base leading-relaxed max-w-3xl">
              Translated to an operating system: can this device generate intelligence locally,
              without a server, without a cloud account, without a round trip? The answer is
              called the <span className="text-white font-medium">EdgeNode</span>.
            </p>
          </div>

          {/* Two structural reasons */}
          <div className="space-y-4">
            <p className="text-xs font-mono tracking-widest uppercase text-muted-foreground">
              The mapping is structural, not decorative
            </p>

            <div className="grid md:grid-cols-2 gap-5">
              <div
                className="glass-panel rounded-2xl p-6 border space-y-4"
                style={{ borderColor: "#fb923c18" }}
              >
                <span className="text-xs font-mono tracking-widest uppercase" style={{ color: "#fb923c" }}>
                  Reason 1 — Power Independence
                </span>
                <p className="text-sm text-foreground/85 leading-relaxed">
                  Mitochondria don't request energy from somewhere else — they generate it.
                  The mitochondrial membrane, the electron transport chain, the ATP synthase
                  rotor — all on-site chemistry. No external dependency.
                </p>
                <p className="text-sm text-foreground/85 leading-relaxed">
                  The Fairphone 5 running an LLM on the Hexagon DSP does the same:
                  weights in local storage, inference on the HTA matrix units,
                  tokens arriving without any network round trip.
                </p>
                <p className="text-sm font-medium" style={{ color: "#fb923c" }}>
                  "The Proof" is that this actually runs — on a phone, on hardware
                  not designed for it, by a company that makes phones to last.
                </p>
              </div>

              <div
                className="glass-panel rounded-2xl p-6 border space-y-4"
                style={{ borderColor: "#fb923c18" }}
              >
                <span className="text-xs font-mono tracking-widest uppercase" style={{ color: "#fb923c" }}>
                  Reason 2 — The Efficiency Cascade
                </span>
                <p className="text-sm text-foreground/85 leading-relaxed">
                  The electron transport chain is a cascade of progressive extraction:
                  Complex I → II → III → IV → ATP synthase. Each stage extracts more from
                  the electron's descent. Minimum viable output: one ATP.
                </p>
                <p className="text-sm text-foreground/85 leading-relaxed">
                  The quantization precision cascade mirrors this exactly:{" "}
                  <span className="font-mono" style={{ color: "#fb923c" }}>
                    FP32 → FP16 → INT8 → INT4
                  </span>.
                  Same meaning. Fewer bits. Less energy at each stage.
                </p>
                <p className="text-sm font-mono font-bold" style={{ color: "#fb923c" }}>
                  INT4 = ATP — minimum viable token.
                </p>
              </div>
            </div>
          </div>

          {/* P→A→E cycle */}
          <div className="space-y-4">
            <p className="text-xs font-mono tracking-widest uppercase text-muted-foreground">
              The EdgeNode breathes the same triadic cycle as every Cell OS zone
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  phase: "P — Perception", glyph: "門", color: "#22d3ee",
                  bio: "Glucose + O₂ arrive at the outer mitochondrial membrane — complete fuel before the chain begins.",
                  os:  "Full prompt is read before any token is produced. Complete input. No partial response.",
                },
                {
                  phase: "A — Affect", glyph: "室", color: "#34d399",
                  bio: "Electron transport chain runs — a sustained reaction across four protein complexes in dedicated hardware.",
                  os:  "HTA matrix multiply accumulates attention across all token pairs. Sustained chain. Dedicated silicon.",
                },
                {
                  phase: "E — Expression", glyph: "窗", color: "#a3e635",
                  bio: "ATP synthase releases one ATP — a discrete, portable unit of chemical potential.",
                  os:  "One token decoded and streamed to screen. Irreducibly singular. Powers everything downstream.",
                },
              ].map(({ phase, glyph, color, bio, os }) => (
                <div key={phase} className="glass-panel rounded-xl p-5 border border-white/5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl" aria-hidden="true">{glyph}</span>
                    <span className="text-xs font-mono tracking-widest uppercase" style={{ color }}>{phase}</span>
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

      {/* ── 2. The code ───────────────────────────────────────────────── */}
      <div className="px-6 py-14 border-b border-white/5">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="space-y-2">
            <p className="text-xs font-mono tracking-widest uppercase" style={{ color: "rgba(251,146,60,0.5)" }}>
              The cascade in code
            </p>
            <h3 className="text-lg font-bold text-white">
              The TypeScript that defines the precision cascade
            </h3>
            <p className="text-sm text-muted-foreground/70 leading-relaxed">
              The Precision Cascade grid below is not hardcoded markup — it is rendered
              directly from this data structure. Every biological analogue, compression
              ratio, hardware unit, and metabolic cost label you see is defined once here
              and read by the UI. The code and the concept are the same thing.
            </p>
          </div>

          <CodeSnippet filename="src/domain/content/quantizationBiology.ts">
            {QUANT_SNIPPET}
          </CodeSnippet>

          {/* ── Native reality ──────────────────────────────────────── */}
          <div className="pt-4 border-t border-white/5 space-y-4">
            <p className="text-xs font-mono tracking-widest uppercase" style={{ color: "rgba(251,146,60,0.3)" }}>
              The same cascade in native C++
            </p>
            <p className="text-sm text-muted-foreground/60 leading-relaxed">
              The TypeScript above describes the cascade. The code below <em>is</em> the cascade —
              the actual enum in <code className="font-mono text-xs" style={{ color: "rgba(251,146,60,0.55)" }}>llama.cpp</code> that
              selects which compute unit handles each transformer layer on the Fairphone 5's silicon.
            </p>
            <CodeSnippet
              filename="ggml/src/ggml-qnn.cpp"
              language="c++"
              sourceUrl="https://github.com/ggml-org/llama.cpp/blob/master/ggml/src/ggml-qnn.cpp"
            >{QNN_NATIVE_SNIPPET}</CodeSnippet>
          </div>
        </div>
      </div>

      {/* ── 3. EdgeNode — the live implementation ─────────────────────── */}
      <EdgeNodeSection />

      {/* ── 4. Precision Cascade — the mechanism visualised ──────────── */}
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
