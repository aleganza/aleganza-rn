import { DemoCard } from "@/components/showcase";
import { PrimaryButton } from "@/components/ui/buttons";
import { Frame } from "@/components/ui/frame/frame";
import { Input } from "@/components/ui/input";
import { Txt } from "@/components/ui/texts";
import { FRAME_MARGIN } from "@/lib/config";
import { useTheme } from "@/lib/theme/useTheme";
import React, { useState } from "react";
import { View } from "react-native";

export default function FrameBottomActionShowcase() {
  const { theme } = useTheme();
  const [savedAt, setSavedAt] = useState<string | null>(null);

  return (
    <Frame
      scrollable
      useSafeArea
      isSubScreen
      keyboardAvoiding
      headerText="Bottom action"
      bottomAction={
        <PrimaryButton
          fullWidth
          onPress={() => setSavedAt(new Date().toLocaleTimeString())}
        >
          Save
        </PrimaryButton>
      }
    >
      <View
        style={{
          paddingHorizontal: FRAME_MARGIN,
          gap: theme.spacing.md,
        }}
      >
        <DemoCard title="Status">
          <Txt style={{ color: theme.colors.textSupporting }}>
            Last save: {savedAt ?? "never"}
          </Txt>
        </DemoCard>

        <DemoCard title="Keyboard">
          <Txt style={{ color: theme.colors.textSupporting }}>
            Focus the input. The bottom action rises with the keyboard and the
            scroll content keeps its padding.
          </Txt>
          <Input placeholder="Focus me" />
        </DemoCard>

        {Array.from({ length: 15 }).map((_, index) => (
          <DemoCard key={index} title={`Content ${index + 1}`}>
            <Txt style={{ color: theme.colors.textSupporting }}>
              The last card should not sit flush against the bottom bar.
            </Txt>
          </DemoCard>
        ))}
      </View>
    </Frame>
  );
}
