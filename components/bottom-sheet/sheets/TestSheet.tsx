import { BaseBottomSheet } from "../base-bottom-sheet";
import { View, Text, TouchableOpacity } from "react-native";
import { SheetManager } from "../manager";
import { useSheetProps } from "../useSheetProps";

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
  const props = useSheetProps<MyTestSheetProps>("simple-sheet");

  const handleSelect = (value: string | number) => {
    props?.onSelect?.(value);
    SheetManager.hide("simple-sheet");
  };

  return (
    <BaseBottomSheet<MyTestSheetProps> name="simple-sheet">
      {(props) => (
        <View style={{ padding: 16 }}>
          {props?.title && <Text>{props.title}</Text>}

          {props?.options?.map((item) => (
            <TouchableOpacity
              key={item.value}
              onPress={() => handleSelect(item.value)}
            >
              <Text>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </BaseBottomSheet>
  );
};
