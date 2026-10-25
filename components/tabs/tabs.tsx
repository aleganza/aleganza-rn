import { useTheme } from "@/lib/theme/useTheme";
import { Tabs } from "expo-router";
import { BottomTabBarButtonProps } from "expo-router/js-tabs";
import React from "react";
import { View } from "react-native";

import { Icon, IconName } from "../ui/icons";
import { Press } from "../ui/press";
import { Txt } from "../ui/texts";

const TabBarButton: React.FC<
  { name: IconName; activeName: IconName } & Pick<
    BottomTabBarButtonProps,
    "onPress" | "accessibilityLargeContentTitle" | "aria-selected"
  >
> = ({
  name,
  activeName,
  onPress,
  accessibilityLargeContentTitle,
  "aria-selected": isFocused,
}) => {
  const { theme } = useTheme();

  const color = isFocused ? theme.colors.text : theme.colors.textMuted;
  const fontFamily = isFocused
    ? theme.family.default.semi_bold
    : theme.family.default.medium;

  return (
    <Press
      onPress={onPress}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 4,
        marginVertical: 2,
        paddingVertical: 2,
        borderRadius: theme.borderRadius.md,
      }}
    >
      <View
        pointerEvents="none"
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Icon
          name={isFocused ? activeName : name}
          color={color}
          size={theme.iconSize.md + 2}
          style={{ marginTop: 2 }}
        />
        <Txt
          style={{
            fontFamily,
            marginTop: 2,
            fontSize: theme.fontSize.xs,
            color,
          }}
        >
          {accessibilityLargeContentTitle}
        </Txt>
      </View>
    </Press>
  );
};

export function TabBar() {
  const { theme } = useTheme();

  return (
    <Tabs
      screenOptions={() => ({
        headerShown: false,
        headerBackVisible: false,
        sceneStyle: {
          backgroundColor: theme.colors.background,
        },
        tabBarActiveTintColor: theme.colors.text.toString(),
        tabBarStyle: {
          backgroundColor: theme.colors.foreground,
          position: "absolute",
          overflow: "hidden",
          borderTopWidth: 0,
        },
      })}
    >
      <Tabs.Screen
        name="index"
        options={() => ({
          title: "Info",
          tabBarButton: (buttonProps) => (
            <TabBarButton
              name="information"
              activeName="information-filled"
              onPress={buttonProps.onPress}
              accessibilityLargeContentTitle={
                buttonProps.accessibilityLargeContentTitle
              }
              aria-selected={buttonProps["aria-selected"]}
            />
          ),
        })}
      />

      <Tabs.Screen
        name="components"
        options={() => ({
          title: "Components",
          tabBarButton: (buttonProps) => (
            <TabBarButton
              name="layout-grid"
              activeName="layout-grid-filled"
              onPress={buttonProps.onPress}
              accessibilityLargeContentTitle={
                buttonProps.accessibilityLargeContentTitle
              }
              aria-selected={buttonProps["aria-selected"]}
            />
          ),
        })}
      />
    </Tabs>
  );
}
