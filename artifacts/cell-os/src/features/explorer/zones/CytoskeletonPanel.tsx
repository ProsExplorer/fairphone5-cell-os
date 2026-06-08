import { SubstrateAtlas } from "../components/SubstrateAtlas";
import { CodeSnippet } from "../components/CodeSnippet";
import type { ExplorerView, ExplorerPerception } from "../useExplorerFlow";

type Props = {
  view: ExplorerView;
  perceive: ExplorerPerception;
};

const SCHED_NATIVE_SNIPPET = `int select_task_rq(struct task_struct *p, int cpu, int flags)
{
    lockdep_assert_held(&p->pi_lock);

    if (p->nr_cpus_allowed > 1 && !is_migration_disabled(p))
        cpu = p->sched_class->select_task_rq(p, cpu, flags);
    else
        cpu = cpumask_any(p->cpus_ptr);

    if (unlikely(!is_cpu_allowed(p, cpu)))
        cpu = select_fallback_rq(task_cpu(p), p);

    return cpu;
}`;

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
            The hardware nodes above are the substrate. The code below positions workloads
            across them —{" "}
            <code className="font-mono text-xs" style={{ color: "rgba(129,140,248,0.65)" }}>select_task_rq()</code>{" "}
            from the Android mainline kernel. It delegates to the Energy Aware Scheduler,
            which picks the Kryo 670 core that adds the least energy for each task.
            The cytoskeleton does not place organelles randomly — it minimises the cost
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
