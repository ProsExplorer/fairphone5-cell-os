import { ExternalLink } from "lucide-react";
import { EDGENODE_FACTS, EDGENODE_URL } from "@/domain/content/edgeNode";
import { HARMONIC_CONSTANT } from "@/domain/content/constants";
import { ConfidenceBadge } from "./ConfidenceBadge";

const TRIAD_BREATHS = [
  {
    phase: "PERCEPTION",
    color: "text-primary",
    glyph: "門",
    text: "The prompt is read in full before any token is produced — a complete listening posture."
  },
  {
    phase: "AFFECT",
    color: "text-accent",
    glyph: "室",
    text: "The quantized weights search compressed knowledge; attention layers pattern-match in one open space."
  },
  {
    phase: "EXPRESSION",
    color: "text-secondary",
    glyph: "窗",
    text: "Tokens stream to the screen without truncation — the channel stays open until the thought is whole."
  }
] as const;

export function EdgeNodeSection() {
  return (
    <section className="relative z-10 py-32 px-6 border-t border-white/5 bg-black/20">
      <div className="max-w-7xl mx-auto space-y-16">

        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-accent/30 text-accent font-mono text-sm tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            The Living Proof
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white text-glow">EdgeNode</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            The FairPhone 5 is already an EdgeNode. A WebAssembly language model runs entirely in the browser — no cloud, no accounts, no GPU. A phone from 2018 generates responses at 0.8 tokens per second with an 8,192-token context window, fully offline and fully private. The same triadic pattern. The same hardware class.
          </p>
        </div>

        {/* Harmonic constant callout */}
        <div className="flex items-center justify-center">
          <div className="glass-panel rounded-2xl px-8 py-5 border border-primary/20 text-center space-y-1">
            <div className="text-xs font-mono tracking-widest uppercase text-muted-foreground">Sampler Temperature · Harmonic Constant</div>
            <div className="text-4xl font-mono font-bold text-primary">{HARMONIC_CONSTANT}</div>
            <div className="text-xs text-muted-foreground/70 max-w-xs">
              Appears identically in the sampler, visual design seed, and system prompt — one constant, woven through the whole stack.
            </div>
          </div>
        </div>

        {/* Three breaths */}
        <div className="grid md:grid-cols-3 gap-6">
          {TRIAD_BREATHS.map((breath) => (
            <div key={breath.phase} className="glass-panel rounded-2xl p-6 border border-white/5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-4xl" aria-hidden="true">{breath.glyph}</span>
                <span className={`text-xs font-mono tracking-widest uppercase ${breath.color}`}>{breath.phase}</span>
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed">{breath.text}</p>
            </div>
          ))}
        </div>

        {/* Facts grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {EDGENODE_FACTS.map((fact) => (
            <div key={fact.label} className="glass-panel rounded-2xl p-5 border border-white/5 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="text-xs font-mono tracking-widest uppercase text-muted-foreground">{fact.label}</div>
                <ConfidenceBadge confidence={fact.confidence} />
              </div>
              <div className="text-lg font-bold text-white leading-tight">{fact.value}</div>
              <p className="text-xs text-foreground/70 leading-relaxed">{fact.detail}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href={EDGENODE_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl glass-panel border border-primary/30 text-primary font-medium transition-all duration-[777ms] hover:bg-primary/10 hover:border-primary/50"
          >
            <span>Open the EdgeNode</span>
            <ExternalLink className="w-4 h-4" />
          </a>
          <p className="mt-4 text-xs text-muted-foreground/60 font-mono">
            harmony-ecosystem.replit.app/edge-node
          </p>
        </div>
      </div>
    </section>
  );
}
