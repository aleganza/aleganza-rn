import { DemoCard } from "@/components/showcase";
import { Frame } from "@/components/ui/frame/frame";
import { Txt } from "@/components/ui/texts";
import { FRAME_MARGIN } from "@/lib/config";
import { useTheme } from "@/lib/theme/useTheme";
import React from "react";
import { View } from "react-native";

export default function FrameIconsOnlyShowcase() {
  const { theme } = useTheme();

  return (
    <Frame
      scrollable
      useSafeArea
      isSubScreen
      leftIcons={[{ icon: "search", onPress: () => {} }]}
      rightIcons={[
        { icon: "plus", onPress: () => {} },
        { icon: "more-1", onPress: () => {} },
      ]}
    >
      <View
        style={{
          paddingHorizontal: FRAME_MARGIN,
          gap: theme.spacing.md,
        }}
      >
        <DemoCard title="No title, icons only">
          <Txt style={{ color: theme.colors.textSupporting }}>
            This header has no headerText. The centered row keeps a minimum
            height so the header does not collapse around the icons.
          </Txt>
        </DemoCard>

        <DemoCard title="Check">
          <Txt style={{ color: theme.colors.textSupporting }}>
            Icon positions should match the titled header screens.
          </Txt>
        </DemoCard>
      </View>
    </Frame>
  );
}
