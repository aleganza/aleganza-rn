import { useToaster } from "./provider";
import { ShowToastOptions } from "./types";

export { TOAST_POSITION, TOAST_UI } from "./config";

type ToasterAPI = {
  info: (title: string, description?: string, duration?: number) => void;
  warning: (title: string, description?: string, duration?: number) => void;
  success: (title: string, description?: string, duration?: number) => void;
  error: (title: string, description?: string, duration?: number) => void;
  neutral: (title: string, description?: string, duration?: number) => void;
};

let toasterRef: ReturnType<typeof useToaster> | null = null;

export const setToasterRef = (ref: ReturnType<typeof useToaster>) => {
  toasterRef = ref;
};

const show = (
  type: NonNullable<ShowToastOptions["type"]>,
  title: string,
  description?: string,
  duration?: number,
) => toasterRef?.show(title, { type, description, duration });

export const toaster: ToasterAPI = {
  info: (title, description, duration) =>
    show("info", title, description, duration),
  warning: (title, description, duration) =>
    show("warning", title, description, duration),
  success: (title, description, duration) =>
    show("success", title, description, duration),
  error: (title, description, duration) =>
    show("error", title, description, duration),
  neutral: (title, description, duration) =>
    show("neutral", title, description, duration),
};
