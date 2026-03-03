# ERC-5564 Stealth Address Implementation Spec

**Status:** Approved
**Owner:** @marcus
**Last Updated:** 2026-01-15
**Approved by (Product):** —
**Approved by (Engineering):** —
**Linear:** —
**Figma:** —
**ADRs:** [ADR-005 — ERC-5564 over Custom Stealth](../../../../architecture/decisions/ADR-005-erc5564-over-custom.md)
**Related Research:** —
**Related Specs:** [USDX Core](../../usdx/SPEC.md), [USDX Compliance Layer](../../usdx/COMPLIANCE-SPEC.md)

---

## 1. Problem Statement

USDX transfers on a public blockchain are visible by default: sender, recipient, and amount are readable by any observer. This is incompatible with financial privacy expectations and makes USDX impractical for entities that require transaction confidentiality. The solution is stealth addresses: a cryptographic scheme where the sender generates a unique one-time address for the recipient for each transaction, such that only the recipient can discover incoming transfers and outside observers cannot link transactions to recipient identities. Nexus adopted ERC-5564 as the standard for this scheme following ADR-005, replacing a previously specced custom ECDH-based approach (now deprecated). This spec defines the ERC-5564 implementation requirements for USDX transfers.

**Critical pairing requirement**: Per CONSTRAINTS.md COMP-001, ERC-5564 must always be deployed in conjunction with the compliance selective disclosure layer. This spec covers the stealth address scheme; the companion [Compliance Spec](../../usdx/COMPLIANCE-SPEC.md) covers selective disclosure. Both are required.

---

## 2. Goals & Non-Goals

**Goals:**
- Implement ERC-5564 stealth address generation for all USDX transfers.
- Implement recipient detection (scanning for incoming stealth transfers) using ERC-5564 viewing keys.
- Ensure all USDX transfers use stealth addresses by default — there is no opt-out.
- Integrate ERC-5564 with the USDX token contract to make stealth addressing a protocol-level property, not an opt-in application layer.
- Maintain compatibility with the compliance selective disclosure layer (COMPLIANCE-SPEC.md).

**Non-Goals:**
- Stealth addresses for non-USDX assets (v1: USDX only).
- Amount hiding (transaction amounts remain visible in v1 — amount privacy is a v2 consideration).
- Sender anonymity (ERC-5564 hides recipient identity, not sender identity).
- Custom or non-ERC-5564 stealth address schemes (deprecated by ADR-005; see deprecated spec).
- Implementing ERC-5564 on external chains (Nexus L1 only in v1).

---

## 3. User Stories

> As a **USDX Holder**, I want my incoming USDX transfers to be sent to one-time stealth addresses so that my transaction history cannot be linked to my public identity by blockchain observers.

> As a **USDX Holder**, I want to scan the USDX transaction history using my viewing key so that I can identify all incoming transfers without exposing my spending key.

> As a **DeFi Developer**, I want USDX stealth transfers to follow the ERC-5564 standard so that I can use standard tooling for address generation and recipient detection in my application.

> As a **Protocol Governor**, I want stealth addresses to be a protocol-level default — not an opt-in — so that privacy protection is uniform and no metadata leaks from non-private transfers.

---

## 4. Functional Requirements

- **FR-001:** The USDX token contract SHALL implement the ERC-5564 `IStealthTransfer` interface, requiring that all USDX transfers include: (a) the recipient's stealth address (one-time address), (b) the ephemeral public key used to generate the stealth address, and (c) a metadata field for the recipient detection hint.

- **FR-002:** The USDX issuance gateway and redemption gateway SHALL both support ERC-5564 stealth address inputs. Minting and redemption to non-stealth addresses SHALL be rejected by the contract. There is no "plain transfer" path in v1.

- **FR-003:** The protocol SHALL provide an open-source `StealthAddressGenerator` SDK (TypeScript and Rust) that implements ERC-5564 compliant address generation. The SDK SHALL: (a) take the recipient's ERC-5564 public key as input, (b) generate an ephemeral keypair, (c) compute the stealth address using the dual-key scheme defined in ERC-5564, and (d) return the stealth address and ephemeral public key.

- **FR-004:** The protocol SHALL provide an open-source `RecipientDetector` SDK that implements ERC-5564 recipient detection. Given a holder's viewing key and a block range, the SDK SHALL scan the USDX transaction event logs and return all transfers where the holder is the recipient, without requiring the holder to expose their spending key.

- **FR-005:** The USDX token contract SHALL emit an `ERC5564Announcement(schemeId, stealthAddress, ephemeralPublicKey, metadata)` event for every USDX transfer, consistent with the ERC-5564 announcement scheme. These events are the primary mechanism for recipient detection.

- **FR-006:** The `schemeId` used in ERC-5564 announcements SHALL be the Nexus-registered scheme identifier, indicating the specific elliptic curve and derivation parameters in use. This allows future scheme upgrades without breaking existing scanning tooling.

- **FR-007:** The ERC-5564 implementation SHALL be designed to allow the compliance layer (COMPLIANCE-SPEC.md) to derive viewing keys from spending keys without any modification to the stealth address scheme itself. The viewing key derivation is additive — it extends ERC-5564 without replacing any component.

---

## 5. Non-Functional Requirements

- **NFR-001:** [Privacy] An outside observer who observes all ERC-5564 transfer announcements SHALL NOT be able to determine the recipient identity of any transfer. The only entities able to identify a recipient are: (a) the sender (who computed the stealth address), and (b) the recipient (who can derive the stealth address from their spending key).

- **NFR-002:** [Standards Compliance] The implementation SHALL be fully compliant with ERC-5564 as published and SHALL pass the ERC-5564 test vectors provided in the standard.

- **NFR-003:** [Performance] Stealth address generation (in the SDK) SHALL complete in under 50ms on consumer-grade hardware. Recipient detection scan for a 10,000-block range SHALL complete in under 10 seconds on consumer-grade hardware.

- **NFR-004:** [Compliance Pairing] The ERC-5564 implementation SHALL be deployed atomically with the compliance selective disclosure layer. The USDX contract SHALL enforce that both are active simultaneously per CONSTRAINTS.md COMP-001.

- **NFR-005:** [Key Safety] The spending key SHALL never be required for recipient detection or disclosure proof generation. Any operation that requires the spending key SHALL be clearly documented as such. SDK functions that only require the viewing key SHALL NOT accept or request the spending key.

---

## 6. Acceptance Requirements

> Criteria that must be demonstrably true for this spec to move Approved → Shipped.

### 6a. Functional Acceptance

- [ ] **AC-001:** Given a sender with a recipient's ERC-5564 public key, when the `StealthAddressGenerator` SDK generates a stealth address, then the generated address is a valid ERC-5564 compliant stealth address derivable by the recipient using their spending key.
- [ ] **AC-002:** Given a USDX transfer to a stealth address, when the transaction is finalized on-chain, then an `ERC5564Announcement` event is emitted with the correct schemeId, stealthAddress, ephemeralPublicKey, and metadata fields.
- [ ] **AC-003:** Given a recipient's viewing key and a block range containing their incoming transfers, when the `RecipientDetector` SDK scans that range, then it identifies all transfers to that recipient and no transfers belonging to other recipients.
- [ ] **AC-004:** Given an attempt to call `transfer(to, amount)` with a non-stealth `to` address, when the transaction is submitted, then it reverts.
- [ ] **AC-005:** Given the ERC-5564 test vectors published in the standard, when the `StealthAddressGenerator` is run with those inputs, then it produces the exact outputs specified in the test vectors.
- [ ] **AC-006:** Given the compliance layer is deployed alongside ERC-5564, when an attempt is made to disable only the compliance layer while leaving ERC-5564 active, then the transaction reverts.
- [ ] **AC-007:** All FR-001 through FR-007 requirements have corresponding passing tests in CI.

### 6b. Non-Functional Acceptance

- [ ] **AC-NFR-001:** Observer intercept test: 1000 stealth transfers analyzed — zero transfers linkable to recipient public keys by an observer who does not hold the recipient's spending or viewing key.
- [ ] **AC-NFR-002:** ERC-5564 compliance test suite: all published test vectors pass.
- [ ] **AC-NFR-003:** SDK performance: stealth address generation < 50ms, 10k-block recipient detection scan < 10s on M1 MacBook Pro.
- [ ] **AC-NFR-004:** SDK review confirms spending key is never passed to recipient detection or disclosure functions.

### 6c. Documentation Acceptance

- [ ] **AC-DOC-001:** PRODUCT_MAP.md updated to reflect `Shipped` status.
- [ ] **AC-DOC-002:** CLAUDE.md reviewed — privacy + compliance pairing invariant unchanged.
- [ ] **AC-DOC-003:** CHANGELOG entry added with date and summary.
- [ ] **AC-DOC-004:** ADR-005 (ERC-5564 adoption) is merged and linked above.

### 6d. Definition of Done

All AC items above are checked AND:
- [ ] ERC-5564 implementation deployed to testnet; at least 10 end-to-end stealth transfer + recipient detection cycles tested.
- [ ] SDK published to public package registry with usage documentation.
- [ ] On-call runbook updated with ERC-5564 failure modes (recipient detection failure, announcement event missing, compliance pairing mismatch).
- [ ] Spec status updated to `Shipped` in this file and in PRODUCT_MAP.md.

---

## 7. Technical Design Notes

**Dual-key scheme**: ERC-5564 uses two keypairs per recipient: (1) the spending keypair (`sk_spend`, `pk_spend`), used to spend funds, and (2) the viewing keypair (`sk_view`, `pk_view`), used to scan for incoming transfers. The stealth address is derived by the sender as: `stealth = pk_spend + H(r * pk_view) * G`, where `r` is the ephemeral private key. The recipient can recover the stealth address using their spending and viewing keys.

**Announcement scheme**: Every transfer emits an `ERC5564Announcement` event. Receivers scan these events using their viewing key to check `H(sk_view * ephemeral_pub_key) * G == stealth - pk_spend`. If true, the transfer is addressed to them. This allows detection without spending key exposure.

**Nexus-specific extensions**: Nexus extends ERC-5564 with: (1) a viewing key derivation function for the compliance layer (defined in COMPLIANCE-SPEC.md), and (2) a `NexusAnnouncement` supplemental event that adds the compliance metadata needed for disclosure proof generation. The core ERC-5564 scheme is unmodified.

**Deprecation context**: The custom ECDH-based stealth scheme previously specced for Nexus is now deprecated (see [deprecated spec](../../_deprecated-custom-stealth/SPEC.md) and ADR-005). The primary reasons for switching to ERC-5564 were: (1) ecosystem tooling compatibility, (2) formal security analysis of the standard, and (3) dual-key scheme which enables viewing key separation — a capability the custom scheme lacked.

---

## 8. Open Questions

- [x] **Q1**: Should the Nexus schemeId be registered in the ERC-5564 scheme registry or assigned internally? — Owner: @marcus — Resolved 2026-01-10: Register with ERC-5564 scheme registry to enable cross-chain compatibility.
- [ ] **Q2**: Should amount hiding (confidential transactions) be included in v1 or deferred to v2? Current spec only hides recipient identity, not transaction amount. — Owner: @marcus — Resolve by: 2026-04-01

---

## 9. Success Metrics

| Metric | Target | Measurement Method |
|--------|--------|--------------------|
| Stealth transfer adoption | 100% of USDX transfers (enforced by contract) | Transfer event log analysis |
| ERC-5564 standard compliance | 100% test vector pass rate | CI test suite |
| Recipient detection accuracy | 100% — no missed transfers, no false positives | SDK testing across 10k-block ranges |
| Address generation latency | < 50ms | SDK benchmarking |
| Privacy audit result | Zero observer-linkable transfers | External security audit |

---

## 10. Changelog

| Date | Author | Change |
|------|--------|--------|
| 2026-01-15 | @marcus | Initial spec written following ADR-005 adoption |
| 2026-01-15 | @marcus | Promoted to Approved (fast-tracked given prior custom spec + ADR) |
