import { useEffect, useState } from "react";
import { useCellShell } from "./CellShellProvider";

/**
 * A fixed right-rail indicator that surfaces which cellular zone the user is
 * currently inside. Fades in after the hero is scrolled past. Acts as the
 * cell's proprioception — knowing where it is within its own body.
 */
export function MembraneIndicator() {
  const { activeZone } = useCellShell();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > window.innerHeight * 0.6);
    window.addEventListener("scroll", handle, { passive: true });
    handle();
    return () => window.removeEventListener("scroll", handle);
  }, []);

  const visible = scrolled && activeZone !== null;

  return (
    <div
      className="fixed right-3 top-1/2 -translate-y-1/2 z-50 pointer-events-none hidden md:flex flex-col items-center gap-2 transition-all duration-[777ms]"
      style={{ opacity: visible ? 1 : 0, transform: `translateY(-50%) translateX(${visible ? "0" : "12px"})` }}
      aria-hidden="true"
    >
      {activeZone && (
        <div
          className="glass-panel rounded-2xl px-2.5 py-4 flex flex-col items-center gap-3 border transition-colors duration-[777ms]"
          style={{ borderColor: `${activeZone.color}28` }}
        >
          {/* Zone glyph */}
          <span
            className="text-xl leading-none font-bold transition-colors duration-[777ms]"
            style={{ color: `${activeZone.color}80` }}
          >
            {activeZone.glyph}
          </span>

          {/* Hairline */}
          <div
            className="w-px h-5 rounded-full transition-colors duration-[777ms]"
            style={{ background: `${activeZone.color}25` }}
          />

          {/* Rotated zone name */}
          <span
            className="font-mono text-[8px] tracking-[0.18em] uppercase transition-colors duration-[777ms]"
            style={{
              writingMode: "vertical-rl",
              textOrientation: "mixed",
              transform: "rotate(180deg)",
              color: `${activeZone.color}55`,
            }}
          >
            {activeZone.name}
          </span>

          {/* Hairline */}
          <div
            className="w-px h-3 rounded-full transition-colors duration-[777ms]"
            style={{ background: `${activeZone.color}25` }}
          />

          {/* Live pulse dot */}
          <div
            className="w-1.5 h-1.5 rounded-full animate-pulse transition-colors duration-[777ms]"
            style={{
              backgroundColor: activeZone.color,
              boxShadow: `0 0 6px ${activeZone.color}`,
            }}
          />
        </div>
      )}
    </div>
  );
}
