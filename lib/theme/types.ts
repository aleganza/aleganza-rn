import { ColorValue } from "react-native";

export type Theme = "light" | "dark" | "system";

// colors

export interface ThemeColors {
  primary: ColorValue;
  secondary: ColorValue;
  text: ColorValue;
  textSupporting: ColorValue;
  textShy: ColorValue;
  textMuted: ColorValue;
  icon: ColorValue;
  iconSupporting: ColorValue;
  iconShy: ColorValue;
  iconMuted: ColorValue;
  support: ColorValue;
  success: ColorValue;
  alert: ColorValue;
  idle: ColorValue;
  link: ColorValue;
  background: ColorValue;
  foreground: ColorValue;
  mist: ColorValue;
}

// fonts

type FontWeight =
  | "thin"
  | "extra_light"
  | "light"
  | "regular"
  | "medium"
  | "semi_bold"
  | "bold"
  | "extra_bold";

type FontFamily = Partial<Record<FontWeight, string>>;

export interface FontFamilies {
  accent: FontFamily;
  base: FontFamily;
  mono: FontFamily;
  [key: string]: FontFamily;
}

export interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}
