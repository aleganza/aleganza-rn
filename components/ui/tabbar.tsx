import React, { useEffect, useMemo, useState } from "react";
import { TouchableOpacity, View, useWindowDimensions } from "react-native";
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { AniView } from "@/lib/reanimated/components";
import { useTheme } from "@/lib/theme/useTheme";
import { Txt } from "./texts";
import { FRAME_MARGIN } from "@/lib/config";

export interface TabItem {
  key: string;
  label: string;
  Icon?: any;
  content: React.ReactNode;
}

export interface CustomTabBarProps {
  tabs: TabItem[];
  initialTab?: string;
  onChange?: (tabKey: string) => void;

  /**
   * se undefined → auto layout
   * se passato → modalità manuale (es. 300)
   */
  width?: number;

  margin?: number;
  padding?: number;
  gap?: number;
}

export const TabBar: React.FC<CustomTabBarProps> = ({
  tabs,
  initialTab,
  onChange,
  width,
  margin = 0,
  padding = 4,
  gap = 0,
}) => {
  const { theme } = useTheme();
  const { width: screenWidth } = useWindowDimensions();

  const [activeTab, setActiveTab] = useState(initialTab ?? tabs[0].key);

  /**
   * 🔹 WIDTH LOGIC
   */
  const resolvedWidth = useMemo(() => {
    return width ?? screenWidth - FRAME_MARGIN * 2;
  }, [width, screenWidth, FRAME_MARGIN]);

  const TAB_WIDTH = (resolvedWidth - gap) / tabs.length;

  const translate = useSharedValue(tabs.findIndex((t) => t.key === activeTab));

  useEffect(() => {
    translate.value = withTiming(
      tabs.findIndex((t) => t.key === activeTab),
      {
        duration: 200,
        easing: Easing.out(Easing.exp),
      },
    );
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
    onChange?.(tabKey);
  };

  const activeContent = useMemo(() => {
    return tabs.find((t) => t.key === activeTab)?.content;
  }, [activeTab, tabs]);

  return (
    <View style={{ flex: 1, marginHorizontal: FRAME_MARGIN }}>
      {/* 🔹 TAB BAR */}
      <View
        style={{
          flexDirection: "row",
          backgroundColor: theme.colors.foreground,
          borderRadius: 10,
          marginHorizontal: margin,
          paddingVertical: padding,
          position: "relative",
          width: resolvedWidth,

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
                color={
                  activeTab === key ? theme.colors.text : theme.colors.textMuted
                }
                style={{ marginRight: 6 }}
              />
            )}

            <Txt
              style={{
                color:
                  activeTab === key
                    ? theme.colors.text
                    : theme.colors.textMuted,
                fontSize: theme.fontSize.base,
                fontFamily: theme.family.base.bold,
              }}
            >
              {label}
            </Txt>
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ flex: 1, overflow: "hidden" }}>{activeContent}</View>
    </View>
  );
};
