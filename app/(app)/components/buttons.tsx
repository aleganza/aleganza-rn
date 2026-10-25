import { DemoCard, ShowcaseFrame } from "@/components/showcase";
import {
  DangerButton,
  GhostButton,
  PrimaryButton,
  SecondaryButton,
} from "@/components/ui/buttons";
import { Icon } from "@/components/ui/icons";
import { useTheme } from "@/lib/theme/useTheme";
import React, { useState } from "react";
import { View } from "react-native";

export default function ButtonsShowcase() {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);

  const runLoading = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <ShowcaseFrame
      title="Buttons"
      subtitle="Variants, sizes, icons, and the loading state. The label stays mounted while the spinner overlays it."
    >
      <DemoCard title="Variants">
        <PrimaryButton onPress={() => {}}>Primary</PrimaryButton>
        <SecondaryButton onPress={() => {}}>Secondary</SecondaryButton>
        <GhostButton onPress={() => {}}>Ghost</GhostButton>
        <DangerButton onPress={() => {}}>Danger</DangerButton>
      </DemoCard>

      <DemoCard title="Sizes">
        <PrimaryButton size="sm" onPress={() => {}}>
          Small
        </PrimaryButton>
        <PrimaryButton size="md" onPress={() => {}}>
          Medium
        </PrimaryButton>
        <PrimaryButton size="lg" onPress={() => {}}>
          Large
        </PrimaryButton>
      </DemoCard>

      <DemoCard title="Icons and full width">
        <PrimaryButton
          fullWidth
          onPress={() => {}}
          leftIcon={<Icon name="plus" size="sm" color="#0d0d0d" />}
        >
          Create
        </PrimaryButton>

        <SecondaryButton
          fullWidth
          onPress={() => {}}
          rightIcon={<Icon name="right" size="sm" color={theme.colors.text} />}
        >
          Continue
        </SecondaryButton>
      </DemoCard>

      <DemoCard title="Loading and disabled">
        <PrimaryButton fullWidth loading={loading} onPress={runLoading}>
          {loading ? "Saving" : "Save for 1.5s"}
        </PrimaryButton>

        <SecondaryButton fullWidth disabled onPress={() => {}}>
          Disabled
        </SecondaryButton>

        <View style={{ flexDirection: "row", gap: theme.spacing.sm }}>
          <PrimaryButton loading onPress={() => {}}>
            Busy
          </PrimaryButton>
          <SecondaryButton disabled onPress={() => {}}>
            Idle
          </SecondaryButton>
        </View>
      </DemoCard>
    </ShowcaseFrame>
  );
}
