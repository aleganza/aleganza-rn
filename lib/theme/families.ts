import { FontFamilies } from "./types";

const FONT_ROOT = "@/assets/fonts";

export const FONT_PATHS = {
  // SpaceMono
  space_mono_regular: require(`${FONT_ROOT}/SpaceMono-Regular.ttf`),

  // Montserrat
  montserrat_thin: require(`${FONT_ROOT}/montserrat/Montserrat-Thin.ttf`),
  montserrat_extra_light: require(
    `${FONT_ROOT}/montserrat/Montserrat-ExtraLight.ttf`,
  ),
  montserrat_light: require(`${FONT_ROOT}/montserrat/Montserrat-Light.ttf`),
  montserrat_regular: require(`${FONT_ROOT}/montserrat/Montserrat-Regular.ttf`),
  montserrat_medium: require(`${FONT_ROOT}/montserrat/Montserrat-Medium.ttf`),
  montserrat_semi_bold: require(
    `${FONT_ROOT}/montserrat/Montserrat-SemiBold.ttf`,
  ),
  montserrat_bold: require(`${FONT_ROOT}/montserrat/Montserrat-Bold.ttf`),
  montserrat_extra_bold: require(
    `${FONT_ROOT}/montserrat/Montserrat-ExtraBold.ttf`,
  ),

  // Inter
  inter_thin: require(`${FONT_ROOT}/inter/Inter-Thin.ttf`),
  inter_extra_light: require(
    `${FONT_ROOT}/inter/Inter-ExtraLight.ttf`,
  ),
  inter_light: require(`${FONT_ROOT}/inter/Inter-Light.ttf`),
  inter_regular: require(`${FONT_ROOT}/inter/Inter-Regular.ttf`),
  inter_medium: require(`${FONT_ROOT}/inter/Inter-Medium.ttf`),
  inter_semi_bold: require(
    `${FONT_ROOT}/inter/Inter-SemiBold.ttf`,
  ),
  inter_bold: require(`${FONT_ROOT}/inter/Inter-Bold.ttf`),
  inter_extra_bold: require(
    `${FONT_ROOT}/inter/Inter-ExtraBold.ttf`,
  ),
};

export const FONT_FAMILIES: FontFamilies = {
  // TODO: convert in "accent"
  accent: {
    thin: "montserrat_thin",
    extra_light: "montserrat_extra_light",
    light: "montserrat_light",
    regular: "montserrat_regular",
    medium: "montserrat_medium",
    semi_bold: "montserrat_semi_bold",
    bold: "montserrat_bold",
    extra_bold: "montserrat_extra_bold",
  },
  base: {
    thin: "inter_thin",
    extra_light: "inter_extra_light",
    light: "inter_light",
    regular: "inter_regular",
    medium: "inter_medium",
    semi_bold: "inter_semi_bold",
    bold: "inter_bold",
    extra_bold: "inter_extra_bold",
  },
  mono: {
    regular: "space_mono_regular",
  },
};
