import HubItem from "@/components/hub/HubItem";
import HubItemsGroup from "@/components/hub/HubItemsGroup";
import HubWrapper from "@/components/hub/HubWrapper";
import { DemoCard } from "@/components/showcase";
import { useRegisterTabBarHeight } from "@/components/tabs/useTabBarHeight";
import { PrimaryButton } from "@/components/ui/buttons";
import { Frame } from "@/components/ui/frame/frame";
import { Txt } from "@/components/ui/texts";
import { FRAME_MARGIN } from "@/lib/config";
import { useTheme } from "@/lib/theme/useTheme";
import { toaster } from "@/lib/toaster/toaster";
import React from "react";
import { View } from "react-native";

const groups = [
  {
    label: "Primitives",
    items: [
      { label: "Buttons", route: "/components/buttons", icon: "check-circle" as const },
      { label: "Inputs and search", route: "/components/inputs", icon: "edit-2" as const },
      { label: "Icons", route: "/components/icons", icon: "star" as const },
      { label: "Links and ratings", route: "/components/links", icon: "external-link" as const },
    ],
  },
  {
    label: "Layout",
    items: [
      { label: "Frame basics", route: "/components/frame", icon: "menu" as const },
      { label: "Hub rows", route: "/components/hub", icon: "more-1" as const },
      { label: "Choice grid", route: "/components/choice-grid", icon: "filter" as const },
    ],
  },
  {
    label: "Overlays",
    items: [
      { label: "Popups", route: "/components/popup", icon: "information" as const },
      { label: "Toasts", route: "/components/toast", icon: "notification" as const },
      { label: "Gorhom bottom sheets", route: "/components/sheets", icon: "layers" as const },
    ],
  },
];

export default function ComponentsTabScreen() {
  const { theme } = useTheme();
  const tabBarHeight = useRegisterTabBarHeight();

  return (
    <Frame
      scrollable
      useSafeArea
      headerText="Components"
      contentContainerStyle={{ paddingBottom: tabBarHeight }}
    >
      <View
        style={{
          paddingHorizontal: FRAME_MARGIN,
          gap: theme.spacing.md,
        }}
      >
        <DemoCard title="Toast over tabs">
          <Txt style={{ color: theme.colors.textSupporting }}>
            This button lives in a tab screen, so the bottom toast must sit
            above the tab bar and the safe area.
          </Txt>

          <PrimaryButton
            onPress={() =>
              toaster.success("Above the tabs", "Safe area + tab bar")
            }
          >
            Show toast
          </PrimaryButton>
        </DemoCard>

        <HubWrapper>
          {groups.map((group) => (
            <HubItemsGroup key={group.label} label={group.label}>
              {group.items.map((item) => (
                <HubItem
                  key={item.route}
                  label={item.label}
                  icon={item.icon}
                  route={item.route}
                />
              ))}
            </HubItemsGroup>
          ))}
        </HubWrapper>
      </View>
    </Frame>
  );
}
