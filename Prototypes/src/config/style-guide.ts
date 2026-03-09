export const styleGuide = {
  colors: {
    background: {
      primary: 'bg-slate-950',
      secondary: 'bg-slate-900',
      card: 'bg-slate-800',
      cardHover: 'bg-slate-700',
      overlay: 'bg-slate-900/80',
    },
    text: {
      primary: 'text-slate-50',
      secondary: 'text-slate-400',
      muted: 'text-slate-500',
      positive: 'text-emerald-500',
      negative: 'text-red-500',
      accent: 'text-blue-500',
    },
    border: {
      default: 'border-slate-700',
      subtle: 'border-slate-800',
      accent: 'border-blue-500',
    },
    badge: {
      positive: 'bg-emerald-500/10 text-emerald-500',
      negative: 'bg-red-500/10 text-red-500',
      neutral: 'bg-slate-700 text-slate-300',
      accent: 'bg-blue-500/10 text-blue-400',
    },
    button: {
      primary: 'bg-blue-600 hover:bg-blue-500 text-white',
      secondary: 'bg-slate-700 hover:bg-slate-600 text-slate-200',
      danger: 'bg-red-600 hover:bg-red-500 text-white',
      ghost: 'hover:bg-slate-800 text-slate-400 hover:text-slate-200',
      long: 'bg-emerald-600 hover:bg-emerald-500 text-white',
      short: 'bg-red-600 hover:bg-red-500 text-white',
    },
  },
  typography: {
    heading: {
      h1: 'text-3xl font-bold text-slate-50',
      h2: 'text-xl font-semibold text-slate-100',
      h3: 'text-base font-medium text-slate-200',
    },
    body: {
      default: 'text-sm text-slate-300',
      secondary: 'text-sm text-slate-400',
      caption: 'text-xs text-slate-500',
    },
    numeric: {
      large: 'text-2xl font-mono font-bold',
      default: 'text-sm font-mono',
      small: 'text-xs font-mono',
    },
  },
  spacing: {
    pagePadding: 'p-6',
    cardPadding: 'p-4',
    sectionGap: 'gap-6',
    itemGap: 'gap-3',
  },
  components: {
    card: 'bg-slate-800 rounded-lg border border-slate-700',
    input: 'bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-slate-100 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500',
    select: 'bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-slate-100 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500',
    tab: {
      container: 'flex border-b border-slate-700',
      active: 'px-4 py-2 text-sm font-medium text-blue-400 border-b-2 border-blue-500',
      inactive: 'px-4 py-2 text-sm font-medium text-slate-400 hover:text-slate-200 border-b-2 border-transparent',
    },
    modal: {
      backdrop: 'fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50',
      panel: 'bg-slate-900 rounded-xl border border-slate-700 shadow-2xl w-full max-w-md mx-4 p-6',
    },
    table: {
      container: 'w-full',
      header: 'text-xs font-medium text-slate-500 uppercase tracking-wider px-4 py-2 text-left',
      row: 'border-t border-slate-700/50 hover:bg-slate-700/30 transition-colors',
      cell: 'px-4 py-3 text-sm text-slate-300',
    },
    badge: 'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium',
    divider: 'border-t border-slate-700',
    spinner: 'animate-spin rounded-full border-2 border-slate-600 border-t-blue-500',
  },
  icons: {
    library: 'lucide-react',
    defaultSize: 16,
    defaultStrokeWidth: 1.5,
  },
  conventions: {
    priceFormat: "Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 })",
    percentFormat: "value.toFixed(2) + '%'",
    sizeFormat: 'number with up to 4 decimal places',
    timestampFormat: "'HH:MM:SS' local time",
    positiveClass: 'text-emerald-500',
    negativeClass: 'text-red-500',
    neutralClass: 'text-slate-400',
  },
} as const;

export type StyleGuide = typeof styleGuide;

export function styleGuideAsText(): string {
  return `
## Nexus Design System — Style Guide

### Color Palette

**Backgrounds:**
- Page background: bg-slate-950 (darkest)
- Section background: bg-slate-900
- Card background: bg-slate-800
- Card hover: bg-slate-700
- Overlay/modal backdrop: bg-slate-900/80

**Text:**
- Primary text: text-slate-50
- Secondary text: text-slate-400
- Muted/label text: text-slate-500
- Positive/profit/long: text-emerald-500
- Negative/loss/short: text-red-500
- Accent/links: text-blue-500

**Borders:**
- Default border: border-slate-700
- Subtle border: border-slate-800
- Accent border: border-blue-500

**Badges:**
- Positive: bg-emerald-500/10 text-emerald-500
- Negative: bg-red-500/10 text-red-500
- Neutral: bg-slate-700 text-slate-300
- Accent: bg-blue-500/10 text-blue-400

**Buttons:**
- Primary: bg-blue-600 hover:bg-blue-500 text-white
- Secondary: bg-slate-700 hover:bg-slate-600 text-slate-200
- Long/Buy: bg-emerald-600 hover:bg-emerald-500 text-white
- Short/Sell: bg-red-600 hover:bg-red-500 text-white
- Danger: bg-red-600 hover:bg-red-500 text-white
- Ghost: hover:bg-slate-800 text-slate-400 hover:text-slate-200

### Typography

**Headings:**
- H1: text-3xl font-bold text-slate-50
- H2: text-xl font-semibold text-slate-100
- H3: text-base font-medium text-slate-200

**Body text:**
- Default: text-sm text-slate-300
- Secondary: text-sm text-slate-400
- Caption: text-xs text-slate-500

**Numeric values (always use font-mono):**
- Large price/value: text-2xl font-mono font-bold
- Default number: text-sm font-mono
- Small number: text-xs font-mono

### Spacing
- Page padding: p-6
- Card padding: p-4
- Section gap: gap-6
- Item gap: gap-3

### Component Patterns

**Cards:** bg-slate-800 rounded-lg border border-slate-700

**Inputs:** bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-slate-100 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500

**Tabs:**
- Container: flex border-b border-slate-700
- Active tab: px-4 py-2 text-sm font-medium text-blue-400 border-b-2 border-blue-500
- Inactive tab: px-4 py-2 text-sm font-medium text-slate-400 hover:text-slate-200 border-b-2 border-transparent

**Modal:**
- Backdrop: fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50
- Panel: bg-slate-900 rounded-xl border border-slate-700 shadow-2xl w-full max-w-md mx-4 p-6

**Tables:**
- Header cells: text-xs font-medium text-slate-500 uppercase tracking-wider px-4 py-2 text-left
- Row: border-t border-slate-700/50 hover:bg-slate-700/30 transition-colors
- Data cells: px-4 py-3 text-sm text-slate-300

### Conventions
- All prices formatted with USD currency symbol and 2 decimal places
- Percentages formatted to 2 decimal places with % suffix
- Positive values always in text-emerald-500, negative in text-red-500
- Use lucide-react for all icons (size=16, strokeWidth=1.5 by default)
- All numbers in font-mono to prevent layout shift
`.trim();
}
