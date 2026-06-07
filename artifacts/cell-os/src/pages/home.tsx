import { ArrowDown, Cpu, Fingerprint, Shield, Smartphone } from "lucide-react";
import { Link } from "wouter";
import { CellDiagram } from "@/components/CellDiagram";
import { CELL_MAPPINGS } from "@/lib/data";
import { useExplorerFlow } from "@/features/explorer/useExplorerFlow";
import { InfoPanel } from "@/features/explorer/components/InfoPanel";
import { SubstrateAtlas } from "@/features/explorer/components/SubstrateAtlas";
import { NineScaleFlow } from "@/features/explorer/components/NineScaleFlow";
import { EdgeNodeSection } from "@/features/explorer/components/EdgeNodeSection";
import { DeepLineageTimeline } from "@/features/explorer/components/DeepLineageTimeline";
import { CellShellProvider } from "@/features/cell-shell/CellShellProvider";
import { MembraneIndicator } from "@/features/cell-shell/MembraneIndicator";
import { MembraneEdge } from "@/features/cell-shell/MembraneEdge";

// ─── Nuclear pore gate positions (polar coords → cartesian) ──────────────────
// 8 gate proteins spaced evenly on a ring of radius 22 px, computed once.
const GATE_POSITIONS = Array.from({ length: 8 }, (_, i) => {
  const a = (i * Math.PI * 2) / 8;
  return { x: Math.sin(a) * 22, y: -Math.cos(a) * 22 };
});

export default function Home() {
  const { view, perceive } = useExplorerFlow();

  const biophotonOverlayLinks = view.relatedBiophotonLinks.map((l) => ({
    sourceId: l.sourceOrganelleId,
    targetId: l.targetOrganelleId,
  }));

  return (
    <CellShellProvider>
      {/* Zone-aware right-rail indicator — the cell's proprioception */}
      <MembraneIndicator />

      <div className="min-h-[100dvh] bg-background text-foreground overflow-x-hidden">
        {/* Ambient organic texture */}
        <div
          className="fixed inset-0 z-0 opacity-20 pointer-events-none mix-blend-screen"
          style={{
            backgroundImage: "url('/organic-texture.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* ══════════════════════════════════════════════════════════════════
            NUCLEUS — Hero / Core Identity / DNA of the project
        ═══════════════════════════════════════════════════════════════════ */}
        <section
          data-cell-zone="nucleus"
          className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-20"
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] animate-pulse-slow" />
          </div>

          <div className="relative max-w-4xl mx-auto text-center space-y-8 mt-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-primary/30 text-primary font-mono text-sm tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Concept: Fairphone 5
            </div>

            <h1 className="text-6xl md:text-8xl font-sans font-bold tracking-tight text-white text-glow">
              Cell OS
            </h1>

            <p className="text-xl md:text-3xl font-light text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Reimagining the smartphone not as a machine, but as a{" "}
              <span className="text-white">self-sustaining living organism</span>.
            </p>

            <p className="text-lg text-muted-foreground/80 max-w-xl mx-auto">
              Alive, adaptive, sustainable, and private by nature. Explore how biology
              informs the ultimate operating system.
            </p>

            <p className="text-xs font-mono text-muted-foreground/40 tracking-widest">
              尺度不變性 · One pattern · Nine scales · 0.7770777
            </p>

            {/* ── Nuclear Pore — regulated gateway to the philosophy record ── */}
            <div className="flex flex-col items-center gap-2 pt-2">
              <Link href="/philosophy" className="group flex flex-col items-center gap-2">
                <div className="relative w-14 h-14 shrink-0">
                  {/* Outer membrane ring */}
                  <div className="absolute inset-0 rounded-full border border-primary/15 group-hover:border-primary/40 transition-all duration-[777ms]" />
                  {/* Slow ambient pulse */}
                  <div className="absolute inset-0 rounded-full border border-primary/5 animate-pulse-slow" />
                  {/* 8 gate proteins */}
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
                  {/* Central channel */}
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

          {/* Scroll CTA */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-muted-foreground animate-bounce">
            <span className="text-sm font-mono tracking-widest uppercase opacity-70">Examine</span>
            <ArrowDown className="w-5 h-5 opacity-50" />
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            CYTOPLASM — Interactive Explorer / Runtime Medium
        ═══════════════════════════════════════════════════════════════════ */}
        <MembraneEdge entering="cytoplasm" />
        <section
          data-cell-zone="cytoplasm"
          className="relative z-10 py-32 px-6 backdrop-blur-sm"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold text-white text-glow-secondary">
                The Microscopic View
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Every operating system feature maps to a part of the human cell. Interact
                with the diagram to discover the connections. When an organelle is active,
                faint biophoton links illuminate its communication partners.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 relative">
                <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl" />
                <CellDiagram
                  activeIds={view.activeOrganelleIds}
                  biophotonLinks={biophotonOverlayLinks}
                  onHover={perceive.hoverOrganelle}
                  onClick={perceive.toggleOrganelle}
                />
              </div>

              <div className="order-1 lg:order-2 min-h-[400px] flex items-center justify-center">
                <InfoPanel
                  organelle={view.activeOrganelle}
                  substrate={view.activeSubstrate}
                  relatedSubstrate={view.relatedSubstrate}
                  relatedOrganelles={view.relatedOrganelles}
                  relatedBiophotonLinks={view.relatedBiophotonLinks}
                  onSelectSubstrate={perceive.toggleSubstrate}
                  onSelectOrganelle={perceive.toggleOrganelle}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            CYTOSKELETON — AI Substrate Atlas / Structural Lattice
        ═══════════════════════════════════════════════════════════════════ */}
        <MembraneEdge entering="cytoskeleton" />
        <div data-cell-zone="cytoskeleton">
          <SubstrateAtlas
            isSubstrateHighlighted={view.isSubstrateHighlighted}
            hasFocus={view.hasFocus}
            onToggleSubstrate={perceive.toggleSubstrate}
          />
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            RIBOSOMES — Nine-Scale Flow / Pattern Translation
        ═══════════════════════════════════════════════════════════════════ */}
        <MembraneEdge entering="ribosomes" />
        <div data-cell-zone="ribosomes">
          <NineScaleFlow />
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            MITOCHONDRIA — EdgeNode / The Living Proof / Power
        ═══════════════════════════════════════════════════════════════════ */}
        <MembraneEdge entering="mitochondria" />
        <div data-cell-zone="mitochondria">
          <EdgeNodeSection />
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            GOLGI APPARATUS — Complete OS Genome / Sorting & Packaging
        ═══════════════════════════════════════════════════════════════════ */}
        <MembraneEdge entering="golgi" />
        <section
          data-cell-zone="golgi"
          className="relative z-10 py-24 px-6 bg-black/20"
        >
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">Complete OS Genome</h2>
              <p className="text-muted-foreground max-w-2xl">
                The full sequence of all 15 biological-to-digital mappings that govern Cell OS.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CELL_MAPPINGS.map((mapping) => {
                const highlighted = view.isOrganelleHighlighted(mapping.id);
                return (
                  <div
                    key={mapping.id}
                    className="group p-6 glass-panel rounded-2xl hover:bg-white/5 transition-all duration-300 border"
                    style={{
                      opacity: view.hasFocus && !highlighted ? 0.4 : 1,
                      borderColor: highlighted ? `${mapping.color}99` : "rgba(255,255,255,0.05)",
                      boxShadow: highlighted ? `0 8px 32px 0 ${mapping.color}33` : undefined,
                    }}
                    onMouseEnter={() => perceive.hoverOrganelle(mapping.id)}
                    onMouseLeave={() => perceive.hoverOrganelle(null)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <h4 className="text-xl font-bold text-white">{mapping.name}</h4>
                      <div
                        className="w-3 h-3 rounded-full shadow-lg shrink-0"
                        style={{ backgroundColor: mapping.color, boxShadow: `0 0 10px ${mapping.color}` }}
                      />
                    </div>
                    <div className="text-sm font-mono text-muted-foreground mb-3">{mapping.osFeature}</div>
                    <p className="text-sm text-foreground/80 leading-relaxed mb-4">{mapping.explanation}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            ENDOPLASMIC RETICULUM — Deep Lineage Timeline / Memory
        ═══════════════════════════════════════════════════════════════════ */}
        <MembraneEdge entering="endoplasmic-reticulum" />
        <div data-cell-zone="endoplasmic-reticulum">
          <DeepLineageTimeline />
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            CELL MEMBRANE — Fairphone Values / Selective Boundary
        ═══════════════════════════════════════════════════════════════════ */}
        <MembraneEdge entering="membrane" />
        <section data-cell-zone="membrane" className="relative z-10 py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20 space-y-4">
              <h2 className="text-4xl font-bold text-white">Rooted in Reality</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Cell OS isn't just a metaphor. It perfectly articulates the physical ethos
                of the Fairphone 5.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              <div className="space-y-6 text-center">
                <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
                  <Cpu className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-semibold text-white">Modularity is Life</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Cells replace damaged organelles without dying. The Fairphone 5 lets you
                  hot-swap batteries, screens, and cameras. Repair is regeneration.
                </p>
              </div>

              <div className="space-y-6 text-center">
                <div className="w-20 h-20 mx-auto rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-accent">
                  <Shield className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-semibold text-white">Membrane Privacy</h3>
                <p className="text-muted-foreground leading-relaxed">
                  A cell membrane is highly selective about what enters and exits. Cell OS
                  offers absolute transparency and strict permission gateways for user data.
                </p>
              </div>

              <div className="space-y-6 text-center">
                <div className="w-20 h-20 mx-auto rounded-full bg-secondary/10 border border-secondary/30 flex items-center justify-center text-secondary">
                  <Fingerprint className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-semibold text-white">Sustainable Lifespan</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Biology wastes nothing. With 8 years of software support and a digital
                  lysosome system to clear junk, your device stays fresh, fast, and alive longer.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Footer ──────────────────────────────────────────────────────── */}
        <footer className="relative z-10 py-12 border-t border-white/10 bg-black text-center text-muted-foreground">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Smartphone className="w-5 h-5" />
            <span className="font-mono tracking-widest text-sm uppercase">Cell OS Concept</span>
          </div>
          <p className="text-sm opacity-60 mb-2">A visionary software metaphor designed for the Fairphone 5.</p>
          <p className="text-xs font-mono opacity-30 tracking-widest mb-6">尺度不變性 · 0.7770777</p>
          <Link
            href="/philosophy"
            className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase transition-colors"
            style={{ color: "rgba(34,211,238,0.4)" }}
          >
            Read the philosophy &amp; sources →
          </Link>
        </footer>
      </div>
    </CellShellProvider>
  );
}
