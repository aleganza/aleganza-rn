import React, { useCallback } from "react";
import {
  type ColorValue,
  type GestureResponderEvent,
  Pressable,
  type PressableProps,
  type PressableStateCallbackType,
  type StyleProp,
  StyleSheet,
  View,
  type ViewStyle,
} from "react-native";
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { useTheme } from "@/lib/theme/useTheme";

export type PressEffect = "none" | "opacity" | "highlight";

export interface PressProps extends Omit<PressableProps, "children" | "style"> {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  effect?: PressEffect;
  /**
   * opacity reached while pressed for effect="opacity"
   */
  opacityTo?: number;
  highlightColor?: ColorValue;
}

const DEFAULT_OPACITY_TO = 0.5;
const HIGHLIGHT_FADE_IN = 80;
const HIGHLIGHT_FADE_OUT = 150;

const ABSOLUTE_FILL = {
  position: "absolute" as const,
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
};

export const Press = ({
  children,
  style,
  effect = "opacity",
  opacityTo = DEFAULT_OPACITY_TO,
  highlightColor,
  disabled,
  onPress,
  onPressIn,
  onPressOut,
  ...props
}: PressProps) => {
  const { theme } = useTheme();
  const highlightAlpha = useSharedValue(0);

  const isInteractive = Boolean(
    onPress || props.onLongPress || onPressIn || onPressOut,
  );
  const isHighlight = effect === "highlight";
  const resolvedHighlightColor = String(highlightColor ?? theme.colors.mist);

  const handlePressIn = useCallback(
    (event: GestureResponderEvent) => {
      if (isHighlight) {
        cancelAnimation(highlightAlpha);
        highlightAlpha.value = withTiming(1, {
          duration: HIGHLIGHT_FADE_IN,
        });
      }

      onPressIn?.(event);
    },
    [highlightAlpha, isHighlight, onPressIn],
  );

  const handlePressOut = useCallback(
    (event: GestureResponderEvent) => {
      if (isHighlight) {
        cancelAnimation(highlightAlpha);
        highlightAlpha.value = withTiming(0, {
          duration: HIGHLIGHT_FADE_OUT,
        });
      }

      onPressOut?.(event);
    },
    [highlightAlpha, isHighlight, onPressOut],
  );

  const highlightStyle = useAnimatedStyle(() => ({
    ...ABSOLUTE_FILL,
    backgroundColor: resolvedHighlightColor,
    opacity: highlightAlpha.value,
  }));

  if (!isInteractive) {
    return (
      <View style={[styles.base, isHighlight && styles.clip, style]}>
        {children}
      </View>
    );
  }

  const pressableStyle =
    effect === "opacity"
      ? ({ pressed }: PressableStateCallbackType) => [
          styles.base,
          style,
          pressed ? { opacity: opacityTo } : null,
        ]
      : [styles.base, isHighlight && styles.clip, style];

  return (
    <Pressable
      {...props}
      disabled={disabled}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={pressableStyle}
    >
      {isHighlight ? (
        <Animated.View
          pointerEvents="none"
          style={[ABSOLUTE_FILL, highlightStyle]}
        />
      ) : null}

      {children}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    position: "relative",
  },
  clip: {
    overflow: "hidden",
  },
});
