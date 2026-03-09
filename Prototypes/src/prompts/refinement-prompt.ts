export function buildRefinementPrompt(
  originalSpec: string,
  componentPlan: string,
  issues: string[],
): string {
  const issueList = issues.map((issue, index) => `${index + 1}. ${issue}`).join('\n');

  return `You are refining a previously generated React prototype. The initial generation had issues that need to be fixed.

## Original Product Spec
${originalSpec}

## Component Plan (what was intended)
${componentPlan}

## Issues to Fix
${issueList}

## Your Task
Generate a corrected version of the prototype that:
1. Fixes all the listed issues
2. Preserves all working functionality from the original
3. Maintains the same component structure unless restructuring is needed to fix an issue
4. Uses the Nexus design system (dark theme, slate colors, emerald/red for positive/negative)

## Output Format
Respond ONLY with a valid JSON object where keys are file paths relative to src/ and values are complete file contents as strings.

Example:
\`\`\`json
{
  "App.tsx": "import React...",
  "components/FixedComponent.tsx": "..."
}
\`\`\`

Rules:
- Output ONLY the JSON object — no markdown, no explanation
- Include ALL files, not just the changed ones — the output replaces the entire src/ directory
- Every file must be complete and compilable
- All interactive elements must work
- Fix the specific issues listed above without introducing new problems`;
}
