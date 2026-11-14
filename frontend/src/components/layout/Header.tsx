import React from 'react';
import { useEureka } from '../../contexts/EurekaContext';
import { Menu, Activity, RotateCcw, Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  const {
    state,
    setMobileNavOpen,
    setTelemetryDrawerOpen,
    resetDb
  } = useEureka();

  const lastLog = state.telemetryLogs[0];

  return (
    <>
      {/* Mobile Top Header */}
      <header className="lg:hidden sticky top-0 z-40 bg-canvas/95 backdrop-blur border-b-2 border-ink px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-forest border-2 border-ink shadow-sketch-sm flex items-center justify-center text-white">
            <Sparkles className="w-4 h-4 text-emerald" />
          </div>
          <div>
            <span className="font-display text-2xl font-normal tracking-tight text-forest">Eureka</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setTelemetryDrawerOpen(true)}
            className="px-2.5 py-1.5 rounded-xl bg-mint border border-ink text-xs font-mono font-bold text-forest shadow-sketch-sm flex items-center gap-1.5"
          >
            <Activity className="w-3.5 h-3.5 text-emerald" />
            <span>API ({state.telemetryLogs.length})</span>
          </button>
          <button
            onClick={() => setMobileNavOpen(true)}
            className="btn-sketch py-1.5 px-2.5 text-xs font-bold"
          >
            <Menu className="w-4 h-4" />
            Menu
          </button>
        </div>
      </header>

      {/* Desktop Top Telemetry Status Bar */}
      <div className="sticky top-0 z-30 hidden lg:flex items-center justify-between px-8 py-2 bg-canvas/90 backdrop-blur border-b border-borderLight text-xs">
        <div className="flex items-center gap-3 font-mono text-[11px] text-ink-secondary">
          <span className="px-2 py-0.5 rounded bg-tinted border border-ink/30 text-forest font-bold">
            REST /api/v1
          </span>
          <span className="truncate max-w-xl text-ink-muted">
            {lastLog ? (
              <>
                <strong className="text-forest">{lastLog.method}</strong> {lastLog.endpoint} •{' '}
                <span className="text-emerald-dark font-semibold">{lastLog.status} OK</span> ({lastLog.durationMs}ms)
              </>
            ) : (
              'Ready for requests'
            )}
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setTelemetryDrawerOpen(true)}
            className="px-3 py-1 rounded-full bg-mint border border-ink shadow-sketch-sm hover:bg-mint-dark transition font-mono text-[11px] font-bold text-forest flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
            <span>API & Telemetry</span>
            <span className="px-1.5 py-0.2 rounded-full bg-forest text-white text-[10px]">
              {state.telemetryLogs.length}
            </span>
          </button>

          <button
            onClick={() => {
              if (window.confirm('Reset local mock database to default Tangentia state?')) {
                resetDb();
              }
            }}
            className="px-2.5 py-1 rounded-full bg-white border border-ink hover:bg-coral-soft hover:text-coral-dark transition font-mono text-[11px] font-semibold text-ink flex items-center gap-1.5 shadow-sketch-sm"
          >
            <RotateCcw className="w-3 h-3" />
            Reset DB
          </button>
        </div>
      </div>
    </>
  );
};
