import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

type Store = Record<string, any>;

const defaultValues: Store = {};

type StoreState = {
  store: Store;
  isInitialized: boolean;

  initStore: () => Promise<Store>;
  resetStoreDefaults: (options?: {
    exceptions?: string[];
    onlyKeys?: string[];
  }) => Promise<Store | undefined>;
  restoreDefaultSettings: () => Promise<void>;
  setStoreItem: (key: keyof typeof defaultValues, value: any) => Promise<void>;
  removeStoreItem: (key: keyof typeof defaultValues) => Promise<void>;
};

export const useStore = create<StoreState>((set, get) => ({
  store: { ...defaultValues },
  isInitialized: false,

  initStore: async () => {
    const { isInitialized, store } = get();
    if (isInitialized) return store;

    set({ isInitialized: true });

    try {
      console.log("\n\nInitializing store...\n");

      const newStore: Store = { ...defaultValues };

      for (const key of Object.keys(defaultValues)) {
        const storedValue = await AsyncStorage.getItem(key);
        newStore[key] =
          storedValue !== null ? JSON.parse(storedValue) : defaultValues[key];
      }

      set({ store: newStore });

      console.log("\n\nStore ready!\n");
      return newStore;
    } catch (error) {
      console.error("Error initializing store:", error);
      throw error;
    }
  },

  resetStoreDefaults: async (options) => {
    const { store, setStoreItem } = get();

    const exceptions = options?.exceptions ?? [];
    const onlyKeys = options?.onlyKeys;

    try {
      const newStore: Store = { ...store };

      const keysToReset = onlyKeys?.length
        ? onlyKeys
        : Object.keys(defaultValues).filter(
            (key) => !exceptions.includes(key)
          );

      for (const key of keysToReset) {
        const defaultValue = defaultValues[key];
        await setStoreItem(key as keyof typeof defaultValues, defaultValue);
        newStore[key] = defaultValue;
      }

      console.log("Store reset completed:", { exceptions, onlyKeys });
      return newStore;
    } catch (error) {
      console.error("Error resetting store:", error);
    }
  },

  restoreDefaultSettings: async () => {
    await get().resetStoreDefaults({ exceptions: [] });
  },

  setStoreItem: async (key, value) => {
    try {
      await AsyncStorage.setItem(key as string, JSON.stringify(value));

      set((state) => ({
        store: {
          ...state.store,
          [key]: value,
        },
      }));
    } catch (error) {
      console.error(`Error setting key ${String(key)}:`, error);
    }
  },

  removeStoreItem: async (key) => {
    try {
      await AsyncStorage.removeItem(key as string);

      set((state) => {
        const newStore = { ...state.store };
        delete newStore[key];
        return { store: newStore };
      });
    } catch (error) {
      console.error(`Error removing key ${String(key)}:`, error);
    }
  },
}));

export const getRawStoreItem = async (key: string): Promise<any> => {
  try {
    const storedValue = await AsyncStorage.getItem(key);
    return storedValue !== null ? JSON.parse(storedValue) : defaultValues[key];
  } catch (error) {
    console.error(`Error fetching key ${key}:`, error);
    throw error;
  }
};
