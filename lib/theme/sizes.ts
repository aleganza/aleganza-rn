export const BASE_FONT_SIZE = 16;
export const BASE_SPACING = 16;
export const BASE_BORDER_RADIUS = 12;
export const BASE_ICON_SIZE = 24;

const rem = {
  font: (value: number): number => value * BASE_FONT_SIZE,
  spacing: (value: number): number => value * BASE_SPACING,
  borderRadius: (value: number): number => value * BASE_BORDER_RADIUS,
  icon: (value: number): number => value * BASE_ICON_SIZE,
};

export const FONT_SIZES = {
  xs: rem.font(0.625),
  sm: rem.font(0.75),
  base: rem.font(0.875),
  md: rem.font(1),
  lg: rem.font(1.125),
  xl: rem.font(1.25),
  xxl: rem.font(1.5),
  h1: rem.font(2),
  h2: rem.font(1.75),
  h3: rem.font(1.5),
  h4: rem.font(1.25),
  h5: rem.font(1.125),
  h6: rem.font(1),
  display: rem.font(2.25),
  displayLarge: rem.font(2.75),
} as const;

export const LINE_HEIGHTS = {
  tight: 1.2,
  snug: 1.375,
  normal: 1.5,
  relaxed: 1.625,
  loose: 2,
} as const;

// export const LETTER_SPACING = {
//   tighter: -0.8,
//   tight: -0.4,
//   normal: 0,
//   wide: 0.4,
//   wider: 0.8,
//   widest: 1.6,
// } as const;

export const SPACING = {
  unit: rem.font(1 / 16),
  xs: rem.spacing(0.25),
  sm: rem.spacing(0.5),
  base: rem.spacing(0.75),
  md: rem.spacing(1),
  lg: rem.spacing(1.25),
  xl: rem.spacing(1.5),
  xxl: rem.spacing(2),
  xxxl: rem.spacing(2.5),
} as const;

export const BORDER_RADIUS = {
  none: 0,
  xs: rem.borderRadius(0.25),
  sm: rem.borderRadius(0.5),
  base: rem.borderRadius(0.75),
  md: rem.borderRadius(1),
  lg: rem.borderRadius(1.5),
  xl: rem.borderRadius(2),
  xxl: rem.borderRadius(3),
  full: 9999,
} as const;

export const ICON_SIZES = {
  xs: rem.icon(0.5),
  sm: rem.icon(0.667),
  base: rem.icon(0.833),
  md: rem.icon(1),
  lg: rem.icon(1.333),
  xl: rem.icon(1.667),
  xxl: rem.icon(2),
} as const;
