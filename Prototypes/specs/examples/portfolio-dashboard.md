# Portfolio Overview Page

## What is this?

A dedicated portfolio page that gives traders a consolidated view of their financial position on Nexus. Accessible from the main nav. The goal is to answer "how am I doing?" at a glance — total value, P&L today, margin health, and what positions are open.

## Who uses it?

Any logged-in trader who wants to check their account health without digging into individual markets. Particularly useful for traders running multiple positions simultaneously.

## Key Components

- **PortfolioHeader**: Top-level stats — total portfolio value (equity), unrealized P&L (with % change), today's realized P&L, and available margin. Large numbers, prominently displayed.
- **MarginHealthBar**: Visual indicator of margin usage (used vs. available). Color-coded: green < 50%, yellow 50–80%, red > 80%. Shows the margin ratio as a percentage.
- **OpenPositionsTable**: A table of all open positions. Columns: market, side, size, entry price, mark price, unrealized P&L ($ and %), liquidation price, margin used. Rows are clickable to go to that market.
- **PnLBreakdownChart**: A simple bar chart or grouped stat showing P&L by position, so traders can see which positions are winning and losing.

## User Flow

1. Trader clicks "Portfolio" in the main nav
2. Page loads with their current account stats in the header
3. They scan the margin health bar to see if they're at risk
4. They review open positions in the table, sorted by unrealized P&L (largest loss first by default)
5. They click a row to navigate to that market's trading page

## Out of Scope

- Trade history / closed positions (separate page)
- Deposit / withdraw flows
- Account settings
