# Proof of Reserves V1 Spec

**Status:** SPECIFYING
**Owner:** [@alecjames-dot](https://github.com/alecjames-dot)
**Last Updated:** 2026-03-05
**Approved by (Product):** —
**Approved by (Engineering):** —
**Linear:** —
**Figma:** —
**Related Research:** —
**Related Specs:** [USDX V1 Spec](../usdx/SPEC.md)

---

## Cross-Team Signoff

| Team | Stakeholder | Y/N |
|------|-------------|-----|
| Product | Daniel | ⏰ |
| Engineering | Stanley, Sasha, Sam S | ⏰ |
| Marketing | Lauren | ⏰ |
| Legal | Lisa, Roza | ⏰ |
| Security | Ben | ⏰ |

**Signoff Dates:**

1. —

---

## 1. Context

### Investment Case

**Payoff**
- $0 direct — this is unlikely to be monetized directly
- Intangible: strengthens brand and competitive positioning for verifiable finance; demonstrates first application of zkVM within the Nexus financial engine; creates a minimal proof of concept readily adopted by other entities within the M0 ecosystem; signals direction of compute network evolution

**Opportunity Cost**
- Weaker product and company narrative for verifiable finance
- Resources must be redirected to another verifiability application

**Effort**
- *Engineering to fill from scoping*
- Currently very few engineers have worked on the Nexus zkVM — difficult to estimate
- Ramp-up period required; choice of Jolt vs Nexus zkVM will materially affect timeline
- zkTLS rough estimate: Min 3 weeks / Max 5 weeks

### Primary Goals

1. Enable any user to independently verify — via zero-knowledge proof — that Nexus' M0 stablecoin extension is fully backed according to onchain accounting rules
2. Demonstrate the first application of verifiable finance within the Nexus financial engine
3. Create a minimal proof of concept readily adopted by other entities within the M0 ecosystem
4. Signal the direction of compute network evolution

---

## 2. Goals & Non-Goals

**Goals:**
- Prove extension-level accounting consistency for USDX at a specific block height
- Surface a verification badge on all Nexus product interfaces where USDX appears
- Allow any user to re-run verification client-side, without a wallet or gas
- Design the system so it can scale from a local prover to the Nexus decentralized compute network

**Non-Goals:**
- Proving offchain collateral held by minters
- Proving minter solvency
- Replacing the M0 validator model
- Monetization (Phase 1)

---

## 3. Summary of Features

| Feature | Description |
|---------|-------------|
| zk Proof of Reserves | Periodic ZK proof that `totalSupply ≤ totalAssets + $M backing` at a verified block height |
| Verification badge | Green/red badge displayed next to USDX on NexusOS, usdx.nexus.xyz, and Explorer |
| In-browser verification | User can click badge to view proof details and re-run verification client-side (WASM) |
| Public proof API | API exposing proof, public inputs, block reference, and verification key per interval *(nice-to-have)* |
| Badge SDK / plug-in | Embeddable JS component for explorers, DeFi apps, and wallet interfaces *(nice-to-have)* |
| Decentralized prover path | Phase 2 migration from local prover → Nexus compute network |

---

## 4. Functional Requirements

### 0. Fundamental Invariant

The system must prove the following relationship derived from the USDX contract (Solidity functions to be translated to Rust):

- `totalSupply()` — total circulating supply of the extension
- `totalAssets()` — total non-`$M` backing assets tracked by the extension contract
- `$M backing` = `totalSupply() - totalAssets()`

**Proof assertion:** `totalSupply <= totalAssets + (totalSupply - totalAssets)`

All values must be derived from canonical onchain state at a specific block height.

> **TODO:** Add origin of data proof point.
> **TODO:** Confirm Solidity → Rust translation of `totalSupply()` and `totalAssets()`.

**The zk proof does NOT:**
- Prove offchain collateral
- Prove minter solvency
- Replace the M0 validator model

**The zk proof DOES:**
- Verify extension-level accounting consistency

---

### 1. Proof Model

#### 1.1 Local Proving

- **FR-001:** The zk program SHALL be implemented in Nexus zkVM or Jolt. (Periodic proving approach favors Nexus zkVM.)
- **FR-002:** For MVP, the proving system SHALL run locally as a single trusted prover instance.
- **FR-003:** Proofs SHALL be generated periodically at a configurable interval. *(Interval TBD — engineering to recommend for viability.)*
- **FR-004:** Verification SHALL be deterministic, publicly reproducible, and stateless beyond referenced block data.
- **FR-005:** The proving program SHALL:
  1. **Read** from the stablecoin extension contract:
     - `totalSupply()`
     - `totalAssets()`
  2. **Verify:**
     - Arithmetic consistency of the invariant
     - No overflow or underflow
     - Values correspond to a valid block state root
  3. **Output:**
     - Public inputs: block number, block hash, `totalSupply`, `totalAssets`
     - Boolean validity result

#### 1.2 State Source

- **FR-006:** The system SHALL pull data from Ethereum Mainnet via an RPC provider. *(RPC provider TBD.)*
- **FR-007:** The system SHALL target the USDX contract address. *(Contract address TBD.)*

---

### 2. User Experience Requirements

- **FR-008:** A verification badge SHALL appear next to the USDX stablecoin name on all Nexus product surfaces:
  - NexusOS — any display of USDX
  - `usdx.nexus.xyz`
  - Explorer — any instance of USDX
- **FR-009:** The badge SHALL display green with a positive visual signal when backing is verified as correct.
- **FR-010:** The badge SHALL display red when backing is incorrect.
- **FR-011:** On click, the badge SHALL display:
  - Proof date
  - zk proof hash
  - Verify button (client-side execution via WASM)
  - Last verified date
- **FR-012:** The user SHALL be able to:
  - Re-run verification
  - View raw proof data
  - View verification result
- **FR-013:** Verification SHALL:
  - Require no wallet connection
  - Require no gas
  - Execute client-side or via lightweight verifier

---

### 3. API & External Integration *(Nice-to-Have)*

#### 3.1 Public Proof API

- **FR-014:** Expose a public API returning, per proof interval:
  - Proof
  - Public inputs
  - Block reference
  - Verification key

#### 3.2 Badge SDK / Plug-In

- **FR-015:** Provide a lightweight JS SDK with an embeddable badge component.
- **FR-016:** The SDK SHALL allow explorers, DeFi apps, and wallet interfaces to:
  - Display the badge
  - Trigger verification
  - Render proof status
- **FR-017:** The SDK SHALL be read-only, require no Nexus authentication, and verify proofs client-side where possible.

---

### 4. Scalability Path — Decentralized Prover Network

- **FR-018:** Phase 2 SHALL support migration from local prover → Nexus compute network.
- **FR-019:** Phase 2 SHALL support multiple independent prover nodes generating proofs deterministically.
- **FR-020:** The system SHALL accept proofs from multiple provers, reject malformed proofs, and allow cross-verification between provers.
- **FR-021:** The system design SHALL NOT assume a single trusted prover.

---

## 5. Non-Functional Requirements

- **NFR-001:** [Security] The proving system SHALL NOT expose private inputs. All public inputs must be verifiable independently from onchain data.
- **NFR-002:** [Correctness] Proof generation and verification SHALL be fully deterministic — identical inputs must always produce identical outputs.
- **NFR-003:** [Accessibility] Verification SHALL be executable by any user without a wallet, gas, or Nexus account.
- **NFR-004:** [Portability] The MVP design SHALL not foreclose migration to the decentralized compute network in Phase 2.

### Performance Requirements

| Requirement | Metric | Target | Percentile | Conditions |
|-------------|--------|--------|------------|------------|
| Proof generation | Time to generate proof | TBD — engineering to scope | — | Local prover, single instance |
| In-browser verification | Time to verify proof via WASM | < 5s | p99 | Desktop browser |
| Badge load time | Time from page load to badge render | < 2s | p95 | Cached proof |

---

## 6. Acceptance Requirements

### 6a. Functional Acceptance

- [ ] **AC-001:** Given a valid block height, when the proving program runs, then a proof is generated that correctly reflects `totalSupply`, `totalAssets`, and `$M backing` from onchain state.
- [ ] **AC-002:** Given a valid proof, when a user clicks the verification badge, then verification completes client-side and returns a correct result without wallet or gas.
- [ ] **AC-003:** Given an invalid backing state, when the proof is checked, then the badge displays red.
- [ ] **AC-004:** Given a valid backing state, when the proof is checked, then the badge displays green.
- [ ] **AC-005:** Given NexusOS, `usdx.nexus.xyz`, and Explorer, when USDX is displayed, then the badge appears on all three surfaces.
- [ ] **AC-006:** All FR-001 through FR-021 requirements have corresponding passing tests.

### 6b. Non-Functional Acceptance

- [ ] **AC-NFR-001:** In-browser verification completes in < 5s at p99 on a standard desktop browser.
- [ ] **AC-NFR-002:** Security review signed off by @Ben before ship.
- [ ] **AC-NFR-003:** Proof generation confirmed deterministic — same block inputs produce identical proofs across independent runs.

### 6c. Documentation Acceptance

- [ ] **AC-DOC-001:** `PRODUCT_MAP.md` updated to reflect `SHIPPED` status.
- [ ] **AC-DOC-002:** `CLAUDE.md` updated if any invariants or module boundaries changed.
- [ ] **AC-DOC-003:** Any ADRs made during implementation are merged and linked above.

### 6d. Definition of Done

All AC items above are checked AND:
- [ ] Badge deployed to production on all three surfaces (NexusOS, usdx.nexus.xyz, Explorer).
- [ ] Proving interval confirmed and documented.
- [ ] RPC provider and USDX contract address confirmed and hardcoded/configured.
- [ ] On-call runbook updated to cover prover failure modes.
- [ ] Spec status updated to `SHIPPED` in this file and `PRODUCT_MAP.md`.

---

## 7. Open Questions

- [ ] Which proving system: Nexus zkVM or Jolt? — Owner: Engineering — Resolve by: APPROVED
- [ ] What is the optimal proof generation interval for viability? — Owner: Engineering — Resolve by: APPROVED
- [ ] Which RPC provider for Ethereum Mainnet state? — Owner: Engineering — Resolve by: APPROVED
- [ ] Confirm Solidity → Rust translation of `totalSupply()` and `totalAssets()` is feasible — Owner: Engineering — Resolve by: APPROVED
- [ ] Add origin of data proof point to the fundamental invariant — Owner: [@alecjames-dot](https://github.com/alecjames-dot) — Resolve by: APPROVED
- [ ] Is WASM verification approach feasible for in-browser use? Scope required — Owner: Engineering — Resolve by: APPROVED
- [ ] Scope of Badge SDK / Public Proof API (nice-to-have) — Owner: [@alecjames-dot](https://github.com/alecjames-dot) — Resolve by: before SCHEDULING

---

## 8. Success Metrics

| Metric | Target | Measurement Method |
|--------|--------|--------------------|
| Proof generation uptime | ≥99% of scheduled intervals produce a valid proof | Prover monitoring |
| In-browser verification success rate | ≥99% of user-initiated verifications complete successfully | Client-side error tracking |
| Badge surface coverage | Badge present on all 3 Nexus surfaces at launch | Manual QA + monitoring |

---

## 9. Sign-off

| Team | Reviewer | Status | Date |
|------|----------|--------|------|
| Product | Daniel | Pending | — |
| Engineering | Stanley, Sasha, Sam S | Pending | — |
| Marketing | Lauren | Pending | — |
| Legal | Lisa, Roza | Pending | — |
| Security | Ben | Pending | — |

---

## 10. Changelog

| Date | Author | Change |
|------|--------|--------|
| 2026-03-05 | [@alecjames-dot](https://github.com/alecjames-dot) | Initial spec — SPECIFYING |

---

## Appendix: M0 Protocol Context

- **Minters** maintain collateral offchain (referred to as 'issuers')
- **Trusted validators** verify minters' offchain collateral
- **Minters issue `$M`** based on their verified collateral
- **SwapFacility** acts as the central router for all M0 extensions. Extensions are wrapped versions of `$M` with additional branding or rules. Wrapping = minting in this system.
- **Decentralized solver network** of minters facilitates wrapping and unwrapping of `$M` into desired extensions via SwapFacility. `$M` is the universal liquidity for all extensions — any minter in the network can wrap/unwrap any extension with `$M`.
- **USDX** is deployed as a JMI extension within the M0 protocol. The `totalAssets()` function tracks non-`$M` backing assets; `$M` backing is derived as `totalSupply() - totalAssets()`.
