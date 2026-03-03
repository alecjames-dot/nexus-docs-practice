# USDX Selective Disclosure Compliance Layer Spec

**Status:** Review
**Owner:** @alec
**Last Updated:** 2026-02-01
**Approved by (Product):** —
**Approved by (Engineering):** —
**Linear:** —
**Figma:** —
**ADRs:** [ADR-005 — ERC-5564 over Custom Stealth](../../../architecture/decisions/ADR-005-erc5564-over-custom.md)
**Related Research:** —
**Related Specs:** [USDX Core](./SPEC.md), [ERC-5564 Stealth Addresses](../privacy/erc5564/SPEC.md)

---

## 1. Problem Statement

USDX transfers use ERC-5564 stealth addresses to provide privacy by default: transfers are not linkable to recipient identities by outside observers. However, privacy alone is insufficient for institutional adoption and regulatory compliance. Regulated entities transacting with USDX — businesses, exchanges, financial institutions — need to be able to demonstrate their transaction history to authorized parties (regulators, auditors, compliance officers) without revealing that history to the general public. This spec defines the selective disclosure compliance layer: a mechanism built on top of ERC-5564 that allows USDX holders to produce cryptographic proofs of specific transactions to authorized parties, preserving general privacy while enabling targeted disclosure. This layer is always deployed in conjunction with ERC-5564 — never independently, per CONSTRAINTS.md COMP-001.

---

## 2. Goals & Non-Goals

**Goals:**
- Define the viewing key model that allows holders to generate disclosure proofs for specific transactions.
- Define the disclosure proof structure: what transaction attributes can be disclosed and in what format.
- Define the authorized party verification interface: how a regulator or auditor verifies a disclosure proof.
- Ensure compliance disclosures are implemented as ZK proofs, not raw data dumps, per CONSTRAINTS.md COMP-002.
- Ensure viewing keys are user-controlled and never held or escrowed by the Nexus protocol, per CONSTRAINTS.md COMP-003.
- Define how this layer integrates with ERC-5564 (compliance must not break the stealth address scheme).

**Non-Goals:**
- Automatic transaction reporting to regulators (no push model — all disclosure is holder-initiated).
- Key escrow or protocol-held viewing keys (prohibited by CONSTRAINTS.md COMP-003).
- Compliance with any specific jurisdiction's requirements (the protocol provides the tool; legal compliance is the user's responsibility).
- AML/KYC identity verification (out of scope — compliance is about transaction disclosure, not identity).
- On-chain storage of disclosure proofs (proofs are generated off-chain and verified on-chain or off-chain at the verifier's discretion).
- Compliance disclosure for non-USDX assets (v1 scope: USDX only).

---

## 3. User Stories

> As a **USDX Holder**, I want to generate a cryptographic proof of a specific set of transactions so that I can satisfy a regulatory request without revealing my entire transaction history or any transactions not included in the disclosure.

> As a **USDX Holder**, I want my viewing key to remain entirely under my control so that no protocol, operator, or third party can generate compliance disclosures on my behalf without my authorization.

> As a **DeFi Developer**, I want to integrate the compliance layer into a business application that uses USDX so that my users can produce regulatory disclosures programmatically without accessing low-level cryptographic primitives.

> As a **Protocol Governor**, I want the compliance layer to be auditable by external parties so that we can demonstrate regulatory good faith without the protocol itself being a compliance surveillance tool.

---

## 4. Functional Requirements

- **FR-001:** Each USDX holder's ERC-5564 keypair SHALL be extended with a viewing key. The viewing key SHALL be derived from the holder's spending key such that: (a) the viewing key cannot be used to spend funds, and (b) the spending key cannot be derived from the viewing key.

- **FR-002:** A holder's viewing key SHALL allow the holder (or any party who receives the viewing key) to scan the USDX transaction history and identify all stealth transfers received by that holder's stealth addresses. This is the "recipient detection" function from ERC-5564, extended with disclosure capabilities.

- **FR-003:** Using their viewing key, a USDX holder SHALL be able to generate a selective disclosure proof for a specified set of transaction identifiers. The disclosure proof SHALL attest to: (a) the transaction occurred, (b) the amount transferred, (c) the sender's stealth address, (d) the recipient's stealth address, and (e) the block height and timestamp. The proof SHALL be a zero-knowledge proof — it reveals these attributes and nothing else.

- **FR-004:** The disclosure proof format SHALL be a standard ABI-encoded struct that can be verified on-chain (via a `ComplianceVerifier` contract) or off-chain (by a verifier with access to the circuit verification key). Verifiers do not need to interact with the USDX holder to verify a disclosure proof.

- **FR-005:** The compliance layer SHALL NOT store any viewing keys, disclosure proofs, or transaction content on-chain or in any Nexus-operated off-chain system. Disclosure proofs are generated locally by the holder's client software and transmitted directly to the authorized party.

- **FR-006:** The `ComplianceVerifier` contract SHALL expose a `verifyDisclosure(proof, publicInputs)` function that returns `true` if the disclosure proof is valid for the given public inputs and `false` otherwise. This function is permissionless — any party may call it to verify a disclosure.

- **FR-007:** The compliance layer and the ERC-5564 stealth address layer SHALL be deployed atomically as a paired system. The USDX contract SHALL enforce that stealth address functionality and compliance disclosure functionality are both active or both inactive — they may not be independently toggled.

---

## 5. Non-Functional Requirements

- **NFR-001:** [Privacy] Disclosure proof generation SHALL NOT require the holder to transmit any data to the Nexus protocol or to any Nexus-operated service. All proof generation SHALL be executable locally using open-source client software.

- **NFR-002:** [Security] The compliance layer SHALL NOT weaken the privacy guarantees of ERC-5564 for non-disclosing holders. A holder who never generates a disclosure proof shall have the same privacy as a holder in a system without the compliance layer.

- **NFR-003:** [Performance] Disclosure proof generation (for up to 100 transactions) SHALL complete in under 30 seconds on consumer-grade hardware. This is a client-side constraint, not a network constraint.

- **NFR-004:** [Verifiability] An authorized party with a disclosure proof SHALL be able to verify the proof in under 1 second using the on-chain `ComplianceVerifier` or the published off-chain verification key.

- **NFR-005:** [Auditability] The `ComplianceVerifier` contract SHALL emit a `DisclosureVerified(proofHash, blockHeight)` event for each successful verification call. This creates an auditable on-chain log of verification events without revealing any transaction content.

---

## 6. Acceptance Requirements

> Criteria that must be demonstrably true for this spec to move Review → Approved → Shipped.

### 6a. Functional Acceptance

- [ ] **AC-001:** Given a USDX holder's ERC-5564 keypair, when the viewing key is derived, then the viewing key cannot be used to initiate a transfer and the spending key cannot be derived from the viewing key.
- [ ] **AC-002:** Given a holder's viewing key, when the USDX transaction history is scanned, then all stealth transfers received by that holder are identified and none belonging to other holders are included.
- [ ] **AC-003:** Given a holder generates a selective disclosure proof for transaction IDs [T1, T2, T3], when an authorized party receives the proof, then they can verify amount, stealth addresses, and block height for T1, T2, T3 — and no information about other transactions is revealed.
- [ ] **AC-004:** Given a valid disclosure proof, when `ComplianceVerifier.verifyDisclosure(proof, publicInputs)` is called, then it returns `true`.
- [ ] **AC-005:** Given a tampered disclosure proof (modified transaction amount), when `ComplianceVerifier.verifyDisclosure(proof, publicInputs)` is called, then it returns `false`.
- [ ] **AC-006:** Given the stealth address layer is active, when the compliance layer is toggled off independently, then the transaction reverts — the two layers cannot be decoupled.
- [ ] **AC-007:** All FR-001 through FR-007 requirements have corresponding passing tests in CI.

### 6b. Non-Functional Acceptance

- [ ] **AC-NFR-001:** Disclosure proof generated entirely locally (no Nexus network calls) — confirmed by network traffic inspection during proof generation.
- [ ] **AC-NFR-002:** Privacy audit: 1000 transfers from non-disclosing holders — no information about those holders' transactions leaks from the compliance layer.
- [ ] **AC-NFR-003:** Disclosure proof generation for 100 transactions completes in < 30s on a consumer laptop (M1 MacBook Pro, no GPU).
- [ ] **AC-NFR-004:** `ComplianceVerifier.verifyDisclosure` call completes in < 1s on-chain (measured by gas cost / block time).

### 6c. Documentation Acceptance

- [ ] **AC-DOC-001:** PRODUCT_MAP.md updated to reflect `Shipped` status.
- [ ] **AC-DOC-002:** CLAUDE.md updated to reflect any changes to the privacy + compliance pairing invariant.
- [ ] **AC-DOC-003:** CHANGELOG entry added with date and summary.
- [ ] **AC-DOC-004:** Legal review documented and signed off before ship (see Open Questions).

### 6d. Definition of Done

All AC items above are checked AND:
- [ ] Compliance layer deployed to testnet with at least 5 end-to-end disclosure proof generation + verification cycles tested.
- [ ] External legal review of the disclosure proof model completed.
- [ ] On-call runbook updated with compliance layer failure modes.
- [ ] Spec status updated to `Shipped` in this file and in PRODUCT_MAP.md.

---

## 7. Technical Design Notes

**Viewing key derivation**: The viewing key is derived as `vk = H(sk, "nexus-viewing-key")` where `sk` is the ERC-5564 spending key and `H` is a secure hash function. This ensures one-way derivation (vk from sk, but not sk from vk). The viewing key is sufficient to run the ERC-5564 recipient detection scan and to generate disclosure proofs.

**Disclosure proof circuit**: The disclosure proof uses a ZK circuit that takes as private inputs `{spending_key, transaction_witnesses}` and public inputs `{disclosed_transaction_ids, disclosed_amounts, disclosed_stealth_addresses, block_heights}`. The circuit proves that the private inputs are consistent with the public outputs — i.e., that the transactions occurred with the stated attributes — without revealing the spending key or any non-disclosed transaction data.

**Integration with ERC-5564**: The compliance layer is an extension of the ERC-5564 implementation, not a separate layer. The ERC-5564 spec defines the stealth address scheme; this spec defines the viewing key extension and disclosure proof capability. Both are implemented in the same contract suite and deployed together.

**On-chain vs. off-chain verification**: The `ComplianceVerifier` contract enables on-chain verification, which is gas-intensive but creates an immutable on-chain audit trail. Authorized parties may also verify off-chain using the published verification key (faster, no gas cost). The holder can choose which verification path to recommend to the authorized party.

---

## 8. Open Questions

- [ ] **Q1**: Does generating a disclosure proof for a transaction constitute "sharing personal data" under GDPR? If so, does the zero-knowledge proof structure — which reveals transaction attributes but not personal identity — satisfy GDPR requirements? — Owner: @alec — Awaiting: External legal review. Target resolution: 2026-03-31.

- [ ] **Q2**: Should the selective disclosure interface support "range proofs" — e.g., proving that total inflows in a period were above a threshold without revealing individual transactions? This would be useful for AML threshold demonstrations. Requires circuit redesign if included. — Owner: @alec — Awaiting: Legal and product input. Target resolution: 2026-04-15.

---

## 9. Success Metrics

| Metric | Target | Measurement Method |
|--------|--------|--------------------|
| Institutions using compliance layer | ≥ 3 in first 6 months | Off-chain partnerships tracking |
| Disclosure proof generation success rate | ≥ 99% | Client SDK error reporting |
| On-chain verification calls | Track (informational) | ComplianceVerifier events |
| Privacy audit pass rate | 100% — zero cross-holder leakage | Automated audit in CI |
| Time to generate 100-tx disclosure proof | < 30 seconds | SDK benchmarking |

---

## 10. Changelog

| Date | Author | Change |
|------|--------|--------|
| 2025-12-10 | @alec | Initial draft |
| 2026-01-15 | @alec | Updated to reference ERC-5564 following ADR-005 (replaced custom stealth references) |
| 2026-01-28 | @alec | Added Q1 (GDPR) and Q2 (range proofs) as open questions; flagged for legal review |
| 2026-02-01 | @alec | Promoted to Review status |
