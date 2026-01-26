import { useStorageStore } from "./storageStore";

export const useStorage = () => {
  const storage = useStorageStore((s) => s.storage);
  const setItem = useStorageStore((s) => s.setItem);
  const removeItem = useStorageStore((s) => s.removeItem);
  const resetDefaults = useStorageStore((s) => s.resetDefaults);

  return {
    storage,
    setItem,
    removeItem,
    resetDefaults,
  };
};
