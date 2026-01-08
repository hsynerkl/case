'use client';

import type { Character } from '@/types/characters/character';
import { useCharacterStore } from '@/lib/store/characters/useCharacterStore';
import Image from 'next/image';
import { Button } from '../ui/button';
import clsx from 'clsx';

type Props = {
  character: Character;
};

export function CharacterCard({ character }: Props) {
  const openCharacterDetail = useCharacterStore((s) => s.openCharacterDetail);

  const statusColorMap = {
    Alive: 'bg-green-400',
    Dead: 'bg-red-500',
    unknown: 'bg-gray-400',
  } as const;

  const statusColor =
    statusColorMap[character.status as keyof typeof statusColorMap];

  return (
    <article className="flex flex-col items-center overflow-hidden rounded-md border border-gray-50/20 p-2.5 shadow transition hover:shadow-lg">
      <Image
        src={character.image}
        alt={character.name}
        width={192}
        height={192}
        className="rounded-full object-contain"
      />

      <div className="pt-2">
        <h3 className="text-center text-lg font-semibold">{character.name}</h3>
        <p className="text-third text-center text-sm">{character.species}</p>

        <div className="mt-2 flex justify-center">
          <div className="flex items-center gap-2">
            <span
              className="relative flex items-center justify-center"
              aria-hidden="true"
            >
              {character.status === 'Alive' && (
                <span
                  className={clsx(
                    statusColor,
                    'absolute inline-flex h-4 w-4 animate-ping rounded-full opacity-40'
                  )}
                />
              )}
              <span
                className={clsx(
                  statusColor,
                  'relative inline-flex h-2.5 w-2.5 rounded-full ring-1 ring-white/10'
                )}
                aria-hidden="true"
              />
            </span>
            <span
              className="text-sm font-medium"
              aria-label={`Status: ${character.status}`}
            >
              {character.status}
            </span>
          </div>
        </div>

        <div className="mt-2 flex justify-center gap-2">
          <Button
            variant="outline"
            onClick={() => openCharacterDetail(character.id)}
          >
            View details
          </Button>
        </div>
      </div>
    </article>
  );
}
