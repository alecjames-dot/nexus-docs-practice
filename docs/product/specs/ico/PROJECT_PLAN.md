# ICO — Project Plan

**Status:** Active
**Project Lead:** Gordon Mattey
**Last Updated:** December 19, 2025
**Paired Spec:** [ICO Spec](./SPEC.md)
**Reference:** [Nexus ICO - PRD](https://www.notion.so/Nexus-ICO-PRD-2cb67845c2f48016b666e85132752592?pvs=21)

---

## Workstream RACI Matrix

| Workstream | Responsible | Accountable | Consulted | Informed |
|------------|-------------|-------------|-----------|----------|
| Project Management | Gordon | Gordon | All leads | All |
| Product Requirements | Gordon | Daniel | All leads | All |
| Sale Mechanics (pricing, allocation, priority queue, points integration, community rewards) | Gordon | Daniel | Stanley, Lisa, Alex, Lauren | All |
| UX / UI Spec | Muchao | Gordon | Stanley, Lauren, Daniel | All |
| Investment Narrative (all segments) | John | Daniel | Benjamin, Gordon, Alex, Lauren | All |
| Retail / Mid-Tier GTM | Lauren, Benjamin | Lauren | Gordon, Daniel, John, Steve | All |
| Institutional / Mid-Tier GTM | Benjamin | Daniel | Daniel, Alex, Gordon | All |
| Institutional Investor Materials | Benjamin | Daniel | Gordon, Alex, Lauren | All |
| Engineering Build | Stanley | Sasha | Gordon, Daniel, Muchao | All |
| Legal / Foundation Dependencies | Lisa | Daniel | Gordon | All |
| Treasury Setup | Alex | Alex | Daniel, Lisa | All |

**Key:**
- **R** (Responsible): Does the work
- **A** (Accountable): Final decision-maker, owns the outcome
- **C** (Consulted): Provides input before decisions
- **I** (Informed): Kept updated on progress

---

## Milestones (Working Back from Registration)

| Milestone | Target Date | Responsible | Dependencies |
|-----------|-------------|-------------|--------------|
| PRD v1 Complete | Complete | Gordon | Ready for first round of review |
| Legal Structure Finalized | TBD | Lisa | Jurisdiction list, Foundation dependencies |
| Engineering Scope Locked | TBD | Stanley | PRD v1, Sonar specs |
| Marketing Plan Approved | TBD | Lauren | PRD v1, Legal approval |
| Investor Materials Ready | TBD | Lauren | Marketing plan, Legal review |
| Engineering Build Complete | TBD | Stanley | Scope lock |
| End-to-End Testing | TBD | Stanley | Build complete |
| Legal Sign-off | TBD | Lisa | All docs finalized |
| Go/No-Go Decision | TBD | Daniel | All workstreams ready |
| Registration Opens | Mar 3 | All | Go decision |

---

## Workstream Tracker

### Meetings

| Meeting | Cadence | Attendees | Purpose |
|---------|---------|-----------|---------|
| ICO All-Hands | Mon 1:00 PM | Gordon, Daniel, Alec, Alex, Benjamin, John, Lauren, Lisa, Daniel McGlynn, Roza, Sasha, Stanley, Steve | Open decisions, blockers, risks, action items |
| ICO Product and Ecosystem Sync | Mon 2:00 PM | Gordon, Daniel, Muchao, Steve | PRD, UX/UI spec, sale mechanics, ecosystem |
| ICO Engineering Sync | Tue 10:30 AM | Gordon, Stanley, Sasha, Muchao | Build progress, Sonar integration, technical blockers |
| ICO Marketing & Brand Sync | Tue 4:00 PM | Gordon, Lauren, John, Daniel McGlynn, Benjamin | Investment narrative, GTM plan, comms, brand |
| ICO Legal Sync | Wed 2:30 PM | Gordon, Lisa, Roza, Daniel, Lauren | Jurisdiction, compliance, Foundation dependencies |
| ICO Capital Formation Sync | Wed 3:30 PM | Gordon, Alex, Benjamin | Institutional outreach, investor materials, treasury |
| ICO All-Hands (Rollup) | Fri 3:00 PM | Gordon, Daniel, Alec, Alex, Benjamin, John, Lauren, Lisa, Daniel McGlynn, Roza, Sasha, Stanley, Steve | Wins, carry-overs, heads-up for Monday |

### Action Item Log

| Action | Responsible | Due | Status |
|--------|-------------|-----|--------|
| Set up deeper dive for investment narrative | John | ASAP New Year | 🟢 Done |
| Set up weekly syncs | Gordon | TBD | 🟢 Done |
| Build out PRD and Project Plan doc | Gordon, Daniel | ASAP New Year | 🟢 Draft Ready for Review |
| Finalize Reg D decision (U.S. inclusion) | Lisa (R), Daniel (A) | ASAP New Year | 🟢 Done |
| Accelerate Sprout social listening/monitoring tool (Crow) | Daniel | ASAP | 🟢 Done |
| Align on dividing institutional outreach responsibilities, exploring Galaxy | Alex, Daniel | ASAP New Year | 🔴 Pending |
| USDX campaign summary for ICO investor messaging | @Daniel Marin | ASAP | 🔴 Pending |
| Guidelines for promotion in included and excluded jurisdictions | @Roza Nader | ASAP | 🔴 Pending |
| Authorization/documentation for Labs to execute contract transitions on Foundation's behalf | @Roza Nader | ASAP | Discuss live |
| What aggregate stats Sonar provides vs what we build | @Gordon Mattey | ASAP | Pending Sarah response next week on dashboard updates coming before our sale |
| Page metadata / OG for SEO | @Lauren Dresnick | Once design is locked | Hold |
| Notify Dynamic to move to dedicated cluster | @Collin Jackson | Few days before Feb 23 | 🔴 Pending |
| Customer Service Plan | @Gordon Mattey | ASAP | 🔴 Pending |
| USDX/m0 pre-ICO messaging timing | @Lauren Dresnick | ASAP | 🔴 Pending |
| KYB/KYC custom verification requirements review | @Roza Nader | ASAP | 🔴 Pending |

### Status Tracker

| Workstream | Responsible | Status | Current Focus | Next Milestone | Blockers |
|------------|-------------|--------|---------------|----------------|----------|
| Project Management | Gordon | 🟡 In Progress | Coordinating workstreams | Ongoing | — |
| Requirements | Gordon | 🟢 Done | v1 Ready for Review | v2 | — |
| Sale Mechanics | Daniel | 🟡 In Progress | Priority queue, allocation logic, community rewards | Spec complete | — |
| UX / UI Spec | Muchao | 🟡 In Progress | Investor + Admin flows drafted | Design review | — |
| Investment Narrative (all segments) | John | 🔴 Not Started | — | Draft narrative | PRD v1 |
| Institutional / Mid-Tier GTM | Benjamin | 🔴 Not Started | — | Investor outreach plan | PRD v1 |
| Institutional Investor Materials | Benjamin | 🔴 Not Started | — | Materials draft | PRD v1 |
| Retail / Mid-Tier GTM | Lauren, Benjamin | 🔴 Not Started | — | GTM plan | PRD v1 |
| Engineering Build | Stanley | 🟡 In Progress | — | Scope lock | PRD v1 |
| Legal / Foundation Dependencies | Lisa | 🟡 In Progress | Structure | Jurisdiction list | — |
| Treasury Setup | Alex | 🟡 In Progress | — | Treasury setup | — |

---

## Decision Log

### Decisions Made

| Decision | Rationale | Responsible | Date |
|----------|-----------|-------------|------|
| Use Sonar (Echo by Coinbase) as ICO platform | Proven mechanics, Coinbase ecosystem alignment | CEO | Nov 2025 |
| Base mainnet for deployment | Coinbase ecosystem, liquidity, Sonar integration | CEO | Nov 2025 |
| Fixed-price sale format | Valuation clarity, simplicity, no dynamic price discovery | CEO | Dec 17 2025 |
| 10% allocation with expansion to 20% | Balanced base, preserves optionality | CEO | Dec 17 2025 |
| 500M Fixed FDV | Valuation discipline, clean optics | CEO | Dec 17 2025 |
| Timeline set: Feb 21 - Mar 24, 2026 | Specific dates for planning (updated from Feb 10) | CEO | Dec 19 2025 |
| Brand owns Investment Narrative (all segments) | Founding team owns investment thesis; Brand (John) responsible for distilling narrative, creating 10-second pitch, and tailored messaging per segment; Daniel accountable | CEO | Dec 19 2025 |
| Mid-tier shared responsibility model | Marketing (hype, thought leadership, crypto Twitter) + Capital team (direct outreach, warm intros, Asia travel) share ownership; "one team" accountability | CEO | Dec 19 2025 |
| Product owns investment thesis | Product (Daniel, Gordon, Alex) owns thesis, sale mechanics, parameters, UX requirements; Marketing/Brand owns narrative distillation | CEO | Dec 19 2025 |
| Benjamin owns investor relations | Benjamin responsible for institutional/mid-tier GTM and materials; Daniel accountable | CEO | Dec 19 2025 |
| Pledge mechanism excluded | Simplify scope, reduce legal risk; P2 feature deferred | Product | Dec 19 2025 |
| Coinbase/Sonar confirmed | Contract signed, proceeding with Sonar platform | CEO | Dec 19 2025 |
| US Reg D path excluded | Exorbitant cost, overhead, risk; minimal marginal participation; CFTC/SEC exposure for perps DEX | CEO | Dec 31 2025 |
| Timeline changed: Feb 23 start | Need buffer from 83b | CEO | Jan 5 2026 |
| Drop minimum subscription | $10 to support global investor base | Gordon | Jan 7 2026 |
| $90M at 300M FDV | Get access at the same price as our investors (fair launch) | Daniel | Jan 7 2026 |
| ICO domain: ico.nexus.xyz | Single domain confirmed; path approach conflicts with Framer; aligns with other ICOs | Gordon | Jan 8 2026 |
| State transitions: Nexus operates | Full control preferred over Sonar dependency; governance optics | Daniel | Jan 8 2026 |
| Build internal admin UI | Safer execution, audit trail, bundle with internal state management; Colin confirmed straightforward | Gordon | Jan 8 2026 |
| Admin UI on separate domain | Simplicity; separate from investor-facing ico.nexus.xyz | Collin | Jan 8 2026 |
| CoinList partnership removed from scope | Doesn't add value | Daniel | Jan 12 2026 |
| Ethereum instead of Base | Better custodian support, more liquidity, no bridging friction; Sonar had no previous Base ICO experience | Product | Jan 14 2026 |
| Halliday on-ramp → P1 | Host on separate subdomain to isolate risk | Product | Jan 14 2026 |
| Deposit period 5 → 3 days | Matches MegaETH; registration is 14 days, plenty of time to fund wallets | All | Feb 2 2026 |
| Site preview timing: 1 week before registration (Mar 3) | Due to 83B constraints | Product | Jan 26 2026 |
| MiCA submission: France only via Goodwin | Goodwin has good rapport with French regulator | Lisa | Jan 26 2026 |
| Telegram social link | Descoped to P2; not useful without bot access | Product | Jan 26 2026 |
| Referral functionality | Descoped to P2; adds complexity and friction | Product | Jan 26 2026 |
| Allocation calculation | Python/Jupyter notebook, not spreadsheet | Product | Jan 26 2026 |
| Dropping Dynamic for purchasing wallet | Extra clicks, no benefit; caused multiple High severity issues | Engineering | Feb 17 2026 |
| Sale timing target: April 17 | Pending Binance deal; Binance listing targeting April 21 | Daniel | Mar 2 2026 |
| Two-stage ICO: NOT doing it | One ICO, simpler execution | Daniel | Jan 21 2026 |
| $30M target | Down from $90M; 10% allocation at $300M FDV | Daniel | Jan 21 2026 |

### Decisions Pending

| Decision | Options | Recommendation | Responsible |
|----------|---------|----------------|-------------|
| Final jurisdiction exclusion list | OFAC; US, UK, others TBD | TBD | Legal |
| CEX allocation (Binance) | Percentage and terms | TBD | Daniel |
| Valuation and principal parameters | Dependent on Binance terms | TBD | Daniel |

---

## Risk Log

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Sonar integration delays | Medium | High | Early integration start, fallback plan |
| High support volume | High | Medium | FAQ, self-service tools, scaled support |
| Design support needed due to Muchao leaving | High | High | Short term contractor / agency |
| MiCA white paper resubmission (if ICO parameters change) | High | High | Minimize parameter changes; resubmission resets 28-day clock |
| Partial withdrawal unsupported (Sonar contract) | Resolved | High | Sonar providing contract change; re-audit required |
| Pen testing timeline | Medium | Medium | Audit firm timezone issues; Ben coordinating updated plan |
| CEX negotiation delay (Binance) | High | High | Set fallback decision deadline; can proceed via Sonar only |
| 83B election timing | Medium | High | Mar 20 earliest ICO date given stockholder consent timing |

---

## Blockers

| Blocker | Impact | Responsible | Status |
|---------|--------|-------------|--------|
| Jurisdiction List | Blocks marketing | Daniel | Done |
| Sonar Admin Scope | Unknown scope for engineering | Gordon | Done |
| Binance terms | Determines ICO allocation, timing, valuation | Daniel | In Progress |
| Stockholder Consent | Blocks employee token distribution → ICO timing | Lisa | ✅ Signed Mar 2 2026 |
| Terms of Sale | Blocks institutional outreach | Lisa/Karen | In Progress |
| MiCA resubmission | Resets 28-day clock if parameters change | Lisa/Steve | Pending Binance finalization |

---

## Questions for Sonar

| Question | Impact | Responsible | Details | Status |
|----------|--------|-------------|---------|--------|
| Integration Testing | Confidence | Gordon | Discussing. Can change test accounts with diff state. Can hop on a call with Dave. | Closed |
| Test on Mainnet | Confidence | Gordon | Yes it's possible to use mainnet contract in test sale. | Closed |
| Base support, RPC geo blocks, Base ecosystem support | Sales | Gordon | Decision: Move to Ethereum | Closed |
| BVI and Cayman Foundation Verification | Readiness | Gordon | Sonar team in comms with Legal. Responded to Sonar requests. Final item being sent by Roza Jan 21. | Closed |
| Test Sale Configuration | Testing | Gordon | Only one test sale available. Control state through dashboard? | Closed |
| Scale | Confidence | Gordon | Shared expected volumes with Sonar. No issues with estimates. | Discussing |
| Sonar Admin Stats Scope | Scope of work | Gordon | Sonar will provide before Feb 23: participant geo breakdown, funnel from KYC → participation view, KYB breakdown, sale activity deposits/breakdown | Requested |
| Export investor list | Scope of work | Gordon | Export provides access to publicly available data wallet and deposit amounts. Ideally also need Sonar Id, wallet id, times and amounts of deposit(s). | Requested |
| MiCA process | Scope of work | Gordon | Clarify how we get access to region for each user (API support?) | Closed |
| FAQ examples | Information Quality | Gordon | Asked | Closed |
| Admin API | Testing | Gordon | Admin API is available, Sonar to let us know | Requested |
| Customer Support Strategies | Execution | Gordon | Briefed by Sonar last week, internal CRM meeting scheduled Jan 21. | Nexus to create plan and sync with Sonar |
| Compliance configuration | Scope of work (Sonar) | Gordon | Verification and risk requirements internal review starts Jan 21. | Nexus reviewing requirements with counsel |
| BVI Entity Verification | Execution | Gordon | BVI Entity is the token issuer | Requested |
| Email optional vs required impact on conversion | Conversion | Gordon | What's the impact on conversion rate when making email required? | Requested change to copy |
| Partial withdrawal support | Critical | Gordon | Contract change required; review with eng; audit implications | Sonar proposing solution — under review |

---

## Meeting Log

### Dec 19, 2025 — ICO Marketing & Brand Workstream Kickoff

**Attendees:** Gordon, Lauren, John, Benjamin, Daniel, Alex

**Transcript:** https://docs.google.com/document/d/1xn2Gh4eePkWDk5JVNYnp1gV7x20L0v7uoABFRNVbGRs/edit?tab=t.3majlf670jjl

**Notes:** https://docs.google.com/document/d/12PpXqdLUqo6vbRnpwTbWPl2io4wiRj-vhyWSsYeg4uI/edit?tab=t.0

**Decisions Made:**

| Decision | Detail | Responsible |
|----------|--------|-------------|
| Product owns investment thesis | Product (Daniel, Gordon, Alex) owns investment thesis, sale mechanics, parameters, and UX requirements | Product |
| Brand owns Investment Narrative | John responsible for distilling narrative, 10-second pitch, and tailored messaging per segment; Daniel accountable; founding team retains ownership of thesis | Daniel |
| Mid-tier shared responsibility | Marketing (hype, thought leadership, crypto Twitter amplification) + Capital team (direct outreach, warm intros, Asia travel, wined-and-dined) share ownership | Lauren, Benjamin |
| "One team" accountability | No single person blamed for mid-tier shortfalls; multi-faceted challenge with inherent measurement gaps | All |
| Benjamin owns investor relations | Benjamin responsible for institutional/mid-tier GTM and investor materials; Daniel accountable | Daniel |
| Capital team to align on institutional | Alex and Daniel to divide and conquer institutional outreach (funds, family offices, crypto VCs) | Alex, Daniel |
| Engage BAM/Genzio for narrative feedback | External marketing perspective on crypto Twitter positioning | Lauren |

**Action Items:**

| Action | Responsible | Due | Status |
|--------|-------------|-----|--------|
| Set up deeper dive for investment narrative | John | First days back | 🔴 Pending |
| Accelerate social listening/monitoring tool (Crow) | Daniel | ASAP | 🔴 Pending |
| Share/review narrative materials | Daniel, John, Lauren | Holiday period | 🔴 Pending |
| Align on dividing institutional outreach responsibilities | Alex, Daniel | Next week | 🔴 Pending |
| Build out PRDs/source materials for marketing | Gordon, Daniel | First days back | 🟡 In Progress |
| Set up weekly Marketing & Brand sync | Gordon | TBD | 🔴 Pending |
| Determine if Sonar can support Dynamic wallets, pre-registration, our target sale lifecycle | Gordon | ASAP | 🔴 Pending |
| Schedule weekly with Sonar | Gordon | ASAP | 🔴 Pending |

---

### Jan 5, 2026 — ICO All Hands

xx

---

### Jan 6, 2026 — Sonar Kick Off

[Sonar Kick Off](https://www.notion.so/Sonar-Kick-Off-2df67845c2f480a494d0ccb7aa158739?pvs=21)

---

### Jan 6, 2026 — ICO Engineering Sync

**Attendees:** Gordon, Daniel, Sasha, Stanley

**Transcript:** https://docs.google.com/document/d/15-qWLGkgk-aH4OoUepxZA7D5sgRmaHkQRZyBCAdpBCc/edit?tab=t.myw2v0mw1i9n

**Notes:** https://docs.google.com/document/d/15-qWLGkgk-aH4OoUepxZA7D5sgRmaHkQRZyBCAdpBCc/edit?tab=t.i18fwfeiu506

**Key Outcomes:**

Scope: Sonar provides smart contracts AND audits them. We just build the web app (NextJS on Cloudflare Pages). Admin scope unclear in terms of what Sonar provides vs what we might need to build.

Identity / Account Linking: Use Dynamic for sign-in. Messaging: "Update your Nexus profile before connecting." Dynamic already has: email, EVM wallets, Discord, Google, Twitter/X. Single Nexus account per user, can link multiple EVM wallets.

Social Activity Scoring: Manual review not feasible at scale (25k+ users expected). Options: 1) Manual, 2) Build programmatic scoring, 3) Use Kaito APIs. Would prioritize review by capital commitment first.

Team: Primary: Collin (lead), Raquel, Marcos. Support: Sasha, Stanley. Backup pool: Martin, Max, Pedro, Barath. Chain team mostly not involved (Sonar provides contracts).

**Action Items:**

| Action | Responsible | When |
|--------|-------------|------|
| Share Sonar API keys/IDs | Daniel | Done |
| Colin starts on demo | Colin | Done |
| Create ICO-eng channel (private) | Sasha | Done |
| Create ICO channel (company-facing) | Gordon | Done |
| Meet with Colin re: ownership | Daniel, Sasha | Done |
| Ask Dynamic about Sonar clients | Daniel | Done |
| Ask Sonar about Dynamic support | Gordon | Done |
| Follow up on Kaito API access | @Daniel Marin | This week |

---

### Jan 6, 2026 — ICO Marketing Sync

**Attendees:** John Slater, Lauren Dresnick, Daniel McGlynn, Daniel Marin, Gordon Mattey, Ryan Crowe, Lina Tran, Sean Martell, Lee Tom

**Transcript:** https://docs.google.com/document/d/12uI8aW1HIm_subK9tF6qrjrvGmi2zI67OQs-9fSXFzw/edit?tab=t.igf4lu62zy2

**Key Outcomes:**

- Marketing GTM planning started; workstream doc with timelines/owners due Monday next week.
- Three customer segments identified: institutional, retail, partner.
- Marketing to review PRD + UX flow by EOD Thursday.
- Need precise investment opportunity info to brief agencies (restricted countries list and valuation still missing).
- APAC travel: Korea (Jan 31 - Feb 4), China (Feb 5-9), Hong Kong (Feb 10-12). Benjamin should join for investment roadshow.
- Partner distribution: Can we bring partners/exchanges into ICO? Gordon to talk to Steve.
- Gamification campaign to be tied to DEX (not ICO) for ongoing interest through listing.

**Action Items:**

| Action | Responsible | When |
|--------|-------------|------|
| Share UX flow link in sandbox channel | Gordon | Done |
| Review PRD + UX flow, provide feedback | @Lauren Dresnick | EOD Thursday |
| Ask Sonar about customer support they provide | Gordon | ASAP |
| Talk to Steve about partner distribution | Gordon | ASAP |
| Share workstream document with timelines/owners | @Lauren Dresnick | Monday |

---

### Jan 7, 2026 — ICO Capital Formation Sync

**Attendees:** Gordon, Daniel, Alex, Benjamin (OOO)

**Transcript:** https://docs.google.com/document/d/1Pu-vBTDdmufVoTfREGmib86Hpl1PPLVnUZ3812m_DmM/edit?tab=t.3jl6qdrpvruk

**Key Outcomes:**

- Raise amount: Orienting around $90M at $300M FDV (matches Series A terms).
- CoinList: Still in discussions. Hybrid KYC/KYB approach would conflict with Sonar.
- Light whitepaper (3-4 pages, graphic heavy): Daniel to create draft.
- Institutional outreach: Alex has list of 110 funds (70 from bid club + 40 added).
- **TGE on Ethereum (DECISION MADE):** Continue deploying NEX and USDX on Ethereum. Will work with LayerZero for bridging to Nexus. Decouples technical excellence from token existence.
- Treasury: Signed with Anchorage on behalf of Foundation.

**Decisions Made:**

| Decision | Notes |
|----------|-------|
| TGE on Ethereum | Decouples chain from token; derisks business; better custodian support; stablecoin interoperability better on Ethereum |

**Action Items:**

| Action | Responsible | When |
|--------|-------------|------|
| Update L1 PRD with new tokenomics | @Daniel Marin | This week |
| Share new terms officially in leadership channel | @Daniel Marin | Now |
| Add Gordon to CoinList group chat | Daniel | Done |
| Communicate to investors the sale plans | @Daniel Marin | This week |
| Create light whitepaper draft (3-4 pages, graphic heavy) | @Daniel Marin | Soon |
| Convert fund list to Google sheet and share w/ regional breakdown | Alex | Soon |
| Confirm private KYC link capability with Sonar | Gordon | This week |
| Nail internal roadmap, then discuss external version | Gordon | Next session |

---

### Jan 7, 2026 — ICO Legal Sync

**Attendees:** Gordon, Daniel, Lisa, Roza, Lauren

**Transcript:** https://docs.google.com/document/d/1ohqdCuB69tturaJkinOYVraoueW0YSRtdYMVjX4l4F4/edit?tab=t.6yuu84ksnue3

**Key Outcomes:**

- MSA, ATA, IP docs hoping for signatures tomorrow.
- 83B elections: Clock starts when board approves AND tokens transferred. 30-day window once clock starts.
- TGE requires: two board consents at Labs, multiple board consents at Foundation and BVI entities, shareholder consent.
- **ICO website clarification:** Nexus builds everything on the website. Sonar provides smart contracts for deposits/allocations and some sign-in/KYC functionality.
- Jurisdiction list: Rosa/Goodwin delivering restricted countries list by end of week.
- MiCA compliance (EU): Requires 14-day withdrawal period after ICO. Plasma also implemented this. Decision: want to include EU; need to investigate compliance.
- Terms of Service & Privacy Policy needed for token.nexus.xyz and sale.nexus.xyz.

**Action Items:**

| Action | Responsible | When |
|--------|-------------|------|
| Add Alex to legal meeting invites going forward | Gordon | Done |
| Provide overall description of legal workstreams and dependencies | @Roza Nader | TBD |
| Start email thread with Foundation directors for ATA/MSA review | @Daniel Marin | Today |
| Find time with board members and Walkers for live meeting | @Daniel Marin | This week |
| Package up ICO UI and copy/Figma and send to legal | Gordon | Soon |
| Deliver restricted jurisdiction list | @Roza Nader | EOW |
| Share operational procedures document with marketing | @Roza Nader | After Daniel review |
| Draft Terms of Service and Privacy Policy for ICO site | @Roza Nader | TBD |
| Send ToS/Privacy examples from Jensen, Aztec, MegaETH | Gordon | Done |
| Investigate MiCA requirements and timing implications | @Roza Nader | This week |
| Ask Sonar about MiCA 14-day withdrawal support | Gordon | Done |
| Track TGE on roadmap and engineering priority | @Alec James | ASAP |

---

### Jan 9, 2026 — All Hands Roll Up

**Attendees:** Alec James, Alex Fowler, Benjamin Richman, Daniel Marin, John Slater, Lauren Dresnick, Lisa Haugh, Daniel McGlynn, Roza Nader, Alex "Sasha" Potashnik, Stanley Jones, Steve Yu

**Transcript:** https://docs.google.com/document/d/1Ijr_cn8-cxEl0iEqS730txyMZxXniVWqeyQFTccUMi8/edit?tab=t.kni09dl9ffy7

**Key Outcomes:**

- Legal/Foundation: ATA/MSA finalizing. Corporate actions for mint in progress.
- Capital Formation: No blockers. Validating outreach plan.
- Marketing: Needs jurisdiction list and clarity on new $90M target. Asia tour planning in progress.
- Engineering: Sonar demo in progress. Staffing conversations coming.
- Product: **Biggest blocker: Design.** Muchao on designs, Sha providing tactical support.

**Action Items:**

| Action | Responsible | When |
|--------|-------------|------|
| Add Colin to ICO meetings | Gordon | Done |
| Clarify $90M target with marketing | Daniel | This week |
| Review Figma designs and provide feedback | Marketing | This week |
| Create USDX pre-deposit campaign narrative/parameters | Daniel | ASAP |
| Complete Sonar demo | Engineering | In progress |

---

### Jan 9, 2026 — ICO Engineering Implementation Sync

**Attendees:** Gordon, Daniel, Collin, Sasha

**Transcript:** https://docs.google.com/document/d/1YshO_pOlJRYeIHkeK4AWR9ZOHfTBZbIuqLcyKmloh5o/edit?tab=t.fkzldl8eaw0

**Key Outcomes:**

Milestones suggested: Sonar integration (highest risk), registration flow, deposit flow, admin UI/state management/stats, allocation + withdrawal flows, end-to-end + load testing, production testing.

Goal: Feature complete and tested by Feb 13 (10 days ahead of launch). End-to-end demo target: Friday Jan 16.

**Technical Decisions:**

- Will maintain own database (Firestore) for user data; not relying solely on Sonar APIs.
- Stats sources: Sonar API (reliable, authenticated), Google Analytics (flaky, client-side), Firestore.
- Allocation under/perfectly subscribed: allocation = deposit amount. Oversubscribed: stack rank based on Nexus activity (compute points, ecosystem). Daniel owes formula.
- Firebase hosting won't go down. Dynamic: dedicated cluster. Cloudflare in front for bot protection.

**Team:** Primary: Collin (lead), Matteo, Marcos. Reviewer: Barath. Backup: Sebie (Argentina), Riquelmy (if pulled from DEX).

**Action Items:**

| Action | Responsible | When |
|--------|-------------|------|
| Break out tasks in Linear with milestones | Collin | By Monday |
| Scope Cloudflare integration | Collin | This week |
| Confirm internal production test is OK with legal | Gordon | ASAP |
| Contact Holiday re on-ramp integration | Daniel | Done |
| Get typical ICO traffic numbers from Sonar | Gordon | ASAP |

---

### Jan 12, 2026 — ICO All Hands

**Attendees:** Alex Fowler, Benjamin Richman, Daniel Marin, John Slater, Lauren Dresnick, Lisa Haugh, Daniel McGlynn, Roza Nader, Alex Potashnik, Stanley Jones, Steve Yu, Collin Jackson, Gordon Mattey, Ryan Crowe, Lina Tran

**Transcript:** https://docs.google.com/document/d/106R7l63eW8YS4wajPXwsY6Em-7ssvZYaWk-t07xeWxw/edit?tab=t.2oxd6yrfifsd

**Key Outcomes:**

- 6 weeks to ICO, 5 weeks to feature complete.
- End-to-end demo scaffolded. Design contractor (Matia Wagabaza) starting Tuesday.
- **Security review (NEW):** Collin to sync with Ben (security contractor) on ICO security plan.
- **MiCA White Paper (NEW BLOCKER):** Latest submission date: Monday Jan 26. Benjamin received latest version from Archax.
- **Base vs Ethereum risk (NEW):** First Sonar ICO on Base. Fewer custodians support Base, bridging friction, RPC blocking unknown. **Decision: Move to Ethereum.**
- CoinList partnership removed from scope (complexity not worth it; Sonar has 150k pre-KYC'd users).

**Action Items:**

| Action | Owner | Due |
|--------|-------|-----|
| Rename meeting to ICO Leads | Gordon | Done |
| Sync with Ben on security plan | Colin | This week |
| Chase Sarah on KYB for Foundation/BVI | Gordon | ASAP |
| Chase Sarah on Base RPC blocking | Gordon | ASAP |
| Get Sonar peak traffic numbers | Gordon | ASAP |
| Resolve Daniel visa status | Daniel | Today |
| MiCA white paper to Google doc | Benjamin | This week |
| Review MiCA white paper | Daniel | After Benjamin |
| Loop Gordon into Archax emails | Benjamin | Done |
| Schedule inbound flows workshop | Lauren | Tomorrow |
| Scope SEO robot state for Cloudflare | Colin | This week |
| Update participation target model | Alex | This week |
| Allocation formula + social linking flow | Daniel | This week |
| Get Anchorage Prime green light | Steve/Rosa | This week |

---

### Jan 13, 2026 — ICO Marketing Sync

**Attendees:** John Slater, Benjamin Richman, Lauren Dresnick, Daniel McGlynn, Daniel Marin, Gordon Mattey, Ryan Crowe, Lina Tran, Sean Martell, Lee Tom, Matia Wagabaza, Alex Fowler

**Transcript:** https://docs.google.com/document/d/1v3x2a_yHDY3Ct4_EkbWyjmsFabRinPf0hm80dVw1pIg/edit?tab=t.ynpo27bf191a

**Key Outcomes:**

- Investment narrative: Updated "everything exchange" concept. Issue with three words (settlement, trading, assets) — Daniel to suggest alternatives. "Own" → "facilitate" or "enable".
- GTM Plan: Comprehensive brief being compiled for Genzio. Full presentation: Monday next week.
- Going to **grayscale gradient** (stripped out all color). Sean updating everything.
- **Landing Page (Phase -1: Mar 3-17):** Marketing owns this separately. Users stay on `nexus.xyz/XYZ30317`. Jan 29-Mar 3: hype campaign messaging + email collection. Mar 3-17: updated with terms of sale info + email CTA.
- Timeline: Lauren to review dates and provide recommended times by end of week (optimize for early morning APAC).

**Action Items:**

| Action | Owner | Due |
|--------|-------|-----|
| Review PRD dates and recommend times of day | Lauren | Friday |
| Copy feedback on prototype | Marketing | Friday |
| UTM tracking feasibility + compensation recommendation | Marketing | Before next meeting |
| Tokenomics Litepaper | Daniel Marin | Monday EOD |
| Nexus Project Litepaper source material | Daniel Marin | Feb 13 |
| Exchange branding recommendation | Marketing | End of next week |
| Hype campaign copy review | Daniel Marin | Today/Tomorrow |
| Reconfirm MiCA submission materials on track | Lauren/Lisa | Friday |
| Add Alex Fowler to future meetings | Gordon | Done |

---

### Jan 14, 2026 — ICO Engineering Sync

**Attendees:** Gordon, Daniel, Collin, Matia

**Transcript:** https://docs.google.com/document/d/1TPwYZs5hYnje966oxGYVNsWD2upmrQP-UdK50SZvs9w/edit?tab=t.wckye0xgr7lo

**Key Outcomes:**

- **Ethereum instead of Base (DECISION):** Better storytelling, better custodian support, lower gas, no bridging needed.
- **Halliday on-ramp → P1.** May host on separate subdomain.
- Milestones from Linear:

| Milestone | Date |
|-----------|------|
| Functional, Staging Integration | Jan 16 |
| Design Implemented, P0 Complete | Jan 23 |
| P1 Complete | Jan 30 |
| P2 Complete | Feb 6 |
| Allocation with Test Applicants | Feb 13 |
| Allocation Live - Registration Begins | Feb 23 |
| Allocation Calculation | Mar 20 |
| Final Allocation | Mar 30 |
| Sale Complete | Apr 1 |

- Design-Eng Sync: 3x/week (Mon, Wed, Fri) for next 2 weeks.
- Team expansion: Collin, Marcos, Matteo, Sebie (adding now), Nojan (listening in, may add).
- Post-allocation withdrawal creates redistribution complexity if oversubscribed.
- Mobile: Need mobile responsive version.
- Cloudflare: Not P0. Primary goal: prevent bot traffic. Design for rate limiting in cloud functions instead.

**Action Items:**

| Action | Owner | Due |
|--------|-------|-----|
| Organize Design-Eng sync (Mon/Wed/Fri) | Gordon | Today |
| Write production test scenarios | Gordon | This week |
| Chase Sonar on allocation withdrawal handling | Gordon | Tomorrow sync |
| Complete Linear task breakdown | Collin | End of today |
| Add Sebie to team | Sasha | Done |
| Message Nojan to listen in | Sasha | Today |
| Add team to GitHub for code review | Collin | Today |
| Meet with Ben on security/Cloudflare | Collin | Tomorrow |
| MiCA withdrawal requirements | Rosa/Lisa | This week |

---

### Jan 20, 2026 — ICO Leads All Hands

**Attendees:** Alec James, Alex Fowler, Benjamin Richman, Daniel Marin, John Slater, Lauren Dresnick, Lisa Haugh, Daniel McGlynn, Roza Nader, Alex Potashnik, Stanley Jones, Steve Yu, Collin Jackson, Gordon Mattey

**Transcript:** https://docs.google.com/document/d/1mk9kSfvHKM9T3yOKixbqQkuG2URVzSPkXRI9RZ-vDkY/edit?tab=t.mrw9kye2odhe

**Key Outcomes:**

- **Principal Amount Decision (CRITICAL):** ONE ICO. Open question: 30M or 90M target. Alex/Daniel to finalize today.
- **MiCA / EU Marketing (NEW BLOCKER):** French attorney guidance — 20-day statutory waiting period before whitepaper can be published in EU. Marketing materials specific to ICO must be submitted to EU regulator.
- Anchorage Prime: Foundation custody in final phase. Could complete today/tomorrow.
- PRD: Close to final. All comments due by Wednesday.
- Design: Reviews completed. Incorporating feedback this week. Full end-to-end experience implementation this week.
- Sonar production testing verified as possible (test contract on mainnet in test mode).

**Blockers:**

| Blocker | Impact | Owner | Status |
|---------|--------|-------|--------|
| Principal amount (30M vs 90M) | Marketing blocked | Alex/Daniel | Decision today |
| EU marketing regulatory clarity | May block EU targeting | Roza | Producing guidance doc |
| Prover points reweighting decision | Marketing campaign blocked | Alex/Daniel | Decision today |
| Anchorage foundation custody | Production testing | Steve | Final phase, any moment |

**Action Items:**

| Action | Owner | Due |
|--------|-------|-----|
| Finalize principal amount (30M vs 90M) | Alex/Daniel | Today |
| Prover points campaign decision | Alex/Daniel | Today |
| Produce EU marketing regulatory guidance | Roza | ASAP |
| Anchorage status update | Steve | This afternoon |
| PRD comments | All | Wednesday |
| Attend Sonar verification requirements call | Lisa/Roza | Thursday 9am |

---

### Jan 21, 2026 — ICO Capital Formation Sync

**Attendees:** Benjamin Richman, Alex Fowler, Daniel Marin, Gordon Mattey

**Transcript:** https://docs.google.com/document/d/1c5RxndgKz-kTDvSpyOL5QFHiG97c5KjQKfSKmVx-LE0/edit?tab=t.hw1ewjsobcna

**Key Outcomes:**

- Orienting around $90M at $300M FDV (matches Series A terms).
- CEX ICO support tracking: Up to 3 CEO ICOs, 1% of token supply. Exchanges: Bitget, Bybit, Kraken, MEXC, KuCoin, Gate.io.
- Asia Tour confirmed: Korea (Jan 31-Feb 5), China (Feb 5-10), Hong Kong (Feb 10-13).
- **Two-stage ICO: NOT doing it.** One ICO, simpler execution.
- **$30M target confirmed** (down from $90M). 10% allocation at $300M FDV.
- 33 Campaign launching next week (hype campaign before registration).
- Signed with Anchorage on behalf of Foundation.

---

### Jan 26, 2026 — Leads All Hands

**Attendees:** Alex Fowler, Benjamin Richman, Daniel Marin, John Slater, Lauren Dresnick, Lisa Haugh, Daniel McGlynn, Roza Nader, Alex Potashnik, Steve Yu, Collin Jackson, Gordon Mattey, Lina Tran

**Transcript:** https://docs.google.com/document/d/1asLIo5hvCq0iMKngUPu6smpwbb7ifUseRyEhFjS3iSA/edit?tab=t.tburmqqcpmun

**Key Outcomes:**

ICO pushed back 1 week. Updated timeline:

| # | Phase | Duration | Dates | Description |
|---|-------|----------|-------|-------------|
| -1 | Landing Page (no reg) | 7 days | S: Tue Mar 3 | Market education |
| 0 | Institutional Pre-Registrations | 7 days | S: Tue Mar 3, E: Tue Mar 10 | Supports extended KYB timeline |
| 1 | Registration | 14 days | S: Tue Mar 10, E: Tue Mar 24 | KYC/KYB, wallet verification, geo-screening |
| 2 | Open Deposits | 5 days | S: Tue Mar 24, E: Sun Mar 29 | Fixed-price USDT deposits |
| 3 | Allocation Calculation | 7 days | S: Sun Mar 29, E: Sun Apr 5 | Compute allocations, apply priority weighting if oversubscribed |
| 4 | Allocation Preview and Withdrawal | 3 days | S: Sun Apr 5, E: Wed Apr 8 | Withdraw max/unallocated USDT |
| 5a | Final Allocation Calc and Result | 2 days | S: Wed Apr 8, E: Fri Apr 10 | Final calculation and publish ICO Report |
| 5b | MiCA refund window opens | 14 days | S: Wed Apr 8, E: Wed Apr 22 | EU regulation refund window |
| 7 | Token Distribution (TGE) | 1 day | TBD | Distribute tokens to winners |
| 6 | Post-Sale Rewards | TBD | Q2 2026 | Near term incentives for participants |

**Key Items:**

- NEX Mint / Layer Zero: On Daniel's plate. Deadline: March 1 (30 days before institutional pre-registration).
- MiCA: Submitting to France only via Goodwin. Target submit by Jan 28.
- 83B: Best practice site goes live 2 weeks before registration (Feb 26). Decision: push to 1 week (Mar 3) due to 83B constraints.
- Terms of Sale: Goodwin producing from their template.
- NexusOS ongoing campaign support: Gordon and Sasha to check in ASAP.

**Decisions:**

| Decision | Notes |
|----------|-------|
| Site preview timing | 1 week before registration (Mar 3) instead of 2 weeks due to 83B |
| MiCA submission | France only via Goodwin |
| Terms of Sale | Goodwin producing from their template |

**Action Items:**

| Action | Owner | Due |
|--------|-------|-----|
| Process MiCA edits, send to Goodwin | Rosa | Today |
| Follow up on Terms of Sale quote/timeline | Rosa | ASAP |
| ICO-specific ad copy/graphics for EU | Lauren | Friday |
| Coordinate Exchange App V1 go/no-go meeting | Lauren/Alec | ASAP |
| Check in on NexusOS campaign support scoping | Gordon/Sasha | Today |
| Map out end-to-end testing expectations | Collin | This week |
| Calculator demo | Collin | Friday |
| Continue Layer Zero research | Daniel | This week |
| Push Anchorage onboarding | Steve | This week |
| Update plan for 1-week site preview | Gordon | ASAP |

---

### Jan 26, 2026 — ICO Product Sync

**Attendees:** Daniel Marin, Steve Yu, Gordon Mattey, Sean Martell, Collin Jackson, Matia Wagabaza

**Transcript:** https://docs.google.com/document/d/19xGw-S593bqZXE4ai-EmCr7VYVilhSqqDcFE0CzuyJ4/edit?tab=t.okzka9srwhu1

**Key Outcomes:**

**Allocation Workflow Confirmed:**
1. Export participant data — CSV from system
2. Calculate allocations — Python script or Jupyter notebook (not spreadsheet)
3. Upload allocations — push back to system

**Design Review Outcomes:**
- Landing page: frame as "privilege" — user submitting application to be accepted, may be rejected, need to earn allocation.
- Sale status panel: global sale status visible (total deposits, participants, target). Show on landing page and deposit page (at top, like MegaETH/Jensen).
- Over-subscription beyond cap: Allow deposits beyond $5M per-wallet cap. Higher deposits = higher priority for allocation. At allocation, never get more than cap. Withdraw excess at allocation stage.
- One wallet per user (sybil protection via KYC). Payment wallet separate from Nexus wallet.
- **Separate Dynamic instance for ICO.** Most Nexus users have auto-generated wallets, not their main funds wallet.
- Terms of Sale: Checkbox with full audit trail. Possibly prefill user's name from Sonar KYC.
- Light mode only — reduce engineering overhead.

**Decisions:**

| Decision | Notes |
|----------|-------|
| Telegram social link | Descoped to P2, not useful without bot access |
| Referral functionality | Descoped to P2, adds complexity |
| Terms of Sale consent | Checkbox with audit trail, explore name prefill from KYC |
| Allocation calculation | Python/Jupyter notebook, not spreadsheet |
| Points wallet | One wallet per user (sybil protection via KYC) |
| Payment wallet | Separate from Nexus wallet, uses Dynamic for selection |

**Action Items:**

| Action | Owner | Due |
|--------|-------|-----|
| Create state map by screen | Gordon | Monday EOD |
| Investigate two Dynamic instances support | Collin | This week |
| Mobile designs for landing, registration, deposit | Matia | ASAP |
| Define benefits of ICO participation for landing page | Gordon/Daniel | This week |
| Schedule ICO brand style review session | Daniel/Sean/John | ASAP |
| End-to-end testing plan by phase | Gordon/Collin | Thursday |

---

### Jan 27, 2026 — ICO Marketing and Brand Sync

**Attendees:** John Slater, Benjamin Richman, Lauren Dresnick, Daniel McGlynn, Daniel Marin, Gordon Mattey, Ryan Crowe, Lina Tran, Sean Martell, Lee Tom, Matia Wagabaza

**Transcript:** https://docs.google.com/document/d/19_gO4tWDl2nVV8Xt72XIwHwoMQN2qvjF-BrR1dosBLo/edit?tab=t.gtxlax8rn9f5

**Key Outcomes:**

- Going to **grayscale gradient** (stripped out all color). Sean updating everything including Codepens.
- Landing page (Phase -1): Marketing owns separately. Hype campaign messaging + email collection Jan 29 - Mar 3. Mar 3-17: updated with terms of sale info + email CTA.
- Referral codes: Marketing exploring UTM codes instead. Google Analytics implemented on ICO site. UTM codes work but lose tracking with ad blockers.
- Tokenomics Litepaper: Daniel to deliver Monday EOD (in Asia). Earliest publish Mar 3. Need 2 weeks ahead for content creation.
- Hype campaign launch: tomorrow or Thursday. Lisa and ad writers already approved.

**Action Items:**

| Action | Owner | Due |
|--------|-------|-----|
| Review PRD dates and recommend times of day | Lauren | Friday |
| Copy feedback on prototype | Marketing | Friday |
| UTM tracking feasibility + compensation recommendation | Marketing | Before next meeting |
| Tokenomics Litepaper | Daniel Marin | Monday EOD |
| Nexus Project Litepaper source material | Daniel Marin | Feb 13 |
| Exchange branding recommendation | Marketing | End of next week |
| Hype campaign copy review | Daniel Marin | Today/Tomorrow |
| Reconfirm MiCA submission materials on track | Lauren/Lisa | Friday |
| Video clips for Daniel review | Marketing | Before Asia trip |

---

### Jan 28, 2026 — ICO Capital Formation Sync

**Transcript:** https://docs.google.com/document/d/1Pu-vBTDdmufVoTfREGmib86Hpl1PPLVnUZ3812m_DmM/edit?tab=t.w0l4w41pc7or

**Key Outcomes:**

- **Investor packet = 2 documents:** 1) Slide deck, 2) ICO Mechanics (3-pager: mechanics, KYB requirements, terms of sale). Bundle in Docsend with confidentiality clause.
- Asia trip context: First meetings are social interactions. Documents sent async after meetings.
- White glove process clarification: Not "whitelist" (can't bypass process). White glove = Sonar prioritizes their review. Capital Formation owns the master list.
- Treasury: Daniel has access to Anchorage. Next steps: Foundation creates vault, wallet, quorums for approving transfers.
- CEX ICO Participation: One-pager on terms waiting for legal signoff. Bitget interested, Kraken scheduling, Mexi NDA signed, Bybit just responded.

**Exchange Status:**

| Exchange | Status |
|----------|--------|
| BitGet | Interested, needs to send offer |
| Kraken | Call being scheduled |
| Mexi | NDA signed, following up |
| Kcoin | Waiting for intro from Tony |
| Bybit | Just responded, scheduling call |

**Action Items:**

| Action | Owner | Due |
|--------|-------|-----|
| Finalize tokenomics litepaper | Daniel | This week |
| Draft ICO Mechanics one-pager (KYB, mechanics, ToS placeholder) | Benjamin | This week |
| Send investor spreadsheet for async review | Benjamin | Today |
| Review CEX participation doc | Daniel | ASAP |
| Set up Capital Formation Notion hub | Benjamin | This week |
| Meeting with marketing re: white glove community list | Gordon | This week |
| Check Sonar exclusivity clause | Benjamin | ASAP |
| Set target date for CEX interest confirmation | Benjamin | TBD |

---

### Jan 28, 2026 — ICO Legal Sync

**Key Outcomes:**

- **Asia trip talking points:** Closed door meetings with NDAs: OK. No public announcements of a sale. Documents shared in writing should have disclaimer: "not for public dissemination, confidential, meant for recipient only."
- MiCA: Rosa received latest round of comments from Andrew (Goodwin France). Target: close out by end of day Friday.
- 83B election / Token Grants: Minting done Jan 27. Board approval required for grant of shares. Valuation report from Teknos: targeting tomorrow. Target: distribute to employees starting Tuesday.
- Terms of Sale: Next week item. Lisa to read in Karen, then draft.
- GDPR: Sonar agreement has GDPR requirements. One overriding ToU/privacy policy or separate for ICO? Cookie consent banner requirements still open.

**Action Items:**

| Action | Owner | Due |
|--------|-------|-----|
| Ping liquidity channel, align capital formation team on Asia talking points | Rosa/Lisa | Tomorrow |
| Talk to Daniel live about 3/17 response | Lisa | ASAP |
| Review deck for Daniel's Asia talk | Lisa | Before Asia trip |
| Process MiCA comments, close out | Rosa | Friday EOD |
| Get valuation report from Technos | Lisa | Tomorrow |
| Board approval for token grants | Lisa | ASAP |
| Prototype copy edits | Daniel McGlynn | End of this week |
| Work out Figma to PDF export for legal review | Gordon | Next week |
| Send Sonar agreement GDPR terms to Gordon | Rosa → Lisa → Gordon | This week |
| Add terms of use/privacy policy evaluation to tracker | Gordon | Done |

---

### Feb 2, 2026 — ICO Leads All Hands

**Attendees:** Alec James, Alex Fowler, Benjamin Richman, John Slater, Lauren Dresnick, Lisa Haugh, Daniel McGlynn, Roza Nader, Alex Potashnik, Stanley Jones, Steve Yu, Collin Jackson, Gordon Mattey, Lina Tran

**Transcript:** https://docs.google.com/document/d/1TG9qbhpPeQFoFdpYSRDEu0N9iocSekc1wCSE_5ksowI/edit?tab=t.ex2zgk991u7b

**Wins:**
- NEX mint done
- Anchorage onboarded and set up
- NexusOS User Re-engagement Support committed

**Key Outcomes:**

- **Deposit period 5 → 3 days (APPROVED).** No objections.
- Engineering M4: Allocation/distribution work pushed to Feb 20 (+1 week). P0 on track for Jan 23.
- Marketing hype campaign results slow (~4K emails collected); cryptic messaging not converting. Season 2 Node Runners launching next week.
- Mainnet public launch recommendation: May.
- USDX Pre-Deposit Campaign: Gordon product owner. High-level scoping: 6.5-10 person weeks. Detailed spec in progress.

**Decisions:**

| Decision | Notes |
|----------|-------|
| Deposit period 5 → 3 days | Approved, no objections |
| Sonar contract | Amendment or re-sign needed for date change; Lisa to review |

**Action Items:**

| Action | Owner | Due |
|--------|-------|-----|
| MiCA white paper final review | Lisa/Benjamin/Gordon | This week |
| Ping Sonar on contract amendment, include Lisa | Gordon | Today |
| Add attendees to Thursday Exchange V1 meeting | Gordon | Today |
| Terms of Service/Privacy Policy review | Alex/Sasha/Stanley/Lauren | This week |
| Alignment session with Karen (Goodwin) on ToS | Lisa/Gordon | TBD |
| Document mainnet/token launch timeline | Gordon/Alec | ASAP |
| Produce PDF of site for legal copy review | Gordon | After marketing updates |
| Ping Daniel on tokenomics litepaper | Gordon/Benjamin | Today |
| Privacy/confidentiality roadmap input | Product | TBD |
| USDX detailed spec | Gordon | This week |
| Foundation promotion proposal | Marketing | This week |

---

### Feb 2, 2026 — ICO Product Sync

**Attendees:** Steve Yu, Alec James, Gordon Mattey, Sean Martell, Collin Jackson, Matia Wagabaza

**Transcript:** https://docs.google.com/document/d/1RscT2d-98fhO7Zy_IangsKo25Gw2BjgIzeYqG9HvDx0/edit?tab=t.fab194lbuh6c

**Key Outcomes:**

- Halliday agreement signed. Commercials finalized. No branding requirements. Integration continues.
- LayerZero: Agreement being worked through. Expected to close within two weeks. Daniel leading.
- USDX Pre-Deposit: Separate site at `usdx.nexus.xyz`, not part of ICO site. No KYC required.
- Test sale approach changed: One complete test sale per day for faster iteration.
- USDX wireframes: Matia reviewing PRD, rebuilding files in Nexus Figma.

**Action Items:**

| Action | Owner | Due |
|--------|-------|-----|
| Provide Sonar branded graphic for registration flow | Sean | This week |
| Draft test sale announcement for #general | Collin | Before Monday |
| Hit Sepolia faucets to load up on test ETH | Team | This week |
| Clarify testnet token setup | Matteo | Tomorrow |
| Review USDX PRD, update user journey, share | Matia | This week |
| Continue USDX spec work | Gordon | This week |

---

### Feb 3, 2026 — ICO Marketing Sync

**Attendees:** John Slater, Benjamin Richman, Lauren Dresnick, Daniel McGlynn, Gordon Mattey, Ryan Crowe, Lina Tran, Sean Martell, Lee Tom

**Transcript:** https://docs.google.com/document/d/1l_XuWk9wX4PyWnxBDdpQBwuI0ozscS8zP2N3oR6J_QE/edit?tab=t.4jhy46l9g0zo

**Key Outcomes:**

- Core messaging document not finalized; Daniel hasn't reviewed.
- CRM: Lauren tackling advertising question first (Thursday meeting with Lisa/Alex). If advertising approved, assume same messaging can be used for email.
- Telegram: Marketing to discuss broader community management implications and come back next week.
- Tokenomics: Daniel has early draft, committing to final draft today.

**Action Items:**

| Action | Owner | Due |
|--------|-------|-----|
| How it Works, Timeline, FAQ in Notion doc | Gordon | This week |
| Review core messaging doc and ICO positioning doc | Gordon | This week |
| Send ICO positioning document to Gordon | McGlynn | Today |
| Telegram decision (broader community mgmt discussion) | Marketing | Next week |
| Advertising/email meeting with Lisa and Alex | Lauren | Thursday |
| Follow up with Benjamin/Alex on institutional investor routing workflow | Gordon | This week |
| Final draft tokenomics litepaper | Daniel | Today |

---

### Feb 4, 2026 — ICO Legal Sync

**Attendees:** Lauren Dresnick, Lisa Haugh, Benjamin Richman

**Transcript:** https://docs.google.com/document/d/12Vp1SUdkQOij0aK14G6gYvs0NaTNhF96s_X65KNzua0/edit?tab=t.ijanj775bude

**Key Outcomes:**

- MiCA: Benjamin and Lisa untangling issue with previous Ireland filing. Target: finalize internally today, send to outside counsel tonight. Goal to file Friday.
- Terms of Sale: Lisa read Karen in yesterday. Karen now drafting. Meeting tomorrow (Feb 5) 11am.
- KYC/KYB: Gordon to share Sonar document with Lisa. Discuss on Sonar call tomorrow.
- GDPR: Sonar agreement makes representations company will be GDPR compliant. Gordon to dig into tech requirements.
- Content Notice and Remediation Policy: Takedown process for fake ICO offers. Still needs development before launch.

**Legal Items Tracker:**

| # | Item | Owner | Status |
|---|------|-------|--------|
| 1 | Grant resolution for employee tokens | Lisa | Awaiting signoff. Getting Hedgey ready. |
| 2 | MiCA White Paper | Lisa | Finalise today internally, send to counsel tonight. |
| 3 | Terms of Sale | Lisa | Karen from Goodwin, call Feb 5. |
| 4 | KYB/KYC Requirements | Lisa | Review with Karen |
| 5 | ICO Mechanics one-pager | Cap Formation | Lisa to review latest |
| 6 | Terms of Use / Privacy Policy / GDPR | Lisa | With Goodwin |
| 7 | Cookie consent banner | Lisa | Gordon to scope |
| 8 | ICO Site Copy review | Lisa | Processing marketing edits |
| 9 | Sonar wallet risk configuration | Lisa | Needs modeling |
| 10 | Content Notice and Remediation Policy | Lisa | Before launch |

**Action Items:**

| Action | Owner | Due |
|--------|-------|-----|
| Share Sonar KYB document with Lisa | Gordon | Today |
| Dig into GDPR tech requirements | Gordon | This week |
| Finalize MiCA white paper internally, send to outside counsel | Lisa | Tonight |
| Get clarity on MiCA marketing materials requirement | Lisa | This week |
| Review ICO mechanics one-pager | Lisa | ASAP |
| Meeting with Karen (ToS, landing page walkthrough) | Gordon/Lisa | Tomorrow 11am |
| Share editorial calendar with Lisa | Lauren | ASAP |

---

### Feb 4, 2026 — ICO Capital Formation Sync

**Attendees:** Benjamin Richman, Alex Fowler, Gordon Mattey

**Transcript:** https://docs.google.com/document/d/1Oo_fwKT4xfvqkRRsZi1m4C34rF4NSlKfnRioiRChABY/edit?tab=t.w0wifs2tyb2w

**Key Outcomes:**

- Galaxy meeting debrief: Market conditions challenging. Current investors need to support/signal for institutional funds. TGE selling pressure concern.
- Upcoming investor calls: CMS (Thu Feb 5), Pantera Liquid Division (next week), Dragonfly (scheduling).
- Investor materials: Deck bottlenecked with Daniel. Decision: Benjamin/Alex to make changes and send to Daniel for approval.
- Timeline: TGE possibly around May 10th.
- CEX participation strategy: Not seeing clear upside. Binance requiring $100M FDV (below current pricing).
- Privacy/confidentiality narrative: Coming up repeatedly as investable theme. Alex: "No future for financial systems without some level of confidentiality."

**Action Items:**

| Action | Owner | Due |
|--------|-------|-----|
| Write 1-2 sentences on smart contract security for investor materials | Gordon | This week |
| Ask Sonar if they can share contract audit | Gordon | This week |
| Review USDX documents (Alex's and Daniel's versions), make recommendation | Gordon | This week |
| Consolidate timeline document for ICO, USDX, mainnet | Gordon | ASAP |
| Explore Cosmos EVM ecosystem alignment (talk to Austin) | Gordon | TBD |
| Send tokenomics litepaper to Benjamin/Alex | Gordon | Today |
| Make changes to deck and send to Daniel for approval | Benjamin | This week |
| Own white glove list, coordinate with Sonar | Benjamin | Ongoing |
| Coordinate with Coinbase on exclusivity | Benjamin | ASAP |

---

### Feb 9, 2026 — ICO All Hands

**Attendees:** Alec James, Alex Fowler, Benjamin Richman, Daniel Marin, Lauren Dresnick, Lisa Haugh, Daniel McGlynn, Stanley Jones, Steve Yu, Collin Jackson, Gordon Mattey, Lina Tran

**Transcript:** https://docs.google.com/document/d/1BmAfSQROkjSiLxJCSbRFDboNrpnpOr7aY_22RCmqJvM/edit?tab=t.sgaj47jbbeh

**Wins:**
- Deposit period 5 → 3 days approved
- Goodwin engaged
- First test sale and internal test sale approach finalized

**Key Outcomes:**

- GDPR: Sonar MSA commits to full GDPR compliance as independent data controller. P0 items: cookie consent banner, GA4 script blocking, ToS consent audit trail, privacy policy page, Firestore security rules audit, data flow diagram/ROPA.
- Test sale: Minor bugs found, no blockers. Running daily test sales Tue-Fri. Goal: one more with team, plus production test sale next week.
- **Key constraint:** Cannot TGE/mainnet earlier than 40 days after final allocation (Reg S flow-back prevention). **Earliest mainnet date: May 25.**
- MiCA: Filing tomorrow (Feb 10). Hard deadline Feb 11.
- Marketing: Phase 1 stalled. Daniel sitting on ad network contract. Also need to fund stablecoins into Spindle account.
- Engineering: Collin: "Pretty close to the end of primary implementation."
- Capital Formation: Good conversations with liquid funds and market makers in Asia. CEX negotiations with Coinbase and Binance underway.

**Action Items:**

| Action | Owner | Due |
|--------|-------|-----|
| File MiCA white paper | Lisa/Karen (Goodwin) | Feb 10 (hard deadline Feb 11) |
| Get Terms of Sale draft timing from Karen | Lisa | This week |
| Schedule sale configuration review with Karen | Lisa | Wednesday |
| Review core messaging document and flag concerns | Lisa | This week |
| Update investor deck with new tokenomics | Benjamin | Tomorrow |
| Coinbase call | Gordon/Benjamin | Tomorrow 8am |
| Daily test sales with Nexians | Collin | Tue-Fri |
| Review marketing email triggers from McGlin | Gordon | This week |
| Chase Daniel on light paper draft | Gordon | This week |
| Airdrop strategy thread | Lauren/Lena | This week |
| Loop in Alec on production access control / multi-sig | Gordon | This week |

---

### Feb 11, 2026 — ICO Legal Sync

**Legal Items Update:**

| # | Item | Owner | Status | Update |
|---|------|-------|--------|--------|
| 1 | Grant resolution for employee tokens | Lisa | In Progress | Public announcement at risk if we keep the dates. Must be done by 27th due to valuation 30-day clock. Critical path item. |
| 2 | MiCA White Paper | Lisa | Submitted Feb 10 | Possible change to ICO parameters (amount raising). Mar 11 earliest possible date. Risk: if parameters change from CEX negotiations, resubmission restarts clock. |
| 3 | Terms of Sale | Lisa | EOW | Draft with Nexus. |
| 4 | KYB/KYC Requirements | Lisa | Accept Sonar as is | No more action needed. |
| 5 | ICO Mechanics one-pager | Cap Formation | In Progress | Outstanding tokenomics questions last remaining piece. |
| 6 | Terms of Use / Privacy Policy / GDPR | Lisa | With Goodwin | GDPR requirements finalized. Privacy policy draft in progress. |
| 7 | Cookie consent banner | Engineering | Vendor decision made | Cookie Bot ($8/month). Integration and testing this week. |
| 8 | ICO Site Copy review | Lisa | Awaiting marketing | Can wait for a week or two. |
| 9 | Sonar wallet risk configuration | Lisa | Models needed | Run models on defaults, present to Daniel. Finalize 1 week before sale. |
| 10 | Content Notice and Remediation Policy | Lisa | TODO | Still needs development. |

---

### Feb 12, 2026 — Sonar Sync

**Attendees:** Collin, Gordon, Lisa, Sarah, Mateo, Benjamin

**Outcomes:**
- Sale Contract: Update to support withdrawals. Minimal changes. Internal audit to determine if full external audit needed. Code review and shipping changes by EOW.
- Production Test Sale: Planning Friday. Gordon to share test plan. Sarah to check coordination needs.
- BVI entity: Simple switch; will do during sale configuration call with legal prior to sale.
- Stats: Sonar sending screenshots.
- Contract: Addendum letter to come from Sonar.

---

### Feb 17, 2026 — ICO All Hands

**Attendees:** Benjamin Richman, Daniel Marin, Lauren Dresnick, Alex Potashnik, Steve Yu, Collin Jackson, Gordon Mattey

**Transcript:** https://docs.google.com/document/d/12id7MDKS-qQYCxznwwurj1kC5i42_KUaL2vrEVH_dzs/edit?tab=t.gz4r02l07u24

**Wins:**
- MiCA white paper filed (Feb 10). 28-day holding period started, no public info until ~March 10.
- GDPR requirements finalized with legal counsel (all 8 open questions resolved)
- Contract production role configuration agreed with Sonar (multi-sig strategy defined)
- Four rounds of test sale completed with 10+ testers. 32 issues fixed or in progress, 34 remain.

**Key Outcomes:**

- **Dropping Dynamic for purchasing wallet (DECISION).** Resolves 2 High severity items. Direct to web3 (Rabby, MetaMask).
- **Partial withdrawal (Highest Risk Item).** Discovered as unsupported. Sonar came back with a design proposal for a contract change. Reviewing with engineering. Audit implication: contract change will need re-audit.
- Test sale issues: 34 open tickets. Key blockers: MetaMask QR, checkbox pre-checked, calculating/allocation pages broken.
- Pen testing: Audit firm had trouble testing deposits due to timezone issues. Ben coordinating updated plan.
- GDPR: Cookie Bot selected ($8/month). Privacy policy draft in progress.
- Capital Formation: CEX negotiations with Coinbase and Binance. ICO allocation reduction could simplify significantly — a 1% ICO would be filled by retail alone.
- Daniel: Possibly push ICO timeline back depending on CEX conversations. "Regardless, from engineering and product perspective, we just want to be ready to press the button and go."
- **Earliest mainnet date: May 25** (40-day seasoning period from final allocation — Reg S flow-back prevention).

**Action Items:**

| Action | Owner | Due |
|--------|-------|-----|
| Terms of Sale comments from Sasha | Gordon | Today |
| MiCA resubmission planning | Lisa | TBD (after Binance terms) |
| Sonar: BVI entity switch follow-up | Gordon | This week |
| Partial withdrawal: Sonar contract change review | Gordon/Collin | Wed AM call |
| Production test sale coordination with Sonar | Gordon | Friday |

---

### Feb 18, 2026 — Sonar Sync

**Attendees:** Collin, Gordon, Lisa, Sarah, Mateo, Benjamin

**Outcomes:**
- Sale Contract: Addendum letter from Sonar. Audit under two weeks. Code review and shipping update by EOW.
- Production test sale: Call Friday. Gordon to share test plan.
- BVI entity: Simple switch during sale configuration call with legal.
- Stats: Screenshots sent.

---

### Feb 18, 2026 — ICO Legal Sync

**Legal Items Update:**

| # | Item | Owner | Status | Update |
|---|------|-------|--------|--------|
| 1 | Grant resolution for employee tokens | Lisa | In Progress | Expects signed today/tomorrow. 30-day rule means Mar 20 earliest ICO date. Must be done by 27th due to valuation 30-day clock. Critical path. |
| 2 | MiCA White Paper | Lisa | Submitted Feb 10 | ~Mar 11 earliest. Risk: parameter changes from CEX negotiations restart clock. Daniel confirmed this is possible. |
| 3 | Terms of Sale | Lisa | Draft with Nexus | Draft in progress. |
| 4 | KYB/KYC Requirements | Lisa | Accept Sonar defaults | No more action needed. |
| 5 | ICO Mechanics one-pager | Cap Formation | In Progress | Outstanding tokenomics questions last remaining piece. |
| 6 | Terms of Use / Privacy Policy / GDPR | Lisa | With Goodwin | GDPR requirements finalized. Privacy policy draft in progress. |
| 7 | Cookie consent banner | Engineering | Complete | Cookie Bot ($8/month). Integration and testing this week. |
| 8 | ICO Site Copy review | Lisa | Not started | Lauren provided Notion feedback. Will send to legal along with PDFs. Can wait a week or two. |
| 9 | Sonar wallet risk configuration | Lisa | TODO | Run models on defaults, present to Daniel. Finalize 1 week before sale. |
| 10 | Content Notice and Remediation Policy | Lisa | TODO | Still needs development. |

---

### Mar 2, 2026 — ICO All Hands

**Attendees:** Alec James, Daniel Marin, Daniel McGlynn, Alex Potashnik, Stanley Jones, Steve Yu, Collin Jackson, Gordon Mattey

**Transcript:** https://docs.google.com/document/d/1dH74eQnaVCe-J5jIYtYEs21-Frcm6IpghjFzHzoLc9o/edit?tab=t.mb6588uq3shj

**Wins:** Two production test sales completed end to end.

**Key Outcomes:**

- **Sale timing target: April 17.** Pending Binance deal. Binance listing targeting April 21.
- **Stockholder Consent: APPROVED AND SIGNED.** Lisa executing today.
- **MiCA white paper will need to be resubmitted** — raise amount is changing.
- Steve Yu taking over from Benjamin on Goodwin relationship and MiCA process.
- Capital formation: Reduction in ICO principal simplifies significantly. Valuation needs to be reconsidered given Binance terms.
- Engineering: Six milestones completed. Starting M8 today. Story points smoothing out. Low risk on completion.
- Terms of Sale / legal docs have been shared. Gordon provided comments. Need to chase Sasha for additional feedback.

**Planning: This Week:**
- New Sonar contract with partial withdrawal support being integrated
- Sale state management change to support withdrawals
- GDPR cookie consent implementation
- Dynamic wallet removal for purchase wallet connection
- Email messaging integration with McGlynn
- Two test sales: Tuesday and TBD

**Planning: Next Week:**
- Allocation algorithm implementation (decoupled from ICO site and admin)
- Final polish and testing

**Pre-Launch Tasks (once go is given):**
- Final timeline and content updates
- Final georestriction configuration
- Production contract access control configuration (multi-sig and accounts)
- Sonar legal pre-launch signoff call (~7 days before launch)

**Action Items:**

| Action | Owner | Due |
|--------|-------|-----|
| Move ICO legal sync to tomorrow, add Steve | Gordon | Tomorrow |
| Communicate April 17 target to Sonar | Gordon | This week |
| Chase Sasha on terms of sale comments | Gordon | Today |
| MiCA resubmission (raise amount changed) | Lisa | TBD (after Binance terms) |
| Goodwin relationship handover to Steve | Gordon/Lisa/Steve | This week |
| Valuation and principal parameters | Daniel | After Binance terms finalized |
| Litepaper replacement proposal | McGlynn/Daniel | TBD |
| Daniel test sale participation | Daniel | Tomorrow (Tue) |
| Sonar: multiple investing entity best practices | Gordon/Sonar | In progress |

---

### Mar 3, 2026 — ICO Legal Sync

**Legal Items Update:**

| # | Item | Owner | Status | Update |
|---|------|-------|--------|--------|
| 1 | Grant resolution for employee tokens | Daniel | In Progress | Resolution signed. Distribution planned. Teknos doing an update. Grant docs for review tomorrow. |
| 2 | MiCA White Paper | Alex | In Progress | Submitted Feb 10. Apr 17 target date. 1% on either Binance or Sonar. Lisa to share final version. |
| 3 | Terms of Sale | Gordon | In Progress | Draft with Nexus for review. Daniel, Eng, and Alex to provide feedback. |
| 4 | KYB/KYC Requirements | Lisa | Complete | Accept Sonar defaults. No further action. |
| 5 | ICO Mechanics one-pager | Alex | In Progress | Alex to review and share. |
| 6 | Terms of Use / Privacy Policy / GDPR | Gordon | In Progress | GDPR requirements finalized. Privacy policy and ToU draft in progress with Goodwin. Decision: wait to commit to Sonar before review. |
| 7 | Cookie consent banner | Engineering | Complete | Cookie Bot selected. |
| 8 | ICO Site Copy review | Gordon | Not Started | Suggest we wait until we commit to Sonar. Copy easy to change. |
| 9 | Sonar wallet risk configuration | Gordon | TODO | Wait for Sonar decision. Run models on defaults, present to Daniel. |
| 10 | Content Notice and Remediation Policy | Gordon | TODO | Needs to be done before launch. |
