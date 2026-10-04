import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, Clock, UserCheck, AlertTriangle, Check, X, FileKey } from 'lucide-react';
import { AccessRequest, RequesterType } from '../types';
import { PROJECT_OWNER } from '../data/initialData';

interface AccessRequestsDeskProps {
  requests: AccessRequest[];
  onApprove: (id: string, scope: string, purpose: string, durationMinutes: number) => void;
  onDeny: (id: string, reason: string) => void;
  onQuarantine: (id: string) => void;
  onManualGrant: (grantee: string, granteeType: RequesterType, purpose: string, scope: string, durationMinutes: number) => void;
}

export const AccessRequestsDesk: React.FC<AccessRequestsDeskProps> = ({
  requests,
  onApprove,
  onDeny,
  onQuarantine,
  onManualGrant,
}) => {
  const [showManualModal, setShowManualModal] = useState(false);
  const [manualGrantee, setManualGrantee] = useState('');
  const [manualType, setManualType] = useState<RequesterType>('AUTOMATED_BOT');
  const [manualPurpose, setManualPurpose] = useState('');
  const [manualScope, setManualScope] = useState('');
  const [manualDuration, setManualDuration] = useState(30);

  const [selectedReq, setSelectedReq] = useState<AccessRequest | null>(null);
  const [approvalScope, setApprovalScope] = useState('');
  const [approvalDuration, setApprovalDuration] = useState(30);

  const pendingRequests = requests.filter((r) => r.status === 'PENDING_HUMAN_APPROVAL');

  const handleOpenApprove = (req: AccessRequest) => {
    setSelectedReq(req);
    setApprovalScope(req.requestedScope);
    setApprovalDuration(30);
  };

  const handleConfirmApproval = () => {
    if (!selectedReq) return;
    onApprove(selectedReq.id, approvalScope, selectedReq.claimedPurpose, approvalDuration);
    setSelectedReq(null);
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualGrantee || !manualPurpose || !manualScope) return;
    onManualGrant(manualGrantee, manualType, manualPurpose, manualScope, manualDuration);
    setManualGrantee('');
    setManualPurpose('');
    setManualScope('');
    setShowManualModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="border border-neutral-800 rounded-lg p-6 bg-neutral-900/50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <h1 className="text-xl font-semibold text-neutral-100 tracking-tight">
                Sovereign Human Authorization Desk
              </h1>
            </div>
            <p className="text-sm text-neutral-400 mt-1 max-w-3xl">
              Strict Default Denial: <strong className="text-neutral-200">NO EXPLICIT HUMAN AUTHORIZATION = NO ACCESS</strong>.
              All permissions must be explicitly granted by Project Owner <span className="text-emerald-400 font-medium">{PROJECT_OWNER}</span>,
              restricted to minimum necessary scope, time-bounded, auditable, and instantaneously revocable.
            </p>
          </div>
          <button
            onClick={() => setShowManualModal(true)}
            className="self-start md:self-auto px-4 py-2 text-xs font-semibold text-neutral-100 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-md transition-colors inline-flex items-center gap-2"
          >
            <FileKey className="w-4 h-4 text-emerald-400" />
            Issue Explicit Human Grant
          </button>
        </div>

        {/* 5 Non-Negotiable Permission Conditions */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 mt-5 pt-5 border-t border-neutral-800 text-xs">
          <div className="p-2.5 rounded bg-neutral-950/60 border border-neutral-800/80">
            <span className="text-neutral-500 font-mono text-[10px] block">CRITERIA 01</span>
            <span className="font-semibold text-neutral-200">Explicitly Granted</span>
            <p className="text-[11px] text-neutral-400 mt-1">Direct human approval by owner only; zero automated self-delegation.</p>
          </div>
          <div className="p-2.5 rounded bg-neutral-950/60 border border-neutral-800/80">
            <span className="text-neutral-500 font-mono text-[10px] block">CRITERIA 02</span>
            <span className="font-semibold text-neutral-200">Defined Purpose</span>
            <p className="text-[11px] text-neutral-400 mt-1">Must have a precise, recorded, ethical objective.</p>
          </div>
          <div className="p-2.5 rounded bg-neutral-950/60 border border-neutral-800/80">
            <span className="text-neutral-500 font-mono text-[10px] block">CRITERIA 03</span>
            <span className="font-semibold text-neutral-200">Minimum Scope</span>
            <p className="text-[11px] text-neutral-400 mt-1">Least-privilege isolation; zero whole-repo scraping.</p>
          </div>
          <div className="p-2.5 rounded bg-neutral-950/60 border border-neutral-800/80">
            <span className="text-neutral-500 font-mono text-[10px] block">CRITERIA 04</span>
            <span className="font-semibold text-neutral-200">Instantly Revocable</span>
            <p className="text-[11px] text-neutral-400 mt-1">Terminates immediately when purpose ends or on demand.</p>
          </div>
          <div className="p-2.5 rounded bg-neutral-950/60 border border-neutral-800/80">
            <span className="text-neutral-500 font-mono text-[10px] block">CRITERIA 05</span>
            <span className="font-semibold text-neutral-200">Fully Auditable</span>
            <p className="text-[11px] text-neutral-400 mt-1">Cryptographic proof hash stored in tamper-evident ledger.</p>
          </div>
        </div>
      </div>

      {/* Pending Requests Queue */}
      <div className="border border-neutral-800 rounded-lg bg-neutral-900/40 overflow-hidden">
        <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-base font-semibold text-neutral-100">
              Pending Access Authorization Queue
            </h2>
            <span className="text-xs text-neutral-400 font-mono tabular-nums">
              ({pendingRequests.length} awaiting human review)
            </span>
          </div>
        </div>

        {pendingRequests.length === 0 ? (
          <div className="py-12 px-6 text-center">
            <UserCheck className="w-8 h-8 text-neutral-600 mx-auto mb-3" />
            <p className="text-sm font-medium text-neutral-300">All inbound requests processed</p>
            <p className="text-xs text-neutral-500 mt-1 max-w-md mx-auto">
              Default Denial is actively holding the perimeter. Any automated bot or service attempting unauthorized access is halted at the gate.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-neutral-800">
            {pendingRequests.map((req) => (
              <div key={req.id} className="p-6 transition-colors hover:bg-neutral-900/80">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-mono font-medium text-neutral-400">
                        {req.id}
                      </span>
                      <span className="text-neutral-600">·</span>
                      <span className="text-sm font-semibold text-neutral-100">{req.requester}</span>
                      <span className="text-neutral-600">·</span>
                      <span className="text-xs font-mono text-neutral-400">{req.requesterType}</span>
                      <span className="text-neutral-600">·</span>
                      <span className="text-xs text-neutral-500">{req.timestamp}</span>
                    </div>

                    <div className="text-sm text-neutral-300">
                      <strong className="text-neutral-400 text-xs">Action Requested:</strong>{' '}
                      <span className="font-mono text-neutral-200">{req.requestedAction}</span> on{' '}
                      <span className="font-mono text-neutral-200">{req.targetResource}</span>
                    </div>

                    <div className="text-xs text-neutral-400">
                      <strong className="text-neutral-500">Stated Purpose:</strong> {req.claimedPurpose}
                    </div>

                    <div className="text-xs text-neutral-400">
                      <strong className="text-neutral-500">Requested Scope:</strong> {req.requestedScope}
                    </div>

                    {req.breachFlag && (
                      <div className="flex items-center gap-2 p-2 rounded bg-rose-950/40 border border-rose-900/60 text-xs text-rose-300">
                        <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
                        <span>Security Warning: {req.breachFlag}</span>
                      </div>
                    )}
                  </div>

                  {/* Actions for Human Owner */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleOpenApprove(req)}
                      className="px-3 py-1.5 text-xs font-medium text-emerald-200 bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-800 rounded-md transition-colors inline-flex items-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5" />
                      Grant Human Authorization
                    </button>
                    <button
                      onClick={() => onDeny(req.id, 'Denied by Human Owner (Zero-Unauthorized-Access)')}
                      className="px-3 py-1.5 text-xs font-medium text-neutral-300 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 rounded-md transition-colors inline-flex items-center gap-1.5"
                    >
                      <X className="w-3.5 h-3.5" />
                      Deny
                    </button>
                    <button
                      onClick={() => onQuarantine(req.id)}
                      className="px-3 py-1.5 text-xs font-medium text-rose-300 bg-rose-950/60 hover:bg-rose-900/60 border border-rose-900 rounded-md transition-colors inline-flex items-center gap-1.5"
                      title="Trigger STOP condition and quarantine"
                    >
                      <ShieldAlert className="w-3.5 h-3.5" />
                      Quarantine Breach
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Grant Scope Configuration Modal */}
      {selectedReq && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-700 rounded-lg max-w-lg w-full p-6 text-neutral-100 shadow-2xl">
            <h3 className="text-base font-semibold text-neutral-100 mb-1">
              Configure Explicit Scoped Authorization
            </h3>
            <p className="text-xs text-neutral-400 mb-4">
              Authorized strictly by {PROJECT_OWNER}. Enforcing least-privilege scope and strict expiry.
            </p>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-400 mb-1">Grantee</label>
                <div className="font-mono text-neutral-200 p-2 bg-neutral-950 border border-neutral-800 rounded">
                  {selectedReq.requester} ({selectedReq.requesterType})
                </div>
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Authorized Purpose</label>
                <div className="text-neutral-300 p-2 bg-neutral-950 border border-neutral-800 rounded">
                  {selectedReq.claimedPurpose}
                </div>
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">
                  Enforce Strictly Limited Scope (No wildcard access)
                </label>
                <input
                  type="text"
                  value={approvalScope}
                  onChange={(e) => setApprovalScope(e.target.value)}
                  className="w-full p-2 bg-neutral-950 border border-neutral-800 rounded text-neutral-200 focus:outline-none focus:border-neutral-600 font-mono"
                  placeholder="e.g. Read-only /src/types.ts only"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Time-Bounded Expiry Window (Minutes)</label>
                <div className="flex gap-2">
                  {[15, 30, 60, 120].map((mins) => (
                    <button
                      key={mins}
                      type="button"
                      onClick={() => setApprovalDuration(mins)}
                      className={`px-3 py-1.5 rounded border text-xs font-mono transition-colors ${
                        approvalDuration === mins
                          ? 'bg-emerald-950 text-emerald-300 border-emerald-700 font-semibold'
                          : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:text-neutral-200'
                      }`}
                    >
                      {mins}m
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-neutral-800">
              <button
                type="button"
                onClick={() => setSelectedReq(null)}
                className="px-3 py-1.5 text-xs text-neutral-400 hover:text-neutral-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmApproval}
                className="px-4 py-2 text-xs font-semibold text-emerald-100 bg-emerald-700 hover:bg-emerald-600 rounded-md transition-colors"
              >
                Sign & Issue Permission
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Manual Grant Modal */}
      {showManualModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <form
            onSubmit={handleManualSubmit}
            className="bg-neutral-900 border border-neutral-700 rounded-lg max-w-lg w-full p-6 text-neutral-100 shadow-2xl"
          >
            <h3 className="text-base font-semibold text-neutral-100 mb-1">
              Issue Explicit Human Permission Grant
            </h3>
            <p className="text-xs text-neutral-400 mb-4">
              All grants are issued directly by Project Owner {PROJECT_OWNER} under international copyright and security protocols.
            </p>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-400 mb-1">Grantee Identifier / System Name</label>
                <input
                  type="text"
                  required
                  value={manualGrantee}
                  onChange={(e) => setManualGrantee(e.target.value)}
                  className="w-full p-2 bg-neutral-950 border border-neutral-800 rounded text-neutral-200 font-mono"
                  placeholder="e.g. Local-Vulnerability-Scanner"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Grantee Classification</label>
                <select
                  value={manualType}
                  onChange={(e) => setManualType(e.target.value as RequesterType)}
                  className="w-full p-2 bg-neutral-950 border border-neutral-800 rounded text-neutral-200"
                >
                  <option value="AUTOMATED_BOT">Automated Local Worker / Script</option>
                  <option value="HUMAN_AUDITOR">Independent Human Auditor</option>
                  <option value="AI_AGENT">Controlled AI Agent (Constrained Sandbox)</option>
                  <option value="THIRD_PARTY_SERVICE">Third-Party Service</option>
                </select>
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Specific Defined Purpose</label>
                <input
                  type="text"
                  required
                  value={manualPurpose}
                  onChange={(e) => setManualPurpose(e.target.value)}
                  className="w-full p-2 bg-neutral-950 border border-neutral-800 rounded text-neutral-200"
                  placeholder="e.g. Static analysis for dependency vulnerability check"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Minimum Required Scope (Specific Resource)</label>
                <input
                  type="text"
                  required
                  value={manualScope}
                  onChange={(e) => setManualScope(e.target.value)}
                  className="w-full p-2 bg-neutral-950 border border-neutral-800 rounded text-neutral-200 font-mono"
                  placeholder="e.g. Read-only access to /package.json"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Validity Duration</label>
                <div className="flex gap-2">
                  {[15, 30, 60, 180].map((mins) => (
                    <button
                      key={mins}
                      type="button"
                      onClick={() => setManualDuration(mins)}
                      className={`px-3 py-1.5 rounded border text-xs font-mono transition-colors ${
                        manualDuration === mins
                          ? 'bg-emerald-950 text-emerald-300 border-emerald-700 font-semibold'
                          : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:text-neutral-200'
                      }`}
                    >
                      {mins}m
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-neutral-800">
              <button
                type="button"
                onClick={() => setShowManualModal(false)}
                className="px-3 py-1.5 text-xs text-neutral-400 hover:text-neutral-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-emerald-100 bg-emerald-700 hover:bg-emerald-600 rounded-md transition-colors"
              >
                Create Signed Grant
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
