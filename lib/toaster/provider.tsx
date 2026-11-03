import { useSegments } from "expo-router";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useTabBarHeightStore } from "@/lib/layout/tabBar";
import { TOAST_POSITION, TOAST_UI } from "./config";
import { setToasterRef } from "./toaster";
import { ToastItemV1 } from "./toast-item-v1";
import { ToastItemV2 } from "./toast-item-v2";
import { ShowToastOptions, Toast } from "./types";

const DEFAULT_DURATION = 3000;

type ToastContextType = {
  toasts: Toast[];
  show: (title: string, options?: ShowToastOptions) => void;
  remove: (id: number) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

let nextToastId = 0;

export const useToaster = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToaster must be used within ToastProvider");
  return ctx;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const show = (title: string, options: ShowToastOptions = {}) => {
    const id = ++nextToastId;
    setToasts((prev) => [...prev, { id, title, ...options }]);
  };

  const remove = (id: number) =>
    setToasts((prev) => prev.filter((toast) => toast.id !== id));

  useEffect(() => {
    setToasterRef({ show });
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, show, remove }}>
      {children}
      <ToastViewport />
    </ToastContext.Provider>
  );
};

export const ToastViewport: React.FC<{ inModal?: boolean }> = ({
  inModal = false,
}) => {
  const ctx = useContext(ToastContext);
  const insets = useSafeAreaInsets();
  const segments = useSegments();
  const isInTabs = segments.includes("(tabs)");
  const tabBarHeight = useTabBarHeightStore((state) => state.height);

  if (!ctx) return null;

  const bottomOffset = inModal
    ? insets.bottom
    : isInTabs && tabBarHeight > 0
      ? tabBarHeight
      : insets.bottom;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      pointerEvents="box-none"
      style={[
        StyleSheet.absoluteFill,
        inModal ? { zIndex: 10 } : null,
        TOAST_POSITION === "top"
          ? {
              justifyContent: "flex-start",
              paddingTop: insets.top,
            }
          : {
              justifyContent: "flex-end",
              paddingBottom: bottomOffset,
            },
      ]}
    >
      {ctx.toasts.map((toast) => (
        <ToastStackItem
          key={toast.id}
          toast={toast}
          onClose={() => ctx.remove(toast.id)}
        />
      ))}
    </KeyboardAvoidingView>
  );
};

const ToastStackItem = ({
  toast,
  onClose,
}: {
  toast: Toast;
  onClose: () => void;
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, toast.duration ?? DEFAULT_DURATION);
    return () => clearTimeout(timer);
  }, [toast.id]);

  return (
    <Animated.View
      entering={FadeIn.duration(200)}
      exiting={FadeOut.duration(150)}
      layout={LinearTransition.duration(200)}
    >
      {TOAST_UI === "v2" ? (
        <ToastItemV2 toast={toast} onClose={onClose} />
      ) : (
        <ToastItemV1 toast={toast} onClose={onClose} />
      )}
    </Animated.View>
  );
};
