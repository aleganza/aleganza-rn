import React from "react";
import { Modal, TouchableOpacity, View, Platform } from "react-native";
import { useTheme } from "@/lib/theme/useTheme";
import { Txt } from "@/components/ui/texts";
import { BlurView } from "expo-blur";
import platform from "@/lib/env/platform";

export type ActionSheetItem = {
  label: string;
  onPress: () => void;
  destructive?: boolean;
};

type Props = {
  visible: boolean;
  onClose: () => void;
  items: ActionSheetItem[];
};

export const ActionSheet = ({ visible, onClose, items }: Props) => {
  const { theme } = useTheme();
  const isIos = platform.is.ios

  const Backdrop = isIos ? BlurView : View;
  const backdropProps = isIos
    ? { intensity: 30, tint: "dark" as const }
    : {};

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={onClose}
        style={{ flex: 1 }}
      >
        <Backdrop
          {...backdropProps}
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: isIos ? "transparent" : "rgba(0,0,0,0.6)",
          }}
        >
          <TouchableOpacity activeOpacity={1}>
            <View
              style={{
                backgroundColor: theme.colors.foreground,
                borderRadius: theme.borderRadius.lg,
                overflow: "hidden",
                minWidth: 260,
              }}
            >
              {items.map((item, index) => (
                <React.Fragment key={index}>
                  {index > 0 && (
                    <View style={{ height: 1, backgroundColor: theme.colors.mist }} />
                  )}
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => {
                      item.onPress();
                      onClose();
                    }}
                    style={{
                      paddingVertical: theme.spacing.base,
                      paddingHorizontal: theme.spacing.xl,
                      alignItems: "center",
                    }}
                  >
                    <Txt
                      style={{
                        color: item.destructive ? theme.colors.alert : theme.colors.text,
                        fontFamily: theme.family.accent.semi_bold,
                      }}
                    >
                      {item.label}
                    </Txt>
                  </TouchableOpacity>
                </React.Fragment>
              ))}
            </View>
          </TouchableOpacity>
        </Backdrop>
      </TouchableOpacity>
    </Modal>
  );
};