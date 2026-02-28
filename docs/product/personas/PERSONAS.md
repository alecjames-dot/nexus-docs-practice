# Nexus User Personas

These personas are used in user stories throughout product specs. When writing a user story, reference one of these personas by name. Do not invent ad-hoc personas in individual specs — if a new persona is needed, add it here first.

Last updated: 2026-02-27 | Owner: @alec

---

## DeFi Developer — "Dana"

**Who they are:** A smart contract engineer or protocol designer building financial applications on top of Nexus. They may be building a lending protocol, a derivatives product, a yield aggregator, or a treasury management tool. They have a strong understanding of EVM-compatible development but are newer to zero-knowledge cryptography. They care deeply about composability — their protocol's outputs should be usable as inputs to other protocols without trust assumptions.

**What they want from Nexus:** A development environment where they can write financial logic in familiar tools (Solidity, Hardhat/Foundry) and get validity proofs without managing proof generation infrastructure. They want clear interfaces for consuming proofs from other protocols, and they want the zkVM SDK to abstract away ZK complexity. They are not interested in running prover infrastructure.

**Primary touchpoints:** zkVM SDK, developer documentation, USDX contract interfaces, proof verification APIs.

**Representative user stories:**
- "As a DeFi Developer, I want to verify a USDX yield proof in my lending contract so that I can use it as collateral without trusting the yield rate reported by a third party."
- "As a DeFi Developer, I want the zkVM to expose a standard interface for proof outputs so that my contracts can consume verified state without understanding the proof system."

---

## Prover Operator — "Paulo"

**Who they are:** An infrastructure operator running proof generation hardware for the Nexus prover network. They may be an individual with high-end GPU hardware or an institution running a fleet of proof generation servers. They understand distributed systems, have experience with node operation, and care primarily about uptime, fee revenue, and knowing their slashing risk precisely so they can manage it. They are economically rational actors.

**What they want from Nexus:** Clear staking and registration requirements, predictable fee structures, precise liveness requirements so they can set appropriate alerting thresholds, and transparent slashing conditions with no ambiguity about what triggers a penalty. They want proof tasks dispatched fairly and want to be able to monitor their own performance metrics.

**Primary touchpoints:** Prover registration contract, proof task dispatcher, slashing conditions, fee distribution contracts, monitoring APIs.

**Representative user stories:**
- "As a Prover Operator, I want to know the exact liveness SLA I am committing to when I register so that I can configure my alerting and failover systems appropriately."
- "As a Prover Operator, I want to inspect my proof submission history and any slashing events on-chain so that I have a verifiable record of my performance."

---

## USDX Holder — "Hana"

**Who they are:** An end user who holds USDX as a savings or transaction medium. They may be an individual or a business treasury. They care about the peg (will their USDX be worth $1.00?), the yield (are they earning the stated rate?), and privacy (can their transaction history be seen by others?). They want simple tooling — they do not want to understand proof systems or run any infrastructure. When it comes to compliance, they want to remain in control of what they disclose and to whom.

**What they want from Nexus:** A stablecoin that maintains its peg, delivers verifiable yield without counterparty trust, allows them to transact privately in their daily use, and gives them the tools to disclose specific transactions to a regulator or auditor on their own terms. They should never need to understand how stealth addresses or ZK proofs work at a technical level.

**Primary touchpoints:** USDX wallet interfaces, yield dashboard, selective disclosure tooling, compliance export tools.

**Representative user stories:**
- "As a USDX Holder, I want my USDX transfers to be private by default so that my transaction history is not visible to counterparties or observers."
- "As a USDX Holder, I want to generate a compliance disclosure for a specific set of transactions so that I can satisfy a regulatory request without revealing my entire transaction history."

---

## Protocol Governor — "Grace"

**Who they are:** A participant in Nexus on-chain governance — either a large USDX holder, an institutional stakeholder, or a protocol delegate. They have a technical understanding of the protocol sufficient to evaluate governance proposals, but they are primarily engaged at the parameter and upgrade level, not the implementation level. They care about protocol sustainability, economic soundness, and long-term value alignment.

**What they want from Nexus:** A governance system where proposals are legible (clear problem statements, explicit parameter changes, link to relevant specs and ADRs), voting is on-chain and verifiable, timelock periods are sufficient for due diligence, and the scope of what governance can and cannot change is clearly documented. They do not want governance to be a vector for unexpected protocol changes.

**Primary touchpoints:** Governance contract, proposal interface, timelock mechanism, governance documentation.

**Representative user stories:**
- "As a Protocol Governor, I want each governance proposal to reference the specific protocol parameters it modifies so that I can evaluate the exact change being proposed."
- "As a Protocol Governor, I want the governance timelock to be long enough that I can review proposals, consult with other delegates, and vote before execution."
