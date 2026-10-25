import React from "react";

export interface PopupOptions {
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  destructive?: boolean;
  dismissOnBackdrop?: boolean;
}

export interface BasePopupProps {
  visible: boolean;
  title?: string;
  children?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  destructive?: boolean;
  showCancel?: boolean;
  isLoading?: boolean;
  dismissOnBackdrop?: boolean;
  onConfirm: () => void;
  onCancel?: () => void;
}

export interface PopupRequest extends PopupOptions {
  id: number;
  type: "alert" | "confirm";
  resolve: (value: boolean) => void;
}
