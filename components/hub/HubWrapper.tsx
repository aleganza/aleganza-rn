import { useTheme } from "@/lib/theme/useTheme";
import { ReactNode } from "react";
import { View } from "react-native";

const HubWrapper = ({ children }: { children: ReactNode }) => {
  const { theme } = useTheme();

  return <View style={{ gap: theme.spacing.lg }}>{children}</View>;
};

export default HubWrapper;
