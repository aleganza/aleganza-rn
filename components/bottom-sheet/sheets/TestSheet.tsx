import { H4 } from "@/components/ui/headings";
import { Txt } from "@/components/ui/texts";
import { useTheme } from "@/lib/theme/useTheme";
import React from "react";
import { TouchableOpacity, View } from "react-native";

import { BaseBottomSheet } from "../base-bottom-sheet";
import { SheetManager } from "../manager";

type Option = {
  label: string;
  value: string | number;
};

export type MyTestSheetProps = {
  title: string;
  options: Option[];
  onSelect?: (value: string | number) => void;
};

export const MyTestSheet = () => {
  const { theme } = useTheme();

  return (
    <BaseBottomSheet<MyTestSheetProps> name="simple-sheet">
      {(props) => {
        const handleSelect = (value: string | number) => {
          props?.onSelect?.(value);
          SheetManager.hide("simple-sheet");
        };

        return (
          <View style={{ gap: theme.spacing.sm }}>
            {props?.title ? <H4 text={props.title} /> : null}

            {props?.options?.map((item) => (
              <TouchableOpacity
                key={item.value}
                onPress={() => handleSelect(item.value)}
                style={{
                  paddingVertical: theme.spacing.sm,
                  paddingHorizontal: theme.spacing.base,
                  borderRadius: theme.borderRadius.sm,
                  backgroundColor: theme.colors.foreground,
                }}
              >
                <Txt>{item.label}</Txt>
              </TouchableOpacity>
            ))}
          </View>
        );
      }}
    </BaseBottomSheet>
  );
};
