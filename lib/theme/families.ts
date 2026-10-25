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

  // Google Sans Flex
  google_sans_flex_thin: require(
    `${FONT_ROOT}/google_sans_flex/GoogleSansFlex_24pt-Thin.ttf`,
  ),
  google_sans_flex_extra_light: require(
    `${FONT_ROOT}/google_sans_flex/GoogleSansFlex_24pt-ExtraLight.ttf`,
  ),
  google_sans_flex_light: require(
    `${FONT_ROOT}/google_sans_flex/GoogleSansFlex_24pt-Light.ttf`,
  ),
  google_sans_flex_regular: require(
    `${FONT_ROOT}/google_sans_flex/GoogleSansFlex_24pt-Regular.ttf`,
  ),
  google_sans_flex_medium: require(
    `${FONT_ROOT}/google_sans_flex/GoogleSansFlex_24pt-Medium.ttf`,
  ),
  google_sans_flex_semi_bold: require(
    `${FONT_ROOT}/google_sans_flex/GoogleSansFlex_24pt-SemiBold.ttf`,
  ),
  google_sans_flex_bold: require(
    `${FONT_ROOT}/google_sans_flex/GoogleSansFlex_24pt-Bold.ttf`,
  ),
  google_sans_flex_extra_bold: require(
    `${FONT_ROOT}/google_sans_flex/GoogleSansFlex_24pt-ExtraBold.ttf`,
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

const baseFamily = {
  thin: "inter_thin",
  extra_light: "inter_extra_light",
  light: "inter_light",
  regular: "inter_regular",
  medium: "inter_medium",
  semi_bold: "inter_semi_bold",
  bold: "inter_bold",
  extra_bold: "inter_extra_bold",
};

const googleFlexFamily = {
  thin: "google_sans_flex_thin",
  extra_light: "google_sans_flex_extra_light",
  light: "google_sans_flex_light",
  regular: "google_sans_flex_regular",
  medium: "google_sans_flex_medium",
  semi_bold: "google_sans_flex_semi_bold",
  bold: "google_sans_flex_bold",
  extra_bold: "google_sans_flex_extra_bold",
};

export const FONT_FAMILIES: FontFamilies = {
  accent: googleFlexFamily,
  base: baseFamily,
  default: baseFamily,
  google_sans_flex: googleFlexFamily,
  mono: {
    regular: "space_mono_regular",
  },
};
