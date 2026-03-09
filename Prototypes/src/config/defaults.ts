export const defaults = {
  format: 'html' as 'react' | 'html',
  analysisModel: 'claude-opus-4-6' as const,
  generationModel: 'claude-opus-4-6' as const,
  designSystem: {
    theme: 'dark',
    primaryBg: 'slate-950',
    cardBg: 'slate-800',
    positive: 'emerald-500',
    negative: 'red-500',
    accent: 'blue-500',
    fontMono: 'font-mono',
  },
  generation: {
    maxTokens: 16000,
    includeTypeInterfaces: true,
    includeComments: true,
    mockDataRealism: 'high' as 'low' | 'medium' | 'high',
    interactivityLevel: 'full' as 'static' | 'partial' | 'full',
  },
  deployTarget: 'netlify' as 'netlify' | 'vercel',
};

export type GeneratorDefaults = typeof defaults;
