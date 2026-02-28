# Contributing to Nexus

This document covers the conventions, processes, and quality bars for contributing to the Nexus protocol codebase and documentation.

Last updated: 2026-02-27 | Owner: @alec

---

## Branch Naming

All branches must follow this pattern:

```
<type>/<ticket-or-short-description>
```

| Type | When to use |
|------|-------------|
| `feat/` | New feature or capability |
| `fix/` | Bug fix |
| `spec/` | Spec additions or updates |
| `adr/` | New architecture decision record |
| `docs/` | Documentation only (no code changes) |
| `refactor/` | Code change with no behavior change |
| `test/` | Test additions or fixes |
| `chore/` | Build, CI, dependency updates |

**Examples:**
- `feat/usdx-selective-disclosure`
- `spec/prover-slashing-v1`
- `adr/005-erc5564-adoption`
- `fix/yield-rounding-error`

Branch names must be lowercase, use hyphens (not underscores), and must not include your name or date.

---

## PR Size Guidelines

**Keep PRs small and focused.** A PR should do one thing. The following are hard guidelines, not suggestions:

| Measure | Guideline |
|---------|-----------|
| Lines changed | < 400 lines preferred; > 800 requires justification |
| Files changed | < 10 files preferred |
| Number of concerns | 1 — a PR that touches both a bug fix and a refactor needs to be split |
| Review time | Should be reviewable in < 30 minutes |

Large PRs are almost always a sign that the work was not planned well enough upfront. If you find yourself writing a large PR, stop and discuss with the team. Usually the right answer is to split it.

**Stacked PRs are encouraged.** If feature B depends on feature A, open PR A first and PR B as a draft. Once A merges, rebase B onto main.

---

## The Spec Checklist (Required for Feature PRs)

Every feature PR must include a completed spec checklist. The PR template (`.github/pull_request_template.md`) contains this checklist. Do not delete it.

For a PR to be merged, the following must be true:

1. **There is a spec** for the feature being shipped, with status APPROVED or higher.
2. **PRODUCT_MAP.md is updated** to reflect the correct status (e.g., if you are shipping, the status should be updated to SHIPPED in the spec file and in PRODUCT_MAP.md).
3. **CLAUDE.md is accurate.** If your changes introduce new invariants, deprecate old ones, or change module boundaries, update CLAUDE.md.
4. **CHANGELOG.md has an entry** dated to today.
5. **All ADRs are merged** before the implementation PR merges. Do not reference an unmerged ADR.

---

## ADR Process

Architecture Decision Records are how Nexus preserves the *why* behind technical decisions. They are required for decisions that are:
- Hard to reverse
- Affect more than one system component
- Introduce a new external dependency
- Constrain future options significantly

**Process:**

1. **Before you decide**: Draft the ADR. Writing forces clarity. The Alternatives Considered section in particular often surfaces a better option.

2. **Open an ADR PR**: Target `adr/NNN-short-title` branch. Assign at least two reviewers: one technical, one product (@alec).

3. **ADR merges before implementation**: The ADR must be merged before the code that implements the decision. This is not optional.

4. **ADRs are immutable after merge**: Do not edit an accepted ADR. If the decision changes, write a new ADR that explicitly supersedes the old one. The superseded ADR is updated only to add a "Superseded by ADR-NNN" note at the top.

5. **Link from specs**: After the ADR is merged, update any related specs to reference it under "ADRs" in the header block.

---

## How to Update PRODUCT_MAP.md

PRODUCT_MAP.md is the authoritative status registry. It must be updated whenever:
- A spec is created (add it to the correct section with DRAFT status)
- A spec changes status (update the badge)
- An ADR is accepted (add it to the ADR table)
- A document is deprecated (move to the Deprecated section with strikethrough)

**Status progression:**
```
DRAFT → REVIEW → APPROVED → SHIPPED
                           → DEPRECATED (at any point)
```

DRAFT → REVIEW requires: spec author + product owner approval.
REVIEW → APPROVED requires: technical lead sign-off + legal sign-off (if compliance-related).
APPROVED → SHIPPED requires: all Section 6 acceptance criteria checked.

Never promote a status without verifying the criteria above. Never mark a spec SHIPPED if Section 6 ACs are not all checked.

---

## Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>(<scope>): <short description>

[optional body]

[optional footer]
```

**Examples:**
```
feat(usdx): add selective disclosure viewing key generation

fix(prover): correct liveness window calculation for multi-block delays

spec(governance): add draft governance spec with open questions

adr(005): adopt ERC-5564, deprecate custom stealth scheme
```

Commit messages must be in present tense ("add" not "added", "fix" not "fixed").

---

## Code Review Expectations

**As a reviewer:**
- Review within 1 business day of assignment.
- Leave actionable comments. "This seems wrong" is not actionable. "This calculation doesn't account for leap years — see line 42" is.
- Approve only if you would be comfortable explaining this code to someone else.
- Check the spec checklist items — do not approve if they are not all addressed.

**As an author:**
- Address all comments before merging, or explicitly resolve with a note.
- Do not merge without at least 1 approval (2 for anything touching USDX or the prover slashing contract).
- Rebase onto main before merging — no merge commits.
