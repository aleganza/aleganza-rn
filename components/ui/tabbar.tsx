import { AniView } from "@/lib/reanimated/components";
import { useTheme } from "@/lib/theme/useTheme";
import { LucideIcon } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Txt } from "./texts";

export interface TabItem {
  key: string;
  label: string;
  Icon?: LucideIcon;
}

export interface CustomTabBarProps {
  tabs: TabItem[];
  initialTab?: string;
  onChange?: (tabKey: string) => void;
  width: number;
  margin?: number;
  padding?: number;
  gap?: number;
}

export const UpperTabBar: React.FC<CustomTabBarProps> = ({
  tabs,
  initialTab,
  onChange,
  width,
  margin = 0,
  padding = 4,
  gap = 0,
}) => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState(initialTab ?? tabs[0].key);

  const TAB_WIDTH = (width - gap) / tabs.length;
  const translate = useSharedValue(tabs.findIndex((t) => t.key === activeTab));

  useEffect(() => {
    translate.value = withTiming(tabs.findIndex((t) => t.key === activeTab), {
      duration: 200,
      easing: Easing.out(Easing.exp),
    });
  }, [activeTab]);

  const animatedIndicatorStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translate.value * (TAB_WIDTH + gap),
      },
    ],
  }));

  const handlePress = (tabKey: string) => {
    setActiveTab(tabKey);
    if (onChange) onChange(tabKey);
  };

  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: theme.colors.foreground,
        borderRadius: 10,
        marginHorizontal: margin,
        paddingVertical: padding,
        position: "relative",
        width,
        justifyContent: "space-between",
      }}
    >
      <AniView
        style={[
          {
            position: "absolute",
            width: TAB_WIDTH - padding * 2,
            height: "100%",
            backgroundColor: theme.colors.mist,
            borderRadius: 8,
            marginHorizontal: padding,
            top: padding,
            bottom: padding,
          },
          animatedIndicatorStyle,
        ]}
      />

      {tabs.map(({ key, label, Icon }) => (
        <TouchableOpacity
          key={key}
          activeOpacity={0.5}
          onPress={() => handlePress(key)}
          style={{
            width: TAB_WIDTH,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 8,
            zIndex: 1,
          }}
        >
          {Icon && (
            <Icon
              size={16}
              color={activeTab === key ? theme.colors.text : theme.colors.textMuted}
              style={{ marginRight: 6 }}
            />
          )}
          <Txt
            style={{
              color: activeTab === key ? theme.colors.text : theme.colors.textMuted,
              fontSize: theme.fontSize.base,
              fontFamily: theme.family.default.bold,
            }}
          >
            {label}
          </Txt>
        </TouchableOpacity>
      ))}
    </View>
  );
};
