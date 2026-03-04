# Exchange Blockchain Spec

**Status:** DRAFT | SCOPING | SCHEDULING | APPROVED | STARTED | SHIPPED | DEPRECATED
**Owner:** @handle
**Last Updated:** YYYY-MM-DD
**Approved by (Product):** —
**Approved by (Engineering):** —
**Linear:** [Project Name](https://linear.app/nexus/project/...)
**Figma:** [Design File Name](https://figma.com/file/...)
**Related Research:** —
**Related Specs:** —

---

## 1. Context

### Investment Case

Why is this worth building? What outcome does it drive and for whom?

### Opportunity Cost

What are we not building by doing this? What is the cost of delay?

### Effort

High-level size estimate: S / M / L / XL. Note key dependencies or constraints that affect scope.

---

## 2. Goals & Non-Goals

**Goals:** What success looks like, in plain language.

**Non-Goals:** Explicit scope boundaries. This is as important as the goals.

---

## 3. Summary of Features

High-level overview of the capabilities this spec delivers.

| Feature | Description |
|---------|-------------|
| [Feature name] | [One-line description] |
| [Feature name] | [One-line description] |

---

## 4. Functional Requirements

- **FR-001:** The system SHALL [behavior].
- **FR-002:** The system SHALL [behavior].
- **FR-003:** The system SHOULD [behavior].

---

## 5. Non-Functional Requirements

- **NFR-001:** [Security] The system SHALL NOT [prohibited behavior].
- **NFR-002:** [Availability] The system SHALL maintain [uptime target].

### Performance Requirements

| Requirement | Metric | Target | Percentile | Conditions |
|-------------|--------|--------|------------|------------|
| Latency | [e.g. API response time] | < X ms | p99 | [e.g. under Y concurrent users] |
| Throughput | [e.g. transactions per second] | X TPS | — | steady state |
| Error rate | [e.g. failed requests] | < X% | — | under peak load |

---

## 6. Acceptance Requirements

> Criteria that must be demonstrably true for this spec to move Approved → Shipped.

### 6a. Functional Acceptance

- [ ] **AC-001:** Given [precondition], when [action], then [verifiable outcome].
- [ ] **AC-002:** Given [precondition], when [action], then [verifiable outcome].
- [ ] **AC-003:** All FR-00x requirements have corresponding passing tests in CI.

### 6b. Non-Functional Acceptance

- [ ] **AC-NFR-001:** Load test confirms [NFR-001 metric] under [test conditions].
- [ ] **AC-NFR-002:** Security review signed off by @handle on [date or "before ship"].

### 6c. Documentation Acceptance

- [ ] **AC-DOC-001:** PRODUCT_MAP.md updated to reflect `Shipped` status.
- [ ] **AC-DOC-002:** CLAUDE.md updated if any invariants or module boundaries changed.
- [ ] **AC-DOC-003:** Any ADRs made during implementation are merged and linked above.

### 6d. Definition of Done

All AC items above are checked AND:
- [ ] Feature is behind a flag OR deployed to production (specify which).
- [ ] On-call runbook updated if this feature introduces new failure modes.
- [ ] Spec status updated to `Shipped` in this file.

---

## 7. Open Questions

- [ ] [Question] — Owner: @handle — Resolve by: YYYY-MM-DD

---

## 8. Success Metrics

| Metric | Target | Measurement Method |
|--------|--------|--------------------|
| [metric] | [target] | [how to measure] |

---

## 9. Sign-off

| Team | Reviewer | Status | Date |
|------|----------|--------|------|
| Product | @handle | Pending | — |
| Engineering | @handle | Pending | — |
| Security | @handle | Pending | — |
| Design | @handle | Pending | — |
| Legal / Compliance | @handle | Pending | — |

---

## 10. Changelog

| Date | Author | Change |
|------|--------|--------|
| YYYY-MM-DD | @handle | Initial draft |
