import React from 'react';
import { ShieldAlert, Ban, FileText, Database, KeyRound, UserCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

interface StopConditionVisualizerProps {
  lastEvent?: {
    actor: string;
    action: string;
    violationType?: string;
    evidenceHash: string;
    timestamp: string;
  };
  onSimulateUnauthorized?: () => void;
}

export const StopConditionVisualizer: React.FC<StopConditionVisualizerProps> = ({
  lastEvent,
  onSimulateUnauthorized,
}) => {
  const steps = [
    {
      step: 'STOP',
      title: '1. STOP',
      desc: 'Immediate halting of AI process thread or network packet.',
      icon: ShieldAlert,
      color: 'text-rose-400 bg-rose-950/50 border-rose-800',
    },
    {
      step: 'DENY',
      title: '2. DENY',
      desc: 'Hard rejection. Zero bytes transmitted or written.',
      icon: Ban,
      color: 'text-amber-400 bg-amber-950/50 border-amber-800',
    },
    {
      step: 'LOG',
      title: '3. LOG',
      desc: 'Append event to immutable append-only provenance trail.',
      icon: FileText,
      color: 'text-sky-400 bg-sky-950/50 border-sky-800',
    },
    {
      step: 'PRESERVE EVIDENCE',
      title: '4. PRESERVE EVIDENCE',
      desc: 'Cryptographic SHA-256 seal of payload & agent telemetry.',
      icon: Database,
      color: 'text-indigo-400 bg-indigo-950/50 border-indigo-800',
    },
    {
      step: 'REVOKE ACCESS',
      title: '5. REVOKE ACCESS',
      desc: 'Immediate invalidation of credentials, tokens & routes.',
      icon: KeyRound,
      color: 'text-purple-400 bg-purple-950/50 border-purple-800',
    },
    {
      step: 'REQUIRE HUMAN REVIEW',
      title: '6. HUMAN REVIEW',
      desc: 'Mandatory sign-off by Project Owner Ervin Remus Radosavlevici.',
      icon: UserCheck,
      color: 'text-emerald-400 bg-emerald-950/50 border-emerald-800',
    },
  ];

  return (
    <div className="border border-neutral-800 rounded-lg p-6 bg-neutral-900/60">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-base font-semibold text-neutral-100 tracking-tight">
            Stop Condition Protocol Architecture
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Enforced whenever an AI agent, crawler, or unauthorized third-party attempts an unapproved action.
            No automated system may override this condition.
          </p>
        </div>
        {onSimulateUnauthorized && (
          <button
            onClick={onSimulateUnauthorized}
            className="self-start md:self-auto px-3 py-1.5 text-xs font-medium text-amber-200 bg-amber-950/60 border border-amber-700/60 rounded-md hover:bg-amber-900/60 transition-colors"
          >
            Trigger Stop Condition Test
          </button>
        )}
      </div>

      {/* 6 Step Sequence */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
        {steps.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={item.step}
              className={`p-3 rounded-lg border ${item.color} flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Icon className="w-4 h-4" />
                  <span className="text-[11px] font-mono opacity-60">0{idx + 1}</span>
                </div>
                <div className="text-xs font-semibold text-neutral-100">{item.title}</div>
                <p className="text-[11px] text-neutral-400 mt-1 leading-snug">{item.desc}</p>
              </div>
              <div className="mt-3 pt-2 border-t border-neutral-800/60 flex items-center gap-1 text-[10px] text-neutral-400">
                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                <span>Enforced by Kernel</span>
              </div>
            </div>
          );
        })}
      </div>

      {lastEvent && (
        <div className="mt-4 p-3 bg-neutral-950 border border-neutral-800 rounded-md text-xs">
          <div className="flex flex-wrap items-center justify-between gap-2 text-neutral-400 text-[11px] border-b border-neutral-800/80 pb-2 mb-2">
            <span className="font-semibold text-neutral-200">Last Triggered Stop Sequence:</span>
            <span className="font-mono text-neutral-500">{lastEvent.timestamp}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <div>
              <span className="text-neutral-500 block text-[11px]">Violating Actor:</span>
              <span className="font-medium text-rose-300 font-mono text-[11px] truncate block">
                {lastEvent.actor}
              </span>
            </div>
            <div>
              <span className="text-neutral-500 block text-[11px]">Attempted Action:</span>
              <span className="text-neutral-200 font-mono text-[11px] truncate block">
                {lastEvent.action}
              </span>
            </div>
            <div>
              <span className="text-neutral-500 block text-[11px]">Evidence SHA-256:</span>
              <span className="text-neutral-400 font-mono text-[11px] truncate block">
                {lastEvent.evidenceHash.substring(0, 16)}...
              </span>
            </div>
          </div>
          {lastEvent.violationType && (
            <div className="mt-2 text-[11px] text-amber-300/90 bg-amber-950/20 px-2 py-1 rounded border border-amber-900/40">
              Breach Intercepted: {lastEvent.violationType}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
