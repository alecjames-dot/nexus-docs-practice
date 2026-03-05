# Nexus Token Launch (TGE — Mint) — Project Plan

**Status:** Active
**Project Manager:** [@alecjames-dot](https://github.com/alecjames-dot)
**Last Updated:** January 13, 2026
**Paired Spec:** —

**References:**
- ERC-20 Repo: https://github.com/nexus-xyz/nex-erc-20
- Global Token Distribution: [Nexus L1 Product Specification](https://www.notion.so/Nexus-L1-Product-Specification-2a867845c2f4802a806dc0499754249d?pvs=21)

**Cross-Team Signoff:**

| Stakeholder | Y/N |
|-------------|-----|
| Daniel | ⏰ |
| Roza | ⏰ |
| Lisa | ⏰ |

---

## Workstream RACI Matrix

| Workstream | Responsible | Accountable |
|------------|-------------|-------------|
| Project Management | Alec | Alec |
| Token Contract & Deployment | Daniel | Daniel |
| Anchorage Onboarding & Custody Setup | Steve | Daniel |
| Hedgy Setup for Employees & Investors | Lisa | Daniel |
| Initial Token Distribution | Daniel | Daniel |
| Investor Allocations | Daniel | Daniel |
| Employee Allocations & Vesting | Lisa | Daniel |
| Treasury Allocation (Labs/Foundation) | Daniel | Daniel |
| Tax & Compliance Readiness | Roza | Daniel |

**Key:**
- **R** = Does the work
- **A** = Owns the outcome / final decision
- **C** = Provides input
- **I** = Kept informed

---

## Token Parameters (Locked)

| Parameter | Value |
|-----------|-------|
| Name | Nexus |
| Symbol | $NEX |
| Total Supply | 100,000,000,000,000 (100T) |
| Decimals | 18 |
| Standard | ERC-20 |
| Network | Ethereum Mainnet |
| Audit Status | Audited ✅ Code Freeze |
| Initial Mint Recipient | Foundation-owned Anchorage custody account |
| Initial Mint Recipient Address | **TO FILL AFTER ANCHORAGE ONBOARDING** |
| Contract Deployment Account | TO FILL — expected to be multisig from the Foundation |

**Verified ERC-20 Contract on Ethereum Mainnet:** https://etherscan.io/address/0xf57d49646621f563b0b905afc8336923ac569ec5

> ⚠️ **Constraint:** Initial downstream transfers **must occur within 2–3 days of mint** for tax reasons.

---

## Action Item Log

| Area | Action | Responsible | Due | Status | Dependency |
|------|--------|-------------|-----|--------|------------|
| Exec | Anchorage Foundation MSA Signed | Daniel, Steve | 1/8 | ✅ Complete | |
| Exec | Complete Anchorage KYC for Foundation | Daniel | 1/9 | ✅ Complete | |
| PM | Share PM Plan with Autonomous | Alec | 1/13 | ✅ Complete | Update |
| PM | Share PM Plan with Eng Leads | Alec | 1/13 | ✅ Complete | Update |
| PM | Message Autonomous about Testnet runthrough for 1/15 | Alec | 1/13 | ✅ Complete | |
| PM | Evaluate Gnosis SAFE multisig as deployment account option for Autonomous | @Alec James | 1/13 | ✅ Complete | |
| Exec | Decide on preferred Autonomous approach: SAFE or Director's resolution. **Outcome: Director's Resolution** | @Daniel Marin | 1/13 | ✅ Complete | Evaluation of SAFE option |
| PM | Share proposed [Testnet deploy sequencing doc](https://www.notion.so/Testnet-NEX-Deployment-Runthrough-Sequence-2e867845c2f4809c8688d8dacfc2ba3c?pvs=21) with Autonomous | Alec | 1/13 | ✅ Complete | |
| PM | Coordinate deployment runthrough with Autonomous for Testnet. **Scheduled for 1/14 at 4:30pm PST** | @Alec James | 1/14 | ✅ Complete | Share this document with Autonomous; SAFE evaluation |
| Exec | Plan alternative deployment method if Autonomous cannot get admin access to their systems | Daniel | 1/14 | ✅ Complete | Remix IDE approach for in-browser deployment |
| Exec | Secure employee vesting partner/process (Top choice: Hedgy) | @Daniel Marin | 1/15 | ✅ Complete | |
| Eng | Execute testnet deploy runthrough | Autonomous, Alec, Daniel | 1/14 | ❌ Failed | |
| Eng | Retry testnet deploy — **Success** | Autonomous, Alec, Daniel | 1/15 | ✅ Complete | Hard requirement |
| Eng | Set up multi-sig for minting receipt | Autonomous | 1/15 | ✅ Complete | [Details](https://docs.google.com/spreadsheets/d/1N7mWmeYd5IgT8-7KuzMG14ILIe-0kadj/edit?gid=805879395#gid=805879395) |
| PM | Coordinate Foundation deployment call with Autonomous for Mainnet (Sync) | @Alec James | 1/16 | ✅ Complete | Successful testnet runthrough |
| PM | Call with Foundation and Autonomous to mint token | Alec, @Daniel Marin, Steve | 1/19 | ❌ Wrong Sequencing | Testnet runthrough success |
| Legal | Legal to coordinate sends and receipts of signed consents | @Roza Nader | ASAP | ✅ Complete | Some open questions remaining |
| Exec | Finalize answering open questions for board members | @Daniel Marin | ASAP | ✅ Complete | Coordinate with Roza |
| PM | Confirm need to add mint/burn functionality to ERC-20 with LZ | @Daniel Marin | ASAP | ✅ Complete | Required for sequencing of Ethereum Mainnet to Nexus Mainnet |
| PM | Delay Foundation call to mint | @Alec James | 1/22 | ✅ Complete | |
| BD | Complete Anchorage KYC for Foundation (remaining members) | @Steve Yu prompting Autonomous | TBD | ✅ Complete | In review on Anchorage side |
| Exec | Create new ERC-20 contract with mint/burn functions | @Daniel Marin | ASAP | ✅ Complete | Daniel studied LZ docs and has proposed a new way to deploy the Ethereum token |
| PM / Exec | Evaluate tradeoff between adding mint/burn function and not | Daniel, Alec, Ben | 1/26 | ✅ Complete | |
| PM | Call with Foundation and Autonomous to mint token | Alec, @Daniel Marin, Steve | 1/27 | ✅ Complete | Testnet runthrough success |
| PM / Security | Define security processes and requirements for ensuring security of the updated ERC-20 contract | Daniel, Alec, Ben | ASAP | ✅ Complete | |
| PM | Get Ben Speckien to review ERC-20 contract with new additions | @Alec James | 1/22 | ✅ Complete | |
| PM | Coordinate interoperability meeting for tech and BD leads | @Alec James | 1/27 | ✅ Complete | |
| PM | Confirm with Ben Speckien about audit availability | @Alec James | 1/27 | ✅ Complete | $5k |
| BD / PM | Complete Anchorage onboarding | @Daniel Marin | TBD | ✅ Complete | Autonomous KYC for Foundation |
| PM / Exec | Define and setup vault management plan for Anchorage custody accounts, including team permissions | @Daniel Marin, @Alec James | TBD | ✅ Complete | Anchorage custody onboarding for Labs and Foundation |
| Security | Re-share correct commit with Hashlock and see if they would do pro-bono | @Ben Speckien | 1/29 | ✅ Complete | |
| PM | Confirm go or no-go for audit | @Alec James | 1/31 | ✅ Complete | |
| Security | Go ahead with Audit | @Ben Speckien | 2/2 | ✅ Complete | See Appendix for report |
| PM | Coordinate $NEX movement from Foundation multi-sig to Anchorage Foundation custody account | @Daniel Marin | 1/29 | ✅ Complete | |
| PM / Exec | Execute $NEX movement from Foundation multi-sig to Anchorage foundation account | @Daniel Marin | 1/29 | ✅ Complete | Just waiting on Foundation signatures |
| Exec | Confirm Anchorage receipt of $NEX from Foundation multi-sig | @Daniel Marin | 1/30 | ✅ Complete | |
| PM | Organize time to deploy $NEX to ETH Sepolia with Foundation | @Alec James | 2/2 | ❌ Cancelled | Daniel can do both himself |
| PM / Exec | Deploy $NEX to ETH Sepolia Testnet | @Daniel Marin | 2/6 | 🟨 In Progress | |
| PM | Share with Daniel a runbook to brand the token on Etherscan | @Alec James | 2/3 | 🟨 In Progress | |
| Exec | Collect investor payment addresses, and if they have Anchorage accounts | @Daniel Marin | TBD | 🟨 In Progress | |
| People / BD | For investors without Anchorage accounts, define investor custody process via Hedgy | @Lisa Haugh, @Steve Yu | TBD | 🟨 In Progress | Which investors don't have Anchorage accounts |
| People | Determine employee custody requirements | @Lisa Haugh | TBD | 🟨 In Progress | |
| Exec | Submit and prompt approval of employee token allocation by Foundation | @Daniel Marin | ASAP | 🟨 In Progress | |
| PM / Exec | Execute movement of Labs allocation from Foundation custody accounts to Labs account | @Daniel Marin, @Alec James | TBD | 🟨 In Progress | Receipt of $NEX in Foundation custody account |
| Exec | Distribution from Labs custody account to appropriate allocation recipients | @Daniel Marin, @Lisa Haugh | TBD | 🔴 Pending | Approval of allocations |
| BD / PM | Confirm timeline for onboarding Anchorage to Nexus Mainnet | Steve, Alec | TBD | 🟨 In Progress | |
| BD | Confirm Anchorage payment address for token payment | @Steve Yu, Anchorage | TBD | 🔴 Pending | Address attached to invoice to be received |
| People | Execute fiat payments to Anchorage, as needed | @Lisa Haugh | TBD | 🔴 Pending | Invoice from Anchorage |
| People | Plan token payment to Anchorage alongside investor distribution schedules | Lisa | TBD | 🔴 Pending | Invoice from Anchorage |
| PM | Share Foundation custody address with Sam S for EVM Genesis TGE of $NEX native gas token | Alec | TBD | 🔴 Pending | Anchorage onboarding to Nexus Mainnet |
| Exec | Prompt investors to exercise token warrants, to enable transfer of allocation | Daniel | TBD | 🔴 Pending | |
| People | Prompt employees to sign token grant (then receive Hedgy account) | Lisa | TBD | 🔴 Pending | Confirmation of going ahead with Hedgy |
| PM | Define process for burning on mainnet launch | Alec, Daniel | TBD | 🔴 Pending | |
| PM | Execute burning process of ETH Mainnet $NEX for mainnet launch and bridging sequence | Alec, Daniel | TBD | 🔴 Pending | |

**Reference spreadsheet:** https://docs.google.com/spreadsheets/d/1N7mWmeYd5IgT8-7KuzMG14ILIe-0kadj/edit?gid=805879395#gid=805879395

---

## Status Tracker

| Workstream | Responsible | Status | Current Focus | Blockers |
|------------|-------------|--------|---------------|----------|
| Project Management | Alec | 🟡 In Progress | Dependency sequencing | |
| Token Contract & Deployment | Daniel | ✅ Complete | Testnet runthrough | Autonomous system admin restriction |
| Anchorage Onboarding & Custody Setup | Steve | ✅ Complete | KYC finalizing | Autonomous KYC |
| Initial Token Distribution | Daniel | ✅ Complete | ERC-20 Mainnet deployment | Testnet runthrough |
| Investor Allocations | Daniel | 🟡 In Progress | Investor address collection | |
| Employee Allocations & Vesting | Lisa | 🟡 In Progress | Hedgy setup | |
| Treasury Allocation (Labs/Foundation) | Daniel | 🟡 In Progress | Signoff from Foundation | |
| Tax & Compliance Readiness | Roza | 🟡 In Progress | Tax-relevant timelines for allocation distribution | |

---

## Decision Log

### Decisions Pending

| Decision | Options | Owner |
|----------|---------|-------|
| Employee custody structure | Individual vs pooled | Legal |

---

## Risk Log

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Anchorage onboarding delay | Medium | High | Daily follow-up |
| Missed 2–3 day transfer window | Low | Medium | Pre-collect addresses |
| Address errors | Medium | Extremely High | Dual review |

---

## Blockers

| Blocker | Impact | Owner | Status | Resolution |
|---------|--------|-------|--------|------------|
| Anchorage KYC incomplete | Custody blocked | Daniel | ✅ Closed | |
| Foundation Anchorage custody address not issued | Cannot deploy or mint | Steve / Daniel | ✅ Closed | Using multisig |
| Distribution timing guidance pending | Risk of tax issues | Roza | ✅ Closed | |
| Investor / employee addresses incomplete | Transfers blocked | Daniel / Lisa | 🔴 Open | |

---

## Appendix

### Genesis Distribution (Current Baseline)

| Allocation | % | Notes | Source |
|------------|---|-------|--------|
| Team | 20% | Subject to vesting via Magna | Labs |
| Investors | 20% | Lockups apply | Labs |
| ICO | 30% | Fully unlocked at TGE | Foundation |
| Treasury | 30% | Split below | Labs & Foundation |

**Treasury Split (Private):**
- Labs Treasury: 45%
- Foundation Treasury: 55%

**Total Genesis Tokens Allocated To Labs:** Team (20%) + Investors (20%) + Labs Treasury (5%) = 45%

---

### Test Deployment Plan

- [Testnet $NEX Deployment Runthrough Sequence](https://www.notion.so/Testnet-NEX-Deployment-Runthrough-Sequence-2e867845c2f4809c8688d8dacfc2ba3c?pvs=21)
- [Testnet $NEX Deployment Runthrough Sequence — REMIX IDE](https://www.notion.so/Testnet-NEX-Deployment-Runthrough-Sequence-REMIX-IDE-2ea67845c2f480399e4fc85d45b972e5?pvs=21)
- [Official Testnet $NEX Deployment Runthrough Sequence — REMIX IDE](https://www.notion.so/Official-Testnet-NEX-Deployment-Runthrough-Sequence-REMIX-IDE-30b67845c2f480669d53c83618df30c5?pvs=21)

### Mainnet Deployment Plan

- [Mainnet $NEX Deployment Runthrough Sequence — REMIX IDE [Completed]](https://www.notion.so/Mainnet-NEX-Deployment-Runthrough-Sequence-REMIX-IDE-Completed-2ea67845c2f480bda017fdf264b56b4d?pvs=21)
- [Mainnet $NEX Deployment Runthrough Sequence — REMIX IDE (01/27/2026) [Completed]](https://www.notion.so/Mainnet-NEX-Deployment-Runthrough-Sequence-REMIX-IDE-01-27-2026-Completed-2f567845c2f48048947bfa940c1de981?pvs=21)

### Mainnet Treasury Setup Plan

- [Mainnet Treasury Setup Plan](https://www.notion.so/Mainnet-Treasury-Setup-Plan-2f667845c2f480b38e83c67ec773ad44?pvs=21)

### Investor Address Collection Checklist

- [TGE Investor Address Collection Checklist](https://www.notion.so/TGE-Investor-Address-Collection-Checklist-2e867845c2f480cf8c7eea65dcf7bda2?pvs=21)

### ERC-20 Audit — Hashlock

Nexus Smart Contract Audit Report — Preliminary Report v1 (attached separately)

### Etherscan Token Profile Setup Guide

- [Etherscan Token Profile Setup Guide | Nexus Foundation](https://www.notion.so/Etherscan-Token-Profile-Setup-Guide-Nexus-Foundation-2fb67845c2f480358d6edf1c3c018492?pvs=21)
