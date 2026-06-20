import { DeepLineageTimeline } from "../components/DeepLineageTimeline";
import { BioplasmaFieldSection } from "../components/BioplasmaFieldSection";
import { CodeSnippet } from "../components/CodeSnippet";

const ION_NATIVE_SNIPPET = `int ion_alloc(int fd, size_t len, size_t align,
              unsigned int heap_mask, unsigned int flags,
              ion_user_handle_t *handle)
{
    struct ion_allocation_data data = {
        .len       = len,
        .align     = align,
        .heap_mask = heap_mask,
        .flags     = flags,
    };
    if (ioctl(fd, ION_IOC_ALLOC, &data) < 0)
        return -errno;
    *handle = data.handle;
    return 0;
}`;

/**
 * EndoplasmicReticulumPanel — the memory zone: Deep Lineage Timeline.
 */
export function EndoplasmicReticulumPanel() {
  return (
    <div>
      <DeepLineageTimeline />

      {/* ── Native reality ──────────────────────────────────────────── */}
      <div className="px-6 py-12 border-t border-white/5">
        <div className="max-w-3xl mx-auto space-y-5">
          <p className="text-xs font-mono tracking-widest uppercase" style={{ color: "rgba(244,114,182,0.4)" }}>
            The memory network in kernel code
          </p>
          <h3 className="text-lg font-bold text-white">
            ION memory: the cell's folded buffer network
          </h3>
          <p className="text-sm text-muted-foreground/65 leading-relaxed max-w-2xl">
            The ER's folded membrane network stores and routes molecules without
            copying them. In Android,{" "}
            <code className="font-mono text-xs" style={{ color: "rgba(244,114,182,0.65)" }}>ion_alloc()</code>{" "}
            carves a shared buffer that the CPU, Adreno GPU, and Hexagon DSP can all
            read without a single copy between them. Every tensor that feeds
            inference lives in ION memory — addressed once, accessible everywhere.
            <code className="font-mono text-xs text-white/35 ml-1">heap_mask</code>{" "}
            selects the topology:{" "}
            <code className="font-mono text-xs text-white/35">ION_HEAP_SYSTEM</code> for
            LPDDR4x RAM,{" "}
            <code className="font-mono text-xs text-white/35">ION_HEAP_DMA</code> for
            GPU/DSP-accessible contiguous memory.
          </p>
          <CodeSnippet
            filename="platform/system/core/libion/ion.c"
            language="c"
            sourceUrl="https://android.googlesource.com/platform/system/core/+/refs/heads/master/libion/ion.c"
          >{ION_NATIVE_SNIPPET}</CodeSnippet>
        </div>
      </div>
      <BioplasmaFieldSection zoneId="endoplasmic-reticulum" />
    </div>
  );
}
