import React, { useState } from 'react';
import { useEureka } from '../../../contexts/EurekaContext';
import {
  Compass,
  Search,
  Filter,
  Play,
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  Zap,
  CheckCircle2,
  ChevronRight,
  Sparkles
} from 'lucide-react';

export const TechHubPage: React.FC = () => {
  const {
    state,
    setSelectedTech,
    setPipelineModalOpen
  } = useEureka();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<string>('All');
  const [selectedSource, setSelectedSource] = useState<string>('All');

  const domains = [
    'All',
    'Vector & RAG',
    'LLM Reasoning',
    'Intelligent Automation & RPA',
    'Agentic Infrastructure',
    'Security & Governance',
    'Cloud & B2B Integration'
  ];

  const sources = ['All', 'GitHub', 'Hugging Face', 'Reddit', 'RSS', 'Manual'];

  const filteredTechs = state.technologies.filter((tech) => {
    const matchesDomain = selectedDomain === 'All' || tech.domain === selectedDomain;
    const matchesSource = selectedSource === 'All' || tech.source === selectedSource;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      searchQuery === '' ||
      tech.name.toLowerCase().includes(q) ||
      tech.tagline.toLowerCase().includes(q) ||
      tech.domain.toLowerCase().includes(q) ||
      tech.companyImpact.affectedSystem.toLowerCase().includes(q);

    return matchesDomain && matchesSource && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mint border border-ink text-xs font-semibold text-forest mb-2 shadow-sketch-sm">
            <Compass className="w-3.5 h-3.5 text-forest" />
            <span>Curated Intelligence Radar</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl text-forest tracking-tight">
            Technology Intelligence Hub
          </h1>
          <p className="text-sm text-ink-secondary max-w-2xl mt-1.5 font-medium leading-relaxed">
            Multi-source scouting engine that filters noise, evaluates engineering novelty, and analyzes
            architectural relevance for Tangentia TiA and B2B EDI operations.
          </p>
        </div>

        <button
          onClick={() => setPipelineModalOpen(true)}
          className="btn-primary shadow-sketch text-xs self-start md:self-auto"
        >
          <Play className="w-4 h-4 fill-current text-emerald" />
          Trigger 7-Stage Pipeline
        </button>
      </div>

      {/* Search and Domain Filters */}
      <div className="sketch-card p-5 bg-white space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-ink-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by technology name, domain, affected Tangentia system, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-canvas border border-ink rounded-xl pl-9 pr-4 py-2 text-xs font-medium text-ink focus:outline-none focus:ring-1 focus:ring-forest"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-ink-muted" />
            <select
              value={selectedSource}
              onChange={(e) => setSelectedSource(e.target.value)}
              className="bg-canvas border border-ink rounded-xl px-3 py-2 text-xs font-bold text-ink cursor-pointer focus:outline-none"
            >
              {sources.map((src) => (
                <option key={src} value={src}>
                  Source: {src}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Domain Pills */}
        <div className="flex flex-wrap gap-1.5 pt-1 border-t border-borderLight">
          {domains.map((dom) => (
            <button
              key={dom}
              onClick={() => setSelectedDomain(dom)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedDomain === dom
                  ? 'bg-forest text-white border-1.5 border-ink shadow-sketch-sm'
                  : 'bg-tinted text-ink border border-ink/20 hover:border-ink'
              }`}
            >
              {dom}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Technology Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTechs.length === 0 ? (
          <div className="col-span-full p-12 text-center sketch-card bg-white">
            <p className="text-sm font-semibold text-ink-secondary">
              No technologies match your search query or active filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedDomain('All');
                setSelectedSource('All');
              }}
              className="btn-sketch text-xs mt-3"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredTechs.map((tech) => (
            <div
              key={tech.id}
              className="sketch-card p-5 bg-white flex flex-col justify-between sketch-card-hover group"
            >
              <div>
                {/* Meta Header */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded-full bg-forest text-white">
                    {tech.domain}
                  </span>
                  <div className="flex items-center gap-1.5 font-mono text-[11px]">
                    <span className="text-emerald-dark font-bold bg-mint px-2 py-0.5 rounded-full border border-forest/20">
                      {tech.relevanceScore}% Fit
                    </span>
                    <span className="text-forest font-bold bg-tinted px-2 py-0.5 rounded-full border border-ink/20">
                      ★ {tech.noveltyScore}
                    </span>
                  </div>
                </div>

                {/* Title & Tagline */}
                <h3 className="font-display text-2xl text-forest group-hover:text-emerald-dark transition-colors mb-1">
                  {tech.name}
                </h3>
                <p className="text-xs text-ink-secondary font-medium leading-relaxed mb-4">
                  {tech.tagline}
                </p>

                {/* Tangentia Enterprise Impact Pill */}
                <div className="p-3 rounded-xl bg-tinted border border-borderLight mb-4 text-xs space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-ink-muted font-medium">Tangentia Impact:</span>
                    <span className="font-bold text-coral-dark bg-coral-soft px-1.5 py-0.2 rounded">
                      {tech.companyImpact.gapSeverity}
                    </span>
                  </div>
                  <p className="font-semibold text-ink text-[11px] leading-tight">
                    {tech.companyImpact.affectedSystem}
                  </p>
                  <p className="text-[11px] text-emerald-dark font-mono font-bold">
                    {tech.companyImpact.estimatedRoi}
                  </p>
                </div>

                {/* Source Verification */}
                <div className="text-[11px] font-mono text-ink-muted flex items-center gap-1.5 mb-3">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald shrink-0" />
                  <span className="truncate">{tech.verifiedVia}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-borderLight flex items-center justify-between">
                <span className="font-mono text-[11px] font-bold text-ink-secondary bg-canvas px-2 py-0.5 rounded border border-ink/20">
                  {tech.velocity}
                </span>

                <button
                  onClick={() => setSelectedTech(tech)}
                  className="btn-primary text-xs py-1.5 px-3.5 shadow-sketch-sm"
                >
                  Deep Dive <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

