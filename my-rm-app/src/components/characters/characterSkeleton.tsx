'use client';

import React from 'react';
import clsx from 'clsx';

export function CharacterListSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: count }).map((_, i) => {
          const status =
            i % 3 === 0 ? 'Alive' : i % 3 === 1 ? 'Dead' : 'unknown';
          const statusColor = {
            Alive: 'bg-green-400',
            Dead: 'bg-red-500',
            unknown: 'bg-gray-400',
          }[status as 'Alive' | 'Dead' | 'unknown'];

          return (
            <article
              key={i}
              className="flex animate-pulse flex-col items-center overflow-hidden rounded-md border border-gray-50/20 p-2.5 shadow transition hover:shadow-lg"
              aria-hidden
            >
              <div className="h-48 w-48 rounded-full bg-gray-200" />

              <div className="w-full pt-2">
                <div className="text-center">
                  <div className="mx-auto h-6 w-3/4 rounded bg-gray-200" />
                  <div className="mx-auto mt-2 h-4 w-1/2 rounded bg-gray-200" />
                </div>

                <div className="mt-2 flex justify-center">
                  <div className="flex items-center gap-2">
                    <span className="relative flex items-center justify-center">
                      {status === 'Alive' && (
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
                      />
                    </span>
                    <span className="text-sm font-medium text-gray-400">
                      {status}
                    </span>
                  </div>
                </div>

                <div className="mt-2 flex justify-center gap-2">
                  <div className="h-8 w-24 rounded bg-gray-200" />
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
