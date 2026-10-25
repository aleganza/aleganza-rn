import { DemoCard, ShowcaseFrame } from "@/components/showcase";
import { PrimaryButton, SecondaryButton } from "@/components/ui/buttons";
import { Input, SearchBar } from "@/components/ui/input";
import { Txt } from "@/components/ui/texts";
import { useTheme } from "@/lib/theme/useTheme";
import { toaster } from "@/lib/toaster/toaster";
import React, { useState } from "react";
import { View } from "react-native";

export default function InputsShowcase() {
  const { theme } = useTheme();
  const [controlled, setControlled] = useState("Controlled from parent");
  const [searchLoading, setSearchLoading] = useState(false);

  const runSearchLoading = () => {
    setSearchLoading(true);
    setTimeout(() => setSearchLoading(false), 1500);
  };

  return (
    <ShowcaseFrame
      title="Inputs"
      subtitle="A controlled value always wins after mount. The programmatic buttons below reset or replace the text while the field is focused."
    >
      <DemoCard title="Controlled input">
        <Input
          value={controlled}
          onChangeText={setControlled}
          clearable
          placeholder="Type something"
        />

        <Txt style={{ color: theme.colors.textSupporting }}>
          Current value: {controlled || "(empty)"}
        </Txt>

        <View style={{ gap: theme.spacing.sm }}>
          <SecondaryButton onPress={() => setControlled("")}>
            Reset from parent
          </SecondaryButton>

          <SecondaryButton
            onPress={() => setControlled(`Programmatic ${Date.now()}`)}
          >
            Set programmatic value
          </SecondaryButton>
        </View>
      </DemoCard>

      <DemoCard title="Uncontrolled input">
        <Input clearable placeholder="Internal state only" />
      </DemoCard>

      <DemoCard title="Search bar">
        <SearchBar
          loading={searchLoading}
          inputProps={{ placeholder: "Search" }}
          actions={[
            {
              icon: "filter",
              onPress: () => toaster.info("Filter pressed"),
            },
            {
              icon: "more-1",
              onPress: () => toaster.info("More pressed"),
            },
          ]}
        />

        <PrimaryButton onPress={runSearchLoading}>
          Show loading for 1.5s
        </PrimaryButton>
      </DemoCard>

      <DemoCard title="Disabled">
        <Input editable={false} value="Read only" />
      </DemoCard>
    </ShowcaseFrame>
  );
}
