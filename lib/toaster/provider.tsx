import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useSegments } from "expo-router";
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

import { TOAST_POSITION, TOAST_UI } from "./config";
import { useTabBarHeightStore } from "@/lib/layout/tabBar";
import { setToasterRef } from "./toaster";
import { ToastItemV1 } from "./toast-item-v1";
import { ToastItemV2 } from "./toast-item-v2";
import { ShowToastOptions, Toast } from "./types";

const DEFAULT_DURATION = 3000;

type ToastContextType = {
  show: (title: string, options?: ShowToastOptions) => void;
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
  const insets = useSafeAreaInsets();
  const segments = useSegments();
  const isInTabs = segments.includes("(tabs)");
  const tabBarHeight = useTabBarHeightStore((state) => state.height);

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
    <ToastContext.Provider value={{ show }}>
      {children}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        pointerEvents="box-none"
        style={[
          StyleSheet.absoluteFill,
          TOAST_POSITION === "top"
            ? {
                justifyContent: "flex-start",
                paddingTop: insets.top,
              }
            : {
                justifyContent: "flex-end",
                paddingBottom:
                  isInTabs && tabBarHeight > 0
                    ? tabBarHeight
                    : insets.bottom,
              },
        ]}
      >
        {toasts.map((toast) => (
          <ToastStackItem
            key={toast.id}
            toast={toast}
            onClose={() => remove(toast.id)}
          />
        ))}
      </KeyboardAvoidingView>
    </ToastContext.Provider>
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
