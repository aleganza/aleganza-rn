import HubItem from "@/components/hub/HubItem";
import HubItemsGroup from "@/components/hub/HubItemsGroup";
import HubWrapper from "@/components/hub/HubWrapper";
import { DemoCard, ShowcaseFrame } from "@/components/showcase";
import { Txt } from "@/components/ui/texts";
import { useTheme } from "@/lib/theme/useTheme";
import { toaster } from "@/lib/toaster/toaster";
import React, { useState } from "react";
import { View } from "react-native";

export default function HubShowcase() {
  const { theme } = useTheme();
  const [toggle, setToggle] = useState(true);
  const [taps, setTaps] = useState(0);

  return (
    <ShowcaseFrame
      title="Hub rows"
      subtitle="Rows support routes, actions, text values, toggles, custom right content, icons, and a loading state."
    >
      <HubWrapper>
        <HubItemsGroup label="Rows">
          <HubItem
            label="Route row"
            icon="right"
            route="/components/buttons"
          />
          <HubItem
            label="Action row"
            icon="check"
            action={() => {
              setTaps((value) => value + 1);
              toaster.info("Action row pressed");
            }}
          />
          <HubItem
            label="Text value"
            icon="information"
            text={`Taps: ${taps}`}
          />
          <HubItem
            label="Toggle row"
            icon="notification"
            toggle={{ value: toggle, onChange: setToggle }}
          />
          <HubItem
            label="Custom right wins"
            icon="edit-2"
            text="this text is hidden"
            customRight={
              <View
                style={{
                  backgroundColor: theme.colors.primary,
                  paddingHorizontal: theme.spacing.sm,
                  paddingVertical: theme.spacing.xs,
                  borderRadius: theme.borderRadius.full,
                }}
              >
                <Txt
                  style={{
                    fontSize: theme.fontSize.sm,
                    fontFamily: theme.family.base.semi_bold,
                    color: "#0d0d0d",
                  }}
                >
                  Custom
                </Txt>
              </View>
            }
          />
          <HubItem label="Loading row" icon="download" isLoading />
        </HubItemsGroup>
      </HubWrapper>

      <DemoCard title="State">
        <Txt style={{ color: theme.colors.textSupporting }}>
          Toggle: {toggle ? "on" : "off"} · Actions: {taps}
        </Txt>
      </DemoCard>
    </ShowcaseFrame>
  );
}
