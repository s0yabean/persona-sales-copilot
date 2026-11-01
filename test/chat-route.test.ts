/**
 * The roleplay chat route (server/chatRoute.ts) and its offline mock path.
 * The middleware is driven with a fake request/response, so no server starts
 * and, with no key, no network call is made.
 */
import { mkdtempSync, rmSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { Readable } from 'node:stream';
import type { Connect, Plugin, ResolvedConfig, ViteDevServer } from 'vite';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { chatRoute } from '../server/chatRoute';
import { mockReply } from '../server/mockReplies';
import { roleplaySystemPrompt } from '../src/lib/persona';

let root: string;

beforeEach(() => {
  // An empty project root, so a developer's local .env is never read here.
  root = mkdtempSync(path.join(os.tmpdir(), 'persona-chat-'));
  vi.stubEnv('LLM_API_KEY', '');
  vi.stubEnv('LLM_BASE_URL', '');
  vi.stubEnv('LLM_MODEL', '');
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  rmSync(root, { recursive: true, force: true });
});

function middleware(): Connect.NextHandleFunction {
  const plugin: Plugin = chatRoute();
  (plugin.configResolved as (c: ResolvedConfig) => void)({ mode: 'test', root } as ResolvedConfig);
  let handler: Connect.NextHandleFunction | undefined;
  const server = { middlewares: { use: (fn: Connect.NextHandleFunction) => (handler = fn) } };
  (plugin.configureServer as (s: ViteDevServer) => void)(server as unknown as ViteDevServer);
  return handler!;
}

async function call(body: unknown, { url = '/api/chat', method = 'POST' } = {}) {
  const raw = typeof body === 'string' ? body : JSON.stringify(body);
  const req = Object.assign(Readable.from([Buffer.from(raw)]), { url, method }) as unknown as Connect.IncomingMessage;
  const res = {
    statusCode: 200,
    headers: {} as Record<string, string>,
    body: '',
    setHeader(name: string, value: string) {
      this.headers[name.toLowerCase()] = value;
    },
    end(chunk: string) {
      this.body = chunk;
    },
  };
  const next = vi.fn();
  await middleware()(req, res as never, next);
  return { res, next, json: res.body ? JSON.parse(res.body) : undefined };
}

function conversation(persona: 'Knight' | 'Explorer' | 'Healer' | 'Wizard', userTurns: number) {
  const messages = [{ role: 'system', content: roleplaySystemPrompt(persona, 'Not Approached') }];
  for (let i = 0; i < userTurns; i++) {
    messages.push({ role: 'user', content: `pitch ${i}` });
    if (i < userTurns - 1) messages.push({ role: 'assistant', content: `reply ${i}` });
  }
  return { messages, persona };
}

describe('mockReply', () => {
  it('gives each persona its own voice and marks the reply as a mock', () => {
    const knight = mockReply('Knight', 0);
    const explorer = mockReply('Explorer', 0);
    expect(knight).not.toBe(explorer);
    expect(knight).toMatch(/Mock reply: set LLM_API_KEY/);
  });

  it('cycles through the canned replies by turn', () => {
    const first = mockReply('Wizard', 0);
    expect(mockReply('Wizard', 1)).not.toBe(first);
    expect(mockReply('Wizard', 3)).toBe(first);
  });

  it('falls back to the Knight replies for an unknown persona', () => {
    expect(mockReply('Pirate', 1)).toBe(mockReply('Knight', 1));
  });
});

describe('POST /api/chat with no LLM key (mock path)', () => {
  it('answers with the canned reply for the persona and turn, without any network call', async () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal('fetch', fetchSpy);

    const { res, json } = await call(conversation('Healer', 2));
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toBe('application/json');
    expect(json).toEqual({ response: mockReply('Healer', 1), mock: true });
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('treats the first user message as turn 0', async () => {
    const { json } = await call(conversation('Explorer', 1));
    expect(json.response).toBe(mockReply('Explorer', 0));
  });

  it('passes other routes and methods through to the next middleware', async () => {
    const other = await call({}, { url: '/api/other' });
    expect(other.next).toHaveBeenCalledOnce();
    const get = await call({}, { method: 'GET' });
    expect(get.next).toHaveBeenCalledOnce();
    expect(get.res.body).toBe('');
  });

  it('returns 500 with an error message for a malformed body', async () => {
    const { res, json } = await call('not json');
    expect(res.statusCode).toBe(500);
    expect(json.error).toBeTruthy();
  });
});

describe('POST /api/chat with an LLM key (server-side only)', () => {
  it('forwards the conversation to the configured endpoint with the key in the Authorization header', async () => {
    vi.stubEnv('LLM_API_KEY', 'test-key-not-real');
    vi.stubEnv('LLM_BASE_URL', 'https://llm.example.test/v1');
    const fetchSpy = vi.fn(async () =>
      new Response(JSON.stringify({ choices: [{ message: { content: 'Show me the track record.' } }] })),
    );
    vi.stubGlobal('fetch', fetchSpy);

    const body = conversation('Knight', 1);
    const { json } = await call(body);
    expect(json).toEqual({ response: 'Show me the track record.', mock: false });

    expect(fetchSpy).toHaveBeenCalledOnce();
    const [url, init] = fetchSpy.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe('https://llm.example.test/v1/chat/completions');
    expect((init.headers as Record<string, string>).Authorization).toBe('Bearer test-key-not-real');
    const sent = JSON.parse(init.body as string);
    expect(sent.messages).toEqual(body.messages);
    expect(sent.model).toBe('gpt-4o-mini');
  });

  it('returns 500 when the LLM call fails, without leaking the key', async () => {
    vi.stubEnv('LLM_API_KEY', 'test-key-not-real');
    vi.stubGlobal('fetch', vi.fn(async () => new Response('nope', { status: 503 })));

    const { res, json } = await call(conversation('Wizard', 1));
    expect(res.statusCode).toBe(500);
    expect(json.error).toBe('LLM request failed: 503');
    expect(res.body).not.toContain('test-key-not-real');
  });
});
