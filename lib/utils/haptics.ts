import * as Haptics from "expo-haptics";
import { Platform } from "react-native";

const androidHaptic = async (
  type: Haptics.AndroidHaptics,
  fallbackStyle: Haptics.ImpactFeedbackStyle,
) => {
  try {
    await Haptics.performAndroidHapticsAsync(type);
  } catch {
    await Haptics.impactAsync(fallbackStyle);
  }
};

export const hapticVibrate = () =>
  Platform.OS === "android"
    ? androidHaptic(
        Haptics.AndroidHaptics.Clock_Tick,
        Haptics.ImpactFeedbackStyle.Light,
      )
    : Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

export const hapticVibrateSoft = () =>
  Platform.OS === "android"
    ? androidHaptic(
        Haptics.AndroidHaptics.Keyboard_Tap,
        Haptics.ImpactFeedbackStyle.Soft,
      )
    : Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
