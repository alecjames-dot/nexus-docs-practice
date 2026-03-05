<briefing>

  <context-acquisition>
    <instruction>Before taking any action, acquire context in this order.</instruction>
    <step order="1" file="PRODUCT_MAP.md">Read to determine the current status of any document before referencing or acting on it.</step>
    <step order="2" file="GLOSSARY.md">Read for definitions of all domain terms used in specs and discussions.</step>
    <step order="3" file="docs/product/specs/{product}/SPEC.md">Read the relevant spec for the product area you are working in.</step>
  </context-acquisition>

  <repo-map>
    <path location="PRODUCT_MAP.md">Canonical status index for all documents. Always read first.</path>
    <path location="docs/product/specs/">Feature specs organized by product: nexus-mainnet, nexus-exchange, usdx, zkvm.</path>
    <path location="docs/product/ROADMAP.md">Phase-by-phase delivery plan.</path>
    <path location="docs/user-research-insights/">User research findings.</path>
    <path location="GLOSSARY.md">Definitions for all domain terms.</path>
    <path location=".github/pull_request_template.md">PR template with spec checklist.</path>
  </repo-map>

  <status-lifecycle>
    <instruction>The status in PRODUCT_MAP.md is the canonical source of truth. Do not infer status from the document itself.</instruction>
    <status name="BACKLOG">Not yet shaped. Do not act on.</status>
    <status name="DRAFT">Work in progress. Not approved. Do not build to without explicit team sign-off.</status>
    <status name="SCOPING">Being sized and estimated. Do not build to.</status>
    <status name="SPECIFYING">Spec being written and refined. Sub-stages: Detailed Requirements → In Review → Signed Off → Detailed Estimation. Do not build to.</status>
    <status name="APPROVED">Stable. Safe to implement.</status>
    <status name="SCHEDULING">Prioritized, resources committed. Do not build to.</status>
    <status name="STARTED">In active development.</status>
    <status name="SHIPPED">Live in production. Treat as a historical record — do not modify.</status>
    <status name="DEPRECATED">Superseded or abandoned. Do not reference under any circumstances.</status>
  </status-lifecycle>

  <rules>
    <rule id="1">Do not generate code or specs for any document with DRAFT status without explicit team sign-off.</rule>
    <rule id="2">Do not reference or build to any DEPRECATED document under any circumstances.</rule>
    <rule id="3">If a spec does not exist for what you are building, write one before writing any code.</rule>
    <rule id="4">Any time you add, move, or deprecate a document, update PRODUCT_MAP.md in the same commit.</rule>
    <rule id="5">A spec is not APPROVED until both the product lead and engineering lead have added their handle and date to the Approved by fields in the spec header.</rule>
  </rules>

  <invariants>
    <instruction>These are non-negotiable. Flag any code, spec, or design that contradicts them immediately — do not proceed silently.</instruction>
    <invariant id="1" name="usdx-yield-source">USDX yield must be sourced exclusively from on-chain protocol revenue. It must never derive from new token issuance, treasury drawdowns, or off-chain yield sources.</invariant>
    <invariant id="2" name="proof-input-privacy">Proof generation must never expose user input data to the prover network. Provers receive only public inputs and the proof task — raw user transactions are never transmitted.</invariant>
    <invariant id="3" name="yield-determinism">Yield calculations must be deterministic and fully auditable on-chain. Any calculation that depends on off-chain state or non-reproducible inputs is prohibited.</invariant>
  </invariants>

  <spec-conventions>
    <required-sections>
      <section>Context (Investment Case, Opportunity Cost, Effort)</section>
      <section>Summary of Features</section>
      <section>Invariants the spec must not violate</section>
      <section>Open questions and blocking decisions</section>
    </required-sections>
    <linear-handoff>
      <rule>Every Linear ticket created from a spec must link to the spec file.</rule>
      <rule>The spec is the source of truth — update the spec first, then the ticket.</rule>
      <rule>Update the spec's Linear: header field before or when tickets are created.</rule>
      <rule>Mark a spec SHIPPED only after the spec owner verifies all Acceptance Requirements.</rule>
    </linear-handoff>
  </spec-conventions>

</briefing>
