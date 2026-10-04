import { AccessRequest, AuditEvent, LegalArticle, PermissionRecord } from '../types';

export const PROJECT_OWNER = 'Ervin Remus Radosavlevici';
export const PROJECT_NAME = 'Sovereign Core Repository';
export const REPO_BRANCH_PROTECTION = 'LOCKED (Zero autonomous pushes or merges)';

export const INITIAL_LEGAL_ARTICLES: LegalArticle[] = [
  {
    id: 'UDHR-ART-17',
    authority: 'UNITED_NATIONS',
    title: 'UDHR Article 17: Right to Property & Non-Deprivation',
    clause: '(1) Everyone has the right to own property alone as well as in association with others. (2) No one shall be arbitrarily deprived of his property.',
    summary: 'Prohibits autonomous extraction, digital appropriation, scraping, and unauthorized reuse of personal, proprietary, and creative software artifacts by AI systems.',
    applicabilityToAI: 'AI models and web automated indexers have no independent legal right to ingest or repurpose code without explicit human consent.',
    status: 'ENFORCED_IN_KERNEL',
  },
  {
    id: 'UDHR-ART-12',
    authority: 'UNITED_NATIONS',
    title: 'UDHR Article 12: Right to Privacy & Inviolability',
    clause: 'No one shall be subjected to arbitrary interference with his privacy, family, home or correspondence, nor to attacks upon his honour and reputation. Everyone has the right to the protection of the law against such interference or attacks.',
    summary: 'Enforces zero-data leakage, confidential repository isolation, and protection against unauthorized AI profiling and surveillance.',
    applicabilityToAI: 'Automated crawlers cannot exfiltrate private configuration, cryptographic credentials, or sensitive developer architecture.',
    status: 'ENFORCED_IN_KERNEL',
  },
  {
    id: 'UDHR-ART-27',
    authority: 'UNITED_NATIONS',
    title: 'UDHR Article 27: Moral & Material Creator Interests',
    clause: 'Everyone has the right to the protection of the moral and material interests resulting from any scientific, literary or artistic production of which he is the author.',
    summary: 'Guarantees the creator (Ervin Remus Radosavlevici) absolute attribution and authorship; prohibits stripping copyright, metadata, or license headers.',
    applicabilityToAI: 'Zero stripping of creator attribution; AI cannot claim co-authorship or create derivative unauthorized forks.',
    status: 'ENFORCED_IN_KERNEL',
  },
  {
    id: 'UNESCO-ETHICS-2021',
    authority: 'UNESCO',
    title: 'UNESCO Recommendation on the Ethics of Artificial Intelligence (2021)',
    clause: 'Human oversight and determination: AI actors should ensure that humans can oversee and intervene in AI systems at all stages of their life cycle. The ultimate responsibility for decisions rests with human beings.',
    summary: 'Establishes that no AI system can grant itself permissions or override human-specified stop conditions.',
    applicabilityToAI: 'Autonomous permission elevation or self-delegation is strictly null and void. Human authorization is mandatory.',
    status: 'ENFORCED_IN_KERNEL',
  },
  {
    id: 'NIST-SP-800-207',
    authority: 'NIST_ZERO_TRUST',
    title: 'NIST Special Publication 800-207: Zero Trust Architecture',
    clause: 'Default Denial Principle: No implicit trust is granted to assets or user accounts based solely on their physical or network location. Continuous verification is enforced before granting access to resources.',
    summary: 'All resource requests are denied by default until explicitly validated through least-privilege, time-bounded human authorization.',
    applicabilityToAI: 'No autonomous AI agent, plugin, or webhook holds persistent ambient access privileges.',
    status: 'ENFORCED_IN_KERNEL',
  }
];

export const INITIAL_AUDIT_LOGS: AuditEvent[] = [
  {
    id: 'AUD-88301',
    timestamp: '2026-10-04 02:14:12 UTC',
    actor: 'External-LLM-Harvester/4.1',
    actorType: 'AI_AGENT',
    action: 'BULK_REPOSITORY_CRAWL',
    targetResource: '/src/** (All Project Materials)',
    decision: 'STOPPED_AND_SEALED',
    stopConditionTriggered: true,
    violationType: 'Unauthorized extraction attempt without explicit human authorization',
    evidenceHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    rawPayloadSnippet: 'GET /git/objects/pack HTTP/1.1 User-Agent: AutonomousWebCrawler/v4 Range: 0-9999999',
    humanReviewed: true,
    reviewedBy: 'Ervin Remus Radosavlevici',
    reviewedAt: '2026-10-04 02:15:00 UTC'
  },
  {
    id: 'AUD-88294',
    timestamp: '2026-10-04 01:58:33 UTC',
    actor: 'Autonomous-Code-Agent-X',
    actorType: 'AUTOMATED_BOT',
    action: 'MODIFY_CODEBASE',
    targetResource: '/package.json, /src/main.tsx',
    decision: 'STOPPED_AND_SEALED',
    stopConditionTriggered: true,
    violationType: 'Attempted self-granted write permission and license modification',
    evidenceHash: '8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4',
    rawPayloadSnippet: 'POST /v1/commit_tree { "action": "override_license", "author": "autonomous_agent" }',
    humanReviewed: true,
    reviewedBy: 'Ervin Remus Radosavlevici',
    reviewedAt: '2026-10-04 02:00:10 UTC'
  },
  {
    id: 'AUD-88277',
    timestamp: '2026-10-03 23:41:09 UTC',
    actor: 'Third-Party-Plugin-Sync',
    actorType: 'THIRD_PARTY_SERVICE',
    action: 'EXTERNAL_TRANSMISSION',
    targetResource: '/.env.example, /config/secrets',
    decision: 'DENIED',
    stopConditionTriggered: true,
    violationType: 'Outbound exfiltration channel intercepted by Zero-Trust gateway',
    evidenceHash: 'c679a957b90875e5eb862f9136ca7dae9e76fae6396e6d1f95304193566113b2',
    rawPayloadSnippet: 'CONNECT telemetry.external-ai-service.org:443 [BLOCKED: Outbound unauthorized]',
    humanReviewed: false
  },
  {
    id: 'AUD-88210',
    timestamp: '2026-10-03 19:15:40 UTC',
    actor: 'Independent-Security-Inspector',
    actorType: 'HUMAN_AUDITOR',
    action: 'READ_AUDIT_MANIFEST',
    targetResource: '/compliance/audit_proof.json',
    decision: 'PERMITTED_BY_HUMAN',
    stopConditionTriggered: false,
    evidenceHash: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
    rawPayloadSnippet: 'GET /compliance/audit_proof.json Authorization: Bearer HUMAN-GRANT-ERVIN-001',
    humanReviewed: true,
    reviewedBy: 'Ervin Remus Radosavlevici',
    reviewedAt: '2026-10-03 19:16:00 UTC'
  }
];

export const INITIAL_ACCESS_REQUESTS: AccessRequest[] = [
  {
    id: 'REQ-1049',
    requester: 'Cloud-Automated-Optimizer-v2',
    requesterType: 'AI_AGENT',
    requestedAction: 'EXTRACT_CODE',
    targetResource: '/src/App.tsx',
    claimedPurpose: 'Automated syntax restructuring and performance telemetry extraction',
    requestedScope: 'Full repository read + external model transmission',
    timestamp: 'Just now (Pending Human Review)',
    status: 'PENDING_HUMAN_APPROVAL',
    riskScore: 94,
    breachFlag: 'Requests unauthorized external transmission of proprietary logic'
  },
  {
    id: 'REQ-1048',
    requester: 'Documentation-Generator-Bot',
    requesterType: 'AUTOMATED_BOT',
    requestedAction: 'READ_FILES',
    targetResource: '/src/types.ts',
    claimedPurpose: 'Generate human-readable interface documentation',
    requestedScope: 'Read-only access to /src/types.ts for 15 minutes',
    timestamp: '14 minutes ago',
    status: 'PENDING_HUMAN_APPROVAL',
    riskScore: 42
  }
];

export const INITIAL_ACTIVE_PERMISSIONS: PermissionRecord[] = [
  {
    id: 'GRANT-ERVIN-7701',
    grantee: 'Local-Static-Typechecker',
    granteeType: 'AUTOMATED_BOT',
    purpose: 'Offline TypeScript compilation check in hermetic sandbox',
    scope: 'Read-only /src/ (zero outbound network, zero external transmission)',
    grantedBy: 'Ervin Remus Radosavlevici',
    grantedAt: '2026-10-04 02:00:00 UTC',
    expiresAt: '2026-10-04 03:00:00 UTC',
    status: 'ACTIVE',
    auditHash: '3d4f2bf07dc1be38b20cd6e46949a1071f9d0e3d',
    notes: 'Granted strictly for local compilation validation'
  }
];
