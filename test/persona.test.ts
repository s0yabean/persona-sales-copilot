import { describe, expect, it } from 'vitest';
import { prompts } from '../src/constants/prompts';
import { clients } from '../src/data/clients';
import { personalityTraits } from '../src/data/personalityTraits';
import { personalityProducts } from '../src/data/products';
import { rmData } from '../src/data/rmStats';
import {
  PERSONALITIES,
  SALES_STAGES,
  filterClients,
  funnelRates,
  initials,
  roleplaySystemPrompt,
} from '../src/lib/persona';

describe('persona mapping', () => {
  it.each(PERSONALITIES)('%s has a trait profile, a recommended product and a prompt for every sales stage', (p) => {
    expect(personalityTraits[p].salesApproach).toBeTruthy();
    expect(personalityTraits[p].painPoints.length).toBeGreaterThan(0);
    expect(personalityProducts[p].name).toBeTruthy();
    expect(Object.keys(prompts[p].salestype).sort()).toEqual([...SALES_STAGES].sort());
  });

  it('recommends a different product to each persona', () => {
    const names = PERSONALITIES.map((p) => personalityProducts[p].name);
    expect(new Set(names).size).toBe(PERSONALITIES.length);
  });

  it('every client has one of the four personas', () => {
    for (const client of clients) expect(PERSONALITIES).toContain(client.personality);
  });
});

describe('filterClients', () => {
  it("'All' returns every client, in the list's alphabetical order", () => {
    const all = filterClients(clients, 'All');
    expect(all).toHaveLength(clients.length);
    const names = all.map((c) => c.name);
    expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b)));
  });

  it.each(PERSONALITIES)('%s returns only %s clients, and at least one', (p) => {
    const subset = filterClients(clients, p);
    expect(subset.length).toBeGreaterThan(0);
    expect(subset.every((c) => c.personality === p)).toBe(true);
  });

  it('the four persona filters partition the client list', () => {
    const ids = PERSONALITIES.flatMap((p) => filterClients(clients, p).map((c) => c.id));
    expect(ids.sort((a, b) => a - b)).toEqual(clients.map((c) => c.id).sort((a, b) => a - b));
  });
});

describe('roleplaySystemPrompt', () => {
  it.each(PERSONALITIES.flatMap((p) => SALES_STAGES.map((s) => [p, s] as const)))(
    '%s at %s combines the persona sheet with that stage',
    (p, stage) => {
      const prompt = roleplaySystemPrompt(p, stage);
      expect(prompt).toContain(prompts[p].prompt);
      expect(prompt).toContain(prompts[p].salestype[stage]);
      // The model must play the client, never the advisor.
      expect(prompt).toMatch(/Do NOT act as the financial advisor/);
    },
  );

  it('changing the stage changes the prompt', () => {
    const variants = SALES_STAGES.map((s) => roleplaySystemPrompt('Wizard', s));
    expect(new Set(variants).size).toBe(SALES_STAGES.length);
  });

  it('two personas at the same stage get different prompts', () => {
    expect(roleplaySystemPrompt('Knight', 'Done Deal')).not.toBe(roleplaySystemPrompt('Healer', 'Done Deal'));
  });
});

describe('funnelRates (manager view)', () => {
  it('computes meeting, close and closed-of-total rates', () => {
    expect(funnelRates({ total: 120, meetings: 78, closed: 39 })).toEqual({
      meetingRate: 65,
      closeRate: 50,
      closedRate: 32.5,
    });
  });

  it('returns 0 rather than NaN for an empty stage', () => {
    expect(funnelRates({ total: 0, meetings: 0, closed: 0 })).toEqual({ meetingRate: 0, closeRate: 0, closedRate: 0 });
    expect(funnelRates({ total: 10, meetings: 0, closed: 0 }).closeRate).toBe(0);
  });

  it('every synthetic RM funnel is consistent: closed <= meetings <= total, rates within 0-100', () => {
    for (const rm of rmData) {
      for (const counts of Object.values(rm.metrics)) {
        expect(counts.closed).toBeLessThanOrEqual(counts.meetings);
        expect(counts.meetings).toBeLessThanOrEqual(counts.total);
        for (const rate of Object.values(funnelRates(counts))) {
          expect(rate).toBeGreaterThanOrEqual(0);
          expect(rate).toBeLessThanOrEqual(100);
        }
      }
    }
  });
});

describe('initials', () => {
  it('takes the first letter of up to two words, upper-cased', () => {
    expect(initials('Ava Quill')).toBe('AQ');
    expect(initials('cleo van tongeren')).toBe('CV');
    expect(initials('Quill')).toBe('Q');
    expect(initials('  Ben   Marlow ')).toBe('BM');
  });
});
