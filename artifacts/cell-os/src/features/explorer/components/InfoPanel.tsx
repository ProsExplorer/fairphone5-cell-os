import { useMemo } from "react";
import type { Organelle, SubstrateNode, BiophotonLink } from "@/domain/types";
import { ConfidenceBadge } from "./ConfidenceBadge";
import { useLearningStore } from "@/features/learning/useLearningStore";
import { getConfidenceBoosts } from "@/features/learning/hebbianAdapter";

interface InfoPanelProps {
  organelle: Organelle | null;
  substrate: SubstrateNode | null;
  relatedSubstrate: SubstrateNode[];
  relatedOrganelles: Organelle[];
  relatedBiophotonLinks: BiophotonLink[];
  onSelectSubstrate: (id: string) => void;
  onSelectOrganelle: (id: string) => void;
}

function withAlpha(hsl: string, alpha: number): string {
  return hsl.replace("hsl", "hsla").replace(")", `, ${alpha})`);
}

function EmptyState() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center p-8 border border-dashed border-white/10 rounded-3xl">
      <div className="w-16 h-16 rounded-full border border-primary/50 flex items-center justify-center mb-6 animate-pulse">
        <div className="w-8 h-8 rounded-full bg-primary/20 blur-sm" />
      </div>
      <h3 className="text-2xl font-medium text-white mb-2">Awaiting Interaction</h3>
      <p className="text-muted-foreground">Hover or tap an organelle on the left to analyze its function within Cell OS.</p>
    </div>
  );
}

function OrganelleView({
  organelle,
  relatedSubstrate,
  relatedBiophotonLinks,
  onSelectSubstrate
}: {
  organelle: Organelle;
  relatedSubstrate: SubstrateNode[];
  relatedBiophotonLinks: BiophotonLink[];
  onSelectSubstrate: (id: string) => void;
}) {
  return (
    <div
      className="w-full glass-panel p-8 rounded-3xl space-y-6 transition-all animate-in fade-in slide-in-from-right-8"
      style={{
        boxShadow: `0 8px 32px 0 ${withAlpha(organelle.color, 0.2)}`,
        borderColor: withAlpha(organelle.color, 0.3)
      }}
    >
      <div className="space-y-2">
        <div className="text-sm font-mono tracking-widest uppercase" style={{ color: organelle.color }}>
          Biological Structure
        </div>
        <h3 className="text-4xl font-bold text-white">{organelle.name}</h3>
      </div>

      <div className="space-y-2 border-t border-white/10 pt-4">
        <div className="text-sm font-mono tracking-widest uppercase text-muted-foreground">OS Function</div>
        <div className="text-2xl font-semibold text-white">{organelle.osFeature}</div>
      </div>

      <div className="space-y-4 pt-4">
        <p className="text-lg text-foreground/90 leading-relaxed">{organelle.explanation}</p>
        <div className="p-4 bg-black/40 rounded-xl border border-white/5">
          <p className="text-sm font-medium text-muted-foreground italic">"{organelle.analogy}"</p>
        </div>
      </div>

      {relatedSubstrate.length > 0 && (
        <div className="space-y-3 border-t border-white/10 pt-4">
          <div className="text-sm font-mono tracking-widest uppercase text-muted-foreground">
            On the FairPhone 5 hardware
          </div>
          <div className="flex flex-wrap gap-2">
            {relatedSubstrate.map((node) => (
              <button
                key={node.id}
                type="button"
                onClick={() => onSelectSubstrate(node.id)}
                className="px-3 py-1.5 rounded-full text-sm font-medium border transition-colors hover:bg-white/10"
                style={{
                  color: node.color,
                  borderColor: withAlpha(node.color, 0.4),
                  backgroundColor: withAlpha(node.color, 0.08)
                }}
              >
                {node.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {relatedBiophotonLinks.length > 0 && (
        <div className="space-y-3 border-t border-white/10 pt-4">
          <div className="text-sm font-mono tracking-widest uppercase text-muted-foreground">
            Biophoton Communication
          </div>
          <div className="space-y-2">
            {relatedBiophotonLinks.map((link, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-black/20 border border-yellow-300/10 space-y-1.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-mono text-yellow-300/60">{link.rateRange}</span>
                  <ConfidenceBadge confidence={link.confidence} />
                </div>
                <p className="text-xs text-foreground/75 leading-relaxed">{link.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function SubstrateView({
  substrate,
  relatedOrganelles,
  onSelectOrganelle
}: {
  substrate: SubstrateNode;
  relatedOrganelles: Organelle[];
  onSelectOrganelle: (id: string) => void;
}) {
  const substrateEngagement = useLearningStore((s) => s.substrateEngagement);
  const totalInteractions   = useLearningStore((s) => s.totalInteractions);
  const boost = useMemo(() => {
    const boosts = getConfidenceBoosts(substrateEngagement, totalInteractions);
    return boosts[substrate.id] ?? 0;
  }, [substrateEngagement, totalInteractions, substrate.id]);

  return (
    <div
      className="w-full glass-panel p-8 rounded-3xl space-y-6 transition-all animate-in fade-in slide-in-from-right-8"
      style={{
        boxShadow: `0 8px 32px 0 ${withAlpha(substrate.color, 0.2)}`,
        borderColor: withAlpha(substrate.color, 0.3)
      }}
    >
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-3">
          <div className="text-sm font-mono tracking-widest uppercase" style={{ color: substrate.color }}>
            Hardware Substrate
          </div>
          <div className="flex items-center gap-2">
            <ConfidenceBadge confidence={substrate.confidence} />
            {boost > 0.001 && (
              <span
                style={{
                  fontSize: "0.62rem",
                  fontFamily: "monospace",
                  color: "hsl(45,90%,62%)",
                  opacity: 0.8,
                  letterSpacing: "0.04em",
                }}
              >
                +{boost.toFixed(3)}σ
              </span>
            )}
          </div>
        </div>
        <h3 className="text-4xl font-bold text-white">{substrate.name}</h3>
        <div className="text-base font-mono text-muted-foreground">{substrate.role}</div>
      </div>

      <p className="text-lg text-foreground/90 leading-relaxed border-t border-white/10 pt-4">{substrate.detail}</p>

      <dl className="space-y-1.5 border-t border-white/10 pt-4">
        {substrate.specs.map((spec) => (
          <div key={spec.label} className="flex items-baseline justify-between gap-4 text-sm">
            <dt className="text-muted-foreground shrink-0">{spec.label}</dt>
            <dd className="text-right text-foreground/90 font-medium">{spec.value}</dd>
          </div>
        ))}
      </dl>

      {relatedOrganelles.length > 0 && (
        <div className="space-y-3 border-t border-white/10 pt-4">
          <div className="text-sm font-mono tracking-widest uppercase text-muted-foreground">
            Mapped cell structures
          </div>
          <div className="flex flex-wrap gap-2">
            {relatedOrganelles.map((organelle) => (
              <button
                key={organelle.id}
                type="button"
                onClick={() => onSelectOrganelle(organelle.id)}
                className="px-3 py-1.5 rounded-full text-sm font-medium border transition-colors hover:bg-white/10"
                style={{
                  color: organelle.color,
                  borderColor: withAlpha(organelle.color, 0.4),
                  backgroundColor: withAlpha(organelle.color, 0.08)
                }}
              >
                {organelle.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function InfoPanel({
  organelle,
  substrate,
  relatedSubstrate,
  relatedOrganelles,
  relatedBiophotonLinks,
  onSelectSubstrate,
  onSelectOrganelle
}: InfoPanelProps) {
  if (organelle) {
    return (
      <OrganelleView
        organelle={organelle}
        relatedSubstrate={relatedSubstrate}
        relatedBiophotonLinks={relatedBiophotonLinks}
        onSelectSubstrate={onSelectSubstrate}
      />
    );
  }

  if (substrate) {
    return (
      <SubstrateView
        substrate={substrate}
        relatedOrganelles={relatedOrganelles}
        onSelectOrganelle={onSelectOrganelle}
      />
    );
  }

  return <EmptyState />;
}
