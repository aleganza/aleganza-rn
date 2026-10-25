import { Icon } from "@/components/ui/icons";
import { useTheme } from "@/lib/theme/useTheme";
import React from "react";
import { TouchableOpacity, View } from "react-native";

import { Txt } from "@/components/ui/texts";
import { ToastItemProps } from "./types";

export const ToastItemV1: React.FC<ToastItemProps> = ({ toast, onClose }) => {
  const { theme } = useTheme();

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
    <View
      style={{
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
      }}
    >
      <View style={{ flex: 1, gap: 2 }}>
        <Txt
          style={{
            color: textColor,
            fontFamily: theme.family.base.semi_bold,
            fontSize: theme.fontSize.base,
          }}
        >
          {toast.title}
        </Txt>

        {toast.description ? (
          <Txt
            style={{
              color: textColor,
              opacity: 0.8,
              fontSize: theme.fontSize.sm,
            }}
          >
            {toast.description}
          </Txt>
        ) : null}
      </View>

      <TouchableOpacity
        onPress={onClose}
        hitSlop={theme.spacing.sm}
        style={{
          marginLeft: theme.spacing.sm,
          padding: theme.spacing.xs,
        }}
      >
        <Icon name="close" color={textColor} size="base" />
      </TouchableOpacity>
    </View>
  );
};
