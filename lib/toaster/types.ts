export type ToastType = "info" | "warning" | "success" | "error" | "neutral";

export interface Toast {
  id: number;
  title: string;
  description?: string;
  type?: ToastType;
  duration?: number;
}

export type ShowToastOptions = Partial<
  Pick<Toast, "type" | "description" | "duration">
>;

export interface ToastItemProps {
  toast: Toast;
  onClose: () => void;
}
