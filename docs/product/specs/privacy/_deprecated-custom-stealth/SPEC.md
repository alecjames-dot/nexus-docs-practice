> ⚠️ DEPRECATED — Superseded on 2026-01-15 following ADR-005. Do not
> build to this document. Replacement: [ERC-5564 Spec](../erc5564/SPEC.md)

---

# Custom Stealth Address Scheme Spec

**Status:** ~~Approved~~ → Deprecated 2026-01-15
**Owner:** @marcus
**Last Updated:** 2026-01-15 (deprecation note added)
**ADRs:** [ADR-005 — ERC-5564 over Custom Stealth](../../../../architecture/decisions/ADR-005-erc5564-over-custom.md) *(records the decision to supersede this spec)*
**Superseded By:** [ERC-5564 Stealth Address Spec](../erc5564/SPEC.md)

---

> The following content is preserved as a historical record only. This spec was approved and was the active stealth address design for Nexus from October 2025 until January 2026. It was deprecated following ADR-005, which adopted ERC-5564 as the standard. Do not reference or build to this content.

---

## Historical Record

---

## 1. Problem Statement

USDX transfers on a public blockchain are visible to all observers. To provide financial privacy for USDX holders, Nexus requires a stealth address scheme that allows senders to generate unique one-time addresses for recipients, ensuring that transfers cannot be linked to recipient identities by outside parties. This spec defines a custom ECDH-based scheme for stealth address generation and recipient detection, designed for the specific constraints of the Nexus zkVM execution environment.

---

## 2. Goals & Non-Goals

**Goals:**
- Define a custom stealth address scheme using ECDH key agreement optimized for the Nexus zkVM circuit.
- Ensure recipient detection requires only a scanning key, not the spending key.
- Make stealth addresses the default for all USDX transfers.

**Non-Goals:**
- Standard protocol compatibility (this was a custom Nexus-specific scheme).
- Amount hiding.
- Sender anonymity.

---

## 3. User Stories

> As a **USDX Holder**, I want to receive USDX at a one-time stealth address so that my transaction history cannot be linked to my identity.

> As a **USDX Holder**, I want to scan for incoming transfers using a scanning key that does not expose my spending key.

---

## 4. Functional Requirements

- **FR-001:** The stealth address scheme SHALL use a single-key ECDH construction: sender computes `shared_secret = r * pk_recipient`, derives stealth address as `stealth = H(shared_secret) * G + pk_recipient`, and publishes ephemeral key `R = r * G`.

- **FR-002:** The recipient SHALL detect incoming transfers by computing `stealth_candidate = H(sk_recipient * R) * G + pk_recipient` for each announcement and comparing to the announced stealth address.

- **FR-003:** The recipient's scanning key SHALL be the spending key itself (`sk_recipient`) — there is no separate viewing key in this scheme. *(Note: this was identified as a limitation leading to ADR-005 adoption. The single-key scheme requires exposing the spending key for scanning, which is a security concern for the compliance layer.)*

- **FR-004:** An announcement event SHALL be emitted for each transfer containing: `(stealthAddress, ephemeralPubKey, encryptedMetadata)`.

- **FR-005:** The scheme SHALL be implemented as a Nexus-specific precompile in the zkVM to minimize proof generation overhead.

---

## 5. Non-Functional Requirements

- **NFR-001:** [Performance] Stealth address generation SHALL complete in under 20ms in the zkVM precompile context.

- **NFR-002:** [Security] The scheme SHALL provide sender-recipient unlinkability under the ECDH security assumption.

- **NFR-003:** [Limitation — subsequently resolved] The single-key design (FR-003) means there is no clean separation between the scanning key and the spending key. Any party with scanning capability also has spending capability. This was acceptable in the original design but became a blocking issue when the compliance layer required a viewing-key-only disclosure path.

---

## 6. Acceptance Requirements

*(Historical — this spec was approved but not shipped. All ACs were pending when deprecation occurred.)*

### 6a. Functional Acceptance

- [ ] AC-001 through AC-005: Not completed — deprecation occurred before implementation.

### 6c. Documentation Acceptance

*(Not applicable — this spec was deprecated before shipping.)*

---

## 7. Technical Design Notes

**ECDH construction**: The scheme uses secp256k1. Stealth address derivation: `stealth = H(r * pk_recipient) + pk_recipient` where `H` is SHA-256 applied to the x-coordinate of the ECDH shared secret point, then multiplied by the generator `G`.

**Limitation that drove deprecation**: The single-key design does not support a viewing-only key. The compliance layer (COMPLIANCE-SPEC.md) requires a viewing key that can be shared with authorized parties without exposing spending capability. When this requirement became clear, the team evaluated whether the custom scheme could be extended and concluded that ERC-5564's dual-key scheme was architecturally superior for this use case. See ADR-005 for the full analysis.

**zkVM precompile**: The custom precompile developed for this scheme was evaluated for reuse with ERC-5564. Conclusion: the elliptic curve operations are identical (secp256k1), but the derivation function is different enough that a new precompile was warranted for ERC-5564. The custom precompile was not deployed to production.

---

## 8. Open Questions

*(All open questions at deprecation time — not resolved, superseded by ERC-5564 adoption.)*

- [ ] ~~Should the scheme support key rotation?~~ — Moot: superseded by ADR-005.
- [ ] ~~How should the ephemeral key be stored to minimize on-chain announcement size?~~ — Moot: superseded by ADR-005.

---

## 9. Success Metrics

*(Not applicable — spec deprecated before shipping.)*

---

## 10. Changelog

| Date | Author | Change |
|------|--------|--------|
| 2025-10-15 | @marcus | Initial draft |
| 2025-11-01 | @marcus | Promoted to Approved |
| 2025-12-10 | @marcus | Added compliance layer incompatibility note (FR-003 NFR-003) |
| 2026-01-15 | @marcus | DEPRECATED following ADR-005. Replacement: [ERC-5564 Spec](../erc5564/SPEC.md) |
