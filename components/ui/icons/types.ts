import type { IconProps as MingCuteIconProps } from "@mingcute/react-native";
import { ColorValue } from "react-native";

import type { ICON_SIZES } from "@/lib/theme/sizes";

import type { IconName } from "./glyphs";

export type { IconName };

export type IconSize = keyof typeof ICON_SIZES | number;

export interface IconProps
  extends Omit<MingCuteIconProps, "size" | "color" | "strokeWidth"> {
  name: IconName;
  size?: IconSize;
  color?: ColorValue;
}
