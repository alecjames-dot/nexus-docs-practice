export function buildComponentPlanPrompt(specContent: string): string {
  return `You are a senior UI architect analyzing a product spec to plan the structure of a self-contained HTML prototype.

## Product Spec
${specContent}

## Your Task
Analyze this spec and produce a structured plan for the prototype. Think through:
1. What distinct UI sections/panels exist on the page?
2. What interactions does the user need to perform?
3. What data needs to be displayed, and what shape does it have?
4. What specific mock data values should the prototype use (prices, names, amounts)?
5. What is the visual layout — how are sections arranged on screen?

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
  "mockData": {
    "seed": 42,
    "values": {
      "description": "Concrete seed and key starting values for the seeded PRNG — e.g. { btcPrice: 95241, ethPrice: 3340, walletBalance: 10000 }"
    }
  },
  "pageLayout": "Describe how sections are visually arranged — e.g. 'Full-width top nav, two-column main area: left column has market selector + chart, right column has order entry; full-width positions table below'"
}
\`\`\`

Rules:
- Output ONLY the JSON object — no markdown fences, no explanation text
- Every UI section mentioned in the spec must appear in the components list
- Include a top-level Page entry describing the overall layout structure
- dataShapes must cover every type of data rendered in the prototype
- mockData.values must include concrete starting numbers appropriate to the product (not generic placeholders)
- userFlows must reflect the actual interactions the spec describes`;
}
