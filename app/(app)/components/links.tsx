import {
  CardProperty,
  Property,
  TinyLabel,
} from "@/components/common/common";
import Links from "@/components/common/links";
import { StarRatings } from "@/components/common/StarRatings";
import { DemoCard, ShowcaseFrame } from "@/components/showcase";
import { ExternalLink } from "@/components/ui/external-link";
import { Txt } from "@/components/ui/texts";
import { useTheme } from "@/lib/theme/useTheme";
import React from "react";
import { View } from "react-native";

export default function LinksShowcase() {
  const { theme } = useTheme();

  return (
    <ShowcaseFrame
      title="Links and ratings"
      subtitle="ExternalLink is typed with Href, so it works with expo-router typed routes and still opens the in-app browser on native."
    >
      <DemoCard title="External link">
        <ExternalLink
          href="https://expo.dev"
          style={{
            backgroundColor: theme.colors.foreground,
            borderRadius: theme.borderRadius.md,
            padding: theme.spacing.md,
          }}
        >
          <Txt style={{ color: theme.colors.link }}>Open expo.dev</Txt>
        </ExternalLink>
      </DemoCard>

      <DemoCard title="Link list">
        <Links
          data={[
            {
              href: "https://expo.dev/docs",
              color: theme.colors.text,
              bgColor: theme.colors.mist,
            },
            {
              href: "https://github.com/aleganza/aleganza-rn",
              color: theme.colors.text,
              bgColor: theme.colors.mist,
            },
          ]}
        />
      </DemoCard>

      <DemoCard title="Ratings">
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <StarRatings rating={9} reviewCount={128} />
          <StarRatings rating={7.5} reviewCount={64} />
          <StarRatings rating={4} />
        </View>
      </DemoCard>

      <DemoCard title="Label helpers">
        <Property text="4.8 rating" icon="star-filled" />
        <TinyLabel text="Featured" icon="star" />
        <CardProperty text="12 km away" icon="map-pin" />
      </DemoCard>
    </ShowcaseFrame>
  );
}
