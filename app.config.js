const NAME = "aleganza rn";
const SLUG = "aleganzarn";
const IS_DEV = process.env.APP_VARIANT === "development";

const appName = IS_DEV ? `${NAME} Dev` : NAME;
const applicationId = IS_DEV
  ? `com.aleganza.${SLUG}.dev`
  : `com.aleganza.${SLUG}`;

export default ({ config }) => ({
  ...config,
  name: appName,
  android: {
    ...config.android,
    package: applicationId,
  },
  ios: {
    ...config.ios,
    bundleIdentifier: applicationId,
  },
  // for mapbox
  // plugins: [
  //   ...(config.plugins || []),
  //   [
  //     "@rnmapbox/maps",
  //     {
  //       RNMapboxMapsImpl: "mapbox",
  //     },
  //   ],
  // ],
});
