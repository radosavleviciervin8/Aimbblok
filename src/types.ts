export type SystemStatus = 'SECURE' | 'RESTRICTED' | 'EMERGENCY_LOCKDOWN' | 'INVESTIGATION';

export type RequesterType = 'AI_AGENT' | 'AUTOMATED_BOT' | 'EXTERNAL_API' | 'THIRD_PARTY_SERVICE' | 'HUMAN_AUDITOR';

export interface PermissionRecord {
  id: string;
  grantee: string;
  granteeType: RequesterType;
  purpose: string;
  scope: string;
  grantedBy: string; // "Ervin Remus Radosavlevici"
  grantedAt: string;
  expiresAt: string;
  status: 'ACTIVE' | 'REVOKED' | 'EXPIRED';
  auditHash: string;
  notes?: string;
}

export interface AccessRequest {
  id: string;
  requester: string;
  requesterType: RequesterType;
  requestedAction: 'READ_FILES' | 'EXTRACT_CODE' | 'EXPORT_DATA' | 'MODIFY_REPO' | 'EXECUTE_CODE' | 'CREATE_ROUTE';
  targetResource: string;
  claimedPurpose: string;
  requestedScope: string;
  timestamp: string;
  status: 'PENDING_HUMAN_APPROVAL' | 'APPROVED' | 'DENIED' | 'QUARANTINED';
  riskScore: number; // 0-100
  breachFlag?: string;
}

export interface AuditEvent {
  id: string;
  timestamp: string;
  actor: string;
  actorType: RequesterType | 'HUMAN_OWNER' | 'SYSTEM_KERNEL';
  action: string;
  targetResource: string;
  decision: 'DENIED' | 'STOPPED_AND_SEALED' | 'PERMITTED_BY_HUMAN' | 'EMERGENCY_HALT';
  stopConditionTriggered: boolean;
  violationType?: string;
  evidenceHash: string;
  rawPayloadSnippet: string;
  humanReviewed: boolean;
  reviewedBy?: string;
  reviewedAt?: string;
}

export interface LegalArticle {
  id: string;
  authority: 'UNITED_NATIONS' | 'UNESCO' | 'NIST_ZERO_TRUST' | 'INTERNATIONAL_HUMAN_RIGHTS';
  title: string;
  clause: string;
  summary: string;
  applicabilityToAI: string;
  status: 'ENFORCED_IN_KERNEL';
}

export interface StopConditionPhase {
  step: 'STOP' | 'DENY' | 'LOG' | 'PRESERVE_EVIDENCE' | 'REVOKE_ACCESS' | 'REQUIRE_HUMAN_REVIEW';
  status: 'IDLE' | 'ACTIVE' | 'EXECUTED' | 'FAILED';
  description: string;
  executionTimestamp?: string;
  evidenceArtifact?: string;
}
