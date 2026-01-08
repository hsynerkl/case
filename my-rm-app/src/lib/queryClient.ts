import { QueryClient, DefaultOptions } from '@tanstack/react-query';

export const API_BASE_URL: string =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://rickandmortyapi.com/api';

const STALE_TIME: number = Number(
  process.env.NEXT_PUBLIC_QUERY_STALE_TIME ?? 1000 * 60 * 2
);

const defaultOptions: DefaultOptions = {
  queries: {
    staleTime: STALE_TIME,
    refetchOnWindowFocus: false,
    retry: 1,
  },
  mutations: {
    retry: 0,
  },
};

export function createServerQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions,
  });
}

export function getClientQueryClient(): QueryClient {
  if (typeof window === 'undefined') {
    return createServerQueryClient();
  }

  const g = globalThis as unknown as { __REACT_QUERY_CLIENT__?: QueryClient };
  if (!g.__REACT_QUERY_CLIENT__) {
    g.__REACT_QUERY_CLIENT__ = new QueryClient({
      defaultOptions,
    });
  }
  return g.__REACT_QUERY_CLIENT__!;
}
