import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { StorageState } from "./types";
import { defaultStorage } from "./defaults";

interface StorageStore {
  storage: StorageState;
  setItem(path: string, value: unknown): void;
  removeItem(path: string): void;
  resetDefaults(): void;
}

// Funzioni helper per nested
function setDeep(obj: any, path: string, value: unknown) {
  const keys = path.split(".");
  const lastKey = keys.pop()!;
  const target = keys.reduce((acc, key) => {
    if (acc[key] === undefined) acc[key] = {};
    return acc[key];
  }, obj);
  target[lastKey] = value;
}

function getDeep(obj: any, path: string) {
  return path.split(".").reduce((acc, key) => acc?.[key], obj);
}

// Merge profondo tra default e persisted state
function deepMerge(target: any, source: any) {
  for (const key in source) {
    if (
      source[key] &&
      typeof source[key] === "object" &&
      !Array.isArray(source[key])
    ) {
      if (!target[key]) target[key] = {};
      deepMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}

export const useStorageStore = create<StorageStore>()(
  persist(
    (set) => ({
      storage: defaultStorage,

      setItem: (path, value) =>
        set((state) => {
          const newStorage = JSON.parse(JSON.stringify(state.storage));
          setDeep(newStorage, path, value);
          return { storage: newStorage };
        }),

      removeItem: (path) =>
        set((state) => {
          const newStorage = JSON.parse(JSON.stringify(state.storage));
          setDeep(newStorage, path, getDeep(defaultStorage, path));
          return { storage: newStorage };
        }),

      resetDefaults: () => set({ storage: defaultStorage }),
    }),
    {
      name: "app-storage",
      storage: createJSONStorage(() => ({
        getItem: AsyncStorage.getItem,
        setItem: AsyncStorage.setItem,
        removeItem: AsyncStorage.removeItem,
      })),
      merge: (persistedState, currentState) => {
        const mergedStorage = deepMerge(
          JSON.parse(JSON.stringify(defaultStorage)),
          (persistedState as any)?.storage || {}
        );
        return { ...currentState, storage: mergedStorage };
      },
    }
  )
);