import React, { useState } from 'react';
import { useEureka } from '../../../contexts/EurekaContext';
import {
  Users,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Award,
  ChevronRight,
  Filter,
  ArrowRight,
  BrainCircuit,
  GraduationCap
} from 'lucide-react';

export const SkillIntelligencePage: React.FC = () => {
  const { state, setActiveView } = useEureka();

  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedSeverity, setSelectedSeverity] = useState('All');

  const departments = [
    'All',
    'Intelligent Automation (TiA)',
    'Tangentia Gateway & Integration',
    'Platform Engineering',
    'Client Solutions & Logistics',
    'Workforce Enablement'
  ];

  const filteredEmployees = state.employees.filter((emp) => {
    return selectedDept === 'All' || emp.department === selectedDept;
  });

  const filteredGaps = state.skillGaps.filter((gap) => {
    return selectedSeverity === 'All' || gap.severity === selectedSeverity;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mint border border-ink text-xs font-semibold text-forest mb-2 shadow-sketch-sm">
            <Users className="w-3.5 h-3.5 text-forest" />
            <span>Capability Gap Matrix & Talent Enablement</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl text-forest tracking-tight">
            Workforce Skill Intelligence
          </h1>
          <p className="text-sm text-ink-secondary max-w-2xl mt-1.5 font-medium leading-relaxed">
            Continuously compares Tangentia engineers' validated competencies against upcoming client project demands
            and emerging open-source technologies to trigger proactive upskilling.
          </p>
        </div>

        <button
          onClick={() => setActiveView('upskilling-studio')}
          className="btn-primary shadow-sketch text-xs self-start md:self-auto"
        >
          <GraduationCap className="w-4 h-4 text-emerald" />
          Launch Upskilling Studio
        </button>
      </div>

      {/* Identified Critical Skill Gaps */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-coral" />
            <h3 className="font-display text-2xl sm:text-3xl text-forest">
              Identified Technology Skill Gaps ({filteredGaps.length})
            </h3>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-ink-muted font-mono">Severity:</span>
            {['All', 'Critical', 'High', 'Moderate'].map((sev) => (
              <button
                key={sev}
                onClick={() => setSelectedSeverity(sev)}
                className={`px-2.5 py-1 rounded-lg border text-xs font-bold transition ${
                  selectedSeverity === sev
                    ? 'bg-forest text-white border-ink shadow-sm'
                    : 'bg-white text-ink border-borderLight hover:border-ink'
                }`}
              >
                {sev}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredGaps.map((gap) => (
            <div
              key={gap.id}
              className="sketch-card p-5 bg-white border-2 border-ink flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded-full bg-forest text-white">
                    {gap.category}
                  </span>
                  <span
                    className={`font-mono text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                      gap.severity === 'Critical'
                        ? 'bg-coral-soft text-coral-dark border-coral/40'
                        : gap.severity === 'High'
                        ? 'bg-amber-soft text-amber-900 border-amber/40'
                        : 'bg-tinted text-forest border-ink/20'
                    }`}
                  >
                    {gap.severity} Deficit ({gap.headcountDeficit} engineers)
                  </span>
                </div>

                <h4 className="font-display text-2xl text-forest mb-1.5">{gap.skillName}</h4>

                {/* Level Comparison */}
                <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-tinted border border-borderLight mb-3 text-xs">
                  <div>
                    <span className="text-ink-muted text-[11px] block">Current Benchmark</span>
                    <span className="font-mono font-bold text-ink">{gap.currentLevel}</span>
                  </div>
                  <div>
                    <span className="text-ink-muted text-[11px] block">Required for 2026</span>
                    <span className="font-mono font-bold text-forest">{gap.requiredLevel}</span>
                  </div>
                </div>

                <p className="text-xs text-ink-secondary mb-3">
                  <strong className="text-ink">Affected Tangentia Projects:</strong>{' '}
                  {gap.affectedProjects.join(', ')}
                </p>

                <p className="text-xs text-forest font-semibold mb-3">
                  💡 {gap.suggestedAction}
                </p>
              </div>

              <div className="pt-3 border-t border-borderLight flex items-center justify-between">
                <span className="font-mono text-[11px] text-ink-muted font-bold">
                  Relevance: {gap.relevanceScore}%
                </span>
                <button
                  onClick={() => setActiveView('upskilling-studio')}
                  className="btn-sketch text-xs py-1 px-3"
                >
                  Assign Learning Path <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tangentia Employee Competency & Match Matrix */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <BrainCircuit className="w-5 h-5 text-forest" />
            <h3 className="font-display text-2xl sm:text-3xl text-forest">
              Tangentia Workforce Competency Matrix
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-ink-muted" />
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="bg-white border border-ink rounded-xl px-3 py-1.5 text-xs font-bold text-ink cursor-pointer focus:outline-none shadow-sketch-sm"
            >
              {departments.map((d) => (
                <option key={d} value={d}>
                  Dept: {d}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredEmployees.map((emp) => (
            <div
              key={emp.id}
              className="sketch-card p-5 bg-white flex flex-col justify-between sketch-card-hover"
            >
              <div>
                {/* Employee Header */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 rounded-2xl bg-forest text-white font-display text-xl flex items-center justify-center border-2 border-ink shadow-sketch-sm shrink-0">
                    {emp.avatarText}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-sm text-ink truncate">{emp.name}</h4>
                    <p className="text-xs text-ink-muted truncate font-medium">{emp.role}</p>
                    <span className="font-mono text-[10px] text-forest font-bold">{emp.department}</span>
                  </div>
                </div>

                {/* Readiness Score Progress Bar */}
                <div className="mb-4 p-3 rounded-xl bg-tinted border border-borderLight">
                  <div className="flex items-center justify-between text-xs font-bold mb-1">
                    <span className="text-ink-secondary">Production Readiness</span>
                    <span className="font-mono text-emerald-dark">{emp.readinessScore}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white border border-ink/20 overflow-hidden">
                    <div
                      className="h-full bg-forest rounded-full"
                      style={{ width: `${emp.readinessScore}%` }}
                    />
                  </div>
                </div>

                {/* Competencies Progress Bars */}
                <div className="space-y-2 mb-4">
                  <p className="text-[11px] font-mono uppercase font-bold text-ink-muted">
                    Key Technical Competencies
                  </p>
                  {emp.competencies.map((c, i) => (
                    <div key={i} className="text-xs">
                      <div className="flex items-center justify-between text-[11px] font-semibold text-ink mb-0.5">
                        <span className="truncate max-w-[170px]">{c.name}</span>
                        <span className="font-mono text-ink-muted">{c.level}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-tinted overflow-hidden">
                        <div
                          className="h-full bg-emerald-dark rounded-full"
                          style={{ width: `${c.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Active Learning Pathway */}
                <div className="p-2.5 rounded-xl bg-mint/60 border border-forest/20 text-xs mb-3">
                  <span className="text-[10px] font-mono uppercase text-forest font-bold block mb-0.5">
                    Active Upskilling Track
                  </span>
                  <p className="font-semibold text-ink text-[11px]">{emp.activePath}</p>
                </div>
              </div>

              {/* Status and Action */}
              <div className="pt-3 border-t border-borderLight flex items-center justify-between">
                <span
                  className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    emp.status === 'Certified'
                      ? 'bg-mint text-forest border-forest/30'
                      : emp.status === 'In Training'
                      ? 'bg-amber-soft text-amber-900 border-amber/30'
                      : 'bg-tinted text-ink border-ink/20'
                  }`}
                >
                  {emp.status}
                </span>

                <button
                  onClick={() => setActiveView('upskilling-studio')}
                  className="btn-sketch text-xs py-1 px-3 shadow-sketch-sm"
                >
                  View Studio <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

