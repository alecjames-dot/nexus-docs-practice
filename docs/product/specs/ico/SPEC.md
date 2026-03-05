# Nexus Genesis ICO Spec

**Status:** DRAFT
**Owner:** @gordon
**Last Updated:** 2026-01-11
**Version:** 1.0
**Approved by (Product):** —
**Approved by (Engineering):** —
**Linear:** —
**Figma:** [Nexus ICO Design](https://www.figma.com/design/rSPlYjT94bXbsEbYHopj7o/Nexus-ICO?node-id=1-227&t=Cn3A2Kz6JxZxC6pf-0)
**Related Research:** —
**Related Specs:** [Nexus ICO — Project Plan](https://www.notion.so/Nexus-ICO-Project-Plan-2ce67845c2f480a296d5c07c690740ae?pvs=21) | [USDX V2 Spec](../../usdx/USDX-V2-SPEC.md)

---

## 1. Context

### Investment Case

The Nexus Genesis ICO raises **$30M** at a **$300M FDV** by distributing 10% of NEX tokens at a fixed price of **$0.00000300 per NEX**. The ICO establishes valuation clarity ahead of Nexus Mainnet launch, converts early compute network contributors into token holders, and accelerates USDX adoption by offering ICO participants preferred access to USDX incentives.

**Investor thesis — The Trifecta:** Nexus is the first blockchain to unify crypto's three most profitable verticals from inception:

| Vertical | Revenue Mechanism |
|----------|------------------|
| **Layer-1 Blockchain** | Blockspace demand, compute fees, MEV, staking economics |
| **Perpetuals Exchange** | Trading fees and funding-rate spreads (highest-revenue business in crypto) |
| **Stablecoin (USDX)** | Float yield and global monetary flows |

Each vertical alone has produced multi-billion-dollar outcomes. The Trifecta flywheel: Exchange → L1 (trading drives blockspace demand); Stablecoin → Exchange (USDX as margin deepens liquidity); L1 → Exchange & Stablecoin (latency and throughput advantages improve spreads and institutional participation).

### Opportunity Cost

Delay to the ICO delays capital formation, community distribution, and ecosystem activation. The registration window for institutional investors opens **March 10, 2026** — slipping this date compresses the KYB timeline and risks missing the market window ahead of Nexus Mainnet.

### Effort

**Engineering deadline:** Feature complete and tested by **February 20, 2026** (1 week before institutional pre-registration opens).

| Area | Estimate |
|------|---------|
| Sonar (Echo) integration | TBD |
| Smart contract mainnet deployment | TBD |
| Admin dashboard | TBD |
| ICO site (`ico.nexus.xyz`) | TBD |

---

## 2. Goals & Non-Goals

**Goals:**
1. **Capital Formation** — Raise $30M to fund protocol development, exchange launch, and ecosystem growth.
2. **Valuation Clarity** — Fixed, pre-announced FDV ($300M) with no dynamic price discovery.
3. **Community Distribution** — Distribute NEX tokens to a broad, global participant base aligned with the Nexus mission.
4. **Ecosystem Activation** — Convert existing compute network participants and testnet users into token holders via priority allocation weighting.
5. **Stablecoin Adoption** — Accelerate USDX traction by offering ICO participants preferred access to USDX incentives.
6. **Compliance** — Exclusion of all restricted jurisdictions per the Nexus jurisdiction list.

**Non-Goals:**
- Dynamic price discovery (fixed-price only; no auction mechanics).
- Post-sale token vesting for ICO participants (100% unlock at TGE).
- Token transfer to Ethereum or Nexus L1 EVM wallet at distribution (deferred).
- Post-sale onboarding flows (deferred).

---

## 3. Summary of Features

| Feature | Description |
|---------|-------------|
| Sale information page | Public landing at `ico.nexus.xyz` — sale facts, timeline, FAQ, terms, MiCA disclaimer |
| Identity verification (FR2) | KYC/KYB via Sonar (Echo); geo-screening; wallet connection via Dynamic |
| USDT deposit (FR3) | Fixed-price USDT deposit on Base; real-time global and personal stats |
| Allocation calculation (FR4) | Pro-rata or priority-weighted allocation; admin CSV download and upload |
| Preview allocation + withdrawal (FR4b) | View allocation, refundable amount; withdraw unallocated USDT |
| Token distribution (FR5) | Automatic distribution to wallets; MiCA 14-day refund window for EU participants |
| ICO final report (FR6) | Post-sale report: total funds, oversubscription ratio, participant/geographic distribution |
| Admin dashboard (FR7) | Real-time sale stats, funnel metrics, state transition management with audit trail |
| Terms and privacy policy (FR8) | Terms of Sale, T&Cs, Privacy Policy pages |

---

## 4. Functional Requirements

### Sale Parameters

| Parameter | Value |
|-----------|-------|
| Sale type | Fixed-price token sale |
| Platform | Sonar (Echo by Coinbase) |
| Network | Base mainnet |
| Sale duration | 120 hours (subscription period) |
| Target raise | $30,000,000 |
| FDV | $300,000,000 (fixed) |
| Allocation | 10% of total NEX supply |
| Total NEX supply | 100T |
| Token price | $0.00000300 per NEX |
| Accepted assets | USDT (ERC-20 on Base) |
| Minimum contribution | $10 USDT |
| Per-wallet allocation cap | $5,000,000 USDT |
| Per-wallet deposit cap | $100,000,000 USDT |
| Tick size | 0.0001 USDT |
| Unlock | 100% at TGE for non-restricted participants |
| Jurisdictional exclusions | [Current exclusion list](https://docs.google.com/document/d/19hOfuB4--cRoQJxCnaZt9LPc4bR4zCd_pEs8nMLW1Bs/edit?usp=sharing) |
| Governance oversight | Nexus Foundation |
| Issuer entity | Nexus Sub (BVI) Limited — abides by laws of the British Virgin Islands |

**Oversubscription expansion (internal / non-public):** The Nexus Foundation reserves the right to increase total allocation up to 20% of total NEX supply at the same $300M FDV if the sale experiences material oversubscription. This cap is an internal guideline and must not be communicated externally.

---

### Timeline

| # | Phase | Duration | Dates | Description |
|---|-------|----------|-------|-------------|
| -1 | Public landing page (registration closed) | 7 days | Mar 3 – Mar 10 | Market education. No registration available. |
| 0 | Institutional pre-registration (private link) | 7 days | Mar 10 – Mar 17 | Extended KYB timeline for institutions. |
| 1 | Registration | 14 days | Mar 17 – Mar 31 | KYC/KYB, wallet verification, geo-screening. |
| 2 | Open deposits | 3 days | Mar 31 – Apr 3 | Submit fixed-price USDT deposits. |
| 3 | Allocation calculation | 7 days | Apr 3 – Apr 10 | Compute allocations; apply priority weighting if oversubscribed. |
| 4 | Allocation preview and withdrawal | 3 days | Apr 10 – Apr 13 | Withdraw max / unallocated USDT for refund. |
| 5a | Final allocation and result | 2 days | Apr 13 – Apr 15 | Final calculation; publish ICO Report. |
| 5b | MiCA refund window | 14 days | Apr 15 – Apr 29 | EU regulatory refund window. |
| 7 | Token distribution (TGE) / Mainnet | 1 day | ≥ May 25 (no earlier than 40 days after 5a per Reg-S flowback rule) | Distribute tokens to winners. |
| 6 | Post-sale rewards | TBD | Q2 2026 | Near-term incentives for participants (see USDX adoption objective). |

---

### User Segments

| Segment | Description | Special Considerations |
|---------|-------------|----------------------|
| Global Participants | KYC-verified users from permitted jurisdictions | Standard flow |
| Nexus Ecosystem Participants | Historical on-chain activity, compute network users, questers | Priority weighting in allocation if sale is oversubscribed |

---

### FR1: Sale Information (Phases 1–6)

**P0 — Must Have:**
- [ ] View sale materials: Sale Facts, How It Works, Sale Timeline, FAQ, Disclaimer (with MiCA paper link), Terms and Conditions, links to project docs (docs.nexus.xyz), and help for registration issues.
- [ ] Public landing page live before public registration opens. (See [Private Links for Early Access](https://www.notion.so/Private-Links-for-Early-Access-2e367845c2f48068a369f8d209ca2a84?pvs=21) for institutional access.)

**P1 — Should Have:**
- [ ] Mobile/responsive experience.

---

### FR2: Verify Identity (Phases 0 & 1)

**P0 — Must Have:**
- [ ] Register with Sonar KYC/KYB verification ([Sonar docs](https://docs.echo.xyz/)).
  - [ ] Checkbox for user to share Sonar email with Nexus for automated messages.
  - [ ] Customise verification requirements per [ICO Verification Requirements](https://www.notion.so/ICO-Verification-Requirements-2e867845c2f4800f807ddbbf1ac3f665?pvs=21).
- [ ] Connect purchasing wallet (must match a wallet registered with Sonar; up to 3 wallets).
- [ ] Connect Nexus wallet (optional).
- [ ] Wallet support: browser extension and mobile via Dynamic.
- [ ] Geo-screening for restricted jurisdictions (handled by Sonar).
- [ ] Registration status display.

**P1 — Should Have:**
- [ ] Progress indicator showing registration steps.
- [ ] Re-verification flow for failed KYC.

**P2 — Nice to Have:**
- [ ] Connect X, Discord, Telegram accounts.
- [ ] Multi-language support.
- [ ] Referral code entry for allocation priority boost.

---

### FR3: Deposit (Phase 2)

**P0 — Must Have:**
- [ ] Real-time deposit status display:
  - Global: Total committed, raise cap ($30M), oversubscription multiplier, ICO FDV ($300M).
  - Personal: Total deposited USDT and estimated NEX (subject to allocation).
- [ ] Deposit USDT on Base:
  - [ ] Minimum deposit: $10. Maximum deposit: $100,000,000. Tick size: 0.0001 USDT.
  - [ ] Fixed token price display ($0.00000300 per NEX). Estimated NEX shown.
- [ ] Accurate gas fee estimation display.
- [ ] Error handling for failed transactions and network congestion.

**P1 — Should Have:**
- [ ] Sign Terms of Sale: personalised consent text "I, [firstname lastname], agree…"
- [ ] Prompt to buy additional funds via Onramp (dedicated page/subdomain).

**P2 — Nice to Have:**
- [ ] On successful deposit: share referral code to boost allocation priority.
- [ ] Shareable participation card (downloadable PNG).
- [ ] Deposit history per user.

---

### FR4: Allocation Calculation (Phases 3 & 5)

**P0 — Must Have:**
- [ ] Download participant CSV (name, Sonar ID, registered email, payment wallet, deposits, withdrawals, Nexus wallet, Discord/X usernames).
- [ ] Calculate allocations (pro-rata or priority-weighted if oversubscribed). Reference: [Community Benefits Design](https://www.notion.so/Community-Benefits-Design-2cc67845c2f480f0ab3fe1d615d6e86c?pvs=21).
- [ ] Upload allocations CSV (initial and final).

---

### FR4b: Preview Allocation — Hold / Withdraw / Refund (Phases 4 & 6)

**P0 — Must Have:**
- [ ] Sale stats display.
- [ ] View per-user: total deposited, allocation, refundable amount, withdrawn amount.
- [ ] Withdraw deposit (minimum: unallocated amount; maximum: full deposit) — available only during first allocation preview. Final allocation: refund only, no re-allocation.

---

### FR5: Final Allocation and Distribution (Phase 6)

*Tokens are already minted. This phase distributes existing tokens to winners.*

**P0 — Must Have:**
- [ ] Automatic token distribution to wallets (no user action required).
- [ ] Display allocation amount.
- [ ] Users can still withdraw unallocated deposits.
- [ ] MiCA 14-day refund window for EU residents:
  - [ ] User emails `mica-refund@nexus.xyz`.
  - [ ] Auto-responder with link to withdrawal page.
  - [ ] User must be logged into Sonar, KYC'd, and have participated in the sale.
  - [ ] EU residents (as identified by Sonar) can withdraw full deposit.

**P2 — Nice to Have:**
- [ ] Manually send excess deposits to users who do not withdraw after 15 days.
- [ ] ~~Transfer tokens to Ethereum wallet.~~
- [ ] ~~Transfer tokens to Nexus L1 EVM wallet.~~
- [ ] ~~Add token to wallet (MetaMask, etc.).~~
- [ ] ~~Post-sale onboarding.~~

---

### FR6: Reporting (Phase 5)

**P0 — Must Have:**
- [ ] ICO Final Report: total funds deposited, oversubscription ratio, participant distribution, geographic distribution.

---

### FR7: Admin & Internal Tools

*Admin UI hosted separately from `ico.nexus.xyz`. Nexus operates contract transitions — not Sonar.*

**P0 — Must Have:**
- [ ] Admin dashboard — real-time monitoring:
  - [ ] Aggregate deposit stats (sum, count, average).
  - [ ] Participant counts by status.
  - [ ] Geographic breakdown.
  - [ ] Funnel metrics (registered → deposited → allocated).
  - [ ] Refund/withdrawal tracking.
- [ ] State transition management:
  - [ ] Web app state transitions (Pre-launch → Registration → Open Subscription → Allocation → Withdrawal → Distribution).
  - [ ] Smart contract state transitions (PreOpen → Auction → Closed → Cancellation → Settlement → Done).
  - [ ] Audit trail for all transitions (who, when, tx hash).
  - [ ] Confirmation workflow before execution.

**P1 — Should Have:**
- [ ] Data export for final ICO report generation.
- [ ] Set "Deposits on other Platforms" amount for aggregate count calculation.

---

### FR8: Terms and Privacy Policy

**P0 — Must Have:**
- [ ] Terms of Sale page.
- [ ] Terms and Conditions page.
- [ ] Privacy Policy page.

---

## 5. Non-Functional Requirements

- **NFR-001 [Compliance]:** OFAC screening integration; KYC/KYB data retention per regulatory requirements; audit trail for all transactions; GDPR-compliant site. Reference: [GDPR Compliance Requirements](https://www.notion.so/GDPR-Compliance-Requirements-30267845c2f4809b857be81b7d9bd5ad?pvs=21)
- **NFR-002 [Security]:** Sonar permit signature validation; Sonar wallet risk screening integration.
- **NFR-003 [Resilience]:** Graceful degradation for network congestion; transaction retry mechanisms.
- **NFR-004 [Brand]:** Nexus hosted at `ico.nexus.xyz` (single domain); Nexus look and feel applied.
- **NFR-005 [SEO]:** Each tab/section (Overview, How It Works, Timeline, FAQ, Disclaimer) has page-specific `<title>`, `<meta name="description">`, and OpenGraph/Twitter tags.
- **NFR-006 [Analytics]:** Page-level analytics throughout.
- **NFR-007 [Early Access]:** Separate obfuscated domain or path for Phase 0 institutional access. Single private link distributed to all institutional investors.

### Performance Requirements

| Requirement | Metric | Target | Percentile | Conditions |
|-------------|--------|--------|------------|------------|
| Dynamic wallet connections | Concurrent connections | High-volume (dedicated cluster confirmed) | — | Notify Dynamic a few days before registration opens |
| Deposit processing | Concurrent deposits during subscription period | Handle peak volume | — | 120-hour subscription window |
| Real-time deposit stats | Stat update latency | Real-time | — | Throughout subscription period |
| Site availability | Uptime | DDOS-resistant | — | Especially at subscription close |

---

## 6. Acceptance Requirements

### 6a. Functional Acceptance

- [ ] **AC-001:** Public landing page live at `ico.nexus.xyz` before Mar 3, 2026.
- [ ] **AC-002:** Private link for institutional pre-registration functional before Mar 10, 2026.
- [ ] **AC-003:** KYC/KYB via Sonar operational; geo-screening blocking all restricted jurisdictions.
- [ ] **AC-004:** USDT deposit flow live with real-time global and personal stats.
- [ ] **AC-005:** Allocation calculation and CSV upload/download working in admin tools.
- [ ] **AC-006:** Withdrawal flow available during preview phase.
- [ ] **AC-007:** Token distribution automated and confirmed end-to-end on testnet.
- [ ] **AC-008:** MiCA refund flow operational for EU residents.
- [ ] **AC-009:** Admin state transition management working with full audit trail.

### 6b. Non-Functional Acceptance

- [ ] **AC-NFR-001:** GDPR compliance confirmed with legal review.
- [ ] **AC-NFR-002:** Load test passing for peak deposit volume and concurrent Dynamic wallet connections.
- [ ] **AC-NFR-003:** DDOS mitigation verified.
- [ ] **AC-NFR-004:** Smart contract audited and all critical/high findings resolved before mainnet deployment.

### 6c. Documentation Acceptance

- [ ] **AC-DOC-001:** PRODUCT_MAP.md updated to reflect `Shipped` status.
- [ ] **AC-DOC-002:** ICO contract addresses and Sonar configuration published internally.
- [ ] **AC-DOC-003:** Terms of Sale, T&Cs, and Privacy Policy approved by Legal before site goes live.

### 6d. Definition of Done

All AC items above are checked AND:
- [ ] Engineering feature-complete and tested by Feb 20, 2026.
- [ ] Institutional pre-registration live by Mar 10, 2026.
- [ ] Spec status updated to `Shipped` in this file.

---

## 7. Open Questions

- [ ] **OQ-001** — Sonar smart contract selection finalised — Owner: Engineering — Resolve by: before Feb 20
- [ ] **OQ-002** — Jurisdiction exclusion list finalised — Owner: Legal — Resolve by: before Mar 3
- [ ] **OQ-003** — MiCA Whitepaper completed — Owner: Legal — Resolve by: before Mar 3
- [ ] **OQ-004** — Treasury setup for receiving USDT proceeds — Owner: Finance — Resolve by: before Apr 3 (deposit open)
- [ ] **OQ-005** — Dynamic dedicated cluster confirmed and notified — Owner: Engineering — Resolve by: a few days before Mar 17
- [ ] **OQ-006** — Priority allocation formula finalised — Owner: @gordon — Reference: [ICO Priority Allocation Formula](https://www.notion.so/ICO-Priority-Allocation-Formula-2fe67845c2f480409245ffb9b30e25f5?pvs=21)
- [ ] **OQ-007** — Engineering sign-off — Owner: [@alecjames-dot](https://github.com/alecjames-dot) — Resolve by: before APPROVED
- [ ] **OQ-008** — Legal sign-off — Owner: [@alecjames-dot](https://github.com/alecjames-dot) — Resolve by: before APPROVED
- [ ] **OQ-009** — Security sign-off — Owner: [@alecjames-dot](https://github.com/alecjames-dot) — Resolve by: before APPROVED

---

## 8. Success Metrics

| Metric | Target | Measurement Method |
|--------|--------|--------------------|
| Registration conversion | Started → KYC completed | Sonar funnel data |
| Subscription participation | Registered → submitted deposit | Sonar + on-chain data |
| Oversubscription ratio | > 1× | Total deposits / $30M raise cap |
| Nexus wallet holder participation | TBD | Nexus wallet connection at registration |
| Refund/withdrawal rate | Minimised | Withdrawal tracking in admin dashboard |
| Support ticket volume | Minimised | Ticket system during sale phases |

---

## 9. Sign-off

| Team | Reviewer | Status | Date |
|------|----------|--------|------|
| Product | @Gordon Mattey | Pending ⏰ | — |
| Engineering | — | Pending ⏰ | — |
| Marketing | — | Pending ⏰ | — |
| Legal | — | Pending ⏰ | — |
| Security | — | Pending ⏰ | — |
| Finance | — | Pending ⏰ | — |

---

## 10. Changelog

| Date | Author | Change |
|------|--------|--------|
| 2026-01-11 | @gordon | v1.0 initial draft |

---

## Appendix

### Competitive Positioning

| Dimension | Plasma | MegaETH | Nexus | Nexus Rationale |
|-----------|--------|---------|-------|-----------------|
| Focus | Stablecoin payments L1 | Real-time L2 | Financial infrastructure L1 | Purpose-built for exchange workloads |
| Exchange | None | Third-party apps | Enshrined native exchange | Protocol-level revenue capture |
| Stablecoin | USDT (zero-fee transfers) | USDm (Ethena partnership) | USDX (M0 partnership) | Integrated monetary layer |
| Stablecoin deposits | Pre-sale deposit campaign | Post-sale ($250M cap) | Post-sale USDX deposit campaign | Day-1 ecosystem activation |
| ICO structure | Deposit campaign | English auction, $1B FDV cap | Fixed price, $300M FDV | Valuation clarity; broader participation; no price escalation |
| Community benefits | zkPassport gating + referrals | Allocation boosts, Sybil removal | Compute network points + ecosystem activity | Rewards existing contributors |

~~**Design Choice Rationale** (descoped from main spec):~~
1. ~~**Fixed-Price Sale** — Chosen for valuation clarity; no price escalation unlike auctions.~~
2. ~~**Base Mainnet** — Coinbase ecosystem alignment, Sonar integration, lower fees.~~
3. ~~**10% Initial Allocation** — With expansion option up to 20% under Foundation discretion.~~
4. ~~**Community Benefits** — Rewards ecosystem activity and testnet participation.~~

---

### Community Benefits — Priority Weighting Design

If the sale is oversubscribed, compute network points holders receive priority weighting in the allocation queue:

**Priority signals:**
1. Participation timing — earlier verified wallets and finalised deposits receive higher priority.
2. Ecosystem engagement — historical activity across Nexus testnets and on-chain activity on Base/Ethereum.
3. Contribution size — considered within per-wallet caps and anti-concentration safeguards.
4. Deposit weight and timing — time-weighted consideration of deposits.

**No pricing discount** — all participants pay the same fixed price. Points affect allocation priority only.

Reference: [ICO Priority Allocation Formula](https://www.notion.so/ICO-Priority-Allocation-Formula-2fe67845c2f480409245ffb9b30e25f5?pvs=21)

---

### Sonar Integration

**Sonar API docs and libraries**
- [Sonar docs](https://docs.echo.xyz/)
- [Frontend integration](https://docs.echo.xyz/sonar/integration-guides/frontend-overview)
- [Contract integration](https://docs.echo.xyz/sonar/integration-guides/smart-contracts)
- [Test sales](https://docs.echo.xyz/sonar/core-features/test-sales)

**App configuration**

| Environment | Sale UUID | OAuth Client ID |
|-------------|-----------|-----------------|
| Test | `848e006c-ba5e-4f5c-850a-432ef06c6e82` | `7f2212d6-e6dd-4b27-a099-61c9ae4339c8` |
| Production | `a19f8c0a-7834-4dbc-93ad-a0ed9644444f` | `02748945-2f10-4ead-b486-a7abb2c0e4f1` |

**Configurable brand assets (set in Sonar dashboard):**
- Background color (hex)
- Text color (hex)
- Top image asset (16:9 ratio, ≥500px width)
- Logo lockup (scaled to 24px height)

**Phase → Sonar stage mapping:** [Nexus Phase to Sonar Stage Mapping](https://www.notion.so/Nexus-Phase-to-Sonar-Stage-Mapping-2e167845c2f48097a00ac6d165674ff0?pvs=21)

---

### Technical Dependencies

| Dependency | Owner | Status |
|------------|-------|--------|
| Sonar (Echo) integration | Engineering | TBD |
| Smart contract mainnet deployment | Engineering | TBD |
| Sonar smart contract selection and test deployment | Engineering | TBD |
| KYC provider integration | Sonar | Provided |
| Accreditation verification | Sonar | Provided |
| Dynamic dedicated cluster for scale | Engineering | Confirmed — notify Dynamic a few days before sale |

---

### Assumptions

1. Ecosystem activity and Compute network points data is accessible for priority weighting.
2. KYC/KYB verification through Sonar meets compliance requirements.

---

### UX References

**Participant UX:**
- [Figma Prototype](https://www.figma.com/proto/rSPlYjT94bXbsEbYHopj7o/Nexus-ICO?node-id=427-20129&t=zAZ4LOfTKeaPcIUL-1&scaling=min-zoom&content-scaling=fixed&page-id=313%3A2385&starting-point-node-id=427%3A20129) (password: objective1)
- [Deprecated UX Flow](https://www.notion.so/Nexus-ICO-Investor-UX-Flow-Deprecated-2cd67845c2f48078bf12d8f28fbb2aeb?pvs=21)
- [Deprecated UI Screens](https://www.notion.so/Nexus-ICO-UI-Screens-Deprecating-2da67845c2f48020ab5dc1447c7ce8c7?pvs=21)

**Admin UX:** [Nexus ICO — Admin UX Flow](https://www.notion.so/Nexus-ICO-Admin-UX-Flow-2cd67845c2f4808f922be89b60b0cae3?pvs=21)

**Site content and state:** [ICO Site Content](https://www.notion.so/ICO-Site-Content-2fd67845c2f4805e84e7edae716e07a9?pvs=21) | [ICO Site State Map](https://www.notion.so/ICO-Site-State-Map-2ed67845c2f4807a800fd39675458567?pvs=21)

**Contract setup:** [ICO Contract — Production Setup](https://www.notion.so/ICO-Contract-Production-Setup-30267845c2f48036bce3d933ead73bcc?pvs=21)

---

### Related Documents

| Document | Owner | Relevance |
|----------|-------|-----------|
| [Nexus Roadmap (12 Months)](https://www.notion.so/Nexus-Roadmap-12-Months-2ab67845c2f481f688edc8a8a5980a0c?pvs=21) | Gordon | Overall timeline context |
| [Nexus ICO — Project Plan](https://www.notion.so/Nexus-ICO-Project-Plan-2ce67845c2f480a296d5c07c690740ae?pvs=21) | Gordon | ICO product requirements |
| [Memo: USDX — Vision](https://www.notion.so/Memo-USDX-Vision-2d367845c2f4800a9c38c9e352f0525d?pvs=21) | Gordon | USDX pre-mainnet campaign |
| [Daniel Marin ICO Mechanics Memo (Dec 24, 2025)](https://docs.google.com/document/d/1cEbGxKcoXTbu9xZS6UftMJzUmPAvOvqNeTocnbZrug0/edit?tab=t.0) | Daniel | ICO mechanics reference |
| [Sonar Kick Off](https://www.notion.so/Sonar-Kick-Off-2df67845c2f480a494d0ccb7aa158739?pvs=21) | Gordon | Scoping with Sonar |
| [Participation Target Model](https://docs.google.com/document/d/1wnTXzUlqDVLyVbCdz9gVAkFxOs5P1xTkKNzMJmqFLqs/edit?tab=t.0) | Alex | Geography and raise assumptions |
| [Sonar Platform Docs](https://docs.echo.xyz/) | Coinbase | Smart contract phase and interface spec |
| [Sonar Template Figma](https://www.figma.com/design/lVQTwCEDV9THQqNGE0JCEy/sonar.templates?node-id=0-1&p=f) | Coinbase | Implementation components |
| [Sonar Nexus PRD and Sales Configuration](https://docs.google.com/document/d/1Vbu9nsyMzsLZytHzXpt0-X0fbeKFXK0bfjsW8n1cr6g/edit?tab=t.sdxokk4ytao0) | Coinbase | Sale configuration for sign-off |
| [MegaETH ICO Mechanics](https://token.megaeth.com) | — | Competitive reference |
| [Plasma XLP Sale Blog](https://www.plasma.to/insights/xpl-the-public-sale-and-its-role-in-the-plasma-ecosystem) | — | Competitive reference |
| [Gensyn ICO Mechanics](https://token.gensyn.network/) | — | Competitive reference |
