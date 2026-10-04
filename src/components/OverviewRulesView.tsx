import React from 'react';
import { ShieldCheck, ShieldAlert, Lock, User, FileText, Ban, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { PROJECT_OWNER, PROJECT_NAME, REPO_BRANCH_PROTECTION } from '../data/initialData';
import { StopConditionVisualizer } from './StopConditionVisualizer';
import { AuditEvent, SystemStatus } from '../types';

interface OverviewRulesViewProps {
  systemStatus: SystemStatus;
  activeGrantsCount: number;
  pendingRequestsCount: number;
  totalAuditCount: number;
  blockedCount: number;
  lastEvent?: AuditEvent;
  onNavigateTab: (tab: string) => void;
  onSimulateTest: () => void;
}

export const OverviewRulesView: React.FC<OverviewRulesViewProps> = ({
  systemStatus,
  activeGrantsCount,
  pendingRequestsCount,
  totalAuditCount,
  blockedCount,
  lastEvent,
  onNavigateTab,
  onSimulateTest,
}) => {
  const prohibitions = [
    'Access project files or private repositories autonomously',
    'Copy, scrape, or extract proprietary project material',
    'Transmit project material externally to third-party models or cloud buckets',
    'Modify or delete project code, configurations, or branches',
    'Reproduce proprietary or confidential project content without license',
    'Remove attribution, author metadata, or provenance records',
    'Claim ownership, co-authorship, or copyright generation rights',
    'Grant itself elevated permissions or self-delegate authorization',
    'Bypass access controls or forge secondary credentials',
    'Proxy through secondary agents or services to circumvent restrictions',
  ];

  const protections = [
    { title: 'Least-Privilege Access', desc: 'Granular file-level isolation. Zero ambient broad privileges.' },
    { title: 'Deny-By-Default Enforcer', desc: 'Every inbound interaction is rejected until explicitly authorized.' },
    { title: 'Isolated Secrets', desc: 'Credentials kept offline, never exposed to AI runtime contexts.' },
    { title: 'Repository Branch Protection', desc: REPO_BRANCH_PROTECTION },
    { title: 'Immutable Provenance Ledger', desc: 'SHA-256 hash chaining of every attempted interaction.' },
    { title: 'Immediate Revocation', desc: 'Instantaneous credential expiry when purpose completes.' },
  ];

  return (
    <div className="space-y-6">
      {/* Hero Banner with Executive Ownership */}
      <div className="border border-neutral-800 rounded-lg p-6 bg-gradient-to-b from-neutral-900/90 to-neutral-900/40">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>PROTECTION PROTOCOL ENFORCED BY SOVEREIGN KERNEL</span>
            </div>
            <h1 className="text-2xl font-bold text-neutral-100 tracking-tight">
              Anti-Theft & Zero-Unauthorized-Access Governance
            </h1>
            <p className="text-sm text-neutral-300 max-w-2xl leading-relaxed">
              Project Owner: <strong className="text-neutral-100 font-semibold">{PROJECT_OWNER}</strong>.
              Unauthorized copying, extraction, disclosure, transfer, reuse, modification, or appropriation of project materials is strictly prohibited under international law and human-rights treaties.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-neutral-950/70 border border-neutral-800 rounded-lg">
              <span className="text-neutral-500 font-mono text-[10px] block">SYSTEM STATUS</span>
              <span className="font-semibold text-emerald-400 mt-0.5 block">{systemStatus}</span>
            </div>
            <div className="p-3 bg-neutral-950/70 border border-neutral-800 rounded-lg">
              <span className="text-neutral-500 font-mono text-[10px] block">ACTIVE GRANTS</span>
              <span className="font-semibold text-neutral-100 font-mono tabular-nums mt-0.5 block">
                {activeGrantsCount}
              </span>
            </div>
            <div className="p-3 bg-neutral-950/70 border border-neutral-800 rounded-lg">
              <span className="text-neutral-500 font-mono text-[10px] block">BLOCKED ATTEMPTS</span>
              <span className="font-semibold text-rose-400 font-mono tabular-nums mt-0.5 block">
                {blockedCount}
              </span>
            </div>
            <div className="p-3 bg-neutral-950/70 border border-neutral-800 rounded-lg">
              <span className="text-neutral-500 font-mono text-[10px] block">AUDIT ENTRIES</span>
              <span className="font-semibold text-indigo-400 font-mono tabular-nums mt-0.5 block">
                {totalAuditCount}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stop Condition Protocol Visualizer */}
      <StopConditionVisualizer
        lastEvent={lastEvent}
        onSimulateUnauthorized={onSimulateTest}
      />

      {/* Core Principles & Prohibitions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: AI & Automated Systems Prohibitions */}
        <div className="border border-neutral-800 rounded-lg bg-neutral-900/40 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Ban className="w-4 h-4 text-rose-400" />
              <h2 className="text-base font-semibold text-neutral-100">
                Absolute Prohibitions on AI & Automated Systems
              </h2>
            </div>
            <p className="text-xs text-neutral-400 mb-4">
              No AI agent, automated agent, AI provider, plugin, integration, or third-party service may independently:
            </p>
            <ul className="space-y-2 text-xs text-neutral-300">
              {prohibitions.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="text-rose-500 font-mono text-xs mt-0.5">✕</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-neutral-800 text-[11px] text-neutral-500">
            Enforced by static kernel isolation and network sandboxing.
          </div>
        </div>

        {/* Right: Default Denial & 5 Conditions */}
        <div className="space-y-6">
          <div className="border border-neutral-800 rounded-lg bg-neutral-900/40 p-6">
            <div className="flex items-center gap-2 mb-2">
              <Lock className="w-4 h-4 text-amber-400" />
              <h2 className="text-base font-semibold text-neutral-100">
                Default Denial: Human Sovereign Gate
              </h2>
            </div>
            <div className="p-3 bg-neutral-950 border border-neutral-800 rounded-md font-mono text-xs text-amber-300 mb-4">
              NO EXPLICIT HUMAN AUTHORIZATION = NO ACCESS.
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              The project belongs under human owner control. AI is not the owner. AI has no independent permission.
              Every permission must be:
            </p>

            <ol className="mt-3 space-y-1.5 text-xs text-neutral-300 list-decimal list-inside">
              <li><strong className="text-neutral-200">Explicitly granted</strong> by {PROJECT_OWNER};</li>
              <li><strong className="text-neutral-200">Limited to a defined purpose</strong>;</li>
              <li><strong className="text-neutral-200">Limited to the minimum required scope</strong>;</li>
              <li><strong className="text-neutral-200">Revocable at any instant</strong>;</li>
              <li><strong className="text-neutral-200">Auditable</strong> in the tamper-evident ledger.</li>
            </ol>
            <p className="mt-3 text-xs text-neutral-500 italic">
              When authorization ends, access must end.
            </p>

            <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between">
              <span className="text-xs text-neutral-400">
                {pendingRequestsCount} inbound requests waiting
              </span>
              <button
                onClick={() => onNavigateTab('approval-desk')}
                className="text-xs font-medium text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1"
              >
                Go to Approval Desk <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Development Environment Protections */}
          <div className="border border-neutral-800 rounded-lg bg-neutral-900/40 p-6">
            <h3 className="text-sm font-semibold text-neutral-100 mb-3">
              Environment Protection Measures
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {protections.map((p, i) => (
                <div key={i} className="p-2.5 bg-neutral-950/60 rounded border border-neutral-800/80">
                  <div className="font-semibold text-neutral-200">{p.title}</div>
                  <div className="text-[11px] text-neutral-400 mt-0.5">{p.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
