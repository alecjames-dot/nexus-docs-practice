# Nexus DEX Alpha Spec

**Status:** DEPRECATED
**Owner:** @alec
**Last Updated:** 2026-03-04
**Approved by (Product):** @Daniel Marin
**Approved by (Engineering):** @Stanley Jones, @Alex "Sasha" Potashnik, @Sam J
**Linear:** —
**Figma:** [Nexus Exchange](https://www.figma.com/design/lneSHX42k0HgBPnEzUoPEX/Nexus-Exchange)
**Related Research:** —
**Related Specs:** [Nexus Exchange SPEC.md](SPEC.md)

> **DEPRECATED — Missed delivery; product redesign.** This spec is a historical record. Do not reference or build to this document.

---

## 1. Context

### Investment Case

Launch the Nexus DEX Alpha as the first public-facing trading product on the Exchange Blockchain. The Alpha is an access-gated environment with no real value, designed to validate product-market fit, collect user feedback, and stress-test the exchange stack before mainnet.

### Opportunity Cost

Delay to Alpha launch delays the collection of trading data and user feedback needed to inform the production exchange design. Secondary delay to partner and community momentum.

### Effort

**L.** Cross-team coordination across Engineering, Product, Legal, and Marketing. External dependencies on oracle feeds, TradingView, and Dynamic auth.

---

## 2. Goals & Non-Goals

**Goals:**
- Launch an access-gated DEX Alpha supporting BTC-USD perpetual contracts.
- Validate the onboarding flow, trading UX, and matching engine under simulated market conditions.
- Collect structured user feedback and trading analytics.

**Non-Goals:**
- No deposits, bridges, or real-value transactions.
- No points or incentives system (activity is recorded for future use only).
- No auto-deleveraging or insurance fund (descoped for Alpha).
- No ETH or SOL market listings in V1 (planned for V2).

---

## 3. Summary of Features

| Feature | Description |
|---------|-------------|
| Access gating | Code-based early access with waitlist, onboarding modals, and USDX claim |
| USDX faucet | 500 USDX first claim; 50 USDX daily; no real value; non-transferable |
| BTC-USD perpetuals | Single market; up to 50x leverage |
| Order types | Market, Limit, Cancel/Replace with TIF (GTC, IOC) |
| Order book & trade feed | Real-time; top 11 bid/ask levels; 25 most recent trades |
| TradingView charts | Candle chart, drawing tools, indicators, customisable timeframes |
| Positions & margin | Isolated margin; real-time PnL, liquidation price, margin utilisation |
| Funding rates | ~4-hour settlement; clamp-based rate; continuous accrual |
| Price oracle | Off-chain aggregator polling 7 CEXes; on-chain contract; privileged updater |
| Market simulation | Maker bots (11 levels, ±2% spread) + Taker bots (fill within 1s) |
| User feedback | 5-star rating modal triggered once after 2nd key event |
| User analytics | Google Analytics; claim behaviour, trading behaviour, PnL, button clicks |
| Portfolio page | Positions, PnL, order and funding history |
| Public API waitlist | Sign-up flow mirroring access gating |

---

## 4. Functional Requirements

### 1. User Onboarding

#### 1.1 Navigation

- The DEX must be accessible via the **"Trade"** tab in the navigation bar.
- Default landing page for DEX: `/trade`.
- Default NexusOS landing page: Compute Network.

#### 1.2 Access Gating

Any user arriving at `/trade` must pass through the following access gating flow:

| State | Behaviour |
|-------|-----------|
| Not authenticated | Prompt sign-up / login |
| Authenticated, no code (not approved) | Prompt to join early access list |
| Authenticated, no code, returns to `/trade` | Preview DEX — **Dependency:** orderbook activity required |
| Authenticated with code (approved) | Proceed to onboarding modal |

- Code must be easily pastable via Cmd+V or Paste on mobile.
- **Onboarding modal sequence:**

| Pop-up | Title | Description |
|--------|-------|-------------|
| 1 | Welcome to the Nexus DEX Alpha | A high-performance Layer 1 blockchain purpose-built for verifiable finance. Perpetual trading, leverage up to 50x, and more. |
| 2 | Enjoy Early Access | Help test a new kind of exchange. Your feedback is critical during the Nexus DEX Alpha period. |
| 3 | Claim Your 500 USDX | Get free USDX every day to keep trading. USDX is for testing only, has no monetary value, and can't be sent or received. |

#### 1.3 User Onboarding Administration

- Waitlist admin UI must allow the Nexus team to send access codes to waitlisted users via email.
- Admin UI must support bulk upload and bulk approval of email lists.
- Admin UI access: Lauren Dresnick, Daniel McGlynn, John Slater, Gordon Mattey, Alec James, Collin Jackson, Daniel Marin, Sasha, Stanley, Sam J.
- Upon successful code entry: display onboarding modal; prompt USDX claim.
- User cannot place orders until initial USDX is claimed.
- Return visits: immediate access unless USDX balance is 0 (show CTA).

#### 1.4 Return Users

- Approved users who have claimed USDX skip the access gating flow on return.
- Daily claim: 50 USDX, once per 24 hours.

#### 1.5 USDX Faucet

- First-time claim: 500 USDX. Daily claim: 50 USDX (once per 24h per wallet, enforced on-chain).
- Nexus must be able to mint and send USDX to specific addresses above faucet limits.
- Only approved waitlist wallets may claim.
- **Users from OFAC-sanctioned countries must be blocked from all interaction. Hard requirement.** No geo-fencing for non-OFAC countries.
- USDX must not be bridgeable, transferable by users, or externally usable. Nexus admin may enable transferability between users.
- Users cannot place trades with USDX balance = 0.
- All trading actions must not require users to pay gas directly. Nexus covers gas via paymaster or privileged account.
  - Gas allocation: 100T $NEX on Dexnet. Each user receives 10 NEX (~10^10 trades at maximum gas).
- USDX details must be documented in DEX L1 docs.

#### 1.6 User Feedback

- 5-star rating modal appears once per user lifetime, triggered on the 2nd key event (1: placing a trade; 2: closing a position).
- On submission: record star score, timestamp, and user ID/wallet. Record which key event triggered the modal.
- Modal includes a link to an external feedback form.
- Modal is a centre-screen pop-up, consistent with the onboarding flow style.

#### 1.7 User Analytics (Google Analytics)

- **Daily claim behaviour:** users claiming daily (by Dynamic ID), consecutive days claimed, total claim count, claim timestamps.
- **Daily trading behaviour:** users placing ≥1 trade/day, total trades/day, consecutive active days.
- **User PnL:** realized PnL, unrealized PnL, number of liquidations — all per user.
- **General:** button click frequency map.

---

### 2. Market and Trading

#### 2.1 Asset Availability

- Alpha MVP: BTC-USD perpetual contract only. Max leverage: 50x.

#### 2.2 Market Data

Display for the active asset: Mark Price, Oracle Price, 24h Change, 24h Volume, Open Interest, Funding Rate + Countdown Timer.

Integrate TradingView Advanced Charts™ with: candle chart, drawing tools, indicators, customisable timeframes.

#### 2.3 Order Book and Trade Feed

- Order book: top 11 bid levels and top 11 ask levels; real-time updates.
- Trade feed: most recent 25 trades; real-time updates.
- Both populated dynamically via market simulation (see Section 7).

#### 2.4 Order Placement

- **Order types:** Market, Limit, Cancel/Replace.
- **Inputs:** Quantity, Price (limit only), Leverage (dropdown), Side (Buy/Sell buttons).
- Quick-select buttons: 25%, 50%, Max of account balance.
- Reduce-only toggle.
- TP/SL: configurable by Price or Gain %.
- Time-in-Force (Limit orders only): GTC, IOC. ~~ALO removed from UI.~~

#### 2.5 Execution and Matching

- Price-time priority matching engine.
- Orders rejected if price is ≥95% away from median order book price.
- Maximum 1,000 open orders per account.
- Confirmation notification on success; error notification on failure (margin, invalid price, disconnect).
- On submission, order appears instantly in Open Orders.
- Risk engine re-checks margin logic on any new order, modification, or execution event.

---

### 3. Order and Position Management

#### 3.1 Open Orders

- List of live active orders.
- Inline actions: Modify (price/size), Cancel, Cancel All.

#### 3.2 Positions

Display per position: Pair, Side, PnL, Entry Price, Mark Price, Liquidation Price, Margin Used, Value, TP/SL (if set).

Actions: Close Market, Close Limit.

#### 3.3 History

- Trades History, Order History, Funding Payments History — all visible in UI.

#### 3.4 Portfolio Page

- Reflects user positions from the order book.
- Portfolio chart and data reflect accurate PnL.
- No deposit or bridge functionality anywhere in the UX.

---

### 4. Margining and Liquidation

#### 4.1 Margining

- All positions under **isolated margin**. Margin and collateral accounting separate per position.
- On-chain margin/collateral updates only on: position open, modify, close, or liquidation. Mark-to-market PnL is off-chain only.

| Calculation | Formula |
|-------------|---------|
| Initial margin (limit) | `position_size × limit_price / leverage` |
| Initial margin (market) | `position_size × mark_price / leverage` |
| Maintenance margin fraction | `1 / (max_leverage × 2)` |
| Maintenance margin | `position_notional × maintenance_margin_fraction` |
| Account equity | `collateral + unrealized_pnl` (off-chain) |
| Unrealized PnL | `position_size × (mark_price - entry_price) × direction` |

- Mark price sourced from Nexus oracle feed; updates every 1–2s.
- Frontend and API must display: margin utilisation %, initial margin, maintenance margin, real-time equity, unrealized PnL.

#### 4.2 Liquidations

- Liquidations affect only the isolated position.
- Liquidation engine acts on the most recent oracle mark price.
- Liquidator is an off-chain privileged service with exclusive permissions to submit liquidation transactions, execute bankruptcy resolution, and update on-chain collateral.
- Liquidation triggered when: `account_equity < maintenance_margin`.
- On liquidation: position closed at `bankruptcy_price = entry_price - (collateral / position_size × direction)`.
- Remaining collateral returned to user. Losses cannot exceed collateral (bankruptcy price capping enforced).
- Matching engine must never accept a liquidation resulting in `user_equity < 0`.
- Frontend must display estimated liquidation price.
- **Auto-deleveraging and insurance fund are out of Alpha scope.**

---

### 5. Funding Rates

- Settlement: every ~4 hours (based on EVM block height).
- Funding accrues continuously; payment applied automatically at end of each interval.

| Formula | Expression |
|---------|------------|
| Funding rate | `clamp((mark_price – oracle_price) / oracle_price, ±max_funding_rate)` |
| Funding payment | `position_notional × funding_rate` where `position_notional = abs(position_size × mark_price)` |

- `mark_price > oracle_price` → longs pay shorts. `mark_price < oracle_price` → shorts pay longs.
- Funding accumulator resets after each settlement. Market-level funding timestamp and current rate updated after settlement.
- On settlement failure: must be retryable in the next block.
- UI displays: current funding rate (estimated), countdown to next settlement, last settled rate, funding payment history per account.

---

### 6. Price Oracle

- **Off-chain aggregator** polls 7 CEXes: Binance, Bitstamp, Bybit, Coinbase, Gemini, Kraken, OKX.
  - Volume-weighted per-exchange quotes (24h volume weight, updated hourly).
  - IQR filtering to remove outliers.
  - Target update frequency: every EVM block. On rate limit: reuse previous quote from that feed.
  - Writes to: on-chain oracle contract (via privileged role) and Redis cache (for risk engine, UI, backend services).
- **On-chain oracle contract** stores canonical mark price consumed by: matching engine, liquidation engine, funding rate calculations, and risk checks.
  - Accepts updates only from the privileged Oracle Updater role. Unauthorized updates rejected.
- UI must display current oracle price.

---

### 7. Market Simulation

- **Maker bots:** populate order book with synthetic limit orders ~every 1 second, centered around oracle price (Gaussian noise, ±2% bound, ≥11 levels per side, realistic varying order sizes).
- **Taker bots:** act on user orders within 1 second; trigger synthetic trade event, order book update, and chart feed update. Respect 95% mid-price constraint.
- Both feeds refresh ~every 1s with arbitrary noise.
- Bots must scale to 1,000 simultaneous simulated users while maintaining stable latency and real-time feeds with no execution backlog.
- On bot failure: internal warning raised; maintenance banner ready for display in UI.

---

### 8. Public API

- Users can sign up to the early access list for Public API via the same flow as access gating.

---

### 9. Points, Tokens and Incentives

- No deposit or bridge function or design anywhere in the UX.
- No points or incentives system in the DEX Alpha.
- User trading activity (Section 1.7) is recorded for potential future rewards use.

---

## 5. Non-Functional Requirements

- **NFR-001 [Latency]:** Real-time updates ≤ 250ms (target).
- **NFR-002 [Resilience]:** System must gracefully handle disconnections.
- **NFR-003 [Bot Uptime]:** Market simulation bots ≥ 95% uptime 24/7 (maker bots generating valid updates within required intervals; taker bots responding within latency limits; no degraded state > 30 minutes).
- **NFR-004 [Compliance]:** OFAC geo-blocking enforced on all Nexus-hosted endpoints.

### Performance Requirements

| Requirement | Metric | Target | Percentile | Conditions |
|-------------|--------|--------|------------|------------|
| UI update latency | Order book / trade feed refresh | ≤ 250ms | — | Normal load |
| Taker bot response | Fill user order | ≤ 1 second | — | Up to 1,000 concurrent simulated traders |
| Maker bot refresh | Order book update | ~1 second | — | With arbitrary noise |
| Oracle update | On-chain mark price update | Every EVM block | — | Fall back to previous quote on rate limit |
| Funding settlement | Settlement execution | Every ~4 hours | — | Block-height based |
| Bot uptime | Available and generating valid updates | ≥ 95% | — | 24/7 |

---

## 6. Acceptance Requirements

> Spec is deprecated — acceptance criteria listed for historical reference only.

### 6a. Functional Acceptance

- [ ] **AC-001:** Access gating correctly routes unauthenticated, waitlisted, and approved users.
- [ ] **AC-002:** USDX faucet enforces 24h on-chain rate limit per wallet.
- [ ] **AC-003:** BTC-USD perpetual market live with order placement, matching, and position display.
- [ ] **AC-004:** Maker and taker bots operating with stable latency under 1,000 simulated users.
- [ ] **AC-005:** 5-star feedback modal triggers correctly on 2nd key event (once per lifetime).
- [ ] **AC-006:** OFAC geo-block enforced across all Nexus-hosted endpoints.

### 6b. Non-Functional Acceptance

- [ ] **AC-NFR-001:** UI update latency ≤ 250ms confirmed under simulated load.
- [ ] **AC-NFR-002:** Bot uptime ≥ 95% verified over 48-hour staging run.

### 6c. Documentation Acceptance

- [ ] **AC-DOC-001:** USDX details published in DEX L1 docs.
- [ ] **AC-DOC-002:** PRODUCT_MAP.md updated to reflect `Deprecated` status.

### 6d. Definition of Done

*N/A — spec deprecated before delivery.*

---

## 7. Open Questions

*Recorded at time of deprecation for reference.*

- [ ] Target Launch Date — never confirmed.
- [ ] Professional RPC provider for DEX — unresolved.

---

## 8. Success Metrics

| Metric | Target | Measurement Method |
|--------|--------|--------------------|
| Daily active traders | TBD | Google Analytics (Dynamic ID) |
| Daily USDX claim rate | TBD | On-chain event tracking |
| 5-star average rating | TBD | Feedback modal submissions |
| Bot uptime | ≥ 95% | Internal monitoring |
| User liquidation rate | < 20% of active positions/day | Position tracking |

---

## 9. Sign-off

| Team | Reviewer | Status | Date |
|------|----------|--------|------|
| Product | @Daniel Marin | Approved ✅ | — |
| Engineering | @Stanley Jones, @Alex "Sasha" Potashnik, @Sam J | Approved ✅ | — |
| Marketing | @Lauren Dresnick | Approved ✅ | — |
| Legal | @Roza Nader, @Lisa Haugh | Approved ✅ | — |
| Security | — | N/A | — |
| BD | — | N/A | — |

---

## 10. Changelog

| Date | Author | Change |
|------|--------|--------|
| 2026-03-04 | @alec | Deprecated — missed delivery; product redesign |
| — | @alec | Initial draft |

---

## Appendix

### Legal Risks Surfaced

- Implement a Chainalysis screening process to block bad actors — deferred to Beta.

### Alpha V2 Release (Planned — Never Shipped)

- ETH and SOL market listings.
- User analytics expansion.
