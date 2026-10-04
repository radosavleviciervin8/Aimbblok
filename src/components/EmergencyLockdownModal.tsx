import React, { useState } from 'react';
import { AlertOctagon, ShieldAlert, KeyRound, Check, Lock, Unlock } from 'lucide-react';
import { PROJECT_OWNER } from '../data/initialData';

interface EmergencyLockdownModalProps {
  isOpen: boolean;
  isLockdownActive: boolean;
  onClose: () => void;
  onActivateLockdown: () => void;
  onDeactivateLockdown: () => void;
}

export const EmergencyLockdownModal: React.FC<EmergencyLockdownModalProps> = ({
  isOpen,
  isLockdownActive,
  onClose,
  onActivateLockdown,
  onDeactivateLockdown,
}) => {
  const [confirmationInput, setConfirmationInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleDeactivate = (e: React.FormEvent) => {
    e.preventDefault();
    if (confirmationInput.trim().toLowerCase() === PROJECT_OWNER.toLowerCase()) {
      onDeactivateLockdown();
      setConfirmationInput('');
      setErrorMsg('');
      onClose();
    } else {
      setErrorMsg(`Authorization signature mismatch. Please type '${PROJECT_OWNER}' to verify identity.`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div className="bg-neutral-900 border border-neutral-700 rounded-lg max-w-lg w-full p-6 text-neutral-100 shadow-2xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-full bg-rose-950/80 border border-rose-800 text-rose-400">
            <AlertOctagon className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-neutral-100">
              {isLockdownActive ? 'EMERGENCY LOCKDOWN ENGAGED' : 'ENGAGE MASTER KILL SWITCH'}
            </h2>
            <p className="text-xs text-neutral-400">
              Sovereign human protection protocol for {PROJECT_OWNER}
            </p>
          </div>
        </div>

        {isLockdownActive ? (
          <div className="space-y-4 text-xs">
            <div className="p-3 bg-rose-950/50 border border-rose-800 rounded-md text-rose-200">
              <strong>LOCKDOWN STATUS: ACTIVE</strong>
              <p className="mt-1 text-[11px] text-rose-300">
                All outbound ports, inbound API hooks, and active dynamic tokens have been instantaneously invalidated.
                All repository write heads and execution permissions are sealed.
              </p>
            </div>

            <form onSubmit={handleDeactivate} className="space-y-3 pt-2">
              <label className="block text-neutral-300">
                To disengage lockdown and restore normal perimeter control, verify human owner identity by typing{' '}
                <strong className="text-neutral-100 font-mono">{PROJECT_OWNER}</strong>:
              </label>
              <input
                type="text"
                value={confirmationInput}
                onChange={(e) => {
                  setConfirmationInput(e.target.value);
                  setErrorMsg('');
                }}
                className="w-full p-2 bg-neutral-950 border border-neutral-800 rounded text-neutral-200 font-mono text-xs focus:outline-none focus:border-neutral-600"
                placeholder={PROJECT_OWNER}
              />
              {errorMsg && <p className="text-[11px] text-rose-400">{errorMsg}</p>}

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3 py-1.5 text-xs text-neutral-400 hover:text-neutral-200"
                >
                  Keep Locked
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-emerald-100 bg-emerald-700 hover:bg-emerald-600 rounded transition-colors inline-flex items-center gap-1.5"
                >
                  <Unlock className="w-3.5 h-3.5" />
                  Authenticate & Restore System
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="space-y-4 text-xs">
            <p className="text-neutral-300 leading-relaxed">
              Activating the Master Kill Switch initiates immediate emergency containment:
            </p>
            <ul className="space-y-1.5 text-neutral-400 list-disc list-inside bg-neutral-950 p-3 rounded border border-neutral-800 text-[11px]">
              <li>Revokes all existing temporary and scoped access grants.</li>
              <li>Freezes code repository write privileges and branches.</li>
              <li>Denies all inbound automated requests with high-severity flags.</li>
              <li>Generates an emergency cryptographic event in the audit trail.</li>
              <li>Requires human confirmation by {PROJECT_OWNER} to reopen.</li>
            </ul>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-800">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 text-xs text-neutral-400 hover:text-neutral-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  onActivateLockdown();
                  onClose();
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded transition-colors inline-flex items-center gap-1.5"
              >
                <Lock className="w-3.5 h-3.5" />
                Engage Emergency Kill Switch Now
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
