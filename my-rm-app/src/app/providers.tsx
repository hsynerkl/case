'use client';

import { ComponentType, ReactNode, useEffect, useMemo, useState } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { getClientQueryClient } from '@/lib/queryClient';

type UnknownRecord = Record<string, unknown>;

export function Providers({ children }: { children: ReactNode }) {
  const queryClient = useMemo(() => getClientQueryClient(), []);

  const [ProviderComponent, setProviderComponent] =
    useState<ComponentType<UnknownRecord> | null>(null);

  useEffect(() => {
    let mounted = true;

    import('nuqs')
      .then((nuqsPkg) => {
        if (!mounted) {
          return;
        }

        const candidates: unknown[] = [
          (nuqsPkg as UnknownRecord)?.NuqsProvider,
          (nuqsPkg as UnknownRecord)?.Provider,
          (nuqsPkg as UnknownRecord)?.provider,
          (nuqsPkg as UnknownRecord)?.default &&
            ((nuqsPkg as UnknownRecord).default as UnknownRecord)?.NuqsProvider,
          (nuqsPkg as UnknownRecord)?.default &&
            ((nuqsPkg as UnknownRecord).default as UnknownRecord)?.Provider,
          (nuqsPkg as UnknownRecord)?.default,
          nuqsPkg,
        ];

        for (const c of candidates) {
          if (!c) {
            continue;
          }

          if (typeof c === 'function') {
            setProviderComponent(() => c as ComponentType<UnknownRecord>);
            return;
          }

          if (typeof c === 'object' && c !== null) {
            const maybeProvider = (c as UnknownRecord)['Provider'];
            if (typeof maybeProvider === 'function') {
              setProviderComponent(
                () => maybeProvider as ComponentType<UnknownRecord>
              );
              return;
            }

            const maybeNuqsProvider = (c as UnknownRecord)['NuqsProvider'];
            if (typeof maybeNuqsProvider === 'function') {
              setProviderComponent(
                () => maybeNuqsProvider as ComponentType<UnknownRecord>
              );
              return;
            }
          }
        }
      })
      .catch((error) => {
        console.warn('Nuqs dynamic import failed:', error);
      });

    return () => {
      mounted = false;
    };
  }, []);

  if (ProviderComponent) {
    return (
      <ProviderComponent options={{ shallow: false }}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </ProviderComponent>
    );
  }

  console.warn(
    'Nuqs provider not usable; falling back to QueryClientProvider only.'
  );
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
