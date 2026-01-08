'use client';

import { create } from 'zustand';

type CharacterStore = {
  selectedCharacterId: number | null;
  isDetailOpen: boolean;

  openCharacterDetail: (id: number) => void;
  closeCharacterDetail: () => void;
  setSelectedCharacterId: (id: number | null) => void;
};

const initialState: CharacterStore = {
  selectedCharacterId: null,
  isDetailOpen: false,
  openCharacterDetail: () => {},
  closeCharacterDetail: () => {},
  setSelectedCharacterId: () => {},
};

export const useCharacterStore = create<CharacterStore>((set) => ({
  ...initialState,

  openCharacterDetail: (id: number) =>
    set({ selectedCharacterId: id, isDetailOpen: true }),

  closeCharacterDetail: () =>
    set({ selectedCharacterId: null, isDetailOpen: false }),

  setSelectedCharacterId: (id: number | null) =>
    set({ selectedCharacterId: id }),
}));

type MaybeServerSnapshot = {
  getServerSnapshot?: () => CharacterStore;
};

(useCharacterStore as unknown as MaybeServerSnapshot).getServerSnapshot = () =>
  initialState;
