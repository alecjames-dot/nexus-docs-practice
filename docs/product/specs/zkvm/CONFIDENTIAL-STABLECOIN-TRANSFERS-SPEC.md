# Confidential Stablecoin Transfers with Nexus

| Field | Value |
|---|---|
| **Status** | `DRAFT` |
| **Owner** | @alec |
| **Last Updated** | 2026-03-05 |
| **Approved by (Product)** | — |
| **Approved by (Engineering)** | — |
| **Linear** | Stealth Stablecoin Protocol |
| **Figma** | — |
| **Related Research** | ERC-5564 (Stealth Addresses), ERC-6538 (Stealth Meta-Address Registry), ERC-4337 (Account Abstraction), Groth16, Poseidon Hash, Privacy Pools (Buterin et al. 2023) |
| **Related Specs** | USDX Stablecoin Spec, NexusOS Spec, Prover Network Spec |

---

## 1. Context

### Investment Case

Every USDX transfer on Nexus is fully transparent by default. Sender, recipient, and amount are visible to anyone with a block explorer. This is a fundamental barrier to institutional and individual adoption of USDX for salaries, payments, treasury operations, and any use case where financial privacy is expected.

The Stealth Stablecoin Protocol introduces privacy-preserving USDX transfers using one-time stealth addresses (adapted ERC-5564) combined with a minimal zero-knowledge compliance layer. This gives Nexus a differentiated position: **verifiable finance that is private by default and provably compliant** — without mixers, without trusted third parties, without breaking composability.

This directly serves the "verifiable finance" thesis. Privacy and compliance are not in tension — ZK proofs make them complementary. Every stealth transfer carries a cryptographic proof that the sender is zkKYC-verified and sanctions-clear, without revealing who they are.

**Who it serves:** USDX holders (individuals and institutions) who need financial privacy for legitimate transfers. Nexus as a platform — this is a core differentiator against other L1s and stablecoin ecosystems.

### Opportunity Cost

Building this means not building: additional DeFi protocol integrations, advanced USDX yield strategies, or cross-chain bridge expansions in the same window. The primary cost of delay is that USDX launches as a fully transparent stablecoin indistinguishable from USDC/USDT on any other chain — forfeiting the core "verifiable finance" narrative at the moment of highest visibility (mainnet launch).

### Effort

**XL.** This is a multi-contract, multi-layer system spanning on-chain (5 core contracts), off-chain (scanning infrastructure, relayer network), client-side (ZK proof generation, stealth address derivation in NexusOS), and a cryptographic circuit (Circom/Groth16). Requires a trusted setup ceremony. Key dependencies: USDX contract deployed, NexusOS wallet integration, at least one approved Credential Issuer onboarded.

---

## 2. Goals & Non-Goals

### Goals

- Every USDX transfer can be sent to a one-time stealth address that is unlinkable to the recipient's public identity.
- Every stealth transfer carries a ZK proof attesting that the sender holds a valid, non-expired zkKYC credential and is not sanctioned — without revealing the sender's identity, jurisdiction, or any personal data.
- Recipients can detect incoming payments efficiently using view tags (~99.6% of irrelevant announcements filtered before expensive computation).
- Recipients can spend received funds without purchasing $NEX for gas, via meta-transaction relayers and a USDX Paymaster.
- Regulators can de-anonymize specific users via targeted disclosure through the Credential Issuer, with a valid legal order, without exposing any other user's data.
- The ZK compliance layer is architecturally modular: Phase 1 ships with minimal proofs (zkKYC + sanctions + expiry), with a clear upgrade path to richer compliance proofs (amount ranges, jurisdiction rules, cumulative volume, Travel Rule) via UUPS proxy upgrades.
- The user experience in NexusOS is indistinguishable from a normal stablecoin transfer — all cryptographic complexity is hidden.

### Non-Goals

- **Not building a mixer or tumbler.** This is not Tornado Cash. Every transfer has an associated compliance proof. There is no anonymity set — there is individual privacy with individual accountability.
- **Not supporting arbitrary ERC-20 tokens in Phase 1.** Stealth transfers are restricted to USDX (and governance-whitelisted tokens only). Extending to other tokens is a Phase 2+ concern.
- **Not building cross-chain stealth transfers.** Stealth transfers are Nexus-native only. Cross-chain bridged stealth is a Phase 3+ concern requiring bridged announcer contracts.
- **Not implementing Privacy Pools in Phase 1.** The architecture is compatible with Privacy Pools but integration is deferred to Phase 4+.
- **Not building the Credential Issuer.** The protocol defines the CI interface (credential format, EdDSA signing, registry contract). The actual KYC/CI infrastructure is a separate workstream.
- **Not eliminating the trusted setup.** Phase 1 uses Groth16 which requires a trusted setup ceremony. Migration to transparent-setup systems (Halo2/Nova) is Phase 4.

---

## 3. Summary of Features

| Feature | Description |
|---|---|
| Stealth Meta-Address Registry | On-chain registry (adapted ERC-6538) where users register their stealth meta-address (`st:nexus:0x<S><V>`) for lookup by senders. |
| Stealth Address Generation | Client-side ECDH computation that derives a fresh, one-time receiving address for each transfer. |
| Singleton Announcer | Single deterministic contract emitting `Announcement` events for all stealth transfers, providing one event stream to scan. |
| NexusStealthRouter | Orchestrator contract that atomically: verifies the ZK compliance proof, transfers USDX, emits announcement, and records the compliance commitment. |
| zkKYC Compliance Circuit (Phase 1) | Circom 2.x / Groth16 circuit (~20k constraints) proving the sender holds a valid CI-signed credential, is not sanctioned, and the credential has not expired. |
| ComplianceVerifier Contract | On-chain Groth16 verifier (UUPS proxy) that validates compliance proofs as a precondition for every stealth transfer. |
| Proof Registry | On-chain mapping of `complianceCommitment` → `transferHash` enabling targeted regulatory de-anonymization via the CI. |
| Credential Issuer Registry | Governance-controlled registry of approved CIs with their EdDSA public key hashes for in-circuit verification. |
| View Tag Scanning | Single-byte optimization (from ERC-5564) that filters ~99.6% of irrelevant announcements before expensive EC math. |
| Announcement Indexer | Off-chain service indexing `Announcement` events, pre-filtering by compliance proof presence. Supports delegated scanning via viewing keys. |
| Gas Bootstrap | Senders attach ~0.01 $NEX alongside USDX transfers to bootstrap gas at the stealth address. |
| Meta-Transaction Relayer + Paymaster | EIP-712 / ERC-4337 compatible gas abstraction: recipients sign meta-transactions, relayers submit, Paymaster deducts fees in USDX. |
| Anti-Spam Defenses | Staking toll on announcements, compliance proof coupling for indexer-level filtering, per-address rate limiting. |

---

## 4. Functional Requirements

### Identity Layer

- **FR-001:** The system SHALL provide a `NexusStealthRegistry` contract where users register their stealth meta-address consisting of a spending public key (S) and viewing public key (V) on secp256k1.
- **FR-002:** The system SHALL support the stealth meta-address format `st:nexus:0x<compressed_S><compressed_V>`.
- **FR-003:** The system SHALL allow users to update their registered keys via `updateKeys()`.

### Transfer Layer

- **FR-010:** The system SHALL derive a unique one-time stealth address for each transfer using ECDH between the sender's ephemeral key and the recipient's viewing public key.
- **FR-011:** The system SHALL deploy a singleton `NexusAnnouncer` contract at a deterministic address (CREATE2) that emits `Announcement` events containing: `schemeId`, `stealthAddress`, `caller`, `ephemeralPubKey`, and `metadata`.
- **FR-012:** The `metadata` field in `Announcement` events SHALL include: a 1-byte view tag, the token contract address, the transfer amount, and the hash of the associated compliance proof.
- **FR-013:** The `NexusStealthRouter` SHALL atomically execute in a single transaction: (a) verify the ZK compliance proof, (b) transfer USDX to the derived stealth address, (c) call the Announcer to emit the event, (d) record the `complianceCommitment` in the `ProofRegistry`.
- **FR-014:** If the compliance proof verification fails, the entire transaction SHALL revert.
- **FR-015:** The `NexusStealthRouter` SHALL maintain a governance-controlled whitelist of tokens eligible for stealth transfer. Phase 1 includes USDX only.

### Compliance Layer

- **FR-020:** The system SHALL require a valid ZK compliance proof for every stealth USDX transfer. Transfers without proofs SHALL be rejected.
- **FR-021:** The Phase 1 compliance circuit SHALL prove exactly three statements: (a) the sender holds a credential with a valid EdDSA signature from an approved Credential Issuer, (b) the credential has not expired at the time of the transfer (`expiresAt > currentTimestamp`), (c) the `sanctionsClear` flag in the credential is true.
- **FR-022:** The circuit SHALL bind the proof to the specific transfer via a `transferHash` public input, preventing proof reuse.
- **FR-023:** The circuit SHALL output a `complianceCommitment = hash(identityCommitment, transferHash)` that links identity to transfer without revealing either.
- **FR-024:** The `ComplianceVerifier` contract SHALL be deployed behind a UUPS proxy to support circuit upgrades across phases.
- **FR-025:** The `CredentialIssuerRegistry` SHALL store approved CI EdDSA public key hashes and support governance-controlled `registerIssuer()` and `revokeIssuer()` operations.
- **FR-026:** The `ProofRegistry` SHALL map `complianceCommitment` → `transferHash` and be queryable by any party.

### Scanning Layer

- **FR-030:** Each announcement SHALL include a 1-byte view tag derived from the first byte of `hash(sharedSecret)`.
- **FR-031:** Recipient scanning clients SHALL check the view tag before performing full elliptic curve computation, filtering approximately 99.6% of non-matching announcements.
- **FR-032:** The system SHOULD provide a delegated scanning mode where a recipient shares their viewing key (not spending key) with a third-party scanner service.

### Gas Abstraction Layer

- **FR-040:** The `NexusStealthRouter` SHALL accept a `gasBootstrap` parameter and forward a configurable amount of $NEX (default: 0.01 $NEX) to the stealth address alongside the USDX transfer.
- **FR-041:** The system SHALL support EIP-712 signed meta-transactions from stealth addresses, submitted by relayers.
- **FR-042:** The `Paymaster` contract SHALL verify the recipient's signature and deduct a fee denominated in USDX from the stealth address balance.

### Anti-Spam

- **FR-050:** The `NexusAnnouncer` SHOULD enforce a staking toll (configurable, default 0.1 $NEX) refundable after 24 hours if no spam report is filed.
- **FR-051:** The `NexusAnnouncer` SHOULD enforce per-address rate limiting (default: 100 announcements per block).

---

## 5. Non-Functional Requirements

### Security

- **NFR-001:** The system SHALL NOT store, emit, or make inferable any personal identity data on-chain. All identity information remains off-chain in the user's local credential vault and the CI's private database.
- **NFR-002:** The system SHALL NOT allow a compromised viewing key to spend funds. Viewing keys enable detection of incoming payments only; spending requires the spending key.
- **NFR-003:** The system SHALL NOT allow compliance proof reuse across transfers. The `transferHash` public input binds each proof to a specific transaction.
- **NFR-004:** The `ComplianceVerifier` UUPS proxy upgrade SHALL require a governance multisig with a timelock (minimum 48 hours).
- **NFR-005:** The Groth16 trusted setup ceremony SHALL include a minimum of 100 participants. Toxic waste is destroyed if at least one participant is honest.

### Availability

- **NFR-010:** The Announcement Indexer service SHALL maintain 99.9% uptime. Degraded indexer availability does not affect on-chain transfer execution — only recipient notification latency.
- **NFR-011:** The Meta-Transaction Relayer network SHALL have at least 3 independent relayers at launch to prevent single-point-of-failure gas abstraction.

### Performance Requirements

| Requirement | Metric | Target | Percentile | Conditions |
|---|---|---|---|---|
| ZK proof generation | Client-side wall time | < 5s | p95 | Browser WASM, modern hardware |
| ZK proof verification | On-chain gas | < 300,000 gas | — | Groth16 pairing check |
| Full stealth transfer | On-chain gas (total) | < 600,000 gas | — | Proof + ERC-20 transfer + announce + register |
| Announcement scanning | Per-event latency | < 0.15ms (view tag miss), < 3ms (full match) | p99 | — |
| Scanning 10,000 announcements | Total wall time | < 2s | p95 | ~39 full EC computations + 10k hash checks |
| Meta-transaction relay | Submission latency | < 5s | p95 | From signature to on-chain inclusion |

---

## 6. Acceptance Requirements

### 6a. Functional Acceptance

- **AC-001:** Given a registered recipient with stealth meta-address, when a sender initiates a stealth USDX transfer with a valid zkKYC credential, then a unique stealth address is derived, USDX is transferred, an Announcement event is emitted, and a `complianceCommitment` is recorded in the `ProofRegistry` — all in a single atomic transaction.
- **AC-002:** Given a stealth transfer has been executed, when the recipient scans the Announcer event stream using their viewing key, then the recipient detects the transfer and can derive the spending key to move funds.
- **AC-003:** Given a sender with an expired zkKYC credential, when they attempt a stealth transfer, then the transaction reverts with a proof verification failure.
- **AC-004:** Given a sender with a credential from a revoked Credential Issuer, when they attempt a stealth transfer, then the transaction reverts.
- **AC-005:** Given a completed stealth transfer, when a regulator presents the `identityCommitment` (obtained from the CI via legal order), then all `complianceCommitments` matching that identity can be enumerated from the `ProofRegistry`, revealing the set of transfers performed by that user and no others.
- **AC-006:** Given a recipient who has received USDX at a stealth address, when they sign an EIP-712 meta-transaction to spend, then the Relayer submits it and the Paymaster deducts the fee in USDX — the recipient never holds $NEX.
- **AC-007:** Given 10,000 announcements on the Announcer contract, when a recipient scans using view tags, then fewer than 50 events (~0.4%) require full elliptic curve computation.
- **AC-008:** Given the `ComplianceVerifier` is upgraded via UUPS proxy to a new circuit (Phase 2), then existing Phase 1 proofs remain valid and verifiable.
- **AC-009:** All FR-0xx requirements have corresponding passing tests in CI.

### 6b. Non-Functional Acceptance

- **AC-NFR-001:** Load test confirms ZK proof generation completes in < 5s (p95) on reference hardware (browser WASM, 2023-era laptop).
- **AC-NFR-002:** Gas benchmarks confirm full stealth transfer costs < 600,000 gas on Nexus testnet.
- **AC-NFR-003:** Security audit of all five core contracts signed off by [auditor] before mainnet deployment.
- **AC-NFR-004:** Groth16 trusted setup ceremony completed with >= 100 participants, ceremony transcript published.
- **AC-NFR-005:** Penetration test confirms: (a) no on-chain data leaks identity information, (b) viewing key compromise does not enable spending, (c) compliance proofs cannot be replayed across transfers.

### 6c. Documentation Acceptance

- **AC-DOC-001:** `PRODUCT_MAP.md` updated to reflect `Shipped` status for Stealth Stablecoin Protocol.
- **AC-DOC-002:** `CLAUDE.md` updated with module boundaries for all five contracts and the compliance circuit.
- **AC-DOC-003:** Any ADRs made during implementation (e.g., Groth16 vs. PLONK selection, trusted setup ceremony design, UUPS proxy governance parameters) are merged and linked in this spec.
- **AC-DOC-004:** NexusOS integration guide documenting the client-side stealth address derivation, ZK proof generation, and scanning flows.

### 6d. Definition of Done

All AC items above are checked AND:

- All five contracts deployed to Nexus mainnet behind feature flags (stealth transfers gated by governance vote to enable).
- Announcement Indexer running with monitoring and alerting.
- At least one Credential Issuer registered in the `CredentialIssuerRegistry`.
- Trusted setup ceremony completed and verification keys deployed.
- At least 3 relayers operational in the meta-transaction network.
- On-call runbook updated for: ComplianceVerifier proxy upgrade procedure, CI revocation procedure, Indexer failure recovery, Relayer network degradation.
- Spec status updated to `Shipped` in this file.

---

## 7. Open Questions

| Question | Owner | Resolve by |
|---|---|---|
| Which Credential Issuer(s) will be onboarded for mainnet launch? What is the CI partnership timeline? | @alec | 2026-04-01 |
| Should the staking toll on announcements be enforced at the contract level or at the indexer level (soft filter)? Contract-level is stronger but adds gas; indexer-level is cheaper but bypassable. | @alec | 2026-03-20 |
| What is the governance structure for the `ComplianceVerifier` UUPS proxy upgrade? Multisig threshold, timelock duration, upgrade proposal process. | @alec | 2026-03-25 |
| Should Phase 1 include a credential revocation Merkle tree in-circuit (~10k additional constraints) to handle the window between sanctions listing and credential expiry? Or defer to Phase 2? | @alec | 2026-03-20 |
| What is the minimum $NEX gas bootstrap amount that covers 1-2 transactions on Nexus at expected gas prices? Needs gas price modeling. | @alec | 2026-03-15 |
| Should the `NexusStealthRouter` support batched stealth transfers (multiple recipients in one tx) for payroll/treasury use cases? Or defer to Phase 2? | @alec | 2026-04-01 |
| How do we handle the trusted setup ceremony logistics? Public ceremony platform, participant recruitment, timeline. | @alec | 2026-04-15 |

---

## 8. Success Metrics

| Metric | Target | Measurement Method |
|---|---|---|
| Stealth transfer adoption rate | > 30% of USDX transfers use stealth within 90 days of launch | On-chain: `NexusStealthRouter` tx count / total USDX transfer tx count |
| ZK proof generation success rate | > 99.5% | Client telemetry from NexusOS (opt-in): proof generation attempts vs. completions |
| Compliance proof verification gas | < 300,000 gas | On-chain gas profiling of `ComplianceVerifier.verifyComplianceProof()` |
| Recipient scanning latency (10k announcements) | < 2s p95 | NexusOS client telemetry (opt-in) |
| Meta-tx relayer availability | > 99.9% | Relayer health check monitoring |
| Zero regulatory de-anonymization failures | 0 failures when presented with valid identityCommitment + legal order | Manual audit of CI cooperation procedures (quarterly) |
| Trusted setup participation | >= 100 unique participants | Ceremony transcript |

---

## 9. Sign-off

| Team | Reviewer | Status | Date |
|---|---|---|---|
| Product | @alec | Pending | — |
| Engineering | — | Pending | — |
| Security | — | Pending | — |
| Design | — | Pending | — |
| Legal / Compliance | — | Pending | — |

---

## 10. Changelog

| Date | Author | Change |
|---|---|---|
| 2026-03-05 | @alec | Initial draft. Converted from technical design document into canonical spec format. |

---

## Appendix A: Contract Architecture Summary

| Contract | Key Functions | Upgradeability |
|---|---|---|
| `NexusStealthRegistry` | `registerStealthMetaAddress()`, `lookupMetaAddress()`, `updateKeys()` | Immutable |
| `NexusAnnouncer` | `announce()` — emits `Announcement` events with compliance metadata | Immutable (singleton) |
| `NexusStealthRouter` | `stealthTransfer()` — orchestrates: verify proof → transfer USDX → announce → register | UUPS Proxy |
| `ComplianceVerifier` | `verifyComplianceProof()` — Groth16 pairing check | UUPS Proxy (for circuit upgrades) |
| `CredentialIssuerRegistry` | `registerIssuer()`, `revokeIssuer()`, `isApprovedIssuer()` | Governance-controlled |

## Appendix B: ZK Compliance Scaling Roadmap

| Phase | New Proof Capabilities | Circuit Complexity | Implementation | Timeline |
|---|---|---|---|---|
| 1 (Launch) | zkKYC validity + sanctions clearance + credential non-expiry | ~20k constraints | Circom 2.x + Groth16 (BN254) | Launch |
| 2 | Transaction amount range proofs (under $10k travel rule threshold) | ~40k constraints | + Bulletproofs-style range check | Q3 2026 |
| 3 | Jurisdiction-based transfer rules (sender/recipient compatibility) | ~60k constraints | + Jurisdiction Merkle tree membership | Q1 2027 |
| 4 | Cumulative volume proofs (30-day rolling windows via private state accumulators) | ~100k+ constraints | Migrate to Halo2 / Nova IVC for recursion | Q3 2027 |
| 5 | Full Travel Rule compliance (prove identity was shared with compliant intermediary) | ~150k+ constraints | + TRISA integration, recursive SNARKs | 2028 |

## Appendix C: Regulatory Cooperation Framework

The system supports targeted de-anonymization without collateral privacy exposure:

1. A regulator presents a valid legal order to the Credential Issuer who issued the subject's credential.
2. The CI reveals which `identityCommitment` corresponds to the subject (a lookup in the CI's private database — no on-chain state change).
3. With the `identityCommitment`, the regulator queries the `ProofRegistry` for all `complianceCommitments` that hash to that identity, revealing the set of stealth transfers performed by that user.
4. No other user's privacy is affected. The regulator learns nothing about any other participant's transactions.

This mirrors the subpoena model in traditional banking: one customer's records are disclosed without exposing anyone else.
