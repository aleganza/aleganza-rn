import { FontFamilies } from "./types";

const FONT_ROOT = "@/assets/fonts";

export const FONT_PATHS = {
  // SpaceMono
  space_mono_regular: require(`${FONT_ROOT}/SpaceMono-Regular.ttf`),

  // Montserrat
  montserrat_thin: require(`${FONT_ROOT}/montserrat/Montserrat-Thin.ttf`),
  montserrat_extra_light: require(`${FONT_ROOT}/montserrat/Montserrat-ExtraLight.ttf`),
  montserrat_light: require(`${FONT_ROOT}/montserrat/Montserrat-Light.ttf`),
  montserrat_regular: require(`${FONT_ROOT}/montserrat/Montserrat-Regular.ttf`),
  montserrat_medium: require(`${FONT_ROOT}/montserrat/Montserrat-Medium.ttf`),
  montserrat_semi_bold: require(`${FONT_ROOT}/montserrat/Montserrat-SemiBold.ttf`),
  montserrat_bold: require(`${FONT_ROOT}/montserrat/Montserrat-Bold.ttf`),
  montserrat_extra_bold: require(`${FONT_ROOT}/montserrat/Montserrat-ExtraBold.ttf`),
};

export const FONT_FAMILIES: FontFamilies = {
  // TODO: convert in "accent"
  default: {
    thin: "montserrat_thin",
    extra_light: "montserrat_extra_light",
    light: "montserrat_light",
    regular: "montserrat_regular",
    medium: "montserrat_medium",
    semi_bold: "montserrat_semi_bold",
    bold: "montserrat_bold",
    extra_bold: "montserrat_extra_bold",
  },
  // TODO: add "base" (Inter)
  mono: {
    regular: "space_mono_regular",
  },
};
