import { useTheme } from "@/lib/theme/useTheme";
import { getContrastYIQ } from "@/lib/utils/color";
import React from "react";
import { TouchableOpacity, View } from "react-native";

import { Txt } from "../ui/texts";

export interface ChoiceGridItem {
  key: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface ChoiceGridProps {
  items: ChoiceGridItem[];
  selectedKey?: string | null;
  onSelect: (key: string | null) => void;
}

export const ChoiceGrid: React.FC<ChoiceGridProps> = ({
  items,
  selectedKey,
  onSelect,
}) => {
  const { theme } = useTheme();
  const selectedTextColor =
    getContrastYIQ(theme.colors.primary.toString()) ?? theme.colors.text;

  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        rowGap: theme.spacing.unit * 10,
      }}
    >
      {items.map((item) => {
        const selected = item.key === selectedKey;

        return (
          <TouchableOpacity
            key={item.key}
            activeOpacity={0.4}
            disabled={item.disabled}
            onPress={() => onSelect(selected ? null : item.key)}
            style={{
              width: "48.5%",
              height: 50,
              borderRadius: theme.borderRadius.md,
              borderWidth: item.disabled ? 0 : 1,
              borderColor: selected
                ? theme.colors.primary
                : theme.colors.textMuted,
              backgroundColor: selected
                ? theme.colors.primary
                : "transparent",
              alignItems: "center",
              justifyContent: "center",
              opacity: item.disabled ? 0.5 : 1,
              paddingHorizontal: theme.spacing.sm,
            }}
          >
            <Txt
              numberOfLines={1}
              style={{
                fontFamily: theme.family.base.bold,
                fontSize: theme.fontSize.base,
                color: selected ? selectedTextColor : theme.colors.text,
              }}
            >
              {item.label}
            </Txt>

            {item.description ? (
              <Txt
                style={{
                  fontSize: theme.fontSize.sm,
                  color: selected
                    ? selectedTextColor
                    : theme.colors.textSupporting,
                  opacity: selected ? 0.75 : 1,
                }}
              >
                {item.description}
              </Txt>
            ) : null}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
