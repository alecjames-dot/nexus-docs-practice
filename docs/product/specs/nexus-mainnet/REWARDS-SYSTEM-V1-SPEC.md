# Rewards System V1 Spec

**Status:** SPECIFYING
**Owner:** [@alecjames-dot](https://github.com/alecjames-dot)
**Last Updated:** 2026-03-05
**Approved by (Product):** —
**Approved by (Engineering):** —
**Linear:** —
**Figma:** —
**Related Research:** —
**Related Specs:** —

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

Redesign the existing points system — currently infrastructure-heavy, overly complex, and inefficient — to enable an accurate, configurable points system for tracking activity ahead of Mainnet Launch, with an ERC-20 points token and Exchange tracking integration.

- **Payoff:** Efficient and accurate points tracking for Mainnet Launch. Targeting 50%+ reduction in points-related infra costs.
- **Opportunity Cost:**
  - Compute network infra cost = $15.5k/mo
  - Sam S estimates points system = 20% of this cost
  - Efficiency gains would save $1,500+/mo
  - Every day without this shipped costs $50+ in infra
- **Effort:**
  - Min: 2 weeks
  - Max: 3 weeks

### Goals of Product

- Redesign existing points system — infrastructure-heavy, overly complex, and inefficient
- Implement weekly points distribution as an ERC-20 for user engagement and efficiency
- Add Exchange tracking mechanism to the points distribution system
- Enable configurable activity tracking for the new distribution system

---

## 2. Goals & Non-Goals

**Goals:**
- Replace existing compute network points system with a composable, extensible system
- Distribute points weekly as an ERC-20 token (1:1 with points)
- Support configurable activity tracking mechanisms (compute network + DEX activity)
- Surface points data on the NexusOS leaderboard in near-real-time

**Non-Goals:**
- Mainnet token design or tokenomics (separate spec)
- Retroactive point recalculation for prior weeks
- Real-time per-trade scoring (weekly snapshot model only)

---

## 3. Summary of Features

| Feature | Description |
|---------|-------------|
| Composable points system | Weekly distribution framework supporting pluggable tracking mechanisms |
| ERC-20 points token | Transferable token distributed 1:1 with points every Friday at 12pm UTC |
| Compute Network Points | 50% of weekly points distributed proportionally to compute contribution |
| DEX Activity Points | 50% of weekly points distributed via a weighted scoring algorithm |
| NexusOS Leaderboard upgrade | Public weekly leaderboard + personal dashboard with ≤10s update delay |

---

## 4. Functional Requirements

### 4.1 Points System (Core)

- **FR-001:** The system SHALL distribute a configurable total of ~200,000 points per week.
- **FR-002:** The system SHALL aggregate user activity snapshots across the week and compute final scores at end of week.
- **FR-003:** The system SHALL publish finalized weekly allocations to user balances, the public leaderboard, and admin logs.
- **FR-004:** Points balances SHALL reset to 0 at the end of each week.
- **FR-005:** Distribution SHALL be deterministic, reproducible, and logged for auditability.
- **FR-006:** The system SHALL support configurable weighting across pluggable tracking mechanisms (e.g. compute, DEX).

### 4.2 ERC-20 Points Token

- **FR-007:** The system SHALL support a dedicated ERC-20 Points Token that is transferable.
- **FR-008:** The token SHALL be transferred to users automatically from a Nexus-owned account every Friday at 12:00pm UTC.
- **FR-009:** Token distribution SHALL be 1:1 with points allocated for that week.
- **FR-010:** Token name is TBD — pending Marketing requirements.
- **FR-011:** The dependency on Marketing requirements for token naming MUST be resolved before this feature ships.

### 4.2 Compute Network Points

- **FR-012:** The existing compute network points system SHALL be deprecated in favor of this system.
- **FR-013:** 50% of total weekly points SHALL be allocated to compute network activity (configurable per week).
- **FR-014:** Compute network points SHALL be distributed proportionally to cumulative compute contribution per user.
- **FR-015:** Compute network rewards distribution within the new system SHALL be ratified with Marketing before ship.

### 4.3 DEX Activity Points

- **FR-016:** 50% of total weekly points SHALL be allocated to DEX activity.
- **FR-017:** Weekly DEX points for a user SHALL be calculated as: `User DEX Score / Sum of All User DEX Scores × Total DEX Points`.
- **FR-018:** DEX Score SHALL be computed from four weighted components:

  **Trading Engagement (40%)**

  ```
  T = number of distinct trades executed
  D = number of distinct active trading days (≥1 trade/day)

  Engagement_raw = log(1 + T) × sqrt(D)
  Engagement_score = normalize(Engagement_raw)
  ```

  **Quality and Skill (20%)**

  ```
  Risk-Adjusted Return = Weekly PnL / max(1, Average Position Size)
  Quality_base = clamp(RAR, -Q_min, Q_max)
  Consistency_bonus = profitable_days / active_trading_days

  Quality_raw = (0.7 × Quality_base) + (0.3 × Consistency_bonus)
  Quality_score = normalize(Quality_raw)
  ```

  **Breadth (15%)**

  ```
  M = number of distinct markets traded
  A = number of asset classes traded (Crypto, Equities)

  Breadth_raw = (M / 6) × (1 + 0.5 × (A - 1))
  Breadth_score = normalize(Breadth_raw)
  ```

  **Consistency (25%)**

  ```
  Claim_days = number of days USDX claimed
  Claim_score = Claim_days / 7
  Streak_bonus = 0.05 × (longest_consecutive_active_days - 1)

  Time_raw = Claim_score + Streak_bonus
  Time_score = normalize(Time_raw)
  ```

  **Final DEX Score Formula:**

  ```
  DEX_Score =
    0.40 × Engagement_score +
    0.20 × Quality_score +
    0.15 × Breadth_score +
    0.25 × Time_score
  ```

### 4.4 NexusOS Points UX Upgrade

- **FR-019:** The NexusOS leaderboard page SHALL display a public weekly leaderboard.
- **FR-020:** The NexusOS leaderboard page SHALL display a personal dashboard showing lifetime testnet points and weekly points.
- **FR-021:** The leaderboard SHALL update in near-real-time with a maximum delay of ≤10 seconds.

---

## 5. Non-Functional Requirements

- **NFR-001:** [Auditability] All weekly distribution computations SHALL be logged and reproducible from raw activity data.
- **NFR-002:** [Correctness] Distribution SHALL be deterministic — the same input data MUST always produce the same output allocation.
- **NFR-003:** [Configurability] Points total, mechanism weighting, and scoring parameters SHALL be configurable without a code deploy.
- **NFR-004:** [Performance] Leaderboard data SHALL reflect finalized state within ≤10 seconds of publication.
- **NFR-005:** [Cost] The new system SHALL reduce points-related infra costs by ≥50% vs. the current system.

### Performance Requirements

| Requirement | Metric | Target | Percentile | Conditions |
|-------------|--------|--------|------------|------------|
| Leaderboard freshness | Time from score publish to UI display | ≤10s | p99 | Normal load |
| Weekly computation | Time to compute and publish all user scores | < 5 min | — | Full user base |
| Token transfer | ERC-20 transfer completion | < 30 min | — | Friday 12pm UTC batch |

---

## 6. Acceptance Requirements

### 6a. Functional Acceptance

- [ ] **AC-001:** Given a week of activity data, when weekly scoring runs, then each user receives a deterministic, reproducible allocation.
- [ ] **AC-002:** Given Friday 12pm UTC, when the batch runs, then ERC-20 tokens are transferred 1:1 with points to all eligible users automatically.
- [ ] **AC-003:** Given a user with compute and DEX activity, when the week closes, then their score reflects the correct weighted split (50/50 default).
- [ ] **AC-004:** Given leaderboard data is published, when a user views NexusOS, then the leaderboard reflects finalized state within ≤10 seconds.
- [ ] **AC-005:** Given the old compute network points system, when this spec ships, then the old system is deprecated and no longer running.
- [ ] **AC-006:** All FR-001 through FR-021 requirements have corresponding passing tests in CI.

### 6b. Non-Functional Acceptance

- [ ] **AC-NFR-001:** Infra cost measurement confirms ≥50% reduction in points-related compute costs vs. baseline.
- [ ] **AC-NFR-002:** Audit log review confirms all weekly distributions are reproducible from raw inputs.
- [ ] **AC-NFR-003:** Security review signed off by @Ben before ship.

### 6c. Documentation Acceptance

- [ ] **AC-DOC-001:** `PRODUCT_MAP.md` updated to reflect `SHIPPED` status.
- [ ] **AC-DOC-002:** `CLAUDE.md` updated if any invariants or module boundaries changed.
- [ ] **AC-DOC-003:** Any ADRs made during implementation are merged and linked above.

### 6d. Definition of Done

All AC items above are checked AND:
- [ ] Feature is deployed to production.
- [ ] ERC-20 token name confirmed with Marketing and reflected in the deployed contract.
- [ ] On-call runbook updated to cover weekly batch failure modes.
- [ ] Spec status updated to `SHIPPED` in this file and `PRODUCT_MAP.md`.

---

## 7. Open Questions

- [ ] What is the ERC-20 Points Token name? — Owner: Lauren (Marketing) — Resolve by: TBD
- [ ] Ratify compute network rewards distribution weighting with Marketing — Owner: [@alecjames-dot](https://github.com/alecjames-dot) — Resolve by: TBD
- [ ] Confirm `Q_min` and `Q_max` clamp values for Quality scoring — Owner: Engineering — Resolve by: before APPROVED

---

## 8. Success Metrics

| Metric | Target | Measurement Method |
|--------|--------|--------------------|
| Infra cost reduction | ≥50% reduction in points-related costs | Compare monthly infra bills pre/post ship |
| Weekly distribution accuracy | 100% of eligible users receive correct allocation | Audit log reconciliation |
| Leaderboard latency | ≤10s p99 | Synthetic monitoring |
| Token transfer success rate | ≥99.9% of weekly transfers complete | On-chain tx monitoring |

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
