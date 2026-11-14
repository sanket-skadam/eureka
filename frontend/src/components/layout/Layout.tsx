import React from 'react';
import { useEureka } from '../../contexts/EurekaContext';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { TelemetryDrawer } from './TelemetryDrawer';
import { PipelineModal } from '../common/PipelineModal';
import { TechDetailModal } from '../../features/technology/components/TechDetailModal';

import { DashboardPage } from '../../features/dashboard/pages/DashboardPage';
import { TechHubPage } from '../../features/technology/pages/TechHubPage';
import { EnterpriseRagPage } from '../../features/enterprise/pages/EnterpriseRagPage';
import { SkillIntelligencePage } from '../../features/skills/pages/SkillIntelligencePage';
import { UpskillingStudioPage } from '../../features/learning/pages/UpskillingStudioPage';
import { AdoptionAdvisorPage } from '../../features/adoption/pages/AdoptionAdvisorPage';
import { WeeklyDigestPage } from '../../features/digest/pages/WeeklyDigestPage';

export const Layout: React.FC = () => {
  const { activeView } = useEureka();

  const renderActivePage = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardPage />;
      case 'tech-hub':
        return <TechHubPage />;
      case 'enterprise-rag':
        return <EnterpriseRagPage />;
      case 'skill-intelligence':
        return <SkillIntelligencePage />;
      case 'upskilling-studio':
        return <UpskillingStudioPage />;
      case 'adoption-advisor':
        return <AdoptionAdvisorPage />;
      case 'weekly-digest':
        return <WeeklyDigestPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-canvas text-ink antialiased">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top Header & Telemetry */}
        <Header />

        {/* Dynamic Page Canvas */}
        <main className="flex-1 max-w-[1360px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
          {renderActivePage()}
        </main>
      </div>

      {/* Global Modals & Telemetry Drawer */}
      <PipelineModal />
      <TechDetailModal />
      <TelemetryDrawer />
    </div>
  );
};

