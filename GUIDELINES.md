# Documentation System Guidelines

**Owner:** @alec | **Last updated:** 2026-03-02

This document explains how to work within the Nexus docs system — how documents are structured, how to add or update content, and the conventions that keep things consistent.

---

## Directory Structure

```
nexus-docs-practice/
├── README.md                   # Repo overview and quick start
├── GUIDELINES.md               # This file
├── PRODUCT_MAP.md              # Canonical index of all documents and their status
├── LAUNCH_CALENDAR.md          # Product launch dates and key milestones
├── CLAUDE.md                   # AI agent briefing — read before using AI tooling
├── CHANGELOG.md                # Record of significant doc changes
└── docs/
    ├── product/
    │   ├── VISION.md           # Mission, pillars, north star metric
    │   ├── ROADMAP.md          # Phase-by-phase delivery plan
    │   ├── personas/
    │   │   └── PERSONAS.md     # User personas for spec user stories
    │   └── specs/              # Feature specs organized by domain
    │       ├── _template/
    │       ├── usdx/
    │       ├── zkvm/
    │       ├── prover-network/
    │       ├── privacy/
    │       └── governance/
    ├── research/
    │   ├── user-research/
    │   │   └── USER_RESEARCH_INSIGHTS.md
    │   ├── ux-research/
    │   ├── competitive-research/
    │   └── differentiation-research/
    ├── architecture/
    │   └── decisions/          # Architecture Decision Records (ADRs)
    └── ai-context/
        ├── GLOSSARY.md
        └── CONSTRAINTS.md
```

---

## Core Principles

**1. Status is truth.**
Every document has a status. The status in `PRODUCT_MAP.md` is the canonical source. Do not build to a `DRAFT` spec. Do not reference a `DEPRECATED` spec.

**2. Specs before code.**
If a spec does not exist for what you are building, write one first. No spec = no build.

**3. ADRs are immutable.**
Once an Architecture Decision Record is accepted, it is a historical record and cannot be edited retroactively. Supersede it with a new ADR instead.

**4. Keep the map current.**
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
2. Place it in the correct domain folder (e.g., `docs/product/specs/usdx/`).
3. Set status to `DRAFT` in the file header.
4. Add it to `PRODUCT_MAP.md` under the correct product section.
5. Do not change status to `APPROVED` without team sign-off.

**Every spec must include:**
- Problem statement
- User stories referencing personas from `PERSONAS.md`
- Invariants it must not violate (cross-reference `CONSTRAINTS.md`)
- Open questions and blocking decisions

---

## Writing an ADR

1. Copy `docs/architecture/decisions/_template/ADR-000.md`.
2. Number it sequentially (e.g., `ADR-006-your-title.md`).
3. Status starts as `PROPOSED`, moves to `ACCEPTED` or `REJECTED`.
4. Once accepted, the document is frozen — open a new ADR to supersede it.
5. Add it to the ADR table in `PRODUCT_MAP.md`.

---

## Research Documents

All research lives under `docs/research/`. There are four sections:

| Section | Path | Use For |
|---------|------|---------|
| User Research | `docs/research/user-research/` | Interview findings, survey data, usability insights |
| UX Research | `docs/research/ux-research/` | Interaction patterns, flows, usability testing |
| Competitive Research | `docs/research/competitive-research/` | Competitor analysis, market landscape |
| Differentiation Research | `docs/research/differentiation-research/` | Positioning, moats, unique value props |

Research docs do not go through the spec status lifecycle. Use a simple header block:

```
# [Title]
Date: YYYY-MM-DD | Author: @name | Type: [Interview / Survey / Analysis]
```

---

## Using AI Tooling

Before using Claude or any AI agent on this repo:

1. Read `CLAUDE.md` — it contains invariants the AI must never violate.
2. Point the agent at `PRODUCT_MAP.md` for status context.
3. Point the agent at `docs/ai-context/GLOSSARY.md` for domain terminology.
4. Point the agent at `docs/ai-context/CONSTRAINTS.md` for non-negotiable rules.

AI agents must not generate code or specs for `DRAFT` documents without explicit team sign-off.

---

## Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| Specs | `SCREAMING-KEBAB.md` | `YIELD-SPEC.md` |
| ADRs | `ADR-NNN-short-title.md` | `ADR-005-erc5564-over-custom.md` |
| Research docs | `SCREAMING-KEBAB.md` | `USER_RESEARCH_INSIGHTS.md` |
| Directories | `kebab-case` | `prover-network/` |

---

## Updating This System

Changes to the doc system itself (folder structure, conventions, status lifecycle) require:
1. An update to this `GUIDELINES.md`.
2. An update to `CLAUDE.md` if the monorepo map changes.
3. A note in `CHANGELOG.md`.
