import type { ClaimConfidence } from "@/domain/types";

const LABELS: Record<ClaimConfidence, string> = {
  verified: "Verified",
  indicative: "Indicative",
  unconfirmed: "Unconfirmed",
  speculative: "Speculative"
};

const STYLES: Record<ClaimConfidence, string> = {
  verified: "text-accent border-accent/40 bg-accent/10",
  indicative: "text-[hsl(35,100%,60%)] border-[hsl(35,100%,60%)]/40 bg-[hsl(35,100%,60%)]/10",
  unconfirmed: "text-muted-foreground border-white/15 bg-white/5",
  speculative: "text-[hsl(270,60%,65%)] border-[hsl(270,60%,65%)]/40 bg-[hsl(270,60%,65%)]/10"
};

interface ConfidenceBadgeProps {
  confidence: ClaimConfidence;
  className?: string;
}

export function ConfidenceBadge({ confidence, className }: ConfidenceBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-mono tracking-widest uppercase ${STYLES[confidence]} ${className ?? ""}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {LABELS[confidence]}
    </span>
  );
}
