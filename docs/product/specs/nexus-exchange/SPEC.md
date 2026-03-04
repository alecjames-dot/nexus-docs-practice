# Nexus Exchange Spec

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

## 1. Problem Statement

One paragraph. Why does this exist? What breaks without it?

---

## 2. Goals & Non-Goals

**Goals:** What success looks like, in plain language.

**Non-Goals:** Explicit scope boundaries. This is as important as the goals.

---

## 3. User Stories

> As a [persona], I want [action] so that [outcome].

List 2–5 stories maximum. If you have more than 5, the feature scope is too large — split it.

---

## 4. Functional Requirements

- **FR-001:** The system SHALL [behavior].
- **FR-002:** The system SHALL [behavior].
- **FR-003:** The system SHOULD [behavior].

---

## 5. Non-Functional Requirements

- **NFR-001:** [Performance] The system SHALL [metric at percentile].
- **NFR-002:** [Security] The system SHALL NOT [prohibited behavior].
- **NFR-003:** [Availability] The system SHALL maintain [uptime target].

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
- [ ] **AC-DOC-003:** CHANGELOG entry added with date and summary.
- [ ] **AC-DOC-004:** Any ADRs made during implementation are merged and linked above.

### 6d. Definition of Done

All AC items above are checked AND:
- [ ] Feature is behind a flag OR deployed to production (specify which).
- [ ] On-call runbook updated if this feature introduces new failure modes.
- [ ] Spec status updated to `Shipped` in this file.

---

## 7. Technical Design Notes

High-level approach. Links to detailed RFCs or ADRs for deeper dives.

---

## 8. Open Questions

- [ ] [Question] — Owner: @handle — Resolve by: YYYY-MM-DD

---

## 9. Success Metrics

| Metric | Target | Measurement Method |
|--------|--------|--------------------|
| [metric] | [target] | [how to measure] |

---

## 10. Changelog

| Date | Author | Change |
|------|--------|--------|
| YYYY-MM-DD | @handle | Initial draft |
