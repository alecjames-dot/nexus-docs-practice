# Prover Slashing v1 Spec

**Status:** Draft
**Owner:** @priya
**Last Updated:** 2026-02-10
**ADRs:** [ADR-003 — USDX Burn Authority](../../../architecture/decisions/ADR-003-usdx-burn-authority.md), [ADR-004 — Prover Slashing Scope](../../../architecture/decisions/ADR-004-prover-slashing-scope.md)
**Related Specs:** [Prover Network](./SPEC.md), [USDX Core](../usdx/SPEC.md)

---

## 1. Problem Statement

The decentralized prover network relies on economic incentives to ensure Prover Operators remain online and responsive. Without meaningful penalties for liveness failures, rational operators have no cost to going offline during low-fee periods, creating network fragility at exactly the moments when the chain needs proof generation most. Version 1 slashing addresses this with a targeted liveness penalty mechanism: Provers who fail to submit proofs within the required window are penalized by having a portion of their staked collateral confiscated. Fault and fraud proof slashing — penalizing incorrect proofs — is explicitly out of scope for v1 per ADR-004 and will be addressed in v2.

---

## 2. Goals & Non-Goals

**Goals:**
- Define precise liveness failure conditions that trigger a slash.
- Define the penalty structure: slash percentage, escalation for repeated failures, and minimum stake floor.
- Define the slash execution mechanism: who calls the slash, how it is verified, and where slashed funds go.
- Ensure Prover Operators have enough information to set appropriate alerting thresholds to avoid accidental slashing.
- Establish a grace period mechanism for legitimate infrastructure incidents.

**Non-Goals:**
- Fault proof slashing (penalizing incorrect proofs) — deferred to v2 per ADR-004.
- Fraud proof slashing — deferred to v2.
- Burning slashed USDX — slashed funds go to the protocol treasury per ADR-003. There is no USDX burn in v1.
- Prover reward adjustments (dynamic fee increases for high uptime) — separate from slashing, not in v1 scope.
- Social slashing or governance-override slashing — v2 consideration.

---

## 3. User Stories

> As a **Prover Operator**, I want to know the exact liveness SLA I am committing to at registration so that I can configure my alerting and failover systems to avoid accidental slashing.

> As a **Prover Operator**, I want a grace period for brief infrastructure incidents so that a single server restart does not result in a full slash event.

> As a **Protocol Governor**, I want slashing parameters (penalty percentage, liveness window, grace period) to be adjustable via governance so that the protocol can respond to changing network conditions.

> As a **DeFi Developer**, I want the prover network to maintain liveness through economic incentives so that my application is not blocked by prover downtime.

---

## 4. Functional Requirements

- **FR-001:** The liveness tracking system SHALL record a Prover's failure to submit a proof for an assigned task within the liveness window. The liveness window SHALL be a governance-controlled parameter, initially set to 30 seconds from task dispatch.

- **FR-002:** The slashing contract SHALL implement a grace period: a Prover who fails to submit within the liveness window SHALL NOT be immediately slashed if they submit within the grace period (governance-controlled, initially 5 minutes from task dispatch). A Prover who submits within the grace period SHALL receive no proof fee for that task but SHALL NOT be penalized in stake.

- **FR-003:** A Prover who fails to submit within the grace period SHALL have their stake reduced by the tier-1 slash penalty (governance-controlled, initial value: 2% of current stake). This penalty is applied to each missed task independently.

- **FR-004:** If a Prover accumulates 3 or more missed tasks (beyond the grace period) within a single epoch (1 epoch = 2048 blocks), the slashing contract SHALL apply the tier-2 escalated penalty (governance-controlled, initial value: 10% of current stake) in lieu of tier-1 penalties for the third and subsequent failures in that epoch.

- **FR-005:** Slashed collateral SHALL be transferred from the `ProverRegistry` contract to the `ProtocolTreasury` contract. Slashed collateral SHALL NOT be burned. This is consistent with CONSTRAINTS.md ECON-002 and ADR-003.

- **FR-006:** If a Prover's staked collateral falls below the minimum stake threshold following slashing events, the `ProverRegistry` SHALL immediately set the Prover's status to `inactive` and remove them from the proof task dispatch queue. The Prover must re-stake to minimum before reactivation.

- **FR-007:** The slashing contract SHALL emit a `ProverSlashed(proverId, taskId, slashAmount, reason, newStakeBalance)` event for every executed slash, providing a fully auditable on-chain record.

---

## 5. Non-Functional Requirements

- **NFR-001:** [Security] Slash execution SHALL require a signed attestation from the Nexus sequencer confirming the Prover's liveness failure. No third party (including other Provers) may trigger a slash without sequencer attestation.

- **NFR-002:** [Transparency] All slashing parameters (liveness window, grace period, tier-1 penalty, tier-2 penalty, epoch length) SHALL be readable from on-chain governance parameter storage. There are no hidden or hardcoded slashing parameters.

- **NFR-003:** [Governance] All slashing parameters listed in NFR-002 SHALL be adjustable via on-chain governance vote with a minimum 48-hour timelock before taking effect.

- **NFR-004:** [Auditability] A Prover Operator SHALL be able to reconstruct their complete slashing history from on-chain events alone (no off-chain data required).

---

## 6. Acceptance Requirements

> Criteria that must be demonstrably true for this spec to move Draft → Review → Approved → Shipped.

### 6a. Functional Acceptance

- [ ] **AC-001:** Given a Prover receives a proof task, when the Prover submits a valid proof within the liveness window (30s), then no liveness failure is recorded and the Prover receives the proof fee.
- [ ] **AC-002:** Given a Prover misses the liveness window (30s) but submits within the grace period (5 minutes), then no stake penalty is applied but the Prover receives no proof fee for that task.
- [ ] **AC-003:** Given a Prover fails to submit within the grace period, when the grace period expires, then the slashing contract applies a tier-1 penalty (2% of current stake) and emits a `ProverSlashed` event.
- [ ] **AC-004:** Given a Prover accumulates 3 missed tasks in a single epoch (2048 blocks), when the third miss is processed, then the tier-2 penalty (10% of current stake) is applied instead of tier-1.
- [ ] **AC-005:** Given a slash is executed, when the `ProtocolTreasury` balance is queried, then it reflects the slashed amount transferred from the Prover's stake — no USDX is burned.
- [ ] **AC-006:** Given a Prover's stake falls below the minimum following slashing, when the dispatch queue is queried, then the Prover is not present in the active Prover set.
- [ ] **AC-007:** All FR-001 through FR-007 requirements have corresponding passing tests in CI.

### 6b. Non-Functional Acceptance

- [ ] **AC-NFR-001:** Confirm that a slash cannot be executed without a sequencer-signed liveness failure attestation (attempt without signature must revert).
- [ ] **AC-NFR-002:** Read all slashing parameters from on-chain governance storage and confirm they match the initial values specified in FRs.
- [ ] **AC-NFR-003:** Simulate a governance parameter change to the liveness window and confirm it takes effect after the 48-hour timelock.

### 6c. Documentation Acceptance

- [ ] **AC-DOC-001:** PRODUCT_MAP.md updated to reflect `Shipped` status.
- [ ] **AC-DOC-002:** CLAUDE.md updated if any invariants or module boundaries changed.
- [ ] **AC-DOC-003:** CHANGELOG entry added with date and summary.
- [ ] **AC-DOC-004:** Any ADRs made during implementation are merged and linked above.

### 6d. Definition of Done

All AC items above are checked AND:
- [ ] Slashing contract deployed to testnet and at least 2 end-to-end slash events executed on testnet.
- [ ] On-call runbook updated with slashing-related failure modes (sequencer attestation failure, treasury transfer failure).
- [ ] Spec status updated to `Shipped` in this file and in PRODUCT_MAP.md.

---

## 7. Technical Design Notes

**Slash execution flow**:
1. Sequencer detects liveness failure (task not submitted within liveness window).
2. Sequencer produces a signed `LivenessFailureAttestation(proverId, taskId, blockHeight, missType)`.
3. After the grace period expires without a proof submission, anyone (sequencer or external party) may call `SlashingManager.executeSlash(attestation)`.
4. `SlashingManager` verifies the attestation signature, calculates the penalty tier, and calls `ProverRegistry.slash(proverId, amount)`.
5. `ProverRegistry` deducts stake and calls `ProtocolTreasury.deposit(amount)`.
6. Events emitted at each step for auditability.

**Epoch tracking**: The `SlashingManager` tracks per-Prover miss counts per epoch. Epoch boundaries are defined by block height (every 2048 blocks). Miss counts reset to 0 at the start of each new epoch. This prevents indefinite penalty escalation from historical incidents.

**Governance parameters**: All slashing parameters are stored in the `GovernanceParameters` contract. The `SlashingManager` reads parameters from there on each slash execution — parameter changes take effect immediately for future slashes after the timelock.

**Reference to ADR-003**: Early versions of this spec assumed that slashed collateral would be burned as deflationary pressure on USDX supply. ADR-003 resolved this: burn authority is governance-only in v1, so slashed funds go to the treasury instead. The design notes here reflect the current treasury-destination model.

---

## 8. Open Questions

- [ ] **Q1**: What is the appropriate initial tier-1 and tier-2 slash percentage? The current placeholders (2% and 10%) are proposals, not finalized values. Should these be modeled against expected prover economics before locking in? — Owner: @priya — Resolve by: 2026-03-15

- [ ] **Q2**: Should there be a maximum total slash per epoch (a cap on cumulative penalties)? Without a cap, a Prover who goes down for an entire epoch could be fully slashed to zero, which may be disproportionate for first-time incidents. Needs design discussion and economic modeling. — Owner: @priya — Resolve by: 2026-03-15

---

## 9. Success Metrics

| Metric | Target | Measurement Method |
|--------|--------|--------------------|
| Prover liveness rate | ≥ 98% of tasks submitted within liveness window | Dispatcher event logs |
| Slash event rate | < 2% of proof tasks result in a slash | SlashingManager events |
| Treasury inflow from slashing | Tracked (no specific target) | ProtocolTreasury events |
| False positive slash rate | 0 — no slash without sequencer attestation | Audit of slash events vs attestations |
| Prover churn rate post-slashing | < 10% of slashed Provers deregister within 30 days | Registry monitoring |

---

## 10. Changelog

| Date | Author | Change |
|------|--------|--------|
| 2026-01-08 | @priya | Initial draft, scoped to liveness-only per ADR-004 |
| 2026-01-20 | @priya | Added grace period mechanism (FR-002); clarified treasury destination per ADR-003 |
| 2026-02-10 | @priya | Added Q1 and Q2 as open questions; added epoch cap consideration to design notes |
