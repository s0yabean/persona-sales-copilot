// Canned client replies used when no LLM key is configured, so the roleplay works offline.
// Keyed by persona archetype, then by sales stage. All text is written for this demo.
type Persona = 'Knight' | 'Explorer' | 'Healer' | 'Wizard';

const replies: Record<Persona, string[]> = {
  Knight: [
    "Let's skip the small talk. What's your track record, and who else like me has used this?",
    "I need the numbers in writing: fees, guarantees, and what happens to my family if something goes wrong.",
    "That's a claim, not evidence. Show me the five-year history before I commit to anything.",
  ],
  Explorer: [
    "Oh nice, that reminds me, I just got back from a trip. Anyway, what's the exciting part of this plan?",
    "Honestly the details lose me. Give me the one-line version: what could this let me do?",
    "Sounds fun if I can move things around later. Can I change my mind in a year?",
  ],
  Healer: [
    "Before we talk products, I'd like to know why you do this work. What matters to you?",
    "My priority is my family and the causes I support. How does this help them in the long run?",
    "I want to feel we're partners here. How often would we actually talk?",
  ],
  Wizard: [
    "I've already modelled a few scenarios myself. What assumptions are behind your projected returns?",
    "Walk me through the mechanics. Where exactly does the downside protection come from, and what does it cost?",
    "Feelings aren't a reason to buy. What metric would tell us in twelve months that this was the right call?",
  ],
};

export function mockReply(persona: string, turn: number): string {
  const list = replies[(persona as Persona)] ?? replies.Knight;
  return `${list[turn % list.length]}\n\n_(Mock reply: set LLM_API_KEY in .env to use a real model.)_`;
}
