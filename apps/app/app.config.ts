import dotenv from "dotenv";

import type { ConfigContext, ExpoConfig } from "expo/config";

import pjson from "./package.json";

dotenv.config();

const plugins: ExpoConfig["plugins"] = [
	[
		"expo-build-properties",
		{
			android: {
				enableProguardInReleaseBuilds: true,
				enableShrinkResourcesInReleaseBuilds: true,
			},
		},
	],
	["expo-updates"],
	[
		"@sentry/react-native/expo",
		{
			url: "https://sentry.io/",
			project: process.env.SENTRY_PROJECT,
			organization: process.env.SENTRY_ORGANIZATION,
		},
	],
	[
		"expo-dev-launcher",
		{
			launchMode: "most-recent",
		},
	],
	["react-native-app-clip", { name: "App Clip" }],
	[
		"@bittingz/expo-widgets",
		{
			ios: {
				src: "./widgets/ios",
				mode: "development",
				moduleDependencies: ["MyData.swift", "LogHandler.swift"],
			},
			android: {
				src: "./widgets/android",
				widgets: [
					{
						name: "SampleWidget",
						resourceName: "@xml/sample_widget_info",
					},
				],
			},
		},
	],
	[
		"expo-router",
		{
			origin: "https://n",
		},
	],
];

const devConfig = {
	name: "Monorepo Dev",
	slug: "monorepo-dev",
	scheme: "monorepo-dev",
	channel: "production",
	icon: "./assets/icon-dev.png",
	projectId: "[project-id]",
	identifier: "com.monorepo.dev.app",
};

const stgConfig = {
	name: "Monorepo Staging",
	slug: "monorepo-staging",
	scheme: "monorepo-staging",
	channel: "production",
	icon: "./assets/icon-stg.png",
	projectId: "[project-id]",
	identifier: "com.monorepo.staging.app",
};

const prodConfig = {
	name: "Monorepo",
	slug: "monorepo",
	scheme: "monorepo",
	channel: "production",
	icon: "./assets/icon.png",
	projectId: "[project-id]",
	identifier: "com.monorepo.app",
};

const configs: Record<string, typeof devConfig> = {
	development: devConfig,
	staging: stgConfig,
	production: prodConfig,
};

export const createAppConfig = ({
	config,
}: {
	config: ExpoConfig;
}): ConfigContext["config"] => {
	const configToUse = process.env.EAS_BUILD_PROFILE ? configs[process.env.EAS_BUILD_PROFILE] : null;

	if (!configToUse) {
		return "Error";
	}

	return {
		...config,
		experiments: {
			tsconfigPaths: true,
			typedRoutes: true,
		},
		scheme: configToUse.scheme,
		name: configToUse.name,
		slug: configToUse.slug,
		version: pjson.version,
		runtimeVersion: pjson.version,
		userInterfaceStyle: "automatic",
		orientation: "default",
		jsEngine: "hermes",
		assetBundlePatterns: ["**/*"],
		web: {
			output: "static",
			bundler: "metro",
		},
		splash: {
			image: "./assets/splash.png",
			resizeMode: "cover",
			backgroundColor: "",
		},
		updates: {
			url: `https://u.expo.dev/${configToUse.projectId}`,
			fallbackToCacheTimeout: 0,
			enabled: true,
			requestHeaders: {
				"expo-channel-name": "production",
			},
		},
		extra: {
			eas: {
				projectId: configToUse.projectId,
			},
			BUILD_NUMBER: process.env.BUILD_NUMBER,
			ENVIRONMENT: process.env.EAS_BUILD_PROFILE,
			APPLE_SUBSCRIPTION_KEY: process.env.APPLE_SUBSCRIPTION_KEY,
			GOOGLE_SUBSCRIPTION_KEY: process.env.GOOGLE_SUBSCRIPTION_KEY,
		},
		android: {
			package: configToUse.identifier,
			versionCode: Number.parseInt(process.env.BUILD_NUMBER || "0", 10),
			adaptiveIcon: {
				foregroundImage: "./assets/adaptive-icon.png",
				backgroundColor: "",
			},
		},
		ios: {
			config: {
				usesNonExemptEncryption: false,
			},
			buildNumber: process.env.BUILD_NUMBER,
			bundleIdentifier: configToUse.identifier,
			infoPlist: {
				CADisableMinimumFrameDurationOnPhone: true,
			},
			privacyManifests: {
				NSPrivacyCollectedDataTypes: [
					{
						NSPrivacyCollectedDataType: "NSPrivacyCollectedDataTypeCrashData",
						NSPrivacyCollectedDataTypeLinked: false,
						NSPrivacyCollectedDataTypeTracking: false,
						NSPrivacyCollectedDataTypePurposes: ["NSPrivacyCollectedDataTypePurposeAppFunctionality"],
					},
					{
						NSPrivacyCollectedDataType: "NSPrivacyCollectedDataTypePerformanceData",
						NSPrivacyCollectedDataTypeLinked: false,
						NSPrivacyCollectedDataTypeTracking: false,
						NSPrivacyCollectedDataTypePurposes: ["NSPrivacyCollectedDataTypePurposeAppFunctionality"],
					},
					{
						NSPrivacyCollectedDataType: "NSPrivacyCollectedDataTypeOtherDiagnosticData",
						NSPrivacyCollectedDataTypeLinked: false,
						NSPrivacyCollectedDataTypeTracking: false,
						NSPrivacyCollectedDataTypePurposes: ["NSPrivacyCollectedDataTypePurposeAppFunctionality"],
					},
				],
				NSPrivacyAccessedAPITypes: [
					{
						NSPrivacyAccessedAPIType: "NSPrivacyAccessedAPICategoryUserDefaults",
						NSPrivacyAccessedAPITypeReasons: ["CA92.1"],
					},
					{
						NSPrivacyAccessedAPIType: "NSPrivacyAccessedAPICategorySystemBootTime",
						NSPrivacyAccessedAPITypeReasons: ["35F9.1"],
					},
					{
						NSPrivacyAccessedAPIType: "NSPrivacyAccessedAPICategoryFileTimestamp",
						NSPrivacyAccessedAPITypeReasons: ["C617.1"],
					},
				],
			},
		},
		plugins,
	};
};

export default createAppConfig;
