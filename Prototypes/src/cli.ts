#!/usr/bin/env node
import { program } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import { readFile, writeFile, stat } from 'node:fs/promises';
import { resolve, dirname, basename, extname } from 'node:path';
import { mkdir } from 'node:fs/promises';
import { runGenerationPipeline } from './generator.js';

// ── Spec template used by init-spec ────────────────────────────────────────

const SPEC_TEMPLATE = `# Feature Spec: [Feature Name]

## What is this?
Describe the feature in plain language. What does it do? Why does it exist?

## Who uses it?
Who is the target user? What are they trying to accomplish?

## Key Components
List the main UI sections or components this feature needs. Be specific.

- Component 1: what it shows/does
- Component 2: what it shows/does
- Component 3: what it shows/does

## User Flow
Walk through the primary interaction step by step.

1. User arrives at [entry point]
2. User sees [what they see]
3. User does [action]
4. System responds with [response]
5. User ends up at [final state]

## UI Requirements
Be specific about what data is displayed, what interactions are supported, and any design constraints.

- Data displayed: list of specific fields/values
- Interactions: what the user can click, type, toggle
- States: loading, empty, error, success states to handle
- Layout notes: any specific layout requirements

## Out of Scope
What this feature does NOT include (helps the generator stay focused).
`;

// ── Helpers ─────────────────────────────────────────────────────────────────

function printSuccess(message: string): void {
  console.log(chalk.green(`✓ ${message}`));
}

function printWarning(message: string): void {
  console.log(chalk.yellow(`⚠ ${message}`));
}

function printError(message: string): void {
  console.error(chalk.red(`✗ ${message}`));
}

function printStep(message: string): void {
  console.log(chalk.cyan(`▸ ${message}`));
}

function printSecondary(message: string): void {
  console.log(chalk.gray(`  ${message}`));
}

// ── CLI Setup ────────────────────────────────────────────────────────────────

program
  .name('prototype-gen')
  .description('Generate interactive React prototypes from product specs using Claude')
  .version('0.1.0');

// ── generate command ─────────────────────────────────────────────────────────

program
  .command('generate')
  .description('Generate a React prototype from a spec file')
  .requiredOption('--spec <path>', 'Path to the spec markdown file')
  .option('--output <path>', 'Output directory (default: ./output/<spec-name>)')
  .option('--format <format>', 'Output format: html (default) or react', 'html')
  .option('--deploy', 'Deploy after generation using netlify or vercel', false)
  .option('--verbose', 'Stream generation tokens and print verbose logs', false)
  .action(
    async (commandOptions: {
      spec: string;
      output?: string;
      format: string;
      deploy: boolean;
      verbose: boolean;
    }) => {
      const { spec, output, format, deploy, verbose } = commandOptions;

      if (format !== 'react' && format !== 'html') {
        printError(`Invalid format "${format}". Use "react" or "html".`);
        process.exit(1);
      }

      const specFileName = basename(spec, extname(spec));
      const resolvedOutput = output ?? `./output/${specFileName}`;

      console.log();
      console.log(chalk.bold('Nexus Prototype Generator'));
      console.log(chalk.gray('─'.repeat(50)));
      printSecondary(`Spec:   ${resolve(spec)}`);
      printSecondary(`Output: ${resolve(resolvedOutput)}`);
      printSecondary(`Format: ${format}`);
      if (deploy) printSecondary('Deploy: enabled');
      console.log();

      // Step 1: Read spec with spinner
      const readSpinner = ora('Reading spec file...').start();
      let specContent = '';
      try {
        specContent = await readFile(resolve(spec), 'utf-8');
        readSpinner.succeed(chalk.green(`Spec loaded (${specContent.length} chars)`));
      } catch {
        readSpinner.fail(chalk.red(`Spec file not found: ${resolve(spec)}`));
        printError('Make sure the path is correct and the file exists.');
        process.exit(1);
      }

      if (specContent.trim().length < 100) {
        printWarning(
          `Spec is very short (${specContent.trim().length} chars). Consider adding more detail for better results.`,
        );
      }

      // Step 2: Analyze spec with spinner
      const analysisSpinner = ora('Analyzing spec and planning components...').start();
      analysisSpinner.stop(); // Stop before pipeline to allow streaming output

      printStep('Analyzing spec with Claude (adaptive thinking)...');

      // Step 3: Run full pipeline
      const generateSpinner = ora('Generating prototype...').start();
      generateSpinner.stop();

      printStep('Generating prototype...');
      if (verbose) {
        console.log(chalk.gray('\n── Streaming generation output ──────────────────────'));
      }

      const pipelineResult = await runGenerationPipeline({
        specFilePath: spec,
        outputDirectory: resolvedOutput,
        format: format as 'react' | 'html',
        verbose,
        deploy,
      });

      if (!pipelineResult.ok) {
        printError(`Generation failed: ${pipelineResult.error}`);
        process.exit(1);
      }

      const { outputDirectory, componentCount, outputFile } = pipelineResult.value;

      console.log();
      console.log(chalk.green.bold('✓ Prototype generated successfully!'));
      console.log();
      console.log(chalk.cyan(`  Output: ${resolve(outputFile)}`));
      console.log(chalk.cyan(`  Components: ${componentCount}`));
      console.log();

      if (format === 'react') {
        console.log(chalk.bold('To preview locally:'));
        console.log(chalk.white(`  cd ${outputDirectory}`));
        console.log(chalk.white('  npm install'));
        console.log(chalk.white('  npm run dev'));
        console.log();
      } else {
        console.log(chalk.bold('To preview:'));
        console.log(chalk.white(`  open ${outputDirectory}/index.html`));
        console.log();
      }
    },
  );

// ── init-spec command ─────────────────────────────────────────────────────────

program
  .command('init-spec')
  .description('Scaffold a blank spec file with guidance sections')
  .option('--output <path>', 'Output path for the spec file', './specs/my-feature.md')
  .action(async (commandOptions: { output: string }) => {
    const { output } = commandOptions;
    const absoluteOutputPath = resolve(output);
    const parentDirectory = dirname(absoluteOutputPath);

    const initSpinner = ora(`Creating spec file at ${absoluteOutputPath}...`).start();

    try {
      await mkdir(parentDirectory, { recursive: true });
    } catch (error) {
      initSpinner.fail(chalk.red('Failed to create directory'));
      printError(`Could not create ${parentDirectory}: ${error instanceof Error ? error.message : String(error)}`);
      process.exit(1);
    }

    // Check if file already exists
    try {
      await stat(absoluteOutputPath);
      initSpinner.fail(chalk.yellow(`File already exists: ${absoluteOutputPath}`));
      printWarning('Use a different path or delete the existing file first.');
      process.exit(1);
    } catch {
      // File does not exist — good, proceed
    }

    try {
      await writeFile(absoluteOutputPath, SPEC_TEMPLATE, 'utf-8');
      initSpinner.succeed(chalk.green(`Spec template created: ${absoluteOutputPath}`));
    } catch (error) {
      initSpinner.fail(chalk.red('Failed to write spec file'));
      printError(`${error instanceof Error ? error.message : String(error)}`);
      process.exit(1);
    }

    console.log();
    console.log(chalk.bold('Next steps:'));
    console.log(chalk.gray(`  1. Edit the spec: ${absoluteOutputPath}`));
    console.log(chalk.gray('  2. Fill in the feature details'));
    console.log(
      chalk.gray(`  3. Generate: prototype-gen generate --spec ${output}`),
    );
    console.log();
  });

// ── validate command ──────────────────────────────────────────────────────────

program
  .command('validate')
  .description('Validate a spec file before generation')
  .requiredOption('--spec <path>', 'Path to the spec markdown file')
  .action(async (commandOptions: { spec: string }) => {
    const { spec } = commandOptions;
    const absoluteSpecPath = resolve(spec);

    console.log();
    console.log(chalk.bold('Validating spec file...'));
    printSecondary(`Path: ${absoluteSpecPath}`);
    console.log();

    const existsSpinner = ora('Checking file exists...').start();
    let specContent = '';

    try {
      await stat(absoluteSpecPath);
      existsSpinner.succeed(chalk.green('File exists'));
    } catch {
      existsSpinner.fail(chalk.red(`File not found: ${absoluteSpecPath}`));
      printError('Make sure the path is correct and the file exists.');
      process.exit(1);
    }

    const readSpinner = ora('Reading content...').start();
    try {
      specContent = await readFile(absoluteSpecPath, 'utf-8');
      readSpinner.succeed(chalk.green(`Content readable (${specContent.length} chars)`));
    } catch (error) {
      readSpinner.fail(chalk.red('Failed to read file'));
      printError(`${error instanceof Error ? error.message : String(error)}`);
      process.exit(1);
    }

    // Content checks
    const trimmedContent = specContent.trim();
    let hasWarnings = false;

    if (trimmedContent.length === 0) {
      printError('Spec file is empty. Add content before generating.');
      process.exit(1);
    }

    if (trimmedContent.length < 100) {
      printWarning(`Spec is very short (${trimmedContent.length} chars). Add more detail for better results.`);
      hasWarnings = true;
    }

    const lines = trimmedContent.split('\n');
    const hasHeadings = lines.some((line) => line.startsWith('#'));
    if (!hasHeadings) {
      printWarning('No markdown headings found. Consider structuring your spec with ## sections.');
      hasWarnings = true;
    }

    const hasComponents = /component|section|panel|modal|form|table|list/i.test(trimmedContent);
    if (!hasComponents) {
      printWarning(
        'Spec does not mention any components or UI sections. Claude may generate a generic layout.',
      );
      hasWarnings = true;
    }

    const wordCount = trimmedContent.split(/\s+/).length;
    const lineCount = lines.length;

    console.log();
    console.log(chalk.bold('Spec summary:'));
    printSecondary(`Words:    ${wordCount}`);
    printSecondary(`Lines:    ${lineCount}`);
    printSecondary(`Headings: ${lines.filter((line) => line.startsWith('#')).length}`);

    console.log();
    if (hasWarnings) {
      printWarning('Spec is valid but has warnings. Consider addressing them for best results.');
    } else {
      printSuccess('Spec looks good! Ready to generate.');
    }

    console.log();
    console.log(chalk.gray(`Run: prototype-gen generate --spec ${spec}`));
    console.log();
  });

program.parse(process.argv);
