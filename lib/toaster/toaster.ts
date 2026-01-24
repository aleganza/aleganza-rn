import { useToaster } from "./provider";

type ToasterAPI = {
  info: (msg: string, duration?: number) => void;
  warning: (msg: string, duration?: number) => void;
  success: (msg: string, duration?: number) => void;
  error: (msg: string, duration?: number) => void;
};

let toasterRef: ReturnType<typeof useToaster> | null = null;

export const setToasterRef = (ref: ReturnType<typeof useToaster>) => {
  toasterRef = ref;
};

export const toaster: ToasterAPI = {
  info: (msg, duration) => toasterRef?.show(msg, { type: "info", duration }),
  warning: (msg, duration) => toasterRef?.show(msg, { type: "warning", duration }),
  success: (msg, duration) => toasterRef?.show(msg, { type: "success", duration }),
  error: (msg, duration) => toasterRef?.show(msg, { type: "error", duration }),
};
