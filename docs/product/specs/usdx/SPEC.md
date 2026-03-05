# USDX — V1 Spec

**Status:** STARTED
**Owner:** [@alecjames-dot](https://github.com/alecjames-dot)
**Last Updated:** 2026-03-04
**Approved by (Product):** @Daniel Marin
**Approved by (Engineering):** @Stanley Jones
**Linear:** —
**Figma:** —
**Related Research:** —
**Related Specs:** [USDX Stablecoin Project Plan](https://www.notion.so/USDX-Stablecoin-Project-Plan-2e867845c2f480a4bd83e1b4ed91d29d?pvs=21)

---

## 1. Context

### Investment Case

USDX is the native stablecoin of the Nexus ecosystem. Deploying USDX on Ethereum Mainnet via M0 establishes Nexus as a stablecoin issuer, captures yield from backing assets at scale, and positions USDX as the canonical unit of account across the Exchange, L1, and Compute Network. This is also a key signalling primitive ahead of the TGE and ICO.

### Opportunity Cost

Missing the M0 submission window (final deadline: February 3rd) delays the entire USDX go-live, blocking downstream integrations with Halliday, bridging partners, and the Nexus Exchange. Delayed deployment also cedes float and yield revenue to third-party stablecoins in the interim.

### Effort

**M.** Primarily an integration and deployment effort against M0's existing infrastructure. Key dependencies are the M0 deployment guide, Foundation custody address, and the Halliday onramp fast-follow.

---

## 2. Goals & Non-Goals

**Goals:**
- Deploy the canonical USDX ERC-20 on Ethereum Mainnet via M0's JMI extension before the M0 submission deadline.
- Enable 1:1 USDC/USDT → USDX conversion via the JMI extension.
- Enable USDX onramping via the Halliday widget in NexusOS.
- Route yield from backing assets directly to the Nexus Foundation.

**Non-Goals:**
- USDX on Nexus Layer 1 (future — Ethereum or Base only for V1).
- Yield distribution to end users (Foundation only for V1; sUSDX is a future initiative).
- Native minting by external entities beyond the Nexus Foundation.
- Gas payment in USDX (medium-term roadmap item).
- Dual-layer ledger integration with the DEX orderbook (see Appendix — future architecture).

---

## 3. Summary of Features

| Feature | Description |
|---------|-------------|
| USDX ERC-20 deployment | Canonical USDX deployed on Ethereum Mainnet via M0's JMI extension |
| Sepolia test deployment | Deploy and validate on Ethereum Sepolia prior to Mainnet |
| JMI extension | 1:1 USDC/USDT ↔ USDX conversion on Ethereum |
| Yield routing | Backing asset yield (T-bills) streams to Nexus Foundation custody address |
| Halliday onramp | Onramp widget in NexusOS defaulting to USDX; fast-follow to core deployment |

---

## 4. Functional Requirements

### 1. Asset Definition

#### 1.1 Core Properties

| Property | Value |
|----------|-------|
| Canonical asset identity | USDX |
| Formal descriptive name | Nexus U.S. Dollar |
| Ticker | USDX |
| Backing | US T-Bills |
| Issuer partner | M0 |
| Deployment chain | Ethereum Mainnet |
| Decimals | 6 |

**Description:** USDX is the native stablecoin purpose-built for the Nexus blockchain and ecosystem. It is 1:1 backed by U.S. Treasury bills and U.S. dollars, and is designed to be deeply integrated across wallets, apps, and on-chain financial services.

#### 1.2 Basic Relationship with $NEX

- **$NEX** — native gas token on Nexus Mainnet.
- **$USDX** — native stablecoin of the Nexus ecosystem.

These distinctions will be further developed as Nexus Mainnet approaches launch.

---

### 2. System Architecture

- The canonical USDX ERC-20 will exist on **Ethereum Mainnet**.
- Nexus must follow the M0 JMI deployment guide to deploy and configure the ERC-20:
  - [How to deploy and configure the JMI Extension](https://www.notion.so/How-to-deploy-and-configure-the-JMI-Extension-Nexus-Desired-Extension-2e767845c2f48109b0e0ec971a16e500?pvs=21)
  - Supporting context: [JMI Extension overview](https://www.notion.so/JMI-Just-Mint-It-Extension-2bc858df176a803790b2f7edacecdf06?pvs=21), [M0 Deployment Context Guide — Nexus Fork](https://www.notion.so/M0-Deployment-Context-Guide-for-All-Extensions-Nexus-Fork-2e867845c2f481419f9ac17102afa64d?pvs=21)
- Nexus must test deployment on Ethereum Sepolia before deploying to Mainnet, following the same guide.

---

### 3. Deposits

- Nexus must ensure Halliday has the correct ERC-20 token address to enable onramping directly to USDX on Ethereum Mainnet.
- The Halliday onramp widget, defaulting to USDX, must be integrated into NexusOS.
  - **Dependency: Fast-follow to core deployment requirements. Requires design and UX collaboration across teams.** ⏰

---

### 4. Bridging and Conversion

- Nexus must enable the JMI extension to facilitate **1:1 exchange of USDC/USDT for USDX** on Ethereum.
- Guide: [How to deploy and configure the JMI Extension](https://www.notion.so/How-to-deploy-and-configure-the-JMI-Extension-Nexus-Desired-Extension-2e767845c2f48109b0e0ec971a16e500?pvs=21)

---

### 5. Yield and Revenue

- USDX backing assets generate baseline yield from T-bills via M0.
- Yield accrues at the protocol level and is paid directly to the **Nexus Foundation** — not to end users.
  - **Dependency: Provide Foundation custody address to M0.** ⏰
- Yield is owned by the protocol and allocated toward:
  - Protocol revenue.
  - Developer ecosystem incentives.

---

## 5. Non-Functional Requirements

- **NFR-001 [Compliance]:** Native minting of USDX must be restricted to KYC'd entities. Initially, only the Nexus Foundation may mint. This must be configurable.
- **NFR-002 [Compliance]:** Ensure PSM is set up with M0's infrastructure: USDX pre-minted and distributed among KYC'd entities (Nexus Foundation initially).
- **NFR-003 [Deadline]:** USDX must be deployed on Ethereum Mainnet before the M0 submission deadline.

### Performance Requirements

| Requirement | Metric | Target | Percentile | Conditions |
|-------------|--------|--------|------------|------------|
| Deployment deadline | Live on Ethereum Mainnet | Before Feb 3, 2026 | — | M0 submission window opens Jan 19 |
| Conversion | USDC/USDT → USDX | 1:1, no slippage | — | Via JMI extension |
| Yield routing | Yield delivery to Foundation | Per M0 accrual schedule | — | Automatic via M0 infrastructure |

---

## 6. Acceptance Requirements

### 6a. Functional Acceptance

- [ ] **AC-001:** USDX ERC-20 successfully deployed on Ethereum Sepolia via M0 JMI guide.
- [ ] **AC-002:** USDX ERC-20 successfully deployed on Ethereum Mainnet before February 3rd, 2026.
- [ ] **AC-003:** JMI extension live and validated: 1 USDC → 1 USDX and 1 USDT → 1 USDX.
- [ ] **AC-004:** Yield is routing to Nexus Foundation custody address.
- [ ] **AC-005:** Halliday has correct USDX ERC-20 address and onramp widget is live in NexusOS.

### 6b. Non-Functional Acceptance

- [ ] **AC-NFR-001:** Minting is restricted to KYC'd entities; unauthorized mint attempts rejected.
- [ ] **AC-NFR-002:** PSM configured with M0; USDX pre-minted for Foundation distribution.
- [ ] **AC-NFR-003:** Deployment confirmed on Mainnet before M0 final deadline (Feb 3, 2026, 8am).

### 6c. Documentation Acceptance

- [ ] **AC-DOC-001:** PRODUCT_MAP.md updated to reflect `Shipped` status.
- [ ] **AC-DOC-002:** USDX contract address published in Nexus docs.
- [ ] **AC-DOC-003:** CLAUDE.md updated if any invariants changed.

### 6d. Definition of Done

All AC items above are checked AND:
- [ ] USDX contract address confirmed and communicated to Halliday and bridge partners.
- [ ] Foundation custody address registered with M0 for yield routing.
- [ ] Spec status updated to `Shipped` in this file.

---

## 7. Open Questions

- [ ] **OQ-001** — Foundation custody address for M0 yield routing — Owner: @Daniel Marin — Resolve by: before Mainnet deployment
- [ ] **OQ-002** — Halliday onramp design and UX — Owner: [@alecjames-dot](https://github.com/alecjames-dot) — Resolve by: fast-follow to core deployment
- [ ] **OQ-003** — Gordon (@Gordon Mattey) Product sign-off pending — Owner: [@alecjames-dot](https://github.com/alecjames-dot) — Resolve by: before APPROVED
- [ ] **OQ-004** — Legal sign-off (Roza, Lisa) — Owner: [@alecjames-dot](https://github.com/alecjames-dot) — Resolve by: before APPROVED
- [ ] **OQ-005** — Security sign-off (Ben) — Owner: [@alecjames-dot](https://github.com/alecjames-dot) — Resolve by: before APPROVED
- [ ] **OQ-006** — BD sign-off (Alex Fowler) — Owner: [@alecjames-dot](https://github.com/alecjames-dot) — Resolve by: before APPROVED

---

## 8. Success Metrics

| Metric | Target | Measurement Method |
|--------|--------|--------------------|
| Deployment deadline met | On Mainnet before Feb 3, 2026 | Deployment timestamp |
| USDX supply at launch | TBD | On-chain total supply |
| Yield routing accuracy | 100% of yield to Foundation address | M0 yield dashboard |
| JMI conversion success rate | ≥ 99.9% | On-chain transaction tracking |
| Onramp widget activation | Live in NexusOS within 2 weeks of Mainnet deployment | Product QA sign-off |

---

## 9. Sign-off

| Team | Reviewer | Status | Date |
|------|----------|--------|------|
| Product | @Daniel Marin | Approved ✅ | January 9, 2026 |
| Product | @Gordon Mattey | Pending ⏰ | — |
| Engineering | @Stanley Jones | Approved ✅ | January 13, 2026 |
| Engineering | @Alex "Sasha" Potashnik | Pending ⏰ | — |
| Marketing | @Lauren Dresnick | Approved ✅ | January 9, 2026 |
| Marketing | @Daniel McGlynn | Approved ✅ | January 9, 2026 |
| Legal | @Roza Nader, @Lisa Haugh | Pending ⏰ | — |
| Security | @Ben Speckien | Pending ⏰ | — |
| BD | @Alex Fowler | Pending ⏰ | — |

---

## 10. Changelog

| Date | Author | Change |
|------|--------|--------|
| 2026-03-04 | [@alecjames-dot](https://github.com/alecjames-dot) | V1 spec migrated into SPEC.md template |
| 2026-01-13 | @Stanley Jones | Engineering sign-off |
| 2026-01-09 | @Daniel Marin, @Lauren Dresnick, @Daniel McGlynn | Product and Marketing sign-off |

---

## Appendix

### Legal Risks Surfaced

*(To be populated.)*

### Daniel's Strategic Notes

- **Core goals for USDX:**
  - Powerful value flywheels — drive value across the Trifecta (L1 + DEX + Compute).
  - Signalling for ICO and TGE.
  - Avoid value leakage to third-party stablecoins.
  - Revenue via large AUM.
  - Native unit of account (quote asset).
- **Nice to have:**
  - Required staking asset to participate in the Compute Network.
  - Paying gas with USDX (medium-term; non-trivial engineering).
- **Future: sUSDX (staked USDX)**
  - Two assets: yield-bearing (staked) and non-yield-bearing.
    - *Compliance consideration: these cannot be combined.*
    - *Open question: how does sUSDX work within the orderbook if it is not a standard ERC-20?*
  - sUSDX holders could earn: Treasury yield + DEX-derived yield + Liquidity incentives.
- **Minting strategy:** Very few entities have minting capabilities. Consider strategy to distribute USDX across DEXes and ecosystems — M0 facilitates this.
- **Opportunities:** Partnerships with existing protocols (Pendle, Aave, etc.). M0 service agreement includes liquidity provisioning on a few DEXes.
- **Reference:** Jupiter's native stablecoin with Ethena.

### Future Architecture — Dual-Layer USDX Model (DEX Integration)

*This section describes the target architecture for USDX within the Nexus DEX orderbook. It is out of scope for V1 but documented here for future reference.*

- USDX must exist in 2 tightly coupled layers:

**L1 Layer: ERC-20 USDX**
- Used for: custody, deposits, withdrawals.
- Transferable.

**Execution Client / Orderbook: USDX Ledger**
- Used for: margin accounting, position PnL, risk checks, settlement.
- Ledger states (beyond vanilla ERC-20):
  - `free_balance`
  - `initial_margin_locked`
  - `maintenance_margin_locked`
  - `unrealized_pnl`
  - `liquidation_reserved`
  - `protocol_encumbered` (fees, funding, etc.)

**Deposit flow:** User deposits ERC-20 USDX → locked on L1 → credited in execution ledger. Deposit finality required before trading eligibility.

**Withdrawal flow:** User requests withdrawal → execution client verifies no open positions or all margin requirements satisfied → ledger balance reduced → ERC-20 USDX released.

**Market structure:** Every perpetual market quoted as `BASE/USDX`. USDX is the exclusive settlement asset for trade PnL, funding payments, and liquidations.

**NFR targets for dual-layer model:**
- Deterministic accounting between L1 and execution ledger.
- No asset desync between ERC-20 and ledger state.
- Auditable USDX supply vs. backing.
- Graceful handling of issuer or oracle downtime.
