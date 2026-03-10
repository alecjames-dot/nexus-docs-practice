import { query } from '@anthropic-ai/claude-agent-sdk';
import { resolve } from 'node:path';
import { buildComponentPlanPrompt } from './prompts/component-prompt.js';

type Result<T> = { ok: true; value: T } | { ok: false; error: string };

export interface ComponentPlan {
  components: Array<{
    name: string;
    description: string;
    props: string[];
    state: string[];
  }>;
  userFlows: Array<{
    name: string;
    steps: string[];
  }>;
  dataShapes: Array<{
    name: string;
    fields: string[];
  }>;
  mockData: {
    seed: number;
    values: Record<string, unknown>;
  };
  pageLayout: string;
}

function parseJsonFromText(text: string): Result<unknown> {
  const fenceMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const candidate = (fenceMatch ? (fenceMatch[1] ?? text) : text).trim();

  try {
    return { ok: true, value: JSON.parse(candidate) };
  } catch {
    const objectMatch = candidate.match(/\{[\s\S]*\}/);
    if (objectMatch) {
      try {
        return { ok: true, value: JSON.parse(objectMatch[0]) };
      } catch {
        // fall through
      }
    }
    return {
      ok: false,
      error: `Response was not valid JSON. First 500 chars: ${candidate.slice(0, 500)}`,
    };
  }
}

function isComponentPlan(value: unknown): value is ComponentPlan {
  if (typeof value !== 'object' || value === null) return false;
  const candidate = value as Record<string, unknown>;
  return (
    Array.isArray(candidate['components']) &&
    Array.isArray(candidate['userFlows']) &&
    Array.isArray(candidate['dataShapes']) &&
    typeof candidate['mockData'] === 'object' &&
    candidate['mockData'] !== null &&
    typeof candidate['pageLayout'] === 'string'
  );
}

function handleClaudeCodeError(error: unknown, step: string): Result<never> {
  const message = error instanceof Error ? error.message : String(error);
  if (message.toLowerCase().includes('not found') || message.toLowerCase().includes('enoent')) {
    return {
      ok: false,
      error: `Claude Code CLI not found. Install it at https://claude.ai/code, then run: claude login`,
    };
  }
  return { ok: false, error: `Claude Code error during ${step}: ${message}` };
}

// Analyze a spec file and return a structured component plan.
// Uses Claude Code with no tools — pure reasoning, returns JSON text.
export async function analyzeSpec(specContent: string): Promise<Result<ComponentPlan>> {
  let resultText = '';

  try {
    for await (const message of query({
      prompt: buildComponentPlanPrompt(specContent),
      options: {},
    })) {
      if ('result' in message) {
        resultText = String(message.result);
      }
    }
  } catch (error) {
    return handleClaudeCodeError(error, 'spec analysis');
  }

  if (!resultText) {
    return { ok: false, error: 'Claude Code returned an empty response during spec analysis.' };
  }

  const parseResult = parseJsonFromText(resultText);
  if (!parseResult.ok) {
    return { ok: false, error: `Failed to parse component plan: ${parseResult.error}` };
  }
  if (!isComponentPlan(parseResult.value)) {
    return {
      ok: false,
      error: `Component plan is missing required fields (components, userFlows, dataShapes, pageLayout). Got: ${JSON.stringify(parseResult.value).slice(0, 300)}`,
    };
  }

  return { ok: true, value: parseResult.value };
}

// Generate the prototype by letting Claude Code write files directly via the Write tool.
// No JSON serialisation, no escaping — Claude writes the file and we iterate to completion.
export async function generatePrototype(
  specContent: string,
  componentPlan: ComponentPlan,
  systemPrompt: string,
  outputDirectory: string,
  format: 'react' | 'html',
): Promise<Result<void>> {
  const absoluteOutputDirectory = resolve(outputDirectory);
  const prompt =
    format === 'html'
      ? buildHtmlGenerationPrompt(specContent, componentPlan, absoluteOutputDirectory)
      : buildReactGenerationPrompt(specContent, componentPlan, absoluteOutputDirectory);

  try {
    for await (const _ of query({
      prompt,
      options: {
        allowedTools: ['Write'],
        systemPrompt,
      },
    })) {
      // Iterate to completion. Claude Code surfaces progress in its own output.
    }
  } catch (error) {
    return handleClaudeCodeError(error, 'prototype generation');
  }

  return { ok: true, value: undefined };
}

function buildHtmlGenerationPrompt(
  specContent: string,
  componentPlan: ComponentPlan,
  outputDirectory: string,
): string {
  const seed = componentPlan.mockData?.seed ?? 42;
  const mockValues = JSON.stringify(componentPlan.mockData?.values ?? {}, null, 2);

  return `Write a complete, self-contained HTML prototype to this exact file path:
${outputDirectory}/index.html

## Product Spec
${specContent}

## Component Plan
${JSON.stringify(componentPlan, null, 2)}

## Mock Data Seed and Starting Values
Use seed ${seed} in the PRNG (as specified in the system prompt). Starting values:
${mockValues}

Write the complete index.html to the path above.
Follow all system prompt instructions: design tokens, BEM CSS naming, seeded PRNG, vanilla JS patterns, and interactivity.
Do not write any other files.`;
}

function buildReactGenerationPrompt(
  specContent: string,
  componentPlan: ComponentPlan,
  outputDirectory: string,
): string {
  const componentFiles = componentPlan.components
    .filter((component) => component.name !== 'App')
    .map((component) => `- ${outputDirectory}/src/components/${component.name}.tsx`)
    .join('\n');

  return `Write a React + TypeScript prototype. The Vite project skeleton already exists at ${outputDirectory}. Write these source files:

- ${outputDirectory}/src/App.tsx
${componentFiles}
- ${outputDirectory}/src/types/index.ts

## Product Spec
${specContent}

## Component Plan
${JSON.stringify(componentPlan, null, 2)}

Write all component files following the system prompt conventions. The Vite config, package.json, tailwind config, and main.tsx are already in place — only write the src/ files listed above.`;
}
