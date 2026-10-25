import { create } from "zustand";

import { PopupOptions, PopupRequest } from "./types";

interface PopupState {
  current: PopupRequest | null;
  queue: PopupRequest[];
  enqueue: (request: Omit<PopupRequest, "id">) => void;
  close: (result: boolean) => void;
}

let nextId = 0;

export const usePopupStore = create<PopupState>((set, get) => ({
  current: null,
  queue: [],
  enqueue: (request) => {
    const item: PopupRequest = { ...request, id: ++nextId };
    const { current, queue } = get();

    if (current) {
      set({ queue: [...queue, item] });
    } else {
      set({ current: item });
    }
  },
  close: (result) => {
    const { current, queue } = get();

    current?.resolve(result);

    const [next, ...rest] = queue;
    set({ current: next ?? null, queue: rest });
  },
}));

const confirm = (options: PopupOptions) =>
  new Promise<boolean>((resolve) => {
    usePopupStore.getState().enqueue({
      ...options,
      type: "confirm",
      resolve,
    });
  });

const alert = (options: PopupOptions) =>
  new Promise<void>((resolve) => {
    usePopupStore.getState().enqueue({
      ...options,
      type: "alert",
      resolve: () => resolve(),
    });
  });

export const popup = {
  confirm,
  alert,
};
