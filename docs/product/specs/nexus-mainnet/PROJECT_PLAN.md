# Nexus Mainnet — Project Plan

**Status:** Active
**Project Manager:** [@alecjames-dot](https://github.com/alecjames-dot)
**Last Updated:** 2026-03-05
**Paired Spec:** [Nexus Mainnet V1 Spec](./SPEC.md)
**Reference:** [[Final] EVM L1 PRD](https://www.notion.so/Final-EVM-L1-PRD-2c367845c2f480aa83baffb4442fc4be?pvs=21)

---

## Workstream RACI Matrix

| Workstream | Responsible (R) | Accountable (A) |
|------------|----------------|-----------------|
| Project Management | Alec | Alec |
| Private Mainnet Launch | — | Alec |
| Full Validator Set (7) | — | Alec |
| Internal Monitoring + SLA Reporting | — | — |
| RPC Integrated | Alec | Alec |
| Explorer Integrated | Alec | Alec |
| Bridge Integrated | Alec | Alec |
| Onramp Integrated | Alec | Alec |
| Custody Integrated | Alec | Alec |
| Operational Readiness | — | — |
| Mainnet Contracts Deployed (WNEX, SAFE, Bridge) | — | — |
| Security Readiness | — | — |
| Documentation | Alec | Alec |
| Public Launch | Alec | Daniel |

---

## Launch Definition

Mainnet is considered "launched" when all of the following are true:

1. **Chain is live and stable with 7 validators.**

2. **Public endpoints are live.**
   - Foundation RPC + WSS live at `mainnet.rpc.nexus.xyz`
   - Explorer live at `explorer.nexus.xyz`
   - Faucet live at `faucet.nexus.xyz`

3. **Critical infrastructure partners integrated.**
   - Bridge, RPC provider, Onramp, SAFE contracts, Explorer.

4. **Compliance + access control enforced.**
   - OFAC geo-block enforced across all Nexus-hosted services.
   - Ref: [OFAC Sanction List — January 2026](https://www.notion.so/OFAC-Sanction-List-January-2026-2fc67845c2f48068bb36eebab43815a0?pvs=21)

5. **$NEX exists as native gas at genesis.**
   - $NEX minted at genesis and held in Foundation custody address (Anchorage).

6. **Bridging path from ETH Mainnet $NEX to Nexus Mainnet $NEX is functional.**
   - Bridges to native gas $NEX.

7. **Operational readiness signed off by leads.**

8. **NexusOS is refined and ready.**

---

## Quality Bar

| Category | Metric | Requirement | Notes |
|----------|--------|-------------|-------|
| **Consensus** | Target block time | **1–2 seconds** | Matches modern high-performance EVM chains. |
| | Block time stability | ≤ **10% variance** under sustained load of 30–40% capacity | Prevents UX degradation and fee volatility. |
| | Finality time | **Exactly 1 block** | — |
| | Validator propagation latency (quorum) | p95 ≤ 300ms, p99 ≤ 500ms | Time for ≥⅔ of active validators to observe a newly proposed block or consensus message. |
| **Throughput** | Simple transaction TPS | **400–600 TPS** | — |
| | Contract interaction TPS | **150–250 TPS** | — |
| | Burst TPS handling | **~250 TPS for ≥60s** | Comparable to peak L2 demand scenarios. |
| | Transaction success rate | ≥ **99% non-reverted txns** | — |
| **Mempool** | Pending tx capacity | No eviction anomalies, deterministic ordering | — |
| | Ordering consistency | Stable ordering across validators | — |
| **RPC** | RPC availability | ≥ **99.9%** | SLA for professional provider. |
| | RPC read latency | p50 ≤ **150ms**, p95 ≤ **350ms**, p99 ≤ **700ms** | SLA for professional provider. |
| | RPC throughput | 5,000 req/sec sustained ≥10 min without errors | SLA for professional provider. |
| | Write throttling | Rate-limited | — |
| **Network** | Validator uptime | ≥ **99.9%** | SLA for professional provider. |
| | Chain production uptime | ≥ **99.5%** over 30 days | — |
| | Fault tolerance | ≥⅓ validators must fail to halt | Standard BFT safety threshold. |
| **Recoverability** | State corruption | **Zero tolerance** | P0 requirement. |
| **Chain Halt** | Halt detection | Automated alerting within **5 minutes** | — |
| | Rollback capability | Deterministic rollback to last safe block | — |
| | Hotfix deployment | ≥⅔ validator approval | Enforced via validator agreements. |
| **Gas and Fees** | Simple tx gas accuracy | Ethereum parity | — |

---

## Network Parameters (Locked)

| Parameter | Value |
|-----------|-------|
| Mainnet Chain ID | **3946** |
| Testnet Chain ID | **3945** |
| Block time | **1–2 seconds**, ≤10% variance under 30–40% load |
| Finality | **Exactly 1 block** |
| Validator topology | **7 validators** (3 partners × 2 + Foundation × 1) |
| Chain production uptime target | **≥99.5% / 30d** |
| RPC SLA (pro provider) | **≥99.9%** availability; p50 ≤150ms / p95 ≤350ms / p99 ≤700ms; **5k req/s** sustained ≥10 min |
| Validator uptime (SLA) | **≥99.9%** |
| $NEX at genesis | **Native gas**, 100T supply, 18 decimals |
| Genesis $NEX custody | **Foundation Anchorage address** (**TO FILL**) |
| Fee recipient (proposer) | **Foundation Anchorage address** (enforced) |
| Geo-block | Enforced across Nexus-hosted services + RPC write-deny |

---

## Sequencing Overview

### Phase 0 — Preconditions

1. Define full account list for genesis config.
2. Exec review of genesis config.
3. Confirm validator partner set (3 external partners).
4. Confirm professional RPC provider.
5. Confirm explorer/indexer partner readiness + compatibility plan.
6. Confirm LayerZero go-ahead.
7. Go/no-go on final audit.
8. Define key management and account security practices.

### Phase 1 — Staging / Testnet Validation

1. Facilitate Explorer integration with testnet.
2. Facilitate professional RPC provider integration with testnet.
3. Facilitate LayerZero integration on testnet.
4. Full validator onboarding on Testnet.
5. Implement and validate monitoring for fundamental performance requirements.
6. Prep and run worst-case scenario drills.
7. Implement security provisions, including OFAC sanctioning.

### Phase 2 — Mainnet Genesis + Private Mainnet Start

1. Genesis launch.
2. Validators spun up (7-node topology) + block signing verified.
3. Foundation RPC + professional RPC endpoints live + externally probed.
4. Explorer live + indexing stable.
5. Monitoring + paging live (≤30s detection SLA).
6. Mainnet-ready docs prepared for ecosystem integration (protocols, nodes, developers).

### Phase 3 — Mainnet Contracts + Ecosystem Enablement

1. Deploy WNEX.
2. Ecosystem integration of critical infrastructure.
3. Implement upgraded account security provisions.
4. Integrate Nexus Mainnet and $NEX with informational sites (CoinMarketCap, Chainlist, etc.).

### Phase X — Public Launch + Post-Launch Hardening

1. Publish mainnet docs and onboarding guides.
2. Prepare and implement post-launch monitoring operations.
3. Public launch.
4. EVM V2 requirements implementation.
5. Define Validator onboarding Phase 2.

---

## High-Level Remaining Tasks (as of 2/18)

**Technical Readiness**
- Genesis config (private mainnet, bridging setup)
- Vendor readiness (validator agreement, RPC, explorer, bridge)

**Operational Readiness**
- Finishing validator coordination prep
- Establishing monitoring infra and processes
- Defining Foundation/Labs relationship and ownership

**Security Readiness**
- Runbook prep and practice
- Security go/no-gos for public launch

**Ecosystem Readiness**
- Minimum protocol integrations
- Chosen ecosystem and user engagement strategy

---

## Timeline Estimates

| Scenario | Private Mainnet | Full Partner Integrations | Operational Readiness |
|----------|----------------|--------------------------|----------------------|
| **Bull** | Week of 2/23 | 3/23 | 3/22 |
| **Base** | Week of 3/2 | TBD | TBD |
| **Bear** | Week of 3/16 | TBD | TBD |

---

## Blockers

| Blocker | Impact | Status | Owner | Notes |
|---------|--------|--------|-------|-------|
| Selecting and assigning tasks to Mainnet lead | Delays partner onboarding and private mainnet | 🟡 In Progress | @Stanley Jones, @Alex "Sasha" Potashnik | Coupled with fee structure decision |

---

## Decisions

| Decision | Options | Resolution | Status |
|----------|---------|------------|--------|
| Resolve Ethereum fee structure tuning in genesis file | [Nexus Fee Model](https://www.notion.so/Nexus-Fee-Model-31467845c2f48060b212da8df7b8075b?pvs=21) | 1. Assign new chain owner; 2. Alec to meet and onboard owner; 3. Setup meeting with eng leads + Daniel | 🔴 BLOCKED |
| Standardize docs for running full nodes | 1. Standardised docs; 2. Custom onboarding per partner | Dependent on new mainnet lead and mainnet strategy | 🔴 BLOCKED |
| Go/no-go for final mainnet audit | 1. Yes — code review; 2. No | Dependent on new mainnet lead and mainnet strategy | 🔴 BLOCKED |
| SAFE — deploy ourselves or via Palmera (with UI) | 1. Ourselves; 2. Palmera | Decision 3/5 | 🟡 In Progress |

---

## Status Tracker — High Level Phases

| Phase | Status | Blockers |
|-------|--------|---------|
| Testnet | 🟡 In Progress | Validators onboarded; WNEX deployed; SAFE contracts deployed; Bridge + RPC integrated |
| Private Mainnet | 🔴 Pending | L1 lead; genesis config review (fee finalization) |
| Public Mainnet | 🔴 Pending | All above + operational readiness |

---

## Status Tracker — Granular Workstreams

| Workstream | Responsible | Status | Current Focus | Blockers |
|------------|-------------|--------|---------------|---------|
| **Project Management** | Alec | 🟢 Mostly Complete | RPC direction decided (self-hosted Cloudflare + dTeam), Wormhole confirmed, vendor budget submitted. Remaining: SAFE vendor final call, embedded wallet eval (Dynamic vs Privy, target 3/4) | SAFE deployment decision pending Daniel; embedded wallet cost TBD |
| **Private Mainnet Launch** | Sam S | 🟡 In Progress (Execution Pending) | New L1 lead assignment (target 3/4), genesis config exec review, fee structure direction, $NEX distribution | L1 lead not yet assigned; exec genesis config review blocked on lead; fee structure blocked on new EVM lead; Anchorage mainnet integration; SAFE deployment completeness |
| **Full Validator Set (7)** | Sam S | 🟡 In Progress | Finalising 3rd external validator agreement (target 3/7), mainnet validator spin-up + signing verification | 3rd validator agreement in final comments; mainnet activation pending genesis; payment process via Foundation custody undefined |
| **Internal Monitoring + SLA Reporting** | Stanley / Sam S | 🔴 Pending | Define metrics, alert rules, paging system, SLA monitoring framework | Monitoring + paging not live; vendor SLA metrics not locked |
| **RPC Integrated** | Alec | 🟡 In Progress | Provider selected (dTeam + self-hosted Cloudflare). Signing dTeam agreement, creating partner onboarding docs, testnet + mainnet integration | dTeam agreement not signed; RPC partner docs not created; mainnet integration not live |
| **Explorer Integrated** | Alec | 🟡 In Progress | Testnet transitioning to custom domain (`explorer.nexus.xyz`), mainnet explorer + indexer integration pending | Mainnet integration not yet started |
| **Bridge Integrated** | Alec | 🟡 In Progress | Wormhole confirmed as partner. Bridging process + technical ownership defined. Awaiting signed agreement, then testnet + mainnet integration | Agreement not signed (expected within 1 month); WNEX deploy blocked by deployer key; SAFE deployment readiness |
| **Onramp Integrated** | Alec | 🔴 Pending | Halliday mainnet integration + UX enablement | Halliday readiness; mainnet infra stability |
| **Custody Integrated** | Alec | 🟡 In Progress | Testnet integration complete (Anchorage). Mainnet: provide RPC node instructions to Anchorage | Anchorage not yet live on mainnet |
| **Operational Readiness** | Stanley / Sam S | 🟡 Partial | Runbooks being updated (Nojan/Sam), on-call team onboarding in progress. Pending: infra partner testing, worst-case drills, licensing implementation, domain/entity ownership definition | Monitoring not live; drills not completed; licensing not implemented; domain ownership pending exec/legal decision |
| **Mainnet Contracts (WNEX, SAFE, Bridge)** | Sam S | 🟡 Partial | SAFE self-deploy leaning yes (Daniel), final vendor call pending. WNEX testnet deploy blocked on deployer key. SAFE testnet deploy pending Chainlist listing | Deployer key issues; SAFE vendor final decision; security review for canonical Safe; bridge contracts dependent on WNEX + agreement |
| **Security Readiness** | Ben S | 🟡 Structurally Complete | Final audit go/no-go, v1 security provisions (3/5 multisigs + OFAC), worst-case drills | Audit not cleared; multisig signer list not finalised; emergency drills not run |
| **Documentation** | Alec | 🔴 Pending | Mainnet-ready docs structure defined (in progress). Publish integrator package, timestamp best practices | Final endpoints/configs not finalised |
| **NexusOS** | Alec / Gordon | 🟡 In Progress | NexusOS plan solidification and exec signoff, refinement plan integration, embedded wallet redesign | Plan not yet signed off |
| **Public Launch** | Alec | 🔴 Not Ready | Chainlist upload, token info hubs (Etherscan), launch comms, NexusOS deploy, embedded wallet integration | Mainnet infra not fully live; RPC + bridge pending; monitoring not active; NexusOS plan not finalised |

**Reference links:**
- [Full Action Item Log](https://www.notion.so/30b67845c2f480f58588c90b9cb51b74?pvs=21)
- [Bridge Integration Action Items](https://www.notion.so/30c67845c2f48084ba7ed444777e314f?pvs=21)

---

## Appendix

### Reference Documents

- [Nexus Docs Upgrade Plan](https://www.notion.so/Nexus-Docs-Upgrade-Plan-2fc67845c2f480728cc3c1bb2507af75?pvs=21)
- [Nexus EVM Mainnet Vendors List](https://www.notion.so/Nexus-EVM-Mainnet-Vendors-List-2fc67845c2f480fe9294e3bf8eafa735?pvs=21)
- [Historical and Necessary Audits — Tracking Doc](https://www.notion.so/Historical-and-Necessary-Audits-Tracking-Doc-30267845c2f480519ff1f09e9389b4c7?pvs=21)
- [Licensing Requirements for EVM Mainnet L1](https://www.notion.so/Licensing-Requirements-for-EVM-Mainnet-L1-30b67845c2f48078892ae4155de3a2c0?pvs=21)
- [Contingency Plan for 3rd Validator Partner](https://www.notion.so/Contingency-Plan-for-3rd-Validator-Partner-30b67845c2f480089c7fcb968613c6f6?pvs=21)
- [Nexus Fee Model](https://www.notion.so/Nexus-Fee-Model-31467845c2f48060b212da8df7b8075b?pvs=21)
- [Nexus Burn Strategy Review](https://www.notion.so/nexus-burn-strategy-review-31567845c2f48034a353e10d0cd14c8e?pvs=21)
- [RPC Infrastructure: Phased Proposal (1)](https://www.notion.so/RPC-Infrastructure-Phased-Proposal-31867845c2f4801a982bfb8ad1e6cf5f?pvs=21)
- [RPC Infrastructure: Phased Proposal (2)](https://www.notion.so/RPC-Infrastructure-Phased-Proposal-31867845c2f48076b423deabc7eefbd4?pvs=21)

### Confirmed Mainnet Vendors

| Type | Vendor | Description | 12mo Budget |
|------|--------|-------------|-------------|
| Explorer | Blockscout | Cost scales with demand | $4,800 |
| 3rd-party RPC | dTeam | — | $4,800 |
| Self-hosted RPC | Cloudflare | — | $240 |
| Bridge | Wormhole | — | TBD |
| **TOTAL** | | | **TBD** |

---

## Archive

### Emergency Launch Scenario (as of 2/17/26)

*What a 4-week launch would require:*

- Finish genesis config review **this week.**
- Define contractual relationship + domain ownership guidelines between Foundation and Labs **this week.**
  - Nexus Labs manages the `nexus.xyz` domain on behalf of the Foundation. Any domain or service is deployed through Labs. On paper, these services/domains are owned by the Foundation. Funds always come from Foundation's Treasury.
- Launch private mainnet **next week.**
- Confirm paying service providers (Wormhole, Ankr, SAFE, Blockscout) **this week.**
- Negotiate and sign agreements **early next week;** begin integrations immediately.
- Go ahead with 2 external validator partners + Nexus Foundation/Labs to meet 7 validators total. Bring 3rd partner onboard as a fast-follow.
- Get on-call team up to speed on EVM; attune monitoring over **next 3.5 weeks.**

*Note: Under this scenario, launch would proceed without the new Points System or GYDS.*
