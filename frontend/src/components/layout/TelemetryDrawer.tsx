import React, { useState } from 'react';
import { useEureka } from '../../contexts/EurekaContext';
import { X, Activity, RefreshCw, Trash2, CheckCircle2, Clock } from 'lucide-react';

export const TelemetryDrawer: React.FC = () => {
  const { state, telemetryDrawerOpen, setTelemetryDrawerOpen } = useEureka();
  const [filterMethod, setFilterMethod] = useState<'ALL' | 'GET' | 'POST' | 'PUT'>('ALL');

  if (!telemetryDrawerOpen) return null;

  const filteredLogs = state.telemetryLogs.filter((log) => {
    if (filterMethod === 'ALL') return true;
    return log.method === filterMethod;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink/40 backdrop-blur-xs transition-opacity"
        onClick={() => setTelemetryDrawerOpen(false)}
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-canvas border-l-2 border-ink shadow-2xl flex flex-col h-full z-10 animate-in slide-in-from-right duration-200">
        {/* Drawer Header */}
        <div className="p-4 border-b-2 border-ink bg-tinted flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-forest text-white flex items-center justify-center border border-ink shadow-sketch-sm">
              <Activity className="w-4 h-4 text-emerald" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-ink flex items-center gap-2">
                Live API & Plugin Telemetry
                <span className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
              </h3>
              <p className="text-[11px] font-mono text-ink-muted">FastAPI + Supabase RLS Client Logs</p>
            </div>
          </div>
          <button
            onClick={() => setTelemetryDrawerOpen(false)}
            className="p-1.5 rounded-lg border border-ink bg-white hover:bg-canvas text-ink transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="px-4 py-2.5 border-b border-borderLight bg-white flex items-center justify-between text-xs font-mono">
          <div className="flex gap-1.5">
            {(['ALL', 'GET', 'POST', 'PUT'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setFilterMethod(m)}
                className={`px-2.5 py-1 rounded-lg border text-[11px] font-bold transition ${
                  filterMethod === m
                    ? 'bg-forest text-white border-ink shadow-sketch-sm'
                    : 'bg-tinted text-ink border-ink/20 hover:border-ink'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
          <span className="text-[11px] text-ink-muted">{filteredLogs.length} events</span>
        </div>

        {/* Logs List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5 font-mono text-xs">
          {filteredLogs.length === 0 ? (
            <div className="p-8 text-center text-ink-muted">
              <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>No telemetry recorded for this filter.</p>
            </div>
          ) : (
            filteredLogs.map((log) => {
              const isPost = log.method === 'POST';
              const isPut = log.method === 'PUT';
              const badgeClass = isPost
                ? 'bg-amber-soft text-amber-900 border-amber/40'
                : isPut
                ? 'bg-mint text-forest border-forest/30'
                : 'bg-tinted text-forest border-ink/20';

              return (
                <div
                  key={log.id}
                  className="p-3 rounded-xl bg-white border border-ink shadow-sketch-sm hover:border-forest transition"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold border ${badgeClass}`}>
                      {log.method}
                    </span>
                    <span className="text-[10px] text-ink-muted">{log.timestamp}</span>
                  </div>

                  <div className="font-semibold text-ink text-[11px] truncate mb-1">
                    {log.endpoint}
                  </div>

                  <div className="text-[11px] text-ink-secondary mb-2 line-clamp-2">
                    {log.payloadSummary}
                  </div>

                  <div className="flex items-center justify-between text-[10px] pt-1.5 border-t border-borderLight text-ink-muted">
                    <span className="flex items-center gap-1 text-emerald-dark font-bold">
                      <CheckCircle2 className="w-3 h-3 text-emerald" /> {log.status} OK
                    </span>
                    <span>{log.durationMs} ms latency</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Drawer Footer */}
        <div className="p-3 border-t-2 border-ink bg-tinted flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-[11px] text-ink-secondary">
            <span className="w-2 h-2 rounded-full bg-emerald"></span>
            <span>Mock Engine Active</span>
          </div>
          <span className="font-mono text-[10px] text-ink-muted">v1.4 Enterprise</span>
        </div>
      </div>
    </div>
  );
};

