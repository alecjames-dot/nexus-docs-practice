# On-Chain Governance Spec

**Status:** Draft
**Owner:** @alec
**Last Updated:** 2026-02-15
**ADRs:** None yet — governance design is pending token model decisions
**Related Specs:** [USDX Core](../usdx/SPEC.md), [Prover Slashing v1](../prover-network/SLASHING-SPEC.md)

---

## 1. Problem Statement

Several critical Nexus protocol parameters — USDX burn authority, slashing thresholds, prover staking minimums, yield formula parameters, and contract upgrade authority — require a legitimate, on-chain decision-making mechanism that is neither controlled by the founding team nor fully autonomous. Without governance, parameter changes require centralized multisig decisions (trust risk) or are immutable (ossification risk). Nexus needs an on-chain governance system where protocol participants can propose, deliberate, vote on, and execute parameter changes and upgrades with appropriate safeguards — timelocks, quorum requirements, and execution guardrails — that make the system resistant to capture while remaining adaptable to evolving conditions.

---

## 2. Goals & Non-Goals

**Goals:**
- Define the governance token model and vote weight mechanism.
- Define the proposal lifecycle: creation, voting period, execution, and cancellation.
- Define quorum and approval threshold requirements.
- Define the timelock mechanism that separates approval from execution.
- Enumerate which protocol parameters are governance-controlled and which are immutable.
- Integrate with USDX burn authority (ADR-003) and prover slashing parameters.

**Non-Goals:**
- Off-chain social governance (Snapshot, forum votes — these may inform on-chain votes but are not binding).
- Governance of non-protocol matters (team decisions, business strategy, partnerships).
- Delegate delegation chains beyond 1 level (no transitive delegation in v1).
- Cross-chain governance or governance of contracts on other networks.
- Real-time governance (all proposals have a minimum deliberation period — no emergency governance bypass).
- Governance of the governance system itself (meta-governance — deferred to a future spec).
- Identifying or verifying the legal identity of governance participants (anonymous participation is permitted).

---

## 3. User Stories

> As a **Protocol Governor**, I want to submit a governance proposal to adjust the USDX yield formula parameters so that yield can remain economically calibrated as network revenue evolves.

> As a **Protocol Governor**, I want a minimum deliberation period before any proposal can be executed so that I have time to review proposals, consult with delegates, and cast an informed vote.

> As a **DeFi Developer**, I want to query the on-chain governance parameters (staking minimums, slashing thresholds, yield parameters) at any time so that my protocol can adapt to governance-controlled changes without manual reconfiguration.

> As a **USDX Holder**, I want governance to be the only entity that can burn USDX so that I can trust that supply reduction is a deliberate community decision, not a protocol bug or exploit.

---

## 4. Functional Requirements

- **FR-001:** The governance system SHALL use a governance token (token design TBD — see Open Questions) as the basis for vote weight. One token SHALL equal one vote. Vote weight is determined at proposal creation time (snapshot block), not at voting time.

- **FR-002:** Any address holding at least a minimum governance token balance (governance-controlled parameter, initial value TBD) SHALL be able to submit a governance proposal. Proposals SHALL specify: (a) target contract address, (b) calldata for the execution, (c) a human-readable description, and (d) links to relevant specs or ADRs.

- **FR-003:** Each proposal SHALL have a voting period of at least 5 days (governance-controlled, initial value). Votes SHALL be cast as `For`, `Against`, or `Abstain`. Abstain votes count toward quorum but not toward the approval threshold.

- **FR-004:** A proposal SHALL be eligible for execution if: (a) total votes (For + Against + Abstain) reach the quorum threshold (governance-controlled, initial value TBD), AND (b) the percentage of `For` votes (out of For + Against only) exceeds the approval threshold (governance-controlled, initial value: 60%).

- **FR-005:** Approved proposals SHALL be subject to a timelock period (governance-controlled, minimum 48 hours, initial value: 72 hours) before execution. Any address may execute an approved, timelock-passed proposal by calling `GovernanceExecutor.execute(proposalId)`.

- **FR-006:** Proposals that fail to meet quorum or are rejected by vote SHALL automatically transition to `Defeated` status. Proposals that pass quorum and approval but are not executed within 30 days of the timelock expiring SHALL transition to `Expired` status and may not be executed.

- **FR-007:** The governance system SHALL support vote delegation: a token holder may delegate their vote weight to another address. Delegation is active immediately and persists until changed. Self-delegation is required to vote directly.

- **FR-008:** The governance executor SHALL enforce an allowlist of executable actions: only contracts registered in the `GovernanceRegistry` may be called by executed proposals. Proposals targeting unregistered contracts SHALL revert. Adding a contract to the `GovernanceRegistry` is itself a governance action.

---

## 5. Non-Functional Requirements

- **NFR-001:** [Security] The governance timelock SHALL be the only address with authority to execute privileged operations: USDX burns (per ADR-003), slashing parameter updates, prover staking minimum changes, and contract upgrades. No multisig, EOA, or admin key retains these authorities after governance deployment.

- **NFR-002:** [Transparency] All governance proposals, votes, and execution events SHALL be emitted as on-chain events and readable from on-chain state. Off-chain governance tooling may supplement but may not substitute on-chain records.

- **NFR-003:** [Participation] The governance system SHALL not impose any participation mechanism (lockups, staking, bonding) that prevents a token holder from exiting the system while a vote is in progress. Vote delegation allows holders to remain liquid while staying represented.

- **NFR-004:** [Resilience] The governance system SHALL not have a pause or shutdown mechanism. Once deployed, governance continues indefinitely until a new governance system is adopted via governance vote. There is no admin key that can halt governance.

---

## 6. Acceptance Requirements

> Criteria that must be demonstrably true for this spec to move Draft → Review → Approved → Shipped.

### 6a. Functional Acceptance

- [ ] **AC-001:** Given an eligible proposer (meets minimum token balance), when they submit a valid proposal, then a `ProposalCreated` event is emitted with the correct snapshot block, voting period end, and description.
- [ ] **AC-002:** Given an active proposal in its voting period, when a token holder casts a `For` vote, then their full delegated vote weight is recorded and the proposal's `forVotes` count increases accordingly.
- [ ] **AC-003:** Given a proposal with quorum and 60%+ approval, when the voting period closes, then the proposal transitions to `Queued` and the timelock starts.
- [ ] **AC-004:** Given a `Queued` proposal past its timelock, when any address calls `execute(proposalId)`, then the proposal's target contract is called with the specified calldata.
- [ ] **AC-005:** Given a proposal targeting a contract not in the `GovernanceRegistry`, when execution is attempted, then it reverts.
- [ ] **AC-006:** Given a USDX burn executed through the governance timelock, when finalized, then USDX supply decreases as specified — with no way to achieve the same result outside governance.
- [ ] **AC-007:** All FR-001 through FR-008 requirements have corresponding passing tests in CI.

### 6b. Non-Functional Acceptance

- [ ] **AC-NFR-001:** Confirm no admin key or multisig retains privileged authority after governance deployment (formal access control audit).
- [ ] **AC-NFR-002:** Simulate a token holder voting, then immediately transferring their tokens — confirm vote weight was snapshotted at proposal creation and is not affected by transfer.
- [ ] **AC-NFR-003:** Governance pause mechanism test: confirm no pause function exists in the governance contracts.

### 6c. Documentation Acceptance

- [ ] **AC-DOC-001:** PRODUCT_MAP.md updated to reflect `Shipped` status.
- [ ] **AC-DOC-002:** CLAUDE.md updated to reflect governance as the authority for privileged operations.
- [ ] **AC-DOC-003:** CHANGELOG entry added with date and summary.
- [ ] **AC-DOC-004:** Governance token ADR written and linked from this spec.

### 6d. Definition of Done

All AC items above are checked AND:
- [ ] Governance deployed to testnet with at least 3 end-to-end proposal lifecycle tests.
- [ ] At least one governance-authorized USDX burn executed on testnet via governance.
- [ ] On-call runbook updated with governance failure modes (stuck proposals, executor reverts, timelock failures).
- [ ] Spec status updated to `Shipped` in this file and in PRODUCT_MAP.md.

---

## 7. Technical Design Notes

**Architecture**: The governance system is modeled on OpenZeppelin Governor with custom extensions. Core contracts:
- `NexusGovernor`: Proposal creation, voting, and status management.
- `GovernanceTimelock`: TimelockController that is the sole executor of privileged actions.
- `GovernanceRegistry`: Allowlist of contracts that governance can interact with.
- `GovernanceToken`: ERC-20 votes token with snapshot and delegation capability.

**Token model**: The specific token design — whether governance uses a new token, USDX itself, or staked USDX — is an open question (see Q1). This has significant implications for governance capture risk, tokenomics, and regulatory classification. This spec assumes a governance token exists; the token design spec will be written separately once Q1 is resolved.

**Integration points**: Governance timelock is installed as the admin of:
- `USDXToken` BURN_ROLE (per ADR-003)
- `SlashingManager` parameter setter
- `ProverRegistry` staking minimum setter
- `YieldCalculator` parameter setter
- All upgradeable contract proxy admins

---

## 8. Open Questions

- [ ] **Q1**: What is the governance token model? Options: (a) new dedicated governance token, (b) USDX itself as governance token (1 USDX = 1 vote), (c) staked USDX (only staked USDX votes). Each has different regulatory, tokenomic, and capture-risk implications. Token model is not finalized — this spec cannot reach Approved without resolution. — Owner: @alec — Resolve by: TBD (blocking on external token counsel review).

- [ ] **Q2**: What is the initial quorum threshold? Without knowing the expected initial governance token distribution, setting a meaningful quorum is not possible. A quorum that is too low enables governance attacks with small token amounts; too high risks perpetual governance gridlock. This needs modeling against expected token distribution. — Owner: @alec — Resolve by: TBD (depends on Q1).

- [ ] **Q3**: Should governance token holders be able to vote anonymously using ZK proofs of token ownership? This would preserve voter privacy but add significant circuit complexity and may delay governance launch. The question has both technical and political dimensions — some participants may require on-chain voting records for their fiduciary obligations. — Owner: @alec — Resolve by: TBD (requires legal input and community discussion).

---

## 9. Success Metrics

| Metric | Target | Measurement Method |
|--------|--------|--------------------|
| Governance participation rate | ≥ 20% of token supply voting per proposal | On-chain vote tallies |
| Proposal success rate | ≥ 40% (not too easy, not too hard) | GovernanceExecutor events |
| Time to execution (from vote close) | Median < 5 days | Proposal lifecycle timestamps |
| Governance capture incidents | 0 — no successful attacks | Security monitoring |
| Protocol parameter changes via governance | 100% of privileged changes through governance | Access control audit |

---

## 10. Changelog

| Date | Author | Change |
|------|--------|--------|
| 2026-02-01 | @alec | Initial draft; token model marked as open question |
| 2026-02-15 | @alec | Added Q2 (quorum threshold) and Q3 (anonymous voting); expanded Non-Goals section |
