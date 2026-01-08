import { API_BASE_URL } from '@/lib/queryClient';
import type {
  CharacterFilters as Filters,
  CharactersResponse,
  Character,
} from '@/types/characters/character';

export const characterKeys = {
  all: ['characters'] as const,
  lists: () => [...characterKeys.all, 'list'] as const,
  list: (filters: Filters) =>
    [
      ...characterKeys.lists(),
      filters.status || 'any',
      filters.gender || 'any',
      filters.page ?? 1,
    ] as const,
  detail: (id?: number) => [...characterKeys.all, 'detail', id] as const,
};

export async function getCharacters(
  filters: Filters
): Promise<CharactersResponse> {
  const params = new URLSearchParams();
  if (filters.page && filters.page > 0) {
    params.set('page', String(filters.page));
  }
  if (filters.status) {
    params.set('status', filters.status);
  }
  if (filters.gender) {
    params.set('gender', filters.gender);
  }

  const url = `${API_BASE_URL}/character/?${params.toString()}`;

  const res = await fetch(url, { cache: 'no-store' });

  if (!res.ok) {
    throw new Error(
      `Failed to fetch characters: ${res.status} ${res.statusText}`
    );
  }

  const data = await res.json();
  return data as CharactersResponse;
}

export async function getCharacter(id: number): Promise<Character> {
  const url = `${API_BASE_URL}/character/${id}`;

  const res = await fetch(url, { cache: 'no-store' });

  if (!res.ok) {
    throw new Error(
      `Failed to fetch character ${id}: ${res.status} ${res.statusText}`
    );
  }

  return (await res.json()) as Character;
}
