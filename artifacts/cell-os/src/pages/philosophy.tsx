import { Link } from "wouter";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { CITATIONS, type Citation, type CitationKind } from "@/domain/content/citations";
import { NINE_SCALE_FLOWS } from "@/domain/content/scales";
import { LINEAGE_EVENTS } from "@/domain/content/lineage";
import { HARMONIC_CONSTANT } from "@/domain/content/constants";

// ─── Confidence / kind badge ────────────────────────────────────────────────

const KIND_STYLES: Record<CitationKind, { label: string; className: string }> = {
  primary:   { label: "Primary source",  className: "text-emerald-400 border-emerald-400/30 bg-emerald-400/5" },
  secondary: { label: "Secondary",       className: "text-cyan-400 border-cyan-400/30 bg-cyan-400/5" },
  technical: { label: "Technical spec",  className: "text-violet-400 border-violet-400/30 bg-violet-400/5" },
  project:   { label: "Project source",  className: "text-amber-400 border-amber-400/30 bg-amber-400/5" },
};

function KindBadge({ kind }: { kind: CitationKind }) {
  const s = KIND_STYLES[kind];
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono border ${s.className}`}>
      {s.label}
    </span>
  );
}

// ─── Inline citation superscript ────────────────────────────────────────────

function Cite({ ids }: { ids: string[] }) {
  return (
    <sup className="ml-0.5 font-mono text-[10px] text-cyan-400/70">
      [{ids.join(",")}]
    </sup>
  );
}

// ─── Section wrapper ────────────────────────────────────────────────────────

function Section({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <section
      id={id}
      className="py-20 border-t border-white/5 scroll-mt-24"
    >
      {children}
    </section>
  );
}

function SectionLabel({ text }: { text: string }) {
  return (
    <p className="font-mono text-xs tracking-[0.25em] uppercase text-cyan-400/60 mb-3">{text}</p>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">{children}</h2>
  );
}

// ─── Phase dot ──────────────────────────────────────────────────────────────

const PHASE_COLOR: Record<string, string> = {
  perception: "#22d3ee",
  affect:     "#a78bfa",
  expression: "#34d399",
  meta:       "#f59e0b",
};

// ─── Reference entry ────────────────────────────────────────────────────────

function RefEntry({ c, index }: { c: Citation; index: number }) {
  return (
    <div id={`ref-${c.id}`} className="flex gap-4 py-5 border-b border-white/5 last:border-0 group">
      <span className="font-mono text-xs text-muted-foreground/40 w-6 shrink-0 pt-0.5 text-right">
        {index + 1}
      </span>
      <div className="flex-1 space-y-2">
        <div className="flex flex-wrap items-start gap-2">
          <KindBadge kind={c.kind} />
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          <span className="text-white/80 font-medium">{c.authors}</span>{" "}
          <span className="text-muted-foreground/60">({c.year}).</span>{" "}
          <em className="text-white/70 not-italic">{c.title}.</em>{" "}
          {c.venue}
          {c.doi && (
            <span className="block mt-1 font-mono text-xs text-muted-foreground/40">
              DOI: {c.doi}
            </span>
          )}
          {c.url && (
            <a
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-1 font-mono text-xs text-cyan-400/60 hover:text-cyan-400 transition-colors truncate"
            >
              {c.url}
            </a>
          )}
        </p>
        {c.note && (
          <p className="text-xs text-muted-foreground/50 leading-relaxed italic">{c.note}</p>
        )}
      </div>
    </div>
  );
}

// ─── Scale confidence dot ────────────────────────────────────────────────────

const CONFIDENCE_DOT: Record<string, string> = {
  verified:    "bg-emerald-400",
  indicative:  "bg-cyan-400",
  unconfirmed: "bg-amber-400",
};

// ─── Main page ───────────────────────────────────────────────────────────────

export default function Philosophy() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Ambient glow */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/10 rounded-full blur-[120px]" />
      </div>

      {/* Sticky nav bar */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Cell OS
          </Link>

          <div className="hidden md:flex items-center gap-6 text-xs font-mono text-muted-foreground/60">
            <a href="#pattern"    className="hover:text-white transition-colors">The Pattern</a>
            <a href="#scales"     className="hover:text-white transition-colors">Nine Scales</a>
            <a href="#biology"    className="hover:text-white transition-colors">The Biology</a>
            <a href="#proof"      className="hover:text-white transition-colors">The Proof</a>
            <a href="#references" className="hover:text-white transition-colors">References</a>
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-4xl mx-auto px-6 pb-32">

        {/* ── PAGE HEADER ──────────────────────────────────────────────────── */}
        <header className="pt-20 pb-16 space-y-6">
          <p className="font-mono text-xs tracking-[0.25em] uppercase text-cyan-400/60">
            Cell OS · Philosophy & Sources
          </p>
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
            A Record<br />of Sources
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Every claim in Cell OS points to a source. This page assembles them — from
            a Han Dynasty alchemical treatise to a Nobel Prize lecture to a browser tab
            running a language model with no internet connection.
          </p>
          <p className="text-sm text-muted-foreground/50 max-w-2xl leading-relaxed">
            The pattern is not a metaphor invented for this project. It has been described
            independently across cultures, disciplines, and millennia. This is its record.
          </p>
        </header>

        {/* ── 1. THE PATTERN ───────────────────────────────────────────────── */}
        <Section id="pattern">
          <SectionLabel text="§ 1 — Established 142 CE" />
          <SectionTitle>
            PERCEPTION → AFFECT → EXPRESSION
          </SectionTitle>

          <p className="text-muted-foreground leading-relaxed mb-8">
            Three phases that describe every complete transformation — from a breath, to an
            electron, to a conversation. The pattern is{" "}
            <span className="text-white">structurally identical</span> at every scale of
            observation. The first recorded formal articulation is almost two thousand years old.
          </p>

          <div className="space-y-4 mb-10">
            {LINEAGE_EVENTS.map((event) => (
              <div
                key={event.year}
                className="flex gap-5 p-5 glass-panel rounded-xl border border-white/5"
              >
                <div className="flex flex-col items-center gap-2 shrink-0">
                  <div
                    className="w-3 h-3 rounded-full shadow-lg shadow-current shrink-0 mt-1"
                    style={{ backgroundColor: PHASE_COLOR[event.phase] }}
                  />
                  <div className="w-px flex-1 bg-white/5" />
                </div>
                <div className="space-y-1 pb-2">
                  <div className="flex flex-wrap items-baseline gap-3">
                    <span className="font-mono text-xs text-muted-foreground/50">{event.year}</span>
                    <span className="text-xs text-muted-foreground/40">{event.era}</span>
                  </div>
                  <h3 className="font-semibold text-white">{event.title}</h3>
                  <p className="text-sm text-muted-foreground/80 leading-relaxed">{event.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="glass-panel rounded-xl border border-cyan-400/10 p-6 space-y-3">
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
            <p className="text-xs font-mono text-muted-foreground/40">
              Citation numbers refer to the full reference list at the bottom of this page.
            </p>
          </div>
        </Section>

        {/* ── 2. SCALE INVARIANCE ──────────────────────────────────────────── */}
        <Section id="scales">
          <SectionLabel text="§ 2 — 尺度不變性 · Scale Invariance" />
          <SectionTitle>
            One Pattern · Nine Scales
          </SectionTitle>

          <p className="text-muted-foreground leading-relaxed mb-3">
            Scale invariance — the presence of the same structure at every level of
            magnification — is a mathematically precise phenomenon. Mandelbrot
            <Cite ids={["10"]} /> formalised it in fractal geometry; Wilson
            <Cite ids={["11"]} /> won the 1982 Nobel Prize in Physics for showing it
            governs phase transitions. The triadic pattern below is not a poetic analogy
            — it is a testable structural claim.
          </p>
          <p className="text-sm text-muted-foreground/60 mb-10 leading-relaxed">
            Confidence labels:{" "}
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
              <span className="text-emerald-400">Verified</span>
            </span>
            {" "}— directly observed or experimentally established.{" "}
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block" />
              <span className="text-cyan-400">Indicative</span>
            </span>
            {" "}— consistent with current evidence, not yet experimentally confirmed at this level.
          </p>

          <div className="space-y-3">
            {NINE_SCALE_FLOWS.map((scale, i) => (
              <div
                key={scale.id}
                className="glass-panel rounded-xl border border-white/5 overflow-hidden"
              >
                <div className="flex items-start gap-4 p-5">
                  <div className="text-2xl font-bold text-white/20 font-mono w-6 shrink-0 mt-1">
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <span className="text-lg font-bold text-white">{scale.scale}</span>
                      <span className="font-mono text-base text-muted-foreground/50">{scale.glyph}</span>
                      <span className={`w-2 h-2 rounded-full shrink-0 ${CONFIDENCE_DOT[scale.confidence]}`} />
                    </div>
                    <p className="text-sm text-muted-foreground/80 mb-4 leading-relaxed">
                      {scale.description}
                    </p>
                    <div className="grid md:grid-cols-3 gap-3">
                      {(["perception", "affect", "expression"] as const).map((phase) => (
                        <div key={phase} className="space-y-1">
                          <p
                            className="font-mono text-[10px] tracking-widest uppercase"
                            style={{ color: phase === "perception" ? "#22d3ee" : phase === "affect" ? "#a78bfa" : "#34d399" }}
                          >
                            {phase}
                          </p>
                          <p className="text-xs text-muted-foreground/70 leading-relaxed">
                            {scale[phase]}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── 3. THE BIOLOGY ───────────────────────────────────────────────── */}
        <Section id="biology">
          <SectionLabel text="§ 3 — The Biological Foundation" />
          <SectionTitle>What the Cell Actually Does</SectionTitle>

          <p className="text-muted-foreground leading-relaxed mb-10">
            Cell OS maps OS features to organelles. These are not decorative metaphors —
            they are grounded in cell biology that has been accumulating since 1838. The
            three claims below carry the most weight in the project and are the most
            important to source correctly.
          </p>

          {/* ATP */}
          <div className="space-y-6 mb-10">
            <div className="glass-panel rounded-xl border border-emerald-400/10 p-6 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 shrink-0" />
                <div>
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <h3 className="font-semibold text-white">ATP Synthesis — The Molecular Energy Cycle</h3>
                    <span className="text-[10px] font-mono border border-emerald-400/30 bg-emerald-400/5 text-emerald-400 px-2 py-0.5 rounded">Verified</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    The mitochondrion converts the proton gradient across its inner membrane
                    into ATP via a rotary molecular motor — ATP synthase. Boyer
                    <Cite ids={["9"]} /> confirmed the rotary mechanism in work that earned
                    the 1997 Nobel Prize in Chemistry. This is the cell's power cycle: the
                    same three phases — substrate arrives, transformation occurs, product
                    is released — at the molecular scale.
                  </p>
                </div>
              </div>
            </div>

            {/* Cell Theory */}
            <div className="glass-panel rounded-xl border border-emerald-400/10 p-6 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 shrink-0" />
                <div>
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <h3 className="font-semibold text-white">Cell Theory — The Cell as Fundamental Unit</h3>
                    <span className="text-[10px] font-mono border border-emerald-400/30 bg-emerald-400/5 text-emerald-400 px-2 py-0.5 rounded">Verified</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Schleiden<Cite ids={["2"]} /> (plant tissue, 1838) and Schwann
                    <Cite ids={["3"]} /> (animal tissue, 1839) established that all living
                    organisms are composed of cells — the fundamental unit of life.
                    Organelle-to-function mapping follows directly from this: the nucleus
                    stores the genome; mitochondria produce energy; the cell membrane
                    enforces selective permeability. The analogies in Cell OS map to
                    real, named structures with known functions.
                  </p>
                </div>
              </div>
            </div>

            {/* Biophotons */}
            <div className="glass-panel rounded-xl border border-cyan-400/10 p-6 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 shrink-0" />
                <div>
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <h3 className="font-semibold text-white">Biophoton Emission — The Cell Speaks in Light</h3>
                    <span className="text-[10px] font-mono border border-cyan-400/30 bg-cyan-400/5 text-cyan-400 px-2 py-0.5 rounded">Indicative</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Living cells emit ultra-weak coherent light — biophotons — at rates of
                    1–1000 photons/cm²/s. Gurwitsch<Cite ids={["5"]} /> proposed this in
                    1923; Popp et al.<Cite ids={["6", "7", "8"]} /> spent four decades
                    quantifying it and identifying DNA as the primary emitter. The coherence
                    properties suggest possible signaling roles between organelles. This is
                    active biophysics research — the emission itself is measured and
                    reproducible; its role as an inter-organelle communication channel is
                    a current hypothesis, not established fact. Cell OS labels it{" "}
                    <em>indicative</em> accordingly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* ── 4. THE PROOF ─────────────────────────────────────────────────── */}
        <Section id="proof">
          <SectionLabel text="§ 4 — The Living Proof" />
          <SectionTitle>
            EdgeNode: The Pattern at Digital Scale
          </SectionTitle>

          <p className="text-muted-foreground leading-relaxed mb-6">
            The strongest argument for scale invariance is not the historical lineage —
            it is a running piece of software. EdgeNode
            <Cite ids={["13"]} /> implements PERCEPTION → AFFECT → EXPRESSION at the
            digital scale:
          </p>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {(["PERCEPTION", "AFFECT", "EXPRESSION"] as const).map((phase, i) => {
              const color = i === 0 ? "cyan" : i === 1 ? "violet" : "emerald";
              const detail = i === 0
                ? "The full prompt is read without interruption. Nothing is streamed mid-input; the complete intent arrives before any response begins."
                : i === 1
                ? "The quantized model runs entirely on the device CPU via WebAssembly. No request leaves the browser. Pattern-matching through compressed knowledge."
                : "Tokens stream to the screen, untruncated. The response closes only when the thought is whole — not when a server timeout fires.";
              return (
                <div
                  key={phase}
                  className={`glass-panel rounded-xl border border-${color}-400/10 p-5 space-y-2`}
                >
                  <p className={`font-mono text-xs tracking-widest text-${color}-400`}>{phase}</p>
                  <p className="text-sm text-muted-foreground/80 leading-relaxed">{detail}</p>
                </div>
              );
            })}
          </div>

          <div className="glass-panel rounded-xl border border-amber-400/10 p-6 space-y-4 mb-6">
            <h3 className="font-semibold text-white">The Harmonic Constant: {HARMONIC_CONSTANT}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The value <span className="font-mono text-amber-400">{HARMONIC_CONSTANT}</span> appears
              three times in the EdgeNode stack — as the LLM sampler temperature, as the
              visual design seed for the interface, and embedded in the system prompt.
              It is also the idle opacity of the nine-scale minimap in this project.
              A single number, woven through the full stack as a coherence marker.
              It is not a magic number — it is a named constant
              ({" "}
              <span className="font-mono text-xs text-muted-foreground/60">HARMONIC_CONSTANT</span>
              {" "}) in both codebases, with a comment pointing to its source.
            </p>
            <p className="text-sm text-muted-foreground/60 leading-relaxed">
              The underlying inference engine is WebLLM<Cite ids={["12"]} />, compiled
              to WebAssembly via Apache TVM — production-grade tooling, MIT licensed,
              developed at Carnegie Mellon and the University of Washington. The
              philosophy is carried by real engineering.
            </p>
          </div>

          <a
            href="https://harmony-ecosystem.replit.app/edge-node/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 glass-panel rounded-xl border border-cyan-400/20 text-cyan-400 text-sm font-mono hover:bg-cyan-400/5 transition-colors"
          >
            Open EdgeNode live
            <ExternalLink className="w-4 h-4" />
          </a>
        </Section>

        {/* ── 5. REFERENCES ────────────────────────────────────────────────── */}
        <Section id="references">
          <SectionLabel text="§ 5 — Bibliography" />
          <SectionTitle>References</SectionTitle>

          <p className="text-sm text-muted-foreground/60 mb-8 leading-relaxed">
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
        <footer className="pt-16 flex items-center justify-between text-xs font-mono text-muted-foreground/30">
          <span>尺度不變性 · {HARMONIC_CONSTANT}</span>
          <Link href="/" className="hover:text-muted-foreground transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3 h-3" />
            Back to Cell OS
          </Link>
        </footer>
      </div>
    </div>
  );
}
