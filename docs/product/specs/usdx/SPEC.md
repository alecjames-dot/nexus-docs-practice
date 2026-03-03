# USDX Core Spec

**Status:** Approved
**Owner:** @alec
**Last Updated:** 2025-12-15
**Approved by (Product):** —
**Approved by (Engineering):** —
**Linear:** —
**Figma:** —
**ADRs:** [ADR-003 — USDX Burn Authority](../../../architecture/decisions/ADR-003-usdx-burn-authority.md)
**Related Research:** —
**Related Specs:** [USDX Variable Yield](./YIELD-SPEC.md), [USDX Compliance Layer](./COMPLIANCE-SPEC.md), [ERC-5564 Stealth Addresses](../privacy/erc5564/SPEC.md)

---

## 1. Problem Statement

Nexus requires a native stablecoin that embodies the protocol's "verifiable finance" principles: a unit of account whose peg, yield, and supply are provably correct on-chain, not merely claimed by an issuer. Existing stablecoins either rely on off-chain collateral (trust the issuer), algorithmic mechanisms (trust the model), or yield from off-chain sources (trust the intermediary). USDX is collateralized by on-chain reserves, yields from on-chain protocol revenue, and is designed to be privacy-preserving and compliance-compatible simultaneously. This spec covers the issuance, redemption, peg maintenance, and core invariants of USDX. Yield distribution, privacy, and compliance are addressed in companion specs.

---

## 2. Goals & Non-Goals

**Goals:**
- Define USDX issuance (minting) conditions: who can mint, under what collateralization rules, and through what mechanism.
- Define USDX redemption: converting USDX back to USD-equivalent collateral.
- Define peg stability mechanisms.
- Enumerate core USDX invariants that all other specs must respect.
- Establish the burn authority model (governance-only per ADR-003).

**Non-Goals:**
- Variable yield distribution mechanics (see [YIELD-SPEC.md](./YIELD-SPEC.md)).
- Stealth address privacy for USDX transfers (see [ERC-5564 SPEC](../privacy/erc5564/SPEC.md)).
- Selective disclosure compliance (see [COMPLIANCE-SPEC.md](./COMPLIANCE-SPEC.md)).
- Cross-chain USDX bridges (Phase 3).
- Programmatic USDX burn by any contract, EOA, or protocol module — explicitly prohibited in v1.
- Real-world asset (RWA) collateral backing — all collateral is on-chain in v1.

---

## 3. User Stories

> As a **USDX Holder**, I want to redeem my USDX for USD-equivalent collateral at any time so that I am not locked into the protocol.

> As a **DeFi Developer**, I want to use USDX as a verified unit of account in my protocol so that I can build financial logic on a collateral whose supply and peg are cryptographically verifiable.

> As a **Protocol Governor**, I want exclusive authority over USDX burns so that supply reduction cannot be triggered by protocol logic, bugs, or individual actors.

> As a **USDX Holder**, I want to verify the USDX collateralization ratio on-chain at any time so that I do not need to trust Nexus Labs's solvency claims.

---

## 4. Functional Requirements

- **FR-001:** The USDX issuance contract SHALL allow any address to mint USDX by depositing accepted collateral assets (initially: USDC, USDT) at a 1:1 ratio. Each minting event SHALL be recorded on-chain with the depositor address, collateral amount, and resulting USDX amount.

- **FR-002:** The USDX contract SHALL maintain a collateral reserve contract that holds all deposited collateral. The collateralization ratio (total collateral value / total USDX supply) SHALL be verifiable on-chain at any time and SHALL never fall below 1.0 in normal operation.

- **FR-003:** The USDX redemption contract SHALL allow any USDX holder to redeem their USDX for an equivalent amount of collateral (minus any redemption fee, governance-controlled, initially 0.1%). Redemption SHALL be processed within 1 block of the redemption transaction being finalized.

- **FR-004:** The USDX contract SHALL NOT include any function that allows a contract, EOA, protocol module, or automated mechanism to reduce USDX total supply outside of governance-authorized burns. This is a v1 invariant established by ADR-003. Any contract upgrade that introduces such a function requires a governance vote and a new ADR.

- **FR-005:** USDX burn operations SHALL be executable only through the governance timelock. A governance vote to burn USDX must specify: the exact amount, the destination of the corresponding collateral, and the justification. Burn transactions that do not originate from the governance timelock SHALL revert.

- **FR-006:** The USDX contract SHALL be upgradeable only through the governance timelock per CONSTRAINTS.md SEC-004. The upgrade mechanism SHALL emit a `ContractUpgraded(newImplementation, governanceProposalId)` event.

- **FR-007:** The USDX issuance contract SHALL enforce a per-block minting cap (governance-controlled, initially 1,000,000 USDX per block) to prevent flash-minting attacks.

---

## 5. Non-Functional Requirements

- **NFR-001:** [Security] The USDX contract SHALL NOT include a programmatic burn function accessible to any entity other than the governance timelock, per CONSTRAINTS.md ECON-002 and ADR-003.

- **NFR-002:** [Verifiability] The total USDX supply and the total collateral value in reserve SHALL both be readable from on-chain state without requiring any off-chain computation or trust in an oracle. The collateralization ratio must be independently computable by any party.

- **NFR-003:** [Peg Stability] The USDX/USD exchange rate SHALL remain within ±0.5% of $1.00 under normal market conditions. The peg stability mechanism SHALL be fully on-chain and deterministic.

- **NFR-004:** [Performance] Minting and redemption transactions SHALL be finalized within 1 block of submission under normal network conditions.

- **NFR-005:** [Compliance Pairing] All USDX transfer functionality SHALL be deployed in conjunction with the ERC-5564 stealth address layer and the compliance selective disclosure layer per CONSTRAINTS.md COMP-001. A USDX contract without both layers is not a valid v1 deployment.

---

## 6. Acceptance Requirements

> Criteria that must be demonstrably true for this spec to move Approved → Shipped.

### 6a. Functional Acceptance

- [ ] **AC-001:** Given a user deposits 1000 USDC to the issuance contract, when the transaction is finalized, then the user receives 1000 USDX and the collateral reserve reflects 1000 USDC.
- [ ] **AC-002:** Given 1000 USDX outstanding, when the collateralization ratio is queried on-chain, then it returns ≥ 1.0.
- [ ] **AC-003:** Given a user holds 500 USDX, when they submit a redemption transaction, then they receive 499.5 USDC (minus 0.1% fee) within the same block.
- [ ] **AC-004:** Given a contract calls a hypothetical `burn(address, amount)` function directly (not through governance timelock), when the transaction is submitted, then it reverts.
- [ ] **AC-005:** Given a governance-authorized burn proposal is executed through the timelock, when the burn transaction is finalized, then USDX total supply decreases by the specified amount and a `USDXBurned(amount, proposalId)` event is emitted.
- [ ] **AC-006:** Given per-block minting cap is set to 1,000,000 USDX, when a single transaction attempts to mint 1,000,001 USDX in a single block, then the transaction reverts.
- [ ] **AC-007:** All FR-001 through FR-007 requirements have corresponding passing tests in CI.

### 6b. Non-Functional Acceptance

- [ ] **AC-NFR-001:** Attempted direct burn without governance timelock reverts in all test scenarios.
- [ ] **AC-NFR-002:** Collateralization ratio computed on-chain matches independently computed ratio from collateral reserve events.
- [ ] **AC-NFR-003:** Security review of burn authority enforcement signed off by @security before ship.

### 6c. Documentation Acceptance

- [ ] **AC-DOC-001:** PRODUCT_MAP.md updated to reflect `Shipped` status.
- [ ] **AC-DOC-002:** CLAUDE.md updated if any invariants or module boundaries changed.
- [ ] **AC-DOC-003:** CHANGELOG entry added with date and summary.
- [ ] **AC-DOC-004:** Companion specs (YIELD-SPEC, COMPLIANCE-SPEC, ERC-5564 SPEC) are all at Approved or Shipped status before this spec ships.

### 6d. Definition of Done

All AC items above are checked AND:
- [ ] USDX contracts deployed to testnet with minting, redemption, and governance burn tested end-to-end.
- [ ] On-call runbook updated with USDX failure modes (peg deviation alert, collateral reserve mismatch, governance timelock failure).
- [ ] Spec status updated to `Shipped` in this file and in PRODUCT_MAP.md.

---

## 7. Technical Design Notes

**Contract architecture**: USDX is implemented as a set of composable contracts:
- `USDXToken`: ERC-20 + ERC-5564 compatible token contract. Mint and burn gated by role.
- `CollateralReserve`: Holds deposited collateral, reports on-chain ratio.
- `IssuanceGateway`: Entry point for minting; validates collateral, enforces per-block cap, calls `USDXToken.mint`.
- `RedemptionGateway`: Entry point for redemption; validates USDX balance, burns USDX (via governance timelock role), releases collateral.
- `GovernanceTimelock`: The only address with `BURN_ROLE` on `USDXToken`.

**Burn authority enforcement**: `USDXToken.burn()` is gated by `BURN_ROLE`. The only address granted `BURN_ROLE` is the `GovernanceTimelock` contract. This is set at deployment and cannot be changed except through a governance vote (which itself requires a timelock). Even contract upgrades cannot bypass this: the upgrade mechanism requires the new implementation to pass through the governance timelock, which will not approve an implementation that widens burn authority without a governance vote.

**Peg mechanism**: The issuance gateway maintains a 1:1 minting ratio. Redemption gateway processes 1:1 minus fee. There is no algorithmic peg mechanism in v1 — the peg is maintained by the collateral reserve structure. The on-chain collateralization ratio monitoring provides early warning of any peg risk.

---

## 8. Open Questions

- [x] **Q1**: Should the redemption fee be zero in v1 to encourage adoption, or non-zero to fund the protocol? — Owner: @alec — Resolved 2025-11-30: 0.1% fee, with governance ability to adjust. Rationale: zero fee is sustainable but leaves no protocol revenue from redemption; 0.1% is low enough to not deter redemptions.
- [x] **Q2**: How should USDX handle de-pegging events? Is there an emergency pause mechanism? — Owner: @alec — Resolved 2025-12-10: Emergency pause on IssuanceGateway only (not on transfers), callable by a 3-of-5 multisig. Pause does not affect existing USDX transfers or redemptions.

---

## 9. Success Metrics

| Metric | Target | Measurement Method |
|--------|--------|--------------------|
| USDX supply | > $5M at 6 months post-launch | CollateralReserve event logs |
| Peg stability | ± 0.5% of $1.00 at all times | On-chain price feed monitoring |
| Collateralization ratio | ≥ 1.00 at all times | On-chain reserve ratio monitoring; alert at 1.02 |
| Unauthorized burn attempts | 0 successful burns without governance | Contract audit + event monitoring |
| Redemption latency | ≤ 1 block | RedemptionGateway event logs |

---

## 10. Changelog

| Date | Author | Change |
|------|--------|--------|
| 2025-10-28 | @alec | Initial draft |
| 2025-11-21 | @alec | Incorporated ADR-003 burn authority model; removed burn function from core FRs |
| 2025-11-30 | @alec | Resolved Q1 (redemption fee = 0.1%) |
| 2025-12-10 | @alec | Resolved Q2 (emergency pause on issuance gateway) |
| 2025-12-15 | @alec | Promoted to Approved |
