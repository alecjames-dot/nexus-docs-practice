# Product Map

**Last audited:** 2026-03-05 | **Owner:** @alec | **Status legend below**

---

## Status Legend

| Badge | Meaning |
|-------|---------|
| `BACKLOG` | Ideas for initiatives to be shaped and validated. Not in Linear. |
| `DRAFT` | Work in progress. Not approved for implementation. Do not build to this. |
| `SCOPING` | Initiative is being estimated at a high level to determine where it should land on the roadmap and determine trade-offs. |
| `SPECIFYING` | Spec is being written and refined. Sub-stages: Detailed Requirements → In Review → Signed Off → Detailed Estimation. |
| `APPROVED` | Approved for implementation. Stable spec. |
| `SCHEDULING` | Initiative is prioritized on the roadmap and resource capacity committed to by engineering and other dependent teams. In Linear::Planned. |
| `STARTED` | Work has started. In Linear::In Progress. |
| `SHIPPED` | Feature is live in production. Spec is now a historical record. |
| `DEPRECATED` | Superseded or abandoned. Do not reference or build to this. |

---

## Product Planning Board

| Spec | Product | `BACKLOG` | `DRAFT` | `SCOPING` | `SPECIFYING` | `APPROVED` | `SCHEDULING` | `STARTED` | `SHIPPED` |
|------|---------|:---------:|:-------:|:---------:|:------------:|:----------:|:------------:|:---------:|:---------:|
| [Mainnet V1](docs/product/specs/nexus-mainnet/SPEC.md) | Exchange Blockchain | | | | | | | ● | |
| [Exchange V1](docs/product/specs/nexus-exchange/SPEC.md) | Nexus Exchange | | ● | | | | | | |
| [USDX V1](docs/product/specs/usdx/SPEC.md) | USDX | | | | | | | ● | |
| [USDX V2](docs/product/specs/usdx/USDX-V2-SPEC.md) | USDX | | | | | | ● | | |
| [zkVM V1](docs/product/specs/zkvm/SPEC.md) | zkVM | | ● | | | | | | |
| [Genesis ICO](docs/product/specs/ico/SPEC.md) | ICO | | ● | | | | | | |

---

## Product Context

| Document | Owner | Description |
|----------|-------|-------------|
| nexus/strategy/ | @Daniel | Mission and north star |
| [ROADMAP.md](docs/product/ROADMAP.md) | @Gordon | Phase-by-phase delivery plan |
| [README.md](README.md) | @alec | Repo overview, doc system conventions, status lifecycle, naming rules |

---

## Active Specs

**Intention here is to have ratified, approved specs that are ready for development**

### Nexus Mainnet

| Spec | Owner | Status | Last Updated | Project Plan |
|------|-------|--------|--------------|--------------|
| [SPEC.md](docs/product/specs/nexus-mainnet/SPEC.md) | @alec | STARTED | 2026-03-04 | [PROJECT_PLAN.md](docs/product/specs/nexus-mainnet/PROJECT_PLAN.md) |

### Nexus Exchange

| Spec | Owner | Status | Last Updated | Project Plan |
|------|-------|--------|--------------|--------------|
| [SPEC.md](docs/product/specs/nexus-exchange/SPEC.md) | — | DRAFT | 2026-03-03 | [PROJECT_PLAN.md](docs/product/specs/nexus-exchange/PROJECT_PLAN.md) |

### USDX

| Spec | Owner | Status | Last Updated | Project Plan |
|------|-------|--------|--------------|--------------|
| [V1 SPEC.md](docs/product/specs/usdx/SPEC.md) | @alec | STARTED | 2026-03-04 | [PROJECT_PLAN.md](docs/product/specs/usdx/PROJECT_PLAN.md) |
| [V2 USDX-V2-SPEC.md](docs/product/specs/usdx/USDX-V2-SPEC.md) | @alec | SCHEDULING | 2026-03-05 | — |

### ICO

| Spec | Owner | Status | Last Updated | Project Plan |
|------|-------|--------|--------------|--------------|
| [SPEC.md](docs/product/specs/ico/SPEC.md) | @gordon | DRAFT | 2026-01-11 | — |

### zkVM

| Spec | Owner | Status | Last Updated | Project Plan |
|------|-------|--------|--------------|--------------|
| [SPEC.md](docs/product/specs/zkvm/SPEC.md) | — | DRAFT | 2026-03-03 | [PROJECT_PLAN.md](docs/product/specs/zkvm/PROJECT_PLAN.md) |

---

## Research

| Document | Owner | Description |
|----------|-------|-------------|
| [User Research Insights](docs/user-research-insights/USER_RESEARCH_INSIGHTS.md) | @alec | Interview findings, survey data, usability insights |

---

## Open Drafts

**Intention here is to have specs in the 'scoping' and 'specified' statuses, for a lead engineer to estimate etc.**

| Spec | Owner | Blocking Question |
|------|-------|-------------------|
| — | — | — |

---

## Deprecated

| Document | Deprecated | Reason |
|----------|-----------|--------|
| [Nexus DEX Alpha V1](docs/product/specs/nexus-exchange/DEX-ALPHA-SPEC.md) | 2026-03-04 | Missed delivery — product redesign |
| [Nexus DEX Alpha V2](docs/product/specs/nexus-exchange/DEX-ALPHA-V2-SPEC.md) | 2026-03-05 | Missed delivery — product redesign |

---

## Templates

| Template | Use For |
|----------|---------|
| [Spec Template](docs/product/specs/_template/SPEC.md) | New feature specs |
| [Project Plan Template](docs/product/specs/_template/PROJECT_PLAN.md) | Per-product project plans |

---

## AI Context

| Document | Owner | Description |
|----------|-------|-------------|
| [CLAUDE.md](CLAUDE.md) | @alec | AI agent briefing — context acquisition instructions and invariants |
| [GLOSSARY.md](GLOSSARY.md) | @alec | Domain term definitions |
