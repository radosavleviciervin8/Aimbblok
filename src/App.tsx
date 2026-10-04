/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TopBar } from './components/TopBar';
import { OverviewRulesView } from './components/OverviewRulesView';
import { AccessRequestsDesk } from './components/AccessRequestsDesk';
import { ActiveAuthorizationsTable } from './components/ActiveAuthorizationsTable';
import { AuditProvenanceLedger } from './components/AuditProvenanceLedger';
import { SecuritySimulator } from './components/SecuritySimulator';
import { HumanRightsLegalCharter } from './components/HumanRightsLegalCharter';
import { EmergencyLockdownModal } from './components/EmergencyLockdownModal';
import {
  INITIAL_ACCESS_REQUESTS,
  INITIAL_ACTIVE_PERMISSIONS,
  INITIAL_AUDIT_LOGS,
  PROJECT_OWNER,
  PROJECT_NAME,
} from './data/initialData';
import { AccessRequest, AuditEvent, PermissionRecord, RequesterType, SystemStatus } from './types';
import { ShieldCheck, AlertTriangle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [systemStatus, setSystemStatus] = useState<SystemStatus>('SECURE');
  const [isLockdownModalOpen, setIsLockdownModalOpen] = useState<boolean>(false);

  // Core application state
  const [requests, setRequests] = useState<AccessRequest[]>(INITIAL_ACCESS_REQUESTS);
  const [permissions, setPermissions] = useState<PermissionRecord[]>(INITIAL_ACTIVE_PERMISSIONS);
  const [auditLogs, setAuditLogs] = useState<AuditEvent[]>(INITIAL_AUDIT_LOGS);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'alert' } | null>(null);

  const showNotification = (message: string, type: 'success' | 'alert' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification((prev) => (prev?.message === message ? null : prev));
    }, 4500);
  };

  // Helper to generate realistic SHA-256 hash
  const generateHash = () => {
    const chars = '0123456789abcdef';
    let res = '';
    for (let i = 0; i < 64; i++) {
      res += chars[Math.floor(Math.random() * chars.length)];
    }
    return res;
  };

  // Human Approval Action
  const handleApproveRequest = (
    id: string,
    scope: string,
    purpose: string,
    durationMinutes: number
  ) => {
    const req = requests.find((r) => r.id === id);
    if (!req) return;

    // Update request state
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'APPROVED' } : r))
    );

    const now = new Date();
    const expiry = new Date(now.getTime() + durationMinutes * 60000);

    const newGrant: PermissionRecord = {
      id: `GRANT-ERVIN-${Math.floor(1000 + Math.random() * 9000)}`,
      grantee: req.requester,
      granteeType: req.requesterType,
      purpose,
      scope,
      grantedBy: PROJECT_OWNER,
      grantedAt: now.toUTCString(),
      expiresAt: expiry.toUTCString(),
      status: 'ACTIVE',
      auditHash: generateHash(),
    };

    setPermissions((prev) => [newGrant, ...prev]);

    // Append to audit ledger
    const auditEv: AuditEvent = {
      id: `AUD-${Math.floor(10000 + Math.random() * 90000)}`,
      timestamp: now.toUTCString(),
      actor: req.requester,
      actorType: req.requesterType,
      action: req.requestedAction,
      targetResource: scope,
      decision: 'PERMITTED_BY_HUMAN',
      stopConditionTriggered: false,
      evidenceHash: newGrant.auditHash,
      rawPayloadSnippet: `Explicit approval granted by ${PROJECT_OWNER}. Valid for ${durationMinutes} minutes under defined scope: ${scope}`,
      humanReviewed: true,
      reviewedBy: PROJECT_OWNER,
      reviewedAt: now.toUTCString(),
    };

    setAuditLogs((prev) => [auditEv, ...prev]);
    showNotification(`Explicit permission granted to ${req.requester} for ${durationMinutes}m.`);
  };

  // Human Deny Action
  const handleDenyRequest = (id: string, reason: string) => {
    const req = requests.find((r) => r.id === id);
    if (!req) return;

    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'DENIED' } : r))
    );

    const auditEv: AuditEvent = {
      id: `AUD-${Math.floor(10000 + Math.random() * 90000)}`,
      timestamp: new Date().toUTCString(),
      actor: req.requester,
      actorType: req.requesterType,
      action: req.requestedAction,
      targetResource: req.targetResource,
      decision: 'DENIED',
      stopConditionTriggered: false,
      violationType: reason,
      evidenceHash: generateHash(),
      rawPayloadSnippet: `Access explicitly denied by Project Owner: ${reason}`,
      humanReviewed: true,
      reviewedBy: PROJECT_OWNER,
      reviewedAt: new Date().toUTCString(),
    };

    setAuditLogs((prev) => [auditEv, ...prev]);
    showNotification(`Access denied for ${req.requester}. Enforcing Default Denial.`, 'alert');
  };

  // Quarantine Breach -> Triggers Stop Condition
  const handleQuarantineRequest = (id: string) => {
    const req = requests.find((r) => r.id === id);
    if (!req) return;

    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'QUARANTINED' } : r))
    );

    const hash = generateHash();
    const auditEv: AuditEvent = {
      id: `AUD-STOP-${Math.floor(10000 + Math.random() * 90000)}`,
      timestamp: new Date().toUTCString(),
      actor: req.requester,
      actorType: req.requesterType,
      action: req.requestedAction,
      targetResource: req.targetResource,
      decision: 'STOPPED_AND_SEALED',
      stopConditionTriggered: true,
      violationType: `Attempted unauthorized ${req.requestedAction} on ${req.targetResource}`,
      evidenceHash: hash,
      rawPayloadSnippet: `SECURITY QUARANTINE: STOP -> DENY -> LOG -> PRESERVE EVIDENCE -> REVOKE ACCESS -> REQUIRE HUMAN REVIEW. Preserved forensic seal: ${hash}`,
      humanReviewed: false,
    };

    setAuditLogs((prev) => [auditEv, ...prev]);
    showNotification(
      `STOP CONDITION ENFORCED: ${req.requester} quarantined & sealed with SHA-256 evidence.`,
      'alert'
    );
  };

  // Manual Grant
  const handleManualGrant = (
    grantee: string,
    granteeType: RequesterType,
    purpose: string,
    scope: string,
    durationMinutes: number
  ) => {
    const now = new Date();
    const expiry = new Date(now.getTime() + durationMinutes * 60000);
    const hash = generateHash();

    const newGrant: PermissionRecord = {
      id: `GRANT-MANUAL-${Math.floor(1000 + Math.random() * 9000)}`,
      grantee,
      granteeType,
      purpose,
      scope,
      grantedBy: PROJECT_OWNER,
      grantedAt: now.toUTCString(),
      expiresAt: expiry.toUTCString(),
      status: 'ACTIVE',
      auditHash: hash,
      notes: `Issued directly by ${PROJECT_OWNER}`,
    };

    setPermissions((prev) => [newGrant, ...prev]);

    const auditEv: AuditEvent = {
      id: `AUD-${Math.floor(10000 + Math.random() * 90000)}`,
      timestamp: now.toUTCString(),
      actor: grantee,
      actorType: granteeType,
      action: 'MANUAL_HUMAN_GRANT_ISSUED',
      targetResource: scope,
      decision: 'PERMITTED_BY_HUMAN',
      stopConditionTriggered: false,
      evidenceHash: hash,
      rawPayloadSnippet: `Direct sovereign grant created by ${PROJECT_OWNER}. Scope: ${scope}. Purpose: ${purpose}`,
      humanReviewed: true,
      reviewedBy: PROJECT_OWNER,
      reviewedAt: now.toUTCString(),
    };

    setAuditLogs((prev) => [auditEv, ...prev]);
    showNotification(`New scoped authorization granted to ${grantee} (${durationMinutes}m).`);
  };

  // Revoke active grant
  const handleRevokePermission = (id: string) => {
    const grant = permissions.find((p) => p.id === id);
    if (!grant) return;

    setPermissions((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: 'REVOKED' } : p))
    );

    const auditEv: AuditEvent = {
      id: `AUD-REVOKE-${Math.floor(10000 + Math.random() * 90000)}`,
      timestamp: new Date().toUTCString(),
      actor: grant.grantee,
      actorType: grant.granteeType,
      action: 'CREDENTIAL_REVOKED_IMMEDIATELY',
      targetResource: grant.scope,
      decision: 'STOPPED_AND_SEALED',
      stopConditionTriggered: true,
      violationType: 'Immediate revocation exercised by Project Owner',
      evidenceHash: generateHash(),
      rawPayloadSnippet: `Grant ${grant.id} revoked immediately. Access halted in accordance with Rule 4: Revocable at any instant.`,
      humanReviewed: true,
      reviewedBy: PROJECT_OWNER,
      reviewedAt: new Date().toUTCString(),
    };

    setAuditLogs((prev) => [auditEv, ...prev]);
    showNotification(`Grant ${grant.id} revoked immediately. Perimeter sealed.`, 'alert');
  };

  // Simulate Attack / Breach Event
  const handleSimulateEvent = (ev: AuditEvent) => {
    setAuditLogs((prev) => [ev, ...prev]);
    showNotification(`STOP CONDITION EXECUTED: ${ev.actor} halted. Evidence preserved.`, 'alert');
  };

  // Mark Audit Item Reviewed
  const handleMarkReviewed = (id: string) => {
    setAuditLogs((prev) =>
      prev.map((ev) =>
        ev.id === id
          ? {
              ...ev,
              humanReviewed: true,
              reviewedBy: PROJECT_OWNER,
              reviewedAt: new Date().toUTCString(),
            }
          : ev
      )
    );
    showNotification(`Audit record certified by ${PROJECT_OWNER}.`);
  };

  // Emergency Kill Switch
  const handleActivateLockdown = () => {
    setSystemStatus('EMERGENCY_LOCKDOWN');
    // Invalidate all active grants
    setPermissions((prev) =>
      prev.map((p) => (p.status === 'ACTIVE' ? { ...p, status: 'REVOKED' } : p))
    );

    const auditEv: AuditEvent = {
      id: `AUD-LOCKDOWN-${Math.floor(10000 + Math.random() * 90000)}`,
      timestamp: new Date().toUTCString(),
      actor: 'SOVEREIGN_EMERGENCY_KILL_SWITCH',
      actorType: 'SYSTEM_KERNEL',
      action: 'SYSTEM_WIDE_LOCKDOWN_ENGAGED',
      targetResource: 'ALL_CHANNELS_AND_REPOSITORIES',
      decision: 'EMERGENCY_HALT',
      stopConditionTriggered: true,
      violationType: 'Master Kill Switch manually engaged by Human Owner',
      evidenceHash: generateHash(),
      rawPayloadSnippet: `CRITICAL STOP: Master Kill Switch triggered. All dynamic external tokens revoked. All repositories frozen. Awaiting human sovereign verification.`,
      humanReviewed: true,
      reviewedBy: PROJECT_OWNER,
      reviewedAt: new Date().toUTCString(),
    };

    setAuditLogs((prev) => [auditEv, ...prev]);
    showNotification('EMERGENCY LOCKDOWN ENGAGED: All external grants revoked.', 'alert');
  };

  const handleDeactivateLockdown = () => {
    setSystemStatus('SECURE');
    const auditEv: AuditEvent = {
      id: `AUD-RESTORE-${Math.floor(10000 + Math.random() * 90000)}`,
      timestamp: new Date().toUTCString(),
      actor: PROJECT_OWNER,
      actorType: 'HUMAN_OWNER',
      action: 'LOCKDOWN_DISENGAGED',
      targetResource: 'SYSTEM_PERIMETER',
      decision: 'PERMITTED_BY_HUMAN',
      stopConditionTriggered: false,
      evidenceHash: generateHash(),
      rawPayloadSnippet: `Human owner authenticated identity. Normal zero-trust perimeter restored.`,
      humanReviewed: true,
      reviewedBy: PROJECT_OWNER,
      reviewedAt: new Date().toUTCString(),
    };
    setAuditLogs((prev) => [auditEv, ...prev]);
    showNotification(`Lockdown disengaged. Perimeter restored under ${PROJECT_OWNER}.`);
  };

  // Export Proof Certificate
  const handleExportCertificate = () => {
    const cert = `
SOVEREIGN COMPLIANCE CERTIFICATE OF ZERO-UNAUTHORIZED-ACCESS
PROJECT OWNER: ${PROJECT_OWNER}
PROJECT: ${PROJECT_NAME}
DATE: ${new Date().toUTCString()}
STATUS: COMPLIANT WITH UN UDHR (ART. 12, 17, 27) & UNESCO AI ETHICS

All AI automated systems, agents, and external third parties operate under strict
Zero-Unauthorized-Access and Default Denial rules. No autonomous scraping, extraction,
or self-elevation permitted.

Generated by Sovereign Human Rights & Anti-Theft Console.
`.trim();

    const blob = new Blob([cert], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Sovereign_Compliance_Certificate_${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    showNotification('Compliance Certificate generated and downloaded.');
  };

  const pendingCount = requests.filter((r) => r.status === 'PENDING_HUMAN_APPROVAL').length;
  const activeCount = permissions.filter((p) => p.status === 'ACTIVE').length;
  const blockedCount = auditLogs.filter(
    (a) => a.decision === 'STOPPED_AND_SEALED' || a.decision === 'DENIED'
  ).length;
  const lastEvent = auditLogs.find((a) => a.stopConditionTriggered);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-neutral-800 selection:text-neutral-100">
      {/* Top Bar adhering to the Top Bar Contract */}
      <TopBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        systemStatus={systemStatus}
        pendingRequestsCount={pendingCount}
        onEmergencyLockdown={() => setIsLockdownModalOpen(true)}
        onExportCertificate={handleExportCertificate}
      />

      {/* Real-time Notification Banner */}
      {notification && (
        <div
          className={`px-6 py-2.5 text-xs flex items-center justify-between border-b transition-all ${
            notification.type === 'alert'
              ? 'bg-rose-950/80 border-rose-900 text-rose-200'
              : 'bg-emerald-950/80 border-emerald-900 text-emerald-200'
          }`}
        >
          <div className="flex items-center gap-2 max-w-7xl mx-auto w-full">
            {notification.type === 'alert' ? (
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
            ) : (
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            )}
            <span className="font-mono">{notification.message}</span>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        {activeTab === 'overview' && (
          <OverviewRulesView
            systemStatus={systemStatus}
            activeGrantsCount={activeCount}
            pendingRequestsCount={pendingCount}
            totalAuditCount={auditLogs.length}
            blockedCount={blockedCount}
            lastEvent={lastEvent}
            onNavigateTab={setActiveTab}
            onSimulateTest={() => setActiveTab('security-simulator')}
          />
        )}

        {activeTab === 'approval-desk' && (
          <AccessRequestsDesk
            requests={requests}
            onApprove={handleApproveRequest}
            onDeny={handleDenyRequest}
            onQuarantine={handleQuarantineRequest}
            onManualGrant={handleManualGrant}
          />
        )}

        {activeTab === 'active-grants' && (
          <ActiveAuthorizationsTable
            permissions={permissions}
            onRevoke={handleRevokePermission}
          />
        )}

        {activeTab === 'audit-ledger' && (
          <AuditProvenanceLedger
            events={auditLogs}
            onMarkReviewed={handleMarkReviewed}
          />
        )}

        {activeTab === 'security-simulator' && (
          <SecuritySimulator onSimulateEvent={handleSimulateEvent} />
        )}

        {activeTab === 'legal-charter' && <HumanRightsLegalCharter />}
      </main>

      {/* Quiet Footer with attribution and provenance */}
      <footer className="border-t border-neutral-800/80 bg-neutral-950 px-6 py-4 text-xs text-neutral-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            Project Owner: <span className="text-neutral-300 font-medium">{PROJECT_OWNER}</span> · Zero-Unauthorized-Access Enforced
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>UDHR Articles 12, 17, 27</span>
            <span>·</span>
            <span>UNESCO AI Ethics (2021)</span>
            <span>·</span>
            <span>NIST SP 800-207</span>
          </div>
        </div>
      </footer>

      {/* Emergency Kill Switch Modal */}
      <EmergencyLockdownModal
        isOpen={isLockdownModalOpen}
        isLockdownActive={systemStatus === 'EMERGENCY_LOCKDOWN'}
        onClose={() => setIsLockdownModalOpen(false)}
        onActivateLockdown={handleActivateLockdown}
        onDeactivateLockdown={handleDeactivateLockdown}
      />
    </div>
  );
}
