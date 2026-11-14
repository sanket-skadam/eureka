import React, { useState } from 'react';
import { useEureka } from '../../../contexts/EurekaContext';
import {
  FileSearch,
  UploadCloud,
  Search,
  Sparkles,
  FileText,
  CheckCircle2,
  AlertCircle,
  Database,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Layers
} from 'lucide-react';

export const EnterpriseRagPage: React.FC = () => {
  const { state, runRAGSearch, uploadDocument } = useEureka();

  const [searchQuery, setSearchQuery] = useState(
    'How does pgvector 0.8 improve Tangentia TiA exception search?'
  );
  const [ragResult, setRagResult] = useState<{
    matchedDocs: any[];
    synthesis: string;
    confidenceScore: number;
  } | null>(() => runRAGSearch('How does pgvector 0.8 improve Tangentia TiA exception search?'));

  const [uploading, setUploading] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<any>(state.documents[0] || null);

  const sampleQueries = [
    'How does pgvector 0.8 improve Tangentia TiA exception search?',
    'What are Tangentia Gateway requirements for Kafka EDI long-term archival?',
    'How does LangGraph integrate with UiPath bots for ERP commits?',
    'What are Tangentia compliance policies on customer prompt injection?'
  ];

  const handleExecuteRAG = (q: string) => {
    setSearchQuery(q);
    const result = runRAGSearch(q);
    setRagResult(result);
  };

  const handleSimulateUpload = () => {
    setUploading(true);
    setTimeout(() => {
      uploadDocument({
        title: 'Tangentia_Automotive_Client_SLA_Requirements_2026.pdf',
        type: 'PDF Client Contract',
        size: '3.2 MB',
        summary: 'SLA guarantees for real-time EDI 856 Advanced Shipping Notice processing and automated reasoning failover policies.'
      });
      setUploading(false);
    }, 900);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mint border border-ink text-xs font-semibold text-forest mb-2 shadow-sketch-sm">
            <Database className="w-3.5 h-3.5 text-forest" />
            <span>Semantic Context & Retrieval Engine</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl text-forest tracking-tight">
            Enterprise Intelligence & RAG
          </h1>
          <p className="text-sm text-ink-secondary max-w-2xl mt-1.5 font-medium leading-relaxed">
            Ingest Tangentia enterprise specifications, RFPs, and codebase blueprints into pgvector to
            ground external intelligence in actual business reality and customer SLAs.
          </p>
        </div>

        <button
          onClick={handleSimulateUpload}
          disabled={uploading}
          className="btn-primary shadow-sketch text-xs self-start md:self-auto"
        >
          <UploadCloud className="w-4 h-4 text-emerald" />
          {uploading ? 'Chunking & Embedding...' : 'Upload & Ingest Spec'}
        </button>
      </div>

      {/* Interactive Semantic RAG Query Console */}
      <div className="sketch-card p-6 bg-surface border-2 border-ink space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-borderLight">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-forest text-white flex items-center justify-center border border-ink shadow-sketch-sm">
              <Sparkles className="w-4 h-4 text-amber" />
            </div>
            <div>
              <h3 className="font-bold text-base text-forest">Semantic RAG Context Matcher</h3>
              <p className="text-xs text-ink-muted">Query Tangentia enterprise knowledge base with LLM synthesis</p>
            </div>
          </div>
          <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-full bg-mint text-forest border border-ink/20">
            pgvector 0.8 Active
          </span>
        </div>

        {/* Input & Search Trigger */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-ink-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleExecuteRAG(searchQuery)}
                placeholder="Ask about Tangentia architecture, TiA RPA integrations, or security guardrails..."
                className="w-full bg-canvas border border-ink rounded-xl pl-9 pr-4 py-2.5 text-xs font-semibold text-ink focus:outline-none focus:ring-1 focus:ring-forest"
              />
            </div>
            <button
              onClick={() => handleExecuteRAG(searchQuery)}
              className="btn-primary text-xs shrink-0 shadow-sketch"
            >
              Run Semantic Query
            </button>
          </div>

          {/* Sample Prompts */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-ink-muted font-mono text-[11px] mr-1">Suggestions:</span>
            {sampleQueries.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleExecuteRAG(q)}
                className="px-2.5 py-1 rounded-lg bg-tinted border border-ink/20 hover:border-ink text-ink text-[11px] font-medium transition"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Synthesis Output */}
        {ragResult && (
          <div className="space-y-4 pt-2">
            <div className="p-5 rounded-2xl bg-mint/50 border-2 border-forest space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-forest font-bold text-xs uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-amber" />
                  Gemini Enterprise Context Synthesis
                </div>
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-full bg-white text-forest border border-ink/20 shadow-sm">
                  Confidence: {ragResult.confidenceScore}%
                </span>
              </div>
              <p className="text-xs sm:text-sm text-ink font-medium leading-relaxed">
                {ragResult.synthesis}
              </p>
            </div>

            {/* Matched Document Chunks */}
            <div>
              <h4 className="text-xs font-mono uppercase font-bold text-ink-muted mb-2.5">
                Matched Ingested Chunks ({ragResult.matchedDocs.length})
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {ragResult.matchedDocs.map((doc: any) => (
                  <div
                    key={doc.id}
                    className="p-4 rounded-2xl bg-white border border-ink shadow-sketch-sm space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-forest truncate max-w-[200px]">
                        {doc.title}
                      </span>
                      <span className="font-mono text-[10px] font-bold text-emerald-dark bg-mint px-2 py-0.5 rounded-full border border-forest/20">
                        {doc.relevancePct}% Match
                      </span>
                    </div>
                    <p className="text-xs text-ink-secondary leading-relaxed line-clamp-3">
                      {doc.contentSample || doc.summary}
                    </p>
                    <div className="pt-2 border-t border-borderLight flex items-center justify-between text-[11px] font-mono text-ink-muted">
                      <span>{doc.chunksCount} chunks indexed</span>
                      <span className="text-forest font-bold">Vector: Cosine Distance &lt; 0.08</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Tangentia Ingested Documents Library */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-forest" />
            <h3 className="font-display text-2xl sm:text-3xl text-forest">
              Tangentia Knowledge Repository ({state.documents.length})
            </h3>
          </div>
          <span className="font-mono text-xs text-ink-muted">
            All files secured with Row-Level Security (RLS)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {state.documents.map((doc) => (
            <div
              key={doc.id}
              onClick={() => setSelectedDoc(doc)}
              className={`p-5 rounded-2xl border-1.5 cursor-pointer transition-all ${
                selectedDoc?.id === doc.id
                  ? 'bg-surface border-forest shadow-sketch-sm ring-1 ring-forest'
                  : 'bg-white border-ink hover:bg-tinted/40'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-forest text-white flex items-center justify-center border border-ink shrink-0">
                    <FileText className="w-4 h-4 text-emerald" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-ink truncate max-w-[280px]">
                      {doc.title}
                    </h4>
                    <span className="text-[11px] font-mono text-ink-muted">{doc.type} • {doc.size}</span>
                  </div>
                </div>
                <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-full bg-mint text-forest border border-forest/20 shrink-0">
                  {doc.status}
                </span>
              </div>

              <p className="text-xs text-ink-secondary leading-relaxed mb-3 line-clamp-2">
                {doc.summary}
              </p>

              <div className="flex flex-wrap items-center gap-1.5 mb-3">
                {doc.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-tinted border border-borderLight text-ink-secondary"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="pt-2.5 border-t border-borderLight flex items-center justify-between text-[11px] font-mono text-ink-muted">
                <span>Indexed {doc.lastUpdated}</span>
                <span className="text-forest font-bold">{doc.chunksCount} Vector Chunks</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
