import {
  Organization,
  Technology,
  EnterpriseDocument,
  SkillGap,
  Employee,
  LearningModule,
  AdoptionComparison,
  DigestPreferences,
  TelemetryLog
} from '../types';

import {
  defaultOrganizations,
  defaultTechnologies,
  defaultDocuments,
  defaultSkillGaps,
  defaultEmployees,
  defaultLearningModules,
  defaultAdoptionComparisons,
  defaultDigestPreferences
} from '../data/tangentiaSeed';

const STORAGE_KEY = 'eureka_tangentia_db_v1';

export interface EurekaDatabaseState {
  activeOrg: Organization;
  organizations: Organization[];
  technologies: Technology[];
  documents: EnterpriseDocument[];
  skillGaps: SkillGap[];
  employees: Employee[];
  learningModules: LearningModule[];
  adoptionComparisons: AdoptionComparison[];
  digestPreferences: DigestPreferences;
  telemetryLogs: TelemetryLog[];
}

export function getInitialState(): EurekaDatabaseState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      // Ensure organizations and activeOrg exist
      if (parsed.technologies && parsed.activeOrg) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Failed to parse stored Eureka state, loading defaults', err);
  }

  const initial: EurekaDatabaseState = {
    activeOrg: defaultOrganizations[0],
    organizations: defaultOrganizations,
    technologies: defaultTechnologies,
    documents: defaultDocuments,
    skillGaps: defaultSkillGaps,
    employees: defaultEmployees,
    learningModules: defaultLearningModules,
    adoptionComparisons: defaultAdoptionComparisons,
    digestPreferences: defaultDigestPreferences,
    telemetryLogs: [
      {
        id: 'tel-init-1',
        timestamp: new Date().toLocaleTimeString(),
        method: 'GET',
        endpoint: '/api/v1/organizations/org_tangentia_global',
        status: 200,
        durationMs: 14,
        payloadSummary: 'Loaded Tangentia Inc. workspace & RLS policies'
      },
      {
        id: 'tel-init-2',
        timestamp: new Date().toLocaleTimeString(),
        method: 'GET',
        endpoint: '/api/v1/technologies?domain=all',
        status: 200,
        durationMs: 24,
        payloadSummary: 'Fetched 6 curated enterprise technologies'
      }
    ]
  };

  saveState(initial);
  return initial;
}

export function saveState(state: EurekaDatabaseState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error('Failed to save Eureka state to localStorage', err);
  }
}

export function resetDatabase(): EurekaDatabaseState {
  localStorage.removeItem(STORAGE_KEY);
  return getInitialState();
}

export function logTelemetry(
  state: EurekaDatabaseState,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  endpoint: string,
  status: number,
  durationMs: number,
  payloadSummary: string
): EurekaDatabaseState {
  const newLog: TelemetryLog = {
    id: `tel-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    timestamp: new Date().toLocaleTimeString(),
    method,
    endpoint,
    status,
    durationMs,
    payloadSummary
  };

  const updated: EurekaDatabaseState = {
    ...state,
    telemetryLogs: [newLog, ...state.telemetryLogs.slice(0, 49)]
  };
  saveState(updated);
  return updated;
}

