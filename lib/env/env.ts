const getEnvironment = (): string => process.env.NODE_ENV ?? "development";

const keepDevelopmentFeatureInProduction = false;

const is = {
  development:
    getEnvironment() === "development" || keepDevelopmentFeatureInProduction,
  production: getEnvironment() === "production",
  test: getEnvironment() === "test",
};

export const env = {
  getEnvironment,
  is,
};

export default env;
