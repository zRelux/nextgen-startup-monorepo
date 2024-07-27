export default {
	expo: {
		scheme: "acme",
		userInterfaceStyle: "automatic",
		orientation: "default",
		web: {
			output: "static",
			bundler: "metro",
		},
		runtimeVersion: "fingerprint",
		updates: {
			url: "https://u.expo.dev/[your-project-id]",
		},
		extra: {
			eas: {
				projectId: "[your-project-id]",
			},
		},
		name: "app",
		slug: "app",
		android: {
			package: "com.monorepo.app",
		},
		ios: {
			bundleIdentifier: "com.monorepo.app",
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
		plugins: [
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
		],
	},
};
