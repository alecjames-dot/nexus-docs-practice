# Nexus Mainnet — V1 Launch Spec

**Status:** STARTED
**Owner:** @alec
**Last Updated:** 2026-03-04
**Approved by (Product):** @Daniel Marin
**Approved by (Engineering):** @Stanley Jones, @Alex "Sasha" Potashnik
**Linear:** [Project Name](https://linear.app/nexus/project/...)
**Figma:** [Design File Name](https://figma.com/file/...)
**Related Research:** —
**Related Specs:** —

---

## 1. Context

### Investment Case

Nexus Mainnet is the foundation of the entire Nexus product stack. Without a live, production-grade EVM mainnet, no downstream products — USDX, Nexus Exchange, or the broader developer ecosystem — can be deployed or operate. This spec defines the minimum requirements to launch a stable, secure, and performant EVM Layer 1 that meets professional infrastructure standards from day one.

### Opportunity Cost

Delay to mainnet launch directly blocks all downstream product launches and ecosystem integrations (bridge, indexer, explorer, on-ramp). Every week of delay is a week without protocol revenue, developer adoption, or ecosystem growth.

### Effort

**XL.** Cross-team coordination across Engineering, Product, Legal, Security, BD, and Marketing, with external dependencies on validator partners, RPC providers, bridge providers, and ecosystem tooling.

---

## 2. Goals & Non-Goals

**Goals:**
- Launch a production-grade EVM mainnet (Chain ID: 3946) with the minimum viable configuration for asset and application deployment.
- Meet all fundamental performance, availability, and security requirements defined in Section 0.
- Establish the operational model for validators, RPC, and infrastructure.
- Deploy required ecosystem infrastructure: Safe contracts, WNEX wrapper, bridge integration, explorer, and indexer.

**Non-Goals:**
- Staking or validator economics (reserved for post-launch governance upgrade).
- Full Nexus Exchange (Trade tab) on mainnet at launch.
- Decentralised sequencing or censorship-resistance mechanisms beyond BFT.
- On-chain governance (governance-controlled upgrades are a future capability).

---

## 3. Summary of Features

| Feature | Description |
|---------|-------------|
| Chain configuration | Chain ID, network name, RPC endpoints, explorer URL, faucet |
| $NEX native gas token | Genesis-minted native gas token; 100T supply; distributed to Foundation custody |
| Validator network | 7-validator BFT network; 3 third-party partners + 1 Foundation node |
| RPC infrastructure | Three-layer public RPC: Cloudflare → EKS full nodes → dTeam failover |
| Archive node | Full historical state; serves `debug_*` and `trace_*` methods only |
| Safe contracts | Singleton Factory + full Safe contract suite on mainnet and testnet |
| WNEX wrapper | ERC-20 wrapper for native NEX; required for smart contract interactions |
| LayerZero bridge | OFT bridge for NEX (Ethereum) → native NEX on Nexus via Composer contract |
| Network economics | EIP-1559 gas; fees to Foundation account; rewards pool EOA |
| Security & recovery | DR procedures, P0/P1 incident response, snapshot-based recovery (RPO ≤ 6h) |
| Monitoring | Per-metric alerting covering all Section 0 fundamental requirements |
| Ecosystem tooling | Indexer, explorer, on-ramp widget (external responsibilities noted inline) |

---

## 4. Functional Requirements

### 0. Fundamental Requirements

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
| **Mempool** | Pending tx capacity | No eviction anomalies, deterministic ordering | Explicit requirement. |
| | Ordering consistency | Stable ordering across validators | — |
| **RPC** | RPC availability | ≥ **99.9%** | SLA for professional provider. |
| | RPC read latency (typical) | p50 ≤ **150ms**, p95 ≤ **350ms**, p99 ≤ **700ms** | SLA for professional provider. |
| | RPC throughput | 5,000 req/sec sustained for ≥10 min without errors | SLA for professional provider. |
| | Write throttling | Rate-limited | — |
| **Network** | Validator uptime | ≥ **99.9%** | SLA for professional provider. |
| | Chain production uptime | ≥ **99.5%** over 30 days | Explicit requirement. |
| | Fault tolerance | ≥⅓ validators must fail to halt | Standard BFT safety threshold. |
| **Recoverability** | State corruption | **Zero tolerance** | P0 requirement. |
| | ~~Snapshot frequency~~ | ~~Recovery Point Objective ≤ **6h**~~ | ~~Explicit requirement.~~ |
| | ~~Snapshot retention~~ | ~~Last **30 snapshots**~~ | ~~Allows multi-day rollback coverage.~~ |
| | ~~Recovery sources~~ | ~~Deterministic reconstruction~~ | ~~Explicit requirement.~~ |
| **Chain Halt** | Halt detection | Automated alerting within **5 minutes** | — |
| | Rollback capability | Deterministic rollback to last safe block | — |
| | Hotfix deployment | ≥⅔ validator approval | Enforced via validator agreements. |
| **Gas and Fees** | Simple tx gas accuracy | Ethereum parity | Explicit bounds. |

---

### 1. Network & User Onboarding

#### 1.1 $NEX — Native Gas Token

- $NEX must be created as the native gas token on Nexus mainnet at genesis.
  - Name: Nexus
  - Symbol: $NEX
  - Supply: 100 Trillion
  - Decimals: 18
- $NEX must be distributed directly to the Foundation-owned custodian account.
  - **Address: NEED TO COLLECT FROM ANCHORAGE** ⏰

#### 1.2 Chain Configuration

Network must expose:

| Parameter | Mainnet | Testnet |
|-----------|---------|---------|
| Chain ID | `3946` | `3945` |
| Network name | Nexus Layer 1 Mainnet | Nexus Layer 1 Testnet |
| RPC (HTTPS) | `https://mainnet.rpc.nexus.xyz` | `https://testnet.rpc.nexus.xyz` |
| RPC (WSS) | `wss://mainnet.rpc.nexus.xyz` | `wss://testnet.rpc.nexus.xyz` |
| Block explorer | `https://explorer.nexus.xyz` | `https://testnet.explorer.nexus.xyz` |
| Faucet | — | `https://faucet.nexus.xyz` |

- The block explorer must exist on a `nexus.xyz` domain.
- **The block explorer must support the dual-client architecture. Note: EXTERNAL RESPONSIBILITY.**

#### 1.3 RPC and Traffic Management

- Standard Ethereum JSON-RPC over HTTPS.
- Nexus Foundation owns 1 RPC endpoint for Mainnet and 1 for Testnet, operated by Nexus Labs.
- Professional infrastructure provider owns and operates 1 RPC endpoint for Mainnet and 1 for Testnet. **Note: EXTERNAL RESPONSIBILITY.**
- No user from OFAC-sanctioned countries may interact with the network through any Nexus-provisioned service (RPC, faucet, explorer, app.nexus.xyz).
- Nexus-hosted RPC must deny state-changing methods for geo-blocked users and return a consistent error:
  - `"You are accessing the service from a restricted jurisdiction"`

#### 1.3 Wallet Connections and Onboarding

- Users must be able to connect EOA wallets via WalletConnect or injected providers (MetaMask, Rabby) to both NexusOS and Nexus Layer 1.
- Signing in to NexusOS with Dynamic must automatically assign the correct chain ID to the user's wallet.
- Nexus Mainnet must allow deployment of bridge and protocol contracts for bridging and on-ramp providers.
- Contract addresses and deposit flows must be documented in Nexus docs.

#### 1.4 Testnet Assets & Faucet

- A test NEX faucet must be available to developers and testers.
  - **Dependency:** Clear public communication about the relationship between test NEX and airdrop proxy.
  - **Caveat:** Exploring provision by infra provider. ⏰
- Faucet requirements:
  - 0.001 NEX per day, per address.
  - Enforce 24h rate limiting per EVM address.
  - Enforce IP-based and address-based anti-abuse rules.
  - Enforce OFAC geo-block.
- Admin override: Nexus team must be able to mint and send test NEX above faucet limits for internal testing and partners.

---

### 2. Chain Architecture

#### 2.1 Node Types and Specs

- Nexus nodes are deployed as a multi-container system of three Docker images: consensus component, execution (EVM) component, and supporting services.
- All components are versioned and released in lockstep, share a single genesis configuration per network, and must run together to form a functional node.
- Three node types:

| Node Type | Role | Spec |
|-----------|------|------|
| **Validator Node** | Participates in consensus and produces blocks. Must not expose public RPC. | 6 vCPU · 16–32 GB RAM · 300 GB NVMe SSD |
| **Full Node** | Provides RPC and API for clients. Acts as security layer between clients and validators. | 6 vCPU · 16–32 GB RAM · 300 GB NVMe SSD |
| **Archive Node** | Maintains full historical state. Used for indexing, explorers, and failover. | ≥6 vCPU · 16–32 GB RAM · 500+ GB NVMe SSD (final sizing TBD) |

- Ports:
  - Ethereum JSON-RPC over HTTPS: 443 or 8545
  - WebSocket RPC: 8546
  - Node peering: 30303
  - Engine/consensus interface: 8551

- Nexus must define an upgrade process for internal and external use across all three node types.
- Architecture must allow adding modules (staking, new precompiles) via governance-controlled upgrades without a state reset.

#### 2.2 Network & Validators

Mainnet (Chain `3946`) launches with 7 validators:

| Operator | Nodes |
|----------|-------|
| 3 third-party validator partners | 2 validator nodes each (6 total) |
| Nexus Foundation | 1 validator node, 1 full node + RPC endpoint, 1 archive node |
| Professional RPC Provider | 1 full node + RPC endpoint, 1 archive node — **Note: EXTERNAL RESPONSIBILITY** |

- Nexus provides support for validators running primary nodes in GCP `us-central1` for low-latency block propagation.
  - High TPS design assumes colocated validators in `us-central1`.
  - Validators may use alternative setups but must meet latency requirements.
- Block proposer fee recipient must be strictly enforced to the Foundation Anchorage account across all validators. This is upgradeable when staking is introduced.

#### 2.2.1 Validator Monitoring and Support

- Validator uptime requirement: ≥ 99.9% (enforced by contractual agreement).
- Monitoring must check every block for validator signatures and alert if:
  - A validator misses ≥3 blocks in a rolling 5-minute window, or ≥1% of blocks over 10 minutes.
- ≥3 simultaneous node failures trigger emergency coordination and restoration to ≥5 validators to prevent network halt.

#### 2.3 Operational Responsibilities

| Entity | Responsibilities |
|--------|-----------------|
| **Nexus Foundation** | Owns RPC domain. Owns governance and validator onboarding relationships. |
| **Nexus Labs** | Operates Foundation's nodes (1 validator, 1 full, 1 archive). Provides 24/7 on-call support. Meets 99.9% uptime for Foundation's infra. |
| **Validators** | Coordinate upgrades via scheduled activation block heights. Contractually obligated to participate. |

#### 2.4 Storage and Memory Requirements

Initial disk usage at genesis:

| Node | Execution (reth) | Consensus/Cosmos |
|------|-----------------|------------------|
| Validator | 100 GB | 100 GB |
| Full node | 100 GB | 100 GB |
| Archive node | 1,000 GB (combined) | — |

Expected storage growth rates:

| Component | Daily Growth | Monthly Growth |
|-----------|-------------|----------------|
| EVM State (accounts, contracts, storage) | 0.5–1.5 GB | 15–45 GB |
| Block Data (headers + bodies) | 0.3–0.6 GB | 9–18 GB |
| Logs & Receipts *(primary growth driver)* | 1–2 GB | 30–60 GB |

- Firm requirement: system must handle 20% above these growth rates.

Peak memory usage:

| Load Level | Validator | Full Node | Archive Node |
|------------|-----------|-----------|--------------|
| Normal (≤20% capacity) | 8–16 GB | 8–16 GB | 8–16 GB |
| Sustained (30–40% capacity) | 8–12 GB | 12–16 GB | 16–24 GB |
| Snapshot generation/restore | — | 16–20 GB | 20–28 GB |

---

### 3. User Experience

#### ~~3.1 NexusOS (Testnet to Mainnet Transition)~~

- ~~Upon Mainnet launch, `app.nexus.xyz` should feature the Compute tab, but not the Trade tab. Trade tab should be visible but disabled.~~
- ~~An additional domain `testnet.app.nexus.xyz` should replicate `app.nexus.xyz` with both Compute and Trade tabs.~~

#### 3.2 Compute Network (Testnet to Mainnet Transition)

- The compute network must remain pointed at Testnet (`3945`).

---

### 4. Network Economics

#### 4.1 Fees and Gas

- Apply EIP-1559-based fee and tip mechanism, identical to Ethereum Mainnet.
- All fees flow to Foundation-owned account. **Dependency: Must specify address.** ⏰
- Gas estimation accuracy requirements:

| Operation Complexity | Accuracy Requirement |
|---------------------|---------------------|
| Simple operations | ±10% of actual gas used |
| Moderately complex operations | ±15% of actual gas used |
| Complex contract interactions | ±20% of actual gas used |

- Gas estimation must remain stable under ≤70% network load, ≤2× mempool size, and normal validator propagation delays (<200ms).

#### 4.2 Rewards Distribution

- A dedicated EOA address (**rewards pool**) must be created to hold tokens for rewards distribution.
  - Must be owned and operated exclusively by Nexus, created from the Foundation custody account.
  - Must be able to receive $NEX.
  - The orchestrator distributes rewards from the rewards pool to users.
  - Reward distribution must be configurable exclusively by Nexus.

---

### 5. Smart Contracts & Developer Experience

- **Standard EVM Tooling:** Developers must be able to deploy smart contracts via standard EVM and RPC tooling. Work with a professional RPC provider (Alchemy, Infura, or other) to ensure professional RPC and archival node access.
- **Canonical NEX Wrapper (WNEX):** An exact replica of the WETH contract. Required for smart contract interactions with native $NEX. Must be deployed on both mainnet and testnet.

---

### 6. Security and Recovery

- Complete audits and fix all critical/high issues before mainnet launch.

#### 6.1 Admin & Governance Controls

- Nexus admin accounts must be able to:
  - Pause or restrict specific system contracts, including the $USDX contract and bridge contracts.
  - Update whitelists/allowlists (for gas sponsorship, oracle updaters).
- **A privileged Foundation-owned EOA must be created as the designated canonical deployer public key. Daniel to manage.**
- Admin UI (lightweight internal console) must allow product, engineering, and project leads to:
  - View system contract status.
  - Trigger emergency actions (pause, unpause).
  - Rotate privileged addresses.
  - Monitor validator block signing.

#### 6.2 Disaster Recovery

- Chain halting is acceptable if the regional GCP `us-central1` instance fails.
- DR procedures must be defined and tested for:

| Class | Incident Types |
|-------|---------------|
| **P0 — Chain Integrity Risk** | State corruption or divergence; incorrect finalization or fork; invalid validator signatures; unauthorized mint/burn or bridge misbehavior. |
| **P1 — Network Availability Risk** | Chain halt or sustained block production failure; ≥3 validator nodes offline; RPC unavailability exceeding SLA; failed upgrade impacting block production. |

- Automated monitoring must detect and alert on all P0/P1 incident types within **≤30 seconds**.
- Alerts must page Nexus Labs on-call and the Nexus Foundation designated incident owner.
- Nexus Foundation retains final authority to halt the chain, approve rollback, and authorize hotfix deployment.
- Archive node snapshot requirements:
  - Verified state snapshots every **6 hours**.
  - Retain **last 30 snapshots**.
  - Stored redundantly in GCP and S3-compatible cold storage.
  - Snapshots must include: full EVM state, consensus metadata, chain parameters, historical logs required by indexers.
- **Recovery Point Objective (RPO): ≤ 6 hours.**
- Hotfix activation requires explicit Nexus Foundation approval and ≥⅔ validator agreement.
- Prior to Mainnet launch, Nexus must test DR procedures in staging with ≥1 external validator partner, covering: chain halt scenarios, snapshot restore, validator failure, and failed upgrade rollback.
- No incident may result in irreversible state corruption. No recovery action may introduce supply inconsistency for $NEX or $USDX.

---

### 7. Ecosystem Integration

#### 7.1 Bridge

- LayerZero external partner. **Note: bridge contract deployment is EXTERNAL RESPONSIBILITY.**
- Add Bridging UX flow in NexusOS (Bridge In / Bridge Out) via Halliday bridge aggregator widget.
  - **Dependency: Design required. Pending collaboration with designer.** ⏰

#### 7.1.1 Bridging $NEX from ETH Mainnet → Native Gas on Nexus

- Goal: Users who bridge NEX from Ethereum receive native NEX automatically — no manual claim or pre-existing NEX balance required.
- Architecture:
  1. NEX on Ethereum bridged via LayerZero OFT/OFTAdapter pattern.
  2. Nexus deploys WNEX ERC-20 wrapper (`deposit()` wraps NEX → WNEX 1:1; `withdraw()` burns WNEX → native NEX 1:1).
  3. Nexus deploys a trusted **Composer contract** that:
     - Receives bridged WNEX during OFT receive flow.
     - Calls `withdraw()` on WNEX to unwrap into native NEX.
     - Transfers native NEX to the end-user address from the compose payload.
  4. Composer must verify `msg.sender == LayerZero endpoint` and that the originating OFT is the trusted Ethereum NEX OFT.
- The user initiates bridging with a single action. No manual claim step on Nexus.
- If compose fails: user must not lose funds; retry mechanism must be available; UI must surface pending/failed/completed status.
- WNEX must be fully redeemable 1:1 into native NEX at all times.
- Minimum relayer funding threshold: **75 trillion $NEX**. If below threshold, bridging must be automatically paused or rate-limited.
- Emergency pause must stop new incoming bridge credits without stranding previously locked tokens.
- Docs must include: Ethereum NEX address, Nexus WNEX address, Nexus Composer address, flow explanation, and retry troubleshooting steps.

#### 7.2 Indexer

- **Note: EXTERNAL RESPONSIBILITY.**
- Must index: transactions, logs/events, contract metadata.
- Must be integrated with public explorer.
- **Dependency:** Confirm indexing process is compatible with the dual-client chain architecture.

#### 7.3 Explorer

- **Note: EXTERNAL RESPONSIBILITY.**
- Must support manual contract verification and easy link sharing.
- Must be part of Nexus brand.

#### 7.4 On/OffRamp

- Halliday smart contract protocol deployment on Nexus Layer 1. **Note: EXTERNAL RESPONSIBILITY.**
- UX: 'Deposit' button in NexusOS opens the Halliday on-ramp aggregation widget.

---

### X. ADDENDUM — Safe Contracts

#### X.1 Safe Singleton Factory

Deploy using Safe's official deterministic deployment flow ([safe-singleton-factory](https://github.com/safe-global/safe-singleton-factory)) for both testnet and mainnet:

1. Open issue on `safe-singleton-factory` repo providing: blockchain name, chain ID, Chainlist link, RPC URL, explorer URL.
2. Fund signer address with ≥0.001 NEX.
3. Submit presigned transaction.

Chainlist status:
- Testnet PR submitted ✅ — [Chain 3945](https://chainlist.org/chain/3945)
- Mainnet PR waiting on private mainnet launch ⏰ — **Dependency: Alec to handle.**

Deployment:
- Check `artifacts` folder for Nexus Mainnet presigned transaction.
- Signer: `0xE1CB04A0fA36DdD16a06ea828007E35e1a3cBC37` (nonce = 0 on target chain).

#### X.2 Other Key Contracts

Deploy via Safe Singleton Factory using [safe-contracts](https://github.com/safe-global/safe-contracts) v1.3.0:

1. `GnosisSafeProxyFactory`
2. `GnosisSafe`
3. `GnosisSafeL2`
4. `DefaultCallbackHandler`
5. `CompatibilityFallbackHandler`
6. `MultiSend`
7. `MultiSendCallOnly`
8. `CreateCall`
9. `SignMessageLib`
10. `SimulateTxAccessor`

#### X.3 Safe Contract Verification

After deployment:
- Verify all contracts on explorer.
- Record verification status; investigate any failures (e.g., MultiSend, SimulateTxAccessor).
- Confirm ABI and source match Safe repo v1.3.0.
- Publish addresses on [Safe Deployments repo](https://github.com/safe-global/safe-deployments) via PR.

#### X.4 Facilitating Internal Use of Safe

**Multi-sig Deployment Script:**
- Connects to Nexus RPC and calls `GnosisSafeProxyFactory.createProxyWithNonce`.
- Encodes `GnosisSafe.setup(...)` initializer; deploys proxy in 1 transaction.
- Outputs deployed Safe address, transaction hash, and human-readable summary.
- Configurable inputs: `owners: address[]`, `threshold: uint256`, `saltNonce: uint256`, `fallbackHandler: address`.
- Post-deployment: call `getOwners()`, `getThreshold()`, confirm Safe nonce = 0.

**Internal Signing Page:**
- Minimal web page for Safe owners to: connect hardware-backed wallet via MetaMask, review a Safe transaction payload, and sign via EIP-712.
- Must: connect to MetaMask (`window.ethereum`), display connected address and chain ID, block signing if chain ID ≠ Nexus chain ID, prompt network switch if needed.

---

### Y. ADDENDUM — RPC Endpoint and Archive Node

#### Y.1 Topology

- Public RPC (`https://mainnet.rpc.nexus.xyz` / `wss://mainnet.rpc.nexus.xyz`) must use a three-layer architecture:
  1. **Cloudflare Pro** — DDoS mitigation, OFAC geo-blocking, WAF, IP rate limiting, response caching, TLS termination.
  2. **Self-hosted full nodes on AWS EKS** — primary RPC compute, behind a Kubernetes load balancer.
  3. **[3rd-party] dTeam dedicated backup node** — warm failover; 1 node, 1,000 RPS, unlimited monthly requests; activates only when primary is unhealthy or saturated.
- Same architecture replicated for testnet (smaller EKS footprint: 1 pod, no HPA).
- Archive node serves `debug_*`, `trace_*`, and historical block queries only — must NOT be in the default RPC serving path. Routing must be enforced at the API gateway or Cloudflare layer.

#### Y.2 Cloudflare Configuration

- Deploy **Cloudflare Pro** ($20/month) as reverse proxy for `mainnet.rpc.nexus.xyz` and `testnet.rpc.nexus.xyz`.
- Configure **Full (Strict) TLS** mode with origin certificate on EKS ingress.
- **OFAC Geo-Blocking:**
  - Block countries: Cuba (`CU`), Iran (`IR`), North Korea (`KP`), Syria (`SY`).
  - Block regions: Crimea (`UA-43`), Luhansk (`UA-09`), Donetsk (`UA-14`).
  - Rule expression: `(ip.geoip.country in {"CU" "IR" "KP" "SY"}) or (ip.geoip.subdivision_1_iso_code in {"UA-43" "UA-09" "UA-14"})`
  - Apply to all Nexus-hosted public endpoints.
- **DDoS Protection:**
  - HTTP DDoS managed ruleset always-on.
  - Disable on the RPC path: Browser Integrity Check, JavaScript Challenges, Under Attack mode.
- **Rate Limiting:**
  - Human-facing keys (wallet frontends, block explorer): higher threshold.
  - Bot/indexer keys: lower threshold.
  - Breached callers receive `HTTP 429` with `Retry-After` header.
- **Response Caching (TTL 1–2 seconds):**
  - Cacheable: `eth_blockNumber`, `eth_gasPrice`, `eth_getBlockByNumber`, `eth_chainId`, `net_version`.
  - Never cache: `eth_sendRawTransaction`, `eth_sendTransaction`.
  - Estimated 25–35% reduction in origin read load.
- **Write Throttling:**
  - Separate rate limiting rule scoped to `eth_sendRawTransaction`.
  - Starting recommendation: 10 write requests/second per IP. Final threshold set during pre-launch load testing.

#### Y.3 Self-Hosted RPC Full Node

- EKS cluster in **us-east-1** (low-latency to GCP `us-central1` validator set).
- Pod resources:
  - CPU: 6 vCPU (request), 8 vCPU (limit)
  - Memory: 16 GB (request), 24 GB (limit)
  - Storage: 500 GB gp3 EBS PersistentVolume per pod
- **Horizontal Pod Autoscaler:**
  - Months 1–6: min 1 replica, max 4 replicas.
  - Months 9–12: min 4 replicas, max 12–16 replicas.
  - Scale triggers: RPS >70–80% of benchmarked capacity, or CPU >70%.
  - Cooldown: 5 min scale-up, 15 min scale-down.
  - **Dependency: Snapshot-based pod initialization required for HPA to be effective (see Y.3.1).**
- **Health Checks:** Each pod must confirm: synced to chain head (≤2 blocks behind), RPC accepting connections, and both consensus and execution containers healthy. Unhealthy pods removed from serving pool within 30 seconds.
- **WebSocket Support:**
  - Expected WS load: ~200 concurrent (months 1–6) → ~4,900 concurrent (month 12).
  - Configure Cloudflare WebSocket proxying (supported on Pro).
  - K8s ingress idle timeout ≥ 60 seconds.

#### Y.3.1 Snapshot Requirement for Autoscaling

- Before mainnet launch: new RPC node pods must be able to initialize from a recent chain state snapshot rather than syncing from genesis.
  - Automated periodic EBS snapshots every 6 hours.
  - HPA launch template uses most recent snapshot.
  - Target: new pod serving traffic within **2–5 minutes** of scale-up trigger.
- **If not completed before mainnet:**
  - HPA autoscaling is unusable for burst response.
  - Baseline pod count must increase to 2 (months 1–6), adding ~$320/month in compute.
  - dTeam backup becomes sole burst mechanism, capped at 1,000 RPS.

#### Y.4 Archive Node

- Must retain full historical state at every block height.
- Must serve only: `debug_*`, `trace_*`, and `eth_getStorageAt`/`eth_getBalance`/`eth_call` at non-`latest`/`pending` block heights.
- Routing mechanism (Cloudflare Workers, K8s ingress annotations, or RPC proxy) is an engineering decision.

---

## 5. Non-Functional Requirements

- **NFR-001 [Security]:** All critical and high audit findings must be resolved before mainnet launch.
- **NFR-002 [Compliance]:** All Nexus-hosted services must enforce OFAC geo-blocking with no exceptions.
- **NFR-003 [Availability]:** Chain production uptime ≥ 99.5% over any rolling 30-day period.
- **NFR-004 [Availability]:** RPC availability ≥ 99.9% over any rolling 30-day period.
- **NFR-005 [Recoverability]:** RPO ≤ 6 hours. No incident may result in irreversible state corruption.

### Performance Requirements

| Requirement | Metric | Target | Percentile | Conditions |
|-------------|--------|--------|------------|------------|
| Block time | Block production interval | 1–2 seconds | p50 | Normal load |
| Block time stability | Block time variance | ≤ 10% | — | 30–40% sustained load |
| Finality | Blocks to finality | Exactly 1 block | — | — |
| Validator latency | Block propagation to ≥⅔ validators | ≤ 300ms | p95 | — |
| Validator latency | Block propagation to ≥⅔ validators | ≤ 500ms | p99 | — |
| Simple tx throughput | TPS | 400–600 TPS | — | Steady state |
| Contract interaction throughput | TPS | 150–250 TPS | — | Steady state |
| Burst throughput | TPS | ~250 TPS | — | Sustained ≥ 60 seconds |
| Transaction success rate | Non-reverted transactions | ≥ 99% | — | Any 5-minute window |
| RPC read latency | Response time | ≤ 150ms | p50 | — |
| RPC read latency | Response time | ≤ 350ms | p95 | — |
| RPC read latency | Response time | ≤ 700ms | p99 | — |
| RPC throughput | Requests/second | 5,000 req/sec | — | Sustained ≥ 10 minutes |
| Halt detection | Time to automated alert | ≤ 30 seconds | — | From incident onset |

### 9. Monitoring Requirements

Monitoring systems must be developed to track every metric in Section 0. General principles:
- Single source of truth per metric.
- Queryable historically.
- Passive measurement preferred.

| Metric | Monitoring Requirement |
|--------|----------------------|
| Target block time | Measure rolling 5-minute average block interval; alert if outside 1–2s. |
| Block time stability | Calculate block time variance; alert if >10% over any 10-minute window at ≥30% capacity. |
| Finality time | Verify every block finalises in exactly 1 block; alert immediately on deviation. |
| Simple tx TPS | Compute successful simple tx throughput; alert if sustained TPS <400 with non-empty mempool. |
| Contract interaction TPS | Compute successful contract call throughput; alert if sustained TPS <150 under normal load. |
| Burst TPS | Detect burst periods; verify ~250 TPS sustained ≥60s without increased revert rate or block time instability. |
| Transaction success rate | Track receipt status; alert if non-reverted rate <99% over any 5-minute window. |
| Pending tx capacity | Track mempool size and eviction events; alert on unexpected or non-deterministic eviction. |
| Ordering consistency | Periodically compare ordering across validators; alert on divergence. |
| RPC availability | Externally probe RPC endpoints; alert if availability <99.9% over rolling 30 days. |
| RPC read latency | Record RPC response latency; alert if p50, p95, or p99 exceed SLA thresholds. |
| RPC throughput | Measure sustained RPC request throughput; alert if 5,000 req/sec cannot be maintained for 10 minutes. |
| Write throttling | Verify write rate limiting is enforced; alert on unthrottled or failed enforcement. |
| Validator uptime | Track validator block participation; alert if any validator's uptime <99.9%. |
| Chain production uptime | Measure continuous block production; alert if uptime <99.5% over rolling 30 days. |
| Fault tolerance | Track active validator count; alert if approaching or crossing ⅓ failure threshold. |
| State corruption | Detect state root mismatch or execution DB corruption; raise immediate P0 alert. |
| Snapshot frequency | Verify snapshots created at least every 6 hours; alert on missed intervals. |
| Snapshot retention | Ensure last 30 snapshots are retained; alert on premature deletion. |
| Recovery sources | Periodically validate deterministic recovery from snapshots; alert on reconstruction failure. |
| Halt detection | Detect absence of block production within 30 seconds; trigger automated alerts. |
| Rollback capability | Verify rollback tooling can revert to last safe block; log successful execution. |
| Hotfix deployment | Track validator approvals; prevent hotfix execution without ≥⅔ consent. |

---

## 6. Acceptance Requirements

### 6a. Functional Acceptance

- [ ] **AC-001:** Chain ID 3946 is live and accepting transactions on mainnet.
- [ ] **AC-002:** $NEX genesis supply of 100T is confirmed in Foundation custody account.
- [ ] **AC-003:** All 7 validators are online and participating in consensus.
- [ ] **AC-004:** RPC endpoints are live at `https://mainnet.rpc.nexus.xyz` and `wss://mainnet.rpc.nexus.xyz`.
- [ ] **AC-005:** Safe Singleton Factory and all X.2 contracts deployed and verified on both testnet and mainnet.
- [ ] **AC-006:** WNEX contract deployed and functional on both testnet and mainnet.
- [ ] **AC-007:** LayerZero bridge Composer contract deployed and end-to-end bridge flow tested.
- [ ] **AC-008:** OFAC geo-blocking is enforced across all Nexus-hosted public endpoints.
- [ ] **AC-009:** Faucet is live and enforcing rate limits on testnet.
- [ ] **AC-010:** Admin console is operational and accessible to designated leads.

### 6b. Non-Functional Acceptance

- [ ] **AC-NFR-001:** Load test confirms Section 0 TPS and RPC latency targets under sustained load.
- [ ] **AC-NFR-002:** Security audit complete; all critical and high findings resolved.
- [ ] **AC-NFR-003:** Cloudflare OFAC block rules validated against all sanctioned jurisdictions.
- [ ] **AC-NFR-004:** Snapshot restore tested end-to-end; RPO ≤ 6 hours confirmed.
- [ ] **AC-NFR-005:** HPA snapshot-based pod initialization tested; new pod serves traffic within 5 minutes.

### 6c. Documentation Acceptance

- [ ] **AC-DOC-001:** PRODUCT_MAP.md updated to reflect `Shipped` status.
- [ ] **AC-DOC-002:** CLAUDE.md updated if any invariants or module boundaries changed.
- [ ] **AC-DOC-003:** Nexus docs published: chain config, bridge flow, Safe addresses, WNEX address, Composer address, deposit flow, retry troubleshooting.
- [ ] **AC-DOC-004:** DR runbooks defined and reviewed with Nexus Labs.

### 6d. Definition of Done

All AC items above are checked AND:
- [ ] All features are deployed to production.
- [ ] On-call runbooks updated for all new failure modes.
- [ ] Spec status updated to `Shipped` in this file.
- [ ] DR procedures rehearsed in staging with ≥1 external validator partner.

---

## 7. Open Questions

- [ ] **OQ-001** — NEX Foundation custody address from Anchorage — Owner: @alec — Resolve by: before genesis
- [ ] **OQ-002** — Gas fee recipient address — Owner: @Daniel Marin — Resolve by: before genesis
- [ ] **OQ-003** — Rewards pool EOA address — Owner: @Daniel Marin — Resolve by: before genesis
- [ ] **OQ-004** — Foundation canonical deployer public key — Owner: @Daniel Marin — Resolve by: before genesis
- [ ] **OQ-005** — Chainlist mainnet PR (waiting on private mainnet launch) — Owner: @alec — Resolve by: before mainnet
- [ ] **OQ-006** — Bridge UX design — Owner: @alec — Resolve by: before mainnet
- [ ] **OQ-007** — Professional RPC provider agreement (for validator partner bundle) — Owner: @Alex Fowler — Resolve by: before mainnet
- [ ] **OQ-008** — Faucet provision by infra provider confirmed or denied — Owner: @alec — Resolve by: before testnet
- [ ] **OQ-009** — Minimum relayer funding threshold for LayerZero bridge (75T NEX confirmed?) — Owner: @Stanley Jones — Resolve by: before bridge deployment

---

## 8. Success Metrics

| Metric | Target | Measurement Method |
|--------|--------|--------------------|
| Chain production uptime | ≥ 99.5% over 30 days | Block production monitoring |
| RPC availability | ≥ 99.9% over 30 days | External RPC probe |
| Simple tx TPS (steady state) | 400–600 TPS | Load test + production monitoring |
| Transaction success rate | ≥ 99% non-reverted | Transaction receipt tracking |
| Finality | Exactly 1 block | Per-block finality verification |
| Validator uptime | ≥ 99.9% per validator | Block signature monitoring |
| State corruption incidents | Zero | State root validation |
| Halt detection time | ≤ 30 seconds | Automated alert latency measurement |
| Bridge end-to-end success rate | ≥ 99% | Bridge transaction monitoring |

---

## 9. Sign-off

| Team | Reviewer | Status | Date |
|------|----------|--------|------|
| Product | @Daniel Marin | Approved ✅ | January 9, 2026 |
| Engineering | @Stanley Jones, @Alex "Sasha" Potashnik | Approved ✅ | January 13, 2026 |
| Marketing | @Lauren Dresnick, @Daniel McGlynn | Approved ✅ | January 9, 2026 |
| Security | @Ben Speckien | Approved ✅ | January 9, 2026 |
| Legal | @Lisa Haugh, @Roza Nader | Pending ⏰ | — |
| BD | @Alex Fowler | Pending ⏰ | — |

---

## 10. Changelog

| Date | Author | Change |
|------|--------|--------|
| 2026-03-04 | @alec | Migrated V1 spec into SPEC.md template |
| 2026-01-13 | @Stanley Jones, @Alex "Sasha" Potashnik | Engineering sign-off |
| 2026-01-09 | @Daniel Marin | Product, Marketing, Security sign-off |

---

## Appendix — Contextual Notes

### Gas Costs on Nexus Testnet

| Scenario | Gas Used | Fee (wei) | Fee (ETH) |
|----------|----------|-----------|-----------|
| Tiny deploy | 200,000 | 1,600,000 | 0.0000000000016 |
| Medium deploy | 1,000,000 | 8,000,000 | 0.000000000008 |
| Large deploy | 3,000,000 | 24,000,000 | 0.000000000024 |

| Scenario | Gas Used | Fee (wei) | Fee (ETH) |
|----------|----------|-----------|-----------|
| Simple write | 25,000 | 200,000 | 0.0000000000002 |
| ERC20-like transfer | 60,000 | 480,000 | 0.00000000000048 |
| Heavier tx | 200,000 | 1,600,000 | 0.0000000000016 |

The effective gas price on Nexus will most likely be far lower than Ethereum. The only difference in fee calculation is `effectiveGasPrice`.
