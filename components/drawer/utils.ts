import { DRAWER_MARGIN } from "@/lib/config";
import { useTheme } from "@/lib/theme/useTheme";
import { StyleSheet } from "react-native";

export const useBaseDrawerDefaultPropsValues = (
  containerStyle?: any,
  indicatorStyle?: any
) => {
  const { theme } = useTheme();

  const ani = {
    stiffness: 1000,
    damping: 500,
    mass: 3,
  };

  return {
    gestureEnabled: true,
    defaultOverlayOpacity: 0.5,
    containerStyle: StyleSheet.flatten([
      {
        paddingHorizontal: DRAWER_MARGIN,
        backgroundColor: theme.colors.foreground,
        paddingTop: 10,
        borderTopLeftRadius: theme.borderRadius.xl,
        borderTopRightRadius: theme.borderRadius.xl,
      },
      containerStyle,
    ]),
    openAnimationConfig: ani,
    closeAnimationConfig: ani,
    indicatorStyle: StyleSheet.flatten([
      {
        backgroundColor: theme.colors.textMuted,
        height: 3,
        width: 36,
        marginBottom: 16,
      },
      indicatorStyle,
    ]),
  };
};
