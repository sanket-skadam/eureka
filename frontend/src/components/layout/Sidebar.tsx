import React from 'react';
import { useEureka } from '../../contexts/EurekaContext';
import { ActiveView } from '../../types';
import {
  LayoutDashboard,
  Compass,
  FileSearch,
  Users,
  Code2,
  Scale,
  Mail,
  RotateCcw,
  Activity,
  X,
  Sparkles
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const {
    state,
    activeView,
    setActiveView,
    mobileNavOpen,
    setMobileNavOpen,
    setTelemetryDrawerOpen,
    changeOrganization,
    resetDb
  } = useEureka();

  const navItems: { id: ActiveView; label: string; icon: React.ReactNode; step: string; badge?: string; badgeColor?: string }[] = [
    {
      id: 'dashboard',
      label: 'Executive Dashboard',
      icon: <LayoutDashboard className="w-4 h-4" />,
      step: '01'
    },
    {
      id: 'tech-hub',
      label: 'Technology Hub',
      icon: <Compass className="w-4 h-4" />,
      step: '02',
      badge: String(state.technologies.length),
      badgeColor: 'bg-mint text-forest border-ink/20'
    },
    {
      id: 'enterprise-rag',
      label: 'Enterprise RAG',
      icon: <FileSearch className="w-4 h-4" />,
      step: '03'
    },
    {
      id: 'skill-intelligence',
      label: 'Skill Intelligence',
      icon: <Users className="w-4 h-4" />,
      step: '04',
      badge: `${state.skillGaps.length} Gaps`,
      badgeColor: 'bg-coral-soft text-coral-dark border-coral/30'
    },
    {
      id: 'upskilling-studio',
      label: 'Upskilling Studio',
      icon: <Code2 className="w-4 h-4" />,
      step: '05'
    },
    {
      id: 'adoption-advisor',
      label: 'Adoption Advisor',
      icon: <Scale className="w-4 h-4" />,
      step: '06'
    },
    {
      id: 'weekly-digest',
      label: 'Weekly Digest',
      icon: <Mail className="w-4 h-4" />,
      step: '07',
      badge: '#48',
      badgeColor: 'bg-amber-soft text-amber-900 border-amber/40'
    }
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {mobileNavOpen && (
        <div
          className="fixed inset-0 bg-ink/40 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setMobileNavOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-canvas border-r-2 border-ink transform transition-transform duration-200 ease-out lg:translate-x-0 lg:static lg:flex-shrink-0 flex flex-col justify-between ${
          mobileNavOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-5 overflow-y-auto">
          {/* Brand Header */}
          <div className="flex items-center justify-between mb-6">
            <div
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => {
                setActiveView('dashboard');
                setMobileNavOpen(false);
              }}
            >
              <div className="w-11 h-11 rounded-2xl bg-forest border-2 border-ink shadow-sketch flex items-center justify-center text-white relative group-hover:scale-105 transition-transform">
                <Sparkles className="w-6 h-6 text-emerald" />
                <span className="w-2.5 h-2.5 bg-amber rounded-full absolute -top-1 -right-1 border border-ink animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-display text-3xl text-forest leading-none">Eureka</span>
                  <span className="font-mono text-[10px] font-bold uppercase px-1.5 py-0.5 rounded-md bg-mint text-forest border border-ink">
                    v1.4
                  </span>
                </div>
                <p className="text-xs text-ink-muted font-medium mt-0.5">Workforce & Tech Intelligence</p>
              </div>
            </div>

            <button
              onClick={() => setMobileNavOpen(false)}
              className="lg:hidden p-1.5 rounded-lg border border-ink bg-white text-ink hover:bg-tinted"
              aria-label="Close navigation"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Active Workspace Selector */}
          <div className="mb-6 p-3 rounded-2xl bg-tinted border border-ink shadow-sketch-sm">
            <div className="flex items-center justify-between text-[11px] font-mono uppercase text-ink-muted mb-1.5">
              <span>Active Workspace</span>
              <span className="flex items-center gap-1 text-emerald-dark font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald animate-pulse"></span> RLS Active
              </span>
            </div>
            <select
              value={state.activeOrg.id}
              onChange={(e) => changeOrganization(e.target.value)}
              className="w-full bg-white border border-ink rounded-xl px-2.5 py-1.5 text-xs font-bold text-ink focus:outline-none cursor-pointer shadow-sm"
            >
              {state.organizations.map((org) => (
                <option key={org.id} value={org.id}>
                  {org.name}
                </option>
              ))}
            </select>
            <div className="mt-2 flex items-center justify-between text-[11px] text-ink-secondary">
              <span className="truncate mr-2">
                ID: <strong className="font-mono text-forest">{state.activeOrg.id}</strong>
              </span>
              <span className="font-mono font-semibold text-forest bg-mint px-1.5 py-0.2 rounded border border-ink/20 shrink-0">
                pgvector: ON
              </span>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="space-y-1.5">
            <p className="px-2.5 text-[11px] font-mono uppercase tracking-wider text-ink-muted mb-2 font-semibold">
              Intelligence Workflow
            </p>

            {navItems.map((item) => {
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveView(item.id);
                    setMobileNavOpen(false);
                  }}
                  className={`nav-item w-full flex items-center justify-between px-3.5 py-2.5 text-sm font-semibold text-left transition-all ${
                    isActive ? 'active' : 'text-ink hover:text-forest'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    {item.icon}
                    <span>{item.label}</span>
                  </span>
                  <div className="flex items-center gap-1.5">
                    {item.badge && (
                      <span className={`font-mono text-[10px] px-1.5 py-0.5 rounded-full border ${item.badgeColor || ''}`}>
                        {item.badge}
                      </span>
                    )}
                    <span className="font-mono text-[10px] opacity-75">{item.step}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* User Profile & Actions */}
        <div className="p-4 border-t border-borderLight bg-tinted/70 space-y-2.5">
          <button
            onClick={() => setTelemetryDrawerOpen(true)}
            className="w-full py-2 px-3 rounded-xl bg-white border border-ink shadow-sketch-sm hover:bg-mint transition flex items-center justify-between text-xs font-mono font-bold text-forest"
          >
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
              API & Telemetry
            </span>
            <span className="px-1.5 py-0.5 rounded bg-mint border border-ink/20 text-[10px]">
              {state.telemetryLogs.length} calls
            </span>
          </button>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-forest text-white font-display text-lg flex items-center justify-center border border-ink shadow-sketch-sm">
              AD
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-ink truncate">Ananya Deshmukh</p>
              <p className="text-[11px] text-ink-muted truncate">Staff Platform Architect</p>
            </div>
            <button
              onClick={() => {
                if (window.confirm('Reset local mock database to default Tangentia state?')) {
                  resetDb();
                }
              }}
              title="Reset Mock DB"
              className="p-1.5 rounded-xl bg-white border border-ink hover:bg-coral-soft hover:text-coral-dark transition text-ink shadow-sketch-sm"
              aria-label="Reset Mock Database"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
