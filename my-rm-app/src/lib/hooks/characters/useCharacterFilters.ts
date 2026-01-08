'use client';

import { useCallback, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { CharacterFilters } from '@/types/characters/character';

function normalize(sp: URLSearchParams | null | undefined) {
  const obj: Record<string, string | undefined> = {};
  if (!sp) {
    return obj;
  }
  sp.forEach((v, k) => {
    obj[k] = v;
  });
  return obj;
}

export function useCharacterFilters() {
  const router = useRouter();
  const usp = useSearchParams();
  const spObj = normalize(usp);

  const filters: CharacterFilters = useMemo(() => {
    const rawStatus = spObj.status ?? '';
    const rawGender = spObj.gender ?? '';
    const rawPage = spObj.page ?? '';
    return {
      status:
        rawStatus === 'any' || rawStatus === ''
          ? ''
          : (rawStatus as CharacterFilters['status']),
      gender:
        rawGender === 'any' || rawGender === ''
          ? ''
          : (rawGender as CharacterFilters['gender']),
      page: rawPage ? parseInt(rawPage, 10) : 1,
    };
  }, [spObj.status, spObj.gender, spObj.page]);

  const setStatus = useCallback(
    (value: string) => {
      if (typeof window === 'undefined') {
        return;
      }
      const url = new URL(window.location.href);

      if (value === 'any' || value === '') {
        url.searchParams.delete('status');
      } else {
        url.searchParams.set('status', String(value));
      }

      url.searchParams.delete('page');

      router.push(url.pathname + url.search);
    },
    [router]
  );

  const setGender = useCallback(
    (value: string) => {
      if (typeof window === 'undefined') {
        return;
      }
      const url = new URL(window.location.href);

      if (value === 'any' || value === '') {
        url.searchParams.delete('gender');
      } else {
        url.searchParams.set('gender', String(value));
      }

      url.searchParams.delete('page');

      router.push(url.pathname + url.search);
    },
    [router]
  );

  const setPage = useCallback(
    (page: number) => {
      if (typeof window === 'undefined') {
        return;
      }
      const url = new URL(window.location.href);

      if (!page || page <= 1) {
        url.searchParams.delete('page');
      } else {
        url.searchParams.set('page', String(page));
      }

      router.push(url.pathname + url.search);
    },
    [router]
  );

  const resetFilters = useCallback(() => {
    if (typeof window === 'undefined') {
      return;
    }
    const url = new URL(window.location.href);
    url.searchParams.delete('status');
    url.searchParams.delete('gender');
    url.searchParams.delete('page');
    router.push(url.pathname + url.search);
  }, [router]);

  return {
    filters,
    setStatus,
    setGender,
    setPage,
    resetFilters,
  } as const;
}

export type UseCharacterFiltersReturn = ReturnType<typeof useCharacterFilters>;
