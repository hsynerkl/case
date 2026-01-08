'use client';

import { useCharacters } from '@/lib/hooks/characters/useCharacters';
import { useCharacterFilters } from '@/lib/hooks/characters/useCharacterFilters';
import { CharacterCard } from './characterCard';
import { CharacterListSkeleton } from './characterSkeleton';
import { CharacterPagination } from './characterPagination';

export function CharacterList() {
  const { filters } = useCharacterFilters();

  const {
    data,
    isLoading,
    isError,
    error,
    page,
    info,
    nextPage,
    prevPage,
    goToPage,
  } = useCharacters(filters);

  if (isLoading) {
    return <CharacterListSkeleton />;
  }

  if (isError) {
    return (
      <div className="flex min-h-100 items-center justify-center">
        <div className="text-center">
          <h2 className="text-destructive mb-2 text-2xl font-bold">
            Error Loading Characters
          </h2>
          <p className="text-third">
            {error instanceof Error ? error.message : 'Something went wrong'}
          </p>
        </div>
      </div>
    );
  }

  if (!data || (Array.isArray(data.results) && data.results.length === 0)) {
    return (
      <div className="flex min-h-100 items-center justify-center">
        <div className="text-center">
          <h2 className="mb-2 text-2xl font-bold">No Characters Found</h2>
          <p className="text-third">
            Try adjusting your filters to see more results.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data!.results.map((character) => (
          <div key={character.id}>
            <CharacterCard character={character} />
          </div>
        ))}
      </div>

      <CharacterPagination
        info={info}
        page={page}
        onPrev={prevPage}
        onNext={nextPage}
        onPageChange={goToPage}
      />
    </div>
  );
}
