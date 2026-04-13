import { BaseBottomSheet } from "@/components/bottom-sheet/base-bottom-sheet";
import { H5 } from "@/components/ui/headings";
import Spacer from "@/components/ui/spacer";
import { Txt } from "@/components/ui/texts";
import { useScreenDimensions } from "@/lib/common/hooks/useScreenDimensions";
import { useTheme } from "@/lib/theme/useTheme";
import { FlatList, TouchableOpacity, View } from "react-native";

import { SheetManager } from "../manager";
import { useSheetProps } from "../useSheetProps";

export type PlayerOptions = Array<{
  label: string;
  value: string | number;
}>;

export interface PlayerOptionsSheetProps {
  heading: string;
  options: PlayerOptions;
  selectedValue?: string | number;
  onSelect?: (value: string | number) => void;
}

export const PlayerOptionsSheet = () => {
  const { theme } = useTheme();
  const { max } = useScreenDimensions();

  const props = useSheetProps<PlayerOptionsSheetProps>("player-options");

  const handleSelect = (value: string | number) => {
    props?.onSelect?.(value);
    SheetManager.hide("player-options");
  };

  return (
    <BaseBottomSheet<PlayerOptionsSheetProps>
      name="player-options"
      scrollable
      snapPoints={["95%"]}
      style={{ marginHorizontal: max * 0.2 }}
    >
      {() => (
        <View style={{ flex: 1 }}>
          {props && <H5 text={props.heading} />}

          <Spacer size="lg" />

          <FlatList
            data={props?.options}
            keyExtractor={(_, index) => index.toString()}
            scrollEnabled={false}
            // ItemSeparatorComponent={() => <Spacer />}
            renderItem={({ item }) => {
              const isSelected = item.value === props?.selectedValue;
              return (
                <TouchableOpacity
                  style={{
                    paddingHorizontal: 12,
                    paddingVertical: 9,
                    borderRadius: theme.borderRadius.sm,
                    backgroundColor: isSelected
                      ? theme.colors.foreground
                      : "transparent",
                  }}
                  onPress={() => handleSelect(item.value)}
                >
                  <Txt
                    style={{
                      fontFamily: theme.family.accent.medium,
                      color: isSelected
                        ? theme.colors.text
                        : theme.colors.textShy,
                    }}
                  >
                    {item.label}
                  </Txt>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      )}
    </BaseBottomSheet>
  );
};
