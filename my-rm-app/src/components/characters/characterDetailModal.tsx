'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { useCharacterStore } from '@/lib/store/characters/useCharacterStore';
import { getCharacter, characterKeys } from '@/lib/api/characters';
import { Button } from '../ui/button';

export function CharacterDetailModal() {
  const { selectedCharacterId, isDetailOpen, closeCharacterDetail } =
    useCharacterStore();

  const {
    data: character,
    isLoading: isCharacterLoading,
    isError: isCharacterError,
    error: characterError,
  } = useQuery({
    queryKey: characterKeys.detail(selectedCharacterId ?? undefined),
    queryFn: async () => {
      if (!selectedCharacterId) {
        throw new Error('No id');
      }
      return getCharacter(selectedCharacterId);
    },
    enabled: Boolean(selectedCharacterId) && isDetailOpen,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (!isDetailOpen) {
      return;
    }
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeCharacterDetail();
      }
    };
    document.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = previousOverflow ?? '';
      document.removeEventListener('keydown', onKey);
    };
  }, [isDetailOpen, closeCharacterDetail]);

  if (!isDetailOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Character details modal"
      onClick={() => closeCharacterDetail()}
    >
      <div
        className="max-h-[80vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-zinc-900 p-6 text-white shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <h2 className="text-2xl font-bold">Character Details</h2>
          <Button
            onClick={() => closeCharacterDetail()}
            size="sm"
            variant="outline"
            aria-label="Close character details"
          >
            Close
          </Button>
        </div>

        <div className="mt-4">
          {isCharacterLoading ? (
            <div className="animate-pulse">
              <div className="flex gap-4">
                <div className="h-32 w-32 rounded bg-zinc-800" />
                <div className="flex-1">
                  <div className="h-6 w-3/4 rounded bg-zinc-800" />
                  <div className="mt-3 h-4 w-1/2 rounded bg-zinc-800" />
                  <div className="mt-3 h-4 w-1/3 rounded bg-zinc-800" />
                  <div className="mt-3 h-4 w-2/3 rounded bg-zinc-800" />
                </div>
              </div>
            </div>
          ) : isCharacterError ? (
            <p className="text-red-400">
              {characterError instanceof Error
                ? characterError.message
                : 'Failed to load character.'}
            </p>
          ) : character ? (
            <div className="flex flex-col gap-6 md:flex-row">
              <div className="shrink-0">
                <Image
                  src={character.image}
                  alt={character.name}
                  width={192}
                  height={192}
                  className="h-32 w-32 rounded object-cover"
                />
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-semibold">{character.name}</h3>
                <p className="mt-1 text-sm text-zinc-300">
                  Status: <span className="text-white">{character.status}</span>
                </p>
                <p className="mt-1 text-sm text-zinc-300">
                  Gender: <span className="text-white">{character.gender}</span>
                </p>
                <p className="mt-1 text-sm text-zinc-300">
                  Species:{' '}
                  <span className="text-white">{character.species}</span>
                </p>
              </div>
            </div>
          ) : (
            <p className="text-zinc-300">No data</p>
          )}
        </div>
      </div>
    </div>
  );
}
