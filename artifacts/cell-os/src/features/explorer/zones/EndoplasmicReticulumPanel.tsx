import { DeepLineageTimeline } from "../components/DeepLineageTimeline";
import { CodeSnippet } from "../components/CodeSnippet";

const ION_NATIVE_SNIPPET = `// platform/system/core/libion/ion.c
// The endoplasmic reticulum is a vast folded membrane network.
// ion_alloc() is the ER call: it carves a named buffer that the
// kernel, GPU, and DSP can all read without copying.
// Zero-copy tensor routing through the cell's membrane network.

int ion_alloc(int fd, size_t len, size_t align,
              unsigned int heap_mask, unsigned int flags,
              ion_user_handle_t *handle)
{
  // heap_mask selects the memory topology:
  //   ION_HEAP_SYSTEM   — LPDDR4x main RAM (general cytoplasm)
  //   ION_HEAP_DMA      — contiguous for DMA (GPU + DSP access)
  //   ION_HEAP_CARVEOUT — locked for TrustZone (membrane boundary)
  struct ion_allocation_data data = {
    .len       = len,
    .align     = align,
    .heap_mask = heap_mask,
    .flags     = flags,
  };
  if (ioctl(fd, ION_IOC_ALLOC, &data) < 0) return -errno;
  *handle = data.handle;  // ← the ER's folded address: a named buffer
  return 0;               //   all tensor memory is born here
}`;

/**
 * EndoplasmicReticulumPanel — the memory zone: Deep Lineage Timeline.
 *
 * The endoplasmic reticulum is a vast folded network of membranes that processes,
 * stores, and transports proteins throughout the cell. It is the cell's distributed
 * memory and manufacturing infrastructure.
 *
 * Here it maps to the Deep Lineage Timeline — the deep evolutionary and technological
 * lineage that produced both biology and silicon computation.
 */
export function EndoplasmicReticulumPanel() {
  return (
    <div>
      {/* ── Native reality — shown first: ER is the memory foundation ── */}
      <div className="px-6 pt-12 pb-8 border-b border-white/5">
        <div className="max-w-3xl mx-auto space-y-5">
          <p className="text-xs font-mono tracking-widest uppercase" style={{ color: "rgba(244,114,182,0.4)" }}>
            The memory network in kernel code
          </p>
          <h3 className="text-lg font-bold text-white">
            ION memory: the cell's folded buffer network
          </h3>
          <p className="text-sm text-muted-foreground/65 leading-relaxed max-w-2xl">
            The ER's folded membrane network stores and routes molecules without waste.
            In Android, <code className="font-mono text-xs" style={{ color: "rgba(244,114,182,0.65)" }}>ion_alloc()</code>{" "}
            does the same: it allocates a buffer that the CPU, Adreno GPU, and Hexagon DSP
            can all share without copying data between them. The tensor that feeds inference
            lives in ION memory — named, positioned, routed through the silicon's
            folded address space.
          </p>
          <CodeSnippet
            filename="platform/system/core/libion/ion.c"
            language="c"
            sourceUrl="https://android.googlesource.com/platform/system/core/+/refs/heads/master/libion/ion.c"
          >{ION_NATIVE_SNIPPET}</CodeSnippet>
        </div>
      </div>

      <DeepLineageTimeline />
    </div>
  );
}
