import { Platform } from "react-native";

export const getPlatform = (): string => {
  return Platform.OS ?? "unknown";
};

export const isPlatform = {
  ios: getPlatform() === "ios",
  android: getPlatform() === "android",
  web: getPlatform() === "web",
  mobile: getPlatform() === "ios" || getPlatform() === "android",
};

export const platform = {
  getPlatform,
  is: isPlatform,
};

export default platform;
