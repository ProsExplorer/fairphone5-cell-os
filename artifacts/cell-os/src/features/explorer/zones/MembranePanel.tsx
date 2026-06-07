import { Cpu, Fingerprint, Shield } from "lucide-react";

/**
 * MembranePanel — the outermost zone: Fairphone values.
 *
 * The cell membrane is the cell's selective boundary — it decides what enters
 * and exits, maintains the cell's identity, and interfaces with the outside world.
 * It is not a wall but a highly intelligent gatekeeper.
 *
 * Here it maps to the three core Fairphone 5 values that the membrane analogy
 * makes concrete: Modularity (repair = regeneration), Privacy (selective
 * permeability), and Longevity (biology wastes nothing).
 *
 * This is the edge of the cell. You have navigated from the inside out.
 */
export function MembranePanel() {
  return (
    <div className="px-6 py-12 max-w-5xl mx-auto">
      {/* Zone header */}
      <div className="text-center mb-16 space-y-4">
        <div
          className="inline-block text-4xl mb-2"
          style={{ color: "rgba(125,211,252,0.6)" }}
          aria-hidden
        >
          膜
        </div>
        <h2 className="text-3xl font-bold text-white">Rooted in Reality</h2>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Cell OS isn't just a metaphor. It perfectly articulates the physical ethos
          of the Fairphone 5 — the outermost expression of everything inside.
        </p>
      </div>

      {/* Value columns */}
      <div className="grid md:grid-cols-3 gap-10">
        <div className="space-y-5 text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
            <Cpu className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-semibold text-white">Modularity is Life</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">
            Cells replace damaged organelles without dying. The Fairphone 5 lets you
            hot-swap batteries, screens, and cameras. Repair is regeneration.
          </p>
        </div>

        <div className="space-y-5 text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-accent">
            <Shield className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-semibold text-white">Membrane Privacy</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">
            A cell membrane is highly selective about what enters and exits. Cell OS
            offers absolute transparency and strict permission gateways for user data.
          </p>
        </div>

        <div className="space-y-5 text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-secondary/10 border border-secondary/30 flex items-center justify-center text-secondary">
            <Fingerprint className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-semibold text-white">Sustainable Lifespan</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">
            Biology wastes nothing. With 8 years of software support and a digital
            lysosome system to clear junk, your device stays fresh, fast, and alive longer.
          </p>
        </div>
      </div>

      {/* Footer — you have reached the outer edge */}
      <div className="mt-20 text-center border-t border-white/5 pt-12">
        <p className="text-xs font-mono text-muted-foreground/25 tracking-widest mb-1">
          尺度不變性 · 0.7770777
        </p>
        <p className="text-xs font-mono text-muted-foreground/15 tracking-wider">
          Nucleus → Cytoplasm → Cytoskeleton → Ribosomes → Mitochondria → Golgi → ER → Membrane
        </p>
      </div>
    </div>
  );
}
