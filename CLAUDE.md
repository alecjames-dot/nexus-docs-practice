# Nexus — AI Agent Briefing

## What Is Nexus

Nexus is a layer 1 blockchain built around a zkVM (zero-knowledge virtual machine) that generates validity proofs for every state transition, enabling provably correct financial applications without trusting an operator. Its mission is "verifiable finance" — improving the programmability, composability, and verifiability of financial primitives onchain. The protocol ships a decentralized prover network and USDX, a native yield-bearing stablecoin with a target yield of ~3.4% sourced exclusively from on-chain protocol revenue.

---

## Monorepo Map

| Directory | Contents |
|-----------|----------|
| `docs/product/specs/` | Feature specs, organized by domain (zkVM, prover-network, usdx, privacy, governance) |
| `docs/product/personas/` | User persona definitions referenced in spec user stories |
| `docs/architecture/decisions/` | Architecture Decision Records (ADRs) — immutable after acceptance |
| `docs/ai-context/` | GLOSSARY.md, CONSTRAINTS.md — always read these before generating code or specs |
| `docs/research/` | User research, UX research, competitive and differentiation research |
| `docs/product/` | VISION.md, ROADMAP.md |
| `.github/` | PR template with spec checklist |

---

## Key Invariants — Never Violate These

These are non-negotiable. Any code, spec, or design that contradicts them must be flagged immediately.

1. **USDX yield source**: USDX yield is always and only sourced from on-chain protocol revenue. It must never derive from new token issuance, treasury drawdowns, or off-chain yield sources.

2. **Privacy + compliance pairing**: All USDX transfers must implement both stealth address privacy (ERC-5564) AND the compliance selective disclosure layer — never one without the other. A transfer that is private but not compliant, or compliant but not private, is a spec violation.

3. **Proof input privacy**: Proof generation must never expose user input data to the prover network. Provers receive only the public inputs and the proof task; raw user transactions are never transmitted.

4. **Burn authority**: USDX supply is not programmatically burnable in v1. Burn authority is governance-only, established by ADR-003. No contract, protocol module, or EOA may burn USDX unilaterally.

5. **Yield determinism**: Yield calculations must be deterministic and fully auditable on-chain. Any yield calculation that depends on off-chain state or non-reproducible inputs is prohibited.

---

## Before Writing Any Code

Read the relevant spec in `docs/product/specs/` and check [PRODUCT_MAP.md](./PRODUCT_MAP.md) for current status. Do not build to a spec with `DRAFT` status without explicit team sign-off. Do not build to a `DEPRECATED` spec under any circumstances.

If a spec does not exist for what you are building, write one before writing code.

---

## Current Focus Areas

- **zkVM**: Proof aggregation performance and settlement layer integration
- **Prover Network**: Economic incentives, liveness slashing (v1 scope per ADR-004)
- **USDX Compliance Layer**: Selective disclosure + ERC-5564 integration (REVIEW status — awaiting legal sign-off)

---

## Key Reference Files

- [PRODUCT_MAP.md](./PRODUCT_MAP.md) — canonical status of all specs and ADRs
- [GLOSSARY.md](./docs/ai-context/GLOSSARY.md) — definitions for all domain terms
- [CONSTRAINTS.md](./docs/ai-context/CONSTRAINTS.md) — non-negotiable constraints by category
- [PERSONAS.md](./docs/product/personas/PERSONAS.md) — user personas for spec user stories
