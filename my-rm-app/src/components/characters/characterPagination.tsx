'use client';

import { useState, useEffect } from 'react';
import type { Info } from '@/types/characters/character';
import { Button } from '../ui/button';

type Props = {
  info?: Info | null;
  page: number;
  onPrev: () => void;
  onNext: () => void;
  onPageChange: (page: number) => void;
};

export function CharacterPagination({
  info,
  page,
  onPrev,
  onNext,
  onPageChange,
}: Props) {
  const [input, setInput] = useState<string>(String(page ?? 1));
  const total = info?.pages ?? null;

  useEffect(() => {
    setInput(String(page ?? 1));
  }, [page]);

  const handleGo = () => {
    const p = Number(input);
    if (!Number.isFinite(p) || p < 1) {
      setInput(String(page));
      return;
    }
    const target = total && p > total ? total : p;
    onPageChange(target);
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleGo();
    }
  };

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onPrev}
          disabled={!info?.prev}
          aria-label="Previous page"
        >
          Previous
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={onNext}
          disabled={!info?.next}
          aria-label="Next page"
        >
          Next
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-third text-sm">
          Page <strong className="mx-1">{page}</strong>
          {total ? (
            <>
              of <strong className="ml-1">{total}</strong>
            </>
          ) : null}
        </span>

        <div className="flex items-center gap-2">
          <input
            type="number"
            min={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            className="focus:ring-primary/50 w-20 rounded border border-zinc-700 bg-zinc-900 px-2 py-1 text-sm text-white placeholder:text-zinc-500 focus:ring-2 focus:outline-none"
            aria-label="Go to page"
          />
          <Button variant="outline" size="sm" onClick={handleGo} type="button">
            Go
          </Button>
        </div>
      </div>
    </div>
  );
}
