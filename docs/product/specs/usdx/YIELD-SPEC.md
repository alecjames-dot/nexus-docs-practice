# USDX Variable Yield Distribution Spec

**Status:** Shipped
**Owner:** @alec
**Last Updated:** 2026-01-20
**Approved by (Product):** —
**Approved by (Engineering):** —
**Linear:** —
**Figma:** —
**ADRs:** [ADR-002 — Variable Yield Mechanism](../../../architecture/decisions/ADR-002-variable-yield-mechanism.md)
**Related Research:** —
**Related Specs:** [USDX Core](./SPEC.md)

---

## 1. Problem Statement

The initial USDX design used a fixed 3.4% annualized yield, which created two problems: (1) the yield was not sourced from real protocol revenue, creating a liability the protocol could not sustainably fund, and (2) as the protocol grew and revenue changed, there was no mechanism to reflect real economic conditions in the yield rate. USDX holders were receiving a promised rate with no on-chain proof that the rate was economically backed. This spec defines the variable yield mechanism that replaced the fixed rate: USDX yield is now calculated as a direct function of on-chain protocol revenue, updated every block, and distributable pro-rata to all USDX holders. This was a breaking change from the fixed model and is documented in ADR-002.

---

## 2. Goals & Non-Goals

**Goals:**
- Define how on-chain protocol revenue is recognized and accumulated in the `ProtocolRevenueBuffer`.
- Define the yield rate calculation formula that converts accumulated revenue to a per-USDX yield rate.
- Define how yield is distributed to USDX holders (accumulation model vs. distribution model).
- Ensure yield calculations are fully deterministic and on-chain verifiable per CONSTRAINTS.md ECON-003.
- Ensure yield is sourced exclusively from protocol revenue per CONSTRAINTS.md ECON-001.

**Non-Goals:**
- Fixed yield rate (superseded by this spec and ADR-002).
- Off-chain yield sources (prohibited by CONSTRAINTS.md ECON-001).
- Yield from real-world assets or treasury drawdowns (prohibited).
- Yield compounding strategies or structured yield products (DeFi Developer responsibility).
- Yield distribution to staked USDX specifically (all USDX holders earn yield equally in v1).

---

## 3. User Stories

> As a **USDX Holder**, I want my yield to reflect the actual revenue the Nexus protocol generates so that I can trust that the yield rate is economically backed and not a promise that depends on new token issuance.

> As a **USDX Holder**, I want to be able to verify my accrued yield on-chain at any time so that I do not need to trust a yield dashboard maintained by Nexus Labs.

> As a **DeFi Developer**, I want to query the current USDX yield rate from an on-chain contract so that my protocol can incorporate the yield rate into its financial logic without trusting an off-chain API.

> As a **Protocol Governor**, I want the yield formula parameters to be adjustable via governance so that the protocol can fine-tune yield distribution as revenue sources evolve.

---

## 4. Functional Requirements

- **FR-001:** Protocol revenue sources (proof fees, sequencer fees, any governance-approved future sources) SHALL be routed to a `ProtocolRevenueBuffer` contract at the point of collection. Each revenue credit SHALL emit a `RevenueRecognized(source, amount, blockHeight)` event.

- **FR-002:** At the close of each block, the `YieldCalculator` contract SHALL compute the current annualized yield rate as: `yieldRate = (blockRevenue / totalUSDXSupply) * blocksPerYear`. The resulting rate SHALL be recorded in an on-chain `YieldRateHistory` mapping keyed by block height.

- **FR-003:** USDX yield SHALL accrue to each holder continuously using a yield index model: a global `yieldIndex` is updated each block, and each holder's claimable yield is calculated as `(currentYieldIndex - holderSnapshotIndex) * holderBalance`. This avoids distributing yield in per-holder transactions each block.

- **FR-004:** USDX holders SHALL be able to claim their accrued yield at any time by calling `YieldDistributor.claim()`. Claimed yield SHALL be minted as additional USDX and transferred to the holder's address. Yield minting via `claim()` is not a USDX burn and is not governed by ADR-003 — it is new supply creation backed by recognized protocol revenue.

- **FR-005:** The `YieldCalculator` SHALL enforce that yield calculations use only on-chain inputs: `blockRevenue` (from `ProtocolRevenueBuffer`), `totalUSDXSupply` (from `USDXToken`), and `blocksPerYear` (a governance parameter). No oracle input, off-chain data, or privileged call may modify yield calculation inputs.

- **FR-006:** If `blockRevenue` in a given block is zero (e.g., no proof fees collected), the yield rate for that block SHALL be recorded as zero. There is no floor yield rate or minimum guarantee.

- **FR-007:** The yield rate update SHALL be committed to the `YieldRateHistory` within the same block as revenue recognition, per CONSTRAINTS.md PERF-003.

---

## 5. Non-Functional Requirements

- **NFR-001:** [Determinism] Any third party with access to on-chain state SHALL be able to independently reproduce the yield rate for any historical block using only on-chain data. The yield formula must be deterministic and fully on-chain per CONSTRAINTS.md ECON-003.

- **NFR-002:** [Performance] Yield rate calculation and `YieldRateHistory` update SHALL complete within the same block as revenue recognition (≤ 1 block latency) per CONSTRAINTS.md PERF-003.

- **NFR-003:** [Security] The `ProtocolRevenueBuffer` SHALL only accept deposits from whitelisted revenue source contracts (proof fee collector, sequencer fee collector). Deposits from other addresses SHALL revert.

- **NFR-004:** [Transparency] The current yield rate, yield index, and total accrued-but-unclaimed yield SHALL all be readable from on-chain view functions without any privileged access.

---

## 6. Acceptance Requirements

> Criteria that must be demonstrably true for this spec to move Approved → Shipped.

### 6a. Functional Acceptance

- [x] **AC-001:** Given proof fees of 100 USDX are collected in block N, when block N closes, then `ProtocolRevenueBuffer` balance increases by 100 USDX and a `RevenueRecognized` event is emitted.
- [x] **AC-002:** Given `blockRevenue = 100`, `totalUSDXSupply = 1,000,000`, `blocksPerYear = 2,628,000`, when block N closes, then `YieldRateHistory[N]` records an annualized yield rate of (100 / 1,000,000) * 2,628,000 = 262.8% annualized (note: this is a high-revenue example for test purposes).
- [x] **AC-003:** Given a holder holds 1000 USDX from block N to block N+100, when they call `claim()` at block N+100, then their claimable yield equals the sum of their pro-rata share across all 100 blocks.
- [x] **AC-004:** Given a block with zero proof fees collected, when the yield rate is queried for that block, then it returns 0.0% — no minimum floor yield is applied.
- [x] **AC-005:** Given an external account attempts to deposit directly to `ProtocolRevenueBuffer`, when the deposit transaction is submitted, then it reverts.
- [x] **AC-006:** Given a holder calls `claim()`, when the transaction is finalized, then new USDX is minted equal to their claimable yield and their snapshot index is updated to the current yield index.
- [x] **AC-007:** All FR-001 through FR-007 requirements have corresponding passing tests in CI.

### 6b. Non-Functional Acceptance

- [x] **AC-NFR-001:** Third-party reproduction of yield rates for 1000 consecutive blocks from on-chain data only — zero discrepancies.
- [x] **AC-NFR-002:** Yield rate update latency confirmed ≤ 1 block vs. revenue recognition event in production monitoring.
- [x] **AC-NFR-003:** Unauthorized deposit to `ProtocolRevenueBuffer` confirmed to revert across 10 test cases.

### 6c. Documentation Acceptance

- [x] **AC-DOC-001:** PRODUCT_MAP.md updated to reflect `Shipped` status.
- [x] **AC-DOC-002:** CLAUDE.md reviewed — no invariant changes introduced.
- [x] **AC-DOC-003:** CHANGELOG entry added: "2026-01-20 — USDX variable yield shipped."
- [x] **AC-DOC-004:** ADR-002 (variable yield mechanism) is merged and linked above.

### 6d. Definition of Done

All AC items above are checked AND:
- [x] Yield distribution contracts deployed to mainnet, accumulation model live.
- [x] On-call runbook updated with yield distribution failure modes (zero-revenue block anomaly, claim failure, yield index desync).
- [x] Spec status updated to `Shipped` in this file and in PRODUCT_MAP.md.

---

## 7. Technical Design Notes

**Yield index model**: Rather than distributing yield in per-holder transactions each block (gas-prohibitive), the yield index approach accumulates yield globally. `yieldIndex` grows each block by `blockRevenue / totalUSDXSupply`. Each holder's claimable yield is `holderBalance * (currentIndex - snapshotIndex)`, where `snapshotIndex` is the index at the holder's last claim or transfer. Transfers update the snapshot index, crystallizing accrued yield before the balance changes.

**Revenue sources**: In v1, two sources feed the `ProtocolRevenueBuffer`: (1) the proof fee collector, which charges per proof verified on the settlement layer, and (2) the sequencer fee collector, which retains a fraction of gas fees. Additional sources (e.g., protocol-owned liquidity yield) require a governance vote and a new `RevenueSource` whitelist entry.

**Blocks per year**: The `blocksPerYear` parameter is governance-controlled and set to the expected block production rate. It does not need to be exact — slight deviations cause the stated annualized rate to be slightly above or below the effective rate, which is acceptable. The effective yield to holders is always correct (derived from actual revenue), regardless of the stated annualized rate.

**Transition from fixed rate**: The fixed 3.4% rate was phased out by disabling the `FixedYieldDistributor` contract in the same upgrade that deployed the `YieldCalculator`. ADR-002 documents the rationale and transition plan.

---

## 8. Open Questions

- [x] **Q1**: Should yield be claimable as USDX (new minting) or as collateral assets? — Owner: @alec — Resolved 2025-12-15: Claimable as USDX (FR-004). Collateral withdrawal is via the redemption gateway, not yield claims.
- [x] **Q2**: Should the yield index be normalized to avoid precision issues with small balances? — Owner: @alec — Resolved 2026-01-05: Use fixed-point arithmetic with 18 decimal places. No normalization needed.

---

## 9. Success Metrics

| Metric | Target | Measurement Method |
|--------|--------|--------------------|
| Yield rate update latency | ≤ 1 block | On-chain event log comparison |
| Independent yield reproduction accuracy | 100% match | Third-party audit tooling |
| Total yield distributed | Track (growing metric) | YieldDistributor `Claimed` events |
| Yield claim rate | > 60% of accrued yield claimed within 30 days | YieldDistributor events vs. accrual index |
| Zero-floor-yield blocks | Track (informational) | YieldRateHistory — no action needed |

---

## 10. Changelog

| Date | Author | Change |
|------|--------|--------|
| 2025-11-03 | @alec | Initial draft following ADR-002 |
| 2025-12-01 | @alec | Added yield index model to design notes; resolved Q1 |
| 2025-12-15 | @alec | Promoted to Approved |
| 2026-01-05 | @alec | Resolved Q2 (fixed-point arithmetic) |
| 2026-01-20 | @alec | Promoted to Shipped; all ACs checked |
