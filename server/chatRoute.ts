// Tiny server route for the roleplay chat: POST /api/chat.
// Runs inside the Vite dev/preview server (Node), never in the browser, so the LLM key
// stays out of the client bundle. With no key set it returns canned persona replies.
import type { Connect, Plugin } from 'vite';
import { loadEnv } from 'vite';
import { mockReply } from './mockReplies';

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface ChatBody {
  messages: ChatMessage[];
  persona: string;
}

async function readJson(req: Connect.IncomingMessage): Promise<ChatBody> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) chunks.push(chunk as Buffer);
  return JSON.parse(Buffer.concat(chunks).toString('utf8'));
}

async function callLlm(env: Record<string, string>, messages: ChatMessage[]): Promise<string> {
  // Any OpenAI-compatible chat completions endpoint works (OpenAI, a gateway, a local server).
  const base = env.LLM_BASE_URL || 'https://api.openai.com/v1';
  const res = await fetch(`${base}/chat/completions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${env.LLM_API_KEY}` },
    body: JSON.stringify({ model: env.LLM_MODEL || 'gpt-4o-mini', messages, temperature: 0.8, max_tokens: 300 }),
  });
  if (!res.ok) throw new Error(`LLM request failed: ${res.status}`);
  const data = (await res.json()) as { choices?: { message?: { content?: string } }[] };
  return data.choices?.[0]?.message?.content ?? '';
}

export function chatRoute(): Plugin {
  let env: Record<string, string> = {};
  const handler: Connect.NextHandleFunction = async (req, res, next) => {
    if (req.url !== '/api/chat' || req.method !== 'POST') return next();
    try {
      const body = await readJson(req);
      const turn = body.messages.filter((m) => m.role === 'user').length - 1;
      const response = env.LLM_API_KEY
        ? await callLlm(env, body.messages)
        : mockReply(body.persona, Math.max(turn, 0));
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ response, mock: !env.LLM_API_KEY }));
    } catch (err) {
      res.statusCode = 500;
      res.end(JSON.stringify({ error: (err as Error).message }));
    }
  };
  return {
    name: 'chat-route',
    configResolved(config) {
      // Empty prefix loads all .env keys server-side. Only VITE_* keys ever reach the bundle,
      // and this project defines none.
      env = { ...loadEnv(config.mode, config.root, ''), ...process.env } as Record<string, string>;
    },
    configureServer(server) {
      server.middlewares.use(handler);
    },
    configurePreviewServer(server) {
      server.middlewares.use(handler);
    },
  };
}
