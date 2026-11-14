import {
  Organization,
  Technology,
  EnterpriseDocument,
  SkillGap,
  Employee,
  LearningModule,
  AdoptionComparison,
  DigestPreferences
} from '../types';

export const defaultOrganizations: Organization[] = [
  {
    id: 'org_tangentia_global',
    name: 'Tangentia Inc.',
    domain: 'tangentia.com',
    tagline: 'Global Enterprise Automation, B2B EDI & Digital Transformation',
    industry: 'Enterprise Software & Intelligent Automation',
    headquarters: 'Toronto, Canada & Panaji, Goa (Global Delivery Center)',
    techFocus: ['Tangentia TiA', 'B2B EDI Gateway', 'pgvector & RAG', 'UiPath & LangGraph', 'Supply Chain AI']
  },
  {
    id: 'org_apex_fintech',
    name: 'Apex FinTech Corp',
    domain: 'apexfintech.internal',
    tagline: 'High-frequency core payment & algorithmic trading systems',
    industry: 'Financial Technology',
    headquarters: 'New York, USA',
    techFocus: ['Low Latency Payments', 'PostgreSQL', 'Model Risk Management']
  },
  {
    id: 'org_meridian_health',
    name: 'Meridian Health Systems',
    domain: 'meridianhealth.org',
    tagline: 'Clinical workflows and patient diagnostic pipelines',
    industry: 'Healthcare & Life Sciences',
    headquarters: 'Boston, USA',
    techFocus: ['HIPAA Compliant AI', 'FHIR Interfaces', 'Clinical NLP']
  }
];

export const defaultTechnologies: Technology[] = [
  {
    id: 'pgvector-08',
    name: 'pgvector 0.8.0',
    tagline: 'Iterative HNSW index scans & parallel build acceleration for PostgreSQL',
    domain: 'Vector & RAG',
    source: 'GitHub',
    license: 'PostgreSQL License',
    noveltyScore: 94,
    relevanceScore: 98,
    velocity: '+1,420 ★/wk',
    verifiedVia: 'Verified via Official Repo (pgvector/pgvector)',
    repoUrl: 'https://github.com/pgvector/pgvector/releases/tag/v0.8.0',
    docsUrl: 'https://github.com/pgvector/pgvector#iterative-index-scans',
    previousProblem: 'When combining approximate nearest neighbor (HNSW/IVFFlat) searches with selective WHERE clauses (e.g., tenant_id or org_id isolation in Tangentia Gateway), PostgreSQL filtered results after scanning a fixed candidate pool, returning zero or fewer rows than LIMIT k.',
    whatChanged: 'Introduced hnsw.iterative_scan (strict_order & relaxed_order) and ivfflat.iterative_scan, allowing PostgreSQL to dynamically expand traversal batches until sufficient tenant-filtered tuples are discovered.',
    howItWorks: 'During index traversal, if tenant predicates discard candidates, the executor resumes graph navigation from the frontier priority queue up to hnsw.max_scan_tuples without falling back to expensive sequential table scans.',
    capabilities: [
      'Zero-loss top-K recall on multi-tenant filtered RAG queries in Tangentia TiA',
      'Up to 9x faster HNSW index builds utilizing parallel CPU background workers',
      'Configurable relaxation mode for sub-millisecond approximate semantic searches',
      'Native compatibility with PostgreSQL 15, 16, and 17 on AWS RDS and Azure Flexible Server'
    ],
    whyItMatters: 'Directly solves the recall drop in Tangentia Gateway multi-client document retrieval without requiring an expensive migration to isolated vector databases.',
    codeSnippet: `-- Tangentia TiA Hybrid Multi-Tenant Semantic Search Configuration
SET hnsw.iterative_scan = 'strict_order';
SET hnsw.max_scan_tuples = 20000;

EXPLAIN ANALYZE
SELECT doc_id, chunk_text, (embedding <=> $query_vector) AS cosine_distance
FROM tangentia_enterprise_documents
WHERE tenant_id = 'tangentia_corp_client_04'
  AND department = 'SupplyChain_Logistics'
ORDER BY embedding <=> $query_vector
LIMIT 5;`,
    companyImpact: {
      affectedSystem: 'Tangentia TiA Cognitive Search & Gateway EDI Exception RAG',
      gapSeverity: 'Critical',
      estimatedRoi: '+$42,000/yr saved in external vector DB licensing & 4x recall boost',
      actionRequired: 'Upgrade staging RDS Aurora instances to pgvector 0.8.0 and tune iterative_scan parameters'
    },
    pipelineStatus: 'Curated'
  },
  {
    id: 'deepseek-r1-distill-32b',
    name: 'DeepSeek-R1-Distill-Qwen-32B',
    tagline: 'State-of-the-art open reasoning model distilled from large R1 chains',
    domain: 'LLM Reasoning',
    source: 'Hugging Face',
    license: 'MIT License',
    noveltyScore: 98,
    relevanceScore: 94,
    velocity: '+38,500 downloads/mo',
    verifiedVia: 'Verified via Hugging Face model cards & technical report',
    repoUrl: 'https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-32B',
    docsUrl: 'https://github.com/deepseek-ai/DeepSeek-R1',
    previousProblem: 'Enterprise RPA workflows in Tangentia TiA often hit dead ends when dealing with non-standard EDI invoices, messy purchase orders, or handwritten logistics bills where standard regex or small LLMs fail at complex deductive step-by-step reasoning.',
    whatChanged: 'Demonstrates benchmark parity with OpenAI o1-mini on competitive math, complex logic, and structured document parsing while being hostable on single 8x A10G/L40S clusters under permissive MIT license.',
    howItWorks: 'Trained via Reinforcement Learning with cold-start data distilled from DeepSeek-R1, using chain-of-thought verification tokens <think>...</think> to self-correct during edge-case deduction.',
    capabilities: [
      'Self-correcting verification of EDI 850 / 856 order mismatches and customs forms',
      'Can be quantized to 4-bit AWQ for local private on-premise execution at client banks/logistics hubs',
      'Zero training data leak to public cloud model providers',
      'Structured JSON output adherence exceeding 97.4%'
    ],
    whyItMatters: 'Enables Tangentia to offer sovereign, on-premise intelligent document reasoning to enterprise banking and automotive manufacturing clients without sending data to public APIs.',
    codeSnippet: `from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

model_id = "deepseek-ai/DeepSeek-R1-Distill-Qwen-32B"
tokenizer = AutoTokenizer.from_pretrained(model_id)
model = AutoModelForCausalLM.from_pretrained(
    model_id, 
    torch_dtype=torch.bfloat16, 
    device_map="auto"
)

prompt = "Analyze this EDI 856 ASN transaction discrepancy against PO #994821..."
inputs = tokenizer(prompt, return_tensors="pt").to("cuda")
outputs = model.generate(**inputs, max_new_tokens=1024)
print(tokenizer.decode(outputs[0], skip_special_tokens=True))`,
    companyImpact: {
      affectedSystem: 'Tangentia TiA Cognitive Document Processing (IDP) Engine',
      gapSeverity: 'High',
      estimatedRoi: '85% automation rate on complex freight exception audits',
      actionRequired: 'Deploy trial container on internal GPU node and benchmark against current GPT-4o pipeline'
    },
    pipelineStatus: 'Curated'
  },
  {
    id: 'fastapi-streamable-mcp',
    name: 'FastAPI Streamable MCP Adapter v0.9',
    tagline: 'High-concurrency Model Context Protocol connector for enterprise ERP & microservices',
    domain: 'Agentic Infrastructure',
    source: 'GitHub',
    license: 'Apache 2.0',
    noveltyScore: 89,
    relevanceScore: 92,
    velocity: '+620 ★/wk',
    verifiedVia: 'Verified via GitHub releases & Model Context Protocol Spec',
    repoUrl: 'https://github.com/modelcontextprotocol/servers',
    docsUrl: 'https://modelcontextprotocol.io/quickstart',
    previousProblem: 'Connecting Tangentia backend microservices (SAP connectors, Kafka streams, PostgreSQL databases) to AI agents required custom brittle JSON-RPC wrappers that lacked streaming support and standard tool definitions.',
    whatChanged: 'Provides native SSE (Server-Sent Events) bidirectional tool transport for FastAPI endpoints, exposing database queries and ERP actions directly to Anthropic/Gemini MCP clients.',
    howItWorks: 'Decorates standard FastAPI router functions as MCP Tools and Resources, handling JSON-Schema synthesis, authorization tokens, and execution timeouts automatically.',
    capabilities: [
      'Turns Tangentia Gateway EDI tracking endpoints into standardized agent tools',
      'Built-in rate limiting and tenant isolation guardrails',
      'Zero-code OpenAPI to MCP tool descriptor generator'
    ],
    whyItMatters: 'Standardizes how Tangentia AI agents interact with client ERPs (SAP S/4HANA, NetSuite) and supply chain APIs.',
    codeSnippet: `from fastapi import FastAPI
from mcp.server.fastapi import MCPAwareRouter

app = FastAPI(title="Tangentia Gateway MCP Server")
mcp_router = MCPAwareRouter()

@mcp_router.tool(name="lookup_edi_transaction")
async def lookup_edi(transaction_id: str, client_id: str) -> dict:
    """Queries Tangentia Gateway Kafka archive for EDI 850/856 status."""
    return await gateway_service.fetch_transaction(transaction_id, client_id)

app.include_router(mcp_router, prefix="/mcp")`,
    companyImpact: {
      affectedSystem: 'Tangentia Gateway Enterprise API Layer',
      gapSeverity: 'Moderate',
      estimatedRoi: 'Cuts custom agent tool development time by 60%',
      actionRequired: 'Adopt standard in upcoming Q2 Tangentia Gateway microservice sprint'
    },
    pipelineStatus: 'Validated'
  },
  {
    id: 'uipath-langgraph-hybrid',
    name: 'UiPath & LangGraph Hybrid Orchestrator',
    tagline: 'Bridges deterministic Robotic Process Automation bots with autonomous LLM reasoning loops',
    domain: 'Intelligent Automation & RPA',
    source: 'Manual',
    license: 'Proprietary / MIT',
    noveltyScore: 91,
    relevanceScore: 97,
    velocity: 'Enterprise Tech Alert',
    verifiedVia: 'Tangentia Internal Automation Architecture Lab',
    repoUrl: 'https://github.com/langchain-ai/langgraph',
    docsUrl: 'https://docs.uipath.com/orchestrator/automation-cloud/latest/user-guide/webhooks',
    previousProblem: 'Traditional RPA bots fail whenever an unexpected UI change or unstructured document arrives; conversely, purely generative AI agents hallucinate and cannot be trusted with deterministic SAP/Oracle ERP transactional commits.',
    whatChanged: 'Architecture pattern combining LangGraph state graphs for exception deduction with UiPath Orchestrator webhooks for secure, transactional ERP writebacks.',
    howItWorks: 'UiPath bot captures unstructured document -> triggers LangGraph agent -> agent resolves ambiguities with human-in-the-loop fallback -> delegates back to UiPath bot for transactional execution.',
    capabilities: [
      '100% deterministic audit trail for Tangentia enterprise clients',
      'Human-in-the-loop review station for transactions over $50,000 threshold',
      'Dynamic error recovery for RPA scraping breakages'
    ],
    whyItMatters: 'Direct core offering of Tangentia TiA (Tangentia Intelligent Automation), giving clients the best of both deterministic RPA and cognitive AI.',
    codeSnippet: `from langgraph.graph import StateGraph, END
from tangentia_rpa import UiPathWebhookClient

def evaluate_invoice_exception(state):
    # LLM reasoning step for tax mismatch
    invoice = state["invoice"]
    return {"resolved_tax_code": "HST_ON_13"}

def dispatch_uipath_commit(state):
    # Deterministic commit to SAP
    UiPathWebhookClient.trigger_job("Process_SAP_Invoice_Entry", parameters=state)
    return {"status": "COMMITTED"}`,
    companyImpact: {
      affectedSystem: 'Tangentia TiA Core Automation Platform',
      gapSeverity: 'Critical',
      estimatedRoi: 'Unlocks 12 pending enterprise automation client contracts',
      actionRequired: 'Roll out certification pathway to 28 Tangentia RPA engineers'
    },
    pipelineStatus: 'Curated'
  },
  {
    id: 'llama-guard-3',
    name: 'Llama-Guard-3-8B Prompt Firewall',
    tagline: 'Safeguard model for input/output content moderation and jailbreak prevention',
    domain: 'Security & Governance',
    source: 'Hugging Face',
    license: 'Llama 3.2 Community',
    noveltyScore: 87,
    relevanceScore: 90,
    velocity: '+14,200 downloads/wk',
    verifiedVia: 'Verified via Meta AI & Hugging Face',
    repoUrl: 'https://huggingface.co/meta-llama/Llama-Guard-3-8B',
    docsUrl: 'https://llama.meta.com/docs/model-cards-and-prompt-formats/llama-guard-3',
    previousProblem: 'When Tangentia clients deploy customer or supplier-facing GenAI portals, they face risks of prompt injection, PII exfiltration, or competitors probing internal margin pricing.',
    whatChanged: 'Ultra-fast 8B model fine-tuned on the MLCommons taxonomy, offering under 25ms inference latency per query verification.',
    howItWorks: 'Evaluates user input prompts and LLM generated output tokens against 14 risk categories before passing them to the primary inference engine.',
    capabilities: [
      'Zero-leakage PII and credential stripping',
      'Prevents jailbreaks and indirect prompt injection through uploaded PDFs/EDIs',
      'Can be run as a lightweight sidecar container alongside FastAPI'
    ],
    whyItMatters: 'Mandatory compliance requirement for Tangentia global enterprise security audits.',
    codeSnippet: `# Input validation pipeline in Tangentia Gateway
is_safe, violations = llama_guard.check_input(user_prompt)
if not is_safe:
    logger.security_warning(f"Blocked injection attempt: {violations}")
    raise HTTPException(status_code=400, detail="Security policy violation detected.")`,
    companyImpact: {
      affectedSystem: 'Tangentia AI Portal Ingress Gateway',
      gapSeverity: 'Moderate',
      estimatedRoi: 'Ensures 100% compliance with SOC2 Type II & ISO 27001 AI governance',
      actionRequired: 'Integrate into API Gateway middleware stack'
    },
    pipelineStatus: 'Validated'
  },
  {
    id: 'apache-kafka-39',
    name: 'Apache Kafka 3.9 Tiered Storage',
    tagline: 'Cost-effective long-term event stream retention with cloud object storage offloading',
    domain: 'Cloud & B2B Integration',
    source: 'RSS',
    license: 'Apache 2.0',
    noveltyScore: 85,
    relevanceScore: 91,
    velocity: 'Official Apache Release',
    verifiedVia: 'Apache Software Foundation Official Announcements',
    repoUrl: 'https://github.com/apache/kafka/releases/tag/3.9.0',
    docsUrl: 'https://kafka.apache.org/documentation/#tiered_storage',
    previousProblem: 'Tangentia Gateway processes millions of EDI supply chain transactions daily (850 Purchase Orders, 856 ASNs, 810 Invoices). Retaining historical transactions on expensive high-IOPS NVMe broker disks costs over $18,000/month.',
    whatChanged: 'Native production-ready Tiered Storage automatically offloads closed log segments to Amazon S3 or Azure Blob Storage while remaining queryable through standard consumer offsets.',
    howItWorks: 'Local broker storage keeps active 48-hour hot segments; older cold segments are archived asynchronously to object storage with local index caching.',
    capabilities: [
      'Reduces Tangentia Gateway cloud storage bill by 68%',
      'Eliminates complex custom archival microservices',
      'Sub-second replay of year-old EDI transactions for dispute reconciliation'
    ],
    whyItMatters: 'Massive cost reduction and architectural simplification for Tangentia Gateway B2B operations.',
    codeSnippet: `# server.properties
remote.log.storage.system.enable=true
remote.log.manager.class.name=org.apache.kafka.server.log.remote.storage.RemoteLogManager
remote.log.metadata.manager.class.name=org.apache.kafka.server.log.remote.storage.TopicBasedRemoteLogMetadataManager`,
    companyImpact: {
      affectedSystem: 'Tangentia Gateway EDI Streaming Backbone',
      gapSeverity: 'High',
      estimatedRoi: '+$145,000/yr savings in AWS EBS multi-attach storage costs',
      actionRequired: 'Plan rolling upgrade of staging Kafka cluster in Q2'
    },
    pipelineStatus: 'Curated'
  }
];

export const defaultDocuments: EnterpriseDocument[] = [
  {
    id: 'doc-tia-blueprint',
    title: 'Tangentia_TiA_Enterprise_Automation_Blueprint_2026.pdf',
    type: 'PDF Technical Blueprint',
    chunksCount: 148,
    lastUpdated: '12 hours ago',
    status: 'Indexed',
    summary: 'Core architecture documentation for Tangentia TiA (Tangentia Intelligent Automation). Details cognitive RPA integration, LLM agent workflows, multi-tenant pgvector hybrid search, and SAP/Oracle ERP transactional commit safety patterns.',
    matchedTech: 'pgvector 0.8.0, UiPath & LangGraph',
    relevancePct: 98,
    size: '4.8 MB',
    tags: ['Intelligent Automation', 'RAG', 'UiPath', 'pgvector', 'Architecture'],
    contentSample: 'Section 4.2: The TiA platform utilizes hybrid vector and BM25 search over PostgreSQL to correlate incoming unstructured vendor invoices with existing purchase order line items. In multi-tenant deployments, strict tenant_id isolation is enforced at the database layer...'
  },
  {
    id: 'doc-gateway-edi',
    title: 'Tangentia_Gateway_EDI_Cloud_Modernization_Spec.docx',
    type: 'DOCX Architecture Spec',
    chunksCount: 92,
    lastUpdated: '2 days ago',
    status: 'Indexed',
    summary: 'Cloud modernization strategy for Tangentia Gateway B2B Integration platform. Migrating legacy monolithic EDI ANSI X12 (850, 856, 810, 820) and UN/EDIFACT parsers into event-driven containerized microservices on Apache Kafka and Azure Kubernetes.',
    matchedTech: 'Apache Kafka 3.9, FastAPI Streamable MCP',
    relevancePct: 93,
    size: '2.6 MB',
    tags: ['B2B EDI', 'Kafka', 'Supply Chain', 'Azure', 'Microservices'],
    contentSample: 'Tangentia Gateway processes over 14 million monthly supply chain transactions across automotive, retail, and manufacturing partners. Moving to Apache Kafka 3.9 Tiered Storage enables 7-year audit retention with 68% lower storage footprint...'
  },
  {
    id: 'doc-security-governance',
    title: 'Tangentia_Global_Security_&_Data_Governance_Policy.pdf',
    type: 'PDF Governance & Compliance',
    chunksCount: 76,
    lastUpdated: '5 days ago',
    status: 'Indexed',
    summary: 'Enterprise data classification, row-level security (RLS) enforcement, prompt firewall mandates, and zero-data-retention compliance policies for all Tangentia generative AI customer-facing endpoints.',
    matchedTech: 'Llama-Guard-3-8B Prompt Firewall',
    relevancePct: 89,
    size: '1.9 MB',
    tags: ['Security', 'Governance', 'SOC2', 'Prompt Firewall', 'Compliance'],
    contentSample: 'Policy AI-702: All prompts entering Tangentia-hosted LLM inference pipelines must pass through automated toxicity and prompt-injection inspection layers prior to context synthesis...'
  },
  {
    id: 'doc-client-rfp-auto',
    title: 'Client_RFP_Automotive_SupplyChain_AI_Agent_Spec.md',
    type: 'Markdown RFP Specification',
    chunksCount: 54,
    lastUpdated: 'Yesterday',
    status: 'Indexed',
    summary: 'Tier-1 Global Automotive Supplier RFP requirements for automated ASN (Advanced Shipping Notice) 856 anomaly resolution, bill of lading OCR reconciliation, and ERP automated writeback.',
    matchedTech: 'DeepSeek-R1-Distill-Qwen-32B, UiPath Hybrid',
    relevancePct: 96,
    size: '480 KB',
    tags: ['Client RFP', 'Automotive', 'EDI 856', 'Reasoning LLM', 'High Priority'],
    contentSample: 'Client mandates sub-5 second resolution on shipment discrepancy notices with automated reconciliation against ERP delivery schedules. Solution must provide transparent reasoning traces and 99.5% accuracy...'
  }
];

export const defaultSkillGaps: SkillGap[] = [
  {
    id: 'gap-hnsw',
    skillName: 'HNSW Graph Tuning & Iterative Index Scans',
    category: 'Vector & RAG Architecture',
    severity: 'Critical',
    requiredLevel: 'Level 4 (Advanced)',
    currentLevel: 'Level 2 (Foundational)',
    headcountDeficit: 8,
    affectedProjects: ['Tangentia TiA Cognitive Search', 'Gateway EDI Exception RAG'],
    suggestedAction: 'Complete pgvector 0.8.0 Iterative Scan laboratory & hands-on challenge in Upskilling Studio',
    relevanceScore: 98
  },
  {
    id: 'gap-langgraph',
    skillName: 'LangGraph Decision Graph & RPA Orchestration',
    category: 'Intelligent Automation',
    severity: 'Critical',
    requiredLevel: 'Level 4 (Advanced)',
    currentLevel: 'Level 2 (Foundational)',
    headcountDeficit: 12,
    affectedProjects: ['Automotive Supplier RFP', 'TiA Core Platform 2026'],
    suggestedAction: 'Enroll senior RPA developers in Tangentia Hybrid Agent-RPA Pathway',
    relevanceScore: 96
  },
  {
    id: 'gap-kafka',
    skillName: 'Apache Kafka 3.9 Tiered Storage & Event Streaming',
    category: 'Cloud & B2B Data Engineering',
    severity: 'High',
    requiredLevel: 'Level 3 (Proficient)',
    currentLevel: 'Level 2 (Foundational)',
    headcountDeficit: 5,
    affectedProjects: ['Tangentia Gateway Cloud Migration'],
    suggestedAction: 'Complete Tiered Storage configuration and benchmark review',
    relevanceScore: 91
  },
  {
    id: 'gap-prompt-security',
    skillName: 'Prompt Injection Defense & Llama-Guard Sidecar',
    category: 'Security & Enterprise AI Governance',
    severity: 'Moderate',
    requiredLevel: 'Level 3 (Proficient)',
    currentLevel: 'Level 2 (Foundational)',
    headcountDeficit: 6,
    affectedProjects: ['Client Portal Security Audit', 'Tangentia TiA Web UI'],
    suggestedAction: 'Implement automated firewall integration into FastAPI middleware',
    relevanceScore: 88
  }
];

export const defaultEmployees: Employee[] = [
  {
    id: 'emp-ananya',
    name: 'Ananya Deshmukh',
    role: 'Principal AI Solutions Architect',
    department: 'Intelligent Automation (TiA)',
    avatarText: 'AD',
    readinessScore: 92,
    activePath: 'pgvector 0.8 & Advanced RAG Optimizations',
    competencies: [
      { name: 'pgvector & RAG', level: 90 },
      { name: 'Python FastAPI', level: 95 },
      { name: 'LangGraph Agents', level: 88 },
      { name: 'Enterprise EDI', level: 82 }
    ],
    targetSkills: ['Iterative HNSW Tuning', 'DeepSeek-R1 Distill Optimization'],
    status: 'In Training'
  },
  {
    id: 'emp-rohan',
    name: 'Rohan Kulkarni',
    role: 'Senior RPA & Automation Engineer',
    department: 'Intelligent Automation (TiA)',
    avatarText: 'RK',
    readinessScore: 78,
    activePath: 'LangGraph & UiPath Hybrid Decision Systems',
    competencies: [
      { name: 'UiPath Orchestrator', level: 96 },
      { name: 'Automation Anywhere', level: 88 },
      { name: 'Python Automation', level: 75 },
      { name: 'LangGraph Agents', level: 60 }
    ],
    targetSkills: ['LangGraph State Machines', 'LLM Exception Handling'],
    status: 'In Training'
  },
  {
    id: 'emp-meera',
    name: 'Meera Nair',
    role: 'Lead Cloud Data Engineer & B2B Architect',
    department: 'Tangentia Gateway & Integration',
    avatarText: 'MN',
    readinessScore: 86,
    activePath: 'Kafka 3.9 Tiered Storage & Streaming',
    competencies: [
      { name: 'Apache Kafka', level: 92 },
      { name: 'EDI ANSI X12/EDIFACT', level: 98 },
      { name: 'PostgreSQL RDS', level: 85 },
      { name: 'Docker & Kubernetes', level: 80 }
    ],
    targetSkills: ['Kafka Tiered Storage', 'pgvector Index Maintenance'],
    status: 'In Training'
  },
  {
    id: 'emp-vikram',
    name: 'Vikramaditya Rao',
    role: 'Full Stack AI Engineer',
    department: 'Platform Engineering',
    avatarText: 'VR',
    readinessScore: 84,
    activePath: 'FastAPI MCP Adapters & Real-Time SSE',
    competencies: [
      { name: 'React & TypeScript', level: 94 },
      { name: 'Python FastAPI', level: 90 },
      { name: 'PostgreSQL', level: 82 },
      { name: 'Model Context Protocol', level: 72 }
    ],
    targetSkills: ['MCP Tool Transport', 'Prompt Guardrail Sidecars'],
    status: 'Assigned'
  },
  {
    id: 'emp-priya',
    name: 'Priya Sundaram',
    role: 'Supply Chain Integration Specialist',
    department: 'Client Solutions & Logistics',
    avatarText: 'PS',
    readinessScore: 80,
    activePath: 'Reasoning Models for EDI Exception Auditing',
    competencies: [
      { name: 'Supply Chain Logistics', level: 95 },
      { name: 'SAP S/4HANA EDI', level: 92 },
      { name: 'Prompt Engineering', level: 70 },
      { name: 'RAG Search Tools', level: 68 }
    ],
    targetSkills: ['DeepSeek-R1 Prompting', 'TiA Exception UI'],
    status: 'In Training'
  },
  {
    id: 'emp-kavita',
    name: 'Kavita Joshi',
    role: 'VP Engineering Enablement & L&D',
    department: 'Workforce Enablement',
    avatarText: 'KJ',
    readinessScore: 95,
    activePath: 'Enterprise Skills Taxonomy & Readiness',
    competencies: [
      { name: 'Skills Architecture', level: 98 },
      { name: 'Engineering Upskilling', level: 95 },
      { name: 'Technical Governance', level: 90 }
    ],
    targetSkills: ['AI-Driven Competency Reassessment'],
    status: 'Certified'
  }
];

export const defaultLearningModules: LearningModule[] = [
  {
    id: 'mod-hnsw-fix',
    title: 'Fix Filtered HNSW Recall Drop in Multi-Tenant Queries',
    topic: 'pgvector 0.8.0 & PostgreSQL Index Internals',
    difficulty: 'Advanced',
    durationMinutes: 35,
    xpReward: 350,
    challengeTitle: 'Tangentia TiA Multi-Tenant Vector Query Recall Optimization',
    challengeDescription: `In Tangentia TiA, corporate clients share a PostgreSQL database where embeddings are partitioned using a WHERE tenant_id = '...' clause.
On pgvector 0.7, approximate HNSW index scans frequently returned fewer rows than LIMIT 5 because post-filtering discarded candidates.

Your mission: Modify the SQL session configuration and index query to activate pgvector 0.8.0's iterative scan engine with strict recall guarantees and appropriate max scan bounds.`,
    starterCode: `-- Tangentia TiA Enterprise Vector Search
-- Fix the recall drop by configuring pgvector 0.8 iterative scan parameters

-- TODO: 1. Enable iterative scan in 'strict_order' mode
-- SET hnsw.iterative_scan = ...;

-- TODO: 2. Increase max scan tuples frontier to at least 15000
-- SET hnsw.max_scan_tuples = ...;

SELECT 
    doc_id, 
    chunk_title, 
    1 - (embedding <=> '[0.042, -0.015, 0.089, ...]'::vector) AS cosine_similarity
FROM tangentia_enterprise_documents
WHERE tenant_id = 'tangentia_corp_client_04'
  AND status = 'Indexed'
ORDER BY embedding <=> '[0.042, -0.015, 0.089, ...]'::vector
LIMIT 5;`,
    solutionHint: `Add:
SET hnsw.iterative_scan = 'strict_order';
SET hnsw.max_scan_tuples = 20000;
before the query to instruct PostgreSQL's HNSW graph walker to continue traversing until 5 filtered tuples match.`,
    expectedOutput: `Success! Execution Plan:
-> Index Scan using idx_tangentia_docs_hnsw on tangentia_enterprise_documents
   HNSW Iterative Scan: strict_order
   Filter: (tenant_id = 'tangentia_corp_client_04' AND status = 'Indexed')
   Tuples scanned: 3,142 / Max scan bounds: 20,000
   Rows returned: 5 (Recall: 100.0%)
   Execution Time: 4.12 ms`,
    mentorPrompt: "I am your AI Coding Mentor for Tangentia Engineering. How can I help you understand HNSW iterative scan internals or graph traversal?",
    mentorSuggestions: [
      "Why does post-filtering cause recall drop in HNSW?",
      "What is the difference between strict_order and relaxed_order in pgvector 0.8?",
      "How do we monitor HNSW memory usage in production RDS?"
    ]
  },
  {
    id: 'mod-langgraph-rpa',
    title: 'Hybrid LangGraph & UiPath Exception Orchestration',
    topic: 'Intelligent Automation & Agentic State Graphs',
    difficulty: 'Intermediate',
    durationMinutes: 45,
    xpReward: 400,
    challengeTitle: 'Automate Automotive EDI 856 Discrepancy Resolution',
    challengeDescription: `Construct a conditional LangGraph router that inspects ASN 856 quantity mismatches. If the variance is under 2%, automatically approve and trigger the UiPath SAP Bot. If the variance exceeds 2%, route to human review.`,
    starterCode: `from langgraph.graph import StateGraph, END

def check_discrepancy_variance(state):
    po_qty = state["po_quantity"]
    asn_qty = state["asn_quantity"]
    variance_pct = abs(po_qty - asn_qty) / po_qty * 100
    state["variance_pct"] = variance_pct
    return state

def should_auto_commit(state):
    # TODO: Route to 'uipath_sap_bot' if variance_pct <= 2.0 else 'human_review'
    pass`,
    solutionHint: `In should_auto_commit(state): check state["variance_pct"] <= 2.0 and return "uipath_sap_bot" if True else "human_review".`,
    expectedOutput: `LangGraph Graph Compiled:
[check_discrepancy] --> [conditional_router]
   |-- (<= 2%) --> [uipath_sap_bot] --> [END]
   '-- (> 2%)  --> [human_review_station] --> [END]
Test Run passed: ASN 856 with 1.4% variance successfully routed to UiPath SAP bot!`,
    mentorPrompt: "I am your Intelligent Automation AI Mentor. Ask me anything about connecting UiPath Orchestrator with LangGraph state graphs.",
    mentorSuggestions: [
      "How do we handle idempotency in UiPath webhook callbacks?",
      "What is the recommended checkpoint persistence for LangGraph in production?",
      "Can we stream agent intermediate thoughts to the user interface?"
    ]
  }
];

export const defaultAdoptionComparisons: AdoptionComparison[] = [
  {
    id: 'comp-vector-db',
    title: 'Enterprise Vector Storage: pgvector 0.8 vs Pinecone Serverless vs Milvus',
    category: 'Database & Retrieval Infrastructure',
    status: 'Recommended',
    options: [
      {
        name: 'pgvector 0.8.0 (PostgreSQL)',
        vendor: 'Open Source / AWS RDS / Azure Flexible',
        license: 'PostgreSQL License (Permissive)',
        tcoMonthly: '$0 added infrastructure (uses existing RDS cluster)',
        latencyMs: '4.2 ms (Iterative HNSW scan)',
        compatibilityScore: 98,
        securityScore: 96,
        tangentiaFit: 'Exceptional. Tangentia TiA and Gateway already run on PostgreSQL. Zero data movement or dual-write headaches.',
        pros: [
          'ACID transactional guarantees alongside business data',
          'Iterative scan solves previous tenant recall drop',
          'Full SQL join support between vectors and customer tables',
          'Zero extra licensing cost'
        ],
        cons: [
          'Requires proper maintenance of shared_buffers and maintenance_work_mem',
          'Scaling beyond 50M 1536-dim vectors requires read-replicas'
        ]
      },
      {
        name: 'Pinecone Serverless',
        vendor: 'Pinecone Systems Inc.',
        license: 'Proprietary SaaS',
        tcoMonthly: '~$1,850/month base + read units',
        latencyMs: '18.5 ms (Network round-trip to SaaS)',
        compatibilityScore: 76,
        securityScore: 82,
        tangentiaFit: 'Moderate. Requires sending embeddings outside corporate VPC. Dual-write synchronization needed with PostgreSQL.',
        pros: [
          'Fully managed serverless indexing',
          'Built-in metadata filtering out of the box'
        ],
        cons: [
          'Monthly recurring SaaS bill',
          'Higher network latency',
          'Fails banking client data residency requirements'
        ]
      },
      {
        name: 'Milvus Distributed Cluster',
        vendor: 'Zilliz / LF AI & Data',
        license: 'Apache 2.0',
        tcoMonthly: '~$1,200/month (Kubernetes worker nodes + etcd + Pulsar/Kafka)',
        latencyMs: '6.8 ms',
        compatibilityScore: 80,
        securityScore: 88,
        tangentiaFit: 'Overkill for current 4.5M chunk dataset. Adds high operational complexity.',
        pros: [
          'Handles billion-scale vectors',
          'High throughput distributed partitioning'
        ],
        cons: [
          'Substantial DevOps overhead (etcd, MinIO, Pulsar dependencies)',
          'Complex failover and cluster management'
        ]
      }
    ],
    verdict: 'Adopt pgvector 0.8.0 on Existing RDS Aurora/Azure Clusters',
    recommendationReason: 'pgvector 0.8 iterative scan completely resolves the multi-tenant recall drop while preserving ACID guarantees and saving Tangentia over $22,000 annually compared to standalone SaaS vector databases.'
  },
  {
    id: 'comp-reasoning-llm',
    title: 'Enterprise Document Reasoning: DeepSeek-R1-Distill-32B vs Azure OpenAI GPT-4o vs Gemini 1.5 Pro',
    category: 'Generative AI & Reasoning Models',
    status: 'Evaluating',
    options: [
      {
        name: 'DeepSeek-R1-Distill-Qwen-32B',
        vendor: 'Self-Hosted on Tangentia GPU Cluster / vLLM',
        license: 'MIT License',
        tcoMonthly: '~$640/month (1x 8-GPU node spot/reserved)',
        latencyMs: '42 ms/token (Self-hosted AWQ)',
        compatibilityScore: 92,
        securityScore: 99,
        tangentiaFit: 'High fit for air-gapped banking and automotive EDI clients requiring 100% data residency.',
        pros: [
          '100% on-premise execution with zero third-party telemetry',
          'Chain-of-thought verification for complex PO line deductions',
          'MIT license allows commercial embedding in Tangentia TiA'
        ],
        cons: [
          'Requires GPU infrastructure management',
          'Inference throughput scales with available VRAM'
        ]
      },
      {
        name: 'Azure OpenAI GPT-4o',
        vendor: 'Microsoft Azure',
        license: 'Commercial SaaS',
        tcoMonthly: '~$3,400/month based on 12M monthly tokens',
        latencyMs: '28 ms/token',
        compatibilityScore: 94,
        securityScore: 91,
        tangentiaFit: 'Great general purpose model for non-confidential client workflows.',
        pros: [
          'Industry standard performance',
          'Managed SLA and vision capabilities'
        ],
        cons: [
          'Higher variable cost at scale',
          'Certain government & defense clients reject public cloud hosting'
        ]
      },
      {
        name: 'Google Gemini 1.5 Pro',
        vendor: 'Google Cloud Platform',
        license: 'Commercial API',
        tcoMonthly: '~$2,200/month based on token volume',
        latencyMs: '25 ms/token',
        compatibilityScore: 95,
        securityScore: 93,
        tangentiaFit: 'Best for 2M token context window documents (multi-hundred page RFPs & manuals).',
        pros: [
          'Massive 2M token context window allows ingesting entire ERP specs at once',
          'Fast structured JSON outputs'
        ],
        cons: [
          'Requires external API connectivity'
        ]
      }
    ],
    verdict: 'Hybrid Strategy: DeepSeek-R1 for On-Premise Clients + Gemini 1.5 for Mega-Document RFP Parsing',
    recommendationReason: 'Provides Tangentia with sovereign AI credentials for restricted enterprise clients while leveraging Gemini 1.5 Pro for immense multi-megabyte document analysis.'
  }
];

export const defaultDigestPreferences: DigestPreferences = {
  frequency: 'Weekly',
  deliveryDay: 'Monday 09:00 AM',
  channels: {
    email: true,
    slack: true,
    webhook: false
  },
  filterLevel: 'High Impact Only',
  activeRolePreview: 'Staff Platform Architect'
};
