export function buildComponentPlanPrompt(specContent: string): string {
  return `You are a senior UI architect analyzing a product spec to plan the structure of a self-contained HTML prototype.

## Product Spec
${specContent}

## Your Task
Analyze this spec and return a structured plan for the prototype. Think through:
1. What distinct UI sections exist on the page?
2. What interactions does the user need to perform?
3. What data needs to be displayed, and what shape does it have?
4. What is the visual layout — how are sections arranged?

## Output Format
Respond ONLY with a valid JSON object matching this exact shape:

\`\`\`json
{
  "components": [
    {
      "name": "SectionName",
      "description": "What this section renders and its purpose",
      "props": ["data it displays", "controls it contains"],
      "state": ["what changes — e.g. selected tab, input value, modal open/closed"]
    }
  ],
  "userFlows": [
    {
      "name": "Flow name",
      "steps": [
        "Step 1: User does X",
        "Step 2: System responds with Y",
        "Step 3: User sees Z"
      ]
    }
  ],
  "dataShapes": [
    {
      "name": "DataObjectName",
      "fields": ["fieldName: type — description"]
    }
  ],
  "pageLayout": "Describe how sections are visually arranged — e.g. 'Full-width header, two-column layout with order form on the left and order book on the right, positions table spanning full width below'"
}
\`\`\`

Rules:
- Output ONLY the JSON object — no markdown, no explanation
- Every UI section mentioned in the spec should appear in the components list
- Include a top-level App or Page entry that describes the overall layout
- Data shapes should cover all mock data needed to make the prototype realistic
- User flows should reflect actual interactions the spec describes`;
}
