'use client';

import { useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getCharacters,
  getCharacter,
  characterKeys,
} from '@/lib/api/characters';
import { useCharacterFilters } from './useCharacterFilters';
import type {
  CharactersResponse,
  Character,
  CharacterFilters,
} from '@/types/characters/character';

export function useCharacters(providedFilters?: CharacterFilters) {
  const { filters: urlFilters, setPage } = useCharacterFilters();
  const filters: CharacterFilters = providedFilters ?? urlFilters;

  const queryClient = useQueryClient();

  const query = useQuery<CharactersResponse, Error>({
    queryKey: characterKeys.list(filters),
    queryFn: () => getCharacters(filters),
  });

  const data = query.data;
  const characters: Character[] = data?.results ?? [];
  const info = data?.info;
  const page = filters.page ?? 1;

  const goToPage = useCallback(
    (p: number) => {
      if (p < 1) {
        return;
      }
      setPage(p);
    },
    [setPage]
  );

  const nextPage = useCallback(() => {
    if (info?.next) {
      goToPage(page + 1);
    }
  }, [goToPage, info?.next, page]);

  const prevPage = useCallback(() => {
    if (info?.prev) {
      goToPage(page - 1);
    }
  }, [goToPage, info?.prev, page]);

  const prefetchCharacter = useCallback(
    async (id: number) => {
      await queryClient.prefetchQuery({
        queryKey: characterKeys.detail(id),
        queryFn: () => getCharacter(id),
      });
    },
    [queryClient]
  );

  return {
    data,
    characters,
    info,
    page,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
    setPage,
    nextPage,
    prevPage,
    goToPage,
    refetch: () => query.refetch(),
    prefetchCharacter,
  } as const;
}
