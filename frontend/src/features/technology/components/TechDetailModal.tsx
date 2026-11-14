import React from 'react';
import { useEureka } from '../../../contexts/EurekaContext';
import {
  X,
  ExternalLink,
  ShieldCheck,
  Zap,
  TrendingUp,
  Code,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Scale
} from 'lucide-react';

export const TechDetailModal: React.FC = () => {
  const { selectedTech, setSelectedTech, setActiveView } = useEureka();

  if (!selectedTech) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink/50 backdrop-blur-xs transition-opacity"
        onClick={() => setSelectedTech(null)}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl bg-surface border-2 border-ink rounded-3xl shadow-sketch-lg overflow-hidden z-10 my-8 animate-in zoom-in-95 duration-150 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b-2 border-ink bg-tinted flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-full bg-forest text-white border border-ink">
                {selectedTech.domain}
              </span>
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-full bg-mint text-forest border border-ink/20">
                {selectedTech.source}
              </span>
              <span className="font-mono text-xs text-ink-muted flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald" /> {selectedTech.license}
              </span>
              <span className="font-mono text-xs font-bold text-forest bg-white px-2 py-0.5 rounded-full border border-ink shadow-sketch-sm">
                Velocity: {selectedTech.velocity}
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl text-forest">{selectedTech.name}</h2>
            <p className="text-sm text-ink-secondary font-medium">{selectedTech.tagline}</p>
          </div>

          <button
            onClick={() => setSelectedTech(null)}
            className="p-1.5 rounded-xl border border-ink bg-white hover:bg-canvas text-ink transition shrink-0 ml-4"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Tangentia Enterprise Impact Callout */}
          <div className="sketch-card p-5 bg-mint/50 border-forest">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber fill-amber" />
                <h4 className="font-bold text-sm text-forest uppercase tracking-wide">
                  Tangentia Enterprise Relevance & Impact
                </h4>
              </div>
              <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-coral-soft text-coral-dark border border-coral/30 font-bold">
                {selectedTech.companyImpact.gapSeverity} Priority
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <p className="text-ink-muted font-medium mb-0.5">Affected Tangentia System</p>
                <p className="font-bold text-ink">{selectedTech.companyImpact.affectedSystem}</p>
              </div>
              <div>
                <p className="text-ink-muted font-medium mb-0.5">Projected Value & ROI</p>
                <p className="font-bold text-emerald-dark">{selectedTech.companyImpact.estimatedRoi}</p>
              </div>
              <div className="md:col-span-2 pt-2 border-t border-forest/20">
                <p className="text-ink-muted font-medium mb-0.5">Recommended Action</p>
                <p className="font-semibold text-forest">{selectedTech.companyImpact.actionRequired}</p>
              </div>
            </div>
          </div>

          {/* Previous Problem vs What Changed */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-coral-soft/50 border border-coral/30">
              <div className="flex items-center gap-2 text-coral-dark font-bold text-xs mb-2">
                <AlertTriangle className="w-4 h-4" />
                Previous Architectural Limitation
              </div>
              <p className="text-xs text-ink leading-relaxed">{selectedTech.previousProblem}</p>
            </div>

            <div className="p-4 rounded-2xl bg-mint border border-emerald/30">
              <div className="flex items-center gap-2 text-emerald-dark font-bold text-xs mb-2">
                <CheckCircle2 className="w-4 h-4" />
                What Changed in This Release
              </div>
              <p className="text-xs text-ink leading-relaxed">{selectedTech.whatChanged}</p>
            </div>
          </div>

          {/* How It Works & Capabilities */}
          <div className="space-y-4">
            <div>
              <h4 className="font-bold text-sm text-ink mb-2">Technical Mechanics</h4>
              <p className="text-xs text-ink-secondary leading-relaxed bg-tinted p-3.5 rounded-2xl border border-ink/20">
                {selectedTech.howItWorks}
              </p>
            </div>

            <div>
              <h4 className="font-bold text-sm text-ink mb-2">Verified Capabilities</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedTech.capabilities.map((cap, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-xl bg-white border border-borderLight flex items-start gap-2 text-xs"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald shrink-0 mt-0.5" />
                    <span className="text-ink">{cap}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Code Implementation Sample */}
          {selectedTech.codeSnippet && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-sm text-ink flex items-center gap-2">
                  <Code className="w-4 h-4 text-forest" /> Implementation & Configuration Blueprint
                </h4>
                <span className="font-mono text-[10px] text-ink-muted">Ready for production test</span>
              </div>
              <pre className="p-4 rounded-2xl bg-forest text-mint font-mono text-xs overflow-x-auto border-2 border-ink shadow-sketch-sm leading-relaxed">
                <code>{selectedTech.codeSnippet}</code>
              </pre>
            </div>
          )}

          {/* Links & Verification Proof */}
          <div className="p-4 rounded-2xl bg-white border border-ink flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="font-mono text-ink-secondary flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald" /> {selectedTech.verifiedVia}
            </span>
            <div className="flex items-center gap-3">
              <a
                href={selectedTech.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="font-mono font-bold text-forest hover:underline flex items-center gap-1"
              >
                Repository <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href={selectedTech.docsUrl}
                target="_blank"
                rel="noreferrer"
                className="font-mono font-bold text-forest hover:underline flex items-center gap-1"
              >
                Official Docs <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="p-4 border-t-2 border-ink bg-tinted flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => setSelectedTech(null)}
            className="btn-sketch text-xs"
          >
            Close
          </button>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                setSelectedTech(null);
                setActiveView('enterprise-rag');
              }}
              className="btn-sketch text-xs flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5" />
              Test RAG Ingestion
            </button>

            <button
              onClick={() => {
                setSelectedTech(null);
                setActiveView('adoption-advisor');
              }}
              className="btn-sketch text-xs flex items-center gap-1.5"
            >
              <Scale className="w-3.5 h-3.5" />
              Compare in Advisor
            </button>

            <button
              onClick={() => {
                setSelectedTech(null);
                setActiveView('upskilling-studio');
              }}
              className="btn-primary text-xs shadow-sketch"
            >
              Start Hands-On Challenge <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
