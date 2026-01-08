'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { GENDER_OPTIONS, STATUS_OPTIONS } from '@/constants/characters/filters';
import { useCharacterFilters } from '@/lib/hooks/characters/useCharacterFilters';

export function CharacterFilters() {
  const { filters, setStatus, setGender, resetFilters } = useCharacterFilters();

  const selectStatusDefault = filters.status || 'any';
  const selectGenderDefault = filters.gender || 'any';

  const [localStatus, setLocalStatus] = useState<string>(selectStatusDefault);
  const [localGender, setLocalGender] = useState<string>(selectGenderDefault);

  useEffect(() => {
    setLocalStatus(selectStatusDefault);
  }, [selectStatusDefault]);

  useEffect(() => {
    setLocalGender(selectGenderDefault);
  }, [selectGenderDefault]);

  const onStatusChange = (value: string) => {
    setLocalStatus(value);
    setStatus(value);
  };

  const onGenderChange = (value: string) => {
    setLocalGender(value);
    setGender(value);
  };

  const hasActiveFilters = Boolean(filters.status || filters.gender);

  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="status-filter" className="text-sm font-medium">
          Status
        </label>
        <Select value={localStatus} onValueChange={onStatusChange}>
          <SelectTrigger
            id="status-filter"
            className="w-[180px] cursor-pointer"
          >
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            {STATUS_OPTIONS.map((option) => (
              <SelectItem
                className="cursor-pointer"
                key={option.value}
                value={option.value}
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="gender-filter" className="text-sm font-medium">
          Gender
        </label>
        <Select value={localGender} onValueChange={onGenderChange}>
          <SelectTrigger id="gender-filter" className="w-[180px]">
            <SelectValue placeholder="Select gender" />
          </SelectTrigger>
          <SelectContent>
            {GENDER_OPTIONS.map((option) => (
              <SelectItem
                className="cursor-pointer"
                key={option.value}
                value={option.value}
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {hasActiveFilters && (
        <Button
          variant="outline"
          onClick={() => {
            setLocalStatus('any');
            setLocalGender('any');
            resetFilters();
          }}
          className="mt-auto"
        >
          Reset Filters
        </Button>
      )}
    </div>
  );
}
