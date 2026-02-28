# ADR-003: USDX Burn Authority — Governance-Only in v1

**Status:** Accepted
**Date:** 2025-11-21
**Author:** @alec
**Deciders:** @alec, @marcus, @security
**Related Specs:** [USDX Core](../../product/specs/usdx/SPEC.md), [Prover Slashing v1](../../product/specs/prover-network/SLASHING-SPEC.md)

---

## Context

Two concurrent specs in development — the USDX Core spec and the Prover Slashing spec — arrived at a conflict over USDX burn authority. The USDX Core spec was being designed around an invariant that supply should only change through economically deliberate decisions. The Prover Slashing spec, in an early draft, assumed that slashed prover collateral would be burned as USDX to create deflationary supply pressure. These two positions are contradictory: the slashing spec required an automated protocol burn path, while the USDX spec required that no such path exist. This ADR resolves the conflict.

Additionally, a broader design question existed: should any holder, contract, or protocol module have the ability to burn USDX unilaterally (e.g., for bridging, for settlement, for any other protocol function)? The team had not taken an explicit position on this. This ADR establishes that position.

## Decision

**We will restrict USDX burn authority to on-chain governance in v1. No contract, EOA, protocol module, or automated mechanism may burn USDX supply without an explicit governance vote executed through the governance timelock.**

This means: (a) the slashing spec must be revised to direct slashed funds to the protocol treasury rather than burning them, (b) the `USDXToken.burn()` function is gated by a `BURN_ROLE` held exclusively by the governance timelock, and (c) any future protocol spec that requires USDX burn capability must go through governance to be authorized.

## Alternatives Considered

| Option | Pros | Cons | Rejected Because |
|--------|------|------|-----------------|
| Governance-only burn (chosen) | Maximum supply integrity; no automated supply reduction risk; clear authority trail | Slower response if burn is genuinely needed; governance overhead for operational burns | N/A — chosen |
| Open burn — any holder | Simple; allows redemption-style burns | Enables griefing (burn others' USDX), supply manipulation, bridging edge cases; no accountability | Supply manipulation risk is unacceptable for a stablecoin |
| Protocol-controlled burn (multisig) | More responsive than governance; retains some centralized control | Requires ongoing trust in multisig signers; conflicts with progressive decentralization; creates a privileged actor | The "trust the multisig" model is what on-chain governance is designed to replace |
| Contract-whitelist burn (specific modules) | More flexible than governance-only; faster for operational needs | Each whitelist addition is a new attack surface; slashing-triggered burns create supply manipulation vectors if the slashing system is exploited | The risk of a whitelisted contract being exploited into burning USDX is too high in v1 |

## Consequences

**Positive:**
- USDX supply changes are fully auditable and deliberate — every burn has a governance vote and a proposal ID on-chain.
- Eliminates the class of attacks where an exploited protocol module triggers USDX supply reduction.
- Creates clear, simple invariant: the only entity that can burn USDX is the governance timelock.
- Resolves the slashing spec conflict: slashed funds go to treasury, not burned. The protocol treasury then holds value that governance can decide to burn, distribute, or reinvest.

**Negative:**
- If a future protocol feature genuinely requires automated burns (e.g., a cross-chain bridge that burns USDX on the source chain), that feature cannot ship without a governance vote to whitelist the burning contract. This adds latency and governance load.
- If governance is slow or suffers from low participation, burns that are economically appropriate may be delayed.
- Slashing is less deflationary than originally envisioned in the slashing spec. The prover network team will need to revise their economic model.

**Risks:**
- If the governance timelock contract itself is compromised, an attacker could burn USDX supply. Mitigation: the timelock is audited and has a minimum 72-hour delay, giving the community time to identify and respond to a malicious proposal.
- If governance becomes captured (low participation + concentrated token holdings), a capture attacker could authorize burns to manipulate USDX supply. Mitigation: quorum requirements and approval thresholds are designed with this risk in mind.

## Review Trigger

This ADR should be revisited if: (a) a legitimate protocol feature requires automated USDX burns at a frequency that makes governance voting impractical, (b) governance is successfully deployed and has demonstrated sufficient participation and security that a curated whitelist of burning contracts is acceptable, or (c) v2 slashing design revisits the burn vs. treasury question.
