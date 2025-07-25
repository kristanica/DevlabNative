const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);
const {
  wrapWithReanimatedMetroConfig,
} = require("react-native-reanimated/metro-config");
config.resolver.sourceExts.push("cjs");
config.resolver.unstable_enablePackageExports = false;

module.exports = wrapWithReanimatedMetroConfig(config);
module.exports = withNativeWind(config, { input: "./global.css" });
