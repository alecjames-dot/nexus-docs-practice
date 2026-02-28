# Changelog

All notable changes to the Nexus protocol documentation are recorded here.
Format: `YYYY-MM-DD — Summary (reference)`

---

## 2026-02-01 — USDX Compliance Spec promoted to Review

The USDX Compliance Spec ([COMPLIANCE-SPEC.md](docs/product/specs/usdx/COMPLIANCE-SPEC.md)) has been promoted from Draft to Review status following completion of the technical design for the selective disclosure layer. Open questions remain pending legal review. PRODUCT_MAP.md updated accordingly.

---

## 2026-01-15 — ERC-5564 adopted; custom stealth scheme deprecated (ADR-005)

Following [ADR-005](docs/architecture/decisions/ADR-005-erc5564-over-custom.md), the team adopted ERC-5564 as the standard for stealth address implementation across all USDX transfers. The previously specced custom ECDH stealth scheme has been deprecated. The deprecated spec is preserved at [docs/product/specs/privacy/_deprecated-custom-stealth/SPEC.md](docs/product/specs/privacy/_deprecated-custom-stealth/SPEC.md) for historical reference. All new development must target [docs/product/specs/privacy/erc5564/SPEC.md](docs/product/specs/privacy/erc5564/SPEC.md).
