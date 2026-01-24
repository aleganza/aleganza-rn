import { useTheme } from "@/lib/theme/useTheme";
import React, { ReactNode } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

type CommonProps = {
  marginTop?: number;
};

export const PageLoader: React.FC<CommonProps> = ({ marginTop = 0 }) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { marginTop }]}>
      <ActivityIndicator size="small" color={theme.colors.textMuted} />
    </View>
  );
};

export const PageMessage: React.FC<{ children: ReactNode } & CommonProps> = ({
  children,
  marginTop = 0,
}) => {
  return <View style={[styles.container, { marginTop }]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: "-50%" }, { translateY: "-50%" }],
    alignItems: "center",
    justifyContent: "center",
  },
});
