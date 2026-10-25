import { H4 } from "@/components/ui/headings";
import { Input } from "@/components/ui/input";
import { PrimaryButton, SecondaryButton } from "@/components/ui/buttons";
import { Txt } from "@/components/ui/texts";
import { useTheme } from "@/lib/theme/useTheme";
import React, { useState } from "react";
import { View } from "react-native";

import { BaseBottomSheet } from "../base-bottom-sheet";
import { SheetManager } from "../manager";

export type ShowcaseSheetProps = {
  title?: string;
  description?: string;
};

export const ShowcaseSheet = () => {
  const { theme } = useTheme();
  const [text, setText] = useState("");

  return (
    <BaseBottomSheet<ShowcaseSheetProps>
      name="showcase-sheet"
      scrollable
      snapPoints={["30%", "65%", "95%"]}
    >
      {(props) => (
        <View style={{ gap: theme.spacing.md }}>
          <H4 text={props?.title ?? "Gorhom bottom sheet"} />

          <Txt style={{ color: theme.colors.textSupporting }}>
            {props?.description ??
              "Drag the handle, tap the backdrop, snap between heights, scroll the content, and focus the input."}
          </Txt>

          <View style={{ flexDirection: "row", gap: theme.spacing.sm }}>
            {[0, 1, 2].map((index) => (
              <View key={index} style={{ flex: 1 }}>
                <PrimaryButton
                  size="sm"
                  onPress={() =>
                    SheetManager.snapToIndex("showcase-sheet", index)
                  }
                >
                  {index === 0 ? "30%" : index === 1 ? "65%" : "95%"}
                </PrimaryButton>
              </View>
            ))}
          </View>

          <Input
            value={text}
            onChangeText={setText}
            clearable
            placeholder="Type here to test the keyboard"
          />

          {Array.from({ length: 20 }).map((_, index) => (
            <View
              key={index}
              style={{
                backgroundColor: theme.colors.foreground,
                borderRadius: theme.borderRadius.sm,
                padding: theme.spacing.md,
              }}
            >
              <Txt>Scrollable row {index + 1}</Txt>
            </View>
          ))}

          <SecondaryButton
            onPress={() => SheetManager.hide("showcase-sheet")}
          >
            Close
          </SecondaryButton>
        </View>
      )}
    </BaseBottomSheet>
  );
};
