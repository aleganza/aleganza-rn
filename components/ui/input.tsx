import { useTheme } from "@/lib/theme/useTheme";
import {
  ArrowUpFromLine,
  Filter,
  ListFilter,
  LucideIcon,
  Search,
  X,
} from "lucide-react-native";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Txt } from "./texts";

interface InputProps extends TextInputProps {
  wrapperStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  clearable?: boolean;
  isSearchBar?: boolean;
  searchBarLoading?: boolean;
}

// ZOD INTEGRATION NEEDED

export const Input: React.FC<InputProps> = ({
  wrapperStyle,
  inputStyle,
  clearable = false,
  isSearchBar = false,
  searchBarLoading,
  value: valueProp,
  onChangeText,
  ...props
}) => {
  const inputRef = useRef<TextInput>(null);

  const { theme } = useTheme();
  const [text, setText] = useState(valueProp || "");
  const [wrapperHeight, setWrapperHeight] = useState(0);

  const handleChangeText = (t: string) => {
    setText(t);
    onChangeText?.(t);
  };

  const handleClear = () => {
    setText("");
    onChangeText?.("");
    inputRef.current?.focus();
  };

  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: theme.colors.foreground,
          borderRadius: theme.borderRadius.base,
        },
        wrapperStyle,
      ]}
      onLayout={(event) => {
        const { height } = event.nativeEvent.layout;
        setWrapperHeight(height);
      }}
    >
      {isSearchBar && (
        <View
          style={{
            height: wrapperHeight,
            justifyContent: "center",
            paddingLeft: theme.spacing.sm,
          }}
        >
          {searchBarLoading ? (
            <ActivityIndicator size="small" color={theme.colors.textMuted} />
          ) : (
            <Search size={theme.iconSize.base} color={theme.colors.textMuted} />
          )}
        </View>
      )}
      <TextInput
        ref={inputRef}
        style={[
          {
            flex: 1,
            fontSize: theme.fontSize.md,
            color: theme.colors.text,
            padding: theme.spacing.sm,
          },
          inputStyle,
        ]}
        returnKeyType={isSearchBar ? "done" : "default"}
        cursorColor={theme.colors.primary}
        selectionColor={theme.colors.primary}
        placeholderTextColor={theme.colors.textMuted}
        value={text}
        onChangeText={handleChangeText}
        {...props}
      />
      {clearable && text.length > 0 && (
        <TouchableOpacity
          onPress={handleClear}
          style={{
            height: wrapperHeight,
            justifyContent: "center",
            paddingHorizontal: theme.spacing.sm,
          }}
        >
          <X size={theme.iconSize.base} color={theme.colors.textMuted} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export interface SearchBarProps {
  loading?: boolean;
  inputProps?: Omit<InputProps, "isSearchBar" | "returnKeyType">;
  actions?: Array<{
    Icon: LucideIcon;
    onPress: () => void;
  }>;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  loading,
  inputProps,
  actions,
}) => {
  const { theme } = useTheme();
  const [wrapperHeight, setWrapperHeight] = useState(0);

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: theme.spacing.sm,
      }}
    >
      <Input
        {...inputProps}
        isSearchBar
        returnKeyType="search"
        clearable
        searchBarLoading={loading}
        wrapperStyle={{ flex: 1 }}
        onLayout={(event) => {
          const { height } = event.nativeEvent.layout;
          setWrapperHeight(height);
        }}
      />

      {actions &&
        actions.map((a, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.5}
            onPress={a.onPress}
            style={{
              width: wrapperHeight,
              height: wrapperHeight,
              backgroundColor: theme.colors.foreground,
              borderRadius: theme.borderRadius.base,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <a.Icon
              size={theme.iconSize.sm}
              color={theme.colors.textSupporting}
            />
          </TouchableOpacity>
        ))}
    </View>
  );
};
