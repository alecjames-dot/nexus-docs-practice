# Nexus Prototype Generator

A CLI tool that turns a product spec into a working, clickable prototype in one command.

---

## Purpose

**For product:** Rapidly generate prototypes that inform finalized engineering requirements. The output is a standardized, browser-ready reference — not a throwaway sketch. The intent is explicit: *this is how it should look. Engineers decide how to get there.*

**For engineering:** A concrete visual reference to support acceptance criteria and engineering decisions. Component hierarchy, user flows, data shapes, and interaction states are all visible and explorable before a line of production code is written. Less ambiguity in tickets, fewer mid-sprint spec questions.

---

## Setup

**Prerequisite:** [Claude Code](https://claude.ai/code) must be installed and authenticated.

```bash
cd Prototypes
npm install
npm run build
```

---

## Usage

Provide a spec markdown file and run:

```bash
node dist/cli.js generate --spec ./path/to/spec.md
```

The terminal prints the component plan Claude derived from the spec before generation starts. When complete:

```bash
open ./output/<spec-name>/index.html
```

A single HTML file. No install, no build, no server. Share it directly.

---

## Options

```
--spec <path>        Path to spec file (required)
--output <path>      Output directory (default: ./output/<spec-name>/)
--format html|react  html = single file, open directly (default)
                     react = full Vite + React + TypeScript project
--deploy             Deploy to Netlify or Vercel after generation
--verbose            Print full component plan JSON and generation logs
```

**React format** produces a full Vite project an engineer can extend rather than rebuild. Use it when the prototype is being handed off as a starting point.

---

## Validate a spec before generating

```bash
node dist/cli.js validate --spec ./path/to/spec.md
```

Catches obvious problems — empty file, no structure, no component names mentioned — before spending generation time on a spec that won't produce useful output.

---

## What every prototype enforces

- Nexus dark theme (slate-950 backgrounds, slate-800 cards)
- Emerald for positive/long, red for negative/short
- Monospace font on all numeric values
- Realistic mock data — BTC near $97k, real-looking wallet addresses, recent timestamps
- All interactive elements functional: tabs switch, toggles toggle, inputs update in real time, modals open and close

---

## Customisation

**`src/config/defaults.ts`** — generation settings:
- `generation.maxTokens` — increase for complex specs that truncate mid-file
- `generation.interactivityLevel` — `'static'` for layout-only, `'full'` for all interactions
- `generation.mockDataRealism` — `'low'` simplifies data, `'high'` uses realistic values
- `deployTarget` — `'netlify'` or `'vercel'`

**`src/prompts/system-prompt.ts`** — design rules and output contract sent to Claude. Edit when the design system changes or when generation consistently produces the wrong output. Changes apply to every future run.

After editing: `npm run build`.

---

## Deploy

```bash
# Netlify
npm install -g netlify-cli && netlify login
node dist/cli.js generate --spec ./path/to/spec.md --deploy

# Vercel (set deployTarget: 'vercel' in defaults.ts first)
npm install -g vercel && vercel login
node dist/cli.js generate --spec ./path/to/spec.md --deploy
```

First deploy to a new project may prompt for setup. Subsequent runs push to the same project automatically.
