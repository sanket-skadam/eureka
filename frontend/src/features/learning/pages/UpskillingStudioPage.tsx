import React, { useState } from 'react';
import { useEureka } from '../../../contexts/EurekaContext';
import {
  Code2,
  Play,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  Terminal,
  BookOpen,
  Award,
  Send,
  Bot,
  User,
  Lightbulb,
  ChevronRight
} from 'lucide-react';

export const UpskillingStudioPage: React.FC = () => {
  const { state, logApiCall } = useEureka();

  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const currentModule = state.learningModules[activeModuleIndex] || state.learningModules[0];

  const [userCode, setUserCode] = useState(currentModule.starterCode);
  const [outputConsole, setOutputConsole] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [hasPassed, setHasPassed] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // AI Mentor Chat
  const [chatMessages, setChatMessages] = useState<
    { sender: 'mentor' | 'user'; text: string; time: string }[]
  >([
    {
      sender: 'mentor',
      text: `Hello! I am your Tangentia Engineering AI Mentor. You are currently tackling "${currentModule.title}". Need help with HNSW graph frontier traversal or parameter tuning?`,
      time: 'Just now'
    }
  ]);
  const [chatInput, setChatInput] = useState('');

  const handleSelectModule = (index: number) => {
    setActiveModuleIndex(index);
    const mod = state.learningModules[index];
    setUserCode(mod.starterCode);
    setOutputConsole(null);
    setHasPassed(false);
    setShowHint(false);
    setChatMessages([
      {
        sender: 'mentor',
        text: `Switched to "${mod.title}". Feel free to ask me for architectural guidance, error explanations, or hints.`,
        time: 'Just now'
      }
    ]);
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setOutputConsole('Compiling and executing against Tangentia isolated staging database...');
    logApiCall('POST', '/api/v1/learning/sandbox/execute', 200, 240, `Executed test harness for ${currentModule.id}`);

    setTimeout(() => {
      setIsRunning(false);
      setOutputConsole(currentModule.expectedOutput);
      setHasPassed(true);
    }, 700);
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || chatInput;
    if (!text.trim()) return;

    const userMsg = {
      sender: 'user' as const,
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput('');

    // Generate intelligent AI mentor response based on query
    setTimeout(() => {
      let reply = '';
      const lower = text.toLowerCase();
      if (lower.includes('why') || lower.includes('recall')) {
        reply = `In standard HNSW (prior to pgvector 0.8), PostgreSQL first navigates the graph to find the nearest neighbors, and only then applies the WHERE filter. If the tenant predicate is selective, most candidates are discarded post-graph traversal, returning fewer than LIMIT k tuples. Iterative scan fixes this by resuming graph exploration until enough matching tuples are found!`;
      } else if (lower.includes('strict_order') || lower.includes('relaxed_order')) {
        reply = `'strict_order' guarantees exact distance ordering by visiting candidate frontier nodes strictly. 'relaxed_order' is up to 3x faster for large graphs where a tiny epsilon difference in distance ranking is acceptable for sub-second retrieval.`;
      } else if (lower.includes('memory') || lower.includes('rds')) {
        reply = `For production AWS RDS Aurora PostgreSQL, ensure 'maintenance_work_mem' is at least 1GB to 2GB during HNSW index builds, and tune 'hnsw.max_scan_tuples' between 10,000 and 50,000 depending on tenant selectivity.`;
      } else {
        reply = `Great question! When configuring Tangentia TiA's vector layer, ensure your SQL session executes 'SET hnsw.iterative_scan = strict_order;' before running tenant-scoped queries. Let me know if you want to inspect the EXPLAIN ANALYZE output!`;
      }

      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'mentor' as const,
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 600);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mint border border-ink text-xs font-semibold text-forest mb-2 shadow-sketch-sm">
            <Code2 className="w-3.5 h-3.5 text-forest" />
            <span>Interactive Engineering Sandbox</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl text-forest tracking-tight">
            Adaptive Upskilling Studio
          </h1>
          <p className="text-sm text-ink-secondary max-w-2xl mt-1.5 font-medium leading-relaxed">
            Hands-on coding challenges and real-time execution sandboxes with an adaptive AI coding mentor
            tailored to Tangentia's enterprise technology stack.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono font-bold bg-white px-3 py-1.5 rounded-2xl border border-ink shadow-sketch-sm self-start md:self-auto">
          <Award className="w-4 h-4 text-amber" />
          <span>XP Earned: 1,450 / 2,000</span>
        </div>
      </div>

      {/* Module Roadmap Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {state.learningModules.map((mod, idx) => {
          const isSelected = activeModuleIndex === idx;
          return (
            <div
              key={mod.id}
              onClick={() => handleSelectModule(idx)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                isSelected
                  ? 'bg-mint-dark border-forest shadow-sketch-sm ring-1 ring-forest'
                  : 'bg-white border-borderLight hover:border-ink'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-md bg-forest text-white">
                  {mod.difficulty}
                </span>
                <span className="font-mono text-[10px] font-bold text-forest">
                  +{mod.xpReward} XP
                </span>
              </div>
              <h4 className="font-bold text-xs text-ink mb-1 line-clamp-1">{mod.title}</h4>
              <p className="text-[11px] text-ink-muted leading-tight">{mod.topic}</p>
            </div>
          );
        })}
      </div>

      {/* Main Studio Arena: Code Editor + AI Mentor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Problem & Code Sandbox (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Challenge Description Card */}
          <div className="sketch-card p-5 bg-white border-2 border-ink space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-full bg-mint text-forest border border-ink/20">
                Active Laboratory Challenge
              </span>
              <span className="font-mono text-xs text-ink-muted">{currentModule.durationMinutes} mins</span>
            </div>

            <h3 className="font-display text-2xl text-forest">{currentModule.challengeTitle}</h3>
            <p className="text-xs text-ink-secondary leading-relaxed whitespace-pre-line">
              {currentModule.challengeDescription}
            </p>

            {showHint && (
              <div className="p-3.5 rounded-xl bg-amber-soft border border-amber/40 text-xs text-amber-900 flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-amber shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Architectural Hint:</span>
                  <p className="mt-0.5 font-mono text-[11px]">{currentModule.solutionHint}</p>
                </div>
              </div>
            )}
          </div>

          {/* Interactive Code Editor */}
          <div className="sketch-card overflow-hidden bg-forest border-2 border-ink shadow-sketch-sm">
            {/* Editor Toolbar */}
            <div className="px-4 py-2.5 bg-forest-card border-b border-forest/40 flex items-center justify-between text-xs font-mono text-mint">
              <span className="flex items-center gap-2 font-bold">
                <Terminal className="w-3.5 h-3.5 text-emerald" />
                query_optimizer.sql
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="px-2 py-0.5 rounded bg-forest border border-mint/30 hover:bg-forest/80 text-[11px] text-amber font-semibold transition"
                >
                  {showHint ? 'Hide Hint' : 'Show Hint'}
                </button>
                <button
                  onClick={() => setUserCode(currentModule.starterCode)}
                  className="px-2 py-0.5 rounded bg-forest border border-mint/30 hover:bg-forest/80 text-[11px] text-mint font-semibold transition"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Code Input Area */}
            <textarea
              value={userCode}
              onChange={(e) => setUserCode(e.target.value)}
              rows={12}
              spellCheck={false}
              className="w-full bg-forest text-mint font-mono text-xs p-4 leading-relaxed focus:outline-none resize-none border-0"
            />

            {/* Editor Run Action Bar */}
            <div className="p-3 bg-forest-card border-t border-forest/40 flex items-center justify-between">
              <span className="text-[11px] font-mono text-mint-dark">
                Target: Staging PostgreSQL 16 RDS (Aurora)
              </span>
              <button
                onClick={handleRunCode}
                disabled={isRunning}
                className="btn-primary text-xs py-1.5 px-4 shadow-sketch bg-emerald-dark hover:bg-emerald text-white border-white"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                {isRunning ? 'Executing Test Plan...' : 'Run & Validate Solution'}
              </button>
            </div>
          </div>

          {/* Execution Output Console */}
          {outputConsole && (
            <div className="sketch-card p-4 bg-surface border-2 border-ink space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-borderLight text-xs font-mono">
                <span className="font-bold text-forest flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald" />
                  Test Suite Execution Results
                </span>
                {hasPassed && (
                  <span className="font-bold text-emerald-dark bg-mint px-2 py-0.5 rounded-full border border-forest/20">
                    PASS • All Benchmarks Satisfied
                  </span>
                )}
              </div>
              <pre className="p-3 rounded-xl bg-tinted text-ink font-mono text-xs overflow-x-auto whitespace-pre-wrap leading-relaxed">
                {outputConsole}
              </pre>
            </div>
          )}
        </div>

        {/* Right Column: Conversational AI Coding Mentor (5 cols) */}
        <div className="lg:col-span-5 sketch-card bg-white border-2 border-ink flex flex-col h-[650px] shadow-sketch">
          {/* Mentor Header */}
          <div className="p-4 border-b-2 border-ink bg-tinted flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-forest text-white flex items-center justify-center border border-ink shadow-sketch-sm">
                <Bot className="w-5 h-5 text-emerald" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-forest flex items-center gap-1.5">
                  AI Coding Mentor
                  <span className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
                </h3>
                <p className="text-[11px] font-mono text-ink-muted">Tangentia Engineering Companion</p>
              </div>
            </div>
            <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-forest border border-ink/20">
              Gemini 1.5
            </span>
          </div>

          {/* Quick Mentor Prompts */}
          <div className="p-3 border-b border-borderLight bg-mint/30 space-y-1.5">
            <span className="text-[10px] font-mono uppercase font-bold text-ink-muted block">
              Suggested Questions:
            </span>
            <div className="flex flex-col gap-1">
              {currentModule.mentorSuggestions.map((sug, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(sug)}
                  className="text-left text-[11px] font-medium text-forest hover:underline truncate"
                >
                  ❯ {sug}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Messages Log */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {chatMessages.map((msg, i) => (
              <div
                key={i}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`p-3 rounded-2xl max-w-[90%] text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-forest text-white rounded-br-none shadow-sketch-sm'
                      : 'bg-tinted text-ink border border-ink/20 rounded-bl-none shadow-sm'
                  }`}
                >
                  <p>{msg.text}</p>
                </div>
                <span className="text-[10px] font-mono text-ink-muted mt-1 px-1">
                  {msg.time}
                </span>
              </div>
            ))}
          </div>

          {/* Chat Input Bar */}
          <div className="p-3 border-t-2 border-ink bg-tinted flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask mentor for hints, code explanations..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 bg-white border border-ink rounded-xl px-3 py-2 text-xs text-ink focus:outline-none focus:ring-1 focus:ring-forest"
            />
            <button
              onClick={() => handleSendMessage()}
              className="p-2 rounded-xl bg-forest text-white border border-ink hover:bg-forest-card transition shadow-sketch-sm"
              aria-label="Send message to mentor"
            >
              <Send className="w-4 h-4 text-emerald" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
