# Nexus — AI Agent Briefing

## What Is Nexus

Nexus is a layer 1 blockchain built around a zkVM (zero-knowledge virtual machine) that generates validity proofs for every state transition, enabling provably correct financial applications without trusting an operator. Its mission is "verifiable finance" — improving the programmability, composability, and verifiability of financial primitives onchain. The protocol ships a decentralized prover network and USDX, a native yield-bearing stablecoin with a target yield of ~3.4% sourced exclusively from on-chain protocol revenue.

---

## Monorepo Map

| Directory | Contents |
|-----------|----------|
| `docs/product/specs/` | Feature specs, organized by product (nexus-mainnet, nexus-exchange, usdx, zkvm) |
| `docs/ai-context/` | GLOSSARY.md, CONSTRAINTS.md — always read these before generating code or specs |
| `docs/user-research-insights/` | User research findings |
| `docs/product/` | VISION.md, ROADMAP.md |
| `.github/` | PR template with spec checklist |

---

## Key Invariants — Never Violate These

These are non-negotiable. Any code, spec, or design that contradicts them must be flagged immediately.

1. **USDX yield source**: USDX yield is always and only sourced from on-chain protocol revenue. It must never derive from new token issuance, treasury drawdowns, or off-chain yield sources.

2. **Proof input privacy**: Proof generation must never expose user input data to the prover network. Provers receive only the public inputs and the proof task; raw user transactions are never transmitted.

3. **Yield determinism**: Yield calculations must be deterministic and fully auditable on-chain. Any yield calculation that depends on off-chain state or non-reproducible inputs is prohibited.

---

## Before Writing Any Code

Read the relevant spec in `docs/product/specs/` and check [PRODUCT_MAP.md](./PRODUCT_MAP.md) for current status. Do not build to a spec with `DRAFT` status without explicit team sign-off. Do not build to a `DEPRECATED` spec under any circumstances.

If a spec does not exist for what you are building, write one before writing code.

---

## Current Focus Areas

_To be updated by the product team._

---

## Key Reference Files

- [PRODUCT_MAP.md](./PRODUCT_MAP.md) — canonical status of all specs
- [GLOSSARY.md](./docs/ai-context/GLOSSARY.md) — definitions for all domain terms
- [CONSTRAINTS.md](./docs/ai-context/CONSTRAINTS.md) — non-negotiable constraints by category
