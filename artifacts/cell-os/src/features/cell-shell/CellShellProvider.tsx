import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

// ─── Zone registry ────────────────────────────────────────────────────────────

export type CellZoneId =
  | "nucleus"
  | "cytoplasm"
  | "cytoskeleton"
  | "ribosomes"
  | "mitochondria"
  | "golgi"
  | "endoplasmic-reticulum"
  | "membrane";

export type CellZoneMeta = {
  id: CellZoneId;
  name: string;
  osFeature: string;
  glyph: string;
  color: string;
};

/**
 * Each zone maps to both a biological organelle and the Cell OS section it
 * governs. The UI literally IS the cell — navigating the page is navigating
 * through organelles.
 */
export const CELL_ZONES: Record<CellZoneId, CellZoneMeta> = {
  nucleus:                  { id: "nucleus",                  name: "Nucleus",                osFeature: "Core Identity · DNA",      glyph: "核",  color: "#22d3ee" },
  cytoplasm:                { id: "cytoplasm",                name: "Cytoplasm",              osFeature: "Runtime · Explorer",       glyph: "漿",  color: "#34d399" },
  cytoskeleton:             { id: "cytoskeleton",             name: "Cytoskeleton",           osFeature: "AI Substrate Lattice",     glyph: "骨",  color: "#818cf8" },
  ribosomes:                { id: "ribosomes",                name: "Ribosomes",              osFeature: "Pattern Translation",      glyph: "糖",  color: "#a3e635" },
  mitochondria:             { id: "mitochondria",             name: "Mitochondria",           osFeature: "EdgeNode · The Proof",     glyph: "粒",  color: "#fb923c" },
  golgi:                    { id: "golgi",                    name: "Golgi Apparatus",        osFeature: "OS Genome Sorting",        glyph: "高",  color: "#c084fc" },
  "endoplasmic-reticulum":  { id: "endoplasmic-reticulum",   name: "Endoplasmic Reticulum",  osFeature: "Deep Lineage · Memory",    glyph: "網",  color: "#f472b6" },
  membrane:                 { id: "membrane",                 name: "Cell Membrane",          osFeature: "Selective Boundary",       glyph: "膜",  color: "#7dd3fc" },
};

// ─── Context ──────────────────────────────────────────────────────────────────

type CellShellContextValue = {
  activeZone: CellZoneMeta | null;
};

const CellShellContext = createContext<CellShellContextValue>({ activeZone: null });

export function useCellShell() {
  return useContext(CellShellContext);
}

// ─── Provider ─────────────────────────────────────────────────────────────────

/**
 * Observes all elements with [data-cell-zone] in the DOM using
 * IntersectionObserver. Tracks which zone is currently most visible and
 * provides it to all children via context.
 *
 * Usage: add data-cell-zone="nucleus" (or any CellZoneId) to a section/div.
 */
export function CellShellProvider({ children }: { children: ReactNode }) {
  const [activeZoneId, setActiveZoneId] = useState<CellZoneId | null>(null);
  const visibleRef = useRef<Set<string>>(new Set());
  const orderRef   = useRef<string[]>([]);

  useEffect(() => {
    const updateActive = () => {
      const first = orderRef.current.find((z) => visibleRef.current.has(z));
      setActiveZoneId((first as CellZoneId) ?? null);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const zone = (e.target as HTMLElement).dataset.cellZone;
          if (!zone) return;
          if (e.isIntersecting) {
            visibleRef.current.add(zone);
          } else {
            visibleRef.current.delete(zone);
          }
        });
        updateActive();
      },
      { threshold: 0.05 }
    );

    // Small delay so all sections are mounted before we query
    const t = setTimeout(() => {
      const els = Array.from(
        document.querySelectorAll<HTMLElement>("[data-cell-zone]")
      );
      // Capture document order so we can pick the topmost visible zone
      orderRef.current = els.map((el) => el.dataset.cellZone ?? "");
      els.forEach((el) => observer.observe(el));
    }, 150);

    return () => {
      clearTimeout(t);
      observer.disconnect();
    };
  }, []);

  const activeZone = activeZoneId ? CELL_ZONES[activeZoneId] ?? null : null;

  return (
    <CellShellContext.Provider value={{ activeZone }}>
      {children}
    </CellShellContext.Provider>
  );
}
