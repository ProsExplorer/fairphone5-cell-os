import { useState } from "react";
import { BioplasmaFieldSection } from "../components/BioplasmaFieldSection";
import { CELL_MAPPINGS } from "@/lib/data";
import { FractalNavigator } from "../components/FractalNavigator";
import { CodeSnippet } from "../components/CodeSnippet";
import type { ExplorerView, ExplorerPerception } from "../useExplorerFlow";

const ZYGOTE_NATIVE_SNIPPET = `private static void preloadClasses() {
    final VMRuntime runtime = VMRuntime.getRuntime();
    InputStream is = ClassLoader.getSystemResourceAsStream(PRELOADED_CLASSES);

    try (BufferedReader br = new BufferedReader(new InputStreamReader(is))) {
        String line;
        while ((line = br.readLine()) != null) {
            if (line.startsWith("#") || line.isEmpty()) continue;
            Class.forName(line, true, null);
        }
    } catch (IOException | ClassNotFoundException e) {
        Log.e(TAG, "Error preloading " + e);
    }
}`;

type Tab = "genome" | "fractal";

type Props = {
  view: ExplorerView;
  perceive: ExplorerPerception;
};

/**
 * GolgiPanel — the sorting apparatus: OS Genome + Fractal Navigator.
 *
 * The Golgi apparatus sorts, labels, and packages proteins produced by the ER,
 * then routes them to their correct destination. Here it maps to:
 *
 * OS Genome — all 15 organelle→OS mappings, sorted and labeled. This is the
 * complete reference of the Cell OS vocabulary.
 *
 * Fractal Navigator — the same P→A→E cycle that governs a single inference call
 * also governs each organelle, each zone, the entire OS, and the entire device
 * lifespan. Navigate the 3-level drilldown to see the pattern repeat.
 */
export function GolgiPanel({ view, perceive }: Props) {
  const [tab, setTab] = useState<Tab>("genome");

  return (
    <div className="px-6 py-8">
      {/* Tab bar */}
      <div className="flex items-center gap-1 mb-8 border-b border-white/5 pb-0">
        {(["genome", "fractal"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="px-4 py-2.5 text-[11px] font-mono tracking-widest uppercase transition-all duration-300 border-b-2 -mb-px"
            style={{
              color: tab === t ? "white" : "rgba(255,255,255,0.35)",
              borderColor: tab === t ? "rgba(192,132,252,0.7)" : "transparent",
            }}
          >
            {t === "genome" ? "OS Genome · 15 mappings" : "Fractal Navigator"}
          </button>
        ))}
      </div>

      {/* OS Genome grid */}
      {tab === "genome" && (
        <div>
          <p className="text-sm text-muted-foreground mb-6 max-w-2xl leading-relaxed">
            The complete sorted genome — all 15 biological-to-digital mappings that govern
            Cell OS. Each card is one gene in the organism's DNA. Hover to see biophoton
            links in the cell diagram.
          </p>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {CELL_MAPPINGS.map((mapping) => {
              const highlighted = view.isOrganelleHighlighted(mapping.id);
              return (
                <div
                  key={mapping.id}
                  className="p-5 glass-panel rounded-2xl hover:bg-white/[0.04] transition-all duration-300 border cursor-default"
                  style={{
                    opacity: view.hasFocus && !highlighted ? 0.35 : 1,
                    borderColor: highlighted ? `${mapping.color}90` : "rgba(255,255,255,0.05)",
                    boxShadow: highlighted ? `0 8px 32px 0 ${mapping.color}28` : undefined,
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={() => perceive.hoverOrganelle(mapping.id)}
                  onMouseLeave={() => perceive.hoverOrganelle(null)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-bold text-white text-sm">{mapping.name}</h4>
                    <div
                      className="w-2.5 h-2.5 rounded-full shrink-0 mt-0.5"
                      style={{
                        backgroundColor: mapping.color,
                        boxShadow: highlighted ? `0 0 8px ${mapping.color}` : `0 0 4px ${mapping.color}60`,
                      }}
                    />
                  </div>
                  <div className="text-[10px] font-mono text-muted-foreground/60 mb-2.5">
                    {mapping.osFeature}
                  </div>
                  <p className="text-xs text-foreground/70 leading-relaxed">
                    {mapping.explanation}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Native reality — Zygote */}
      {tab === "genome" && (
        <div className="mt-10 border-t border-white/5 pt-10 space-y-5">
          <p className="text-xs font-mono tracking-widest uppercase" style={{ color: "rgba(192,132,252,0.4)" }}>
            The sorting apparatus in native code
          </p>
          <h3 className="text-lg font-bold text-white">
            Zygote: sort once, distribute to every app
          </h3>
          <p className="text-sm text-muted-foreground/65 leading-relaxed max-w-2xl">
            The OS Genome above is the Cell OS vocabulary — 15 sorted mappings.
            In Android, the Golgi equivalent is{" "}
            <code className="font-mono text-xs" style={{ color: "rgba(192,132,252,0.65)" }}>ZygoteInit.preloadClasses()</code>.
            It reads a manifest of every framework class, sorts and packages them
            into a single process, then ships a pre-sorted copy to every app via{" "}
            <code className="font-mono text-xs text-white/40">fork()</code>.
            The Golgi does not reprocess proteins for each destination —
            it sorts once, packages, distributes.
          </p>
          <CodeSnippet
            filename="platform/frameworks/base/core/java/com/android/internal/os/ZygoteInit.java"
            language="java"
            sourceUrl="https://android.googlesource.com/platform/frameworks/base/+/refs/heads/master/core/java/com/android/internal/os/ZygoteInit.java"
          >{ZYGOTE_NATIVE_SNIPPET}</CodeSnippet>
        </div>
      )}

      {/* Fractal Navigator */}
      {tab === "fractal" && (
        <div className="-mx-6">
          <FractalNavigator />
        </div>
      )}
      <BioplasmaFieldSection zoneId="golgi" />
    </div>
  );
}
