# Product Map

**Last audited:** 2026-03-05 | **Owner:** [@alecjames-dot](https://github.com/alecjames-dot) | 

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

| Spec | Product | Estimation | `BACKLOG` | `DRAFT` | `SCOPING` | `SPECIFYING` | `APPROVED` | `SCHEDULING` | `STARTED` | `SHIPPED` |
|------|---------|------------|:---------:|:-------:|:---------:|:------------:|:----------:|:------------:|:---------:|:---------:|
| [Mainnet V1](docs/product/specs/nexus-mainnet/SPEC.md) | Exchange Blockchain | Min: / Max: | | | | | | | ● | |
| [Rewards System V1](docs/product/specs/nexus-mainnet/REWARDS-SYSTEM-V1-SPEC.md) | Exchange Blockchain | Min: 2w / Max: 3w | | | | ● | | | | |
| Exchange V1 | Nexus Exchange | Min: / Max: | | ● | | | | | | |
| [USDX V1](docs/product/specs/usdx/SPEC.md) | USDX | Min: / Max: | | | | | | | ● | |
| [USDX V2](docs/product/specs/usdx/USDX-V2-SPEC.md) | USDX | Min: / Max: | | | | | | ● | | |
| zkVM V1 | zkVM | Min: / Max: | | ● | | | | | | |
| [Proof of Reserves V1](docs/product/specs/zkvm/PROOF-OF-RESERVES-V1-SPEC.md) | zkVM | Min: 3w / Max: 5w | | | | ● | | | | |
| [Genesis ICO](docs/product/specs/ico/SPEC.md) | ICO | Min: / Max: | | | | | | | ● | |
| [TGE — Mint](docs/product/specs/tge/PROJECT_PLAN.md) | TGE | Min: / Max: | | | | | | | ● | |

---

## Product Context

| Document | Owner | Description |
|----------|-------|-------------|
| nexus/strategy/ | @Daniel | Mission and north star |
| [ROADMAP.md](docs/product/ROADMAP.md) | @Gordon | Phase-by-phase delivery plan |
| [README.md](README.md) | [@alecjames-dot](https://github.com/alecjames-dot) | Repo overview, doc system conventions, status lifecycle, naming rules |

---

## Active Specs

### Nexus Mainnet

| Spec | Owner | Status | Last Updated | Project Plan |
|------|-------|--------|--------------|--------------|
| [SPEC.md](docs/product/specs/nexus-mainnet/SPEC.md) | [@alecjames-dot](https://github.com/alecjames-dot) | STARTED | 2026-03-04 | [PROJECT_PLAN.md](docs/product/specs/nexus-mainnet/PROJECT_PLAN.md) |
| [REWARDS-SYSTEM-V1-SPEC.md](docs/product/specs/nexus-mainnet/REWARDS-SYSTEM-V1-SPEC.md) | [@alecjames-dot](https://github.com/alecjames-dot) | SPECIFYING | 2026-03-05 | — |

### USDX

| Spec | Owner | Status | Last Updated | Project Plan |
|------|-------|--------|--------------|--------------|
| [V1 SPEC.md](docs/product/specs/usdx/SPEC.md) | [@alecjames-dot](https://github.com/alecjames-dot) | STARTED | 2026-03-04 | [PROJECT_PLAN.md](docs/product/specs/usdx/PROJECT_PLAN.md) |
| [V2 USDX-V2-SPEC.md](docs/product/specs/usdx/USDX-V2-SPEC.md) | [@alecjames-dot](https://github.com/alecjames-dot) | SCHEDULING | 2026-03-05 | — |

### ICO

| Spec | Owner | Status | Last Updated | Project Plan |
|------|-------|--------|--------------|--------------|
| [SPEC.md](docs/product/specs/ico/SPEC.md) | @gordon | STARTED | 2026-03-05 | [PROJECT_PLAN.md](docs/product/specs/ico/PROJECT_PLAN.md) |

### TGE

| Spec | Owner | Status | Last Updated | Project Plan |
|------|-------|--------|--------------|--------------|
| — | [@alecjames-dot](https://github.com/alecjames-dot) | STARTED | 2026-01-13 | [PROJECT_PLAN.md](docs/product/specs/tge/PROJECT_PLAN.md) |

### zkVM

| Spec | Owner | Status | Last Updated | Project Plan |
|------|-------|--------|--------------|--------------|
| [PROOF-OF-RESERVES-V1-SPEC.md](docs/product/specs/zkvm/PROOF-OF-RESERVES-V1-SPEC.md) | [@alecjames-dot](https://github.com/alecjames-dot) | SPECIFYING | 2026-03-05 | — |

---

## Research

| Document | Owner | Description |
|----------|-------|-------------|
| [User Research Insights](docs/research/user-research-insights/USER_RESEARCH_INSIGHTS.md) | [@alecjames-dot](https://github.com/alecjames-dot) | Interview findings, survey data, usability insights |
| [Round 1 — 2 Institutions, 8 Retail Users](docs/research/user-research-insights/ROUND-1-2-INSTITUTIONS-8-RETAIL-USERS.md) | [@alecjames-dot](https://github.com/alecjames-dot)  | MMs, power users, crypto builders, crypto researchers |
| [Scaling Projections for Nexus Mainnet](docs/research/SCALING-PROJECTIONS-NEXUS-MAINNET.md) | [@alecjames-dot](https://github.com/alecjames-dot)  | — |
| [Scaling Projections for Nexus Mainnet — One-Pager](docs/research/SCALING-PROJECTIONS-NEXUS-MAINNET-ONE-PAGER.md) | [@alecjames-dot](https://github.com/alecjames-dot)  | — |

---

## Open Drafts

| Spec | Owner | Blocking Question |
|------|-------|-------------------|
| — | — | — |

---

## Deprecated

| Document | Deprecated | Reason |
|----------|-----------|--------|
| [Nexus DEX Alpha V1](docs/product/specs/nexus-exchange/DEX-ALPHA-SPEC.md) | 2026-03-04 | Missed delivery — product redesign |
| [Nexus DEX Alpha V2](docs/product/specs/nexus-exchange/DEX-ALPHA-V2-SPEC.md) | 2026-03-05 | Missed delivery — product redesign |
| [USDX Pre-Deposit Campaign](docs/product/specs/usdx/USDX-PRE-DEPOSIT-CAMPAIGN-SPEC.md) | 2026-03-05 | — |

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
| [CLAUDE.md](CLAUDE.md) | [@alecjames-dot](https://github.com/alecjames-dot) | AI agent briefing — context acquisition instructions and invariants |
| [GLOSSARY.md](GLOSSARY.md) | [@alecjames-dot](https://github.com/alecjames-dot) | Domain term definitions |
