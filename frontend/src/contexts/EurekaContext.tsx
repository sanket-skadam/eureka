import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ActiveView,
  Technology,
  EnterpriseDocument,
  SkillGap,
  Employee,
  LearningModule,
  AdoptionComparison,
  DigestPreferences,
  TelemetryLog,
  Organization
} from '../types';
import {
  EurekaDatabaseState,
  getInitialState,
  saveState,
  resetDatabase as resetDbService,
  logTelemetry
} from '../services/storage';
import { apiFetch } from '../services/api/client';

interface EurekaContextType {
  state: EurekaDatabaseState;
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  selectedTech: Technology | null;
  setSelectedTech: (tech: Technology | null) => void;
  pipelineModalOpen: boolean;
  setPipelineModalOpen: (open: boolean) => void;
  telemetryDrawerOpen: boolean;
  setTelemetryDrawerOpen: (open: boolean) => void;
  mobileNavOpen: boolean;
  setMobileNavOpen: (open: boolean) => void;
  changeOrganization: (orgId: string) => void;
  resetDb: () => void;
  runPipelineSimulation: (onProgress: (stageIndex: number, logMsg: string) => void) => Promise<void>;
  runRAGSearch: (query: string) => { matchedDocs: EnterpriseDocument[]; synthesis: string; confidenceScore: number };
  uploadDocument: (doc: Partial<EnterpriseDocument>) => void;
  updateDigestPreferences: (prefs: Partial<DigestPreferences>) => void;
  logApiCall: (method: 'GET' | 'POST' | 'PUT' | 'DELETE', endpoint: string, status: number, duration: number, summary: string) => void;
}

const EurekaContext = createContext<EurekaContextType | undefined>(undefined);

export const EurekaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<EurekaDatabaseState>(getInitialState);
  const [activeView, setActiveView] = useState<ActiveView>('dashboard');
  const [selectedTech, setSelectedTech] = useState<Technology | null>(null);
  const [pipelineModalOpen, setPipelineModalOpen] = useState(false);
  const [telemetryDrawerOpen, setTelemetryDrawerOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Sync to localStorage whenever state changes
  useEffect(() => {
    saveState(state);
  }, [state]);

  const logApiCall = (
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    endpoint: string,
    status: number,
    duration: number,
    summary: string
  ) => {
    setState(prev => logTelemetry(prev, method, endpoint, status, duration, summary));
  };

  const changeOrganization = (orgId: string) => {
    const found = state.organizations.find(o => o.id === orgId);
    if (found) {
      logApiCall('POST', `/api/v1/workspaces/switch`, 200, 42, `Switched workspace to ${found.name}`);
      setState(prev => ({
        ...prev,
        activeOrg: found
      }));
    }
  };

  const resetDb = () => {
    const fresh = resetDbService();
    setState(fresh);
  };

  const runPipelineSimulation = async (onProgress: (stageIndex: number, logMsg: string) => void): Promise<void> => {
    const stages = [
      { name: 'Scout', log: 'Scouting GitHub & HuggingFace trending commits for "Postgres HNSW" & "Agentic RPA"' },
      { name: 'Normalize', log: 'Normalizing JSON payloads into Eureka Universal Technology Schema v1.4' },
      { name: 'Validate', log: 'Evaluating source authority, commit velocity (>200 stars), and test coverage' },
      { name: 'Deduplicate', log: 'Checked cross-references across Reddit r/MachineLearning & RSS feeds (0 dupes)' },
      { name: 'Verify', log: 'Verified against official repository tags, license headers, and documentation' },
      { name: 'Research', log: 'Synthesizing benchmark latency metrics and architectural trade-offs via Gemini' },
      { name: 'Curate', log: 'Generated Tangentia contextual impact analysis and mapped to TiA project blueprints' }
    ];

    for (let i = 0; i < stages.length; i++) {
      onProgress(i, stages[i].log);
      logApiCall('POST', `/api/v1/pipeline/stage/${stages[i].name.toLowerCase()}`, 200, 110, stages[i].log);
      await new Promise(res => setTimeout(res, 550));
    }
  };

  const runRAGSearch = (query: string) => {
    logApiCall('POST', '/api/v1/enterprise/rag/retrieve', 200, 138, `RAG query: "${query.substring(0, 40)}..."`);
    
    // Find documents matching query terms or return top relevant Tangentia documents
    const qLower = query.toLowerCase();
    const matched = state.documents.filter(doc => 
      doc.title.toLowerCase().includes(qLower) ||
      doc.tags.some(t => t.toLowerCase().includes(qLower)) ||
      doc.summary.toLowerCase().includes(qLower)
    );
    const finalDocs = matched.length > 0 ? matched : state.documents.slice(0, 2);

    let synthesis = '';
    if (qLower.includes('pgvector') || qLower.includes('hnsw') || qLower.includes('recall')) {
      synthesis = `Based on Tangentia TiA Blueprint 2026 (Section 4.2), Tangentia uses multi-tenant PostgreSQL vector stores where strict tenant_id isolation is required. pgvector 0.8.0's iterative HNSW scans directly solve the multi-tenant recall drop, ensuring 100% top-K recall on client invoice exception retrieval without paying for dedicated SaaS vector DBs.`;
    } else if (qLower.includes('edi') || qLower.includes('kafka') || qLower.includes('gateway')) {
      synthesis = `Referencing Tangentia Gateway EDI Modernization Spec: Migrating from monolithic parsers to Kafka 3.9 Tiered Storage on Azure/AWS reduces long-term transaction archival costs by 68% while allowing sub-second replay of historical ASN 856 and PO 850 documents for client audit resolution.`;
    } else if (qLower.includes('rpa') || qLower.includes('uipath') || qLower.includes('agent')) {
      synthesis = `According to Tangentia Intelligent Automation (TiA) standards: The hybrid architecture combines LangGraph state graphs for multi-step exception deduction with UiPath Orchestrator webhooks for verified, transactional ERP writebacks to SAP S/4HANA.`;
    } else {
      synthesis = `Semantic analysis across Tangentia's ingested documents indicates strong architectural alignment with high-concurrency microservices, pgvector hybrid search, and deterministic RPA with autonomous LLM reasoning.`;
    }

    return {
      matchedDocs: finalDocs,
      synthesis,
      confidenceScore: 96.4
    };
  };

  const uploadDocument = (doc: Partial<EnterpriseDocument>) => {
    const newDoc: EnterpriseDocument = {
      id: `doc-${Date.now()}`,
      title: doc.title || 'Tangentia_Architecture_Supplement.pdf',
      type: doc.type || 'PDF Document',
      chunksCount: Math.floor(Math.random() * 60) + 30,
      lastUpdated: 'Just now',
      status: 'Indexed',
      summary: doc.summary || 'Ingested enterprise documentation for Tangentia technology stack alignment and vector retrieval.',
      matchedTech: 'pgvector 0.8.0, FastAPI Streamable MCP',
      relevancePct: 94,
      size: doc.size || '1.8 MB',
      tags: ['Tangentia TiA', 'Internal Spec', 'RAG Indexed']
    };

    logApiCall('POST', '/api/v1/enterprise/documents/upload', 201, 260, `Uploaded & chunked ${newDoc.title} (${newDoc.chunksCount} chunks)`);
    setState(prev => ({
      ...prev,
      documents: [newDoc, ...prev.documents]
    }));
  };

  const updateDigestPreferences = (prefs: Partial<DigestPreferences>) => {
    logApiCall('PUT', '/api/v1/digest/preferences', 200, 65, 'Updated weekly digest delivery preferences');
    setState(prev => ({
      ...prev,
      digestPreferences: { ...prev.digestPreferences, ...prefs }
    }));
  };

  return (
    <EurekaContext.Provider
      value={{
        state,
        activeView,
        setActiveView,
        selectedTech,
        setSelectedTech,
        pipelineModalOpen,
        setPipelineModalOpen,
        telemetryDrawerOpen,
        setTelemetryDrawerOpen,
        mobileNavOpen,
        setMobileNavOpen,
        changeOrganization,
        resetDb,
        runPipelineSimulation,
        runRAGSearch,
        uploadDocument,
        updateDigestPreferences,
        logApiCall
      }}
    >
      {children}
    </EurekaContext.Provider>
  );
};

export const useEureka = () => {
  const context = useContext(EurekaContext);
  if (!context) {
    throw new Error('useEureka must be used within a EurekaProvider');
  }
  return context;
};

