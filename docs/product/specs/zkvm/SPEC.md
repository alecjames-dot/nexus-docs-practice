# zkVM Execution Environment Spec

**Status:** Approved
**Owner:** @marcus
**Last Updated:** 2025-12-01
**ADRs:** [ADR-001 — zkVM Proof Strategy](../../../architecture/decisions/ADR-001-zkvm-proof-strategy.md)
**Related Specs:** [Prover Network](../prover-network/SPEC.md)

---

## 1. Problem Statement

Nexus's core value proposition is verifiable finance — state transitions that are cryptographically proven correct, not merely trusted. To deliver this, the protocol requires a zkVM that executes application logic and produces validity proofs for every state transition, integrating those proofs with the settlement layer for finalization. Without this component, Nexus is a standard blockchain with conventional trust assumptions and no differentiation. The zkVM must be EVM-compatible (to leverage existing tooling and developer familiarity), proof-efficient (recursive SNARK aggregation per ADR-001), and must maintain strict isolation between user input data and the prover network to preserve proof input privacy per CONSTRAINTS.md SEC-001.

---

## 2. Goals & Non-Goals

**Goals:**
- Execute EVM-compatible smart contract logic and produce a validity proof for every state transition.
- Aggregate multiple transaction proofs into a single block proof using recursive SNARK composition (ADR-001).
- Submit finalized block proofs to the settlement layer for on-chain verification.
- Guarantee that user input data (private transaction content) is never transmitted to the prover network.
- Expose a public SDK interface that allows DeFi Developers to write proof-aware applications without understanding ZK internals.

**Non-Goals:**
- Executing non-EVM languages or VMs (WASM, RISC-V — Phase 3 consideration).
- Running proof generation infrastructure (that is the Prover Network's responsibility).
- Providing transaction privacy by itself (privacy is handled by the ERC-5564 + compliance layer).
- Verifying proofs submitted by external chains or rollups (out of scope for v1).

---

## 3. User Stories

> As a **DeFi Developer**, I want to deploy a Solidity contract to the zkVM so that my application logic produces validity proofs without me writing any ZK code.

> As a **DeFi Developer**, I want to consume a verified state output from another zkVM contract so that I can compose verified financial primitives without re-running the computation.

> As a **USDX Holder**, I want my transactions to produce validity proofs automatically so that any party can verify my transaction was correctly processed without trusting Nexus Labs.

> As a **Prover Operator**, I want to receive proof tasks that contain only public inputs so that I can generate proofs without ever accessing user transaction data.

---

## 4. Functional Requirements

- **FR-001:** The zkVM SHALL execute EVM-compatible bytecode (Solidity compiled artifacts) and produce a SNARK validity proof for each transaction's state transition.
- **FR-002:** The zkVM SHALL support recursive SNARK proof aggregation, combining up to 256 individual transaction proofs into a single block proof per ADR-001.
- **FR-003:** The zkVM SHALL submit the block validity proof to the settlement layer contract at the end of each block, with the proof committed within 1 block of block closure per CONSTRAINTS.md PERF-004.
- **FR-004:** The zkVM SHALL partition proof generation inputs into public inputs (state root, transaction hash, public outputs) and private inputs (user data), and SHALL transmit only public inputs to the Prover Network.
- **FR-005:** The zkVM SHALL expose a Proof Output Interface — a standard ABI-encoded struct containing the verified post-state root, a proof identifier, and a block height — that downstream contracts can consume without understanding the underlying proof system.
- **FR-006:** The zkVM SHALL maintain an on-chain proof registry on the settlement layer that maps block heights to verified proof identifiers, enabling historical proof lookups.
- **FR-007:** The zkVM SHOULD support proof precompiles for common financial operations (elliptic curve arithmetic, hash functions, range proofs) to reduce proof generation time for standard patterns.
- **FR-008:** The zkVM SHALL reject and not finalize any state transition for which a valid proof has not been submitted within 3 blocks of block closure.

---

## 5. Non-Functional Requirements

- **NFR-001:** [Performance] End-to-end proof generation and settlement finalization SHALL complete within 2 seconds at p95 under normal network load (≤1000 transactions per block) per CONSTRAINTS.md PERF-001.
- **NFR-002:** [Security] The zkVM SHALL NOT transmit raw user transaction inputs, private keys, or any data enabling Prover-to-user correlation to any node in the Prover Network, per CONSTRAINTS.md SEC-001.
- **NFR-003:** [Security] The zkVM settlement layer proof verifier SHALL NOT include any emergency bypass, admin override, or admin key that allows unproven state transitions to be finalized, per CONSTRAINTS.md SEC-003.
- **NFR-004:** [Correctness] The zkVM SHALL produce deterministic proofs for identical input sequences — the same transaction set must produce the same state root and proof, independently verifiable by any third party.
- **NFR-005:** [Availability] The zkVM sequencer SHALL maintain 99.9% uptime (measured monthly) and SHALL implement automatic failover with proof-state recovery within 60 seconds of a sequencer failure.

---

## 6. Acceptance Requirements

> Criteria that must be demonstrably true for this spec to move Approved → Shipped.

### 6a. Functional Acceptance

- [ ] **AC-001:** Given a valid Solidity contract deployed to the zkVM, when a transaction is submitted that modifies state, then a SNARK validity proof is generated and included in the block proof.
- [ ] **AC-002:** Given 256 transaction proofs in a single block, when the block is closed, then a single aggregated block proof is produced using recursive SNARK composition.
- [ ] **AC-003:** Given a finalized block proof, when queried by block height on the settlement layer, then the proof registry returns the correct verified proof identifier.
- [ ] **AC-004:** Given a proof task dispatched to the Prover Network, when inspected at the network boundary, then only public inputs (state root, transaction hash, public outputs) are transmitted — no raw transaction content is present.
- [ ] **AC-005:** Given a downstream contract that calls the Proof Output Interface, when the contract decodes the response, then it receives the verified post-state root, proof identifier, and block height without requiring knowledge of the SNARK circuit.
- [ ] **AC-006:** Given a block that closes without a valid proof submitted within 3 blocks, when the settlement layer is queried, then the state transition is not finalized and an unfinalized proof alert is emitted.
- [ ] **AC-007:** All FR-001 through FR-008 requirements have corresponding passing tests in CI.

### 6b. Non-Functional Acceptance

- [ ] **AC-NFR-001:** Load test at 1000 TPS confirms end-to-end proof generation and settlement completes within 2s at p95.
- [ ] **AC-NFR-002:** Network traffic audit confirms zero raw transaction content transmitted to Prover Network nodes under test conditions.
- [ ] **AC-NFR-003:** Security review of settlement layer verifier signed off by @security before ship.
- [ ] **AC-NFR-004:** Chaos engineering test: sequencer failure recovery completes within 60 seconds with correct proof-state continuity.

### 6c. Documentation Acceptance

- [ ] **AC-DOC-001:** PRODUCT_MAP.md updated to reflect `Shipped` status.
- [ ] **AC-DOC-002:** CLAUDE.md updated if any invariants or module boundaries changed.
- [ ] **AC-DOC-003:** CHANGELOG entry added with date and summary.
- [ ] **AC-DOC-004:** Any ADRs made during implementation are merged and linked above.

### 6d. Definition of Done

All AC items above are checked AND:
- [ ] zkVM is deployed to testnet and all ACs are verified against testnet.
- [ ] On-call runbook updated with zkVM-specific failure modes (sequencer crash, proof generation timeout, settlement layer rejection).
- [ ] Spec status updated to `Shipped` in this file and in PRODUCT_MAP.md.

---

## 7. Technical Design Notes

**Proof system**: Recursive SNARKs (Groth16-based, with recursive aggregation layer using a Nova-style folding scheme). See ADR-001 for the full rationale. The recursive layer allows us to aggregate up to 256 transaction proofs into a single block proof without linear proof size growth.

**EVM compatibility**: The zkVM targets EVM bytecode, not Solidity source. Any EVM-compatible compiler output (Solidity, Vyper, Huff) is supported. The zkVM circuit encodes the EVM execution trace as a constraint system; proof generation time scales with execution complexity, not transaction count alone.

**Public/private input partitioning**: The zkVM sequencer constructs proof tasks as follows:
- Public inputs: `{prev_state_root, tx_hash, public_outputs, block_height}`
- Private inputs: `{tx_calldata, user_signatures, private_state_witnesses}` — these never leave the sequencer
- Proof tasks dispatched to Provers contain only the public inputs and the circuit identifier

**Settlement layer integration**: After a block closes, the sequencer batches the recursive block proof and calls `settlementLayer.verifyAndFinalize(proof, publicInputs)`. The settlement layer verifies the proof on-chain (using a Groth16 verifier contract), updates the state root, and emits a `BlockFinalized` event.

**SDK design**: The Nexus zkVM SDK wraps the standard Ethereum JSON-RPC interface with proof-aware extensions. Developers interact via `nexus_sendTransaction` (returns a tx hash + proof task ID) and `nexus_getProofStatus` (returns proof status and the Proof Output struct on completion).

---

## 8. Open Questions

- [x] **Q1**: Should the recursive aggregation limit be 256 or configurable as a governance parameter? — Owner: @marcus — Resolved 2025-11-15: Fixed at 256 for v1 to simplify circuit design; governance-adjustable in v2.
- [x] **Q2**: What is the correct handling of proof generation timeouts — should the sequencer retry internally or surface the failure to the settlement layer immediately? — Owner: @marcus — Resolved 2025-11-28: Sequencer retries once (same prover) after 500ms, then escalates to next prover in queue. After 3 failures, block is marked incomplete and settlement layer is notified.
- [ ] **Q3**: Should proof precompiles (FR-007) be included in v1 scope or deferred? — Owner: @marcus — Resolve by: 2026-03-15

---

## 9. Success Metrics

| Metric | Target | Measurement Method |
|--------|--------|--------------------|
| Proof generation latency (p95) | < 2 seconds | Automated latency monitoring on testnet; alert at 1.8s |
| Proof aggregation ratio | ≥ 90% of blocks use full aggregation | Settlement layer event logs |
| Settlement finality rate | 99.9% of proven blocks finalized within 3 blocks | Settlement layer monitoring |
| Privacy audit pass rate | 100% — zero raw input leaks detected | Automated network traffic inspection in CI |
| DeFi Developer onboarding | First proof-emitting contract deployed in < 30 min | Developer survey + timing |

---

## 10. Changelog

| Date | Author | Change |
|------|--------|--------|
| 2025-10-20 | @marcus | Initial draft |
| 2025-11-15 | @marcus | Resolved Q1 (aggregation limit); added FR-007 for precompiles |
| 2025-11-28 | @marcus | Resolved Q2 (timeout handling); added NFR-005 (sequencer availability) |
| 2025-12-01 | @marcus | Promoted to Approved |
