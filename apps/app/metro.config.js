const { withNativeWind } = require("nativewind/metro");
const path = require("node:path");
const { getSentryExpoConfig } = require("@sentry/react-native/metro");

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, "../..");

const config = getSentryExpoConfig(projectRoot);

config.resolver.nodeModulesPaths = [
	path.resolve(projectRoot, "node_modules"),
	path.resolve(monorepoRoot, "node_modules"),
];

config.resolver.sourceExts.push("mjs");
config.resolver.sourceExts.push("cjs");

module.exports = withNativeWind(config, {
	input: "./global.css",
});
