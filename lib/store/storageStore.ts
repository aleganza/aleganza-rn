import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { StorageState } from "./types";
import { defaultStorage } from "./defaults";

interface StorageStore {
  storage: StorageState;

  setItem<K extends keyof StorageState>(
    key: K,
    value: StorageState[K]
  ): void;

  removeItem<K extends keyof StorageState>(key: K): void;

  resetDefaults(): void;
}

export const useStorageStore = create<StorageStore>()(
  persist(
    (set) => ({
      storage: defaultStorage,

      setItem: (key, value) =>
        set((state) => ({
          storage: {
            ...state.storage,
            [key]: value,
          },
        })),

      removeItem: (key) =>
        set((state) => ({
          storage: {
            ...state.storage,
            [key]: defaultStorage[key],
          },
        })),

      resetDefaults: () =>
        set({
          storage: defaultStorage,
        }),
    }),
    {
      name: "app-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
