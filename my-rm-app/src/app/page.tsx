import { CharacterFilters } from '@/components/characters/characterFilter';
import { CharacterList } from '@/components/characters/characterList';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getCharacters, characterKeys } from '@/lib/api/characters';
import type { CharacterFilters as Filters } from '@/types/characters/character';
import { createServerQueryClient } from '@/lib/queryClient';
import { CharacterDetailModal } from '@/components/characters/characterDetailModal';

interface PageProps {
  searchParams: Promise<{
    status?: string;
    gender?: string;
    page?: string;
  }>;
}

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;

  const filters: Filters = {
    status: (params.status as Filters['status']) || '',
    gender: (params.gender as Filters['gender']) || '',
    page: params.page ? parseInt(params.page, 10) : 1,
  };

  const queryClient = createServerQueryClient();

  await queryClient.prefetchQuery({
    queryKey: characterKeys.list(filters),
    queryFn: () => getCharacters(filters),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="text-secondary min-h-screen py-16 select-none">
        <div className="container">
          <div className="mb-8">
            <h1 className="mb-2 text-4xl font-bold">
              Rick and Morty Characters
            </h1>
            <p className="text-third">
              Browse and filter characters from the Rick and Morty universe
            </p>
          </div>

          <div className="mb-8">
            <CharacterFilters />
          </div>

          <CharacterList />

          <CharacterDetailModal />
        </div>
      </main>
    </HydrationBoundary>
  );
}
