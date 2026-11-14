import React, { useState } from 'react';
import { useEureka } from '../../../contexts/EurekaContext';
import {
  Compass,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Users,
  CheckCircle2,
  FileSearch,
  Sparkles,
  Zap,
  Play,
  RotateCcw,
  ExternalLink,
  ShieldAlert,
  Layers,
  ChevronRight
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const {
    state,
    setActiveView,
    setSelectedTech,
    setPipelineModalOpen
  } = useEureka();

  const [activeSimStep, setActiveSimStep] = useState(2);

  const workflowSteps = [
    {
      num: '01',
      title: 'Scout External Signal',
      desc: 'pgvector 0.8.0 released on GitHub with hnsw.iterative_scan for filtered recall.',
      badge: 'Scouted',
      status: 'complete'
    },
    {
      num: '02',
      title: 'RAG Contextualize',
      desc: 'Correlated with Tangentia TiA Blueprint: Resolves multi-tenant customer recall loss.',
      badge: 'Matched 98%',
      status: 'complete'
    },
    {
      num: '03',
      title: 'Detect Skill Gap',
      desc: '8 Tangentia engineers identified lacking HNSW iterative index tuning competency.',
      badge: 'Critical Gap',
      status: 'active'
    },
    {
      num: '04',
      title: 'Assign Upskilling',
      desc: 'Auto-enrolled engineers in hands-on challenge with AI Coding Mentor simulator.',
      badge: '4 Modules',
      status: 'pending'
    },
    {
      num: '05',
      title: 'Adopt with Confidence',
      desc: 'Comparative dossier proves $42K/yr ROI over SaaS vector DBs. Ready for commit.',
      badge: 'Approved',
      status: 'pending'
    }
  ];

  const totalGaps = state.skillGaps.length;
  const criticalGaps = state.skillGaps.filter(g => g.severity === 'Critical').length;
  const avgReadiness = Math.round(
    state.employees.reduce((acc, curr) => acc + curr.readinessScore, 0) / state.employees.length
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Banner & Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mint border border-ink text-xs font-semibold text-forest mb-2 shadow-sketch-sm">
            <span className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
            <span>Enterprise Intelligence Pulse • {state.activeOrg.name}</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl text-forest tracking-tight">
            Workforce & Technology Intelligence
          </h1>
          <p className="text-sm text-ink-secondary max-w-2xl mt-1.5 font-medium leading-relaxed">
            Continuous discovery pipeline connecting open-source releases, research models, and enterprise RAG specs
            directly to Tangentia workforce capabilities and adoption decisions.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setPipelineModalOpen(true)}
            className="btn-primary shadow-sketch text-xs"
          >
            <Play className="w-4 h-4 fill-current text-emerald" />
            Trigger Discovery Pipeline
          </button>
          <button
            onClick={() => setActiveView('weekly-digest')}
            className="btn-sketch text-xs shadow-sketch-sm"
          >
            Weekly Digest #48 <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 4 Executive Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="sketch-card p-5 bg-white sketch-card-hover cursor-pointer" onClick={() => setActiveView('tech-hub')}>
          <div className="flex items-center justify-between text-ink-muted text-xs font-mono uppercase mb-2">
            <span>Discovered Tech</span>
            <Compass className="w-4 h-4 text-forest" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-4xl text-forest">{state.technologies.length}</span>
            <span className="text-xs font-bold text-emerald-dark bg-mint px-2 py-0.5 rounded-full border border-forest/20">
              +3 this week
            </span>
          </div>
          <p className="text-xs text-ink-muted mt-2">Active across GitHub, HuggingFace, RSS</p>
        </div>

        <div className="sketch-card p-5 bg-white sketch-card-hover cursor-pointer" onClick={() => setActiveView('enterprise-rag')}>
          <div className="flex items-center justify-between text-ink-muted text-xs font-mono uppercase mb-2">
            <span>RAG Ingested Docs</span>
            <FileSearch className="w-4 h-4 text-forest" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-4xl text-forest">{state.documents.length}</span>
            <span className="text-xs font-bold text-forest bg-mint px-2 py-0.5 rounded-full border border-forest/20">
              {state.documents.reduce((a, b) => a + b.chunksCount, 0)} chunks
            </span>
          </div>
          <p className="text-xs text-ink-muted mt-2">Tangentia TiA, Gateway & RFP Specs</p>
        </div>

        <div className="sketch-card p-5 bg-white sketch-card-hover cursor-pointer" onClick={() => setActiveView('skill-intelligence')}>
          <div className="flex items-center justify-between text-ink-muted text-xs font-mono uppercase mb-2">
            <span>Skill Gaps Tracked</span>
            <AlertTriangle className="w-4 h-4 text-coral" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-4xl text-coral-dark">{totalGaps}</span>
            <span className="text-xs font-bold text-coral-dark bg-coral-soft px-2 py-0.5 rounded-full border border-coral/30">
              {criticalGaps} Critical
            </span>
          </div>
          <p className="text-xs text-ink-muted mt-2">Impacting 31 engineering roles</p>
        </div>

        <div className="sketch-card p-5 bg-white sketch-card-hover cursor-pointer" onClick={() => setActiveView('upskilling-studio')}>
          <div className="flex items-center justify-between text-ink-muted text-xs font-mono uppercase mb-2">
            <span>Workforce Readiness</span>
            <Users className="w-4 h-4 text-emerald-dark" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-4xl text-emerald-dark">{avgReadiness}%</span>
            <span className="text-xs font-bold text-emerald-dark bg-mint px-2 py-0.5 rounded-full border border-forest/20">
              +8.5% QoQ
            </span>
          </div>
          <p className="text-xs text-ink-muted mt-2">Tangentia 2026 Tech Capability Score</p>
        </div>
      </div>

      {/* Interactive Workflow Simulator: External Signal to Production Readiness */}
      <div className="sketch-card p-6 bg-surface border-2 border-ink">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-borderLight">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-forest text-white flex items-center justify-center border border-ink shadow-sketch-sm">
              <Sparkles className="w-4 h-4 text-amber" />
            </div>
            <div>
              <h3 className="font-bold text-base text-forest">The Eureka Intelligence Loop</h3>
              <p className="text-xs text-ink-muted">From External Signal to Verified Workforce Production Readiness</p>
            </div>
          </div>
          <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-full bg-mint text-forest border border-ink/20 self-start sm:self-auto">
            Interactive Lifecycle Flow
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {workflowSteps.map((step, idx) => {
            const isSelected = activeSimStep === idx;
            return (
              <div
                key={step.num}
                onClick={() => setActiveSimStep(idx)}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-mint-dark border-forest shadow-sketch-sm scale-[1.02]'
                    : 'bg-tinted/60 border-borderLight hover:border-ink hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold text-forest bg-white px-2 py-0.5 rounded-lg border border-ink shadow-sm">
                    {step.num}
                  </span>
                  <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-surface border border-ink/20 text-ink">
                    {step.badge}
                  </span>
                </div>
                <h4 className="font-bold text-xs text-ink mb-1">{step.title}</h4>
                <p className="text-[11px] text-ink-secondary leading-snug">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Top Contextualized Technology Alerts for Tangentia */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-forest" />
            <h3 className="font-display text-2xl sm:text-3xl text-forest">Top Contextualized Technology Alerts</h3>
          </div>
          <button
            onClick={() => setActiveView('tech-hub')}
            className="text-xs font-bold text-forest hover:underline flex items-center gap-1"
          >
            View All ({state.technologies.length}) <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {state.technologies.slice(0, 3).map((tech) => (
            <div
              key={tech.id}
              className="sketch-card p-5 bg-white flex flex-col justify-between sketch-card-hover"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="font-mono font-bold px-2 py-0.5 rounded-full bg-forest text-white">
                    {tech.domain}
                  </span>
                  <span className="font-mono text-[11px] font-bold text-emerald-dark bg-mint px-2 py-0.5 rounded-full border border-forest/20">
                    {tech.relevanceScore}% Relevance
                  </span>
                </div>

                <h4 className="font-display text-2xl text-forest mb-1 leading-snug">{tech.name}</h4>
                <p className="text-xs text-ink-secondary font-medium mb-3 line-clamp-2">{tech.tagline}</p>

                {/* Tangentia System Impact */}
                <div className="p-3 rounded-xl bg-tinted border border-borderLight mb-4 text-xs space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-ink-muted font-medium">Affected:</span>
                    <span className="font-bold text-ink truncate max-w-[160px]">{tech.companyImpact.affectedSystem}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-ink-muted font-medium">Severity:</span>
                    <span className="font-bold text-coral-dark">{tech.companyImpact.gapSeverity}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-borderLight flex items-center justify-between">
                <span className="font-mono text-[11px] text-ink-muted">{tech.source}</span>
                <button
                  onClick={() => setSelectedTech(tech)}
                  className="btn-sketch text-xs py-1.5 px-3"
                >
                  Deep Dive <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two Column Section: Department Readiness & Ingestion Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Readiness Heatmap */}
        <div className="sketch-card p-6 bg-white">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-borderLight">
            <h3 className="font-bold text-base text-forest flex items-center gap-2">
              <Users className="w-4 h-4 text-forest" />
              Department Workforce Readiness
            </h3>
            <button
              onClick={() => setActiveView('skill-intelligence')}
              className="text-xs font-bold text-forest hover:underline"
            >
              Skill Matrix
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs font-semibold mb-1">
                <span>Tangentia TiA (Intelligent Automation & RPA)</span>
                <span className="font-mono font-bold text-emerald-dark">88% Ready</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-tinted border border-ink/20 overflow-hidden">
                <div className="h-full bg-forest rounded-full" style={{ width: '88%' }} />
              </div>
              <p className="text-[11px] text-ink-muted mt-1">12 engineers upskilling in LangGraph + UiPath</p>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-semibold mb-1">
                <span>Tangentia Gateway (B2B EDI & Event Streaming)</span>
                <span className="font-mono font-bold text-forest">84% Ready</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-tinted border border-ink/20 overflow-hidden">
                <div className="h-full bg-emerald-dark rounded-full" style={{ width: '84%' }} />
              </div>
              <p className="text-[11px] text-ink-muted mt-1">Kafka 3.9 Tiered Storage migration scheduled</p>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-semibold mb-1">
                <span>Platform AI Engineering & Vector Architecture</span>
                <span className="font-mono font-bold text-emerald-dark">91% Ready</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-tinted border border-ink/20 overflow-hidden">
                <div className="h-full bg-forest rounded-full" style={{ width: '91%' }} />
              </div>
              <p className="text-[11px] text-ink-muted mt-1">pgvector 0.8 laboratory completed by 6 architects</p>
            </div>
          </div>
        </div>

        {/* Knowledge Base Ingestion Status */}
        <div className="sketch-card p-6 bg-white">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-borderLight">
            <h3 className="font-bold text-base text-forest flex items-center gap-2">
              <FileSearch className="w-4 h-4 text-forest" />
              Tangentia Knowledge Base Ingestion
            </h3>
            <button
              onClick={() => setActiveView('enterprise-rag')}
              className="text-xs font-bold text-forest hover:underline"
            >
              Open RAG Studio
            </button>
          </div>

          <div className="space-y-3">
            {state.documents.slice(0, 3).map((doc) => (
              <div
                key={doc.id}
                className="p-3 rounded-xl bg-tinted border border-borderLight flex items-center justify-between gap-3 text-xs"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-ink truncate">{doc.title}</span>
                    <span className="font-mono text-[10px] px-1.5 py-0.2 rounded bg-mint text-forest border border-forest/20 shrink-0">
                      {doc.chunksCount} chunks
                    </span>
                  </div>
                  <p className="text-[11px] text-ink-muted truncate mt-0.5">Matched: {doc.matchedTech}</p>
                </div>
                <span className="font-mono text-[11px] font-bold text-emerald-dark shrink-0">
                  {doc.relevancePct}% fit
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
