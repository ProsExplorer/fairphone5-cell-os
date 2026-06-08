import { SubstrateAtlas } from "../components/SubstrateAtlas";
import { CodeSnippet } from "../components/CodeSnippet";
import type { ExplorerView, ExplorerPerception } from "../useExplorerFlow";

type Props = {
  view: ExplorerView;
  perceive: ExplorerPerception;
};

const SCHED_NATIVE_SNIPPET = `// kernel/sched/core.c — Energy Aware Scheduling (EAS)
// The cytoskeleton positions organelles. The scheduler positions processes.
// find_energy_efficient_cpu() is the cytoskeletal wire:
// it decides which Kryo 670 core handles which computation
// by minimising the energy added to the system.

static int find_energy_efficient_cpu(struct task_struct *p, int prev_cpu)
{
  unsigned long prev_delta = ULONG_MAX, best_delta = ULONG_MAX;
  int best_energy_cpu = prev_cpu;

  // Iterate performance domains: P-cores (big) and E-cores (little)
  // on the Fairphone 5's Kryo 670 cluster.
  rcu_read_lock();
  for_each_perf_domain(pd) {
    // Which core adds the least energy for this task's workload?
    // The lattice selects the wire that costs least.
    if (delta < best_delta) {
      best_delta = delta;
      best_energy_cpu = max_spare_cpu;
    }
  }
  rcu_read_unlock();
  return best_energy_cpu >= 0 ? best_energy_cpu : prev_cpu;
}`;

/**
 * CytoskeletonPanel — the AI substrate structural lattice.
 *
 * The cytoskeleton provides the structural framework that holds the cell's shape
 * and positions its organelles. Here it maps to the Fairphone 5's hardware
 * substrate: Hexagon 770 DSP, Adreno 643 GPU, Kryo 670 CPU — the silicon
 * scaffolding on which everything else runs.
 */
export function CytoskeletonPanel({ view, perceive }: Props) {
  return (
    <div>
      <SubstrateAtlas
        isSubstrateHighlighted={view.isSubstrateHighlighted}
        hasFocus={view.hasFocus}
        onToggleSubstrate={perceive.toggleSubstrate}
      />

      {/* ── Native reality ──────────────────────────────────────────── */}
      <div className="px-6 py-12 border-t border-white/5">
        <div className="max-w-3xl mx-auto space-y-5">
          <p className="text-xs font-mono tracking-widest uppercase" style={{ color: "rgba(129,140,248,0.4)" }}>
            The lattice wire in kernel code
          </p>
          <h3 className="text-lg font-bold text-white">
            The scheduler is the cytoskeleton
          </h3>
          <p className="text-sm text-muted-foreground/65 leading-relaxed max-w-2xl">
            The hardware nodes above are the substrate. The code below is what
            positions workloads across them —{" "}
            <code className="font-mono text-xs" style={{ color: "rgba(129,140,248,0.65)" }}>find_energy_efficient_cpu()</code>{" "}
            from the Android mainline kernel. Energy Aware Scheduling chooses which
            Kryo 670 core handles each task by measuring the energy cost of each option.
            The cytoskeleton doesn't move organelles randomly — it minimises the energy
            of every placement.
          </p>
          <CodeSnippet
            filename="kernel/common/kernel/sched/core.c"
            language="c"
            sourceUrl="https://android.googlesource.com/kernel/common/+/refs/heads/android-mainline/kernel/sched/core.c"
          >{SCHED_NATIVE_SNIPPET}</CodeSnippet>
        </div>
      </div>
    </div>
  );
}
