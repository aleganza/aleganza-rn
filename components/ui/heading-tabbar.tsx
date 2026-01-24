import { useTheme } from "@/lib/theme/useTheme";
import React, { ReactNode, useState } from "react";
import {
  ScrollView,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import Spacer from "./spacer";

type GenericTab<T extends string> = {
  key: T;
  label: ReactNode;
  content: ReactNode;
};

type GenericTabsProps<T extends string> = {
  tabs: GenericTab<T>[];
  initialTabKey?: T;
  tabBarStyle?: StyleProp<ViewStyle>;
  tabSpacing?: number;
};

function HeadingTabbar<T extends string>({
  tabs,
  initialTabKey,
  tabBarStyle,
  tabSpacing,
}: GenericTabsProps<T>) {
  const { theme } = useTheme();

  const [activeTab, setActiveTab] = useState<T>(initialTabKey ?? tabs[0].key);

  const activeTabContent = tabs.find((tab) => tab.key === activeTab)?.content;

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={tabBarStyle}
        contentContainerStyle={{
          flexDirection: "row",
          gap: tabSpacing ?? theme.spacing.md,
        }}
      >
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            activeOpacity={0.5}
            style={{
              opacity: tab.key === activeTab ? 1 : 0.4
            }}
            hitSlop={10}
            onPress={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={{ flex: 1 }}>{activeTabContent}</View>
    </View>
  );
}

export default HeadingTabbar;
