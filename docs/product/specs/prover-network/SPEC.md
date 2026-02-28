# Prover Network Spec

**Status:** Approved
**Owner:** @priya
**Last Updated:** 2026-01-08
**ADRs:** [ADR-004 — Prover Slashing Scope](../../../architecture/decisions/ADR-004-prover-slashing-scope.md)
**Related Specs:** [zkVM Execution Environment](../zkvm/SPEC.md), [Prover Slashing v1](./SLASHING-SPEC.md)

---

## 1. Problem Statement

The Nexus zkVM requires proof generation for every state transition, but centralizing this function in a single operator or a permissioned set introduces unacceptable trust and liveness risk. If the proof generator goes offline or acts maliciously, the entire chain halts. The solution is a decentralized, economically-incentivized prover network where any operator meeting hardware and staking requirements can participate, earn fees, and be penalized for failures. This spec covers the full prover lifecycle: registration, job assignment, proof submission, and fee distribution. Slashing conditions are addressed in the companion [Slashing Spec](./SLASHING-SPEC.md).

---

## 2. Goals & Non-Goals

**Goals:**
- Define permissionless prover registration with clear hardware and staking requirements.
- Define the job assignment mechanism that dispatches proof tasks from the sequencer to registered provers.
- Define proof submission, verification, and fee distribution flows.
- Ensure the prover network provides sufficient redundancy to withstand individual prover failures without chain liveness impact.
- Enable Prover Operators to inspect their performance history and staking status on-chain.

**Non-Goals:**
- Slashing conditions and penalty mechanics (see [SLASHING-SPEC.md](./SLASHING-SPEC.md)).
- Prover marketplace with open bidding (Phase 3 — not in scope for v1).
- Multi-prover parallel proof generation for the same task (v2 consideration).
- Prover identity verification beyond cryptographic key registration.

---

## 3. User Stories

> As a **Prover Operator**, I want to register my node by staking collateral and submitting hardware attestation so that I can start receiving proof tasks.

> As a **Prover Operator**, I want proof tasks dispatched to me with only public inputs so that I can generate proofs without accessing user transaction data.

> As a **Prover Operator**, I want proof fees automatically credited to my operator address upon successful proof submission so that I do not need to manually claim earnings.

> As a **DeFi Developer**, I want the prover network to maintain sufficient redundancy so that my application continues to produce proofs even when individual provers go offline.

> As a **Protocol Governor**, I want prover staking minimums and fee parameters to be adjustable via governance so that the protocol can adapt to changes in hardware costs and network conditions.

---

## 4. Functional Requirements

- **FR-001:** The prover network contract SHALL allow any Ethereum address to register as a Prover by: (a) staking a minimum collateral amount (governance-controlled, initially 10,000 USDX), (b) submitting a signed registration message with the prover's hardware class and public key, and (c) passing an on-chain liveness check (submitting a test proof within 24 hours of registration).

- **FR-002:** The proof task dispatcher SHALL maintain an ordered queue of registered, active Provers and SHALL dispatch each proof task to the next available Prover using a deterministic round-robin algorithm based on block height modulo active prover count.

- **FR-003:** The proof task dispatcher SHALL include fallback logic: if a dispatched Prover does not submit a proof within the liveness window (defined in [SLASHING-SPEC.md](./SLASHING-SPEC.md)), the task SHALL be re-dispatched to the next Prover in the queue, and the original Prover SHALL be flagged for the liveness tracking system.

- **FR-004:** Upon receiving a proof task, the Prover SHALL have access to: (a) the public inputs for the proof computation, (b) the circuit identifier and version, (c) the block height and sequencer-signed task identifier. The task payload SHALL NOT contain raw transaction calldata or user private inputs.

- **FR-005:** Upon successful proof submission, the settlement layer SHALL verify the proof on-chain and, if valid: (a) emit a `ProofVerified(blockHeight, proofId, proverId)` event, (b) transfer the proof fee (from the protocol fee buffer) to the Prover's registered address, and (c) update the Prover's on-chain submission record.

- **FR-006:** The prover network contract SHALL expose a `getProverStats(proverId)` view function returning: total proofs submitted, total fees earned, current stake, active/inactive status, and count of liveness flags in the current epoch.

- **FR-007:** A Prover's status SHALL be automatically set to `inactive` if their staked collateral falls below the minimum (due to slashing) or if they fail to submit a proof for 24 consecutive hours. An inactive Prover SHALL NOT receive proof tasks until they restore their stake and re-pass the liveness check.

---

## 5. Non-Functional Requirements

- **NFR-001:** [Liveness] The prover network SHALL maintain at least 5 active registered Provers at all times. If active prover count drops below 5, the protocol SHALL emit a `ProverNetworkAlert` event and the sequencer SHALL reduce block production rate to ensure proof coverage.

- **NFR-002:** [Security] Proof task payloads SHALL NOT contain raw user transaction data (public inputs only), consistent with CONSTRAINTS.md SEC-001 and the zkVM Spec FR-004.

- **NFR-003:** [Decentralization] No single Prover or Prover operator entity SHALL receive more than 33% of total proof tasks in any 100-block window (measured by unique registration addresses). The dispatcher SHALL detect and redistribute tasks if this threshold is approached.

- **NFR-004:** [Performance] Proof task dispatch latency (from block closure to first Prover receiving the task) SHALL be less than 500ms at p95.

- **NFR-005:** [Economic] Proof fees SHALL be calculated deterministically from on-chain parameters (base fee per proof + gas cost reimbursement) and SHALL be verifiable by any party from on-chain state alone. Off-chain fee negotiation is prohibited.

---

## 6. Acceptance Requirements

> Criteria that must be demonstrably true for this spec to move Approved → Shipped.

### 6a. Functional Acceptance

- [ ] **AC-001:** Given a new operator with sufficient USDX staked, when they submit a registration transaction, then they are added to the active prover set and receive their first proof task within 24 hours.
- [ ] **AC-002:** Given 10 active Provers registered, when 100 consecutive blocks are produced, then each Prover receives approximately 10 tasks (±2) confirming round-robin distribution.
- [ ] **AC-003:** Given a dispatched Prover fails to submit within the liveness window, when the window expires, then the task is re-dispatched to the next Prover and the original Prover's liveness flag count increments by 1.
- [ ] **AC-004:** Given a proof task delivered to a Prover node, when the task payload is inspected, then it contains only public inputs, circuit identifier, block height, and sequencer signature — no transaction calldata is present.
- [ ] **AC-005:** Given a valid proof is submitted by a Prover, when the settlement layer verifies it, then the Prover's registered address is credited with the proof fee within the same block.
- [ ] **AC-006:** Given a Prover whose stake falls below the minimum following a slash, when the prover network contract is queried, then the Prover's status is `inactive` and they are removed from the dispatch queue.
- [ ] **AC-007:** All FR-001 through FR-007 requirements have corresponding passing tests in CI.

### 6b. Non-Functional Acceptance

- [ ] **AC-NFR-001:** With active prover count simulated at exactly 5, confirm `ProverNetworkAlert` is emitted when count drops to 4.
- [ ] **AC-NFR-002:** Network traffic inspection confirms zero raw transaction content in proof task payloads under load test.
- [ ] **AC-NFR-003:** 1000-block simulation with 15 active Provers confirms no single Prover exceeds 33% of dispatched tasks.
- [ ] **AC-NFR-004:** Load test confirms task dispatch latency < 500ms at p95.

### 6c. Documentation Acceptance

- [ ] **AC-DOC-001:** PRODUCT_MAP.md updated to reflect `Shipped` status.
- [ ] **AC-DOC-002:** CLAUDE.md updated if any invariants or module boundaries changed.
- [ ] **AC-DOC-003:** CHANGELOG entry added with date and summary.
- [ ] **AC-DOC-004:** Slashing spec (companion to this spec) is also merged at Approved or higher before this spec ships.

### 6d. Definition of Done

All AC items above are checked AND:
- [ ] Prover network contract deployed to testnet with at least 3 test Prover nodes registered and active.
- [ ] On-call runbook updated with prover network failure modes (low prover count, stuck task queue, fee distribution failure).
- [ ] Spec status updated to `Shipped` in this file and in PRODUCT_MAP.md.

---

## 7. Technical Design Notes

**Registration contract**: The `ProverRegistry` contract manages registration, staking, and status. Staked collateral is held in the contract and slashable by the `SlashingManager` contract (see Slashing Spec). Registration requires a hardware class declaration (which determines the circuit types the Prover can handle) and a public key for task signing.

**Task dispatcher**: The `ProofTaskDispatcher` is an off-chain component run by the sequencer that reads from the `ProverRegistry` and dispatches tasks. It is deterministic and its behavior is verifiable: any party can reproduce the dispatch order from on-chain Prover registration state and block heights.

**Fee buffer**: Protocol fees (collected from transaction execution) are pooled in a `ProtocolFeeBuffer` contract. When a proof is verified on the settlement layer, the settlement layer calls `FeeBuffer.distributeProofFee(proverId, blockHeight)` to transfer the calculated fee.

**Circuit versioning**: Each proof task includes a circuit version identifier. Provers must support the circuit version specified in the task. The `ProverRegistry` tracks which circuit versions each registered Prover supports. Provers are responsible for updating their circuit implementations when new versions are deployed.

**Reference to zkVM**: The zkVM (see [zkVM Spec](../zkvm/SPEC.md)) is responsible for constructing the proof tasks. The Prover Network is responsible for executing them. These are distinct systems with a well-defined interface: the proof task format defined in FR-004 above.

---

## 8. Open Questions

- [x] **Q1**: Should proof fee distribution use a push model (automatic on proof verification) or a pull model (operators claim earnings)? — Owner: @priya — Resolved 2025-12-20: Push model (FR-005). Automatic distribution reduces operator friction and guarantees fees are paid before the next task is dispatched.
- [ ] **Q2**: What should happen to queued proof tasks if the active prover count drops to zero? — Owner: @priya — Resolve by: 2026-03-01
- [x] **Q3**: Should the hardware class declaration be enforced on-chain (circuit matching) or purely informational? — Owner: @priya — Resolved 2026-01-05: Informational in v1; circuit matching enforced in v2.

---

## 9. Success Metrics

| Metric | Target | Measurement Method |
|--------|--------|--------------------|
| Active prover count | ≥ 5 at all times | On-chain registry monitoring; alert at < 7 |
| Prover Nakamoto coefficient | ≥ 3 | Monthly analysis of proof task distribution |
| Proof task re-dispatch rate | < 5% of tasks | ProofTaskDispatcher event logs |
| Fee distribution latency | Same block as proof verification | Settlement layer event log comparison |
| Prover onboarding time | First proof submitted within 24h of registration | Registration-to-first-proof latency |

---

## 10. Changelog

| Date | Author | Change |
|------|--------|--------|
| 2025-11-10 | @priya | Initial draft |
| 2025-12-01 | @priya | Added FR-006 (prover stats), NFR-003 (33% concentration limit) |
| 2025-12-20 | @priya | Resolved Q1 (push fee distribution) |
| 2026-01-05 | @priya | Resolved Q3 (hardware class informational); added circuit versioning to design notes |
| 2026-01-08 | @priya | Promoted to Approved; linked ADR-004 |
