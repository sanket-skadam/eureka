import React, { useState } from 'react';
import { useEureka } from '../../../contexts/EurekaContext';
import {
  Mail,
  Send,
  CheckCircle2,
  Calendar,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Filter,
  Eye,
  Sliders,
  Bell
} from 'lucide-react';

export const WeeklyDigestPage: React.FC = () => {
  const { state, updateDigestPreferences, logApiCall } = useEureka();

  const [selectedRole, setSelectedRole] = useState(
    state.digestPreferences.activeRolePreview || 'Staff Platform Architect'
  );
  const [sentToast, setSentToast] = useState(false);
  const [emailModalOpen, setEmailModalOpen] = useState(false);

  const roles = [
    'Staff Platform Architect',
    'Senior RPA Engineer (TiA)',
    'Lead Cloud & B2B Architect',
    'Full Stack AI Engineer'
  ];

  const handleSendTestEmail = () => {
    logApiCall(
      'POST',
      '/api/v1/digest/dispatch/test',
      200,
      320,
      `Dispatched preview digest #48 to ananya.d@tangentia.com`
    );
    setSentToast(true);
    setTimeout(() => setSentToast(false), 3500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mint border border-ink text-xs font-semibold text-forest mb-2 shadow-sketch-sm">
            <Mail className="w-3.5 h-3.5 text-forest" />
            <span>Curated Intelligence Brief</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl text-forest tracking-tight">
            Weekly Technology Digest
          </h1>
          <p className="text-sm text-ink-secondary max-w-2xl mt-1.5 font-medium leading-relaxed">
            Automated intelligence brief delivered every Monday morning, tailored specifically to each
            Tangentia engineer's active project assignments and technical competencies.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setEmailModalOpen(true)}
            className="btn-sketch text-xs shadow-sketch-sm"
          >
            <Eye className="w-4 h-4" /> Preview Email Template
          </button>
          <button
            onClick={handleSendTestEmail}
            className="btn-primary shadow-sketch text-xs"
          >
            <Send className="w-4 h-4 text-emerald" />
            {sentToast ? 'Digest Dispatched!' : 'Send Test Brief'}
          </button>
        </div>
      </div>

      {/* Role Personalization Selector */}
      <div className="sketch-card p-4 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-ink-muted" />
          <span className="text-xs font-bold text-ink">Previewing Digest For Role:</span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {roles.map((r) => (
            <button
              key={r}
              onClick={() => setSelectedRole(r)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedRole === r
                  ? 'bg-forest text-white border-1.5 border-ink shadow-sketch-sm'
                  : 'bg-tinted text-ink border border-ink/20 hover:border-ink'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Issue Canvas (#48) */}
      <div className="sketch-card p-6 sm:p-8 bg-surface border-2 border-ink space-y-8">
        {/* Newsletter Header */}
        <div className="pb-6 border-b-2 border-ink flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-forest font-bold mb-1">
              <span>Issue #48</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> Monday Edition
              </span>
              <span>•</span>
              <span className="bg-mint px-2 py-0.5 rounded text-forest">Tangentia Global</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl text-forest">
              Eureka Weekly Tech Brief
            </h2>
            <p className="text-xs text-ink-secondary mt-1">
              Prepared for <strong className="text-ink">Ananya Deshmukh</strong> • Tailored to Tangentia TiA & B2B Integration
            </p>
          </div>

          <span className="font-mono text-xs font-bold text-emerald-dark bg-mint px-3 py-1 rounded-full border border-forest/20 self-start sm:self-auto">
            100% Curated & Verified
          </span>
        </div>

        {/* Featured Story: pgvector 0.8.0 */}
        <div className="p-6 rounded-3xl bg-mint/40 border-2 border-forest space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-full bg-forest text-white">
              #1 Top Development This Week
            </span>
            <span className="font-mono text-xs font-bold text-emerald-dark">
              98% Tangentia Relevance
            </span>
          </div>

          <div>
            <h3 className="font-display text-3xl text-forest mb-1.5">
              pgvector 0.8.0: Iterative HNSW Index Scans & Parallel Builds
            </h3>
            <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
              Solves the long-standing multi-tenant vector recall drop in PostgreSQL. Eliminates the need
              for Tangentia to migrate client data out of RDS Aurora to expensive standalone SaaS vector databases.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-white border border-forest/30">
              <span className="font-bold text-forest block mb-0.5">Why it matters to Tangentia:</span>
              <p className="text-ink-secondary text-[11px]">
                Tangentia TiA customer exception queries now achieve 100% top-K recall without dropping rows.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-white border border-forest/30">
              <span className="font-bold text-forest block mb-0.5">Action Assigned:</span>
              <p className="text-ink-secondary text-[11px]">
                8 Tangentia architects enrolled in Upskilling Studio interactive optimization challenge.
              </p>
            </div>
          </div>
        </div>

        {/* Secondary Stories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {state.technologies.slice(1, 3).map((tech) => (
            <div
              key={tech.id}
              className="p-5 rounded-2xl bg-white border border-ink shadow-sketch-sm space-y-3"
            >
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-forest bg-tinted px-2 py-0.5 rounded border border-ink/20">
                  {tech.domain}
                </span>
                <span className="text-emerald-dark font-bold">{tech.relevanceScore}% fit</span>
              </div>

              <h4 className="font-display text-2xl text-forest">{tech.name}</h4>
              <p className="text-xs text-ink-secondary leading-relaxed line-clamp-2">
                {tech.tagline}
              </p>

              <div className="pt-2 border-t border-borderLight flex items-center justify-between text-xs">
                <span className="font-mono text-[11px] text-ink-muted">{tech.source}</span>
                <span className="font-semibold text-forest text-[11px]">{tech.companyImpact.affectedSystem}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delivery Schedule & Notification Preferences */}
      <div className="sketch-card p-6 bg-white border-2 border-ink space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-borderLight">
          <Sliders className="w-5 h-5 text-forest" />
          <h3 className="font-display text-2xl text-forest">Delivery & Notification Preferences</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-tinted border border-borderLight space-y-2">
            <span className="font-mono text-ink-muted text-[11px] uppercase font-bold block">
              Frequency
            </span>
            <p className="font-bold text-ink">Every Monday at 09:00 AM</p>
            <p className="text-[11px] text-ink-secondary">Synchronized with sprint planning</p>
          </div>

          <div className="p-4 rounded-2xl bg-tinted border border-borderLight space-y-2">
            <span className="font-mono text-ink-muted text-[11px] uppercase font-bold block">
              Active Channels
            </span>
            <div className="flex flex-col gap-1 text-[11px] font-semibold text-forest">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald" /> Corporate Email (ananya.d@tangentia.com)
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald" /> Slack #tangentia-tech-intel
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-tinted border border-borderLight space-y-2">
            <span className="font-mono text-ink-muted text-[11px] uppercase font-bold block">
              Filter Threshold
            </span>
            <p className="font-bold text-ink">High Impact Only (&gt;85% Fit)</p>
            <p className="text-[11px] text-ink-secondary">Filters out irrelevant framework noise</p>
          </div>
        </div>
      </div>

      {/* Email Preview Modal */}
      {emailModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-ink/50 backdrop-blur-xs"
            onClick={() => setEmailModalOpen(false)}
          />
          <div className="relative w-full max-w-2xl bg-white border-2 border-ink rounded-3xl shadow-sketch-lg p-6 z-10 max-h-[85vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-borderLight">
              <div className="font-mono text-xs font-bold text-forest">
                Template Preview: Resend HTML Transactional Digest
              </div>
              <button
                onClick={() => setEmailModalOpen(false)}
                className="btn-sketch text-xs py-1 px-2.5"
              >
                Close
              </button>
            </div>

            <div className="p-5 rounded-2xl bg-canvas border border-borderLight font-sans text-xs space-y-4 text-ink">
              <div className="border-b border-borderLight pb-3">
                <p><strong>From:</strong> digest@eureka.tangentia.com</p>
                <p><strong>To:</strong> ananya.d@tangentia.com</p>
                <p><strong>Subject:</strong> [Eureka Intel #48] pgvector 0.8 & DeepSeek-R1 for Tangentia TiA</p>
              </div>

              <div className="space-y-3">
                <h3 className="font-display text-2xl text-forest">Good Monday morning, Ananya.</h3>
                <p>Here is your personalized technology intelligence brief for Week 48.</p>
                <div className="p-3 bg-white rounded-xl border border-ink/20">
                  <p className="font-bold text-forest">1. pgvector 0.8.0 Released</p>
                  <p className="text-ink-secondary text-[11px] mt-1">
                    Adds iterative HNSW scans, resolving the multi-tenant recall drop in Tangentia TiA exception search.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
