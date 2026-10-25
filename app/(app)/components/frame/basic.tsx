import { DemoCard } from "@/components/showcase";
import { Frame } from "@/components/ui/frame/frame";
import { Txt } from "@/components/ui/texts";
import { FRAME_MARGIN } from "@/lib/config";
import { useTheme } from "@/lib/theme/useTheme";
import { toaster } from "@/lib/toaster/toaster";
import React from "react";
import { View } from "react-native";

export default function FrameBasicShowcase() {
  const { theme } = useTheme();

  return (
    <Frame
      scrollable
      useSafeArea
      isSubScreen
      headerText="Frame basic"
      leftIcons={[
        {
          icon: "search",
          onPress: () => toaster.info("Search icon pressed"),
        },
      ]}
      rightIcons={[
        {
          icon: "plus",
          onPress: () => toaster.info("Plus icon pressed"),
        },
        {
          icon: "more-1",
          onPress: () => toaster.info("More icon pressed"),
        },
      ]}
    >
      <View
        style={{
          paddingHorizontal: FRAME_MARGIN,
          gap: theme.spacing.md,
        }}
      >
        <DemoCard title="Header">
          <Txt style={{ color: theme.colors.textSupporting }}>
            The back arrow is added automatically because this screen uses
            isSubScreen. Search, plus, and more are custom icons.
          </Txt>
        </DemoCard>

        {Array.from({ length: 12 }).map((_, index) => (
          <DemoCard key={index} title={`Card ${index + 1}`}>
            <Txt style={{ color: theme.colors.textSupporting }}>
              Scroll to verify the header stays fixed and the content starts
              below it.
            </Txt>
          </DemoCard>
        ))}
      </View>
    </Frame>
  );
}
