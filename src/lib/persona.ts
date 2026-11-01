// Pure domain logic shared by the components: client filtering, the roleplay
// system prompt and the manager-view funnel rates. No React, no I/O, so it can
// be unit tested on its own.
import { prompts } from '../constants/prompts';
import { Client, PersonalityType, SalesStage } from '../types';

export const PERSONALITIES: PersonalityType[] = ['Knight', 'Explorer', 'Healer', 'Wizard'];

export const SALES_STAGES: SalesStage[] = [
  'Not Approached',
  'Opening Appointment',
  'Closing Appointment',
  'Done Deal',
];

export type PersonalityFilter = PersonalityType | 'All';

export function filterClients(clients: Client[], personality: PersonalityFilter): Client[] {
  return personality === 'All' ? clients : clients.filter((client) => client.personality === personality);
}

/**
 * The system prompt for a roleplay session: the persona's character sheet plus
 * how that persona behaves at the chosen sales stage.
 */
export function roleplaySystemPrompt(personality: PersonalityType, stage: SalesStage): string {
  const persona = prompts[personality];
  return `You are a client that is helping a salesperson practice his pitch. This is your personality: ${persona.prompt}. This is the current sales cycle: ${persona.salestype[stage]}`;
}

export interface FunnelCounts {
  total: number;
  meetings: number;
  closed: number;
}

/**
 * Percentages for one RM's funnel with one persona. `closedRate` is closed out
 * of all clients (meeting rate x close rate), which the inner chart ring shows.
 * Empty stages give 0 rather than NaN.
 */
export function funnelRates({ total, meetings, closed }: FunnelCounts) {
  const pct = (part: number, whole: number) => (whole > 0 ? (part / whole) * 100 : 0);
  return {
    meetingRate: pct(meetings, total),
    closeRate: pct(closed, meetings),
    closedRate: pct(closed, total),
  };
}

export function initials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}
