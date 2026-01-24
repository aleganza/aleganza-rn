import { Theme as ReactNavigationTheme } from '@react-navigation/native';
import { create } from 'zustand';

import { COLORS } from './colors';
import { FONT_FAMILIES } from './families';
import { BORDER_RADIUS, FONT_SIZES, ICON_SIZES, LINE_HEIGHTS, SPACING } from './sizes';
import { ThemeColors, ThemeState } from './types';
import { useColorScheme } from 'react-native';

const useThemeStore = create<ThemeState>((set) => ({
  theme: "system",
  setTheme: (theme) => set({ theme }),
}));

const getReactNavigationTheme = (
  themeColors: ThemeColors,
  isDark: boolean
): ReactNavigationTheme => {
  return {
    dark: isDark,
    colors: {
      primary: themeColors.primary as string,
      background: themeColors.background as string,
      card: themeColors.foreground as string,
      text: themeColors.text as string,
      border: themeColors.mist as string,
      notification: themeColors.primary as string,
    },
    fonts: {
      regular: {
        fontWeight: "500",
        fontFamily: FONT_FAMILIES.default.regular ?? "",
      },
      medium: {
        fontWeight: "500",
        fontFamily: FONT_FAMILIES.default.medium ?? "",
      },
      bold: {
        fontWeight: "500",
        fontFamily: FONT_FAMILIES.default.bold ?? "",
      },
      heavy: {
        fontWeight: "500",
        fontFamily: FONT_FAMILIES.default.extra_bold ?? "",
      },
    },
  };
};

export const useTheme = () => {
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);
  const systemTheme = useColorScheme() ?? "light";

  const activeTheme = theme === "system" ? systemTheme : theme;
  const themeColors = COLORS[activeTheme];
  const reactNavigationTheme = getReactNavigationTheme(
    themeColors,
    activeTheme === "dark"
  );

  return {
    theme: {
      colors: themeColors,
      family: FONT_FAMILIES,
      fontSize: FONT_SIZES,
      lineHeight: LINE_HEIGHTS,
      spacing: SPACING,
      borderRadius: BORDER_RADIUS,
      iconSize: ICON_SIZES,
    },
    setTheme,
    activeThemeName: activeTheme,
    inverseActiveThemeName: activeTheme === "light" ? "dark" : "light",
    reactNavigationTheme,
  };
};
