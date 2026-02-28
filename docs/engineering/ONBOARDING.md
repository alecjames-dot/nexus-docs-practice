# Nexus Engineering Onboarding

Welcome. This guide covers your first week. It is intentionally sequential — the order matters because each document builds context for the next.

Last updated: 2026-02-27 | Owner: @alec

---

## Day 1: Repo Orientation

**Start here, in this order:**

1. **[CLAUDE.md](../../CLAUDE.md)** — Read this first, every time you open a new context. It is the project briefing for both humans and AI agents. It tells you what Nexus is, what you must never violate, and where to find specs before writing code. (~5 minutes)

2. **[PRODUCT_MAP.md](../../PRODUCT_MAP.md)** — The front door to all documentation. After CLAUDE.md, this tells you what exists, what its current status is, and what is actively being worked on. Before you work on any feature, check this map to find the relevant spec and verify its status. (~10 minutes)

3. **[GLOSSARY.md](../ai-context/GLOSSARY.md)** — Read all 14 definitions. Domain terminology at Nexus is precise and sometimes counterintuitive. "Prover" and "Validator" are different roles. "Yield" has a specific source constraint. "Compliance" means something more specific than regulatory compliance in general. (~15 minutes)

4. **[VISION.md](../product/VISION.md)** — One page. Understand why Nexus exists and what "verifiable finance" means before you touch any code. (~5 minutes)

5. **[CONSTRAINTS.md](../ai-context/CONSTRAINTS.md)** — Read all four sections. These are the lines you cannot cross. Print this if you need to. (~10 minutes)

---

## Day 2: Dev Environment Setup

### Prerequisites

- Node.js 20+ or Bun 1.x
- Rust toolchain (stable + nightly) — required for zkVM components
- Docker — required for local prover node
- `gh` CLI — required for PR workflow

### Setup Steps

```bash
# Clone the repo (you should have done this already)
git clone https://github.com/nexus-labs/nexus-protocol.git
cd nexus-protocol

# Install JS/TS dependencies
bun install

# Build the zkVM SDK
cargo build --workspace --release

# Start the local development environment (runs sequencer + mock prover)
docker compose up -d

# Run the test suite to verify your setup
bun test
cargo test --workspace
```

### Environment Variables

Copy `.env.example` to `.env.local` and fill in your values. Ask @marcus for the development RPC endpoint and @priya for the prover testnet credentials. Do not commit your `.env.local` file.

### Verify Your Setup

```bash
# Submit a test transaction to the local zkVM
bun run scripts/smoke-test.ts

# Expected output: "Proof submitted. Status: verified."
```

If you see errors, check that Docker is running and that your Rust toolchain is up to date. If still stuck, ask in `#engineering-setup` on Slack.

---

## Day 3: How to Read a Spec

Every feature at Nexus has a spec. Specs are not design documents — they are contracts. Here is how to read one:

1. **Check the Status first.** DRAFT means do not build. DEPRECATED means never reference this. Start with APPROVED or SHIPPED specs.

2. **Read the Non-Goals.** This tells you what the spec deliberately excludes. The boundary between a spec and its non-goals is where bugs live.

3. **Read the Acceptance Criteria (Section 6).** These are the specific, testable conditions that must be true before a feature ships. If you are implementing a spec, these are your definition of done.

4. **Check the Open Questions (Section 8).** If a question has no resolution date or owner, it is a risk. Flag it before you build.

5. **Find the linked ADRs.** Every significant architectural decision has an ADR. The spec tells you *what* to build; the ADR tells you *why* specific choices were made.

**Specs you should read this week:**
- [zkVM Spec](../product/specs/zkvm/SPEC.md) — the core execution environment
- [USDX Spec](../product/specs/usdx/SPEC.md) — the stablecoin you will be interacting with constantly
- Whichever spec is most relevant to your first assigned task

---

## Day 4: How to Write an ADR

Before you make a significant architectural decision, write an ADR. "Significant" means: a decision that is hard to reverse, affects more than one team, introduces a new dependency, or constrains future options.

**Use the template:** [docs/architecture/decisions/_template/ADR-000.md](../architecture/decisions/_template/ADR-000.md)

**Steps:**
1. Copy the template to `docs/architecture/decisions/ADR-NNN-short-title.md` where NNN is the next sequential number.
2. Fill in all sections. The Alternatives Considered table is mandatory — an ADR with no alternatives is not a decision record, it is a post-hoc justification.
3. Open a PR. ADRs require one approval from a senior engineer and one from @alec (product).
4. Once merged, ADRs are immutable. If a decision is reversed, write a new ADR that supersedes the old one. Do not edit the original.

**Common mistakes:**
- Writing the "Decision" section as a vague principle instead of a specific choice.
- Skipping the "Consequences (Negative)" section. Be honest about the costs.
- Not linking the ADR from the relevant spec.

---

## Day 5: Who to Ask for What

| Topic | Person | Channel |
|-------|--------|---------|
| zkVM architecture, proof systems | @marcus | `#engineering-zkvm` |
| Prover network, infrastructure | @priya | `#engineering-prover` |
| USDX, yield mechanics, compliance | @alec | `#product` |
| Governance, tokenomics | @alec (interim) | `#product` |
| DevOps, CI/CD, deployment | @devops | `#engineering-infra` |
| Security review, key management | @security | `#security-review` |
| Stuck / not sure who to ask | @alec | DM or `#general` |

**On-call rotation:** Check `#on-call` for the current on-call engineer. For production incidents, page the on-call directly — do not post in Slack and wait.

**PR review SLA:** We aim to review PRs within 1 business day. If your PR has been sitting for >2 days with no review, ping the reviewer directly.

---

## Quick Reference

- **Spec not found?** → Check PRODUCT_MAP.md, then ask @alec if you still can't find it.
- **Status is DRAFT?** → Do not build. Talk to the spec owner first.
- **Invariant conflict?** → Stop. Flag it in `#engineering-general` with links to both the spec and the invariant.
- **Making an architectural decision?** → Write an ADR before you write code.
- **Unsure if something needs a spec?** → If in doubt, yes it does. Ask @alec.
