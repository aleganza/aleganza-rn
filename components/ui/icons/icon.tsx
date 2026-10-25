import { useTheme } from "@/lib/theme/useTheme";
import React from "react";

import { ICONS } from "./glyphs";
import { IconProps } from "./types";

export const Icon: React.FC<IconProps> = ({
  name,
  size = "md",
  color,
  ...props
}) => {
  const { theme } = useTheme();
  const Glyph = ICONS[name];
  const resolvedSize = typeof size === "number" ? size : theme.iconSize[size];

  return (
    <Glyph
      size={resolvedSize}
      color={(color ?? theme.colors.text) as string}
      {...props}
    />
  );
};
