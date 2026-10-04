import React from 'react';
import { KeyRound, Ban, CheckCircle, ShieldCheck, Clock } from 'lucide-react';
import { PermissionRecord } from '../types';

interface ActiveAuthorizationsTableProps {
  permissions: PermissionRecord[];
  onRevoke: (id: string) => void;
}

export const ActiveAuthorizationsTable: React.FC<ActiveAuthorizationsTableProps> = ({
  permissions,
  onRevoke,
}) => {
  const activeGrants = permissions.filter((p) => p.status === 'ACTIVE');
  const pastGrants = permissions.filter((p) => p.status !== 'ACTIVE');

  return (
    <div className="space-y-6">
      <div className="border border-neutral-800 rounded-lg p-6 bg-neutral-900/50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <KeyRound className="w-5 h-5 text-sky-400" />
              <h1 className="text-xl font-semibold text-neutral-100 tracking-tight">
                Active Explicit Scoped Authorizations
              </h1>
            </div>
            <p className="text-sm text-neutral-400 mt-1 max-w-3xl">
              Rule 4 & 5: Every permission is strictly revocable at any moment. When authorization ends, access must end immediately.
              Credentials cannot be renewed automatically by any AI system.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-neutral-400">Active Grants:</span>
            <span className="font-mono font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
              {activeGrants.length}
            </span>
          </div>
        </div>
      </div>

      {/* Active Grants Table */}
      <div className="border border-neutral-800 rounded-lg bg-neutral-900/40 overflow-hidden">
        <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-neutral-200">
            Currently Enforced Active Permissions
          </h2>
          <span className="text-xs text-neutral-500 font-mono">
            Least-Privilege Isolation
          </span>
        </div>

        {activeGrants.length === 0 ? (
          <div className="py-12 px-6 text-center">
            <ShieldCheck className="w-8 h-8 text-neutral-600 mx-auto mb-3" />
            <p className="text-sm font-medium text-neutral-300">No active external grants</p>
            <p className="text-xs text-neutral-500 mt-1">
              Zero ambient access. All external systems and AI engines are locked out in accordance with Default Denial.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-neutral-800 bg-neutral-950/60 text-neutral-400 font-mono">
                  <th className="py-3 px-4">Grant ID & Grantee</th>
                  <th className="py-3 px-4">Authorized Purpose</th>
                  <th className="py-3 px-4">Scoped Resource</th>
                  <th className="py-3 px-4">Authorizer</th>
                  <th className="py-3 px-4">Expiration</th>
                  <th className="py-3 px-4 text-right">Revocation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {activeGrants.map((grant) => (
                  <tr key={grant.id} className="hover:bg-neutral-900/60 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-mono text-neutral-300 font-medium">{grant.id}</div>
                      <div className="text-neutral-400 text-[11px] mt-0.5">
                        {grant.grantee}{' '}
                        <span className="text-neutral-600">({grant.granteeType})</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-neutral-300 max-w-xs">{grant.purpose}</td>
                    <td className="py-3.5 px-4 font-mono text-neutral-400 max-w-xs truncate">
                      {grant.scope}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-emerald-400 font-medium">{grant.grantedBy}</span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-neutral-400">
                      <div className="flex items-center gap-1.5 text-[11px]">
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                        <span>{grant.expiresAt}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => onRevoke(grant.id)}
                        className="px-3 py-1 text-xs font-semibold text-rose-300 bg-rose-950/60 hover:bg-rose-900/60 border border-rose-800 rounded transition-colors inline-flex items-center gap-1"
                      >
                        <Ban className="w-3 h-3" />
                        Revoke Access
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Revoked & Historical Grants */}
      {pastGrants.length > 0 && (
        <div className="border border-neutral-800 rounded-lg bg-neutral-900/20 overflow-hidden">
          <div className="px-6 py-3 border-b border-neutral-800 text-xs font-medium text-neutral-400">
            Revoked & Expired Grants Archive ({pastGrants.length})
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs opacity-75">
              <thead>
                <tr className="border-b border-neutral-800 bg-neutral-950/40 text-neutral-500 font-mono">
                  <th className="py-2.5 px-4">Grant ID</th>
                  <th className="py-2.5 px-4">Grantee</th>
                  <th className="py-2.5 px-4">Original Purpose</th>
                  <th className="py-2.5 px-4">Status</th>
                  <th className="py-2.5 px-4">Audit Proof Hash</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60">
                {pastGrants.map((grant) => (
                  <tr key={grant.id}>
                    <td className="py-2.5 px-4 font-mono text-neutral-400">{grant.id}</td>
                    <td className="py-2.5 px-4 text-neutral-300">{grant.grantee}</td>
                    <td className="py-2.5 px-4 text-neutral-400">{grant.purpose}</td>
                    <td className="py-2.5 px-4">
                      <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-neutral-800 text-neutral-400">
                        {grant.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-4 font-mono text-neutral-500 text-[11px]">
                      {grant.auditHash.substring(0, 16)}...
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
