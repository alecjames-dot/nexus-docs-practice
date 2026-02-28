# Product Map

**Last audited:** 2026-02-27 | **Owner:** @alec | **Status legend below**

---

## Status Legend

| Badge | Meaning |
|-------|---------|
| `DRAFT` | Work in progress. Not approved for implementation. Do not build to this. |
| `REVIEW` | Complete draft under active review. May have open questions. |
| `APPROVED` | Approved for implementation. Stable spec. |
| `SHIPPED` | Feature is live in production. Spec is now a historical record. |
| `DEPRECATED` | Superseded or abandoned. Do not reference or build to this. |

---

## Foundation

| Document | Owner | Description |
|----------|-------|-------------|
| [VISION.md](docs/product/VISION.md) | @alec | Mission, pillars, north star metric |
| [ROADMAP.md](docs/product/ROADMAP.md) | @alec | Phase-by-phase delivery plan |
| [ONBOARDING.md](docs/engineering/ONBOARDING.md) | @alec | First-week guide for new team members |
| [CONTRIBUTING.md](docs/engineering/CONTRIBUTING.md) | @alec | PR process, branch conventions, ADR workflow |

---

## AI Context

| Document | Owner | Description |
|----------|-------|-------------|
| [CLAUDE.md](CLAUDE.md) | @alec | AI agent briefing — invariants, monorepo map, current focus |
| [GLOSSARY.md](docs/ai-context/GLOSSARY.md) | @alec | Domain term definitions |
| [CONSTRAINTS.md](docs/ai-context/CONSTRAINTS.md) | @alec | Non-negotiable constraints by category |

---

## Active Specs

### Core Protocol

| Spec | Owner | Status | Last Updated |
|------|-------|--------|--------------|
| [zkVM Execution Environment](docs/product/specs/zkvm/SPEC.md) | @marcus | `APPROVED` | 2025-12-01 |
| [Prover Network](docs/product/specs/prover-network/SPEC.md) | @priya | `APPROVED` | 2026-01-08 |
| [Prover Slashing v1](docs/product/specs/prover-network/SLASHING-SPEC.md) | @priya | `DRAFT` | 2026-02-10 |

### USDX Stablecoin

| Spec | Owner | Status | Last Updated |
|------|-------|--------|--------------|
| [USDX Core](docs/product/specs/usdx/SPEC.md) | @alec | `APPROVED` | 2025-12-15 |
| [USDX Variable Yield](docs/product/specs/usdx/YIELD-SPEC.md) | @alec | `SHIPPED` | 2026-01-20 |
| [USDX Compliance Layer](docs/product/specs/usdx/COMPLIANCE-SPEC.md) | @alec | `REVIEW` | 2026-02-01 |

### Privacy

| Spec | Owner | Status | Last Updated |
|------|-------|--------|--------------|
| [ERC-5564 Stealth Addresses](docs/product/specs/privacy/erc5564/SPEC.md) | @marcus | `APPROVED` | 2026-01-15 |

### Governance

| Spec | Owner | Status | Last Updated |
|------|-------|--------|--------------|
| [On-Chain Governance](docs/product/specs/governance/SPEC.md) | @alec | `DRAFT` | 2026-02-15 |

---

## Architecture Decision Records

| ADR | Status | Date | Summary |
|-----|--------|------|---------|
| [ADR-001: zkVM Proof Strategy](docs/architecture/decisions/ADR-001-zkvm-proof-strategy.md) | Accepted | 2025-10-14 | Recursive SNARK for proof aggregation |
| [ADR-002: Variable Yield Mechanism](docs/architecture/decisions/ADR-002-variable-yield-mechanism.md) | Accepted | 2025-11-03 | On-chain revenue index replaces fixed 3.4% rate |
| [ADR-003: USDX Burn Authority](docs/architecture/decisions/ADR-003-usdx-burn-authority.md) | Accepted | 2025-11-21 | Burn restricted to governance; resolves slashing conflict |
| [ADR-004: Prover Slashing Scope](docs/architecture/decisions/ADR-004-prover-slashing-scope.md) | Accepted | 2026-01-08 | v1 slashing = liveness only; fault proofs deferred to v2 |
| [ADR-005: ERC-5564 over Custom Stealth](docs/architecture/decisions/ADR-005-erc5564-over-custom.md) | Accepted | 2026-01-15 | Adopted ERC-5564 standard; deprecated custom scheme |

---

## Open Drafts

| Spec | Owner | Blocking Question |
|------|-------|-------------------|
| [Prover Slashing v1](docs/product/specs/prover-network/SLASHING-SPEC.md) | @priya | Penalty percentages and grace period not finalized |
| [On-Chain Governance](docs/product/specs/governance/SPEC.md) | @alec | Token model not yet decided |

---

## Deprecated

| Document | Deprecated | Reason |
|----------|-----------|--------|
| ~~[Custom Stealth Address Scheme](docs/product/specs/privacy/_deprecated-custom-stealth/SPEC.md)~~ | 2026-01-15 | Superseded by ADR-005; replaced by ERC-5564 |

---

## Templates

| Template | Use For |
|----------|---------|
| [Spec Template](docs/product/specs/_template/SPEC.md) | New feature specs |
| [ADR Template](docs/architecture/decisions/_template/ADR-000.md) | Architecture decision records |
