import React, { useState } from 'react';
import { useEureka } from '../../contexts/EurekaContext';
import {
  X,
  Play,
  CheckCircle2,
  Loader2,
  Compass,
  ArrowRight,
  Database,
  ShieldCheck,
  GitBranch,
  Search,
  BookOpen,
  Sparkles
} from 'lucide-react';

export const PipelineModal: React.FC = () => {
  const { pipelineModalOpen, setPipelineModalOpen, runPipelineSimulation } = useEureka();
  const [running, setRunning] = useState(false);
  const [currentStage, setCurrentStage] = useState<number>(-1);
  const [logs, setLogs] = useState<string[]>([]);
  const [completed, setCompleted] = useState(false);

  if (!pipelineModalOpen) return null;

  const stages = [
    { name: '1. Scout', desc: 'Harvest raw GitHub repos, HuggingFace weights, Reddit r/LocalLLaMA & RSS feeds', icon: <Compass className="w-4 h-4" /> },
    { name: '2. Normalize', desc: 'Standardize heterogeneous feeds into Eureka Unified Technology Schema', icon: <Database className="w-4 h-4" /> },
    { name: '3. Validate', desc: 'Programmatic thresholds: >200 stars, active maintainer, test suite, permissive license', icon: <ShieldCheck className="w-4 h-4" /> },
    { name: '4. Deduplicate', desc: 'Cross-source graph deduplication & cluster linking across release channels', icon: <GitBranch className="w-4 h-4" /> },
    { name: '5. Verify', desc: 'Compare claims against official repositories and release tag metadata', icon: <Search className="w-4 h-4" /> },
    { name: '6. Research', desc: 'Gemini synthesis: benchmarks, architectural trade-offs, and failure modes', icon: <BookOpen className="w-4 h-4" /> },
    { name: '7. Curate', desc: 'Contextualize with Tangentia TiA and Gateway project impact & ROI', icon: <Sparkles className="w-4 h-4" /> }
  ];

  const handleStart = async () => {
    setRunning(true);
    setCompleted(false);
    setLogs([]);
    setCurrentStage(0);

    await runPipelineSimulation((stageIdx, logMsg) => {
      setCurrentStage(stageIdx);
      setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${logMsg}`]);
    });

    setRunning(false);
    setCompleted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink/50 backdrop-blur-xs transition-opacity"
        onClick={() => !running && setPipelineModalOpen(false)}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl bg-surface border-2 border-ink rounded-3xl shadow-sketch-lg overflow-hidden z-10 my-8 animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-5 border-b-2 border-ink bg-tinted flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-forest text-white flex items-center justify-center border-2 border-ink shadow-sketch-sm">
              <Compass className="w-5 h-5 text-emerald" />
            </div>
            <div>
              <h3 className="font-display text-2xl text-forest">7-Stage Technology Discovery Pipeline</h3>
              <p className="text-xs text-ink-muted font-medium">
                Automated continuous intelligence engine: Scout → Validate → Research → Tangentia Curate
              </p>
            </div>
          </div>
          <button
            onClick={() => !running && setPipelineModalOpen(false)}
            disabled={running}
            className="p-1.5 rounded-xl border border-ink bg-white hover:bg-canvas text-ink transition disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {/* Pipeline Stage Visualizer */}
          <div className="space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {stages.map((stage, idx) => {
                const isCurrent = currentStage === idx && running;
                const isDone = currentStage > idx || completed;
                
                return (
                  <div
                    key={stage.name}
                    className={`p-3 rounded-2xl border transition-all flex items-start gap-3 ${
                      isCurrent
                        ? 'bg-mint-dark border-forest shadow-sketch-sm scale-[1.01]'
                        : isDone
                        ? 'bg-mint/60 border-forest/40'
                        : 'bg-white border-borderLight opacity-75'
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 border ${
                        isDone
                          ? 'bg-forest text-white border-forest'
                          : isCurrent
                          ? 'bg-forest text-emerald border-ink animate-pulse'
                          : 'bg-tinted text-ink-muted border-borderLight'
                      }`}
                    >
                      {isDone ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald" />
                      ) : isCurrent ? (
                        <Loader2 className="w-4 h-4 animate-spin text-emerald" />
                      ) : (
                        stage.icon
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-ink">{stage.name}</span>
                        {isDone && (
                          <span className="text-[10px] font-mono text-emerald-dark font-bold">Passed</span>
                        )}
                        {isCurrent && (
                          <span className="text-[10px] font-mono text-forest font-bold animate-pulse">Running...</span>
                        )}
                      </div>
                      <p className="text-[11px] text-ink-muted leading-tight mt-0.5">{stage.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Terminal Output */}
          <div className="rounded-2xl border-2 border-ink bg-forest text-white p-4 font-mono text-xs shadow-sketch-sm">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-forest-card text-[11px] text-mint">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
                Pipeline Execution Telemetry & Synthesis Log
              </span>
              <span>pgvector + Gemini 1.5 + GitHub REST</span>
            </div>

            <div className="h-32 overflow-y-auto space-y-1 text-mint-dark text-[11px]">
              {logs.length === 0 ? (
                <p className="text-white/50 italic">Click "Trigger Full Discovery Pipeline" to start scout sweep...</p>
              ) : (
                logs.map((l, i) => (
                  <p key={i} className="leading-relaxed">
                    <span className="text-amber">❯</span> {l}
                  </p>
                ))
              )}
              {completed && (
                <p className="text-emerald font-bold pt-1">
                  ✓ Pipeline completed: 18 raw signals scouted → 6 normalized → 3 validated → 1 novel technology curated for Tangentia TiA!
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t-2 border-ink bg-tinted flex items-center justify-between">
          <div className="text-xs text-ink-muted font-medium">
            Sources active: <span className="font-mono text-forest font-bold">GitHub, HuggingFace, Reddit, RSS</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setPipelineModalOpen(false)}
              className="btn-sketch text-xs"
              disabled={running}
            >
              Close
            </button>

            <button
              onClick={handleStart}
              disabled={running}
              className="btn-primary text-xs shadow-sketch"
            >
              {running ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-emerald" />
                  Processing Pipeline...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current text-emerald" />
                  Trigger Full Discovery Pipeline
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

