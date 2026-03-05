# Glossary

Canonical definitions for Nexus domain terminology. When in doubt, these definitions govern. If a term is used in a spec with a meaning that conflicts with this glossary, the glossary takes precedence and the spec must be updated.

Last updated: 2026-03-03 | Owner: @alec

**MOVE THIS TO TOP FOLDER**

---

## Nexus Exchange

The Nexus trading venue. A spot and perpetual futures exchange that competes with the best centralised exchanges in the world — Binance, Bybit, Coinbase, Hyperliquid. The Exchange offers CEX-grade performance with non-custodial, trustless execution: assets are held natively, there is no counterparty risk, and every trade is provable. The Exchange is the product. The blockchain, zkVM architecture, and USDX are features that make it work.

Do not describe the Exchange as a DEX, decentralised exchange, DeFi exchange, or trading protocol.

## Exchange Blockchain

The purpose-built blockchain that powers the Nexus Exchange. The blockchain exists to make the Exchange fast, verifiable, and composable — it is not a separate product. Every state transition on the Exchange blockchain produces a validity proof, so execution is verifiable without trusting an operator. Also referred to as "the chain."

Do not describe as L1, L2, ZK L2, ZK rollup, or as a product separate from the Exchange. Do not use the framing "the L1 and the Exchange" or "Exchange built on the L1."

## zkVM

A zero-knowledge virtual machine that executes transactions and generates cryptographic validity proofs for every state transition. On the Exchange blockchain, the zkVM is EVM-compatible — every trade is automatically proven, so execution can be verified without trusting an operator. The zkVM does not reveal the contents of user transactions to the prover network — only public inputs and the proof task are exposed.

ZK is infrastructure, not a headline. Lead with the benefit — verifiable execution — not the proof system.

Do not describe as "ZK exchange," "ZK-powered," or "ZK-first." See: [zkVM Spec](../product/specs/zkvm/SPEC.md).

## Prover Network

The network of nodes (called Provers) that receive proof generation tasks from the Nexus sequencer and submit validity proofs to the settlement layer, making every Exchange state transition independently verifiable. Provers are economically incentivized via proof fees and subject to slashing for liveness failures. The prover network becomes permissionless in Phase 2 — any operator meeting the hardware and staking requirements may register.

## USDX

The Nexus Exchange's native margin and quote currency, pegged 1:1 to USD. USDX earns yield on idle capital and is composable with DeFi. USDX is an exchange primitive — it should be described in the context of what makes the Exchange work well for traders, not as a standalone stablecoin protocol.

USDX yield is derived from on-chain protocol revenue — not from new token issuance. In v1, USDX supply can only be reduced through governance-authorized burns; there is no programmatic burn path. All USDX transfers must implement both ERC-5564 stealth address privacy and the compliance selective disclosure layer simultaneously.

Do not describe as "the USDX stablecoin protocol," "our yield product," or "DeFi-native stablecoin." See: [USDX Spec](../product/specs/usdx/SPEC.md).

## Verifiable Finance

The era of open, programmable, verifiable financial markets. Financial applications in the Verifiable Finance era produce cryptographic proofs of correctness that any party can verify without trusting the operator, auditor, or platform. Nexus is building for the Verifiable Finance era.

Verifiable Finance is not a brand, product name, or tagline for the Exchange. It names the era and provides context for why Nexus matters.

Do not say: "the Verifiable Finance platform," "Verifiable Finance by Nexus," "our VF product." Verifiable finance is distinct from transparent finance (where state is visible but not proven) and from trusted finance (where correctness is asserted by a counterparty).
