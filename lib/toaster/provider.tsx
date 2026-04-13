import { X } from "lucide-react-native";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Animated,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { setToasterRef } from "./toaster";
import { useTheme } from "../theme/useTheme";

type Toast = {
  id: number;
  message: string;
  type?: "info" | "warning" | "success" | "error";
  duration?: number;
};

type ToastContextType = {
  show: (
    message: string,
    options?: Partial<Omit<Toast, "id" | "message">>,
  ) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

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

  const show = (
    message: string,
    options: Partial<Omit<Toast, "id" | "message">> = {},
  ) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, ...options }]);
  };

  const remove = (id: number) =>
    setToasts((prev) => prev.filter((t) => t.id !== id));

  useEffect(() => {
    setToasterRef({ show });
  }, []);

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={insets.bottom}
        style={[
          StyleSheet.absoluteFill,
          { justifyContent: "flex-end", marginBottom: insets.bottom },
        ]}
        pointerEvents="box-none"
      >
        {toasts.map((toast, index) => (
          <ToastItem
            key={`${toast.id}-${index}`}
            toast={toast}
            onClose={() => remove(toast.id)}
          />
        ))}
      </KeyboardAvoidingView>
    </ToastContext.Provider>
  );
};

const ToastItem = ({
  toast,
  onClose,
}: {
  toast: Toast;
  onClose: () => void;
}) => {
  const { theme } = useTheme();

  const translateY = useRef(new Animated.Value(50)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(translateY, { toValue: 0, useNativeDriver: true }).start();
    Animated.timing(opacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => handleClose(), toast.duration || 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 50,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(onClose);
  };

  let textColor = "#fff";
  let bgColor;
  switch (toast.type) {
    case "error":
      bgColor = theme.colors.alert;
      break;

    case "success":
      textColor = "#000";
      bgColor = theme.colors.success;
      break;

    case "info":
      bgColor = theme.colors.primary;
      break;

    case "warning":
      bgColor = theme.colors.idle;
      break;

    default:
      bgColor = theme.colors.mist;
      break;
  }

  return (
    <Animated.View
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: theme.spacing.base,
          marginHorizontal: theme.spacing.md,
          paddingVertical: theme.spacing.base,
          paddingHorizontal: theme.spacing.md,
          marginTop: theme.spacing.base / 2,
          shadowColor: "#000",
          shadowOpacity: 0.2,
          shadowRadius: 4,
          elevation: 3,
          backgroundColor: bgColor,
          opacity,
          transform: [{ translateY }],
        },
      ]}
    >
      <Text
        style={{ color: textColor, flex: 1, fontSize: theme.fontSize.base }}
      >
        {toast.message}
      </Text>
      <TouchableOpacity
        onPress={handleClose}
        style={{
          marginLeft: theme.spacing.sm,
        }}
      >
        <X color={textColor} size={theme.iconSize.base} strokeWidth={2} />
      </TouchableOpacity>
    </Animated.View>
  );
};
