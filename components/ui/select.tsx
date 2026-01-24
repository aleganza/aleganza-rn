import React, { useState, useMemo, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  Keyboard,
  Text,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from "react-native";
import { useTheme } from "@/lib/theme/useTheme";
import { Txt } from "@/components/ui/texts";
import { useScreenDimensions } from "@/lib/common/hooks/useScreenDimensions";
import { FRAME_MARGIN } from "@/lib/config";

interface SelectOption {
  label: string;
  value: string;
}

interface SelectFieldInputProps {
  value: string | null;
  onChange: (val: string) => void;
  options: SelectOption[];
  placeholder?: string;
  searchable?: boolean;
}

export const SelectFieldInput: React.FC<SelectFieldInputProps> = ({
  value,
  onChange,
  options,
  placeholder,
  searchable = true,
}) => {
  const { theme } = useTheme();
  const { width: screenWidth, height: screenHeight } = useScreenDimensions();
  const [isModalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState("");
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const filteredOptions = useMemo(
    () =>
      options.filter((o) =>
        o.label.toLowerCase().includes(search.toLowerCase())
      ),
    [search, options]
  );

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", (e) =>
      setKeyboardHeight(e.endCoordinates.height)
    );
    const hideSub = Keyboard.addListener("keyboardDidHide", () =>
      setKeyboardHeight(0)
    );

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const modalMaxHeight = Math.min(
    screenHeight * 0.5,
    screenHeight - keyboardHeight - 50
  );

  return (
    <View>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={{
          backgroundColor: theme.colors.mist,
          padding: 8,
          borderRadius: theme.borderRadius.md,
        }}
      >
        <Txt
          style={{ color: value ? theme.colors.text : theme.colors.textShy }}
        >
          {value
            ? options.find((o) => o.value === value)?.label
            : placeholder ?? "Seleziona..."}
        </Txt>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.3)",
            justifyContent: "center",
            alignItems: "center",
          }}
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            keyboardVerticalOffset={50}
          >
            <View
              style={{
                maxHeight: modalMaxHeight,
                width: screenWidth - FRAME_MARGIN,
                backgroundColor: theme.colors.foreground,
                borderRadius: 16,
                padding: 12,
              }}
            >
              {searchable && (
                <TextInput
                  placeholder="Cerca..."
                  value={search}
                  onChangeText={setSearch}
                  style={{
                    backgroundColor: theme.colors.mist,
                    borderRadius: theme.borderRadius.md,
                    padding: 8,
                    marginBottom: 8,
                    color: theme.colors.text,
                  }}
                />
              )}
              <FlatList
                keyboardShouldPersistTaps="handled"
                data={filteredOptions}
                keyExtractor={(item) => item.value}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      onChange(item.value);
                      setModalVisible(false);
                    }}
                    style={{ paddingVertical: 10 }}
                  >
                    <Txt style={{ color: theme.colors.text }}>{item.label}</Txt>
                  </TouchableOpacity>
                )}
              />
            </View>
          </KeyboardAvoidingView>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};
