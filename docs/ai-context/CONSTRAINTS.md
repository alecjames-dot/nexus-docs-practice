# Nexus Non-Negotiable Constraints

These constraints are architectural and regulatory facts, not preferences. They cannot be overridden by a spec, a PR, or a product decision without a formal ADR and explicit team sign-off. Any implementation that violates these constraints must be blocked in review.

Last updated: 2026-02-27 | Owner: @alec

---

## Security

**SEC-001: Proof input privacy is inviolable.**
The zkVM proof generation pipeline must never transmit raw user transaction data to the prover network. Provers receive only: (a) the public inputs to the proof computation, (b) the proof task specification, and (c) any public parameters required to run the computation. User inputs, private keys, transaction contents, and any data that would allow a Prover to correlate a proof task to a specific user are never transmitted.

**SEC-002: Prover key isolation.**
Prover operator signing keys must be isolated from proof computation keys. A compromise of the proof computation environment must not yield the operator's staking private key. Implementations that co-locate these key types are prohibited.

**SEC-003: Settlement layer proof verification is not skippable.**
State transitions may not be finalized on the settlement layer without a verified validity proof. There is no emergency bypass, admin key, or upgrade path that allows unproven state transitions to be committed. Any proposed upgrade that introduces a bypass mechanism requires a governance vote and a new ADR.

**SEC-004: USDX contract upgrade authority.**
The USDX contract is upgradeable only via the governance timelock. No EOA or multisig may upgrade the USDX contract unilaterally. This applies to all contracts in the USDX system (issuance, yield distribution, compliance layer).

---

## Compliance

**COMP-001: Privacy and compliance are always paired.**
All USDX transfers must implement both ERC-5564 stealth address privacy AND the compliance selective disclosure layer. It is not permissible to deploy one without the other. A transfer that is stealth-private but does not support selective disclosure is a compliance violation. A transfer that supports selective disclosure but does not use stealth addresses is a privacy violation. There is no carve-out for test environments, migration periods, or reduced-scope deployments.

**COMP-002: Selective disclosure uses zero-knowledge proofs, not data export.**
Compliance disclosure to authorized parties must be implemented as a ZK proof that reveals specific transaction attributes — not as a data dump of raw transaction records. Authorized parties verify proofs; they do not receive decrypted transaction data. Any implementation that transmits raw transaction content to a compliance party is prohibited.

**COMP-003: Viewing keys are user-controlled.**
USDX viewing keys (used for selective disclosure) are generated and held by the user. The Nexus protocol does not hold, escrow, or have access to any user's viewing key. A protocol-level key escrow system is prohibited. Key recovery is the user's responsibility.

**COMP-004: Stealth address standard is ERC-5564 only.**
Custom or non-standard stealth address schemes are deprecated and prohibited. All new USDX transfer implementations must use ERC-5564. This was established by ADR-005 and is reflected in the deprecation of the custom stealth spec.

---

## Performance

**PERF-001: Proof generation latency.**
End-to-end proof generation (from transaction submission to proof submission to the settlement layer) must complete within 2 seconds at p95 under normal network load conditions. Implementations that exceed this target under production conditions require an approved NFR exception from the technical lead.

**PERF-002: RPC response time.**
Read-path RPC calls (balance queries, proof status, transaction history) must return within 100ms at p95. Write-path RPC calls (transaction submission) must return an acknowledgment within 200ms at p95.

**PERF-003: Yield update latency.**
The USDX yield rate must be recalculated and applied within 1 block of new on-chain protocol revenue being recognized. Yield that accumulates without being credited to holders within 1 block is a protocol error requiring an incident report.

**PERF-004: Settlement finality.**
A state transition that has received a verified validity proof must be finalized on the settlement layer within 3 blocks. Unfinalized proven transitions must trigger a prover liveness alert.

---

## Economic

**ECON-001: USDX yield source is protocol revenue only.**
USDX yield must derive exclusively from on-chain Nexus protocol revenue: proof fees collected by the protocol, sequencer fees, and any future protocol-owned revenue streams explicitly approved by governance. Yield may never come from: (a) new USDX token issuance, (b) protocol treasury drawdowns, (c) off-chain yield sources, (d) real-world assets, or (e) agreements with external yield providers. Violations of this constraint undermine the "verifiable" property of USDX yield.

**ECON-002: USDX burn authority is governance-only in v1.**
No contract, module, EOA, or protocol mechanism may burn USDX supply without an explicit governance vote and execution through the governance timelock. This constraint was established by ADR-003 to resolve the conflict between early prover slashing specs (which assumed burn) and the USDX core invariants. Prover slashing penalties are directed to the treasury, not to USDX burns.

**ECON-003: Yield calculations must be deterministic and on-chain.**
The yield rate calculation — the formula that converts protocol revenue to a per-USDX yield — must be implemented entirely on-chain in a deterministic, reproducible way. No off-chain computation, oracle input, or privileged admin input may influence the yield rate. Any party must be able to independently reproduce the yield rate calculation from on-chain state alone.

**ECON-004: Prover staking minimums are governance-controlled.**
The minimum stake required for prover registration is a governance parameter, not a hardcoded constant. It may be adjusted by governance vote. Implementations that hardcode the staking minimum are prohibited.
