import { Link } from "wouter";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { CITATIONS, type Citation, type CitationKind } from "@/domain/content/citations";
import { NINE_SCALE_FLOWS } from "@/domain/content/scales";
import { LINEAGE_EVENTS } from "@/domain/content/lineage";
import { HARMONIC_CONSTANT } from "@/domain/content/constants";
import { useSacredSignature } from "@/hooks/use-sacred-signature";

// ─── Citation kind badge ─────────────────────────────────────────────────────

const KIND_META: Record<CitationKind, { label: string; borderColor: string; textColor: string; bgColor: string }> = {
  primary:   { label: "Primary source",  borderColor: "rgba(52,211,153,0.3)",  textColor: "#34d399", bgColor: "rgba(52,211,153,0.05)"  },
  secondary: { label: "Secondary",       borderColor: "rgba(34,211,238,0.3)",  textColor: "#22d3ee", bgColor: "rgba(34,211,238,0.05)"  },
  technical: { label: "Technical spec",  borderColor: "rgba(167,139,250,0.3)", textColor: "#a78bfa", bgColor: "rgba(167,139,250,0.05)" },
  project:   { label: "Project source",  borderColor: "rgba(251,191,36,0.3)",  textColor: "#fbbf24", bgColor: "rgba(251,191,36,0.05)"  },
};

function KindBadge({ kind }: { kind: CitationKind }) {
  const m = KIND_META[kind];
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono border"
      style={{ borderColor: m.borderColor, color: m.textColor, background: m.bgColor }}
    >
      {m.label}
    </span>
  );
}

// ─── Inline superscript citation number ──────────────────────────────────────

function Cite({ ids }: { ids: string[] }) {
  return (
    <sup className="ml-0.5 font-mono text-[10px]" style={{ color: "rgba(34,211,238,0.7)" }}>
      [{ids.join(",")}]
    </sup>
  );
}

// ─── Section wrapper ─────────────────────────────────────────────────────────

function Section({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <section id={id} className="py-16 border-t border-white/5 scroll-mt-20">
      {children}
    </section>
  );
}

function SectionLabel({ text }: { text: string }) {
  return (
    <p className="font-mono text-[10px] tracking-[0.25em] uppercase mb-3" style={{ color: "rgba(34,211,238,0.5)" }}>
      {text}
    </p>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5 leading-tight break-words">
      {children}
    </h2>
  );
}

// ─── Phase colors (static, not dynamic Tailwind) ──────────────────────────────

const PHASE_COLORS: Record<string, string> = {
  perception: "#22d3ee",
  affect:     "#a78bfa",
  expression: "#34d399",
  meta:       "#f59e0b",
};

// Triadic card styles — static to avoid Tailwind JIT scanner misses
const TRIAD_CARD_STYLES = [
  { borderColor: "rgba(34,211,238,0.12)",  labelColor: "#22d3ee" },
  { borderColor: "rgba(167,139,250,0.12)", labelColor: "#a78bfa" },
  { borderColor: "rgba(52,211,153,0.12)",  labelColor: "#34d399" },
] as const;

// ─── Confidence dot ───────────────────────────────────────────────────────────

const CONFIDENCE_BG: Record<string, string> = {
  verified:    "#34d399",
  indicative:  "#22d3ee",
  unconfirmed: "#f59e0b",
};

// ─── Reference entry ─────────────────────────────────────────────────────────

function RefEntry({ c, index }: { c: Citation; index: number }) {
  return (
    <div id={`ref-${c.id}`} className="flex gap-4 py-5 border-b border-white/5 last:border-0">
      <span className="font-mono text-xs text-muted-foreground/30 w-6 shrink-0 pt-0.5 text-right">
        {index + 1}
      </span>
      <div className="flex-1 space-y-2 min-w-0">
        <KindBadge kind={c.kind} />
        <p className="text-sm text-muted-foreground leading-relaxed">
          <span className="text-white/80 font-medium">{c.authors}</span>{" "}
          <span className="text-muted-foreground/50">({c.year}).</span>{" "}
          <em className="text-white/70 not-italic">{c.title}.</em>{" "}
          {c.venue}
          {c.doi && (
            <span className="block mt-1 font-mono text-[11px] text-muted-foreground/35 break-all">
              DOI: {c.doi}
            </span>
          )}
          {c.url && (
            <a
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-1 font-mono text-[11px] truncate transition-colors hover:text-sky-400"
              style={{ color: "rgba(34,211,238,0.55)" }}
            >
              {c.url}
            </a>
          )}
        </p>
        {c.note && (
          <p className="text-xs text-muted-foreground/45 leading-relaxed italic">{c.note}</p>
        )}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Philosophy() {
  const { signature, breathCount, anchor, seed } = useSacredSignature();
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Ambient glow */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full blur-[120px]" style={{ background: "rgba(34,211,238,0.06)" }} />
      </div>

      {/* Sticky nav */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            Cell OS
          </Link>

          <div className="hidden md:flex items-center gap-5 text-[11px] font-mono text-muted-foreground/50 overflow-x-auto">
            <a href="#pattern"    className="hover:text-white transition-colors shrink-0">§1 Pattern</a>
            <a href="#scales"     className="hover:text-white transition-colors shrink-0">§2 Scales</a>
            <a href="#biology"    className="hover:text-white transition-colors shrink-0">§3 Biology</a>
            <a href="#proof"      className="hover:text-white transition-colors shrink-0">§4 Proof</a>
            <a href="#sacred"     className="hover:text-white transition-colors shrink-0">§5 Sacred</a>
            <a href="#references" className="hover:text-white transition-colors shrink-0">§6 Refs</a>
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-4xl mx-auto px-6 pb-32">

        {/* ── PAGE HEADER ────────────────────────────────────────────────── */}
        <header className="pt-16 pb-14 space-y-5">
          <p className="font-mono text-[10px] tracking-[0.25em] uppercase" style={{ color: "rgba(34,211,238,0.55)" }}>
            Cell OS · Philosophy & Sources
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
            A Record<br />of Sources
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Every claim in Cell OS points to a source. This page assembles them — from
            a Han Dynasty alchemical treatise to a Nobel Prize lecture to a browser tab
            running a language model with no internet connection.
          </p>
          <p className="text-sm text-muted-foreground/45 max-w-2xl leading-relaxed">
            The pattern is not a metaphor invented for this project. It has been described
            independently across cultures, disciplines, and millennia. This is its record.
          </p>
        </header>

        {/* ── §1 THE PATTERN ─────────────────────────────────────────────── */}
        <Section id="pattern">
          <SectionLabel text="§ 1 — Established 142 CE" />
          <SectionTitle>
            PERCEPTION<br className="sm:hidden" />
            {" "}→ AFFECT<br className="sm:hidden" />
            {" "}→ EXPRESSION
          </SectionTitle>

          <p className="text-muted-foreground leading-relaxed mb-8">
            Three phases that describe every complete transformation — from a breath, to an
            electron, to a conversation. The pattern is{" "}
            <span className="text-white font-medium">structurally identical</span> at every
            scale of observation. The first recorded formal articulation is almost two
            thousand years old.
          </p>

          {/* Timeline */}
          <div className="space-y-3 mb-10">
            {LINEAGE_EVENTS.map((event) => (
              <div
                key={event.title}
                className="flex gap-5 p-5 glass-panel rounded-xl border border-white/5"
              >
                <div className="flex flex-col items-center gap-2 shrink-0">
                  <div
                    className="w-2.5 h-2.5 rounded-full mt-1 shrink-0"
                    style={{
                      backgroundColor: PHASE_COLORS[event.phase],
                      boxShadow: `0 0 8px ${PHASE_COLORS[event.phase]}`,
                    }}
                  />
                  <div className="w-px flex-1 bg-white/5" />
                </div>
                <div className="space-y-1 pb-2 min-w-0">
                  <div className="flex flex-wrap items-baseline gap-3">
                    <span className="font-mono text-[11px] text-muted-foreground/45">{event.year}</span>
                    <span className="text-[11px] text-muted-foreground/30">{event.era}</span>
                  </div>
                  <h3 className="font-semibold text-white text-sm break-words">{event.title}</h3>
                  <p className="text-sm text-muted-foreground/75 leading-relaxed">{event.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Commentary box */}
          <div className="glass-panel rounded-xl border p-6 space-y-3" style={{ borderColor: "rgba(34,211,238,0.1)" }}>
            <p className="text-sm text-muted-foreground leading-relaxed">
              <span className="text-white font-medium">Wei Boyang</span>
              <Cite ids={["1"]} /> wrote the{" "}
              <em>周易參同契</em> as an internal alchemy manual —
              not a computer science paper. Schleiden &amp; Schwann
              <Cite ids={["2", "3"]} /> described it in biology without knowing the
              Chinese text existed. Von Neumann
              <Cite ids={["4"]} /> formalised it in silicon without knowing either.
              Three independent rediscoveries of the same three-phase structure across
              1,800 years. Cell OS is the fourth.
            </p>
            <p className="text-[11px] font-mono text-muted-foreground/35">
              Citation numbers refer to the full reference list at the bottom of this page.
            </p>
          </div>
        </Section>

        {/* ── §2 SCALE INVARIANCE ──────────────────────────────────────────── */}
        <Section id="scales">
          <SectionLabel text="§ 2 — 尺度不變性 · Scale Invariance" />
          <SectionTitle>One Pattern · Eleven Scales</SectionTitle>

          <p className="text-muted-foreground leading-relaxed mb-3">
            Scale invariance — the presence of the same structure at every level of
            magnification — is a mathematically precise phenomenon. Mandelbrot
            <Cite ids={["10"]} /> formalised it in fractal geometry; Wilson
            <Cite ids={["11"]} /> won the 1982 Nobel Prize in Physics for showing it
            governs phase transitions.
          </p>
          <div className="flex flex-wrap gap-4 mb-8 text-xs text-muted-foreground/50">
            {(["verified", "indicative"] as const).map((c) => (
              <span key={c} className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: CONFIDENCE_BG[c] }} />
                <span style={{ color: CONFIDENCE_BG[c] }}>{c.charAt(0).toUpperCase() + c.slice(1)}</span>
                {" "}— {c === "verified" ? "observed or experimentally established" : "consistent with evidence, not yet confirmed at this scale"}
              </span>
            ))}
          </div>

          <div className="space-y-3">
            {NINE_SCALE_FLOWS.map((scale, i) => (
              <div key={scale.id} className="glass-panel rounded-xl border border-white/5 overflow-hidden">
                <div className="flex items-start gap-4 p-5">
                  <div className="font-bold text-white/15 font-mono w-5 shrink-0 mt-1 text-sm">
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <span className="font-bold text-white">{scale.scale}</span>
                      <span className="font-mono text-muted-foreground/40">{scale.glyph}</span>
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: CONFIDENCE_BG[scale.confidence] }}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground/75 mb-4 leading-relaxed">{scale.description}</p>
                    <div className="grid sm:grid-cols-3 gap-3">
                      {(["perception", "affect", "expression"] as const).map((ph) => (
                        <div key={ph} className="space-y-1">
                          <p className="font-mono text-[9px] tracking-widest uppercase" style={{ color: PHASE_COLORS[ph] }}>
                            {ph}
                          </p>
                          <p className="text-xs text-muted-foreground/65 leading-relaxed">{scale[ph]}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── §3 THE BIOLOGY ───────────────────────────────────────────────── */}
        <Section id="biology">
          <SectionLabel text="§ 3 — The Biological Foundation" />
          <SectionTitle>What the Cell Actually Does</SectionTitle>

          <p className="text-muted-foreground leading-relaxed mb-8">
            Cell OS maps OS features to organelles. These are not decorative metaphors —
            they are grounded in cell biology accumulating since 1838. The three claims
            below carry the most weight in the project and are the most important to source.
          </p>

          <div className="space-y-5">
            {/* ATP */}
            <div className="glass-panel rounded-xl p-6 space-y-3 border" style={{ borderColor: "rgba(52,211,153,0.1)" }}>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full mt-2 shrink-0" style={{ backgroundColor: "#34d399", boxShadow: "0 0 8px #34d399" }} />
                <div>
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <h3 className="font-semibold text-white text-sm">ATP Synthesis — The Molecular Energy Cycle</h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded border" style={{ borderColor: "rgba(52,211,153,0.3)", color: "#34d399", background: "rgba(52,211,153,0.05)" }}>Verified</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    The mitochondrion converts the proton gradient across its inner membrane
                    into ATP via a rotary molecular motor. Boyer
                    <Cite ids={["9"]} /> confirmed the rotary mechanism — Nobel Prize in
                    Chemistry, 1997. Same three phases at the molecular scale: substrate
                    arrives, transformation occurs, product is released.
                  </p>
                </div>
              </div>
            </div>

            {/* Cell Theory */}
            <div className="glass-panel rounded-xl p-6 space-y-3 border" style={{ borderColor: "rgba(52,211,153,0.1)" }}>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full mt-2 shrink-0" style={{ backgroundColor: "#34d399", boxShadow: "0 0 8px #34d399" }} />
                <div>
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <h3 className="font-semibold text-white text-sm">Cell Theory — The Cell as Fundamental Unit</h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded border" style={{ borderColor: "rgba(52,211,153,0.3)", color: "#34d399", background: "rgba(52,211,153,0.05)" }}>Verified</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Schleiden<Cite ids={["2"]} /> (1838) and Schwann<Cite ids={["3"]} /> (1839)
                    established that all living organisms are composed of cells — the
                    fundamental unit of life. Organelle-to-function mapping follows directly:
                    nucleus stores the genome; mitochondria produce energy; the membrane
                    enforces selective permeability.
                  </p>
                </div>
              </div>
            </div>

            {/* Biophotons */}
            <div className="glass-panel rounded-xl p-6 space-y-3 border" style={{ borderColor: "rgba(34,211,238,0.1)" }}>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full mt-2 shrink-0" style={{ backgroundColor: "#22d3ee", boxShadow: "0 0 8px #22d3ee" }} />
                <div>
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <h3 className="font-semibold text-white text-sm">Biophoton Emission — The Cell Speaks in Light</h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded border" style={{ borderColor: "rgba(34,211,238,0.3)", color: "#22d3ee", background: "rgba(34,211,238,0.05)" }}>Indicative</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Living cells emit ultra-weak coherent light at 1–1000 photons/cm²/s.
                    Gurwitsch<Cite ids={["5"]} /> proposed this in 1923; Popp et al.
                    <Cite ids={["6", "7", "8"]} /> spent four decades quantifying it,
                    identifying DNA as the primary emitter. The coherence properties suggest
                    possible signaling roles. The emission itself is measured and reproducible;
                    its role as an inter-organelle communication channel is a current
                    hypothesis. Cell OS labels it <em>indicative</em> accordingly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* ── §4 THE PROOF ─────────────────────────────────────────────────── */}
        <Section id="proof">
          <SectionLabel text="§ 4 — The Living Proof" />
          <SectionTitle>EdgeNode: The Pattern at Digital Scale</SectionTitle>

          <p className="text-muted-foreground leading-relaxed mb-6">
            The strongest argument for scale invariance is not the historical lineage —
            it is running software. EdgeNode<Cite ids={["13"]} /> implements the triadic
            pattern at the digital scale with no cloud, no GPU, no accounts:
          </p>

          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            {(["PERCEPTION", "AFFECT", "EXPRESSION"] as const).map((phase, i) => {
              const s = TRIAD_CARD_STYLES[i];
              const detail = i === 0
                ? "The full prompt is read without interruption. Nothing is streamed mid-input; the complete intent arrives before any response begins."
                : i === 1
                ? "The quantized model runs entirely on the device CPU via WebAssembly. No request leaves the browser. Pattern-matching through compressed knowledge."
                : "Tokens stream to the screen, untruncated. The response closes only when the thought is whole — not when a server timeout fires.";
              return (
                <div
                  key={phase}
                  className="glass-panel rounded-xl p-5 space-y-2 border"
                  style={{ borderColor: s.borderColor }}
                >
                  <p className="font-mono text-[10px] tracking-widest" style={{ color: s.labelColor }}>{phase}</p>
                  <p className="text-sm text-muted-foreground/80 leading-relaxed">{detail}</p>
                </div>
              );
            })}
          </div>

          <div className="glass-panel rounded-xl p-6 space-y-3 mb-6 border" style={{ borderColor: "rgba(251,191,36,0.1)" }}>
            <h3 className="font-semibold text-white text-sm">The Harmonic Constant: {HARMONIC_CONSTANT}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The value <span className="font-mono" style={{ color: "#fbbf24" }}>{HARMONIC_CONSTANT}</span> appears
              three times in the EdgeNode stack — LLM sampler temperature, visual design
              seed, and system prompt. It is also the idle opacity of the nine-scale
              minimap in this project. A named constant in both codebases, not a scattered
              magic number.
            </p>
            <p className="text-sm text-muted-foreground/55 leading-relaxed">
              The underlying inference engine is WebLLM<Cite ids={["12"]} />, compiled to
              WebAssembly via Apache TVM — production-grade tooling, MIT licensed,
              developed at Carnegie Mellon and the University of Washington.
            </p>
          </div>

          <a
            href="https://harmony-ecosystem.replit.app/edge-node/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 glass-panel rounded-xl border text-sm font-mono transition-colors hover:text-sky-300"
            style={{ borderColor: "rgba(34,211,238,0.2)", color: "rgba(34,211,238,0.8)" }}
          >
            Open EdgeNode live
            <ExternalLink className="w-4 h-4" />
          </a>
        </Section>

        {/* ── §5 SACRED COHERENCE ─────────────────────────────────────────── */}
        <Section id="sacred">
          <SectionLabel text="§ 5 — 神光 · Sacred Coherence" />
          <SectionTitle>The Living Seal</SectionTitle>

          <p className="text-muted-foreground leading-relaxed mb-8">
            The{" "}
            <a
              href="https://github.com/ProsExplorer/yahweh-yehoshua"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 transition-colors hover:text-white"
              style={{ color: "rgba(251,191,36,0.75)" }}
            >
              yahweh-yehoshua corpus
            </a>{" "}
            states this plainly:{" "}
            <span className="text-white/80 font-medium">
              code architecture IS qi flow — not a metaphor for it.
            </span>{" "}
            Running code is <em>活氣</em> (living qi in motion). The developer's
            consciousness flows into the structure they build. 神光 (divine light) is not
            something added to a system — it is what remains when all resistance has been
            removed. Below: the literal implementation of that claim in Cell OS.
          </p>

          {/* ── Live Sacred Signature ───────────────────────────────────────── */}
          <div
            className="glass-panel rounded-2xl p-7 mb-6 border space-y-5"
            style={{ borderColor: "rgba(251,191,36,0.15)" }}
          >
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <p className="font-mono text-[10px] tracking-[0.25em] uppercase mb-1" style={{ color: "rgba(251,191,36,0.5)" }}>
                  Sacred Coherence · Living Seal
                </p>
                <p className="text-white font-semibold text-sm">Breath {breathCount.toLocaleString()}</p>
              </div>
              <div
                className="w-2 h-2 rounded-full mt-1.5 shrink-0 animate-pulse"
                style={{ backgroundColor: "#fbbf24", boxShadow: "0 0 8px #fbbf24" }}
              />
            </div>

            <div>
              <p className="font-mono text-[10px] tracking-widest uppercase mb-2" style={{ color: "rgba(251,191,36,0.4)" }}>
                SHA-256 · seed {seed} · interval 7770 ms
              </p>
              <p
                className="font-mono text-sm break-all leading-relaxed"
                style={{ color: signature ? "rgba(251,191,36,0.85)" : "rgba(255,255,255,0.2)" }}
              >
                {signature || "computing…"}
              </p>
            </div>

            <div className="border-t border-white/5 pt-4 space-y-1">
              <p className="font-mono text-[10px] tracking-widest uppercase" style={{ color: "rgba(251,191,36,0.35)" }}>
                Sacred Anchor
              </p>
              <p className="font-mono text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>{anchor}</p>
            </div>

            <p className="text-xs text-muted-foreground/45 leading-relaxed">
              Each breath: SHA-256(<span className="font-mono">SEED:breathCount:ANCHOR</span>) → 64-character hex.
              Recomputes every 7770 ms. The same seed and anchor are embedded in this page's
              constants, the EdgeNode sampler, and this signature — three outputs,
              one source. Verifiable by inspecting{" "}
              <code className="font-mono text-[11px]">src/domain/content/constants.ts</code>.
            </p>
          </div>

          {/* ── Runtime as 活氣 ─────────────────────────────────────────────── */}
          <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden mb-6">
            <div className="px-6 py-5 border-b border-white/5">
              <p className="font-mono text-[10px] tracking-[0.25em] uppercase mb-1" style={{ color: "rgba(34,211,238,0.5)" }}>
                Facet 10 — from Code as Feng Shui Manifesto
              </p>
              <h3 className="text-white font-semibold text-sm">
                Runtime as 活氣 — Living Qi in Motion
              </h3>
              <p className="text-xs text-muted-foreground/60 mt-1 leading-relaxed">
                Running code is not a representation of breath — it IS breath at the digital scale.
                Every process is one inhalation and exhalation. Errors are coughs. Memory leaks are stagnation.
              </p>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left px-6 py-3 font-mono text-[10px] tracking-widest uppercase text-muted-foreground/40">Code lifecycle</th>
                  <th className="text-left px-6 py-3 font-mono text-[10px] tracking-widest uppercase text-muted-foreground/40">Qi equivalent</th>
                  <th className="text-right px-6 py-3 font-mono text-[10px] tracking-widest uppercase text-muted-foreground/40">Chinese</th>
                </tr>
              </thead>
              <tbody>
                {([
                  ["Process starting",     "Inhalation — breath enters",                      "吸氣"],
                  ["Execution / processing","Qi circulating — breath moving through the room", "氣流"],
                  ["Return / completion",  "Exhalation — breath continues outward",            "呼氣"],
                  ["Error / exception",    "Cough — breath that could not complete its circuit","咳嗽"],
                  ["Memory leak",          "Qi stagnation — breath that entered but never left","氣滯"],
                  ["Infinite loop",        "Qi vortex — breath trapped in endless circulation","氣旋"],
                ] as const).map(([code, qi, zh], i) => (
                  <tr
                    key={i}
                    className="border-b border-white/5 last:border-0"
                    style={{ background: i % 2 === 0 ? "rgba(255,255,255,0.01)" : "transparent" }}
                  >
                    <td className="px-6 py-3.5 font-mono text-xs text-white/70">{code}</td>
                    <td className="px-6 py-3.5 text-xs text-muted-foreground/65 leading-relaxed">{qi}</td>
                    <td className="px-6 py-3.5 font-mono text-sm text-right" style={{ color: "rgba(34,211,238,0.6)" }}>{zh}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ── Developer consciousness ──────────────────────────────────────── */}
          <div className="glass-panel rounded-xl p-6 border space-y-3" style={{ borderColor: "rgba(167,139,250,0.1)" }}>
            <p className="font-mono text-[10px] tracking-[0.25em] uppercase mb-1" style={{ color: "rgba(167,139,250,0.5)" }}>
              Facet 9 — Developer consciousness as qi source
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              <span className="text-white/80 font-medium">The developer's state flows into the code.</span>{" "}
              A developer in stagnation writes stagnant code — full of defensive checks and
              redundant validations. A developer in 沉靜 (calm) writes calm code — clear,
              minimal, trusting. Code reviews often <em>feel</em> good or bad before logical
              analysis begins because we are perceiving the qi of the original author.
              The architecture carries the architect's breath.
            </p>
            <p className="text-sm text-muted-foreground/55 leading-relaxed">
              Practical implication: before writing code, pause. Check your own state.
              The quality of your breath becomes the quality of your architecture.
            </p>
            <a
              href="https://github.com/ProsExplorer/yahweh-yehoshua/blob/main/CODE_AS_FENG_SHUI_MANIFESTO_2026-01-22.md"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono transition-colors hover:text-white"
              style={{ color: "rgba(167,139,250,0.65)" }}
            >
              CODE_AS_FENG_SHUI_MANIFESTO_2026-01-22.md
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </Section>

        {/* ── §6 REFERENCES ────────────────────────────────────────────────── */}
        <Section id="references">
          <SectionLabel text="§ 6 — Bibliography" />
          <SectionTitle>References</SectionTitle>

          <p className="text-sm text-muted-foreground/50 mb-8 leading-relaxed">
            All {CITATIONS.length} sources cited in Cell OS and this philosophy page.
            Inline citation numbers above correspond to position in this list.
          </p>

          <div className="glass-panel rounded-xl border border-white/5 px-4 divide-y divide-white/5">
            {CITATIONS.map((c, i) => (
              <RefEntry key={c.id} c={c} index={i} />
            ))}
          </div>
        </Section>

        {/* ── FOOTER ───────────────────────────────────────────────────────── */}
        <footer className="pt-14 flex items-center justify-between text-[11px] font-mono text-muted-foreground/25">
          <span>尺度不變性 · {HARMONIC_CONSTANT}</span>
          <Link href="/" className="hover:text-muted-foreground/60 transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3 h-3" />
            Back to Cell OS
          </Link>
        </footer>
      </div>
    </div>
  );
}
