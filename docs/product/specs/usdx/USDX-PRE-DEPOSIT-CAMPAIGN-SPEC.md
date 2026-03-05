# USDX Pre-Deposit Campaign Spec

**Status:** DEPRECATED
**Owner:** @Gordon Mattey
**Last Updated:** 2026-03-05
**Approved by (Product):** —
**Approved by (Engineering):** —
**Linear:** —
**Figma:** —
**Related Research:** —
**Related Specs:** —

**Relevant Docs:**
- [USDX Pre-Deposit Campaign Project Plan](https://www.notion.so/USDX-Pre-Deposit-Campaign-Project-Plan-2fd67845c2f480169a21df24366c2e68?pvs=21)
- [PRD Draft: USDX Pre-Deposit Campaign (Ethereum → Nexus) v2.0](https://www.notion.so/PRD-Draft-USDX-Pre-Deposit-Campaign-Ethereum-Nexus-v2-0-2ed67845c2f48092834fcb2620add8d4?pvs=21)
- [[ARCHIVE] USDX Onboarding and Pre-Deposit Campaign (Mini PRD)](https://www.notion.so/ARCHIVE-USDX-Onboarding-and-Pre-Deposit-Campaign-2fc67845c2f480889f4fea22074807c3?pvs=21)

---

## Cross-Team Consultation

| Team | Consulted | Ack and Signed Off |
|------|-----------|--------------------|
| Product | Daniel (@Daniel Marin), [@alecjames-dot](https://github.com/alecjames-dot) | ⏰ |
| Engineering | Stanley (@Stanley Jones), Sasha (@Alex "Sasha" Potashnik) | ⏰ |
| Marketing | Lauren (@Lauren Dresnick), @Daniel McGlynn | ⏰ |
| Legal | Lisa (@Lisa Haugh) | ⏰ |
| Security | Ben (@Ben Speckien) | ⏰ |
| BD | @Steve Yu | ⏰ |
| Capital Formation | Benjamin | ⏰ |

**Signoff Dates:**

1. Mini PRD
   1. Discussion: Wed January 21st ✅
   2. Signoff: Tuesday January 27th ⏰
2. Full PRD
   1. —

---

## 1. Strategic Context

### 1.1 OKR Alignment

**OKR #1 — Fund the Company**

- Establish USDX as a credible, liquid, institutionally custodied stablecoin
- Accumulate meaningful USDX TVL on Ethereum in a transparent and auditable manner
- Create a strong liquidity and treasury foundation to support Nexus' operational runway

**OKR #2 — Launch and Scale Nexus Mainnet**

- Pre-position USDX liquidity for day-one mainnet usage
- Enable a clean, deterministic transition of USDX liquidity from Ethereum to Nexus
- Minimize user friction, operational risk, and accounting ambiguity at mainnet launch
- Provide a stable base for the activation of the Global Yield System

### 1.2 Product Goals

- Provide ICO investors with a benefit for ICO participation and establish continuity from the ICO
- Generate revenue, mindshare, and future opportunities with the launch of USDX and active TVL
- Bootstrap initial TVL for Nexus Mainnet

### 1.3 Investment Case

**Cost of Delay**

- **Revenue:** $35k per day
  - Revenue is $3.22M at average TVL = $575M over 3 months
    - TVL Deposits: $1.0B stablecoin
    - Yield on backing: 3% APR (T-Bills), accruing linearly (simple interest)
  - Holding profile:
    - Months 1–2: $1.0B constant TVL
    - Month 3: TVL decays by 85% over the month, ending at $150M (linear decay, average TVL = $575M)
- **Strategic Risk:** Threatens realization of the Trifecta narrative if not executed or poorly executed

**Effort Cost (High Level)**

- Engineering: 6.5–10 person-weeks ($30–50k)
- Product: 6 person-weeks ($30k)

---

## 2. Scope

### 2.1 In Scope

- Permissionless USDX creation through M0 Foundation governance using the M0 issuer (solver) network
- Permissionless USDX pre-deposit participation
- Time-weighted accounting of locked USDX balances during campaign
- Locked finalization and deterministic settlement
- Foundation-operated bridging of USDX to Nexus Mainnet
- User crediting and claiming of USDX on Nexus
- User claiming of NEX rewards on Ethereum at TGE
- ICO #1 participation verification as informational/priority flag
- Institutional custody of all Nexus-controlled assets
- Public leaderboard and campaign transparency

### 2.2 Explicit Non-Goals

- User-initiated bridging
- Onchain permissioning, allowlists, or KYC gating
- Transferable receipt tokens or IOUs
- DeFi composability during the campaign
- Onchain incentive computation
- Gamification mechanics
- Post-mainnet USDX dashboard (covered in Rewards System specs)

---

## 3. Key Parameters

| Parameter | Value |
|-----------|-------|
| USDX acquisition | Through M0 Foundation issuer (solver) network |
| Pre-deposit participation | Permissionless |
| Deposit asset | USDX (Ethereum) |
| Campaign USDX TVL cap | Hard cap, enforced onchain: $1B USDX |
| Scoring basis | Time-weighted deposited USDX |
| Snapshot frequency | Hourly |
| Incentive pool | Time-weighted deposited USDX, capped retroactively at each user's final vault balance at LOCK activation |
| Incentive unlock | Fully unlocked at TGE |
| Reward eligibility | Non-zero balance retained through LOCKED state (no minimum threshold) |
| Bridging | Foundation-operated, aggregate. No user-initiated bridging required. |
| Custody | Foundation-owned smart contract → Anchorage custody |
| Jurisdiction restrictions | OFAC Sanctioned Countries, United States. Additional jurisdictions pending legal review (offshore issuer framework may require broader restrictions). |

---

## 4. User Flow Overview

| # | Phase | Dates | Description |
|---|-------|-------|-------------|
| 1 | **Create USDX** | Mon Apr 20 | Create USDC/USDT with USDX on Ethereum |
| 2 | **Deposit USDX** | Mon Apr 20 | Deposit into campaign vault during ACTIVE window |
| 3 | **Campaign Closes** | Sun May 3 | Deposits/withdrawals disabled, accounting finalized |
| 4 | **Migration to Mainnet** | Mon May 4 – Sun May 10 | Nexus bridges USDX in the vault to Nexus Mainnet (no user action) |
| 5 | **Withdraw USDX** | On Mainnet Launch | Withdraw USDX on Nexus Mainnet |
| 6 | **Claim NEX** | On Mainnet Launch | Claim NEX rewards on Nexus at TGE |

---

## 5. Requirements by Phase

### Phase 1: Create USDX

Create USDX with USDC/USDT on Ethereum.

#### Requirements

| Requirement | Priority |
|-------------|----------|
| Host create interface at `usdx.nexus.xyz` | P0 |
| Support USDC → USDX swap via M0 PSM | P0 |
| Support USDT → USDX swap via M0 PSM | P0 |
| Integrate Halliday widget for fiat/CEX onramp | P0 |
| Wallet connection (Dynamic) | P0 |
| Navigation: USDX tab and Predeposit tab | P0 |
| Display "No swap fee" explicitly | P1 |
| Max button for input amount | P1 |
| Optional email opt-in for USDX product updates (double opt-in) | P1 |
| Privacy-compliant email collection with explicit consent checkbox (unchecked by default) | P0 |
| Campaign promotion banner/CTA on USDX create page linking to pre-deposit campaign while ACTIVE or LOCKED | P1 |
| Remove or replace campaign promotion after campaign concludes | P1 |

#### Technical Notes

Frontend for USDX swaps via M0 provided smart contract on Ethereum (the M0 PSM).

#### Design Notes

- Title: "Nexus U.S. Dollar"
- Description: "USDX is the canonical dollar of the Nexus ecosystem. Create USDC or USDT with USDX"
- Primary CTA: "Create USDX"
- Input asset selector with USDC/USDT toggle (default: USDC)
- Output preview showing USDX amount = input amount
- Secondary CTA: "Don't have USDC or USDT?" with Halliday widget below
- [Halliday designs (Figma)](https://www.figma.com/design/rsDmEhN4kzyq3lPHF7juQt/Halliday-Payments-2.0-%E2%80%A2-Nexus?node-id=0-1&p=f&t=yNvetYUNoc44n52W-0)

#### Dependencies

- M0 JMI contract address and ABI (uses M0 PSM under the hood)
- USDX contract address and ABI
- Halliday integration for fiat/CEX onramp
- Dynamic for wallet connection

---

### Phase 2: Deposit USDX

Deposit USDX into campaign vault during ACTIVE window.

#### Requirements

**Vault Contract (Ethereum):**

| Requirement | Priority |
|-------------|----------|
| Accept only USDX deposits | P0 |
| Enforce $1B hard cap onchain (revert on exceed) | P0 |
| Support `deposit()` during ACTIVE phase | P0 |
| Support `withdraw()` during ACTIVE phase | P0 |
| Revert deposit/withdraw during LOCKED phase | P0 |
| Manual phase transition by contract owner (ACTIVE → LOCKED) | P0 |
| Emit events for: deposits, withdrawals, phase transitions | P0 |
| Read methods: `currentPhase`, `totalDeposited`, `remainingCapacity`, `balanceOf(wallet)` | P0 |
| Emergency pause mechanism | P1 |

**Backend Accounting:**

| Requirement | Priority |
|-------------|----------|
| Index all vault contract events | P0 |
| Compute hourly snapshots of per-wallet balances | P0 |
| Compute time-weighted score with hourly snapshots | P0 |
| Withdrawals retroactively cap all prior snapshots at user's final balance at LOCK activation | P0 |
| API endpoints for frontend: user score, global TVL, leaderboard | P0 |
| Retain archival record: hourly snapshots, contract event history | P1 |

**Campaign Dashboard UI:**

| Requirement | Priority |
|-------------|----------|
| Display campaign phase (ACTIVE/LOCKED badge) | P0 |
| Display global TVL and remaining capacity vs $1B cap (progress bar) | P0 |
| Display user's deposited USDX balance | P0 |
| Display user's time-weighted score (live during ACTIVE, finalized after LOCKED) | P0 |
| Deposit USDX input with Max button | P0 |
| Withdraw USDX input with Max button | P0 |
| Disable deposit/withdraw CTAs when LOCKED or cap reached | P0 |
| ICO #1 participation indicator upon wallet connect | P1 |
| Leaderboard: rank, wallet (abbreviated), time-weighted score | P1 |
| "Learn more" link to USDX blog | P2 |
| Optional email opt-in for campaign updates (double opt-in, separate consent from USDX product emails) | P1 |
| Social share button for deposit participation (e.g. "I deposited to the USDX Pre-Deposit Campaign") | P1 |
| Share content must include campaign URL and user's anonymized rank or deposit milestone | P1 |
| Support share to X (Twitter) at minimum, Discord as stretch | P2 |

#### Technical Notes

Smart contract for deposits, backend accounting system, campaign dashboard at `usdx.nexus.xyz/predeposit`.

**Contract Events (must enable deterministic reconstruction):**

- `Deposited(address indexed user, uint256 amount, uint256 timestamp)`
- `Withdrawn(address indexed user, uint256 amount, uint256 timestamp)`
- `PhaseTransitioned(Phase previousPhase, Phase newPhase, uint256 timestamp)`

**Time-Weighted Score Formula:**

```
TW_i = Σ_k min(B_i(t_k), F_i)
```

Where:
- `B_i(t_k)` = deposited USDX balance of user `i` at snapshot time `t_k`
- `F_i` = vault balance of user `i` at the moment LOCK phase activates
- Snapshots occur every hour during ACTIVE window

At finalization, each snapshot's credited balance is capped at the user's balance when LOCK activates. A user who held $1M for two weeks but withdrew to $100K before LOCK is scored as if they held $100K for the entire ACTIVE period.

**Gaming Analysis:** A depositor could cycle large deposits in and out during ACTIVE phase to inflate individual snapshot balances. The `min(balance, final_balance)` formula ensures cyclists always earn less than an honest depositor who held the same final amount continuously. A cyclist-depositor could temporarily inflate visible TVL and leaderboard position during ACTIVE phase without committing capital through LOCK, but this has no effect on their actual reward score.

#### Design Notes

- Campaign Hero: title "USDX Pre-Deposit Campaign", descriptor TBD, phase indicator badge
- User Deposit Panel: primary CTA "Deposit USDX", secondary CTA "Withdraw USDX", disabled states when appropriate
- Campaign Metrics: Total USDX TVL, remaining capacity vs $1B cap (visual progress bar), campaign phase
- User Status: deposited USDX balance, time-weighted score, withdrawal availability
- Leaderboard: sorted by time-weighted score; columns: Rank, Wallet (`0x1234…abcd`), Score; design intent: neutral, ledger-like, protocol-grade

#### Dependencies

- Campaign descriptor copy for hero section
- USDX blog post for "Learn more" link
- Phase badge visuals, ICO participation indicator
- API endpoints for user data, leaderboard
- Contract audit

---

### Phase 3: Campaign Closes

Deposits and withdrawals disabled, accounting finalized.

#### Requirements

| Requirement | Priority |
|-------------|----------|
| At LOCKED start: freeze inputs, finalize scores, produce canonical ledger | P0 |
| Generate ledger commitment (merkle root or hash) | P0 |
| Final ledger includes: deposited USDX per wallet, time-weighted score per wallet | P0 |
| Retain archival record: final ledger, commitment | P0 |

#### Technical Notes

Manual contract owner call transitions from ACTIVE → LOCKED. Backend freezes accounting inputs and produces canonical ledger.

**Operational Trigger:** Manual contract call by Engineering with Product approval.

**Output Artifacts:**
- Canonical ledger of final deposited USDX per wallet
- Canonical ledger of final time-weighted score per wallet
- Merkle root commitment for NEX claims
- Merkle root commitment for USDX claims

---

### Phase 4: Migration to Nexus Mainnet

Nexus bridges USDX to Nexus Mainnet (no user action required).

#### Requirements

| Requirement | Priority |
|-------------|----------|
| Foundation bridges USDX in aggregate after LOCKED finalization | P0 |
| Reconcile bridged amounts with Anchorage custody balances | P0 |
| Reconcile bridged amounts with finalized deposited USDX ledger totals | P0 |
| Produce internal settlement report | P0 |
| Block bridging unless LOCKED finalization complete and ledger commitment generated | P0 |

#### Technical Notes

Foundation-operated bridging via LayerZero. Users do not bridge USDX themselves.

**Settlement Report Must Include:**
- Total deposited USDX (ledger)
- Total USDX bridged
- Custody balances pre/post
- Discrepancies (must be zero or explained as P0 incident)

**Operational Trigger:** Foundation initiates after LOCKED finalization and custody reconciliation prerequisites are met.

#### Dependencies

- LayerZero support for USDX bridging to Nexus Mainnet
- USDX on L1 EVM Mainnet (see [USDX PRD v2](https://www.notion.so/Scheduling-USDX-PRD-v2-2cb67845c2f48100aa2bdb77b9e7c938?pvs=21))

---

### Phase 5: Claim NEX

Claim NEX rewards on Nexus at TGE.

#### Requirements

**NEX Claims Contract (Ethereum):**

| Requirement | Priority |
|-------------|----------|
| Receive NEX allocation from Nexus Foundation | P0 |
| Store merkle root of eligible allocations | P0 |
| `claim()` function with merkle proof verification | P0 |
| Prevent double-claims (idempotent) | P0 |
| Emit `Claimed(address user, uint256 amount)` event | P0 |
| Read methods: `hasClaimed(wallet)`, `allocation(wallet)` | P0 |

**NEX Claiming UI:**

| Requirement | Priority |
|-------------|----------|
| Display allocated NEX amount upon wallet connect | P0 |
| Display claim status: Pre-TGE / Claimable / Claimed / Not Eligible | P0 |
| Claim CTA (disabled pre-TGE and post-claim) | P0 |
| Success confirmation with amount and tx hash | P0 |
| Already-claimed state shows amount and tx hash | P1 |

#### Technical Notes

Smart contract on Ethereum for NEX distribution, integrated into `usdx.nexus.xyz/predeposit` as an additional section.

#### Design Notes

- **Pre-TGE State:** "Claim Available at TGE"
- **Eligible State (Post-TGE):** CTA "Claim $NEX" → confirmation "Successfully claimed [X] $NEX"
- **Already-Claimed State:** "Already Claimed" — display amount claimed and transaction hash; CTA disabled
- **Non-Eligible State:** "This wallet does not have an eligible $NEX allocation from the USDX Pre-Deposit Campaign."

#### Dependencies

- NEX allocation transferred to claims contract
- Merkle tree generated from finalized ledger

---

### Phase 6: Withdraw USDX

Withdraw USDX on Nexus Mainnet.

#### Requirements

**USDX Withdrawal Contract (Nexus Mainnet):**

| Requirement | Priority |
|-------------|----------|
| Hold bridged USDX from Foundation | P0 |
| Store merkle root of eligible balances (from Ethereum ledger) | P0 |
| `claim()` function with merkle proof and wallet signature | P0 |
| Prevent double-withdrawal (idempotent) | P0 |
| Release USDX to user upon successful withdrawal | P0 |
| Emit `Claimed(address user, uint256 amount)` event | P0 |
| Read methods: `hasClaimed(wallet)`, `creditedAmount(wallet)`, `claimStatus(wallet)` | P0 |

**USDX Claiming UI:**

| Requirement | Priority |
|-------------|----------|
| Display withdrawal status: Bridging In Progress / Withdrawable / Withdrawn | P0 |
| Display credited USDX amount | P0 |
| Withdraw CTA (disabled during bridging) | P0 |
| Network switch prompt if user on wrong network | P0 |
| Success confirmation with amount | P0 |

#### Technical Notes

Smart contract on Nexus Mainnet for USDX distribution, integrated into `usdx.nexus.xyz/predeposit` as a state-dependent section.

#### Design Notes

- **Bridging In Progress:** "Your USDX is being bridged to Nexus Mainnet. You can withdraw once this is complete."
- **Withdrawable:** "Your USDX is ready to withdraw." — CTA: "Withdraw USDX on Nexus"
- **Withdrawn:** Display amount claimed and transaction hash.

#### Dependencies

- Bridging operation complete
- Merkle root deployed to Nexus contract

---

## 6. Non-Functional Requirements

| Requirement | Category | Priority |
|-------------|----------|----------|
| All smart contracts audited before mainnet deployment | Security | P0 |
| Emergency pause mechanism on all contracts | Security | P0 |
| Custody via Anchorage for all Nexus-controlled assets | Security | P0 |
| OFAC/jurisdiction blocking enforced at site level | Compliance | P0 |
| Deterministic accounting (fully reproducible from contract events) | Data Integrity | P0 |
| Ledger commitment (merkle root) generated at LOCKED finalization | Data Integrity | P0 |
| Bridging reconciliation with zero discrepancies | Data Integrity | P0 |
| Archival record retained (snapshots, ledger, event history) | Data Integrity | P1 |
| Dashboard data refresh ≤ 1 hour | Performance | P1 |
| API endpoints for user score, TVL, leaderboard | Performance | P0 |
| Concurrent users — TBD | Performance | P0 |

---

## 7. Marketing & Acquisition

This campaign serves two distinct audiences with separate acquisition paths:

- **USDX product users** (`usdx.nexus.xyz`) — stablecoin users adopting USDX for its own utility. Relationship is permanent and product-driven. Marketing focus is USDX adoption broadly.
- **Campaign participants** (`earn.nexus.xyz`) — reward seekers, ICO participants, and Nexus community members. Relationship is time-bounded but converts to long-term ecosystem participation. Marketing focus is campaign conversion and community activation.

### 7.1 List Building

| Requirement | Priority |
|-------------|----------|
| Email opt-in on USDX product page and campaign page must be separate consent events | P0 |
| All marketing emails must include unsubscribe link and track opt-out status | P0 |
| Email collection must comply with GDPR requirements | P0 |
| Wallet address captured on deposit serves as primary campaign identifier | P0 |

### 7.2 Community & Social

| Requirement | Priority |
|-------------|----------|
| Snag quest integration for campaign mechanics ("Road to a Billion" or similar) | P1 |
| Optional Discord account linking for campaign participants | P2 |
| Optional X (Twitter) account linking for campaign participants | P2 |

### 7.3 Paid Acquisition

| Requirement | Priority |
|-------------|----------|
| Campaign landing page must support UTM tracking for paid acquisition attribution | P1 |
| Conversion tracking from ad click to deposit completion | P1 |
| Paid advertising budget and channels owned by Marketing (not product scope) | — |

**Notes:**
- USDX marketing is less legally restricted than ICO marketing. Paid spend ROI potentially justifies significant budget (McGlynn, stakeholder review Feb 10).
- Social sharing has never been built at Nexus before — needs design scoping.
- Snag integration scope TBD pending Lauren's input on quest mechanics.

---

## Appendix A: Incentive Pool Separation

| Incentive Pool | Size | Purpose |
|----------------|------|---------|
| Genesis Airdrop | 2.5% of NEX supply | Broad initial distribution |
| Genesis Incentives | 2.5% of NEX supply | Mainnet liquidity & usage incentives post-launch |
| USDX Pre-Deposit Campaign | 2.5% of NEX supply | Reward early USDX liquidity provisioning |

The USDX Pre-Deposit Campaign incentive pool is **separate** and does not draw from Genesis Airdrop or Genesis Incentives pools.

**Participant Incentive Mechanics:** Depositors receive NEX tokens proportional to their time-weighted share of campaign TVL.

| Incentive Pool | Distribution Basis |
|----------------|-------------------|
| 2.5% of total NEX supply | Pro-rata by time-weighted USDX deposited |

*Example:* If you contribute 1% of total time-weighted TVL, you receive 0.025% of NEX supply.

**Speculative Dollar Value of Rewards (at various FDVs):**

| NEX FDV | Value of 2.5% Pool | Value of 0.025% (1% TVL share) |
|---------|--------------------|--------------------------------|
| $1B | $25M | $250K |
| $2B | $50M | $500K |
| $3B | $75M | $750K |

*Note: Dollar values are illustrative only. Actual value depends on NEX market price at and after TGE.*

---

## Appendix B: Marketing & Acquisition Requirements Changelog

### Feb 12, 2026 — Marketing & Acquisition Requirements

**Source:** Stakeholder review (Feb 10) feedback from Lauren, McGlynn, Gordon.

**Phase 1 (Create USDX) — 4 rows added:**
- Optional email opt-in for USDX product updates (double opt-in) — P1
- Privacy-compliant email collection with explicit consent checkbox (unchecked by default) — P0
- Campaign promotion banner/CTA on USDX create page linking to pre-deposit campaign while ACTIVE or LOCKED — P1
- Remove or replace campaign promotion after campaign concludes — P1

**Phase 2 (Campaign Dashboard UI) — 4 rows added:**
- Optional email opt-in for campaign updates (double opt-in, separate consent from USDX product emails) — P1
- Social share button for deposit participation — P1
- Share content must include campaign URL and user's anonymized rank or deposit milestone — P1
- Support share to X (Twitter) at minimum, Discord as stretch — P2

**New Section 7: Marketing & Acquisition added:**
- Frames two distinct audiences: USDX product users vs campaign participants
- 7.1 List Building: separate consent events, GDPR compliance, unsubscribe requirements
- 7.2 Community & Social: Snag quest integration (P1), optional Discord and X linking (P2)
- 7.3 Paid Acquisition: UTM tracking, conversion tracking (P1)

**Engineering impact:** Email opt-in requires form + storage + double opt-in flow. Social sharing requires new component (never built before). Snag integration TBD on scope. UTM/conversion tracking is lightweight. Campaign banner on USDX page requires conditional display logic tied to campaign phase.

**Section 3 Key Parameters updated:** Jurisdiction restrictions updated to include United States alongside OFAC, with note on pending legal review for additional jurisdictions.

**BD/partnerships dependencies moved to Project Plan** — see [USDX Pre-Deposit Campaign Project Plan](https://www.notion.so/USDX-Pre-Deposit-Campaign-Project-Plan-2fd67845c2f480169a21df24366c2e68?pvs=21) for dependency tracking, risks, and open questions.
