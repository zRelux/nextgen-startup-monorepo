export default {
	expo: {
		scheme: "acme",
		userInterfaceStyle: "automatic",
		orientation: "default",
		web: {
			output: "static",
			bundler: "metro",
		},
		plugins: [
			["react-native-app-clip", { "name": "App Clip" }],
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
		name: "app",
		slug: "app",
		android: {
			package: "com.monorepo.app",
		},
		ios: {
			bundleIdentifier: "com.monorepo.app",
		},
	},
};
