/**
 * The LLM key must stay on the server. Two checks:
 * 1. No browser source file reads env vars or talks to an LLM provider directly;
 *    the only network call goes to the local /api/chat route.
 * 2. A real production build, made with a sentinel key in the environment,
 *    does not contain the key anywhere in its output.
 */
import { mkdtempSync, readFileSync, readdirSync, rmSync, statSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'vite';
import { afterAll, describe, expect, it, vi } from 'vitest';

const repo = fileURLToPath(new URL('..', import.meta.url));

function filesUnder(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = path.join(dir, name);
    return statSync(full).isDirectory() ? filesUnder(full) : [full];
  });
}

const clientSources = filesUnder(path.join(repo, 'src')).filter((f) => /\.(ts|tsx)$/.test(f));

describe('client source', () => {
  it('has files to check', () => {
    expect(clientSources.length).toBeGreaterThan(10);
  });

  it.each([
    ['the LLM key variable', /LLM_API_KEY/],
    ['any LLM_* setting', /LLM_(BASE_URL|MODEL)/],
    ['import.meta.env', /import\.meta\.env/],
    ['process.env', /process\.env/],
    ['an Authorization header', /Authorization/i],
    ['a provider endpoint', /api\.openai\.com|chat\/completions/],
  ])('never references %s', (_label, pattern) => {
    const offenders = clientSources.filter((f) => pattern.test(readFileSync(f, 'utf8')));
    expect(offenders.map((f) => path.relative(repo, f))).toEqual([]);
  });

  it('only calls fetch on the local /api/chat route', () => {
    const calls = clientSources.flatMap((f) => [...readFileSync(f, 'utf8').matchAll(/fetch\(\s*([^,)]+)/g)].map((m) => m[1].trim()));
    expect(calls).toEqual(["'/api/chat'"]);
  });
});

describe('production bundle', () => {
  const outDir = mkdtempSync(path.join(os.tmpdir(), 'persona-build-'));
  const sentinel = 'sentinel-llm-key-must-not-ship-7f3a';

  afterAll(() => {
    vi.unstubAllEnvs();
    rmSync(outDir, { recursive: true, force: true });
  });

  it('does not contain the LLM key even when it is set at build time', async () => {
    vi.stubEnv('LLM_API_KEY', sentinel);
    await build({
      root: repo,
      configFile: path.join(repo, 'vite.config.ts'),
      logLevel: 'silent',
      build: { outDir, emptyOutDir: true },
    });

    const output = filesUnder(outDir);
    expect(output.some((f) => f.endsWith('.js'))).toBe(true);
    const bundle = output.map((f) => readFileSync(f, 'utf8')).join('\n');
    expect(bundle).toContain('/api/chat');
    expect(bundle).not.toContain(sentinel);
    expect(bundle).not.toContain('LLM_API_KEY');
  }, 60_000);
});
