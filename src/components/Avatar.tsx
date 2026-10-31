import { PersonalityType } from '../types';

// Initials avatar. The demo uses synthetic clients, so it shows no photos of real people.
const palette: Record<PersonalityType, string> = {
  Knight: 'bg-yellow-200 text-yellow-900',
  Explorer: 'bg-blue-200 text-blue-900',
  Healer: 'bg-green-200 text-green-900',
  Wizard: 'bg-red-200 text-red-900',
};

interface AvatarProps {
  name: string;
  personality: PersonalityType;
  size?: 'md' | 'lg';
}

export default function Avatar({ name, personality, size = 'md' }: AvatarProps) {
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
  const dims = size === 'lg' ? 'w-16 h-16 text-xl border-2 border-white shadow-lg' : 'w-12 h-12 text-base';
  return (
    <div
      aria-label={name}
      className={`${dims} ${palette[personality]} rounded-full flex items-center justify-center font-semibold flex-shrink-0`}
    >
      {initials}
    </div>
  );
}
