import React from 'react';
import { ShieldAlert, Download, Lock } from 'lucide-react';
import { SystemStatus } from '../types';

interface TopBarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  systemStatus: SystemStatus;
  pendingRequestsCount: number;
  onEmergencyLockdown: () => void;
  onExportCertificate: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  activeTab,
  setActiveTab,
  systemStatus,
  pendingRequestsCount,
  onEmergencyLockdown,
  onExportCertificate,
}) => {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950 text-neutral-100">
      {/* Zone 1: Single text element wordmark */}
      <div className="flex items-center gap-3">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setActiveTab('overview');
          }}
          className="text-lg font-semibold tracking-tight text-neutral-100 hover:text-white transition-colors"
        >
          Sovereign Human Rights & Anti-Theft Console
        </a>
      </div>

      {/* Zone 2: 4-6 clean text navigation links */}
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-400">
        <button
          onClick={() => setActiveTab('overview')}
          className={`hover:text-neutral-100 transition-colors ${
            activeTab === 'overview' ? 'text-neutral-100 font-semibold' : ''
          }`}
        >
          Overview & Rules
        </button>
        <button
          onClick={() => setActiveTab('approval-desk')}
          className={`relative hover:text-neutral-100 transition-colors ${
            activeTab === 'approval-desk' ? 'text-neutral-100 font-semibold' : ''
          }`}
        >
          Human Approval Desk
          {pendingRequestsCount > 0 && (
            <span className="ml-2 px-1.5 py-0.2 bg-amber-500/20 text-amber-300 text-xs rounded border border-amber-500/30">
              {pendingRequestsCount}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('active-grants')}
          className={`hover:text-neutral-100 transition-colors ${
            activeTab === 'active-grants' ? 'text-neutral-100 font-semibold' : ''
          }`}
        >
          Active Grants
        </button>
        <button
          onClick={() => setActiveTab('audit-ledger')}
          className={`hover:text-neutral-100 transition-colors ${
            activeTab === 'audit-ledger' ? 'text-neutral-100 font-semibold' : ''
          }`}
        >
          Provenance Ledger
        </button>
        <button
          onClick={() => setActiveTab('security-simulator')}
          className={`hover:text-neutral-100 transition-colors ${
            activeTab === 'security-simulator' ? 'text-neutral-100 font-semibold' : ''
          }`}
        >
          Defense Simulator
        </button>
        <button
          onClick={() => setActiveTab('legal-charter')}
          className={`hover:text-neutral-100 transition-colors ${
            activeTab === 'legal-charter' ? 'text-neutral-100 font-semibold' : ''
          }`}
        >
          UN & Ethics Matrix
        </button>
      </nav>

      {/* Zone 3: 1-2 primary actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={onExportCertificate}
          className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-neutral-300 bg-neutral-900 border border-neutral-700 rounded-md hover:bg-neutral-800 hover:text-white transition-colors"
          title="Export official signed declaration of ownership & anti-theft compliance"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Certificate</span>
        </button>

        {systemStatus === 'EMERGENCY_LOCKDOWN' ? (
          <button
            onClick={onEmergencyLockdown}
            className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-rose-100 bg-rose-900/80 border border-rose-600 rounded-md animate-pulse hover:bg-rose-800 transition-colors"
          >
            <Lock className="w-3.5 h-3.5 text-rose-300" />
            <span>LOCKDOWN ACTIVE</span>
          </button>
        ) : (
          <button
            onClick={onEmergencyLockdown}
            className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-white bg-rose-600 hover:bg-rose-700 rounded-md transition-colors shadow-sm"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Emergency Kill Switch</span>
          </button>
        )}
      </div>
    </header>
  );
};
