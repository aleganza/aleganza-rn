import { useTheme } from "@/lib/theme/useTheme";
import React, { useEffect, useRef } from "react";
import { Animated, View, ViewStyle } from "react-native";

interface ProgressBarProps {
  progress: number; // 0–100
  height?: number;
  backgroundColor?: string;
  fillColor?: string;
  borderRadius?: number;
  animated?: boolean;
  style?: ViewStyle;
}

export function ProgressBar({
  progress,
  height = 6,
  backgroundColor,
  fillColor,
  borderRadius = 999,
  animated = true,
  style,
}: ProgressBarProps) {
  const { theme } = useTheme();

  const clampedProgress = Math.min(100, Math.max(0, progress));
  const animatedWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (animated) {
      Animated.timing(animatedWidth, {
        toValue: clampedProgress,
        duration: 400,
        useNativeDriver: false,
      }).start();
    } else {
      animatedWidth.setValue(clampedProgress);
    }
  }, [clampedProgress]);

  const widthInterpolated = animatedWidth.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });

  return (
    <View
      style={[
        {
          width: "100%",
          overflow: "hidden",
        },
        {
          height,
          backgroundColor: backgroundColor ?? theme.colors.foreground,
          borderRadius,
        },
        style,
      ]}
    >
      <Animated.View
        style={[
          {
            height: "100%",
          },
          {
            width: widthInterpolated,
            backgroundColor: fillColor ?? theme.colors.mist,
            borderRadius,
          },
        ]}
      />
    </View>
  );
}
