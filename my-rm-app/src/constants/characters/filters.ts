export type FilterOption = {
  label: string;
  value: string;
};

export const STATUS_OPTIONS: FilterOption[] = [
  { label: 'Any', value: 'any' },
  { label: 'Alive', value: 'Alive' },
  { label: 'Dead', value: 'Dead' },
  { label: 'Unknown', value: 'unknown' },
];

export const GENDER_OPTIONS: FilterOption[] = [
  { label: 'Any', value: 'any' },
  { label: 'Male', value: 'Male' },
  { label: 'Female', value: 'Female' },
];

export const DEFAULT_FILTERS = {
  status: '',
  gender: '',
  page: 1,
};
