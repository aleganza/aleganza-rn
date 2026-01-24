import { ThemeColors } from "./types";

const COMMON_COLORS = {
  // primary: "#0c69e5",
} as const;

export const COLORS: Record<"light" | "dark", ThemeColors> = {
  light: {
    ...COMMON_COLORS,
    primary: "#0c69e5",
    secondary: "#8c13e0",
    text: "#0d0d0d",
    textSupporting: "#000000bf",
    textShy: "#0000008c",
    textMuted: "#00000059",
    support: "#d96b98",
    success: "#6ad478",
    alert: "#eb483d",
    idle: "#e5a04a",
    link: "#0c69e5",
    background: "#ffffff",
    foreground: "#f5f5f5",
    mist: "#e8e8e8",
  },
  dark: {
    ...COMMON_COLORS,
    primary: "#3380FF",
    secondary: "#B96CFF",
    text: "#f2f2f2",
    textSupporting: "#ffffffbf",
    textShy: "#ffffff8c",
    textMuted: "#ffffff59",
    support: "#d96b98",
    success: "#6ad478",
    alert: "#d13c3c",
    idle: "#e5a04a",
    link: "#3380FF",
    background: "#0e0e0f",
    foreground: "#1e1e20",
    mist: "#2e2e30",
  },
};
