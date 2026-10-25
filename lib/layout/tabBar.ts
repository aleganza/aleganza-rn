import { create } from "zustand";

interface TabBarHeightState {
  height: number;
  setHeight: (height: number) => void;
}

export const useTabBarHeightStore = create<TabBarHeightState>((set) => ({
  height: 0,
  setHeight: (height) => set({ height }),
}));
