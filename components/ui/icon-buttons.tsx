import { useTheme } from "@/lib/theme/useTheme";
import { LucideIcon } from "lucide-react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

interface CircleIconProps {
  Icon: LucideIcon;
  onPress: () => void;
  showBg?: boolean;
}

export const CircleIcon: React.FC<CircleIconProps> = ({
  Icon,
  onPress,
  showBg = true,
}) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onPress}
      style={{
        justifyContent: "center",
        alignItems: "center",
        borderRadius: theme.borderRadius.full,
        height: 26,
        width: 26,
        backgroundColor: showBg ? "#FFFFFF20" : "transparent",
      }}
    >
      <Icon
        size={theme.iconSize.sm}
        color={theme.colors.textShy}
        strokeWidth={2.5}
      />
    </TouchableOpacity>
  );
};
