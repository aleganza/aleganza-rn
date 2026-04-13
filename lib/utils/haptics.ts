import * as Haptics from 'expo-haptics';

// only works on ios, since on android triggers a vibration.
// to be replaced or extended with react-native-haptic-feedback

export const hapticVibrate = () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
export const hapticVibrateSoft = () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
