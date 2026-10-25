import { DemoCard, ShowcaseFrame } from "@/components/showcase";
import { ICONS, Icon, IconName } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Txt } from "@/components/ui/texts";
import { useTheme } from "@/lib/theme/useTheme";
import React, { useMemo, useState } from "react";
import { View } from "react-native";

export default function IconsShowcase() {
  const { theme } = useTheme();
  const [filter, setFilter] = useState("");

  const entries = useMemo(() => {
    const query = filter.trim().toLowerCase();
    return Object.entries(ICONS).filter(([name]) =>
      query ? name.includes(query) : true,
    );
  }, [filter]);

  return (
    <ShowcaseFrame
      title="Icons"
      subtitle="Every glyph comes from components/ui/icons. Names are kebab-case and type-checked through IconName."
    >
      <DemoCard title={`Registry (${entries.length})`}>
        <Input
          value={filter}
          onChangeText={setFilter}
          clearable
          placeholder="Filter icons"
          isSearchBar
        />

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: theme.spacing.sm,
            justifyContent: "space-between",
          }}
        >
          {entries.map(([name]) => (
            <View
              key={name}
              style={{
                width: "31%",
                alignItems: "center",
                gap: theme.spacing.xs,
                paddingVertical: theme.spacing.sm,
                backgroundColor: theme.colors.background,
                borderRadius: theme.borderRadius.sm,
              }}
            >
              <Icon name={name as IconName} size="lg" />
              <Txt
                numberOfLines={1}
                style={{
                  fontSize: theme.fontSize.xs,
                  color: theme.colors.textSupporting,
                }}
              >
                {name}
              </Txt>
            </View>
          ))}
        </View>
      </DemoCard>
    </ShowcaseFrame>
  );
}
