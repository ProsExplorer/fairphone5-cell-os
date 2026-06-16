import { useEffect, useState } from "react";
import { Link } from "wouter";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { useExplorerNavigation, ZONE_DEPTH_ORDER } from "./useExplorerNavigation";
import { useExplorerFlow } from "../useExplorerFlow";
import { CellMapNav } from "./CellMapNav";
import { ZoneContentViewport } from "./ZoneContentViewport";
import { CELL_ZONES } from "@/features/cell-shell/CellShellProvider";
import { useCellVitalStore } from "@/features/cell-shell/state/useCellVitalStore";
import { useMembraneObserver } from "@/features/learning/useMembraneObserver";
import type { CellZoneId } from "@/domain/types";

/**
 * CellExplorerLayout — the root cellular GUI shell.
 *
 * Replaces the linear long-scroll home with a spatial exploration model:
 *   - Desktop: persistent left sidebar (cell cross-section + zone list) + right content panel
 *   - Mobile: sticky horizontal zone chip bar + full-width scrollable content
 *
 * Navigation direction: nucleus (innermost, "core") → membrane (outermost, "edge")
 * The user explores the cell from the inside out.
 *
 * useExplorerFlow lives here (not in zone panels) so cross-zone state persists
 * when switching zones — clicking mitochondria in cytoplasm keeps it highlighted
 * when you navigate to the cytoskeleton substrate view.
 */
export function CellExplorerLayout() {
  const { activeZone, selectZone, goInward, goOutward, canGoInward, canGoOutward } =
    useExplorerNavigation("cytoplasm");
  const { view, perceive } = useExplorerFlow();
  const setActiveZone = useCellVitalStore((s) => s.setActiveZone);
  const emitSignal    = useCellVitalStore((s) => s.emitSignal);
  const [ringExpanded, setRingExpanded] = useState(true);

  // Sync active zone to the vital store so the living cell diagram reacts.
  // Also emit a brief zone-pulse signal so the navigated-to ring brightens.
  // Re-expand the mobile ring navigator on every zone change — navigation
  // resets scroll to top (via key={activeZone} remount), so the ring should
  // be visible again to orient the user in the new zone.
  useEffect(() => {
    setActiveZone(activeZone);
    emitSignal(activeZone, "pulse", 0.7, 1800);
    setRingExpanded(true);
  }, [activeZone, setActiveZone, emitSignal]);

  // Membrane boundary: all learning observations flow through this single
  // named hook — the formal ingestion boundary for the epigenome.
  // See useMembraneObserver.ts for the architectural rationale.
  useMembraneObserver(view, activeZone);

  const zone = CELL_ZONES[activeZone];

  return (
    <div className="flex flex-col bg-background text-foreground" style={{ height: "100dvh", overflow: "hidden" }}>

      {/* Ambient background — color follows the active zone */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full blur-[180px]"
          style={{
            background: `${zone.color}07`,
            transition: "background 0.777s ease",
          }}
        />
      </div>

      {/* ── HEADER ──────────────────────────────────────────────────────────── */}
      <header className="relative z-40 flex-shrink-0 h-12 flex items-center justify-between px-4 border-b border-white/5 bg-background/85 backdrop-blur-xl">

        {/* Left: brand + breadcrumb */}
        <div className="flex items-center gap-2 min-w-0">
          <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground/35 shrink-0">
            Cell OS
          </span>
          <span className="text-muted-foreground/20 shrink-0">/</span>
          <div className="flex items-center gap-1.5 min-w-0">
            <span
              className="text-base leading-none shrink-0 transition-colors duration-[777ms]"
              style={{ color: `${zone.color}85` }}
            >
              {zone.glyph}
            </span>
            <span className="text-sm font-medium text-white/80 truncate">{zone.name}</span>
          </div>
          <span
            className="hidden lg:block text-[9px] font-mono text-muted-foreground/25 truncate"
          >
            · {zone.osFeature}
          </span>
        </div>

        {/* Right: inward/outward nav + page links */}
        <div className="flex items-center gap-1 shrink-0">
          {/* Depth navigation */}
          <button
            onClick={goInward}
            disabled={!canGoInward}
            className="flex items-center gap-0.5 px-2 py-1.5 rounded-md text-[10px] font-mono text-muted-foreground/40 hover:text-white hover:bg-white/5 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
            title="Go inward — toward nucleus"
          >
            <ChevronLeft className="w-3 h-3" />
            <span className="hidden sm:inline">Inward</span>
          </button>
          <button
            onClick={goOutward}
            disabled={!canGoOutward}
            className="flex items-center gap-0.5 px-2 py-1.5 rounded-md text-[10px] font-mono text-muted-foreground/40 hover:text-white hover:bg-white/5 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
            title="Go outward — toward membrane"
          >
            <span className="hidden sm:inline">Outward</span>
            <ChevronRight className="w-3 h-3" />
          </button>

          <div className="w-px h-4 bg-white/8 mx-1" />

          <Link
            href="/philosophy"
            className="hidden md:block px-2 py-1 rounded text-[10px] font-mono text-muted-foreground/30 hover:text-muted-foreground/65 transition-colors"
          >
            Philosophy
          </Link>
          <Link
            href="/substrate"
            className="hidden md:block px-2 py-1 rounded text-[10px] font-mono text-muted-foreground/30 hover:text-muted-foreground/65 transition-colors"
          >
            Substrate
          </Link>
          <Link
            href="/fractal"
            className="hidden md:block px-2 py-1 rounded text-[10px] font-mono text-muted-foreground/30 hover:text-muted-foreground/65 transition-colors"
          >
            Fractal
          </Link>
          <Link
            href="/metrics"
            className="hidden md:block px-2 py-1 rounded text-[10px] font-mono text-muted-foreground/30 hover:text-muted-foreground/65 transition-colors"
          >
            Metrics
          </Link>
        </div>
      </header>

      {/* ── MOBILE ZONE CHIP BAR ─────────────────────────────────────────────── */}
      <div className="lg:hidden flex-shrink-0 overflow-x-auto border-b border-white/5 bg-background/70 backdrop-blur-xl z-30">
        <div className="flex gap-1.5 px-3 py-2 w-max">
          {ZONE_DEPTH_ORDER.map((zId) => {
            const z = CELL_ZONES[zId];
            const isActive = zId === activeZone;
            return (
              <button
                key={zId}
                onClick={() => selectZone(zId as CellZoneId)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[10px] font-mono tracking-wider whitespace-nowrap transition-all duration-[777ms]"
                style={{
                  borderColor: isActive ? `${z.color}55` : "rgba(255,255,255,0.07)",
                  background: isActive ? `${z.color}12` : "transparent",
                  color: isActive ? z.color : "rgba(255,255,255,0.3)",
                }}
              >
                <span className="text-sm leading-none">{z.glyph}</span>
                <span>{z.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── MOBILE PAGE LINKS ───────────────────────────────────────────────── */}
      <div className="md:hidden flex-shrink-0 border-b border-white/5 bg-background/60 backdrop-blur-xl z-30">
        <div className="flex gap-1 px-3 py-1.5 overflow-x-auto">
          {[
            { href: "/philosophy", glyph: "核", label: "Philosophy", color: "rgba(34,211,238,0.6)" },
            { href: "/substrate",  glyph: "硅", label: "Substrate",  color: "rgba(251,191,36,0.6)" },
            { href: "/fractal",    glyph: "形", label: "Fractal",    color: "rgba(196,181,253,0.6)" },
            { href: "/metrics",    glyph: "量", label: "Metrics",    color: "rgba(74,222,128,0.6)"  },
          ].map(({ href, glyph, label, color }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full border border-white/8 text-[9px] font-mono tracking-widest uppercase text-muted-foreground/40 hover:text-muted-foreground/75 transition-colors shrink-0"
            >
              <span style={{ color }}>{glyph}</span>
              {label}
            </Link>
          ))}
          <a
            href="secretory-diagram.html"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-2.5 py-1 rounded-full border border-white/8 text-[9px] font-mono tracking-widest uppercase text-muted-foreground/40 hover:text-muted-foreground/75 transition-colors shrink-0"
          >
            <span style={{ color: "rgba(244,114,182,0.6)" }}>泌</span>
            Secretory
          </a>
          <a
            href="qi-tensor-diagram.html"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-2.5 py-1 rounded-full border border-white/8 text-[9px] font-mono tracking-widest uppercase text-muted-foreground/40 hover:text-muted-foreground/75 transition-colors shrink-0"
          >
            <span style={{ color: "rgba(56,189,248,0.6)" }}>氣</span>
            QI Tensor
          </a>
          <a
            href="android-evolution-diagram.html"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-2.5 py-1 rounded-full border border-white/8 text-[9px] font-mono tracking-widest uppercase text-muted-foreground/40 hover:text-muted-foreground/75 transition-colors shrink-0"
          >
            <span style={{ color: "rgba(129,140,248,0.6)" }}>演</span>
            Evolution
          </a>
          <a
            href="secretory-biophoton-diagram.html"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-2.5 py-1 rounded-full border border-white/8 text-[9px] font-mono tracking-widest uppercase text-muted-foreground/40 hover:text-muted-foreground/75 transition-colors shrink-0"
          >
            <span style={{ color: "rgba(134,239,172,0.6)" }}>泌</span>
            Biophoton Secretory
          </a>
        </div>
      </div>

      {/* ── MOBILE RING DIAGRAM (collapsible) ───────────────────────────────── */}
      <div className="lg:hidden flex-shrink-0 border-b border-white/5 bg-background/50 backdrop-blur-sm z-20">

        {/* Toggle header — always visible, labels the navigator clearly */}
        <button
          onClick={() => setRingExpanded((v) => !v)}
          className="w-full flex items-center justify-between px-4 py-2.5 text-left"
          aria-expanded={ringExpanded}
          aria-controls="mobile-ring-diagram"
        >
          <div className="flex items-center gap-2.5">
            {/* Active-zone color dot */}
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{
                backgroundColor: zone.color,
                boxShadow: `0 0 6px ${zone.color}`,
              }}
            />
            <span className="font-mono text-[9px] tracking-[0.22em] uppercase text-muted-foreground/50">
              Zone Navigator
            </span>
            {/* Active zone badge */}
            <span
              className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-mono"
              style={{
                color: zone.color,
                background: `${zone.color}15`,
              }}
            >
              <span>{zone.glyph}</span>
              <span className="opacity-75">{zone.name}</span>
            </span>
          </div>

          <ChevronDown
            className="w-3.5 h-3.5 text-muted-foreground/30 shrink-0 transition-transform duration-300"
            style={{ transform: ringExpanded ? "rotate(180deg)" : "rotate(0deg)" }}
          />
        </button>

        {/* Collapsible ring diagram */}
        {ringExpanded && (
          <div
            id="mobile-ring-diagram"
            className="flex flex-col items-center pb-3 px-4"
          >
            <CellMapNav compact activeZone={activeZone} onSelectZone={selectZone} />
            <p className="font-mono text-[8px] tracking-[0.2em] uppercase text-muted-foreground/25 mt-1">
              Tap a ring · Inside → Out
            </p>
          </div>
        )}
      </div>

      {/* ── BODY: sidebar + content viewport ────────────────────────────────── */}
      <div className="relative z-10 flex flex-1" style={{ overflow: "hidden" }}>

        {/* Desktop sidebar */}
        <div className="hidden lg:flex flex-col w-60 xl:w-64 flex-shrink-0" style={{ overflow: "hidden" }}>
          <CellMapNav activeZone={activeZone} onSelectZone={selectZone} />
        </div>

        {/* Zone content */}
        <ZoneContentViewport
          activeZone={activeZone}
          view={view}
          perceive={perceive}
          onScrollDown={() => setRingExpanded(false)}
        />
      </div>
    </div>
  );
}
