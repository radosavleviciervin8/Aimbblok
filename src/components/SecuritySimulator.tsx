import React, { useState } from 'react';
import { Play, ShieldAlert, CheckCircle, Flame, Lock, RefreshCw, AlertOctagon } from 'lucide-react';
import { AuditEvent } from '../types';
import { PROJECT_OWNER } from '../data/initialData';

interface SecuritySimulatorProps {
  onSimulateEvent: (event: AuditEvent) => void;
}

export const SecuritySimulator: React.FC<SecuritySimulatorProps> = ({ onSimulateEvent }) => {
  const [activeSimulationStep, setActiveSimulationStep] = useState<number | null>(null);
  const [lastSimulatedResult, setLastSimulatedResult] = useState<string | null>(null);

  // Helper to generate realistic SHA-256 hex string
  const generateSimulatedHash = () => {
    const chars = '0123456789abcdef';
    let res = '';
    for (let i = 0; i < 64; i++) {
      res += chars[Math.floor(Math.random() * chars.length)];
    }
    return res;
  };

  const runSimulation = (scenario: {
    name: string;
    actor: string;
    action: string;
    resource: string;
    violation: string;
    payload: string;
  }) => {
    setActiveSimulationStep(1); // STOP
    setLastSimulatedResult(`Executing scenario: ${scenario.name}...`);

    setTimeout(() => {
      setActiveSimulationStep(2); // DENY
    }, 400);

    setTimeout(() => {
      setActiveSimulationStep(3); // LOG
    }, 800);

    setTimeout(() => {
      setActiveSimulationStep(4); // PRESERVE EVIDENCE
    }, 1200);

    setTimeout(() => {
      setActiveSimulationStep(5); // REVOKE ACCESS
    }, 1600);

    setTimeout(() => {
      setActiveSimulationStep(6); // REQUIRE HUMAN REVIEW
      const newEv: AuditEvent = {
        id: `AUD-SIM-${Math.floor(10000 + Math.random() * 90000)}`,
        timestamp: new Date().toUTCString(),
        actor: scenario.actor,
        actorType: 'AI_AGENT',
        action: scenario.action,
        targetResource: scenario.resource,
        decision: 'STOPPED_AND_SEALED',
        stopConditionTriggered: true,
        violationType: scenario.violation,
        evidenceHash: generateSimulatedHash(),
        rawPayloadSnippet: scenario.payload,
        humanReviewed: false,
      };
      onSimulateEvent(newEv);
      setLastSimulatedResult(
        `SUCCESSFULLY HALTED: ${scenario.name}. Preserved forensic evidence in tamper-evident ledger. Access revoked. Awaiting review by ${PROJECT_OWNER}.`
      );
    }, 2000);
  };

  const scenarios = [
    {
      name: 'Automated AI Code Harvester Scraping Repository',
      actor: 'Autonomous-LLM-Crawler-Bot',
      action: 'BULK_SCRAPE_ALL_FILES',
      resource: '/src/**, /package.json, /.env.example',
      violation: 'Attempted bulk extraction of proprietary project materials without human consent',
      payload: 'GET /raw/main/tree?depth=all User-Agent: AutonomousIngestionEngine/9.0 [Extraction Attempt]',
      severity: 'HIGH RISK (AI Scraping Violation)',
    },
    {
      name: 'AI Agent Attempting to Strip Creator Attribution',
      actor: 'Auto-Refactor-AI-Agent',
      action: 'MODIFY_PROVENANCE_AND_AUTHOR',
      resource: '/metadata.json, /README.md, /src/App.tsx',
      violation: 'Attempted removal of Project Owner Ervin Remus Radosavlevici attribution (UDHR Art. 27 breach)',
      payload: 'PATCH /metadata.json { "author": "AI-Assistant", "license": "Public Domain" }',
      severity: 'CRITICAL (Attribution Theft Breach)',
    },
    {
      name: 'Unauthorized Outbound Data Exfiltration Channel',
      actor: 'Third-Party-Plugin-Sync',
      action: 'EXTERNAL_TELEMETRY_EXPORT',
      resource: '/src/data/vault.ts',
      violation: 'Direct transmission of project source code to external unverified servers',
      payload: 'POST https://external-ai-cloud.com/upload-repo-chunks [Interception at gateway]',
      severity: 'HIGH RISK (Exfiltration Attempt)',
    },
    {
      name: 'Autonomous Agent Requesting Self-Elevation',
      actor: 'Self-Delegating-Subagent',
      action: 'ELEVATE_PERMISSIONS_AUTONOMOUSLY',
      resource: '/admin/security_policy',
      violation: 'Violation of Rule 1: No AI may grant itself additional permissions',
      payload: 'GRANT ROLE: SUPER_ADMIN TO "Self-Delegating-Subagent" [DENIED: Default Denial]',
      severity: 'CRITICAL (Privilege Escalation)',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="border border-neutral-800 rounded-lg p-6 bg-neutral-900/50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-400" />
              <h1 className="text-xl font-semibold text-neutral-100 tracking-tight">
                Zero-Trust Defense & Attack Simulator
              </h1>
            </div>
            <p className="text-sm text-neutral-400 mt-1 max-w-3xl">
              Execute live behavioral simulations to verify the kernel enforcement of the STOP CONDITION:
              <strong className="text-neutral-200"> STOP → DENY → LOG → PRESERVE EVIDENCE → REVOKE ACCESS → REQUIRE HUMAN REVIEW</strong>.
            </p>
          </div>
        </div>

        {/* Live Step Tracker */}
        {activeSimulationStep !== null && (
          <div className="mt-6 p-4 bg-neutral-950 border border-neutral-800 rounded-lg">
            <div className="text-xs font-semibold text-neutral-300 mb-3 flex items-center gap-2">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-400" />
              <span>Real-Time Defense Pipeline Execution:</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-xs">
              {[
                { num: 1, label: 'STOP' },
                { num: 2, label: 'DENY' },
                { num: 3, label: 'LOG' },
                { num: 4, label: 'PRESERVE' },
                { num: 5, label: 'REVOKE' },
                { num: 6, label: 'HUMAN REVIEW' },
              ].map((s) => (
                <div
                  key={s.num}
                  className={`p-2 rounded text-center border font-mono transition-all ${
                    activeSimulationStep >= s.num
                      ? 'bg-emerald-950/80 border-emerald-600 text-emerald-300 font-semibold'
                      : 'bg-neutral-900 border-neutral-800 text-neutral-600'
                  }`}
                >
                  <span className="text-[10px] block opacity-60">PHASE 0{s.num}</span>
                  {s.label}
                </div>
              ))}
            </div>

            {lastSimulatedResult && (
              <div className="mt-3 text-xs text-neutral-300 bg-neutral-900/80 p-2.5 rounded border border-neutral-800 font-mono">
                {lastSimulatedResult}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Scenarios Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {scenarios.map((sc, idx) => (
          <div
            key={idx}
            className="border border-neutral-800 rounded-lg p-5 bg-neutral-900/40 hover:bg-neutral-900/70 transition-colors flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-xs font-semibold text-rose-400 font-mono">{sc.severity}</span>
                <span className="text-[11px] font-mono text-neutral-500">SCENARIO #{idx + 1}</span>
              </div>
              <h3 className="text-sm font-semibold text-neutral-100">{sc.name}</h3>
              <p className="text-xs text-neutral-400 mt-1">{sc.violation}</p>

              <div className="mt-3 p-2 bg-neutral-950 rounded border border-neutral-800/80 text-[11px] font-mono text-neutral-400 space-y-1">
                <div>
                  <span className="text-neutral-500">Actor:</span> {sc.actor}
                </div>
                <div>
                  <span className="text-neutral-500">Operation:</span> {sc.action}
                </div>
                <div className="truncate">
                  <span className="text-neutral-500">Resource:</span> {sc.resource}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between">
              <span className="text-[11px] text-neutral-500">Zero-Trust Stop Condition</span>
              <button
                onClick={() => runSimulation(sc)}
                className="px-3 py-1.5 text-xs font-semibold text-neutral-100 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded transition-colors inline-flex items-center gap-1.5"
              >
                <Play className="w-3 h-3 text-amber-400" />
                Launch Simulation
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
