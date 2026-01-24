const getEnvironment = (): string => {
  return process.env.NODE_ENV ?? "development";
};

const keepDevelopmentFeatureInProduction = true

const is = {
  development: getEnvironment() === "development" || keepDevelopmentFeatureInProduction,
  production: getEnvironment() === "production",
  test: getEnvironment() === "test",
};

export const env = {
  getEnvironment,
  is,
};

export default env;
