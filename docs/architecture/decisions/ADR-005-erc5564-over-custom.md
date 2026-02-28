# ADR-005: Adopt ERC-5564 for Stealth Addresses — Deprecate Custom Scheme

**Status:** Accepted
**Date:** 2026-01-15
**Author:** @marcus
**Deciders:** @marcus, @alec, @security
**Related Specs:** [ERC-5564 Stealth Address Spec](../../product/specs/privacy/erc5564/SPEC.md), [Deprecated Custom Stealth Spec](../../product/specs/privacy/_deprecated-custom-stealth/SPEC.md)

---

## Context

Nexus had an approved spec for a custom ECDH-based stealth address scheme (now deprecated at [_deprecated-custom-stealth/SPEC.md](../../product/specs/privacy/_deprecated-custom-stealth/SPEC.md)). That scheme used a single-key construction: the recipient's scanning key and spending key were the same. This was identified as a limitation when the compliance layer spec (COMPLIANCE-SPEC.md) was being designed: the compliance layer requires a viewing key that can be shared with authorized parties for selective disclosure, without those parties gaining spending capability. The single-key scheme could not support this — the "viewing key" would be the spending key. Simultaneously, ERC-5564 was finalized as an Ethereum standard with an ecosystem of audited implementations, a formal security analysis, and tooling support. The team evaluated whether to extend the custom scheme or adopt ERC-5564.

**This ADR supersedes the custom stealth spec. The custom spec is now deprecated.** The deprecated spec is preserved for historical reference at [docs/product/specs/privacy/_deprecated-custom-stealth/SPEC.md](../../product/specs/privacy/_deprecated-custom-stealth/SPEC.md) but must not be built to.

## Decision

**We will adopt ERC-5564 as the standard for stealth address implementation across all USDX transfers, replacing the previously specced custom ECDH scheme.**

ERC-5564 uses a dual-key construction (spending key + viewing key) that directly enables the compliance layer's viewing key requirements. All new USDX transfer implementations must use ERC-5564. The custom scheme's spec is deprecated effective today, and its implementation work (a partial zkVM precompile) is discarded.

## Alternatives Considered

| Option | Pros | Cons | Rejected Because |
|--------|------|------|-----------------|
| Adopt ERC-5564 (chosen) | Dual-key scheme enables compliance viewing key; ecosystem tooling; formal security analysis; interoperability with ERC-5564 wallets | Requires discarding partial custom scheme implementation; different from the zkVM precompile design | N/A — chosen |
| Extend custom scheme with viewing key | Preserves existing work; Nexus-specific optimizations | Designing a secure viewing key extension is non-trivial; no external security review of the construction; delays compliance spec | The security risk of a bespoke single-key-to-dual-key extension outweighs the cost of starting with ERC-5564 |
| No stealth addresses (plain transfers) | No implementation cost; simpler protocol | USDX transfers are fully public; no privacy; non-starter for institutional adoption; compliance layer cannot exist without stealth addresses | Core privacy requirement cannot be dropped |
| Custom scheme for v1, ERC-5564 later | Ship sooner; can migrate later | Migration creates breaking change for existing USDX holders; dual-scheme period creates complexity | Migration cost is higher than adopting ERC-5564 now; there is no urgency to ship the custom scheme |

## Consequences

**Positive:**
- ERC-5564's dual-key scheme (spending key + viewing key) directly solves the compliance layer's viewing key requirement — no additional design needed.
- Ecosystem interoperability: ERC-5564 compatible wallets can interact with Nexus USDX transfers without custom integration.
- Security: ERC-5564 has received formal cryptographic analysis and multiple independent audits. The custom scheme had received only one internal review.
- Tooling: ERC-5564 implementations exist in TypeScript, Rust, and Go — reducing SDK development effort.
- The custom scheme's partial zkVM precompile work is discarded, but the elliptic curve components are reusable for the ERC-5564 implementation.

**Negative:**
- Approximately 3 weeks of custom scheme implementation work is discarded.
- The ERC-5564 scheme uses a slightly different elliptic curve derivation path than our custom scheme, meaning the zkVM precompile must be redesigned (though secp256k1 operations are the same).
- The custom stealth spec that was previously Approved is now Deprecated — any external parties who had planned to build against it need to be notified.
- ERC-5564's standard announcement format requires slightly more on-chain storage per transfer than our custom scheme (metadata field is larger).

**Risks:**
- If ERC-5564 is found to have a security vulnerability post-adoption, Nexus inherits that vulnerability. Mitigation: we will commission an independent audit of our ERC-5564 implementation before shipping (in addition to relying on the existing ERC-5564 analysis).
- Ecosystem tooling for ERC-5564 is newer than for established stealth address schemes. If tooling gaps emerge, they become our problem to solve. Mitigation: we will contribute to ERC-5564 tooling and maintain our own SDK.

## Review Trigger

This ADR should be revisited if: (a) a material security vulnerability is discovered in ERC-5564 that affects the Nexus implementation, (b) ERC-5564 is formally deprecated or superseded by a new standard that provides clearly better properties, or (c) the compliance layer's viewing key requirements change in a way that ERC-5564 cannot accommodate.
