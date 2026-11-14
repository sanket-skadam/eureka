import React, { useState } from 'react';
import { useEureka } from '../../../contexts/EurekaContext';
import {
  Scale,
  CheckCircle2,
  XCircle,
  FileText,
  Download,
  Share2,
  DollarSign,
  Clock,
  ShieldCheck,
  Zap,
  Sparkles,
  Layers
} from 'lucide-react';

export const AdoptionAdvisorPage: React.FC = () => {
  const { state, logApiCall } = useEureka();

  const [activeCompIndex, setActiveCompIndex] = useState(0);
  const currentComp = state.adoptionComparisons[activeCompIndex] || state.adoptionComparisons[0];

  const [dossierDownloaded, setDossierDownloaded] = useState(false);

  const handleExportDossier = () => {
    logApiCall(
      'POST',
      `/api/v1/adoption/dossier/${currentComp.id}`,
      200,
      180,
      `Generated executive adoption dossier for ${currentComp.title}`
    );
    setDossierDownloaded(true);
    setTimeout(() => setDossierDownloaded(false), 3000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mint border border-ink text-xs font-semibold text-forest mb-2 shadow-sketch-sm">
            <Scale className="w-3.5 h-3.5 text-forest" />
            <span>Multi-Factor Architectural Trade-Off Analysis</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl text-forest tracking-tight">
            Technology Adoption Advisor
          </h1>
          <p className="text-sm text-ink-secondary max-w-2xl mt-1.5 font-medium leading-relaxed">
            Data-backed evaluation engine measuring TCO, latency, licensing risk, and infrastructure compatibility
            to eliminate bias in Tangentia technology selection.
          </p>
        </div>

        <button
          onClick={handleExportDossier}
          className="btn-primary shadow-sketch text-xs self-start md:self-auto"
        >
          <Download className="w-4 h-4 text-emerald" />
          {dossierDownloaded ? 'Dossier Downloaded!' : 'Export Decision Dossier (PDF)'}
        </button>
      </div>

      {/* Comparison Topic Tabs */}
      <div className="flex flex-wrap gap-2 pb-1 border-b border-borderLight">
        {state.adoptionComparisons.map((comp, idx) => (
          <button
            key={comp.id}
            onClick={() => setActiveCompIndex(idx)}
            className={`px-4 py-2 rounded-2xl border text-xs font-bold transition-all ${
              activeCompIndex === idx
                ? 'bg-forest text-white border-ink shadow-sketch-sm'
                : 'bg-white text-ink border-borderLight hover:border-ink'
            }`}
          >
            {comp.title}
          </button>
        ))}
      </div>

      {/* Executive Recommendation Verdict Banner */}
      <div className="sketch-card p-6 bg-mint/50 border-2 border-forest space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-forest font-bold text-xs uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber" />
            Eureka Recommended Architecture & Strategy
          </div>
          <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-full bg-forest text-white shadow-sm">
            {currentComp.status}
          </span>
        </div>

        <h3 className="font-display text-3xl text-forest">{currentComp.verdict}</h3>
        <p className="text-xs sm:text-sm text-ink font-medium leading-relaxed">
          {currentComp.recommendationReason}
        </p>
      </div>

      {/* Comparative Matrix: 3 Options Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {currentComp.options.map((opt, i) => {
          const isWinner = i === 0; // First option is the recommended one in our seed
          return (
            <div
              key={opt.name}
              className={`sketch-card p-5 bg-white border-2 flex flex-col justify-between ${
                isWinner ? 'border-forest ring-2 ring-forest/30 shadow-sketch-lg' : 'border-ink'
              }`}
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] text-ink-muted uppercase font-bold">
                    {opt.vendor}
                  </span>
                  {isWinner && (
                    <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-full bg-forest text-white">
                      Top Match
                    </span>
                  )}
                </div>

                <h4 className="font-display text-2xl text-forest mb-1">{opt.name}</h4>
                <p className="font-mono text-[11px] text-ink-muted mb-4">{opt.license}</p>

                {/* Score Bars */}
                <div className="space-y-3 mb-4 p-3 rounded-xl bg-tinted border border-borderLight">
                  <div>
                    <div className="flex items-center justify-between text-xs font-semibold mb-1">
                      <span>Tangentia Compatibility</span>
                      <span className="font-mono font-bold text-forest">{opt.compatibilityScore}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-white overflow-hidden">
                      <div
                        className="h-full bg-forest rounded-full"
                        style={{ width: `${opt.compatibilityScore}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs font-semibold mb-1">
                      <span>Security & Compliance</span>
                      <span className="font-mono font-bold text-emerald-dark">{opt.securityScore}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-white overflow-hidden">
                      <div
                        className="h-full bg-emerald-dark rounded-full"
                        style={{ width: `${opt.securityScore}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Quantitative Metrics */}
                <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
                  <div className="p-2.5 rounded-xl bg-white border border-borderLight">
                    <span className="text-[10px] font-mono text-ink-muted block">Est. Cost</span>
                    <span className="font-bold text-ink">{opt.tcoMonthly}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white border border-borderLight">
                    <span className="text-[10px] font-mono text-ink-muted block">Latency</span>
                    <span className="font-bold text-forest">{opt.latencyMs}</span>
                  </div>
                </div>

                {/* Tangentia Enterprise Fit */}
                <div className="p-3 rounded-xl bg-mint/40 border border-forest/20 text-xs mb-4">
                  <span className="text-[10px] font-mono uppercase text-forest font-bold block mb-1">
                    Tangentia Fit Analysis
                  </span>
                  <p className="text-ink text-[11px] leading-relaxed">{opt.tangentiaFit}</p>
                </div>

                {/* Pros & Cons */}
                <div className="space-y-2 text-xs mb-4">
                  <div>
                    <span className="font-bold text-emerald-dark text-[11px] block mb-1">Advantages</span>
                    {opt.pros.map((p, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-[11px] text-ink mb-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald shrink-0 mt-0.5" />
                        <span>{p}</span>
                      </div>
                    ))}
                  </div>

                  <div>
                    <span className="font-bold text-coral-dark text-[11px] block mb-1">Trade-offs</span>
                    {opt.cons.map((c, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-[11px] text-ink-secondary mb-1">
                        <XCircle className="w-3.5 h-3.5 text-coral shrink-0 mt-0.5" />
                        <span>{c}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-3 border-t border-borderLight">
                <button
                  onClick={handleExportDossier}
                  className={`w-full text-xs py-2 rounded-xl border font-bold transition ${
                    isWinner
                      ? 'bg-forest text-white border-ink shadow-sketch-sm hover:bg-forest-card'
                      : 'bg-tinted text-ink border-ink/20 hover:border-ink'
                  }`}
                >
                  {isWinner ? 'Select as Production Target' : 'Review Metrics'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
