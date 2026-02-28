# Nexus Roadmap

Last updated: 2026-02-27 | Owner: @alec

---

## Phase 1 — Foundation (Shipped)

_Goal: Prove the core technology. Land the first real users._

| Feature | Status | Notes |
|---------|--------|-------|
| zkVM testnet | Shipped | EVM-compatible zkVM, validity proofs on every block |
| Basic prover network | Shipped | Permissioned prover set; 12 operators at launch |
| USDX fixed yield (3.4%) | Shipped | Fixed rate; not sourced from on-chain revenue (superseded by Phase 2) |
| USDX issuance and redemption | Shipped | 1:1 USD collateral; no programmatic burn |
| Developer documentation | Shipped | zkVM SDK, USDX contract interfaces |
| Block explorer | Shipped | Proof verification visible in explorer |

**Phase 1 outcome**: zkVM testnet live, USDX circulating supply > $5M, first third-party DeFi app deployed.

---

## Phase 2 — Growth (In Progress)

_Goal: Make the protocol economically sustainable and compliance-ready._

| Feature | Status | Spec | Notes |
|---------|--------|------|-------|
| Variable yield mechanism | Shipped | [YIELD-SPEC](../specs/usdx/YIELD-SPEC.md) | On-chain revenue index; ADR-002 |
| ERC-5564 stealth addresses | Approved | [ERC-5564 SPEC](../specs/privacy/erc5564/SPEC.md) | Replaces deprecated custom scheme; ADR-005 |
| Compliance selective disclosure | Review | [COMPLIANCE-SPEC](../specs/usdx/COMPLIANCE-SPEC.md) | Awaiting legal sign-off |
| Open prover network | Approved | [PROVER-NETWORK SPEC](../specs/prover-network/SPEC.md) | Permissionless prover registration |
| Prover liveness slashing v1 | Draft | [SLASHING-SPEC](../specs/prover-network/SLASHING-SPEC.md) | Liveness only per ADR-004 |
| Proof aggregation (recursive SNARK) | Approved | [zkVM SPEC](../specs/zkvm/SPEC.md) | ADR-001 |

**Phase 2 outcome**: Prover network decentralized (Nakamoto coefficient ≥ 5), USDX transfers private + compliant, yield tracking on-chain revenue.

---

## Phase 3 — Scale (Planned)

_Goal: Make Nexus the default settlement layer for institutional DeFi._

| Feature | Status | Notes |
|---------|--------|-------|
| On-chain governance | Draft | [GOVERNANCE SPEC](../specs/governance/SPEC.md) — token model TBD |
| Cross-chain USDX bridges | Planned | Bridging to Ethereum and other L1s; spec not started |
| Prover marketplace | Planned | Open bidding for proof tasks; replaces round-robin assignment |
| Fault/fraud proof slashing | Planned | Slashing v2; deferred from Phase 2 per ADR-004 |
| Institutional compliance API | Planned | Programmatic access to selective disclosure proofs |
| zkVM SDK v2 | Planned | Performance improvements, additional precompiles |

**Phase 3 outcome**: Governance active, cross-chain USDX supply > $100M, prover marketplace operational.

---

## What We Are Not Building (in any phase)

- A general-purpose smart contract platform competing with Ethereum
- An off-chain compliance oracle or trusted attestation service
- A custodial stablecoin or centrally managed reserve
- Yield sourced from outside the protocol (no real-world asset backing in v1)
