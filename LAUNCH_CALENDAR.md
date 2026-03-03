# Product Planning Board

> Owned by Product (@alec). Updated as initiatives move through the pipeline.
> Status columns map directly to the lifecycle in `GUIDELINES.md`.
> Key: **S** = Scoped ✅/❌ | **P** = Prioritized ✅/❌ | **C** = Completed date
> **T** = Target date | **R** = Responsible | **Min/Max** = eng week estimates

---

| Backlog | Scoping (in Linear / Backlog) | Specifying | Scheduling (in Linear / Planned) | Started (in Linear / In Progress) | Shipped (in Linear / Completed) |
|---------|-------------------------------|------------|----------------------------------|-----------------------------------|---------------------------------|
| Exchange App<br><br>EVM L1 v2 | USDX v2<br>S: ✅ → P: ❌<br>Min: 8 / Max: 12<br><br>Rewards System v1 (Points)<br>S: ✅ → P: ❌<br>Min: 2 / Max: 3<br><br>Rewards System v2.1 (Global Yield - Reward TVL)<br>S: ✅ → P: ❌<br>Min: 1 / Max: 2<br><br>Rewards System v2.2 (Global Yield - Reward Apps)<br>S: ✅ → P: ❌<br>Min: 4 / Max: 6 | — | EVM L1 Mainnet v1<br>C: Mar 20 → T: Mar 20<br><br>NexusOS User Re-engagement<br>S: ✅ → P: ✅<br>Min: 1 / Max: 1 + process SLA<br>T: Now R: @Alec James | ICO Website<br>C: Feb 13 → T: Feb 20<br>(Launch Mar 10 - End Apr 29) | NEX Mint<br>C: Jan 22 → T: Jan 28<br><br>USDX v1<br>C: Jan 26<br><br>Testnet III<br><br>Testnet II<br><br>Testnet I |

---

# Product Launch Calendar

**Owner:** @alec | **Last updated:** 2026-03-02

Quick-reference launch schedule for all major Nexus products and features. Dates are targets unless marked `CONFIRMED`. See [ROADMAP.md](docs/product/ROADMAP.md) for full phase context.

---

## Reading This Calendar

| Badge | Meaning |
|-------|---------|
| `SHIPPED` | Live in production |
| `CONFIRMED` | Date locked; resources committed |
| `TARGET` | Working target; subject to change |
| `TBD` | Scoping in progress; date not set |

---

## 2025

| Date | Product | Milestone | Status | Notes |
|------|---------|-----------|--------|-------|
| Q3 2025 | **Nexus Mainnet** | zkVM testnet launch | `SHIPPED` | EVM-compatible, validity proofs on every block |
| Q3 2025 | **Prover Network** | Permissioned prover set (v1) | `SHIPPED` | 12 operators at launch |
| Q3 2025 | **USDX** | Issuance + fixed yield (3.4%) | `SHIPPED` | 1:1 USD collateral; fixed rate (superseded in Phase 2) |
| Q4 2025 | **USDX** | Variable yield mechanism | `SHIPPED` | On-chain revenue index; see ADR-002 |

---

## 2026 — H1

| Date | Product | Milestone | Status | Notes |
|------|---------|-----------|--------|-------|
| Q1 2026 | **Prover Network** | Open (permissionless) prover registration | `CONFIRMED` | Nakamoto coefficient target ≥ 5 |
| Q1 2026 | **zkVM** | Proof aggregation (recursive SNARK) | `CONFIRMED` | ADR-001; performance milestone |
| Q1 2026 | **USDX** | ERC-5564 stealth address privacy | `CONFIRMED` | Replaces deprecated custom scheme; ADR-005 |
| Q2 2026 | **USDX** | Compliance selective disclosure | `TARGET` | Awaiting legal sign-off before confirming |
| Q2 2026 | **Prover Network** | Liveness slashing v1 | `TARGET` | Liveness-only scope per ADR-004; penalty % TBD |

---

## 2026 — H2

| Date | Product | Milestone | Status | Notes |
|------|---------|-----------|--------|-------|
| Q3 2026 | **Nexus Mainnet** | On-chain governance (v1) | `TBD` | Token model decision blocking; see GOVERNANCE SPEC |
| Q3 2026 | **USDX** | Cross-chain bridges (Ethereum) | `TBD` | Spec not started |
| Q4 2026 | **Prover Network** | Prover marketplace (open bidding) | `TBD` | Replaces round-robin assignment |
| Q4 2026 | **Prover Network** | Fault/fraud proof slashing (v2) | `TBD` | Deferred from Phase 2 per ADR-004 |

---

## 2027

| Date | Product | Milestone | Status | Notes |
|------|---------|-----------|--------|-------|
| 2027 | **USDX** | Institutional compliance API | `TBD` | Programmatic selective disclosure access |
| 2027 | **zkVM** | zkVM SDK v2 | `TBD` | Performance improvements, additional precompiles |

---

## Phase Outcomes at a Glance

| Phase | Target Completion | North Star Outcome |
|-------|------------------|--------------------|
| Phase 1 — Foundation | Q3 2025 ✓ | zkVM testnet live; USDX supply > $5M; first third-party DeFi app deployed |
| Phase 2 — Growth | Q2 2026 | Prover network decentralized (NC ≥ 5); USDX transfers private + compliant; yield on-chain |
| Phase 3 — Scale | 2027 | Governance active; cross-chain USDX supply > $100M; prover marketplace live |

---

> **To update this calendar:** Edit this file and update `PRODUCT_MAP.md` in the same commit. For target-to-confirmed transitions, get sign-off from @alec and the relevant engineering lead.
