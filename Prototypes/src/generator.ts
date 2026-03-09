import { resolve } from 'node:path';
import { exec } from 'node:child_process';
import { promisify } from 'node:util';
import { analyzeSpec, generatePrototype } from './claude-client.js';
import { copyReactTemplate } from './output/writer.js';
import { buildSystemPrompt } from './prompts/system-prompt.js';
import { defaults } from './config/defaults.js';

const execAsync = promisify(exec);

type Result<T> = { ok: true; value: T } | { ok: false; error: string };

export interface GenerationOptions {
  specFilePath: string;
  outputDirectory: string;
  format: 'react' | 'html';
  verbose: boolean;
  deploy: boolean;
}

export interface GenerationResult {
  outputDirectory: string;
  componentCount: number;
  outputFile: string;
}

async function runDeployCommand(
  outputDirectory: string,
  format: 'react' | 'html',
  deployTarget: 'netlify' | 'vercel',
): Promise<Result<string>> {
  // React needs a build step first; HTML deploys as-is
  if (format === 'react') {
    const buildResult = await execAsync(
      `cd "${outputDirectory}" && npm install && npm run build`,
      { timeout: 180_000 },
    ).then(
      ({ stdout, stderr }) => ({ ok: true as const, value: stdout + stderr }),
      (error: unknown) => ({
        ok: false as const,
        error: `Build failed: ${error instanceof Error ? error.message : String(error)}`,
      }),
    );
    if (!buildResult.ok) return buildResult;
  }

  const command =
    deployTarget === 'netlify'
      ? format === 'react'
        ? `cd "${outputDirectory}" && netlify deploy --prod --dir=dist`
        : `cd "${outputDirectory}" && netlify deploy --prod --dir=.`
      : `cd "${outputDirectory}" && vercel --prod`;

  try {
    const { stdout, stderr } = await execAsync(command, { timeout: 120_000 });
    return { ok: true, value: [stdout, stderr].filter(Boolean).join('\n') };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const isMissing =
      message.includes('command not found') || message.includes('not found');
    if (isMissing) {
      const installHint =
        deployTarget === 'netlify' ? 'npm install -g netlify-cli' : 'npm install -g vercel';
      return { ok: false, error: `Deploy CLI not installed. Run: ${installHint}` };
    }
    return { ok: false, error: `Deploy failed: ${message}` };
  }
}

export async function runGenerationPipeline(
  options: GenerationOptions,
): Promise<Result<GenerationResult>> {
  const resolvedOutputDirectory = resolve(options.outputDirectory);
  const systemPrompt = buildSystemPrompt(defaults);

  // Step 1: Analyze spec — Claude Code reasons about the spec and returns a component plan
  const analysisResult = await analyzeSpec(
    await import('node:fs/promises').then((fs) => fs.readFile(resolve(options.specFilePath), 'utf-8')),
  );
  if (!analysisResult.ok) return analysisResult;
  const componentPlan = analysisResult.value;

  // Step 2: Print the component plan so PMs can review before generation begins
  console.log('\n── Component Plan ──────────────────────────────────────');
  console.log(`Layout: ${componentPlan.pageLayout}`);
  console.log(`\nComponents (${componentPlan.components.length}):`);
  for (const component of componentPlan.components) {
    console.log(`  • ${component.name}: ${component.description}`);
  }
  console.log(`\nUser Flows (${componentPlan.userFlows.length}):`);
  for (const flow of componentPlan.userFlows) {
    console.log(`  • ${flow.name} (${flow.steps.length} steps)`);
  }
  console.log(`\nData Shapes (${componentPlan.dataShapes.length}):`);
  for (const shape of componentPlan.dataShapes) {
    console.log(`  • ${shape.name} (${shape.fields.length} fields)`);
  }
  console.log('────────────────────────────────────────────────────────\n');

  if (options.verbose) {
    console.log('Full component plan:');
    console.log(JSON.stringify(componentPlan, null, 2));
    console.log();
  }

  // Step 3: For React format, copy the Vite template skeleton before Claude writes into it
  if (options.format === 'react') {
    const moduleDirectory = new URL(import.meta.url).pathname;
    const templatesDirectory = resolve(moduleDirectory, '../../src/templates');
    const templateCopyResult = await copyReactTemplate(
      templatesDirectory,
      resolvedOutputDirectory,
    );
    if (!templateCopyResult.ok) return templateCopyResult;
  }

  // Step 4: Generate — Claude Code uses the Write tool to write files directly to disk
  const generationResult = await generatePrototype(
    await import('node:fs/promises').then((fs) =>
      fs.readFile(resolve(options.specFilePath), 'utf-8'),
    ),
    componentPlan,
    systemPrompt,
    resolvedOutputDirectory,
    options.format,
  );
  if (!generationResult.ok) return generationResult;

  // Step 5: Deploy if requested
  if (options.deploy) {
    const deployResult = await runDeployCommand(
      resolvedOutputDirectory,
      options.format,
      defaults.deployTarget,
    );
    if (!deployResult.ok) {
      console.error(`  Deploy failed: ${deployResult.error}`);
    } else {
      console.log(`  Deploy output:\n${deployResult.value}`);
    }
  }

  const outputFile =
    options.format === 'html'
      ? `${resolvedOutputDirectory}/index.html`
      : `${resolvedOutputDirectory}/src/App.tsx`;

  return {
    ok: true,
    value: {
      outputDirectory: resolvedOutputDirectory,
      componentCount: componentPlan.components.length,
      outputFile,
    },
  };
}
