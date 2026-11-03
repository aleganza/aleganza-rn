import { DemoCard } from "@/components/showcase";
import { Frame } from "@/components/ui/frame/frame";
import { Txt } from "@/components/ui/texts";
import { FRAME_MARGIN } from "@/lib/config";
import { useTheme } from "@/lib/theme/useTheme";
import React from "react";
import { View } from "react-native";

export default function FrameCustomHeaderFlowShowcase() {
  const { theme } = useTheme();

  const segmentStyle = {
    flex: 1,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    paddingVertical: theme.spacing.sm,
    backgroundColor: theme.colors.mist,
    borderRadius: theme.borderRadius.full,
  };

  return (
    <Frame
      scrollable
      useSafeArea
      isSubScreen
      headerInFlow
      headerText="In-flow header"
      headerCustomContent={
        <View
          style={{
            flexDirection: "row",
            gap: theme.spacing.sm,
            paddingTop: theme.spacing.sm,
          }}
        >
          <View style={segmentStyle}>
            <Txt style={{ fontFamily: theme.family.base.semi_bold }}>Tab A</Txt>
          </View>
          <View style={segmentStyle}>
            <Txt style={{ fontFamily: theme.family.base.semi_bold }}>Tab B</Txt>
          </View>
          <View style={segmentStyle}>
            <Txt style={{ fontFamily: theme.family.base.semi_bold }}>Tab C</Txt>
          </View>
        </View>
      }
    >
      <View
        style={{
          paddingHorizontal: FRAME_MARGIN,
          gap: theme.spacing.md,
        }}
      >
        <DemoCard title="No first-render jump">
          <Txt style={{ color: theme.colors.textSupporting }}>
            The header participates in the normal layout flow, so the content
            starts below it on the very first frame. There is no post-layout
            measurement pass.
          </Txt>
        </DemoCard>

        {Array.from({ length: 20 }).map((_, index) => (
          <DemoCard key={index} title={`Row ${index + 1}`}>
            <Txt style={{ color: theme.colors.textSupporting }}>
              The header takes its space before the scroll area. Use the
              default overlay mode when you need the existing absolute
              positioning.
            </Txt>
          </DemoCard>
        ))}
      </View>
    </Frame>
  );
}
