# Nexus Docs

Product documentation for the Nexus protocol — a spot and perpetual futures exchange where every trade is provable. The purpose-built Exchange blockchain generates validity proofs for every state transition, so execution can be verified without trusting an operator.

**Owner:** @alec | **Last updated:** 2026-03-04

---

## Products

- **Nexus Exchange** — Spot and perpetual futures exchange; CEX-grade performance with non-custodial, trustless execution
- **Exchange Blockchain** — Purpose-built Exchange blockchain; every state transition is proven
- **zkVM** — Verifiable execution infrastructure; every trade is provable
- **USDX** — The Exchange's native margin currency

---

## Directory Structure

```
nexus-docs-practice/
├── README.md                   # This file — repo overview and doc system guidelines
├── PRODUCT_MAP.md              # Canonical index of all documents and their status
├── CLAUDE.md                   # AI agent briefing — read before using AI tooling
└── docs/
    ├── product/
    │   ├── ROADMAP.md          # Phase-by-phase delivery plan
    │   └── specs/              # Feature specs organized by product
    │       ├── _template/
    │       │   ├── SPEC.md
    │       │   └── PROJECT_PLAN.md
    │       ├── nexus-mainnet/
    │       ├── nexus-exchange/
    │       ├── usdx/
    │       └── zkvm/
    ├── user-research-insights/
    │   └── USER_RESEARCH_INSIGHTS.md
    └── ai-context/
        └── GLOSSARY.md
```

---

## Quick Start

1. Check `PRODUCT_MAP.md` for the current status of any document before referencing it.
2. Read `CLAUDE.md` before using AI tooling on this repo.
3. Read the relevant spec in `docs/product/specs/` before building anything.

---

## Core Principles

**1. Status is truth.**
Every document has a status. The status in `PRODUCT_MAP.md` is the canonical source. Do not build to a `DRAFT` spec. Do not reference a `DEPRECATED` spec.

**2. Specs before code.**
If a spec does not exist for what you are building, write one first. No spec = no build.

**3. Keep the map current.**
Any time you add, move, or deprecate a document, update `PRODUCT_MAP.md` in the same PR/commit.

---

## Status Lifecycle

```
BACKLOG → SCOPING → SCHEDULING → DRAFT → APPROVED → STARTED → SHIPPED
                                                              ↓
                                                         DEPRECATED
```

| Status | Meaning |
|--------|---------|
| `BACKLOG` | Ideas not yet shaped. Not in Linear. |
| `SCOPING` | Being sized and estimated. |
| `SCHEDULING` | Prioritized; resources committed. In Linear::Planned. |
| `DRAFT` | Work in progress. Not approved. Do not build to this. |
| `APPROVED` | Stable. Approved for implementation. |
| `STARTED` | In active development. In Linear::In Progress. |
| `SHIPPED` | Live in production. Doc is now a historical record. |
| `DEPRECATED` | Superseded or abandoned. Do not reference. |

---

## Writing a Spec

1. Copy `docs/product/specs/_template/SPEC.md`.
2. Place it in the correct product folder (e.g., `docs/product/specs/usdx/`).
3. Set status to `DRAFT` in the file header.
4. Add it to `PRODUCT_MAP.md` under the correct product section.
5. Do not change status to `APPROVED` without team sign-off.

**Approval is recorded in the spec itself.** When a spec is ready for approval, both the product lead and engineering lead must add their handle and date to the `Approved by` fields in the spec header. A spec is not `APPROVED` until both fields are filled. Approval happens via PR — the approving engineer and product lead both approve the PR, and the status field is updated to `APPROVED` in the same commit.

**Every spec must include:**
- Problem statement
- User stories
- Invariants it must not violate
- Open questions and blocking decisions

### Spec → Linear Handoff

Once a spec reaches `APPROVED` status, the project lead converts the functional requirements into Linear tickets. Conventions:

- Every Linear ticket created from a spec must include a link to the spec file in the ticket description.
- The spec is the source of truth. If a requirement changes, the spec is updated first — then the ticket is updated to match.
- The spec `Linear:` header field must be updated with the Linear project link before or at the time tickets are created.
- Ticket granularity is at the discretion of the project lead, but each ticket should map to one or more Functional Requirements (FR-NNN) from the spec.
- When all tickets in the Linear project are complete, the spec owner verifies the Acceptance Requirements (Section 6) before marking the spec `SHIPPED`.

---

## The Project Plan

Every product has a paired `PROJECT_PLAN.md` alongside its `SPEC.md`. The project plan is the cross-team sequencing document — it tracks workstreams, dependencies, milestones, and risks that span beyond engineering. The engineering task table within it is a sequencing reference only; the authoritative task list lives in Linear.

**Ownership:**
- The project plan as a whole is owned by the product lead.
- The Engineering Tasks table is owned and maintained by the project lead and spec owner.
- Non-engineering workstream rows are owned by the product lead.

**When to create one:** At the same time as the spec, when the work enters `SCOPING` status. It does not need to be complete when the spec is `DRAFT` — but it must be populated before the spec reaches `APPROVED`.

---

## Research Documents

User research insights live under `docs/user-research-insights/`. Research docs link to the specs they informed and do not go through the spec status lifecycle. Use a simple header block:

```
# [Title]
Date: YYYY-MM-DD | Author: @name | Type: [Interview / Survey / Analysis]
```

---

## Using AI Tooling

Before using Claude or any AI agent on this repo:

1. Read `CLAUDE.md` — it contains invariants the AI must never violate.
2. Point the agent at `PRODUCT_MAP.md` for status context.
3. Point the agent at `GLOSSARY.md` for domain terminology.

AI agents must not generate code or specs for `DRAFT` documents without explicit team sign-off.

---

## Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| Specs | `SCREAMING-KEBAB.md` | `YIELD-SPEC.md` |
| Research docs | `SCREAMING-KEBAB.md` | `USER_RESEARCH_INSIGHTS.md` |
| Directories | `kebab-case` | `nexus-mainnet/` |

---

## Updating This System

Changes to the doc system itself (folder structure, conventions, status lifecycle) require:
1. An update to this `README.md`.
2. An update to `CLAUDE.md` if the monorepo map changes.
