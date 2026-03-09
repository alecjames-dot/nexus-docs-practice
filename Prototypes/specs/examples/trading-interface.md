# Order Confirmation Flow

## What is this?

When a trader clicks "Place Order" on the trade form, we need a confirmation step before the order hits the chain. Right now orders execute immediately, which has caused accidental trades — especially on mobile. The confirmation modal should give traders one last chance to review the full order details before committing.

## Who uses it?

Active traders placing leveraged perpetual futures orders on Nexus. They're sophisticated users who understand the risk of leverage, but they want to catch typos (wrong size, wrong side) before losing money. Speed still matters — the modal should be fast to dismiss.

## Key Components

- **OrderConfirmationModal**: The overlay modal. Triggered when "Place Order" is clicked. Blocks interaction with the rest of the UI until dismissed or confirmed.
- **OrderSummaryCard**: Inside the modal — shows the full order breakdown: pair, side (long/short), order type (market/limit), size in contracts and USD notional, entry price (or "Market" for market orders), estimated fees (maker/taker), estimated liquidation price, required margin.
- **ConfirmButton**: A prominent CTA with an explicit label like "Confirm Long BTC-PERP" — not just "Confirm". Shows a loading spinner while the order is being submitted.
- **SuccessState**: After successful submission, replaces the summary content. Shows the order ID, a link to the open position, and an option to place another order. Auto-dismisses after 5 seconds unless the user interacts.

## User Flow

1. Trader fills in the trade form (pair: BTC-PERP, side: Long, size: 0.5 BTC, leverage: 10x, type: Market)
2. Trader clicks "Place Order"
3. Modal opens with a full summary of the order
4. Trader reviews and clicks "Confirm Long BTC-PERP"
5. Button enters loading state, spinner shows, background dims slightly
6. Order succeeds — success state shows order ID (#NX-88421), estimated fill price ($97,420), and a "View Position" link
7. Modal auto-closes after 5 seconds, or trader clicks "Done"

## UI Requirements

- Modal should be centered, max-width ~440px, with a dark backdrop (bg-black/60 with backdrop-blur)
- Side indicator: Long = emerald badge, Short = red badge — make it visually obvious
- All numbers in font-mono
- Fee breakdown: show maker fee (0.02%), taker fee (0.05%), estimated fee in USD
- Liquidation price should be highlighted in red with a warning icon if < 10% away from current price
- The confirm button label should dynamically reflect the order side: "Confirm Long" or "Confirm Short"
- Error state: if order submission fails, show an inline error below the button with a retry option (don't close the modal)
- Keyboard: pressing Escape closes the modal (cancels)

## Out of Scope

- Actual API integration (use mock data and simulated async delay)
- Order modification within the modal
- Multiple orders in one confirmation
