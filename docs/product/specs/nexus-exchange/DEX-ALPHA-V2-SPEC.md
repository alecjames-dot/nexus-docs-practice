# Nexus DEX Alpha V2 Spec

**Status:** DEPRECATED
**Owner:** [@alecjames-dot](https://github.com/alecjames-dot)
**Last Updated:** 2026-03-05
**Approved by (Product):** @Daniel Marin
**Approved by (Engineering):** —
**Linear:** —
**Figma:** —
**Related Research:** —
**Related Specs:** [DEX Alpha V1 Spec](DEX-ALPHA-SPEC.md), [Nexus Exchange Spec](SPEC.md)

> **DEPRECATED — Missed delivery; product redesign.** This spec is a historical record. Do not reference or build to this document.

---

## 1. Context

### Investment Case

Expand the Nexus DEX Alpha to support multiple perpetual markets (crypto + equities), validate precompile performance at 55k+ simulated users, evaluate three equity oracle providers, and release a developer SDK — all prior to ICO to generate proof points and demonstrate product quality.

### Opportunity Cost

Delay to V2 delays multi-market validation, oracle selection, and developer ecosystem seeding ahead of the ICO.

### Effort

**L.** Adds load testing infrastructure, three oracle integrations, six perpetual markets, and a full TypeScript SDK on top of the V1 Alpha foundation.

---

## 2. Goals & Non-Goals

**Goals:**
- Enable users to interact with and engage with the Nexus product to generate proof points before ICO.
- Launch six perpetual markets: BTC, ETH, SOL, NVDA, TSLA, AAPL.
- Validate precompile at 55k+ users via structured load testing.
- Evaluate Stork, SEDA, and Pyth Network as equity oracle providers.
- Release the Nexus Trade SDK (TypeScript) for algorithmic traders and developers.
- **Hard requirement: quality, aesthetic user experience.**

**Non-Goals:**
- No deposit or bridge function in the UX.
- No gamification, points, referrals, or Gridcrews (deferred — see Appendix).
- No cross-market interactions in load testing.

---

## 3. Summary of Features

| Feature | Description |
|---------|-------------|
| Six perpetual markets | BTC, ETH, SOL (crypto); NVDA, TSLA, AAPL (equities — weekdays only) |
| Precompile load testing | Structured load tests at 1k / 5k / 15k concurrent users; saturation and churn tests |
| Equity oracle evaluation | 3-week rotation: Stork → SEDA → Pyth; monitoring and weekly reports |
| Nexus Trade SDK | Open-source TypeScript SDK with REST + WebSocket API; developer waitlist |
| Access gating | Maintained from V1; orderbook + chart visible to all; trading gated |
| Performance baseline | ≥1,000 ops/sec matching engine; ≤2s order ACK; ≥99.9% UI availability |

---

## 4. Functional Requirements

### 0. Performance Requirements (P0)

| Category | Metric | Target | Priority |
|----------|--------|--------|----------|
| Matching Engine | Order processing throughput | ≥1,000 ops/sec sustained | P0 |
| ~~Matching Engine~~ | ~~Burst throughput~~ | ~~≥2,000 ops/sec for ≥30s~~ | ~~P1~~ |
| Latency | Order submission → ACK | ≤2s p95 | P0 |
| Latency | Order submission → execution | ≤5s p95 | P0 |
| Latency | Cancel order confirmation | ≤2s p95 | P1 |
| Latency | UI state convergence | ≤2s after on-chain/engine update | P1 |
| UI | UI render latency | ≤100ms per interaction | P1 |
| UI | UI freeze under load | 0 freezes at 1k ops/sec | P0 |
| UI | Failed orders surfaced | ≤5s | P0 |
| Liquidations | Detection latency | ≤2s | P1 |
| Liquidations | Execution latency | ≤5s end-to-end | P1 |
| Liquidations | UI margin refresh | ≤2s | P1 |
| ~~Load~~ | ~~Extreme load scenario~~ | ~~Read-only mode displayed + enabled~~ | ~~P1~~ |
| Availability | UI with dynamic charts and orderbook | ≥99.9% | P0 |
| Pricing | Index/mark price staleness | ≤2s old p95 | P1 |

---

### 1. User Onboarding

#### 1.1 DEX Accessibility

- Trade tab on `app.nexus.xyz` is available and visible.
- Trade tab has dynamic, constant orderbook and chart (visible to all users).
- Trade tab maintains the access gating system from V1.
- DEXNet environment must be active with ≥95% availability on `https://status.nexus.xyz/`.

#### 1.2 Load Testing

- Validate that the precompile powering the DEX can safely, deterministically, and predictably support **55k+ users**, despite a per-market limit of 1,000 orders.
  - **Most critical requirement.**
  - **Dependency:** Storage layer completion to support this volume.

**Test scope:**
- Single market only (BTC-USD). No cross-market interactions.
- Simulate users via a finite set of funded test wallets (wallet reuse acceptable).
- No onboarding, faucet, or permissions logic required.
- Call the **precompile directly** via simple EVM transactions.

**Concurrency levels:**

| Level | Concurrent Users |
|-------|----------------|
| Low | 1,000 |
| Medium | 5,000 |
| High | 15,000 |

**Action types (only):** Place limit order, Place market order, Cancel order.
*(Exclude: Cancel/Replace, TP/SL, Reduce-only, advanced order types.)*

**Order parameters:** Prices anchored to oracle price with small deterministic offsets. Sizes fixed or from a small predefined set.

**Saturation test:** Fill orderbook from 0 → 1,000 open orders. Continue submitting past the limit. System must: reject excess orders cleanly, preserve existing orderbook state, never partially apply state changes.

**Churn test:** Maintain orderbook near capacity (900–1,000 orders). Loop: cancel oldest orders → insert new orders. Observe performance under constant state mutation.

**Expected outcome:** Adjust market-making bots to reflect expected average user activity, ensuring:
- Low-latency order placement (~1s).
- Rapid order fills (~1s).
- Organic user orders prioritised to fill other organic user orders.

**This testing system must be replicated on mobile.**

---

### 2. Market and Trading

#### 2.1 Asset Availability

Six perpetual markets on release:

| Market | Symbol | Leverage | IMR | MMR | Asset Pair | Availability |
|--------|--------|---------|-----|-----|------------|-------------|
| BTC-USD | BTC | 50x | 2% | 1.2% | USDX | 24/7 |
| ETH-USD | ETH | 50x | 2% | 1.2% | USDX | 24/7 |
| SOL-USD | SOL | 50x | 4% | 2.4% | USDX | 24/7 |
| NVDA-USD | NVDA | 50x | 2.5% | 1.25% | USDX | Weekdays only |
| TSLA-USD | TSLA | 50x | 2.5% | 1.25% | USDX | Weekdays only |
| AAPL-USD | AAPL | 50x | 2.5% | 1.25% | USDX | Weekdays only |

*Price Step and Amount Step to be filled per market before launch.*

Equity markets (NVDA, TSLA, AAPL) must be unavailable for trading on weekends.

#### 2.2 Oracle for Equities Feeds

Evaluate three oracle providers for AAPL, TSLA, and NVDA pricing over three weeks (one active provider per week, rotated):

1. **Week 1:** Stork — [docs](https://docs.stork.network/) | Asset numeric IDs: AAPL_24_5: `30000`, NVDA_24_5: `30003`, TSLA_24_5: `30006`
2. **Week 2:** SEDA
3. **Week 3:** Pyth Network — [docs](https://docs.pyth.network/lazer) | [SDKs](https://github.com/pyth-network/pyth-crosschain/tree/main/lazer/sdk) | [Symbols](https://history.pyth-lazer.dourolabs.app/history/v1/symbols) | Relayer: `wss://pyth-lazer-0.dourolabs.app/v1/stream`

Use the existing Redis cache in Nexus' crypto oracle system.

**Monitoring requirements per oracle and asset:**

| Metric | Description |
|--------|-------------|
| Price freshness | Time delta: oracle timestamp → DEX consumption. Report p50/p95 (ms). |
| Update frequency | Price updates per trading hour. Flag gaps > configurable threshold (e.g. 10s). |
| Price stability | Absolute % change between consecutive updates. Flag spikes/drops > 0.5%. |
| Availability | % of trading hours with valid, fresh price. Log missing data events and stale price usage. |

**Weekly reporting:** Average freshness latency per asset, update frequency distribution, count of missing price events, stale price usage, and outlier price movements.

*Product to collect API credentials from all three oracle providers before testing begins.*

---

### 3. Public API and Developer SDK

- Users can join a developer API waitlist (existing system).
  - Collect at signup: preferred languages, REST vs WebSocket preference, JSON vs protobuf, intended use case.
  - Same access-gating flow as the frontend DEX waitlist.

**SDK name:** Nexus Trade SDK (open-source)

**Primary deliverable:** TypeScript SDK with REST + WebSocket APIs.

**Target users:** Algorithmic traders, bot developers, institutions invited to test the platform.

**Scope:**

| Area | Capabilities |
|------|-------------|
| Market data | Prices, order books, trades, candles |
| Trading | Place, modify, and cancel orders; GTC, IOC, post-only TIF |
| Account data | Balances, positions, fills, open orders |
| Real-time updates | Streaming trades, order book deltas, user-specific events |
| Operational | Rate limiting, standardised error codes, request IDs |

**TypeScript SDK guarantees:**
- Full parity with REST + WebSocket functionality.
- Abstracts: authentication and request signing, nonce and timestamp management, WebSocket reconnects and resubscriptions.
- Safe default integration path for all developers.

**Developer user journey:**
1. Generate API credentials; select testnet environment.
2. Consume public market data via SDK or REST.
3. Authenticate to access account state.
4. Place and manage orders programmatically.
5. Subscribe to real-time public and private event streams.

Reference PRD: [Nexus Public API PRD v2](https://www.notion.so/Nexus-Public-API-PRD-v2-28467845c2f480d6ada2de8af609651d?pvs=21)

---

### 4. Depositing and Bridging

- No deposit or bridge function or design anywhere in the UX.

---

## 5. Non-Functional Requirements

- **NFR-001 [Latency]:** Real-time updates ≤ 250ms (target).
- **NFR-002 [UX]:** Charts load within < 1s every time. User experience is polished.
- **NFR-003 [Resilience]:** System must gracefully handle disconnections.
- **NFR-004 [Bot Uptime]:** Market simulation bots ≥ 95% uptime 24/7 (maker bots generating valid updates; taker bots responding within latency limits; no degraded state > 30 minutes).
- **NFR-005 [Compliance]:** OFAC geo-blocking enforced on all Nexus-hosted endpoints.

### Performance Requirements

| Requirement | Metric | Target | Percentile | Conditions |
|-------------|--------|--------|------------|------------|
| Matching engine throughput | Operations/second | ≥ 1,000 ops/sec | — | Sustained |
| Order ACK latency | Order submission → ACK | ≤ 2s | p95 | — |
| Order execution latency | Order submission → execution | ≤ 5s | p95 | — |
| UI freeze under load | Freeze events | 0 | — | At 1,000 ops/sec |
| UI availability | Uptime with dynamic charts and orderbook | ≥ 99.9% | — | — |
| Oracle price staleness | Index/mark price age | ≤ 2s | p95 | — |
| Chart load time | Time to render | < 1s | — | Every load |

---

## 6. Acceptance Requirements

> Spec is deprecated — acceptance criteria listed for historical reference only.

### 6a. Functional Acceptance

- [ ] **AC-001:** All six perpetual markets live and tradeable.
- [ ] **AC-002:** Equity markets (NVDA, TSLA, AAPL) unavailable on weekends.
- [ ] **AC-003:** Load test completed at 1k, 5k, and 15k concurrent users without precompile failure.
- [ ] **AC-004:** Saturation and churn tests passing without partial state application.
- [ ] **AC-005:** All three oracle providers evaluated; weekly reports generated.
- [ ] **AC-006:** TypeScript SDK published open-source with REST + WebSocket parity.

### 6b. Non-Functional Acceptance

- [ ] **AC-NFR-001:** Matching engine sustains ≥ 1,000 ops/sec under load test.
- [ ] **AC-NFR-002:** UI availability ≥ 99.9% confirmed over 7-day period.
- [ ] **AC-NFR-003:** Chart load time < 1s confirmed via UX QA.

### 6c. Documentation Acceptance

- [ ] **AC-DOC-001:** PRODUCT_MAP.md updated to reflect `Shipped` status.
- [ ] **AC-DOC-002:** SDK documented and published alongside open-source release.

### 6d. Definition of Done

*N/A — spec deprecated before delivery.*

---

## 7. Open Questions

*Recorded at time of deprecation for reference.*

- [ ] Price Step and Amount Step for all six markets — never confirmed.
- [ ] SEDA oracle documentation and API access — not collected.
- [ ] Target launch date — never confirmed.
- [ ] Engineering and Legal sign-off — pending at time of deprecation.

---

## 8. Success Metrics

| Metric | Target | Measurement Method |
|--------|--------|--------------------|
| Precompile capacity | Supports 55k+ users without failure | Load test results |
| Market availability (equities) | Weekdays only, no weekend trading | Automated market state checks |
| Oracle freshness (p95) | ≤ 2s per asset | Oracle monitoring system |
| SDK adoption (waitlist) | TBD | Developer waitlist signups |
| Matching engine throughput | ≥ 1,000 ops/sec | Load test |

---

## 9. Sign-off

| Team | Reviewer | Status | Date |
|------|----------|--------|------|
| Product | @Daniel Marin | Approved ✅ | January 13, 2026 |
| Engineering | @Stanley Jones, @Alex "Sasha" Potashnik | Pending ⏰ | — |
| Marketing | @Lauren Dresnick | Pending ⏰ | — |
| Marketing | @Daniel McGlynn | Approved ✅ | January 13, 2026 |
| Legal | @Roza Nader, @Lisa Haugh | Pending ⏰ | — |
| Security | @Ben Speckien | Pending ⏰ | — |

---

## 10. Changelog

| Date | Author | Change |
|------|--------|--------|
| 2026-03-05 | [@alecjames-dot](https://github.com/alecjames-dot) | Deprecated — missed delivery; product redesign |
| — | [@alecjames-dot](https://github.com/alecjames-dot) | Initial draft |

---

## Appendix

### Legal Risks Surfaced

- Implement a Chainalysis screening process to block bad actors — deferred to Beta.

### Sections Deferred to a Future Release

#### Gamification and Incentives

Gamification was intended to bridge prover network users with the DEX.

**Referrals:**
- Unique referral code per user.
- Referral code submission modal on DEX UI (bottom right, beneath trade placement modal).
- Referrees receive additional $10k test USDX; referrers earn 10% of referrees' points.

**Gridcrews:**
- Users select or confirm Gridcrew affiliation on portfolio page.
- Crew affiliation visible in user profile, DEX leaderboard, and shareable social cards.
- Unique Nexus username (off-chain database): alphanumeric + limited symbols, case-insensitive uniqueness, visible on leaderboards, social cards, and profile pages.
- Gridcrews website displays aggregate crew leaderboard.
- Questing and points engine via Snag: daily/weekly quests (configurable by Nexus team), point rewards, progression tracking, visible in user profile and/or sidebar.
- Points for Gridcrews activity earned through Snag quest completion only.

### Alpha V2 Release Scope (Planned — Never Shipped)

- ETH and SOL market listings.
- User analytics expansion.
