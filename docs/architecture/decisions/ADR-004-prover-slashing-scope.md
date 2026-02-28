# ADR-004: Prover Slashing Scope — Liveness-Only in v1

**Status:** Accepted
**Date:** 2026-01-08
**Author:** @priya
**Deciders:** @priya, @marcus, @alec
**Related Specs:** [Prover Slashing v1](../../product/specs/prover-network/SLASHING-SPEC.md)

---

## Context

The Nexus prover network requires a slashing mechanism to ensure Prover Operators remain economically accountable for their commitments. Two categories of prover misbehavior exist: (1) **liveness failures** — the Prover was assigned a task and failed to submit a proof within the required time window, and (2) **fault/fraud failures** — the Prover submitted an incorrect proof (either accidentally, due to a bug, or maliciously). The slashing spec needs to address both categories, but implementing both in v1 has substantially different complexity and risk profiles. The team needed to decide whether to ship liveness + fault slashing together in v1 or defer fault slashing to v2.

## Decision

**We will restrict v1 slashing to liveness failures only. Fault and fraud proof slashing — penalizing Provers who submit incorrect proofs — is deferred to v2.**

In v1, the only slashable offense is failing to submit a proof within the liveness window (plus the grace period). The settlement layer's on-chain proof verifier already prevents incorrect proofs from being accepted — a Prover who submits a bad proof simply does not receive payment and their submission is not finalized. There is no v1 penalty beyond losing the fee for that task.

## Alternatives Considered

| Option | Pros | Cons | Rejected Because |
|--------|------|------|-----------------|
| Liveness-only slashing in v1 (chosen) | Simpler implementation; lower audit risk; faster to ship; settlement layer verifier already prevents incorrect proofs from finalizing | Does not economically penalize Provers who submit wrong proofs; Byzantine provers can repeatedly submit bad proofs at low cost | N/A — chosen; the settlement layer's verifier provides the correctness guarantee without fault slashing |
| Liveness + fault slashing in v1 | Full accountability from day one; stronger economic disincentive for incorrect proofs | Fault proof attribution is technically complex (must distinguish a malicious bad proof from a software bug); increases audit surface significantly; delays v1 launch | Implementation complexity and launch delay outweigh the benefit — settlement layer verifier makes incorrect proofs harmless (they don't finalize) |
| No slashing in v1 | Simplest implementation; no slashing risk for operators; lower barrier to prover participation | No economic accountability for liveness; rational operators can go offline during low-fee periods without penalty; network liveness risk | Unacceptable liveness risk — the prover network's reliability is a protocol-level safety guarantee |

## Consequences

**Positive:**
- Substantially simpler slashing contract — only needs to track liveness failures, which are verifiable by simple timeout logic.
- Faster launch: no need to design and audit fault attribution logic.
- Lower risk of incorrect slashing (slashing bugs that penalize honest Provers for software issues).
- Prover Operators have a clear, well-defined SLA: submit proofs on time and you will not be slashed.

**Negative:**
- A Prover who has a systematic bug that causes incorrect proofs can repeatedly submit bad proofs without economic penalty (beyond losing fees). They will be auto-excluded from the dispatch queue after enough failures, but they face no stake penalty.
- The absence of fault slashing means the prover set selection should still prioritize operators with known track records, especially in the early months when the network is newer.
- The slashing spec must explicitly document this limitation so DeFi Developers understand that prover economic accountability in v1 is about liveness, not correctness. Correctness is guaranteed by the settlement layer verifier, not by economics.

**Risks:**
- A large proportion of the prover network could be running the same buggy software version and all submit incorrect proofs simultaneously. The settlement layer verifier prevents finalization, but chain liveness would stall until correct proofs are submitted. Mitigation: prover software diversity and the liveness re-dispatch mechanism reduce (but don't eliminate) this risk.
- The v2 fault slashing design will be harder to retrofit than if it had been designed in v1. Mitigation: document the v2 interface requirements now (in the Slashing Spec design notes) so the contracts are structured to accommodate fault slashing later.

## Review Trigger

This ADR should be revisited if: (a) a Prover is observed to systematically submit incorrect proofs, causing network disruption, without any economic consequence beyond fee loss, (b) fault proof attribution technology matures sufficiently to implement safely in a future spec cycle, or (c) the DeFi Developer community identifies fault slashing absence as a blocker to institutional adoption.
