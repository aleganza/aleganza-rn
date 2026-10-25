import { FRAME_MARGIN } from "@/lib/config";
import { useTheme } from "@/lib/theme/useTheme";
import React from "react";
import { View, ViewStyle } from "react-native";

import { Frame } from "../ui/frame/frame";
import { Txt } from "../ui/texts";

export const ShowcaseFrame: React.FC<{
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}> = ({ title, subtitle, children }) => {
  const { theme } = useTheme();

  return (
    <Frame scrollable useSafeArea isSubScreen headerText={title}>
      <View
        style={{
          paddingHorizontal: FRAME_MARGIN,
          paddingBottom: theme.spacing.xxl,
          gap: theme.spacing.md,
        }}
      >
        {subtitle ? (
          <Txt style={{ color: theme.colors.textSupporting }}>{subtitle}</Txt>
        ) : null}

        {children}
      </View>
    </Frame>
  );
};

export const DemoCard: React.FC<{
  title?: string;
  children: React.ReactNode;
  style?: ViewStyle;
}> = ({ title, children, style }) => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        {
          backgroundColor: theme.colors.foreground,
          borderRadius: theme.borderRadius.md,
          padding: theme.spacing.md,
          gap: theme.spacing.sm,
        },
        style,
      ]}
    >
      {title ? (
        <Txt
          style={{
            fontFamily: theme.family.accent.semi_bold,
            fontSize: theme.fontSize.base,
          }}
        >
          {title}
        </Txt>
      ) : null}

      <View style={{ gap: theme.spacing.sm }}>{children}</View>
    </View>
  );
};

export const DemoRow: React.FC<{
  label: string;
  children: React.ReactNode;
}> = ({ label, children }) => {
  const { theme } = useTheme();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: theme.spacing.sm,
      }}
    >
      <Txt style={{ color: theme.colors.textSupporting }}>{label}</Txt>
      <View style={{ flexShrink: 1, alignItems: "flex-end" }}>{children}</View>
    </View>
  );
};
