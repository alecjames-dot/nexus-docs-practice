# USDX — V2 Spec

**Status:** SCHEDULING
**Owner:** [@alecjames-dot](https://github.com/alecjames-dot)
**Last Updated:** 2026-03-05
**Approved by (Product):** @Daniel Marin
**Approved by (Engineering):** —
**Linear:** —
**Figma:** —
**Related Research:** —
**Related Specs:** [USDX V1 Spec](SPEC.md) | [M0 and USDX Onboarding Context](https://www.notion.so/M0-and-USDX-Onboarding-Context-2e967845c2f48068a051f1424bbd46b2?pvs=21)

---

## 1. Context

### Investment Case

Competitive exchanges generate **$24M/year** from stablecoin usage at $800M+ TVL (~$2M/month). Every day USDX is not live on Nexus costs **$66k/day in foregone yield**. V2 moves USDX from Ethereum Mainnet to Nexus Layer 1 as the canonical stablecoin, integrates it as the DEX's native quote and margin asset, and provides user-facing onboarding infrastructure at `usdx.nexus.xyz`.

### Opportunity Cost

**$66k/day in yield** until shipped. Delay also cedes stablecoin mindshare on Nexus to third-party issuers, weakens the ICO/TGE signal, and delays protocol revenue accumulation.

### Effort

| Area | Estimate |
|------|---------|
| Define admin accounts | Negligible |
| Exchange app integration | 1–2 weeks |
| EVM/Core integration | 4–6 weeks (incl. contract audit) |
| Bridging | 0.5 weeks |
| NexusOS onboarding | 3–4 weeks (incl. UX/UI design) |
| **Total** | **8–12 weeks** |

---

## 2. Goals & Non-Goals

**Goals:**
1. Establish USDX as the primary stablecoin on Nexus Layer 1 and preferred quote asset on the Nexus Exchange. Applications on Nexus will be incentivised to prioritise USDX over third-party stablecoins.
2. Create structural USDX TVL accumulation driven by real usage, not incentives alone.
3. Enable ecosystem flywheels across Nexus Exchange and applications.
4. Capture stablecoin yield at scale; avoid value leakage to third-party issuers.
5. Provide a strong ICO/TGE signalling primitive.
6. Align builders via protocol-native revenue streaming (GYDS).

**Non-Goals:**
- Yield distribution to end users (Foundation only; sUSDX is a future initiative).
- ~~$NEX buyback routing from DEX fees~~ (descoped — see strikethrough in requirements).
- Governance or control rights conferred by USDX.
- Long-term network value accrual via USDX (that is $NEX's role).

---

## 3. Summary of Features

| Feature | Description |
|---------|-------------|
| $NEX / $USDX role definition | Canonical split: $NEX = scarce value asset; $USDX = stable quote asset |
| USDX admin account setup | Multi-sig role assignment; yield recipient set to Foundation address |
| Dual-layer architecture | USDX as ERC-20 on NexusEVM + protocol-privileged ledger on NexusCore |
| Deposit / withdrawal system | Deterministic, exactly-once, replay-protected with continuous reconciliation |
| USDX bridging | Bridge contracts on ETH Mainnet ↔ Nexus Mainnet (partner TBD) |
| USDC/USDT ↔ USDX conversion | Uniswap V3 pools on NexusEVM; two pools (USDC↔USDX, USDT↔USDX) |
| NexusOS onboarding at `usdx.nexus.xyz` | Create USDX, swap back to USDC, bridge to Nexus — three user flows |

---

## 4. Functional Requirements

### 1. Asset Definition

#### 1.1 Relationship Between $NEX and $USDX

| | $NEX | $USDX |
|--|------|-------|
| **Role** | Scarce, value-accruing economic asset | Stable USD asset |
| **Primary functions** | Gas settlement; validator staking and consensus; governance; compute/prover pricing | Quote currency for all perp markets; collateral and margin; medium of exchange for apps; yield streaming and activity incentives |
| **Value accrual** | From network usage and economic activity | From increasing economic activity on Nexus Mainnet |
| **NOT designed for** | Unit of account; day-to-day payments; price stability | Network security; governance or control rights; long-term value accrual |

- USDX yield streaming **substitutes for inflationary app-token subsidies of $NEX**.
- ~~All USDX-denominated activity should create demand for NEX via DEX fee routing to $NEX buybacks.~~ *(Descoped.)*

#### 1.2 USDX Account Specification

- Use the Nexus Multi-sig to assign admin privileges to the following roles within the USDX contract:
  - Call `setYieldRecipient(address account)` with: `0xd3C678B78C85181Be730d6ff15E1459B5B1eda81`
  - Reference: [USDX Admin Account](https://www.notion.so/USDX-Admin-2f967845c2f48005adbdeb3e1f4a7098?pvs=21) | [JMI configuration guide](https://www.notion.so/How-to-deploy-and-configure-the-JMI-Extension-Nexus-Desired-Extension-2e767845c2f48109b0e0ec971a16e500?pvs=21)

---

### 2. System Architecture

#### 2.1 Dual-Layer USDX Model

The canonical USDX ERC-20 exists on Ethereum Mainnet. USDX operates across two additional layers:

**NexusEVM (ERC-20 layer)**
- Used for: custody, deposits, withdrawals, cross-chain transfers.
- Fully redeemable and transferable.

**NexusCore (protocol-privileged ledger)**
- All Nexus Exchange-level accounting MUST be denominated in USDX: margin, PnL, funding payments, liquidations, risk and insurance, trade settlement.
- USDX standardises value once capital enters Nexus.

**Invariant:** No desynchronisation between layers is permitted. At all times:
```
Total ERC-20 USDX in NexusEVM deposit contract
=
Total ledger USDX on NexusCore
```

---

### 3. Deposits and Withdrawals (NexusCore ↔ NexusEVM)

#### 3.1 Deposits

1. User owns USDX on NexusEVM and deposits ERC-20 USDX into the deposit contract.
2. Protocol locks funds in custody via deposit contract.
3. Execution ledger credits USDX balance on NexusCore.
4. Deposit finality required before trading eligibility.

#### 3.2 Withdrawals

1. User requests withdrawal from NexusCore.
2. NexusCore verifies: no open positions OR margin requirements satisfied post-withdrawal.
3. NexusCore USDX balance reduced.
4. ERC-20 USDX released from contract to user's EVM address.

#### 3.3 Verification

The NexusCore ↔ NexusEVM integration MUST operate as a **deterministic, exactly-once state machine** that enforces conservation of USDX at all times.

**System invariant:**
```
USDX held in NexusEVM deposit contract
=
Total USDX liabilities recorded in NexusCore
+ pending withdrawals not yet released
- pending deposits not yet credited
```

**Deposit requirements:**
- Emit a unique `depositId`.
- Credited to NexusCore exactly once, after defined NexusEVM finality threshold.
- Idempotent (safe under retry or duplicate observation); replay-protected.
- Core MUST maintain a persistent registry of processed `depositId`s and reject duplicates.
- If a deposit transaction is reorged prior to finality, it MUST NOT be credited.

**Withdrawal requirements:**
- Assigned a globally unique `withdrawId`.
- NexusCore balance debited before any EVM release (under no circumstance may EVM release precede Core debit).
- Requires explicit authorisation from NexusCore signer set.
- Executable exactly once on NexusEVM; replay-protected via processed `withdrawId` registry.

**Fault tolerance:** System MUST tolerate message duplication, reordering, delayed delivery, partial Core outage, and partial EVM outage.

**Continuous reconciliation:**
- Nexus MUST operate a reconciliation process continuously comparing: NexusEVM deposit contract balance, NexusCore total liabilities, pending deposits, and pending withdrawals.
- If invariant violation detected:
  - Withdrawals MUST automatically pause.
  - UI MUST reflect degraded state.
  - Manual override requires multisig approval.

#### 3.4 NexusCore USDX UX

- Upon deposit to NexusCore, users see a separate **NexusCore** balance showing their deposited USDX.
- NexusCore balance is separate from the NexusEVM balance in the UI.
- NexusCore balance is viewable and operable only via: Nexus Exchange Frontend and Nexus Exchange API.

---

### 4. Bridging and Conversion

#### 4.1 Bridging

- Nexus must deploy bridging contracts on **Ethereum Mainnet** and **Nexus Mainnet** to enable USDX bridging between chains.
- Bridging partner: TBD. ⏰
- ~~USDC/T → USDX swap on ETH Mainnet then bridge via JMI~~ *(superseded by Uniswap V3 pool approach on NexusEVM.)*

#### 4.2 USDC/USDT ↔ USDX Conversion on NexusEVM

- Nexus must maintain USDX/USDC and USDX/USDT liquidity pools on NexusEVM.
- Nexus Mainnet must host an instance of **Uniswap V3** (deployed by partner or by Nexus directly).

**If Nexus deploys Uniswap V3 directly**, the deployment MUST include:
- Factory, Pool Deployer / Pool Creation mechanism, SwapRouter, NonfungiblePositionManager, Quoter / QuoterV2.
- All privileged functions (fee tier enablement, factory ownership) MUST be owned by the Nexus Multi-sig with an explicit admin runbook.

**USDX Liquidity Pools** — two Uniswap V3 pools on NexusEVM:
1. USDC ↔ USDX
2. USDT ↔ USDX

| Parameter | Value |
|-----------|-------|
| Fee tier | 0.01% |
| Launch target depth | ≤ 0.10% price impact for $10k swap; ≤ 0.25% price impact for $50k swap |
| Post-launch target depth | ≤ 0.10% slippage for $100k+ swaps |
| Liquidity ownership | Nexus (or collaborative partner) owns 100% at launch |

Both pools MUST meet minimum liquidity threshold before the conversion UX is enabled in NexusOS.

---

### 5. User Onboarding (`usdx.nexus.xyz`)

**Information displayed:**
- What USDX is; what it can be used for (value prop).
- User's USDX balance (requires wallet sign-in; otherwise prompts sign-in).
- "Learn more" link → Nexus blog.
- USDX TVL.
- Chains available.

**Three user flows:**

#### 5.1 Create USDX (USDC/USDT → USDX on ETH Mainnet)

- Enable users to acquire USDX 1:1 for USDC or USDT via M0 PSM.
- Support USDC → USDX and USDT → USDX.
- Integrate Halliday onramp widget (`onramp.nexus.xyz`) for fiat/CEX onramp.
- Wallet connection via Dynamic.
- Display "No swap fee" and 1:1 conversion explicitly; Max button for input amount.
- Optional email opt-in for USDX product updates: double opt-in, unchecked by default, privacy-compliant.

**Design:**
- Title: "Nexus U.S. Dollar"
- Description: "USDX is the canonical dollar of the Nexus ecosystem. Create USDC or USDT with USDX."
- Primary CTA: "Create USDX"
- Input asset selector: USDC/USDT toggle (default: USDC)
- Output preview: USDX amount = input amount
- Secondary CTA: "Don't have USDC or USDT?" with Halliday widget below

**Technical dependencies:**
1. Officially deploy USDX to the predicted address.
2. Call `enableEarning()` on USDX contract to begin yield accrual.
3. Call and set `assetCap` for assets in contract.
4. Test first swap to USDX.
- Reference: [Nexus (USDX) — Integration Instructions](https://www.notion.so/Nexus-USDX-Integration-Instructions-310858df176a819a8aeccbf5db8866c4?pvs=21)

#### 5.2 Swap USDX → USDC/T (on ETH Mainnet)

- Enable users to swap USDX for USDC at rates available in the SwapFacility.
- Support USDX → USDC via the SwapFacility M0 contract.
- Wallet connection via Dynamic. Display fees and conversion rates. Max button.
- **Two transactions experienced as a single transaction by the user:**
  1. USDX swapped for $wM via SwapFacility M0 contract. *(Request address from M0.)* ⏰
  2. $wM swapped for USDC via M0's Uniswap pool. *(Request address from M0.)* ⏰
- Frontend handles the two-step transition gracefully; design explains the two steps to reduce user anxiety.
- Only USDC available to swap back (not USDT).

#### 5.3 Bridge USDX (ETH Mainnet → Nexus Mainnet)

- Bridge widget enabling users to bridge USDX from ETH Mainnet to Nexus Mainnet.
- Bridge frontend connects to bridging contracts on ETH Mainnet and Nexus Mainnet.
- Bridging partner TBD. ⏰

---

## 5. Non-Functional Requirements

- **NFR-001 [Integrity]:** Deterministic accounting between NexusEVM and NexusCore at all times. No USDX desynchronisation permitted.
- **NFR-002 [Integrity]:** Auditable USDX supply vs. backing at all times.
- **NFR-003 [Resilience]:** Graceful handling of issuer or oracle downtime.
- **NFR-004 [Compliance]:** Native minting restricted to KYC'd entities; initially only Nexus Foundation.
- **NFR-005 [Documentation]:** Clear documentation in Nexus L1 and DEX docs before launch.

### Performance Requirements

| Requirement | Metric | Target | Percentile | Conditions |
|-------------|--------|--------|------------|------------|
| Deposit credit latency | NexusEVM finality → NexusCore credit | Immediate post-finality | — | After finality threshold met |
| Withdrawal release | Core debit → EVM release | Atomic; EVM release never before Core debit | — | — |
| Reconciliation detection | Invariant violation detection | Immediate | — | Continuous reconciliation process |
| Swap price impact | USDC/USDT ↔ USDX | ≤ 0.10% for $10k; ≤ 0.25% for $50k | — | At launch liquidity |
| Post-launch swap depth | USDC/USDT ↔ USDX | ≤ 0.10% slippage | — | $100k+ swap |

---

## 6. Acceptance Requirements

### 6a. Functional Acceptance

- [ ] **AC-001:** Yield recipient set to `0xd3C678B78C85181Be730d6ff15E1459B5B1eda81` on USDX contract.
- [ ] **AC-002:** Deposit flow: USDX locked on NexusEVM → NexusCore balance credited, idempotent and replay-protected.
- [ ] **AC-003:** Withdrawal flow: NexusCore balance debited before EVM release; withdrawal-gated on margin requirements.
- [ ] **AC-004:** Reconciliation process running; auto-pause on invariant violation; multisig override required.
- [ ] **AC-005:** Bridge contracts live on ETH Mainnet and Nexus Mainnet; end-to-end bridge flow tested.
- [ ] **AC-006:** Uniswap V3 deployed on NexusEVM; USDC↔USDX and USDT↔USDX pools seeded above minimum liquidity threshold.
- [ ] **AC-007:** `usdx.nexus.xyz` live with all three flows: Create, Swap, and Bridge.
- [ ] **AC-008:** NexusCore balance displayed separately from NexusEVM balance in Exchange frontend.

### 6b. Non-Functional Acceptance

- [ ] **AC-NFR-001:** Swap price impact ≤ 0.10% for $10k, ≤ 0.25% for $50k — confirmed against live pools.
- [ ] **AC-NFR-002:** Contract audit complete; all critical/high findings resolved before Mainnet deployment.
- [ ] **AC-NFR-003:** Reconciliation process validated in staging against deposit/withdrawal/reorg scenarios.

### 6c. Documentation Acceptance

- [ ] **AC-DOC-001:** PRODUCT_MAP.md updated to reflect `Shipped` status.
- [ ] **AC-DOC-002:** USDX V2 contract addresses, bridge addresses, and pool addresses published in Nexus docs.
- [ ] **AC-DOC-003:** CLAUDE.md updated if any invariants changed.

### 6d. Definition of Done

All AC items above are checked AND:
- [ ] Uniswap V3 pools seeded; conversion UX enabled in NexusOS.
- [ ] `usdx.nexus.xyz` publicly accessible with all three flows live.
- [ ] Spec status updated to `Shipped` in this file.

---

## 7. Open Questions

- [ ] **OQ-001** — Bridging partner selection — Owner: [@alecjames-dot](https://github.com/alecjames-dot) — Resolve by: before bridge contract deployment
- [ ] **OQ-002** — SwapFacility M0 contract address — Owner: [@alecjames-dot](https://github.com/alecjames-dot) — Resolve by: before 5.2 implementation
- [ ] **OQ-003** — M0 Uniswap pool address for $wM → USDC — Owner: [@alecjames-dot](https://github.com/alecjames-dot) — Resolve by: before 5.2 implementation
- [ ] **OQ-004** — Uniswap V3 deployment: Nexus-owned vs. partner — Owner: @Stanley Jones — Resolve by: before contract audit
- [ ] **OQ-005** — Minimum liquidity threshold for pools before enabling conversion UX — Owner: [@alecjames-dot](https://github.com/alecjames-dot) / @Stanley Jones — Resolve by: before pool launch
- [ ] **OQ-006** — Engineering sign-off (@Stanley Jones, @Sasha) — Owner: [@alecjames-dot](https://github.com/alecjames-dot) — Resolve by: before APPROVED
- [ ] **OQ-007** — Legal sign-off (Roza, Lisa) — Owner: [@alecjames-dot](https://github.com/alecjames-dot) — Resolve by: before APPROVED
- [ ] **OQ-008** — Security sign-off (Ben) — Owner: [@alecjames-dot](https://github.com/alecjames-dot) — Resolve by: before APPROVED
- [ ] **OQ-009** — Gordon (@Gordon Mattey) Product sign-off — Owner: [@alecjames-dot](https://github.com/alecjames-dot) — Resolve by: before APPROVED

---

## 8. Success Metrics

| Metric | Target | Measurement Method |
|--------|--------|--------------------|
| USDX TVL on Nexus | $800M+ (long-term) | On-chain total supply on NexusEVM |
| Yield to Foundation | $2M/month at target TVL | M0 yield dashboard |
| Deposit/withdrawal integrity | Zero desync events | Continuous reconciliation monitoring |
| Swap slippage (launch) | ≤ 0.25% for $50k | On-chain swap execution tracking |
| `usdx.nexus.xyz` conversion rate | TBD | Product analytics |

---

## 9. Sign-off

| Team | Reviewer | Status | Date |
|------|----------|--------|------|
| Product | @Daniel Marin | Approved ✅ | February 20, 2026 |
| Product | @Gordon Mattey | Pending ⏰ | — |
| Engineering | @Stanley Jones | Pending ⏰ | — |
| Engineering | @Alex "Sasha" Potashnik | Pending ⏰ | — |
| Marketing | @Lauren Dresnick | Pending ⏰ | — |
| Marketing | @Daniel McGlynn | Approved ✅ | February 20, 2026 |
| Legal | @Roza Nader, @Lisa Haugh | Pending ⏰ | — |
| Security | @Ben Speckien | Pending ⏰ | — |
| BD | — | N/A | — |

---

## 10. Changelog

| Date | Author | Change |
|------|--------|--------|
| 2026-03-05 | [@alecjames-dot](https://github.com/alecjames-dot) | V2 spec created |
| 2026-02-20 | @Daniel Marin, @Daniel McGlynn | Product and Marketing round 1 sign-off |
