# USDX Stablecoin — Project Plan

**Status:** Active
**Project Manager:** [@alecjames-dot](https://github.com/alecjames-dot)
**Last Updated:** January 13, 2026
**Paired Spec:** [USDX V1 Spec](./SPEC.md)

**References:**
- [USDX PRD v1](https://www.notion.so/Final-USDX-PRD-v1-2e667845c2f480b1ab98ce6e653059f5?pvs=21)
- [How to deploy and configure the JMI Extension — Nexus' Desired Extension](https://www.notion.so/How-to-deploy-and-configure-the-JMI-Extension-Nexus-Desired-Extension-2e767845c2f48109b0e0ec971a16e500?pvs=21)
- [M0 Deployment Context Guide for All Extensions [Nexus Fork]](https://www.notion.so/M0-Deployment-Context-Guide-for-All-Extensions-Nexus-Fork-2e867845c2f481419f9ac17102afa64d?pvs=21)
- [M0 Governance Submission Process](https://www.notion.so/M0-Governance-Submission-Process-2f567845c2f4800b89c7ea09685b476d?pvs=21)

---

## Objective

Deploy the **canonical USDX ERC-20 stablecoin on Ethereum Mainnet via M0 infrastructure**, meeting all technical, legal, and custody requirements **before the M0 submission deadline** to enable inclusion in the **M0 system (M0 launch window)**.

## Context

[M0 and USDX Onboarding Context](https://www.notion.so/M0-and-USDX-Onboarding-Context-2e967845c2f48068a051f1424bbd46b2?pvs=21)

---

## Update

Proposal accepted ✅: https://governance.m0.org/proposal/359454489522313703325609894394285524436598763154087701814795947641416661494

---

## Key Deadlines (Non-Negotiable)

- **Final Submission Deadline:** February 3, 2026 @ 08:00 AM
- Submission URL: https://governance.m0.org/proposal/359454489522313703325609894394285524436598763154087701814795947641416661494

---

## Workstream RACI Matrix

| Workstream | Responsible | Accountable |
|------------|-------------|-------------|
| Project Management | Alec | Alec |
| USDX Contract Deployment (JMI) | Austin | Daniel |
| M0 Coordination & Submission | Alec | Daniel |
| Foundation Custody & Yield Routing | Alec | Daniel |
| Testnet Deployment (Sepolia) | Austin | Daniel |
| Mainnet Deployment (Ethereum) | Austin | Daniel |
| Halliday Onramp Integration | Alec | Alec |

**Key:**
- **R** = Does the work
- **A** = Owns the outcome / final decision
- **C** = Provides input
- **I** = Kept informed

---

## Asset Parameters (Locked)

| Parameter | Value |
|-----------|-------|
| Name | Nexus U.S. Dollar |
| Symbol | USDX |
| Standard | ERC-20 |
| Deployment Chain | Ethereum Mainnet |
| Peg | 1.00 USD |
| Backing | US T-Bills |
| Issuer Partner | M0 |
| Yield Recipient | Nexus Foundation |
| Canonical Contract | Ethereum Mainnet USDX |

> ⚠️ **Constraints & Dependencies**
> - Deployment must use M0's **MYieldOne with JMI infrastructure**
> - Testnet (Sepolia) deployment runthrough required before Mainnet
> - Foundation custody address must be provided to M0 for yield routing
> - **All steps must complete before Feb 3, 8am**

---

## Action Item Log

| Team | Action | Responsible | Due | Status | Dependency | Notes |
|------|--------|-------------|-----|--------|------------|-------|
| Eng | Review M0 [MYieldOne with JMI deployment guide](https://www.notion.so/How-to-deploy-and-configure-the-JMI-Extension-Nexus-Desired-Extension-2e767845c2f48109b0e0ec971a16e500?pvs=21) | Austin | TBD | ✅ Complete | — | |
| Exec | Confirm deploying entity | Daniel | ASAP | ✅ Complete | Legal clarity | Confirmed: Labs |
| Legal | Review onboarding context | Roza, Lisa | TBD | 🟨 In Progress | | |
| Legal | Meet with M0 to ask remaining questions | Roza, Lisa | TBD | 🔴 Pending | | |
| Eng | Set up fresh EOA for test deployment and fund with gas | Austin | 1/27 | ✅ Complete | | |
| Eng | Test deploy USDX via JMI on Sepolia using [deploy guide](https://www.notion.so/How-to-deploy-and-configure-the-JMI-Extension-Nexus-Desired-Extension-2e767845c2f48109b0e0ec971a16e500?pvs=21) | Austin | 1/27 | ✅ Complete | EOA setup | [Test deployment address](https://sepolia.etherscan.io/address/0x16C203a2734D1EF821a07f11Bff9fd3B6dE02a29#code) |
| PM | Validate Sepolia deployment with M0 | Alec | TBD | ✅ Complete | Sepolia deploy | Validated. M0 specified using the proxy address (not the contract implementation address) for the governance submissions process |
| PM | Prepare for M0 governance submission process | Alec | 1/27 | ✅ Complete | 0.2 ETH payment required | [Preparation document](https://www.notion.so/M0-Governance-Submission-Process-2f567845c2f4800b89c7ea09685b476d?pvs=21) |
| PM | Fund Labs multi-sig with ETH | Alec, Daniel | 1/29 | ✅ Complete | | |
| Eng | Deploy canonical USDX on Ethereum Mainnet using [deploy guide](https://www.notion.so/How-to-deploy-and-configure-the-JMI-Extension-Nexus-Desired-Extension-2e767845c2f48109b0e0ec971a16e500?pvs=21) | Austin | ≤1/31 | ✅ Complete | Sepolia deploy | ERC-20: `0xf92b58D2225a73B45dED3BC2290AC1a2077c1Cf2` / JMI: `0x16C203a2734D1EF821a07f11Bff9fd3B6dE02a29` |
| PM | Submit contract to [M0 governance process](https://governance.m0.org/proposals/pending/) using proxy address | Alec | 2/2 | ✅ Complete | Mainnet deploy | Gov proposal: https://governance.m0.org/proposal/359454489522313703325609894394285524436598763154087701814795947641416661494 |
| PM | Verify mainnet contract via M0 | Alec | 2/2 | ✅ Complete | Mainnet deploy | |
| PM | Upgrade multi-sig from 1/1 to 2/2 | Alec | — | ✅ Complete | Following mainnet deployment | |
| Exec | Finalize Foundation custody address for yield streaming | Daniel | ASAP | ✅ Complete | Daniel to share with Alec | |
| PM | Confirm Governance Acceptance of USDX | Alec | 2/18 | ✅ Complete | | |
| PM | Confirm receipt of method for swapping to USDX | Alec | 2/18 | ✅ Complete | | Done via [this guide](https://www.notion.so/310858df176a819a8aeccbf5db8866c4?pvs=21) |
| PM / Eng | Officially deploy USDX to the predicted address | Alec, Austin | — | 🔴 Pending | | Deployed: `0x16C203a2734D1EF821a07f11Bff9fd3B6dE02a29` / Reserved: `0xf92b58D2225a73B45dED3BC2290AC1a2077c1Cf2` / Name: "Nexus U.S. Dollar" / Symbol: "USDX" / Deployer: `0x48f91a1EEd66a0a95D9f66718a44DB797D80AEDD` |
| PM / Eng | Call `enableEarning()` on USDX contract to start earning yield using admin account | Alec, Austin | — | 🔴 Pending | | |
| PM / Eng | Call and set `assetCap` for assets in contract | Alec, Austin | — | 🔴 Pending | | |
| Partner | Confirm M0 has enabled their internal infra for swapping to USDX via JMI | Alec | 2/18 | 🟡 In Progress | Dependent on above tasks | |
| PM / Eng | Create script to call `claimYield()` on contract semi-regularly (every month) | Alec, Austin | — | 🔴 Pending | | |
| PM | Test first swap to USDX | — | — | 🔴 Pending | 1. Deploy USDX to predicted address; 2. Call `enableEarning()`; 3. Call and set `assetCap()` | Done via [this guide](https://www.notion.so/310858df176a819a8aeccbf5db8866c4?pvs=21) |

---

## Status Tracker

| Workstream | Responsible | Status | Current Focus | Blockers |
|------------|-------------|--------|---------------|----------|
| Project Management | Alec | 🟡 In Progress | Deadline sequencing | — |
| USDX Contract Deployment (JMI) | Austin | ✅ Complete | | |
| M0 Coordination & Submission | Alec | ✅ Complete | | |
| Foundation Custody & Yield Routing | Alec, Steve | 🟡 In Progress | | |
| Testnet Deployment (Sepolia) | Austin | ✅ Complete | | |
| Mainnet Deployment (Ethereum) | Austin | ✅ Complete | | |
| M0 JMI Setup | Alec | ✅ Complete | | |

---

## Appendix

[M0 Call Notes 2/5/26 (Paypal invite)](https://www.notion.so/M0-Call-Notes-2-5-26-Paypal-invite-2fe67845c2f4804caac8fe4d4eb976cb?pvs=21)
