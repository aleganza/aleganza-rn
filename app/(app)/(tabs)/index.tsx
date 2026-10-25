import { DemoCard } from "@/components/showcase";
import { useRegisterTabBarHeight } from "@/components/tabs/useTabBarHeight";
import { PrimaryButton, SecondaryButton } from "@/components/ui/buttons";
import { ExternalLink } from "@/components/ui/external-link";
import { Frame } from "@/components/ui/frame/frame";
import { H1, H3 } from "@/components/ui/headings";
import { Icon } from "@/components/ui/icons";
import { Txt } from "@/components/ui/texts";
import { FRAME_MARGIN } from "@/lib/config";
import { Theme } from "@/lib/theme/types";
import { useTheme } from "@/lib/theme/useTheme";
import { TOAST_POSITION, TOAST_UI } from "@/lib/toaster/toaster";
import Constants from "expo-constants";
import { router } from "expo-router";
import React from "react";
import { View } from "react-native";

const themes: Theme[] = ["system", "light", "dark"];

const features = [
  "Frame and Header with bottom actions",
  "MingCute icon system",
  "Popup queue with promise API",
  "Toast v1/v2 with a global switch",
  "Gorhom bottom sheets",
  "ChoiceGrid",
  "TanStack Query wrappers",
  "Persisted Zustand store",
];

export default function InfoTabScreen() {
  const { theme, setTheme, activeThemeName } = useTheme();
  const tabBarHeight = useRegisterTabBarHeight();
  const version = Constants.expoConfig?.version ?? "1.0.0";

  return (
    <Frame
      scrollable
      useSafeArea
      headerText="Info"
      contentContainerStyle={{ paddingBottom: tabBarHeight }}
    >
      <View
        style={{
          paddingHorizontal: FRAME_MARGIN,
          gap: theme.spacing.md,
        }}
      >
        <DemoCard>
          <H1 text="aleganza-rn" />
          <Txt style={{ color: theme.colors.textSupporting }}>
            Expo SDK 57 preset with UI primitives, theme tokens, overlays,
            icons, and a component gallery.
          </Txt>
          <Txt style={{ color: theme.colors.textMuted }}>Version {version}</Txt>
        </DemoCard>

        <DemoCard title="Theme">
          <Txt style={{ color: theme.colors.textSupporting }}>
            Active: {activeThemeName}
          </Txt>

          <View style={{ gap: theme.spacing.sm }}>
            {themes.map((name) =>
              name === "system" ? (
                <SecondaryButton key={name} onPress={() => setTheme(name)}>
                  Follow system
                </SecondaryButton>
              ) : (
                <PrimaryButton key={name} onPress={() => setTheme(name)}>
                  Use {name}
                </PrimaryButton>
              ),
            )}
          </View>
        </DemoCard>

        <DemoCard title="Runtime">
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Txt>Expo SDK</Txt>
            <Txt style={{ color: theme.colors.textSupporting }}>57</Txt>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Txt>React Native</Txt>
            <Txt style={{ color: theme.colors.textSupporting }}>0.86</Txt>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Txt>Architecture</Txt>
            <Txt style={{ color: theme.colors.textSupporting }}>New</Txt>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Txt>Toast UI</Txt>
            <Txt style={{ color: theme.colors.textSupporting }}>{TOAST_UI}</Txt>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Txt>Toast position</Txt>
            <Txt style={{ color: theme.colors.textSupporting }}>
              {TOAST_POSITION}
            </Txt>
          </View>
        </DemoCard>

        <DemoCard title="What's inside">
          {features.map((feature) => (
            <View
              key={feature}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: theme.spacing.sm,
              }}
            >
              <Icon name="check-circle" size="sm" color={theme.colors.success} />
              <Txt style={{ color: theme.colors.textSupporting }}>{feature}</Txt>
            </View>
          ))}
        </DemoCard>

        <DemoCard title="Gallery">
          <H3 text="Components" />
          <Txt style={{ color: theme.colors.textSupporting }}>
            Every primitive and overlay has a live sample in the second tab.
          </Txt>
          <PrimaryButton onPress={() => router.navigate("/components")}>
            Open Components
          </PrimaryButton>
        </DemoCard>

        <DemoCard title="Docs and source">
          <Txt style={{ color: theme.colors.textSupporting }}>
            Architecture, patterns, and build notes live in the docs/ folder of
            the repository.
          </Txt>
          <ExternalLink href="https://github.com/aleganza/aleganza-rn">
            <Txt style={{ color: theme.colors.link }}>
              github.com/aleganza/aleganza-rn
            </Txt>
          </ExternalLink>
        </DemoCard>
      </View>
    </Frame>
  );
}
