import { mkdir, readdir, copyFile, stat } from 'node:fs/promises';
import { join } from 'node:path';

type Result<T> = { ok: true; value: T } | { ok: false; error: string };

async function copyDirectoryRecursively(
  sourceDirectory: string,
  destinationDirectory: string,
): Promise<Result<void>> {
  try {
    await mkdir(destinationDirectory, { recursive: true });
  } catch (error) {
    return {
      ok: false,
      error: `Failed to create ${destinationDirectory}: ${error instanceof Error ? error.message : String(error)}`,
    };
  }

  let entries: string[];
  try {
    entries = await readdir(sourceDirectory);
  } catch (error) {
    return {
      ok: false,
      error: `Failed to read ${sourceDirectory}: ${error instanceof Error ? error.message : String(error)}`,
    };
  }

  for (const entryName of entries) {
    const sourcePath = join(sourceDirectory, entryName);
    const destinationPath = join(destinationDirectory, entryName);

    let entryStats;
    try {
      entryStats = await stat(sourcePath);
    } catch (error) {
      return {
        ok: false,
        error: `Failed to stat ${sourcePath}: ${error instanceof Error ? error.message : String(error)}`,
      };
    }

    if (entryStats.isDirectory()) {
      const result = await copyDirectoryRecursively(sourcePath, destinationPath);
      if (!result.ok) return result;
    } else {
      try {
        await copyFile(sourcePath, destinationPath);
      } catch (error) {
        return {
          ok: false,
          error: `Failed to copy ${sourcePath}: ${error instanceof Error ? error.message : String(error)}`,
        };
      }
    }
  }

  return { ok: true, value: undefined };
}

// Copy the React+Vite template skeleton to the output directory.
// Called before Claude writes source files into it for the react format.
export async function copyReactTemplate(
  templateDirectory: string,
  outputDirectory: string,
): Promise<Result<void>> {
  const reactAppTemplatePath = join(templateDirectory, 'react-app');

  try {
    await stat(reactAppTemplatePath);
  } catch {
    return {
      ok: false,
      error: `React template not found at ${reactAppTemplatePath}`,
    };
  }

  return copyDirectoryRecursively(reactAppTemplatePath, outputDirectory);
}
