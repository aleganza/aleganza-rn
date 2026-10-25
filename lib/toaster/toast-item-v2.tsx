import { Icon, IconName } from "@/components/ui/icons";
import { Txt } from "@/components/ui/texts";
import { useTheme } from "@/lib/theme/useTheme";
import React from "react";
import { TouchableOpacity, View } from "react-native";

import { ToastItemProps, ToastType } from "./types";

const getVariant = (theme: ReturnType<typeof useTheme>["theme"], type?: ToastType) => {
  switch (type) {
    case "success":
      return { backgroundColor: theme.colors.success, icon: "check" as IconName };
    case "error":
      return { backgroundColor: theme.colors.alert, icon: "alert" as IconName };
    case "warning":
      return { backgroundColor: theme.colors.idle, icon: "warning" as IconName };
    case "info":
      return { backgroundColor: theme.colors.link, icon: "information" as IconName };
    default:
      return {
        backgroundColor: theme.colors.mist,
        icon: "notification" as IconName,
      };
  }
};

export const ToastItemV2: React.FC<ToastItemProps> = ({ toast, onClose }) => {
  const { theme } = useTheme();
  const variant = getVariant(theme, toast.type);

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: theme.spacing.sm,
        marginHorizontal: theme.spacing.md,
        marginVertical: theme.spacing.xs,
        padding: theme.spacing.base,
        backgroundColor: theme.colors.foreground,
        borderRadius: theme.borderRadius.md,
        boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.08)",
      }}
    >
      <View
        style={{
          width: 36,
          height: 36,
          borderRadius: theme.borderRadius.full,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: variant.backgroundColor,
        }}
      >
        <Icon name={variant.icon} color="#ffffff" size="sm" />
      </View>

      <View style={{ flex: 1, gap: 2 }}>
        <Txt
          style={{
            fontFamily: theme.family.base.semi_bold,
            fontSize: theme.fontSize.base,
            color: theme.colors.text,
          }}
        >
          {toast.title}
        </Txt>

        {toast.description ? (
          <Txt
            style={{
              fontFamily: theme.family.base.regular,
              fontSize: theme.fontSize.sm,
              color: theme.colors.textShy,
            }}
          >
            {toast.description}
          </Txt>
        ) : null}
      </View>

      <TouchableOpacity
        onPress={onClose}
        hitSlop={theme.spacing.sm}
        style={{ padding: theme.spacing.xs }}
      >
        <Icon name="close" color={theme.colors.textMuted} size="base" />
      </TouchableOpacity>
    </View>
  );
};
