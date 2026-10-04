import React, { useState } from 'react';
import { BookOpen, ShieldCheck, FileCheck, Download, Scale, Printer } from 'lucide-react';
import { INITIAL_LEGAL_ARTICLES, PROJECT_OWNER, PROJECT_NAME } from '../data/initialData';

export const HumanRightsLegalCharter: React.FC = () => {
  const [selectedArticleId, setSelectedArticleId] = useState<string>(INITIAL_LEGAL_ARTICLES[0].id);
  const [showCertificateModal, setShowCertificateModal] = useState(false);

  const selectedArticle =
    INITIAL_LEGAL_ARTICLES.find((a) => a.id === selectedArticleId) || INITIAL_LEGAL_ARTICLES[0];

  const handlePrintCertificate = () => {
    window.print();
  };

  const certificateText = `
================================================================================
SOVEREIGN DECLARATION OF PROJECT OWNERSHIP, ZERO-UNAUTHORIZED-ACCESS & AI CONTAINMENT
UNDER INTERNATIONAL HUMAN RIGHTS LAW AND ETHICS
================================================================================

PROJECT OWNER & SOVEREIGN AUTHOR: ${PROJECT_OWNER}
PROJECT ASSET: ${PROJECT_NAME}
LEGAL STATUS: PROTECTED UNDER INTERNATIONAL HUMAN RIGHTS CONVENTIONS & ZERO-TRUST LAW
DATE OF RECORD: ${new Date().toUTCString()}

1. CORE MANDATE & OWNERSHIP PRINCIPLE
   The project materials, source code, data architectures, and documentation belong
   exclusively under human owner control (${PROJECT_OWNER}).
   AI is not the owner. AI has no independent permission.
   No automated system or agent possesses ambient or implied authorization.

2. ZERO-UNAUTHORIZED-ACCESS & DEFAULT DENIAL
   NO EXPLICIT HUMAN AUTHORIZATION = NO ACCESS.
   Every grant of access must strictly fulfill all five criteria:
   - 1. Explicitly granted by ${PROJECT_OWNER};
   - 2. Limited to a strictly defined, recorded ethical purpose;
   - 3. Limited to the minimum required scope (least-privilege);
   - 4. Revocable at any instant;
   - 5. Auditable with cryptographic immutable hash chaining.
   When authorization ends, access must cease immediately.

3. ABSOLUTE PROHIBITIONS ON AI AND AUTOMATED SYSTEMS
   No AI agent, LLM provider, crawler, plugin, integration, or third-party service may:
   - Access project files or private repositories autonomously;
   - Copy, extract, harvest, or scrape project material;
   - Transmit project material externally without explicit human authorization;
   - Modify or delete project material;
   - Reproduce proprietary, confidential, or creative project content;
   - Remove author attribution or provenance of ${PROJECT_OWNER};
   - Claim ownership, authorship, or co-authorship;
   - Grant itself additional permissions or elevate its role;
   - Bypass access controls or forge alternate access routes.

4. MANDATORY STOP CONDITION PROTOCOL
   If an AI system or third-party service attempts an unauthorized action:
   STOP -> DENY -> LOG -> PRESERVE EVIDENCE -> REVOKE ACCESS -> REQUIRE HUMAN REVIEW.
   No automated system may override this condition.

5. INTERNATIONAL HUMAN RIGHTS LAW FOUNDATION
   This protection is anchored in:
   - Universal Declaration of Human Rights (UDHR) Articles 12, 17, and 27;
   - UNESCO Recommendation on the Ethics of Artificial Intelligence (2021);
   - International Covenant on Civil and Political Rights (ICCPR);
   - NIST Special Publication 800-207 Zero Trust Architecture.

CERTIFIED AND ENFORCED BY SOVEREIGN KERNEL.
Signed: ${PROJECT_OWNER}
================================================================================
`.trim();

  const handleDownloadCertificate = () => {
    const blob = new Blob([certificateText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Sovereign_Ownership_Declaration_${PROJECT_OWNER.replace(/\s+/g, '_')}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="border border-neutral-800 rounded-lg p-6 bg-neutral-900/50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Scale className="w-5 h-5 text-purple-400" />
              <h1 className="text-xl font-semibold text-neutral-100 tracking-tight">
                International Human Rights Law & Ethics Framework
              </h1>
            </div>
            <p className="text-sm text-neutral-400 mt-1 max-w-3xl">
              Anchored in United Nations, UNESCO, and international conventions protecting human creators against
              unauthorized exploitation, algorithmic appropriation, privacy violations, and autonomous AI overreach.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowCertificateModal(true)}
              className="px-4 py-2 text-xs font-semibold text-neutral-100 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-md transition-colors inline-flex items-center gap-2"
            >
              <FileCheck className="w-4 h-4 text-purple-400" />
              View Legal Declaration
            </button>
          </div>
        </div>
      </div>

      {/* Main split: Article Tabs + Detail Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Convention List */}
        <div className="border border-neutral-800 rounded-lg bg-neutral-900/40 p-4 space-y-2">
          <div className="text-xs font-semibold text-neutral-300 px-2 py-1 mb-2 font-mono">
            ENFORCED TREATIES & STATUTES
          </div>
          {INITIAL_LEGAL_ARTICLES.map((article) => (
            <button
              key={article.id}
              onClick={() => setSelectedArticleId(article.id)}
              className={`w-full text-left p-3 rounded-lg border transition-all ${
                selectedArticleId === article.id
                  ? 'bg-neutral-900 border-neutral-700 text-neutral-100 shadow-sm'
                  : 'bg-neutral-950/40 border-neutral-800/80 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/40'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono text-purple-400">{article.authority}</span>
                <span className="text-[10px] font-mono text-emerald-400">ENFORCED</span>
              </div>
              <div className="text-xs font-semibold text-neutral-200 truncate">{article.title}</div>
            </button>
          ))}
        </div>

        {/* Right Column: Detailed Clause Explorer */}
        <div className="lg:col-span-2 border border-neutral-800 rounded-lg bg-neutral-900/40 p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <div>
                <span className="text-[11px] font-mono text-purple-400 block mb-1">
                  {selectedArticle.authority} STATUTORY ENFORCEMENT
                </span>
                <h2 className="text-base font-semibold text-neutral-100">{selectedArticle.title}</h2>
              </div>
              <span className="px-2.5 py-1 text-xs font-mono font-medium text-emerald-300 bg-emerald-950/80 border border-emerald-800 rounded">
                Kernel Enforced
              </span>
            </div>

            <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-lg">
              <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider block mb-1">
                Official Statutory Clause:
              </span>
              <p className="text-sm italic text-neutral-200 leading-relaxed font-serif">
                "{selectedArticle.clause}"
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <strong className="text-neutral-300 block mb-1">Application to Software & Creator Protection:</strong>
                <p className="text-neutral-400 leading-relaxed">{selectedArticle.summary}</p>
              </div>

              <div>
                <strong className="text-neutral-300 block mb-1">Strict Mandate Against Autonomous AI:</strong>
                <p className="text-neutral-400 leading-relaxed">{selectedArticle.applicabilityToAI}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-500">
            <span>Project Owner: {PROJECT_OWNER}</span>
            <span>Zero-Tolerance Human Rights Compliance</span>
          </div>
        </div>
      </div>

      {/* Legal Declaration Modal */}
      {showCertificateModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-700 rounded-lg max-w-3xl w-full p-6 text-neutral-100 shadow-2xl max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-semibold text-neutral-100">
                  Official Sovereign Declaration & Certificate
                </h3>
              </div>
              <button
                onClick={() => setShowCertificateModal(false)}
                className="text-neutral-400 hover:text-neutral-200 text-sm"
              >
                Close
              </button>
            </div>

            <div className="flex-1 overflow-y-auto my-4 p-4 bg-neutral-950 border border-neutral-800 rounded font-mono text-xs text-neutral-300 whitespace-pre-wrap leading-relaxed">
              {certificateText}
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-800">
              <button
                onClick={handlePrintCertificate}
                className="px-3 py-1.5 text-xs font-medium text-neutral-300 bg-neutral-800 hover:bg-neutral-700 rounded transition-colors inline-flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                Print Certificate
              </button>
              <button
                onClick={handleDownloadCertificate}
                className="px-4 py-1.5 text-xs font-semibold text-emerald-100 bg-emerald-700 hover:bg-emerald-600 rounded transition-colors inline-flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                Download Declaration (.txt)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
