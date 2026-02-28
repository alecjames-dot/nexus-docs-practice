# ADR-001: zkVM Proof Strategy — Recursive SNARK Construction

**Status:** Accepted
**Date:** 2025-10-14
**Author:** @marcus
**Deciders:** @marcus, @alec, @security
**Related Specs:** [zkVM Execution Environment](../../product/specs/zkvm/SPEC.md)

---

## Context

Nexus requires a proof system for the zkVM that can generate validity proofs for individual transactions and then aggregate them into a single block proof for submission to the settlement layer. The primary tension is between proof generation speed (user latency), proof aggregation efficiency (settlement layer throughput), and prover hardware accessibility (decentralization). At launch, we expect blocks with up to 256 transactions. Proof system choice locks in the circuit architecture for the foreseeable future and is expensive to change — this decision warrants careful analysis of alternatives.

## Decision

**We will use a recursive SNARK construction for zkVM proof aggregation, specifically a Groth16-based per-transaction circuit with a Nova-style folding scheme for recursive aggregation into a single block proof.**

This means each transaction is proven independently by the Groth16 circuit, and the Nova folding accumulator aggregates up to 256 transaction proofs into a single aggregated proof that is submitted to the settlement layer as a Groth16 proof of the folding computation. The settlement layer verifier only verifies one proof per block regardless of transaction count.

## Alternatives Considered

| Option | Pros | Cons | Rejected Because |
|--------|------|------|-----------------|
| Recursive SNARK / Groth16 + Nova (chosen) | Small constant proof size; fast on-chain verification; well-studied security; hardware acceleration available | Trusted setup required; Nova accumulator adds proving complexity | N/A — chosen |
| STARK-based (e.g., Plonky2) | No trusted setup; quantum-resistant; fast proving | Large proof sizes (~100KB); slow on-chain verification; higher gas cost per block finalization | On-chain verification cost would make settlement economically infeasible at scale |
| Groth16 fixed circuit (no recursion) | Simple; fast proving for small circuits; small proofs | Block proof size grows linearly with transactions; cannot aggregate; settlement gas cost unbounded | Linear scaling breaks at >20 transactions per block — unworkable at target throughput |
| PLONK universal circuit | No per-circuit trusted setup; flexible | Larger proof size than Groth16; slower verification | Proof size and verification speed are worse than Groth16 without compelling offsetting benefit at our circuit complexity |

## Consequences

**Positive:**
- Block proof size is constant regardless of transaction count (major settlement layer gas efficiency).
- Groth16 settlement verifier is a simple, audited contract pattern with known gas costs (~250k gas per verification).
- Nova folding is computationally efficient — aggregation overhead is sub-linear in transaction count.
- Enables batching: provers can aggregate partial batches and submit incrementally.

**Negative:**
- Requires a trusted setup ceremony for the Groth16 per-transaction circuit. This is a one-time ceremony but introduces coordination complexity and a trust assumption on the ceremony participants. A single malicious participant who controls all participants could compromise the setup.
- Nova is a newer construction with less battle-tested production use. Security analysis exists but the implementation risk is higher than pure Groth16.
- Circuit upgrades (e.g., adding a new EVM opcode to the zkVM) require a new trusted setup ceremony. This means the upgrade process is slower and more coordination-intensive than for STARK-based systems.

**Risks:**
- If a security vulnerability is discovered in the Nova folding scheme, all proofs generated since deployment could be compromised. Mitigation: we will engage two independent auditors for the Nova implementation.
- The trusted setup could be compromised if too few participants participate. Mitigation: we plan a public ceremony with at least 1000 participants, following the Zcash Sapling ceremony model.

## Review Trigger

This ADR should be revisited if: (a) on-chain proof verification costs exceed 20% of the settlement layer block gas limit at target throughput, (b) a critical security vulnerability is discovered in the Nova folding implementation, or (c) the trusted setup ceremony has fewer than 100 participants.
