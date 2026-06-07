import { useState } from "react";
import { ArrowDown, Cpu, Fingerprint, Shield, Smartphone } from "lucide-react";
import { CellDiagram } from "@/components/CellDiagram";
import { CELL_MAPPINGS } from "@/lib/data";

export default function Home() {
  const [activeOrganelle, setActiveOrganelle] = useState<string | null>(null);
  const activeMapping = CELL_MAPPINGS.find((m) => m.id === activeOrganelle);

  return (
    <div className="min-h-[100dvh] bg-background text-foreground overflow-x-hidden">
      {/* Background ambient texture */}
      <div 
        className="fixed inset-0 z-0 opacity-20 pointer-events-none mix-blend-screen"
        style={{
          backgroundImage: "url('/organic-texture.png')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      />

      {/* HERO SECTION */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] animate-pulse-slow"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto text-center space-y-8 mt-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-primary/30 text-primary font-mono text-sm tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            Concept: Fairphone 5
          </div>
          
          <h1 className="text-6xl md:text-8xl font-sans font-bold tracking-tight text-white text-glow">
            Cell OS
          </h1>
          
          <p className="text-xl md:text-3xl font-light text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Reimagining the smartphone not as a machine, but as a <span className="text-white">self-sustaining living organism</span>.
          </p>

          <p className="text-lg text-muted-foreground/80 max-w-xl mx-auto">
            Alive, adaptive, sustainable, and private by nature. Explore how biology informs the ultimate operating system.
          </p>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-muted-foreground animate-bounce">
          <span className="text-sm font-mono tracking-widest uppercase opacity-70">Examine</span>
          <ArrowDown className="w-5 h-5 opacity-50" />
        </div>
      </section>

      {/* INTERACTIVE CELL SECTION */}
      <section className="relative z-10 py-32 px-6 bg-gradient-to-b from-transparent via-background/90 to-background/50 backdrop-blur-sm border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold text-white text-glow-secondary">The Microscopic View</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every operating system feature maps flawlessly to a part of the human cell. Interact with the diagram below to discover the connections.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: The Diagram */}
            <div className="order-2 lg:order-1 relative">
              <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl"></div>
              <CellDiagram 
                activeId={activeOrganelle}
                onHover={setActiveOrganelle}
                onClick={(id) => {
                  setActiveOrganelle(activeOrganelle === id ? null : id);
                }}
              />
            </div>

            {/* Right: The Info Panel */}
            <div className="order-1 lg:order-2 h-[400px] flex items-center justify-center">
              {activeMapping ? (
                <div 
                  className="w-full glass-panel p-8 rounded-3xl space-y-6 transition-all animate-in fade-in slide-in-from-right-8"
                  style={{
                    boxShadow: `0 8px 32px 0 ${activeMapping.color.replace('hsl', 'hsla').replace(')', ', 0.2)')}`,
                    borderColor: `${activeMapping.color.replace('hsl', 'hsla').replace(')', ', 0.3)')}`
                  }}
                >
                  <div className="space-y-2">
                    {/* Organelle Name */}
                    <div 
                      className="text-sm font-mono tracking-widest uppercase"
                      style={{ color: activeMapping.color }}
                    >
                      Biological Structure
                    </div>
                    <h3 className="text-4xl font-bold text-white">
                      {activeMapping.name}
                    </h3>
                  </div>

                  <div className="space-y-2 border-t border-white/10 pt-4">
                    {/* OS Feature Name */}
                    <div className="text-sm font-mono tracking-widest uppercase text-muted-foreground">
                      OS Function
                    </div>
                    <div className="text-2xl font-semibold text-white">
                      {activeMapping.osFeature}
                    </div>
                  </div>

                  <div className="space-y-4 pt-4">
                    <p className="text-lg text-foreground/90 leading-relaxed">
                      {activeMapping.explanation}
                    </p>
                    <div className="p-4 bg-black/40 rounded-xl border border-white/5">
                      <p className="text-sm font-medium text-muted-foreground italic">
                        "{activeMapping.analogy}"
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-center p-8 border border-dashed border-white/10 rounded-3xl">
                  <div className="w-16 h-16 rounded-full border border-primary/50 flex items-center justify-center mb-6 animate-pulse">
                    <div className="w-8 h-8 rounded-full bg-primary/20 blur-sm"></div>
                  </div>
                  <h3 className="text-2xl font-medium text-white mb-2">Awaiting Interaction</h3>
                  <p className="text-muted-foreground">Hover or tap an organelle on the left to analyze its function within Cell OS.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FULL REFERENCE LIST SECTION */}
      <section className="relative z-10 py-24 px-6 border-t border-white/5 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Complete OS Genome</h2>
            <p className="text-muted-foreground max-w-2xl">The full sequence of all 15 biological-to-digital mappings that govern Cell OS.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CELL_MAPPINGS.map((mapping) => (
              <div 
                key={mapping.id}
                className="group p-6 glass-panel rounded-2xl hover:bg-white/5 transition-colors duration-300 border border-white/5 hover:border-white/10"
                onMouseEnter={() => setActiveOrganelle(mapping.id)}
                onMouseLeave={() => setActiveOrganelle(null)}
              >
                <div className="flex items-start justify-between mb-4">
                  <h4 className="text-xl font-bold text-white">{mapping.name}</h4>
                  <div 
                    className="w-3 h-3 rounded-full shadow-lg"
                    style={{ 
                      backgroundColor: mapping.color,
                      boxShadow: `0 0 10px ${mapping.color}`
                    }}
                  />
                </div>
                <div className="text-sm font-mono text-muted-foreground mb-3">{mapping.osFeature}</div>
                <p className="text-sm text-foreground/80 leading-relaxed mb-4">{mapping.explanation}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAIRPHONE VALUES SECTION */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl font-bold text-white">Rooted in Reality</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Cell OS isn't just a metaphor. It perfectly articulates the physical ethos of the Fairphone 5.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-6 text-center">
              <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
                <Cpu className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-semibold text-white">Modularity is Life</h3>
              <p className="text-muted-foreground leading-relaxed">
                Cells replace damaged organelles without dying. The Fairphone 5 lets you hot-swap batteries, screens, and cameras. Repair is regeneration.
              </p>
            </div>

            <div className="space-y-6 text-center">
              <div className="w-20 h-20 mx-auto rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-accent">
                <Shield className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-semibold text-white">Membrane Privacy</h3>
              <p className="text-muted-foreground leading-relaxed">
                A cell membrane is highly selective about what enters and exits. Cell OS offers absolute transparency and strict permission gateways for user data.
              </p>
            </div>

            <div className="space-y-6 text-center">
              <div className="w-20 h-20 mx-auto rounded-full bg-secondary/10 border border-secondary/30 flex items-center justify-center text-secondary">
                <Fingerprint className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-semibold text-white">Sustainable Lifespan</h3>
              <p className="text-muted-foreground leading-relaxed">
                Biology wastes nothing. With 8 years of software support and a digital lysosome system to clear junk, your device stays fresh, fast, and alive longer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 py-12 border-t border-white/10 bg-black text-center text-muted-foreground">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Smartphone className="w-5 h-5" />
          <span className="font-mono tracking-widest text-sm uppercase">Cell OS Concept</span>
        </div>
        <p className="text-sm opacity-60">A visionary software metaphor designed for the Fairphone 5.</p>
      </footer>
    </div>
  );
}