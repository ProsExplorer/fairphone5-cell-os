import { Link } from "wouter";
import { BioplasmaFieldSection } from "../components/BioplasmaFieldSection";
import { CodeSnippet } from "../components/CodeSnippet";

const GATE_POSITIONS = Array.from({ length: 8 }, (_, i) => {
  const a = (i * Math.PI * 2) / 8;
  return { x: Math.sin(a) * 22, y: -Math.cos(a) * 22 };
});

const QI_TYPE_SNIPPET = `// src/domain/types.ts
// The QiIntersection type is the atom of the qi tensor matrix.
// Every curated entry encodes three coordinates + a narrative.

export type QiIntersection = {
  id:        string;
  zoneId:    CellZoneId;   // axis A — which of the 8 organelle zones
  phaseId:   "perception" | "affect" | "expression"; // axis B — P→A→E
  scaleId:   string;       // axis C — symbolic → quantum → … → silicon
  title:     string;
  narrative: string;
  hardwareAnalogue?: string;  // silicon-scale entries only
  substrateIds?:    string[]; // links to substrate nodes (Hexagon, etc.)
  evidence:  "verified" | "indicative" | "unconfirmed";
};

// Full tensor: 8 zones × 3 phases × 11 scales = 264 intersections.
// 18 are curated — the ones where the three axes illuminate each other.`;

const INIT_NATIVE_SNIPPET = `static Result<void> HandleBuiltinCommand(
    const BuiltinFunctionMap& function_map,
    const Action& current_action,
    const Command& command) {

  auto builtin_handler = function_map.FindFunction(command);
  if (!builtin_handler.ok()) {
    return builtin_handler.error();
  }

  return (*builtin_handler)(command.args());
}`;

const QI_ENTRY_SNIPPET = `// src/domain/content/qiMatrix.ts — one curated entry
{
  id:      "nucleus-expression-silicon",
  zoneId:  "nucleus",
  phaseId: "expression",
  scaleId: "silicon",
  title:   "Tokenization — DNA Expressed as Input",
  narrative:
    "The prompt is the nucleus's expression: a compressed encoding of intent,
     passed through the nuclear pore (tokenizer) into the inference engine.
     UFS 2.2 reads the quantized genome (model weights) at 1,200 MB/s;
     the prompt tokens are staged in LPDDR4x RAM. The HTA buffer opens.
     Expression at the silicon scale is the act of becoming readable.",
  hardwareAnalogue: "UFS 2.2 storage → LPDDR4x RAM → HTA input buffer",
  substrateIds:     ["ufs", "lpddr4x", "hexagon"],
  evidence:         "verified",
}`;

/**
 * NucleusPanel — the core identity of Cell OS.
 *
 * The innermost zone. This is the DNA of the concept: who we are, why we exist,
 * and the philosophical nucleus that all other zones orbit.
 */
export function NucleusPanel() {
  return (
    <div className="flex flex-col items-center px-8 py-20 relative">

      {/* Ambient nucleus glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(34,211,238,0.07) 0%, transparent 70%)" }}
      />

      {/* ── Identity centrepiece ───────────────────────────────────── */}
      <div className="relative max-w-2xl mx-auto space-y-8 text-center mb-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-primary/30 text-primary font-mono text-sm tracking-widest uppercase">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          Concept: Fairphone 5
        </div>

        <h1 className="text-6xl md:text-7xl font-bold text-white text-glow">Cell OS</h1>

        <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
          Reimagining the smartphone not as a machine, but as a{" "}
          <span className="text-white">self-sustaining living organism</span>.
        </p>

        <p className="text-base text-muted-foreground/65 max-w-lg mx-auto leading-relaxed">
          Alive, adaptive, sustainable, and private by nature. Navigate outward through
          the cell's zones to explore how biology informs the ultimate operating system.
        </p>

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
                  style={{ left: `calc(50% + ${x}px - 2px)`, top: `calc(50% + ${y}px - 2px)` }}
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

      {/* ── The code that IS the nucleus ──────────────────────────── */}
      <div className="w-full max-w-3xl mx-auto space-y-8">
        <div className="space-y-2 text-center">
          <p className="text-xs font-mono tracking-widest uppercase" style={{ color: "rgba(34,211,238,0.45)" }}>
            The genome in code
          </p>
          <h3 className="text-lg font-bold text-white">
            The Qi Tensor Matrix — the DNA of Cell OS
          </h3>
          <p className="text-sm text-muted-foreground/70 max-w-xl mx-auto leading-relaxed">
            Just as the nucleus encodes everything the cell can become in its genome,
            the qi tensor matrix encodes every intersection of zone, phase, and scale
            that Cell OS navigates. This is the actual TypeScript that defines it.
          </p>
        </div>

        <CodeSnippet filename="src/domain/types.ts">
          {QI_TYPE_SNIPPET}
        </CodeSnippet>

        <div className="space-y-2">
          <p className="text-xs text-muted-foreground/45 leading-relaxed pl-1">
            Every interaction you have with Cell OS — clicking an organelle, reading
            a zone panel, following a biophoton link — is ultimately navigating one
            or more of these 18 curated intersections. Here is one, fully resolved:
          </p>
        </div>

        <CodeSnippet filename="src/domain/content/qiMatrix.ts">
          {QI_ENTRY_SNIPPET}
        </CodeSnippet>

        {/* ── Native reality ──────────────────────────────────────── */}
        <div className="pt-6 border-t border-white/5 space-y-4">
          <p className="text-xs font-mono tracking-widest uppercase" style={{ color: "rgba(34,211,238,0.3)" }}>
            The kernel this maps to
          </p>
          <p className="text-sm text-muted-foreground/60 leading-relaxed">
            On the Fairphone 5, the nucleus is <code className="font-mono text-xs" style={{ color: "rgba(34,211,238,0.55)" }}>init.cpp</code> — PID 1,
            the first userspace process. It reads <code className="font-mono text-xs text-white/40">.rc</code> files exactly as a ribosome
            reads RNA: declarative intent compressed into a bootable sequence.
            Every service, every permission, every mount — encoded in text, executed at boot.
          </p>
          <CodeSnippet
            filename="platform/system/core/init/init.cpp"
            language="c++"
            sourceUrl="https://android.googlesource.com/platform/system/core/+/refs/heads/master/init/init.cpp"
          >{INIT_NATIVE_SNIPPET}</CodeSnippet>
        </div>
      </div>
      <BioplasmaFieldSection zoneId="nucleus" />
    </div>
  );
}
