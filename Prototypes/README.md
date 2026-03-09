# Nexus Prototype Generator

PMs write a spec. One command produces a working, clickable prototype. Engineers open it and understand exactly what to build.

No Figma. No design handoff. No back-and-forth asking what a state looks like.

---

## Why this exists

**For product:** The gap between a written spec and engineering's mental model of it is where features go wrong. A static doc leaves too much open to interpretation — what does the modal look like when the order errors? What happens to the leverage slider when you switch from isolated to cross margin? A clickable prototype answers those questions before a line of production code is written.

**For engineering:** Starting a feature from a Figma file or a paragraph of prose means recreating intent that the PM already had in their head. A prototype makes component hierarchy, data shapes, user flows, and edge state handling visible and explorable before estimation. Less guessing, cleaner tickets, fewer mid-sprint spec questions.

The output is a single HTML file. Zero dependencies. Open it in a browser — no install, no build, no server.

---

## Setup

**Prerequisite:** [Claude Code](https://claude.ai/code) must be installed and authenticated. The generator runs through it.

```bash
cd eng/tools/prototype-generator
npm install
npm run build
```

That's it. No API key to manage — Claude Code handles auth.

---

## Workflow

### 1. Write a spec

Start from the template:

```bash
node dist/cli.js init-spec --output ./specs/order-confirmation.md
```

Edit the generated file. You don't need to fill every section — the more detail you provide, the more accurate the prototype. See [Writing a good spec](#writing-a-good-spec) below.

### 2. Validate before generating

```bash
node dist/cli.js validate --spec ./specs/order-confirmation.md
```

Catches common problems (file empty, no headings, no component names mentioned) before spending generation time on a spec that won't produce useful output.

### 3. Generate

```bash
node dist/cli.js generate --spec ./specs/order-confirmation.md
```

The terminal prints the component plan Claude derived from your spec before generation starts. Read it — if it misunderstood something, stop here and refine the spec rather than waiting for a full generation to finish.

When complete:

```bash
open ./output/order-confirmation/index.html
```

### 4. Share

Send the HTML file directly (Slack, email, Linear comment). Anyone can open it. No link to maintain.

---

## All options for `generate`

```
--spec <path>        Path to spec file (required)
--output <path>      Output directory (default: ./output/<spec-name>/)
--format html|react  html = single file, open directly (default)
                     react = full Vite project, run npm install && npm run dev
--deploy             Deploy to Netlify or Vercel after generation
--verbose            Print Claude's reasoning and full component plan JSON
```

**React format** is available when a PM wants to hand off a prototype that an engineer can extend rather than rebuild from scratch. It produces a full Vite + React + TypeScript + Tailwind project.

---

## Writing a good spec

You don't need to follow the template exactly. Write like you're explaining the feature to someone joining the team tomorrow. A few things that make a meaningful difference:

- **Name the components.** "A confirmation modal containing an OrderSummaryCard" is far more useful than "a popup with the order details." Named sections become named components in the output.

- **Walk through the user flow.** Start from the entry point. Include what the user sees, what they do, and what the system shows back. Include the error state and the success state — not just the happy path.

- **Be specific about data.** "Shows the liquidation price in red when within 10% of the current mark price" will be implemented correctly. "Shows liquidation info" will not.

- **Include Out of Scope.** Telling Claude what not to build is as useful as telling it what to build. It keeps the prototype focused.

See [`./specs/examples/`](./specs/examples/) for two well-written examples at different levels of detail.

---

## What the prototype enforces

Every generated prototype applies the Nexus design system automatically:

- Dark theme (slate-950 backgrounds, slate-800 cards)
- Emerald for positive/long, red for negative/short
- Monospace font for all numeric values
- Realistic mock data — BTC near $97k, real-looking wallet addresses, recent timestamps

All interactive elements work: tabs switch, toggles toggle, inputs update totals in real time, modals open and close. The prototype is meant to be clicked through, not just looked at.

---

## Customisation (for engineers)

Two files control everything opinionated:

**`src/config/defaults.ts`** — generation settings as named constants:
- `generation.maxTokens` — increase for complex specs that truncate mid-file
- `generation.interactivityLevel` — `'static'` for layout-only reviews, `'full'` for all interactions
- `generation.mockDataRealism` — `'low'` simplifies data, `'high'` uses realistic prices and sizes
- `deployTarget` — `'netlify'` or `'vercel'`

**`src/prompts/system-prompt.ts`** — the design rules and output contract sent to Claude. Edit this when engineer feedback reveals a consistent pattern (e.g., "components are always too wide", "the order book layout is wrong"). Changes apply to every future generation.

After editing source files: `npm run build`.

---

## Deploy (`--deploy`)

Pushes the output to Netlify or Vercel and prints the live URL. Useful for sharing with stakeholders who shouldn't need to open a file manually.

**Netlify:**
```bash
npm install -g netlify-cli && netlify login
node dist/cli.js generate --spec ./specs/my-feature.md --deploy
```

**Vercel:**
```bash
npm install -g vercel && vercel login
# Set deployTarget: 'vercel' in src/config/defaults.ts
node dist/cli.js generate --spec ./specs/my-feature.md --deploy
```

First deploy to a new project may prompt for project setup. Subsequent runs push to the same project automatically.

---

## Feedback

Post in **#product-eng** or open an issue in this repo. If generation produced something unexpected, include the spec file and rerun with `--verbose` to capture the component plan and full output.
