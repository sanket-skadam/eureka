export type ActiveView = 
  | 'dashboard' 
  | 'tech-hub' 
  | 'enterprise-rag' 
  | 'skill-intelligence' 
  | 'upskilling-studio' 
  | 'adoption-advisor' 
  | 'weekly-digest';

export interface Organization {
  id: string;
  name: string;
  domain: string;
  tagline: string;
  industry: string;
  headquarters: string;
  techFocus: string[];
}

export interface Technology {
  id: string;
  name: string;
  tagline: string;
  domain: string;
  source: 'GitHub' | 'Hugging Face' | 'Reddit' | 'RSS' | 'Manual';
  license: string;
  noveltyScore: number;
  relevanceScore: number;
  velocity: string;
  verifiedVia: string;
  repoUrl: string;
  docsUrl: string;
  previousProblem: string;
  whatChanged: string;
  howItWorks: string;
  capabilities: string[];
  whyItMatters: string;
  codeSnippet: string;
  companyImpact: {
    affectedSystem: string;
    gapSeverity: 'Critical' | 'High' | 'Moderate' | 'Low';
    estimatedRoi: string;
    actionRequired: string;
  };
  pipelineStatus: 'Curated' | 'Validated' | 'Under Review' | 'Scouted';
}

export interface EnterpriseDocument {
  id: string;
  title: string;
  type: string;
  chunksCount: number;
  lastUpdated: string;
  status: 'Indexed' | 'Processing' | 'Failed';
  summary: string;
  matchedTech: string;
  relevancePct: number;
  size: string;
  tags: string[];
  contentSample?: string;
}

export interface SkillGap {
  id: string;
  skillName: string;
  category: string;
  severity: 'Critical' | 'High' | 'Moderate';
  requiredLevel: string;
  currentLevel: string;
  headcountDeficit: number;
  affectedProjects: string[];
  suggestedAction: string;
  relevanceScore: number;
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  avatarText: string;
  readinessScore: number;
  activePath: string;
  competencies: { name: string; level: number }[];
  targetSkills: string[];
  status: 'In Training' | 'Certified' | 'Assigned';
}

export interface LearningModule {
  id: string;
  title: string;
  topic: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  durationMinutes: number;
  xpReward: number;
  challengeTitle: string;
  challengeDescription: string;
  starterCode: string;
  solutionHint: string;
  expectedOutput: string;
  mentorPrompt: string;
  mentorSuggestions: string[];
}

export interface AdoptionOption {
  name: string;
  vendor: string;
  license: string;
  tcoMonthly: string;
  latencyMs: string;
  compatibilityScore: number; // 0-100
  securityScore: number;      // 0-100
  tangentiaFit: string;
  pros: string[];
  cons: string[];
}

export interface AdoptionComparison {
  id: string;
  title: string;
  category: string;
  status: 'Recommended' | 'Evaluating' | 'Archived';
  options: AdoptionOption[];
  verdict: string;
  recommendationReason: string;
}

export interface TelemetryLog {
  id: string;
  timestamp: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  endpoint: string;
  status: number;
  durationMs: number;
  payloadSummary: string;
}

export interface DigestPreferences {
  frequency: 'Weekly' | 'Bi-weekly';
  deliveryDay: 'Monday 09:00 AM' | 'Friday 05:00 PM';
  channels: {
    email: boolean;
    slack: boolean;
    webhook: boolean;
  };
  filterLevel: 'High Impact Only' | 'All Relevant';
  activeRolePreview: string;
}
