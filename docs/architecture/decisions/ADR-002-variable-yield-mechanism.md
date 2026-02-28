# ADR-002: Variable Yield Mechanism — On-Chain Revenue Index

**Status:** Accepted
**Date:** 2025-11-03
**Author:** @alec
**Deciders:** @alec, @marcus, @priya
**Related Specs:** [USDX Variable Yield Distribution](../../product/specs/usdx/YIELD-SPEC.md), [USDX Core](../../product/specs/usdx/SPEC.md)

---

## Context

USDX launched with a fixed 3.4% annualized yield. This rate was set by the founding team and had no on-chain backing — it was a liability the protocol funded from treasury reserves. As USDX supply grew, the treasury cost grew proportionally. Additionally, the fixed rate created a misleading signal: in months where protocol revenue exceeded 3.4% annualized, USDX holders received less than the protocol earned; in months where revenue fell below 3.4%, the protocol subsidized the difference from reserves. Neither scenario aligns with the "verifiable finance" mission. The team evaluated options for replacing the fixed rate with a yield mechanism grounded in actual protocol economics.

## Decision

**We will replace the fixed 3.4% USDX yield with a variable yield derived from an on-chain protocol revenue index, updated every block.**

The yield rate for each block is calculated as `yieldRate = (blockRevenue / totalUSDXSupply) * blocksPerYear`, where `blockRevenue` is the total protocol fees collected in that block (proof fees + sequencer fees), `totalUSDXSupply` is the USDX supply at the start of the block, and `blocksPerYear` is a governance parameter. Yield accumulates via a global yield index model and is claimable by holders at any time. The fixed rate mechanism is disabled in the same upgrade.

## Alternatives Considered

| Option | Pros | Cons | Rejected Because |
|--------|------|------|-----------------|
| On-chain revenue index (chosen) | Fully on-chain; deterministic; aligns yield with real protocol economics; verifiable by any party | Yield is variable (could be zero in low-revenue periods); requires communicating rate variability to holders | N/A — chosen |
| Fixed rate maintained | Predictable for holders; simple accounting | Treasury subsidy is unsustainable at scale; conflicts with verifiable finance principles; rate has no on-chain economic backing | Violates CONSTRAINTS.md ECON-001: yield must be sourced from protocol revenue, not reserves |
| Off-chain oracle feed | Flexible; can incorporate external yield sources | Requires trust in oracle operator; introduces off-chain dependency; violates verifiability property | Violates CONSTRAINTS.md ECON-001 and ECON-003: yield must be on-chain and deterministic |
| Governance-set periodic rate | More stable than block-by-block; deliberate community input | Still requires treasury backing for promised rate; governance latency means rate may lag actual economics | Same sustainability problem as fixed rate; governance cannot adjust fast enough to track revenue in real time |

## Consequences

**Positive:**
- Yield is now fully verifiable on-chain — any party can independently compute the yield rate for any block from public state.
- Aligns USDX yield with real protocol economics, removing the treasury subsidy liability.
- As protocol revenue grows, USDX yield grows automatically — a positive flywheel.
- Removes the fixed 3.4% promise that the protocol may not be able to sustain at scale.

**Negative:**
- Variable yield is harder to communicate to retail USDX holders who expected a predictable return.
- In periods of low protocol activity (e.g., network downtime, low transaction volume), yield may fall to near zero. This is economically correct but may be perceived negatively.
- The yield index model (accumulating via global index rather than per-block distributions) adds contract complexity and requires careful audit to prevent rounding errors in yield calculations.
- The transition from fixed to variable yield was a breaking change for any holder or protocol that had priced in the 3.4% rate.

**Risks:**
- If the yield index calculation has a bug (e.g., division by zero when USDX supply is zero, or overflow), yield distributions could be incorrect. Mitigation: comprehensive formal verification of the yield calculator contract.
- If protocol revenue is systematically lower than holders expect, USDX may lose its appeal as a yield asset. This is a product risk, not a technical risk.

## Review Trigger

This ADR should be revisited if: (a) a bug is discovered in the yield index calculation affecting historical yield accuracy, (b) governance decides to introduce a floor yield rate (which would require treasury backing and a new ADR), or (c) yield revenue sources change materially (requiring an updated revenue source list in the yield spec).
